import type { Connection } from 'vscode-languageserver/node';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { fileUriToFsPath, fsPathToFileUri } from '../util/includes.js';
import { getWordAtPosition } from '../util/utils.js';
import { parseDefinesFromText } from '../util/defines.js';
import type { DocumentSymbolStore } from './documentSymbols.js';
import { Location } from 'vscode-languageserver/node';

/** Registers definition provider (moved from server.ts) */
export function registerDefinitionProvider(opts: {
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    documentSymbols: DocumentSymbolStore;
    includesProvider: { getIncludeFilesForUri(uri: string): Promise<string[]> };
}): void {
    const { connection, documents, documentSymbols, includesProvider } = opts;

    connection.onDefinition(async (params) => {
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

        // Get included files via shared includesProvider
        const includeFiles = await includesProvider.getIncludeFilesForUri(doc.uri);

        for (const candidate of includeFiles) {
            const idx = documentSymbols.getIndexForFsPath(candidate);
            if (!idx) {
				continue
			};
            const fn = (idx.functions as any)[word];
            if (fn?.range) {
				return Location.create(candidate, fn.range as any);
			}
            const v = (idx.variables as any)[word];
            if (v?.range) {
				return Location.create(candidate, v.range as any);
			}

            // Also resolve #define macros in included files
            const text = readText(candidate);
            if (text != null) {
                for (const d of parseDefinesFromText(text, candidate)) {
                    if (d.name === word && d.range) {
                        return Location.create(candidate, d.range as any);
                        break;
                    }
                }
            }
        }

		return null;
    });
}
