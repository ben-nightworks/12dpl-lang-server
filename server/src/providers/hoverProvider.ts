import type { Connection } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { prototypesLoader } from '../prototypes.js';
import { typeDocumentation } from '../documentation.js';
import type { DocumentSymbolStore } from './documentSymbols.js';
import { getWordAtPosition } from './utils.js';

export function registerHoverProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentSymbols: DocumentSymbolStore;
}): void {
	const { connection, documents, documentSymbols } = opts;

	connection.onHover((textDocumentPositionParams) => {
		try {
			const textDocument = documents.get(textDocumentPositionParams.textDocument.uri);
			if (!textDocument) return null;

			const word = getWordAtPosition(textDocument, textDocumentPositionParams.position);
			if (!word) return null;

			// Check if it's a prototype
			const prototype = prototypesLoader.getPrototype(word);
			if (prototype) {
				const signature = prototypesLoader.getPrototypeSignature(word);
				return {
					contents: [
						{ language: '12dpl', value: signature || word },
						prototype.description || 'No description available'
					]
				};
			}

			// Check if it's a documented type
			if (typeDocumentation[word]) {
				return {
					contents: {
						kind: 'markdown',
						value: typeDocumentation[word]
					}
				};
			}

			// Check if it's a document symbol (variable/function)
			const docSymbol = documentSymbols.getSymbolInfo(textDocument.uri, word);
			if (docSymbol) {
				if (docSymbol.kind === 'function' && docSymbol.signature) {
					return {
						contents: {
							kind: 'markdown',
							value: `\n\n\`\`\`12dpl\n${docSymbol.signature}\n\`\`\`\n`
						}
					};
				}
				if (docSymbol.kind === 'variable') {
					const line = docSymbol.type ? `${docSymbol.type} ${word}` : word;
					return {
						contents: {
							kind: 'markdown',
							value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n`
						}
					};
				}
			}

			// Check if it's a keyword
			const keywords = ['if', 'else', 'while', 'for', 'return', 'void', 'int', 'double'];
			if (keywords.includes(word.toLowerCase())) {
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
