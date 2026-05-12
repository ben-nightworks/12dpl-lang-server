import { SemanticTokensBuilder } from 'vscode-languageserver/node';
import type {
	Connection,
	SemanticTokens,
	SemanticTokensLegend,
	SemanticTokensParams,
	TextDocuments,
} from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import type { IncludeService } from '../services/includeService';
import type { DocumentService } from '../services/documentService';
import type { SymbolDeclaration, SymbolRange } from '../core/types';

const MACRO_TOKEN_TYPE_INDEX = 0;
const NO_TOKEN_MODIFIERS = 0;

export const semanticHighlightLegend: SemanticTokensLegend = {
	tokenTypes: ['macro'],
	tokenModifiers: [],
};

export interface MacroSemanticHighlightToken {
	line: number;
	character: number;
	length: number;
}

interface IdentifierOccurrence {
	name: string;
	line: number;
	character: number;
	length: number;
}

/** Registers full-document semantic highlighting for known preprocessor macros. */
export function registerSemanticHighlightProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentService: DocumentService;
	includeService: IncludeService;
}): void {
	const { connection, documents, documentService, includeService } = opts;

	connection.languages.semanticTokens.on(async (params: SemanticTokensParams): Promise<SemanticTokens> => {
		const doc = documents.get(params.textDocument.uri);
		if (!doc) return { data: [] };

		const symbolTable = documentService.getSymbolTable(params.textDocument.uri);
		const localDefines = symbolTable?.defines ?? [];
		const includeDefines = await includeService.getIncludeDefines(params.textDocument.uri);

		const tokens = collectMacroSemanticHighlightTokens(doc.getText(), localDefines, includeDefines);
		return encodeMacroSemanticHighlightTokens(tokens);
	});
}

/** Collects macro definition and reference highlight tokens from one document. */
export function collectMacroSemanticHighlightTokens(
	text: string,
	localDefines: readonly SymbolDeclaration[],
	includeDefines: readonly SymbolDeclaration[] = []
): MacroSemanticHighlightToken[] {
	const knownMacroNames = new Set<string>();
	for (const def of localDefines) {
		if (def.kind === 'define') knownMacroNames.add(def.name);
	}
	for (const def of includeDefines) {
		if (def.kind === 'define') knownMacroNames.add(def.name);
	}

	const tokens: MacroSemanticHighlightToken[] = [];
	const occupiedRanges = new Set<string>();

	for (const def of localDefines) {
		if (def.kind !== 'define') continue;
		addToken(tokens, occupiedRanges, tokenFromRange(def.range));
	}

	if (knownMacroNames.size === 0) return tokens;

	for (const ident of scanIdentifiersOutsideCommentsAndStrings(text)) {
		if (!knownMacroNames.has(ident.name)) continue;
		addToken(tokens, occupiedRanges, {
			line: ident.line,
			character: ident.character,
			length: ident.length,
		});
	}

	return sortTokens(tokens);
}

/** Encodes absolute-position macro highlight tokens into the LSP delta payload format. */
export function encodeMacroSemanticHighlightTokens(tokens: readonly MacroSemanticHighlightToken[]): SemanticTokens {
	const builder = new SemanticTokensBuilder();
	for (const token of sortTokens(tokens)) {
		builder.push(
			token.line,
			token.character,
			token.length,
			MACRO_TOKEN_TYPE_INDEX,
			NO_TOKEN_MODIFIERS
		);
	}
	return builder.build();
}

/** Scans identifiers while skipping line comments, block comments, and strings. */
export function scanIdentifiersOutsideCommentsAndStrings(text: string): IdentifierOccurrence[] {
	const result: IdentifierOccurrence[] = [];
	let line = 0;
	let character = 0;
	let i = 0;
	let inLineComment = false;
	let inBlockComment = false;
	let inString = false;
	let stringQuote = '';

	const advance = () => {
		const ch = text[i++];
		if (ch === '\n') {
			line++;
			character = 0;
			inLineComment = false;
		} else {
			character++;
		}
		return ch;
	};

	while (i < text.length) {
		const ch = text[i];
		const next = text[i + 1] ?? '';

		if (inLineComment) {
			advance();
			continue;
		}

		if (inBlockComment) {
			if (ch === '*' && next === '/') {
				advance();
				advance();
				inBlockComment = false;
			} else {
				advance();
			}
			continue;
		}

		if (inString) {
			if (ch === '\\') {
				advance();
				if (i < text.length) advance();
				continue;
			}
			if (ch === stringQuote) {
				advance();
				inString = false;
				stringQuote = '';
				continue;
			}
			advance();
			continue;
		}

		if (ch === '/' && next === '/') {
			advance();
			advance();
			inLineComment = true;
			continue;
		}

		if (ch === '/' && next === '*') {
			advance();
			advance();
			inBlockComment = true;
			continue;
		}

		if (ch === '"' || ch === "'") {
			stringQuote = ch;
			inString = true;
			advance();
			continue;
		}

		if (isIdentifierStart(ch)) {
			const startLine = line;
			const startCharacter = character;
			const startIndex = i;
			advance();
			while (i < text.length && isIdentifierPart(text[i])) {
				advance();
			}
			const name = text.slice(startIndex, i);
			result.push({
				name,
				line: startLine,
				character: startCharacter,
				length: character - startCharacter,
			});
			continue;
		}

		advance();
	}

	return result;
}

function tokenFromRange(range: SymbolRange): MacroSemanticHighlightToken | null {
	const length = range.end.character - range.start.character;
	if (length <= 0) return null;
	return {
		line: range.start.line,
		character: range.start.character,
		length,
	};
}

function addToken(
	tokens: MacroSemanticHighlightToken[],
	occupiedRanges: Set<string>,
	token: MacroSemanticHighlightToken | null
): void {
	if (!token || token.length <= 0) return;
	const key = rangeKey(token);
	if (occupiedRanges.has(key)) return;
	if (tokens.some(existing => rangesOverlap(existing, token))) return;
	occupiedRanges.add(key);
	tokens.push(token);
}

function rangesOverlap(a: MacroSemanticHighlightToken, b: MacroSemanticHighlightToken): boolean {
	if (a.line !== b.line) return false;
	const aEnd = a.character + a.length;
	const bEnd = b.character + b.length;
	return a.character < bEnd && b.character < aEnd;
}

function rangeKey(token: MacroSemanticHighlightToken): string {
	return `${token.line}:${token.character}:${token.length}`;
}

function sortTokens(tokens: readonly MacroSemanticHighlightToken[]): MacroSemanticHighlightToken[] {
	return [...tokens].sort((a, b) => a.line - b.line || a.character - b.character || a.length - b.length);
}

function isIdentifierStart(ch: string | undefined): boolean {
	return !!ch && /[A-Za-z_]/.test(ch);
}

function isIdentifierPart(ch: string | undefined): boolean {
	return !!ch && /[A-Za-z0-9_]/.test(ch);
}
