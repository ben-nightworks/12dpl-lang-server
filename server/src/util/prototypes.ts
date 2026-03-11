import * as fs from 'fs';
import * as path from 'path';
import { getModuleDir } from './moduleDir';
import { CompletionItem, CompletionItemKind, MarkupKind, InsertTextFormat } from 'vscode-languageserver/node';



interface FunctionData {
	name: string;
	id: number;
	returnType: string;
	parameters: Array<{ name: string; type: string }>;
	description: string;
}

class PrototypesLoader {
	private prototypes: Map<string, FunctionData[]> = new Map();
	private completionItems: CompletionItem[] = [];
	private loaded = false;

	/** Loads prototype metadata and builds completion items (idempotent). */
	async load(): Promise<void> {
		if (this.loaded) {
			return;
		}

		try {
			// Load PDF-enriched docs first (best descriptions), then merge in compiler list
			// to pick up missing functions/overloads that have no documentation.
			const moduleDir = getModuleDir();
			const enrichedPath = path.join(moduleDir, ".." ,'resources', 'functions.enriched.json');
			const compilerPath = path.join(moduleDir, "..", 'resources', 'functions.compiler.json');

			const baseByName = new Map<string, FunctionData>();
			if (fs.existsSync(enrichedPath)) {
				const jsonContent = fs.readFileSync(enrichedPath, 'utf-8');
				const functions: FunctionData[] = JSON.parse(jsonContent);
				for (const func of functions) {
					baseByName.set(func.name.toLowerCase(), func);
					this.addPrototype(func);
				}
			} else {
				console.error('Enriched functions JSON file not found:', enrichedPath);
			}

			// Load compiler function list to pick up overload variants and missing functions.
			if (fs.existsSync(compilerPath)) {
				const jsonContent = fs.readFileSync(compilerPath, 'utf-8');
				const functions: FunctionData[] = JSON.parse(jsonContent);
				for (const func of functions) {
					// Prefer richer description from the "complete" dataset when available.
					const base = baseByName.get(func.name.toLowerCase());
					const merged: FunctionData = {
						...func,
						description: (base?.description && base.description.trim().length > 0) ? base.description : func.description
					};
					this.addPrototype(merged);
				}
			} else {
				console.error('Compiler functions JSON file not found:', compilerPath);
			}

			this.rebuildCompletionItems();
			this.loaded = true;
			const total = Array.from(this.prototypes.values()).reduce((acc, arr) => acc + arr.length, 0);
			console.log(`Loaded ${total} prototypes (${this.prototypes.size} names)`);
		} catch (error) {
			console.error('Error loading prototypes:', error);
			this.loaded = true;
		}
	}

	private addPrototype(func: FunctionData): void {
		const key = func.name.toLowerCase();
		const existing = this.prototypes.get(key);
		if (!existing) {
			this.prototypes.set(key, [func]);
			return;
		}

		// De-dupe by numeric id if present/consistent.
		if (existing.some(f => f.id === func.id)) {
			return;
		}

		existing.push(func);
	}

	private rebuildCompletionItems(): void {
		this.completionItems = [];

		for (const [nameKey, overloads] of this.prototypes.entries()) {
			// Stable order: fewer params first, then by id.
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

	/** Renders Markdown documentation for hover/completion details. */
	public generateDocumentation(func: FunctionData): string {
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

	/** Returns cached completion items for builtin prototypes. */
	getCompletionItems(): CompletionItem[] {
		return this.completionItems;
	}

	/** Looks up a prototype by name (case-insensitive). */
	getPrototype(name: string): FunctionData | undefined {
		return this.prototypes.get(name.toLowerCase())?.[0];
	}

	getPrototypes(name: string): FunctionData[] {
		return this.prototypes.get(name.toLowerCase()) ?? [];
	}

	getPrototypeOverload(name: string, id: number): FunctionData | undefined {
		return this.prototypes.get(name.toLowerCase())?.find(f => f.id === id);
	}

	/** Convenience helper for just the signature line. */
	getPrototypeSignature(name: string): string | undefined {
		const func = this.getPrototype(name);
		if (!func) {
			return undefined;
		}
		return this.generateSignature(func);
	}

	/** Returns all prototype function names (lowercase). */
	getAllNames(): string[] {
		return Array.from(this.prototypes.keys());
	}
}

export const prototypesLoader = new PrototypesLoader();
