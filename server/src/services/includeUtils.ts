import * as fs from 'fs';
import * as path from 'path';

/*** Helpers for working with `#include` directives.** 
* These utilities are used by completion/hover/definition to walk an include graph* starting from an open document.
***/

/*** Resolves VS Code variables in a path string.
* Supports: ${userHome}, ${workspaceFolder}, ${workspaceRootFolderName}, ${file}, ${fileDirname}, ${cwd}, ${pathSeparator}
***/
// @param pathStr The path string that may contain VS Code variables* 
// @param options Configuration options for variable resolution* 
// @returns The path with variables resolved*/

	export function resolvePathVariables(pathStr: string, options?: { workspaceFolderPath?: string; fileFsPath?: string; cwd?: string; }): string {
		let result = pathStr; const { workspaceFolderPath, fileFsPath, cwd } = options ?? {};
		// Resolve ${userHome}
		const homeDir = process.env.HOME || process.env.USERPROFILE;
		if (homeDir) { result = result.replace(/\$\{userHome\}/g, homeDir);}
		// Resolve ${workspaceFolder}
		if (workspaceFolderPath) 
		{ 
			result = result.replace(/\$\{workspaceFolder\}/g, workspaceFolderPath);
			// Also resolve ${workspaceRootFolderName}
			const folderName = path.basename(workspaceFolderPath);
			result = result.replace(/\$\{workspaceRootFolderName\}/g, folderName);
		}
		// Resolve ${file} and ${fileDirname}
		if (fileFsPath) {
			result = result.replace(/\$\{file\}/g, fileFsPath);
			const fileDir = path.dirname(fileFsPath);
			result = result.replace(/\$\{fileDirname\}/g, fileDir);
		}
		// Resolve ${cwd}
		if (cwd) {
			result = result.replace(/\$\{cwd\}/g, cwd);
		}
		// Resolve ${pathSeparator}
		const pathSep = process.platform === 'win32' ? '\\' : '/';
		result = result.replace(/\$\{pathSeparator\}/g, pathSep);
		return result;
	}

	export function canonicalizeFsPath(p: string): string {
		// Windows paths are case-insensitive; normalize and lower-case for stable keys.
		try {
			return path.resolve(p).replace(/\\/g, '/').toLowerCase();
		} catch {
			return p.replace(/\\/g, '/').toLowerCase();
		}
	}

	/** Converts a `file://` URI to a local filesystem path (best-effort). */
	export function fileUriToFsPath(uri: string): string | null {
		if (!uri.startsWith('file://')) return null;
		// Handles Windows URIs like file:///d%3A/path or file:///d:/path
		let p = uri.replace(/^file:\/\//, '');
		// Remove one leading slash for windows drive paths.
		if (process.platform === 'win32') {
			if (p.startsWith('/'))
				p = p.slice(1);
		}
		p = decodeURIComponent(p);
		return path.normalize(p);
	}

	/** Converts a filesystem path into a `file://` URI. */
	export function fsPathToFileUri(fsPath: string): string {
		const abs = path.resolve(fsPath);
		const withForwardSlashes = abs.replace(/\\/g, '/');
		// On Unix/macOS the absolute path already starts with '/', so we need
		// file:// + path  →  file:///Users/...
		// On Windows the path starts with a drive letter, so we need an extra slash:
		// file:/// + C:/...  →  file:///C:/...
		const prefix = withForwardSlashes.startsWith('/') ? 'file://' : 'file:///';
		return `${prefix}${encodeURI(withForwardSlashes)}`;
	}

	/** Extracts all `#include` paths from a document. */
	export function extractIncludePaths(text: string): string[] {
		const out: string[] = [];
		const re = /^\s*#\s*include\s*[<"]([^>"]+)[>"]/gm;
		let m: RegExpExecArray | null;
		while ((m = re.exec(text)) !== null) {
			out.push(m[1]);
		}
		return out;
	}

	/** Resolves an include path relative to the including file (local includes only). */
	export function resolveIncludeToFsPath(includingFileFsPath: string, includePath: string): string | null {
		const baseDir = path.dirname(includingFileFsPath);
		let candidate = path.isAbsolute(includePath) ? includePath : path.join(baseDir, includePath);
		if (fs.existsSync(candidate)) return candidate;
		return null;
	}

	/** Extended resolver which also considers configured include directories. */
	export function resolveIncludeToFsPathWithDirs(
		includingFileFsPath: string,
		includePath: string,
		includeDirs?: string[]
	): string | null {
		// First try the normal resolution (relative to including file).
		const direct = resolveIncludeToFsPath(includingFileFsPath, includePath);
		if (direct) return direct;

		if (!includeDirs || !includeDirs.length) return null;

		const baseDir = path.dirname(includingFileFsPath);
		for (const raw of includeDirs) {
			if (!raw) continue;
			const dir = path.isAbsolute(raw) ? raw : path.resolve(baseDir, raw);
			const candidate = path.join(dir, includePath);
			if (fs.existsSync(candidate)) return candidate;
		}

		return null;
	}

	export interface IncludeTraversalOptions {
		maxFiles?: number;
	}

	/**
	 * Recursively collects filesystem paths of files included by an entry file.
	 *
	 * - Does not include the entry file itself in the returned list.
	 * - De-duplicates by canonicalized filesystem path.
	 * - Uses `maxFiles` as a safety bound.
	 */
	export function collectRecursiveIncludeFiles(
		entryFileFsPath: string,
		readText: (fsPath: string) => string | null,
		options: IncludeTraversalOptions & { includeDirectories?: string[] } = {}
	): string[] {
		const maxFiles = options.maxFiles ?? 500;
		const entryDir = path.dirname(entryFileFsPath);
		const visited = new Set<string>();
		const results: string[] = [];

		const pushIfNew = (fsPath: string) => {
			const key = canonicalizeFsPath(fsPath);
			if (visited.has(key)) return false;
			visited.add(key);
			results.push(fsPath);
			return true;
		};

		const stack: string[] = [];
		// Start by scanning the entry file itself, but do not include it in results.
		stack.push(entryFileFsPath);
		visited.add(canonicalizeFsPath(entryFileFsPath));

		while (stack.length) {
			if (results.length >= maxFiles) break;
			const cur = stack.pop()!;
			const text = readText(cur);
			if (text == null) continue;
			const includes = extractIncludePaths(text);
			for (const inc of includes) {
				if (results.length >= maxFiles) break;
				const resolved = resolveIncludeToFsPathWithDirs(cur, inc, [entryDir, ...(options.includeDirectories ?? [])]);
				if (!resolved) {
					console.warn(`Could not resolve include "${inc}" in file "${cur}"`);
					continue;
				}
				if (!pushIfNew(resolved)) continue;
				stack.push(resolved);
			}
		}

		return results;
	}
