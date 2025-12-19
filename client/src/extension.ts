/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import * as cp from 'child_process';
import * as fs from 'fs';
import {
	commands,
	ExtensionContext,
	StatusBarAlignment,
	StatusBarItem,
	TextEdit,
	window,
	workspace
} from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

type CompilerInfo = {
	versionLine?: string;
};

async function getCompilerInfo(compilerExe: string): Promise<CompilerInfo> {
	return new Promise((resolve) => {
		const child = cp.spawn(compilerExe, ['?'], {
			cwd: path.dirname(compilerExe),
			windowsHide: true
		});

		let combined = '';
		const onData = (data: unknown) => {
			combined += String(data);
		};
		child.stdout.on('data', onData);
		child.stderr.on('data', onData);

		const timeout = setTimeout(() => {
			try {
				child.kill();
			} catch {
				// ignore
			}
			resolve({});
		}, 1500);

		child.on('error', () => {
			clearTimeout(timeout);
			resolve({});
		});
		child.on('close', () => {
			clearTimeout(timeout);
			const versionMatch = combined.match(/^\s*Version\s*:\s*(.+)$/mi);
			resolve({ versionLine: versionMatch?.[1]?.trim() });
		});
	});
}

function splitCommandLineArgs(value: string): string[] {
	const args: string[] = [];
	let current = '';
	let quote: '"' | "'" | null = null;
	let escaped = false;

	for (const ch of value) {
		if (escaped) {
			current += ch;
			escaped = false;
			continue;
		}

		if (ch === '\\') {
			escaped = true;
			continue;
		}

		if (quote) {
			if (ch === quote) {
				quote = null;
			} else {
				current += ch;
			}
			continue;
		}

		if (ch === '"' || ch === "'") {
			quote = ch;
			continue;
		}

		if (/\s/.test(ch)) {
			if (current.length > 0) {
				args.push(current);
				current = '';
			}
			continue;
		}

		current += ch;
	}

	if (current.length > 0) {
		args.push(current);
	}

	return args;
}

export function activate(context: ExtensionContext) {
	const outputChannel = window.createOutputChannel('12dPL Compiler');

	const selectedCompilerFlagsKey = '12dpl.selectedCompilerFlags';
	let cachedCompilerInfo: CompilerInfo | undefined;

	context.subscriptions.push(
		workspace.onWillSaveTextDocument((event) => {
			if (event.document.languageId !== '12dpl') {
				return;
			}

			const config = workspace.getConfiguration('12dpl', event.document.uri);
			const enabled = config.get<boolean>('formatOnSave', true);
			if (!enabled) {
				return;
			}

			const indentSize = Number(config.get<number>('indentSize', 4));
			const editorConfig = workspace.getConfiguration('editor', event.document.uri);
			const insertSpaces = Boolean(editorConfig.get<boolean>('insertSpaces', true));

			const options = {
				tabSize: Number.isFinite(indentSize) && indentSize > 0 ? indentSize : 4,
				insertSpaces
			};

			event.waitUntil(
				commands
					.executeCommand<TextEdit[]>('vscode.executeFormatDocumentProvider', event.document.uri, options)
					.then((edits) => edits ?? [])
			);
		})
	);

	const compileCommandId = '12dpl.compile';
	const compileWithFlagsCommandId = '12dpl.compileWithFlags';

	const compileCurrentEditor = async (pickFlags: boolean) => {
			if (process.platform !== 'win32') {
				void window.showErrorMessage('12dPL compiler is only supported on Windows (cc4d.exe).');
				return;
			}

			const editor = window.activeTextEditor;
			const document = editor?.document;

			if (!document || document.uri.scheme !== 'file') {
				void window.showInformationMessage('Open a .4dm file to compile.');
				return;
			}

			if (path.extname(document.fileName).toLowerCase() !== '.4dm') {
				void window.showInformationMessage('Open a .4dm file to compile.');
				return;
			}

			if (document.isDirty) {
				const saved = await document.save();
				if (!saved) {
					void window.showWarningMessage('Save the file before compiling.');
					return;
				}
			}

			const compilerExe = context.asAbsolutePath(path.join('compiler', 'cc4d.exe'));
			if (!fs.existsSync(compilerExe)) {
				void window.showErrorMessage(`Compiler not found: ${compilerExe}`);
				return;
			}

			if (!cachedCompilerInfo) {
				cachedCompilerInfo = await getCompilerInfo(compilerExe);
			}

			const inputFile = document.fileName;
			const expectedOutput = inputFile.replace(/\.4dm$/i, '.4do');

			let selectedFlags: string[] = [];
			if (pickFlags) {
				const config = workspace.getConfiguration('12dpl', document.uri);
				const availableFlags = (config.get<string[]>('compiler.availableFlags', []) ?? [])
					.map((f) => String(f).trim())
					.filter(Boolean);
				const defaultFlags = (config.get<string[]>('compiler.defaultFlags', []) ?? [])
					.map((f) => String(f).trim())
					.filter(Boolean);

				selectedFlags = context.workspaceState.get<string[]>(selectedCompilerFlagsKey) ?? defaultFlags;
				if (!Array.isArray(selectedFlags)) {
					selectedFlags = defaultFlags;
				}

				if (availableFlags.length > 0) {
					type FlagPickItem = { label: string; picked?: boolean };
					const items: FlagPickItem[] = availableFlags.map((flag) => ({
						label: flag,
						picked: selectedFlags.includes(flag)
					}));

					const picked = await window.showQuickPick(items, {
						canPickMany: true,
						placeHolder: 'Select cc4d compiler flags (checkboxes)'
					});

					if (!picked) {
						return;
					}

					selectedFlags = picked.map((p) => p.label);
					await context.workspaceState.update(selectedCompilerFlagsKey, selectedFlags);
				} else {
					selectedFlags = [];
				}
			}

			outputChannel.clear();
			const flagArgs = (selectedFlags ?? []).flatMap((flag) => splitCommandLineArgs(flag));
			const args = [...flagArgs, inputFile];
			if (cachedCompilerInfo?.versionLine) {
				outputChannel.appendLine(`cc4d version: ${cachedCompilerInfo.versionLine}`);
			}
			outputChannel.appendLine(`> ${compilerExe} ${args.join(' ')}`);
			outputChannel.show(true);

			const child = cp.spawn(compilerExe, args, {
				cwd: path.dirname(compilerExe),
				windowsHide: true
			});

			child.stdout.on('data', (data) => outputChannel.append(data.toString()));
			child.stderr.on('data', (data) => outputChannel.append(data.toString()));
			child.on('error', (err) => {
				outputChannel.appendLine(`\n[spawn error] ${String(err)}`);
				void window.showErrorMessage('Failed to start cc4d.exe. See Output: 12dPL Compiler.');
			});
			child.on('close', (code) => {
				outputChannel.appendLine(`\n[exit code] ${code ?? 'unknown'}`);
				if (code === 0) {
					if (fs.existsSync(expectedOutput)) {
						void window.showInformationMessage(`Compiled: ${expectedOutput}`);
					} else {
						void window.showWarningMessage('Compilation succeeded, but .4do was not found next to the input file.');
					}
				} else {
					void window.showErrorMessage('Compilation failed. See Output: 12dPL Compiler.');
				}
			});
	};

	context.subscriptions.push(
		commands.registerCommand(compileCommandId, async () => {
			await compileCurrentEditor(false);
		})
	);
	context.subscriptions.push(
		commands.registerCommand(compileWithFlagsCommandId, async () => {
			await compileCurrentEditor(true);
		})
	);

	const playButton: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100);
	playButton.text = '$(play) 12dPL';
	playButton.command = compileCommandId;
	playButton.tooltip = 'Compile current .4dm with cc4d';
	context.subscriptions.push(playButton);

	const flagsButton: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 99);
	flagsButton.text = '$(gear) 12dPL';
	flagsButton.command = compileWithFlagsCommandId;
	flagsButton.tooltip = 'Compile current .4dm with cc4d (select flags)';
	context.subscriptions.push(flagsButton);

	// Best-effort: resolve compiler version early so users can see it in the tooltip.
	if (process.platform === 'win32') {
		const compilerExe = context.asAbsolutePath(path.join('compiler', 'cc4d.exe'));
		if (fs.existsSync(compilerExe)) {
			void getCompilerInfo(compilerExe).then((info) => {
				cachedCompilerInfo = info;
				if (info.versionLine) {
					playButton.tooltip = `Compile current .4dm with cc4d (Version: ${info.versionLine})`;
					flagsButton.tooltip = `Compile current .4dm with cc4d (select flags) (Version: ${info.versionLine})`;
				}
			});
		}
	}

	const updatePlayButtonVisibility = () => {
		const active = window.activeTextEditor?.document;
		const visible =
			!!active &&
			active.uri.scheme === 'file' &&
			path.extname(active.fileName).toLowerCase() === '.4dm';
		if (visible) {
			playButton.show();
			flagsButton.show();
		} else {
			playButton.hide();
			flagsButton.hide();
		}
	};

	context.subscriptions.push(window.onDidChangeActiveTextEditor(updatePlayButtonVisibility));
	updatePlayButtonVisibility();

	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);


	//let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc//,
			//options: debugOptions
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: '12dpl' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'12dpl-ls',
		'12d Programming Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
