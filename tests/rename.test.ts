/**
 * Tests for the rename provider core logic.
 *
 * Tests exercise `computeRenameEdits` and `findTokenOccurrences` directly,
 * bypassing the LSP connection layer.
 */

import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable } from '../server/src/core/symbolCollector';
import { computeRenameEdits, findTokenOccurrences } from '../server/src/providers/renameProvider';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseAndCollect(text: string) {
	const result = parse(text);
	const symbolTable = collectSymbolTable(result, text);
	const allTokens: any[] = (result.tokens as any).tokens ?? [];
	const docLastLine = text.split('\n').length - 1;
	return { symbolTable, allTokens, docLastLine };
}

function editRanges(edits: { range: any; newText: string }[]): Array<{ line: number; char: number }> {
	return edits.map(e => ({ line: e.range.start.line, char: e.range.start.character }));
}

// ─── findTokenOccurrences ────────────────────────────────────────────────────

describe('findTokenOccurrences', () => {
	test('finds all tokens matching name', () => {
		const src = `Integer count;
count = 1;
count = count + 1;`;
		const { allTokens } = parseAndCollect(src);
		const occurrences = findTokenOccurrences(allTokens, 'count', 0, 99);
		expect(occurrences.length).toBe(4);
	});

	test('respects line range bounds', () => {
		const src = `Integer x;
x = 1;
x = 2;
x = 3;`;
		const { allTokens } = parseAndCollect(src);
		// Only lines 1-2 (0-based)
		const occurrences = findTokenOccurrences(allTokens, 'x', 1, 2);
		expect(occurrences.length).toBe(2);
	});

	test('does not match inside string literals', () => {
		const src = `String s;
s = "hello";`;
		const { allTokens } = parseAndCollect(src);
		// "hello" is a single string token — its text includes quotes
		const occurrences = findTokenOccurrences(allTokens, 'hello', 0, 99);
		expect(occurrences.length).toBe(0);
	});
});

// ─── computeRenameEdits — local variables ────────────────────────────────────

describe('rename local variable', () => {
	test('renames local variable only within declaring function', () => {
		const src = `Integer x;

void foo() {
    Integer x;
    x = 1;
}

void bar() {
    x = 2;
}`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		// Cursor on the local `x` declaration inside foo() (line 3, char 12)
		const edits = computeRenameEdits({
			word: 'x',
			newName: 'renamed_x',
			position: { line: 3, character: 12 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		const lines = editRanges(edits).map(e => e.line);
		// Should only touch lines inside foo() (lines 3-5), not global x (0) or bar() x (8)
		expect(lines.every(l => l >= 2 && l <= 5)).toBe(true);
		expect(lines).not.toContain(0);
		expect(lines).not.toContain(8);
	});

	test('renames local variable declaration and all uses', () => {
		const src = `void compute() {
    Integer result;
    result = 10;
    result = result + 5;
}`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		const edits = computeRenameEdits({
			word: 'result',
			newName: 'total',
			position: { line: 1, character: 12 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		expect(edits.length).toBe(4); // declaration + 3 usages
		expect(edits.every(e => e.newText === 'total')).toBe(true);
	});
});

// ─── computeRenameEdits — parameters ─────────────────────────────────────────

describe('rename parameter', () => {
	test('renames parameter only within its function', () => {
		const src = `void foo(Integer val) {
    val = val + 1;
}

void bar(Integer val) {
    val = 0;
}`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		// Cursor on `val` inside foo (line 0, char 17)
		const edits = computeRenameEdits({
			word: 'val',
			newName: 'value',
			position: { line: 0, character: 17 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		// Should only include occurrences in foo (lines 0-2), not bar (lines 4-6)
		const lines = editRanges(edits).map(e => e.line);
		expect(lines.every(l => l <= 2)).toBe(true);
		expect(lines).not.toContain(5);
	});
});

// ─── computeRenameEdits — global variables ───────────────────────────────────

describe('rename global variable', () => {
	test('renames global variable across entire document', () => {
		const src = `Integer counter;

void increment() {
    counter = counter + 1;
}

void reset() {
    counter = 0;
}`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		const edits = computeRenameEdits({
			word: 'counter',
			newName: 'total',
			position: { line: 0, character: 8 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		// Should touch counter declaration (line 0) + usages in both functions
		const lines = editRanges(edits).map(e => e.line);
		expect(lines).toContain(0);
		expect(lines.some(l => l >= 2 && l <= 4)).toBe(true);
		expect(lines.some(l => l >= 6 && l <= 8)).toBe(true);
		expect(edits.length).toBe(4); // declaration + 2 in increment + 1 in reset
	});
});

// ─── computeRenameEdits — global functions ────────────────────────────────────

describe('rename global function', () => {
	test('renames function declaration and all call sites', () => {
		const src = `void compute(Integer a);

void compute(Integer a) {
    a = a + 1;
}

void run() {
    compute(5);
    compute(10);
}`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		// Cursor on `compute` in the declaration (line 0)
		const edits = computeRenameEdits({
			word: 'compute',
			newName: 'process',
			position: { line: 0, character: 5 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		const lines = editRanges(edits).map(e => e.line);
		expect(lines).toContain(0);  // forward declaration
		expect(lines).toContain(2);  // definition
		expect(lines.filter(l => l >= 7).length).toBe(2);  // 2 call sites
	});
});

// ─── computeRenameEdits — defines ────────────────────────────────────────────

describe('rename define', () => {
	test('renames define declaration and all usages', () => {
		const src = `#define MAX_SIZE 100

Integer arr;
void setup() {
    arr = MAX_SIZE;
}`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		const edits = computeRenameEdits({
			word: 'MAX_SIZE',
			newName: 'BUFFER_SIZE',
			position: { line: 0, character: 8 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		// Should include the #define declaration and the usage in setup()
		const lines = editRanges(edits).map(e => e.line);
		expect(lines).toContain(0);  // #define line
		expect(lines).toContain(4);  // usage in setup()
		expect(edits.length).toBe(2);
	});
});

// ─── computeRenameEdits — no-op cases ────────────────────────────────────────

describe('rename no-op cases', () => {
	test('returns empty array for unknown symbol', () => {
		const src = `Integer x;`;
		const { symbolTable, allTokens, docLastLine } = parseAndCollect(src);

		const edits = computeRenameEdits({
			word: 'unknown_symbol',
			newName: 'renamed',
			position: { line: 0, character: 0 },
			symbolTable,
			allTokens,
			docLastLine,
		});

		expect(edits.length).toBe(0);
	});
});
