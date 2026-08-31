/**
 * Tests for dynamic array Null reminder validation (issue #107).
 *
 * Dynamic arrays should be Nulled before going out of scope; the validator
 * emits an Information diagnostic on used-but-never-Nulled dynamic arrays.
 */

import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { validateDynamicArrayNull } from '../server/src/core/validators';

type Diagnostic = { severity: number; range: any; message: string; [key: string]: any };

const INFORMATION = 3;

function validate(text: string): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) {
		throw new Error(`Parse errors: ${result.syntaxErrors.map(e => e.message).join(', ')}`);
	}
	return validateDynamicArrayNull(result.tree, result.conditionalLines) as Diagnostic[];
}

function forVariable(diags: Diagnostic[], name: string): Diagnostic[] {
	return diags.filter(d => d.message.includes(`'${name}'`));
}

describe('#107 — dynamic array Null reminder', () => {
	test('used dynamic array without Null — Information diagnostic', () => {
		const diags = validate(`
void fn(Model model) {
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
}`);
		const hits = forVariable(diags, 'de');
		expect(hits).toHaveLength(1);
		expect(hits[0].severity).toBe(INFORMATION);
		expect(hits[0].message).toContain('Null(de)');
		expect(hits[0].range.start.line).toBe(2);
	});

	test('dynamic array that is Nulled — no diagnostic', () => {
		const diags = validate(`
void fn(Model model) {
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
    Null(de);
}`);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('declared but never used dynamic array — no diagnostic', () => {
		const diags = validate(`
void fn() {
    Dynamic_Element de;
}`);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('all dynamic array types are covered', () => {
		const diags = validate(`
void fn() {
    Dynamic_Element de;
    Dynamic_Text dt;
    Dynamic_Integer di;
    Dynamic_Real dr;
    Integer count;
    Get_number_of_items(de, count);
    Get_number_of_items(dt, count);
    Get_number_of_items(di, count);
    Get_number_of_items(dr, count);
}`);
		expect(forVariable(diags, 'de')).toHaveLength(1);
		expect(forVariable(diags, 'dt')).toHaveLength(1);
		expect(forVariable(diags, 'di')).toHaveLength(1);
		expect(forVariable(diags, 'dr')).toHaveLength(1);
	});

	test('non-dynamic types are never flagged', () => {
		const diags = validate(`
void fn() {
    Integer i;
    Text t;
    Element e;
    i = 1;
    t = "x";
}`);
		expect(diags).toHaveLength(0);
	});

	test('Null inside a conditional branch counts', () => {
		const diags = validate(`
void fn(Model model, Integer flag) {
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
    if (flag) {
        Null(de);
    }
}`);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('same name in different functions is tracked per function', () => {
		const diags = validate(`
void good(Model model) {
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
    Null(de);
}
void bad(Model model) {
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
}`);
		const hits = forVariable(diags, 'de');
		expect(hits).toHaveLength(1);
		expect(hits[0].range.start.line).toBe(8);
	});

	test('function parameters are not flagged', () => {
		const diags = validate(`
void helper(Dynamic_Element de) {
    Integer count;
    Get_number_of_items(de, count);
    Print(count);
}`);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('top-level dynamic array Nulled at top level — no diagnostic', () => {
		const diags = validate(`
Dynamic_Element de;
Integer total;
Model survey = Get_model("survey");
Get_elements(survey, de, total);
Null(de);
`);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('top-level dynamic array never Nulled — Information diagnostic', () => {
		const diags = validate(`
Dynamic_Element de;
Integer total;
Model survey = Get_model("survey");
Get_elements(survey, de, total);
`);
		expect(forVariable(diags, 'de')).toHaveLength(1);
	});

	test('global dynamic array Nulled inside a function — no diagnostic', () => {
		const diags = validate(`
Dynamic_Element de;
void cleanup() {
    Null(de);
}
void main(Model survey) {
    Integer total;
    Get_elements(survey, de, total);
    cleanup();
}`);
		expect(forVariable(diags, 'de')).toHaveLength(0);
	});

	test('multiple declarators on one line are each checked', () => {
		const diags = validate(`
void fn() {
    Dynamic_Text a, b;
    Integer count;
    Get_number_of_items(a, count);
    Get_number_of_items(b, count);
    Null(a);
}`);
		expect(forVariable(diags, 'a')).toHaveLength(0);
		expect(forVariable(diags, 'b')).toHaveLength(1);
	});

	test('function prototypes returning a dynamic array are not flagged', () => {
		const diags = validate(`
Dynamic_Element build_list(Model model);
void fn(Model model) {
    Integer i = 1;
    Print(i);
}`);
		expect(diags).toHaveLength(0);
	});
});
