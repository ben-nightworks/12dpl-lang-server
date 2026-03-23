/* Compiler-related helpers and commands extracted from extension.ts */
import * as path from 'path';
import * as cp from 'child_process';
import * as fs from 'fs';
import { commands, ExtensionContext, StatusBarAlignment, StatusBarItem, window, workspace, tasks, TaskScope, ProcessExecution, Task, TaskRevealKind, TaskPanelKind } from 'vscode';

type CompilerInfo = {
    versionLine?: string;
};

const selectedCompilerFlagsKey = '12dpl.selectedCompilerFlags';
let cachedCompilerInfo: CompilerInfo | undefined;

async function getCompilerInfo(compilerExe: string): Promise<CompilerInfo> {
    return new Promise((resolve) => {
        const config = workspace.getConfiguration('12dpl');
        const includePaths = (config.get<string[]>('compiler.includePaths') ?? []).map((p) => String(p).trim()).filter(Boolean);
        const env = { ...process.env };
        if (includePaths.length > 0) {
            const sep = process.platform === 'win32' ? ';' : ':';
            env.PATH = `${includePaths.join(sep)}${sep}${env.PATH ?? ''}`;
        }

        const child = cp.spawn(compilerExe, ['?'], {
            cwd: path.dirname(compilerExe),
            windowsHide: true,
            env
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

export function registerCompileFeatures(context: ExtensionContext) {
    const outputChannel = window.createOutputChannel('12dPL Compiler');

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

        const config = workspace.getConfiguration('12dpl', document.uri);
        const configuredCompilerFolder = String(config.get<string>('compiler.path') ?? '').trim();

        if (!configuredCompilerFolder) {
            void window.showErrorMessage('Compiler not configured. Set "12dpl.compiler.path" to the folder containing cc4d.exe.');
            return;
        }

        const compilerExe = path.join(configuredCompilerFolder, 'cc4d.exe');

        if (!fs.existsSync(compilerExe)) {
            void window.showErrorMessage(`Compiler not found: ${compilerExe}. Ensure the folder in 12dpl.compiler.path contains cc4d.exe.`);
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

        const inputFileFolder = path.dirname(inputFile);
        const flagArgs = (selectedFlags ?? []).flatMap((flag) => splitCommandLineArgs(flag));
        const args = [...flagArgs, inputFile];

        const configTop = workspace.getConfiguration('12dpl', document.uri);
        const includePathsTop = (configTop.get<string[]>('compiler.includePaths') ?? []).map((p) => String(p).trim()).filter(Boolean);
        const envVars = { ...process.env };
        if (includePathsTop.length > 0) {
            const sep = process.platform === 'win32' ? ';' : ':';
            envVars.CPLUS_INCLUDE_PATH = `${envVars.CPLUS_INCLUDE_PATH ?? ''}${sep}${includePathsTop.join(sep)}${sep}${inputFileFolder}`;
        }

        // Create a task that uses the problem matcher defined in package.json
        const task = new Task(
            { type: 'cc4d', label: 'Compile 12dPL' },
            TaskScope.Workspace,
            'Compile 12dPL',
            '12dPL',
            new ProcessExecution(compilerExe, args, {
                cwd: workspace.workspaceFolders?.[0].uri.fsPath,
                env: envVars
            }),
            ['12dPL'] // Use the problem matcher from package.json
        );
        task.isBackground = false;
        task.presentationOptions = { reveal: TaskRevealKind.Always, panel: TaskPanelKind.Shared };

        void tasks.executeTask(task).then((execution) => {
            // Handle task completion
            let disposable: any;
            disposable = tasks.onDidEndTaskProcess((e) => {
                if (e.execution === execution) {
                    disposable.dispose();
                    if (e.exitCode === 0) {
                        const expectedOutput = inputFile.replace(/\.4dm$/i, '.4do');
                        const compilerDirOutput = path.join(path.dirname(compilerExe), path.basename(expectedOutput));
                        if (fs.existsSync(expectedOutput)) {
                            void window.showInformationMessage(`Compiled: ${expectedOutput}`);
                        } else if (fs.existsSync(compilerDirOutput)) {
                            try {
                                fs.copyFileSync(compilerDirOutput, expectedOutput);
                                fs.unlinkSync(compilerDirOutput);
                                void window.showInformationMessage(`Compiled: ${expectedOutput}`);
                            } catch (err) {
                                void window.showWarningMessage(`Compiled to ${compilerDirOutput} but failed to move to source directory.`);
                            }
                        } else {
                            void window.showWarningMessage('Compilation succeeded but .4do was not found next to the input file.');
                        }
                    } else {
                        void window.showErrorMessage('Compilation failed. See Tasks output for details.');
                    }
                }
            });
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

    if (process.platform === 'win32') {
        const config = workspace.getConfiguration('12dpl');
        const configuredCompilerFolder = String(config.get<string>('compiler.path') ?? '').trim();
        if (!configuredCompilerFolder) {
            playButton.tooltip = 'Compile current .4dm with cc4d (configure 12dpl.compiler.path)';
            flagsButton.tooltip = 'Compile current .4dm with cc4d (select flags) (configure 12dpl.compiler.path)';
        } else {
            const compilerExe = path.join(configuredCompilerFolder, 'cc4d.exe');
            if (fs.existsSync(compilerExe)) {
                void getCompilerInfo(compilerExe).then((info) => {
                    cachedCompilerInfo = info;
                    if (info.versionLine) {
                        playButton.tooltip = `Compile current .4dm with cc4d (Version: ${info.versionLine})`;
                        flagsButton.tooltip = `Compile current .4dm with cc4d (select flags) (Version: ${info.versionLine})`;
                    }
                });
            } else {
                playButton.tooltip = 'Compile current .4dm with cc4d (compiler not found; check 12dpl.compiler.path)';
                flagsButton.tooltip = 'Compile current .4dm with cc4d (select flags) (compiler not found; check 12dpl.compiler.path)';
            }
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
}
