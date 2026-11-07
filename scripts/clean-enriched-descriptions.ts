/**
 * Remove PDF page headers from functions.enriched.json descriptions.
 *
 * Run `bun scripts/clean-enriched-descriptions.ts` to preview changes, or pass
 * `--write` to update the resource file. Pass `--short` to output only removed
 * header text.
 */
import * as fs from "fs";
import * as path from "path";

interface FunctionEntry {
	name: string;
	description: string;
	[key: string]: unknown;
}

const scriptsDir = __dirname;
const resourcesDir = path.resolve(scriptsDir, "..", "server", "src", "resources");
const enrichedPath = path.join(resourcesDir, "functions.enriched.json");

const CHAPTER_NUMBER = 5;
const SUBCHAPTERS = [
	"Command Line-Arguments",
	"Array Bound Checking",
	"Exit",
	"Angles",
	"Text",
	"Textstyle Data",
	"Maths",
	"Containers",
	"Random Numbers",
	"Vectors and Matrices",
	"Triangles",
	"System",
	"Ids, Uids and Guids",
	"Input/Output",
	"Menus",
	"Dynamic Arrays",
	"Points",
	"Lines",
	"Arcs",
	"Spirals and Transitions",
	"Parabolas",
	"Segments",
	"Curve",
	"Segment Geometry",
	"Colours",
	"User Defined Attributes",
	"Folders",
	"12d Model Program and Folders",
	"Control bar",
	"Project",
	"Models",
	"Views",
	"Elements",
	"Tin Element",
	"Super String Element",
	"Examples of Setting Up Super Strings",
	"Super Alignment String Element",
	"Arc String Element",
	"Circle String Element",
	"Text String Element",
	"Pipeline String Element",
	"Drainage String Element",
	"Feature String Element",
	"Interface String Element",
	"Grid String and Grid Tin Element",
	"Face String Element",
	"Drafting Elements",
	"Trimesh Element",
	"Plot Frame Element",
	"Strings Replaced by Super Strings",
	"Alignment String Element",
	"General Element Operations",
	"Creating Valid Names",
	"XML",
	"Map File",
	"Project Setting",
	"Macro Console",
	"Panels and Widgets",
	"General",
	"Utilities",
	"12d Model Macro_Functions",
	"Plot Parameters",
	"Undos",
	"ODBC Macro Calls",
	"12D Synergy Integration Macro Calls",
	"Models Tins Sharing",
	"Highlight",
	"Internal Macro Calls",
	"Unlisted Macro Calls",
];


function escapeRegExp(value: string): string {
	return value
		.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
		.replace(/\s+/g, "\\s+");
}

export function createHeaderPatterns(subchapters: string[]): RegExp[] {
	const headings = subchapters
		.map(heading => heading.trim())
		.filter(Boolean)
		.sort((a, b) => b.length - a.length)
		.map(escapeRegExp);

	if (headings.length === 0) {
		throw new Error(
			"The subsection list must contain at least one heading."
		);
	}

	const subsection = `(?:${headings.join("|")})`;

	return [
		new RegExp(
			String.raw`\bPage (?<page>\d+) (?<subchapter>${subsection}) Chapter ${CHAPTER_NUMBER} 12dPL Library Calls\b`,
			"gi"
		),
		new RegExp(
			String.raw`\b(?<subchapter>${subsection}) Page (?<page>\d+) 12d Model Macro Manual\b`,
			"gi"
		),
	];
}



export function cleanDescription(
	description: string,
	patterns: RegExp[],
	removedHeaders: string[] = []
): string {
	let cleaned = description.replace(/\s+/g, " ").trim();
	let removedHeader = false;

	for (const pattern of patterns) {
		// Validate every proposed removal before performing replacements.
		for (const match of cleaned.matchAll(pattern)) {
			const groups = match.groups;

			if (!groups?.page || !groups.subchapter) {
				throw new Error(
					`Header pattern is missing expected capture groups: ${match[0]}`
				);
			}

			removedHeaders.push(match[0]);
			removedHeader = true;
		}

		cleaned = cleaned.replace(pattern, " ");
		cleaned = cleaned.replace(/\s+/g, " ").trim();
	}

	return removedHeader ? cleaned : description;
}

export function cleanEntries<T extends FunctionEntry>(
	entries: T[],
	patterns: RegExp[],
	removedHeaders: string[] = []
): { entries: T[]; changed: Array<{ name: string; before: string; after: string }> } {
	const changed: Array<{ name: string; before: string; after: string }> = [];
	const cleanedEntries = entries.map((entry) => {
		const description = cleanDescription(entry.description, patterns, removedHeaders);
		if (description !== entry.description) {
			changed.push({ name: entry.name, before: entry.description, after: description });
			return { ...entry, description };
		}
		return entry;
	});

	return { entries: cleanedEntries, changed };
}

if (import.meta.main) {
	const patterns = createHeaderPatterns(SUBCHAPTERS);
	const entries: FunctionEntry[] = JSON.parse(fs.readFileSync(enrichedPath, "utf-8"));
	const shortOutput = process.argv.includes("--short");
	const removedHeaders: string[] = [];
	const result = cleanEntries(entries, patterns, removedHeaders);

	if (shortOutput) {
		for (const header of removedHeaders) {
			console.log(header);
		}
	} else {
		for (const change of result.changed) {
			console.log(`${change.name}:\n  - ${change.before}\n  + ${change.after}`);
		}
		console.log(`\nDescriptions cleaned: ${result.changed.length}`);
	}

	if (process.argv.includes("--write") && result.changed.length > 0) {
		fs.writeFileSync(enrichedPath, `${JSON.stringify(result.entries, null, 2)}\n`, "utf-8");
		if (!shortOutput) {
			console.log(`Updated ${enrichedPath}`);
		}
	} else if (!process.argv.includes("--write")) {
		if (!shortOutput) {
			console.log("Dry run only; pass --write to update functions.enriched.json.");
		}
	}
}
