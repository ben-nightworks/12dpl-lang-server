/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * 12dPL language server entrypoint.
 *
 * Keeps LSP wiring here and delegates feature logic (completion/hover/formatting) to providers
 * in `server/src/providers`.
 */
import {
	createConnection,
	TextDocuments,
	Diagnostic,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	TextDocumentSyncKind,
	InitializeResult,
	Location
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import {
	Validator
} from './validator.js';

import {
	collectRecursiveIncludeFiles,
	fileUriToFsPath,
	fsPathToFileUri
} from './includes.js';

import {
	prototypesLoader
} from './prototypes.js';

import {
	SymbolRange
} from './symbols.js';

import { DocumentSymbolStore } from './providers/documentSymbols.js';
import { registerCompletionProvider } from './providers/completionProvider.js';
import { registerHoverProvider } from './providers/hoverProvider.js';
import { registerFormattingProvider } from './providers/formattingProvider.js';
import { getWordAtPosition } from './providers/utils.js';
import { parseDefinesFromText } from './providers/defines.js';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

const documentSymbols = new DocumentSymbolStore(documents);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
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
	documentSymbols.clearForUri(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	documentSymbols.updateForDocument(change.document);
	validateTextDocument(change.document);
});

connection.onDefinition((params) => {
	const doc = documents.get(params.textDocument.uri);
	if (!doc) return null;

	const word = getWordAtPosition(doc, params.position);
	if (!word) return null;

	// Prefer current document symbol (function or variable)
	const local = documentSymbols.getSymbolInfo(doc.uri, word);
	if (local?.range) {
		return Location.create(doc.uri, local.range as any);
	}

	// Prefer local #define
	const docPath = fileUriToFsPath(doc.uri);
	if (!docPath) return null;
	for (const d of parseDefinesFromText(doc.getText(), docPath)) {
		if (d.name === word && d.range) {
			return Location.create(doc.uri, d.range as any);
		}
	}

	const readText = (fsPath: string): string | null => documentSymbols.getTextForFsPath(fsPath);

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
		const idx = documentSymbols.getIndexForFsPath(candidate);
		if (!idx) continue;
		const fn = (idx.functions as any)[word];
		if (fn?.range) pushLocation(candidate, fn.range);
		const v = (idx.variables as any)[word];
		if (v?.range) pushLocation(candidate, v.range);

		// Also resolve #define macros in included files
		const text = readText(candidate);
		if (text != null) {
			for (const d of parseDefinesFromText(text, candidate)) {
				if (d.name === word && d.range) {
					pushLocation(candidate, d.range);
					break;
				}
			}
		}
	}

	return results.length ? results : null;
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

registerCompletionProvider({ connection, documents, documentSymbols });
registerHoverProvider({ connection, documents, documentSymbols });
registerFormattingProvider({ connection, documents });

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
