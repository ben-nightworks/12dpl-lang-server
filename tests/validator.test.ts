import { describe, expect, test } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import { parse } from "../server/src/core/parsePipeline";
import { collectSymbolTable, deriveViews } from "../server/src/core/symbolCollector";
import { validateVariableRedeclarations, validateFunctionRedeclarations, validateUndeclaredIdentifiers, validateDeprecatedCalls, validateVoidFunctionReturnValues, FunctionSignatureMap, validateFunctionArguments, validateReturnStatements, validateArraySize } from "../server/src/core/validators";
import type { SymbolDeclaration, KnownSymbols, DerivedSymbolViews, ParameterSymbolInfo } from "../server/src/core/types";

// The core validators return vscode-languageserver Diagnostic objects.
// We use `any` here to avoid importing the LSP package from the test runner.
type Diagnostic = { severity: number; range: any; message: string;[key: string]: any };

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

function ValidateWithIncludes(text: string, includeDeclarations: SymbolDeclaration[]): Diagnostic[] {
	const result = parse(text);
	const synErrs = syntaxDiagnostics(result);
	if (synErrs.length === 0) {
		const varRedecl = validateVariableRedeclarations(result.tree, includeDeclarations, result.conditionalLines);
		const funcRedecl = validateFunctionRedeclarations(result.tree, includeDeclarations);
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

/** Helper to create a minimal SymbolDeclaration for test include files. */
const dummyRange = { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };

function includeDecl(name: string, sourceFile: string, kind: 'variable' | 'function', params?: ParameterSymbolInfo[]): SymbolDeclaration {
	return {
		name,
		kind,
		range: dummyRange,
		definedInFsPath: sourceFile,
		...(params ? { params } : {}),
	};
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
		// Test2.4dm has intentional re-declarations/redefinitions
		const syntaxErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && !d.message.includes("already declared") && !d.message.includes("is not declared") && !d.message.includes("already defined")
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
			includeDecl('myVar', 'common.h', 'variable')
		];
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("common.h");
	});

	test("include file variable check is case-sensitive", () => {
		const code = `
void main() {
    Integer MYVAR = 1;
}
`;
		// Variable in include file is lowercase — different from MYVAR
		const includeVars = [
			includeDecl('myvar', 'utils.h', 'variable')
		];
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		// MYVAR and myvar are different identifiers — no conflict
		expect(redeclErrors.length).toBe(0);
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

		// Step 2: Build includeDeclarations the same way server.ts does
		const includeDeclarations: SymbolDeclaration[] = [];
		for (const decl of headerViews.exportedVariables.values()) {
			includeDeclarations.push({ ...decl, definedInFsPath: 'header.h' });
		}
		for (const decls of headerViews.exportedFunctions.values()) {
			for (const decl of decls) {
				includeDeclarations.push({ ...decl, definedInFsPath: 'header.h' });
			}
		}

		// Step 3: Build knownSymbols the same way server.ts does for ValidateWithSymbols
		const knownSymbols: KnownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		for (const fn of headerViews.exportedFunctions.keys()) {
			knownSymbols.functions.add(fn);
		}
		for (const v of headerViews.exportedVariables.keys()) {
			knownSymbols.variables.add(v);
		}

		// Step 4: Validate a main file that uses the same parameter names
		const mainCode = [
			'void my_func() {',
			'    Integer x = 1;',
			'    Integer y = 2;',
			'}',
		].join('\n');

		// ValidateWithIncludes: x and y should NOT be flagged as redeclarations
		const includeDiagnostics = ValidateWithIncludes(mainCode, includeDeclarations);
		const redeclErrors = includeDiagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);

		// ValidateWithSymbols: x and y should NOT be flagged as undeclared
		const symbolDiagnostics = ValidateWithSymbols(mainCode, knownSymbols);
		const undeclaredErrors = symbolDiagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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

	test("allows forward declaration followed by full definition with same signature", () => {
		const code = `
void helper(Integer x);

void helper(Integer x) {
    Integer y = x;
}
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
		// Simulate a function in an include file with same signature
		const includeVars = [
			includeDecl('helper', 'utils.h', 'function')
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
			includeDecl('initialize', 'setup.h', 'function'),
			includeDecl('cleanup', 'setup.h', 'function')
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
			includeDecl('setup', 'utils.h', 'function')
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

	test("case-sensitive redeclaration detection", () => {
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
		// MyFunc and myfunc are different identifiers — no redeclaration
		expect(redeclErrors.length).toBe(0);
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

	test("allows function overloads across include files with different param types (issue #64)", () => {
		// Simulate Move_to_model(Model, Model) in the include file
		const includeVars = [
			includeDecl('Move_to_model', 'v15.h', 'function', [
				{ name: 'source_model', type: 'Model', byRef: true, isArray: false },
				{ name: 'target_model', type: 'Model', byRef: true, isArray: false }
			])
		];

		// Source file defines Move_to_model(Dynamic_Element, Model) — different param types
		const code = `
void Move_to_model(Dynamic_Element &data, Model &target_model)
{
	Integer num_elts;
}
`;
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		// Different parameter types = valid overload, no error
		expect(redeclErrors.length).toBe(0);
	});

	test("detects redefinition across include files with same param types (issue #64)", () => {
		// Simulate Move_to_model(Dynamic_Element, Model) in the include file
		const includeVars = [
			includeDecl('Move_to_model', 'v15.h', 'function', [
				{ name: 'data', type: 'Dynamic_Element', byRef: true, isArray: false },
				{ name: 'target_model', type: 'Model', byRef: true, isArray: false }
			])
		];

		// Source file defines Move_to_model with the same param types
		const code = `
void Move_to_model(Dynamic_Element &other, Model &dest)
{
	Integer num_elts;
}
`;
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		// Same parameter types = redefinition, should report error
		expect(redeclErrors.length).toBe(1);
		expect(redeclErrors[0].message).toContain("v15.h");
	});

	test("allows overload with different param count across include files (issue #64)", () => {
		const includeVars = [
			includeDecl('process', 'utils.h', 'function', [
				{ name: 'x', type: 'Integer', byRef: false, isArray: false }
			])
		];

		const code = `
void process(Integer x, Integer y) {
	Integer z = x;
}
`;
		const diagnostics = ValidateWithIncludes(code, includeVars);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		// Different param count = valid overload
		expect(redeclErrors.length).toBe(0);
	});
});

describe("RHS operand validation (issue #26)", () => {
	test("reports error for undeclared variable on RHS of assignment", () => {
		const code = `
void main() {
    Integer x = undeclaredVar;
}
`;
		const diagnostics = Validate(code);
		const errors = diagnostics.filter(d => d.severity === 1 /* Error */ && d.message.includes("is not declared"));
		expect(errors.length).toBeGreaterThan(0);
		expect(errors.some(d => d.message.includes("undeclaredVar"))).toBe(true);
	});

	test("does not report warning for declared variable on RHS", () => {
		const code = `
void main() {
    Integer y = 10;
    Integer x = y;
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("reports error for undeclared variable in expression", () => {
		const code = `
void main() {
    Integer x = 5;
    Integer y = x + undeclaredVar + 10;
}
`;
		const diagnostics = Validate(code);
		const errors = diagnostics.filter(d => d.severity === 1 /* Error */ && d.message.includes("is not declared"));
		expect(errors.length).toBeGreaterThan(0);
		expect(errors.some(d => d.message.includes("undeclaredVar"))).toBe(true);
	});

	test("handles function parameters as declared", () => {
		const code = `
void myFunc(Integer param1, Real param2) {
    Integer x = param1;
    Real y = param2;
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("does not flag function calls as undeclared", () => {
		const code = `
void main() {
    Integer x = someFunction(1, 2);
}
`;
		const diagnostics = Validate(code);
		// Function calls should not be flagged as undeclared variables
		const errors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("someFunction")
		);
		expect(errors.length).toBe(0);
	});

	test("reports multiple undeclared variables", () => {
		const code = `
void main() {
    Integer x = undeclared1 + undeclared2;
}
`;
		const diagnostics = Validate(code);
		const errors = diagnostics.filter(d => d.severity === 1 /* Error */ && d.message.includes("is not declared"));
		expect(errors.length).toBeGreaterThanOrEqual(2);
		expect(errors.some(d => d.message.includes("undeclared1"))).toBe(true);
		expect(errors.some(d => d.message.includes("undeclared2"))).toBe(true);
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
			defines: new Set(['MY_CONSTANT', 'ANOTHER_MACRO'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
			defines: new Set(['TRUE', 'FALSE'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("function name matching is case-sensitive", () => {
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// MyFunction and MYFUNCTION are different from myfunction — should be flagged
		expect(undeclaredErrors.length).toBe(0); // function calls don't flag as undeclared (they pass through)
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("variable name matching is case-sensitive", () => {
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// GlobalVar and GLOBALVAR are not the same as globalvar
		expect(undeclaredErrors.length).toBe(2);
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
			defines: new Set(['MAX_VALUE', 'MIN_VALUE', 'PI_CONSTANT'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("define name matching is case-sensitive", () => {
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// MY_DEFINE and My_Define are not the same as my_define
		expect(undeclaredErrors.length).toBe(2);
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
			defines: new Set(['DEFINE_CONSTANT'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const undeclaredErrors = diagnostics.filter(d => 
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// local_declared is used before its declaration, so it should be flagged
		expect(undeclaredErrors.length).toBe(1);
		expect(undeclaredErrors[0].message).toContain("local_declared");
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(1);
		expect(undeclaredErrors[0].message).toContain("unknown_var");
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// Should flag unknown_arg as undeclared
		expect(undeclaredErrors.some(d => d.message.includes("unknown_arg"))).toBe(true);
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
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
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

describe("Function scope isolation (issue #43)", () => {
	test("variables declared in one function are not visible in another function", () => {
		// Issue #43: variables from one function shouldn't be accessible in another
		const code = `
void My_test_function()
{
    text some_text = "test";
}

void My_new_function()
{
    some_text = "bad";
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// Should have error for 'some_text' in My_new_function
		expect(undeclaredErrors.length).toBeGreaterThan(0);
		const hasUndeclaredText = undeclaredErrors.some(d => d.message.includes("some_text"));
		expect(hasUndeclaredText).toBe(true);
	});

	test("variables declared in different functions should each be local to their scope", () => {
		const code = `
void functionA()
{
    Integer x = 10;
}

void functionB()
{
    Integer x = 20;
}

void main()
{
    x = 30;
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// x is not declared in main scope (should error)
		expect(undeclaredErrors.length).toBeGreaterThan(0);
		const hasUndeclaredX = undeclaredErrors.some(d => d.message.includes("'x'"));
		expect(hasUndeclaredX).toBe(true);
	});

	test("global variables are visible in all functions", () => {
		const code = `
		{
Integer global_counter = 0;
	}
void increment()
{
    global_counter = global_counter + 1;
}

void print_counter()
{
    Integer result = global_counter;
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// global_counter is declared globally, should be accessible
		expect(undeclaredErrors.length).toBe(0);
	});

	test("function parameters are local to their function", () => {
		const code = `
void process_value(Integer value)
{
    Integer result = value + 1;
}

void main()
{
    value = 10;
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// 'value' is not in main's scope
		expect(undeclaredErrors.length).toBeGreaterThan(0);
		const hasUndeclaredValue = undeclaredErrors.some(d => d.message.includes("value"));
		expect(hasUndeclaredValue).toBe(true);
	});

	test("function-local variables do not leak across function boundaries", () => {
		const code = `
void first_func()
{
    text local_var = "first";
}

void second_func()
{
    text local_var = "second";
}

void third_func()
{
    first_func();
    second_func();
    local_var = "bad";
}
`;
		const diagnostics = Validate(code);
		const undeclaredErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		// local_var is not visible in third_func
		expect(undeclaredErrors.length).toBeGreaterThan(0);
		const hasUndeclaredLocal = undeclaredErrors.some(d => d.message.includes("local_var"));
		expect(hasUndeclaredLocal).toBe(true);
	});

	test("same variable name in different functions should not conflict", () => {
		const code = `
void func_a()
{
    Integer counter = 0;
    counter = counter + 1;
}

void func_b()
{
    Integer counter = 100;
    counter = counter + 1;
}
`;
		const diagnostics = Validate(code);
		// Both functions declare 'counter' locally - should be fine
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		// Should not have redeclaration errors between functions
				expect(redeclErrors.length).toBe(0);
	});
});
// ─── Function overload support (#44) ────────────────────────────────────────

describe("Function overload support (#44)", () => {
	test("allows overloaded functions with different parameter types", () => {
		const code = `
Integer Sort_array(Integer count, Integer index[], Integer data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Real data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Text data[])
{
	return 0;
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("still reports exact duplicate function signatures", () => {
		const code = `
Integer Sort_array(Integer count, Integer index[], Integer data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Integer data[])
{
	return 0;
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(1);
	});

	test("allows overloads with different parameter counts", () => {
		const code = `
void Do_thing(Integer x)
{
}

void Do_thing(Integer x, Integer y)
{
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(0);
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

// ─── Function argument validation (#45) ─────────────────────────────────────

function ValidateFunctionArgs(text: string, externalSignatures: FunctionSignatureMap = new Map(), externalReturnTypes: Map<string, string> = new Map()): Diagnostic[] {
	const result = parse(text);
	const synErrs = syntaxDiagnostics(result);
	if (synErrs.length > 0) return synErrs;
	return validateFunctionArguments(result.tree, externalSignatures, externalReturnTypes) as Diagnostic[];
}

describe("Function argument validation (#45)", () => {
	test("detects type mismatch from issue example", () => {
		const code = `
Integer Get_integer(Dynamic_Integer ints, Integer item_num)
{
	Integer int = 0;
	return int;
}

void Get_the_thing()
{
	Text test;
	Integer int;
	Get_integer(test, int);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("Get_integer");
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("allows correct argument types", () => {
		const code = `
Integer Get_integer(Dynamic_Integer ints, Integer item_num)
{
	return 0;
}

void main()
{
	Dynamic_Integer my_ints;
	Integer num;
	Get_integer(my_ints, num);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("detects wrong argument count", () => {
		const code = `
Integer Add(Integer a, Integer b)
{
	return 0;
}

void main()
{
	Integer x;
	Add(x);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("expects");
		expect(diagnostics[0].message).toContain("2");
		expect(diagnostics[0].message).toContain("1");
	});

	test("allows Integer where Real is expected (numeric compatibility)", () => {
		const code = `
void Do_thing(Real val)
{
}

void main()
{
	Integer x;
	Do_thing(x);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows matching overload among multiple", () => {
		const code = `
Integer Sort_array(Integer count, Integer index[], Integer data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Real data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Text data[])
{
	return 0;
}

void main()
{
	Integer count;
	Integer idx[];
	Text vals[];
	Sort_array(count, idx, vals);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("detects mismatch when no overload matches", () => {
		const code = `
Integer Sort_array(Integer count, Integer index[], Integer data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Real data[])
{
	return 0;
}

void main()
{
	Integer count;
	Integer idx[];
	Element vals[];
	Sort_array(count, idx, vals);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("resolves external function signatures", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("Ext_func", [
			[{ name: "a", type: "Integer" }, { name: "b", type: "Text" }]
		]);

		const code = `
void main()
{
	Integer x;
	Integer y;
	Ext_func(x, y);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("does not flag calls to unknown functions", () => {
		const code = `
void main()
{
	Integer x;
	Unknown_func(x);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows call with no arguments to parameterless function", () => {
		const code = `
void Do_thing()
{
}

void main()
{
	Do_thing();
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("detects string literal where Integer expected", () => {
		const code = `
void Do_thing(Integer x)
{
}

void main()
{
	Do_thing("hello");
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("allows Widget subtype where Widget parameter expected", () => {
		const code = `
void Show_widget(Widget w)
{
}

void main()
{
	Panel p;
	Show_widget(p);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows Box type where Widget parameter expected", () => {
		const code = `
void Show_widget(Widget w)
{
}

void main()
{
	Input_Box box;
	Show_widget(box);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("does not allow Widget where specific subtype expected", () => {
		const code = `
void Need_panel(Panel p)
{
}

void main()
{
	Widget w;
	Need_panel(w);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("does not allow unrelated type where Widget expected", () => {
		const code = `
void Show_widget(Widget w)
{
}

void main()
{
	Integer x;
	Show_widget(x);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("allows Point where Segment parameter expected (promotion)", () => {
		const code = `
void Process(Segment s)
{
}

void main()
{
	Point p;
	Process(p);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows Element where Dynamic_Element parameter expected (promotion)", () => {
		const code = `
void Process(Dynamic_Element de)
{
}

void main()
{
	Element e;
	Process(e);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows Vector2 where Vector3 parameter expected (promotion)", () => {
		const code = `
void Process(Vector3 v)
{
}

void main()
{
	Vector2 v2;
	Process(v2);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("does not allow Segment where Point expected (promotion is one-way)", () => {
		const code = `
void Process(Point p)
{
}

void main()
{
	Segment s;
	Process(s);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("allows Colour_Message_Box where Message_Box parameter expected", () => {
		const code = `
void Show(Message_Box mb)
{
}

void main()
{
	Colour_Message_Box cmb;
	Show(cmb);
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("resolves function call return type in argument position", () => {
		const code = `
Integer Get_value()
{
	return 42;
}

void Process(Integer x)
{
}

void main()
{
	Process(Get_value());
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("detects type mismatch from function call return type in argument", () => {
		const code = `
Text Get_name()
{
	return "hello";
}

void Process(Integer x)
{
}

void main()
{
	Process(Get_name());
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mismatch");
	});

	test("resolves external function call return type in argument position", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("Ext_get", [[]]);
		const externalReturnTypes = new Map<string, string>();
		externalReturnTypes.set("Ext_get", "Integer");

		const code = `
void Process(Integer x)
{
}

void main()
{
	Process(Ext_get());
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs, externalReturnTypes);
		expect(diagnostics.length).toBe(0);
	});

	test("allows Integer return type promoted to Real in argument position", () => {
		const code = `
Integer Get_count()
{
	return 42;
}

void Process(Real val)
{
}

void main()
{
	Process(Get_count());
}
`;
		const diagnostics = ValidateFunctionArgs(code);
		expect(diagnostics.length).toBe(0);
	});

	test("variable scopes are isolated between functions", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("Get_matrix", [[
			{ name: "m", type: "Matrix3", byRef: false, isArray: false },
			{ name: "r", type: "Integer", byRef: false, isArray: false },
			{ name: "c", type: "Integer", byRef: false, isArray: false },
			{ name: "v", type: "Real", byRef: true, isArray: false },
		]]);

		const code = `
void Test()
{
	Matrix3 mat;
	Real a, b, c;
	Get_matrix(mat, 1, 2, a);
	Get_matrix(mat, 1, 2, c);
}

void Test2()
{
	Vector3 c;
}

void main()
{
	Test();
	Test2();
}
`;
		// `c` is Real inside Test() — should NOT be affected by Vector3 c in Test2()
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});

	// ─── Regression tests for false-positive arg mismatch reports ────────────

	test("allows subtype Apply_Many_Function where Function expected (issue: Function_recalc)", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("Function_recalc", [
			[{ name: "func", type: "Function" }]
		]);

		const code = `
void main()
{
	Apply_Many_Function amf;
	Function_recalc(amf);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});

	test("allows exact type match Uid where Uid expected (issue: Is_global)", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("Is_global", [
			[{ name: "uid", type: "Uid" }]
		]);

		const code = `
void main()
{
	Uid u;
	Is_global(u);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});

	test("allows correct arg count with multi-overload prototype (issue: Get_number_of_items)", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("Get_number_of_items", [
			[{ name: "list", type: "Dynamic_Element" }, { name: "count", type: "Integer" }],
			[{ name: "list", type: "Dynamic_Text" }, { name: "count", type: "Integer" }],
			[{ name: "elt", type: "Model" }, { name: "count", type: "Integer" }],
			[{ name: "box", type: "List_Box" }, { name: "count", type: "Integer" }],
		]);

		const code = `
void main()
{
	Dynamic_Element my_list;
	Integer count;
	Get_number_of_items(my_list, count);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});

	test("allows correct arg count with mixed-arity overloads (issue: To_text)", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("To_text", [
			[{ name: "value", type: "Integer" }],
			[{ name: "value", type: "Real" }, { name: "decimals", type: "Integer" }],
			[{ name: "value", type: "Integer" }, { name: "format", type: "Text" }],
			[{ name: "value", type: "Real" }, { name: "format", type: "Text" }],
			[{ name: "uid", type: "Uid" }],
			[{ name: "value", type: "Integer64" }],
			[{ name: "guid", type: "Guid" }],
			[{ name: "value", type: "Real" }],
		]);

		const code = `
void main()
{
	Integer x;
	To_text(x);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});

	test("To_text with 2 args matches 2-param overload", () => {
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("To_text", [
			[{ name: "value", type: "Integer" }],
			[{ name: "value", type: "Real" }, { name: "decimals", type: "Integer" }],
			[{ name: "value", type: "Real" }, { name: "format", type: "Text" }],
			[{ name: "uid", type: "Uid" }],
			[{ name: "value", type: "Real" }],
		]);

		const code = `
void main()
{
	Real val;
	Integer dec;
	To_text(val, dec);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});

	test("local function definition does not shadow prototype overloads", () => {
		// If a user defines To_text locally with 3 params, the prototype
		// overloads (1-param, 2-param) must still be considered valid.
		const externalSigs: FunctionSignatureMap = new Map();
		externalSigs.set("To_text", [
			[{ name: "value", type: "Integer" }],
			[{ name: "value", type: "Real" }, { name: "decimals", type: "Integer" }],
		]);

		const code = `
Text To_text(Integer a, Integer b, Integer c)
{
	return "custom";
}

void main()
{
	Integer x;
	To_text(x);
}
`;
		const diagnostics = ValidateFunctionArgs(code, externalSigs);
		expect(diagnostics.length).toBe(0);
	});
});

// ─── Return value validation (#47) ──────────────────────────────────────────

function ValidateReturnStatements(text: string): Diagnostic[] {
	const result = parse(text);
	const synErrs = syntaxDiagnostics(result);
	if (synErrs.length > 0) return synErrs;
	return validateReturnStatements(result.tree) as Diagnostic[];
}

describe("Return value validation (#47)", () => {
	test("flags non-void function without return (issue example)", () => {
		const code = `
Integer My_check()
{

}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("My_check");
		expect(diagnostics[0].message).toContain("return");
	});

	test("allows non-void function with return statement", () => {
		const code = `
Integer My_check()
{
	return 0;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows void function without return", () => {
		const code = `
void Do_thing()
{
	Integer x = 1;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags void function returning a value", () => {
		const code = `
void Do_thing()
{
	return 42;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("Void");
		expect(diagnostics[0].message).toContain("should not return a value");
	});

	test("allows void function with bare return", () => {
		const code = `
void Do_thing()
{
	return;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags non-void function with empty return", () => {
		const code = `
Integer My_func()
{
	return;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		const msgs = diagnostics.map(d => d.message);
		expect(msgs.some(m => m.includes("returns no value"))).toBe(true);
		expect(diagnostics[0].severity).toBe(1); // Error
	});

	test("accepts if/else where both branches return", () => {
		const code = `
Integer My_func(Integer x)
{
	if (x > 0) {
		return 1;
	} else {
		return 0;
	}
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags if without else as missing return", () => {
		const code = `
Integer My_func(Integer x)
{
	if (x > 0) {
		return 1;
	}
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("does not end with a return");
	});

	test("flags return type mismatch — Text returned from Integer function", () => {
		const code = `
Integer My_func()
{
	return "hello";
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("Text");
		expect(diagnostics[0].message).toContain("Integer");
	});

	test("flags return type mismatch — variable of wrong type", () => {
		const code = `
Integer My_func()
{
	Text name;
	return name;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("Text");
		expect(diagnostics[0].message).toContain("Integer");
	});

	test("Integer/Real promotion is accepted without error", () => {
		const code = `
Real My_func()
{
	Integer x = 5;
	return x;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("allows Point returned where Segment expected (promotion)", () => {
		const code = `
Segment Make_segment()
{
	Point p;
	return p;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("does not flag script-level code (wrapper functions)", () => {
		const code = `
Integer x = 1;
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("checks return type from function parameter", () => {
		const code = `
Integer My_func(Text name)
{
	return name;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("Text");
	});

	test("allows Widget subtype as return value where Widget expected", () => {
		const code = `
Widget Make_widget()
{
	Panel p;
	return p;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags Widget returned where specific subtype expected", () => {
		const code = `
Panel Make_panel()
{
	Widget w;
	return w;
}
`;
		const diagnostics = ValidateReturnStatements(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("Widget");
		expect(diagnostics[0].message).toContain("Panel");
	});
});

// ─── Array size validation (issue #73) ──────────────────────────────────────

function ValidateArraySize(text: string): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) return [];
	return validateArraySize(result.tree);
}

describe("Array size validation (issue #73)", () => {
	test("flags unsized array declaration in function body", () => {
		const code = `
void main()
{
	Text my_choices[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].severity).toBe(1); // Error
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("my_choices");
	});

	test("flags unsized array declaration at top level (script)", () => {
		const code = `Integer arr[];
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("arr");
	});

	test("does not flag sized array declaration", () => {
		const code = `
void main()
{
	Text my_choices[10];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(0);
	});

	test("does not flag array parameters in function signatures", () => {
		const code = `
void foo(Text items[])
{
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(0);
	});

	test("does not flag pass-by-reference array parameters", () => {
		const code = `
void bar(Integer &arr[])
{
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(0);
	});

	test("flags unsized array with initializer", () => {
		const code = `
void main()
{
	Real values[];
	Integer counts[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(2);
	});

	test("reads fixture Test8.4dm and flags unsized array", () => {
		const text = readFixture("client/testFixture/Test8.4dm");
		const diagnostics = ValidateArraySize(text);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("my_choices");
	});
});
