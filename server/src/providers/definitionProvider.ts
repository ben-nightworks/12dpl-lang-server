import type { Connection } from 'vscode-languageserver/node';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { collectRecursiveIncludeFiles, fileUriToFsPath, fsPathToFileUri } from '../util/includes.js';
import { getWordAtPosition } from '../util/utils.js';
import { parseDefinesFromText } from '../util/defines.js';
import type { DocumentSymbolStore } from './documentSymbols.js';
import type { SymbolRange } from '../antlr/symbols.js';
import { Location } from 'vscode-languageserver/node';

/** Registers definition provider (moved from server.ts) */
export function registerDefinitionProvider(opts: {
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    documentSymbols: DocumentSymbolStore;
}): void {
    const { connection, documents, documentSymbols } = opts;

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

        // Fetch include paths from workspace settings for this document (if configured).
        let includeDirs: string[] = [];
        try {
            const cfg: any = await connection.workspace.getConfiguration({ scopeUri: doc.uri, section: '12dpl' });
            includeDirs = (cfg?.compiler?.includePaths ?? []) as string[];
            includeDirs = includeDirs.map((p: string) => String(p).trim()).filter(Boolean);
        } catch {
            includeDirs = [];
        }

        const includeFiles = collectRecursiveIncludeFiles(docPath, readText, { maxFiles: 500, includeDirectories: includeDirs });
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
}
