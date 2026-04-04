import {
	Connection,
	TextDocuments,
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';

import { DiagnosticService } from '../services/diagnosticService';
import { PrototypeService } from '../services/prototypeService';

export function registerValidationProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	diagnosticService: DiagnosticService;
	prototypeService: PrototypeService;
}): void {
	const { connection, documents, diagnosticService, prototypeService } = opts;

	async function validateTextDocument(uri: string): Promise<void> {
		await prototypeService.ready;
		const diagnostics = await diagnosticService.validate(uri);
		connection.sendDiagnostics({ uri, diagnostics });
	}

	documents.onDidChangeContent(change => {
		validateTextDocument(change.document.uri);
	});

	documents.onDidClose(e => {
		connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] });
	});

	connection.onDidChangeConfiguration(() => {
		documents.all().forEach(doc => validateTextDocument(doc.uri));
	});
}
