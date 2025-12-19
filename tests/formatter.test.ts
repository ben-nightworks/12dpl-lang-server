import { describe, expect, test } from "bun:test";
import { format12dplDocument } from "../server/src/formatter.ts";

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
});
