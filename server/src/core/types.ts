/**
 * Shared type definitions for the 12dPL language server.
 *
 * These types are used across core, service, and provider layers.
 * They have NO dependency on vscode-languageserver — only plain TypeScript.
 */

import type { CommonTokenStream } from 'antlr4';

// ─── Symbol Range ───────────────────────────────────────────────────────────

/** 0-indexed source range (matches LSP convention). */
export interface SymbolRange {
	start: { line: number; character: number };
	end: { line: number; character: number };
}

// ─── Parameter info ─────────────────────────────────────────────────────────

export interface ParameterSymbolInfo {
	name?: string;
	type?: string;
	byRef?: boolean;
	isArray?: boolean;
}

// ─── Symbol Declaration ─────────────────────────────────────────────────────

export interface SymbolDeclaration {
	name: string;
	type?: string;
	range: SymbolRange;
	kind: 'variable' | 'function' | 'parameter' | 'define';

	// function-specific
	signature?: string;
	params?: ParameterSymbolInfo[];
	returnType?: string;
	isForwardDeclaration?: boolean;

	// define-specific
	defineParams?: string[];
	value?: string;
	/** Filesystem path of the file where this define was found. */
	definedInFsPath?: string;
}

// ─── Scope Node ─────────────────────────────────────────────────────────────

export interface ScopeNode {
	kind: 'global' | 'function' | 'block' | 'for';
	name?: string;
	range: SymbolRange;
	declarations: SymbolDeclaration[];
	children: ScopeNode[];
}

// ─── Symbol Table ───────────────────────────────────────────────────────────

export interface SymbolTable {
	root: ScopeNode;
	defines: SymbolDeclaration[];
}

// ─── Derived Symbol Views ───────────────────────────────────────────────────

export interface DerivedSymbolViews {
	exportedFunctions: ReadonlyMap<string, SymbolDeclaration[]>;
	exportedVariables: ReadonlyMap<string, SymbolDeclaration>;
	allFunctions: ReadonlyMap<string, SymbolDeclaration[]>;
}

// ─── Parse Result ───────────────────────────────────────────────────────────

export interface ParseResult {
	tree: any;                           // ANTLR ParseTree
	tokens: CommonTokenStream;
	transformedText: string;
	conditionalLines: Set<number>;       // 1-based lines inside #if branches
	syntaxErrors: SyntaxError[];
}

export interface SyntaxError {
	line: number;       // 1-based (ANTLR convention)
	column: number;
	message: string;
}

// ─── Known symbols (for undeclared identifier checking) ─────────────────────

export interface KnownSymbols {
	functions: Set<string>;
	variables: Set<string>;
	defines: Set<string>;
}
