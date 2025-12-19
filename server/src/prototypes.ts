import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { CompletionItem, CompletionItemKind, MarkupKind, InsertTextFormat } from 'vscode-languageserver/node';

function getModuleDir(): string {
	// In CommonJS, __dirname is available.
	if (typeof __dirname === 'string') {
		return __dirname;
	}

	// In ESM (e.g. Bun test running TS as ESM), compute from import.meta.url.
	// Use an indirect lookup so this file still parses in CommonJS.
	try {
		const importMetaUrl = new Function('return import.meta.url')() as string;
		if (typeof importMetaUrl === 'string' && importMetaUrl.length > 0) {
			return path.dirname(fileURLToPath(importMetaUrl));
		}
	} catch {
		// ignore
	}

	return process.cwd();
}

interface FunctionData {
	name: string;
	id: number;
	returnType: string;
	parameters: Array<{ name: string; type: string }>;
	description: string;
}

class PrototypesLoader {
	private prototypes: Map<string, FunctionData> = new Map();
	private completionItems: CompletionItem[] = [];
	private loaded = false;

	async load(): Promise<void> {
		if (this.loaded) {
			return;
		}

		try {
			// Try to load from JSON first (better quality data)
			const jsonPath = path.join(getModuleDir(), 'resources', '12dpl_complete_functions.json');
			if (fs.existsSync(jsonPath)) {
				const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
				const functions: FunctionData[] = JSON.parse(jsonContent);
				
				functions.forEach((func) => {
					const key = func.name.toLowerCase();
					this.prototypes.set(key, func);
					
					this.completionItems.push({
						label: func.name,
						kind: CompletionItemKind.Function,
						detail: this.generateSignature(func),
						insertText: this.generateSnippet(func),
						insertTextFormat: InsertTextFormat.Snippet,
						data: func.name
					});
				});

				this.loaded = true;
				console.log(`Loaded ${this.prototypes.size} prototypes from JSON`);
			} else {
				console.error('Prototypes JSON file not found');
				this.loaded = true;
			}
		} catch (error) {
			console.error('Error loading prototypes:', error);
			this.loaded = true;
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

	getCompletionItems(): CompletionItem[] {
		return this.completionItems;
	}

	getPrototype(name: string): FunctionData | undefined {
		return this.prototypes.get(name.toLowerCase());
	}

	getPrototypeSignature(name: string): string | undefined {
		const func = this.getPrototype(name);
		if (!func) {
			return undefined;
		}
		return this.generateSignature(func);
	}
}

export const prototypesLoader = new PrototypesLoader();
