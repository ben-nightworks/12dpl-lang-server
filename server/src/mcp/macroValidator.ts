/**
 * MacroValidator — runs the language server's diagnostics on a macro outside
 * of an editor, then adds the knowledge-base gotcha rules.
 *
 * The services are built per call around a one-document store, so includes
 * are resolved from disk exactly as they are for an open editor tab.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { TextDocuments } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentService } from '../services/documentService';
import { IncludeService } from '../services/includeService';
import { DiagnosticService } from '../services/diagnosticService';
import type { PrototypeService } from '../services/prototypeService';
import { fsPathToFileUri } from '../services/includeUtils';
import { resolveIncludeDirs, resolveUserPath, type McpConfig } from './config';
import type { FunctionCatalog } from './functionCatalog';
import { checkGotchas } from './gotchaRules';

export type MacroSeverity = 'error' | 'warning' | 'info' | 'hint';

export interface MacroDiagnostic {
	/** 1-based. */
	line: number;
	/** 1-based. */
	column: number;
	severity: MacroSeverity;
	message: string;
	/** Gotcha rule id, or 'language-server'. */
	rule: string;
	/** Set when the finding is in an include file rather than the validated file. */
	file?: string | undefined;
	/** The source line the finding points at. */
	sourceLine?: string | undefined;
}

export interface ValidationResult {
	fsPath: string;
	includeFiles: string[];
	/** Include files inside the macro's folder, also checked with the gotcha rules. */
	checkedIncludes: string[];
	diagnostics: MacroDiagnostic[];
}

/** True when `file` is inside `folder` (at any depth). */
function isInside(file: string, folder: string): boolean {
	const rel = path.relative(folder, file);
	return rel.length > 0 && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function lineAt(lines: string[], line: number): string | undefined {
	const text = lines[line - 1];
	return text !== undefined && text.trim() ? text.trim() : undefined;
}

const LSP_SEVERITY: Record<number, MacroSeverity> = { 1: 'error', 2: 'warning', 3: 'info', 4: 'hint' };

/** Just enough of TextDocuments for the services: get() and all(). */
class SingleDocumentStore {
	constructor(private readonly doc: TextDocument) {}

	get(uri: string): TextDocument | undefined {
		return uri === this.doc.uri ? this.doc : undefined;
	}

	all(): TextDocument[] {
		return [this.doc];
	}
}

export class MacroValidator {
	constructor(
		private readonly config: McpConfig,
		private readonly prototypeService: PrototypeService,
		private readonly catalog: FunctionCatalog
	) {}

	/**
	 * Validates `code`, or the file at `filePath` when no code is given. When
	 * both are given, `code` is checked as if saved at `filePath`, so its
	 * relative #includes resolve.
	 *
	 * Include files inside the macro's folder (the project's own headers,
	 * where the processing logic usually lives) also get the gotcha rules.
	 * Their syntax and type errors are left to the compiler: checked on its
	 * own, a header lacks the declarations its sibling headers provide.
	 */
	async validate(input: { filePath?: string | undefined; code?: string | undefined }): Promise<ValidationResult> {
		if (input.code === undefined && !input.filePath) {
			throw new Error('Provide a file path, source code, or both.');
		}
		const fsPath = input.filePath
			? resolveUserPath(this.config, input.filePath)
			: path.join(this.config.workspaceFolder ?? process.cwd(), 'untitled_macro.4dm');
		const text = input.code ?? fs.readFileSync(fsPath, 'utf-8');

		const uri = fsPathToFileUri(fsPath);
		const documents = new SingleDocumentStore(TextDocument.create(uri, '12dpl', 1, text)) as unknown as TextDocuments<TextDocument>;
		const documentService = new DocumentService(documents);
		const includeDirs = resolveIncludeDirs(this.config, fsPath);
		const includeService = new IncludeService(documentService, documents, async () => includeDirs);
		const diagnosticService = new DiagnosticService(documentService, includeService, this.prototypeService);

		await this.catalog.ready();
		const lspDiagnostics = await diagnosticService.validate(uri);
		const includeFiles = await includeService.getIncludeFiles(uri);

		const lines = text.split(/\r?\n/);
		const diagnostics: MacroDiagnostic[] = lspDiagnostics.map(d => ({
			line: d.range.start.line + 1,
			column: d.range.start.character + 1,
			severity: LSP_SEVERITY[d.severity ?? 1] ?? 'error',
			message: this.withSuggestions(d.message),
			rule: 'language-server',
			sourceLine: lineAt(lines, d.range.start.line + 1),
		}));
		for (const g of checkGotchas(text)) {
			diagnostics.push({ line: g.line, column: g.column, severity: g.severity, message: g.message, rule: g.rule, sourceLine: lineAt(lines, g.line) });
		}

		const checkedIncludes = includeFiles.filter(f => isInside(f, path.dirname(fsPath)));
		for (const include of checkedIncludes) {
			let includeText: string;
			try {
				includeText = fs.readFileSync(include, 'utf-8');
			} catch {
				continue;
			}
			const includeLines = includeText.split(/\r?\n/);
			for (const g of checkGotchas(includeText)) {
				diagnostics.push({
					line: g.line, column: g.column, severity: g.severity, message: g.message, rule: g.rule,
					file: include, sourceLine: lineAt(includeLines, g.line),
				});
			}
		}

		const fileOrder = (d: MacroDiagnostic) => (d.file === undefined ? -1 : checkedIncludes.indexOf(d.file));
		diagnostics.sort((a, b) => fileOrder(a) - fileOrder(b) || a.line - b.line || a.column - b.column);

		return { fsPath, includeFiles, checkedIncludes, diagnostics };
	}

	private withSuggestions(message: string): string {
		const unknown = /^Function '([A-Za-z_]\w*)' is not declared$/.exec(message)?.[1];
		if (!unknown) return message;
		const suggestions = this.catalog.suggest(unknown, 5);
		const hint = suggestions.length > 0 ? ` Did you mean: ${suggestions.join(', ')}?` : '';
		return `${message} (not a 12dPL library function, and not defined in this file or its includes).${hint}`;
	}
}
