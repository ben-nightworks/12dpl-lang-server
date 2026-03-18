/**
 * Function redeclaration validation — detects function redefinitions.
 * Issue #44: Functions defined twice not detected as errors
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
 * Validates that functions are not defined more than once.
 * Tracks function definitions and reports errors when the same function
 * is defined multiple times in the same scope or when a function is
 * redefined after being declared in an include file.
 */
export function validateFunctionRedeclarations(
	tree: any,
	includeFileVariables: IncludeFileVariable[] = []
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const definedFunctions = new Map<string, { line: number; column: number; name: string }>();

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
			const existing = definedFunctions.get(lowerName);

			if (existing) {
				diagnostics.push({
					severity: DiagnosticSeverity.Error,
					range: {
						start: { line: info.line - 1, character: info.column },
						end: { line: info.line - 1, character: info.column + info.name.length }
					},
					message: `Function '${info.name}' is already defined at line ${existing.line}`
				});
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
					definedFunctions.set(lowerName, { line: info.line, column: info.column, name: info.name });
				}
			}

			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}
