import type { SymbolRange } from '../symbols.js';

/** Represents a `#define` macro found in a source or header file. */
export type DefineSymbolInfo = {
	name: string;
	params?: string[];
	value?: string;
	definedInFsPath: string;
	range?: SymbolRange;
};

const DEFINE_RE = /^\s*#\s*define\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s*\(([^)]*)\))?\s*(.*)?$/;

/**
 * Parses `#define` macros from raw file text.
 *
 * Supports object-like and function-like macros, and returns an identifier range for go-to-definition.
 */
export function parseDefinesFromText(text: string, definedInFsPath: string): DefineSymbolInfo[] {
	// Supports:
	//   #define NAME value
	//   #define NAME
	//   #define NAME(x, y) value
	const out: DefineSymbolInfo[] = [];
	const lines = text.split(/\r?\n/);

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];
		const m = DEFINE_RE.exec(line);
		if (!m) continue;

		const name = m[1];
		const rawParams = m[2];
		const value = (m[3] ?? '').trim();
		const params = typeof rawParams === 'string'
			? rawParams
				.split(',')
				.map((p) => p.trim())
				.filter(Boolean)
			: undefined;

		const nameStart = line.indexOf(name);
		const range: SymbolRange | undefined = nameStart >= 0
			? {
				start: { line: lineIndex, character: nameStart },
				end: { line: lineIndex, character: nameStart + name.length }
			}
			: undefined;

		out.push({
			name,
			params: params && params.length ? params : undefined,
			value: value.length ? value : undefined,
			definedInFsPath,
			range
		});
	}

	return out;
}
