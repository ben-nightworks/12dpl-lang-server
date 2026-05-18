import * as fs from "fs";
import * as path from "path";
import { describe, expect, test } from "bun:test";
import { parse } from "../server/src/core/parsePipeline";
import { collectSymbolTable, deriveViews, parseDefines } from "../server/src/core/symbolCollector";
import { validateVariableRedeclarations, validateFunctionRedeclarations, validateUndeclaredIdentifiers, validateDeprecatedCalls, validateVoidFunctionReturnValues, FunctionSignatureMap, validateFunctionArguments, validateReturnStatements, validateArraySize } from "../server/src/core/validators";
import type { OverloadReturnType } from "../server/src/core/validators";
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
		const funcRedecl = validateFunctionRedeclarations(result.tree, includeDeclarations, result.conditionalLines);
		return [...synErrs, ...varRedecl, ...funcRedecl];
	}
	return synErrs;
}

function ValidateWithSymbols(text: string, knownSymbols: KnownSymbols): Diagnostic[] {
	const result = parse(text);
	const diagnostics: Diagnostic[] = [];
	diagnostics.push(...validateDeprecatedCalls(result));
	diagnostics.push(...syntaxDiagnostics(result));
	diagnostics.push(...validateUndeclaredIdentifiers(result.tree, knownSymbols, result.conditionalLines));
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

describe("Validator.Validate", () => {
	test("parses complex real-world macro without crashing", () => {
		// Exercises: forward declarations, functions with arrays/refs, top-level blocks,
		// switch/case, if/else chains, complex expressions, goto, multi-variable decls
		const text = `
void get_hip_info(Element align,Integer hip,Integer &type,
Real xval[],Real yval[],Real lengths[]);

Widget Cast(Widget &widget)
{
return widget;
};

void My_function(Text_Text_Map map)
{
    Vector4_Guid_Multimap guid_map;
};

Integer create_rgb(Integer r,Integer g,Integer b)
{
  return((1 << 31) | (r << 16) | (g << 8) | b);
}

{
    Text hip_type;
    Integer ret;
    ret = Get_hip_type(align,hip,hip_type);
    switch(hip_type)
    {
    case "Test 1":
    case "Test 2":
        {
            break;
        }
    case "Test 3":
    default:
        {

        }
    }

    if(hip_type == "IP") {
        Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
        xval[6] = xip; yval[6] = yip;
        type = 0;
        xval[1] = xip; yval[1] = yip;
    } else if(hip_type == "Curve") {
        Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
        Real xtc,ytc;  ret = Get_hip_geom(align,hip,1,xtc,ytc);
        xval[1] = xtc; yval[1] = ytc;
        xval[6] = xip; yval[6] = yip;
        type = 2;
    }
    return;
}

Element position_text(Text text,Real size,Integer colour,Real x1,Real y1,Real x2,Real y2)
{
    Real xpos,ypos,angle;
    xpos = 0.5 * (x1 + x2);
    ypos = 0.5 * (y1 + y2);
    angle = Atan2(y2 - y1,x2 - x1);
    Element elt = Create_text(text,xpos,ypos,size,colour,angle,4,1);
    return (elt);
}

{
    Text    program_name = "12dF Check Exporter";
    Text    ver          = "15.1";
    Text    td_ver       = "v15";
    Integer Shutdown_code = 424242;
}

void main()
{
    Integer ret;
    Element cl;
    Real    text_size;
    Integer colour;
    Text    colour_name,model_name;
    Model   model;

    Integer no_hip;
    Get_hip_points(cl,no_hip);
    for(Integer i=1;i<= no_hip;i++) {
        Integer  type;
        Real xval[6],yval[6],lengths[4];
        get_hip_info(cl,i,type,xval,yval,lengths);
        Integer curve = (lengths[1] == 0) ? 0 : 1;
        Integer left_spiral  = (lengths[3] == 0) ? 0 : 1;
        Integer right_spiral = (lengths[4] == 0) ? 0 : 1;
        if(left_spiral) {
            Text text = "spiral length = " + To_text(lengths[3],1) + "m";
            Element elt = position_text(text,text_size,colour,xval[1],yval[1],xval[4],yval[4]);
            Set_model(elt,model);
        }
    }
}
`;
		const diagnostics = Validate(text);
		expect(Array.isArray(diagnostics)).toBe(true);
		// This is a real-world macro; it should ideally be clean.
		// If this starts failing, it indicates a grammar/regression in the parser.
		// Filter out 'is not declared' since Validate() has no knownSymbols (no prototypes).
		expect(diagnostics.filter(d => d.severity === 1 /* Error */ && !d.message.includes("is not declared")).length).toBe(0);
	});

	test("handles preprocessor directives and top-level blocks", () => {
		// Exercises: forward declarations with overloads, top-level blocks,
		// intentional re-declarations/redefinitions
		const text = `
Integer create_rgb(Integer r,Integer g,Integer b);

Integer create_rgb(Integer r,Integer g,Integer b, Integer a);

Integer create_rgb(Integer r,Integer g,Integer b, Integer a)
{
    return 0;
}

Integer create_rgb(Integer r,Integer g,Integer b);

{
    Text prog_name = "TEST";

    Text    program_name    = "12dF Check Exporter";
    Text    program_name    = "12dF Check Exporter";
    Text    ver             = "15.1";
    Text    td_ver          = "v15";
    Integer Shutdown_code = 424242;
}

Integer create_rgb(Integer r,Integer g,Integer b)
{
    return 0;
}

Integer create_rgb(Integer r,Integer g,Integer b);

Integer create_rgb(Integer r,Integer g,Integer b)
{
    return 0;
}

Integer create_rgb(Integer r,Integer g,Integer b, Integer a)
{
    return 0;
}
`;
		const diagnostics = Validate(text);
		// Has intentional re-declarations/redefinitions
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

	test("does not flag variable followed by same-name function prototype", () => {
		const code = `
void main() {
    Time my_time = some_value;
    Time my_time();
    Integer get_value = 5;
    Integer get_value();
}
`;
		const diagnostics = Validate(code);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already declared")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("does not flag function prototype followed by same-name variable", () => {
		const code = `
void main() {
    Real calculate();
    Real calculate = 3.14;
}
`;
		const diagnostics = Validate(code);
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
		const text = `
Integer count = 0;
void process();
void process(Integer x);
void process(Integer x, Integer y);
Integer other_var = 5;
`;
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

	test("does not flag function redeclaration in #if/#else conditional branches", () => {
		const code = `
#if USE_NEW == 1
void FW_Print_Create_log_line(Text &msg)
{
	Integer x = 1;
}
#else
void FW_Print_Create_log_line(Text &msg)
{
	Integer y = 2;
}
#endif
`;
		const diagnostics = ValidateWithIncludes(code, []);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		expect(redeclErrors.length).toBe(0);
	});

	test("does not flag function redeclaration in #ifdef conditional branches", () => {
		const code = `
#ifdef FEATURE_FLAG
void my_func()
{
	Integer x = 1;
}
#endif
void my_func()
{
	Integer y = 2;
}
`;
		const diagnostics = ValidateWithIncludes(code, []);
		const redeclErrors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("already defined")
		);
		// One definition is on a conditional line, so no error
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

	test("flags undeclared function calls as errors", () => {
		const code = `
void main() {
    Integer x = someFunction(1, 2);
}
`;
		const diagnostics = Validate(code);
		const errors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("someFunction")
		);
		expect(errors.length).toBe(1);
		expect(errors[0].message).toContain("Function 'someFunction' is not declared");
	});

	test("does not flag known function calls as undeclared", () => {
		const code = `
void main() {
    Integer x = someFunction(1, 2);
}
`;
		const knownSymbols = {
			functions: new Set(['someFunction']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
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

describe("Undeclared symbols in nested parentheses (issue #134)", () => {
	test("flags undeclared variables when call is wrapped in double parens", () => {
		const code = `
void Test()
{
    if ((Find_text(horiz_datum, "2020") && Find_text(projection_name, "2020")))
    {
    }
}
`;
		const knownSymbols = {
			functions: new Set(['Find_text']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.some(d => d.message.includes("horiz_datum"))).toBe(true);
		expect(errors.some(d => d.message.includes("projection_name"))).toBe(true);
	});

	test("flags undeclared variables in complex nested-paren conditions", () => {
		const code = `
void Test()
{
    if ((Find_text(horiz_datum, "2020") && Find_text(projection_name, "2020")) || (Find_text(horiz_datum, "94") && Find_text(projection_name, "94")))
    {
    }
}
`;
		const knownSymbols = {
			functions: new Set(['Find_text']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.some(d => d.message.includes("horiz_datum"))).toBe(true);
		expect(errors.some(d => d.message.includes("projection_name"))).toBe(true);
	});

	test("does not flag declared variables inside nested parens", () => {
		const code = `
void Test()
{
    Text horiz_datum;
    Text projection_name;
    if ((Find_text(horiz_datum, "2020") && Find_text(projection_name, "2020")))
    {
    }
}
`;
		const knownSymbols = {
			functions: new Set(['Find_text']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.some(d => d.message.includes("horiz_datum"))).toBe(false);
		expect(errors.some(d => d.message.includes("projection_name"))).toBe(false);
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
		expect(undeclaredErrors.length).toBe(2);
		expect(undeclaredErrors.some(d => d.message.includes("MyFunction"))).toBe(true);
		expect(undeclaredErrors.some(d => d.message.includes("MYFUNCTION"))).toBe(true);
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
	// Undeclared Function Call Tests
	// =========================================================================

	test("flags undeclared function call with specific message", () => {
		const code = `
void main() {
    nonexistent_function();
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(errors.length).toBe(1);
		expect(errors[0].message).toBe("Function 'nonexistent_function' is not declared");
	});

	test("flags undeclared function call but not known ones", () => {
		const code = `
void main() {
    known_func();
    unknown_func();
}
`;
		const knownSymbols = {
			functions: new Set(['known_func']),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("is not declared")
		);
		expect(errors.length).toBe(1);
		expect(errors[0].message).toContain("unknown_func");
	});

	test("does not flag locally defined function as undeclared", () => {
		const code = `
Integer my_func() {
    return 42;
}

void main() {
    Integer x = my_func();
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set<string>()
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("my_func")
		);
		expect(errors.length).toBe(0);
	});

	test("does not flag define used as function call", () => {
		const code = `
void main() {
    Integer x = MY_MACRO(42);
}
`;
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set(['MY_MACRO'])
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d =>
			d.severity === 1 /* Error */ && d.message.includes("MY_MACRO")
		);
		expect(errors.length).toBe(0);
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
		const diagnostics = ValidateWithIncludes(code, []);
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
		const diagnostics = ValidateWithIncludes(code, []);
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

function ValidateVoidReturnValues(text: string, externalReturnTypes: Map<string, OverloadReturnType[]> = new Map()): Diagnostic[] {
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
		const externalReturnTypes = new Map<string, OverloadReturnType[]>();
		externalReturnTypes.set("ext_void_func", [{ paramCount: 0, returnType: "void" }]);
		externalReturnTypes.set("ext_int_func", [{ paramCount: 0, returnType: "Integer" }]);

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

	test("does not flag mixed-overload function when non-void overload exists", () => {
		// Simulates Prompt() which has both void(1-param) and Integer(2-param) overloads.
		// The validator should match by argument count to pick the right return type.
		const externalReturnTypes = new Map<string, OverloadReturnType[]>();
		externalReturnTypes.set("Prompt", [
			{ paramCount: 1, returnType: "void" },
			{ paramCount: 2, returnType: "Integer" },
			{ paramCount: 2, returnType: "Integer" },
			{ paramCount: 2, returnType: "Integer" },
		]);

		const code = `
void main() {
	Integer x = Prompt("Enter value: ", "default");
	if (Prompt("Continue? ", 1) != 0) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code, externalReturnTypes);
		expect(diagnostics.length).toBe(0);
	});

	test("flags void overload by argument count even if non-void overload exists (Ben's case)", () => {
		// Ben's test case:
		// Integer func() -- no arguments, returns Integer
		// void func(Real value) -- one argument, returns void
		// if(func(x)) should be flagged because the 1-argument overload returns void.
		const externalReturnTypes = new Map<string, OverloadReturnType[]>();
		externalReturnTypes.set("func", [
			{ paramCount: 0, returnType: "Integer" },
			{ paramCount: 1, returnType: "void" },
		]);

		const code = `
void main() {
	Real x = 1.0;
	if (func(x)) {
	}
}
`;
		const diagnostics = ValidateVoidReturnValues(code, externalReturnTypes);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("func");
		expect(diagnostics[0].message).toContain("void");
	});

	test("triple overload: only 2-arg is void — flags 2-arg call, not 1-arg or 3-arg", () => {
		// triple(Integer) -> Integer, triple(Integer, Integer) -> void, triple(Integer, Integer, Integer) -> Real
		const externalReturnTypes = new Map<string, OverloadReturnType[]>();
		externalReturnTypes.set("triple", [
			{ paramCount: 1, returnType: "Integer" },
			{ paramCount: 2, returnType: "void" },
			{ paramCount: 3, returnType: "Real" },
		]);

		const code = `
void main() {
	Integer a = triple(1);
	Integer b = triple(1, 2);
	Real c = triple(1, 2, 3);
}
`;
		const diagnostics = ValidateVoidReturnValues(code, externalReturnTypes);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("triple");
	});

	test("local function definitions resolve by argument count (all-void multi-arity)", () => {
		// Locally defined overloads: all return void, different arities — all consumed calls should warn.
		const code = `
void av()
{
}

void av(Integer x)
{
}

void test()
{
	Integer a = av();
	Integer b = av(1);
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(2);
	});

	test("local function definitions resolve by argument count (mixed: 0-arg non-void, 1-arg void)", () => {
		const code = `
Integer mf()
{
	return 42;
}

void mf(Integer x)
{
}

void test()
{
	Integer a = mf();
	Integer b = mf(1);
}
`;
		const diagnostics = ValidateVoidReturnValues(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("mf");
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
	test("allows Tin where Element parameter expected (promotion)", () => {
		const code = `
void Process(Element e)
{
}

void main()
{
	Tin t;
	Process(t);
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

	test("flags unsized Text array", () => {
		const code = `
void main()
{
	Text items[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("items");
	});

	test("flags unsized Integer array", () => {
		const code = `
void main()
{
	Integer nums[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("nums");
	});

	test("flags unsized Real array", () => {
		const code = `
void main()
{
	Real coords[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("coords");
	});

	test("flags unsized Element array", () => {
		const code = `
void main()
{
	Element elems[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("elems");
	});

	test("flags unsized Model array", () => {
		const code = `
void main()
{
	Model models[];
}
`;
		const diagnostics = ValidateArraySize(code);
		expect(diagnostics.length).toBe(1);
		expect(diagnostics[0].message).toContain("requires a size");
		expect(diagnostics[0].message).toContain("models");
	});
});

// ─── Conditional lines — false positive suppression ─────────────────────

describe("Conditional line suppression", () => {
	test("does not flag undeclared identifiers inside #if conditional blocks", () => {
		const code = `
#define DEBUG 0
#if DEBUG == 1
	Print_line("test");
#endif
void main()
{
	Integer x = 1;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["DEBUG"]),
		});
		const undeclaredErrors = diagnostics.filter(d =>
			d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("does not flag undeclared function calls inside #ifdef blocks", () => {
		const code = `
#ifdef FEATURE_FLAG
	some_unknown_function();
#endif
void main()
{
	Integer x = 1;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(),
		});
		const undeclaredErrors = diagnostics.filter(d =>
			d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("still flags undeclared identifiers outside conditional blocks", () => {
		const code = `
#if DEBUG == 1
	Print_line("test");
#endif
void main()
{
	Integer x = unknown_var;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["DEBUG"]),
		});
		const undeclaredErrors = diagnostics.filter(d =>
			d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(1);
		expect(undeclaredErrors[0].message).toContain("unknown_var");
	});
});

// ─── Function-like macro argument suppression ────────────────────────────

describe("Function-like macro argument suppression", () => {
	test("does not flag arguments of function-like macro calls", () => {
		const code = `
#define MY_MACRO(x) (1 << (x))
void main()
{
	Integer a = MY_MACRO(SOME_CONSTANT);
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["MY_MACRO"]),
		});
		const undeclaredErrors = diagnostics.filter(d =>
			d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});

	test("still flags undeclared arguments of regular function calls", () => {
		const code = `
void main()
{
	Integer a = some_func(UNKNOWN_ARG);
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(["some_func"]),
			variables: new Set(),
			defines: new Set(),
		});
		const undeclaredErrors = diagnostics.filter(d =>
			d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(1);
		expect(undeclaredErrors[0].message).toContain("UNKNOWN_ARG");
	});

	test("does not flag arguments of function-like define from include file", () => {
		const code = `
#define String_Super_Bit(n) (1 << n)
#define Att_ZCoord_Value 1
void main()
{
	Integer flag = String_Super_Bit(ZCoord_Value);
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["String_Super_Bit", "Att_ZCoord_Value"]),
		});
		const undeclaredErrors = diagnostics.filter(d =>
			d.message.includes("is not declared")
		);
		expect(undeclaredErrors.length).toBe(0);
	});
});

// ─── Standalone macro usage as statement (#106) ──────────────────────────────

describe("Standalone macro usage as statement (#106)", () => {
	test("no-arg macro used as standalone statement does not produce a syntax error", () => {
		const code = `
void func()
{
#define MACRO_EXAMPLE Integer test = 1;

	MACRO_EXAMPLE

	someOtherfunction();
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("no-arg macro used as standalone statement is not flagged as undeclared", () => {
		const code = `
void func()
{
#define MY_MACRO Integer x = 0;

	MY_MACRO
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(),
		});
		const undeclaredErrors = diagnostics.filter(d => d.message.includes("MY_MACRO"));
		expect(undeclaredErrors.length).toBe(0);
	});

	test("function-like macro used as standalone statement does not produce a syntax error", () => {
		const code = `
#define LOG(msg) Print(msg);

void func()
{
	LOG("hello")
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("code following the standalone macro is still parsed and validated", () => {
		const code = `
void func()
{
#define MACRO_EXAMPLE Integer test = 1;

	MACRO_EXAMPLE

	someOtherfunction();
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(),
		});
		const fnErrors = diagnostics.filter(d => d.message.includes("someOtherfunction"));
		expect(fnErrors.length).toBe(1);
		expect(fnErrors[0].message).toContain("not declared");
	});

	test("multiple standalone macros in a row do not produce syntax errors", () => {
		const code = `
#define SETUP_A Integer a = 1;
#define SETUP_B Integer b = 2;

void func()
{
	SETUP_A
	SETUP_B
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("function-like macro with nested function call argument does not produce a syntax error", () => {
		// MACRO_EXAMPLE(someOtherfunction()) — the argument contains nested parens.
		// The old regex [^)]* stopped at the first ')' so the line was not stripped,
		// causing a missing-semicolon syntax error on the following statement.
		const code = `
Integer someOtherfunction()
{
	return 1;
}

void func()
{
	#define MACRO_EXAMPLE(x) Integer test = x;

	MACRO_EXAMPLE(someOtherfunction())

	someOtherfunction();
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("function-like macro with nested call does not produce false undeclared errors", () => {
		const code = `
Integer someOtherfunction()
{
	return 1;
}

void func()
{
	#define MACRO_EXAMPLE(x) Integer test = x;

	MACRO_EXAMPLE(someOtherfunction())

	someOtherfunction();
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(['someOtherfunction']),
			variables: new Set(),
			defines: new Set(['MACRO_EXAMPLE']),
		});
		const errors = diagnostics.filter(d => d.severity === 1 /* Error */);
		expect(errors.length).toBe(0);
	});
});

// ─── parseDefines extraction ─────────────────────────────────────────────────

describe("parseDefines — extraction of #define declarations", () => {
	test("extracts a simple object-like constant define", () => {
		const src = `#define MAX_COUNT 100`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("MAX_COUNT");
		expect(defs[0].kind).toBe("define");
		expect(defs[0].defineParams).toBeUndefined();
		expect(defs[0].value).toBe("100");
	});

	test("extracts a string-valued define", () => {
		const src = `#define APP_NAME "MyApp"`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("APP_NAME");
		expect(defs[0].value).toBe(`"MyApp"`);
	});

	test("extracts a flag-style define with no value", () => {
		const src = `#define HAS_FEATURE`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("HAS_FEATURE");
		expect(defs[0].value).toBeUndefined();
		expect(defs[0].defineParams).toBeUndefined();
	});

	test("extracts a single-param function-like macro", () => {
		const src = `#define DOUBLE(x) x * 2`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("DOUBLE");
		expect(defs[0].defineParams).toEqual(["x"]);
		expect(defs[0].value).toBe("x * 2");
	});

	test("extracts a multi-param function-like macro", () => {
		const src = `#define ADD(a, b) a + b`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("ADD");
		expect(defs[0].defineParams).toEqual(["a", "b"]);
	});

	test("extracts multiple defines from a file", () => {
		const src = [
			`#define PI 3.14159`,
			`#define MAX(a, b) ((a) > (b) ? (a) : (b))`,
			`#define FLAG`,
		].join("\n");
		const defs = parseDefines(src);
		expect(defs.length).toBe(3);
		expect(defs.map(d => d.name)).toEqual(["PI", "MAX", "FLAG"]);
	});

	test("handles defines mixed with regular code", () => {
		const src = [
			`Integer x = 1;`,
			`#define LIMIT 50`,
			`void func() {}`,
		].join("\n");
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("LIMIT");
	});

	test("records the correct line range for the define name", () => {
		const src = `\n#define MY_CONST 42`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		// Line 1 (0-based) — the second line
		expect(defs[0].range.start.line).toBe(1);
	});

	test("stores the definedInFsPath when provided", () => {
		const src = `#define HEADER_CONST 99`;
		const defs = parseDefines(src, "utils.h");
		expect(defs[0].definedInFsPath).toBe("utils.h");
	});
});

// ─── #define inline usage — comprehensive scenarios ──────────────────────────
//
// Every test uses ValidateWithSymbols with the relevant defines in knownSymbols.defines
// (mirroring what diagnosticService.ts does at runtime via parseDefines).
//
// Expected outcome in every test: zero Error-severity diagnostics.

describe("#define inline usage — object-like macros", () => {
	test("object-like integer constant in variable initializer", () => {
		const code = `
#define MAX_VALUE 100
void main() {
    Integer x = MAX_VALUE;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["MAX_VALUE"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like integer constant used in arithmetic expression", () => {
		const code = `
#define OFFSET 10
void main() {
    Integer x = 5;
    Integer y = x + OFFSET * 2;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["OFFSET"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like string constant in variable initializer", () => {
		const code = `
#define APP_NAME "MyApp"
void main() {
    Text name = APP_NAME;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["APP_NAME"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like constant passed as function argument", () => {
		const code = `
#define LIMIT 50
Integer get_value(Integer max) { return max; }
void main() {
    Integer result = get_value(LIMIT);
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(["get_value"]),
			variables: new Set(),
			defines: new Set(["LIMIT"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like constant used as for-loop bound", () => {
		const code = `
#define MAX_ITER 10
void main() {
    for (Integer i = 0; i < MAX_ITER; i++) {
        Integer x = i;
    }
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["MAX_ITER"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like constant used in if condition", () => {
		const code = `
#define THRESHOLD 5
void main() {
    Integer x = 3;
    if (x > THRESHOLD) {
        Integer y = 1;
    }
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["THRESHOLD"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like constant used in while condition", () => {
		const code = `
#define MAX_RETRIES 3
void main() {
    Integer tries = 0;
    while (tries < MAX_RETRIES) {
        tries = tries + 1;
    }
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["MAX_RETRIES"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("object-like constant used in return statement", () => {
		const code = `
#define DEFAULT_RESULT 0
Integer get_default() {
    return DEFAULT_RESULT;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["DEFAULT_RESULT"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("multiple object-like constants used together in an expression", () => {
		const code = `
#define A 1
#define B 2
#define C 3
void main() {
    Integer total = A + B + C;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["A", "B", "C"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("flag-style define (no value) in knownSymbols does not cause undeclared errors", () => {
		const code = `
#define HAS_FEATURE
void main() {
    Integer x = 1;
}
`;
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["HAS_FEATURE"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1);
		expect(errors.length).toBe(0);
	});

	test("object-like define in switch case expression produces no syntax error", () => {
		const code = `
#define STATUS_OK 0
#define STATUS_ERR 1
void main() {
    Integer status = STATUS_OK;
    switch (status) {
    case STATUS_OK:
        {
        }
    case STATUS_ERR:
        {
        }
    }
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["STATUS_OK", "STATUS_ERR"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});
});

describe("#define inline usage — function-like macros", () => {
	test("single-param function-like macro used as a standalone statement", () => {
		const code = `
#define LOG(msg) Print(msg)
void main() {
    LOG("hello");
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(["Print"]),
			variables: new Set(),
			defines: new Set(["LOG"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("multi-param function-like macro used in expression", () => {
		const code = `
#define ADD(a, b) a + b
void main() {
    Integer result = ADD(1, 2);
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["ADD"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("function-like macro where argument is a local variable", () => {
		const code = `
#define NEGATE(x) x * -1
void main() {
    Integer val = 5;
    Integer neg = NEGATE(val);
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["NEGATE"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("function-like macro where argument is another define", () => {
		const code = `
#define BASE 10
#define SCALE(x) x * BASE
void main() {
    Integer result = SCALE(5);
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["BASE", "SCALE"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("function-like macro passed as argument to a function call", () => {
		const code = `
#define COMPUTE(x) x * 2
Integer use_value(Integer v) { return v; }
void main() {
    Integer result = use_value(COMPUTE(5));
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(["use_value"]),
			variables: new Set(),
			defines: new Set(["COMPUTE"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("function-like macro with conditional-style body used in if condition", () => {
		const code = `
#define IS_VALID(x) x > 0
void main() {
    Integer val = 5;
    if (IS_VALID(val)) {
        Integer ok = 1;
    }
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(["IS_VALID"]),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("macro_defines.4dm fixture produces zero syntax errors", () => {
		const fixturePath = path.resolve(__dirname, "..", "client", "testFixture", "macro_defines.4dm");
		const src = fs.readFileSync(fixturePath, "utf-8");
		const result = parse(src);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("macro_defines.4dm fixture produces zero false-positive undeclared errors when defines are known", () => {
		const fixturePath = path.resolve(__dirname, "..", "client", "testFixture", "macro_defines.4dm");
		const src = fs.readFileSync(fixturePath, "utf-8");
		const defines = parseDefines(src);
		const knownSymbols: KnownSymbols = {
			functions: new Set(["Print", "To_text", "someOtherfunction"]),
			variables: new Set(),
			defines: new Set(defines.map(d => d.name)),
		};
		const diagnostics = ValidateWithSymbols(src, knownSymbols);
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});
});

describe("#define inline usage — defines from include files", () => {
	test("define from include file is not flagged when in knownSymbols", () => {
		const headerSrc = `#define INCLUDE_CONST 42\n#define INCLUDE_FLAG`;
		const includeDefines = parseDefines(headerSrc, "defs.h");

		const code = `
void main() {
    Integer x = INCLUDE_CONST;
}
`;
		const knownSymbols: KnownSymbols = {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(includeDefines.map(d => d.name)),
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("multi-param function-like macro from include file used as call does not produce undeclared error", () => {
		const headerSrc = `#define PRINT_SET(x, y) if(x >= 1) { Print(To_text(y) + "\\n"); }`;
		const includeDefines = parseDefines(headerSrc, "macros.h");

		const code = `
void main() {
    PRINT_SET(2, "Test Value");
}
`;
		const knownSymbols: KnownSymbols = {
			functions: new Set(["Print", "To_text"]),
			variables: new Set(),
			defines: new Set(includeDefines.map(d => d.name)),
		};
		const diagnostics = ValidateWithSymbols(code, knownSymbols);
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("parseDefines correctly reads all define variants from a header", () => {
		const headerSrc = [
			`#define TRUE 1`,
			`#define FALSE 0`,
			`#define MAX(a,b) ((a) > (b) ? (a) : (b))`,
		].join("\n");
		const defs = parseDefines(headerSrc, "common.h");
		expect(defs.length).toBe(3);
		expect(defs.map(d => d.name)).toEqual(["TRUE", "FALSE", "MAX"]);
		expect(defs.every(d => d.definedInFsPath === "common.h")).toBe(true);
	});
});

describe("#define inline usage — no syntax errors for all inline patterns", () => {
	test("object-like macro in each statement position produces no syntax errors", () => {
		const code = `
#define K 7
Integer compute() {
    Integer a = K;
    Integer b = a + K;
    if (b > K) { b = K; }
    while (a < K) { a = a + 1; }
    for (Integer i = 0; i < K; i++) { b = b + i; }
    return K;
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("function-like macro in each statement position produces no syntax errors", () => {
		const code = `
#define DOUBLE(x) (x) * 2
Integer compute(Integer n) {
    Integer a = DOUBLE(n);
    Integer b = a + DOUBLE(3);
    if (b > DOUBLE(10)) { b = DOUBLE(b); }
    return DOUBLE(a);
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("chained macros in one expression produce no syntax errors", () => {
		const code = `
#define BASE 2
#define SCALE(x) (x) * BASE
void main() {
    Integer result = SCALE(SCALE(3));
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("macro with ternary expression body produces no syntax errors", () => {
		const code = `
#define CLAMP(x, lo, hi) ((x) < (lo) ? (lo) : (x) > (hi) ? (hi) : (x))
void main() {
    Integer v = 5;
    Integer clamped = CLAMP(v, 0, 10);
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("macro whose body is a Print call with string concatenation produces no syntax errors", () => {
		const code = `
#define PRINT_MSG(x, y) Print(To_text(x) + To_text(y))
void main() {
    PRINT_MSG(1, "hello");
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("defines declared inside a function body produce no syntax errors", () => {
		const code = `
void main() {
#define INNER_CONST 5
    Integer x = INNER_CONST;
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});
});

// ─── #define multi-line (backslash continuation) ─────────────────────────────
//
// Multi-line #define macros use trailing \ to continue onto the next line.
// stripConditionalDirectives replaces ALL directive lines (including
// continuation lines) with empty lines, so the parser never sees them.
// parseDefines reads only the first line (which matches DEFINE_RE).

describe("#define multi-line backslash continuation", () => {
	test("two-line function-like macro produces no syntax errors when called", () => {
		const code = `
#define LOG(msg) \\
    Print(msg)
void main() {
    LOG("hello");
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("three-line function-like macro produces no syntax errors when called", () => {
		const code = `
#define COMPLEX(a, b) \\
    Integer tmp = a + b; \\
    Print(To_text(tmp))
void main() {
    COMPLEX(1, 2);
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("multi-line object-like constant produces no syntax errors when used", () => {
		const code = `
#define LONG_VALUE \\
    42
void main() {
    Integer x = LONG_VALUE;
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});

	test("parseDefines extracts name from the first line of a multi-line macro", () => {
		const src = `#define LOG(msg) \\\n    Print(msg)`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("LOG");
		expect(defs[0].defineParams).toEqual(["msg"]);
	});

	test("parseDefines extracts name from a multi-line object-like define", () => {
		const src = `#define BIG_CONSTANT \\\n    9999`;
		const defs = parseDefines(src);
		expect(defs.length).toBe(1);
		expect(defs[0].name).toBe("BIG_CONSTANT");
	});

	test("multi-line macro in knownSymbols does not produce undeclared-variable error", () => {
		const code = `
#define WRAP(x) \\
    x * 2
void main() {
    Integer result = WRAP(5);
}
`;
		const defines = parseDefines(code);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(defines.map(d => d.name)),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("multi-line macro called in multiple positions does not produce undeclared errors", () => {
		const code = `
#define DOUBLE(x) \\
    (x) * 2
void main() {
    Integer a = DOUBLE(3);
    Integer b = DOUBLE(a) + DOUBLE(1);
    if (b > DOUBLE(10)) {
        Integer c = DOUBLE(b);
    }
}
`;
		const defines = parseDefines(code);
		const diagnostics = ValidateWithSymbols(code, {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(defines.map(d => d.name)),
		});
		const errors = diagnostics.filter(d => d.severity === 1 && d.message.includes("is not declared"));
		expect(errors.length).toBe(0);
	});

	test("multiple multi-line macros in one file all extracted by parseDefines", () => {
		const src = [
			`#define MACRO_A(x) \\`,
			`    x + 1`,
			`#define MACRO_B \\`,
			`    100`,
			`#define MACRO_C(a, b) \\`,
			`    a * b`,
		].join("\n");
		const defs = parseDefines(src);
		expect(defs.length).toBe(3);
		expect(defs.map(d => d.name)).toEqual(["MACRO_A", "MACRO_B", "MACRO_C"]);
	});

	test("continuation lines are stripped and do not introduce stray tokens", () => {
		// The body line of a multi-line define must not be parsed as code.
		// If it were, `Print(msg)` on its own line would be a syntax error
		// (no trailing semicolon). stripConditionalDirectives replaces it
		// with an empty line, so no error should appear.
		const code = `
#define LOG(msg) \\
    Print(msg)
void main() {
    Integer x = 1;
}
`;
		const result = parse(code);
		expect(result.syntaxErrors.length).toBe(0);
	});
});
