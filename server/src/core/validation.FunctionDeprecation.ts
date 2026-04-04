/**
 * Deprecated function calls validation — detects usage of deprecated functions.
 */

import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import type { ParseResult } from './types';

const DEPRECATED_FUNCTIONS: Record<string, { message: string }> = {
	'Time': {
		message: 'Time() function is deprecated. Time is now a type. Use the Get_time() function with the Time type instead.'
	}
};

/**
 * Scans the token stream for deprecated function calls.
 * Token-based: works even when there are syntax errors.
 */
export function validateDeprecatedCalls(result: ParseResult): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];

	try {
		const tokens = result.tokens;
		const allTokens = (tokens as any).tokens || [];

		for (let i = 0; i < allTokens.length - 1; i++) {
			const token = allTokens[i];
			const nextToken = allTokens[i + 1];
			if (!token || !nextToken) continue;

			if (token.text === 'Time' && nextToken.text === '(') {
				const line = token.line - 1;
				const column = token.column;
				diagnostics.push({
					severity: DiagnosticSeverity.Warning,
					range: {
						start: { line, character: column },
						end: { line, character: column + 4 }
					},
					message: DEPRECATED_FUNCTIONS['Time'].message,
					source: '12dPL'
				});
			}
		}
	} catch { /* ignore */ }

	return diagnostics;
}
