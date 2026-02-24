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
		// Test2.4dm has intentional re-declarations marked as "SHOULD BE ERROR"
		// - program_name is declared twice at lines 16-17
		const syntaxErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && !d.message.includes("already declared")
		);
		expect(syntaxErrors.length).toBe(0);
	});

	test("reports an error for clearly invalid input", () => {
		const diagnostics = Validator.Validate("void main( {\n");
		expect(diagnostics.length).toBeGreaterThan(0);
	});
});

describe("Variable re-declaration detection (issue #24)", () => {
	test("reports error for re-declaring variable in same scope", () => {
		const code = `
void main() {
    Integer x = 1;
    Integer x = 2;
}
`;
		const diagnostics = Validator.Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("x");
	});

	test("allows same variable name in different scopes", () => {
		const code = `
void main() {
    Integer x = 1;
    {
        Integer x = 2;
    }
}
`;
		const diagnostics = Validator.Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("allows same variable name in different functions", () => {
		const code = `
void func1() {
    Integer x = 1;
}

void func2() {
    Integer x = 2;
}
`;
		const diagnostics = Validator.Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("reports error for re-declaring function parameter", () => {
		const code = `
void myFunc(Integer x) {
    Integer x = 5;
}
`;
		const diagnostics = Validator.Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(1);
	});

	test("reports multiple re-declarations", () => {
		const code = `
void main() {
    Integer a = 1;
    Integer b = 2;
    Integer a = 3;
    Integer b = 4;
}
`;
		const diagnostics = Validator.Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(2);
	});

	test("handles for-loop variable re-declaration", () => {
		const code = `
void main() {
    Integer i = 10;
    for (Integer i = 0; i < 5; i++) {
    }
}
`;
		const diagnostics = Validator.Validate(code);
		// for-loop creates its own scope, so this should be allowed
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("does not flag function prototypes as variable re-declarations", () => {
		const code = `
void main() {
    Time test();
    Integer other_var = 1;
}
`;
		const diagnostics = Validator.Validate(code);
		// "Time test();" is a function prototype, not a variable declaration.
		// Its parameters should not be treated as variable declarations,
		// but the prototype name itself is still registered as a declaration.
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("reports error when variable conflicts with include file variable", () => {
		const code = `
void main() {
    Integer myVar = 1;
}
`;
		// Simulate variables from include files
		const includeVars = [
			{ name: "myVar", sourceFile: "common.h", kind: 'variable' as const }
		];
		const diagnostics = Validator.ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("common.h");
	});

	test("include file variable check is case-insensitive", () => {
		const code = `
void main() {
    Integer MYVAR = 1;
}
`;
		// Variable in include file is lowercase
		const includeVars = [
			{ name: "myvar", sourceFile: "utils.h", kind: 'variable' as const }
		];
		const diagnostics = Validator.ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("utils.h");
	});

	test("reports warning when local variable shadows global variable in same file", () => {
		const code = `
{
    Text prog_name = "Global";
}
void main() {
    Text prog_name = "Local";
}
`;
		const diagnostics = Validator.Validate(code);
		const shadowWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("shadows")
		);
		expect(shadowWarnings.length).toBe(1);
		expect(shadowWarnings[0].message).toContain("line 3");
	});
});
