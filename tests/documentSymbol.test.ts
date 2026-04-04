import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable } from '../server/src/core/symbolCollector';
import type { SymbolDeclaration, ScopeNode, SymbolRange } from '../server/src/core/types';
import { isGeneratedWrapperFunctionName } from '../server/src/core/symbolCollector';

// SymbolKind values matching vscode-languageserver
const SymbolKind = { Function: 12, Variable: 13, Constant: 14 } as const;

interface OutlineEntry {
	name: string;
	detail?: string;
	kind: number;
	startLine: number;
	startCharacter: number;
}

// Mirror the provider logic here for unit testing without an LSP connection
function getDocumentSymbols(text: string): OutlineEntry[] {
	const parseResult = parse(text);
	const symbolTable = collectSymbolTable(parseResult, text);
	const result: OutlineEntry[] = [];

	collectFunctionSymbols(symbolTable.root, result);

	for (const def of symbolTable.defines) {
		result.push(toOutlineEntry(def));
	}

	result.sort((a, b) => a.startLine - b.startLine || a.startCharacter - b.startCharacter);

	return result;
}

function collectFunctionSymbols(scope: ScopeNode, out: OutlineEntry[]): void {
	for (const decl of scope.declarations) {
		if (decl.kind === 'function' && !isGeneratedWrapperFunctionName(decl.name)) {
			out.push(toOutlineEntry(decl));
		}
	}
	for (const child of scope.children) {
		collectFunctionSymbols(child, out);
	}
}

function toOutlineEntry(decl: SymbolDeclaration): OutlineEntry {
	const kind = decl.kind === 'function' ? SymbolKind.Function
		: decl.kind === 'define' ? SymbolKind.Constant
		: SymbolKind.Variable;

	const detail = decl.kind === 'function' ? decl.signature
		: decl.kind === 'define' && decl.value ? decl.value
		: undefined;

	return {
		name: decl.name,
		detail,
		kind,
		startLine: decl.range.start.line,
		startCharacter: decl.range.start.character,
	};
}

describe('documentSymbol', () => {
	test('returns functions and defines', () => {
		const src = `
#define MAX_SIZE 100
#define SQUARE(x) ((x)*(x))

Integer count;

void foo(Integer a, Integer b) {
	Integer local;
}

void bar() {
}
`;
		const symbols = getDocumentSymbols(src);
		const names = symbols.map(s => s.name);

		expect(names).toContain('foo');
		expect(names).toContain('bar');
		expect(names).toContain('MAX_SIZE');
		expect(names).toContain('SQUARE');
	});

	test('does not include wrapper functions', () => {
		const src = `
Integer x;
x = 1;

void realFunction() {
}
`;
		const symbols = getDocumentSymbols(src);
		const names = symbols.map(s => s.name);

		expect(names).toContain('realFunction');
		// No wrapper function names should appear
		for (const name of names) {
			expect(name.startsWith('__12dpl__script__')).toBe(false);
		}
	});

	test('assigns correct symbol kinds', () => {
		const src = `
#define MY_CONST 42
void myFunc() {
}
`;
		const symbols = getDocumentSymbols(src);
		const constSym = symbols.find(s => s.name === 'MY_CONST');
		const funcSym = symbols.find(s => s.name === 'myFunc');

		expect(constSym?.kind).toBe(SymbolKind.Constant);
		expect(funcSym?.kind).toBe(SymbolKind.Function);
	});

	test('includes function signature as detail', () => {
		const src = `void foo(Integer a, Real &b) {}\n`;
		const symbols = getDocumentSymbols(src);
		const fooSym = symbols.find(s => s.name === 'foo');

		expect(fooSym?.detail).toBe('void foo(Integer a, Real &b)');
	});

	test('includes define value as detail', () => {
		const src = `#define PI 3.14159\n`;
		const symbols = getDocumentSymbols(src);
		const piSym = symbols.find(s => s.name === 'PI');

		expect(piSym?.detail).toBe('3.14159');
	});

	test('results are sorted by position', () => {
		const src = `
void second() {}
#define FIRST 1
void third() {}
`;
		const symbols = getDocumentSymbols(src);

		for (let i = 1; i < symbols.length; i++) {
			expect(symbols[i - 1].startLine <= symbols[i].startLine).toBe(true);
		}
	});

	test('handles forward declarations', () => {
		const src = `
void forwardOnly();
void implemented() {}
`;
		const symbols = getDocumentSymbols(src);
		const names = symbols.map(s => s.name);

		expect(names).toContain('forwardOnly');
		expect(names).toContain('implemented');
	});
});
