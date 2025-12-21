import type {
	CompletionItem,
	Connection,
	TextDocumentPositionParams
} from 'vscode-languageserver/node';
import { CompletionItemKind } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import { prototypesLoader } from '../prototypes.js';
import { typeDocumentation } from '../documentation.js';
import type { DocumentSymbolStore } from './documentSymbols.js';

export function registerCompletionProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentSymbols: DocumentSymbolStore;
}): void {
	const { connection, documentSymbols } = opts;

	connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		const symbolItems = documentSymbols.getCompletionItems(textDocumentPosition.textDocument.uri);

		// Get completions from loaded prototypes
		const prototypeItems = prototypesLoader.getCompletionItems();

		// Combine with keyword completions
		const keywordItems: CompletionItem[] = [
			{ label: 'if', kind: CompletionItemKind.Keyword, detail: 'Conditional statement', data: 1 },
			{ label: 'else', kind: CompletionItemKind.Keyword, detail: 'Else clause', data: 2 },
			{ label: 'while', kind: CompletionItemKind.Keyword, detail: 'While loop', data: 3 },
			{ label: 'for', kind: CompletionItemKind.Keyword, detail: 'For loop', data: 4 },
			{ label: 'return', kind: CompletionItemKind.Keyword, detail: 'Return statement', data: 5 },
			{ label: 'void', kind: CompletionItemKind.Keyword, detail: 'Void return type', data: 6 },
			{ label: 'int', kind: CompletionItemKind.Keyword, detail: 'Integer type', data: 7 },
			{ label: 'double', kind: CompletionItemKind.Keyword, detail: 'Double type', data: 8 }
		];

		// Add type completions
		const typeItems: CompletionItem[] = Object.keys(typeDocumentation).map((type) => ({
			label: type,
			kind: CompletionItemKind.Class,
			detail: '12dPL Type',
			data: type
		}));

		// De-dupe by label while preserving priority (document symbols first).
		const seen = new Set<string>();
		const out: CompletionItem[] = [];
		for (const item of [...symbolItems, ...keywordItems, ...typeItems, ...prototypeItems]) {
			const key = item.label;
			if (seen.has(key)) continue;
			seen.add(key);
			out.push(item);
		}
		return out;
	});

	connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
		// Document symbols (from ANTLR) carry their own signature/type.
		const data: any = (item as any).data;
		if (data && typeof data === 'object' && data.source === 'document') {
			if (data.kind === 'function' && typeof data.signature === 'string' && data.signature.length) {
				item.documentation = {
					kind: 'markdown',
					value: `\n\n\`\`\`12dpl\n${data.signature}\n\`\`\`\n`
				};
				return item;
			}
			if (data.kind === 'variable') {
				const line = typeof data.type === 'string' && data.type.length ? `${data.type} ${item.label}` : `${item.label}`;
				item.documentation = {
					kind: 'markdown',
					value: `\n\n\`\`\`12dpl\n${line}\n\`\`\`\n`
				};
				return item;
			}
		}

		// Try to get documentation from prototypes
		const prototype = prototypesLoader.getPrototype(item.label);
		if (prototype) {
			item.documentation = {
				kind: 'markdown',
				value: prototypesLoader.generateDocumentation(prototype)
			};
			return item;
		}

		// Check if it's a documented type
		if (typeDocumentation[item.label]) {
			item.documentation = {
				kind: 'markdown',
				value: typeDocumentation[item.label]
			};
			return item;
		}

		// Fallback for keywords
		const keywordDocs: Record<string, string> = {
			if: '**Conditional Statement**\n\nExecute code block if condition is true.\n\n```12dpl\nif (condition) { ... }\n```',
			else: '**Else Clause**\n\nExecute code block if if condition is false.\n\n```12dpl\nelse { ... }\n```',
			while: '**While Loop**\n\nRepeatedly execute code while condition is true.\n\n```12dpl\nwhile (condition) { ... }\n```',
			for: '**For Loop**\n\nLoop with init, condition, and increment.\n\n```12dpl\nfor (init; condition; increment) { ... }\n```',
			return: '**Return Statement**\n\nReturn a value from function.\n\n```12dpl\nreturn value;\n```',
			void: '**Void Type**\n\nNo return value',
			int: '**Integer Type**\n\nWhole number',
			double: '**Double Type**\n\nFloating-point number'
		};

		const keywordDoc = keywordDocs[item.label.toLowerCase()];
		if (keywordDoc) {
			item.documentation = {
				kind: 'markdown',
				value: keywordDoc
			};
		}

		return item;
	});
}
