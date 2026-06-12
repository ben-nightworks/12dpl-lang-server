/**
 * Resource path resolution for the data layer.
 *
 * Locates JSON resource files in `server/out/resources/`.
 * Works in both bundled mode (single-file output in server/out/) and
 * unbundled tsc mode (individual files in server/out/data/).
 */

import * as fs from 'fs';
import * as path from 'path';

/** Returns the absolute path to a file inside `server/out/resources/`. */
export function getResourcePath(filename: string): string {
	// In unbundled tsc mode: __dirname = server/out/data/
	const direct = path.join(__dirname, 'resources', filename);
	if (fs.existsSync(direct)) {
		return direct;
	}
	// Unbundled fallback: __dirname is server/out/data/, resources are a sibling
	return path.join(__dirname, '..', 'resources', filename);
}
