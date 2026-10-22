/**
 * KnowledgeBase — the 12dPL macro-writing knowledge served by the MCP server.
 *
 * Loads the bundled snapshot in `resources/knowledge/` (synced from the
 * MacroProgramming workspace by scripts/sync-mcp-knowledge.ts) plus any
 * folders listed in `12dpl.mcp.knowledgePaths`. Markdown is split into
 * heading-sized sections and indexed for BM25 search; `.4dm`/`.h` files in
 * knowledge folders become example macros.
 */

import * as fs from 'fs';
import * as path from 'path';

export type KnowledgeKind = 'guide' | 'doc';

export interface KnowledgeSection {
	id: string;
	docId: string;
	title: string;
	level: number;
	/** Ancestor heading titles, outermost first. */
	trail: string[];
	text: string;
}

export interface KnowledgeDoc {
	id: string;
	title: string;
	kind: KnowledgeKind;
	filePath: string;
	/** 'bundled', or the knowledge folder the file came from. */
	origin: string;
	text: string;
	sections: KnowledgeSection[];
}

export interface ExampleMacro {
	/** Path relative to its knowledge folder, forward slashes. */
	id: string;
	name: string;
	filePath: string;
	origin: string;
	description: string;
	text: string;
}

export interface SearchHit {
	section: KnowledgeSection;
	doc: KnowledgeDoc;
	score: number;
	snippet: string;
}

export interface Mention {
	sectionId: string;
	line: string;
}

export interface ExampleHit {
	example: ExampleMacro;
	score: number;
	matches: string[];
}

// ─── Tokenizing ─────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
	'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'has', 'her', 'was', 'one',
	'our', 'out', 'his', 'how', 'its', 'may', 'new', 'now', 'see', 'two', 'who', 'did', 'get', 'use',
	'with', 'this', 'that', 'from', 'they', 'will', 'into', 'than', 'then', 'them', 'when', 'what',
	'which', 'there', 'their', 'have', 'been', 'were', 'also', 'only', 'used', 'using', 'each',
	'does', 'should', 'would', 'could', 'must', 'more', 'some', 'such', 'these', 'those', 'other',
	'page', 'of', 'to', 'in', 'is', 'it', 'on', 'or', 'as', 'be', 'by', 'an', 'at', 'if', 'so', 'do',
]);

/** Lower-cased identifier/number tokens; `Create_model_box` also yields create/model/box. */
export function tokenize(text: string): string[] {
	const out: string[] = [];
	const re = /[A-Za-z_][A-Za-z0-9_]*|\d+/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text)) !== null) {
		const word = m[0].toLowerCase();
		if (word.length >= 2 && !STOP_WORDS.has(word)) out.push(word);
		if (word.includes('_')) {
			for (const part of word.split('_')) {
				if (part.length >= 2 && !STOP_WORDS.has(part)) out.push(part);
			}
		}
	}
	return out;
}

// ─── Markdown sectioning ────────────────────────────────────────────────────

const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const FENCE = /^\s*(```|~~~)/;
/** Numbered headings left in PDF-extracted docs, e.g. "5.61.10.6 Choice_Box". */
const MANUAL_HEADING = /^(\d+(?:\.\d+)+)\s+([A-Za-z_].{0,100})$/;

const SPLIT_BY_MANUAL_HEADINGS_ABOVE = 8000;
const MAX_SECTION_CHARS = 12000;
const PART_TARGET_CHARS = 8000;

interface RawSection {
	title: string;
	level: number;
	trail: string[];
	lines: string[];
}

function slugify(text: string): string {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'section';
}

function splitByMarkdownHeadings(text: string, docTitle: string): RawSection[] {
	const sections: RawSection[] = [];
	const stack: Array<{ title: string; level: number }> = [];
	let current: RawSection = { title: docTitle, level: 0, trail: [], lines: [] };
	let inFence = false;

	for (const line of text.split(/\r?\n/)) {
		if (FENCE.test(line)) inFence = !inFence;
		const heading = inFence ? null : HEADING.exec(line);
		if (heading) {
			sections.push(current);
			const level = (heading[1] ?? '').length;
			const title = (heading[2] ?? '').trim();
			while ((stack[stack.length - 1]?.level ?? 0) >= level) stack.pop();
			current = { title, level, trail: stack.map(s => s.title), lines: [line] };
			stack.push({ title, level });
		} else {
			current.lines.push(line);
		}
	}
	sections.push(current);
	return sections.filter(s => s.lines.join('\n').trim().length > 0);
}

/**
 * Fences are ignored here: some extracted docs wrap whole manual chapters in
 * one code fence, and code never starts a line with "5.38.1 Super ...".
 */
function splitByManualHeadings(section: RawSection): RawSection[] {
	const out: RawSection[] = [];
	const childTrail = [...section.trail, section.title];
	let current: RawSection = { ...section, lines: [] };

	for (const line of section.lines) {
		const manual = MANUAL_HEADING.exec(line.trim());
		if (manual && current.lines.length > 0) {
			out.push(current);
			current = { title: line.trim(), level: section.level + 1, trail: childTrail, lines: [line] };
		} else {
			current.lines.push(line);
		}
	}
	out.push(current);
	return out.filter(s => s.lines.join('\n').trim().length > 0);
}

function splitIntoParts(section: RawSection): RawSection[] {
	const parts: RawSection[] = [];
	let lines: string[] = [];
	let size = 0;
	const flush = () => {
		if (lines.length === 0) return;
		parts.push({ ...section, lines });
		lines = [];
		size = 0;
	};
	for (const line of section.lines) {
		// Prefer to break at a blank line once the part is big enough.
		if (size >= PART_TARGET_CHARS && (line.trim() === '' || size >= MAX_SECTION_CHARS)) flush();
		lines.push(line);
		size += line.length + 1;
	}
	flush();
	if (parts.length <= 1) return parts;
	return parts.map((p, i) => ({ ...p, title: `${section.title} (part ${i + 1} of ${parts.length})` }));
}

/** Splits a markdown document into addressable sections. */
export function sectionMarkdown(docId: string, docTitle: string, text: string): KnowledgeSection[] {
	const raw: RawSection[] = [];
	for (const section of splitByMarkdownHeadings(text, docTitle)) {
		const size = section.lines.join('\n').length;
		const pieces = size > SPLIT_BY_MANUAL_HEADINGS_ABOVE ? splitByManualHeadings(section) : [section];
		for (const piece of pieces) {
			const pieceSize = piece.lines.join('\n').length;
			raw.push(...(pieceSize > MAX_SECTION_CHARS ? splitIntoParts(piece) : [piece]));
		}
	}

	const used = new Set<string>();
	return raw.map(s => {
		let slug = slugify(s.title);
		if (used.has(slug)) {
			let n = 2;
			while (used.has(`${slug}-${n}`)) n++;
			slug = `${slug}-${n}`;
		}
		used.add(slug);
		return {
			id: `${docId}#${slug}`,
			docId,
			title: s.title,
			level: s.level,
			trail: s.trail,
			text: s.lines.join('\n').trim(),
		};
	});
}

// ─── Loading ────────────────────────────────────────────────────────────────

const MAX_FILES_PER_ROOT = 5000;
const MAX_FILE_BYTES = 3 * 1024 * 1024;

function docTitleFrom(text: string, fallback: string): string {
	for (const line of text.split(/\r?\n/, 40)) {
		const title = /^#\s+(.+)$/.exec(line)?.[1];
		if (title) return title.trim();
	}
	return fallback;
}

function makeDoc(id: string, kind: KnowledgeKind, filePath: string, origin: string): KnowledgeDoc | null {
	let text: string;
	try {
		if (fs.statSync(filePath).size > MAX_FILE_BYTES) return null;
		text = fs.readFileSync(filePath, 'utf-8');
	} catch {
		return null;
	}
	const title = docTitleFrom(text, path.basename(filePath, path.extname(filePath)));
	return { id, title, kind, filePath, origin, text, sections: sectionMarkdown(id, title, text) };
}

/** Pulls the "Brief description" (or first comment lines) from a macro header. */
export function describeExample(text: string): string {
	const lines = text.split(/\r?\n/, 80).map(l => l.trim());
	const comment = (l: string) => l.startsWith('//') ? l.replace(/^\/\/+\s?/, '').trim() : null;
	const isRule = (c: string) => /^[-=*_\s]*$/.test(c);

	const briefAt = lines.findIndex(l => /^\/\/\s*brief description/i.test(l));
	const start = briefAt >= 0 ? briefAt + 1 : 0;
	const collected: string[] = [];
	for (let i = start; i < lines.length && collected.length < 3; i++) {
		const c = comment(lines[i] ?? '');
		if (c === null) {
			if (collected.length > 0 || briefAt >= 0) break;
			continue;
		}
		if (isRule(c)) {
			if (collected.length > 0) break;
			continue;
		}
		if (briefAt < 0 && /^(programmer|date|4d model|12d model|version|macro name|type)\b/i.test(c)) continue;
		collected.push(c);
	}
	return collected.join(' ').slice(0, 300);
}

function makeExample(id: string, filePath: string, origin: string): ExampleMacro | null {
	let text: string;
	try {
		if (fs.statSync(filePath).size > MAX_FILE_BYTES) return null;
		text = fs.readFileSync(filePath, 'utf-8');
	} catch {
		return null;
	}
	return { id, name: path.basename(filePath), filePath, origin, description: describeExample(text), text };
}

function walkFiles(root: string, visit: (fullPath: string, relPath: string) => void): void {
	let count = 0;
	const walk = (dir: string) => {
		let entries: fs.Dirent[];
		try {
			entries = fs.readdirSync(dir, { withFileTypes: true });
		} catch {
			return;
		}
		// A nested JavaScript project (e.g. a copy of this extension) is not macro knowledge.
		if (dir !== root && entries.some(e => e.isFile() && e.name === 'package.json')) return;
		for (const entry of entries) {
			if (count >= MAX_FILES_PER_ROOT) return;
			if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walk(full);
			} else if (entry.isFile()) {
				count++;
				visit(full, path.relative(root, full).replace(/\\/g, '/'));
			}
		}
	};
	walk(root);
}

function loadBundled(root: string, docs: Map<string, KnowledgeDoc>, examples: Map<string, ExampleMacro>): void {
	for (const [folder, kind] of [['guide', 'guide'], ['docs', 'doc']] as const) {
		const dir = path.join(root, folder);
		if (!fs.existsSync(dir)) continue;
		for (const file of fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.md')).sort()) {
			const id = `${folder}/${file.replace(/\.md$/i, '')}`;
			const doc = makeDoc(id, kind, path.join(dir, file), 'bundled');
			if (doc) docs.set(id, doc);
		}
	}
	const examplesDir = path.join(root, 'examples');
	if (fs.existsSync(examplesDir)) {
		walkFiles(examplesDir, (full, rel) => {
			if (!/\.(4dm|h)$/i.test(rel)) return;
			const example = makeExample(rel, full, 'bundled');
			if (example) examples.set(rel.toLowerCase(), example);
		});
	}
}

/**
 * Loads a MacroProgramming-style folder: CLAUDE.md and the create-macro skill
 * override the bundled guides, docs/*.md override bundled docs, any other
 * markdown is added as a doc, and .4dm/.h files become examples.
 */
function loadFolder(root: string, docs: Map<string, KnowledgeDoc>, examples: Map<string, ExampleMacro>): void {
	const guides: Array<[string, string]> = [
		['CLAUDE.md', 'guide/instructions'],
		['.github/skills/create-macro/SKILL.md', 'guide/create-macro'],
	];
	for (const [rel, id] of guides) {
		const full = path.join(root, rel);
		if (!fs.existsSync(full)) continue;
		const doc = makeDoc(id, 'guide', full, root);
		if (doc) docs.set(id, doc);
	}

	walkFiles(root, (full, rel) => {
		if (/\.md$/i.test(rel)) {
			if (rel === 'CLAUDE.md') return;
			const id = rel.replace(/\.md$/i, '');
			const doc = makeDoc(id, 'doc', full, root);
			if (doc) docs.set(id, doc);
		} else if (/\.(4dm|h)$/i.test(rel)) {
			const example = makeExample(rel, full, root);
			if (example) examples.set(rel.toLowerCase(), example);
		}
	});
}

// ─── KnowledgeBase ──────────────────────────────────────────────────────────

const BM25_K1 = 1.2;
const BM25_B = 0.75;
const TITLE_WEIGHT = 3;
const GUIDE_BOOST = 1.25;

/** Docs whose lines are quoted as notes next to function signatures. */
const CURATED_DOC_IDS = ['guide/instructions', 'guide/create-macro', 'docs/reference', 'docs/conventions'];
/** Folder trees and doc index rows mention functions without saying anything about them. */
const NOT_A_NOTE = /[│├└]|docs\/[\w-]+\.md/;

export interface GuideSelection {
	section: KnowledgeSection;
	text: string;
}

export class KnowledgeBase {
	readonly docs: KnowledgeDoc[];
	readonly examples: ExampleMacro[];

	private readonly docsById = new Map<string, KnowledgeDoc>();
	private readonly sections: KnowledgeSection[] = [];
	private readonly sectionDocs: KnowledgeDoc[] = [];
	private readonly sectionsById = new Map<string, KnowledgeSection>();
	private readonly postings = new Map<string, Array<[number, number]>>();
	private readonly sectionLengths: number[] = [];
	private averageLength = 1;

	constructor(docs: KnowledgeDoc[], examples: ExampleMacro[]) {
		this.docs = [...docs].sort((a, b) => (a.kind === b.kind ? a.id.localeCompare(b.id) : a.kind === 'guide' ? -1 : 1));
		this.examples = [...examples].sort((a, b) => a.id.localeCompare(b.id));
		for (const doc of this.docs) {
			this.docsById.set(doc.id.toLowerCase(), doc);
			for (const section of doc.sections) {
				this.sections.push(section);
				this.sectionDocs.push(doc);
				this.sectionsById.set(section.id.toLowerCase(), section);
			}
		}
		this.buildIndex();
	}

	private buildIndex(): void {
		let total = 0;
		this.sections.forEach((section, index) => {
			const tf = new Map<string, number>();
			for (const t of tokenize(section.title)) tf.set(t, (tf.get(t) ?? 0) + TITLE_WEIGHT);
			for (const t of tokenize(section.text)) tf.set(t, (tf.get(t) ?? 0) + 1);
			let length = 0;
			for (const [term, count] of tf) {
				length += count;
				let list = this.postings.get(term);
				if (!list) {
					list = [];
					this.postings.set(term, list);
				}
				list.push([index, count]);
			}
			this.sectionLengths.push(length);
			total += length;
		});
		this.averageLength = this.sections.length > 0 ? total / this.sections.length : 1;
	}

	get sectionCount(): number {
		return this.sections.length;
	}

	getDoc(id: string): KnowledgeDoc | undefined {
		const key = id.trim().replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase();
		return this.docsById.get(key)
			?? this.docsById.get(`docs/${key}`)
			?? this.docsById.get(`guide/${key}`);
	}

	getSection(id: string): KnowledgeSection | undefined {
		const [docPart = '', anchor] = id.split('#');
		const doc = this.getDoc(docPart);
		if (!doc || anchor === undefined) return undefined;
		return this.sectionsById.get(`${doc.id}#${anchor}`.toLowerCase());
	}

	/** Closest doc/section ids for an unknown id. */
	suggestIds(id: string, limit = 8): string[] {
		const terms = tokenize(id);
		if (terms.length === 0) return this.docs.slice(0, limit).map(d => d.id);
		return this.search(terms.join(' '), { limit }).map(h => h.section.id);
	}

	search(query: string, options: { limit?: number | undefined; kind?: KnowledgeKind | undefined; docId?: string | undefined } = {}): SearchHit[] {
		const limit = options.limit ?? 10;
		const terms = Array.from(new Set(tokenize(query)));
		if (terms.length === 0) return [];
		const docFilter = options.docId ? this.getDoc(options.docId)?.id : undefined;
		const n = this.sections.length;
		const scores = new Map<number, number>();

		for (const term of terms) {
			const list = this.postings.get(term);
			if (!list) continue;
			const idf = Math.log(1 + (n - list.length + 0.5) / (list.length + 0.5));
			for (const [index, tf] of list) {
				const length = this.sectionLengths[index] ?? this.averageLength;
				const norm = tf * (BM25_K1 + 1) / (tf + BM25_K1 * (1 - BM25_B + BM25_B * length / this.averageLength));
				scores.set(index, (scores.get(index) ?? 0) + idf * norm);
			}
		}

		const phrase = query.trim().toLowerCase();
		const hits: SearchHit[] = [];
		for (const [index, base] of scores) {
			const doc = this.sectionDocs[index];
			const section = this.sections[index];
			if (!doc || !section) continue;
			if (options.kind && doc.kind !== options.kind) continue;
			if (docFilter && doc.id !== docFilter) continue;
			let score = base;
			if (phrase.length > 3 && section.text.toLowerCase().includes(phrase)) score += 2;
			if (doc.kind === 'guide') score *= GUIDE_BOOST;
			hits.push({ section, doc, score, snippet: '' });
		}
		hits.sort((a, b) => b.score - a.score);
		const top = hits.slice(0, limit);
		for (const hit of top) hit.snippet = this.snippet(hit.section.text, terms);
		return top;
	}

	private snippet(text: string, terms: string[]): string {
		const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
		let best = '';
		let bestScore = 0;
		for (const line of lines) {
			if (HEADING.test(line)) continue;
			const tokens = new Set(tokenize(line));
			const score = terms.reduce((acc, t) => acc + (tokens.has(t) ? 1 : 0), 0);
			if (score > bestScore) {
				best = line;
				bestScore = score;
			}
		}
		if (!best) best = lines.find(l => !HEADING.test(l)) ?? '';
		return best.length > 240 ? `${best.slice(0, 237)}...` : best;
	}

	/** Lines in the curated guides that mention `identifier` as a whole word. */
	findMentions(identifier: string, limit = 12): Mention[] {
		const word = new RegExp(`(^|[^A-Za-z0-9_])${identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z0-9_]|$)`);
		const mentions: Mention[] = [];
		const seen = new Set<string>();
		for (const docId of CURATED_DOC_IDS) {
			const doc = this.docsById.get(docId);
			if (!doc) continue;
			for (const section of doc.sections) {
				for (const raw of section.text.split('\n')) {
					// Drop list markers so quoted lines read cleanly as bullets.
					const line = raw.trim().replace(/^(?:[-*+]|\d+\.)\s+/, '');
					if (!line || HEADING.test(line) || !word.test(line) || NOT_A_NOTE.test(line)) continue;
					const key = line.toLowerCase();
					if (seen.has(key)) continue;
					seen.add(key);
					mentions.push({ sectionId: section.id, line: line.length > 400 ? `${line.slice(0, 397)}...` : line });
					if (mentions.length >= limit) return mentions;
				}
			}
		}
		return mentions;
	}

	/**
	 * Returns the subtree under every guide heading that matches one of
	 * `headings`, ignoring case and punctuation. A trailing `*` makes the
	 * pattern a prefix match.
	 */
	selectGuideSections(headings: string[], docIds = ['guide/instructions', 'guide/create-macro']): GuideSelection[] {
		const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
		const included = new Set<string>();
		const selections: GuideSelection[] = [];

		for (const heading of headings) {
			const prefix = heading.endsWith('*');
			const wanted = normalize(heading);
			const matches = (title: string) => (prefix ? normalize(title).startsWith(wanted) : normalize(title) === wanted);
			for (const docId of docIds) {
				const doc = this.docsById.get(docId);
				if (!doc) continue;
				doc.sections.forEach((section, i) => {
					if (included.has(section.id) || !matches(section.title)) return;
					const parts = [section.text];
					included.add(section.id);
					for (const child of doc.sections.slice(i + 1)) {
						if (child.level <= section.level) break;
						parts.push(child.text);
						included.add(child.id);
					}
					selections.push({ section, text: parts.join('\n\n') });
				});
			}
		}
		return selections;
	}

	findExamples(query: string | undefined, limit = 25): ExampleHit[] {
		if (!query || !query.trim()) {
			return this.examples.slice(0, limit).map(example => ({ example, score: 0, matches: [] }));
		}
		const terms = Array.from(new Set(tokenize(query)));
		const raw = query.split(/\s+/).map(w => w.replace(/[^A-Za-z0-9_]/g, '').toLowerCase()).filter(w => w.length >= 2);
		const hits: ExampleHit[] = [];

		for (const example of this.examples) {
			const nameTokens = new Set(tokenize(example.id));
			const descTokens = new Set(tokenize(example.description));
			const lower = example.text.toLowerCase();
			let score = 0;
			for (const t of terms) {
				if (nameTokens.has(t)) score += 3;
				if (descTokens.has(t)) score += 2;
			}
			for (const w of raw) {
				let count = 0;
				let at = lower.indexOf(w);
				while (at >= 0 && count < 50) {
					count++;
					at = lower.indexOf(w, at + w.length);
				}
				if (count > 0) score += 1 + Math.log(count);
			}
			if (score <= 0) continue;

			const matches: string[] = [];
			for (const line of example.text.split(/\r?\n/)) {
				const l = line.toLowerCase();
				if (raw.some(w => l.includes(w))) {
					matches.push(line.trim().slice(0, 160));
					if (matches.length >= 3) break;
				}
			}
			hits.push({ example, score, matches });
		}
		return hits.sort((a, b) => b.score - a.score).slice(0, limit);
	}

	getExample(name: string): ExampleMacro | undefined {
		const key = name.trim().replace(/\\/g, '/').toLowerCase();
		const byId = this.examples.find(e => e.id.toLowerCase() === key);
		if (byId) return byId;
		const base = key.split('/').pop() ?? key;
		return this.examples.find(e => e.name.toLowerCase() === base)
			?? this.examples.find(e => e.name.toLowerCase().replace(/\.(4dm|h)$/i, '') === base.replace(/\.(4dm|h)$/i, ''));
	}
}

export function loadKnowledgeBase(options: { bundledRoot?: string; extraRoots?: string[] }): KnowledgeBase {
	const docs = new Map<string, KnowledgeDoc>();
	const examples = new Map<string, ExampleMacro>();
	if (options.bundledRoot && fs.existsSync(options.bundledRoot)) {
		loadBundled(options.bundledRoot, docs, examples);
	}
	for (const root of options.extraRoots ?? []) {
		if (fs.existsSync(root) && fs.statSync(root).isDirectory()) {
			loadFolder(root, docs, examples);
		} else {
			console.error(`12dPL MCP: knowledge folder not found: ${root}`);
		}
	}
	return new KnowledgeBase(Array.from(docs.values()), Array.from(examples.values()));
}

/** Cuts `text` at a line boundary so one response stays under `maxChars`. */
export function paginate(text: string, offset: number, maxChars: number): { chunk: string; nextOffset?: number } {
	const start = Math.max(0, Math.min(offset, text.length));
	if (text.length - start <= maxChars) return { chunk: text.slice(start) };
	let end = text.lastIndexOf('\n', start + maxChars);
	if (end <= start) end = start + maxChars;
	return { chunk: text.slice(start, end), nextOffset: end + 1 };
}
