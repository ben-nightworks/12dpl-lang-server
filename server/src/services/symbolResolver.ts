/**
 * SymbolResolver — unified symbol lookup across all sources.
 *
 * Encapsulates the resolution priority chain:
 *   document symbols → defines → include symbols → include defines → prototypes → types → keywords
 *
 * Providers call resolve() for single-name lookups (hover, definition)
 * and allVisible() for scope-aware listings (completion).
 */

import type { DocumentService } from './documentService';
import type { IncludeService } from './includeService';
import type { PrototypeService } from './prototypeService';
import { findDeclaringScope, visibleSymbolsAt, isGeneratedWrapperFunctionName } from '../core/symbolCollector';
import { typeDocumentation } from '../data/typeDocumentation';
import { fsPathToFileUri } from './includeUtils';
import type { SymbolDeclaration, SymbolRange, ParameterSymbolInfo } from '../core/types';

export type SymbolSource = 'document' | 'include' | 'define' | 'prototype' | 'type' | 'keyword';

export interface ResolvedSymbol {
	name: string;
	source: SymbolSource;
	kind: 'function' | 'variable' | 'parameter' | 'define' | 'type' | 'keyword';

	// Declaration data
	type?: string;
	signature?: string;
	params?: ParameterSymbolInfo[];
	range?: SymbolRange;

	// Location for go-to-definition
	uri?: string;
	fsPath?: string;

	// Define-specific
	defineParams?: string[];
	defineValue?: string;

	// Prototype-specific
	prototypeSignature?: string;
	prototypeDescription?: string;

	// Type documentation
	typeDoc?: string;
}

const KEYWORD_LIST = ['if', 'else', 'while', 'for', 'return', 'void', 'int', 'double',
	'break', 'continue', 'switch', 'case', 'default', 'do', 'goto', 'struct'];

export class SymbolResolver {
	constructor(
		private readonly documentService: DocumentService,
		private readonly includeService: IncludeService,
		private readonly prototypeService: PrototypeService
	) {}

	/**
	 * Returns the best match for a name in the context of a document.
	 * Position is needed for scope-aware resolution (locals, parameters).
	 */
	async resolve(
		uri: string,
		name: string,
		position: { line: number; character: number }
	): Promise<ResolvedSymbol | null> {
		const lowerName = name.toLowerCase();

		// 1. Document scope tree (locals, params, functions, variables)
		const symbolTable = this.documentService.getSymbolTable(uri);
		if (symbolTable) {
			const found = findDeclaringScope(symbolTable.root, position, name);
			if (found && !isGeneratedWrapperFunctionName(found.declaration.name)) {
				return this.declarationToResolved(found.declaration, 'document', uri);
			}
		}

		// 2. Document defines
		if (symbolTable) {
			for (const def of symbolTable.defines) {
				if (def.name.toLowerCase() === lowerName) {
					return this.declarationToResolved(def, 'define', uri);
				}
			}
		}

		// 3. Include symbols (functions + variables)
		const includeSymbols = await this.includeService.getIncludeSymbols(uri);
		const inclFnDecls = includeSymbols.functions.get(name);
		if (inclFnDecls && inclFnDecls.length > 0) {
			const inclFn = inclFnDecls[0];
			const incFsPath = await this.findIncludeFsPathForSymbol(uri, name);
			return this.declarationToResolved(inclFn, 'include', undefined, incFsPath);
		}
		const inclVar = includeSymbols.variables.get(name);
		if (inclVar) {
			const incFsPath = await this.findIncludeFsPathForSymbol(uri, name);
			return this.declarationToResolved(inclVar, 'include', undefined, incFsPath);
		}

		// 4. Include defines
		const includeDefines = await this.includeService.getIncludeDefines(uri);
		for (const def of includeDefines) {
			if (def.name.toLowerCase() === lowerName) {
				return this.declarationToResolved(def, 'define', undefined, def.definedInFsPath);
			}
		}

		// 5. Prototypes
		const proto = this.prototypeService.getPrototype(name);
		if (proto) {
			const sig = this.prototypeService.getPrototypeSignature(name);
			return {
				name: proto.name,
				source: 'prototype',
				kind: 'function',
				prototypeSignature: sig,
				prototypeDescription: (proto as any).description,
			};
		}

		// 6. Types
		if (typeDocumentation[name]) {
			return {
				name,
				source: 'type',
				kind: 'type',
				typeDoc: typeDocumentation[name],
			};
		}

		// 7. Keywords
		if (KEYWORD_LIST.includes(lowerName)) {
			return {
				name,
				source: 'keyword',
				kind: 'keyword',
			};
		}

		return null;
	}

	/**
	 * Returns all symbols visible from a document at a given cursor position.
	 * Position determines which local/block-scoped symbols are in scope.
	 */
	async allVisible(
		uri: string,
		position: { line: number; character: number }
	): Promise<ResolvedSymbol[]> {
		const result: ResolvedSymbol[] = [];
		const seen = new Set<string>();

		const add = (symbol: ResolvedSymbol) => {
			const key = symbol.name.toLowerCase();
			if (seen.has(key)) return;
			seen.add(key);
			result.push(symbol);
		};

		// 1. Document scope symbols
		const symbolTable = this.documentService.getSymbolTable(uri);
		if (symbolTable) {
			for (const decl of visibleSymbolsAt(symbolTable.root, position)) {
				if (isGeneratedWrapperFunctionName(decl.name)) continue;
				add(this.declarationToResolved(decl, 'document', uri));
			}
			// 2. Document defines
			for (const def of symbolTable.defines) {
				add(this.declarationToResolved(def, 'define', uri));
			}
		}

		// 3. Include symbols
		const includeSymbols = await this.includeService.getIncludeSymbols(uri);
		for (const [, decls] of includeSymbols.functions) {
			const fn = decls[0];
			if (fn) add(this.declarationToResolved(fn, 'include'));
		}
		for (const [, decl] of includeSymbols.variables) {
			add(this.declarationToResolved(decl, 'include'));
		}

		// 4. Include defines
		const includeDefines = await this.includeService.getIncludeDefines(uri);
		for (const def of includeDefines) {
			add(this.declarationToResolved(def, 'define', undefined, def.definedInFsPath));
		}

		// 5–7: prototypes, types, keywords are NOT included here.
		// Completion provider adds these separately via prototypeService.getCompletionItems(),
		// typeDocumentation, and hardcoded keyword lists — those items use pre-built
		// CompletionItem[] that would be lost if wrapped in ResolvedSymbol.

		return result;
	}

	private declarationToResolved(
		decl: SymbolDeclaration,
		source: 'document' | 'include' | 'define',
		uri?: string,
		fsPath?: string
	): ResolvedSymbol {
		return {
			name: decl.name,
			source: decl.kind === 'define' ? 'define' : source,
			kind: decl.kind,
			type: decl.type ?? decl.returnType,
			signature: decl.signature,
			params: decl.params,
			range: decl.range,
			uri,
			fsPath: fsPath ?? decl.definedInFsPath,
			defineParams: decl.defineParams,
			defineValue: decl.value,
		};
	}

	/** Finds which include file defines a given symbol name. */
	private async findIncludeFsPathForSymbol(uri: string, name: string): Promise<string | undefined> {
		const files = await this.includeService.getIncludeFiles(uri);
		for (const fp of files) {
			const views = this.documentService.getDerivedViewsForFsPath(fp);
			if (!views) continue;
			if (views.exportedFunctions.has(name) || views.exportedVariables.has(name)) {
				return fp;
			}
		}
		return undefined;
	}
}
