/**
 * PrototypeService — indexes and provides access to built-in 12dPL function prototypes.
 *
 * Receives raw prototype data from the data layer and builds lookup indices
 * and completion items. Providers call `await prototypeService.ready` before
 * accessing data, eliminating race conditions.
 */

import { CompletionItem, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver/node';
import { loadPrototypes } from '../data/prototypes';
import type { FunctionData } from '../data/prototypes';

export type { FunctionData } from '../data/prototypes';

export class PrototypeService {
	/** Resolves when prototypes have finished loading. */
	readonly ready: Promise<void>;

	private prototypes: Map<string, FunctionData[]> = new Map();
	private completionItems: CompletionItem[] = [];

	constructor() {
		this.ready = this.init().catch((error) => {
			console.error(`Failed to load prototypes: ${error}`);
		});
	}

	private async init(): Promise<void> {
		const rawData = loadPrototypes();

		for (const func of rawData) {
			this.addPrototype(func);
		}

		this.rebuildCompletionItems();
		const total = Array.from(this.prototypes.values()).reduce((acc, arr) => acc + arr.length, 0);
		console.log(`Loaded ${total} prototypes (${this.prototypes.size} names)`);
	}

	private addPrototype(func: FunctionData): void {
		const key = func.name.toLowerCase();
		const existing = this.prototypes.get(key);
		if (!existing) {
			this.prototypes.set(key, [func]);
			return;
		}
		if (existing.some(f => f.id === func.id)) {
			return;
		}
		existing.push(func);
	}

	private rebuildCompletionItems(): void {
		this.completionItems = [];

		for (const [nameKey, overloads] of this.prototypes.entries()) {
			overloads.sort((a, b) => {
				const ap = a.parameters?.length ?? 0;
				const bp = b.parameters?.length ?? 0;
				if (ap !== bp) return ap - bp;
				return (a.id ?? 0) - (b.id ?? 0);
			});

			const isOverloaded = overloads.length > 1;
			for (const func of overloads) {
				const label = isOverloaded ? this.generateOverloadLabel(func) : func.name;
				const sortText = isOverloaded
					? `${nameKey} ${String(func.parameters?.length ?? 0).padStart(3, '0')} ${String(func.id ?? 0).padStart(6, '0')}`
					: nameKey;

				this.completionItems.push({
					label,
					kind: CompletionItemKind.Function,
					detail: this.generateSignature(func),
					insertText: this.generateSnippet(func),
					insertTextFormat: InsertTextFormat.Snippet,
					filterText: func.name,
					sortText,
					data: { source: 'prototype', name: func.name, id: func.id }
				});
			}
		}
	}

	private generateOverloadLabel(func: FunctionData): string {
		const params = func.parameters?.map(p => `${p.type} ${p.name}`.trim()).join(', ') ?? '';
		return `${func.name}(${params})`;
	}

	private generateSnippet(func: FunctionData): string {
		if (func.parameters.length === 0) {
			return `${func.name}()`;
		}
		const params = func.parameters.map((p, index) => `\${${index + 1}:${p.type} ${p.name}}`).join(', ');
		return `${func.name}(${params})`;
	}

	private generateSignature(func: FunctionData): string {
		const params = func.parameters.map(p => `${p.type} ${p.name}`).join(', ');
		return `${func.returnType} ${func.name}(${params})`;
	}

	generateDocumentation(func: FunctionData): string {
		const params = func.parameters.map(p => `${p.type} ${p.name}`).join(', ');
		const signature = `${func.returnType} ${func.name}(${params})`;

		let doc = `\`\`\`12dpl\n${signature}\n\`\`\`\n\n`;
		doc += func.description || 'No description available';

		if (func.parameters.length > 0) {
			doc += `\n\n**Parameters:**\n`;
			func.parameters.forEach((param) => {
				doc += `- \`${param.type}\` **${param.name}**\n`;
			});
		}

		return doc;
	}

	getCompletionItems(): CompletionItem[] {
		return this.completionItems;
	}

	getPrototype(name: string): FunctionData | undefined {
		return this.prototypes.get(name.toLowerCase())?.[0];
	}

	getPrototypes(name: string): FunctionData[] {
		return this.prototypes.get(name.toLowerCase()) ?? [];
	}

	getPrototypeOverload(name: string, id: number): FunctionData | undefined {
		return this.prototypes.get(name.toLowerCase())?.find(f => f.id === id);
	}

	getPrototypeSignature(name: string): string | undefined {
		const func = this.getPrototype(name);
		if (!func) {
			return undefined;
		}
		return this.generateSignature(func);
	}

	getAllNames(): string[] {
		return Array.from(this.prototypes.keys());
	}
}
