/**
 * Tests for control flow validation:
 *   #96 — break not in loop or switch
 *   #97 — continue not in loop
 *   #98 — switch with more than one default
 *   #99 — dead code (statements before first case/default in switch)
 */

import { describe, expect, test } from 'bun:test';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from '../server/src/core/parsePipeline';
import { validateControlFlow } from '../server/src/core/validators';

type Diagnostic = { severity: number; range: any; message: string; [key: string]: any };

const ERROR = 1;
const WARNING = 2;

function validate(text: string): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) {
		throw new Error(`Parse errors: ${result.syntaxErrors.map(e => e.message).join(', ')}`);
	}
	return validateControlFlow(result.tree) as Diagnostic[];
}

/** Returns the subset of diagnostics whose messages include the given substring. */
function withMessage(diags: Diagnostic[], substr: string): Diagnostic[] {
	return diags.filter(d => d.message.includes(substr));
}

// ─────────────────────────────────────────────────────────────────────────────
// Issue #96 — break not in loop or switch
// ─────────────────────────────────────────────────────────────────────────────

describe('#96 — break not in loop or switch', () => {
	test('break inside while loop — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    while (i < 10) {
        break;
        i = i + 1;
    }
}`);
		expect(withMessage(diags, "break")).toHaveLength(0);
	});

	test('break inside for loop — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i;
    for (i = 0; i < 10; i = i + 1) {
        break;
    }
}`);
		expect(withMessage(diags, "break")).toHaveLength(0);
	});

	test('break inside do-while loop — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    do {
        break;
        i = i + 1;
    } while (i < 10);
}`);
		expect(withMessage(diags, "break")).toHaveLength(0);
	});

	test('break inside switch — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        case 1: { break; }
        default: { break; }
    }
}`);
		expect(withMessage(diags, "break")).toHaveLength(0);
	});

	test('break directly in function body — 1 error', () => {
		const diags = validate(`
void fn() {
    break;
}`);
		const err = withMessage(diags, "break");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
		expect(err[0].message).toContain("'break' statement not inside a loop or switch");
	});

	test('break inside if-block but not in loop — 1 error', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    if (x > 0) {
        break;
    }
}`);
		const err = withMessage(diags, "break");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
	});

	test('break after loop (outside) — 1 error', () => {
		const diags = validate(`
void fn() {
    Integer i;
    for (i = 0; i < 10; i = i + 1) {
    }
    break;
}`);
		const err = withMessage(diags, "break");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
	});

	test('break anchors to the correct line and column', () => {
		const diags = validate(`
void fn() {
    Integer x;
    break;
}`);
		const err = withMessage(diags, "break");
		expect(err).toHaveLength(1);
		// Line 3 (0-indexed) is `    break;`
		expect(err[0].range.start.line).toBe(3);
		// 4 spaces of indentation
		expect(err[0].range.start.character).toBe(4);
		expect(err[0].range.end.character).toBe(4 + 'break'.length);
	});

	test('break inside nested loop within switch — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        default: {
            Integer i;
            for (i = 0; i < 5; i = i + 1) {
                break;
            }
        }
    }
}`);
		expect(withMessage(diags, "'break' statement not inside")).toHaveLength(0);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Issue #97 — continue not in loop
// ─────────────────────────────────────────────────────────────────────────────

describe('#97 — continue not in loop', () => {
	test('continue inside while loop — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    while (i < 10) {
        continue;
        i = i + 1;
    }
}`);
		expect(withMessage(diags, "continue")).toHaveLength(0);
	});

	test('continue inside for loop — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i;
    for (i = 0; i < 10; i = i + 1) {
        continue;
    }
}`);
		expect(withMessage(diags, "continue")).toHaveLength(0);
	});

	test('continue inside do-while loop — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    do {
        continue;
        i = i + 1;
    } while (i < 10);
}`);
		expect(withMessage(diags, "continue")).toHaveLength(0);
	});

	test('continue directly in function body — 1 error', () => {
		const diags = validate(`
void fn() {
    continue;
}`);
		const err = withMessage(diags, "continue");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
		expect(err[0].message).toContain("'continue' statement not inside a loop");
	});

	test('continue inside switch (not in loop) — 1 error', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        default: {
            continue;
        }
    }
}`);
		const err = withMessage(diags, "continue");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
	});

	test('continue inside loop that is nested in switch — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        default: {
            Integer i;
            for (i = 0; i < 5; i = i + 1) {
                continue;
            }
        }
    }
}`);
		expect(withMessage(diags, "'continue' statement not inside")).toHaveLength(0);
	});

	test('continue anchors to the correct line and column', () => {
		const diags = validate(`
void fn() {
    Integer x;
    continue;
}`);
		const err = withMessage(diags, "continue");
		expect(err).toHaveLength(1);
		expect(err[0].range.start.line).toBe(3);
		expect(err[0].range.start.character).toBe(4);
		expect(err[0].range.end.character).toBe(4 + 'continue'.length);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Issue #98 — switch with more than one default
// ─────────────────────────────────────────────────────────────────────────────

describe('#98 — switch multiple defaults', () => {
	test('switch with one default — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        case "x": { }
        default: { }
    }
}`);
		expect(withMessage(diags, "default")).toHaveLength(0);
	});

	test('switch with two defaults — 1 error on second default', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        default: { }
        default: { }
    }
}`);
		const err = withMessage(diags, "more than one 'default'");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
	});

	test('switch with three defaults — 2 errors (on 2nd and 3rd)', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        default: { }
        default: { }
        default: { }
    }
}`);
		const err = withMessage(diags, "more than one 'default'");
		expect(err).toHaveLength(2);
		expect(err[0].severity).toBe(ERROR);
		expect(err[1].severity).toBe(ERROR);
	});

	test('nested switch each with one default — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        default: {
            Integer y = 2;
            switch (y) {
                default: { }
            }
        }
    }
}`);
		expect(withMessage(diags, "more than one 'default'")).toHaveLength(0);
	});

	test('outer switch has two defaults, inner has one — 1 error only', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        default: {
            Integer y = 2;
            switch (y) {
                default: { }
            }
        }
        default: { }
    }
}`);
		const err = withMessage(diags, "more than one 'default'");
		expect(err).toHaveLength(1);
		expect(err[0].severity).toBe(ERROR);
	});

	test('second default error anchors to the second default keyword', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        default: { }
        default: { }
    }
}`);
		const err = withMessage(diags, "more than one 'default'");
		expect(err).toHaveLength(1);
		// Second default is on line 5 (0-indexed)
		expect(err[0].range.start.line).toBe(5);
		// 8 spaces of indentation
		expect(err[0].range.start.character).toBe(8);
		expect(err[0].range.end.character - err[0].range.start.character).toBe('default'.length);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Issue #99 — dead code before first case/default in switch
// ─────────────────────────────────────────────────────────────────────────────

describe('#99 — dead code in switch', () => {
	test('switch with no items before first case — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        case "x": { }
        default: { }
    }
}`);
		expect(withMessage(diags, "Dead code")).toHaveLength(0);
	});

	test('declaration before default — 1 warning', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        Text dead;
        default: { }
    }
}`);
		const warns = withMessage(diags, "Dead code");
		expect(warns).toHaveLength(1);
		expect(warns[0].severity).toBe(WARNING);
	});

	test('statement before default — 1 warning', () => {
		const diags = validate(`
void fn() {
    Text t;
    Integer x = 0;
    switch (t) {
        x = 1;
        default: { }
    }
}`);
		const warns = withMessage(diags, "Dead code");
		expect(warns).toHaveLength(1);
		expect(warns[0].severity).toBe(WARNING);
	});

	test('multiple items before first case — warning per item', () => {
		const diags = validate(`
void fn() {
    Text t;
    Integer x;
    switch (t) {
        x = 1;
        Text unused;
        default: { }
    }
}`);
		const warns = withMessage(diags, "Dead code");
		expect(warns).toHaveLength(2);
	});

	test('content inside case block — no dead code warning', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
        case 1: {
            Integer y;
        }
        default: { }
    }
}`);
		expect(withMessage(diags, "Dead code")).toHaveLength(0);
	});

	test('empty switch body — no dead code warning', () => {
		const diags = validate(`
void fn() {
    Integer x = 1;
    switch (x) {
    }
}`);
		expect(withMessage(diags, "Dead code")).toHaveLength(0);
	});

	test('dead code warning message is descriptive', () => {
		const diags = validate(`
void fn() {
    Text t;
    switch (t) {
        Text dead;
        default: { }
    }
}`);
		const warns = withMessage(diags, "Dead code");
		expect(warns[0].message).toContain("case");
		expect(warns[0].message).toContain("default");
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Fixture-based smoke test
// ─────────────────────────────────────────────────────────────────────────────

describe('control_flow.4dm fixture', () => {
	test('fixture parses without syntax errors and produces expected diagnostics', () => {
		const fixturePath = path.resolve(__dirname, '..', 'client', 'testFixture', 'control_flow.4dm');
		const text = fs.readFileSync(fixturePath, 'utf-8');
		const result = parse(text);
		expect(result.syntaxErrors).toHaveLength(0);

		const diags = validateControlFlow(result.tree) as Diagnostic[];

		// #96 errors: break_not_in_loop (1) + break_not_in_loop_nested_if (1)
		const breakErrors = diags.filter(d => d.message.includes("'break' statement not inside"));
		expect(breakErrors.length).toBeGreaterThanOrEqual(2);

		// #97 errors: continue_not_in_loop (1) + continue_not_in_switch (1)
		const continueErrors = diags.filter(d => d.message.includes("'continue' statement not inside"));
		expect(continueErrors.length).toBeGreaterThanOrEqual(2);

		// #98 errors: switch_multiple_defaults (1) + switch_three_defaults (2)
		const defaultErrors = diags.filter(d => d.message.includes("more than one 'default'"));
		expect(defaultErrors.length).toBeGreaterThanOrEqual(3);

		// #99 warnings: switch_dead_code_declaration (1) + switch_dead_code_statement (1) + switch_dead_code_multiple (2)
		const deadCodeWarnings = diags.filter(d => d.message.includes("Dead code"));
		expect(deadCodeWarnings.length).toBeGreaterThanOrEqual(4);
	});
});
