/**
 * Return value validation — checks that non-void functions return a value
 * and that return expression types match the declared return type.
 *
 * Issue #47: No check for required return value
 * Also: return type checking (return expression vs declared return type)
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
	safeTokenText,
	safeTokenLine,
	safeTokenColumn,
	extractIdentifierFromDeclarator,
	type DeclaredSymbol,
} from './validation.Common';
import { isSubtypeOf, isPromotableTo } from './typeHierarchy';

/** Generated wrapper prefix — skip validation for synthetic script wrappers. */
const GENERATED_WRAPPER_PREFIX = '__12dpl__';

/**
 * Gets the return type from a function definition's declarationSpecifiers.
 */
function getReturnType(ctx: any): string | undefined {
	try {
		const text = ctx?.declarationSpecifiers?.()?.getText?.();
		return typeof text === 'string' && text.length ? text : undefined;
	} catch { return undefined; }
}

/**
 * Gets the last effective statement from a compound statement,
 * unwrapping block items to find the final statement.
 * Returns null if the compound statement is empty.
 */
function getLastStatement(compoundStmt: any): any | null {
	try {
		const blockItemList = compoundStmt?.blockItemList?.();
		if (!blockItemList) return null;

		const blockItems = blockItemList?.blockItem_list?.();
		if (!blockItems || blockItems.length === 0) return null;

		const lastItem = blockItems[blockItems.length - 1];
		return lastItem?.statement?.() ?? null;
	} catch { return null; }
}

/**
 * Checks whether a statement is or ends with a return statement.
 * Handles:
 * - Direct jump statements (return ...)
 * - If/else where both branches end with return
 */
function endsWithReturn(stmt: any): boolean {
	if (!stmt) return false;

	try {
		// Direct jump statement with return
		const jump = stmt.jumpStatement?.();
		if (jump) {
			const returnToken = jump.Return?.();
			if (returnToken) return true;
		}

		// If/else — both branches must end with return
		const selection = stmt.selectionStatement?.();
		if (selection) {
			const ifToken = selection.If?.();
			if (ifToken) {
				const stmts = selection.statement_list?.();
				if (stmts && stmts.length === 2) {
					// Has both if and else branches
					return endsWithReturn(stmts[0]) && endsWithReturn(stmts[1]);
				}
			}
		}

		// Compound statement — check the last statement inside
		const compound = stmt.compoundStatement?.();
		if (compound) {
			const lastStmt = getLastStatement(compound);
			return endsWithReturn(lastStmt);
		}
	} catch { /* ignore */ }

	return false;
}

/**
 * Infers the type of a return expression from simple cases.
 * Returns undefined if the type cannot be determined.
 */
function inferReturnExprType(exprCtx: any, declaredVars: Map<string, string>): string | undefined {
	try {
		const text = exprCtx?.getText?.();
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
 * Checks whether two types are an exact match (case-insensitive).
 */
function isReturnTypeMatch(exprType: string, declaredReturnType: string): boolean {
	if (!exprType || !declaredReturnType) return true; // unknown — don't flag

	if (exprType === declaredReturnType) return true;

	// Automatic type promotions (e.g. Integer→Real, Point→Segment)
	if (isPromotableTo(exprType, declaredReturnType)) return true;

	// Built-in type inheritance (e.g. returning Panel where Widget is expected)
	if (isSubtypeOf(exprType, declaredReturnType)) return true;

	return false;
}

/**
 * Validates:
 * 1. Non-void functions have a return statement as their last statement
 * 2. Return expression types match the function's declared return type
 * 3. Void functions don't return a value
 *
 * @param tree - ANTLR parse tree
 */
export function validateReturnStatements(tree: any): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

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

			// Skip generated wrapper functions
			if (info.name.startsWith(GENERATED_WRAPPER_PREFIX)) {
				return visitor.visitChildren(ctx);
			}

			const returnType = getReturnType(ctx);
			const isVoid = !returnType || returnType === 'void';

			const compoundStmt = ctx?.compoundStatement?.();
			if (!compoundStmt) return visitor.visitChildren(ctx);

			// Check 1: Non-void functions must end with a return statement
			if (!isVoid) {
				const lastStmt = getLastStatement(compoundStmt);
				if (!endsWithReturn(lastStmt)) {
					diagnostics.push({
						severity: DiagnosticSeverity.Error,
						range: {
							start: { line: info.line - 1, character: info.column },
							end: { line: info.line - 1, character: info.column + info.name.length }
						},
						message: `Function '${info.name}' has return type '${returnType}' but does not end with a return statement`
					});
				}
			}

			// Check 2 & 3: Return type checking
			// Collect variable types within this function, then check return statements
			const declaredVars = new Map<string, string>();

			const innerVisitor: any = {
				visitTerminal() { return undefined; },
				visitErrorNode() { return undefined; },
				visitChildren(innerCtx: any) {
					for (const child of innerCtx?.children ?? []) {
						if (child && typeof child.accept === 'function') child.accept(innerVisitor);
					}
					return undefined;
				},
				visitFunctionDefinition() {
					// Don't descend into nested function definitions
					return undefined;
				},
				visitDeclaration(declCtx: any) {
					try {
						const declType = declCtx?.declarationSpecifiers?.()?.getText?.();
						if (declType) {
							const list = declCtx?.initDeclaratorList?.();
							for (const initDecl of list?.initDeclarator_list?.() ?? []) {
								const declarator = initDecl?.declarator?.();
								const varInfo = extractIdentifierFromDeclarator(declarator);
								if (varInfo) {
									declaredVars.set(varInfo.name, declType);
								}
							}
						}
					} catch { /* ignore */ }
					return innerVisitor.visitChildren(declCtx);
				},
				visitParameterDeclaration(paramCtx: any) {
					try {
						const typeText = paramCtx?.declarationSpecifiers?.()?.getText?.();
						const idNode = paramCtx?.Identifier?.();
						const name = safeTokenText(idNode);
						if (name && typeText) {
							declaredVars.set(name, typeText);
						}
					} catch { /* ignore */ }
					return innerVisitor.visitChildren(paramCtx);
				},
				visitJumpStatement(jumpCtx: any) {
					try {
						const returnToken = jumpCtx?.Return?.();
						if (!returnToken) return innerVisitor.visitChildren(jumpCtx);

						const returnLine = safeTokenLine(returnToken);
						const returnColumn = safeTokenColumn(returnToken);
						if (returnLine === null || returnColumn === null) return innerVisitor.visitChildren(jumpCtx);

						const expr = jumpCtx?.expression?.();

						if (isVoid) {
							// Void function should not return a value
							if (expr) {
								diagnostics.push({
									severity: DiagnosticSeverity.Error,
									range: {
										start: { line: returnLine - 1, character: returnColumn },
										end: { line: returnLine - 1, character: returnColumn + 6 } // "return"
									},
									message: `Void function '${info.name}' should not return a value`
								});
							}
						} else {
							// Non-void function — check return has a value and type matches
							if (!expr) {
								diagnostics.push({
									severity: DiagnosticSeverity.Error,
									range: {
										start: { line: returnLine - 1, character: returnColumn },
										end: { line: returnLine - 1, character: returnColumn + 6 }
									},
									message: `Function '${info.name}' has return type '${returnType}' but returns no value`
								});
							} else {
								// Check type compatibility
								const exprType = inferReturnExprType(expr, declaredVars);
								if (exprType && returnType && !isReturnTypeMatch(exprType, returnType)) {
									diagnostics.push({
										severity: DiagnosticSeverity.Error,
										range: {
											start: { line: returnLine - 1, character: returnColumn },
											end: { line: returnLine - 1, character: returnColumn + 6 }
										},
										message: `Function '${info.name}' returns '${exprType}' but declared return type is '${returnType}'`
									});
								}
							}
						}
					} catch { /* ignore */ }
					return innerVisitor.visitChildren(jumpCtx);
				}
			};

			// Walk the declarator to collect parameter types
			if (decl) decl.accept(innerVisitor);

			// Walk inside the function body
			compoundStmt.accept(innerVisitor);

			// Still visit children for the outer tree walk (to find nested functions)
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}
