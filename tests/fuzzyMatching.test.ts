import { describe, expect, test } from 'bun:test';
import { fuzzyScore } from '../server/src/providers/utils.ts';

describe('fuzzyScore', () => {
	test('returns null for empty query', () => {
		expect(fuzzyScore('', 'include')).toBeNull();
		expect(fuzzyScore('   ', 'include')).toBeNull();
	});

	test('matches case-insensitively as a subsequence (not just prefix)', () => {
		expect(fuzzyScore('inc', 'include')).not.toBeNull();
		expect(fuzzyScore('Inc', 'include')).not.toBeNull();
		expect(fuzzyScore('mcr', 'MacroDefinition')).not.toBeNull();
	});

	test('returns null when query is not a subsequence', () => {
		expect(fuzzyScore('xyz', 'include')).toBeNull();
		expect(fuzzyScore('pii', 'PI')).toBeNull();
	});

	test('prefers tighter / more consecutive matches', () => {
		const a = fuzzyScore('inc', 'include')!;
		const b = fuzzyScore('inc', 'i_n_c')!;
		expect(a).toBeGreaterThan(b);
	});

	test('prefers word/camel boundaries', () => {
		const a = fuzzyScore('md', 'MacroDefinition')!;
		const b = fuzzyScore('md', 'mood')!;
		expect(a).toBeGreaterThan(b);
	});
});
