/**
 * Core validators — produce diagnostics from ParseResult and SymbolTable.
 *
 * Each validator is a pure function. No LSP connection or I/O dependencies.
 * Uses vscode-languageserver only for Diagnostic/DiagnosticSeverity types.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import type { ParseResult, IncludeFileVariable, KnownSymbols } from './types';
import type proglang12dParser from '../antlr/src/proglang12dParser';
import type { PostfixExpressionContext, PrimaryExpressionContext } from '../antlr/src/proglang12dParser';

// ─── Shared helpers ─────────────────────────────────────────────────────────

function safeTokenText(node: any): string | null {
	const text = node?.symbol?.text ?? node?.getText?.();
	return typeof text === 'string' ? text : null;
}

function safeTokenLine(node: any): number | null {
	const line = node?.symbol?.line;
	return typeof line === 'number' ? line : null;
}

function safeTokenColumn(node: any): number | null {
	const column = node?.symbol?.column;
	return typeof column === 'number' ? column : null;
}

function extractIdentifierFromDeclarator(ctx: any): { name: string; line: number; column: number } | null {
	let cur: any = ctx;
	while (cur) {
		try {
			const direct = cur.directDeclarator?.();
			if (direct) { cur = direct; continue; }
		} catch { /* ignore */ }
		try {
			const idNode = cur.Identifier?.();
			const text = safeTokenText(idNode);
			const line = safeTokenLine(idNode);
			const column = safeTokenColumn(idNode);
			if (text && line !== null && column !== null) return { name: text, line, column };
		} catch { /* ignore */ }
		break;
	}
	return null;
}

// ─── validateRedeclarations ─────────────────────────────────────────────────

interface DeclaredVariable {
	name: string;
	line: number;
	column: number;
	scopeDepth: number;
	isFunction: boolean;
}

/**
 * Validates for variable re-declarations within the same scope.
 */
export function validateRedeclarations(
	tree: any,
	includeFileVariables: IncludeFileVariable[],
	conditionalLines: Set<number>
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const condLines = conditionalLines;

	const includeVars = new Map<string, { sourceFile: string; kind: 'variable' | 'function' }>();
	for (const v of includeFileVariables) {
		includeVars.set(v.name.toLowerCase(), { sourceFile: v.sourceFile, kind: v.kind });
	}

	const globalVariables = new Map<string, DeclaredVariable>();
	const scopeVariables = new Map<string, Map<string, DeclaredVariable>>();
	let scopeDepth = 0;
	let scopeCounter = 0;
	const scopeStack: string[] = ['global'];
	let inWrapperFunction = false;
	let inRealFunction = false;

	const getCurrentScopeId = () => scopeStack[scopeStack.length - 1];

	const enterScope = () => {
		scopeDepth++;
		scopeCounter++;
		const newScopeId = `${getCurrentScopeId()}.${scopeCounter}`;
		scopeStack.push(newScopeId);
		scopeVariables.set(newScopeId, new Map());
	};

	const exitScope = () => {
		scopeStack.pop();
		scopeDepth--;
	};

	scopeVariables.set('global', new Map());

	const isFunctionDeclarator = (declarator: any): boolean => {
		try {
			const direct = declarator?.directDeclarator?.();
			if (direct?.parameterTypeList?.() != null) return true;
			if (direct?.LeftParen?.() != null) return true;
			return false;
		} catch { return false; }
	};

	const checkAndAddDeclaration = (info: { name: string; line: number; column: number }, isFunction: boolean = false) => {
		const scopeId = getCurrentScopeId();
		const scopeVars = scopeVariables.get(scopeId);
		if (!scopeVars) return;

		const lowerName = info.name.toLowerCase();

		const existing = scopeVars.get(lowerName);
		if (existing) {
			if (existing.isFunction && isFunction) return;
			if (condLines.has(existing.line) || condLines.has(info.line)) return;
			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line: info.line - 1, character: info.column },
					end: { line: info.line - 1, character: info.column + info.name.length }
				},
				message: `Variable '${info.name}' is already declared in this scope (first declared at line ${existing.line})`
			});
			return;
		}

		const includeEntry = includeVars.get(lowerName);
		if (includeEntry) {
			const kindLabel = includeEntry.kind === 'function' ? 'Function' : 'Variable';
			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line: info.line - 1, character: info.column },
					end: { line: info.line - 1, character: info.column + info.name.length }
				},
				message: `${kindLabel} '${info.name}' is already declared in included file '${includeEntry.sourceFile}'`
			});
			return;
		}

		if (inRealFunction) {
			const globalVar = globalVariables.get(lowerName);
			if (globalVar) {
				diagnostics.push({
					severity: DiagnosticSeverity.Warning,
					range: {
						start: { line: info.line - 1, character: info.column },
						end: { line: info.line - 1, character: info.column + info.name.length }
					},
					message: `Variable '${info.name}' shadows a global variable declared at line ${globalVar.line}`
				});
			}
		}

		for (let i = scopeStack.length - 2; i >= 0; i--) {
			const outerScopeId = scopeStack[i];
			const outerScopeVars = scopeVariables.get(outerScopeId);
			if (outerScopeVars) {
				const outerVar = outerScopeVars.get(lowerName);
				if (outerVar) {
					diagnostics.push({
						severity: DiagnosticSeverity.Warning,
						range: {
							start: { line: info.line - 1, character: info.column },
							end: { line: info.line - 1, character: info.column + info.name.length }
						},
						message: `Variable '${info.name}' shadows a variable declared at line ${outerVar.line}`
					});
					break;
				}
			}
		}

		if (inWrapperFunction && !inRealFunction) {
			globalVariables.set(lowerName, { ...info, scopeDepth, isFunction });
		}

		scopeVars.set(lowerName, { ...info, scopeDepth, isFunction });
	};

	let inFunctionBody = false;
	let inDeclaration = false;

	const isWrapperFunction = (ctx: any): boolean => {
		try {
			const decl = ctx?.declarator?.();
			const direct = decl?.directDeclarator?.();
			let cur: any = direct;
			while (cur) {
				const idNode = cur.Identifier?.();
				const idText = safeTokenText(idNode);
				if (idText && idText.startsWith('__12dpl__script__')) return true;
				cur = cur.directDeclarator?.() ?? null;
			}
		} catch { /* ignore */ }
		return false;
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
			const isWrapper = isWrapperFunction(ctx);
			const wasInWrapperFunction = inWrapperFunction;
			const wasInRealFunction = inRealFunction;
			if (isWrapper) inWrapperFunction = true;
			else inRealFunction = true;

			enterScope();
			inFunctionBody = true;
			visitor.visitChildren(ctx);
			inFunctionBody = false;
			exitScope();

			inWrapperFunction = wasInWrapperFunction;
			inRealFunction = wasInRealFunction;
			return undefined;
		},
		visitCompoundStatement(ctx: any) {
			if (inFunctionBody) {
				inFunctionBody = false;
				visitor.visitChildren(ctx);
				return undefined;
			}
			enterScope();
			visitor.visitChildren(ctx);
			exitScope();
			return undefined;
		},
		visitIterationStatement(ctx: any) {
			try {
				if (ctx?.For?.()) {
					enterScope();
					visitor.visitChildren(ctx);
					exitScope();
					return undefined;
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitDeclaration(ctx: any) {
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) {
						const isFunc = isFunctionDeclarator(declarator);
						checkAndAddDeclaration(info, isFunc);
					}
				}
			} catch { /* ignore */ }
			const wasInDeclaration = inDeclaration;
			inDeclaration = true;
			const result = visitor.visitChildren(ctx);
			inDeclaration = wasInDeclaration;
			return result;
		},
		visitForDeclaration(ctx: any) {
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) checkAndAddDeclaration(info);
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitParameterDeclaration(ctx: any) {
			if (inDeclaration) return visitor.visitChildren(ctx);
			try {
				const idNode = ctx?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) checkAndAddDeclaration({ name: text, line, column });
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}

// ─── validateUndeclaredIdentifiers ──────────────────────────────────────────

interface DeclaredSymbol {
	name: string;
	type?: string;
	line: number;
	column: number;
}

interface IdentifierUsage {
	name: string;
	line: number;
	column: number;
	isAssignmentTarget: boolean;
	isFunctionCall: boolean;
}

interface SwitchCaseMismatch {
	caseLine: number;
	caseColumn: number;
	caseLength: number;
	switchType: string;
	caseType: string;
}

export function validateUndeclaredIdentifiers(tree: any, knownSymbols: KnownSymbols): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const declaredSymbols = new Map<string, DeclaredSymbol>();
	const usages: IdentifierUsage[] = [];
	const switchCaseMismatches: SwitchCaseMismatch[] = [];
	let scopeDepth = 0;

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
			if (info) declaredSymbols.set(info.name.toLowerCase(), info);
			scopeDepth++;
			visitor.visitChildren(ctx);
			scopeDepth--;
			return undefined;
		},
		visitDeclaration(ctx: any) {
			const declType = getDeclarationTypeText(ctx);
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) declaredSymbols.set(info.name.toLowerCase(), { ...info, type: declType });
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
					if (info) declaredSymbols.set(info.name.toLowerCase(), { ...info, type: declType });
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
				if (text && line !== null && column !== null) declaredSymbols.set(text.toLowerCase(), { name: text, line, column });
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitIdentifierList(ctx: any) {
			try {
				for (const idNode of ctx?.Identifier_list?.() ?? []) {
					const text = safeTokenText(idNode);
					const line = safeTokenLine(idNode);
					const column = safeTokenColumn(idNode);
					if (text && line !== null && column !== null) declaredSymbols.set(text.toLowerCase(), { name: text, line, column });
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
					const symbol = declaredSymbols.get(exprText.toLowerCase());
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
			try {
				const primary = ctx?.primaryExpression?.();
				const idNode = primary?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				const leftParenTokens = ctx?.LeftParen_list?.();
				const isFunctionCall = leftParenTokens && leftParenTokens.length > 0;
				if (text && line !== null && column !== null) {
					usages.push({ name: text, line, column, isAssignmentTarget: false, isFunctionCall: !!isFunctionCall });
				}
			} catch { /* ignore */ }
			const children: any[] = ctx?.children ?? [];
			for (const child of children) {
				if (child && typeof child.accept === 'function') {
					const isPrimary = child.ruleIndex !== undefined && child.constructor?.name === 'PrimaryExpressionContext';
					if (!isPrimary) child.accept(visitor);
				}
			}
			try {
				for (const argList of ctx?.argumentExpressionList_list?.() ?? []) {
					argList?.accept?.(visitor);
				}
			} catch { /* ignore */ }
			return undefined;
		},
		visitPrimaryExpression(ctx: PrimaryExpressionContext | any) {
			try {
				const idNode = ctx?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) {
					usages.push({ name: text, line, column, isAssignmentTarget: false, isFunctionCall: false });
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { return diagnostics; }

	for (const usage of usages) {
		const lowerName = usage.name.toLowerCase();
		if (declaredSymbols.has(lowerName)) continue;
		if (usage.isFunctionCall && knownSymbols.functions.has(lowerName)) continue;
		if (knownSymbols.variables.has(lowerName)) continue;
		if (knownSymbols.defines.has(lowerName)) continue;
		if (usage.isFunctionCall) continue;

		diagnostics.push({
			severity: DiagnosticSeverity.Warning,
			range: {
				start: { line: usage.line - 1, character: usage.column },
				end: { line: usage.line - 1, character: usage.column + usage.name.length }
			},
			message: `'${usage.name}' is not declared`
		});
	}

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

// ─── validateDeprecatedCalls ────────────────────────────────────────────────

const DEPRECATED_FUNCTIONS: Record<string, { message: string }> = {
	'Time': {
		message: 'Time() function is deprecated. Time is now a type. Use the Get_time() function with the Time type instead.'
	}
};

/**
 * Scans the token stream for deprecated function calls.
 * Token-based: works even when there are syntax errors.
 */
export function validateDeprecatedCalls(result: ParseResult): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	try {
		const tokens = result.tokens;
		const allTokens = (tokens as any).tokens || [];

		for (let i = 0; i < allTokens.length - 1; i++) {
			const token = allTokens[i];
			const nextToken = allTokens[i + 1];
			if (!token || !nextToken) continue;

			if (token.text === 'Time' && nextToken.text === '(') {
				const line = token.line - 1;
				const column = token.column;
				diagnostics.push({
					severity: DiagnosticSeverity.Warning,
					range: {
						start: { line, character: column },
						end: { line, character: column + 4 }
					},
					message: DEPRECATED_FUNCTIONS['Time'].message,
					source: '12dPL'
				});
			}
		}
	} catch { /* ignore */ }

	return diagnostics;
}
