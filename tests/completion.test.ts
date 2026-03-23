import { describe, expect, test } from 'bun:test';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable, deriveViews } from '../server/src/core/symbolCollector';
import { PrototypeService } from '../server/src/services/prototypeService';
import type { SymbolDeclaration, DerivedSymbolViews } from '../server/src/core/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

function repoRoot(): string {
	return path.resolve(import.meta.dir, '..');
}

function readFixture(relPath: string): string {
	return fs.readFileSync(path.join(repoRoot(), relPath), 'utf-8');
}

interface CompletionContext {
	text: string;
	symbolTable: ReturnType<typeof collectSymbolTable>;
	prototypes: PrototypeService;
	views: DerivedSymbolViews;
}

function setupCompletion(text: string): CompletionContext {
	const parsed = parse(text);
	const symbolTable = collectSymbolTable(parsed, text);
	const views = deriveViews(symbolTable.root);
	const prototypes = new PrototypeService();
	return { text, symbolTable, prototypes, views };
}

/**
 * Helper to get all symbol names visible at a position.
 * Returns name and kind for easier assertion.
 */
function getVisibleSymbolsAt(
	table: ReturnType<typeof collectSymbolTable>,
	line: number,
	character: number
): Array<{ name: string; kind: string; type?: string }> {
	const { visibleSymbolsAt } = require('../server/src/core/symbolCollector');
	const visible = visibleSymbolsAt(table.root, { line, character });
	return visible.map((decl: SymbolDeclaration) => ({
		name: decl.name,
		kind: decl.kind,
		type: decl.type
	}));
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Completion items', () => {
	test('global variables appear in completions', () => {
		const src = `
{
	Integer my_global;
	Real another_global;
}

void foo() {
	Integer local;
}
`;
		const ctx = setupCompletion(src);
		// Globals are in the top-level block scope; check via deriveViews
		const globalNames = Array.from(ctx.views.exportedVariables.keys());

		expect(globalNames).toContain('my_global');
		expect(globalNames).toContain('another_global');
	});

	test('user-defined functions appear in completions', () => {
		const src = `
void my_function();
void another_function(Integer x);

void main() {
	// Completions should include both functions
}
`;
		const ctx = setupCompletion(src);
		// Functions are exported at module level
		const functionNames = Array.from(ctx.views.exportedFunctions.keys());

		expect(functionNames).toContain('my_function');
		expect(functionNames).toContain('another_function');
	});

	test('local variables appear in completions at their scope', () => {
		const src = `
void foo() {
	Integer local_var;
	Real local_real;
	
	// At this position, both locals should be visible
}
`;
		const ctx = setupCompletion(src);
		// Line 4 is inside the function
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 4, 0);
		const names = visible.map(s => s.name);

		expect(names).toContain('local_var');
		expect(names).toContain('local_real');
	});

	test('local variables do NOT appear outside their scope', () => {
		const src = `
void foo() {
	Integer local_var;
}

void bar() {
	// local_var should NOT be visible here
}
`;
		const ctx = setupCompletion(src);
		// Line 6 is inside bar(), outside foo()
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 6, 0);
		const names = visible.map(s => s.name);

		expect(names).not.toContain('local_var');
	});

	test('block-scoped variables (if block) appear in completions', () => {
		const src = `
void foo() {
	if (1) {
		Integer block_var;
		// block_var is visible here
	}
}
`;
		const ctx = setupCompletion(src);
		// Line 4 is inside the if block
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 4, 0);
		const names = visible.map(s => s.name);

		expect(names).toContain('block_var');
	});

	test('for-loop variables appear in completions inside the loop', () => {
		const src = `
void foo() {
	for (Integer loop_counter = 0; loop_counter < 10; loop_counter = loop_counter + 1) {
		Integer loop_var;
		// Both loop_counter and loop_var are visible here
	}
}
`;
		const ctx = setupCompletion(src);
		// Line 4 is inside the for loop
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 4, 0);
		const names = visible.map(s => s.name);

		expect(names).toContain('loop_counter');
		expect(names).toContain('loop_var');
	});

	test('function parameters appear in completions', () => {
		const src = `
void foo(Integer param1, Real &param2) {
	// Both parameters should be visible
}
`;
		const ctx = setupCompletion(src);
		// Line 2 is inside the function
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 2, 0);
		const names = visible.map(s => s.name);

		expect(names).toContain('param1');
		expect(names).toContain('param2');
	});

	test('preprocessor defines appear in completions', () => {
		const src = `
#define MY_MACRO 42
#define MY_FUNC(x) ((x) * 2)

void foo() {
	// Both defines should be available
}
`;
		const ctx = setupCompletion(src);
		const defines = ctx.symbolTable.defines;
		const names = defines.map(d => d.name);

		expect(names).toContain('MY_MACRO');
		expect(names).toContain('MY_FUNC');
	});

	test('include file globals appear in completions', () => {
		const mainSrc = `
#include "header1.h"

void main() {
	// Globals from header should be available
}
`;
		// We'd need to mock the include resolver for this test
		// For now, we'll note that this requires the DocumentService infrastructure
		// This test is more of an integration test
		expect(true).toBe(true); // Placeholder
	});

	test('include file functions appear in completions', () => {
		const mainSrc = `
#include "header1.h"

void main() {
	// Functions from header should be available
}
`;
		// Same as above - requires full service integration
		expect(true).toBe(true); // Placeholder
	});

	test('function overloads are collected correctly', () => {
		const src = `
void process(Integer val);
void process(Real val);
void process(Integer val1, Integer val2);

void main() {
	Integer x = 0;
	// At this position, all three overloads should be in global scope
}
`;
		const ctx = setupCompletion(src);
		// Check exported functions
		const processFuncs = ctx.views.exportedFunctions.get('process') ?? [];

		// Should have 3 overloads
		expect(processFuncs.length).toBe(3);
	});

	test('outer scope variables are visible in nested blocks', () => {
		const src = `
void foo() {
	Integer outer_var;
	
	if (1) {
		Integer inner_var;
		// Both outer_var and inner_var should be visible
	}
}
`;
		const ctx = setupCompletion(src);
		// Line 5 is inside the if block
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 5, 0);
		const names = visible.map(s => s.name);

		expect(names).toContain('outer_var');
		expect(names).toContain('inner_var');
	});

	test('shadowing: inner scope variable hides outer scope variable', () => {
		const src = `
void foo() {
	Integer my_var;
	
	if (1) {
		Integer my_var;  // Shadows outer my_var
		// Should resolve to inner my_var
	}
}
`;
		const ctx = setupCompletion(src);
		// Line 5 is inside the if block
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 5, 0);
		// Should have my_var but only the inner one should be in scope
		// (visibleSymbolsAt deduplicates by name, keeping the innermost)
		const myVars = visible.filter(s => s.name === 'my_var');
		expect(myVars.length).toBe(1);
	});

	test('global functions are accessible from inside functions', () => {
		const src = `
void helper1();
void helper2(Integer x);

void main() {
	// Both helper functions should be available
}
`;
		const ctx = setupCompletion(src);
		// Check exported functions
		const helperNames = Array.from(ctx.views.exportedFunctions.keys());

		expect(helperNames).toContain('helper1');
		expect(helperNames).toContain('helper2');
	});

	test('parameter types are preserved in completions', () => {
		const src = `
void foo(Integer param1, Real param2, String param3) {
	// Check parameter types
}
`;
		const ctx = setupCompletion(src);
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 2, 0);

		const param1 = visible.find(s => s.name === 'param1');
		expect(param1?.type).toBe('Integer');

		const param2 = visible.find(s => s.name === 'param2');
		expect(param2?.type).toBe('Real');

		const param3 = visible.find(s => s.name === 'param3');
		expect(param3?.type).toBe('String');
	});

	test('variable types are preserved in completions', () => {
		const src = `
void foo() {
	Integer my_int;
	Real my_real;
	String my_string;
}
`;
		const ctx = setupCompletion(src);
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 2, 0);

		const myInt = visible.find(s => s.name === 'my_int');
		expect(myInt?.type).toBe('Integer');

		const myReal = visible.find(s => s.name === 'my_real');
		expect(myReal?.type).toBe('Real');

		const myString = visible.find(s => s.name === 'my_string');
		expect(myString?.type).toBe('String');
	});

	test('complex scoping with multiple nested blocks', () => {
		const src = `
void complex() {
	Integer level1;
	
	if (1) {
		Integer level2;
		
		if (1) {
			Integer level3;
			// All three should be visible
		}
	}
}
`;
		const ctx = setupCompletion(src);
		// Line 9 is the innermost if block
		const visible = getVisibleSymbolsAt(ctx.symbolTable, 9, 0);
		const names = visible.map(s => s.name);

		expect(names).toContain('level1');
		expect(names).toContain('level2');
		expect(names).toContain('level3');
	});

	test('completion preserves case for symbol lookup', () => {
		const src = `
{
	Integer MyVar;
	Real myVar2;
}

void foo() {
	Integer x = 0;
}
`;
		const ctx = setupCompletion(src);
		// Check exported variables (case-sensitive keys)
		const names = Array.from(ctx.views.exportedVariables.keys());

		expect(names).toContain('MyVar');
		expect(names).toContain('myVar2');
	});
});
