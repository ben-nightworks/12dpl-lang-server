/**
 * Function redeclaration validation — detects function redefinitions.
 * Issue #44: Functions defined twice not detected as errors
 *
 * Supports function overloading: same name with different parameter signatures is allowed.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import type { SymbolDeclaration } from './types';
import {
	safeTokenText,
	safeTokenLine,
	safeTokenColumn,
	extractIdentifierFromDeclarator,
} from './validation.Common';

/**
 * Extracts a parameter type signature string from a function's directDeclarator.
 * Returns a comma-separated list of parameter types (e.g. "Integer,Integer[],Real[]").
 * Used to distinguish overloaded functions.
 */
function extractParamSignature(declaratorCtx: any): string {
	try {
		let cur = declaratorCtx?.directDeclarator?.() ?? declaratorCtx;
		while (cur) {
			try {
				const pt = cur.parameterTypeList?.();
				if (pt) {
					const parts: string[] = [];
					const plist = pt.parameterList?.();
					for (const pd of plist?.parameterDeclaration_list?.() ?? []) {
						const typeText = pd?.declarationSpecifiers?.()?.getText?.() ?? '';
						const isArray = !!pd?.LeftBracket?.();
						parts.push(typeText + (isArray ? '[]' : ''));
					}
					return parts.join(',');
				}
			} catch { /* ignore */ }
			try { cur = cur.directDeclarator?.() ?? null; } catch { break; }
		}
	} catch { /* ignore */ }
	return '';
}

/**
 * Checks whether a declarator represents a function (has parentheses).
 */
function isFunctionDeclarator(declaratorCtx: any): boolean {
	try {
		const direct = declaratorCtx?.directDeclarator?.();
		if (direct?.parameterTypeList?.() != null) return true;
		if (direct?.LeftParen?.() != null) return true;
	} catch { /* ignore */ }
	return false;
}

/**
 * Validates that functions are not defined more than once.
 * Tracks function definitions by name AND parameter signature.
 * Same name with different parameter types (overloading) is allowed.
 * Same name with identical parameter types is reported as an error.
 */
export function validateFunctionRedeclarations(
	tree: any,
	includeDeclarations: SymbolDeclaration[] = [],
	conditionalLines?: Set<number>
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	// Map from name → array of { signature, line, column, name, isForwardDecl }
	const definedFunctions = new Map<string, { signature: string; line: number; column: number; name: string; isForwardDecl: boolean }[]>();

	// Track functions from include files: name → array of { sourceFile, signature, isForwardDecl }
	const includeFunctions = new Map<string, { sourceFile: string; signature: string; isForwardDecl: boolean }[]>();
	for (const decl of includeDeclarations) {
		if (decl.kind === 'function') {
			const sig = (decl.params ?? []).map(p => {
				const typeStr = p.type ?? '';
				return typeStr + (p.isArray ? '[]' : '');
			}).join(',');
			const isForwardDecl = decl.isForwardDeclaration ?? false;
			const existing = includeFunctions.get(decl.name);
			if (existing) existing.push({ sourceFile: decl.definedInFsPath ?? '', signature: sig, isForwardDecl });
			else includeFunctions.set(decl.name, [{ sourceFile: decl.definedInFsPath ?? '', signature: sig, isForwardDecl }]);
		}
	}

	/** Shared check logic for both full definitions and forward declarations. */
	const checkFunction = (declaratorCtx: any, isForwardDecl: boolean) => {
		const info = extractIdentifierFromDeclarator(declaratorCtx);
		if (!info) return;

		// Skip functions defined on conditional lines (#if/#ifdef kept branches)
		const isOnConditionalLine = conditionalLines?.has(info.line) ?? false;

		const paramSig = extractParamSignature(declaratorCtx);
		const existing = definedFunctions.get(info.name);

		// 1. Always check against include files — every occurrence that matches is an error,
		//    EXCEPT when the include entry is only a forward declaration and the current
		//    occurrence is a full definition (standard C-style header + code pattern, issue #141).
		let hasIncludeConflict = false;
		const includeOverloads = includeFunctions.get(info.name);
		if (includeOverloads && !isOnConditionalLine) {
			const includeMatch = includeOverloads.find(o => o.signature === paramSig);
			if (includeMatch && !(includeMatch.isForwardDecl && !isForwardDecl)) {
				hasIncludeConflict = true;
				diagnostics.push({
					severity: DiagnosticSeverity.Error,
					range: {
						start: { line: info.line - 1, character: info.column },
						end: { line: info.line - 1, character: info.column + info.name.length }
					},
					message: `Function '${info.name}' is already defined in included file '${includeMatch.sourceFile}'`
				});
			}
		}

		// 2. Track locally for same-file duplicate detection
		if (existing) {
			const duplicate = existing.find(e => e.signature === paramSig);
			if (duplicate) {
				if (duplicate.isForwardDecl && !isForwardDecl) {
					// Full definition following a forward declaration — allowed, upgrade the entry
					duplicate.isForwardDecl = false;
					duplicate.line = info.line;
					duplicate.column = info.column;
				} else if (!duplicate.isForwardDecl && isForwardDecl) {
					// Forward declaration after a full definition — silently ignore
				} else if (!hasIncludeConflict && !isOnConditionalLine && !conditionalLines?.has(duplicate.line)) {
					// Two definitions or two forward declarations with same signature — error
					// (skip if already reported as include conflict or on conditional lines)
					diagnostics.push({
						severity: DiagnosticSeverity.Error,
						range: {
							start: { line: info.line - 1, character: info.column },
							end: { line: info.line - 1, character: info.column + info.name.length }
						},
						message: `Function '${info.name}' is already defined at line ${duplicate.line}`
					});
				}
			} else {
				// Different signature — this is a valid overload
				existing.push({ signature: paramSig, line: info.line, column: info.column, name: info.name, isForwardDecl });
			}
		} else {
			definedFunctions.set(info.name, [{ signature: paramSig, line: info.line, column: info.column, name: info.name, isForwardDecl }]);
		}
	};

	const visitor: any = {
		visitTerminal() { return undefined; },
		visitErrorNode() { return undefined; },
		visitChildren(ctx: any) {
			for (const child of ctx?.children ?? []) {
				if (child && typeof child.accept === 'function') child.accept(visitor);
			}
			return undefined;
		},
		visitFunctionDefinition(ctx: any) {
			checkFunction(ctx?.declarator?.(), false);
			return visitor.visitChildren(ctx);
		},
		visitDeclaration(ctx: any) {
			// Check forward declarations (e.g. "void process(Integer x);")
			try {
				for (const initDecl of ctx?.initDeclaratorList?.()?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					if (declarator && isFunctionDeclarator(declarator)) {
						checkFunction(declarator, true);
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}
