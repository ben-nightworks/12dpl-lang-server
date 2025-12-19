/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
	TextEdit,
	Location
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import * as fs from 'fs';
import * as path from 'path';

import {
	Validator
} from './validator.js';

import {
	canonicalizeFsPath,
	collectRecursiveIncludeFiles,
	fileUriToFsPath,
	fsPathToFileUri
} from './includes.js';

import {
	prototypesLoader
} from './prototypes.js';

import {
	typeDocumentation
} from './documentation.js';

import {
	format12dplDocument
} from './formatter.js';

import {
	collectDocumentSymbolIndex,
	SymbolRange
} from './symbols.js';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

function getOpenDocumentTextForFsPath(fsPath: string): string | null {
	const target = canonicalizeFsPath(fsPath);
	for (const d of documents.all()) {
		const p = fileUriToFsPath(d.uri);
		if (!p) continue;
		if (canonicalizeFsPath(p) === target) return d.getText();
	}
	return null;
}

type DocumentSymbolCompletionCacheEntry = {
	version: number;
	items: CompletionItem[];
	byName: Map<string, { kind: 'function' | 'variable'; signature?: string; type?: string; range?: SymbolRange }>;
};

const documentSymbolCompletions: Map<string, DocumentSymbolCompletionCacheEntry> = new Map();

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;


type DocumentSymbolIndexCacheEntry = { version: number; index: ReturnType<typeof collectDocumentSymbolIndex> };
const documentSymbolIndexCache: Map<string, DocumentSymbolIndexCacheEntry> = new Map();

function getIndexForOpenDocumentFsPath(fsPath: string): ReturnType<typeof collectDocumentSymbolIndex> | null {
	const target = canonicalizeFsPath(fsPath);
	for (const d of documents.all()) {
		const p = fileUriToFsPath(d.uri);
		if (!p) continue;
		if (canonicalizeFsPath(p) !== target) continue;
		const cached = documentSymbolIndexCache.get(d.uri);
		if (cached && cached.version === d.version) return cached.index;
		const idx = collectDocumentSymbolIndex(d.getText());
		documentSymbolIndexCache.set(d.uri, { version: d.version, index: idx });
		return idx;
	}
	return null;
}
connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Full,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ['.', '#']
			},
			// Tell the client that this server supports hover.
			hoverProvider: true,
			definitionProvider: true,
			documentFormattingProvider: true
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	// Load prototypes asynchronously
	prototypesLoader.load().catch((error) => {
		connection.console.error(`Failed to load prototypes: ${error}`);
	});

	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders((_event) => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface ServerSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ServerSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ServerSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ServerSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ServerSettings>(
			(change.settings.langServer || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ServerSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'langServer'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
	documentSymbolCompletions.delete(e.document.uri);
	documentSymbolIndexCache.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	updateSymbolCompletions(change.document);
	validateTextDocument(change.document);
});

function updateSymbolCompletions(textDocument: TextDocument): void {
	try {
		const index = collectDocumentSymbolIndex(textDocument.getText());
		documentSymbolIndexCache.set(textDocument.uri, { version: textDocument.version, index });

		const items: CompletionItem[] = [];
		const byName = new Map<string, { kind: 'function' | 'variable'; signature?: string; type?: string; range?: SymbolRange }>();

		for (const fn of Object.values(index.functions)) {
			items.push({
				label: fn.name,
				kind: CompletionItemKind.Function,
				detail: fn.signature,
				data: { source: 'document', kind: 'function', signature: fn.signature }
			});
			byName.set(fn.name, { kind: 'function', signature: fn.signature, range: fn.range });
		}
		for (const v of Object.values(index.variables)) {
			items.push({
				label: v.name,
				kind: CompletionItemKind.Variable,
				detail: v.type ? `${v.type} ${v.name}` : 'Variable (document)',
				data: { source: 'document', kind: 'variable', type: v.type }
			});
			byName.set(v.name, { kind: 'variable', type: v.type, range: v.range });
		}

		documentSymbolCompletions.set(textDocument.uri, {
			version: textDocument.version,
			items,
			byName
		});
	} catch {
		// Keep completions best-effort; don't break LSP on parse issues.
	}
}

function getSymbolCompletionItems(uri: string): CompletionItem[] {
	const doc = documents.get(uri);
	if (!doc) return [];

	const cached = documentSymbolCompletions.get(uri);
	if (cached && cached.version === doc.version) {
		return cached.items;
	}

	updateSymbolCompletions(doc);
	return documentSymbolCompletions.get(uri)?.items ?? [];
}

function getDocumentSymbolInfo(uri: string, name: string): { kind: 'function' | 'variable'; signature?: string; type?: string; range?: SymbolRange } | null {
	const doc = documents.get(uri);
	if (!doc) return null;

	const cached = documentSymbolCompletions.get(uri);
	if (!cached || cached.version !== doc.version) {
		updateSymbolCompletions(doc);
	}

	return documentSymbolCompletions.get(uri)?.byName.get(name) ?? null;
}
type HeaderIndexCacheEntry = {
	mtimeMs: number;
	index: ReturnType<typeof collectDocumentSymbolIndex>;
};

const headerIndexCache: Map<string, HeaderIndexCacheEntry> = new Map();

function getHeaderIndexForFsPath(fsPath: string): ReturnType<typeof collectDocumentSymbolIndex> | null {
	try {
		const stat = fs.statSync(fsPath);
		const key = canonicalizeFsPath(fsPath);
		const cached = headerIndexCache.get(key);
		if (cached && cached.mtimeMs === stat.mtimeMs) {
			return cached.index;
		}
		const text = fs.readFileSync(fsPath, 'utf-8');
		const index = collectDocumentSymbolIndex(text);
		headerIndexCache.set(key, { mtimeMs: stat.mtimeMs, index });
		return index;
	} catch {
		return null;
	}
}

function getAnyIndexForFsPath(fsPath: string): ReturnType<typeof collectDocumentSymbolIndex> | null {
	return getIndexForOpenDocumentFsPath(fsPath) ?? getHeaderIndexForFsPath(fsPath);
}

connection.onDefinition((params) => {
	const doc = documents.get(params.textDocument.uri);
	if (!doc) return null;

	const word = getWordAtPosition(doc, params.position);
	if (!word) return null;

	// Prefer current document symbol (function or variable)
	const local = getDocumentSymbolInfo(doc.uri, word);
	if (local?.range) {
		return Location.create(doc.uri, local.range as any);
	}

	const docPath = fileUriToFsPath(doc.uri);
	if (!docPath) return null;

	const readText = (fsPath: string): string | null => {
		const openText = getOpenDocumentTextForFsPath(fsPath);
		if (openText != null) return openText;
		try {
			return fs.readFileSync(fsPath, 'utf-8');
		} catch {
			return null;
		}
	};

	const includeFiles = collectRecursiveIncludeFiles(docPath, readText, { maxFiles: 500 });
	const results: Location[] = [];
	const seen = new Set<string>();

	const pushLocation = (candidateFsPath: string, range: SymbolRange) => {
		const uri = fsPathToFileUri(candidateFsPath);
		const key = `${uri}:${range.start.line}:${range.start.character}:${range.end.line}:${range.end.character}`;
		if (seen.has(key)) return;
		seen.add(key);
		results.push(Location.create(uri, range as any));
	};

	for (const candidate of includeFiles) {
		const idx = getAnyIndexForFsPath(candidate);
		if (!idx) continue;
		const fn = (idx.functions as any)[word];
		if (fn?.range) pushLocation(candidate, fn.range);
		const v = (idx.variables as any)[word];
		if (v?.range) pushLocation(candidate, v.range);
	}

	return results.length ? results : null;
});

connection.onDocumentFormatting((params) => {
	const document = documents.get(params.textDocument.uri);
	if (!document) {
		return [];
	}

	const formatted = format12dplDocument(document.getText(), params.options);
	const fullRange = {
		start: document.positionAt(0),
		end: document.positionAt(document.getText().length)
	};

	return [TextEdit.replace(fullRange, formatted)];
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// In this simple example we get the settings for every validate run.
	const settings = await getDocumentSettings(textDocument.uri);
	
	const text = textDocument.getText();

	const diagnostics: Diagnostic[] = Validator.Validate(text);
	
	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	(textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		const symbolItems = getSymbolCompletionItems(textDocumentPosition.textDocument.uri);

		// Get completions from loaded prototypes first
		const prototypeItems = prototypesLoader.getCompletionItems();
		
		// Combine with keyword completions
		const keywordItems: CompletionItem[] = [
			{
				label: 'if',
				kind: CompletionItemKind.Keyword,
				detail: 'Conditional statement',
				data: 1
			},
			{
				label: 'else',
				kind: CompletionItemKind.Keyword,
				detail: 'Else clause',
				data: 2
			},
			{
				label: 'while',
				kind: CompletionItemKind.Keyword,
				detail: 'While loop',
				data: 3
			},
			{
				label: 'for',
				kind: CompletionItemKind.Keyword,
				detail: 'For loop',
				data: 4
			},
			{
				label: 'return',
				kind: CompletionItemKind.Keyword,
				detail: 'Return statement',
				data: 5
			},
			{
				label: 'void',
				kind: CompletionItemKind.Keyword,
				detail: 'Void return type',
				data: 6
			},
			{
				label: 'int',
				kind: CompletionItemKind.Keyword,
				detail: 'Integer type',
				data: 7
			},
			{
				label: 'double',
				kind: CompletionItemKind.Keyword,
				detail: 'Double type',
				data: 8
			}
		];

		// Add type completions
		const typeItems: CompletionItem[] = Object.keys(typeDocumentation).map(type => ({
			label: type,
			kind: CompletionItemKind.Class,
			detail: '12dPL Type',
			data: type
		}));
		
		// De-dupe by label while preserving priority (document symbols first).
		const seen = new Set<string>();
		const out: CompletionItem[] = [];
		for (const item of [...symbolItems, ...keywordItems, ...typeItems, ...prototypeItems]) {
			const key = item.label;
			if (seen.has(key)) continue;
			seen.add(key);
			out.push(item);
		}
		return out;
	}
);

// This handler provides hover information for symbols.
connection.onHover(
	(textDocumentPositionParams) => {
		try {
			const textDocument = documents.get(textDocumentPositionParams.textDocument.uri);
			if (!textDocument) {
				return null;
			}

			const word = getWordAtPosition(textDocument, textDocumentPositionParams.position);
			if (!word) {
				return null;
			}

			// Check if it's a prototype
			const prototype = prototypesLoader.getPrototype(word);
			if (prototype) {
				const signature = prototypesLoader.getPrototypeSignature(word);
				return {
					contents: [
						{
							language: '12dpl',
							value: signature || word
						},
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
			const docSymbol = getDocumentSymbolInfo(textDocument.uri, word);
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
	}
);

// Helper function to get word at position
function getWordAtPosition(textDocument: TextDocument | undefined, position: any): string | null {
	if (!textDocument) {
		return null;
	}

	const line = textDocument.getText().split('\n')[position.line];
	if (!line) {
		return null;
	}

	let start = position.character;
	let end = position.character;

	while (start > 0 && /[a-zA-Z0-9_]/.test(line[start - 1])) {
		start--;
	}

	while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) {
		end++;
	}

	return line.substring(start, end);
}

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		// Document symbols (from ANTLR) carry their own signature/type.
		const data: any = (item as any).data;
		if (data && typeof data === 'object' && data.source === 'document') {
			if (data.kind === 'function' && typeof data.signature === 'string' && data.signature.length) {
				item.documentation = {
					kind: 'markdown',
					value: `\n\n\`\`\`12dpl\n${data.signature}\n\`\`\`\n`
				};
				return item;
			}
			if (data.kind === 'variable') {
				const line = typeof data.type === 'string' && data.type.length ? `${data.type} ${item.label}` : `${item.label}`;
				item.documentation = {
					kind: 'markdown',
					value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n`
				};
				return item;
			}
		}

		// Try to get documentation from prototypes (including overload selection).
		if (data && typeof data === 'object' && data.source === 'prototype') {
			const name = typeof data.name === 'string' ? data.name : item.label;
			const id = typeof data.id === 'number' ? data.id : undefined;
			const prototype = (typeof id === 'number')
				? prototypesLoader.getPrototypeOverload(name, id)
				: prototypesLoader.getPrototype(name);
			if (prototype) {
				item.documentation = {
					kind: 'markdown',
					value: prototypesLoader.generateDocumentation(prototype)
				};
				return item;
			}
		} else {
			const prototype = prototypesLoader.getPrototype(item.label);
			if (prototype) {
				item.documentation = {
					kind: 'markdown',
					value: prototypesLoader.generateDocumentation(prototype)
				};
				return item;
			}
		}

		// Check if it's a documented type
		if (typeDocumentation[item.label]) {
			item.documentation = {
				kind: 'markdown',
				value: typeDocumentation[item.label]
			};
			return item;
		}

		// Fallback for keywords
		const keywordDocs: Record<string, string> = {
			'if': '**Conditional Statement**\n\nExecute code block if condition is true.\n\n```12dpl\nif (condition) { ... }\n```',
			'else': '**Else Clause**\n\nExecute code block if if condition is false.\n\n```12dpl\nelse { ... }\n```',
			'while': '**While Loop**\n\nRepeatedly execute code while condition is true.\n\n```12dpl\nwhile (condition) { ... }\n```',
			'for': '**For Loop**\n\nLoop with init, condition, and increment.\n\n```12dpl\nfor (init; condition; increment) { ... }\n```',
			'return': '**Return Statement**\n\nReturn a value from function.\n\n```12dpl\nreturn value;\n```',
			'void': '**Void Type**\n\nNo return value',
			'int': '**Integer Type**\n\nWhole number',
			'double': '**Double Type**\n\nFloating-point number'
		};

		const keywordDoc = keywordDocs[item.label.toLowerCase()];
		if (keywordDoc) {
			item.documentation = {
				kind: 'markdown',
				value: keywordDoc
			};
		}

		return item;
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
