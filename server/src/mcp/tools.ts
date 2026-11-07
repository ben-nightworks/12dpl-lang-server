/**
 * MCP tools, resources and prompts for writing 12dPL macros.
 *
 * Every tool returns markdown text. Failures come back as tool errors
 * (isError) rather than protocol errors so the model can read and react.
 */

import * as path from 'path';
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { resolveIncludeDirs, resolveUserPath, type McpConfig } from './config';
import { compileMacro, type CompileResult } from './compiler';
import { formatSignature, type FunctionCatalog } from './functionCatalog';
import { GUIDE_TOPICS, createMacroPrompt, reviewMacroPrompt } from './guidance';
import { paginate, type KnowledgeBase, type KnowledgeDoc } from './knowledgeBase';
import type { MacroValidator, ValidationResult } from './macroValidator';
import { MACRO_KINDS, scaffoldMacro, writeScaffold } from './scaffold';

export interface McpContext {
	config: McpConfig;
	knowledge: KnowledgeBase;
	catalog: FunctionCatalog;
	validator: MacroValidator;
}

type ToolResult = { content: Array<{ type: 'text'; text: string }>; isError?: boolean };

async function run(fn: () => string | Promise<string>): Promise<ToolResult> {
	try {
		return { content: [{ type: 'text', text: await fn() }] };
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return { content: [{ type: 'text', text: `Error: ${message}` }], isError: true };
	}
}

function continuation(nextOffset: number | undefined, call: string): string {
	return nextOffset === undefined ? '' : `\n\n[Truncated. Continue with ${call} and offset=${nextOffset}.]`;
}

// ─── Formatting ─────────────────────────────────────────────────────────────

function formatLookup(ctx: McpContext, name: string): string {
	const found = ctx.catalog.lookup(name);
	if (!found) {
		const similar = ctx.catalog.suggest(name);
		const hint = similar.length > 0 ? ` Similar names: ${similar.join(', ')}.` : '';
		return `## ${name}\nNot a 12dPL library function.${hint} If it is a user-defined function, it must be declared in the macro or one of its includes.`;
	}

	const lines = [`## ${found.name} (${found.overloads.length} overload${found.overloads.length === 1 ? '' : 's'})`, '```12dpl'];
	for (const f of found.overloads) lines.push(`${formatSignature(f)};    // ID ${f.id}`);
	lines.push('```');
	if (found.overloadDescriptions.length > 1) {
		// Overloads such as Get_length(Element, ...) and Get_length(Spiral) do different things.
		for (const { overload, description } of found.overloadDescriptions) {
			lines.push(`- \`${formatSignature(overload)}\`: ${description}`);
		}
	} else if (found.description) {
		lines.push(found.description);
	}
	if (found.notes.length > 0) {
		lines.push('', 'Notes from the macro knowledge base:');
		for (const note of found.notes) lines.push(`- ${note.line}  (${note.sectionId})`);
	}
	return lines.join('\n');
}

function docSize(doc: KnowledgeDoc): string {
	return `${Math.max(1, Math.round(doc.text.length / 1024))} KB`;
}

function formatIndex(ctx: McpContext): string {
	const lines = ['# 12dPL macro knowledge', '', 'Guides (start with get_macro_guide):'];
	for (const doc of ctx.knowledge.docs.filter(d => d.kind === 'guide')) {
		lines.push(`- \`${doc.id}\` ${doc.title} (${docSize(doc)}, ${doc.sections.length} sections${doc.origin === 'bundled' ? '' : `, from ${doc.origin}`})`);
	}
	lines.push('', 'Reference docs:');
	for (const doc of ctx.knowledge.docs.filter(d => d.kind === 'doc')) {
		lines.push(`- \`${doc.id}\` ${doc.title} (${docSize(doc)}, ${doc.sections.length} sections${doc.origin === 'bundled' ? '' : `, from ${doc.origin}`})`);
	}
	lines.push('', `Example macros: ${ctx.knowledge.examples.length} (find_examples)`);
	lines.push('', 'Call read_knowledge with a doc id for its outline, or a section id (doc#section) for its text.');
	return lines.join('\n');
}

function formatOutline(doc: KnowledgeDoc): string {
	const lines = [`# ${doc.title}`, `\`${doc.id}\`, ${docSize(doc)}. Read a section with read_knowledge(id):`, ''];
	for (const s of doc.sections) {
		lines.push(`${'  '.repeat(Math.max(0, s.level - 1))}- \`${s.id}\` ${s.title} (${s.text.length} chars)`);
	}
	return lines.join('\n');
}

function formatValidation(result: ValidationResult, maxProblems: number): string {
	const counts = { error: 0, warning: 0, info: 0, hint: 0 };
	for (const d of result.diagnostics) counts[d.severity]++;
	const includeNote = result.includeFiles.length > 0 ? ` (+${result.includeFiles.length} include file${result.includeFiles.length === 1 ? '' : 's'})` : '';
	const lines = [
		`Validated ${result.fsPath}${includeNote}`,
		`${counts.error} error(s), ${counts.warning} warning(s), ${counts.info + counts.hint} note(s)`,
	];

	let currentFile: string | undefined;
	for (const d of result.diagnostics.slice(0, maxProblems)) {
		if (d.file !== currentFile) {
			currentFile = d.file;
			lines.push('', `In ${path.relative(path.dirname(result.fsPath), d.file ?? result.fsPath)}:`);
		}
		lines.push('', `L${d.line}:${d.column} ${d.severity} [${d.rule}] ${d.message}`);
		if (d.sourceLine) lines.push(`    ${d.sourceLine.slice(0, 160)}`);
	}
	if (result.diagnostics.length > maxProblems) {
		lines.push('', `[${result.diagnostics.length - maxProblems} more not shown]`);
	}
	if (counts.error === 0 && counts.warning === 0) {
		lines.push('', 'No errors or warnings. Run compile_macro to confirm with cc4d.');
	}
	if (result.checkedIncludes.length > 0) {
		const names = result.checkedIncludes.map(f => path.relative(path.dirname(result.fsPath), f)).join(', ');
		lines.push('', `Also checked for runtime gotchas: ${names}. compile_macro reports syntax and type errors in include files.`);
	}
	return lines.join('\n');
}

/** Knowledge-base explanations for compiler messages that mislead. */
function compilerHints(output: string): string[] {
	const hints: string[] = [];
	if (/set_ups\.h: file not found/i.test(output)) {
		hints.push('cc4d does not search the 12d install for headers. Copy set_ups.h (from the 12d install\'s set_ups folder) next to the macro, list its folder in 12dpl.compiler.includePaths, or #define the constants the macro uses.');
	} else if (/: file not found/i.test(output)) {
		hints.push('An #include was not found. Includes resolve relative to the macro\'s folder and the folders in 12dpl.compiler.includePaths.');
	}
	if (/syntax error - giving up/i.test(output)) {
		hints.push('"syntax error - giving up" is often a source line or string literal longer than about 600 characters. Split long literals across several statements.');
	}
	if (/not defined on line/i.test(output)) {
		hints.push('"X not defined" usually means a missing #define (often a set_ups.h constant) or a misspelt variable.');
	}
	if (/Non implimented function call/i.test(output)) {
		hints.push('The call is declared but not implemented in this cc4d version (for example Start_timer). Use another API.');
	}
	return hints;
}

function formatCompile(result: CompileResult): string {
	const errors = result.diagnostics.filter(d => d.severity === 'error').length;
	const warnings = result.diagnostics.length - errors;
	const status = result.timedOut ? 'TIMED OUT' : result.success ? 'succeeded' : 'FAILED';
	const lines = [`cc4d ${status} (exit ${result.exitCode ?? 'none'}): ${errors} error(s), ${warnings} warning(s)`];
	if (result.outputFile) lines.push(`Output: ${result.outputFile}`);
	if (result.success && !result.outputFile) lines.push('No fresh .4do was found next to the source.');

	for (const d of result.diagnostics) {
		const where = `${path.basename(d.file)}:${d.line}${d.column !== undefined ? `:${d.column}` : ''}`;
		lines.push(`- ${where} ${d.severity}: ${d.message}`);
	}
	if (result.output && (result.diagnostics.length === 0 || !result.success)) {
		const raw = result.output.length > 4000 ? `${result.output.slice(0, 4000)}\n...` : result.output;
		lines.push('', 'Compiler output:', '```', raw, '```');
	}
	const hints = compilerHints(result.output);
	if (hints.length > 0) lines.push('', 'Hints:', ...hints.map(h => `- ${h}`));
	lines.push('', `Command: ${result.command}`, `Working folder: ${result.cwd}`);
	if (result.success) {
		lines.push('Compiling is not deploying: 12d Model runs the .4do from its user library, so copy it there before a live test.');
	}
	return lines.join('\n');
}

// ─── Registration ───────────────────────────────────────────────────────────

export function registerMcpFeatures(server: McpServer, ctx: McpContext): void {
	const readOnly = { readOnlyHint: true, openWorldHint: false };
	const topicNames = Object.keys(GUIDE_TOPICS) as [string, ...string[]];

	server.registerTool('get_macro_guide', {
		title: 'Get 12dPL macro guide',
		description: 'Curated rules and patterns for writing 12dPL macros, by topic. Read "essentials" before writing 12dPL code. Topics: '
			+ Object.entries(GUIDE_TOPICS).map(([k, t]) => `${k} (${t.description})`).join('; ')
			+ '; index (topic list and guide outline).',
		inputSchema: {
			topic: z.enum([...topicNames, 'index']).default('essentials').describe('Guide topic'),
			offset: z.number().int().min(0).optional().describe('Character offset when continuing a long topic'),
		},
		annotations: readOnly,
	}, ({ topic, offset }) => run(() => {
		if (topic === 'index') {
			const lines = ['# 12dPL macro guide topics', ''];
			for (const [name, t] of Object.entries(GUIDE_TOPICS)) lines.push(`- **${name}**: ${t.description}`);
			lines.push('', 'Full guides: read_knowledge("guide/instructions") and read_knowledge("guide/create-macro").');
			return lines.join('\n');
		}
		const t = GUIDE_TOPICS[topic];
		if (!t) throw new Error(`Unknown guide topic "${topic}".`);
		const selections = ctx.knowledge.selectGuideSections(t.headings);
		if (selections.length === 0) {
			return `No guide sections matched topic "${topic}". The guides may have been restructured; use read_knowledge("guide/instructions") for the outline.`;
		}
		const body = selections.map(s => `<!-- ${s.section.id} -->\n${s.text}`).join('\n\n---\n\n');
		const { chunk, nextOffset } = paginate(`# 12dPL guide: ${topic}\n${t.description}\n\n${body}`, offset ?? 0, 40000);
		return chunk + continuation(nextOffset, `get_macro_guide(topic="${topic}")`);
	}));

	server.registerTool('lookup_function', {
		title: 'Look up 12dPL library functions',
		description: 'Exact signatures, all overloads and library IDs for 12d Model built-in functions, plus gotchas recorded in the macro knowledge base. '
			+ 'Use it for every library call before writing it. Unknown names get close matches.',
		inputSchema: {
			name: z.string().min(1).describe('One or more function names, separated by commas or spaces (e.g. "Get_name, Set_colour")'),
		},
		annotations: readOnly,
	}, ({ name }) => run(async () => {
		await ctx.catalog.ready();
		const names = Array.from(new Set(name.split(/[\s,]+/).map(n => n.replace(/[()]/g, '').trim()).filter(Boolean))).slice(0, 20);
		return names.map(n => formatLookup(ctx, n)).join('\n\n');
	}));

	server.registerTool('search_functions', {
		title: 'Search 12dPL library functions',
		description: 'Finds 12d Model built-in functions by name fragment or purpose (e.g. "tin height", "Create_super", "vertex attribute"). '
			+ 'Returns signatures; call lookup_function for overloads and notes.',
		inputSchema: {
			query: z.string().min(1).describe('Name fragment or words describing what the function does'),
			limit: z.number().int().min(1).max(50).default(20).describe('Maximum results'),
		},
		annotations: readOnly,
	}, ({ query, limit }) => run(async () => {
		await ctx.catalog.ready();
		const hits = ctx.catalog.search(query, limit);
		if (hits.length === 0) return `No library functions match "${query}". Try fewer or different words, or search_knowledge.`;
		return [`${hits.length} function(s) for "${query}":`, ...hits.map(h => {
			const more = h.overloadCount > 1 ? ` (+${h.overloadCount - 1} overloads)` : '';
			return `- \`${h.signature}\`${more}${h.summary ? `: ${h.summary}` : ''}`;
		})].join('\n');
	}));

	server.registerTool('search_knowledge', {
		title: 'Search 12dPL macro knowledge',
		description: 'Full-text search over the macro guides and the 12dPL reference docs (language, panels and widgets, elements, super strings, alignments, TINs, trimesh, drafting, files, XML, ODBC, set_ups.h constants). '
			+ 'Returns section ids for read_knowledge.',
		inputSchema: {
			query: z.string().min(1).describe('Words, function names or a phrase'),
			limit: z.number().int().min(1).max(30).default(8).describe('Maximum results'),
			scope: z.enum(['all', 'guide', 'doc']).default('all').describe('guide = curated rules and patterns, doc = reference docs'),
		},
		annotations: readOnly,
	}, ({ query, limit, scope }) => run(() => {
		const hits = ctx.knowledge.search(query, { limit, kind: scope === 'all' ? undefined : scope });
		if (hits.length === 0) return `Nothing found for "${query}".`;
		const lines = [`${hits.length} section(s) for "${query}":`];
		hits.forEach((h, i) => {
			lines.push(`${i + 1}. **${h.section.title}** \`${h.section.id}\` (${h.doc.title})`);
			if (h.snippet) lines.push(`   ${h.snippet}`);
		});
		lines.push('', 'Read one with read_knowledge(id).');
		return lines.join('\n');
	}));

	server.registerTool('read_knowledge', {
		title: 'Read 12dPL macro knowledge',
		description: 'Reads the macro knowledge base. No id: list of guides and docs. A doc id (e.g. "docs/panel-widgets"): its outline, or the whole doc if short. '
			+ 'A section id (e.g. "docs/panel-widgets#5-61-10-6-choice-box"): that section\'s text.',
		inputSchema: {
			id: z.string().optional().describe('Doc id or section id (doc#section)'),
			offset: z.number().int().min(0).optional().describe('Character offset when continuing a long section'),
			maxChars: z.number().int().min(1000).max(60000).default(16000).describe('Maximum characters to return'),
		},
		annotations: readOnly,
	}, ({ id, offset, maxChars }) => run(() => {
		if (!id || !id.trim()) return formatIndex(ctx);

		if (id.includes('#')) {
			const section = ctx.knowledge.getSection(id);
			if (!section) {
				return `No section "${id}". Closest: ${ctx.knowledge.suggestIds(id).map(s => `\`${s}\``).join(', ') || 'none'}.`;
			}
			const trail = [...section.trail, section.title].join(' > ');
			const { chunk, nextOffset } = paginate(section.text, offset ?? 0, maxChars);
			return `<!-- ${section.id} | ${trail} -->\n${chunk}${continuation(nextOffset, `read_knowledge(id="${section.id}")`)}`;
		}

		const doc = ctx.knowledge.getDoc(id);
		if (!doc) {
			return `No doc "${id}". Closest: ${ctx.knowledge.suggestIds(id).map(s => `\`${s}\``).join(', ') || 'none'}. Call read_knowledge without an id for the list.`;
		}
		if (doc.text.length <= maxChars && offset === undefined) return doc.text;
		if (offset !== undefined) {
			const { chunk, nextOffset } = paginate(doc.text, offset, maxChars);
			return chunk + continuation(nextOffset, `read_knowledge(id="${doc.id}")`);
		}
		return formatOutline(doc);
	}));

	server.registerTool('find_examples', {
		title: 'Find example 12dPL macros',
		description: 'Lists example macros (.4dm/.h) from the configured knowledge folders, ranked by name, description and code matches. '
			+ 'Search for function or widget names (e.g. "Source_Box", "GridCtrl_Box", "Undo_List") to find working code.',
		inputSchema: {
			query: z.string().optional().describe('Words or identifiers to look for; omit to list all'),
			limit: z.number().int().min(1).max(100).default(20).describe('Maximum results'),
		},
		annotations: readOnly,
	}, ({ query, limit }) => run(() => {
		if (ctx.knowledge.examples.length === 0) {
			return 'No example macros are loaded. Add folders of .4dm macros (for example a MacroProgramming workspace) to the "12dpl.mcp.knowledgePaths" setting.';
		}
		const hits = ctx.knowledge.findExamples(query, limit);
		if (hits.length === 0) return `No examples match "${query}".`;
		const lines = [query ? `${hits.length} example(s) for "${query}":` : `${ctx.knowledge.examples.length} examples (showing ${hits.length}):`];
		for (const h of hits) {
			lines.push(`- \`${h.example.id}\`${h.example.description ? `: ${h.example.description}` : ''}`);
			for (const m of h.matches) lines.push(`    ${m}`);
		}
		lines.push('', 'Read one with read_example(name).');
		return lines.join('\n');
	}));

	server.registerTool('read_example', {
		title: 'Read an example 12dPL macro',
		description: 'Returns the source of an example macro listed by find_examples.',
		inputSchema: {
			name: z.string().min(1).describe('Example id or file name'),
			offset: z.number().int().min(0).optional().describe('Character offset when continuing a long file'),
			maxChars: z.number().int().min(1000).max(80000).default(30000).describe('Maximum characters to return'),
		},
		annotations: readOnly,
	}, ({ name, offset, maxChars }) => run(() => {
		const example = ctx.knowledge.getExample(name);
		if (!example) {
			const similar = ctx.knowledge.findExamples(name, 5).map(h => `\`${h.example.id}\``);
			throw new Error(`No example "${name}".${similar.length > 0 ? ` Similar: ${similar.join(', ')}.` : ''}`);
		}
		const { chunk, nextOffset } = paginate(example.text, offset ?? 0, maxChars);
		return `// ${example.id} (${example.filePath})\n${chunk}${continuation(nextOffset, `read_example(name="${example.id}")`)}`;
	}));

	server.registerTool('validate_macro', {
		title: 'Validate a 12dPL macro',
		description: 'Checks a macro without compiling: syntax, undeclared functions and variables (with suggestions), argument types against the library signatures, '
			+ 'return values, and the runtime crashes recorded in the knowledge base (non-short-circuit guards, inline ternaries, null Text, handle locks). '
			+ 'Pass a file path, source code, or both (code checked as if saved at path, so #includes resolve).',
		inputSchema: {
			path: z.string().optional().describe('Path to a .4dm or .H file (absolute, or relative to the workspace folder)'),
			code: z.string().optional().describe('Source code to check instead of the file contents'),
			maxProblems: z.number().int().min(1).max(500).default(100).describe('Maximum problems to list'),
		},
		annotations: readOnly,
	}, ({ path: filePath, code, maxProblems }) => run(async () => {
		const result = await ctx.validator.validate({ filePath, code });
		return formatValidation(result, maxProblems);
	}));

	server.registerTool('compile_macro', {
		title: 'Compile a 12dPL macro with cc4d',
		description: 'Compiles a .4dm file with the 12d Model compiler (cc4d.exe, Windows only) from the macro\'s folder, using the 12dpl.compiler settings. '
			+ 'Returns parsed errors with explanations of misleading messages, and the .4do path on success.',
		inputSchema: {
			path: z.string().min(1).describe('Path to the .4dm file (absolute, or relative to the workspace folder)'),
			flags: z.array(z.string()).default([]).describe('Extra cc4d flags, e.g. ["-allow_old_calls"]. Normal builds need none.'),
		},
		annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
	}, ({ path: filePath, flags }) => run(async () => {
		const source = resolveUserPath(ctx.config, filePath);
		const result = await compileMacro(source, {
			compilerFolder: ctx.config.compilerFolder,
			includePaths: resolveIncludeDirs(ctx.config, source),
			flags,
		});
		return formatCompile(result);
	}));

	server.registerTool('scaffold_macro', {
		title: 'Scaffold a 12dPL macro project',
		description: 'Creates a compilable macro project following the workspace conventions: <Name>/<Name>[_panel]_01.4dm (UI and event loop only) plus '
			+ 'includes/<Name>_globals.H, _utils.H (debug log in %TEMP%) and _process.H. Kinds: headless, panel (model box + Process), '
			+ 'source_box (Source_Box selection), tabs (Tab_Box pages). Writes files when outputDirectory is given (never overwrites); otherwise returns them.',
		inputSchema: {
			name: z.string().min(1).describe('Macro base name, e.g. "Sum_lengths" (letters, digits, underscores)'),
			kind: z.enum(MACRO_KINDS).default('panel').describe('Template'),
			description: z.string().optional().describe('One-line description for the header comment'),
			programmer: z.string().optional().describe('Name for the header comment'),
			outputDirectory: z.string().optional().describe('Folder to create the <Name>/ project folder in'),
		},
		annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
	}, ({ name, kind, description, programmer, outputDirectory }) => run(() => {
		const scaffold = scaffoldMacro({ name, kind, description, programmer });
		if (outputDirectory) {
			const written = writeScaffold(scaffold, resolveUserPath(ctx.config, outputDirectory));
			return [
				`Created ${written.length} files:`,
				...written.map(f => `- ${f}`),
				'',
				`Main file: ${written[0]}`,
				'Next: write the processing in the _process.H header, then validate_macro and compile_macro on the main file.',
			].join('\n');
		}
		return scaffold.files.map(f => `### ${f.path}\n\`\`\`12dpl\n${f.content}\`\`\``).join('\n\n');
	}));

	// ─── Resources ──────────────────────────────────────────────────────────

	for (const doc of ctx.knowledge.docs) {
		server.registerResource(doc.id, `12dpl://knowledge/${encodeURI(doc.id)}`, {
			title: doc.title,
			description: `${doc.kind === 'guide' ? '12dPL macro guide' : '12dPL reference'}: ${doc.title}`,
			mimeType: 'text/markdown',
		}, uri => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: doc.text }] }));
	}
	for (const example of ctx.knowledge.examples) {
		server.registerResource(`example/${example.id}`, `12dpl://examples/${encodeURI(example.id)}`, {
			title: example.name,
			description: example.description || `Example macro ${example.id}`,
			mimeType: 'text/plain',
		}, uri => ({ contents: [{ uri: uri.href, mimeType: 'text/plain', text: example.text }] }));
	}

	// ─── Prompts ────────────────────────────────────────────────────────────

	server.registerPrompt('create_macro', {
		title: 'Create a 12dPL macro',
		description: 'Plan, scaffold, write, validate and compile a new 12d Model macro.',
		argsSchema: {
			description: z.string().describe('What the macro should do'),
			kind: z.string().optional().describe('headless, panel, source_box or tabs'),
		},
	}, ({ description, kind }) => ({
		messages: [{ role: 'user', content: { type: 'text', text: createMacroPrompt(description, kind) } }],
	}));

	server.registerPrompt('review_macro', {
		title: 'Review a 12dPL macro',
		description: 'Validate, compile and review an existing macro against the knowledge base.',
		argsSchema: {
			path: z.string().describe('Path to the .4dm file'),
		},
	}, ({ path: filePath }) => ({
		messages: [{ role: 'user', content: { type: 'text', text: reviewMacroPrompt(filePath) } }],
	}));
}
