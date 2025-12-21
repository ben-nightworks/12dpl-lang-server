import type { Position } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

export function getWordAtPosition(textDocument: TextDocument | undefined, position: Position): string | null {
	if (!textDocument) return null;

	const lineText = textDocument.getText().split('\n')[position.line];
	if (lineText == null) return null;

	let start = position.character;
	let end = position.character;

	while (start > 0 && /[a-zA-Z0-9_]/.test(lineText[start - 1])) {
		start--;
	}
	while (end < lineText.length && /[a-zA-Z0-9_]/.test(lineText[end])) {
		end++;
	}

	const word = lineText.substring(start, end);
	return word.length ? word : null;
}
