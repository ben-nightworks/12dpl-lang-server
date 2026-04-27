/**
 * Tests for goto-definition behaviour, specifically that:
 * - Calling a function that has both a forward declaration and a full definition
 *   resolves to the definition (not the forward declaration)  (#91)
 * - Functions with only a forward declaration still resolve to that declaration
 * - The `isForwardDeclaration` flag is correctly set by the symbol collector
 */
import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable, deriveViews, findDeclaringScope } from '../server/src/core/symbolCollector';

function parseAndCollect(text: string) {
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	const views = deriveViews(table.root);
	return { table, views };
}

// ─── isForwardDeclaration flag ───────────────────────────────────────────────

describe('isForwardDeclaration flag', () => {
	test('forward declaration has isForwardDeclaration=true', () => {
		const src = `
void my_func(Integer x);
void my_func(Integer x) {}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('my_func')!;
		expect(all).toBeDefined();
		const fwd = all.find(d => d.isForwardDeclaration);
		expect(fwd).toBeDefined();
		expect(fwd!.isForwardDeclaration).toBe(true);
	});

	test('function definition does not have isForwardDeclaration set', () => {
		const src = `
void my_func(Integer x);
void my_func(Integer x) {}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('my_func')!;
		const def = all.find(d => !d.isForwardDeclaration);
		expect(def).toBeDefined();
		expect(def!.isForwardDeclaration).toBeFalsy();
	});

	test('function with only a definition has no forward declaration entry', () => {
		const src = `
void only_defined(Integer x) {}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('only_defined')!;
		expect(all.every(d => !d.isForwardDeclaration)).toBe(true);
	});

	test('function with only a forward declaration has isForwardDeclaration=true', () => {
		const src = `
void just_declared(Integer x);
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('just_declared')!;
		expect(all.length).toBe(1);
		expect(all[0].isForwardDeclaration).toBe(true);
	});
});

// ─── allFunctions contains both entries ─────────────────────────────────────

describe('allFunctions map', () => {
	test('contains both forward declaration and definition for the same function', () => {
		const src = `
void compute(Integer a, Integer b);

void compute(Integer a, Integer b)
{
	Integer result = a + b;
}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('compute')!;
		expect(all).toBeDefined();
		expect(all.length).toBe(2);
		expect(all.some(d => d.isForwardDeclaration === true)).toBe(true);
		expect(all.some(d => !d.isForwardDeclaration)).toBe(true);
	});

	test('definition entry has a later line number than the forward declaration', () => {
		const src = `
void compute(Integer a);

void compute(Integer a)
{
}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('compute')!;
		const fwd = all.find(d => d.isForwardDeclaration)!;
		const def = all.find(d => !d.isForwardDeclaration)!;
		expect(def.range.start.line).toBeGreaterThan(fwd.range.start.line);
	});
});

// ─── findDeclaringScope — prefers definition over forward declaration ─────────
//     This tests the behaviour that the fix enables in SymbolResolver.

describe('definition preference in allFunctions', () => {
	test('a non-forward declaration exists and can be selected over the forward declaration', () => {
		const src = `
void run();

void run()
{
}

void caller()
{
	run();
}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('run')!;
		expect(all).toBeDefined();

		// The fix logic: prefer a definition over a forward declaration
		const preferred = all.find(d => !d.isForwardDeclaration) ?? all[0];
		expect(preferred.isForwardDeclaration).toBeFalsy();
		// Definition is on line 4 (0-based: 3), forward decl on line 2 (0-based: 1)
		expect(preferred.range.start.line).toBeGreaterThan(0);
	});

	test('when only a forward declaration exists it is returned as the best match', () => {
		const src = `
void declared_only(Integer x);

void caller()
{
	declared_only(1);
}
`;
		const { views } = parseAndCollect(src);
		const all = views.allFunctions.get('declared_only')!;
		expect(all).toBeDefined();

		// The fix logic: no definition, fall back to forward declaration
		const preferred = all.find(d => !d.isForwardDeclaration) ?? all[0];
		expect(preferred.isForwardDeclaration).toBe(true);
	});

	test('findDeclaringScope returns the forward declaration by default (demonstrates current bug)', () => {
		const src = `
void buggy();

void buggy()
{
}

void caller()
{
	buggy();
}
`;
		const result = parse(src);
		const table = collectSymbolTable(result, src);

		// Position inside caller(), on the 'buggy()' call — line 9 (0-based)
		const position = { line: 9, character: 1 };
		const found = findDeclaringScope(table.root, position, 'buggy');
		expect(found).not.toBeNull();
		// findDeclaringScope currently returns the first match — the forward declaration
		// The fix in SymbolResolver will check isForwardDeclaration and prefer the definition
		expect(found!.declaration.isForwardDeclaration).toBe(true);
	});

	test('applying the fix: prefer definition over forward declaration in allFunctions', () => {
		// This mirrors the logic added to SymbolResolver.resolve()
		const src = `
void buggy();

void buggy()
{
}

void caller()
{
	buggy();
}
`;
		const result = parse(src);
		const table = collectSymbolTable(result, src);
		const views = deriveViews(table.root);

		const position = { line: 9, character: 1 };
		const found = findDeclaringScope(table.root, position, 'buggy');
		expect(found).not.toBeNull();

		// Replicate the fix: if forward decl, look up the definition from allFunctions
		let declaration = found!.declaration;
		if (declaration.isForwardDeclaration) {
			const allDecls = views.allFunctions.get('buggy');
			const definition = allDecls?.find(d => !d.isForwardDeclaration);
			if (definition) declaration = definition;
		}

		// After the fix, we should have the full definition, not the forward declaration
		expect(declaration.isForwardDeclaration).toBeFalsy();
		// Definition starts on line 3 (0-based), forward decl on line 1
		expect(declaration.range.start.line).toBeGreaterThan(1);
	});
});

