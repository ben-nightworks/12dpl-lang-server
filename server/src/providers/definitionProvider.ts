import type { Connection } from 'vscode-languageserver/node';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { fsPathToFileUri } from '../services/includeUtils.js';
import { getWordAtPosition } from '../core/utils.js';
import type { SymbolResolver } from '../services/symbolResolver';
import { Location } from 'vscode-languageserver/node';

/** Registers go-to-definition support using the unified SymbolResolver. */
export function registerDefinitionProvider(opts: {
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    symbolResolver: SymbolResolver;
}): void {
    const { connection, documents, symbolResolver } = opts;

    connection.onDefinition(async (params) => {
        const doc = documents.get(params.textDocument.uri);
        if (!doc) return null;

        const word = getWordAtPosition(doc, params.position);
        if (!word) return null;

        const symbol = await symbolResolver.resolve(
            params.textDocument.uri,
            word,
            params.position
        );
        if (!symbol?.range) return null;

        // Determine target URI
        let targetUri: string | undefined;
        if (symbol.source === 'document' || (symbol.source === 'define' && symbol.uri)) {
            targetUri = symbol.uri ?? doc.uri;
        } else if (symbol.fsPath) {
            targetUri = fsPathToFileUri(symbol.fsPath);
        }

        if (!targetUri) return null;

        return Location.create(targetUri, symbol.range as any);
    });
}
