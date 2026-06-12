/**
 * Fix script: updates functions.enriched.json to match functions.compiler.json
 * 
 * - Removes entries with no matching compiler function (by name)
 * - Removes duplicate entries (same name + same normalized param signature)
 * - Fixes return types to match compiler
 * - Fixes parameter counts and types to match compiler
 * - Strips non-ASCII characters from type and name fields (PDF artifacts)
 * 
 * Preserves the enriched description text (the whole point of the enriched file).
 */
import * as fs from "fs";
import * as path from "path";

interface FunctionParam {
	name: string;
	type: string;
}

interface FunctionEntry {
	name: string;
	id: number;
	returnType: string;
	parameters: FunctionParam[];
	description: string;
}

const resourcesDir = path.resolve(__dirname, "..", "server", "src", "resources");
const compilerFunctions: FunctionEntry[] = JSON.parse(
	fs.readFileSync(path.join(resourcesDir, "functions.compiler.json"), "utf-8")
);
const enrichedFunctions: FunctionEntry[] = JSON.parse(
	fs.readFileSync(path.join(resourcesDir, "functions.enriched.json"), "utf-8")
);

// Build compiler lookup by lowercase name → overloads
const compilerByName = new Map<string, FunctionEntry[]>();
for (const fn of compilerFunctions) {
	const key = fn.name.toLowerCase();
	const existing = compilerByName.get(key);
	if (existing) {
		existing.push(fn);
	} else {
		compilerByName.set(key, [fn]);
	}
}

function normalizeType(type: string): string {
	return type.replace(/[^\x20-\x7E]/g, "").trim();
}

function normalizedParamSig(params: FunctionParam[]): string {
	return params.map((p) => normalizeType(p.type).toLowerCase()).join(",");
}

function cleanNonAscii(value: string): string {
	return value.replace(/[^\x20-\x7E]/g, "").trim();
}

/**
 * Find the best matching compiler overload for an enriched entry.
 */
function findBestCompilerMatch(enriched: FunctionEntry): FunctionEntry | null {
	const overloads = compilerByName.get(enriched.name.toLowerCase());
	if (!overloads) return null;

	// Exact param signature match (normalized)
	const eSig = normalizedParamSig(enriched.parameters);
	const exact = overloads.find((c) => normalizedParamSig(c.parameters) === eSig);
	if (exact) return exact;

	// Closest by param count
	return overloads.reduce((best, cur) =>
		Math.abs(cur.parameters.length - enriched.parameters.length) <
		Math.abs(best.parameters.length - enriched.parameters.length)
			? cur
			: best
	);
}

const stats = {
	removed_no_match: 0,
	removed_duplicate: 0,
	fixed_return_type: 0,
	fixed_param_count: 0,
	fixed_param_type: 0,
	fixed_non_ascii: 0,
	fixed_id: 0,
};

const result: FunctionEntry[] = [];
const seen = new Set<string>();

for (const fn of enrichedFunctions) {
	const match = findBestCompilerMatch(fn);

	// Remove entries with no compiler match
	if (!match) {
		stats.removed_no_match++;
		console.log(`REMOVED (no match): ${fn.name}`);
		continue;
	}

	// Clean non-ASCII from all fields first
	let nameClean = cleanNonAscii(fn.name);
	if (nameClean !== fn.name) stats.fixed_non_ascii++;

	let descClean = fn.description; // preserve description as-is (may have unicode intentionally)

	// Fix return type
	let returnType = cleanNonAscii(fn.returnType);
	if (normalizeType(returnType).toLowerCase() !== normalizeType(match.returnType).toLowerCase()) {
		console.log(`FIXED return type: ${fn.name}: "${returnType}" → "${match.returnType}"`);
		returnType = match.returnType;
		stats.fixed_return_type++;
	}

	// Fix parameters: adopt compiler's parameter types and count
	let parameters: FunctionParam[];
	if (fn.parameters.length !== match.parameters.length) {
		// Parameter count mismatch — adopt compiler params but keep enriched names where possible
		console.log(`FIXED param count: ${fn.name}: ${fn.parameters.length} → ${match.parameters.length}`);
		parameters = match.parameters.map((cp, i) => ({
			name: i < fn.parameters.length ? cleanNonAscii(fn.parameters[i].name) : cp.name,
			type: cp.type,
		}));
		stats.fixed_param_count++;
	} else {
		// Same count — fix individual types
		parameters = fn.parameters.map((ep, i) => {
			const cp = match.parameters[i];
			let name = cleanNonAscii(ep.name);
			let type = cleanNonAscii(ep.type);

			if (name !== ep.name) stats.fixed_non_ascii++;
			if (type !== ep.type) stats.fixed_non_ascii++;

			if (normalizeType(type).toLowerCase() !== normalizeType(cp.type).toLowerCase()) {
				console.log(`FIXED param type: ${fn.name} param[${i}]: "${type}" → "${cp.type}"`);
				type = cp.type;
				stats.fixed_param_type++;
			}
			return { name, type };
		});
	}

	// Fix ID to match compiler
	let id = fn.id;
	if (id !== match.id) {
		console.log(`FIXED id: ${fn.name}: ${id} → ${match.id}`);
		id = match.id;
		stats.fixed_id++;
	}

	// Use compiler's canonical name casing
	const name = match.name;

	// Deduplicate: same name (lowercased) + same param signature
	const dedupeKey = `${name.toLowerCase()}|${normalizedParamSig(parameters)}`;
	if (seen.has(dedupeKey)) {
		stats.removed_duplicate++;
		console.log(`REMOVED (duplicate): ${name} (${parameters.map(p => p.type).join(", ")})`);
		continue;
	}
	seen.add(dedupeKey);

	result.push({
		name,
		id,
		returnType,
		parameters,
		description: descClean,
	});
}

// Write the fixed file
const outputPath = path.join(resourcesDir, "functions.enriched.json");
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n", "utf-8");

console.log("\n✅ Fixed functions.enriched.json");
console.log(`  Entries: ${enrichedFunctions.length} → ${result.length}`);
console.log(`  Removed (no compiler match): ${stats.removed_no_match}`);
console.log(`  Removed (duplicates): ${stats.removed_duplicate}`);
console.log(`  Fixed return types: ${stats.fixed_return_type}`);
console.log(`  Fixed param counts: ${stats.fixed_param_count}`);
console.log(`  Fixed param types: ${stats.fixed_param_type}`);
console.log(`  Fixed non-ASCII artifacts: ${stats.fixed_non_ascii}`);
console.log(`  Fixed IDs: ${stats.fixed_id}`);
