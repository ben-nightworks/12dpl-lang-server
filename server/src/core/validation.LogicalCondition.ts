/**
 * Logical-condition validation — issue #101.
 *
 * Reports when a `while`, `do…while`, `for`, or `if` condition is of a
 * type that cannot be evaluated as a logical (boolean) expression. The
 * exemplar is `while ("123")` — a Text literal can never be true/false.
 *
 *     while ("123") {}        // Cannot use 'Text' as a logical condition
 *     if (some_text_var) {}   // Cannot use 'Text' as a logical condition
 *
 * Logical-compatible (truthy) types are the numeric types: Integer,
 * Integer64, Real. Comparison and logical operators always produce a
 * numeric/boolean result, so any compound expression that uses one is
 * accepted without further inference. Function-call results and other
 * expressions whose types cannot be determined are left alone — we
 * never flag what we cannot prove.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
	safeTokenText,
	extractIdentifierFromDeclarator,
} from './validation.Common';

/** Numeric / boolean-compatible 12dPL types. */
const LOGICAL_COMPATIBLE = new Set([
	'Integer',
	'Integer64',
	'Real',
	'Logical',
]);

/** Operator characters that produce a logical/numeric result. */
const LOGICAL_OPERATOR_RE = /(<|>|<=|>=|==|!=|&&|\|\||!)/;

/**
 * Try to resolve the type of a simple condition expression. Only
 * literals and bare identifiers are inferred; compound expressions
 * (anything containing an operator) return undefined so the caller
 * can skip them.
 */
function resolveSimpleType(text: string, declaredVars: Map<string, string>): string | undefined {
	if (!text) return undefined;

	if (text.startsWith('"') && text.endsWith('"')) return 'Text';
	if (/^[0-9]+$/.test(text) || /^0x[0-9a-fA-F]+$/i.test(text)) return 'Integer';
	if (/^[0-9]*\.[0-9]+$/.test(text)) return 'Real';

	if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(text)) {
		return declaredVars.get(text);
	}
	return undefined;
}

/** True when the expression text contains a comparison or logical operator. */
function isCompoundLogicalExpression(text: string): boolean {
	return LOGICAL_OPERATOR_RE.test(text);
}

/**
 * Validates that condition expressions in `if`, `while`, `do…while`,
 * and `for` loops are of a logical-compatible type.
 *
 * @param tree - ANTLR parse tree
 */
export function validateLogicalConditions(tree: any): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	let scopedVars = new Map<string, string>();

	const getTypeText = (ctx: any): string | undefined => {
		try {
			const text = ctx?.declarationSpecifiers?.()?.getText?.();
			return typeof text === 'string' && text.length ? text : undefined;
		} catch { return undefined; }
	};

	const collectFromDecl = (ctx: any) => {
		const declType = getTypeText(ctx);
		if (!declType) return;
		try {
			const list = ctx?.initDeclaratorList?.();
			for (const initDecl of list?.initDeclarator_list?.() ?? []) {
				const declarator = initDecl?.declarator?.();
				const info = extractIdentifierFromDeclarator(declarator);
				if (info) scopedVars.set(info.name, declType);
			}
		} catch { /* ignore */ }
	};

	const reportBadCondition = (
		exprCtx: any,
		exprText: string,
		exprType: string,
	) => {
		try {
			const start = exprCtx?.start;
			const stop = exprCtx?.stop ?? start;
			if (!start) return;
			const startLine = typeof start.line === 'number' ? start.line - 1 : 0;
			const startCol = typeof start.column === 'number' ? start.column : 0;
			const endLine = typeof stop?.line === 'number' ? stop.line - 1 : startLine;
			const stopCol = typeof stop?.column === 'number' ? stop.column : startCol;
			const stopLen = typeof stop?.text === 'string' ? stop.text.length : 1;
			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line: startLine, character: startCol },
					end:   { line: endLine,   character: stopCol + stopLen }
				},
				message: `Cannot use '${exprType}' as a logical condition (in '${exprText}')`
			});
		} catch { /* ignore */ }
	};

	const checkConditionExpr = (exprCtx: any) => {
		if (!exprCtx) return;
		let exprText = '';
		try { exprText = exprCtx.getText?.() ?? ''; } catch { /* ignore */ }
		if (!exprText) return;

		// Compound expressions with a comparison / logical operator always
		// produce a numeric / boolean result — skip.
		if (isCompoundLogicalExpression(exprText)) return;

		const type = resolveSimpleType(exprText, scopedVars);
		if (!type) return;
		if (LOGICAL_COMPATIBLE.has(type)) return;

		reportBadCondition(exprCtx, exprText, type);
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
			collectFromDecl(ctx);
			return visitor.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			collectFromDecl(ctx);
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
		visitSelectionStatement(ctx: any) {
			try {
				if (ctx?.If?.()) {
					checkConditionExpr(ctx.expression?.());
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitIterationStatement(ctx: any) {
			try {
				const isWhileOrDo = !!ctx?.While?.();
				if (isWhileOrDo) {
					checkConditionExpr(ctx.expression?.());
				} else if (ctx?.For?.()) {
					const forCond = ctx.forCondition?.();
					// Middle expression of `for (init; cond; update)`
					const innerExprList = forCond?.forExpression_list?.() ?? [];
					if (innerExprList.length > 0) {
						checkConditionExpr(innerExprList[0]);
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }
	return diagnostics;
}
