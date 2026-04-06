/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * 12dPL language server entrypoint.
 *
 * Constructs the service layer and wires LSP lifecycle events.
 * Feature logic lives in providers/ and services/.
 */
import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	DidChangeWatchedFilesNotification,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import { fileUriToFsPath, resolvePathVariables } from './services/includeUtils';
import { DocumentService } from './services/documentService';
import { PrototypeService } from './services/prototypeService';
import { IncludeService } from './services/includeService';
import { DiagnosticService } from './services/diagnosticService';
import { SymbolResolver } from './services/symbolResolver';
import { WorkspaceScanService } from './services/workspaceScanService';
import { registerCompletionProvider } from './providers/completionProvider';
import { registerDefinitionProvider } from './providers/definitionProvider';
import { registerHoverProvider } from './providers/hoverProvider';
import { registerFormattingProvider } from './providers/formattingProvider';
import { registerValidationProvider } from './providers/validationProvider';
import { registerDocumentSymbolProvider } from './providers/documentSymbolProvider';

// Create a connection for the server, using Node's IPC as a transport.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// ─── Construct services in dependency order ─────────────────────────────────

const documentService = new DocumentService(documents);
const prototypeService = new PrototypeService();

// Include dirs resolver: fetches workspace configuration for each document.
async function getIncludeDirs(uri: string): Promise<string[]> {
	let includeDirs: string[] = [];
	try {
		const cfg: any = await connection.workspace.getConfiguration({ scopeUri: uri, section: '12dpl' });
		includeDirs = (cfg?.compiler?.includePaths ?? []) as string[];
		includeDirs = includeDirs.map((p: string) => String(p).trim()).filter(Boolean);

		const docFsPath = fileUriToFsPath(uri);
		const workspaceFolders = await connection.workspace.getWorkspaceFolders();
		let workspaceFolderPath: string | undefined;

		if (workspaceFolders && workspaceFolders.length > 0) {
			const matchingFolder = workspaceFolders.find(wf => uri.startsWith(wf.uri));
			if (matchingFolder) {
				workspaceFolderPath = matchingFolder.uri.startsWith('file://')
					? fileUriToFsPath(matchingFolder.uri) ?? undefined
					: matchingFolder.uri;
			}
			if (!workspaceFolderPath) {
				const folderUri = workspaceFolders[0].uri;
				workspaceFolderPath = folderUri.startsWith('file://')
					? fileUriToFsPath(folderUri) ?? undefined
					: folderUri;
			}
		}

		includeDirs = includeDirs.map((p: string) => resolvePathVariables(p, {
			workspaceFolderPath,
			fileFsPath: docFsPath ?? undefined,
			cwd: process.cwd()
		}));
	} catch {
		includeDirs = [];
	}
	return includeDirs;
}

const includeService = new IncludeService(documentService, documents, getIncludeDirs);
const diagnosticService = new DiagnosticService(documentService, includeService, prototypeService);
const symbolResolver = new SymbolResolver(documentService, includeService, prototypeService);
const workspaceScanService = new WorkspaceScanService(
	connection,
	documents,
	documentService,
	diagnosticService,
	prototypeService,
	getIncludeDirs
);

// ─── Capability negotiation ─────────────────────────────────────────────────

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Full,
			completionProvider: {
				resolveProvider: true
			},
			hoverProvider: true,
			definitionProvider: true,
			documentFormattingProvider: true,
			documentSymbolProvider: true
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
	if (hasConfigurationCapability) {
		connection.client.register(DidChangeConfigurationNotification.type, undefined);

		// Register for watched file changes (client sends these for .4dm and .h files).
		connection.client.register(DidChangeWatchedFilesNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders((_event) => {
			workspaceScanService.handleWorkspaceFoldersChanged().catch(() => {});
		});
	}

	workspaceScanService.initialize().catch(() => {});
});

// ─── Settings ───────────────────────────────────────────────────────────────

interface ServerSettings {
	maxNumberOfProblems: number;
}

const defaultSettings: ServerSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ServerSettings = defaultSettings;
const documentSettings: Map<string, Thenable<ServerSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		documentSettings.clear();
		workspaceScanService.handleConfigurationChanged().catch(() => {});
	} else {
		globalSettings = <ServerSettings>(
			(change.settings.langServer || defaultSettings)
		);
	}
});

// ─── Document lifecycle ─────────────────────────────────────────────────────

documents.onDidClose(e => {
	const closedUri = e.document.uri;
	documentSettings.delete(closedUri);
	documentService.clear(closedUri);
	includeService.invalidate(closedUri);
	workspaceScanService.handleDocumentClose(closedUri).catch(() => {});
});

documents.onDidChangeContent(change => {
	const doc = change.document;
	documentService.update(doc.uri, doc.version, doc.getText());
	includeService.invalidate(doc.uri);
});

connection.onDidChangeWatchedFiles(async (params) => {
	await workspaceScanService.handleWatchedFilesChanged(params);
});

// ─── Register providers ─────────────────────────────────────────────────────

registerCompletionProvider({ connection, documents, documentService, includeService, prototypeService, symbolResolver });
registerDefinitionProvider({ connection, documents, symbolResolver });
registerHoverProvider({ connection, documents, symbolResolver, prototypeService });
registerFormattingProvider({ connection, documents });
registerValidationProvider({ connection, documents, diagnosticService, prototypeService });
registerDocumentSymbolProvider({ connection, documents, documentService });

// Make the text document manager listen on the connection
documents.listen(connection);

// Listen on the connection
connection.listen();
