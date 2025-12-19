import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import { CharStream, CommonTokenStream, RecognitionException, ErrorListener }  from 'antlr4';
import proglang12dLexer from './antlr/proglang12dLexer';
import proglang12dParser from './antlr/proglang12dParser';

class DiagnosticErrorListener extends ErrorListener<any> {
	public diagnostics: Diagnostic[] = [];

	syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
		this.diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: line - 1, character: column },
				end: { line: line - 1, character: column + 1 }
			},
			message: `Syntax Error: ${msg}`
		});
	}
}

export class Validator {

	private static stripConditionalDirectives(documentText: string): string {
		// The lexer has rules to skip some preprocessor directives, but real-world
		// headers include macros containing '#'/'##' which can defeat simplistic lexer
		// skipping and leak tokens into the parser.
		//
		// For validation, we treat ALL preprocessor directive lines as non-code,
		// including multi-line continuations with a trailing '\\'. We preserve
		// line numbers by replacing stripped lines with empty lines.
		const lines = documentText.split(/\r?\n/);
		const out: string[] = [];
		let inDirectiveContinuation = false;
		for (const line of lines) {
			if (!inDirectiveContinuation && /^\s*#/.test(line)) {
				out.push('');
				inDirectiveContinuation = /\\\s*$/.test(line);
				continue;
			}
			if (inDirectiveContinuation) {
				out.push('');
				inDirectiveContinuation = /\\\s*$/.test(line);
				continue;
			}
			out.push(line);
		}
		return out.join('\n');
	}

	private static wrapTopLevelScriptsPreservingLines(documentText: string): string {
		// Wrap any top-level “script” segments (blocks/statements outside functions)
		// in implicit functions so the compilationUnit grammar can parse them.
		//
		// We only *insert* tokens (no newlines) to keep line numbers stable.
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

		const typeKeywords = [
			'void', 'Text', 'Integer', 'Real',
			'Element', 'Model', 'Tin', 'Dynamic_Element', 'Dynamic_Integer', 'Dynamic_Real', 'Dynamic_Text'
		];

		const tryMatchFunctionSignatureAt = (i: number): boolean => {
			let j = skipWhitespace(i);
			for (const kw of typeKeywords) {
				if (text.startsWith(kw, j) && !isIdentChar(text[j + kw.length] || '')) {
					j += kw.length;
					j = skipWhitespace(j);
					if (!/[A-Za-z_]/.test(text[j] || '')) return false;
					j++;
					while (j < text.length && isIdentChar(text[j])) j++;
					j = skipWhitespace(j);
					return text[j] === '(';
				}
			}
			return false;
		};

		const lineHasRealCode = (i: number): boolean => {
			let j = skipWhitespace(i);
			const ch = text[j] || '';
			const next = text[j + 1] || '';
			if (!ch) return false;
			// Preprocessor-like directives (e.g. #define/#include) are handled by the lexer
			// and should not trigger implicit script wrapping.
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

			// Track brace depth to know when we're at the top-level.
			if (ch === '{') {
				// If we recently saw a function signature at top-level, this '{' is the function body.
				if (braceDepth === 0 && parenDepth === 0 && bracketDepth === 0 && awaitingFunctionBody) {
					awaitingFunctionBody = false;
					braceDepth++;
					continue;
				}

				// If this is a top-level block at the start of a line, open a wrapper *before*
				// consuming the '{' so the wrapper encloses the block.
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
				// Likely a prototype declaration ended; no body is coming.
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

			// At top-level line start: decide whether to open/close a wrapper.
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

	static Validate(documentText: string): Diagnostic[] {
		const diagnostics: Diagnostic[] = [];

		try {
			const cleanedText = Validator.stripConditionalDirectives(documentText);
			const transformedText = Validator.wrapTopLevelScriptsPreservingLines(cleanedText);

			const chars = new CharStream(transformedText);
			const lexer = new proglang12dLexer(chars);
			const tokens = new CommonTokenStream(lexer);
			const parser = new proglang12dParser(tokens);

			const errorListener = new DiagnosticErrorListener();
			lexer.removeErrorListeners();
			parser.removeErrorListeners();
			parser.addErrorListener(errorListener);

			parser.compilationUnit();
			return errorListener.diagnostics;
		} catch (error: any) {
			// Catch any unexpected errors during parsing
			console.error('Validation error:', error);
			// Return the actual error message instead of generic message
			diagnostics.push({
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line: 0, character: 0 },
					end: { line: 0, character: 1 }
				},
				message: error?.message || 'Parser error occurred'
			});
			return diagnostics;
		}
	}

}
