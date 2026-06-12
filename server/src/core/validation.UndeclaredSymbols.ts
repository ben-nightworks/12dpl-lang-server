/**
 * Undeclared symbols and type mismatch validation.
 *
 * Uses a scope stack so that variables declared in one function
 * are not visible in another (issue #43).
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import type { KnownSymbols } from './types';
import type { PostfixExpressionContext, PrimaryExpressionContext } from '../antlr/src/proglang12dParser';
import {
	safeTokenText,
	safeTokenLine,
	safeTokenColumn,
	extractIdentifierFromDeclarator,
	type DeclaredSymbol,
	type IdentifierUsage,
	type SwitchCaseMismatch,
} from './validation.Common';

export function validateUndeclaredIdentifiers(tree: any, knownSymbols: KnownSymbols, conditionalLines?: Set<number>): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const switchCaseMismatches: SwitchCaseMismatch[] = [];

	// Scope stack: index 0 is the global scope, higher indices are nested scopes.
	const scopeStack: Map<string, DeclaredSymbol>[] = [new Map()];
	let inWrapperFunction = false;
	let inFunctionBody = false;

	const pushScope = () => { scopeStack.push(new Map()); };
	const popScope = () => { if (scopeStack.length > 1) scopeStack.pop(); };

	/** Declare a symbol. Wrapper-function locals go to global scope (index 0). */
	const declareSymbol = (name: string, symbol: DeclaredSymbol) => {
		if (inWrapperFunction) {
			scopeStack[0].set(name, symbol);
		} else {
			scopeStack[scopeStack.length - 1].set(name, symbol);
		}
	};

	/** Look up a symbol walking from innermost scope outward. */
	const lookupSymbol = (name: string): DeclaredSymbol | undefined => {
		for (let i = scopeStack.length - 1; i >= 0; i--) {
			const sym = scopeStack[i].get(name);
			if (sym) return sym;
		}
		return undefined;
	};

	/** Check an identifier usage inline; emit diagnostic if undeclared. */
	const checkUsage = (text: string, line: number, column: number, isFunctionCall: boolean) => {
		// Skip identifiers on conditional lines (#if/#ifdef kept branches)
		if (conditionalLines?.has(line)) return;

		if (lookupSymbol(text)) return;
		if (isFunctionCall && knownSymbols.functions.has(text)) return;
		if (knownSymbols.variables.has(text)) return;
		if (knownSymbols.defines.has(text)) return;

		diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: line - 1, character: column },
				end: { line: line - 1, character: column + text.length }
			},
			message: isFunctionCall
				? `Function '${text}' is not declared`
				: `'${text}' is not declared`
		});
	};

	const getDeclarationTypeText = (ctx: any): string | undefined => {
		try {
			const declSpecs = ctx?.declarationSpecifiers?.();
			const text = declSpecs?.getText?.();
			return typeof text === 'string' && text.length ? text : undefined;
		} catch { return undefined; }
	};

	const validateCaseLabelsInStatement = (stmt: any, switchType: string): void => {
		if (!stmt) return;
		try {
			const labeledStmt = stmt?.labeledStatement?.();
			if (labeledStmt) {
				const caseToken = labeledStmt?.Case?.();
				if (caseToken) {
					const constExpr = labeledStmt?.constantExpression?.();
					if (constExpr) {
						const constText = constExpr?.getText?.();
						let caseType: string | undefined;
						if (constText) {
							if (constText.startsWith('"') && constText.endsWith('"')) caseType = 'Text';
							else if (/^[0-9]+$/.test(constText) || /^0x[0-9a-fA-F]+$/.test(constText)) caseType = 'Integer';
							else if (/^[0-9]*\.[0-9]+$/.test(constText)) caseType = 'Real';
						}
						if (caseType && switchType) {
							const isNumericSwitch = ['Integer', 'Real'].includes(switchType);
							const isNumericCase = ['Integer', 'Real'].includes(caseType);
							const isTextSwitch = switchType === 'Text';
							const isTextCase = caseType === 'Text';
							if ((isNumericSwitch && isTextCase) || (isTextSwitch && isNumericCase)) {
								const caseLine = safeTokenLine(caseToken);
								const caseColumn = safeTokenColumn(caseToken);
								const exprStart = constExpr?.start;
								const exprLine = exprStart?.line ?? caseLine;
								const exprColumn = exprStart?.column ?? (caseColumn ? caseColumn + 5 : 0);
								const exprLength = constText?.length ?? 1;
								if (exprLine !== null) {
									switchCaseMismatches.push({
										caseLine: exprLine,
										caseColumn: exprColumn ?? 0,
										caseLength: exprLength,
										switchType,
										caseType
									});
								}
							}
						}
					}
				}
				validateCaseLabelsInStatement(labeledStmt?.statement?.(), switchType);
			}
			const compoundStmt = stmt?.compoundStatement?.();
			if (compoundStmt) {
				const blockItems = compoundStmt?.blockItemList?.();
				if (blockItems) {
					for (const item of blockItems?.blockItem_list?.() ?? []) {
						validateCaseLabelsInStatement(item?.statement?.(), switchType);
					}
				}
			}
			const innerStatement = stmt?.statement?.();
			if (innerStatement) validateCaseLabelsInStatement(innerStatement, switchType);
		} catch { /* ignore */ }
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
			const decl = ctx?.declarator?.();
			const info = extractIdentifierFromDeclarator(decl);
			const funcName = info?.name ?? '';

			// Function names are always global
			if (info) scopeStack[0].set(funcName, info);

			const prevWrapper = inWrapperFunction;
			const prevInFunctionBody = inFunctionBody;
			inWrapperFunction = funcName.startsWith('__12dpl__');

			pushScope();
			inFunctionBody = true;
			visitor.visitChildren(ctx);
			inFunctionBody = false;
			popScope();

			inWrapperFunction = prevWrapper;
			inFunctionBody = prevInFunctionBody;
			return undefined;
		},
		visitCompoundStatement(ctx: any) {
			if (inFunctionBody) {
				inFunctionBody = false;
				visitor.visitChildren(ctx);
				return undefined;
			}
			pushScope();
			visitor.visitChildren(ctx);
			popScope();
			return undefined;
		},
		visitIterationStatement(ctx: any) {
			// For-loop header shares the enclosing scope; the body compound statement
			// creates its own sub-scope via visitCompoundStatement.
			return visitor.visitChildren(ctx);
		},
		visitDeclaration(ctx: any) {
			const declType = getDeclarationTypeText(ctx);
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) declareSymbol(info.name, { ...info, type: declType });
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			const declType = getDeclarationTypeText(ctx);
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) declareSymbol(info.name, { ...info, type: declType });
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitParameterDeclaration(ctx: any) {
			try {
				const idNode = ctx?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) {
					declareSymbol(text, { name: text, line, column });
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitIdentifierList(ctx: any) {
			try {
				for (const idNode of ctx?.Identifier_list?.() ?? []) {
					const text = safeTokenText(idNode);
					const line = safeTokenLine(idNode);
					const column = safeTokenColumn(idNode);
					if (text && line !== null && column !== null) {
						declareSymbol(text, { name: text, line, column });
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitSelectionStatement(ctx: any) {
			try {
				const switchToken = ctx?.Switch?.();
				if (!switchToken) return visitor.visitChildren(ctx);
				const switchExpr = ctx?.expression?.();
				if (!switchExpr) return visitor.visitChildren(ctx);
				let switchType: string | undefined;
				const exprText = switchExpr?.getText?.();
				if (exprText) {
					const symbol = lookupSymbol(exprText);
					if (symbol?.type) switchType = symbol.type;
				}
				if (switchType) {
					const stmtList = ctx?.statement_list?.();
					if (stmtList && stmtList.length > 0) validateCaseLabelsInStatement(stmtList[0], switchType);
					else {
						const stmt = ctx?.statement?.(0);
						validateCaseLabelsInStatement(stmt, switchType);
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitPostfixExpression(ctx: PostfixExpressionContext | any) {
			let isMacroCall = false;
			try {
				const primary = ctx?.primaryExpression?.();
				const idNode = primary?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				const leftParenTokens = ctx?.LeftParen_list?.();
				const isFunctionCall = leftParenTokens && leftParenTokens.length > 0;
				if (text && line !== null && column !== null) {
					checkUsage(text, line, column, !!isFunctionCall);
				}
				// Skip argument validation for function-like macro calls
				if (isFunctionCall && text && knownSymbols.defines.has(text)) {
					isMacroCall = true;
				}
			} catch { /* ignore */ }
			if (isMacroCall) {
				// For macro calls, skip argument validation entirely
				return undefined;
			}
			const children: any[] = ctx?.children ?? [];
			for (const child of children) {
				if (child && typeof child.accept === 'function') {
					const isPrimary = child.ruleIndex !== undefined && child.constructor?.name === 'PrimaryExpressionContext';
					if (!isPrimary) {
						child.accept(visitor);
					} else {
						// If the primary is a parenthesized expression '(expr)', visit the inner
						// expression so undeclared symbols inside nested parens are still checked.
						// Plain-identifier primaries (e.g. the function name) have no expression()
						// child, so they are still skipped to avoid double-visiting.
						const innerExpr = child?.expression?.();
						if (innerExpr && typeof innerExpr.accept === 'function') {
							innerExpr.accept(visitor);
						}
					}
				}
			}
			return undefined;
		},
		visitPrimaryExpression(ctx: PrimaryExpressionContext | any) {
			try {
				const idNode = ctx?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) {
					checkUsage(text, line, column, false);
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { return diagnostics; }

	for (const mismatch of switchCaseMismatches) {
		diagnostics.push({
			severity: DiagnosticSeverity.Warning,
			range: {
				start: { line: mismatch.caseLine - 1, character: mismatch.caseColumn },
				end: { line: mismatch.caseLine - 1, character: mismatch.caseColumn + mismatch.caseLength }
			},
			message: `Case type mismatch: switch expression is '${mismatch.switchType}' but case value is '${mismatch.caseType}'`
		});
	}

	return diagnostics;
}
