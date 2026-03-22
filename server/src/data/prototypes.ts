/**
 * Prototype data loader — reads and merges the two prototype JSON files.
 *
 * Returns the raw merged FunctionData array. No indexing or caching;
 * that is the responsibility of PrototypeService in the service layer.
 */

import * as fs from 'fs';
import { getResourcePath } from './resourceLoader';

export interface FunctionData {
	name: string;
	id: number;
	returnType: string;
	parameters: Array<{ name: string; type: string }>;
	description: string;
}

/**
 * Loads function prototypes from JSON resource files.
 *
 * Reads `functions.enriched.json` (PDF-extracted docs) first, then merges
 * `functions.compiler.json` (complete overload set) — preferring the richer
 * descriptions from the enriched file when available.
 */
export function loadPrototypes(): FunctionData[] {
	const enrichedPath = getResourcePath('functions.enriched.json');
	const compilerPath = getResourcePath('functions.compiler.json');

	const results: FunctionData[] = [];
	const baseByName = new Map<string, FunctionData>();

	if (fs.existsSync(enrichedPath)) {
		const functions: FunctionData[] = JSON.parse(fs.readFileSync(enrichedPath, 'utf-8'));
		for (const func of functions) {
			baseByName.set(func.name, func);
			results.push(func);
		}
	} else {
		console.error('Enriched functions JSON file not found:', enrichedPath);
	}

	if (fs.existsSync(compilerPath)) {
		const functions: FunctionData[] = JSON.parse(fs.readFileSync(compilerPath, 'utf-8'));
		for (const func of functions) {
			const base = baseByName.get(func.name);
			results.push({
				...func,
				description: (base?.description && base.description.trim().length > 0)
					? base.description
					: func.description
			});
		}
	} else {
		console.error('Compiler functions JSON file not found:', compilerPath);
	}

	return results;
}
