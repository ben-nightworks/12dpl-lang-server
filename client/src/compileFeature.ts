/* Compiler-related helpers and commands extracted from extension.ts */
import * as path from 'path';
import * as cp from 'child_process';
import * as fs from 'fs';
import { commands, ExtensionContext, StatusBarAlignment, StatusBarItem, Uri, window, workspace } from 'vscode';

type CompilerInfo = {
    versionLine?: string;
};

const selectedCompilerFlagsKey = '12dpl.selectedCompilerFlags';
const compileTargetKey = '12dpl.compileTarget';
const hasCompileTargetContextKey = '12dpl.hasCompileTarget';
let cachedCompilerInfo: CompilerInfo | undefined;

function is4dmFile(fsPath: string | undefined): boolean {
    return !!fsPath && path.extname(fsPath).toLowerCase() === '.4dm';
}

function is12dplSourceFile(fsPath: string | undefined): boolean {
    if (!fsPath) return false;
    const ext = path.extname(fsPath).toLowerCase();
    return ext === '.4dm' || ext === '.h';
}

async function getCompilerInfo(compilerExe: string): Promise<CompilerInfo> {
    return new Promise((resolve) => {
        const config = workspace.getConfiguration('12dpl');
        const includePaths = (config.get<string[]>('compiler.includePaths') ?? []).map((p) => String(p).trim()).filter(Boolean);
        const env = { ...process.env };
        if (includePaths.length > 0) {
            const sep = process.platform === 'win32' ? ';' : ':';
            env['PATH'] = `${includePaths.join(sep)}${sep}${env['PATH'] ?? ''}`;
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
            const versionLine = combined.match(/^\s*Version\s*:\s*(.+)$/mi)?.[1]?.trim();
            resolve(versionLine ? { versionLine } : {});
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
    const setCompileTargetCommandId = '12dpl.setCompileTarget';
    const clearCompileTargetCommandId = '12dpl.clearCompileTarget';

    const getCompileTarget = (): string | undefined => {
        const target = context.workspaceState.get<string>(compileTargetKey);
        return typeof target === 'string' && target.length > 0 ? target : undefined;
    };

    const setCompileTarget = async (fsPath: string | undefined) => {
        await context.workspaceState.update(compileTargetKey, fsPath);
        void commands.executeCommand('setContext', hasCompileTargetContextKey, !!fsPath);
        refreshStatusBar();
    };

    /**
     * Resolves which file to compile (issue #93):
     *   1. the file the command was invoked on (explorer/editor context menu),
     *   2. the pinned compile target,
     *   3. the active editor's .4dm file.
     * Notifies the user and returns undefined when nothing can be compiled.
     */
    const resolveCompileFile = async (explicitUri: Uri | undefined): Promise<string | undefined> => {
        if (explicitUri?.scheme === 'file' && is4dmFile(explicitUri.fsPath)) {
            return explicitUri.fsPath;
        }

        const target = getCompileTarget();
        if (target) {
            if (fs.existsSync(target)) return target;
            await setCompileTarget(undefined);
            void window.showWarningMessage(`Compile target no longer exists and was cleared: ${target}`);
            return undefined;
        }

        const active = window.activeTextEditor?.document;
        if (active?.uri.scheme === 'file' && is4dmFile(active.fileName)) {
            return active.fileName;
        }
        void window.showInformationMessage('Open a .4dm file to compile, or right-click one and select "12dPL: Set as Compile Target".');
        return undefined;
    };

    const runCompile = async (pickFlags: boolean, explicitUri?: Uri) => {
        if (process.platform !== 'win32') {
            void window.showErrorMessage('12dPL compiler is only supported on Windows (cc4d.exe).');
            return;
        }

        const inputFile = await resolveCompileFile(explicitUri);
        if (!inputFile) return;
        const inputUri = Uri.file(inputFile);

        // Save every dirty 12dPL source so the compile sees fresh content —
        // the compile target typically #includes the header being edited.
        for (const doc of workspace.textDocuments) {
            if (doc.isDirty && doc.uri.scheme === 'file' && is12dplSourceFile(doc.fileName)) {
                const saved = await doc.save();
                if (!saved) {
                    void window.showWarningMessage(`Save failed for ${path.basename(doc.fileName)}. Compile cancelled.`);
                    return;
                }
            }
        }

        const config = workspace.getConfiguration('12dpl', inputUri);
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

        const expectedOutput = inputFile.replace(/\.4dm$/i, '.4do');

        let selectedFlags: string[] = [];
        if (pickFlags) {
            const config = workspace.getConfiguration('12dpl', inputUri);
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
        outputChannel.clear();
        const flagArgs = (selectedFlags ?? []).flatMap((flag) => splitCommandLineArgs(flag));
        const args = [...flagArgs, inputFile];
        if (cachedCompilerInfo?.versionLine) {
            outputChannel.appendLine(`cc4d version: ${cachedCompilerInfo.versionLine}`);
        }
        outputChannel.appendLine(`> ${compilerExe} ${args.join(' ')}`);
        outputChannel.show(true);

        const configTop = workspace.getConfiguration('12dpl', inputUri);
        const includePathsTop = (configTop.get<string[]>('compiler.includePaths') ?? []).map((p) => String(p).trim()).filter(Boolean);
        const envTop = { ...process.env };
        if (includePathsTop.length > 0) {
            const sep = ':';
            envTop['CPLUS_INCLUDE_PATH'] = `${envTop['CPLUS_INCLUDE_PATH'] ?? ''}${sep}${includePathsTop.join(sep)}${sep}${inputFileFolder}`;
        }

        const child = cp.spawn(compilerExe, args, {
            cwd: inputFileFolder,
            windowsHide: true,
            env: envTop
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
                // Check if .4do was created next to input, or in compiler directory
                const compilerDirOutput = path.join(path.dirname(compilerExe), path.basename(expectedOutput));
                if (fs.existsSync(expectedOutput)) {
                    void window.showInformationMessage(`Compiled: ${expectedOutput}`);
                } else if (fs.existsSync(compilerDirOutput)) {
                    // Move the .4do from compiler directory to input file directory
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
                void window.showErrorMessage('Compilation failed. See Output: 12dPL Compiler.');
            }
        });
    };

    context.subscriptions.push(
        commands.registerCommand(compileCommandId, async (uri?: Uri) => {
            await runCompile(false, uri);
        })
    );
    context.subscriptions.push(
        commands.registerCommand(compileWithFlagsCommandId, async (uri?: Uri) => {
            await runCompile(true, uri);
        })
    );
    context.subscriptions.push(
        commands.registerCommand(setCompileTargetCommandId, async (uri?: Uri) => {
            const active = window.activeTextEditor?.document;
            const fsPath = uri?.scheme === 'file'
                ? uri.fsPath
                : (active?.uri.scheme === 'file' ? active.fileName : undefined);
            if (!is4dmFile(fsPath)) {
                void window.showInformationMessage('Select a .4dm file to set as the compile target.');
                return;
            }
            await setCompileTarget(fsPath);
            void window.showInformationMessage(`Compile target set: ${path.basename(fsPath!)}. The play button and compile commands now build this file.`);
        })
    );
    context.subscriptions.push(
        commands.registerCommand(clearCompileTargetCommandId, async () => {
            const target = getCompileTarget();
            await setCompileTarget(undefined);
            void window.showInformationMessage(target
                ? `Compile target cleared: ${path.basename(target)}. Compile commands build the active file again.`
                : 'No compile target was set.');
        })
    );

    const playButton: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100);
    playButton.command = compileCommandId;
    context.subscriptions.push(playButton);

    const flagsButton: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 99);
    flagsButton.text = '$(gear) 12dPL';
    flagsButton.command = compileWithFlagsCommandId;
    context.subscriptions.push(flagsButton);

    // Suffix appended to both tooltips: compiler version or configuration hint.
    let tooltipSuffix = '';

    const refreshStatusBar = () => {
        const target = getCompileTarget();
        const targetName = target ? path.basename(target) : undefined;
        const subject = targetName ? `${targetName} (compile target)` : 'current .4dm';
        playButton.text = targetName ? `$(play) 12dPL: ${targetName}` : '$(play) 12dPL';
        playButton.tooltip = `Compile ${subject} with cc4d${tooltipSuffix}`;
        flagsButton.tooltip = `Compile ${subject} with cc4d (select flags)${tooltipSuffix}`;

        const active = window.activeTextEditor?.document;
        const ext = active ? path.extname(active.fileName).toLowerCase() : '';
        const visible =
            !!active &&
            active.uri.scheme === 'file' &&
            (ext === '.4dm' || (ext === '.h' && !!target));
        if (visible) {
            playButton.show();
            flagsButton.show();
        } else {
            playButton.hide();
            flagsButton.hide();
        }
    };

    if (process.platform === 'win32') {
        const config = workspace.getConfiguration('12dpl');
        const configuredCompilerFolder = String(config.get<string>('compiler.path') ?? '').trim();
        if (!configuredCompilerFolder) {
            tooltipSuffix = ' (configure 12dpl.compiler.path)';
        } else {
            const compilerExe = path.join(configuredCompilerFolder, 'cc4d.exe');
            if (fs.existsSync(compilerExe)) {
                void getCompilerInfo(compilerExe).then((info) => {
                    cachedCompilerInfo = info;
                    if (info.versionLine) {
                        tooltipSuffix = ` (Version: ${info.versionLine})`;
                        refreshStatusBar();
                    }
                });
            } else {
                tooltipSuffix = ' (compiler not found; check 12dpl.compiler.path)';
            }
        }
    }

    void commands.executeCommand('setContext', hasCompileTargetContextKey, !!getCompileTarget());
    context.subscriptions.push(window.onDidChangeActiveTextEditor(refreshStatusBar));
    refreshStatusBar();
}
