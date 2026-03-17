/**
 * Resource path resolution for the data layer.
 *
 * Locates the server module directory so that resource JSON files
 * can be found at `../resources/` relative to the compiled output.
 */

import * as path from 'path';
import { fileURLToPath } from 'url';

function getModuleDir(): string {
	if (typeof __dirname === 'string') {
		return __dirname;
	}
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

/** Returns the absolute path to a file inside `server/out/resources/`. */
export function getResourcePath(filename: string): string {
	return path.join(getModuleDir(), '..', 'resources', filename);
}
