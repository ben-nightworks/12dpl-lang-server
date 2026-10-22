/**
 * cc4d.exe runner for the MCP server.
 *
 * Mirrors the editor's compile command (client/src/compileFeature.ts): the
 * compiler runs from the macro's folder so relative #includes resolve, and
 * `12dpl.compiler.includePaths` is passed through CPLUS_INCLUDE_PATH.
 */

import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export interface CompilerDiagnostic {
	file: string;
	line: number;
	column?: number | undefined;
	severity: 'error' | 'warning';
	message: string;
}

export interface CompileResult {
	success: boolean;
	exitCode: number | null;
	command: string;
	cwd: string;
	/** The compiled .4do, when one was produced. */
	outputFile?: string | undefined;
	diagnostics: CompilerDiagnostic[];
	output: string;
	timedOut: boolean;
}

export interface CompileOptions {
	compilerFolder: string;
	includePaths: string[];
	flags: string[];
	timeoutMs?: number | undefined;
}

/** Splits one flag entry such as `-log "build log.txt"` into arguments. */
export function splitCommandLineArgs(value: string): string[] {
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

/**
 * Parses cc4d output. Compiler errors look like
 *   "file.4dm", line 12.5: error: message
 * and preprocessor errors like
 *   file.4dm:1: set_ups.h: file not found
 */
export function parseCompilerOutput(output: string, cwd: string): CompilerDiagnostic[] {
	const compilerLine = /^"(.*?)",(.*?)line (\d+)\.(\d+): (\w+): (.*)$/;
	const preprocessorLine = /^(.+?\.(?:4dm|h)):(\d+): (.*)$/i;
	const diagnostics: CompilerDiagnostic[] = [];

	for (const raw of output.split(/\r?\n/)) {
		const line = raw.trim();
		const c = compilerLine.exec(line);
		if (c) {
			const [, file = '', , lineNo, column, severity = '', message = ''] = c;
			diagnostics.push({
				file: path.resolve(cwd, file),
				line: Number(lineNo),
				column: Number(column),
				severity: severity.toLowerCase() === 'warning' ? 'warning' : 'error',
				message: message.trim(),
			});
			continue;
		}
		const p = preprocessorLine.exec(line);
		if (p) {
			const [, file = '', lineNo, message = ''] = p;
			diagnostics.push({
				file: path.resolve(cwd, file),
				line: Number(lineNo),
				severity: 'error',
				message: message.trim(),
			});
		}
	}
	return diagnostics;
}

export async function compileMacro(filePath: string, options: CompileOptions): Promise<CompileResult> {
	if (process.platform !== 'win32') {
		throw new Error('The 12dPL compiler (cc4d.exe) only runs on Windows.');
	}
	const compilerExe = path.join(options.compilerFolder, 'cc4d.exe');
	if (!fs.existsSync(compilerExe)) {
		throw new Error(`Compiler not found: ${compilerExe}. Set "12dpl.compiler.path" to the folder containing cc4d.exe.`);
	}
	const source = path.resolve(filePath);
	if (path.extname(source).toLowerCase() !== '.4dm') {
		throw new Error(`Only .4dm files can be compiled (got ${path.basename(source)}). Compile the macro that includes this header.`);
	}
	if (!fs.existsSync(source)) {
		throw new Error(`File not found: ${source}`);
	}

	const cwd = path.dirname(source);
	const args = [...options.flags.flatMap(splitCommandLineArgs), path.basename(source)];
	const env = { ...process.env };
	if (options.includePaths.length > 0) {
		const sep = ':';
		env['CPLUS_INCLUDE_PATH'] = `${env['CPLUS_INCLUDE_PATH'] ?? ''}${sep}${options.includePaths.join(sep)}${sep}${cwd}`;
	}

	const expectedOutput = source.replace(/\.4dm$/i, '.4do');
	const startedAt = Date.now();

	const { exitCode, output, timedOut } = await new Promise<{ exitCode: number | null; output: string; timedOut: boolean }>((resolve, reject) => {
		let combined = '';
		let timedOut = false;
		const child = cp.spawn(compilerExe, args, { cwd, windowsHide: true, env });
		const timer = setTimeout(() => {
			timedOut = true;
			child.kill();
		}, options.timeoutMs ?? 120000);
		child.stdout.on('data', data => { combined += String(data); });
		child.stderr.on('data', data => { combined += String(data); });
		child.on('error', err => {
			clearTimeout(timer);
			reject(new Error(`Failed to start cc4d.exe: ${String(err)}`));
		});
		child.on('close', code => {
			clearTimeout(timer);
			resolve({ exitCode: code, output: combined, timedOut });
		});
	});

	let outputFile: string | undefined;
	if (exitCode === 0) {
		const compilerDirOutput = path.join(options.compilerFolder, path.basename(expectedOutput));
		if (fs.existsSync(expectedOutput) && fs.statSync(expectedOutput).mtimeMs >= startedAt - 2000) {
			outputFile = expectedOutput;
		} else if (fs.existsSync(compilerDirOutput)) {
			// Some installs write the .4do next to the compiler; move it beside the source.
			fs.copyFileSync(compilerDirOutput, expectedOutput);
			fs.unlinkSync(compilerDirOutput);
			outputFile = expectedOutput;
		}
	}

	return {
		success: exitCode === 0 && !timedOut,
		exitCode,
		command: `"${compilerExe}" ${args.map(a => (/\s/.test(a) ? `"${a}"` : a)).join(' ')}`,
		cwd,
		outputFile,
		diagnostics: parseCompilerOutput(output, cwd),
		output: output.trim(),
		timedOut,
	};
}
