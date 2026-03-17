/**
 * IncludeService — wraps include graph traversal with caching.
 *
 * Replaces the current `registerIncludesProvider` function-based pattern.
 * Caches resolved file lists per (uri, version).
 */

import type { DocumentService } from './documentService';
import { collectRecursiveIncludeFiles, fileUriToFsPath } from './includeUtils';
import { parseDefines } from '../core/symbolCollector';
import type {
	SymbolDeclaration,
	IncludeFileVariable,
} from '../core/types';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

/** Aggregated symbols across all transitive includes, using the unified SymbolDeclaration type. */
export interface AggregatedSymbols {
	functions: Map<string, SymbolDeclaration[]>;
	variables: Map<string, SymbolDeclaration>;
}

type CacheEntry = { version: number; files: string[] };

export class IncludeService {
	private cache: Map<string, CacheEntry> = new Map();

	constructor(
		private readonly documentService: DocumentService,
		private readonly documents: TextDocuments<TextDocument>,
		private readonly getIncludeDirs: (uri: string) => Promise<string[]>
	) {}

	/** Invalidate cache for a URI (call on content change and close). */
	invalidate(uri: string): void {
		this.cache.delete(uri);
	}

	/** Returns resolved include file paths for a document. */
	async getIncludeFiles(uri: string): Promise<string[]> {
		const doc = this.documents.get(uri);
		if (!doc) return [];

		const cached = this.cache.get(uri);
		if (cached && cached.version === doc.version) return cached.files;

		const docFsPath = fileUriToFsPath(uri);
		if (!docFsPath) return [];

		const includeDirs = await this.getIncludeDirs(uri);

		const files = collectRecursiveIncludeFiles(
			docFsPath,
			(fsPath) => this.documentService.getTextForFsPath(fsPath),
			{ maxFiles: 500, includeDirectories: includeDirs }
		);

		// Register dependencies for cross-document invalidation
		this.documentService.clearDependencies(uri);
		for (const f of files) {
			this.documentService.registerDependency(uri, f);
		}

		this.cache.set(uri, { version: doc.version, files });
		return files;
	}

	/** Aggregated symbol index across all transitive includes. */
	async getIncludeSymbols(uri: string): Promise<AggregatedSymbols> {
		const files = await this.getIncludeFiles(uri);
		const functions = new Map<string, SymbolDeclaration[]>();
		const variables = new Map<string, SymbolDeclaration>();

		for (const fsPath of files) {
			const views = this.documentService.getDerivedViewsForFsPath(fsPath);
			if (!views) continue;
			for (const [name, decls] of views.exportedFunctions) {
				if (!functions.has(name)) functions.set(name, decls);
			}
			for (const [name, decl] of views.exportedVariables) {
				if (!variables.has(name)) variables.set(name, decl);
			}
		}

		return { functions, variables };
	}

	/** Aggregated defines across all transitive includes. */
	async getIncludeDefines(uri: string): Promise<SymbolDeclaration[]> {
		const files = await this.getIncludeFiles(uri);
		const seen = new Set<string>();
		const result: SymbolDeclaration[] = [];

		for (const fsPath of files) {
			const defines = this.documentService.getDefinesForFsPath(fsPath);
			for (const d of defines) {
				if (!seen.has(d.name)) {
					seen.add(d.name);
					result.push(d);
				}
			}
		}
		return result;
	}

	/** Builds IncludeFileVariable[] for redeclaration checking. */
	async getIncludeFileVariables(uri: string): Promise<IncludeFileVariable[]> {
		const files = await this.getIncludeFiles(uri);
		const result: IncludeFileVariable[] = [];

		for (const filePath of files) {
			const views = this.documentService.getDerivedViewsForFsPath(filePath);
			if (!views) continue;
			const fileName = filePath.split(/[\\/]/).pop() || filePath;
			for (const name of views.exportedVariables.keys()) {
				result.push({ name, sourceFile: fileName, kind: 'variable' });
			}
			for (const name of views.exportedFunctions.keys()) {
				result.push({ name, sourceFile: fileName, kind: 'function' });
			}
		}
		return result;
	}

	/** For the old includesProvider interface compatibility. */
	getIncludeFilesForUri(uri: string): Promise<string[]> {
		return this.getIncludeFiles(uri);
	}
}
