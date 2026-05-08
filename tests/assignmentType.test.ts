/**
 * Tests for assignment-type validation (issue #100).
 *
 * Verifies that assignments and initialisers report
 * "Cannot promote 'X' to 'Y'" when the source and destination types
 * are incompatible, and stay silent for compatible cases.
 */

import { describe, expect, test } from 'bun:test';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from '../server/src/core/parsePipeline';
import { validateAssignmentTypes } from '../server/src/core/validators';

type Diagnostic = { severity: number; range: any; message: string; [key: string]: any };

const ERROR = 1;
const WARNING = 2;

function validate(text: string): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) {
		throw new Error(`Parse errors: ${result.syntaxErrors.map(e => e.message).join(', ')}`);
	}
	return validateAssignmentTypes(result.tree) as Diagnostic[];
}

function withMessage(diags: Diagnostic[], substr: string): Diagnostic[] {
	return diags.filter(d => d.message.includes(substr));
}

// ─────────────────────────────────────────────────────────────────────────────
// Plain assignments
// ─────────────────────────────────────────────────────────────────────────────

describe('plain `=` assignments', () => {
	test('Integer = Integer literal — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i;
    i = 0;
}`);
		expect(diags).toHaveLength(0);
	});

	test('Real = Integer literal — no diagnostic (promotion)', () => {
		const diags = validate(`
void fn() {
    Real r;
    r = 0;
}`);
		expect(diags).toHaveLength(0);
	});

	test('Text = Integer variable — diagnostic with both type names', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    Text t;
    t = i;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(ERROR);
		expect(diags[0].message).toBe(`Cannot promote 'Integer' to 'Text'`);
		// No `%s` placeholders should ever leak through
		expect(diags[0].message).not.toContain('%s');
	});

	test('Text = Integer literal — diagnostic', () => {
		const diags = validate(`
void fn() {
    Text t;
    t = 0;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toBe(`Cannot promote 'Integer' to 'Text'`);
	});

	test('Text = Real literal — diagnostic', () => {
		const diags = validate(`
void fn() {
    Text t;
    t = 1.5;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toBe(`Cannot promote 'Real' to 'Text'`);
	});

	test('Integer = Text variable — diagnostic', () => {
		const diags = validate(`
void fn() {
    Text other;
    Integer i;
    i = other;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toBe(`Cannot promote 'Text' to 'Integer'`);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Variable initialisers
// ─────────────────────────────────────────────────────────────────────────────

describe('variable initialisers', () => {
	test('Integer i = 0 — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
}`);
		expect(diags).toHaveLength(0);
	});

	test('Real r = 0 — no diagnostic (promotion)', () => {
		const diags = validate(`
void fn() {
    Real r = 0;
}`);
		expect(diags).toHaveLength(0);
	});

	test('Integer64 big = Integer — no diagnostic (promotion)', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    Integer64 big = i;
}`);
		expect(diags).toHaveLength(0);
	});

	test('Integer i = "hello" — diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = "hello";
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toBe(`Cannot promote 'Text' to 'Integer'`);
	});

	test('Text t = 1.5 — diagnostic', () => {
		const diags = validate(`
void fn() {
    Text t = 1.5;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toBe(`Cannot promote 'Real' to 'Text'`);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Issue #100 — exact reproduction
// ─────────────────────────────────────────────────────────────────────────────

describe('issue #100 reproduction', () => {
	test('the example from the issue produces a single, fully-formed diagnostic', () => {
		const diags = validate(`
void My_function()
{
    Integer int = 0;
    Text text;

    text = int;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(ERROR);
		expect(diags[0].message).toBe(`Cannot promote 'Integer' to 'Text'`);
		// Critical: no leaked printf placeholders
		expect(diags[0].message).not.toContain('%s');
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Precision-loss warnings
// ─────────────────────────────────────────────────────────────────────────────

describe('precision-loss warnings', () => {
	test('Integer = Integer64 — warning (range narrowing)', () => {
		const diags = validate(`
void fn() {
    Integer64 big = 0;
    Integer   i;
    i = big;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(WARNING);
		expect(diags[0].message).toBe(
			`Possible loss of precision: 'Integer64' to 'Integer' (large values may be truncated)`
		);
	});

	test('Integer = Real — warning (decimal truncation)', () => {
		const diags = validate(`
void fn() {
    Real    r = 1.5;
    Integer i;
    i = r;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(WARNING);
		expect(diags[0].message).toBe(
			`Possible loss of precision: 'Real' to 'Integer' (decimals will be truncated)`
		);
	});

	test('Integer64 = Real — warning (decimal truncation)', () => {
		const diags = validate(`
void fn() {
    Real      r = 1.5;
    Integer64 big;
    big = r;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(WARNING);
		expect(diags[0].message).toBe(
			`Possible loss of precision: 'Real' to 'Integer64' (decimals will be truncated)`
		);
	});

	test('Integer i = 1.5 (initialiser) — warning', () => {
		const diags = validate(`
void fn() {
    Integer i = 1.5;
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(WARNING);
		expect(diags[0].message).toBe(
			`Possible loss of precision: 'Real' to 'Integer' (decimals will be truncated)`
		);
	});

	test('Real r = 0 (lossless) — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Real r = 0;
}`);
		expect(diags).toHaveLength(0);
	});

	test('Integer64 big = i (lossless widening) — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    Integer64 big = i;
}`);
		expect(diags).toHaveLength(0);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Scope isolation
// ─────────────────────────────────────────────────────────────────────────────

describe('scope isolation', () => {
	test('identical names in different functions do not interfere', () => {
		const diags = validate(`
void test_scope_a()
{
    Text x;
    x = "hello";
}

void test_scope_b()
{
    Integer x;
    x = 0;
}`);
		expect(diags).toHaveLength(0);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Full fixture sanity check
// ─────────────────────────────────────────────────────────────────────────────

describe('client/testFixture/assignment_type.4dm fixture', () => {
	test('produces the expected mix of ERROR and WARNING diagnostics', () => {
		const fixturePath = path.resolve(__dirname, '..', 'client', 'testFixture', 'assignment_type.4dm');
		const text = fs.readFileSync(fixturePath, 'utf-8');
		const diags = validate(text);

		const errors = diags.filter(d => d.severity === ERROR);
		const warnings = diags.filter(d => d.severity === WARNING);

		for (const d of errors) {
			expect(d.message).toMatch(/^Cannot promote '[^']+' to '[^']+'$/);
			expect(d.message).not.toContain('%s');
		}
		for (const d of warnings) {
			expect(d.message).toMatch(/^Possible loss of precision: '[^']+' to '[^']+' \([^)]+\)$/);
			expect(d.message).not.toContain('%s');
		}

		// Every diagnostic must fall into one of the two recognised buckets.
		expect(errors.length + warnings.length).toBe(diags.length);

		// 8 errors: 3 from test_init_incompatible, 5 from test_assign_incompatible.
		expect(errors).toHaveLength(8);
		// 4 warnings from test_lossy_promotions.
		expect(warnings).toHaveLength(4);
	});
});
