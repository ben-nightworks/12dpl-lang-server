import type { Connection, DocumentFormattingParams } from 'vscode-languageserver/node';
import { TextEdit } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { format12dplDocument } from '../formatter.js';

/** Registers document formatting support with the LSP connection. */
export function registerFormattingProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
}): void {
	const { connection, documents } = opts;

	connection.onDocumentFormatting((params: DocumentFormattingParams) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return [];

		const formatted = format12dplDocument(document.getText(), params.options);
		const fullRange = {
			start: document.positionAt(0),
			end: document.positionAt(document.getText().length)
		};

		return [TextEdit.replace(fullRange, formatted)];
	});
}
