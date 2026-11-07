/**
 * Tests for the 12dPL Macro Assistant MCP server (server/src/mcp/).
 *
 * Covers knowledge loading and search, the function catalog, the gotcha
 * rules, offline validation, scaffolding, compiler output parsing, config,
 * and an end-to-end stdio session against server/src/mcpServer.ts.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawn, type ChildProcessWithoutNullStreams } from 'child_process';
import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { PrototypeService } from '../server/src/services/prototypeService';
import { parsePathList, readMcpConfig, MCP_ENV, DEFAULT_COMPILER_FOLDER } from '../server/src/mcp/config';
import { loadKnowledgeBase, sectionMarkdown, tokenize, describeExample, paginate, type KnowledgeBase } from '../server/src/mcp/knowledgeBase';
import { FunctionCatalog } from '../server/src/mcp/functionCatalog';
import { checkGotchas, maskSource } from '../server/src/mcp/gotchaRules';
import { MacroValidator } from '../server/src/mcp/macroValidator';
import { MACRO_KINDS, scaffoldMacro, writeScaffold } from '../server/src/mcp/scaffold';
import { compileMacro, parseCompilerOutput, splitCommandLineArgs } from '../server/src/mcp/compiler';
import { GUIDE_TOPICS } from '../server/src/mcp/guidance';

const root = path.resolve(__dirname, '..');
const bundledKnowledge = path.join(root, 'server', 'src', 'resources', 'knowledge');

function tempDir(prefix: string): string {
	return fs.mkdtempSync(path.join(os.tmpdir(), `12dpl-mcp-${prefix}-`));
}

function rules(text: string): string[] {
	return checkGotchas(text).map(f => f.rule);
}

let prototypes: PrototypeService;
let knowledge: KnowledgeBase;
let catalog: FunctionCatalog;

beforeAll(async () => {
	prototypes = new PrototypeService();
	knowledge = loadKnowledgeBase({ bundledRoot: bundledKnowledge });
	catalog = new FunctionCatalog(prototypes, knowledge);
	await catalog.ready();
});

// ─── Config ─────────────────────────────────────────────────────────────────

describe('config', () => {
	test('parsePathList accepts JSON arrays and ;-separated lists', () => {
		expect(parsePathList('["C:/a", " C:/b "]')).toEqual(['C:/a', 'C:/b']);
		expect(parsePathList('C:/a; C:/b;')).toEqual(['C:/a', 'C:/b']);
		expect(parsePathList('')).toEqual([]);
		expect(parsePathList(undefined)).toEqual([]);
	});

	test('readMcpConfig falls back to defaults and resolves knowledge paths', () => {
		const ws = path.resolve(os.tmpdir(), 'ws');
		const config = readMcpConfig({
			[MCP_ENV.workspaceFolder]: ws,
			[MCP_ENV.knowledgePaths]: JSON.stringify(['${workspaceFolder}/macros', 'docs']),
			[MCP_ENV.includePaths]: '["${workspaceFolder}/includes"]',
		});
		expect(config.compilerFolder).toBe(DEFAULT_COMPILER_FOLDER);
		expect(config.version).toBe('0.0.0-dev');
		expect(config.knowledgePaths).toEqual([path.resolve(ws, 'macros'), path.resolve(ws, 'docs')]);
		expect(config.includePaths).toEqual(['${workspaceFolder}/includes']);
	});
});

// ─── Knowledge base ─────────────────────────────────────────────────────────

describe('knowledge base', () => {
	test('tokenize keeps identifiers whole and also splits them on underscores', () => {
		expect(tokenize('Create_model_box flags')).toEqual(['create_model_box', 'create', 'model', 'box', 'flags']);
		expect(tokenize('the and of')).toEqual([]);
	});

	test('sectionMarkdown splits on headings outside code fences', () => {
		const text = '# Title\nintro\n## A\ntext a\n```c\n# not a heading\n```\n### A1\ntext a1\n## A\nsecond a';
		const sections = sectionMarkdown('docs/x', 'Title', text);
		expect(sections.map(s => s.title)).toEqual(['Title', 'A', 'A1', 'A']);
		expect(sections.map(s => s.id)).toEqual(['docs/x#title', 'docs/x#a', 'docs/x#a1', 'docs/x#a-2']);
		expect(sections[1].text).toContain('# not a heading');
		expect(sections[2].trail).toEqual(['Title', 'A']);
	});

	test('sectionMarkdown splits big sections on numbered manual headings, even inside fences', () => {
		const filler = 'x'.repeat(5000);
		const text = `## Chapter\n\`\`\`\n5.1 First Topic\n${filler}\n5.2 Second Topic\n${filler}\n\`\`\``;
		const titles = sectionMarkdown('docs/m', 'M', text).map(s => s.title);
		expect(titles).toEqual(['Chapter', '5.1 First Topic', '5.2 Second Topic']);
	});

	test('sectionMarkdown breaks oversized sections into numbered parts', () => {
		const text = `## Big\n${Array.from({ length: 400 }, (_, i) => `line ${i} ${'y'.repeat(60)}`).join('\n')}`;
		const sections = sectionMarkdown('docs/b', 'B', text);
		expect(sections.length).toBeGreaterThan(1);
		expect(sections[0].title).toMatch(/^Big \(part 1 of \d+\)$/);
		expect(sections.every(s => s.text.length <= 12100)).toBe(true);
	});

	test('bundled snapshot loads the guides and reference docs', () => {
		expect(knowledge.getDoc('guide/instructions')).toBeDefined();
		expect(knowledge.getDoc('guide/create-macro')).toBeDefined();
		expect(knowledge.getDoc('panel-widgets')?.id).toBe('docs/panel-widgets');
		expect(knowledge.getDoc('docs/reference.md')?.id).toBe('docs/reference');
		expect(knowledge.sectionCount).toBeGreaterThan(500);
	});

	test('search ranks the curated rule for a known gotcha first', () => {
		const hits = knowledge.search('Model_exists returns non-zero MODEL_EXISTS', { limit: 3 });
		expect(hits.length).toBeGreaterThan(0);
		expect(hits[0].doc.kind).toBe('guide');
		expect(hits[0].snippet).toContain('Model_exists');
	});

	test('search can be limited to reference docs', () => {
		const hits = knowledge.search('Choice_Box', { limit: 5, kind: 'doc' });
		expect(hits.every(h => h.doc.kind === 'doc')).toBe(true);
	});

	test('getSection resolves ids and suggestIds offers alternatives', () => {
		const section = knowledge.search('Choice_Box', { limit: 1, kind: 'doc' })[0].section;
		expect(knowledge.getSection(section.id)?.id).toBe(section.id);
		expect(knowledge.getSection('docs/panel-widgets#no-such-section')).toBeUndefined();
		expect(knowledge.suggestIds('choice box').length).toBeGreaterThan(0);
	});

	test('findMentions quotes curated lines without list markers', () => {
		const notes = knowledge.findMentions('Model_exists');
		expect(notes.length).toBeGreaterThan(0);
		expect(notes.some(n => n.line.includes('non-zero'))).toBe(true);
		expect(notes.every(n => !/^[-*] /.test(n.line))).toBe(true);
	});

	test('findMentions skips folder trees and doc index rows', () => {
		const notes = knowledge.findMentions('Get_model', 50);
		expect(notes.length).toBeGreaterThan(0);
		expect(notes.some(n => /[│├└]|docs\/[\w-]+\.md/.test(n.line))).toBe(false);
	});

	test('every guide topic selects at least one section', () => {
		for (const [name, topic] of Object.entries(GUIDE_TOPICS)) {
			const selected = knowledge.selectGuideSections(topic.headings);
			expect(selected.length > 0 ? name : `${name}: no sections`).toBe(name);
		}
	});

	test('guide headings match exactly unless the pattern ends with *', () => {
		const exact = knowledge.selectGuideSections(['Language']).map(s => s.section.title);
		expect(exact).toEqual(['Language']);
		const prefix = knowledge.selectGuideSections(['Step 6*']).map(s => s.section.title);
		expect(prefix[0]).toStartWith('Step 6');
	});

	test('paginate cuts at a line boundary and reports the next offset', () => {
		const text = 'aaaa\nbbbb\ncccc\n';
		const first = paginate(text, 0, 7);
		expect(first.chunk).toBe('aaaa');
		expect(first.nextOffset).toBe(5);
		expect(paginate(text, first.nextOffset!, 100).chunk).toBe('bbbb\ncccc\n');
	});

	test('describeExample reads the Brief description block', () => {
		const header = '//----\n// Programmer  X\n// Brief description\n// Drop points onto a centre line.\n//----\nvoid main(){}';
		expect(describeExample(header)).toBe('Drop points onto a centre line.');
		expect(describeExample('// Sums string lengths per model\nvoid main(){}')).toBe('Sums string lengths per model');
	});

	describe('knowledge folders', () => {
		let folder: string;

		beforeAll(() => {
			folder = tempDir('knowledge');
			fs.writeFileSync(path.join(folder, 'CLAUDE.md'), '# Local Guide\n## Key Differences from C\nlocal rule about Frobnicate_widget\n');
			fs.mkdirSync(path.join(folder, 'docs'));
			fs.writeFileSync(path.join(folder, 'docs', 'reference.md'), '# Local Reference\nlocal reference text\n');
			fs.mkdirSync(path.join(folder, 'Macro_Projects', 'Demo', 'includes'), { recursive: true });
			fs.writeFileSync(path.join(folder, 'Macro_Projects', 'Demo', 'README.md'), '# Demo project\nnotes\n');
			fs.writeFileSync(path.join(folder, 'Macro_Projects', 'Demo', 'Demo_panel_01.4dm'), '// Brief description\n// Demo panel with a Source_Box\nvoid main(){}\n');
			fs.writeFileSync(path.join(folder, 'Macro_Projects', 'Demo', 'includes', 'Demo_utils.H'), '// helpers\n');
			fs.mkdirSync(path.join(folder, 'tooling'));
			fs.writeFileSync(path.join(folder, 'tooling', 'package.json'), '{}');
			fs.writeFileSync(path.join(folder, 'tooling', 'README.md'), '# Should be skipped\n');
			fs.mkdirSync(path.join(folder, '.hidden'));
			fs.writeFileSync(path.join(folder, '.hidden', 'x.4dm'), 'void main(){}');
		});

		afterAll(() => fs.rmSync(folder, { recursive: true, force: true }));

		test('folder guides and docs replace the bundled copies; other markdown and macros are added', () => {
			const kb = loadKnowledgeBase({ bundledRoot: bundledKnowledge, extraRoots: [folder] });
			expect(kb.getDoc('guide/instructions')?.title).toBe('Local Guide');
			expect(kb.getDoc('docs/reference')?.title).toBe('Local Reference');
			expect(kb.getDoc('docs/panel-widgets')?.origin).toBe('bundled');
			expect(kb.getDoc('Macro_Projects/Demo/README')?.title).toBe('Demo project');
			expect(kb.getDoc('tooling/README')).toBeUndefined();
			expect(kb.examples.map(e => e.id).sort()).toEqual([
				'Macro_Projects/Demo/Demo_panel_01.4dm',
				'Macro_Projects/Demo/includes/Demo_utils.H',
			]);
			expect(kb.findMentions('Frobnicate_widget')[0].sectionId).toBe('guide/instructions#key-differences-from-c');
		});

		test('examples are found by code and read by file name', () => {
			const kb = loadKnowledgeBase({ extraRoots: [folder] });
			const hits = kb.findExamples('Source_Box');
			expect(hits[0].example.name).toBe('Demo_panel_01.4dm');
			expect(hits[0].matches[0]).toContain('Source_Box');
			expect(kb.getExample('demo_panel_01')?.id).toBe('Macro_Projects/Demo/Demo_panel_01.4dm');
			expect(kb.getExample('Demo_utils.H')).toBeDefined();
		});
	});
});

// ─── Function catalog ───────────────────────────────────────────────────────

describe('function catalog', () => {
	test('lookup is case-insensitive and returns overloads and notes', () => {
		const found = catalog.lookup('model_exists');
		expect(found?.name).toBe('Model_exists');
		expect(found!.overloads.length).toBeGreaterThanOrEqual(2);
		expect(found!.notes.length).toBeGreaterThan(0);
	});

	test('overloads that do different things keep their own descriptions', () => {
		const found = catalog.lookup('Get_length')!;
		expect(found.overloadDescriptions.length).toBeGreaterThan(1);
		const element = found.overloadDescriptions.find(d => d.overload.parameters[0]?.type === 'Element');
		expect(element?.description).toMatch(/length/i);
		expect(catalog.lookup('Model_prompt')!.overloadDescriptions.length).toBeLessThanOrEqual(1);
	});

	test('lookup lists overloads with reference parameters', () => {
		const found = catalog.lookup('Get_name')!;
		expect(found.overloads.some(o => o.parameters.some(p => p.name.includes('&') || p.type.includes('&')))).toBe(true);
	});

	test('unknown names get close spellings', () => {
		expect(catalog.lookup('Create_modelbox')).toBeUndefined();
		expect(catalog.suggest('Create_modelbox')).toContain('Create_model_box');
	});

	test('internal entry points are not listed', () => {
		expect(catalog.resolveName('__Drainage_000001__')).toBeUndefined();
	});

	test('search finds functions by purpose', () => {
		const hits = catalog.search('tin height', 5);
		expect(hits[0].name).toBe('Tin_height');
		expect(catalog.search('Create_model_box', 1)[0].name).toBe('Create_model_box');
	});
});

// ─── Gotcha rules ───────────────────────────────────────────────────────────

describe('gotcha rules', () => {
	test('maskSource blanks comments and string contents but keeps offsets', () => {
		const text = 'Text a = "x // y"; // c "q"\n/* "z" */ Integer b;';
		const { masked, literals } = maskSource(text);
		expect(masked.length).toBe(text.length);
		expect(masked).not.toContain('//');
		expect(masked).toContain('Integer b;');
		expect(literals.map(l => l.value)).toEqual(['x // y']);
	});

	test('missing functions', () => {
		expect(rules('void main(){ Print_error("x"); }')).toContain('print-error');
		expect(rules('void main(){ Attributes a = Create_attributes(); }')).toContain('create-attributes');
		expect(rules('void main(){ Start_timer(1); }')).toContain('start-timer');
		expect(rules('void main(){ Real d; Get_pipe_diameter(e, d); }')).toContain('obsolete-get-pipe-diameter');
		expect(rules('void main(){ // Print_error("x");\n}')).not.toContain('print-error');
	});

	test('adjacent string literals', () => {
		expect(rules('Text t = "a" "b";')).toContain('adjacent-string-literals');
		expect(rules('Text t = "a" + "b";')).not.toContain('adjacent-string-literals');
	});

	test('inline ternary in a concatenation', () => {
		expect(rules('Text t = " ]}" + ((is_last) ? "" : ",");')).toContain('inline-ternary-concat');
		expect(rules('t += (n == 0 ? "M" : "L");')).toContain('inline-ternary-concat');
		expect(rules('Text t = (n == 0 ? "M" : "L") + "x";')).toContain('inline-ternary-concat');
		expect(rules('Text cmd = (n == 0) ? "M" : "L";')).not.toContain('inline-ternary-concat');
		expect(rules('Text t = "a" + f(n == 0 ? 1 : 2);')).not.toContain('inline-ternary-concat');
	});

	test('Model_exists / Tin_exists compared to Validate codes', () => {
		expect(rules('if(Model_exists(name) == MODEL_EXISTS) x = 1;')).toContain('exists-vs-validate-code');
		expect(rules('if(Tin_exists(Get_name(t)) == TIN_EXISTS) x = 1;')).toContain('exists-vs-validate-code');
		expect(rules('if(Model_exists(name) != 0) x = 1;')).not.toContain('exists-vs-validate-code');
	});

	test('single-argument Prompt in a panel macro', () => {
		const panel = 'void main(){ Wait_on_events(id, cmd, msg); Prompt("done"); Prompt("name", value); }';
		const found = checkGotchas(panel).filter(f => f.rule === 'prompt-in-panel');
		expect(found.length).toBe(1);
		expect(rules('void main(){ Prompt("done"); }')).not.toContain('prompt-in-panel');
	});

	test('long and non-ASCII string literals', () => {
		expect(rules(`Text t = "${'x'.repeat(520)}";`)).toContain('long-string-literal');
		expect(rules('Text t = "short";')).not.toContain('long-string-literal');
		expect(rules('Text t = "45°";')).toContain('non-ascii-literal');
	});

	test('must-exist flags on model and tin boxes', () => {
		expect(rules('Model_Box b = Create_model_box("Model", msg, CHECK_MODEL_MUST_EXIST);')).toContain('must-exist-focus-trap');
		expect(rules('Tin_Box b = Create_tin_box("Tin", msg, 8);')).toContain('must-exist-focus-trap');
		expect(rules('Model_Box b = Create_model_box("Model", msg, 0);')).not.toContain('must-exist-focus-trap');
	});

	test('Get_data on a Named_Tick_Box', () => {
		expect(rules('Named_Tick_Box a, tick; Integer v; Get_data(tick, v);')).toContain('named-tick-get-data');
		expect(rules('Named_Tick_Box tick; Integer v; Validate(tick, v);')).not.toContain('named-tick-get-data');
	});

	test('Print without Show_console, in main files only', () => {
		expect(rules('void main(){ Print("x\\n"); }')).toContain('print-without-show-console');
		expect(rules('void main(){ Print("x\\n"); Show_console(1); }')).not.toContain('print-without-show-console');
		expect(rules('void report(){ Print("x\\n"); }')).not.toContain('print-without-show-console');
	});

	test('global handles in a panel macro', () => {
		const src = '{\n    Element g_elt;\n    Text g_name;\n}\nvoid main()\n{\n    Wait_on_events(id, cmd, msg);\n    Element local;\n}';
		const found = checkGotchas(src).filter(f => f.rule === 'global-handle-lock');
		expect(found.map(f => f.line)).toEqual([2]);
		expect(rules(src.replace('Wait_on_events(id, cmd, msg);', ''))).not.toContain('global-handle-lock');
	});

	test('&& does not short-circuit an array index or Tin_height guard', () => {
		expect(rules('while(j >= 1 && g_array[j] > key) j--;')).toContain('no-short-circuit');
		expect(rules('if(n >= 2 && Tin_height(tin2, x, y, z)) n = 0;')).toContain('no-short-circuit');
		expect(rules('if(j >= 1) { if(g_array[j] > key) j--; }')).not.toContain('no-short-circuit');
		expect(rules('if(x > 0 && arr[1] == 0) x = 0;')).not.toContain('no-short-circuit');
		expect(rules('if(i <= MAX && arr[MAX] == 0) x = 0;')).not.toContain('no-short-circuit');
	});

	test('findings carry 1-based positions', () => {
		const [finding] = checkGotchas('void main()\n{\n    Print_error("x");\n}');
		expect(finding).toMatchObject({ rule: 'print-error', line: 3, column: 5, severity: 'error' });
	});
});

// ─── Validation and scaffolding ─────────────────────────────────────────────

describe('validation and scaffolding', () => {
	let folder: string;
	let validator: MacroValidator;

	beforeAll(() => {
		folder = tempDir('validate');
		validator = new MacroValidator(readMcpConfig({ [MCP_ENV.workspaceFolder]: folder }), prototypes, catalog);
	});

	afterAll(() => fs.rmSync(folder, { recursive: true, force: true }));

	test('unknown functions are reported with suggestions', async () => {
		const result = await validator.validate({ code: 'void main()\n{\n    Model_Box b = Create_modelbox("M", msg, 0);\n}\n' });
		const unknown = result.diagnostics.find(d => d.message.startsWith("Function 'Create_modelbox' is not declared"));
		expect(unknown?.message).toContain('Create_model_box');
	});

	test('code is checked as if saved at path, so relative includes resolve', async () => {
		fs.mkdirSync(path.join(folder, 'includes'), { recursive: true });
		fs.writeFileSync(path.join(folder, 'includes', 'helpers.H'), 'Integer my_helper(Integer a)\n{\n    return a;\n}\n');
		const code = '#include "includes/helpers.H"\nvoid main()\n{\n    Integer x = my_helper(1);\n}\n';
		const result = await validator.validate({ filePath: path.join(folder, 'main.4dm'), code });
		expect(result.includeFiles.length).toBe(1);
		expect(result.diagnostics.filter(d => d.severity === 'error')).toEqual([]);
	});

	test('project headers are checked for gotchas when the main file is validated', async () => {
		const project = path.join(folder, 'HeaderGotcha');
		fs.mkdirSync(path.join(project, 'includes'), { recursive: true });
		fs.writeFileSync(path.join(project, 'includes', 'work.H'), 'void work(Integer last)\n{\n    Print("a" + ((last) ? "" : ","));\n}\n');
		const main = path.join(project, 'main.4dm');
		fs.writeFileSync(main, '#include "includes/work.H"\nvoid main()\n{\n    work(1);\n    Show_console(1);\n}\n');

		const result = await validator.validate({ filePath: main });
		expect(result.checkedIncludes).toEqual([path.join(project, 'includes', 'work.H')]);
		const finding = result.diagnostics.find(d => d.rule === 'inline-ternary-concat');
		expect(finding).toMatchObject({ file: path.join(project, 'includes', 'work.H'), line: 3 });
		expect(finding?.sourceLine).toContain('Print("a"');
	});

	test('headers outside the macro folder are not gotcha-checked', async () => {
		const shared = path.join(folder, 'shared');
		fs.mkdirSync(shared, { recursive: true });
		fs.writeFileSync(path.join(shared, 'lib.H'), 'void lib(Integer last)\n{\n    Print("a" + ((last) ? "" : ","));\n}\n');
		const project = path.join(folder, 'UsesShared');
		fs.mkdirSync(project, { recursive: true });
		const main = path.join(project, 'main.4dm');
		fs.writeFileSync(main, '#include "../shared/lib.H"\nvoid main()\n{\n    lib(1);\n}\n');

		const result = await validator.validate({ filePath: main });
		expect(result.includeFiles.length).toBe(1);
		expect(result.checkedIncludes).toEqual([]);
		expect(result.diagnostics.some(d => d.rule === 'inline-ternary-concat')).toBe(false);
	});

	test('gotcha findings are merged with language-server diagnostics', async () => {
		const result = await validator.validate({ code: 'void main()\n{\n    Integer last = 1;\n    Text s = "a" + ((last) ? "" : ",");\n}\n' });
		expect(result.diagnostics.map(d => d.rule)).toContain('inline-ternary-concat');
	});

	test('scaffold rejects bad names and kinds', () => {
		expect(() => scaffoldMacro({ name: '1bad', kind: 'panel' })).toThrow();
		expect(() => scaffoldMacro({ name: 'ok', kind: 'nope' as any })).toThrow();
	});

	test('scaffold follows the project layout', () => {
		const s = scaffoldMacro({ name: 'Sum_lengths', kind: 'panel', description: 'Sums lengths', date: new Date(2026, 9, 22) });
		expect(s.files.map(f => f.path)).toEqual([
			'Sum_lengths/Sum_lengths_panel_01.4dm',
			'Sum_lengths/includes/Sum_lengths_globals.H',
			'Sum_lengths/includes/Sum_lengths_utils.H',
			'Sum_lengths/includes/Sum_lengths_process.H',
		]);
		expect(s.files[0].content).toContain('// Date                 22/10/26');
		expect(s.files[0].content).toContain('Create_model_box("Model", message, 0)');
		expect(s.files[1].content).toContain('#ifndef SUM_LENGTHS_GLOBALS_H');
		expect(scaffoldMacro({ name: 'X', kind: 'headless' }).mainFile).toBe('X/X_01.4dm');
	});

	for (const kind of MACRO_KINDS) {
		test(`${kind} scaffold validates with no errors or warnings`, async () => {
			const scaffold = scaffoldMacro({ name: `Kind_${kind}`, kind });
			const written = writeScaffold(scaffold, folder);
			for (const file of written) {
				const result = await validator.validate({ filePath: file });
				const problems = result.diagnostics.filter(d => d.severity === 'error' || d.severity === 'warning');
				expect({ file: path.basename(file), problems }).toEqual({ file: path.basename(file), problems: [] });
			}
		});
	}

	test('writeScaffold refuses to overwrite', () => {
		const scaffold = scaffoldMacro({ name: 'Twice', kind: 'headless' });
		writeScaffold(scaffold, folder);
		expect(() => writeScaffold(scaffold, folder)).toThrow(/Refusing to overwrite/);
	});

	const compilerExe = path.join(DEFAULT_COMPILER_FOLDER, 'cc4d.exe');
	test.skipIf(process.platform !== 'win32' || !fs.existsSync(compilerExe))('every scaffold compiles with cc4d', async () => {
		for (const kind of MACRO_KINDS) {
			const scaffold = scaffoldMacro({ name: `Cc4d_${kind}`, kind });
			writeScaffold(scaffold, folder);
			const result = await compileMacro(path.join(folder, scaffold.mainFile), { compilerFolder: DEFAULT_COMPILER_FOLDER, includePaths: [], flags: [] });
			expect({ kind, success: result.success, output: result.output }).toEqual({ kind, success: true, output: '' });
			expect(result.outputFile).toBeDefined();
		}
	}, 120000);
});

// ─── Compiler output ────────────────────────────────────────────────────────

describe('compiler output', () => {
	test('parses compiler and preprocessor errors', () => {
		const output = [
			'probe.4dm:1: set_ups.h: file not found',
			'"probe.4dm", line 4.38: error: CHECK_MODEL_MUST_EXIST not defined on line 4.15',
			'"inc\\util.H", line 9.2: warning: variable shadows',
			'',
			'2 errors',
		].join('\r\n');
		const cwd = path.resolve(os.tmpdir(), 'macro');
		expect(parseCompilerOutput(output, cwd)).toEqual([
			{ file: path.resolve(cwd, 'probe.4dm'), line: 1, severity: 'error', message: 'set_ups.h: file not found' },
			{ file: path.resolve(cwd, 'probe.4dm'), line: 4, column: 38, severity: 'error', message: 'CHECK_MODEL_MUST_EXIST not defined on line 4.15' },
			{ file: path.resolve(cwd, 'inc\\util.H'), line: 9, column: 2, severity: 'warning', message: 'variable shadows' },
		]);
	});

	test('splits flag entries into arguments', () => {
		expect(splitCommandLineArgs('-log "build log.txt"')).toEqual(['-log', 'build log.txt']);
		expect(splitCommandLineArgs('-proto')).toEqual(['-proto']);
	});

	test('rejects non-.4dm files before running anything', async () => {
		if (process.platform !== 'win32') return;
		const folder = tempDir('compile');
		const header = path.join(folder, 'x.H');
		fs.writeFileSync(header, '');
		const options = { compilerFolder: folder, includePaths: [], flags: [] };
		await expect(compileMacro(header, options)).rejects.toThrow(/cc4d.exe/);
		fs.rmSync(folder, { recursive: true, force: true });
	});
});

// ─── End-to-end stdio session ───────────────────────────────────────────────

describe('MCP stdio server', () => {
	let child: ChildProcessWithoutNullStreams;
	const nonJsonLines: string[] = [];
	const pending = new Map<number, (message: any) => void>();
	let nextId = 1;

	const request = (method: string, params: object = {}) => new Promise<any>((resolve, reject) => {
		const id = nextId++;
		const timer = setTimeout(() => reject(new Error(`${method} timed out`)), 60000);
		pending.set(id, message => {
			clearTimeout(timer);
			resolve(message);
		});
		child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
	});

	const callTool = async (name: string, args: object) => {
		const response = await request('tools/call', { name, arguments: args });
		return { text: response.result.content.map((c: any) => c.text).join('\n') as string, isError: !!response.result.isError };
	};

	let initialize: any;

	beforeAll(async () => {
		child = spawn(process.execPath, [path.join(root, 'server', 'src', 'mcpServer.ts')], {
			env: { ...process.env, [MCP_ENV.version]: '9.9.9' },
			stdio: ['pipe', 'pipe', 'pipe'],
		});
		let buffer = '';
		child.stdout.on('data', data => {
			buffer += String(data);
			let newline: number;
			while ((newline = buffer.indexOf('\n')) >= 0) {
				const line = buffer.slice(0, newline).trim();
				buffer = buffer.slice(newline + 1);
				if (!line) continue;
				let message: any;
				try {
					message = JSON.parse(line);
				} catch {
					nonJsonLines.push(line);
					continue;
				}
				pending.get(message.id)?.(message);
				pending.delete(message.id);
			}
		});
		initialize = await request('initialize', {
			protocolVersion: '2025-06-18',
			capabilities: {},
			clientInfo: { name: 'bun-test', version: '1.0.0' },
		});
		child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' })}\n`);
	}, 60000);

	afterAll(() => child?.kill());

	test('initialize returns server info and the always-on rules', () => {
		expect(initialize.result.serverInfo).toMatchObject({ name: '12dpl-macro-assistant', version: '9.9.9' });
		expect(initialize.result.instructions).toContain('do not short-circuit');
	});

	test('lists the tools, knowledge resources and prompts', async () => {
		const tools = (await request('tools/list')).result.tools.map((t: any) => t.name);
		expect(tools.sort()).toEqual([
			'compile_macro', 'find_examples', 'get_macro_guide', 'lookup_function', 'read_example',
			'read_knowledge', 'scaffold_macro', 'search_functions', 'search_knowledge', 'validate_macro',
		]);
		const resources = (await request('resources/list')).result.resources.map((r: any) => r.uri);
		expect(resources).toContain('12dpl://knowledge/guide/instructions');
		const prompts = (await request('prompts/list')).result.prompts.map((p: any) => p.name);
		expect(prompts.sort()).toEqual(['create_macro', 'review_macro']);
	});

	test('lookup_function returns signatures and knowledge notes', async () => {
		const { text, isError } = await callTool('lookup_function', { name: 'Model_exists, Create_modelbox' });
		expect(isError).toBe(false);
		expect(text).toContain('Integer Model_exists(Text');
		expect(text).toContain('Notes from the macro knowledge base');
		expect(text).toContain('Similar names: Create_model_box');
	});

	test('get_macro_guide serves the essentials', async () => {
		const { text } = await callTool('get_macro_guide', { topic: 'essentials' });
		expect(text).toContain('Key Differences from C');
		expect(text).toContain('Runtime crashes that compile clean');
	});

	test('search_knowledge and read_knowledge work together', async () => {
		const search = await callTool('search_knowledge', { query: 'Choice_Box', scope: 'doc', limit: 1 });
		const id = /`(docs\/[^`]+#[^`]+)`/.exec(search.text)?.[1];
		expect(id).toBeDefined();
		const section = await callTool('read_knowledge', { id });
		expect(section.text).toContain(`<!-- ${id}`);
		const outline = await callTool('read_knowledge', { id: 'docs/panel-widgets' });
		expect(outline.text).toContain('Read a section with read_knowledge');
	});

	test('validate_macro reports gotchas', async () => {
		const { text } = await callTool('validate_macro', { code: 'void main()\n{\n    Print_error("x");\n}\n' });
		expect(text).toContain('[print-error]');
	});

	test('scaffold_macro returns files when no directory is given', async () => {
		const { text } = await callTool('scaffold_macro', { name: 'Demo', kind: 'source_box' });
		expect(text).toContain('### Demo/Demo_panel_01.4dm');
		expect(text).toContain('Create_source_box');
	});

	test('tool failures come back as tool errors', async () => {
		const { text, isError } = await callTool('read_example', { name: 'does_not_exist' });
		expect(isError).toBe(true);
		expect(text).toStartWith('Error:');
	});

	test('prompts expand with their arguments', async () => {
		const response = await request('prompts/get', { name: 'create_macro', arguments: { description: 'sum string lengths per model' } });
		expect(response.result.messages[0].content.text).toContain('sum string lengths per model');
	});

	test('nothing but protocol messages is written to stdout', () => {
		expect(nonJsonLines).toEqual([]);
	});
});
