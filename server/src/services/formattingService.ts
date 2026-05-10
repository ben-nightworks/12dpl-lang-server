import type { FormattingOptions } from 'vscode-languageserver/node';

export interface Format12dplOptions extends FormattingOptions {
	/** When true, blank lines keep their original whitespace rather than being stripped to empty. */
	preserveBlankLines?: boolean;
	/** Where to place opening braces. Default 'preserve' leaves them unchanged. */
	bracketStyle?: 'preserve' | 'same-line' | 'new-line';
	/** When > 0, lines longer than this are broken at the nearest safe point (comma, &&, ||). 0 = disabled. */
	maxLineLength?: number;
}

/** Counts how many times `charToCount` repeats from the start of `text`. */
function countLeadingChar(text: string, charToCount: string): number {
	let count = 0;
	for (const char of text) {
		if (char === charToCount) {
			count++;
		} else {
			break;
		}
	}
	return count;
}

function makeIndent(level: number, options: FormattingOptions): string {
	const safeLevel = Math.max(0, level);
	if (options.insertSpaces) {
		return ' '.repeat(options.tabSize * safeLevel);
	}
	return '\t'.repeat(safeLevel);
}

type ScanState = {
	inBlockComment: boolean;
	inString: boolean;
	stringQuote: '"' | "'" | null;
};

/** Scans a line for `{`/`}` while ignoring comments and strings. */
function scanBraces(line: string, state: ScanState): { opens: number; closes: number } {
	let opens = 0;
	let closes = 0;

	let i = 0;
	while (i < line.length) {
		const char = line[i];
		const next = i + 1 < line.length ? line[i + 1] : '';

		if (state.inBlockComment) {
			if (char === '*' && next === '/') {
				state.inBlockComment = false;
				i += 2;
				continue;
			}
			i++;
			continue;
		}

		if (state.inString) {
			if (char === '\\') {
				// skip escaped char
				i += 2;
				continue;
			}
			if (char === state.stringQuote) {
				state.inString = false;
				state.stringQuote = null;
				i++;
				continue;
			}
			i++;
			continue;
		}

		// line comment
		if (char === '/' && next === '/') {
			break;
		}

		// block comment start
		if (char === '/' && next === '*') {
			state.inBlockComment = true;
			i += 2;
			continue;
		}

		// string start
		if (char === '"' || char === "'") {
			state.inString = true;
			state.stringQuote = char as '"' | "'";
			i++;
			continue;
		}

		if (char === '{') {
			opens++;
		} else if (char === '}') {
			closes++;
		}

		i++;
	}

	return { opens, closes };
}

/**
 * K&R post-pass: if a line is only `{`, merge it (with ` {`) onto the previous
 * non-blank line, removing any blank lines that sit between them.
 */
function applyKnRStyle(lines: string[]): string[] {
	const result: string[] = [];
	for (const line of lines) {
		if (line.trim() === '{') {
			let prevIdx = result.length - 1;
			while (prevIdx >= 0 && result[prevIdx].trim() === '') {
				prevIdx--;
			}
			if (prevIdx >= 0) {
				// Remove any blank lines that were between prevIdx and here
				result.splice(prevIdx + 1);
				result[prevIdx] = result[prevIdx] + ' {';
				continue;
			}
		}
		result.push(line);
	}
	return result;
}

/**
 * Allman post-pass: if a line ends with an unquoted `{` that has real code before it,
 * split it so the `{` sits on its own line with the same indentation.
 * Respects strings, line comments, and block comments.
 */
function applyAllmanStyle(lines: string[]): string[] {
	const result: string[] = [];
	// Track block-comment state across lines using the existing ScanState machinery.
	const state: ScanState = { inBlockComment: false, inString: false, stringQuote: null };

	for (const line of lines) {
		const wasInBlockComment = state.inBlockComment;
		// Advance state but discard brace counts — we only need the block-comment update.
		scanBraces(line, state);

		if (wasInBlockComment) {
			result.push(line);
			continue;
		}

		// Find the last unquoted `{` in the code portion of this line.
		let inStr = false;
		let strQ: '"' | "'" | null = null;
		let lastCodeBraceIdx = -1;
		let codeEnd = line.length; // index where the "code" ends (before any line comment)
		let i = 0;

		while (i < line.length) {
			const ch = line[i];
			const next = i + 1 < line.length ? line[i + 1] : '';

			if (inStr) {
				if (ch === '\\') { i += 2; continue; }
				if (ch === strQ) { inStr = false; strQ = null; }
				i++;
				continue;
			}

			if (ch === '/' && next === '/') { codeEnd = i; break; }
			if (ch === '"' || ch === "'") { inStr = true; strQ = ch as '"' | "'"; i++; continue; }
			if (ch === '{') lastCodeBraceIdx = i;
			i++;
		}

		if (lastCodeBraceIdx < 0) {
			result.push(line);
			continue;
		}

		// Confirm the `{` is the last code token (nothing after it but whitespace / comment)
		const afterBrace = line.slice(lastCodeBraceIdx + 1, codeEnd).trim();
		const beforeBrace = line.slice(0, lastCodeBraceIdx).trim();

		if (afterBrace !== '' || beforeBrace === '' || line.trimStart().startsWith('#')) {
			result.push(line);
			continue;
		}

		// Split: content before brace, then brace on its own line with same indent.
		const indent = line.slice(0, line.length - line.trimStart().length);
		const before = line.slice(0, lastCodeBraceIdx).trimEnd();
		result.push(before);
		result.push(indent + '{');
	}

	return result;
}

/**
 * Wraps a single line that exceeds `maxLen` at the rightmost safe break point
 * before the limit (comma > logical operator). Returns one or more lines.
 * Recursively wraps the continuation if it is still too long.
 */
function wrapLine(line: string, maxLen: number, options: Format12dplOptions): string[] {
	if (line.length <= maxLen) return [line];

	const lineIndent = /^(\s*)/.exec(line)?.[1] ?? '';
	const contIndent = lineIndent + makeIndent(1, options);

	let bestBreak = -1;
	let inStr = false;
	let strQ: '"' | "'" | null = null;

	for (let i = 0; i < maxLen && i < line.length; i++) {
		const ch = line[i];
		const next = i + 1 < line.length ? line[i + 1] : '';

		if (inStr) {
			if (ch === '\\') { i++; continue; }
			if (ch === strQ) { inStr = false; strQ = null; }
			continue;
		}

		// Do not break inside or after line comments.
		if (ch === '/' && next === '/') break;

		if (ch === '"' || ch === "'") { inStr = true; strQ = ch as '"' | "'"; continue; }

		// Safe break positions (later position wins, giving rightmost break before limit).
		if (ch === ',') { bestBreak = i + 1; continue; }
		if (ch === '&' && next === '&') { bestBreak = i + 2; continue; }
		if (ch === '|' && next === '|') { bestBreak = i + 2; continue; }
	}

	if (bestBreak < 0 || bestBreak >= line.length - 1) {
		return [line]; // no safe break found before the limit
	}

	const before = line.slice(0, bestBreak);
	const remaining = contIndent + line.slice(bestBreak).trimStart();

	return [before, ...wrapLine(remaining, maxLen, options)];
}

/** Applies max-line-length wrapping to all lines; skips blank and preprocessor lines. */
function applyMaxLineLength(lines: string[], maxLen: number, options: Format12dplOptions): string[] {
	const result: string[] = [];
	for (const line of lines) {
		if (line.length <= maxLen || line.trim() === '' || line.trimStart().startsWith('#')) {
			result.push(line);
		} else {
			result.push(...wrapLine(line, maxLen, options));
		}
	}
	return result;
}

/**
 * Formats a full 12dPL document using simple brace-based indentation.
 *
 * Intended to be deterministic and safe (best-effort) rather than stylistically perfect.
 */
export function format12dplDocument(text: string, options: Format12dplOptions): string {
	// Preserve original newline style.
	const newline = text.includes('\r\n') ? '\r\n' : '\n';
	const lines = text.split(/\r?\n/);

	let indentLevel = 0;
	const state: ScanState = { inBlockComment: false, inString: false, stringQuote: null };

	const formatted: string[] = [];

	for (const originalLine of lines) {
		const trimmed = originalLine.trim();

		if (trimmed.length === 0) {
			formatted.push(options.preserveBlankLines ? originalLine : '');
			continue;
		}

		// Keep preprocessor-ish directives hard-left.
		if (trimmed.startsWith('#')) {
			formatted.push(trimmed);
			continue;
		}

		// Snapshot block-comment state before scanning — true if this line started
		// inside a /* ... */ block comment opened on a prior line.
		const wasInBlockComment = state.inBlockComment;

		// Compute indentation for the current line. Reduce indent for leading closing braces.
		const leadingCloseCount = countLeadingChar(trimmed, '}');
		let lineIndentLevel = indentLevel - leadingCloseCount;
		if (trimmed.startsWith('case ') || trimmed.startsWith('default:')) {
			lineIndentLevel = Math.max(0, lineIndentLevel - 1);
		}

		if (wasInBlockComment) {
			// Preserve original content — block comment interior lines are not reindented.
			formatted.push(originalLine);
		} else {
			formatted.push(`${makeIndent(lineIndentLevel, options)}${trimmed}`);
		}

		const { opens, closes } = scanBraces(originalLine, state);
		indentLevel += opens - closes;
		if (indentLevel < 0) {
			indentLevel = 0;
		}
	}

	// Apply brace-style post-pass if requested.
	const style = options.bracketStyle ?? 'preserve';
	let postFormatted: string[];
	if (style === 'same-line') {
		postFormatted = applyKnRStyle(formatted);
	} else if (style === 'new-line') {
		postFormatted = applyAllmanStyle(formatted);
	} else {
		postFormatted = formatted;
	}

	// Apply max line length wrapping if configured.
	const maxLen = options.maxLineLength ?? 0;
	if (maxLen > 0) {
		postFormatted = applyMaxLineLength(postFormatted, maxLen, options);
	}

	return postFormatted.join(newline);
}
