import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import { RecognitionException, ErrorListener }  from 'antlr4';
import { checkDeprecatedFunctions } from './diagnosticHelper';
import { createLexerAndParser } from './parsePipeline';
import type { PrimaryExpressionContext, PostfixExpressionContext } from './src/proglang12dParser';

class DiagnosticErrorListener extends ErrorListener<any> {
	public diagnostics: Diagnostic[] = [];

	syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
		this.diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: line - 1, character: column },
				end: { line: line - 1, character: column + 1 }
			},
			message: `Error: ${msg}`
		});
	}
}

/** Known symbols from document and include files, passed in from the server. */
export interface KnownSymbols {
	/** Function names (lowercase) */
	functions: Set<string>;
	/** Variable names (lowercase) */
	variables: Set<string>;
	/** Define macro names (lowercase) */
	defines: Set<string>;
}

/** Information about a declared identifier. */
interface DeclaredSymbol {
	name: string;
	type?: string;
	line: number;
	column: number;
}

/** Information about an identifier usage that needs to be validated. */
interface IdentifierUsage {
	name: string;
	line: number;
	column: number;
	isAssignmentTarget: boolean;
	isFunctionCall: boolean;
}

/** Information about a switch/case type mismatch. */
interface SwitchCaseMismatch {
	caseLine: number;
	caseColumn: number;
	caseLength: number;
	switchType: string;
	caseType: string;
}

function safeTokenText(node: any): string | null {
	const text = node?.symbol?.text ?? node?.getText?.();
	return typeof text === 'string' ? text : null;
}

function safeTokenLine(node: any): number | null {
	const line = node?.symbol?.line;
	return typeof line === 'number' ? line : null;
}

function safeTokenColumn(node: any): number | null {
	const column = node?.symbol?.column;
	return typeof column === 'number' ? column : null;
}

/**
 * Performs semantic validation on a parsed AST to detect undeclared identifiers
 * and switch/case type mismatches.
 *
 * Returns diagnostics for identifiers used on the RHS that haven't been declared.
 * @param tree The parsed AST
 * @param knownSymbols Symbols from document/include files (functions, variables, defines)
 */
function validateUndeclaredIdentifiers(tree: any, knownSymbols: KnownSymbols): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const declaredSymbols = new Map<string, DeclaredSymbol>();
	const usages: IdentifierUsage[] = [];
	const switchCaseMismatches: SwitchCaseMismatch[] = [];

	// Track scope depth for future scoped validation (currently flat)
	let scopeDepth = 0;

	const getDeclarationTypeText = (ctx: any): string | undefined => {
		try {
			const declSpecs = ctx?.declarationSpecifiers?.();
			const text = declSpecs?.getText?.();
			return typeof text === 'string' && text.length ? text : undefined;
		} catch {
			return undefined;
		}
	};

	const extractIdentifierFromDeclarator = (ctx: any): { name: string; line: number; column: number } | null => {
		let cur: any = ctx;
		while (cur) {
			try {
				const direct = cur.directDeclarator?.();
				if (direct) {
					cur = direct;
					continue;
				}
			} catch {
				// ignore
			}
			try {
				const idNode = cur.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) {
					return { name: text, line, column };
				}
			} catch {
				// ignore
			}
			break;
		}
		return null;
	};

	// Helper to recursively find and validate case labels in a switch body
	const validateCaseLabelsInStatement = (stmt: any, switchType: string): void => {
		if (!stmt) return;
		
		try {
			// Check if this is a labeled statement with 'case'
			const labeledStmt = stmt?.labeledStatement?.();
			if (labeledStmt) {
				const caseToken = labeledStmt?.Case?.();
				if (caseToken) {
					const constExpr = labeledStmt?.constantExpression?.();
					if (constExpr) {
						const constText = constExpr?.getText?.();
						// Determine the case expression type
						let caseType: string | undefined;
						if (constText) {
							if (constText.startsWith('"') && constText.endsWith('"')) {
								caseType = 'Text';
							} else if (/^[0-9]+$/.test(constText) || /^0x[0-9a-fA-F]+$/.test(constText)) {
								caseType = 'Integer';
							} else if (/^[0-9]*\.[0-9]+$/.test(constText)) {
								caseType = 'Real';
							}
						}
						
						// Check for type mismatch
						if (caseType && switchType) {
							const isNumericSwitch = ['Integer', 'Real'].includes(switchType);
							const isNumericCase = ['Integer', 'Real'].includes(caseType);
							const isTextSwitch = switchType === 'Text';
							const isTextCase = caseType === 'Text';
							
							if ((isNumericSwitch && isTextCase) || (isTextSwitch && isNumericCase)) {
								// Type mismatch!
								const caseLine = safeTokenLine(caseToken);
								const caseColumn = safeTokenColumn(caseToken);
								const exprStart = constExpr?.start;
								const exprLine = exprStart?.line ?? caseLine;
								const exprColumn = exprStart?.column ?? (caseColumn ? caseColumn + 5 : 0);
								const exprLength = constText?.length ?? 1;
								
								if (exprLine !== null) {
									switchCaseMismatches.push({
										caseLine: exprLine,
										caseColumn: exprColumn ?? 0,
										caseLength: exprLength,
										switchType,
										caseType
									});
								}
							}
						}
					}
				}
				// Recurse into the labeled statement's statement
				validateCaseLabelsInStatement(labeledStmt?.statement?.(), switchType);
			}
			
			// Check compound statement (block with braces)
			const compoundStmt = stmt?.compoundStatement?.();
			if (compoundStmt) {
				const blockItems = compoundStmt?.blockItemList?.();
				if (blockItems) {
					for (const item of blockItems?.blockItem_list?.() ?? []) {
						const innerStmt = item?.statement?.();
						validateCaseLabelsInStatement(innerStmt, switchType);
					}
				}
			}
			
			// Check direct statement child
			const innerStatement = stmt?.statement?.();
			if (innerStatement) {
				validateCaseLabelsInStatement(innerStatement, switchType);
			}
		} catch {
			// ignore errors during traversal
		}
	};

	const visitor: any = {
		visitTerminal(_node: any) {
			return undefined;
		},
		visitErrorNode(_node: any) {
			return undefined;
		},
		visitChildren(ctx: any) {
			const children: any[] = ctx?.children ?? [];
			for (const child of children) {
				if (child && typeof child.accept === 'function') {
					child.accept(visitor);
				}
			}
			return undefined;
		},
		visitFunctionDefinition(ctx: any) {
			// Collect function name
			const decl = ctx?.declarator?.();
			const info = extractIdentifierFromDeclarator(decl);
			if (info) {
				declaredSymbols.set(info.name.toLowerCase(), info);
			}
			scopeDepth++;
			visitor.visitChildren(ctx);
			scopeDepth--;
			return undefined;
		},
		visitDeclaration(ctx: any) {
			// Collect declared variables with their types
			const declType = getDeclarationTypeText(ctx);
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) {
						declaredSymbols.set(info.name.toLowerCase(), { ...info, type: declType });
					}
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			// Collect for-loop declared variables with their types
			const declType = getDeclarationTypeText(ctx);
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) {
						declaredSymbols.set(info.name.toLowerCase(), { ...info, type: declType });
					}
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		},
		visitParameterDeclaration(ctx: any) {
			// Collect function parameter names
			try {
				const idNode = ctx?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) {
					declaredSymbols.set(text.toLowerCase(), { name: text, line, column });
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		},
		visitIdentifierList(ctx: any) {
			// Old-style K&R parameter identifiers
			try {
				for (const idNode of ctx?.Identifier_list?.() ?? []) {
					const text = safeTokenText(idNode);
					const line = safeTokenLine(idNode);
					const column = safeTokenColumn(idNode);
					if (text && line !== null && column !== null) {
						declaredSymbols.set(text.toLowerCase(), { name: text, line, column });
					}
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		},
		visitSelectionStatement(ctx: any) {
			// Check for switch/case type mismatches
			try {
				// Check if this is a switch statement (has Switch token)
				const switchToken = ctx?.Switch?.();
				if (!switchToken) {
					return visitor.visitChildren(ctx);
				}

				// Get the switch expression
				const switchExpr = ctx?.expression?.();
				if (!switchExpr) {
					return visitor.visitChildren(ctx);
				}

				// Try to determine the type of the switch expression
				// Look for an identifier in the expression
				let switchType: string | undefined;
				const exprText = switchExpr?.getText?.();
				if (exprText) {
					const symbol = declaredSymbols.get(exprText.toLowerCase());
					if (symbol?.type) {
						switchType = symbol.type;
					}
				}

				// If we determined a type, check all case labels in the switch body
				if (switchType) {
					// For switch, the body is statement(0) which is typically a compound statement
					const stmtList = ctx?.statement_list?.();
					if (stmtList && stmtList.length > 0) {
						validateCaseLabelsInStatement(stmtList[0], switchType);
					} else {
						const stmt = ctx?.statement?.(0);
						validateCaseLabelsInStatement(stmt, switchType);
					}
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		},
		visitPostfixExpression(ctx: PostfixExpressionContext | any) {
			// Check if this is a function call (primaryExpression followed by '(')
			try {
				const primary = ctx?.primaryExpression?.();
				const idNode = primary?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				
				// Check if there's a LeftParen following (function call)
				const leftParenTokens = ctx?.LeftParen_list?.();
				const isFunctionCall = leftParenTokens && leftParenTokens.length > 0;
				
				if (text && line !== null && column !== null) {
					usages.push({
						name: text,
						line,
						column,
						isAssignmentTarget: false,
						isFunctionCall: !!isFunctionCall
					});
				}
			} catch {
				// ignore
			}
			// Continue visiting children for nested expressions
			// But skip the primaryExpression since we handled it
			const children: any[] = ctx?.children ?? [];
			for (const child of children) {
				if (child && typeof child.accept === 'function') {
					// Skip the first child which is primaryExpression (already handled)
					const isPrimary = child.ruleIndex !== undefined && 
						child.constructor?.name === 'PrimaryExpressionContext';
					if (!isPrimary) {
						child.accept(visitor);
					}
				}
			}
			// Visit nested expressions in argument lists
			try {
				for (const argList of ctx?.argumentExpressionList_list?.() ?? []) {
					argList?.accept?.(visitor);
				}
			} catch {
				// ignore
			}
			return undefined;
		},
		visitPrimaryExpression(ctx: PrimaryExpressionContext | any) {
			// This catches identifiers not handled by postfixExpression visitor
			// (e.g., in parenthesized expressions)
			try {
				const idNode = ctx?.Identifier?.();
				const text = safeTokenText(idNode);
				const line = safeTokenLine(idNode);
				const column = safeTokenColumn(idNode);
				if (text && line !== null && column !== null) {
					usages.push({
						name: text,
						line,
						column,
						isAssignmentTarget: false,
						isFunctionCall: false
					});
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		}
	};

	try {
		tree.accept(visitor);
	} catch {
		// If traversal fails, return empty diagnostics
		return diagnostics;
	}

	// Now check usages against declarations
	for (const usage of usages) {
		const lowerName = usage.name.toLowerCase();
		
		// Skip symbols declared locally in this document (from AST traversal)
		if (declaredSymbols.has(lowerName)) {
			continue;
		}
		
		// Skip functions from document/include files or built-in prototypes
		if (usage.isFunctionCall && knownSymbols.functions.has(lowerName)) {
			continue;
		}
		
		// Skip variables from document/include files
		if (knownSymbols.variables.has(lowerName)) {
			continue;
		}
		
		// Skip #define macro identifiers from document/include files
		if (knownSymbols.defines.has(lowerName)) {
			continue;
		}
		
		// Skip function calls to known functions (built-in or from includes)
		if (usage.isFunctionCall) {
			// Function calls are allowed even if the function is only in prototypes
			// (validated elsewhere via completion/hover)
			continue;
		}
		
		// Identifier is not declared - emit diagnostic
		diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: usage.line - 1, character: usage.column },
				end: { line: usage.line - 1, character: usage.column + usage.name.length }
			},
			message: `'${usage.name}' is not declared`
		});
	}

	// Add switch/case type mismatch diagnostics
	for (const mismatch of switchCaseMismatches) {
		diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: mismatch.caseLine - 1, character: mismatch.caseColumn },
				end: { line: mismatch.caseLine - 1, character: mismatch.caseColumn + mismatch.caseLength }
			},
			message: `Case type mismatch: switch expression is '${mismatch.switchType}' but case value is '${mismatch.caseType}'`
		});
	}

	return diagnostics;
}

export class Validator {
	/**
	 * Parses the given document text and returns diagnostics for any syntax errors
	 * and semantic issues (like undeclared identifiers on the RHS).
	 *
	 * This is used for real-time validation (squiggles) in the editor.
	 * Note: This basic version doesn't check undeclared identifiers - use ValidateWithSymbols for that.
	 */
	static Validate(documentText: string): Diagnostic[] {
		// Call ValidateWithSymbols with empty known symbols
		// This means only syntax errors will be detected, not undeclared identifiers
		return Validator.ValidateWithSymbols(documentText, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set()
		});
	}

	/**
	 * Parses the given document text and returns diagnostics for any syntax errors
	 * and semantic issues (like undeclared identifiers), using provided known symbols.
	 *
	 * @param documentText The document text to validate
	 * @param knownSymbols Symbols from document, include files, and built-in prototypes
	 */
	static ValidateWithSymbols(documentText: string, knownSymbols: KnownSymbols): Diagnostic[] {
		const diagnostics: Diagnostic[] = [];

		try {
			const { lexer, parser } = createLexerAndParser(documentText);

			const errorListener = new DiagnosticErrorListener();
			lexer.removeErrorListeners();
			parser.removeErrorListeners();
			parser.addErrorListener(errorListener);

			const tree = parser.compilationUnit();
			diagnostics.push(...errorListener.diagnostics);

			// Check for deprecated functions
			const deprecationDiagnostics = checkDeprecatedFunctions(parser);
			diagnostics.push(...deprecationDiagnostics);
			
			// Collect syntax errors
			const syntaxDiagnostics = errorListener.diagnostics;
			diagnostics.push(...syntaxDiagnostics);
			
			// Only run semantic validation if there are no syntax errors
			// (semantic validation on a malformed AST can produce false positives)
			const semanticDiagnostics = validateUndeclaredIdentifiers(tree, knownSymbols);
			diagnostics.push(...semanticDiagnostics);
			
			return diagnostics;
		} catch (error: any) {
			// Catch any unexpected errors during parsing
			console.error('Validation error:', error);
			// Return the actual error message instead of generic message
			diagnostics.push({
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line: 0, character: 0 },
					end: { line: 0, character: 1 }
				},
				message: error?.message || 'Parser error occurred'
			});
			return diagnostics;
		}
	}

}
