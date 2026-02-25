import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import proglang12dParser, {
	PostfixExpressionContext,
} from './src/proglang12dParser.js';

/**
 * Configuration for deprecated functions.
 * Maps function name to deprecation details.
 */
const DEPRECATED_FUNCTIONS: Record<string, { message: string }> = {
	'Time': {
		message: 'Time() function is deprecated. Time is now a type. Use the Get_time() function with the Time type instead.'
	}
};

/**
 * Scan token stream for deprecated function calls.
 * This is used because deprecated functions like Time() now appear as keywords/types,
 * making them syntactically invalid and not appearing as proper function calls in the AST.
 */
function checkTokensForDeprecatedCalls(parser: proglang12dParser, diagnostics: Diagnostic[]): void {
	const tokens = (parser as any).getInputStream();
	if (!tokens) return;

	const allTokens = tokens.tokens || [];
	
	for (let i = 0; i < allTokens.length - 1; i++) {
		const token = allTokens[i];
		const nextToken = allTokens[i + 1];
		
		if (!token || !nextToken) continue;
		
		// Check if this token is 'Time' and the next is '('
		if (token.text === 'Time' && nextToken.text === '(') {
			// Found Time() pattern
			const line = token.line - 1; // ANTLR uses 1-indexed lines, LSP uses 0-indexed
			const column = token.column;
			
			diagnostics.push({
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line, character: column },
					end: { line, character: column + 4 }
				},
				message: DEPRECATED_FUNCTIONS['Time'].message,
				source: '12dPL'
			});
		}
	}
}

/**
 * Recursively walk the AST and check for deprecated function calls.
 */
function walkAndCheckTree(node: any, diagnostics: Diagnostic[]): void {
	if (!node) return;

	// Check if this is a PostfixExpressionContext
	if (node instanceof PostfixExpressionContext) {
		checkPostfixExpression(node, diagnostics);
	}

	// Recursively visit children
	if (typeof node.getChildCount === 'function') {
		const childCount = node.getChildCount();
		for (let i = 0; i < childCount; i++) {
			const child = node.getChild(i);
			walkAndCheckTree(child, diagnostics);
		}
	}
}

/**
 * Check a postfix expression for deprecated function calls.
 */
function checkPostfixExpression(ctx: PostfixExpressionContext, diagnostics: Diagnostic[]): void {
	try {
		// Check if this is a function call
		const isFunctionCall = isFunctionCallExpression(ctx);
		if (!isFunctionCall) return;

		// Extract the function name
		const functionName = extractFunctionName(ctx);
		if (!functionName) return;

		console.log(`Found function call: ${functionName}`);

		// Check if deprecated
		const deprecationInfo = DEPRECATED_FUNCTIONS[functionName];
		if (!deprecationInfo) return;

		// Get position
		const position = getIdentifierPosition(ctx);
		if (!position) return;

		console.log(`Found deprecated function: ${functionName} at line ${position.line}`);

		diagnostics.push({
			severity: DiagnosticSeverity.Warning,
			range: {
				start: { line: position.line, character: position.column },
				end: { line: position.line, character: position.column + functionName.length }
			},
			message: deprecationInfo.message,
			code: 'deprecated-function',
			source: '12dPL'
		});
	} catch (error) {
		console.error('Error checking postfix expression:', error);
	}
}

/**
 * Check if a postfix expression is a function call.
 */
function isFunctionCallExpression(ctx: PostfixExpressionContext): boolean {
	try {
		const childCount = ctx.getChildCount();
		if (childCount <= 1) return false;

		// Look for '(' in the children
		for (let i = 1; i < childCount; i++) {
			const child = ctx.getChild(i);
			if (child?.getText?.() === '(') {
				return true;
			}
		}
		return false;
	} catch {
		return false;
	}
}

/**
 * Extract function name from a postfix expression.
 */
function extractFunctionName(ctx: PostfixExpressionContext): string | null {
	try {
		const primaryExpr = ctx.primaryExpression?.();
		if (!primaryExpr) return null;

		const identifier = primaryExpr.Identifier?.();
		if (!identifier?.symbol) return null;

		const functionName = identifier.symbol.text;
		return typeof functionName === 'string' ? functionName : null;
	} catch {
		return null;
	}
}

/**
 * Get the position of an identifier.
 */
function getIdentifierPosition(ctx: PostfixExpressionContext): { line: number; column: number } | null {
	try {
		const identifier = ctx.primaryExpression?.().Identifier?.();
		if (!identifier?.symbol) return null;

		const line = identifier.symbol.line;
		const column = identifier.symbol.column;
		if (typeof line !== 'number' || typeof column !== 'number') return null;

		// ANTLR uses 1-indexed lines, LSP uses 0-indexed
		return { line: line - 1, column };
	} catch {
		return null;
	}
}

/**
 * Scan the AST for deprecated function calls and return diagnostics.
 * 
 * @param parser The ANTLR parser with a parsed compilation unit
 * @returns Array of diagnostics for deprecated function usage
 */
export function checkDeprecatedFunctions(parser: proglang12dParser): Diagnostic[] {
	try {
		const diagnostics: Diagnostic[] = [];
		
		// First check tokens for deprecated function calls like Time()
		// This works even when the AST is incomplete due to parse errors
		checkTokensForDeprecatedCalls(parser, diagnostics);
		
		const compilationUnit = parser.compilationUnit();
		walkAndCheckTree(compilationUnit, diagnostics);
		
		return diagnostics;
	} catch (error) {
		console.error('Error checking deprecated functions:', error);
		return [];
	}
}

