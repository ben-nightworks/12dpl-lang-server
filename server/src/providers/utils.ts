import type { Position } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import type { ParameterSymbolInfo } from '../symbols.js';

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

export function escapeSnippetText(text: string): string {
	// VS Code snippet escaping: $ and } must be escaped.
	// Also escape backslashes defensively.
	return text.replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/\}/g, '\\}');
}

export function buildFunctionCallSnippet(functionName: string, params: ParameterSymbolInfo[] | undefined): string {
	const placeholders: string[] = [];
	const p = params ?? [];

	for (let i = 0; i < p.length; i++) {
		const param = p[i];
		const ref = param.byRef ? '&' : '';
		const arr = param.isArray ? '[]' : '';
		const label = (param.type && param.name)
			? `${param.type} ${ref}${param.name}${arr}`
			: (param.type ? `${param.type}${arr}` : (param.name ? `${ref}${param.name}${arr}` : ''));
		if (!label.length) continue;
		placeholders.push(`\${${i + 1}:${escapeSnippetText(label)}}`);
	}

	if (!placeholders.length) return `${functionName}()$0`;
	return `${functionName}(${placeholders.join(', ')})$0`;
}
