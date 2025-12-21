import type { CompletionItem } from 'vscode-languageserver/node';
import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import * as fs from 'fs';

import { canonicalizeFsPath, fileUriToFsPath } from '../includes.js';
import { collectDocumentSymbolIndex, type SymbolRange } from '../symbols.js';

function escapeSnippetText(text: string): string {
	// VS Code snippet escaping: $ and } must be escaped.
	// Also escape backslashes defensively.
	return text.replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/\}/g, '\\}');
}

function buildFunctionCallSnippet(fn: { name: string; params?: Array<{ name?: string; type?: string; byRef?: boolean; isArray?: boolean }> }): string {
	const params = fn.params ?? [];
	const placeholders: string[] = [];

	for (let i = 0; i < params.length; i++) {
		const p = params[i];
		const ref = p.byRef ? '&' : '';
		const arr = p.isArray ? '[]' : '';
		const label = (p.type && p.name)
			? `${p.type} ${ref}${p.name}${arr}`
			: (p.type ? `${p.type}${arr}` : (p.name ? `${ref}${p.name}${arr}` : ''));
		if (!label.length) continue;
		placeholders.push(`\${${i + 1}:${escapeSnippetText(label)}}`);
	}

	if (!placeholders.length) {
		return `${fn.name}()$0`;
	}

	return `${fn.name}(${placeholders.join(', ')})$0`;
}

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

export class DocumentSymbolStore {
	private documentSymbolCompletions: Map<string, DocumentSymbolCompletionCacheEntry> = new Map();
	private documentSymbolIndexCache: Map<string, DocumentSymbolIndexCacheEntry> = new Map();
	private headerIndexCache: Map<string, HeaderIndexCacheEntry> = new Map();

	public constructor(private readonly documents: TextDocuments<TextDocument>) {}

	public clearForUri(uri: string): void {
		this.documentSymbolCompletions.delete(uri);
		this.documentSymbolIndexCache.delete(uri);
	}

	public updateForDocument(textDocument: TextDocument): void {
		try {
			const index = collectDocumentSymbolIndex(textDocument.getText());
			this.documentSymbolIndexCache.set(textDocument.uri, { version: textDocument.version, index });

			const items: CompletionItem[] = [];
			const byName = new Map<string, DocumentSymbolInfo>();

			for (const fn of Object.values(index.functions)) {
				items.push({
					label: fn.name,
					kind: CompletionItemKind.Function,
					detail: fn.signature,
					insertTextFormat: InsertTextFormat.Snippet,
					insertText: buildFunctionCallSnippet(fn),
					data: { source: 'document', kind: 'function', signature: fn.signature }
				});
				byName.set(fn.name, { kind: 'function', signature: fn.signature, range: fn.range });
			}

			for (const v of Object.values(index.variables)) {
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

	public getSymbolInfo(uri: string, name: string): DocumentSymbolInfo | null {
		const doc = this.documents.get(uri);
		if (!doc) return null;

		const cached = this.documentSymbolCompletions.get(uri);
		if (!cached || cached.version !== doc.version) {
			this.updateForDocument(doc);
		}

		return this.documentSymbolCompletions.get(uri)?.byName.get(name) ?? null;
	}

	public getTextForFsPath(fsPath: string): string | null {
		const openText = this.getOpenDocumentTextForFsPath(fsPath);
		if (openText != null) return openText;

		try {
			return fs.readFileSync(fsPath, 'utf-8');
		} catch {
			return null;
		}
	}

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
