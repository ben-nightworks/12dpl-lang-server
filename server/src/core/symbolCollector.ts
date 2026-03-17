/**
 * Core symbol collector — walks the ANTLR parse tree and produces a SymbolTable.
 *
 * The SymbolTable is a scope tree (ScopeNode hierarchy) plus a flat list of defines.
 * No LSP or I/O dependencies.
 */

import type { ParseResult, SymbolTable, ScopeNode, SymbolDeclaration, ParameterSymbolInfo, SymbolRange, DerivedSymbolViews } from './types';
import type { DirectDeclaratorContext, DeclaratorContext } from '../antlr/src/proglang12dParser';

const GENERATED_WRAPPER_PREFIX = '__12dpl__script__';

// ─── Identifier extraction helpers ──────────────────────────────────────────

function safeTokenText(node: any): string | null {
	const text = node?.symbol?.text ?? node?.getText?.();
	return typeof text === 'string' ? text : null;
}

function rangeFromIdentifierNode(node: any, name: string): SymbolRange {
	const line = node?.symbol?.line;
	const column = node?.symbol?.column;
	if (typeof line !== 'number' || typeof column !== 'number') {
		return { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
	}
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
		} catch { /* ignore */ }
		try {
			cur = cur.directDeclarator?.() ?? null;
		} catch { break; }
	}
	return null;
}

function extractIdentifierNodeFromDeclarator(ctx: DeclaratorContext | null | undefined): any | null {
	if (!ctx) return null;
	let direct: DirectDeclaratorContext | null = null;
	try { direct = (ctx as any).directDeclarator?.() ?? null; } catch { direct = null; }
	return extractIdentifierNodeFromDirectDeclarator(direct);
}

function extractIdentifierFromDirectDeclarator(ctx: DirectDeclaratorContext | null | undefined): string | null {
	let cur: any = ctx;
	while (cur) {
		try {
			const idNode = cur.Identifier?.();
			const idText = safeTokenText(idNode);
			if (idText) return idText;
		} catch { /* ignore */ }
		try { cur = cur.directDeclarator?.() ?? null; } catch { break; }
	}
	return null;
}

function extractIdentifierFromDeclarator(ctx: DeclaratorContext | null | undefined): string | null {
	if (!ctx) return null;
	let direct: DirectDeclaratorContext | null = null;
	try { direct = (ctx as any).directDeclarator?.() ?? null; } catch { direct = null; }
	return extractIdentifierFromDirectDeclarator(direct);
}

function getDeclarationSpecifiersText(ctx: any): string | undefined {
	try {
		const t = ctx?.getText?.();
		return typeof t === 'string' && t.length ? t : undefined;
	} catch { return undefined; }
}

function directDeclaratorHasParens(ctx: DirectDeclaratorContext | null | undefined): boolean {
	let cur: any = ctx;
	while (cur) {
		try { if (cur.LeftParen?.()) return true; } catch { /* ignore */ }
		try { cur = cur.directDeclarator?.() ?? null; } catch { break; }
	}
	return false;
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
				} catch { /* ignore */ }
				return out;
			}
		} catch { /* ignore */ }
		try {
			const il = cur.identifierList?.();
			if (il) {
				const out: ParameterSymbolInfo[] = [];
				try {
					for (const idNode of il.Identifier_list?.() ?? []) {
						const nameText = safeTokenText(idNode);
						if (nameText) out.push({ name: nameText });
					}
				} catch { /* ignore */ }
				return out;
			}
		} catch { /* ignore */ }
		try { cur = cur.directDeclarator?.() ?? null; } catch { break; }
	}
	return [];
}

function buildFunctionSignature(name: string, returnType: string | undefined, params: ParameterSymbolInfo[]): string {
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

// ─── Define extraction ──────────────────────────────────────────────────────

const DEFINE_RE = /^\s*#\s*define\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s*\(([^)]*)\))?\s*(.*)?$/;

/**
 * Extracts #define macros from raw (pre-stripped) source text.
 * Uses the original text so defines inside live code are found.
 */
export function parseDefines(text: string, definedInFsPath?: string): SymbolDeclaration[] {
	const out: SymbolDeclaration[] = [];
	const lines = text.split(/\r?\n/);
	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];
		const m = DEFINE_RE.exec(line);
		if (!m) continue;
		const name = m[1];
		const rawParams = m[2];
		const value = (m[3] ?? '').trim();
		const params = typeof rawParams === 'string'
			? rawParams.split(',').map(p => p.trim()).filter(Boolean)
			: undefined;
		const nameStart = line.indexOf(name);
		const range: SymbolRange = nameStart >= 0
			? { start: { line: lineIndex, character: nameStart }, end: { line: lineIndex, character: nameStart + name.length } }
			: { start: { line: lineIndex, character: 0 }, end: { line: lineIndex, character: 0 } };
		out.push({
			name,
			kind: 'define',
			range,
			defineParams: params && params.length ? params : undefined,
			value: value.length ? value : undefined,
			definedInFsPath,
		});
	}
	return out;
}

// ─── Scope tree collector ───────────────────────────────────────────────────

/** True when the name belongs to an implicit wrapper inserted by the parse pipeline. */
export function isGeneratedWrapperFunctionName(name: string): boolean {
	return name.startsWith(GENERATED_WRAPPER_PREFIX);
}

function rangeFromContext(ctx: any): SymbolRange {
	const startLine = ctx?.start?.line ?? 1;
	const startCol = ctx?.start?.column ?? 0;
	const stopLine = ctx?.stop?.line ?? startLine;
	const stopCol = ctx?.stop?.column ?? startCol;
	return {
		start: { line: startLine - 1, character: startCol },
		end: { line: stopLine - 1, character: stopCol }
	};
}

/**
 * Collects a SymbolTable from a ParseResult.
 * Walks the parse tree once, building the scope tree and extracting all declarations.
 */
export function collectSymbolTable(parseResult: ParseResult, rawText?: string, fsPath?: string): SymbolTable {
	const root: ScopeNode = {
		kind: 'global',
		range: { start: { line: 0, character: 0 }, end: { line: 999999, character: 0 } },
		declarations: [],
		children: [],
	};

	const scopeStack: ScopeNode[] = [root];
	const currentScope = () => scopeStack[scopeStack.length - 1];

	let inRealFunction = false;
	let inDeclaration = false;
	let inFunctionBody = false;

	const addDeclaration = (decl: SymbolDeclaration) => {
		currentScope().declarations.push(decl);
	};

	const enterScope = (kind: ScopeNode['kind'], ctx: any, name?: string): ScopeNode => {
		const node: ScopeNode = {
			kind,
			name,
			range: rangeFromContext(ctx),
			declarations: [],
			children: [],
		};
		currentScope().children.push(node);
		scopeStack.push(node);
		return node;
	};

	const exitScope = () => {
		scopeStack.pop();
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
			addDeclaration({
				name, kind: 'function', range,
				returnType: declaredType, params, signature,
				isForwardDeclaration: true,
			});
			return;
		}

		addDeclaration({ name, kind: 'variable', type: declaredType, range });
	};

	const visitor: any = {
		visitTerminal() { return undefined; },
		visitErrorNode() { return undefined; },
		visitChildren(ctx: any) {
			for (const child of ctx?.children ?? []) {
				if (child && typeof child.accept === 'function') child.accept(visitor);
			}
			return undefined;
		},
		visitFunctionDefinition(ctx: any) {
			const decl = ctx?.declarator?.() ?? null;
			const direct = decl?.directDeclarator?.() ?? null;
			const name = extractIdentifierFromDeclarator(decl);
			const idNode = extractIdentifierNodeFromDeclarator(decl);
			const returnType = getDeclarationSpecifiersText(ctx?.declarationSpecifiers?.());
			const isWrapper = name?.startsWith(GENERATED_WRAPPER_PREFIX) ?? false;

			if (name) {
				const params = getFunctionParamsFromDirectDeclarator(direct);
				const signature = buildFunctionSignature(name, returnType, params);
				const range = rangeFromIdentifierNode(idNode, name);
				// Add function declaration to parent scope (before entering the new scope)
				addDeclaration({
					name, kind: 'function', range,
					returnType, params, signature,
				});
			}

			const wasInRealFunction = inRealFunction;
			if (!isWrapper) {
				inRealFunction = true;
				enterScope('function', ctx, name ?? undefined);
			} else {
				// Wrapper functions — their contents go to the global scope
				// We still enter a scope to track it, but it behaves as global
				enterScope('function', ctx, name ?? undefined);
			}

			// Collect parameters as declarations in the function scope
			const paramTypeList = direct?.parameterTypeList?.();
			if (paramTypeList && !isWrapper) {
				try {
					const plist = paramTypeList.parameterList?.();
					for (const pd of plist?.parameterDeclaration_list?.() ?? []) {
						const pName = safeTokenText(pd?.Identifier?.());
						const pType = getDeclarationSpecifiersText(pd?.declarationSpecifiers?.());
						if (pName) {
							const pIdNode = pd?.Identifier?.();
							const pRange = rangeFromIdentifierNode(pIdNode, pName);
							addDeclaration({ name: pName, kind: 'parameter', type: pType, range: pRange });
						}
					}
				} catch { /* ignore */ }
			}

			inFunctionBody = true;
			visitor.visitChildren(ctx);
			inFunctionBody = false;

			exitScope();
			inRealFunction = wasInRealFunction;
			return undefined;
		},
		visitCompoundStatement(ctx: any) {
			if (inFunctionBody) {
				// Don't create an extra scope for the function body itself
				inFunctionBody = false;
				visitor.visitChildren(ctx);
				return undefined;
			}
			enterScope('block', ctx);
			visitor.visitChildren(ctx);
			exitScope();
			return undefined;
		},
		visitIterationStatement(ctx: any) {
			try {
				if (ctx?.For?.()) {
					enterScope('for', ctx);
					visitor.visitChildren(ctx);
					exitScope();
					return undefined;
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitDeclaration(ctx: any) {
			const declaredType = getDeclarationSpecifiersText(ctx?.declarationSpecifiers?.());
			const list = ctx?.initDeclaratorList?.();
			try {
				for (const initDecl of list?.initDeclarator_list?.() ?? []) {
					collectFromInitDeclarator(initDecl, declaredType);
				}
			} catch { /* ignore */ }
			const wasInDeclaration = inDeclaration;
			inDeclaration = true;
			const result = visitor.visitChildren(ctx);
			inDeclaration = wasInDeclaration;
			return result;
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
						addDeclaration({ name, kind: 'variable', type: declaredType, range });
					}
				}
			} catch { /* ignore */ }
			return visitor.visitChildren(ctx);
		},
		visitParameterDeclaration(ctx: any) {
			// Skip parameters inside declarations (forward declarations/prototypes)
			if (inDeclaration) return visitor.visitChildren(ctx);

			// Parameters already collected in visitFunctionDefinition above.
			// This visitor handles K&R-style parameters in wrapper functions.
			return visitor.visitChildren(ctx);
		},
	};

	try {
		parseResult.tree.accept(visitor);
	} catch { /* best-effort */ }

	// Extract defines from raw text if provided
	const defines = rawText ? parseDefines(rawText, fsPath) : [];

	return { root, defines };
}

// ─── Scope tree query functions ─────────────────────────────────────────────

function positionInRange(pos: { line: number; character: number }, range: SymbolRange): boolean {
	if (pos.line < range.start.line || pos.line > range.end.line) return false;
	if (pos.line === range.start.line && pos.character < range.start.character) return false;
	if (pos.line === range.end.line && pos.character > range.end.character) return false;
	return true;
}

/** Returns the scope chain at a position: [global, function?, block?, ...] outermost to innermost. */
export function scopeChainAt(root: ScopeNode, position: { line: number; character: number }): ScopeNode[] {
	const chain: ScopeNode[] = [root];
	let current = root;
	let found = true;
	while (found) {
		found = false;
		for (const child of current.children) {
			if (positionInRange(position, child.range)) {
				chain.push(child);
				current = child;
				found = true;
				break;
			}
		}
	}
	return chain;
}

/** Returns all symbols visible at a position (walk chain bottom-up, collecting declarations). */
export function visibleSymbolsAt(root: ScopeNode, position: { line: number; character: number }): SymbolDeclaration[] {
	const chain = scopeChainAt(root, position);
	const seen = new Set<string>();
	const result: SymbolDeclaration[] = [];
	// Walk from innermost to outermost, skip duplicates (inner wins)
	for (let i = chain.length - 1; i >= 0; i--) {
		for (const decl of chain[i].declarations) {
			const key = decl.name.toLowerCase();
			if (!seen.has(key)) {
				seen.add(key);
				result.push(decl);
			}
		}
	}
	return result;
}

/** Returns the innermost scope that declares a given name. */
export function findDeclaringScope(root: ScopeNode, position: { line: number; character: number }, name: string): { scope: ScopeNode; declaration: SymbolDeclaration } | null {
	const chain = scopeChainAt(root, position);
	const lowerName = name.toLowerCase();
	for (let i = chain.length - 1; i >= 0; i--) {
		for (const decl of chain[i].declarations) {
			if (decl.name.toLowerCase() === lowerName) {
				return { scope: chain[i], declaration: decl };
			}
		}
	}
	return null;
}

// ─── Derived views ──────────────────────────────────────────────────────────

/**
 * Derives flat lookup structures from the scope tree.
 * These are the exported globals visible to other files via #include.
 */
export function deriveViews(root: ScopeNode): DerivedSymbolViews {
	const exportedFunctions = new Map<string, SymbolDeclaration[]>();
	const exportedVariables = new Map<string, SymbolDeclaration>();
	const allFunctions = new Map<string, SymbolDeclaration[]>();

	// Exported symbols come from:
	// - Declarations in the global scope
	// - Declarations in wrapper function scopes (which act as global)
	function collectExported(scope: ScopeNode) {
		for (const decl of scope.declarations) {
			if (isGeneratedWrapperFunctionName(decl.name)) continue;

			if (decl.kind === 'function') {
				const existing = exportedFunctions.get(decl.name);
				if (existing) existing.push(decl);
				else exportedFunctions.set(decl.name, [decl]);
			} else if (decl.kind === 'variable') {
				if (!exportedVariables.has(decl.name)) {
					exportedVariables.set(decl.name, decl);
				}
			}
		}
	}

	// Root + wrapper children
	collectExported(root);
	for (const child of root.children) {
		if (child.kind === 'function' && child.name && isGeneratedWrapperFunctionName(child.name)) {
			collectExported(child);
		}
	}

	// All functions across all scopes
	function collectAllFunctions(scope: ScopeNode) {
		for (const decl of scope.declarations) {
			if (decl.kind === 'function' && !isGeneratedWrapperFunctionName(decl.name)) {
				const existing = allFunctions.get(decl.name);
				if (existing) existing.push(decl);
				else allFunctions.set(decl.name, [decl]);
			}
		}
		for (const child of scope.children) {
			collectAllFunctions(child);
		}
	}
	collectAllFunctions(root);

	return { exportedFunctions, exportedVariables, allFunctions };
}
