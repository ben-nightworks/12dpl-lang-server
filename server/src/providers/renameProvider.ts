/**
 * Rename provider — implements LSP textDocument/rename and textDocument/prepareRename.
 *
 * Supports renaming of:
 *   - Local variables and parameters (scoped to the enclosing function)
 *   - Global variables and functions (document-wide)
 *   - #define macros (document-wide, including the declaration line)
 *
 * Renaming built-in prototypes, types, keywords, or symbols from include files
 * is intentionally rejected.
 */

import type { Connection } from 'vscode-languageserver/node';
import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import { WorkspaceEdit, TextEdit, Range, ResponseError, ErrorCodes } from 'vscode-languageserver/node';

import { getWordAtPosition } from '../core/utils.js';
import type { SymbolResolver } from '../services/symbolResolver.js';
import type { DocumentService } from '../services/documentService.js';
import type { SymbolTable } from '../core/types.js';
import {
	findDeclaringScope,
	scopeChainAt,
	isGeneratedWrapperFunctionName,
} from '../core/symbolCollector.js';

// ─── Token scanning ─────────────────────────────────────────────────────────

/**
 * Scans the ANTLR token stream for all occurrences of `name` within the given
 * 0-based line range. Comments and whitespace are already absent because they
 * use `-> skip` in the grammar. String literal tokens include their surrounding
 * quotes, so they cannot match a bare identifier name.
 *
 * Exported for testing.
 */
export function findTokenOccurrences(
	tokens: any[],
	name: string,
	startLine: number,   // 0-based inclusive
	endLine: number      // 0-based inclusive
): Array<{ line: number; character: number }> {
	const result: Array<{ line: number; character: number }> = [];
	for (const token of tokens) {
		if (!token || token.text !== name) continue;
		const tokenLine = token.line - 1;   // ANTLR is 1-based; LSP is 0-based
		if (tokenLine < startLine || tokenLine > endLine) continue;
		result.push({ line: tokenLine, character: token.column });
	}
	return result;
}

// ─── Core rename logic ───────────────────────────────────────────────────────

/**
 * Computes the list of text edits needed to rename `word` to `newName`.
 *
 * - Locals and parameters are scoped to the enclosing function.
 * - Globals, exported functions, and defines are document-wide.
 * - Define declarations (which are lexer-skipped) are included explicitly.
 *
 * Exported for testing.
 */
export function computeRenameEdits(opts: {
	word: string;
	newName: string;
	position: { line: number; character: number };
	symbolTable: SymbolTable;
	allTokens: any[];
	docLastLine: number;
}): TextEdit[] {
	const { word, newName, position, symbolTable, allTokens, docLastLine } = opts;

	const found = findDeclaringScope(symbolTable.root, position, word);
	const isDefine = !found && symbolTable.defines.some(d => d.name === word);

	if (!found && !isDefine) return [];

	// ── Determine search range ───────────────────────────────────────────────

	let searchStartLine = 0;
	let searchEndLine = docLastLine;

	if (found) {
		const { scope, declaration } = found;

		const declaredInWrapperOrGlobal =
			scope.kind === 'global' ||
			(scope.kind === 'function' && !!scope.name && isGeneratedWrapperFunctionName(scope.name));

		const isLocalOrParam =
			declaration.kind === 'parameter' ||
			(declaration.kind === 'variable' && !declaredInWrapperOrGlobal);

		if (isLocalOrParam) {
			// Restrict to the innermost enclosing real (non-wrapper) function.
			const chain = scopeChainAt(symbolTable.root, position);
			const funcScope = [...chain].reverse().find(
				s => s.kind === 'function' && !!s.name && !isGeneratedWrapperFunctionName(s.name)
			);
			if (funcScope) {
				searchStartLine = funcScope.range.start.line;
				searchEndLine = funcScope.range.end.line;
			}
		}
	}

	// ── Collect edits ────────────────────────────────────────────────────────

	const edits: TextEdit[] = [];

	// Token-based occurrences (all in-code usages, excluding skipped tokens).
	const occurrences = findTokenOccurrences(allTokens, word, searchStartLine, searchEndLine);
	for (const { line, character } of occurrences) {
		edits.push(TextEdit.replace(
			Range.create(line, character, line, character + word.length),
			newName
		));
	}

	// For defines, the #define declaration line is lexer-skipped and absent from
	// the token stream. Add the declaration range explicitly.
	if (isDefine) {
		for (const def of symbolTable.defines) {
			if (def.name === word) {
				const { start, end } = def.range;
				edits.push(TextEdit.replace(
					Range.create(start.line, start.character, end.line, end.character),
					newName
				));
			}
		}
	}

	return edits;
}

// ─── Provider registration ──────────────────────────────────────────────────

export function registerRenameProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentService: DocumentService;
	symbolResolver: SymbolResolver;
}): void {
	const { connection, documents, documentService, symbolResolver } = opts;

	// ── prepareRename ────────────────────────────────────────────────────────
	// Validates that the cursor is on a renameable symbol and returns the word
	// range and current name so VS Code can prefill the rename input box.

	connection.onPrepareRename(async (params) => {
		const doc = documents.get(params.textDocument.uri);
		if (!doc) return null;

		const word = getWordAtPosition(doc, params.position);
		if (!word) return null;

		const resolved = await symbolResolver.resolve(
			params.textDocument.uri,
			word,
			params.position
		);

		// Only allow renaming symbols owned by this document; reject
		// prototypes, built-in types, keywords, and symbols from include files.
		if (!resolved || (resolved.source !== 'document' && resolved.source !== 'define')) {
			return new ResponseError(ErrorCodes.InvalidRequest, 'Symbol cannot be renamed');
		}

		// Return the range of the word under the cursor.
		const lineText = doc.getText().split('\n')[params.position.line] ?? '';
		let start = params.position.character;
		let end = params.position.character;
		while (start > 0 && /[a-zA-Z0-9_]/.test(lineText[start - 1])) start--;
		while (end < lineText.length && /[a-zA-Z0-9_]/.test(lineText[end])) end++;

		return {
			range: Range.create(params.position.line, start, params.position.line, end),
			placeholder: word,
		};
	});

	// ── rename ───────────────────────────────────────────────────────────────

	connection.onRenameRequest(async (params) => {
		const doc = documents.get(params.textDocument.uri);
		if (!doc) return null;

		const word = getWordAtPosition(doc, params.position);
		if (!word) return null;

		const newName = params.newName.trim();
		if (!newName || newName === word) return null;

		const symbolTable = documentService.getSymbolTable(params.textDocument.uri);
		if (!symbolTable) return null;

		const parseResult = documentService.getParseResult(params.textDocument.uri);
		if (!parseResult) return null;

		const allTokens: any[] = (parseResult.tokens as any).tokens ?? [];
		const docLastLine = doc.lineCount - 1;

		const edits = computeRenameEdits({
			word,
			newName,
			position: params.position,
			symbolTable,
			allTokens,
			docLastLine,
		});

		if (edits.length === 0) return null;

		return {
			changes: { [params.textDocument.uri]: edits },
		} satisfies WorkspaceEdit;
	});
}
