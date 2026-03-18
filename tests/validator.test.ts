import { describe, expect, test } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import { parse } from "../server/src/core/parsePipeline";
import { collectSymbolTable, deriveViews } from "../server/src/core/symbolCollector";
import { validateVariableRedeclarations, validateFunctionRedeclarations, validateUndeclaredIdentifiers, validateDeprecatedCalls, validateVoidFunctionReturnValues } from "../server/src/core/validators";
import type { IncludeFileVariable, KnownSymbols, DerivedSymbolViews } from "../server/src/core/types";

// The core validators return vscode-languageserver Diagnostic objects.
// We use `any` here to avoid importing the LSP package from the test runner.
type Diagnostic = { severity: number; range: any; message: string; [key: string]: any };

// ─── Thin helpers that replicate the old Validator class API ────────────────

function syntaxDiagnostics(result: ReturnType<typeof parse>): Diagnostic[] {
	return result.syntaxErrors.map(err => ({
		severity: 1 /* Error */,
		range: {
			start: { line: err.line - 1, character: err.column },
			end: { line: err.line - 1, character: err.column + 1 }
		},
		message: err.message
	}));
}

function Validate(text: string): Diagnostic[] {
	return [...ValidateWithIncludes(text, []), ...ValidateWithSymbols(text, { functions: new Set(), variables: new Set(), defines: new Set() })];
}

function ValidateWithIncludes(text: string, includeFileVariables: IncludeFileVariable[]): Diagnostic[] {
	const result = parse(text);
	const synErrs = syntaxDiagnostics(result);
	if (synErrs.length === 0) {
		const varRedecl = validateVariableRedeclarations(result.tree, includeFileVariables, result.conditionalLines);
		const funcRedecl = validateFunctionRedeclarations(result.tree, includeFileVariables);
		return [...synErrs, ...varRedecl, ...funcRedecl];
	}
	return synErrs;
}

function ValidateWithSymbols(text: string, knownSymbols: KnownSymbols): Diagnostic[] {
	const result = parse(text);
	const diagnostics: Diagnostic[] = [];
	diagnostics.push(...validateDeprecatedCalls(result));
	diagnostics.push(...syntaxDiagnostics(result));
	diagnostics.push(...validateUndeclaredIdentifiers(result.tree, knownSymbols));
	return diagnostics;
}

function collectDerivedViews(text: string): DerivedSymbolViews {
	const result = parse(text);
	const table = collectSymbolTable(result, text);
	return deriveViews(table.root);
}

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
		const diagnostics = Validate(text);
		expect(Array.isArray(diagnostics)).toBe(true);
		// This is a real-world macro; it should ideally be clean.
		// If this starts failing, it indicates a grammar/regression in the parser.
		expect(diagnostics.filter(d => d.severity === 1 /* Error */).length).toBe(0);
	});

	test("handles preprocessor directives and top-level blocks", () => {
		const text = readFixture("client/testFixture/Test2.4dm");
		const diagnostics = Validate(text);
		// Test2.4dm has intentional re-declarations marked as "SHOULD BE ERROR"
		// - program_name is declared twice at lines 16-17
		const syntaxErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && !d.message.includes("already declared")
		);
		expect(syntaxErrors.length).toBe(0);
	});

	test("reports an error for clearly invalid input", () => {
		const diagnostics = Validate("void main( {\n");
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = ValidateWithIncludes(code, includeVars);
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
		const diagnostics = ValidateWithIncludes(code, includeVars);
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
		const diagnostics = Validate(code);
		const shadowWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("shadows")
		);
		expect(shadowWarnings.length).toBe(1);
		expect(shadowWarnings[0].message).toContain("line 3");
	});

	test("allows overloaded forward declarations in same file", () => {
		const text = readFixture("client/testFixture/Test7.4dm");
		const diagnostics = Validate(text);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("forward declaration params in header do not cause false errors in including file", () => {
		// Simulate a header with overloaded forward declarations
		const headerCode = [
			'Integer count = 0;',
			'void process();',
			'void process(Integer x);',
			'void process(Integer x, Integer y);',
			'Integer other_var = 5;',
		].join('\n');

		// Step 1: Collect symbols from header (same as server.ts does)
		const headerViews = collectDerivedViews(headerCode);

		// Step 2: Build includeFileVariables the same way server.ts does
		const includeFileVariables: IncludeFileVariable[] = [];
		for (const varName of headerViews.exportedVariables.keys()) {
			includeFileVariables.push({ name: varName, sourceFile: 'header.h', kind: 'variable' });
		}
		for (const funcName of headerViews.exportedFunctions.keys()) {
			includeFileVariables.push({ name: funcName, sourceFile: 'header.h', kind: 'function' });
		}

		// Step 3: Build knownSymbols the same way server.ts does for ValidateWithSymbols
		const knownSymbols: KnownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		for (const fn of headerViews.exportedFunctions.keys()) {
			knownSymbols.functions.add(fn.toLowerCase());
		}
		for (const v of headerViews.exportedVariables.keys()) {
			knownSymbols.variables.add(v.toLowerCase());
		}

		// Step 4: Validate a main file that uses the same parameter names
		const mainCode = [
			'void my_func() {',
			'    Integer x = 1;',
			'    Integer y = 2;',
			'}',
		].join('\n');

		// ValidateWithIncludes: x and y should NOT be flagged as redeclarations
		const includeDiagnostics = ValidateWithIncludes(mainCode, includeFileVariables);
		const redeclErrors = includeDiagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);

		// ValidateWithSymbols: x and y should NOT be flagged as undeclared
		const symbolDiagnostics = ValidateWithSymbols(mainCode, knownSymbols);
		const undeclaredWarnings = symbolDiagnostics.filter(d =>
			d.severity === 2 /* Warning */ && d.message.includes("not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});
});

describe("Function redeclaration detection (issue #44)", () => {
	test("reports error for redefining function with same signature", () => {
		const code = `
void greet() {
    return;
}

void greet() {
    return;
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("greet");
	});

	test("allows function overloads with different parameter signatures", () => {
		const code = `
void process();

void process(Integer x);

void process(Integer x, Integer y);
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("detects redefinition after overload declaration", () => {
		const code = `
void process() {
    Integer a = 5;
}

void process(Integer x) {
    Integer b = 10;
}

void process(Integer x) {
    Integer c = 15;
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		// Should report redefinition of process(Integer x)
		expect(redeclErrors.length).toBeGreaterThan(0);
		expect(redeclErrors.some(e => e.message.includes("process"))).toBe(true);
	});

	test("allows functions with same name in different files (via includes)", () => {
		const code = `
void helper() {
    Integer x = 1;
}
`;
		// Simulate a function in an include file
		const includeVars = [
			{ name: "helper", sourceFile: "utils.h", kind: 'function' as const }
		];
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		// Should now report an error because helper is redefined from utils.h
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("utils.h");
	});

	test("detects redefinition of function declared in header file", () => {
		// Simulate functions from a header file
		const includeVars = [
			{ name: "initialize", sourceFile: "setup.h", kind: 'function' as const },
			{ name: "cleanup", sourceFile: "setup.h", kind: 'function' as const }
		];
		
		// Source file tries to redefine initialize
		const code = `
void initialize() {
    Integer x = 1;
}

void main() {
    initialize();
}
`;
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("setup.h");
		expect(redeclErrors[0].message).toContain("initialize");
	});

	test("allows defining functions not in header files", () => {
		// Simulate functions from a header file
		const includeVars = [
			{ name: "setup", sourceFile: "utils.h", kind: 'function' as const }
		];
		
		// Source file defines a different function
		const code = `
void process() {
    Integer x = 1;
}

void main() {
    process();
}
`;
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("case-insensitive redeclaration detection", () => {
		const code = `
void MyFunc() {
    return;
}

void myfunc() {
    return;
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toMatch(/MyFunc|myfunc/i);
	});

	test("multiple redeclarations are all reported", () => {
		const code = `
void func() { }
void func() { }
void func() { }
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(2);
	});
});

describe("RHS operand validation (issue #26)", () => {
	test("reports warning for undeclared variable on RHS of assignment", () => {
		const code = `
void main() {
    Integer x = undeclaredVar;
}
`;
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
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
		// Provide the defines as known symbols (normally collected by server.ts from document text)
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set(['my_constant', 'another_macro'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("does not flag TRUE and FALSE as undeclared when provided as defines", () => {
		const code = `
void main() {
    Integer flag = TRUE;
    Integer other = FALSE;
}
`;
		// TRUE and FALSE are typically defined in include files or as macros
		// The server.ts collects these from include files - here we simulate that
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set(['true', 'false'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validate(code);
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
		const diagnostics = Validate(code);
		const typeMismatchWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("Case type mismatch")
		);
		expect(typeMismatchWarnings.length).toBe(0);
	});
});

describe("KnownSymbols validation (PR #30 refactor)", () => {
	// =========================================================================
	// Known Functions Tests
	// =========================================================================
	
	test("does not flag known function calls as undeclared", () => {
		const code = `
void main() {
    Integer result = my_custom_function(1, 2);
}
`;
		const knownSymbols = {
			functions: new Set(['my_custom_function']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("function name matching is case-insensitive", () => {
		const code = `
void main() {
    Integer a = MyFunction();
    Integer b = MYFUNCTION();
    Integer c = myfunction();
}
`;
		const knownSymbols = {
			functions: new Set(['myfunction']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	// =========================================================================
	// Known Variables Tests
	// =========================================================================
	
	test("does not flag known variables from includes as undeclared", () => {
		const code = `
void main() {
    Integer x = global_var_from_include;
    Real y = another_include_var + 10.0;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set(['global_var_from_include', 'another_include_var']),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("variable name matching is case-insensitive", () => {
		const code = `
void main() {
    Integer a = GlobalVar;
    Integer b = GLOBALVAR;
    Integer c = globalvar;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set(['globalvar']),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	// =========================================================================
	// Known Defines Tests
	// =========================================================================
	
	test("does not flag known defines from includes as undeclared", () => {
		const code = `
void main() {
    Integer x = MAX_VALUE;
    Integer y = MIN_VALUE;
    Real pi = PI_CONSTANT;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set(['max_value', 'min_value', 'pi_constant'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("define name matching is case-insensitive", () => {
		const code = `
void main() {
    Integer a = MY_DEFINE;
    Integer b = my_define;
    Integer c = My_Define;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set(['my_define'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	// =========================================================================
	// Combined Symbol Sources Tests
	// =========================================================================
	
	test("handles mixed sources: functions, variables, and defines", () => {
		const code = `
void main() {
    Integer a = include_function(global_var);
    Integer b = DEFINE_CONSTANT + local_declared;
    Integer local_declared = 10;
}
`;
		const knownSymbols = {
			functions: new Set(['include_function']),
			variables: new Set(['global_var']),
			defines: new Set(['define_constant'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		// local_declared is used before declaration in this simplified test
		// The validator should still flag truly undeclared identifiers
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("still flags undeclared identifiers when known symbols provided", () => {
		const code = `
void main() {
    Integer x = known_var + unknown_var;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set(['known_var']),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(1);
		expect(undeclaredWarnings[0].message).toContain("unknown_var");
	});

	// =========================================================================
	// Local Declaration Priority Tests
	// =========================================================================
	
	test("locally declared variables take precedence", () => {
		const code = `
void main() {
    Integer my_var = 10;
    Integer x = my_var + 5;
}
`;
		// Even with empty known symbols, local declarations should work
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("function parameters are recognized without known symbols", () => {
		const code = `
void process(Integer input_val, Text message) {
    Integer x = input_val * 2;
    Text result = message;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	// =========================================================================
	// Edge Cases
	// =========================================================================
	
	test("handles empty known symbols gracefully", () => {
		const code = `
void main() {
    Integer x = 10;
    Integer y = x + 5;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		// Should not crash and should recognize local declarations
		expect(Array.isArray(diagnostics)).toBe(true);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("handles large number of known symbols", () => {
		const code = `
void main() {
    Integer x = symbol_999;
}
`;
		// Create a large set of known variables
		const manySymbols = new Set<string>();
		for (let i = 0; i < 1000; i++) {
			manySymbols.add(`symbol_${i}`);
		}
		const knownSymbols = {
			functions: new Set<string>(),
			variables: manySymbols,
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("does not flag identifiers in nested expressions with known symbols", () => {
		const code = `
void main() {
    Integer result = ((known_a + known_b) * known_c) / known_d;
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set(['known_a', 'known_b', 'known_c', 'known_d']),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("handles function call with known function and known variable arguments", () => {
		const code = `
void main() {
    Integer result = process_data(input_var, config_value);
}
`;
		const knownSymbols = {
			functions: new Set(['process_data']),
			variables: new Set(['input_var', 'config_value']),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("flags undeclared arguments to known functions", () => {
		const code = `
void main() {
    Integer result = known_function(unknown_arg);
}
`;
		const knownSymbols = {
			functions: new Set(['known_function']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		// Should flag unknown_arg as undeclared
		expect(undeclaredWarnings.some(d => d.message.includes("unknown_arg"))).toBe(true);
	});

	// =========================================================================
	// Backward Compatibility Tests
	// =========================================================================
	
	test("Validate() method still works without symbols (backward compatibility)", () => {
		const code = `
void main() {
    Integer x = 10;
    Integer y = x + 5;
}
`;
		// Using the basic Validate() method without symbols
		const diagnostics = Validate(code);
		expect(Array.isArray(diagnostics)).toBe(true);
		// Local declarations should still work
		const undeclaredWarnings = diagnostics.filter(d => 
			d.severity === 2 /* Warning */ && d.message.includes("is not declared")
		);
		expect(undeclaredWarnings.length).toBe(0);
	});

	test("syntax errors are reported with proper severity (Error not Warning)", () => {
		const code = `
void main() {
    Integer x = ;
}
`;
		const diagnostics = Validate(code);
		const syntaxErrors = diagnostics.filter(d => d.severity === 1 /* Error */);
		expect(syntaxErrors.length).toBeGreaterThan(0);
	});
});

describe("#if/#else branch handling", () => {
	test("does not report redeclaration for same variable in #if/#else branches", () => {
		const code = `
void main() {
#if VERSION_4D >= 1400
	Panel panel = Create_panel("test", TRUE);
#else
	Panel panel = Create_panel("test");
#endif
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("does not report redeclaration for #ifdef/#else branches", () => {
		const code = `
void main() {
#ifdef SOME_FLAG
	Integer breakline = 1;
#else
	Integer breakline = 2;
#endif
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("still strips #if 0 dead code", () => {
		const code = `
void main() {
#if 0
	this is dead code and should not parse
#endif
	Integer x = 1;
}
`;
		const diagnostics = Validate(code);
		const syntaxErrors = diagnostics.filter(d => d.severity === 1 /* Error */);
		expect(syntaxErrors.length).toBe(0);
	});

	test("#if 0 with #else keeps the else branch", () => {
		const code = `
void main() {
#if 0
	Integer dead_var = 999;
#else
	Integer live_var = 1;
#endif
	Integer result = live_var + 1;
}
`;
		const diagnostics = Validate(code);
		const syntaxErrors = diagnostics.filter(d => d.severity === 1 /* Error */);
		expect(syntaxErrors.length).toBe(0);
	});

	test("handles nested #if inside #if/#else without false redeclarations", () => {
		const code = `
void main() {
#if CONDITION_A
	#if CONDITION_B
		Integer val = 1;
	#else
		Integer val = 2;
	#endif
#else
	Integer val = 3;
#endif
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("does not report redeclaration when variable declared unconditionally then inside #if block", () => {
		// Real-world pattern from fit_3pt_arcs_panel.4dm:
		// Variable declared unconditionally, then re-declared inside a #if block.
		// At runtime only one declaration exists (preprocessor either includes the block or not).
		const code = `
void process_elements() {
	Integer breakline = 0;
	Integer rv = 0;
#if ALLOW_ONLY_LINE_STRINGS == 1
	Integer breakline = 0;
	rv = Get_breakline(breakline);
#endif
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("still reports real redeclaration outside any #if block", () => {
		const code = `
void main() {
	Integer x = 1;
	Integer x = 2;
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBeGreaterThan(0);
	});
});

// ─── Void function return value validation (#46) ───────────────────────────

function ValidateVoidReturnValues(text: string, externalReturnTypes: Map<string, string> = new Map()): Diagnostic[] {
	const result = parse(text);
	const synErrs = syntaxDiagnostics(result);
	if (synErrs.length > 0) return synErrs;
	return validateVoidFunctionReturnValues(result.tree, externalReturnTypes) as Diagnostic[];
}

describe("Void function return value validation (#46)", () => {
	test("flags void function call in if condition comparison", () => {
		const code = `
void My_check() {
}

void main() {
	if (My_check() == 0) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("My_check()");
		expect(diagnostics[0].message).toContain("void");
	});

	test("flags void function call in if condition alone", () => {
		const code = `
void My_check() {
}

void main() {
	if (My_check()) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("void");
	});

	test("allows void function call as standalone statement", () => {
		const code = `
void My_check() {
}

void main() {
	My_check();
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags void function call in assignment RHS", () => {
		const code = `
void My_func() {
}

void main() {
	Integer x = 0;
	x = My_func();
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("My_func()");
	});

	test("flags void function call as function argument", () => {
		const code = `
void My_func() {
}

Integer Do_something(Integer val) {
	return val;
}

void main() {
	Do_something(My_func());
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("My_func()");
	});

	test("flags void function call in while condition", () => {
		const code = `
void My_check() {
}

void main() {
	while (My_check()) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
	});

	test("allows non-void function call in expression", () => {
		const code = `
Integer My_check() {
	return 1;
}

void main() {
	if (My_check() == 0) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows non-void function call as standalone statement", () => {
		const code = `
Integer My_check() {
	return 1;
}

void main() {
	My_check();
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags void function call in arithmetic expression", () => {
		const code = `
void My_func() {
}

void main() {
	Integer x = My_func() + 1;
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
	});

	test("flags void function call in return statement", () => {
		const code = `
void My_func() {
}

Integer main() {
	return My_func();
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
	});

	test("resolves external function return types", () => {
		const externalReturnTypes = new Map<string, string>();
		externalReturnTypes.set("ext_void_func", "void");
		externalReturnTypes.set("ext_int_func", "Integer");

		const code = `
void main() {
	ext_void_func();
	if (ext_void_func() == 0) {
	}
	if (ext_int_func() == 0) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code, externalReturnTypes);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("ext_void_func()");
	});

	test("flags multiple void calls in same function", () => {
		const code = `
void My_func() {
}

void main() {
	Integer x = My_func();
	if (My_func() == 0) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(2);
	});

	test("is case-sensitive for function names", () => {
		const code = `
void my_func() {
}

void main() {
	if (MY_FUNC() == 0) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(0);
	});
});
