/**
 * Control flow validation — issues #96, #97, #98, #99.
 *
 * #96: 'break' used outside of a loop or switch statement.
 * #97: 'continue' used outside of a loop.
 * #98: A switch statement has more than one 'default' label.
 * #99: Statements or declarations appear before the first case/default
 *      in a switch body (dead code — never reached).
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

// Rule indices from the generated parser (proglang12dParser.RULE_*)
const RULE_SELECTION_STATEMENT = 57;
const RULE_ITERATION_STATEMENT = 58;

type FlowContext = 'loop' | 'switch';

/**
 * Collects all four control-flow diagnostics in a single tree traversal.
 * Must only be called when the parse tree has zero syntax errors.
 *
 * @param tree - Root of the ANTLR parse tree.
 */
export function validateControlFlow(tree: any): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const flowStack: FlowContext[] = [];

	const visitor: any = {
		visitTerminal() { return undefined; },
		visitErrorNode() { return undefined; },

		visitChildren(ctx: any) {
			for (const child of ctx?.children ?? []) {
				if (child && typeof child.accept === 'function') {
					child.accept(visitor);
				}
			}
			return undefined;
		},

		visitIterationStatement(ctx: any) {
			flowStack.push('loop');
			visitor.visitChildren(ctx);
			flowStack.pop();
			return undefined;
		},

		visitSelectionStatement(ctx: any) {
			let isSwitch = false;
			try { isSwitch = ctx.Switch?.() != null; } catch { /* not a switch */ }

			if (isSwitch) {
				// Check switch body for dead code (#99) and multiple defaults (#98)
				checkSwitchBody(ctx, diagnostics);
				flowStack.push('switch');
				visitor.visitChildren(ctx);
				flowStack.pop();
			} else {
				visitor.visitChildren(ctx);
			}
			return undefined;
		},

		visitJumpStatement(ctx: any) {
			let isBreak = false;
			let isContinue = false;
			try { isBreak = ctx.Break?.() != null; } catch { /* ignore */ }
			try { isContinue = ctx.Continue?.() != null; } catch { /* ignore */ }

			if (isBreak) {
				const inLoopOrSwitch = flowStack.some(c => c === 'loop' || c === 'switch');
				if (!inLoopOrSwitch) {
					diagnostics.push(makeTokenDiagnostic(ctx, DiagnosticSeverity.Error,
						"'break' statement not inside a loop or switch", 'break'.length));
				}
			}

			if (isContinue) {
				const inLoop = flowStack.some(c => c === 'loop');
				if (!inLoop) {
					diagnostics.push(makeTokenDiagnostic(ctx, DiagnosticSeverity.Error,
						"'continue' statement not inside a loop", 'continue'.length));
				}
			}

			// No need to recurse — jumpStatement has no nested statements
			return undefined;
		},
	};

	tree.accept(visitor);
	return diagnostics;
}

// ─────────────────────────────────────────────────────────────────────────────
// Switch-body checks (#98 and #99)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Checks a switch selectionStatement for:
 *  - Dead code before the first case/default (#99)
 *  - More than one default label (#98)
 */
function checkSwitchBody(switchCtx: any, diagnostics: Diagnostic[]) {
	try {
		// The switch body is the first (and only) statement child
		const body = getSwitchBodyStatement(switchCtx);
		if (!body) return;

		const compound = getCompoundStatement(body);
		if (!compound) return;

		const blockItemList = getBlockItemList(compound);
		if (!blockItemList) return;

		const blockItems = blockItemList.blockItem_list?.() ?? [];

		// ── #99: dead code before first case/default ──────────────────────────
		let foundFirstLabel = false;
		for (const item of blockItems) {
			if (isBlockItemLabeledCaseOrDefault(item)) {
				foundFirstLabel = true;
			} else if (!foundFirstLabel) {
				// This item precedes any case/default — it is dead code
				const startLine = (item.start?.line ?? 1) - 1;
				const startChar = item.start?.column ?? 0;
				const endLine = (item.stop?.line ?? item.start?.line ?? 1) - 1;
				const endChar = (item.stop?.column ?? startChar) +
					(item.stop?.text?.length ?? 1);
				diagnostics.push({
					severity: DiagnosticSeverity.Warning,
					range: {
						start: { line: startLine, character: startChar },
						end: { line: endLine, character: endChar },
					},
					message: "Dead code: unreachable statement before first 'case' or 'default' in switch",
				});
			}
		}

		// ── #98: more than one default ────────────────────────────────────────
		const defaultLabels = collectDefaultLabels(compound);
		for (let i = 1; i < defaultLabels.length; i++) {
			const def = defaultLabels[i];
			const line = (def.start?.line ?? 1) - 1;
			const col = def.start?.column ?? 0;
			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line, character: col },
					end: { line, character: col + 'default'.length },
				},
				message: "Switch statement has more than one 'default' label",
			});
		}
	} catch { /* ignore malformed trees */ }
}

/** Returns the statement node that forms the body of a switch selectionStatement. */
function getSwitchBodyStatement(switchCtx: any): any | null {
	try {
		// For `switch (expr) statement`, statement_list() gives all statement children.
		// The first one is the switch condition, so we need statement(0) which is
		// the switch body when there is only one statement child.
		// Actually, per the grammar selectionStatement has expression() and statement().
		// statement_list() returns all StatementContext children — for switch there is one.
		const stmts = switchCtx.statement_list?.() ?? [];
		if (stmts.length > 0) return stmts[0];
		return switchCtx.statement?.(0) ?? null;
	} catch { return null; }
}

/** Unwraps a statement to its compoundStatement, if present. */
function getCompoundStatement(stmtCtx: any): any | null {
	try {
		return stmtCtx.compoundStatement?.() ?? null;
	} catch { return null; }
}

/** Returns the blockItemList from a compoundStatement, or null. */
function getBlockItemList(compoundCtx: any): any | null {
	try {
		return compoundCtx.blockItemList?.() ?? null;
	} catch { return null; }
}

/**
 * Returns true if a blockItem is a labeledStatement with 'case' or 'default'.
 */
function isBlockItemLabeledCaseOrDefault(blockItem: any): boolean {
	try {
		const stmt = blockItem.statement?.();
		if (!stmt) return false;
		const labeled = stmt.labeledStatement?.();
		if (!labeled) return false;
		const hasCase = (() => { try { return labeled.Case?.() != null; } catch { return false; } })();
		const hasDefault = (() => { try { return labeled.Default?.() != null; } catch { return false; } })();
		return hasCase || hasDefault;
	} catch { return false; }
}

/**
 * Collects all 'default' labeledStatement contexts directly inside `compound`,
 * but does NOT descend into nested switch statements (to avoid counting their defaults).
 * Does descend into loops and if-blocks.
 */
function collectDefaultLabels(compound: any): any[] {
	const result: any[] = [];
	walkForDefaults(compound, result);
	return result;
}

function walkForDefaults(node: any, result: any[]): void {
	if (!node) return;
	const children: any[] = node.children ?? [];
	for (const child of children) {
		if (!child || typeof child !== 'object') continue;

		// If this child is a selectionStatement with Switch, stop descending
		// (it is a nested switch — its defaults belong to a different switch)
		if (isNestedSwitchSelectionStatement(child)) continue;

		// If this child is a labeledStatement with 'default', record it
		if (isLabeledStatementWithDefault(child)) {
			result.push(child);
			// Still walk inside for nested cases — but since we skip nested
			// switches, we won't accidentally count their defaults
		}

		walkForDefaults(child, result);
	}
}

/** Returns true if ctx is a selectionStatement (ruleIndex=57) that has a Switch token. */
function isNestedSwitchSelectionStatement(ctx: any): boolean {
	try {
		if (ctx.ruleIndex !== RULE_SELECTION_STATEMENT) return false;
		return ctx.Switch?.() != null;
	} catch { return false; }
}

/** Returns true if ctx is a labeledStatement with a 'default' token. */
function isLabeledStatementWithDefault(ctx: any): boolean {
	try {
		return ctx.Default?.() != null;
	} catch { return false; }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Creates a diagnostic anchored at ctx.start with the given keyword length. */
function makeTokenDiagnostic(
	ctx: any,
	severity: DiagnosticSeverity,
	message: string,
	keywordLength: number
): Diagnostic {
	const line = (ctx.start?.line ?? 1) - 1;
	const col = ctx.start?.column ?? 0;
	return {
		severity,
		range: {
			start: { line, character: col },
			end: { line, character: col + keywordLength },
		},
		message,
	};
}
