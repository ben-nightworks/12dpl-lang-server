import { describe, expect, test } from 'bun:test';
import { collectDocumentSymbolNames, collectDocumentSymbolIndex } from '../server/src/antlr/symbols.ts';

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
		expect(variables).toContain('a');
		expect(variables).toContain('b');
		expect(variables).toContain('local');
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
		expect(index.variables.local.type).toBe('Integer');
		expect(index.variables.a.type).toBe('Integer');
		expect(index.variables.b.type).toBe('Integer');
		expect(index.variables.c.type).toBe('Real');

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
});
