import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import { RecognitionException, ErrorListener }  from 'antlr4';

import { createLexerAndParser } from './parsePipeline';

class DiagnosticErrorListener extends ErrorListener<any> {
	public diagnostics: Diagnostic[] = [];

	syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
		this.diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: line - 1, character: column },
				end: { line: line - 1, character: column + 1 }
			},
			message: `Error: ${msg}`
		});
	}
}

export class Validator {
	/**
	 * Parses the given document text and returns diagnostics for any syntax errors.
	 *
	 * This is used for real-time validation (squiggles) in the editor.
	 */
	static Validate(documentText: string): Diagnostic[] {
		const diagnostics: Diagnostic[] = [];

		try {
			const { lexer, parser } = createLexerAndParser(documentText);

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
