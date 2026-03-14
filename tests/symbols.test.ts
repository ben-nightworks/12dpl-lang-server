import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable, deriveViews, toLegacyIndex } from '../server/src/core/symbolCollector';
import type { DocumentSymbolIndex } from '../server/src/core/types';

function collectDocumentSymbolIndex(text: string): DocumentSymbolIndex {
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	const views = deriveViews(table.root);
	return toLegacyIndex(views);
}

function collectDocumentSymbolNames(text: string): { functions: string[]; variables: string[] } {
	const index = collectDocumentSymbolIndex(text);
	return {
		functions: Object.keys(index.functions),
		variables: Object.keys(index.variables),
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

		const index = collectDocumentSymbolIndex(src);
		expect(index.variables.count.type).toBe('Integer');
		// local, a, b, c are inside function foo — not in global index
		expect(index.variables.local).toBeUndefined();
		expect(index.variables.a).toBeUndefined();
		expect(index.variables.b).toBeUndefined();
		expect(index.variables.c).toBeUndefined();

		expect(index.functions.foo.signature).toBe('void foo(Integer a, Integer &b, Real c[])');
		expect(index.functions.bar.signature).toBe('void bar()');
	});

	test('captures ranges for go-to-definition', () => {
		const src = 'void foo(){\n}\n';
		const index = collectDocumentSymbolIndex(src);
		expect(index.functions.foo.range).toBeDefined();
		expect(index.functions.foo.range?.start.line).toBe(0);
		expect(index.functions.foo.range?.start.character).toBe(5);
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

		const index = collectDocumentSymbolIndex(src);

		// Forward declarations should register as functions
		expect(index.functions.forward_declaration).toBeDefined();
		expect(index.functions.create_rgb).toBeDefined();

		// Parameters should NOT appear as global variables
		expect(index.variables.x).toBeUndefined();
		expect(index.variables.r).toBeUndefined();
		expect(index.variables.g).toBeUndefined();
		expect(index.variables.b).toBeUndefined();
	});

	test('still exports script-level variables alongside forward declarations', () => {
		const src = `
Integer count = 5;
void forward_declaration(Integer x);
Text name = "test";
`;

		const index = collectDocumentSymbolIndex(src);

		// Functions registered
		expect(index.functions.forward_declaration).toBeDefined();

		// Script-level variables exported
		expect(index.variables.count).toBeDefined();
		expect(index.variables.name).toBeDefined();

		// Forward declaration parameter NOT exported
		expect(index.variables.x).toBeUndefined();
	});

	test('does not leak parameters from overloaded forward declarations', () => {
		const src = `
Integer count = 0;
void process();
void process(Integer x);
void process(Integer x, Integer y);
Integer other_var = 5;
`;

		const index = collectDocumentSymbolIndex(src);

		// Overloaded function registered
		expect(index.functions.process).toBeDefined();

		// Script-level variables exported
		expect(index.variables.count).toBeDefined();
		expect(index.variables.other_var).toBeDefined();

		// Parameters from ALL overloads must NOT leak
		expect(index.variables.x).toBeUndefined();
		expect(index.variables.y).toBeUndefined();
		expect(index.variables.z).toBeUndefined();
	});
});
