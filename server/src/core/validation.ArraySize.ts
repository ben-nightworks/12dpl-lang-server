/**
 * Array size validation — checks that array variable declarations specify a size.
 *
 * Issue #73: `Text my_choices[];` is accepted by the grammar but rejected by
 * the compiler because the array size is missing.
 *
 * Function parameters with `[]` (e.g. `void foo(Text items[])`) are allowed
 * to omit the size and are NOT flagged.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
	extractIdentifierFromDeclarator,
} from './validation.Common';

/**
 * Walks a directDeclarator tree to check for array brackets without a size.
 * Returns true if this declarator has `[` `]` with no constantExpression.
 */
function hasUnsizedArrayBrackets(directDecl: any): boolean {
	try {
		const leftBracket = directDecl.LeftBracket?.();
		const rightBracket = directDecl.RightBracket?.();
		if (leftBracket && rightBracket) {
			const constExpr = directDecl.constantExpression?.();
			if (!constExpr) return true;
		}
		// Recurse into nested directDeclarator (e.g. multi-dimensional arrays)
		const inner = directDecl.directDeclarator?.();
		if (inner) return hasUnsizedArrayBrackets(inner);
	} catch { /* ignore */ }
	return false;
}

/**
 * Validates that array declarations in variable declarations specify a size.
 * Does NOT flag function parameters, which are allowed to omit the size.
 *
 * @param tree - ANTLR parse tree (must be syntax-error-free)
 */
export function validateArraySize(tree: any): Diagnostic[] {
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

		visitDeclaration(ctx: any) {
			checkInitDeclarators(ctx);
			return visitor.visitChildren(ctx);
		},

		visitForDeclaration(ctx: any) {
			checkInitDeclarators(ctx);
			return visitor.visitChildren(ctx);
		},
	};

	function checkInitDeclarators(ctx: any) {
		try {
			const typeText = ctx?.declarationSpecifiers?.()?.getText?.();
			const initDeclList = ctx?.initDeclaratorList?.();
			if (!initDeclList) return;

			for (const initDecl of initDeclList.initDeclarator_list?.() ?? []) {
				const declarator = initDecl?.declarator?.();
				if (!declarator) continue;

				const directDecl = declarator.directDeclarator?.();
				if (!directDecl) continue;

				if (hasUnsizedArrayBrackets(directDecl)) {
					const info = extractIdentifierFromDeclarator(declarator);
					if (!info) continue;

					const fullType = typeText ?? 'unknown';
					diagnostics.push({
						severity: DiagnosticSeverity.Error,
						range: {
							start: { line: info.line - 1, character: info.column },
							end: { line: info.line - 1, character: info.column + info.name.length }
						},
						message: `Array '${fullType} ${info.name} [ ]' requires a size`
					});
				}
			}
		} catch { /* ignore */ }
	}

	tree.accept(visitor);
	return diagnostics;
}
