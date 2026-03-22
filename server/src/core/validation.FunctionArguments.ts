/**
 * Function argument validation — detects type mismatches in function call arguments.
 * Issue #45: Invalid function arguments not detected as error
 *
 * Checks that each function call's arguments match at least one overload's
 * parameter types. Reports an error when no overload matches.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import type { ParameterSymbolInfo } from './types';
import {
	safeTokenText,
	safeTokenLine,
	safeTokenColumn,
	extractIdentifierFromDeclarator,
} from './validation.Common';

/** One overload's parameter list. */
type ParamList = ParameterSymbolInfo[];

/** All overloads for a function, keyed by name. */
export type FunctionSignatureMap = Map<string, ParamList[]>;

/**
 * Extracts parameter info from a function definition's declarator context.
 */
function extractParams(declaratorCtx: any): ParamList {
	const params: ParamList = [];
	try {
		let cur = declaratorCtx?.directDeclarator?.() ?? declaratorCtx;
		while (cur) {
			try {
				const pt = cur.parameterTypeList?.();
				if (pt) {
					const plist = pt.parameterList?.();
					for (const pd of plist?.parameterDeclaration_list?.() ?? []) {
						const typeText = pd?.declarationSpecifiers?.()?.getText?.() ?? '';
						const nameText = safeTokenText(pd?.Identifier?.()) ?? undefined;
						const byRef = !!pd?.And?.();
						const isArray = !!pd?.LeftBracket?.();
						params.push({ name: nameText, type: typeText, byRef, isArray });
					}
					return params;
				}
			} catch { /* ignore */ }
			try { cur = cur.directDeclarator?.() ?? null; } catch { break; }
		}
	} catch { /* ignore */ }
	return params;
}

/**
 * Builds a displayable parameter signature like "Dynamic_Integer, Integer".
 */
function formatParamTypes(params: ParamList): string {
	return params.map(p => {
		let t = p.type ?? '?';
		if (p.isArray) t += '[]';
		return t;
	}).join(', ');
}

/**
 * Checks whether a given argument type is compatible with a parameter type.
 * In 12dPL, Integer and Real are numerically compatible.
 */
function isTypeCompatible(argType: string, paramType: string, paramIsArray: boolean): boolean {
	if (!argType || !paramType) return true; // unknown types — don't flag

	const a = argType.toLowerCase();
	const p = paramType.toLowerCase();

	if (a === p) return true;

	// Integer ↔ Real numeric compatibility
	const numericTypes = new Set(['integer', 'real']);
	if (!paramIsArray && numericTypes.has(a) && numericTypes.has(p)) return true;

	return false;
}

/**
 * Tries to resolve the type of an argument expression.
 * Handles simple identifiers by looking them up in the declared variables map.
 * Returns undefined if the type cannot be determined.
 */
function resolveArgType(argCtx: any, declaredVars: Map<string, string>): string | undefined {
	try {
		const text = argCtx?.getText?.();
		if (!text) return undefined;

		// String literal
		if (text.startsWith('"') && text.endsWith('"')) return 'Text';

		// Integer literal
		if (/^[0-9]+$/.test(text) || /^0x[0-9a-fA-F]+$/i.test(text)) return 'Integer';

		// Real literal
		if (/^[0-9]*\.[0-9]+$/.test(text)) return 'Real';

		// Simple identifier — look up in declared variables
		return declaredVars.get(text);
	} catch { return undefined; }
}

/**
 * Validates that function call arguments match at least one overload's parameter types.
 *
 * @param tree - ANTLR parse tree
 * @param externalSignatures - Map of function name → array of overload param lists
 *   (from prototypes, include files, etc.)
 */
export function validateFunctionArguments(
	tree: any,
	externalSignatures: FunctionSignatureMap
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	// Phase 1: Collect local function definitions and variable declarations
	const localSignatures: FunctionSignatureMap = new Map();
	const declaredVars = new Map<string, string>(); // name → type

	const getTypeText = (ctx: any): string | undefined => {
		try {
			const text = ctx?.declarationSpecifiers?.()?.getText?.();
			return typeof text === 'string' && text.length ? text : undefined;
		} catch { return undefined; }
	};

	const collector: any = {
		visitTerminal() { return undefined; },
		visitErrorNode() { return undefined; },
		visitChildren(ctx: any) {
			for (const child of ctx?.children ?? []) {
				if (child && typeof child.accept === 'function') child.accept(collector);
			}
			return undefined;
		},
		visitFunctionDefinition(ctx: any) {
			const decl = ctx?.declarator?.();
			const info = extractIdentifierFromDeclarator(decl);
			if (info) {
				const params = extractParams(decl);
				const existing = localSignatures.get(info.name);
				if (existing) {
					existing.push(params);
				} else {
					localSignatures.set(info.name, [params]);
				}
			}
			return collector.visitChildren(ctx);
		},
		visitDeclaration(ctx: any) {
			const declType = getTypeText(ctx);
			if (declType) {
				const list = ctx?.initDeclaratorList?.();
				try {
					for (const initDecl of list?.initDeclarator_list?.() ?? []) {
						const declarator = initDecl?.declarator?.();
						const info = extractIdentifierFromDeclarator(declarator);
						if (info) {
							declaredVars.set(info.name, declType);
						}
					}
				} catch { /* ignore */ }
			}
			return collector.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			const declType = getTypeText(ctx);
			if (declType) {
				const list = ctx?.initDeclaratorList?.();
				try {
					for (const initDecl of list?.initDeclarator_list?.() ?? []) {
						const declarator = initDecl?.declarator?.();
						const info = extractIdentifierFromDeclarator(declarator);
						if (info) {
							declaredVars.set(info.name, declType);
						}
					}
				} catch { /* ignore */ }
			}
			return collector.visitChildren(ctx);
		},
		visitParameterDeclaration(ctx: any) {
			try {
				const typeText = ctx?.declarationSpecifiers?.()?.getText?.();
				const idNode = ctx?.Identifier?.();
				const name = safeTokenText(idNode);
				if (name && typeText) {
					declaredVars.set(name, typeText);
				}
			} catch { /* ignore */ }
			return collector.visitChildren(ctx);
		}
	};

	try { tree.accept(collector); } catch { /* ignore */ }

	// Combine local + external signatures for lookup
	const resolveSignatures = (name: string): ParamList[] | undefined => {
		return localSignatures.get(name) ?? externalSignatures.get(name);
	};

	// Phase 2: Find function calls and check argument types
	const checker: any = {
		visitTerminal() { return undefined; },
		visitErrorNode() { return undefined; },
		visitChildren(ctx: any) {
			for (const child of ctx?.children ?? []) {
				if (child && typeof child.accept === 'function') child.accept(checker);
			}
			return undefined;
		},
		visitPostfixExpression(ctx: any) {
			try {
				const leftParenTokens = ctx?.LeftParen_list?.();
				if (!leftParenTokens || leftParenTokens.length === 0) {
					return checker.visitChildren(ctx);
				}

				const primary = ctx?.primaryExpression?.();
				const idNode = primary?.Identifier?.();
				const funcName = safeTokenText(idNode);
				if (!funcName) return checker.visitChildren(ctx);

				const overloads = resolveSignatures(funcName);
				if (!overloads || overloads.length === 0) {
					return checker.visitChildren(ctx);
				}

				// Get the argument expressions
				const argLists = ctx?.argumentExpressionList_list?.() ?? [];
				const argList = argLists.length > 0 ? argLists[0] : null;
				const argExprs = argList?.assignmentExpression_list?.() ?? [];
				const argCount = argExprs.length;

				// Check if any overload matches
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (line === null || column === null) return checker.visitChildren(ctx);

				// First check: does any overload match by parameter count?
				const countMatches = overloads.filter(params => params.length === argCount);

				if (countMatches.length === 0) {
					// No overload with matching parameter count
					const expectedCounts = [...new Set(overloads.map(p => p.length))].sort().join(' or ');
					diagnostics.push({
						severity: DiagnosticSeverity.Error,
						range: {
							start: { line: line - 1, character: column },
							end: { line: line - 1, character: column + funcName.length }
						},
						message: `Function '${funcName}' expects ${expectedCounts} argument(s) but got ${argCount}`
					});
				} else {
					// Check type compatibility for overloads with matching count
					const argTypes: (string | undefined)[] = argExprs.map(
						(arg: any) => resolveArgType(arg, declaredVars)
					);

					const anyOverloadMatches = countMatches.some(params =>
						params.every((param, i) => {
							const argType = argTypes[i];
							if (!argType || !param.type) return true; // can't check — assume OK
							return isTypeCompatible(argType, param.type, !!param.isArray);
						})
					);

					if (!anyOverloadMatches) {
						const argTypeStr = argTypes.map(t => t ?? '?').join(', ');
						const expectedSigs = countMatches
							.map(params => `${funcName}(${formatParamTypes(params)})`)
							.join('; ');
						diagnostics.push({
							severity: DiagnosticSeverity.Error,
							range: {
								start: { line: line - 1, character: column },
								end: { line: line - 1, character: column + funcName.length }
							},
							message: `Function call '${funcName}' args mismatch — got (${argTypeStr}), expected ${expectedSigs}`
						});
					}
				}
			} catch { /* ignore */ }

			// Visit children but skip primary (already handled above)
			const children: any[] = ctx?.children ?? [];
			for (const child of children) {
				if (child && typeof child.accept === 'function') {
					const isPrimary = child.constructor?.name === 'PrimaryExpressionContext';
					if (!isPrimary) child.accept(checker);
				}
			}
			try {
				for (const argList of ctx?.argumentExpressionList_list?.() ?? []) {
					argList?.accept?.(checker);
				}
			} catch { /* ignore */ }
			return undefined;
		}
	};

	try { tree.accept(checker); } catch { /* ignore */ }

	return diagnostics;
}
