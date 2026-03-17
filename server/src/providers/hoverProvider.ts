import type { Connection, HoverParams } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import type { SymbolResolver } from '../services/symbolResolver';
import type { PrototypeService } from '../services/prototypeService';
import { getWordAtPosition } from '../core/utils.js';

/** Registers hover support for prototypes, types, symbols (local + includes), and `#define` macros. */
export function registerHoverProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	symbolResolver: SymbolResolver;
	prototypeService: PrototypeService;
}): void {
	const { connection, documents, symbolResolver, prototypeService } = opts;

	connection.onHover(async (textDocumentPositionParams: HoverParams) => {
		try {
			const textDocument = documents.get(textDocumentPositionParams.textDocument.uri);
			if (!textDocument) return null;

			const word = getWordAtPosition(textDocument, textDocumentPositionParams.position);
			if (!word) return null;

			const symbol = await symbolResolver.resolve(
				textDocumentPositionParams.textDocument.uri,
				word,
				textDocumentPositionParams.position
			);
			if (!symbol) return null;

			switch (symbol.source) {
				case 'prototype': {
					// Use enriched documentation when available
					const proto = prototypeService.getPrototype(word);
					if (proto) {
						return {
							contents: {
								kind: 'markdown',
								value: prototypeService.generateDocumentation(proto)
							}
						};
					}
					return {
						contents: [
							{ language: '12dpl', value: symbol.prototypeSignature || word },
							symbol.prototypeDescription || 'No description available'
						]
					};
				}

				case 'type':
					return {
						contents: {
							kind: 'markdown',
							value: symbol.typeDoc || `**Type:** ${word}`
						}
					};

				case 'define': {
					const sig = symbol.defineParams?.length
						? `#define ${symbol.name}(${symbol.defineParams.join(', ')})${symbol.defineValue ? ` ${symbol.defineValue}` : ''}`
						: `#define ${symbol.name}${symbol.defineValue ? ` ${symbol.defineValue}` : ''}`;
					const definedIn = symbol.fsPath ? `\n\nDefined in: ${symbol.fsPath}` : '';
					return {
						contents: {
							kind: 'markdown',
							value: `**Preprocessor Macro**\n\n\`\`\`12dpl\n${sig}\n\`\`\`${definedIn}`
						}
					};
				}

				case 'document':
				case 'include': {
					const definedIn = symbol.source === 'include' && symbol.fsPath
						? `\n\nDefined in: ${symbol.fsPath}` : '';
					if (symbol.kind === 'function' && symbol.signature) {
						return {
							contents: {
								kind: 'markdown',
								value: `\n\n\`\`\`12dpl\n${symbol.signature}\n\`\`\`\n${definedIn}`
							}
						};
					}
					if (symbol.kind === 'variable') {
						const line = symbol.type ? `${symbol.type} ${word}` : word;
						return {
							contents: {
								kind: 'markdown',
								value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n${definedIn}`
							}
						};
					}
					break;
				}

				case 'keyword':
					return {
						contents: `**Keyword:** ${word}`
					};
			}

			return null;
		} catch (e) {
			connection.console.error(`Hover error: ${e}`);
			return null;
		}
	});
}
