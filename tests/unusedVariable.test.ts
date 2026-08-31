/**
 * Tests for unused local variable validation.
 *
 * Function-local variables that are never referenced get a Hint diagnostic
 * tagged Unnecessary, so editors render them faded.
 */

import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { validateUnusedVariables } from '../server/src/core/validators';

type Diagnostic = { severity: number; range: any; message: string; tags?: number[]; [key: string]: any };

const HINT = 4;
const TAG_UNNECESSARY = 1;

function validate(text: string): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) {
		throw new Error(`Parse errors: ${result.syntaxErrors.map(e => e.message).join(', ')}`);
	}
	return validateUnusedVariables(result.tree, result.conditionalLines) as Diagnostic[];
}

function forVariable(diags: Diagnostic[], name: string): Diagnostic[] {
	return diags.filter(d => d.message.includes(`'${name}'`));
}

describe('unused local variables', () => {
	test('never-referenced local — Hint diagnostic tagged Unnecessary', () => {
		const diags = validate(`
void fn() {
    Integer unused;
    Integer used = 1;
    Print(used);
}`);
		const hits = forVariable(diags, 'unused');
		expect(hits).toHaveLength(1);
		expect(hits[0].severity).toBe(HINT);
		expect(hits[0].tags).toEqual([TAG_UNNECESSARY]);
		expect(hits[0].range.start.line).toBe(2);
		expect(forVariable(diags, 'used')).toHaveLength(0);
	});

	test('assignment target counts as a use', () => {
		const diags = validate(`
void fn() {
    Integer i;
    i = 5;
}`);
		expect(forVariable(diags, 'i')).toHaveLength(0);
	});

	test('by-reference output argument counts as a use', () => {
		const diags = validate(`
void fn(Model model) {
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
}`);
		expect(forVariable(diags, 'total')).toHaveLength(0);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('use inside a nested block counts', () => {
		const diags = validate(`
void fn(Integer flag) {
    Integer count = 0;
    if (flag) {
        count = count + 1;
    }
}`);
		expect(forVariable(diags, 'count')).toHaveLength(0);
	});

	test('function parameters are not flagged', () => {
		const diags = validate(`
void fn(Integer never_touched) {
    Integer i = 1;
    Print(i);
}`);
		expect(forVariable(diags, 'never_touched')).toHaveLength(0);
	});

	test('globals and top-level script variables are not flagged', () => {
		const diags = validate(`
Integer global_unused;
Text top_level_unused;
void fn() {
    Integer i = 1;
    Print(i);
}`);
		expect(forVariable(diags, 'global_unused')).toHaveLength(0);
		expect(forVariable(diags, 'top_level_unused')).toHaveLength(0);
	});

	test('for-loop declaration variable that is used — no diagnostic', () => {
		const diags = validate(`
void fn() {
    for (Integer i = 0; i < 10; i = i + 1) {
        Print(i);
    }
}`);
		expect(forVariable(diags, 'i')).toHaveLength(0);
	});

	test('multiple declarators on one line are each checked', () => {
		const diags = validate(`
void fn() {
    Integer a, b;
    Print(a);
}`);
		expect(forVariable(diags, 'a')).toHaveLength(0);
		expect(forVariable(diags, 'b')).toHaveLength(1);
	});

	test('same name in different functions is tracked per function', () => {
		const diags = validate(`
void uses_it() {
    Integer value = 1;
    Print(value);
}
void ignores_it() {
    Integer value;
}`);
		const hits = forVariable(diags, 'value');
		expect(hits).toHaveLength(1);
		expect(hits[0].range.start.line).toBe(6);
	});

	test('variable used only in its own function, not another, is still used', () => {
		const diags = validate(`
void fn() {
    Integer shared = 2;
    Print(shared);
}
void other() {
    Integer i = 1;
    Print(i);
}`);
		expect(diags).toHaveLength(0);
	});

	test('local function prototypes are not flagged', () => {
		const diags = validate(`
Integer helper(Integer value);
void fn() {
    Integer result;
    result = helper(1);
    Print(result);
}`);
		expect(diags).toHaveLength(0);
	});
});
