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
	InitializeResult
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import {
	Validator,
	type KnownSymbols
} from './antlr/validator';

import {
	prototypesLoader
} from './util/prototypes';

import { parseDefinesFromText } from './util/defines';
import { fileUriToFsPath } from './util/includes';
import { DocumentSymbolStore } from './providers/documentSymbols';
import { registerCompletionProvider } from './providers/completionProvider';
import { registerDefinitionProvider } from './providers/definitionProvider';
import { registerHoverProvider } from './providers/hoverProvider';
import { registerFormattingProvider } from './providers/formattingProvider';
import { registerIncludesProvider } from './providers/includesProvider';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

const documentSymbols = new DocumentSymbolStore(documents);

// Set defaults for capabilities as a starting point
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
				resolveProvider: true
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

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
	documentSymbols.clearForUri(e.document.uri);
	connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] });
});

// Register providers
// Register a single shared includes provider and pass it to other providers.
const includesProvider = registerIncludesProvider({ connection, documents, documentSymbols });

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	documentSymbols.updateForDocument(change.document);
	validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	const text = textDocument.getText();
	const uri = textDocument.uri;
	const docFsPath = fileUriToFsPath(uri);

	// Collect known symbols from document, include files, and built-in prototypes
	const knownSymbols: KnownSymbols = {
		functions: new Set<string>(),
		variables: new Set<string>(),
		defines: new Set<string>()
	};

	// Add built-in function prototypes (loaded asynchronously on startup)
	for (const name of prototypesLoader.getAllNames()) {
		knownSymbols.functions.add(name.toLowerCase());
	}

	// Get the document's symbol index (already cached by documentSymbols)
	const docIndex = docFsPath ? documentSymbols.getIndexForFsPath(docFsPath) : null;
	if (docIndex) {
		for (const fn of Object.keys(docIndex.functions)) {
			knownSymbols.functions.add(fn.toLowerCase());
		}
		for (const v of Object.keys(docIndex.variables)) {
			knownSymbols.variables.add(v.toLowerCase());
		}
	}

	// Add defines from the document itself
	if (docFsPath) {
		for (const def of parseDefinesFromText(text, docFsPath)) {
			knownSymbols.defines.add(def.name.toLowerCase());
		}
	}

	// Get include files and add their symbols
	const includeFiles = await includesProvider.getIncludeFilesForUri(uri);
	for (const includeFsPath of includeFiles) {
		const idx = documentSymbols.getIndexForFsPath(includeFsPath);
		if (idx) {
			for (const fn of Object.keys(idx.functions)) {
				knownSymbols.functions.add(fn.toLowerCase());
			}
			for (const v of Object.keys(idx.variables)) {
				knownSymbols.variables.add(v.toLowerCase());
			}
		}

		// Add defines from include files
		const includeText = documentSymbols.getTextForFsPath(includeFsPath);
		if (includeText) {
			for (const def of parseDefinesFromText(includeText, includeFsPath)) {
				knownSymbols.defines.add(def.name.toLowerCase());
			}
		}
	}

	const diagnostics: Diagnostic[] = Validator.ValidateWithSymbols(text, knownSymbols);
	
	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

registerCompletionProvider({ connection, documents, documentSymbols, includesProvider });
registerDefinitionProvider({ connection, documents, documentSymbols, includesProvider });
registerHoverProvider({ connection, documents, documentSymbols, includesProvider });
registerFormattingProvider({ connection, documents });

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
