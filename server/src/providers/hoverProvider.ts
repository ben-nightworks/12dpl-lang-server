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
					const overloads = prototypeService.getPrototypes(word);
					if (overloads.length > 0) {
						return {
							contents: {
								kind: 'markdown',
								value: prototypeService.generateOverloadDocumentation(overloads)
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
						// Also show prototype overloads if they exist
						const overloads = prototypeService.getPrototypes(word);
						if (overloads.length > 0) {
							const localSig = symbol.signature;
							const overloadSigs = overloads.map(f => {
								const params = f.parameters.map(p => `${p.type} ${p.name}`).join(', ');
								return `${f.returnType} ${f.name}(${params})`;
							}).filter(sig => sig !== localSig);
							const allSigs = [localSig, ...overloadSigs].join('\n');
							const totalCount = 1 + overloadSigs.length;
							const desc = overloads.find(f => f.description)?.description || '';
							return {
								contents: {
									kind: 'markdown',
									value: `\`\`\`12dpl\n${allSigs}\n\`\`\`\n${definedIn}${desc ? `\n\n${desc}` : ''}${totalCount > 1 ? `\n\n**${totalCount} overloads**` : ''}`
								}
							};
						}
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
