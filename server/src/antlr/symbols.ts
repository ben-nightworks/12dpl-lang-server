import proglang12dParser, {
	DeclaratorContext,
	DirectDeclaratorContext
} from './src/proglang12dParser.js';

import { createLexerAndParser } from './parsePipeline.js';

/**
 * Utilities for extracting function/variable symbols from a 12dPL document.
 *
 * Used by completion/hover/definition and by unit tests.
 */
export interface CollectedSymbols {
	functions: Set<string>;
	variables: Set<string>;
}

export interface ParameterSymbolInfo {
	name?: string;
	type?: string;
	byRef?: boolean;
	isArray?: boolean;
}

export interface SymbolRange {
	start: { line: number; character: number };
	end: { line: number; character: number };
}

export interface FunctionSymbolInfo {
	name: string;
	returnType?: string;
	params: ParameterSymbolInfo[];
	signature: string;
	range?: SymbolRange;
}

export interface VariableSymbolInfo {
	name: string;
	type?: string;
	range?: SymbolRange;
}

export interface DocumentSymbolIndex {
	functions: Record<string, FunctionSymbolInfo>;
	variables: Record<string, VariableSymbolInfo>;
}

const GENERATED_WRAPPER_PREFIX = '__12dpl__script__';

function isValidIdentifier(name: string): boolean {
	return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

function shouldIncludeIdentifier(name: string): boolean {
	if (!isValidIdentifier(name)) return false;
	if (name.startsWith(GENERATED_WRAPPER_PREFIX)) return false;
	return true;
}

function safeTokenText(node: any): string | null {
	const text = node?.symbol?.text ?? node?.getText?.();
	return typeof text === 'string' ? text : null;
}

function rangeFromIdentifierNode(node: any, name: string): SymbolRange | undefined {
	const line = node?.symbol?.line;
	const column = node?.symbol?.column;
	if (typeof line !== 'number' || typeof column !== 'number') return undefined;
	return {
		start: { line: line - 1, character: column },
		end: { line: line - 1, character: column + name.length }
	};
}

function extractIdentifierNodeFromDirectDeclarator(ctx: DirectDeclaratorContext | null | undefined): any | null {
	let cur: any = ctx;
	while (cur) {
		try {
			const idNode = cur.Identifier?.();
			const idText = safeTokenText(idNode);
			if (idNode && idText) return idNode;
		} catch {
			// ignore
		}
		try {
			cur = cur.directDeclarator?.() ?? null;
		} catch {
			break;
		}
	}
	return null;
}

function extractIdentifierNodeFromDeclarator(ctx: DeclaratorContext | null | undefined): any | null {
	if (!ctx) return null;
	let direct: DirectDeclaratorContext | null = null;
	try {
		direct = (ctx as any).directDeclarator?.() ?? null;
	} catch {
		direct = null;
	}
	return extractIdentifierNodeFromDirectDeclarator(direct);
}

function extractIdentifierFromDirectDeclarator(ctx: DirectDeclaratorContext | null | undefined): string | null {
	let cur: any = ctx;
	while (cur) {
		try {
			const idNode = cur.Identifier?.();
			const idText = safeTokenText(idNode);
			if (idText) return idText;
		} catch {
			// ignore
		}
		try {
			const next = cur.directDeclarator?.();
			cur = next ?? null;
		} catch {
			break;
		}
	}
	return null;
}

function extractIdentifierFromDeclarator(ctx: DeclaratorContext | null | undefined): string | null {
	if (!ctx) return null;
	let direct: DirectDeclaratorContext | null = null;
	try {
		direct = (ctx as any).directDeclarator?.() ?? null;
	} catch {
		direct = null;
	}
	return extractIdentifierFromDirectDeclarator(direct);
}

function getDeclarationSpecifiersText(ctx: any): string | undefined {
	try {
		const t = ctx?.getText?.();
		return typeof t === 'string' && t.length ? t : undefined;
	} catch {
		return undefined;
	}
}

function buildFunctionSignature(
	name: string,
	returnType: string | undefined,
	params: ParameterSymbolInfo[]
): string {
	const parts: string[] = [];
	if (returnType) parts.push(returnType);
	parts.push(name);

	const paramText = params.map(p => {
		const ref = p.byRef ? '&' : '';
		const arr = p.isArray ? '[]' : '';
		if (p.type && p.name) return `${p.type} ${ref}${p.name}${arr}`;
		if (p.type) return `${p.type}${arr}`;
		if (p.name) return `${ref}${p.name}${arr}`;
		return '';
	}).filter(Boolean).join(', ');

	return `${parts.join(' ')}(${paramText})`;
}

function getFunctionParamsFromDirectDeclarator(ctx: DirectDeclaratorContext | null | undefined): ParameterSymbolInfo[] {
	let cur: any = ctx;
	while (cur) {
		try {
			const pt = cur.parameterTypeList?.();
			if (pt) {
				const out: ParameterSymbolInfo[] = [];
				try {
					const plist = pt.parameterList?.();
					for (const pd of plist?.parameterDeclaration_list?.() ?? []) {
						const typeText = getDeclarationSpecifiersText(pd?.declarationSpecifiers?.());
						const nameText = safeTokenText(pd?.Identifier?.());
						const byRef = !!pd?.And?.();
						const isArray = !!pd?.LeftBracket?.();
						if (nameText || typeText) {
							out.push({ name: nameText ?? undefined, type: typeText, byRef, isArray });
						}
					}
				} catch {
					// ignore
				}
				return out;
			}
		} catch {
			// ignore
		}

		try {
			const il = cur.identifierList?.();
			if (il) {
				const out: ParameterSymbolInfo[] = [];
				try {
					for (const idNode of il.Identifier_list?.() ?? []) {
						const nameText = safeTokenText(idNode);
						if (nameText) out.push({ name: nameText });
					}
				} catch {
					// ignore
				}
				return out;
			}
		} catch {
			// ignore
		}

		try {
			cur = cur.directDeclarator?.() ?? null;
		} catch {
			break;
		}
	}
	return [];
}

function directDeclaratorHasParens(ctx: DirectDeclaratorContext | null | undefined): boolean {
	let cur: any = ctx;
	while (cur) {
		try {
			const lp = cur.LeftParen?.();
			if (lp) return true;
		} catch {
			// ignore
		}
		try {
			cur = cur.directDeclarator?.() ?? null;
		} catch {
			break;
		}
	}
	return false;
}

/**
 * Parses a document and returns a structured index of discovered functions and variables.
 *
 * Best-effort: returns an empty index if parsing fails.
 */
export function collectDocumentSymbolIndex(documentText: string): DocumentSymbolIndex {
	const index: DocumentSymbolIndex = {
		functions: {},
		variables: {}
	};

	try {
		const { parser } = createLexerAndParser(documentText);
		const tree = parser.compilationUnit();

		const addFunction = (info: FunctionSymbolInfo) => {
			if (!shouldIncludeIdentifier(info.name)) return;
			index.functions[info.name] = info;
		};

		const addVariable = (info: VariableSymbolInfo) => {
			if (!shouldIncludeIdentifier(info.name)) return;
			index.variables[info.name] = info;
		};

		const collectFromInitDeclarator = (initDecl: any, declaredType: string | undefined) => {
			const declarator = initDecl?.declarator?.();
			const direct = declarator?.directDeclarator?.();
			const name = extractIdentifierFromDeclarator(declarator ?? null);
			const idNode = extractIdentifierNodeFromDeclarator(declarator ?? null);
			if (!name) return;
			const range = rangeFromIdentifierNode(idNode, name);

			if (directDeclaratorHasParens(direct ?? null)) {
				const params = getFunctionParamsFromDirectDeclarator(direct ?? null);
				const signature = buildFunctionSignature(name, declaredType, params);
				addFunction({ name, returnType: declaredType, params, signature, range });
				return;
			}

			addVariable({ name, type: declaredType, range });
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
				const decl = ctx?.declarator?.() ?? null;
				const direct = decl?.directDeclarator?.() ?? null;
				const name = extractIdentifierFromDeclarator(decl);
				const idNode = extractIdentifierNodeFromDeclarator(decl);
				const returnType = getDeclarationSpecifiersText(ctx?.declarationSpecifiers?.());
				if (name) {
					const params = getFunctionParamsFromDirectDeclarator(direct);
					const signature = buildFunctionSignature(name, returnType, params);
					const range = rangeFromIdentifierNode(idNode, name);
					addFunction({ name, returnType, params, signature, range });
				}
				return visitor.visitChildren(ctx);
			},
			visitDeclaration(ctx: any) {
				const declaredType = getDeclarationSpecifiersText(ctx?.declarationSpecifiers?.());
				const list = ctx?.initDeclaratorList?.();
				try {
					for (const initDecl of list?.initDeclarator_list?.() ?? []) {
						collectFromInitDeclarator(initDecl, declaredType);
					}
				} catch {
					// ignore
				}
				return visitor.visitChildren(ctx);
			},
			visitForDeclaration(ctx: any) {
				const declaredType = getDeclarationSpecifiersText(ctx?.declarationSpecifiers?.());
				const list = ctx?.initDeclaratorList?.();
				try {
					for (const initDecl of list?.initDeclarator_list?.() ?? []) {
						const declarator = initDecl?.declarator?.();
						const name = extractIdentifierFromDeclarator(declarator ?? null);
						if (name) {
							const idNode = extractIdentifierNodeFromDeclarator(declarator ?? null);
							const range = rangeFromIdentifierNode(idNode, name);
							addVariable({ name, type: declaredType, range });
						}
					}
				} catch {
					// ignore
				}
				return visitor.visitChildren(ctx);
			},
			visitParameterDeclaration(ctx: any) {
				const name = safeTokenText(ctx?.Identifier?.());
				const type = getDeclarationSpecifiersText(ctx?.declarationSpecifiers2?.());
				if (name) {
					const idNode = ctx?.Identifier?.();
					const range = rangeFromIdentifierNode(idNode, name);
					addVariable({ name, type, range });
				}
				return visitor.visitChildren(ctx);
			},
			visitIdentifierList(ctx: any) {
				try {
					for (const idNode of ctx?.Identifier_list?.() ?? []) {
						const name = safeTokenText(idNode);
						if (name) {
							const range = rangeFromIdentifierNode(idNode, name);
							addVariable({ name, range });
						}
					}
				} catch {
					// ignore
				}
				return visitor.visitChildren(ctx);
			}
		};

		tree.accept(visitor);
		return index;
	} catch {
		return index;
	}
}

/** Returns symbol names as sets (functions/variables). */
export function collectDocumentSymbols(documentText: string): CollectedSymbols {
	const index = collectDocumentSymbolIndex(documentText);
	return {
		functions: new Set(Object.keys(index.functions)),
		variables: new Set(Object.keys(index.variables))
	};
}

/** Returns sorted symbol names for stable display/testing. */
export function collectDocumentSymbolNames(documentText: string): { functions: string[]; variables: string[] } {
	const symbols = collectDocumentSymbols(documentText);
	return {
		functions: Array.from(symbols.functions).sort(),
		variables: Array.from(symbols.variables).sort()
	};
}

/** True when the name belongs to an implicit wrapper inserted by the parse pipeline. */
export function isGeneratedWrapperFunctionName(name: string): boolean {
	return name.startsWith(GENERATED_WRAPPER_PREFIX);
}

/** Validates that a string is a legal 12dPL identifier. */
export function isValid12dplIdentifier(name: string): boolean {
	return isValidIdentifier(name);
}

export type _ParserTypes = proglang12dParser;
