/**
 * Drift-detection for built-in type coverage (issue #103).
 *
 * Compares every type referenced in functions.compiler.json against:
 *   1. The type lists declared in the ANTLR grammar (server/src/proglang12d.g4)
 *   2. The "storage.type.built-in.12dpl" regex in syntax/12dpl.tmLanguage.json
 *   3. typeDocumentation.json
 *
 * If a new type is added to the compiler manifest but missing from any of
 * these three places, the test fails with the list of missing names —
 * preventing the kind of silent drift that produced #103.
 */

import { describe, expect, test } from 'bun:test';
import * as path from 'path';
import * as fs from 'fs';

interface CompilerFunction {
	name: string;
	returnType: string;
	parameters: Array<{ name: string; type: string }>;
}

const repoRoot = path.resolve(__dirname, '..');
const grammarPath = path.join(repoRoot, 'server', 'src', 'proglang12d.g4');
const tmLangPath = path.join(repoRoot, 'syntax', '12dpl.tmLanguage.json');
const typeDocsPath = path.join(repoRoot, 'server', 'src', 'resources', 'typeDocumentation.json');
const compilerJsonPath = path.join(repoRoot, 'server', 'src', 'resources', 'functions.compiler.json');

/**
 * Strips array (`X[]`) and reference (`X&`) suffixes, splits generic
 * containers (`Set<X>` → `Set`, `X`) so every nested type surfaces.
 */
function normalizeType(t: string): string[] {
	if (!t) return [];
	let s = t.trim().replace(/\[\]$/, '').replace(/&$/, '').trim();
	const generic = /^([A-Za-z_][A-Za-z0-9_]*)<(.+)>$/.exec(s);
	if (generic) return [generic[1], ...generic[2].split(',').flatMap(p => normalizeType(p))];
	return [s];
}

/** Pulls every quoted token from any `builtIn…TypeSpecifier` rule. */
function readGrammarBuiltInTypes(): Set<string> {
	const grammar = fs.readFileSync(grammarPath, 'utf-8');
	const types = new Set<string>(['void', 'Text', 'Integer', 'Real']);
	const ruleRe = /builtIn\w*TypeSpecifier[\s\S]*?;/g;
	let match: RegExpExecArray | null;
	while ((match = ruleRe.exec(grammar)) !== null) {
		const tokRe = /'([A-Z][A-Za-z0-9_]+)'/g;
		let m: RegExpExecArray | null;
		while ((m = tokRe.exec(match[0])) !== null) types.add(m[1]);
	}
	return types;
}

/** Pulls every name from any `storage.type.built-in.…12dpl` rule. */
function readTmLanguageBuiltInTypes(): Set<string> {
	const tm = JSON.parse(fs.readFileSync(tmLangPath, 'utf-8'));
	const types = new Set<string>(['void', 'Text', 'Integer', 'Real']);

	const visit = (node: any): void => {
		if (!node || typeof node !== 'object') return;
		const isBuiltInTypeRule =
			typeof node.name === 'string' &&
			node.name.startsWith('storage.type.built-in.') &&
			node.name.endsWith('.12dpl') &&
			typeof node.match === 'string';
		if (isBuiltInTypeRule) {
			// Pull every CapWord token out of the match regex.
			const tokRe = /[A-Z][A-Za-z0-9_]+/g;
			let m: RegExpExecArray | null;
			while ((m = tokRe.exec(node.match)) !== null) {
				if (m[0] === 'mix') continue; // skip "(?-mix:" prefix artefact
				types.add(m[0]);
			}
		}
		for (const key of Object.keys(node)) visit(node[key]);
	};
	visit(tm);
	return types;
}

function readTypeDocumentationKeys(): Set<string> {
	const docs = JSON.parse(fs.readFileSync(typeDocsPath, 'utf-8')) as Record<string, string>;
	return new Set(Object.keys(docs));
}

function readCompilerReferencedTypes(): Set<string> {
	const data = JSON.parse(fs.readFileSync(compilerJsonPath, 'utf-8')) as CompilerFunction[];
	const refs = new Set<string>();
	for (const fn of data) {
		for (const t of normalizeType(fn.returnType ?? '')) if (t) refs.add(t);
		for (const p of fn.parameters ?? []) {
			for (const t of normalizeType(p.type ?? '')) if (t) refs.add(t);
		}
	}
	// Filter to capitalised identifiers — these are the types worth checking.
	return new Set([...refs].filter(t => /^[A-Z][A-Za-z0-9_]*$/.test(t)));
}

const compilerTypes = readCompilerReferencedTypes();
const grammarTypes = readGrammarBuiltInTypes();
const tmLangTypes = readTmLanguageBuiltInTypes();
const docTypes = readTypeDocumentationKeys();

function diff(referenced: Set<string>, declared: Set<string>): string[] {
	const missing: string[] = [];
	for (const t of referenced) if (!declared.has(t)) missing.push(t);
	return missing.sort();
}

describe('built-in type coverage (issue #103 drift detection)', () => {
	test('every compiler-referenced type is declared in proglang12d.g4', () => {
		const missing = diff(compilerTypes, grammarTypes);
		expect(missing,
			`Types referenced in functions.compiler.json but missing from proglang12d.g4: ${missing.join(', ')}`
		).toEqual([]);
	});

	test('every compiler-referenced type is declared in 12dpl.tmLanguage.json', () => {
		const missing = diff(compilerTypes, tmLangTypes);
		expect(missing,
			`Types referenced in functions.compiler.json but missing from 12dpl.tmLanguage.json: ${missing.join(', ')}`
		).toEqual([]);
	});

	test('every compiler-referenced type has an entry in typeDocumentation.json', () => {
		const missing = diff(compilerTypes, docTypes);
		expect(missing,
			`Types referenced in functions.compiler.json but missing from typeDocumentation.json: ${missing.join(', ')}`
		).toEqual([]);
	});

	test('the 6 issue-#103 types are all present everywhere', () => {
		for (const t of ['Hydro_Box', 'Weight_Box', 'Chain_Parameters', 'Macro_Handle', 'View_Draw', 'User_Input_Replay']) {
			expect(grammarTypes.has(t), `${t} missing from proglang12d.g4`).toBe(true);
			expect(tmLangTypes.has(t), `${t} missing from 12dpl.tmLanguage.json`).toBe(true);
			expect(docTypes.has(t), `${t} missing from typeDocumentation.json`).toBe(true);
		}
	});
});
