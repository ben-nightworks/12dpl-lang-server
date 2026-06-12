import { describe, expect, test } from "bun:test";
import { format12dplDocument } from "../server/src/services/formattingService.ts";

describe("format12dplDocument", () => {
	test("indents braces and preserves newline style", () => {
		const input = "void main() {\r\n{\r\nText x = \"{not a brace}\"; // } in comment\r\n}\r\n}\r\n";
		const formatted = format12dplDocument(input, { insertSpaces: true, tabSize: 4 });

		// Newline style preserved
		expect(formatted.includes("\r\n")).toBe(true);

		const lines = formatted.split("\r\n");
		expect(lines[0]).toBe("void main() {");
		expect(lines[1]).toBe("    {");
		expect(lines[2]).toBe("        Text x = \"{not a brace}\"; // } in comment");
		expect(lines[3]).toBe("    }");
		expect(lines[4]).toBe("}");
	});

	test("keeps preprocessor directives hard-left", () => {
		const input = "#if DEBUG\n{\nInteger x=1;\n}\n#endif\n";
		const formatted = format12dplDocument(input, { insertSpaces: true, tabSize: 2 });
		const lines = formatted.split("\n");
		expect(lines[0]).toBe("#if DEBUG");
		expect(lines[4]).toBe("#endif");
	});

	test("strips blank line whitespace by default", () => {
		const input = "void main() {\n    \n}\n";
		const formatted = format12dplDocument(input, { insertSpaces: true, tabSize: 4 });
		const lines = formatted.split("\n");
		// blank line should be empty
		expect(lines[1]).toBe("");
	});

	test("preserveBlankLines: keeps original whitespace on blank lines", () => {
		const input = "void main() {\n    \n}\n";
		const formatted = format12dplDocument(input, {
			insertSpaces: true,
			tabSize: 4,
			preserveBlankLines: true
		});
		const lines = formatted.split("\n");
		// blank line should keep its original whitespace intact
		expect(lines[1]).toBe("    ");
	});

	test("preserveBlankLines: truly empty blank lines remain empty", () => {
		const input = "void main() {\n\n}\n";
		const formatted = format12dplDocument(input, {
			insertSpaces: true,
			tabSize: 4,
			preserveBlankLines: true
		});
		const lines = formatted.split("\n");
		expect(lines[1]).toBe("");
	});

	test("preserveBlankLines: non-blank lines still get correct indentation", () => {
		const input = "void main() {\n    \nInteger x = 1;\n}\n";
		const formatted = format12dplDocument(input, {
			insertSpaces: true,
			tabSize: 4,
			preserveBlankLines: true
		});
		const lines = formatted.split("\n");
		expect(lines[0]).toBe("void main() {");
		expect(lines[1]).toBe("    "); // blank line preserved as-is
		expect(lines[2]).toBe("    Integer x = 1;"); // non-blank still indented
		expect(lines[3]).toBe("}");
	});
});

describe("format12dplDocument — bracketStyle", () => {
	const base = { insertSpaces: true, tabSize: 4 };

	// ── same-line (K&R) ──────────────────────────────────────────────────────

	test("same-line: merges lone { onto previous line", () => {
		const input = "void main()\n{\n    Integer x = 1;\n}\n";
		const lines = format12dplDocument(input, { ...base, bracketStyle: 'same-line' }).split("\n");
		expect(lines[0]).toBe("void main() {");
		expect(lines[1]).toBe("    Integer x = 1;");
		expect(lines[2]).toBe("}");
	});

	test("same-line: absorbs blank lines between statement and lone {", () => {
		const input = "void foo()\n\n{\n    Integer x;\n}\n";
		const lines = format12dplDocument(input, { ...base, bracketStyle: 'same-line' }).split("\n");
		expect(lines[0]).toBe("void foo() {");
		expect(lines[1]).toBe("    Integer x;");
	});

	test("same-line: does not change a brace already on the same line", () => {
		const input = "void main() {\n    Integer x = 1;\n}\n";
		const lines = format12dplDocument(input, { ...base, bracketStyle: 'same-line' }).split("\n");
		expect(lines[0]).toBe("void main() {");
	});

	test("same-line: handles nested blocks", () => {
		const input = "void main()\n{\n    if (x)\n    {\n        Integer y;\n    }\n}\n";
		const out = format12dplDocument(input, { ...base, bracketStyle: 'same-line' });
		const lines = out.split("\n");
		expect(lines[0]).toBe("void main() {");
		expect(lines[1]).toBe("    if (x) {");
		expect(lines[2]).toBe("        Integer y;");
	});

	// ── new-line (Allman) ─────────────────────────────────────────────────────

	test("new-line: splits trailing { onto its own line", () => {
		const input = "void main() {\n    Integer x = 1;\n}\n";
		const lines = format12dplDocument(input, { ...base, bracketStyle: 'new-line' }).split("\n");
		expect(lines[0]).toBe("void main()");
		expect(lines[1]).toBe("{");
		expect(lines[2]).toBe("    Integer x = 1;");
		expect(lines[3]).toBe("}");
	});

	test("new-line: splits } else { correctly", () => {
		const input = "void main() {\n    if (x) {\n        Integer a;\n    } else {\n        Integer b;\n    }\n}\n";
		const out = format12dplDocument(input, { ...base, bracketStyle: 'new-line' });
		// } else { is indented at level 1, so the split produces "    } else" and "    {"
		expect(out).toContain("} else\n    {");
	});

	test("new-line: does not split a lone { line", () => {
		// Starting from Allman input — lone { should remain lone {
		const input = "void main()\n{\n    Integer x;\n}\n";
		const lines = format12dplDocument(input, { ...base, bracketStyle: 'new-line' }).split("\n");
		// After indentation pass lone { stays. No further splitting of lone {.
		expect(lines[0]).toBe("void main()");
		expect(lines[1]).toBe("{");
	});

	test("new-line: does not split { inside a string", () => {
		const input = 'void main() {\n    Text x = "{";\n}\n';
		const out = format12dplDocument(input, { ...base, bracketStyle: 'new-line' });
		// The string line should not be touched by Allman splitting
		expect(out).toContain('Text x = "{";');
	});

	test("new-line: does not split { inside a line comment", () => {
		const input = "void main() {\n    Integer x = 1; // value {\n}\n";
		const lines = format12dplDocument(input, { ...base, bracketStyle: 'new-line' }).split("\n");
		// "    Integer x = 1; // value {" ends with { in comment — should not split
		const commentLine = lines.find(l => l.includes("// value {"));
		expect(commentLine).toBeDefined();
	});

	test("new-line: does not split preprocessor directives", () => {
		// #if lines are already kept hard-left; Allman should not attempt to split them
		const input = "#if DEBUG\nvoid foo() {\n    Integer x;\n}\n#endif\n";
		const out = format12dplDocument(input, { ...base, bracketStyle: 'new-line' });
		expect(out).toContain("#if DEBUG");
		// The { after void foo() should split
		expect(out).toContain("void foo()\n{");
	});

	// ── preserve (default) ────────────────────────────────────────────────────

	test("preserve: does not reposition braces", () => {
		const input = "void main() {\n    Integer x = 1;\n}\n";
		const out = format12dplDocument(input, { ...base, bracketStyle: 'preserve' });
		expect(out.split("\n")[0]).toBe("void main() {");
	});
});

describe("format12dplDocument — block comment preservation (#104)", () => {
	const base = { insertSpaces: true, tabSize: 4 };

	test("lines inside block comment are kept as-is (not reindented)", () => {
		//   The comment body has unusual indentation — the formatter must not touch it.
		const input = "void main() {\n/*\n * This is a block comment\n *   with odd indentation\n */\n    Integer x = 1;\n}\n";
		const out = format12dplDocument(input, base);
		expect(out).toContain(" * This is a block comment");
		expect(out).toContain(" *   with odd indentation");
		expect(out).toContain(" */");
	});

	test("the line that opens /* is still indented normally", () => {
		const input = "void main() {\n/* starts here */\n    Integer x = 1;\n}\n";
		const out = format12dplDocument(input, base);
		const lines = out.split("\n");
		// The /* line starts the comment but was not already inside one — format normally
		expect(lines[1]).toBe("    /* starts here */");
	});

	test("single-line /* */ comment is indented normally", () => {
		const input = "void main() {\n/* one liner */\nInteger x = 1;\n}\n";
		const out = format12dplDocument(input, base);
		const lines = out.split("\n");
		expect(lines[1]).toBe("    /* one liner */");
		expect(lines[2]).toBe("    Integer x = 1;");
	});

	test("code after closing */ is indented normally", () => {
		const input = "void main() {\n/*\n * comment\n */\nInteger x = 1;\n}\n";
		const out = format12dplDocument(input, base);
		// The line with */ is inside the comment (preserved), but the next code line is normal
		expect(out).toContain("    Integer x = 1;");
	});

	test("block comment inside nested block still preserved", () => {
		const input = "void main() {\n    if (x) {\n/*\n * nested comment\n */\n        Integer y;\n    }\n}\n";
		const out = format12dplDocument(input, base);
		expect(out).toContain(" * nested comment");
		expect(out).toContain("        Integer y;");
	});
});

describe("format12dplDocument — maxLineLength", () => {
	const base = { insertSpaces: true, tabSize: 4 };

	test("lines at or below the limit are unchanged", () => {
		const input = "void main() {\n    Integer x = 1;\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 80 });
		expect(out).toBe(format12dplDocument(input, base));
	});

	test("wraps at rightmost comma before the limit", () => {
		// Line: "    Integer result = someFunc(paramOne, paramTwo, paramThree);" (62 chars)
		const input = "void main() {\n    Integer result = someFunc(paramOne, paramTwo, paramThree);\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 55 });
		const lines = out.split("\n");
		// Should break after the last comma that fits within 55 chars
		expect(lines.some(l => l.trimEnd().endsWith(","))).toBe(true);
		// No line should exceed the limit
		expect(lines.every(l => l.length <= 55)).toBe(true);
	});

	test("wraps at && before the limit", () => {
		const input = "void main() {\n    if (conditionOne && conditionTwo && conditionThree) {\n    }\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 40 });
		const lines = out.split("\n");
		expect(lines.every(l => l.length <= 40)).toBe(true);
	});

	test("wraps at || before the limit", () => {
		const input = "void main() {\n    if (firstCondition || secondCondition || thirdCondition) {\n    }\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 40 });
		const lines = out.split("\n");
		expect(lines.every(l => l.length <= 40)).toBe(true);
	});

	test("leaves line unchanged when no safe break exists before limit", () => {
		// A very long identifier with no break points
		const input = "void main() {\n    Integer averylongvariablenamethathasnosafebreakpoint = 0;\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 20 });
		// The offending line cannot be broken — it must be output as-is
		expect(out).toContain("averylongvariablenamethathasnosafebreakpoint");
	});

	test("does not break inside a string", () => {
		const input = 'void main() {\n    Text x = "a very long string, with a comma inside it that is long";\n}\n';
		const out = format12dplDocument(input, { ...base, maxLineLength: 40 });
		// The comma inside the string must not be used as a break point
		expect(out).toContain('"a very long string, with a comma inside it that is long"');
	});

	test("does not wrap preprocessor directives", () => {
		const input = "#define VERY_LONG_MACRO_NAME(a, b, c) ((a) + (b) + (c))\nvoid main() {\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 20 });
		expect(out).toContain("#define VERY_LONG_MACRO_NAME(a, b, c) ((a) + (b) + (c))");
	});

	test("applies recursively for very long lines", () => {
		// Force multiple wraps
		const input = "void main() {\n    Integer x = func(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 30 });
		const lines = out.split("\n");
		expect(lines.every(l => l.length <= 30)).toBe(true);
	});

	test("maxLineLength 0 disables wrapping", () => {
		const input = "void main() {\n    Integer result = someFunc(paramOne, paramTwo, paramThree, paramFour, paramFive);\n}\n";
		const out = format12dplDocument(input, { ...base, maxLineLength: 0 });
		// No line breaks inserted — long line stays intact
		expect(out).toContain("someFunc(paramOne, paramTwo, paramThree, paramFour, paramFive)");
	});
});

describe("format12dplDocument — indentStyle (spaces vs tabs)", () => {
	test("insertSpaces: true converts tab-indented file to spaces", () => {
		// Input uses tab indentation
		const input = "void main() {\n\tInteger x = 1;\n\tInteger y = 2;\n}\n";
		const out = format12dplDocument(input, { insertSpaces: true, tabSize: 4 });
		const lines = out.split("\n");
		expect(lines[1]).toBe("    Integer x = 1;");
		expect(lines[2]).toBe("    Integer y = 2;");
		// No tabs remain in the output
		expect(out).not.toContain("\t");
	});

	test("insertSpaces: false converts space-indented file to tabs", () => {
		// Input uses space indentation
		const input = "void main() {\n    Integer x = 1;\n    Integer y = 2;\n}\n";
		const out = format12dplDocument(input, { insertSpaces: false, tabSize: 4 });
		const lines = out.split("\n");
		expect(lines[1]).toBe("\tInteger x = 1;");
		expect(lines[2]).toBe("\tInteger y = 2;");
		// No leading spaces remain (the tab replaces them all)
		expect(lines[1].startsWith(" ")).toBe(false);
	});

	test("insertSpaces: true uses tabSize to control space count per level", () => {
		const input = "void main() {\nif (x) {\nInteger y = 1;\n}\n}\n";
		const out2 = format12dplDocument(input, { insertSpaces: true, tabSize: 2 });
		const out4 = format12dplDocument(input, { insertSpaces: true, tabSize: 4 });
		expect(out2.split("\n")[1]).toBe("  if (x) {");
		expect(out4.split("\n")[1]).toBe("    if (x) {");
	});

	test("insertSpaces: false produces single tab per indent level regardless of tabSize", () => {
		const input = "void main() {\nif (x) {\nInteger y;\n}\n}\n";
		const out = format12dplDocument(input, { insertSpaces: false, tabSize: 4 });
		const lines = out.split("\n");
		// Nested line should have two tabs
		expect(lines[2]).toBe("\t\tInteger y;");
	});

	test("mixed indentation in input is normalised to the chosen style", () => {
		// First block uses tabs, second uses spaces — should both come out as spaces
		const input = "void a() {\n\tInteger x;\n}\nvoid b() {\n    Integer y;\n}\n";
		const out = format12dplDocument(input, { insertSpaces: true, tabSize: 4 });
		expect(out).not.toContain("\t");
		expect(out).toContain("    Integer x;");
		expect(out).toContain("    Integer y;");
	});
});

describe("format12dplDocument — switch/case indentation (#149)", () => {
	const base = { insertSpaces: true, tabSize: 4 };

	test("case label is indented one level inside switch braces", () => {
		const input = "switch (myvar)\n{\ncase (123) :\n{\nbreak;\n}\n}\n";
		const out = format12dplDocument(input, base);
		const lines = out.split("\n");
		expect(lines[2]).toBe("    case (123) :");
	});

	test("default: label is indented one level inside switch braces", () => {
		const input = "switch (myvar)\n{\ndefault:\n{\nbreak;\n}\n}\n";
		const out = format12dplDocument(input, base);
		const lines = out.split("\n");
		expect(lines[2]).toBe("    default:");
	});

	test("default : label (space before colon) is indented consistently with default:", () => {
		const input = "switch (myvar)\n{\ndefault :\n{\nbreak;\n}\n}\n";
		const out = format12dplDocument(input, base);
		const lines = out.split("\n");
		expect(lines[2]).toBe("    default :");
	});

	test("case and default are at the same indent level inside a switch", () => {
		const input = [
			"switch (myvar)",
			"{",
			"case (123) :",
			"{",
			"break;",
			"}",
			"default :",
			"{",
			"break;",
			"}",
			"}",
			""
		].join("\n");
		const out = format12dplDocument(input, base);
		const lines = out.split("\n");
		const caseLine = lines.find(l => l.includes("case (123)"));
		const defaultLine = lines.find(l => l.includes("default :"));
		expect(caseLine).toBe("    case (123) :");
		expect(defaultLine).toBe("    default :");
	});
});
