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
		const key = func.name;
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

			const primaryFunc = overloads[0];
			const overloadCount = overloads.length;

			const detailText = this.generateSignature(primaryFunc);
			const labelDetail: { detail: string } | undefined = overloadCount > 1 ? { detail: `+${overloadCount - 1} overloads` } : undefined;

			this.completionItems.push({
				label: primaryFunc.name,
				labelDetails: labelDetail,
				kind: CompletionItemKind.Function,
				detail: detailText,
				insertText: this.generateSnippet(primaryFunc),
				insertTextFormat: InsertTextFormat.Snippet,
				filterText: primaryFunc.name,
				data: { source: 'prototype', name: primaryFunc.name, id: primaryFunc.id }
			} as any);
		}
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

	generateOverloadDocumentation(overloads: FunctionData[]): string {
		if (overloads.length === 1) {
			return this.generateDocumentation(overloads[0]);
		}

		// Show all overload signatures in a single code block
		const signatures = overloads.map(f => {
			const params = f.parameters.map(p => `${p.type} ${p.name}`).join(', ');
			return `${f.returnType} ${f.name}(${params})`;
		});
		let doc = `\`\`\`12dpl\n${signatures.join('\n')}\n\`\`\`\n\n`;

		// Use the description from the first overload that has one
		const desc = overloads.find(f => f.description)?.description;
		doc += desc || 'No description available';

		doc += `\n\n**${overloads.length} overloads**`;
		return doc;
	}

	getCompletionItems(): CompletionItem[] {
		return this.completionItems;
	}

	getPrototype(name: string): FunctionData | undefined {
		return this.prototypes.get(name)?.[0];
	}

	getPrototypes(name: string): FunctionData[] {
		return this.prototypes.get(name) ?? [];
	}

	getPrototypeOverload(name: string, id: number): FunctionData | undefined {
		return this.prototypes.get(name)?.find(f => f.id === id);
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
