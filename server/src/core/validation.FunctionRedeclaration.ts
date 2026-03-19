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

import type { IncludeFileVariable } from './types';
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
						parts.push((typeText + (isArray ? '[]' : '')).toLowerCase());
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
 * Validates that functions are not defined more than once.
 * Tracks function definitions by name AND parameter signature.
 * Same name with different parameter types (overloading) is allowed.
 * Same name with identical parameter types is reported as an error.
 */
export function validateFunctionRedeclarations(
	tree: any,
	includeFileVariables: IncludeFileVariable[] = []
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	// Map from lowercase name → array of { signature, line, column, name }
	const definedFunctions = new Map<string, { signature: string; line: number; column: number; name: string }[]>();

	// Track functions from include files
	const includeFunctions = new Map<string, { sourceFile: string }>();
	for (const v of includeFileVariables) {
		if (v.kind === 'function') {
			includeFunctions.set(v.name.toLowerCase(), { sourceFile: v.sourceFile });
		}
	}

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
			const decl = ctx?.declarator?.();
			const info = extractIdentifierFromDeclarator(decl);
			if (!info) return visitor.visitChildren(ctx);

			const lowerName = info.name.toLowerCase();
			const paramSig = extractParamSignature(decl);
			const existing = definedFunctions.get(lowerName);

			if (existing) {
				// Check if any existing definition has the same parameter signature
				const duplicate = existing.find(e => e.signature === paramSig);
				if (duplicate) {
					diagnostics.push({
						severity: DiagnosticSeverity.Error,
						range: {
							start: { line: info.line - 1, character: info.column },
							end: { line: info.line - 1, character: info.column + info.name.length }
						},
						message: `Function '${info.name}' is already defined at line ${duplicate.line}`
					});
				} else {
					// Different signature — this is a valid overload
					existing.push({ signature: paramSig, line: info.line, column: info.column, name: info.name });
				}
			} else {
				// Check if it conflicts with a function from an include file
				const includeFunc = includeFunctions.get(lowerName);
				if (includeFunc) {
					diagnostics.push({
						severity: DiagnosticSeverity.Error,
						range: {
							start: { line: info.line - 1, character: info.column },
							end: { line: info.line - 1, character: info.column + info.name.length }
						},
						message: `Function '${info.name}' is already defined in included file '${includeFunc.sourceFile}'`
					});
				} else {
					definedFunctions.set(lowerName, [{ signature: paramSig, line: info.line, column: info.column, name: info.name }]);
				}
			}

			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}
