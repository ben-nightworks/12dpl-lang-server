import type { Position } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import type { ParameterSymbolInfo } from '../symbols.js';

export function getWordAtPosition(textDocument: TextDocument | undefined, position: Position): string | null {
	if (!textDocument) return null;

	const lineText = textDocument.getText().split('\n')[position.line];
	if (lineText == null) return null;

	let start = position.character;
	let end = position.character;

	while (start > 0 && /[a-zA-Z0-9_]/.test(lineText[start - 1])) {
		start--;
	}
	while (end < lineText.length && /[a-zA-Z0-9_]/.test(lineText[end])) {
		end++;
	}

	const word = lineText.substring(start, end);
	return word.length ? word : null;
}

export function escapeSnippetText(text: string): string {
	// VS Code snippet escaping: $ and } must be escaped.
	// Also escape backslashes defensively.
	return text.replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/\}/g, '\\}');
}

export function buildFunctionCallSnippet(functionName: string, params: ParameterSymbolInfo[] | undefined): string {
	const placeholders: string[] = [];
	const p = params ?? [];

	for (let i = 0; i < p.length; i++) {
		const param = p[i];
		const ref = param.byRef ? '&' : '';
		const arr = param.isArray ? '[]' : '';
		const label = (param.type && param.name)
			? `${param.type} ${ref}${param.name}${arr}`
			: (param.type ? `${param.type}${arr}` : (param.name ? `${ref}${param.name}${arr}` : ''));
		if (!label.length) continue;
		placeholders.push(`\${${i + 1}:${escapeSnippetText(label)}}`);
	}

	if (!placeholders.length) return `${functionName}()$0`;
	return `${functionName}(${placeholders.join(', ')})$0`;
}

export function fuzzyScore(query: string, candidate: string): number | null {
	// IntelliSense-style fuzzy score:
	// - query must be a subsequence of candidate
	// - bonuses for:
	//   - consecutive matches
	//   - start-of-string
	//   - word boundaries / separators
	//   - camelCase boundaries
	//   - exact-case matches
	// - penalties for gaps between matched characters
	const qRaw = query.trim();
	if (!qRaw.length) return null;
	const q = qRaw.toLowerCase();
	const c = candidate;
	const cLower = candidate.toLowerCase();

	let qi = 0;
	let score = 0;
	let firstMatch = -1;
	let lastMatch = -1;
	let consecutive = 0;

	const isSeparator = (ch: string): boolean => /[\s_\-./\\#]/.test(ch);
	const isUpper = (ch: string): boolean => ch >= 'A' && ch <= 'Z';
	const isLower = (ch: string): boolean => ch >= 'a' && ch <= 'z';
	const isDigit = (ch: string): boolean => ch >= '0' && ch <= '9';
	const isAlphaNum = (ch: string): boolean => isLower(ch) || isUpper(ch) || isDigit(ch);

	const isWordStart = (index: number): boolean => {
		if (index <= 0) return true;
		const prev = c[index - 1];
		const cur = c[index];
		if (isSeparator(prev) && isAlphaNum(cur)) return true;
		// camelCase / PascalCase boundary: aB
		if (isLower(prev) && isUpper(cur)) return true;
		return false;
	};

	for (let i = 0; i < cLower.length && qi < q.length; i++) {
		if (cLower[i] !== q[qi]) {
			continue;
		}

		// Gap penalty
		if (lastMatch >= 0) {
			const gap = i - lastMatch - 1;
			if (gap > 0) score -= gap; // small penalty per skipped char
		}
		if (firstMatch < 0) firstMatch = i;

		// Base match points
		score += 10;

		// Bonuses
		if (i === 0) score += 30;
		if (isWordStart(i)) score += 20;
		if (lastMatch === i - 1) {
			consecutive++;
			score += 15 + consecutive * 5;
		} else {
			consecutive = 0;
		}
		if (c[i] === qRaw[qi]) score += 5; // exact-case bonus

		lastMatch = i;
		qi++;
	}

	if (qi < q.length) return null;

	// Prefer tighter matches overall using the match span (how "compact" the match is)
	// rather than penalizing long identifiers globally.
	if (firstMatch >= 0 && lastMatch >= firstMatch) {
		const span = lastMatch - firstMatch + 1;
		const spanGaps = Math.max(0, span - q.length);
		score -= Math.min(30, spanGaps);
	}

	// Small global penalty for very long candidates (kept small so boundaries can still win).
	const globalPenalty = Math.max(0, c.length - q.length);
	score -= Math.min(10, Math.floor(globalPenalty / 4));

	return score;
}
