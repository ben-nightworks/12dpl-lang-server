/**
 * split-merged-enriched.ts — repair merged entries in functions.enriched.json.
 *
 * Background (see issue #125):
 * The manual-extraction process that produced functions.enriched.json used the
 * `ID = <number>` footer as the primary function-entry boundary. When that footer
 * is malformed (e.g. `D = 879` instead of `ID = 879`) or missing, the following
 * function's manual block is swallowed into the previous function's description.
 *
 * This script re-splits descriptions on the manual heading structure, which is a
 * far more reliable boundary than the ID footer:
 *
 *     Function_name(<params>) Name <ReturnType> Function_name(<params>) Description <body...>
 *
 * The double-mention of the function name around `Name`/`Description` is the
 * signature of a manual entry heading. For every enriched entry that has such a
 * block embedded inside its description:
 *   - the text before the first embedded heading stays with the host entry;
 *   - each embedded heading becomes its own standalone entry, matched to its
 *     compiler overload by name + parameter types, and its body is recovered;
 *   - a swallowed function that already has a real enriched entry is dropped;
 *   - a swallowed function whose existing entry is only a placeholder
 *     ("12dPL function X") has that placeholder replaced with the recovered body;
 *   - a host left with no real description (only an ID footer / page header) gets
 *     a neutral "12dPL function X" placeholder rather than the wrong, swallowed text.
 *
 * Run `bun scripts/split-merged-enriched.ts` for a dry run (no writes),
 * or `bun scripts/split-merged-enriched.ts --write` to update the resource file.
 */
import * as fs from "fs";
import * as path from "path";

interface FunctionParam { name: string; type: string; }
interface FunctionEntry {
	name: string;
	id: number;
	returnType: string;
	parameters: FunctionParam[];
	description: string;
}

const WRITE = process.argv.includes("--write");
const resourcesDir = path.resolve(__dirname, "..", "server", "src", "resources");
const compilerPath = path.join(resourcesDir, "functions.compiler.json");
const enrichedPath = path.join(resourcesDir, "functions.enriched.json");

const compiler: FunctionEntry[] = JSON.parse(fs.readFileSync(compilerPath, "utf-8"));
const enriched: FunctionEntry[] = JSON.parse(fs.readFileSync(enrichedPath, "utf-8"));

const compilerNames = new Set(compiler.map((f) => f.name));
const compilerByName = new Map<string, FunctionEntry[]>();
for (const fn of compiler) {
	const key = fn.name.toLowerCase();
	const list = compilerByName.get(key);
	if (list) list.push(fn);
	else compilerByName.set(key, [fn]);
}

// Page-header / footer artifacts left behind by the PDF extraction.
const NOISE_PATTERNS: RegExp[] = [
	/Strings Replaced by Super Strings Page \d+ 12d Model Macro Manual/g,
	/Page \d+ Strings Replaced by Super Strings Chapter 5 12dPL Library Calls/g,
	/Panels and Widgets Page \d+ 12d Model Macro Manual/g,
	/Project Setting Page \d+ 12d Model Macro Manual/g,
	/General Page \d+ 12d Model Macro Manual/g,
	/Page \d+ 12d Model Macro Manual/g,
	// "ID = 879" / malformed "D = 879" footers that leaked into the text.
	/\b[I]?D = \d+\b/g,
];

function stripNoise(text: string): string {
	let out = text;
	for (const re of NOISE_PATTERNS) out = out.replace(re, " ");
	return out.replace(/\s+/g, " ").trim();
}

function isPlaceholder(desc: string): boolean {
	return /^\s*12dPL function /i.test(desc);
}

function isSubstantive(desc: string): boolean {
	if (isPlaceholder(desc)) return false;
	const cleaned = stripNoise(desc);
	return cleaned.length >= 20 && /\s/.test(cleaned);
}

function placeholderFor(name: string): string {
	return `12dPL function ${name}`;
}

function normalizeType(type: string): string {
	// eslint-disable-next-line no-control-regex
	return type.replace(/[^\x20-\x7E]/g, "").trim().toLowerCase();
}

function sigOf(params: FunctionParam[]): string {
	return params.map((p) => normalizeType(p.type)).join(",");
}

// Parameter types as written in a manual heading, e.g.
// "Element elt,Real x[],Integer &num_pts" -> ["element", "real", "integer"].
function headingSig(rawParams: string): string {
	const trimmed = rawParams.trim();
	if (trimmed === "") return "";
	return trimmed
		.split(",")
		.map((p) => p.trim().split(/\s+/)[0].replace(/[^A-Za-z0-9_].*$/, "").toLowerCase())
		.filter((t) => t.length > 0)
		.join(",");
}

// Manual-heading block: "Fn(<params>) Name <ReturnType> Fn(<params>) Description".
const BLOCK_RE = /([A-Z][A-Za-z0-9_]*)\s*\(([^)]*)\)\s+Name\s+([A-Za-z_][A-Za-z0-9_]*)\s+\1\s*\(([^)]*)\)\s+Description\b/g;

interface Block { name: string; sig: string; start: number; headerEnd: number; }

function findBlocks(desc: string): Block[] {
	const blocks: Block[] = [];
	BLOCK_RE.lastIndex = 0;
	let m: RegExpExecArray | null;
	while ((m = BLOCK_RE.exec(desc)) !== null) {
		const name = m[1];
		if (!compilerNames.has(name)) continue; // only treat compiler-known headings as boundaries
		blocks.push({
			name,
			sig: headingSig(m[2]),
			start: m.index,
			headerEnd: m.index + m[0].length,
		});
	}
	return blocks;
}

// Index existing enriched entries by name|sig so we can decide create vs. replace vs. drop.
const enrichedByKey = new Map<string, FunctionEntry[]>();
for (const fn of enriched) {
	const key = `${fn.name.toLowerCase()}|${sigOf(fn.parameters)}`;
	const list = enrichedByKey.get(key);
	if (list) list.push(fn);
	else enrichedByKey.set(key, [fn]);
}

function matchCompilerOverload(name: string, sig: string): FunctionEntry | null {
	const overloads = compilerByName.get(name.toLowerCase());
	if (!overloads) return null;
	const exact = overloads.find((c) => sigOf(c.parameters) === sig);
	return exact ?? null;
}

const stats = {
	hosts_processed: 0,
	hosts_trimmed: 0,
	hosts_placeholdered: 0,
	created: 0,
	replaced_placeholder: 0,
	dropped_existing: 0,
	dropped_self: 0,
	skipped_empty_body: 0,
};
const replacements = new Map<string, string>(); // name|sig -> recovered description
const createdKeys = new Set<string>();
const insertAfter = new Map<FunctionEntry, FunctionEntry[]>(); // host -> new entries

for (const host of enriched) {
	const blocks = findBlocks(host.description);
	const hostKey = `${host.name.toLowerCase()}|${sigOf(host.parameters)}`;
	// Only repair genuine cross-entry merges: an embedded heading for a *different*
	// overload (different name or signature). A heading for the host's own overload
	// is a self-restatement, not a swallowed entry, and is left alone — this matches
	// the regression test in tests/enrichedFunctions.test.ts.
	const hasDifferentOverload = blocks.some(
		(b) => `${b.name.toLowerCase()}|${b.sig}` !== hostKey
	);
	if (!hasDifferentOverload) continue;

	stats.hosts_processed++;
	const newEntries: FunctionEntry[] = [];

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const bodyEnd = i + 1 < blocks.length ? blocks[i + 1].start : host.description.length;
		const body = stripNoise(host.description.slice(block.headerEnd, bodyEnd));
		const overload = matchCompilerOverload(block.name, block.sig);
		if (!overload) {
			console.warn(`  ! no compiler overload for ${block.name}(${block.sig}) — left in place`);
			continue;
		}
		const key = `${overload.name.toLowerCase()}|${sigOf(overload.parameters)}`;

		// A heading for the host's own overload: the host already represents it, so
		// the restated body is redundant — drop it rather than creating a duplicate.
		if (key === hostKey) {
			stats.dropped_self++;
			console.log(`  drop ${overload.name}(${block.sig}) — host's own overload`);
			continue;
		}

		const existing = enrichedByKey.get(key) ?? [];
		const hasReal = existing.some((e) => e !== host && isSubstantive(e.description));

		if (hasReal) {
			stats.dropped_existing++;
			console.log(`  drop ${overload.name}(${block.sig}) — already documented`);
			continue;
		}
		if (!isSubstantive(body)) {
			stats.skipped_empty_body++;
			console.log(`  skip ${overload.name}(${block.sig}) — no recoverable body`);
			continue;
		}
		const placeholderEntry = existing.find((e) => e !== host && isPlaceholder(e.description));
		if (placeholderEntry) {
			replacements.set(key, body);
			stats.replaced_placeholder++;
			console.log(`  replace placeholder ${overload.name}(${block.sig})`);
			continue;
		}
		if (createdKeys.has(key)) {
			console.log(`  drop ${overload.name}(${block.sig}) — already recreated`);
			continue;
		}
		createdKeys.add(key);
		newEntries.push({
			name: overload.name,
			id: overload.id,
			returnType: overload.returnType,
			parameters: overload.parameters.map((p) => ({ name: p.name, type: p.type })),
			description: body,
		});
		stats.created++;
		console.log(`  create ${overload.name}(${block.sig}) — ${body.length} chars`);
	}

	// Host keeps only the text before the first embedded heading.
	const hostBody = stripNoise(host.description.slice(0, blocks[0].start));
	if (isSubstantive(hostBody)) {
		host.description = hostBody;
		stats.hosts_trimmed++;
		console.log(`HOST ${host.name}(${sigOf(host.parameters)}) — trimmed to ${hostBody.length} chars`);
	} else {
		host.description = placeholderFor(host.name);
		stats.hosts_placeholdered++;
		console.log(`HOST ${host.name}(${sigOf(host.parameters)}) — no recoverable description, placeholdered`);
	}

	if (newEntries.length > 0) insertAfter.set(host, newEntries);
}

// Apply placeholder replacements to existing entries.
for (const fn of enriched) {
	const key = `${fn.name.toLowerCase()}|${sigOf(fn.parameters)}`;
	const repl = replacements.get(key);
	if (repl && isPlaceholder(fn.description)) {
		fn.description = repl;
	}
}

// Rebuild the array, inserting recovered entries right after their host.
const result: FunctionEntry[] = [];
for (const fn of enriched) {
	result.push(fn);
	const extras = insertAfter.get(fn);
	if (extras) result.push(...extras);
}

console.log("\n=== Summary ===");
console.log(`  Hosts processed:          ${stats.hosts_processed}`);
console.log(`  Hosts trimmed:            ${stats.hosts_trimmed}`);
console.log(`  Hosts placeholdered:      ${stats.hosts_placeholdered}`);
console.log(`  New standalone entries:   ${stats.created}`);
console.log(`  Placeholders replaced:    ${stats.replaced_placeholder}`);
console.log(`  Dropped (already doc'd):  ${stats.dropped_existing}`);
console.log(`  Dropped (host's own):     ${stats.dropped_self}`);
console.log(`  Skipped (no body):        ${stats.skipped_empty_body}`);
console.log(`  Entries: ${enriched.length} -> ${result.length}`);

if (WRITE) {
	fs.writeFileSync(enrichedPath, JSON.stringify(result, null, 2) + "\n", "utf-8");
	console.log(`\n✅ Wrote ${enrichedPath}`);
} else {
	console.log(`\n(dry run — pass --write to update ${path.relative(process.cwd(), enrichedPath)})`);
}
