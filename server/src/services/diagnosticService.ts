/**
 * DiagnosticService — orchestrates all validation for a document in a single pass.
 *
 * Replaces the current dual ValidateWithIncludes / ValidateWithSymbols pattern
 * and eliminates the triple-parse.
 */

import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node';
import type { DocumentService } from './documentService';
import type { IncludeService } from './includeService';
import type { PrototypeService } from './prototypeService';
import { validateVariableRedeclarations, validateFunctionRedeclarations, validateUndeclaredIdentifiers, validateDeprecatedCalls, validateReturnStatements } from '../core/validators';
import type { KnownSymbols } from '../core/types';

export class DiagnosticService {
	constructor(
		private readonly documentService: DocumentService,
		private readonly includeService: IncludeService,
		private readonly prototypeService: PrototypeService
	) {}

	/** Returns all diagnostics for a document. Single entry point. */
	async validate(uri: string): Promise<Diagnostic[]> {
		const parseResult = this.documentService.getParseResult(uri);
		if (!parseResult) return [];

		const diagnostics: Diagnostic[] = [];

		// 1. Syntax errors from the parse
		for (const err of parseResult.syntaxErrors) {
			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line: err.line - 1, character: err.column },
					end: { line: err.line - 1, character: err.column + 1 }
				},
				message: `Error: ${err.message}`
			});
		}

		// 2. Deprecated function calls (token-based, always runs)
		diagnostics.push(...validateDeprecatedCalls(parseResult));

		// 3. Semantic validation — only when zero syntax errors
		if (parseResult.syntaxErrors.length === 0) {
			// 3a. Variable redeclaration checking
			const includeFileVariables = await this.includeService.getIncludeFileVariables(uri);
			const redeclDiagnostics = validateVariableRedeclarations(
				parseResult.tree,
				includeFileVariables,
				parseResult.conditionalLines
			);
			diagnostics.push(...redeclDiagnostics);

			// 3b. Function redeclaration checking (issue #44)
			const funcRedeclDiagnostics = validateFunctionRedeclarations(parseResult.tree, includeFileVariables);
			diagnostics.push(...funcRedeclDiagnostics);

			// 3c. Undeclared identifier checking
			const knownSymbols = await this.buildKnownSymbols(uri);
			const undeclaredDiagnostics = validateUndeclaredIdentifiers(
				parseResult.tree,
				knownSymbols
			);
			diagnostics.push(...undeclaredDiagnostics);

			// 3d. Return statement validation (issue #47)
			const returnDiagnostics = validateReturnStatements(parseResult.tree);
			diagnostics.push(...returnDiagnostics);
		}

		return diagnostics;
	}

	/** Builds KnownSymbols directly from DocumentService + IncludeService + PrototypeService. */
	private async buildKnownSymbols(uri: string): Promise<KnownSymbols> {
		const knownSymbols: KnownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>(),
		};

		// Built-in prototypes
		for (const name of this.prototypeService.getAllNames()) {
			knownSymbols.functions.add(name.toLowerCase());
		}

		// Document symbols
		const docViews = this.documentService.getDerivedViews(uri);
		if (docViews) {
			for (const fn of docViews.exportedFunctions.keys()) {
				knownSymbols.functions.add(fn.toLowerCase());
			}
			for (const v of docViews.exportedVariables.keys()) {
				knownSymbols.variables.add(v.toLowerCase());
			}
		}

		// Document defines
		const docDefines = this.documentService.getDefines(uri);
		for (const def of docDefines) {
			knownSymbols.defines.add(def.name.toLowerCase());
		}

		// Include file symbols and defines
		const includeFiles = await this.includeService.getIncludeFiles(uri);
		for (const includeFsPath of includeFiles) {
			const views = this.documentService.getDerivedViewsForFsPath(includeFsPath);
			if (views) {
				for (const fn of views.exportedFunctions.keys()) {
					knownSymbols.functions.add(fn.toLowerCase());
				}
				for (const v of views.exportedVariables.keys()) {
					knownSymbols.variables.add(v.toLowerCase());
				}
			}
			const defines = this.documentService.getDefinesForFsPath(includeFsPath);
			for (const def of defines) {
				knownSymbols.defines.add(def.name.toLowerCase());
			}
		}

		return knownSymbols;
	}
}
