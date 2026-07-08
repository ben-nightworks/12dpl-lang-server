import { describe, expect, test } from "bun:test";
import * as path from "path";

// site_data.js and search.js are plain browser scripts that attach to
// `window`, so provide one before loading them.
(globalThis as any).window = globalThis;

const websiteDir = path.resolve(__dirname, "..", "website", "public");
require(path.join(websiteDir, "site_data.js"));
const DocsSearch = require(path.join(websiteDir, "search.js"));

interface SiteFunction {
	name: string;
	signature: string;
	description: string;
	category: string;
}

interface SiteType {
	name: string;
	description: string;
	group: string;
}

interface SiteSnippet {
	label: string;
	prefix: string;
	description: string;
}

const SITE = (globalThis as any).SITE_DATA as {
	functions: SiteFunction[];
	types: SiteType[];
	snippets: SiteSnippet[];
};

// Mirror the entry mapping used by website/public/app.js (minus the prose
// sections, which live in index.html rather than site_data.js).
const entries = [
	...SITE.functions.map((fn) => ({
		kind: "fn",
		name: fn.name,
		signature: fn.signature,
		description: fn.description,
		category: fn.category,
	})),
	...SITE.types.map((t) => ({
		kind: "type",
		name: t.name,
		signature: "",
		description: t.description,
		category: t.group,
	})),
	...SITE.snippets.map((s) => ({
		kind: "snip",
		name: s.label,
		signature: s.prefix,
		description: s.description,
		category: "",
	})),
];

const engine = DocsSearch.createSearchEngine(entries);

function topResults(query: string, limit = 5): { name: string; signature: string }[] {
	return engine
		.search(query, limit)
		.map((r: { entry: { name: string; signature: string } }) => ({
			name: r.entry.name,
			signature: r.entry.signature,
		}));
}

function topNames(query: string, limit = 5): string[] {
	return topResults(query, limit).map((r) => r.name);
}

// Regression queries from issue #126.
describe("docs site search - intent-based queries (issue #126)", () => {
	test("'Convert a Real or Integer to Text for a report' finds text-conversion functions", () => {
		const names = topNames("Convert a Real or Integer to Text for a report", 10);
		expect(names).toContain("Real_to_text");
		expect(names).toContain("To_text");
		// Text-conversion functions must outrank the generic Convert overloads.
		expect(["Real_to_text", "To_text"]).toContain(names[0]);
		const convert = names.indexOf("Convert");
		if (convert !== -1) {
			expect(names.indexOf("Real_to_text")).toBeLessThan(convert);
			expect(names.indexOf("To_text")).toBeLessThan(convert);
		}
	});

	test("'How do I print text to the output window?' ranks Print first", () => {
		const results = topResults("How do I print text to the output window?");
		expect(results[0].name).toBe("Print");
		expect(results.some((r) => r.signature === "void Print(Text msg)")).toBe(true);
	});

	test("'Clear the 12d output console before printing results' finds Clear_console", () => {
		const names = topNames("Clear the 12d output console before printing results");
		expect(names[0]).toBe("Clear_console");
	});

	test("'Copy console output to clipboard' finds Console_to_clipboard", () => {
		const names = topNames("Copy console output to clipboard");
		expect(names[0]).toBe("Console_to_clipboard");
	});

	test("'Get the id of a widget' ranks the Widget overload of Get_id first", () => {
		const results = topResults("Get the id of a widget");
		expect(results[0].name).toBe("Get_id");
		expect(results[0].signature).toBe("Integer Get_id(Widget widget)");
	});

	test("'Get all elements from a model' ranks Get_elements above Get_element", () => {
		const names = topNames("Get all elements from a model");
		expect(names).toContain("Get_elements");
		const plural = names.indexOf("Get_elements");
		const singular = names.indexOf("Get_element");
		if (singular !== -1) {
			expect(plural).toBeLessThan(singular);
		}
	});
});

describe("docs site search - exact and prefix lookups still work", () => {
	test("exact function name is the top result", () => {
		expect(topNames("Clear_console")[0]).toBe("Clear_console");
		expect(topNames("To_text")[0]).toBe("To_text");
	});

	test("space-separated form of a function name is the top result", () => {
		expect(topNames("real to text")[0]).toBe("Real_to_text");
	});

	test("prefix typing matches longer tokens", () => {
		expect(topNames("conso")).toContain("Console_to_clipboard");
	});

	test("all-stop-word or empty queries return no spurious results", () => {
		expect(engine.search("", 5)).toEqual([]);
	});
});
