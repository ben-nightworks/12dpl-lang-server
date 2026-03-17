/**
 * Type documentation loader — reads the type documentation JSON resource.
 *
 * Loaded once at module init. Returns a dictionary mapping type names
 * (e.g. "Element", "Integer") to their documentation strings.
 */

import * as fs from 'fs';
import { getResourcePath } from './resourceLoader';

let typeDocumentation: Record<string, string> = {};
try {
	const docPath = getResourcePath('typeDocumentation.json');
	if (fs.existsSync(docPath)) {
		typeDocumentation = JSON.parse(fs.readFileSync(docPath, 'utf-8'));
	} else {
		console.error('typeDocumentation.json not found:', docPath);
	}
} catch (error) {
	console.error('Error loading typeDocumentation.json:', error);
}

export { typeDocumentation };
