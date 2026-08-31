/**
 * Dynamic array Null reminder — issue #107.
 *
 * Dynamic arrays (Dynamic_Element, Dynamic_Text, Dynamic_Integer,
 * Dynamic_Real, ...) are not released automatically when they go out of
 * scope; macros should call Null(array) once the array is no longer needed.
 * Emits an Information diagnostic on the declaration of any dynamic-array
 * variable that is used but never passed to Null().
 *
 * Scope model:
 *   - Variables local to a function must be Nulled somewhere in that
 *     function. The check is purely syntactic — a helper function that
 *     Nulls an array on the caller's behalf is not detected.
 *   - Top-level script code is parsed inside synthetic __12dpl__script__
 *     wrapper functions, so wrapper bodies and true global declarations
 *     share one global scope where a Null() anywhere in the file counts.
 *   - Function parameters are never flagged; the array is owned by the
 *     caller.
 *   - Declared-but-never-used arrays are not flagged; an array that was
 *     never touched holds nothing worth releasing.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import {
	safeTokenText,
	extractIdentifierFromDeclarator,
} from './validation.Common';
import { typeKeywords } from './typeKeywords';

interface DynamicArrayDecl {
	name: string;
	line: number;
	column: number;
	type: string;
}

interface ScopeRecord {
	declared: DynamicArrayDecl[];
	nulled: Set<string>;
	used: Set<string>;
}

/** All dynamic-array type keywords, derived from the grammar. */
const dynamicArrayTypes = new Set(
	[...typeKeywords].filter((t) => t.startsWith('Dynamic_'))
);

function newScopeRecord(): ScopeRecord {
	return { declared: [], nulled: new Set(), used: new Set() };
}

/**
 * Validates that dynamic-array variables are Nulled before going out of scope.
 *
 * @param tree - ANTLR parse tree
 * @param conditionalLines - lines inside conditional preprocessor blocks; declarations there are skipped
 */
export function validateDynamicArrayNull(
	tree: any,
	conditionalLines?: Set<number>
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	// Wrapper functions share the global record; real functions get their own.
	const globalRecord = newScopeRecord();
	const functionRecords: ScopeRecord[] = [];
	const recordStack: ScopeRecord[] = [globalRecord];
	// Null()/usage anywhere in the file — used for global declarations, which
	// any function may Null or use.
	const fileWideNulled = new Set<string>();
	const fileWideUsed = new Set<string>();

	const currentRecord = (): ScopeRecord => recordStack[recordStack.length - 1] ?? globalRecord;

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
		let declType: string | undefined;
		try {
			const text = ctx?.declarationSpecifiers?.()?.getText?.();
			declType = typeof text === 'string' && text.length ? text : undefined;
		} catch { /* ignore */ }
		if (!declType || !dynamicArrayTypes.has(declType)) return;

		const list = ctx?.initDeclaratorList?.();
		try {
			for (const initDecl of list?.initDeclarator_list?.() ?? []) {
				const declarator = initDecl?.declarator?.();
				if (isFunctionDeclarator(declarator)) continue;
				const info = extractIdentifierFromDeclarator(declarator);
				if (info) {
					currentRecord().declared.push({ ...info, type: declType });
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
			if (isWrapperFunction(ctx)) {
				recordStack.push(globalRecord);
			} else {
				const record = newScopeRecord();
				functionRecords.push(record);
				recordStack.push(record);
			}
			visitor.visitChildren(ctx);
			recordStack.pop();
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
			if (name) {
				currentRecord().used.add(name);
				fileWideUsed.add(name);
			}
			return visitor.visitChildren(ctx);
		},
		visitPostfixExpression(ctx: any) {
			try {
				const leftParenTokens = ctx?.LeftParen_list?.();
				if (leftParenTokens && leftParenTokens.length > 0) {
					const funcName = safeTokenText(ctx?.primaryExpression?.()?.Identifier?.());
					if (funcName === 'Null') {
						const argLists = ctx?.argumentExpressionList_list?.() ?? [];
						const argExprs = argLists.length > 0 ? argLists[0]?.assignmentExpression_list?.() ?? [] : [];
						for (const arg of argExprs) {
							const text = arg?.getText?.();
							if (typeof text !== 'string') continue;
							const argName = text.replace(/^&/, '');
							if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(argName)) {
								currentRecord().nulled.add(argName);
								fileWideNulled.add(argName);
							}
						}
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		}
	};

	try { tree.accept(visitor); } catch { /* ignore */ }

	const report = (decl: DynamicArrayDecl) => {
		if (conditionalLines?.has(decl.line)) return;
		diagnostics.push({
			severity: DiagnosticSeverity.Information,
			range: {
				start: { line: decl.line - 1, character: decl.column },
				end: { line: decl.line - 1, character: decl.column + decl.name.length }
			},
			message: `Dynamic array '${decl.name}' is never Nulled - add Null(${decl.name}) when it is no longer needed to release its memory`
		});
	};

	for (const record of functionRecords) {
		for (const decl of record.declared) {
			if (record.used.has(decl.name) && !record.nulled.has(decl.name)) report(decl);
		}
	}
	for (const decl of globalRecord.declared) {
		if (fileWideUsed.has(decl.name) && !fileWideNulled.has(decl.name)) report(decl);
	}

	return diagnostics;
}
