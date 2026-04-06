/**
 * Workspace scanning utilities — file discovery for workspace-wide diagnostics.
 */

import * as fs from 'fs';
import * as path from 'path';

const SKIP_DIRS = new Set(['node_modules', '.git', 'out', '.vscode']);

/** Collects all .4dm files under a directory recursively, up to maxFiles. */
export function collectWorkspaceFiles(dir: string, maxFiles: number = 5000): string[] {
	const results: string[] = [];

	function walk(d: string) {
		if (results.length >= maxFiles) return;
		let entries: fs.Dirent[];
		try {
			entries = fs.readdirSync(d, { withFileTypes: true });
		} catch {
			return;
		}
		for (const entry of entries) {
			if (results.length >= maxFiles) return;
			const full = path.join(d, entry.name);
			if (entry.isDirectory()) {
				if (SKIP_DIRS.has(entry.name.toLowerCase())) continue;
				walk(full);
			} else if (entry.isFile()) {
				const ext = path.extname(entry.name).toLowerCase();
				if (ext === '.4dm') {
					results.push(full);
				}
			}
		}
	}

	walk(dir);
	return results;
}
