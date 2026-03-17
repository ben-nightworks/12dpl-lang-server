import type {
	CompletionItem,
	Connection,
	TextDocumentPositionParams
} from 'vscode-languageserver/node';
import { CompletionItemKind, InsertTextFormat, TextEdit } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import * as fs from 'fs';
import * as path from 'path';

import type { DocumentService } from '../services/documentService';
import type { IncludeService } from '../services/includeService';
import type { PrototypeService } from '../services/prototypeService';
import { typeDocumentation } from '../data/typeDocumentation.js';
import { fileUriToFsPath } from '../services/includeUtils.js';
import { buildFunctionCallSnippet, fuzzyScore, getWordAtPosition } from '../core/utils.js';
import type { SymbolDeclaration } from '../core/types';

type IncludePathContext = {
	startCharacter: number;
	endCharacter: number;
	prefix: string;
};

/**
 * Detects whether the cursor is currently inside a `#include "..."` or `#include <...>` path.
 * When present, completion should suggest filesystem paths instead of symbols.
 */
function getIncludePathContext(textDocument: TextDocument, position: { line: number; character: number }): IncludePathContext | null {
	const lineText = textDocument.getText().split('\n')[position.line] ?? '';
	// Match: optional whitespace, #include, optional whitespace, then " or <, then anything not closing delimiter.
	const match = /^\s*#\s*include\s*([<"])([^>"]*)/.exec(lineText);
	if (!match) return null;

	const openDelim = match[1];
	const openIndex = lineText.indexOf(openDelim);
	if (openIndex < 0) return null;

	const startCharacter = openIndex + 1;
	if (position.character < startCharacter) return null;

	// If a closing delimiter is present, don't trigger when cursor is after it.
	const closeDelim = openDelim === '<' ? '>' : '"';
	const closeIndex = lineText.indexOf(closeDelim, startCharacter);
	if (closeIndex !== -1 && position.character > closeIndex) return null;

	const endCharacter = position.character;
	const prefix = lineText.substring(startCharacter, endCharacter);
	return { startCharacter, endCharacter, prefix };
}

function listIncludePathCompletionItems(opts: {
	documentFsPath: string;
	ctx: IncludePathContext;
	uri: string;
	line: number;
}): CompletionItem[] {
	const { documentFsPath, ctx, uri, line } = opts;
	void uri;
	const baseDir = path.dirname(documentFsPath);

	// Support completing into subdirectories: prefixDir/partialName
	const normalizedPrefix = ctx.prefix.replace(/\\/g, '/');
	const lastSlash = normalizedPrefix.lastIndexOf('/');
	const prefixDir = lastSlash >= 0 ? normalizedPrefix.slice(0, lastSlash) : '';
	const partial = lastSlash >= 0 ? normalizedPrefix.slice(lastSlash + 1) : normalizedPrefix;
	const dirOnDisk = prefixDir.length ? path.join(baseDir, prefixDir) : baseDir;

	let entries: fs.Dirent[] = [];
	try {
		entries = fs.readdirSync(dirOnDisk, { withFileTypes: true });
	} catch {
		return [];
	}

	const range = {
		start: { line, character: ctx.startCharacter },
		end: { line, character: ctx.endCharacter }
	};

	const items: CompletionItem[] = [];
	for (const entry of entries) {
		const name = entry.name;
		if (partial.length) {
			const score = fuzzyScore(partial, name);
			if (score == null) continue;
		}

		// Keep suggestions tight: primarily headers and folders.
		if (entry.isFile() && !name.toLowerCase().endsWith('.h')) continue;

		const label = name + (entry.isDirectory() ? '/' : '');
		const insertPath = (prefixDir.length ? `${prefixDir}/${name}` : name) + (entry.isDirectory() ? '/' : '');

		items.push({
			label,
			kind: entry.isDirectory() ? CompletionItemKind.Folder : CompletionItemKind.File,
			detail: entry.isDirectory() ? 'Include folder' : 'Include file',
			textEdit: TextEdit.replace(range as any, insertPath),
		});
	}

	return items;
}


function buildDefineSnippet(name: string, params: string[] | undefined): { insertText: string; insertTextFormat: InsertTextFormat } {
	if (!params || !params.length) {
		return { insertText: name, insertTextFormat: InsertTextFormat.PlainText };
	}
	const placeholders = params.map((p, i) => `\${${i + 1}:${p}}`).join(', ');
	return { insertText: `${name}(${placeholders})$0`, insertTextFormat: InsertTextFormat.Snippet };
}

function defineToCompletionItem(def: SymbolDeclaration): CompletionItem {
	const { insertText, insertTextFormat } = buildDefineSnippet(def.name, def.defineParams);
	const sig = def.defineParams?.length
		? `#define ${def.name}(${def.defineParams.join(', ')})${def.value ? ` ${def.value}` : ''}`
		: `#define ${def.name}${def.value ? ` ${def.value}` : ''}`;
	return {
		label: def.name,
		kind: def.defineParams?.length ? CompletionItemKind.Function : CompletionItemKind.Constant,
		detail: sig,
		insertTextFormat,
		insertText,
		data: {
			source: 'define',
			kind: def.defineParams?.length ? 'function' : 'object',
			name: def.name,
			params: def.defineParams,
			value: def.value,
			definedInFsPath: def.definedInFsPath
		}
	};
}

export function registerCompletionProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentService: DocumentService;
	includeService: IncludeService;
	prototypeService: PrototypeService;
}): void {
	/**
	 * NOTE: This provider intentionally returns a fully-ranked completion list.
	 * VS Code will still apply some client-side heuristics, so we set `filterText`/`sortText` when fuzzing.
	 */
	const { connection, documents, documentService, includeService, prototypeService } = opts;

	const getLabelText = (item: CompletionItem): string => {
		return typeof item.label === 'string' ? item.label : String(item.label);
	};

	const getSymbolName = (item: CompletionItem): string => {
		return (typeof item.filterText === 'string' && item.filterText.length) ? item.filterText : getLabelText(item);
	};

	connection.onCompletion(async (textDocumentPosition: TextDocumentPositionParams): Promise<CompletionItem[]> => {
		const doc = documents.get(textDocumentPosition.textDocument.uri);
		if (doc) {
			const ctx = getIncludePathContext(doc, textDocumentPosition.position);
			if (ctx) {
				const fsPath = fileUriToFsPath(doc.uri);
				if (fsPath) {
					const includePathItems = listIncludePathCompletionItems({
						documentFsPath: fsPath,
						ctx,
						uri: doc.uri,
						line: textDocumentPosition.position.line
					});
					// When completing an include path, don't mix in symbol completions.
					return includePathItems;
				}
			}
		}

		const query = doc ? (getWordAtPosition(doc, textDocumentPosition.position) ?? '') : '';

		const uri = textDocumentPosition.textDocument.uri;

		// 1. Document symbols from DerivedViews
		const symbolItems: CompletionItem[] = [];
		const views = documentService.getDerivedViews(uri);
		if (views) {
			for (const [, decls] of views.exportedFunctions) {
				const fn = decls[0];
				const callSig = typeof fn.signature === 'string' ? (fn.signature.match(/\([^)]*\)\s*$/)?.[0] ?? '') : '';
				const displayLabel = callSig ? `${fn.name} ${callSig}` : fn.name;
				symbolItems.push({
					label: displayLabel,
					kind: CompletionItemKind.Function,
					detail: fn.signature,
					filterText: fn.name,
					insertTextFormat: InsertTextFormat.Snippet,
					insertText: buildFunctionCallSnippet(fn.name, fn.params),
					data: { source: 'document', kind: 'function', signature: fn.signature }
				});
			}
			for (const [, v] of views.exportedVariables) {
				symbolItems.push({
					label: v.name,
					kind: CompletionItemKind.Variable,
					detail: v.type ? `${v.type} ${v.name}` : 'Variable',
					data: { source: 'document', kind: 'variable', type: v.type }
				});
			}
		}

		// 2. Defines (document + includes)
		const defineItems: CompletionItem[] = [];
		const seenDefines = new Set<string>();
		for (const def of documentService.getDefines(uri)) {
			if (seenDefines.has(def.name)) continue;
			seenDefines.add(def.name);
			defineItems.push(defineToCompletionItem(def));
		}
		for (const def of await includeService.getIncludeDefines(uri)) {
			if (seenDefines.has(def.name)) continue;
			seenDefines.add(def.name);
			defineItems.push(defineToCompletionItem(def));
		}

		// 3. Include symbols
		const includeItems: CompletionItem[] = [];
		const includeSymbols = await includeService.getIncludeSymbols(uri);
		for (const [, decls] of includeSymbols.functions) {
			const fn = decls[0];
			if (!fn) continue;
			const callSig = typeof fn.signature === 'string' ? (fn.signature.match(/\([^)]*\)\s*$/)?.[0] ?? '') : '';
			const displayLabel = callSig ? `${fn.name} ${callSig}` : fn.name;
			includeItems.push({
				label: displayLabel,
				kind: CompletionItemKind.Function,
				detail: fn.signature,
				filterText: fn.name,
				insertTextFormat: InsertTextFormat.Snippet,
				insertText: buildFunctionCallSnippet(fn.name, fn.params),
				data: { source: 'include', kind: 'function', signature: fn.signature }
			});
		}
		for (const [, v] of includeSymbols.variables) {
			includeItems.push({
				label: v.name,
				kind: CompletionItemKind.Variable,
				detail: v.type ? `${v.type} ${v.name}` : 'Variable (include)',
				data: { source: 'include', kind: 'variable', type: v.type }
			});
		}

		// 4. Prototypes (pre-built by PrototypeService)
		const prototypeItems = prototypeService.getCompletionItems();

		// Combine with keyword completions
		const keywordItems: CompletionItem[] = [
			{
				label: '#include',
				kind: CompletionItemKind.Keyword,
				detail: 'Preprocessor include directive',
				insertTextFormat: InsertTextFormat.Snippet,
				insertText: '#include "${1:header.h}"$0',
				filterText: 'include',
				data: { source: 'keyword', kind: 'directive', name: '#include' }
			},
			{
				label: 'include',
				kind: CompletionItemKind.Keyword,
				detail: 'Preprocessor include directive',
				insertTextFormat: InsertTextFormat.Snippet,
				insertText: '#include "${1:header.h}"$0',
				filterText: 'include',
				data: { source: 'keyword', kind: 'directive', name: '#include' }
			},
			{
				label: '#define',
				kind: CompletionItemKind.Keyword,
				detail: 'Preprocessor macro definition',
				insertTextFormat: InsertTextFormat.Snippet,
				insertText: '#define ${1:NAME} ${2:value}$0',
				filterText: 'define',
				data: { source: 'keyword', kind: 'directive', name: '#define' }
			},
			{
				label: 'define',
				kind: CompletionItemKind.Keyword,
				detail: 'Preprocessor macro definition',
				insertTextFormat: InsertTextFormat.Snippet,
				insertText: '#define ${1:NAME} ${2:value}$0',
				filterText: 'define',
				data: { source: 'keyword', kind: 'directive', name: '#define' }
			},
			{ label: 'if', kind: CompletionItemKind.Keyword, detail: 'Conditional statement', data: 1 },
			{ label: 'else', kind: CompletionItemKind.Keyword, detail: 'Else clause', data: 2 },
			{ label: 'while', kind: CompletionItemKind.Keyword, detail: 'While loop', data: 3 },
			{ label: 'for', kind: CompletionItemKind.Keyword, detail: 'For loop', data: 4 },
			{ label: 'return', kind: CompletionItemKind.Keyword, detail: 'Return statement', data: 5 },
			{ label: 'void', kind: CompletionItemKind.Keyword, detail: 'Void return type', data: 6 },
			{ label: 'int', kind: CompletionItemKind.Keyword, detail: 'Integer type', data: 7 },
			{ label: 'double', kind: CompletionItemKind.Keyword, detail: 'Double type', data: 8 }
		];

		// Add type completions
		const typeItems: CompletionItem[] = Object.keys(typeDocumentation).map((type) => ({
			label: type,
			kind: CompletionItemKind.Class,
			detail: '12dPL Type',
			data: type
		}));

		// De-dupe by label while preserving priority (document symbols first).
		const seen = new Set<string>();
		const out: CompletionItem[] = [];
		for (const originalItem of [...symbolItems, ...defineItems, ...includeItems, ...keywordItems, ...typeItems, ...prototypeItems]) {
			const key = getSymbolName(originalItem);
			if (seen.has(key)) continue;
			seen.add(key);
			// Clone to avoid mutating cached/shared items (e.g. prototypes).
			out.push({ ...originalItem });
		}

		// Fuzzy filter: allow non-prefix matches by subsequence scoring.
		// Also set filterText=query for returned items so VS Code's client-side prefix filtering doesn't hide them.
		const q = query.trim();
		if (q.length >= 2) {
			const groupPriority = (item: CompletionItem): number => {
				const data: any = (item as any).data;
				if (data && typeof data === 'object' && typeof data.source === 'string') {
					// Highest priority: in-document and included-file functions/variables.
					if (data.source === 'document') return 600;
					if (data.source === 'include') return 590;
					// Lower than symbols: preprocessor defines/directives.
					if (data.source === 'define') return 350;
					if (data.source === 'keyword') return 200;
				}
				// Heuristics for items without structured data.
				if (item.kind === CompletionItemKind.Class) return 180; // types
				if (item.kind === CompletionItemKind.Function) return 160; // prototypes (data is string)
				return 100;
			};

			const qLower = q.toLowerCase();
			const scored: Array<{ item: CompletionItem; score: number; group: number; label: string }> = [];
			for (const item of out) {
				const label = getSymbolName(item);
				const candidate = (typeof item.filterText === 'string' && item.filterText.length) ? item.filterText : label;
				let s = fuzzyScore(q, candidate) ?? fuzzyScore(q, label);
				if (s == null) continue;

				// Strong bonuses for exact/prefix matches to mimic common IntelliSense behavior.
				const labelLower = label.toLowerCase();
				if (labelLower === qLower) s += 5000;
				else if (labelLower.startsWith(qLower)) s += 2000;
				else if (labelLower.includes(qLower)) s += 200;

				scored.push({ item, score: s, group: groupPriority(item), label });
			}

			scored.sort((a, b) => {
				if (a.group !== b.group) return b.group - a.group;
				if (a.score !== b.score) return b.score - a.score;
				return a.label.localeCompare(b.label);
			});

			for (const s of scored) {
				// Ensure VS Code keeps these items visible when query isn't a strict prefix.
				s.item.filterText = q;
				// Enforce ordering: lower sortText sorts first.
				const groupRank = (999 - Math.max(0, Math.min(999, s.group))).toString().padStart(3, '0');
				const scoreRank = (999999 - Math.max(0, Math.min(999999, s.score))).toString().padStart(6, '0');
				s.item.sortText = `${groupRank}-${scoreRank}-${s.label}`;
			}

			return scored.map(x => x.item);
		}

		return out;
	});

	connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
		// Document symbols (from ANTLR) carry their own signature/type.
		const data: any = (item as any).data;
		if (data && typeof data === 'object' && (data.source === 'document' || data.source === 'include')) {
			if (data.kind === 'function' && typeof data.signature === 'string' && data.signature.length) {
				item.documentation = {
					kind: 'markdown',
					value: `\n\n\`\`\`12dpl\n${data.signature}\n\`\`\`\n`
				};
				return item;
			}
			if (data.kind === 'variable') {
				const labelText = getSymbolName(item);
				const line = typeof data.type === 'string' && data.type.length ? `${data.type} ${labelText}` : `${labelText}`;
				item.documentation = {
					kind: 'markdown',
					value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n`
				};
				return item;
			}
		}

		if (data && typeof data === 'object' && data.source === 'define') {
			const name = typeof data.name === 'string' ? data.name : getSymbolName(item);
			const params = Array.isArray(data.params) ? data.params : undefined;
			const value = typeof data.value === 'string' ? data.value : undefined;
			const definedIn = typeof data.definedInFsPath === 'string' ? data.definedInFsPath : undefined;
			const sig = params && params.length
				? `#define ${name}(${params.join(', ')})${value ? ` ${value}` : ''}`
				: `#define ${name}${value ? ` ${value}` : ''}`;
			item.documentation = {
				kind: 'markdown',
				value: `${definedIn ? `Defined in: ${definedIn}\n\n` : ''}\`\`\`12dpl\n${sig}\n\`\`\``
			};
			return item;
		}

		// Try to get documentation from prototypes
		const prototype = prototypeService.getPrototype(getSymbolName(item));
		if (prototype) {
			item.documentation = {
				kind: 'markdown',
				value: prototypeService.generateDocumentation(prototype)
			};
			return item;
		}

		// Check if it's a documented type
		const labelText = getSymbolName(item);
		if (typeDocumentation[labelText]) {
			item.documentation = {
				kind: 'markdown',
				value: typeDocumentation[labelText]
			};
			return item;
		}

		// Fallback for keywords
		const keywordDocs: Record<string, string> = {
			'#include': '**Include Directive**\n\nInclude declarations from another file.\n\n```12dpl\n#include "set_ups.h"\n```',
			include: '**Include Directive**\n\nInclude declarations from another file.\n\n```12dpl\n#include "set_ups.h"\n```',
			'#define': '**Define Directive**\n\nDefine a preprocessor macro.\n\n```12dpl\n#define NAME value\n```',
			define: '**Define Directive**\n\nDefine a preprocessor macro.\n\n```12dpl\n#define NAME value\n```',
			if: '**Conditional Statement**\n\nExecute code block if condition is true.\n\n```12dpl\nif (condition) { ... }\n```',
			else: '**Else Clause**\n\nExecute code block if if condition is false.\n\n```12dpl\nelse { ... }\n```',
			while: '**While Loop**\n\nRepeatedly execute code while condition is true.\n\n```12dpl\nwhile (condition) { ... }\n```',
			for: '**For Loop**\n\nLoop with init, condition, and increment.\n\n```12dpl\nfor (init; condition; increment) { ... }\n```',
			return: '**Return Statement**\n\nReturn a value from function.\n\n```12dpl\nreturn value;\n```',
			void: '**Void Type**\n\nNo return value',
			int: '**Integer Type**\n\nWhole number',
			double: '**Double Type**\n\nFloating-point number'
		};

		const keywordDoc = keywordDocs[getSymbolName(item).toLowerCase()];
		if (keywordDoc) {
			item.documentation = {
				kind: 'markdown',
				value: keywordDoc
			};
		}

		return item;
	});
}
