import type { CompletionItem } from 'vscode-languageserver/node';
import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import * as fs from 'fs';

import { canonicalizeFsPath, fileUriToFsPath } from '../includes.js';
import { collectDocumentSymbolIndex, type FunctionSymbolInfo, type VariableSymbolInfo, type SymbolRange } from '../symbols.js';
import { buildFunctionCallSnippet } from './utils.js';

export type DocumentSymbolInfo = {
	kind: 'function' | 'variable';
	signature?: string;
	type?: string;
	range?: SymbolRange;
};

type SymbolIndex = ReturnType<typeof collectDocumentSymbolIndex>;

type DocumentSymbolCompletionCacheEntry = {
	version: number;
	items: CompletionItem[];
	byName: Map<string, DocumentSymbolInfo>;
};

type DocumentSymbolIndexCacheEntry = { version: number; index: SymbolIndex };

type HeaderIndexCacheEntry = {
	mtimeMs: number;
	index: SymbolIndex;
};

/**
 * Caches parsed function/variable symbols for open documents and included header files.
 *
 * - Open documents are cached by URI+version.
 * - Header files on disk are cached by mtime.
 */
export class DocumentSymbolStore {
	private documentSymbolCompletions: Map<string, DocumentSymbolCompletionCacheEntry> = new Map();
	private documentSymbolIndexCache: Map<string, DocumentSymbolIndexCacheEntry> = new Map();
	private headerIndexCache: Map<string, HeaderIndexCacheEntry> = new Map();

	public constructor(private readonly documents: TextDocuments<TextDocument>) {}

	/** Clears cached state for a single open document URI. */
	public clearForUri(uri: string): void {
		this.documentSymbolCompletions.delete(uri);
		this.documentSymbolIndexCache.delete(uri);
	}

	/** Rebuilds symbol caches for an open document. Safe to call often. */
	public updateForDocument(textDocument: TextDocument): void {
		try {
			const index = collectDocumentSymbolIndex(textDocument.getText());
			this.documentSymbolIndexCache.set(textDocument.uri, { version: textDocument.version, index });

			const items: CompletionItem[] = [];
			const byName = new Map<string, DocumentSymbolInfo>();

			for (const fn of Object.values(index.functions) as FunctionSymbolInfo[]) {
				const callSig = typeof fn.signature === 'string' ? (fn.signature.match(/\([^)]*\)\s*$/)?.[0] ?? '') : '';
				const displayLabel = callSig ? `${fn.name} ${callSig}` : fn.name;
				items.push({
					label: displayLabel,
					kind: CompletionItemKind.Function,
					detail: fn.signature,
					filterText: fn.name,
					insertTextFormat: InsertTextFormat.Snippet,
					insertText: buildFunctionCallSnippet(fn.name, fn.params),
					data: { source: 'document', kind: 'function', signature: fn.signature }
				});
				byName.set(fn.name, { kind: 'function', signature: fn.signature, range: fn.range });
			}

			for (const v of Object.values(index.variables) as VariableSymbolInfo[]) {
				items.push({
					label: v.name,
					kind: CompletionItemKind.Variable,
					detail: v.type ? `${v.type} ${v.name}` : 'Variable (document)',
					data: { source: 'document', kind: 'variable', type: v.type }
				});
				byName.set(v.name, { kind: 'variable', type: v.type, range: v.range });
			}

			this.documentSymbolCompletions.set(textDocument.uri, {
				version: textDocument.version,
				items,
				byName
			});
		} catch {
			// Best-effort: don't break LSP on parse issues.
		}
	}

	/** Returns completion items for the open document at `uri`. */
	public getCompletionItems(uri: string): CompletionItem[] {
		const doc = this.documents.get(uri);
		if (!doc) return [];

		const cached = this.documentSymbolCompletions.get(uri);
		if (cached && cached.version === doc.version) {
			return cached.items;
		}

		this.updateForDocument(doc);
		return this.documentSymbolCompletions.get(uri)?.items ?? [];
	}

	/** Returns symbol info (signature/type/range) for an open document symbol name. */
	public getSymbolInfo(uri: string, name: string): DocumentSymbolInfo | null {
		const doc = this.documents.get(uri);
		if (!doc) return null;

		const cached = this.documentSymbolCompletions.get(uri);
		if (!cached || cached.version !== doc.version) {
			this.updateForDocument(doc);
		}

		return this.documentSymbolCompletions.get(uri)?.byName.get(name) ?? null;
	}

	/** Returns text for an open document or reads it from disk (best-effort). */
	public getTextForFsPath(fsPath: string): string | null {
		const openText = this.getOpenDocumentTextForFsPath(fsPath);
		if (openText != null) return openText;

		try {
			return fs.readFileSync(fsPath, 'utf-8');
		} catch {
			return null;
		}
	}

	/** Returns a parsed symbol index for an open document or a cached on-disk header file. */
	public getIndexForFsPath(fsPath: string): SymbolIndex | null {
		const openIndex = this.getIndexForOpenDocumentFsPath(fsPath);
		if (openIndex) return openIndex;
		return this.getHeaderIndexForFsPath(fsPath);
	}

	private getOpenDocumentTextForFsPath(fsPath: string): string | null {
		const target = canonicalizeFsPath(fsPath);
		for (const d of this.documents.all()) {
			const p = fileUriToFsPath(d.uri);
			if (!p) continue;
			if (canonicalizeFsPath(p) === target) return d.getText();
		}
		return null;
	}

	private getIndexForOpenDocumentFsPath(fsPath: string): SymbolIndex | null {
		const target = canonicalizeFsPath(fsPath);
		for (const d of this.documents.all()) {
			const p = fileUriToFsPath(d.uri);
			if (!p) continue;
			if (canonicalizeFsPath(p) !== target) continue;

			const cached = this.documentSymbolIndexCache.get(d.uri);
			if (cached && cached.version === d.version) return cached.index;

			const idx = collectDocumentSymbolIndex(d.getText());
			this.documentSymbolIndexCache.set(d.uri, { version: d.version, index: idx });
			return idx;
		}
		return null;
	}

	private getHeaderIndexForFsPath(fsPath: string): SymbolIndex | null {
		try {
			const stat = fs.statSync(fsPath);
			const key = canonicalizeFsPath(fsPath);
			const cached = this.headerIndexCache.get(key);
			if (cached && cached.mtimeMs === stat.mtimeMs) {
				return cached.index;
			}
			const text = fs.readFileSync(fsPath, 'utf-8');
			const index = collectDocumentSymbolIndex(text);
			this.headerIndexCache.set(key, { mtimeMs: stat.mtimeMs, index });
			return index;
		} catch {
			return null;
		}
	}
}
