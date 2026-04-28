/**
 * Assignment type validation — issue #100.
 *
 * Detects type-incompatible assignments and initialisations such as:
 *
 *     Integer i = 0;
 *     Text    t;
 *     t = i;        // Cannot promote 'Integer' to 'Text'
 *
 * The check covers:
 *   1. Plain `=` assignment expressions   (`a = b;`)
 *   2. Variable initialisers              (`Text t = i;`)
 *
 * Compound assignment operators (`+=`, `-=`, etc.) are intentionally not
 * checked here — they require operator-aware semantics.
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
import { isSubtypeOf, isPromotableTo } from './typeHierarchy';

/**
 * Resolves the type of a simple expression — literals and identifiers.
 * Returns undefined when the type cannot be determined (compound expressions,
 * function calls, etc.) so we don't produce false positives.
 */
function resolveExprType(exprCtx: any, declaredVars: Map<string, string>): string | undefined {
	try {
		const text = exprCtx?.getText?.();
		if (!text) return undefined;

		if (text.startsWith('"') && text.endsWith('"')) return 'Text';
		if (/^[0-9]+$/.test(text) || /^0x[0-9a-fA-F]+$/i.test(text)) return 'Integer';
		if (/^[0-9]*\.[0-9]+$/.test(text)) return 'Real';

		return declaredVars.get(text);
	} catch { return undefined; }
}

/** True when `fromType` is acceptable wherever `toType` is required. */
function isAssignmentCompatible(fromType: string, toType: string): boolean {
	if (!fromType || !toType) return true;
	if (fromType === toType) return true;
	if (isPromotableTo(fromType, toType)) return true;
	if (isSubtypeOf(fromType, toType)) return true;
	return false;
}

/**
 * Walks an expression context to find the leftmost identifier (assignment
 * target). Used to look up the destination variable's declared type.
 */
function extractAssignmentTargetName(unaryCtx: any): string | undefined {
	try {
		let cur: any = unaryCtx;
		for (let depth = 0; depth < 25 && cur; depth++) {
			const id = cur.Identifier?.();
			const name = safeTokenText(id);
			if (name) return name;

			const primary = cur.primaryExpression?.();
			if (primary) {
				const pid = primary.Identifier?.();
				const pname = safeTokenText(pid);
				if (pname) return pname;
			}

			const children = cur.children;
			if (children && children.length >= 1) {
				cur = children[0];
			} else {
				break;
			}
		}
	} catch { /* ignore */ }
	return undefined;
}

/**
 * Validates that assignments and initialisers respect 12dPL's type rules.
 *
 * @param tree - ANTLR parse tree
 */
export function validateAssignmentTypes(tree: any): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	// Per-function variable scope — identical names in different functions
	// must not interfere with each other.
	let scopedVars = new Map<string, string>();

	const getTypeText = (ctx: any): string | undefined => {
		try {
			const text = ctx?.declarationSpecifiers?.()?.getText?.();
			return typeof text === 'string' && text.length ? text : undefined;
		} catch { return undefined; }
	};

	const collectAndCheckDecl = (ctx: any) => {
		const declType = getTypeText(ctx);
		if (!declType) return;

		const list = ctx?.initDeclaratorList?.();
		try {
			for (const initDecl of list?.initDeclarator_list?.() ?? []) {
				const declarator = initDecl?.declarator?.();
				const info = extractIdentifierFromDeclarator(declarator);
				if (!info) continue;

				scopedVars.set(info.name, declType);

				// Check initialiser, if any: `Text t = expr;`
				const initializer = initDecl?.initializer?.();
				if (initializer) {
					const exprType = resolveExprType(initializer, scopedVars);
					if (exprType && !isAssignmentCompatible(exprType, declType)) {
						diagnostics.push({
							severity: DiagnosticSeverity.Error,
							range: {
								start: { line: info.line - 1, character: info.column },
								end: { line: info.line - 1, character: info.column + info.name.length }
							},
							message: `Cannot promote '${exprType}' to '${declType}'`
						});
					}
				}
			}
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
			const outerVars = scopedVars;
			scopedVars = new Map<string, string>();

			// Add parameters to scope
			try {
				const decl = ctx?.declarator?.();
				let cur = decl?.directDeclarator?.() ?? decl;
				while (cur) {
					const pt = cur.parameterTypeList?.();
					if (pt) {
						const plist = pt.parameterList?.();
						for (const pd of plist?.parameterDeclaration_list?.() ?? []) {
							const typeText = pd?.declarationSpecifiers?.()?.getText?.();
							const name = safeTokenText(pd?.Identifier?.());
							if (name && typeText) scopedVars.set(name, typeText);
						}
						break;
					}
					cur = cur.directDeclarator?.() ?? null;
				}
			} catch { /* ignore */ }

			visitor.visitChildren(ctx);

			scopedVars = outerVars;
			return undefined;
		},
		visitDeclaration(ctx: any) {
			collectAndCheckDecl(ctx);
			return visitor.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			collectAndCheckDecl(ctx);
			return visitor.visitChildren(ctx);
		},
		visitParameterDeclaration(ctx: any) {
			try {
				const typeText = ctx?.declarationSpecifiers?.()?.getText?.();
				const name = safeTokenText(ctx?.Identifier?.());
				if (name && typeText) scopedVars.set(name, typeText);
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitAssignmentExpression(ctx: any) {
			try {
				const op = ctx?.assignmentOperator?.();
				if (op) {
					// Only handle plain `=` — compound ops need different rules
					const opText = op?.getText?.();
					if (opText === '=') {
						const lhs = ctx?.unaryExpression?.();
						const rhs = ctx?.assignmentExpression?.() ?? null;

						const targetName = extractAssignmentTargetName(lhs);
						const targetType = targetName ? scopedVars.get(targetName) : undefined;
						const rhsType = rhs ? resolveExprType(rhs, scopedVars) : undefined;

						if (targetName && targetType && rhsType &&
							!isAssignmentCompatible(rhsType, targetType)) {
							const idNode = lhs?.Identifier?.()
								?? lhs?.postfixExpression?.()?.primaryExpression?.()?.Identifier?.()
								?? null;
							let line: number | null = null;
							let column: number | null = null;
							if (idNode) {
								line = safeTokenLine(idNode);
								column = safeTokenColumn(idNode);
							}
							if (line === null || column === null) {
								// Fall back to lhs start token
								const start = lhs?.start;
								line = typeof start?.line === 'number' ? start.line : null;
								column = typeof start?.column === 'number' ? start.column : null;
							}
							if (line !== null && column !== null) {
								diagnostics.push({
									severity: DiagnosticSeverity.Error,
									range: {
										start: { line: line - 1, character: column },
										end: { line: line - 1, character: column + targetName.length }
									},
									message: `Cannot promote '${rhsType}' to '${targetType}'`
								});
							}
						}
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}
