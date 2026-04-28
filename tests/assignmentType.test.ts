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
	test('produces only the expected ERROR diagnostics', () => {
		const fixturePath = path.resolve(__dirname, '..', 'client', 'testFixture', 'assignment_type.4dm');
		const text = fs.readFileSync(fixturePath, 'utf-8');
		const diags = validate(text);

		// Every diagnostic must be a properly-formatted promotion error.
		for (const d of diags) {
			expect(d.severity).toBe(ERROR);
			expect(d.message).toMatch(/^Cannot promote '[^']+' to '[^']+'$/);
			expect(d.message).not.toContain('%s');
		}

		// We expect 8 errors from the fixture: 3 from test_init_incompatible
		// and 5 from test_assign_incompatible.
		expect(diags).toHaveLength(8);
	});
});
