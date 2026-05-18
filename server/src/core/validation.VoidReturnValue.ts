/**
 * Void function return value validation — detects when void-returning functions
 * are used in expression contexts where a value is expected.
 * Issue #46: No check for whether a function return value is of a logical type
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
} from './validation.Common';

/**
 * Counts the number of parameters in a function definition's declarator.
 */
function countFunctionDefParams(declarator: any): number {
	try {
		const directDecl = declarator?.directDeclarator?.();
		if (!directDecl) return 0;
		const paramTypeList = directDecl?.parameterTypeList?.();
		if (!paramTypeList) return 0;
		const paramList = paramTypeList?.parameterList?.();
		if (!paramList) return 0;
		const paramDecls = paramList?.parameterDeclaration_list?.();
		return paramDecls?.length ?? 0;
	} catch {
		return 0;
	}
}

/**
 * Checks whether a function call's return value is being consumed
 * (i.e. used in an expression context rather than as a standalone statement).
 *
 * Walks up the parentCtx chain from the postfixExpression. If we reach an
 * ExpressionStatementContext with only single-child passthroughs in between,
 * the call is standalone (return value not used). Otherwise, the value is
 * being consumed by an operator, assignment, condition, argument, etc.
 */
function isReturnValueConsumed(postfixExprCtx: any): boolean {
	let current = postfixExprCtx;

	while (current?.parentCtx) {
		const parent = current.parentCtx;
		const parentName = parent.constructor?.name;

		// Reached expression statement — this is a standalone call
		if (parentName === 'ExpressionStatementContext') {
			return false;
		}

		// These contexts always consume the value
		if (parentName === 'SelectionStatementContext' ||
			parentName === 'IterationStatementContext' ||
			parentName === 'JumpStatementContext' ||
			parentName === 'ForConditionContext' ||
			parentName === 'ForExpressionContext' ||
			parentName === 'ArgumentExpressionListContext' ||
			parentName === 'InitDeclaratorContext') {
			return true;
		}

		// Check if the parent has sibling rule nodes — indicating an operator
		// (e.g. equalityExpression with two relationalExpression children and '==')
		const siblings = parent.children ?? [];
		let siblingRuleCount = 0;
		for (const child of siblings) {
			if (child !== current && child?.ruleIndex !== undefined) {
				siblingRuleCount++;
			}
		}
		if (siblingRuleCount > 0) {
			return true;
		}

		current = parent;
	}

	// If we exit without finding expressionStatement, assume value is consumed
	return true;
}

/**
 * Overload return type entry — one per overload of a function.
 */
export interface OverloadReturnType {
	paramCount: number;
	returnType: string;
}

/**
 * Validates that void-returning functions are not used in expression contexts
 * where a value is expected.
 *
 * @param tree - ANTLR parse tree
 * @param functionReturnTypes - Map of function name → overload return types.
 *   Each overload has a paramCount and returnType. At a call site, only
 *   overloads matching the argument count are considered. A call is flagged
 *   only if ALL matching overloads return void.
 */
export function validateVoidFunctionReturnValues(
	tree: any,
	functionReturnTypes: Map<string, OverloadReturnType[]>
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	// Phase 1: Collect local function definitions and their return types
	const localReturnTypes = new Map<string, OverloadReturnType[]>();

	const getReturnType = (ctx: any): string | undefined => {
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
			const returnType = getReturnType(ctx);
			const decl = ctx?.declarator?.();
			const info = extractIdentifierFromDeclarator(decl);
			if (info && returnType) {
				const paramCount = countFunctionDefParams(decl);
				const existing = localReturnTypes.get(info.name) ?? [];
				existing.push({ paramCount, returnType });
				localReturnTypes.set(info.name, existing);
			}
			return collector.visitChildren(ctx);
		}
	};

	try { tree.accept(collector); } catch { /* ignore */ }

	// Phase 2: Find void function calls used as values
	/**
	 * Resolves the return type for a function call, taking argument count into
	 * account. Returns 'void' only if ALL matching overloads return void.
	 * Returns undefined if the function is unknown.
	 */
	const resolveReturnType = (name: string, argCount: number): string | undefined => {
		const localOverloads = localReturnTypes.get(name) ?? [];
		const protoOverloads = functionReturnTypes.get(name) ?? [];
		const overloads = [...localOverloads, ...protoOverloads];
		if (overloads.length === 0) return undefined;

		// Find overloads matching the argument count
		const matching = overloads.filter(o => o.paramCount === argCount);

		// If an overload matches by count, use those
		if (matching.length > 0) {
			const allVoid = matching.every(o => o.returnType === 'void');
			return allVoid ? 'void' : matching.find(o => o.returnType !== 'void')!.returnType;
		}

		// No exact count match — fall back to all overloads
		// (argument count validation is handled by a separate validator)
		const allVoid = overloads.every(o => o.returnType === 'void');
		return allVoid ? 'void' : overloads.find(o => o.returnType !== 'void')!.returnType;
	};

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
				// Check if this is a function call (has '(' token)
				const leftParenTokens = ctx?.LeftParen_list?.();
				if (!leftParenTokens || leftParenTokens.length === 0) {
					return checker.visitChildren(ctx);
				}

				// Get the function name from the primary expression
				const primary = ctx?.primaryExpression?.();
				const idNode = primary?.Identifier?.();
				const funcName = safeTokenText(idNode);
				if (!funcName) return checker.visitChildren(ctx);

				// Count arguments at the call site
				const argLists = ctx?.argumentExpressionList_list?.() ?? [];
				const argList = argLists.length > 0 ? argLists[0] : null;
				const argExprs = argList?.assignmentExpression_list?.() ?? [];
				const argCount = argExprs.length;

				const returnType = resolveReturnType(funcName, argCount);
				if (!returnType || returnType !== 'void') {
					return checker.visitChildren(ctx);
				}

				// It's a void function call — check if the return value is consumed
				if (isReturnValueConsumed(ctx)) {
					const line = safeTokenLine(idNode);
					const column = safeTokenColumn(idNode);
					if (line !== null && column !== null) {
						diagnostics.push({
							severity: DiagnosticSeverity.Warning,
							range: {
								start: { line: line - 1, character: column },
								end: { line: line - 1, character: column + funcName.length }
							},
							message: `'${funcName}()' returns void and cannot be used as a value in an expression`
						});
					}
				}
			} catch { /* ignore */ }

			// Visit children but skip the primary expression (already handled)
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
