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
import { validateVariableRedeclarations, 
	validateFunctionRedeclarations, 
	validateUndeclaredIdentifiers, 
	validateDeprecatedCalls, 
	validateVoidFunctionReturnValues,
	validateFunctionArguments,
  validateReturnStatements,
  validateArraySize} from '../core/validators';
import type { FunctionSignatureMap } from '../core/validators';
import type { KnownSymbols, ParameterSymbolInfo } from '../core/types';

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
			const includeDeclarations = await this.includeService.getIncludeFileDeclarations(uri);
			const redeclDiagnostics = validateVariableRedeclarations(
				parseResult.tree,
				includeDeclarations,
				parseResult.conditionalLines
			);
			diagnostics.push(...redeclDiagnostics);

			// 3b. Function redeclaration checking (issue #44)
			const funcRedeclDiagnostics = validateFunctionRedeclarations(parseResult.tree, includeDeclarations);
			diagnostics.push(...funcRedeclDiagnostics);

			// 3c. Undeclared identifier checking
			const knownSymbols = await this.buildKnownSymbols(uri);
			const undeclaredDiagnostics = validateUndeclaredIdentifiers(
				parseResult.tree,
				knownSymbols
			);
			diagnostics.push(...undeclaredDiagnostics);

			// 3d. Function argument checking (issue #45)
			const functionSignatures = await this.buildFunctionSignatures(uri);
			const functionReturnTypes = await this.buildFunctionReturnTypes(uri);
			const argDiagnostics = validateFunctionArguments(
				parseResult.tree,
				functionSignatures,
				functionReturnTypes
			);
			diagnostics.push(...argDiagnostics);

			// 3e. Void function return value checking (issue #46)
			const voidReturnDiagnostics = validateVoidFunctionReturnValues(
				parseResult.tree,
				functionReturnTypes
			);
			diagnostics.push(...voidReturnDiagnostics);

      // 3f. Return statement validation (issue #47)
			const returnDiagnostics = validateReturnStatements(parseResult.tree);
			diagnostics.push(...returnDiagnostics);

			// 3g. Array size validation (issue #73)
			const arraySizeDiagnostics = validateArraySize(parseResult.tree);
			diagnostics.push(...arraySizeDiagnostics);
      
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
			knownSymbols.functions.add(name);
		}

		// Document symbols
		const docViews = this.documentService.getDerivedViews(uri);
		if (docViews) {
			for (const fn of docViews.exportedFunctions.keys()) {
				knownSymbols.functions.add(fn);
			}
			for (const v of docViews.exportedVariables.keys()) {
				knownSymbols.variables.add(v);
			}
		}

		// Document defines
		const docDefines = this.documentService.getDefines(uri);
		for (const def of docDefines) {
			knownSymbols.defines.add(def.name);
		}

		// Include file symbols and defines
		const includeFiles = await this.includeService.getIncludeFiles(uri);
		for (const includeFsPath of includeFiles) {
			const views = this.documentService.getDerivedViewsForFsPath(includeFsPath);
			if (views) {
				for (const fn of views.exportedFunctions.keys()) {
					knownSymbols.functions.add(fn);
				}
				for (const v of views.exportedVariables.keys()) {
					knownSymbols.variables.add(v);
				}
			}
			const defines = this.documentService.getDefinesForFsPath(includeFsPath);
			for (const def of defines) {
				knownSymbols.defines.add(def.name);
			}
		}

		return knownSymbols;
	}

	/** Builds a map of function name → return type for void-return-value checking. */
	private async buildFunctionReturnTypes(uri: string): Promise<Map<string, string>> {
		const returnTypes = new Map<string, string>();

		// Built-in prototypes — only mark as void if ALL overloads return void
		for (const name of this.prototypeService.getAllNames()) {
			const overloads = this.prototypeService.getPrototypes(name);
			if (overloads.length > 0) {
				const allVoid = overloads.every(o => o.returnType === 'void');
				returnTypes.set(name, allVoid ? 'void' : overloads[0].returnType);
			}
		}

		// Document functions
		const docViews = this.documentService.getDerivedViews(uri);
		if (docViews) {
			for (const [name, decls] of docViews.allFunctions) {
				if (decls.length > 0 && decls[0].returnType) {
					returnTypes.set(name, decls[0].returnType);
				}
			}
		}

		// Include file functions
		const includeFiles = await this.includeService.getIncludeFiles(uri);
		for (const includeFsPath of includeFiles) {
			const views = this.documentService.getDerivedViewsForFsPath(includeFsPath);
			if (views) {
				for (const [name, decls] of views.exportedFunctions) {
					if (decls.length > 0 && decls[0].returnType) {
						returnTypes.set(name, decls[0].returnType);
					}
				}
			}
		}
		return returnTypes;
	}

	/** Builds a map of function name → overload parameter lists for argument checking. */
	private async buildFunctionSignatures(uri: string): Promise<FunctionSignatureMap> {
		const signatures: FunctionSignatureMap = new Map();

		const addOverloads = (name: string, params: ParameterSymbolInfo[]) => {
			const existing = signatures.get(name);
			if (existing) {
				existing.push(params);
			} else {
				signatures.set(name, [params]);
			}
		};

		// Built-in prototypes
		for (const name of this.prototypeService.getAllNames()) {
			const overloads = this.prototypeService.getPrototypes(name);
			for (const overload of overloads) {
				addOverloads(name, overload.parameters.map(p => ({
					name: p.name,
					type: p.type,
				})));
			}
		}

		// Include file functions
		const includeFiles = await this.includeService.getIncludeFiles(uri);
		for (const includeFsPath of includeFiles) {
			const views = this.documentService.getDerivedViewsForFsPath(includeFsPath);
			if (views) {
				for (const [name, decls] of views.exportedFunctions) {
					for (const decl of decls) {
						if (decl.params) {
							addOverloads(name, decl.params);
						}
					}
				}
			}
		}
		return signatures;
	}
}
