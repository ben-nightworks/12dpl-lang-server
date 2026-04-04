import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable, deriveViews } from '../server/src/core/symbolCollector';
import type { DerivedSymbolViews } from '../server/src/core/types';

function collectDerivedViews(text: string): DerivedSymbolViews {
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	return deriveViews(table.root);
}

function collectDocumentSymbolNames(text: string): { functions: string[]; variables: string[] } {
	const views = collectDerivedViews(text);
	return {
		functions: Array.from(views.exportedFunctions.keys()),
		variables: Array.from(views.exportedVariables.keys()),
	};
}

describe('collectDocumentSymbolNames', () => {
	test('collects variables, parameters, and functions', () => {
		const src = `
Integer count;
void foo(Integer a, Integer b){
	Integer local;
	count = a + b + local;
}

void bar();
`;

		const { functions, variables } = collectDocumentSymbolNames(src);

		expect(functions).toContain('foo');
		expect(functions).toContain('bar');

		expect(variables).toContain('count');
		// a, b, local are inside function foo — they should NOT appear as global variables
		expect(variables).not.toContain('a');
		expect(variables).not.toContain('b');
		expect(variables).not.toContain('local');
	});

	test('extracts types for variables and full function signatures', () => {
		const src = `
Integer count;
void foo(Integer a, Integer &b, Real c[]){
	Integer local;
}

void bar();
`;

		const views = collectDerivedViews(src);
		expect(views.exportedVariables.get('count')?.type).toBe('Integer');
		// local, a, b, c are inside function foo — not in global views
		expect(views.exportedVariables.get('local')).toBeUndefined();
		expect(views.exportedVariables.get('a')).toBeUndefined();
		expect(views.exportedVariables.get('b')).toBeUndefined();
		expect(views.exportedVariables.get('c')).toBeUndefined();

		expect(views.exportedFunctions.get('foo')?.[0]?.signature).toBe('void foo(Integer a, Integer &b, Real c[])');
		expect(views.exportedFunctions.get('bar')?.[0]?.signature).toBe('void bar()');
	});

	test('captures ranges for go-to-definition', () => {
		const src = 'void foo(){\n}\n';
		const views = collectDerivedViews(src);
		const fooDecl = views.exportedFunctions.get('foo')?.[0];
		expect(fooDecl?.range).toBeDefined();
		expect(fooDecl?.range?.start.line).toBe(0);
		expect(fooDecl?.range?.start.character).toBe(5);
	});

	test('does not leak generated wrapper function names', () => {
		const src = `
// top-level script
Integer x;
x = 1;
`;

		const { functions } = collectDocumentSymbolNames(src);
		for (const fn of functions) {
			expect(fn.startsWith('__12dpl__script__')).toBe(false);
		}
	});

	test('does not leak forward declaration parameters as global variables', () => {
		const src = `
void forward_declaration(Integer x);
Integer create_rgb(Integer r, Integer g, Integer b);
`;

		const views = collectDerivedViews(src);

		// Forward declarations should register as functions
		expect(views.exportedFunctions.get('forward_declaration')).toBeDefined();
		expect(views.exportedFunctions.get('create_rgb')).toBeDefined();

		// Parameters should NOT appear as global variables
		expect(views.exportedVariables.get('x')).toBeUndefined();
		expect(views.exportedVariables.get('r')).toBeUndefined();
		expect(views.exportedVariables.get('g')).toBeUndefined();
		expect(views.exportedVariables.get('b')).toBeUndefined();
	});

	test('still exports script-level variables alongside forward declarations', () => {
		const src = `
Integer count = 5;
void forward_declaration(Integer x);
Text name = "test";
`;

		const views = collectDerivedViews(src);

		// Functions registered
		expect(views.exportedFunctions.get('forward_declaration')).toBeDefined();

		// Script-level variables exported
		expect(views.exportedVariables.get('count')).toBeDefined();
		expect(views.exportedVariables.get('name')).toBeDefined();

		// Forward declaration parameter NOT exported
		expect(views.exportedVariables.get('x')).toBeUndefined();
	});

	test('does not leak parameters from overloaded forward declarations', () => {
		const src = `
Integer count = 0;
void process();
void process(Integer x);
void process(Integer x, Integer y);
Integer other_var = 5;
`;

		const views = collectDerivedViews(src);

		// Overloaded function registered
		expect(views.exportedFunctions.get('process')).toBeDefined();

		// Script-level variables exported
		expect(views.exportedVariables.get('count')).toBeDefined();
		expect(views.exportedVariables.get('other_var')).toBeDefined();

		// Parameters from ALL overloads must NOT leak
		expect(views.exportedVariables.get('x')).toBeUndefined();
		expect(views.exportedVariables.get('y')).toBeUndefined();
		expect(views.exportedVariables.get('z')).toBeUndefined();
	});
});
