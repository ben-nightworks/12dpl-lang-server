/**
 * Unused variable validation.
 *
 * Flags function-local variables that are declared but never referenced.
 * Emitted as Hint severity with DiagnosticTag.Unnecessary so editors render
 * the variable faded rather than underlined.
 *
 * Scope model (deliberately conservative — no false positives over misses):
 *   - Only variables declared inside real functions are checked. Globals and
 *     top-level script code (parsed inside synthetic __12dpl__script__
 *     wrapper functions) are skipped, since those may be referenced by other
 *     functions or by files that include this one.
 *   - Function parameters are never flagged; signatures are often fixed by
 *     callers the author does not control.
 *   - Any reference counts as a use, including assignment targets and
 *     by-reference output arguments.
 *   - Usage is tracked per function, not per block, so a name declared in
 *     two sibling blocks but used in one is not flagged in either.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
	DiagnosticTag,
} from 'vscode-languageserver/node';

import {
	safeTokenText,
	extractIdentifierFromDeclarator,
} from './validation.Common';

interface LocalVariable {
	name: string;
	line: number;
	column: number;
}

interface FunctionRecord {
	declared: LocalVariable[];
	used: Set<string>;
}

/**
 * Validates that function-local variables are referenced at least once.
 *
 * @param tree - ANTLR parse tree
 * @param conditionalLines - lines inside conditional preprocessor blocks; declarations there are skipped
 */
export function validateUnusedVariables(
	tree: any,
	conditionalLines?: Set<number>
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const functionRecords: FunctionRecord[] = [];
	// null while at global scope or inside a __12dpl__script__ wrapper.
	let currentFn: FunctionRecord | null = null;

	const isWrapperFunction = (ctx: any): boolean => {
		try {
			const decl = ctx?.declarator?.();
			let cur: any = decl?.directDeclarator?.();
			while (cur) {
				const idText = safeTokenText(cur.Identifier?.());
				if (idText && idText.startsWith('__12dpl__script__')) return true;
				cur = cur.directDeclarator?.() ?? null;
			}
		} catch { /* ignore */ }
		return false;
	};

	const isFunctionDeclarator = (declarator: any): boolean => {
		try {
			const direct = declarator?.directDeclarator?.();
			if (direct?.parameterTypeList?.() != null) return true;
			if (direct?.LeftParen?.() != null) return true;
			return false;
		} catch { return false; }
	};

	const collectDecl = (ctx: any) => {
		if (!currentFn) return;
		const list = ctx?.initDeclaratorList?.();
		try {
			for (const initDecl of list?.initDeclarator_list?.() ?? []) {
				const declarator = initDecl?.declarator?.();
				if (isFunctionDeclarator(declarator)) continue;
				const info = extractIdentifierFromDeclarator(declarator);
				if (info) currentFn.declared.push(info);
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
			const outerFn = currentFn;
			if (isWrapperFunction(ctx)) {
				currentFn = null;
			} else {
				currentFn = { declared: [], used: new Set() };
				functionRecords.push(currentFn);
			}
			visitor.visitChildren(ctx);
			currentFn = outerFn;
			return undefined;
		},
		visitDeclaration(ctx: any) {
			collectDecl(ctx);
			return visitor.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			collectDecl(ctx);
			return visitor.visitChildren(ctx);
		},
		visitPrimaryExpression(ctx: any) {
			const name = safeTokenText(ctx?.Identifier?.());
			if (name && currentFn) currentFn.used.add(name);
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }

	for (const record of functionRecords) {
		for (const decl of record.declared) {
			if (record.used.has(decl.name)) continue;
			if (conditionalLines?.has(decl.line)) continue;
			diagnostics.push({
				severity: DiagnosticSeverity.Hint,
				tags: [DiagnosticTag.Unnecessary],
				range: {
					start: { line: decl.line - 1, character: decl.column },
					end: { line: decl.line - 1, character: decl.column + decl.name.length }
				},
				message: `Variable '${decl.name}' is declared but never used`
			});
		}
	}

	return diagnostics;
}
