import type { FormattingOptions } from 'vscode-languageserver/node';

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

export function format12dplDocument(text: string, options: FormattingOptions): string {
	// Preserve original newline style.
	const newline = text.includes('\r\n') ? '\r\n' : '\n';
	const lines = text.split(/\r?\n/);

	let indentLevel = 0;
	const state: ScanState = { inBlockComment: false, inString: false, stringQuote: null };

	const formatted: string[] = [];

	for (const originalLine of lines) {
		const trimmed = originalLine.trim();

		if (trimmed.length === 0) {
			formatted.push('');
			continue;
		}

		// Keep preprocessor-ish directives hard-left.
		if (trimmed.startsWith('#')) {
			formatted.push(trimmed);
			continue;
		}

		// Compute indentation for the current line. Reduce indent for leading closing braces.
		const leadingCloseCount = countLeadingChar(trimmed, '}');
		let lineIndentLevel = indentLevel - leadingCloseCount;
		if (trimmed.startsWith('case ') || trimmed.startsWith('default:')) {
			lineIndentLevel = Math.max(0, lineIndentLevel - 1);
		}

		formatted.push(`${makeIndent(lineIndentLevel, options)}${trimmed}`);

		const { opens, closes } = scanBraces(originalLine, state);
		indentLevel += opens - closes;
		if (indentLevel < 0) {
			indentLevel = 0;
		}
	}

	return formatted.join(newline);
}
