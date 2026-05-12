import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable } from '../server/src/core/symbolCollector';
import type { SymbolDeclaration } from '../server/src/core/types';
import {
	collectMacroSemanticHighlightTokens,
	encodeMacroSemanticHighlightTokens,
	scanIdentifiersOutsideCommentsAndStrings,
} from '../server/src/providers/semanticHighlightProvider';

function getLocalDefines(text: string): SymbolDeclaration[] {
	const parseResult = parse(text);
	return collectSymbolTable(parseResult, text).defines;
}

function includeDefine(name: string): SymbolDeclaration {
	return {
		name,
		kind: 'define',
		range: {
			start: { line: 0, character: 0 },
			end: { line: 0, character: name.length },
		},
		definedInFsPath: 'included.h',
	};
}

function tokenTexts(text: string, tokens: ReturnType<typeof collectMacroSemanticHighlightTokens>): string[] {
	const lines = text.split(/\r?\n/);
	return tokens.map(token => lines[token.line].slice(token.character, token.character + token.length));
}

describe('semantic macro highlights', () => {
	test('highlights local macro definitions and references', () => {
		const src = `#define LOCAL_LIMIT 12
void main(){
	Integer a = LOCAL_LIMIT;
}
`;

		const tokens = collectMacroSemanticHighlightTokens(src, getLocalDefines(src));
		expect(tokenTexts(src, tokens).filter(text => text === 'LOCAL_LIMIT')).toHaveLength(2);
	});

	test('highlights function-like macro definitions and references', () => {
		const src = `#define ScaleValue(x) ((x) * 2)
void main(){
	Integer y = ScaleValue(3);
}
`;

		const tokens = collectMacroSemanticHighlightTokens(src, getLocalDefines(src));
		expect(tokenTexts(src, tokens).filter(text => text === 'ScaleValue')).toHaveLength(2);
	});

	test('does not highlight arbitrary all-caps identifiers', () => {
		const src = `void main(){
	Integer NOT_A_MACRO = 5;
}
`;

		const tokens = collectMacroSemanticHighlightTokens(src, getLocalDefines(src));
		expect(tokenTexts(src, tokens)).not.toContain('NOT_A_MACRO');
		expect(tokens).toHaveLength(0);
	});

	test('highlights references to included macros', () => {
		const src = `void main(){
	Integer x = INCLUDED_MACRO;
}
`;

		const tokens = collectMacroSemanticHighlightTokens(src, getLocalDefines(src), [includeDefine('INCLUDED_MACRO')]);
		expect(tokenTexts(src, tokens)).toEqual(['INCLUDED_MACRO']);
	});

	test('skips macro-looking identifiers in comments and strings', () => {
		const src = `#define LOCAL_LIMIT 12
void main(){
	Text s = "LOCAL_LIMIT";
	// LOCAL_LIMIT
	/* LOCAL_LIMIT */
	Integer a = LOCAL_LIMIT;
}
`;

		const tokens = collectMacroSemanticHighlightTokens(src, getLocalDefines(src));
		expect(tokenTexts(src, tokens).filter(text => text === 'LOCAL_LIMIT')).toHaveLength(2);
	});

	test('scanner skips comments and strings', () => {
		const src = `KEEP "SKIP_STRING" // SKIP_COMMENT
/* SKIP_BLOCK */
KEEP_TOO`;

		const identifiers = scanIdentifiersOutsideCommentsAndStrings(src).map(identifier => identifier.name);
		expect(identifiers).toEqual(['KEEP', 'KEEP_TOO']);
	});

	test('encodes macro highlights as LSP token deltas', () => {
		const encoded = encodeMacroSemanticHighlightTokens([
			{ line: 0, character: 8, length: 5 },
			{ line: 2, character: 1, length: 5 },
		]);

		expect(encoded.data).toEqual([
			0, 8, 5, 0, 0,
			2, 1, 5, 0, 0,
		]);
	});
});
