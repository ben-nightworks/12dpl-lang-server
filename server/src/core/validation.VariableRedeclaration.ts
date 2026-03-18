/**
 * Variable redeclaration validation — detects variable re-declarations within the same scope.
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
	type DeclaredVariable,
} from './validation.Common';

/**
 * Validates for variable re-declarations within the same scope.
 */
export function validateVariableRedeclarations(
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
