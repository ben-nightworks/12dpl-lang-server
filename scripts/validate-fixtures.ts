/**
 * validate-fixtures.ts — Run validators against .4dm files in testFixture,
 * macros, and macros_mattmonk, and print diagnostics grouped by file.
 *
 * Usage:
 *   bun run scripts/validate-fixtures.ts
 *   bun run scripts/validate-fixtures.ts fixtures
 *   bun run scripts/validate-fixtures.ts macros macros_mattmonk --filter base64
 *   bun run scripts/validate-fixtures.ts client/testFixture --filter return
 *
 * Targets may be aliases (`fixtures`, `macros`, `macros_mattmonk`) or
 * workspace-relative folder paths.
 *
 * This script replicates the DiagnosticService pipeline offline:
 *   1. Parse with preprocessor (stripConditionalDirectives + wrapTopLevel)
 *   2. Collect syntax errors
 *   3. Run deprecated call detection (token-based, always)
 *   4. If no syntax errors, run all semantic validators
 *   5. Recursively resolve quoted include files relative to each file
 *   6. Print results grouped by file with severity + line + message
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable, deriveViews, parseDefines } from '../server/src/core/symbolCollector';
import {
	validateVariableRedeclarations,
	validateFunctionRedeclarations,
	validateUndeclaredIdentifiers,
	validateDeprecatedCalls,
	validateVoidFunctionReturnValues,
	validateFunctionArguments,
	validateReturnStatements,
	validateArraySize,
	validateAssignmentTypes,
} from '../server/src/core/validators';
import type { FunctionSignatureMap, OverloadReturnType } from '../server/src/core/validators';
import type { KnownSymbols, SymbolDeclaration, ParameterSymbolInfo } from '../server/src/core/types';
import { PrototypeService } from '../server/src/services/prototypeService';

type Diagnostic = { severity?: number; range: any; message: string };

type IncludeAnalysis = {
	declarations: SymbolDeclaration[];
	defineNames: Set<string>;
	functionReturnTypes: Map<string, OverloadReturnType[]>;
};

// ─── Target directories ──────────────────────────────────────────────────────

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targetAliases = new Map<string, string>([
	['fixtures', path.join('client', 'testFixture')],
	['testfixture', path.join('client', 'testFixture')],
	['macros', 'macros'],
	['macros_mattmonk', 'macros_mattmonk'],
	['mattmacros', 'macros_mattmonk'],
	['all', '.'],
]);
const excludedDirNames = new Set([
	'.git',
	'.github',
	'.vscode',
	'node_modules',
	'out',
	'dist',
	'coverage',
	'images',
	'icons',
	'docs',
]);
const repoFileCache = new Map<string, string[]>();

function normalizeCliArgs(argv: string[]): { targetDirs: string[]; filter: string } {
	const targets: string[] = [];
	let filter = '';

	for (let index = 0; index < argv.length; index++) {
		const arg = argv[index];
		if (arg === '--filter') {
			filter = argv[index + 1] ?? '';
			index++;
			continue;
		}
		targets.push(arg);
	}

	const targetDirs = (targets.length > 0 ? targets : ['all']).map(target => {
		const aliasPath = targetAliases.get(target.toLowerCase());
		return path.resolve(repoRoot, aliasPath ?? target);
	});

	return { targetDirs, filter };
}

function toRepoRelative(filePath: string): string {
	return path.relative(repoRoot, filePath).replace(/\\/g, '/');
}

function isExcludedDir(dirName: string): boolean {
	return excludedDirNames.has(dirName.toLowerCase());
}

function collect4dmFilesRecursive(dir: string, filter: string, out: string[]): void {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!isExcludedDir(entry.name)) {
				collect4dmFilesRecursive(entryPath, filter, out);
			}
			continue;
		}
		if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.4dm')) {
			continue;
		}
		if (filter && !toRepoRelative(entryPath).toLowerCase().includes(filter.toLowerCase())) {
			continue;
		}
		out.push(entryPath);
	}
}

function collectFilesByExtensionRecursive(dir: string, extensions: Set<string>, out: string[]): void {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!isExcludedDir(entry.name)) {
				collectFilesByExtensionRecursive(entryPath, extensions, out);
			}
			continue;
		}
		if (!entry.isFile()) {
			continue;
		}
		const ext = path.extname(entry.name).toLowerCase();
		if (extensions.has(ext)) {
			out.push(entryPath);
		}
	}
}

function getRepoFilesWithExtensions(extensions: string[]): string[] {
	const cacheKey = extensions.map(ext => ext.toLowerCase()).sort().join('|');
	const cached = repoFileCache.get(cacheKey);
	if (cached) {
		return cached;
	}
	const files: string[] = [];
	collectFilesByExtensionRecursive(repoRoot, new Set(extensions.map(ext => ext.toLowerCase())), files);
	repoFileCache.set(cacheKey, files);
	return files;
}

function collect4dmFiles(targetDirs: string[], filter: string): string[] {
	const files: string[] = [];
	const seen = new Set<string>();
	for (const dir of targetDirs) {
		if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
			continue;
		}
		const collected: string[] = [];
		collect4dmFilesRecursive(dir, filter, collected);
		for (const filePath of collected) {
			const normalized = path.normalize(filePath);
			if (seen.has(normalized)) {
				continue;
			}
			seen.add(normalized);
			files.push(filePath);
		}
	}
	return files.sort((left, right) => toRepoRelative(left).localeCompare(toRepoRelative(right)));
}

// ─── Build include declarations from a header file ───────────────────────────

function resolveIncludePath(includingFilePath: string, includeName: string): string | undefined {
	const resolved = path.resolve(path.dirname(includingFilePath), includeName);
	if (fs.existsSync(resolved)) {
		return resolved;
	}
	const includeBaseName = path.basename(includeName).toLowerCase();
	const headerCandidates = getRepoFilesWithExtensions(['.h', '.4dh'])
		.filter(candidate => path.basename(candidate).toLowerCase() === includeBaseName);
	if (headerCandidates.length === 1) {
		return headerCandidates[0];
	}
	if (headerCandidates.length > 1) {
		const sameParentDir = path.dirname(includingFilePath).toLowerCase();
		const siblingMatch = headerCandidates.find(candidate => path.dirname(candidate).toLowerCase() === sameParentDir);
		if (siblingMatch) {
			return siblingMatch;
		}
		return headerCandidates.sort((left, right) => toRepoRelative(left).localeCompare(toRepoRelative(right)))[0];
	}
	return undefined;
}

function resolveIncludesForFile(filePath: string, text: string): string[] {
	const includes: string[] = [];
	const includeRegex = /#include\s+"([^"]+)"/g;
	let match: RegExpExecArray | null;
	while ((match = includeRegex.exec(text)) !== null) {
		const resolved = resolveIncludePath(filePath, match[1]);
		if (resolved) {
			includes.push(resolved);
		}
	}
	return includes;
}

function buildIncludeAnalysis(headerPath: string, visited = new Set<string>()): IncludeAnalysis {
	const normalizedPath = path.normalize(headerPath);
	if (!fs.existsSync(normalizedPath) || visited.has(normalizedPath)) {
		return { declarations: [], defineNames: new Set<string>(), functionReturnTypes: new Map<string, OverloadReturnType[]>() };
	}
	visited.add(normalizedPath);

	const text = fs.readFileSync(headerPath, 'utf-8');
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	const views = deriveViews(table.root);
	const decls: SymbolDeclaration[] = [];
	const defineNames = new Set<string>();
	const functionReturnTypes = new Map<string, OverloadReturnType[]>();
	const dummyRange = { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
	const sourceFile = path.basename(headerPath);

	for (const [name] of views.exportedVariables) {
		decls.push({ name, kind: 'variable', range: dummyRange, definedInFsPath: sourceFile });
	}
	for (const [name, dList] of views.exportedFunctions) {
		for (const d of dList) {
			const params: ParameterSymbolInfo[] = d.params?.map((p: ParameterSymbolInfo) => ({
				name: p.name,
				type: p.type,
				byRef: p.byRef ?? false,
				isArray: p.isArray ?? false,
			})) ?? [];
			decls.push({ name, kind: 'function', range: dummyRange, definedInFsPath: sourceFile, params });
			if (d.returnType) {
				const existing = functionReturnTypes.get(name) ?? [];
				existing.push({ paramCount: d.params?.length ?? 0, returnType: d.returnType });
				functionReturnTypes.set(name, existing);
			}
		}
	}
	for (const def of parseDefines(text, headerPath)) {
		defineNames.add(def.name);
	}

	for (const includeFile of resolveIncludesForFile(headerPath, text)) {
		const nested = buildIncludeAnalysis(includeFile, visited);
		decls.push(...nested.declarations);
		for (const defineName of nested.defineNames) {
			defineNames.add(defineName);
		}
		for (const [name, overloads] of nested.functionReturnTypes) {
			const existing = functionReturnTypes.get(name) ?? [];
			existing.push(...overloads);
			functionReturnTypes.set(name, existing);
		}
	}

	return { declarations: decls, defineNames, functionReturnTypes };
}

// ─── Build known symbols (prototypes + document + includes) ──────────────────

function buildKnownSymbols(
	text: string,
	includeAnalysis: IncludeAnalysis,
	prototypes: PrototypeService
): KnownSymbols {
	const knownSymbols: KnownSymbols = {
		functions: new Set<string>(),
		variables: new Set<string>(),
		defines: new Set<string>(),
	};

	// Prototypes
	for (const name of prototypes.getAllNames()) {
		knownSymbols.functions.add(name);
	}

	// Document symbols
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	const views = deriveViews(table.root);
	for (const fn of views.exportedFunctions.keys()) {
		knownSymbols.functions.add(fn);
	}
	for (const v of views.exportedVariables.keys()) {
		knownSymbols.variables.add(v);
	}

	// Document defines
	for (const def of table.defines) {
		knownSymbols.defines.add(def.name);
	}

	// Include file symbols
	for (const decl of includeAnalysis.declarations) {
		if (decl.kind === 'function') knownSymbols.functions.add(decl.name);
		else knownSymbols.variables.add(decl.name);
	}
	for (const defineName of includeAnalysis.defineNames) {
		knownSymbols.defines.add(defineName);
	}

	return knownSymbols;
}

// ─── Build function signatures for argument validation ───────────────────────

function buildFunctionSignatures(
	text: string,
	includeAnalysis: IncludeAnalysis,
	prototypes: PrototypeService
): FunctionSignatureMap {
	const signatures: FunctionSignatureMap = new Map();

	// Document functions
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	const views = deriveViews(table.root);
	for (const [name, dList] of views.allFunctions) {
		const overloads: ParameterSymbolInfo[][] = [];
		for (const d of dList) {
			overloads.push(d.params?.map((p: ParameterSymbolInfo) => ({
				name: p.name,
				type: p.type,
				byRef: p.byRef ?? false,
				isArray: p.isArray ?? false,
			})) ?? []);
		}
		signatures.set(name, overloads);
	}

	// Include declarations
	for (const decl of includeAnalysis.declarations) {
		if (decl.kind === 'function' && decl.params) {
			const existing = signatures.get(decl.name) ?? [];
			existing.push(decl.params);
			signatures.set(decl.name, existing);
		}
	}

	// Prototypes — merge with local/include overloads (don't skip)
	for (const name of prototypes.getAllNames()) {
		const overloads = prototypes.getPrototypes(name);
		for (const o of overloads) {
			const params = o.parameters.map(p => ({
				name: p.name,
				type: p.type,
				byRef: false,
				isArray: false,
			}));
			const existing = signatures.get(name);
			if (existing) {
				existing.push(params);
			} else {
				signatures.set(name, [params]);
			}
		}
	}

	return signatures;
}

// ─── Build function return types ─────────────────────────────────────────────

function buildFunctionReturnTypes(
	text: string,
	includeAnalysis: IncludeAnalysis,
	prototypes: PrototypeService
): Map<string, OverloadReturnType[]> {
	const returnTypes = new Map<string, OverloadReturnType[]>();

	const addOverload = (name: string, paramCount: number, returnType: string) => {
		const existing = returnTypes.get(name) ?? [];
		existing.push({ paramCount, returnType });
		returnTypes.set(name, existing);
	};

	// Prototypes
	for (const name of prototypes.getAllNames()) {
		const overloads = prototypes.getPrototypes(name);
		for (const overload of overloads) {
			addOverload(name, overload.parameters.length, overload.returnType);
		}
	}

	// Document functions
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	const views = deriveViews(table.root);
	for (const [name, dList] of views.allFunctions) {
		for (const decl of dList) {
			if (decl.returnType) {
				addOverload(name, decl.params?.length ?? 0, decl.returnType);
			}
		}
	}
	for (const [name, overloads] of includeAnalysis.functionReturnTypes) {
		if (!returnTypes.has(name)) {
			returnTypes.set(name, overloads);
		}
	}

	return returnTypes;
}

function flattenReturnTypes(overloadMap: Map<string, OverloadReturnType[]>): Map<string, string> {
	const result = new Map<string, string>();
	for (const [name, overloads] of overloadMap) {
		if (overloads.length > 0) {
			const nonVoid = overloads.find(o => o.returnType !== 'void');
			result.set(name, nonVoid ? nonVoid.returnType : overloads[0].returnType);
		}
	}
	return result;
}

// ─── Full validation pipeline ────────────────────────────────────────────────

function validateFile(filePath: string, prototypes: PrototypeService): Diagnostic[] {
	const text = fs.readFileSync(filePath, 'utf-8');
	const result = parse(text);
	const diagnostics: Diagnostic[] = [];
	const pushDiagnostics = (items: Array<{ severity?: number; range: any; message: string }>) => {
		for (const item of items) {
			diagnostics.push({
				severity: item.severity,
				range: item.range,
				message: item.message,
			});
		}
	};

	// Syntax errors
	for (const err of result.syntaxErrors) {
		diagnostics.push({
			severity: 1,
			range: {
				start: { line: err.line - 1, character: err.column },
				end: { line: err.line - 1, character: err.column + 1 },
			},
			message: `Syntax: ${err.message}`,
		});
	}

	// Deprecated calls (always)
	pushDiagnostics(validateDeprecatedCalls(result));

	// Semantic validation (only if no syntax errors)
	if (result.syntaxErrors.length === 0) {
		const includeAnalysis: IncludeAnalysis = {
			declarations: [],
			defineNames: new Set<string>(),
			functionReturnTypes: new Map<string, OverloadReturnType[]>(),
		};
		for (const includeFile of resolveIncludesForFile(filePath, text)) {
			const nested = buildIncludeAnalysis(includeFile);
			includeAnalysis.declarations.push(...nested.declarations);
			for (const defineName of nested.defineNames) {
				includeAnalysis.defineNames.add(defineName);
			}
			for (const [name, overloads] of nested.functionReturnTypes) {
				const existing = includeAnalysis.functionReturnTypes.get(name) ?? [];
				existing.push(...overloads);
				includeAnalysis.functionReturnTypes.set(name, existing);
			}
		}

		pushDiagnostics(validateVariableRedeclarations(result.tree, includeAnalysis.declarations, result.conditionalLines));
		pushDiagnostics(validateFunctionRedeclarations(result.tree, includeAnalysis.declarations, result.conditionalLines));

		const knownSymbols = buildKnownSymbols(text, includeAnalysis, prototypes);
		pushDiagnostics(validateUndeclaredIdentifiers(result.tree, knownSymbols, result.conditionalLines));

		const funcSigs = buildFunctionSignatures(text, includeAnalysis, prototypes);
		const funcRetTypes = buildFunctionReturnTypes(text, includeAnalysis, prototypes);
		const simpleRetTypes = flattenReturnTypes(funcRetTypes);
		pushDiagnostics(validateFunctionArguments(result.tree, funcSigs, simpleRetTypes));
		pushDiagnostics(validateVoidFunctionReturnValues(result.tree, funcRetTypes));
		pushDiagnostics(validateReturnStatements(result.tree));
		pushDiagnostics(validateArraySize(result.tree));
		pushDiagnostics(validateAssignmentTypes(result.tree));
	}

	return diagnostics;
}

// ─── Main ────────────────────────────────────────────────────────────────────

const { targetDirs, filter } = normalizeCliArgs(process.argv.slice(2));
const files = collect4dmFiles(targetDirs, filter);

const prototypes = new PrototypeService();
const severityLabel = (s: number) => s === 1 ? 'ERROR' : s === 2 ? 'WARNING' : s === 3 ? 'INFO' : `SEV${s}`;

let totalErrors = 0;
let totalWarnings = 0;
let totalFiles = 0;

for (const filePath of files) {
	const displayPath = toRepoRelative(filePath);
	const diagnostics = validateFile(filePath, prototypes);
	totalFiles++;

	const errors = diagnostics.filter(d => d.severity === 1);
	const warnings = diagnostics.filter(d => d.severity === 2);
	totalErrors += errors.length;
	totalWarnings += warnings.length;

	if (diagnostics.length === 0) {
		console.log(`✓ ${displayPath} — clean (0 diagnostics)`);
	} else {
		console.log(`\n▸ ${displayPath} — ${errors.length} error(s), ${warnings.length} warning(s)`);
		const sorted = [...diagnostics].sort((a, b) =>
			a.range.start.line - b.range.start.line || (a.severity ?? 999) - (b.severity ?? 999)
		);
		for (const d of sorted) {
			const line = d.range.start.line + 1;
			console.log(`    ${severityLabel(d.severity ?? 999)} line ${line}: ${d.message}`);
		}
	}
}

console.log(`\n${'═'.repeat(70)}`);
console.log(`TOTAL: ${totalFiles} files, ${totalErrors} errors, ${totalWarnings} warnings`);
console.log(`${'═'.repeat(70)}`);
