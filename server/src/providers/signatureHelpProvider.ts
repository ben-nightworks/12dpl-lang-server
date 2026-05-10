/**
 * Signature Help provider for 12dPL.
 *
 * Activates on `(` and `,` trigger characters to show function signature
 * information — parameter names, types, and overloads — as the user types
 * the arguments of a function call.
 *
 * Resolution order (mirrors SymbolResolver):
 *   1. Document functions (current file)
 *   2. Include functions (transitively included files)
 *   3. Built-in prototypes
 */

import type {
	Connection,
	ParameterInformation,
	SignatureHelp,
	SignatureHelpParams,
	SignatureInformation,
} from 'vscode-languageserver/node';
import { MarkupKind } from 'vscode-languageserver/node';

import type { TextDocuments } from 'vscode-languageserver/node';
import type { TextDocument } from 'vscode-languageserver-textdocument';

import type { DocumentService } from '../services/documentService';
import type { IncludeService } from '../services/includeService';
import type { PrototypeService, FunctionData } from '../services/prototypeService';
import type { ParameterSymbolInfo, SymbolDeclaration } from '../core/types';

// ─── Context parsing ─────────────────────────────────────────────────────────

interface CallContext {
	/** The name of the function being called. */
	name: string;
	/** 0-based index of the parameter the cursor is currently on. */
	argIndex: number;
}

/**
 * Scans the document text backwards from `offset` to determine which function
 * call the cursor is inside and which argument position (0-based) it is at.
 *
 * Handles nested calls, string literals (single and double quoted), and
 * statement boundaries so we don't accidentally cross function borders.
 *
 * Returns null when the cursor is not inside a function-call argument list.
 *
 * @internal Exported for unit testing.
 */
export function getCallContext(text: string, offset: number): CallContext | null {
	let depth = 0;
	let argIndex = 0;
	let i = offset - 1;

	while (i >= 0) {
		const ch = text[i];

		// Skip string literals (walking backwards)
		if (ch === '"' || ch === "'") {
			const quote = ch;
			i--;
			while (i >= 0) {
				if (text[i] === quote && (i === 0 || text[i - 1] !== '\\')) break;
				i--;
			}
			i--;
			continue;
		}

		if (ch === ')' || ch === ']') {
			depth++;
		} else if (ch === ']') {
			// handled above
		} else if (ch === '(') {
			if (depth === 0) {
				// Potential function call opening paren — extract the name before it.
				let j = i - 1;
				// Skip whitespace
				while (j >= 0 && (text[j] === ' ' || text[j] === '\t')) j--;
				const nameEnd = j + 1;
				if (j < 0) return null;
				// Walk back over identifier characters.
				// 12dPL allows digit-prefixed names like "2d_point", "3d_vector".
				while (j >= 0 && /[a-zA-Z0-9_]/.test(text[j])) j--;
				const name = text.slice(j + 1, nameEnd);
				// Reject: empty name, purely numeric token (e.g. cast `(int)` won't have one)
				if (!name || /^\d+$/.test(name)) return null;
				return { name, argIndex };
			}
			depth--;
		} else if (ch === '[') {
			if (depth === 0) return null; // inside array subscript, not a call
			depth--;
		} else if (ch === ',' && depth === 0) {
			argIndex++;
		} else if (ch === ';' || ch === '{' || ch === '}') {
			// Statement boundary — give up
			return null;
		}

		i--;
	}

	return null;
}

// ─── Signature building ──────────────────────────────────────────────────────

/** Formats a single parameter (from ParameterSymbolInfo) as it should appear in the signature label. */
function formatUserParam(p: ParameterSymbolInfo): string {
	const ref = p.byRef ? '&' : '';
	const arr = p.isArray ? '[]' : '';
	if (p.type && p.name) return `${p.type} ${ref}${p.name}${arr}`;
	if (p.type) return `${p.type}${ref}${arr}`;
	if (p.name) return `${ref}${p.name}${arr}`;
	return '';
}

/** Formats a parameter from a FunctionData prototype. */
function formatProtoParam(p: { type: string; name: string }): string {
	return `${p.type} ${p.name}`;
}

/**
 * Builds a `SignatureInformation` from a `SymbolDeclaration` (user-defined function).
 * Computes byte-offset `ParameterInformation.label` pairs so VS Code can
 * precisely underline the active parameter.
 */
function buildSignatureFromDeclaration(decl: SymbolDeclaration): SignatureInformation {
	const params = decl.params ?? [];
	const signature = decl.signature ?? `${decl.returnType ?? 'void'} ${decl.name}(${params.map(formatUserParam).filter(Boolean).join(', ')})`;

	const paramInfos = computeParamRanges(signature, params.map(formatUserParam).filter(Boolean));

	return {
		label: signature,
		documentation: undefined,
		parameters: paramInfos,
	};
}

/**
 * Builds a `SignatureInformation` from a `FunctionData` prototype (built-in).
 * Uses enriched description as documentation when available.
 */
function buildSignatureFromPrototype(func: FunctionData, prototypeService: PrototypeService): SignatureInformation {
	const paramLabels = func.parameters.map(formatProtoParam);
	const signature = `${func.returnType} ${func.name}(${paramLabels.join(', ')})`;

	const paramInfos = computeParamRanges(signature, paramLabels);

	const doc = prototypeService.generateDocumentation(func);

	return {
		label: signature,
		documentation: { kind: MarkupKind.Markdown, value: doc },
		parameters: paramInfos,
	};
}

/**
 * Given a full signature string and the ordered list of parameter label strings
 * (as they appear in the signature), computes `[start, end]` byte-offset pairs
 * for each parameter within the signature.
 *
 * This allows VS Code to precisely highlight the active parameter in the signature.
 */
function computeParamRanges(signature: string, paramLabels: string[]): ParameterInformation[] {
	const openParen = signature.indexOf('(');
	if (openParen < 0 || paramLabels.length === 0) return [];

	const result: ParameterInformation[] = [];
	let pos = openParen + 1;

	for (let k = 0; k < paramLabels.length; k++) {
		const label = paramLabels[k];
		const found = signature.indexOf(label, pos);
		if (found < 0) {
			// Fallback: use the param label as a plain string
			result.push({ label });
			continue;
		}
		result.push({ label: [found, found + label.length] as [number, number] });
		pos = found + label.length;
		// Skip the separator ", " for next iteration
		if (k < paramLabels.length - 1) pos += 2;
	}

	return result;
}

/**
 * Given a list of signatures and the `argIndex` the cursor is at, returns
 * the 0-based index of the "best" active signature.
 *
 * Preference order:
 *   1. Signatures where `argIndex` is within the parameter count.
 *   2. The signature with the closest (largest) parameter count if all are shorter.
 */
function pickActiveSignature(signatures: SignatureInformation[], argIndex: number): number {
	// Find signatures that can accommodate argIndex
	const valid = signatures
		.map((s, i) => ({ i, count: s.parameters?.length ?? 0 }))
		.filter(({ count }) => argIndex < count);

	if (valid.length > 0) {
		// Among valid, prefer the one with fewest parameters (tightest match)
		return valid.reduce((best, cur) => cur.count < best.count ? cur : best).i;
	}

	// No overload covers argIndex — pick the one with the most parameters
	return signatures
		.map((s, i) => ({ i, count: s.parameters?.length ?? 0 }))
		.reduce((best, cur) => cur.count > best.count ? cur : best).i;
}

// ─── Provider registration ───────────────────────────────────────────────────

export function registerSignatureHelpProvider(opts: {
	connection: Connection;
	documents: TextDocuments<TextDocument>;
	documentService: DocumentService;
	includeService: IncludeService;
	prototypeService: PrototypeService;
}): void {
	const { connection, documents, documentService, includeService, prototypeService } = opts;

	connection.onSignatureHelp(async (params: SignatureHelpParams): Promise<SignatureHelp | null> => {
		try {
			const document = documents.get(params.textDocument.uri);
			if (!document) return null;

			const text = document.getText();
			const offset = document.offsetAt(params.position);

			const ctx = getCallContext(text, offset);
			if (!ctx) return null;

			const { name, argIndex } = ctx;
			const signatures: SignatureInformation[] = [];

			// ── 1. Document functions ─────────────────────────────────────────
			const symbolTable = documentService.getSymbolTable(params.textDocument.uri);
			if (symbolTable) {
				const views = documentService.getDerivedViews(params.textDocument.uri);
				const docFuncs = views?.allFunctions.get(name) ?? [];
				for (const decl of docFuncs) {
					if (decl.kind === 'function') {
						signatures.push(buildSignatureFromDeclaration(decl));
					}
				}
			}

			// ── 2. Include functions ──────────────────────────────────────────
			if (signatures.length === 0) {
				const includeSymbols = await includeService.getIncludeSymbols(params.textDocument.uri);
				const incFuncs = includeSymbols.functions.get(name) ?? [];
				for (const decl of incFuncs) {
					if (decl.kind === 'function') {
						signatures.push(buildSignatureFromDeclaration(decl));
					}
				}
			}

			// ── 3. Built-in prototypes ────────────────────────────────────────
			if (signatures.length === 0) {
				await prototypeService.ready;
				const overloads = prototypeService.getPrototypes(name);
				for (const func of overloads) {
					signatures.push(buildSignatureFromPrototype(func, prototypeService));
				}
			}

			if (signatures.length === 0) return null;

			const activeSignature = pickActiveSignature(signatures, argIndex);
			const activeParamCount = signatures[activeSignature]?.parameters?.length ?? 0;
			const activeParameter = Math.min(argIndex, Math.max(0, activeParamCount - 1));

			return {
				signatures,
				activeSignature,
				activeParameter,
			};
		} catch (err) {
			connection.console.error(`signatureHelp error: ${err}`);
			return null;
		}
	});
}
