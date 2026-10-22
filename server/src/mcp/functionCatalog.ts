/**
 * FunctionCatalog — built-in 12dPL library lookup for the MCP server.
 *
 * Wraps the language server's PrototypeService (the same signatures used
 * for completion and validation) and attaches notes from the curated macro
 * knowledge base, so a lookup returns both the signature and the gotchas.
 */

import type { FunctionData, PrototypeService } from '../services/prototypeService';
import { tokenize, type KnowledgeBase, type Mention } from './knowledgeBase';

export interface FunctionLookup {
	name: string;
	overloads: FunctionData[];
	description: string;
	/** One entry per distinct overload description, in overload order. */
	overloadDescriptions: Array<{ overload: FunctionData; description: string }>;
	notes: Mention[];
}

export interface FunctionSearchHit {
	name: string;
	signature: string;
	overloadCount: number;
	summary: string;
	score: number;
}

/** compiler.json carries placeholder descriptions such as "12dPL function X". */
function realDescription(description: string | undefined): string {
	const d = (description ?? '').trim();
	return /^12dPL function \S+$/.test(d) ? '' : d;
}

export function formatSignature(func: FunctionData): string {
	const params = func.parameters.map(p => `${p.type} ${p.name}`).join(', ');
	return `${func.returnType} ${func.name}(${params})`;
}

function firstSentence(text: string, max = 200): string {
	const sentence = text.split(/(?<=\.)\s/)[0] ?? text;
	return sentence.length > max ? `${sentence.slice(0, max - 3)}...` : sentence;
}

function editDistance(a: string, b: string, cap: number): number {
	if (Math.abs(a.length - b.length) > cap) return cap + 1;
	let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
	for (let i = 1; i <= a.length; i++) {
		const cur = [i];
		let rowMin = i;
		for (let j = 1; j <= b.length; j++) {
			const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
			const value = Math.min((prev[j] ?? 0) + 1, (cur[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
			cur.push(value);
			rowMin = Math.min(rowMin, value);
		}
		if (rowMin > cap) return cap + 1;
		prev = cur;
	}
	return prev[b.length] ?? cap + 1;
}

export class FunctionCatalog {
	private names: string[] = [];
	private readonly byLowerName = new Map<string, string>();
	private readonly descriptions = new Map<string, string>();

	constructor(
		private readonly prototypes: PrototypeService,
		private readonly knowledge: KnowledgeBase
	) {}

	async ready(): Promise<void> {
		await this.prototypes.ready;
		if (this.names.length > 0) return;
		// Names like __Drainage_000001__ are internal entry points, not callable API.
		this.names = this.prototypes.getAllNames().filter(n => !n.startsWith('__')).sort();
		for (const name of this.names) {
			this.byLowerName.set(name.toLowerCase(), name);
			const desc = this.prototypes.getPrototypes(name).map(f => realDescription(f.description)).find(d => d.length > 0);
			this.descriptions.set(name, desc ?? '');
		}
	}

	get size(): number {
		return this.names.length;
	}

	has(name: string): boolean {
		return this.byLowerName.get(name.toLowerCase()) === name;
	}

	/** Exact name first, then a case-insensitive match. */
	resolveName(name: string): string | undefined {
		return this.byLowerName.get(name.trim().toLowerCase());
	}

	lookup(name: string): FunctionLookup | undefined {
		const resolved = this.resolveName(name);
		if (!resolved) return undefined;
		// The enriched overloads keep `&` on reference parameters; the
		// compiler-only overloads do not, so list enriched ones first.
		const overloads = [...this.prototypes.getPrototypes(resolved)].sort((a, b) => {
			const ar = a.parameters.some(p => p.type.includes('&') || p.name.startsWith('&')) ? 0 : 1;
			const br = b.parameters.some(p => p.type.includes('&') || p.name.startsWith('&')) ? 0 : 1;
			return a.parameters.length - b.parameters.length || ar - br || a.id - b.id;
		});
		const overloadDescriptions: FunctionLookup['overloadDescriptions'] = [];
		const seen = new Set<string>();
		for (const overload of overloads) {
			// A compiler-only overload's description is borrowed from another overload.
			if (overload.source === 'compiler') continue;
			const description = realDescription(overload.description);
			if (!description || seen.has(description)) continue;
			seen.add(description);
			overloadDescriptions.push({ overload, description: firstSentence(description, 300) });
		}
		return {
			name: resolved,
			overloads,
			description: this.descriptions.get(resolved) ?? '',
			overloadDescriptions,
			notes: this.knowledge.findMentions(resolved),
		};
	}

	/** Close spellings for a name that is not a built-in function. */
	suggest(name: string, limit = 6): string[] {
		const lower = name.toLowerCase();
		const tokens = lower.split('_').filter(t => t.length >= 2);
		const scored: Array<[string, number]> = [];
		for (const candidate of this.names) {
			const c = candidate.toLowerCase();
			const distance = editDistance(lower, c, 3);
			let score = distance <= 3 ? 10 - distance * 2 : 0;
			if (tokens.length > 0) {
				const cTokens = new Set(c.split('_'));
				const shared = tokens.filter(t => cTokens.has(t)).length;
				score += shared * 2 - Math.abs(cTokens.size - tokens.length) * 0.5;
			}
			if (score > 2) scored.push([candidate, score]);
		}
		return scored.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([n]) => n);
	}

	search(query: string, limit = 25): FunctionSearchHit[] {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		const terms = Array.from(new Set(tokenize(query)));
		const hits: FunctionSearchHit[] = [];

		for (const name of this.names) {
			const lower = name.toLowerCase();
			const nameTokens = new Set(lower.split('_'));
			const description = this.descriptions.get(name) ?? '';
			const descLower = description.toLowerCase();
			let score = 0;
			if (lower === q) score += 100;
			else if (lower.startsWith(q)) score += 60;
			else if (lower.includes(q)) score += 40;
			let nameMatches = 0;
			for (const t of terms) {
				if (nameTokens.has(t)) {
					score += 12;
					nameMatches++;
				} else if (lower.includes(t)) {
					score += 6;
					nameMatches++;
				} else if (descLower.includes(t)) {
					score += 2;
				}
			}
			if (terms.length > 1 && nameMatches === terms.length) score += 10;
			if (score <= 0) continue;

			const overloads = this.prototypes.getPrototypes(name);
			const first = overloads[0];
			if (!first) continue;
			hits.push({
				name,
				signature: formatSignature(first),
				overloadCount: overloads.length,
				summary: firstSentence(description),
				score,
			});
		}
		return hits.sort((a, b) => b.score - a.score || a.name.length - b.name.length).slice(0, limit);
	}
}
