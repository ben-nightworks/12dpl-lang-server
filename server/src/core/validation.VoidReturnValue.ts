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
 * Validates that void-returning functions are not used in expression contexts
 * where a value is expected.
 *
 * @param tree - ANTLR parse tree
 * @param functionReturnTypes - Map of function name → return type.
 *   A function is considered void if its return type is "void".
 *   For overloaded functions, only included if ALL overloads return void.
 */
export function validateVoidFunctionReturnValues(
	tree: any,
	functionReturnTypes: Map<string, string>
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	// Phase 1: Collect local function definitions and their return types
	const localReturnTypes = new Map<string, string>();

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
				localReturnTypes.set(info.name, returnType);
			}
			return collector.visitChildren(ctx);
		}
	};

	try { tree.accept(collector); } catch { /* ignore */ }

	// Phase 2: Find void function calls used as values
	const resolveReturnType = (name: string): string | undefined => {
		return localReturnTypes.get(name) ?? functionReturnTypes.get(name);
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

				const returnType = resolveReturnType(funcName);
				if (!returnType || returnType.toLowerCase() !== 'void') {
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
