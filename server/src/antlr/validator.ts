import {
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

import { RecognitionException, ErrorListener }  from 'antlr4';

import { createLexerAndParser } from './parsePipeline';

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

/** Information about a declared variable for re-declaration detection. */
interface DeclaredVariable {
	name: string;
	line: number;
	column: number;
	scopeDepth: number;
}

/** Information about a variable declared in an include file. */
export interface IncludeFileVariable {
	name: string;
	sourceFile: string;
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
 * Validates for variable re-declarations within the same scope.
 * @param tree The parse tree to validate
 * @param includeFileVariables Variables declared in include files (optional)
 */
function validateRedeclarations(tree: any, includeFileVariables?: IncludeFileVariable[]): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	
	// Map of variable name (lowercase) -> source file for variables from include files
	const includeVars = new Map<string, string>();
	if (includeFileVariables) {
		for (const v of includeFileVariables) {
			includeVars.set(v.name.toLowerCase(), v.sourceFile);
		}
	}
	
	// Map of scope ID -> Map of variable name -> declaration info
	// Scope ID is a string like "0" for global, "0.1" for first function, etc.
	const scopeVariables = new Map<string, Map<string, DeclaredVariable>>();
	
	let scopeDepth = 0;
	let scopeCounter = 0;
	const scopeStack: string[] = ['global'];
	
	const getCurrentScopeId = () => scopeStack[scopeStack.length - 1];
	
	const enterScope = () => {
		scopeDepth++;
		scopeCounter++;
		const newScopeId = `${getCurrentScopeId()}.${scopeCounter}`;
		scopeStack.push(newScopeId);
		scopeVariables.set(newScopeId, new Map());
	};
	
	const exitScope = () => {
		scopeStack.pop();
		scopeDepth--;
	};
	
	// Initialize global scope
	scopeVariables.set('global', new Map());

	/**
	 * Checks if a declarator is a function prototype (has parentheses for parameters).
	 * Function prototypes like `Time test();` should not be treated as variable declarations.
	 */
	const isFunctionPrototype = (ctx: any): boolean => {
		try {
			// Check if the declarator has parentheses - indicating a function prototype
			// A function prototype has the form: directDeclarator '(' ... ')'
			const direct = ctx?.directDeclarator?.();
			if (direct) {
				// Check if this directDeclarator has a '(' token, indicating function params
				const lparen = direct?.LeftParen?.() ?? direct?.getToken?.(0);
				// If we have a nested directDeclarator with parentheses, it's a function
				const innerDirect = direct?.directDeclarator?.();
				if (innerDirect) {
					// This is pattern: directDeclarator '(' ... ')'
					// Check for parameterTypeList or identifierList (function signature)
					const params = direct?.parameterTypeList?.() ?? direct?.identifierList?.();
					// If we reached here with a nested directDeclarator, it's a function prototype
					return true;
				}
			}
		} catch {
			// ignore
		}
		return false;
	};

	const extractIdentifierFromDeclarator = (ctx: any): { name: string; line: number; column: number } | null => {
		// Skip function prototypes - they're not variable declarations
		if (isFunctionPrototype(ctx)) {
			return null;
		}
		
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

	const checkAndAddDeclaration = (info: { name: string; line: number; column: number }) => {
		const scopeId = getCurrentScopeId();
		const scopeVars = scopeVariables.get(scopeId);
		if (!scopeVars) return;
		
		const lowerName = info.name.toLowerCase();
		
		// Check if variable is already declared in an include file
		const includeSource = includeVars.get(lowerName);
		if (includeSource) {
			// Shadowing a global variable from an include file - warning, not error
			diagnostics.push({
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line: info.line - 1, character: info.column },
					end: { line: info.line - 1, character: info.column + info.name.length }
				},
				message: `Variable '${info.name}' shadows a global variable declared in '${includeSource}'`
			});
			// Don't return - still track the variable in local scope
		}
		
		const existing = scopeVars.get(lowerName);
		
		if (existing) {
			// Re-declaration in same scope!
			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line: info.line - 1, character: info.column },
					end: { line: info.line - 1, character: info.column + info.name.length }
				},
				message: `Variable '${info.name}' is already declared in this scope (first declared at line ${existing.line})`
			});
		} else {
			scopeVars.set(lowerName, { ...info, scopeDepth });
		}
	};

	// Track if we're in a function definition to avoid double-scoping
	let inFunctionBody = false;

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
			enterScope();
			inFunctionBody = true;
			visitor.visitChildren(ctx);
			inFunctionBody = false;
			exitScope();
			return undefined;
		},
		visitCompoundStatement(ctx: any) {
			// Don't create a new scope for the function body compound statement
			// (parameters and local vars should share the same scope)
			if (inFunctionBody) {
				inFunctionBody = false; // Reset flag, nested blocks should create scopes
				visitor.visitChildren(ctx);
				return undefined;
			}
			// Enter a new scope for other compound statements (blocks)
			enterScope();
			visitor.visitChildren(ctx);
			exitScope();
			return undefined;
		},
		visitIterationStatement(ctx: any) {
			// For loops create their own scope for the loop variable
			// Check if this is a for loop with a forCondition containing forDeclaration
			try {
				const forToken = ctx?.For?.();
				if (forToken) {
					// This is a for loop - create a scope for the loop variable
					enterScope();
					visitor.visitChildren(ctx);
					exitScope();
					return undefined;
				}
			} catch {
				// ignore
			}
			// For while/do-while, just visit children normally
			return visitor.visitChildren(ctx);
		},
		visitDeclaration(ctx: any) {
			// Collect declared variables
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) {
						checkAndAddDeclaration(info);
					}
				}
			} catch {
				// ignore
			}
			return visitor.visitChildren(ctx);
		},
		visitForDeclaration(ctx: any) {
			// Collect for-loop declared variables
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					const declarator = initDecl?.declarator?.();
					const info = extractIdentifierFromDeclarator(declarator);
					if (info) {
						checkAndAddDeclaration(info);
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
					checkAndAddDeclaration({ name: text, line, column });
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
	}

	return diagnostics;
}

export class Validator {
	/**
	 * Parses the given document text and returns diagnostics for any syntax errors
	 * and semantic issues (like variable re-declarations).
	 *
	 * This is used for real-time validation (squiggles) in the editor.
	 */
	static Validate(documentText: string): Diagnostic[] {
		return Validator.ValidateWithIncludes(documentText, []);
	}

	/**
	 * Parses the given document text and returns diagnostics for any syntax errors
	 * and semantic issues (like variable re-declarations), including checks against
	 * variables declared in include files.
	 *
	 * @param documentText The document text to validate
	 * @param includeFileVariables Variables declared in include files
	 */
	static ValidateWithIncludes(documentText: string, includeFileVariables: IncludeFileVariable[]): Diagnostic[] {
		const diagnostics: Diagnostic[] = [];

		try {
			const { lexer, parser } = createLexerAndParser(documentText);

			const errorListener = new DiagnosticErrorListener();
			lexer.removeErrorListeners();
			parser.removeErrorListeners();
			parser.addErrorListener(errorListener);

			const tree = parser.compilationUnit();
			const syntaxDiagnostics = errorListener.diagnostics;
			
			// Only run semantic validation if there are no syntax errors
			if (syntaxDiagnostics.length === 0) {
				const redeclarationDiagnostics = validateRedeclarations(tree, includeFileVariables);
				return [...syntaxDiagnostics, ...redeclarationDiagnostics];
			}
			
			return syntaxDiagnostics;
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
