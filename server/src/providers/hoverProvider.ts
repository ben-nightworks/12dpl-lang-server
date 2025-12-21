import type { Connection, HoverParams } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { collectRecursiveIncludeFiles, fileUriToFsPath } from '../includes.js';

import { prototypesLoader } from '../prototypes.js';
import { typeDocumentation } from '../documentation.js';
import type { DocumentSymbolStore } from './documentSymbols.js';
import { getWordAtPosition } from './utils.js';
import { parseDefinesFromText, type DefineSymbolInfo } from './defines.js';
import type { FunctionSymbolInfo, VariableSymbolInfo } from '../symbols.js';

type IncludeSymbolHoverInfo =
	| { kind: 'function'; signature: string; definedInFsPath: string }
	| { kind: 'variable'; type?: string; name: string; definedInFsPath: string };

type IncludeHoverCacheEntry = {
	version: number;
	byName: Map<string, IncludeSymbolHoverInfo>;
};

type DefineHoverCacheEntry = {
	version: number;
	byName: Map<string, DefineSymbolInfo>;
};

/** Registers hover support for prototypes, types, symbols (local + includes), and `#define` macros. */
export function registerHoverProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentSymbols: DocumentSymbolStore;
}): void {
	const { connection, documents, documentSymbols } = opts;
	const includeHoverCache: Map<string, IncludeHoverCacheEntry> = new Map();
	const defineHoverCache: Map<string, DefineHoverCacheEntry> = new Map();

	const getIncludeSymbolHoverInfo = (uri: string, name: string): IncludeSymbolHoverInfo | null => {
		const doc = documents.get(uri);
		if (!doc) return null;

		const cached = includeHoverCache.get(uri);
		if (cached && cached.version === doc.version) {
			return cached.byName.get(name) ?? null;
		}

		const docFsPath = fileUriToFsPath(uri);
		if (!docFsPath) return null;

		const includeFiles = collectRecursiveIncludeFiles(
			docFsPath,
			(fsPath) => documentSymbols.getTextForFsPath(fsPath),
			{ maxFiles: 500 }
		);

		const byName = new Map<string, IncludeSymbolHoverInfo>();
		for (const includeFsPath of includeFiles) {
			const idx = documentSymbols.getIndexForFsPath(includeFsPath);
			if (!idx) continue;

			for (const fn of Object.values(idx.functions) as FunctionSymbolInfo[]) {
				if (byName.has(fn.name)) continue;
				byName.set(fn.name, {
					kind: 'function',
					signature: fn.signature,
					definedInFsPath: includeFsPath
				});
			}
			for (const v of Object.values(idx.variables) as VariableSymbolInfo[]) {
				if (byName.has(v.name)) continue;
				byName.set(v.name, {
					kind: 'variable',
					name: v.name,
					type: v.type,
					definedInFsPath: includeFsPath
				});
			}
		}

		includeHoverCache.set(uri, { version: doc.version, byName });
		return byName.get(name) ?? null;
	};

	const getDefineHoverInfo = (uri: string, name: string): DefineSymbolInfo | null => {
		const doc = documents.get(uri);
		if (!doc) return null;

		const cached = defineHoverCache.get(uri);
		if (cached && cached.version === doc.version) {
			return cached.byName.get(name) ?? null;
		}

		const docFsPath = fileUriToFsPath(uri);
		if (!docFsPath) return null;

		const byName = new Map<string, DefineSymbolInfo>();

		// Local defines
		for (const d of parseDefinesFromText(doc.getText(), docFsPath)) {
			if (!byName.has(d.name)) byName.set(d.name, d);
		}

		// Included defines
		const includeFiles = collectRecursiveIncludeFiles(
			docFsPath,
			(fsPath) => documentSymbols.getTextForFsPath(fsPath),
			{ maxFiles: 500 }
		);
		for (const includeFsPath of includeFiles) {
			const text = documentSymbols.getTextForFsPath(includeFsPath);
			if (text == null) continue;
			for (const d of parseDefinesFromText(text, includeFsPath)) {
				if (!byName.has(d.name)) byName.set(d.name, d);
			}
		}

		defineHoverCache.set(uri, { version: doc.version, byName });
		return byName.get(name) ?? null;
	};

	connection.onHover((textDocumentPositionParams: HoverParams) => {
		try {
			const textDocument = documents.get(textDocumentPositionParams.textDocument.uri);
			if (!textDocument) return null;

			const word = getWordAtPosition(textDocument, textDocumentPositionParams.position);
			if (!word) return null;

			// Check if it's a prototype
			const prototype = prototypesLoader.getPrototype(word);
			if (prototype) {
				const signature = prototypesLoader.getPrototypeSignature(word);
				return {
					contents: [
						{ language: '12dpl', value: signature || word },
						prototype.description || 'No description available'
					]
				};
			}

			// Check if it's a documented type
			if (typeDocumentation[word]) {
				return {
					contents: {
						kind: 'markdown',
						value: typeDocumentation[word]
					}
				};
			}

			// Check if it's a document symbol (variable/function)
			const docSymbol = documentSymbols.getSymbolInfo(textDocument.uri, word);
			if (docSymbol) {
				if (docSymbol.kind === 'function' && docSymbol.signature) {
					return {
						contents: {
							kind: 'markdown',
							value: `\n\n\`\`\`12dpl\n${docSymbol.signature}\n\`\`\`\n`
						}
					};
				}
				if (docSymbol.kind === 'variable') {
					const line = docSymbol.type ? `${docSymbol.type} ${word}` : word;
					return {
						contents: {
							kind: 'markdown',
							value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n`
						}
					};
				}
			}

			// Check if it's a #define macro (local or from includes)
			const def = getDefineHoverInfo(textDocument.uri, word);
			if (def) {
				const sig = def.params && def.params.length
					? `#define ${def.name}(${def.params.join(', ')})${def.value ? ` ${def.value}` : ''}`
					: `#define ${def.name}${def.value ? ` ${def.value}` : ''}`;
				return {
					contents: {
						kind: 'markdown',
						value: `**Preprocessor Macro**\n\n\`\`\`12dpl\n${sig}\n\`\`\`\n\nDefined in: ${def.definedInFsPath}`
					}
				};
			}

			// Check included files for symbols
			const includeSymbol = getIncludeSymbolHoverInfo(textDocument.uri, word);
			if (includeSymbol) {
				if (includeSymbol.kind === 'function') {
					return {
						contents: {
							kind: 'markdown',
							value: `\n\n\`\`\`12dpl\n${includeSymbol.signature}\n\`\`\`\n\nDefined in: ${includeSymbol.definedInFsPath}`
						}
					};
				}
				const line = includeSymbol.type ? `${includeSymbol.type} ${includeSymbol.name}` : includeSymbol.name;
				return {
					contents: {
						kind: 'markdown',
						value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n\nDefined in: ${includeSymbol.definedInFsPath}`
					}
				};
			}

			// Check if it's a keyword
			const keywords = ['if', 'else', 'while', 'for', 'return', 'void', 'int', 'double'];
			if (keywords.includes(word.toLowerCase())) {
				return {
					contents: `**Keyword:** ${word}`
				};
			}

			return null;
		} catch (e) {
			connection.console.error(`Hover error: ${e}`);
			return null;
		}
	});
}
