import { describe, expect, test } from "bun:test";
import * as path from "path";
import * as fs from "fs";

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

// Build a lookup from compiler: keyed by lowercase name → array of overloads
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

function paramSignature(params: FunctionParam[]): string {
	return params.map((p) => normalizeType(p.type)).join(", ");
}

/**
 * Normalize a type string for comparison: trim whitespace and strip
 * non-ASCII characters (e.g., U+F020 from PDF extraction artifacts).
 */
function normalizeType(type: string): string {
	// eslint-disable-next-line no-control-regex
	return type.replace(/[^\x20-\x7E]/g, "").trim();
}

/**
 * Find the best matching compiler entry for an enriched entry by name.
 * When there are multiple overloads, pick the one with the closest param signature.
 */
function findCompilerMatch(
	enriched: FunctionEntry
): { match: FunctionEntry; matchedBy: string } | null {
	const byName = compilerByName.get(enriched.name.toLowerCase());
	if (!byName) return null;

	// Exact param signature match
	const eSig = paramSignature(enriched.parameters);
	const exactSig = byName.find((c) => paramSignature(c.parameters) === eSig);
	if (exactSig) return { match: exactSig, matchedBy: "name+params" };

	// Closest by param count
	const closest = byName.reduce((best, cur) =>
		Math.abs(cur.parameters.length - enriched.parameters.length) <
		Math.abs(best.parameters.length - enriched.parameters.length)
			? cur
			: best
	);
	return { match: closest, matchedBy: "name-only" };
}

describe("functions.enriched.json validation against functions.compiler.json", () => {
	test("enriched file is valid JSON with expected structure", () => {
		expect(Array.isArray(enrichedFunctions)).toBe(true);
		expect(enrichedFunctions.length).toBeGreaterThan(0);

		for (const fn of enrichedFunctions) {
			expect(fn).toHaveProperty("name");
			expect(fn).toHaveProperty("id");
			expect(fn).toHaveProperty("returnType");
			expect(fn).toHaveProperty("parameters");
			expect(fn).toHaveProperty("description");
			expect(typeof fn.name).toBe("string");
			expect(typeof fn.id).toBe("number");
			expect(typeof fn.returnType).toBe("string");
			expect(Array.isArray(fn.parameters)).toBe(true);
		}
	});

	test("every enriched entry has a corresponding compiler entry", () => {
		const orphaned: string[] = [];

		for (const fn of enrichedFunctions) {
			const result = findCompilerMatch(fn);
			if (!result) {
				orphaned.push(fn.name);
			}
		}

		if (orphaned.length > 0) {
			console.warn(
				`\n⚠ ${orphaned.length} enriched entries have no compiler match:\n` +
					orphaned.map((o) => `  - ${o}`).join("\n")
			);
		}
		expect(orphaned).toEqual([]);
	});

	test("enriched return types match compiler return types", () => {
		const mismatches: string[] = [];

		for (const fn of enrichedFunctions) {
			const result = findCompilerMatch(fn);
			if (!result) continue;

			const { match } = result;
			if (
				normalizeType(fn.returnType).toLowerCase() !==
				normalizeType(match.returnType).toLowerCase()
			) {
				mismatches.push(
					`${fn.name}: enriched="${fn.returnType}" vs compiler="${match.returnType}"`
				);
			}
		}

		if (mismatches.length > 0) {
			console.warn(
				`\n⚠ ${mismatches.length} return type mismatches:\n` +
					mismatches.map((m) => `  - ${m}`).join("\n")
			);
		}
		expect(mismatches).toEqual([]);
	});

	test("enriched parameter counts match compiler parameter counts", () => {
		const mismatches: string[] = [];

		for (const fn of enrichedFunctions) {
			const result = findCompilerMatch(fn);
			if (!result) continue;

			const { match, matchedBy } = result;
				if (fn.parameters.length !== match.parameters.length) {
				mismatches.push(
					`${fn.name} (matched by ${matchedBy}): ` +
						`enriched has ${fn.parameters.length} params, compiler has ${match.parameters.length}`
				);
			}
		}

		if (mismatches.length > 0) {
			console.warn(
				`\n⚠ ${mismatches.length} parameter count mismatches:\n` +
					mismatches.map((m) => `  - ${m}`).join("\n")
			);
		}
		expect(mismatches).toEqual([]);
	});

	test("enriched parameter types match compiler parameter types", () => {
		const mismatches: string[] = [];

		for (const fn of enrichedFunctions) {
			const result = findCompilerMatch(fn);
			if (!result) continue;

			const { match, matchedBy } = result;
			const minLen = Math.min(
				fn.parameters.length,
				match.parameters.length
			);
			for (let i = 0; i < minLen; i++) {
				const eType = fn.parameters[i].type;
				const cType = match.parameters[i].type;
				const eNorm = normalizeType(eType);
				const cNorm = normalizeType(cType);

				if (eNorm.toLowerCase() !== cNorm.toLowerCase()) {
					mismatches.push(
						`${fn.name} (matched by ${matchedBy}), param[${i}]: ` +
							`enriched="${eType}" vs compiler="${cType}"`
					);
				}
			}
		}

		if (mismatches.length > 0) {
			console.warn(
				`\n⚠ ${mismatches.length} parameter type mismatches:\n` +
					mismatches.map((m) => `  - ${m}`).join("\n")
			);
		}
		expect(mismatches).toEqual([]);
	});

	test("enriched entries have non-empty descriptions", () => {
		const empty = enrichedFunctions.filter(
			(fn) => !fn.description || fn.description.trim().length === 0
		);

		if (empty.length > 0) {
			console.warn(
				`\n⚠ ${empty.length} entries with empty descriptions:\n` +
					empty.map((fn) => `  - ${fn.name}`).join("\n")
			);
		}
		expect(empty).toEqual([]);
	});

	test("no hidden/non-ASCII characters in type fields", () => {
		const issues: string[] = [];
		// eslint-disable-next-line no-control-regex
		const nonAsciiRe = /[^\x20-\x7E]/;

		for (const fn of enrichedFunctions) {
			if (nonAsciiRe.test(fn.returnType)) {
				issues.push(
					`${fn.name}: returnType contains non-ASCII chars in "${fn.returnType}"`
				);
			}
			for (let i = 0; i < fn.parameters.length; i++) {
				if (nonAsciiRe.test(fn.parameters[i].type)) {
					issues.push(
						`${fn.name}, param[${i}] "${fn.parameters[i].name}": type contains non-ASCII chars in "${fn.parameters[i].type}"`
					);
				}
				if (nonAsciiRe.test(fn.parameters[i].name)) {
					issues.push(
						`${fn.name}, param[${i}]: name contains non-ASCII chars in "${fn.parameters[i].name}"`
					);
				}
			}
		}

		if (issues.length > 0) {
			console.warn(
				`\n\u26a0 ${issues.length} fields with non-ASCII characters (likely PDF extraction artifacts):\n` +
					issues.map((i) => `  - ${i}`).join("\n")
			);
		}
		expect(issues).toEqual([]);
	});

	test("no duplicate entries in enriched (same name + same param signature)", () => {
		const seen = new Map<string, FunctionEntry>();
		const duplicates: string[] = [];

		for (const fn of enrichedFunctions) {
			const key = `${fn.name.toLowerCase()}|${paramSignature(fn.parameters)}`;
			const existing = seen.get(key);
			if (existing) {
				duplicates.push(
					`"${fn.name}" appears multiple times with params (${paramSignature(fn.parameters)})`
				);
			} else {
				seen.set(key, fn);
			}
		}

		if (duplicates.length > 0) {
			console.warn(
				`\n⚠ ${duplicates.length} duplicate enriched entries:\n` +
					duplicates.map((d) => `  - ${d}`).join("\n")
			);
		}
		expect(duplicates).toEqual([]);
	});

	test("no enriched description embeds another function's manual entry (issue #125)", () => {
		// The manual extraction used the "ID = <number>" footer as the function-entry
		// boundary. When that footer is malformed (e.g. "D = 879") or missing, the next
		// function's manual block is swallowed into the previous function's description,
		// e.g. Set_focus ended up buried inside Get_id. Detect any such embedded entry by
		// the manual heading structure, which restates the signature around
		// Name/Description:   Fn(<params>) Name <ReturnType> Fn(<params>) Description
		const compilerNameSet = new Set(compilerFunctions.map((f) => f.name));
		const headingBlock =
			/([A-Z][A-Za-z0-9_]*)\s*\(([^)]*)\)\s+Name\s+[A-Za-z_][A-Za-z0-9_]*\s+\1\s*\([^)]*\)\s+Description\b/g;

		const typeSig = (params: FunctionParam[]): string =>
			params.map((p) => normalizeType(p.type).toLowerCase()).join(",");

		// Parameter types as written in a manual heading, e.g.
		// "Element elt,Real x[],Integer &num_pts" -> "element,real,integer".
		const headingTypeSig = (rawParams: string): string => {
			const trimmed = rawParams.trim();
			if (trimmed === "") return "";
			return trimmed
				.split(",")
				.map((p) => p.trim().split(/\s+/)[0].replace(/[^A-Za-z0-9_].*$/, "").toLowerCase())
				.filter((t) => t.length > 0)
				.join(",");
		};

		const merged: string[] = [];
		for (const fn of enrichedFunctions) {
			// A heading for the entry's own overload is a harmless self-restatement;
			// only a heading for a *different* function/overload signals a swallowed entry.
			const hostKey = `${fn.name.toLowerCase()}|${typeSig(fn.parameters)}`;
			headingBlock.lastIndex = 0;
			let m: RegExpExecArray | null;
			while ((m = headingBlock.exec(fn.description)) !== null) {
				const embeddedName = m[1];
				if (!compilerNameSet.has(embeddedName)) continue;
				const embeddedKey = `${embeddedName.toLowerCase()}|${headingTypeSig(m[2])}`;
				if (embeddedKey !== hostKey) {
					merged.push(
						`${fn.name}(${typeSig(fn.parameters)}) embeds ${embeddedName}(${headingTypeSig(m[2])})`
					);
				}
			}
		}

		if (merged.length > 0) {
			console.warn(
				`\n⚠ ${merged.length} enriched entries embed another function's manual entry ` +
					`(swallowed via a malformed/missing "ID = ..." footer):\n` +
					merged.map((d) => `  - ${d}`).join("\n")
			);
		}
		expect(merged).toEqual([]);
	});

	test("summary statistics", () => {
		const matchResults = {
			"name+params": 0,
			"name-only": 0,
			unmatched: 0,
		};

		for (const fn of enrichedFunctions) {
			const result = findCompilerMatch(fn);
			if (result) {
				matchResults[result.matchedBy as keyof typeof matchResults]++;
			} else {
				matchResults.unmatched++;
			}
		}

		const uniqueCompilerNames = new Set(
			compilerFunctions.map((f) => f.name.toLowerCase())
		);
		const uniqueEnrichedNames = new Set(
			enrichedFunctions.map((f) => f.name.toLowerCase())
		);

		console.log("\n📊 Enriched vs Compiler Summary:");
		console.log(`  Compiler entries: ${compilerFunctions.length} (${uniqueCompilerNames.size} unique names)`);
		console.log(`  Enriched entries: ${enrichedFunctions.length} (${uniqueEnrichedNames.size} unique names)`);
		console.log(`  Coverage: ${((uniqueEnrichedNames.size / uniqueCompilerNames.size) * 100).toFixed(1)}% of unique compiler function names have enriched docs`);
		console.log(`  Match breakdown:`);
		for (const [method, count] of Object.entries(matchResults)) {
			if (count > 0) console.log(`    ${method}: ${count}`);
		}

		// This test always passes — it's informational
		expect(true).toBe(true);
	});
});
