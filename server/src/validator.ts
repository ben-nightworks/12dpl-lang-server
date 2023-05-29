import {
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	CompletionItem,
	CompletionItemKind,
} from 'vscode-languageserver/node';

import { CharStream, CommonTokenStream }  from 'antlr4';
import proglang12dLexer from './antlr/proglang12dLexer';
import proglang12dParser from './antlr/proglang12dParser';


export class Validator {

	static Validate(documentText : string) : Diagnostic[]{	
		const diagnostics: Diagnostic[] = [];

		// const chars = new CharStream(documentText); // replace this with a FileStream as required
		// const lexer = new proglang12dLexer(chars);
		// const tokens = new CommonTokenStream(lexer);
		// const parser = new proglang12dParser(tokens);
		// const tree = parser.primaryExpression();

		return diagnostics;
	}

}
