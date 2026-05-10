import type { Connection, DocumentFormattingParams } from 'vscode-languageserver/node';
import { TextEdit } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { format12dplDocument } from '../services/formattingService.js';

/** Registers document formatting support with the LSP connection. */
export function registerFormattingProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
}): void {
	const { connection, documents } = opts;

	connection.onDocumentFormatting(async (params: DocumentFormattingParams) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return [];

		let preserveBlankLines = false;
		let bracketStyle: 'preserve' | 'same-line' | 'new-line' = 'preserve';
		let maxLineLength = 0;
		let indentStyle: 'editor' | 'spaces' | 'tabs' = 'editor';
		try {
			const cfg = await connection.workspace.getConfiguration({
				scopeUri: params.textDocument.uri,
				section: '12dpl'
			});
			preserveBlankLines = !!(cfg?.formatter?.preserveBlankLines);
			const rawStyle = cfg?.formatter?.bracketStyle;
			if (rawStyle === 'same-line' || rawStyle === 'new-line') {
				bracketStyle = rawStyle;
			}
			const rawMax = cfg?.formatter?.maxLineLength;
			if (typeof rawMax === 'number' && rawMax > 0) {
				maxLineLength = rawMax;
			}
			const rawIndent = cfg?.formatter?.indentStyle;
			if (rawIndent === 'spaces' || rawIndent === 'tabs') {
				indentStyle = rawIndent;
			}
		} catch {
			// ignore — fall back to defaults
		}

		// indentStyle overrides whatever VS Code passed in params.options.insertSpaces
		const insertSpaces = indentStyle === 'spaces' ? true
			: indentStyle === 'tabs' ? false
			: params.options.insertSpaces;

		const formatted = format12dplDocument(document.getText(), {
			...params.options,
			insertSpaces,
			preserveBlankLines,
			bracketStyle,
			maxLineLength
		});
		const fullRange = {
			start: document.positionAt(0),
			end: document.positionAt(document.getText().length)
		};

		return [TextEdit.replace(fullRange, formatted)];
	});
}
