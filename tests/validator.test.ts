import { describe, expect, test } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import { Validator } from "../server/src/antlr/validator.ts";

function repoRoot(): string {
	// tests/* lives one level below repo root
	return path.resolve(import.meta.dir, "..");
}

function readFixture(relPath: string): string {
	return fs.readFileSync(path.join(repoRoot(), relPath), "utf-8");
}

describe("Validator.Validate", () => {
	test("parses the large fixture without crashing", () => {
		const text = readFixture("client/testFixture/Test.4dm");
		const diagnostics = Validator.Validate(text);
		expect(Array.isArray(diagnostics)).toBe(true);
		// This is a real-world macro; it should ideally be clean.
		// If this starts failing, it indicates a grammar/regression in the parser.
		expect(diagnostics.filter(d => d.severity === 1 /* Error */).length).toBe(0);
	});

	test("handles preprocessor directives and top-level blocks", () => {
		const text = readFixture("client/testFixture/Test2.4dm");
		const diagnostics = Validator.Validate(text);
		expect(diagnostics.filter(d => d.severity === 1 /* Error */).length).toBe(0);
	});

	test("reports an error for clearly invalid input", () => {
		const diagnostics = Validator.Validate("void main( {\n");
		expect(diagnostics.length).toBeGreaterThan(0);
	});
});

describe("RHS operand validation (issue #26)", () => {
	test("reports warning for undeclared variable on RHS of assignment", () => {
		const code = `
void main() {
    Integer x = undeclaredVar;
}
`;
		const diagnostics = Validator.Validate(code);
		const warnings = diagnostics.filter(d => d.severity === 2 /* Warning */);
		expect(warnings.length).toBeGreaterThan(0);
		expect(warnings.some(d => d.message.includes("undeclaredVar"))).toBe(true);
	});

	test("does not report warning for declared variable on RHS", () => {
		const code = `
void main() {
    Integer y = 10;
    Integer x = y;
}
`;
		const diagnostics = Validator.Validate(code);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("reports warning for undeclared variable in expression", () => {
		const code = `
void main() {
    Integer x = 5;
    Integer y = x + undeclaredVar + 10;
}
`;
		const diagnostics = Validator.Validate(code);
		const warnings = diagnostics.filter(d => d.severity === 2 /* Warning */);
		expect(warnings.length).toBeGreaterThan(0);
		expect(warnings.some(d => d.message.includes("undeclaredVar"))).toBe(true);
	});

	test("handles function parameters as declared", () => {
		const code = `
void myFunc(Integer param1, Real param2) {
    Integer x = param1;
    Real y = param2;
}
`;
		const diagnostics = Validator.Validate(code);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("handles for-loop declarations", () => {
		const code = `
void main() {
    for (Integer i = 0; i < 10; i++) {
        Integer x = i;
    }
}
`;
		const diagnostics = Validator.Validate(code);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("does not flag function calls as undeclared", () => {
		const code = `
void main() {
    Integer x = someFunction(1, 2);
}
`;
		const diagnostics = Validator.Validate(code);
		// Function calls should not be flagged as undeclared variables
		const warnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("someFunction")
		);
		expect(warnings.length).toBe(0);
	});

	test("reports multiple undeclared variables", () => {
		const code = `
void main() {
    Integer x = undeclared1 + undeclared2;
}
`;
		const diagnostics = Validator.Validate(code);
		const warnings = diagnostics.filter(d => d.severity === 2 /* Warning */);
		expect(warnings.length).toBeGreaterThanOrEqual(2);
		expect(warnings.some(d => d.message.includes("undeclared1"))).toBe(true);
		expect(warnings.some(d => d.message.includes("undeclared2"))).toBe(true);
	});

	test("does not flag #define macro identifiers as undeclared", () => {
		const code = `
#define MY_CONSTANT 42
#define ANOTHER_MACRO 100

void main() {
    Integer x = MY_CONSTANT;
    Integer y = ANOTHER_MACRO + 10;
}
`;
		const diagnostics = Validator.Validate(code);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("does not flag TRUE and FALSE as undeclared", () => {
		const code = `
void main() {
    Integer flag = TRUE;
    Integer other = FALSE;
}
`;
		const diagnostics = Validator.Validate(code);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("reports type mismatch when switch on Integer uses string case", () => {
		const code = `
void main() {
    Integer x = 1;
    switch(x)
    {
    case "Test":
        {
        }
    case 0:
        {
        }
    }
}
`;
		const diagnostics = Validator.Validate(code);
		const typeMismatchWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("Case type mismatch")
		);
		expect(typeMismatchWarnings.length).toBe(1);
		expect(typeMismatchWarnings[0].message).toContain("Integer");
		expect(typeMismatchWarnings[0].message).toContain("Text");
	});

	test("does not report type mismatch for matching switch/case types", () => {
		const code = `
void main() {
    Text status = "ok";
    switch(status)
    {
    case "ok":
        {
        }
    case "error":
        {
        }
    }
}
`;
		const diagnostics = Validator.Validate(code);
		const typeMismatchWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("Case type mismatch")
		);
		expect(typeMismatchWarnings.length).toBe(0);
	});
});
