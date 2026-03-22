/**
 * Core parse pipeline — preprocesses raw source text and produces a ParseResult.
 *
 * Wraps the existing ANTLR pipeline functions into a single `parse()` entry point.
 * No LSP or I/O dependencies.
 */

import { CharStream, CommonTokenStream } from 'antlr4';
import type { ErrorListener, RecognitionException } from 'antlr4';
import proglang12dLexer from '../antlr/src/proglang12dLexer';
import proglang12dParser from '../antlr/src/proglang12dParser';
import type { ParseResult, SyntaxError } from './types';
import { typeKeywords } from './typeKeywords';

/**
 * Removes conditional/preprocessor directive lines before parsing.
 *
 * Keeps line numbers stable by replacing stripped lines with empty lines.
 */
export function stripConditionalDirectives(documentText: string): { text: string; conditionalLines: Set<number> } {
	const lines = documentText.split(/\r?\n/);
	const out: string[] = [];
	let inDirectiveContinuation = false;

	// Stack tracks nested #if blocks.
	// Each entry: 'if0' = inside #if 0 dead code, 'if-true' = in kept first branch, 'else' = in stripped #else/#elif branch
	const ifStack: ('if0' | 'if-true' | 'else')[] = [];

	/** 1-based line numbers inside conditional #if blocks (kept first branch). */
	const conditionalLines = new Set<number>();
	let lineNumber = 0;

	/** Returns true if any entry in the stack means we should strip content. */
	const shouldStripContent = () => ifStack.some(s => s === 'if0' || s === 'else');

	/** Returns true if we are currently inside any conditional #if block (kept branch). */
	const isInsideConditionalBlock = () => ifStack.some(s => s === 'if-true');

	for (const line of lines) {
		const trimmed = line.trimStart();
		lineNumber++;

		// Handle multi-line directive continuations (trailing backslash)
		if (inDirectiveContinuation) {
			out.push('');
			inDirectiveContinuation = /\\\s*$/.test(line);
			continue;
		}

		// Check for preprocessor directive lines
		if (trimmed.startsWith('#')) {
			const directiveMatch = trimmed.match(/^#\s*(if|ifdef|ifndef|else|elif|endif)\b(.*)/);
			if (directiveMatch) {
				const directive = directiveMatch[1];
				const rest = directiveMatch[2]?.trim() ?? '';
				if (directive === 'if' || directive === 'ifdef' || directive === 'ifndef') {
					if (directive === 'if' && /^0\b/.test(rest)) {
						ifStack.push('if0');
					} else if (shouldStripContent()) {
						// Nested #if inside already-stripped block — stays stripped
						ifStack.push('if0');
					} else {
						ifStack.push('if-true');
					}
				} else if (directive === 'else' || directive === 'elif') {
					if (ifStack.length > 0) {
						const top = ifStack[ifStack.length - 1];
						if (top === 'if0') {
							// #else/#elif after #if 0 — content becomes live
							ifStack[ifStack.length - 1] = 'if-true';
						} else if (top === 'if-true') {
							// #else/#elif after the kept first branch — strip this branch
							ifStack[ifStack.length - 1] = 'else';
						}
						// If top === 'else', stay in 'else' (chained #elif after #else)
					}
				} else if (directive === 'endif') {
					if (ifStack.length > 0) {
						ifStack.pop();
					}
				}
			}
			out.push('');
			inDirectiveContinuation = /\\\s*$/.test(line);
			continue;
		}

		// Inside stripped block — strip content
		if (shouldStripContent()) {
			out.push('');
			continue;
		}

		// Track lines inside conditional blocks
		if (isInsideConditionalBlock()) {
			conditionalLines.add(lineNumber);
		}

		out.push(line);
	}
	return { text: out.join('\n'), conditionalLines };
}

/**
 * Wraps top-level blocks/statements in implicit functions so they parse under the compilationUnit grammar.
 *
 * Inserts tokens without adding newlines to preserve line mapping.
 */
export function wrapTopLevelScriptsPreservingLines(documentText: string): string {
	const text = documentText;
	const insertions = new Map<number, string>();

	let braceDepth = 0;
	let parenDepth = 0;
	let bracketDepth = 0;
	let inLineComment = false;
	let inBlockComment = false;
	let inString = false;
	let stringQuote: string | null = null;
	let inScriptWrapper = false;
	let scriptIndex = 0;
	let awaitingFunctionBody = false;

	const isLineStart = (i: number) => i === 0 || text[i - 1] === '\n' || text[i - 1] === '\r';
	const isIdentChar = (ch: string) => /[A-Za-z0-9_]/.test(ch);
	const skipWhitespace = (i: number) => {
		while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;
		return i;
	};

	const tryMatchFunctionSignatureAt = (i: number): boolean => {
		let j = skipWhitespace(i);
		const kwStart = j;
		while (j < text.length && isIdentChar(text[j])) j++;
		if (j === kwStart) return false;
		const kw = text.slice(kwStart, j);
		if (!typeKeywords.has(kw)) return false;
		j = skipWhitespace(j);
		if (!/[A-Za-z_0-9]/.test(text[j] || '')) return false;
		j++;
		while (j < text.length && isIdentChar(text[j])) j++;
		j = skipWhitespace(j);
		return text[j] === '(';
	};

	const lineHasRealCode = (i: number): boolean => {
		let j = skipWhitespace(i);
		const ch = text[j] || '';
		const next = text[j + 1] || '';
		if (!ch) return false;
		if (ch === '#') return false;
		if (ch === '/' && (next === '/' || next === '*')) return false;
		if (ch === '\r' || ch === '\n') return false;
		return true;
	};

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		const next = text[i + 1] || '';

		if (ch === '\n') {
			inLineComment = false;
			continue;
		}
		if (inLineComment) continue;
		if (inBlockComment) {
			if (ch === '*' && next === '/') {
				inBlockComment = false;
				i++;
			}
			continue;
		}
		if (inString) {
			if (ch === '\\') {
				i++;
				continue;
			}
			if (ch === stringQuote) {
				inString = false;
				stringQuote = null;
			}
			continue;
		}

		if (ch === '/' && next === '/') {
			inLineComment = true;
			i++;
			continue;
		}
		if (ch === '/' && next === '*') {
			inBlockComment = true;
			i++;
			continue;
		}
		if (ch === '"' || ch === '\'') {
			inString = true;
			stringQuote = ch;
			continue;
		}

		if (ch === '{') {
			if (braceDepth === 0 && parenDepth === 0 && bracketDepth === 0 && awaitingFunctionBody) {
				awaitingFunctionBody = false;
				braceDepth++;
				continue;
			}

			if (
				braceDepth === 0 &&
				parenDepth === 0 &&
				bracketDepth === 0 &&
				isLineStart(i) &&
				!tryMatchFunctionSignatureAt(i) &&
				lineHasRealCode(i) &&
				!inScriptWrapper
			) {
				const header = `void __12dpl__script__${scriptIndex++}(){`;
				insertions.set(i, (insertions.get(i) || '') + header);
				inScriptWrapper = true;
			}

			braceDepth++;
			continue;
		}
		if (ch === '}') {
			braceDepth = Math.max(0, braceDepth - 1);
			continue;
		}
		if (ch === ';' && braceDepth === 0 && parenDepth === 0 && bracketDepth === 0 && awaitingFunctionBody) {
			awaitingFunctionBody = false;
			continue;
		}
		if (ch === '(') {
			parenDepth++;
			continue;
		}
		if (ch === ')') {
			parenDepth = Math.max(0, parenDepth - 1);
			continue;
		}
		if (ch === '[') {
			bracketDepth++;
			continue;
		}
		if (ch === ']') {
			bracketDepth = Math.max(0, bracketDepth - 1);
			continue;
		}

		if (braceDepth !== 0 || parenDepth !== 0 || bracketDepth !== 0) {
			continue;
		}

		if (!isLineStart(i)) {
			continue;
		}

		if (tryMatchFunctionSignatureAt(i)) {
			if (inScriptWrapper) {
				insertions.set(i, (insertions.get(i) || '') + '}');
				inScriptWrapper = false;
			}
			awaitingFunctionBody = true;
			continue;
		}

		if (!lineHasRealCode(i)) {
			continue;
		}

		if (awaitingFunctionBody) {
			continue;
		}

		if (!inScriptWrapper) {
			const header = `void __12dpl__script__${scriptIndex++}(){`;
			insertions.set(i, (insertions.get(i) || '') + header);
			inScriptWrapper = true;
		}
	}

	if (inScriptWrapper) {
		insertions.set(text.length, (insertions.get(text.length) || '') + '}');
	}

	if (insertions.size === 0) {
		return text;
	}

	const insertionPoints = Array.from(insertions.keys()).sort((a, b) => a - b);
	let out = '';
	let last = 0;
	for (const p of insertionPoints) {
		out += text.slice(last, p) + (insertions.get(p) || '');
		last = p;
	}
	out += text.slice(last);
	return out;
}

class SyntaxErrorListener implements ErrorListener<any> {
	public errors: SyntaxError[] = [];

	syntaxError(
		_recognizer: any,
		_offendingSymbol: any,
		line: number,
		column: number,
		msg: string,
		_e: RecognitionException | undefined
	): void {
		this.errors.push({ line, column, message: msg });
	}

	// Required by ANTLR's ProxyErrorListener during ambiguity resolution
	reportAmbiguity(): void { /* no-op */ }
	reportAttemptingFullContext(): void { /* no-op */ }
	reportContextSensitivity(): void { /* no-op */ }
}

/**
 * Parses a raw 12dPL document into a `ParseResult`.
 *
 * Performs preprocessing (strip conditionals, wrap scripts) then ANTLR lexing/parsing.
 * The returned result is the single artifact all downstream consumers share.
 */
export function parse(documentText: string): ParseResult {
	const { text: strippedText, conditionalLines } = stripConditionalDirectives(documentText);
	const transformedText = wrapTopLevelScriptsPreservingLines(strippedText);

	const chars = new CharStream(transformedText);
	const lexer = new proglang12dLexer(chars);
	const tokens = new CommonTokenStream(lexer);
	const parser = new proglang12dParser(tokens);
	(parser as any).buildParseTrees = true;

	const errorListener = new SyntaxErrorListener();
	lexer.removeErrorListeners();
	parser.removeErrorListeners();
	parser.addErrorListener(errorListener);

	const tree = parser.compilationUnit();

	return {
		tree,
		tokens,
		transformedText,
		conditionalLines,
		syntaxErrors: errorListener.errors,
	};
}
