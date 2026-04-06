import * as fs from 'fs';
import * as path from 'path';

import {
	Connection,
	DidChangeWatchedFilesParams,
	FileChangeType,
	TextDocuments,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { DocumentService } from './documentService';
import { DiagnosticService } from './diagnosticService';
import { PrototypeService } from './prototypeService';
import { canonicalizeFsPath, fileUriToFsPath, fsPathToFileUri } from './includeUtils';
import { collectWorkspaceFiles } from './workspaceScan';

export class WorkspaceScanService {
	private cachedScanWorkspaceEnabled = false;
	private readonly workspaceDiagnosticPaths = new Set<string>();

	constructor(
		private readonly connection: Connection,
		private readonly documents: TextDocuments<TextDocument>,
		private readonly documentService: DocumentService,
		private readonly diagnosticService: DiagnosticService,
		private readonly prototypeService: PrototypeService,
		private readonly getIncludeDirs: (uri: string) => Promise<string[]>
	) {}

	async initialize(): Promise<void> {
		await this.refreshScanWorkspaceSetting();
		await this.scanWorkspace();
	}

	async handleConfigurationChanged(): Promise<void> {
		const wasEnabled = this.cachedScanWorkspaceEnabled;
		await this.refreshScanWorkspaceSetting();

		if (this.cachedScanWorkspaceEnabled) {
			if (!wasEnabled) {
				await this.scanWorkspace();
			}
			return;
		}

		if (!wasEnabled) return;

		for (const fsPath of this.workspaceDiagnosticPaths) {
			this.connection.sendDiagnostics({
				uri: fsPathToFileUri(fsPath),
				diagnostics: []
			});
		}
		this.workspaceDiagnosticPaths.clear();
	}

	isScanWorkspaceEnabledCached(): boolean {
		return this.cachedScanWorkspaceEnabled;
	}

	async handleDocumentClose(closedUri: string): Promise<void> {
		if (!this.cachedScanWorkspaceEnabled) {
			this.connection.sendDiagnostics({ uri: closedUri, diagnostics: [] });
			return;
		}

		const fsPath = fileUriToFsPath(closedUri);
		if (!fsPath) {
			this.connection.sendDiagnostics({ uri: closedUri, diagnostics: [] });
			return;
		}

		try {
			await this.validateAndPublishFsFile(fsPath);
		} catch {
			this.connection.sendDiagnostics({ uri: closedUri, diagnostics: [] });
		}
	}

	async handleWorkspaceFoldersChanged(): Promise<void> {
		this.connection.console.log('Workspace folder change event received.');
		await this.scanWorkspace();
	}

	async handleWatchedFilesChanged(params: DidChangeWatchedFilesParams): Promise<void> {
		if (!(await this.isWorkspaceScanEnabled())) return;

		for (const change of params.changes) {
			const changeFsPath = fileUriToFsPath(change.uri);
			if (!changeFsPath) continue;

			const ext = path.extname(changeFsPath).toLowerCase();

			if (ext === '.h') {
				const dependentUris = this.documentService.invalidateHeader(changeFsPath);
				for (const depUri of dependentUris) {
					const depFsPath = fileUriToFsPath(depUri);
					if (depFsPath) {
						await this.validateAndPublishFsFile(depFsPath).catch(() => {});
					}
				}
				continue;
			}

			if (ext !== '.4dm') continue;

			if (change.type === FileChangeType.Deleted) {
				this.connection.sendDiagnostics({ uri: change.uri, diagnostics: [] });
				this.workspaceDiagnosticPaths.delete(canonicalizeFsPath(changeFsPath));
			} else {
				await this.validateAndPublishFsFile(changeFsPath).catch(() => {});
			}
		}
	}

	async scanWorkspace(): Promise<void> {
		if (!(await this.isWorkspaceScanEnabled())) return;

		await this.prototypeService.ready;

		const folders = await this.connection.workspace.getWorkspaceFolders();
		if (!folders || folders.length === 0) return;

		this.connection.console.log('Scanning workspace for 12dPL files...');

		let totalFiles = 0;
		for (const folder of folders) {
			const folderPath = fileUriToFsPath(folder.uri);
			if (!folderPath) continue;

			const files = collectWorkspaceFiles(folderPath);
			totalFiles += files.length;

			const batchSize = 20;
			for (let i = 0; i < files.length; i += batchSize) {
				const batch = files.slice(i, i + batchSize);
				await Promise.all(batch.map(f => this.validateAndPublishFsFile(f).catch(() => {})));
				if (i + batchSize < files.length) {
					await new Promise(resolve => setTimeout(resolve, 10));
				}
			}
		}

		this.connection.console.log(`Workspace scan complete: ${totalFiles} file(s) checked.`);
	}

	private async refreshScanWorkspaceSetting(): Promise<void> {
		try {
			const cfg: any = await this.connection.workspace.getConfiguration({ section: '12dpl' });
			this.cachedScanWorkspaceEnabled = cfg?.scanWorkspace === true;
		} catch {
			this.cachedScanWorkspaceEnabled = false;
		}
	}

	private async isWorkspaceScanEnabled(): Promise<boolean> {
		await this.refreshScanWorkspaceSetting();
		return this.cachedScanWorkspaceEnabled;
	}

	private async validateAndPublishFsFile(fsPath: string): Promise<void> {
		const uri = fsPathToFileUri(fsPath);
		const openDoc = this.documents.get(uri);
		if (openDoc) return;

		let text: string;
		try {
			text = fs.readFileSync(fsPath, 'utf-8');
		} catch {
			this.connection.sendDiagnostics({ uri, diagnostics: [] });
			this.workspaceDiagnosticPaths.delete(canonicalizeFsPath(fsPath));
			return;
		}

		const includeDirs = await this.getIncludeDirs(uri);
		const diagnostics = await this.diagnosticService.validateFsFile(fsPath, text, includeDirs);
		this.connection.sendDiagnostics({ uri, diagnostics });
		this.workspaceDiagnosticPaths.add(canonicalizeFsPath(fsPath));
	}
}