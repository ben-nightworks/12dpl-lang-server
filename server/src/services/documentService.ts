/**
 * DocumentService — central owner of parsed document state.
 *
 * Replaces the current DocumentSymbolStore. Owns the parse-once cache
 * and provides ParseResult, SymbolTable, and DerivedSymbolViews.
 */

import * as fs from 'fs';
import { parse } from '../core/parsePipeline';
import { collectSymbolTable, deriveViews, parseDefines } from '../core/symbolCollector';
import { canonicalizeFsPath, fileUriToFsPath } from './includeUtils';
import type {
	ParseResult,
	SymbolTable,
	DerivedSymbolViews,
	SymbolDeclaration,
} from '../core/types';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

interface DocumentState {
	version: number;
	text: string;
	parseResult: ParseResult;
	symbolTable: SymbolTable;
	derivedViews: DerivedSymbolViews;
}

interface HeaderState {
	mtimeMs: number;
	text: string;
	symbolTable: SymbolTable;
	derivedViews: DerivedSymbolViews;
}

export class DocumentService {
	private documentState: Map<string, DocumentState> = new Map();
	private headerState: Map<string, HeaderState> = new Map();

	/** Maps a header canonical path → set of open-document URIs that include it. */
	private dependents: Map<string, Set<string>> = new Map();

	constructor(private readonly documents: TextDocuments<TextDocument>) {}

	// ─── Open document methods ──────────────────────────────────────────────

	/** Called on every content change or initial open. Parses once, caches everything. */
	update(uri: string, version: number, text: string): void {
		const existing = this.documentState.get(uri);
		if (existing && existing.version === version) return;

		const parseResult = parse(text);
		const symbolTable = collectSymbolTable(parseResult, text, fileUriToFsPath(uri) ?? undefined);
		const derivedViews = deriveViews(symbolTable.root);

		this.documentState.set(uri, { version, text, parseResult, symbolTable, derivedViews });
	}

	/** Called on document close. */
	clear(uri: string): void {
		this.documentState.delete(uri);
	}

	getParseResult(uri: string): ParseResult | null {
		this.ensureUpToDate(uri);
		return this.documentState.get(uri)?.parseResult ?? null;
	}

	getSymbolTable(uri: string): SymbolTable | null {
		this.ensureUpToDate(uri);
		return this.documentState.get(uri)?.symbolTable ?? null;
	}

	getDerivedViews(uri: string): DerivedSymbolViews | null {
		this.ensureUpToDate(uri);
		return this.documentState.get(uri)?.derivedViews ?? null;
	}

	getText(uri: string): string | null {
		this.ensureUpToDate(uri);
		return this.documentState.get(uri)?.text ?? null;
	}

	/** Returns defines for an open document. */
	getDefines(uri: string): SymbolDeclaration[] {
		this.ensureUpToDate(uri);
		return this.documentState.get(uri)?.symbolTable.defines ?? [];
	}

	// ─── On-disk header file methods ────────────────────────────────────────

	getHeaderSymbolTable(fsPath: string): SymbolTable | null {
		return this.ensureHeaderLoaded(fsPath)?.symbolTable ?? null;
	}

	getHeaderDerivedViews(fsPath: string): DerivedSymbolViews | null {
		return this.ensureHeaderLoaded(fsPath)?.derivedViews ?? null;
	}

	getHeaderText(fsPath: string): string | null {
		return this.ensureHeaderLoaded(fsPath)?.text ?? null;
	}

	getHeaderDefines(fsPath: string): SymbolDeclaration[] {
		return this.ensureHeaderLoaded(fsPath)?.symbolTable.defines ?? [];
	}

	// ─── Unified accessors (prefers open doc, falls back to disk) ───────────

	/** Returns text for an open document (by fsPath) or reads from disk. */
	getTextForFsPath(fsPath: string): string | null {
		const openText = this.getOpenDocumentTextForFsPath(fsPath);
		if (openText != null) return openText;
		try { return fs.readFileSync(fsPath, 'utf-8'); } catch { return null; }
	}

	/** Returns derived views for an open document or a cached on-disk header. */
	getDerivedViewsForFsPath(fsPath: string): DerivedSymbolViews | null {
		const openViews = this.getDerivedViewsForOpenDocumentFsPath(fsPath);
		if (openViews) return openViews;
		return this.getHeaderDerivedViews(fsPath);
	}

	/** Returns defines for a file (open doc by fsPath, or on-disk). */
	getDefinesForFsPath(fsPath: string): SymbolDeclaration[] {
		const target = canonicalizeFsPath(fsPath);
		for (const d of this.documents.all()) {
			const p = fileUriToFsPath(d.uri);
			if (!p) continue;
			if (canonicalizeFsPath(p) === target) return this.getDefines(d.uri);
		}
		return this.getHeaderDefines(fsPath);
	}

	// ─── Dependency tracking ────────────────────────────────────────────────

	/** Registers that `documentUri` includes `headerFsPath`. */
	registerDependency(documentUri: string, headerFsPath: string): void {
		const key = canonicalizeFsPath(headerFsPath);
		let set = this.dependents.get(key);
		if (!set) {
			set = new Set();
			this.dependents.set(key, set);
		}
		set.add(documentUri);
	}

	/** Clears dependencies for a document (call on doc close or before re-registering). */
	clearDependencies(documentUri: string): void {
		for (const set of this.dependents.values()) {
			set.delete(documentUri);
		}
	}

	/** Invalidates a header's cache and returns URIs of documents that depend on it. */
	invalidateHeader(fsPath: string): string[] {
		const key = canonicalizeFsPath(fsPath);
		this.headerState.delete(key);
		const deps = this.dependents.get(key);
		return deps ? Array.from(deps) : [];
	}

	// ─── Private helpers ────────────────────────────────────────────────────

	private ensureUpToDate(uri: string): void {
		const doc = this.documents.get(uri);
		if (!doc) return;
		const cached = this.documentState.get(uri);
		if (cached && cached.version === doc.version) return;
		this.update(uri, doc.version, doc.getText());
	}

	private ensureHeaderLoaded(fsPath: string): HeaderState | null {
		try {
			const stat = fs.statSync(fsPath);
			const key = canonicalizeFsPath(fsPath);
			const cached = this.headerState.get(key);
			if (cached && cached.mtimeMs === stat.mtimeMs) return cached;

			const text = fs.readFileSync(fsPath, 'utf-8');
			const parseResult = parse(text);
			const symbolTable = collectSymbolTable(parseResult, text, fsPath);
			const derivedViews = deriveViews(symbolTable.root);
			const state: HeaderState = { mtimeMs: stat.mtimeMs, text, symbolTable, derivedViews };
			this.headerState.set(key, state);
			return state;
		} catch { return null; }
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

	private getDerivedViewsForOpenDocumentFsPath(fsPath: string): DerivedSymbolViews | null {
		const target = canonicalizeFsPath(fsPath);
		for (const d of this.documents.all()) {
			const p = fileUriToFsPath(d.uri);
			if (!p) continue;
			if (canonicalizeFsPath(p) === target) return this.getDerivedViews(d.uri);
		}
		return null;
	}
}
