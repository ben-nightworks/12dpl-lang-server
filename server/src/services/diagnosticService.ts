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
import { parse } from '../core/parsePipeline';
import { validateVariableRedeclarations, 
	validateFunctionRedeclarations, 
	validateUndeclaredIdentifiers, 
	validateDeprecatedCalls, 
	validateVoidFunctionReturnValues,
	validateFunctionArguments,
	validateReturnStatements,
	validateArraySize,
	validateControlFlow,
	validateAssignmentTypes,
	validateLogicalConditions} from '../core/validators';
import type { FunctionSignatureMap, OverloadReturnType } from '../core/validators';
import type { KnownSymbols, ParameterSymbolInfo } from '../core/types';

export class DiagnosticService {
	constructor(
		private readonly documentService: DocumentService,
		private readonly includeService: IncludeService,
		private readonly prototypeService: PrototypeService
	) {}

	/** Returns all diagnostics for a document. Single entry point. */
	async validate(uri: string): Promise<Diagnostic[]> {
		// Resolve include-file defines before parsing so that object-like macros
		// defined in headers (e.g. `#define Boolean Integer`) are expanded in the
		// document text fed to ANTLR. Without this, type-alias defines from included
		// files cause false syntax errors (issue #133).
		const includeDefines = await this.includeService.getIncludeDefines(uri);
		const extraDefines = includeDefines
			.filter(d => !d.defineParams?.length && d.value !== undefined && d.value !== '')
			.map(d => ({ name: d.name, value: d.value! }));

		// When include-file defines are present, re-parse the document with them
		// so the expanded text is used for all validation. Fall back to the
		// cached result when there are no extra defines to avoid the extra parse.
		let parseResult = this.documentService.getParseResult(uri);
		if (extraDefines.length > 0) {
			const text = this.documentService.getText(uri);
			if (text != null) {
				parseResult = parse(text, extraDefines);
			}
		}
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
			const funcRedeclDiagnostics = validateFunctionRedeclarations(parseResult.tree, includeDeclarations, parseResult.conditionalLines);
			diagnostics.push(...funcRedeclDiagnostics);

			// 3c. Undeclared identifier checking
			const knownSymbols = await this.buildKnownSymbols(uri);
			const undeclaredDiagnostics = validateUndeclaredIdentifiers(
				parseResult.tree,
				knownSymbols,
				parseResult.conditionalLines
			);
			diagnostics.push(...undeclaredDiagnostics);

			// 3d. Function argument checking (issue #45)
			const functionSignatures = await this.buildFunctionSignatures(uri);
			const functionReturnTypes = await this.buildFunctionReturnTypes(uri);
			const simpleReturnTypes = this.flattenReturnTypes(functionReturnTypes);
			const argDiagnostics = validateFunctionArguments(
				parseResult.tree,
				functionSignatures,
				simpleReturnTypes
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

			// 3h. Control flow validation (issues #96, #97, #98, #99)
			const controlFlowDiagnostics = validateControlFlow(parseResult.tree);
			diagnostics.push(...controlFlowDiagnostics);

			// 3i. Assignment type validation (issue #100)
			const assignmentTypeDiagnostics = validateAssignmentTypes(parseResult.tree);
			diagnostics.push(...assignmentTypeDiagnostics);

			// 3j. Logical condition validation (issue #101)
			const logicalConditionDiagnostics = validateLogicalConditions(parseResult.tree);
			diagnostics.push(...logicalConditionDiagnostics);
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

	/** Flattens overload return types to a simple name→returnType map for validators that don't need overload awareness. */
	private flattenReturnTypes(overloadMap: Map<string, OverloadReturnType[]>): Map<string, string> {
		const result = new Map<string, string>();
		for (const [name, overloads] of overloadMap) {
			if (overloads.length > 0) {
				// Prefer a non-void overload if one exists
				const nonVoid = overloads.find(o => o.returnType !== 'void');
				result.set(name, nonVoid ? nonVoid.returnType : overloads[0].returnType);
			}
		}
		return result;
	}

	/** Builds a map of function name → overload return types for void-return-value checking. */
	private async buildFunctionReturnTypes(uri: string): Promise<Map<string, OverloadReturnType[]>> {
		const returnTypes = new Map<string, OverloadReturnType[]>();

		const addOverload = (name: string, paramCount: number, returnType: string) => {
			const existing = returnTypes.get(name) ?? [];
			existing.push({ paramCount, returnType });
			returnTypes.set(name, existing);
		};

		// Built-in prototypes
		for (const name of this.prototypeService.getAllNames()) {
			const overloads = this.prototypeService.getPrototypes(name);
			for (const overload of overloads) {
				addOverload(name, overload.parameters.length, overload.returnType);
			}
		}

		// Document functions
		const docViews = this.documentService.getDerivedViews(uri);
		if (docViews) {
			for (const [name, decls] of docViews.allFunctions) {
				for (const decl of decls) {
					if (decl.returnType) {
						addOverload(name, decl.params?.length ?? 0, decl.returnType);
					}
				}
			}
		}

		// Include file functions
		const includeFiles = await this.includeService.getIncludeFiles(uri);
		for (const includeFsPath of includeFiles) {
			const views = this.documentService.getDerivedViewsForFsPath(includeFsPath);
			if (views) {
				for (const [name, decls] of views.exportedFunctions) {
					for (const decl of decls) {
						if (decl.returnType) {
							addOverload(name, decl.params?.length ?? 0, decl.returnType);
						}
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
