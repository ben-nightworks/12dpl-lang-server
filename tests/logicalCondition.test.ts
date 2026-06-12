/**
 * Tests for logical-condition validation (issue #101).
 *
 * Verifies that conditions in `if`, `while`, `do…while`, and `for`
 * loops are flagged when the expression cannot be evaluated as a
 * logical (boolean) value, and stay silent for compatible cases.
 */

import { describe, expect, test } from 'bun:test';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from '../server/src/core/parsePipeline';
import { validateLogicalConditions } from '../server/src/core/validators';

type Diagnostic = { severity: number; range: any; message: string; [key: string]: any };

const ERROR = 1;

function validate(text: string): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) {
		throw new Error(`Parse errors: ${result.syntaxErrors.map(e => e.message).join(', ')}`);
	}
	return validateLogicalConditions(result.tree) as Diagnostic[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Issue #101 — exact reproduction
// ─────────────────────────────────────────────────────────────────────────────

describe('issue #101 reproduction', () => {
	test('while ("123") flags a single Text-condition error with no %s leak', () => {
		const diags = validate(`
void My_function()
{
    while ("123")
    {

    }
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].severity).toBe(ERROR);
		expect(diags[0].message).toContain(`'Text'`);
		expect(diags[0].message).toContain('logical');
		expect(diags[0].message).not.toContain('%s');
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Compatible conditions — no diagnostics
// ─────────────────────────────────────────────────────────────────────────────

describe('compatible conditions', () => {
	test('Integer literal in while', () => {
		expect(validate(`
void fn() {
    while (1) { break; }
}`)).toHaveLength(0);
	});

	test('Integer variable in while', () => {
		expect(validate(`
void fn() {
    Integer i = 0;
    while (i) { break; }
}`)).toHaveLength(0);
	});

	test('relational expression in while', () => {
		expect(validate(`
void fn() {
    Integer i = 0;
    while (i < 10) { i = i + 1; }
}`)).toHaveLength(0);
	});

	test('equality with strings in if', () => {
		expect(validate(`
void fn() {
    Text t = "hello";
    if (t == "hello") {}
}`)).toHaveLength(0);
	});

	test('Real variable in if', () => {
		expect(validate(`
void fn() {
    Real r = 0.0;
    if (r) {}
}`)).toHaveLength(0);
	});

	test('combined logical in if', () => {
		expect(validate(`
void fn() {
    Integer a = 1;
    Integer b = 2;
    if (a > 0 && b < 3) {}
}`)).toHaveLength(0);
	});

	test('for with relational condition', () => {
		expect(validate(`
void fn() {
    for (Integer j = 0; j < 10; j = j + 1) {}
}`)).toHaveLength(0);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Incompatible conditions
// ─────────────────────────────────────────────────────────────────────────────

describe('incompatible conditions', () => {
	test('Text literal in while', () => {
		const diags = validate(`
void fn() {
    while ("x") {}
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});

	test('Text variable in while', () => {
		const diags = validate(`
void fn() {
    Text t = "hello";
    while (t) {}
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});

	test('Text literal in if', () => {
		const diags = validate(`
void fn() {
    if ("yes") {}
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});

	test('Text variable in if', () => {
		const diags = validate(`
void fn() {
    Text t = "no";
    if (t) {}
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});

	test('Text variable in do…while', () => {
		const diags = validate(`
void fn() {
    Integer i = 0;
    Text msg = "loop";
    do {
        i = i + 1;
    } while (msg);
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});

	test('Text variable as for-condition', () => {
		const diags = validate(`
void fn() {
    Text guard = "x";
    for (Integer j = 0; guard; j = j + 1) {}
}`);
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});

	test('every diagnostic is an ERROR with no leaked %s', () => {
		const diags = validate(`
void fn() {
    Text a = "x";
    Text b = "y";
    if (a) {}
    while (b) {}
}`);
		expect(diags).toHaveLength(2);
		for (const d of diags) {
			expect(d.severity).toBe(ERROR);
			expect(d.message).not.toContain('%s');
		}
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Scope isolation
// ─────────────────────────────────────────────────────────────────────────────

describe('scope isolation', () => {
	test('identical names in different functions resolve independently', () => {
		const diags = validate(`
void a()
{
    Text x = "t";
    if (x) {}
}

void b()
{
    Integer x = 0;
    if (x) {}
}`);
		// Only function a()'s Text condition should be flagged
		expect(diags).toHaveLength(1);
		expect(diags[0].message).toContain(`'Text'`);
	});
});

// ─────────────────────────────────────────────────────────────────────────────
// Full fixture sanity check
// ─────────────────────────────────────────────────────────────────────────────

describe('client/testFixture/logical_condition.4dm fixture', () => {
	test('produces exactly the expected ERROR diagnostics', () => {
		const fixturePath = path.resolve(__dirname, '..', 'client', 'testFixture', 'logical_condition.4dm');
		const text = fs.readFileSync(fixturePath, 'utf-8');
		const diags = validate(text);

		for (const d of diags) {
			expect(d.severity).toBe(ERROR);
			expect(d.message).toContain('logical');
			expect(d.message).not.toContain('%s');
		}

		// 6 incompatible-condition functions in the fixture, each with one error
		expect(diags).toHaveLength(6);
	});
});
