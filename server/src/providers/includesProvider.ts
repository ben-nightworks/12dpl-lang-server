import type { Connection } from 'vscode-languageserver/node';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { collectRecursiveIncludeFiles, fileUriToFsPath } from '../util/includes.js';
import type { DocumentSymbolStore } from './documentSymbols.js';

/**
 * Provides cached include-file lists per document URI. Cache entries are keyed
 * by document URI and document version and are invalidated when documents
 * change or close.
 */
export function registerIncludesProvider(opts: {
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    documentSymbols: DocumentSymbolStore;
}) {
    const { connection, documents, documentSymbols } = opts;

    type CacheEntry = { version: number; files: string[] };
    const cache: Map<string, CacheEntry> = new Map();

    // Invalidate cache when document content changes or when a document closes.
    documents.onDidChangeContent((e) => {
        cache.delete(e.document.uri);
    });
    documents.onDidClose((e) => {
        cache.delete(e.document.uri);
    });

    async function getIncludeFilesForUri(uri: string): Promise<string[]> {
        const doc = documents.get(uri);
        if (!doc) return [];

        const cached = cache.get(uri);
        if (cached && cached.version === doc.version) return cached.files;

        const docFsPath = fileUriToFsPath(uri);
        if (!docFsPath) return [];

        // Get include dirs for this resource (use scopeUri so the client
        // returns user/workspace/folder merged settings for the document).
        let includeDirs: string[] = [];
        try {
            const cfg: any = await connection.workspace.getConfiguration({ scopeUri: uri, section: '12dpl' });
            includeDirs = (cfg?.compiler?.includePaths ?? []) as string[];
            includeDirs = includeDirs.map((p: string) => String(p).trim()).filter(Boolean);
        } catch {
            includeDirs = [];
        }

        const files = collectRecursiveIncludeFiles(
            docFsPath,
            (fsPath) => documentSymbols.getTextForFsPath(fsPath),
            { maxFiles: 500, includeDirectories: includeDirs }
        );

        cache.set(uri, { version: doc.version, files });
        return files;
    }

    return { getIncludeFilesForUri };
}
