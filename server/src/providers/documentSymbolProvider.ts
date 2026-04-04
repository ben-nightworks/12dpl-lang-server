import type { Connection } from 'vscode-languageserver/node';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentSymbol, SymbolKind, Range } from 'vscode-languageserver/node';

import type { DocumentService } from '../services/documentService';
import type { SymbolDeclaration, ScopeNode, SymbolRange } from '../core/types';
import { isGeneratedWrapperFunctionName } from '../core/symbolCollector';

/** Registers textDocument/documentSymbol support (VS Code outline view). */
export function registerDocumentSymbolProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentService: DocumentService;
}): void {
	const { connection, documents, documentService } = opts;

	connection.onDocumentSymbol((params) => {
		const doc = documents.get(params.textDocument.uri);
		if (!doc) return null;

		const symbolTable = documentService.getSymbolTable(params.textDocument.uri);
		if (!symbolTable) return null;

		const result: DocumentSymbol[] = [];

		// Collect functions from the scope tree
		collectFunctionSymbols(symbolTable.root, result);

		// Collect #define macros
		for (const def of symbolTable.defines) {
			result.push(toDocumentSymbol(def));
		}

		// Sort by start position
		result.sort((a, b) => a.range.start.line - b.range.start.line
			|| a.range.start.character - b.range.start.character);

		return result;
	});
}

/** Walks the scope tree top-down, collecting user-defined functions. */
function collectFunctionSymbols(scope: ScopeNode, out: DocumentSymbol[]): void {
	for (const decl of scope.declarations) {
		if (decl.kind === 'function' && !isGeneratedWrapperFunctionName(decl.name)) {
			out.push(toDocumentSymbol(decl));
		}
	}
	for (const child of scope.children) {
		collectFunctionSymbols(child, out);
	}
}

function toDocumentSymbol(decl: SymbolDeclaration): DocumentSymbol {
	const kind = decl.kind === 'function' ? SymbolKind.Function
		: decl.kind === 'define' ? SymbolKind.Constant
		: SymbolKind.Variable;

	const detail = decl.kind === 'function' ? decl.signature
		: decl.kind === 'define' && decl.value ? decl.value
		: undefined;

	const range = toRange(decl.range);

	return DocumentSymbol.create(
		decl.name,
		detail,
		kind,
		range,
		range, // selectionRange = same as range for identifier
	);
}

function toRange(r: SymbolRange): Range {
	return Range.create(r.start.line, r.start.character, r.end.line, r.end.character);
}
