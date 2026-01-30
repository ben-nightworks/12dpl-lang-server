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
		// Provide the defines as known symbols (normally collected by server.ts from document text)
		const knownSymbols = {
			functions: new Set<string>(),
			variables: new Set<string>(),
			defines: new Set(['my_constant', 'another_macro'])
		};
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.ValidateWithSymbols(code, knownSymbols);
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
		const diagnostics = Validator.Validate(code);
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
		const diagnostics = Validator.Validate(code);
		const syntaxErrors = diagnostics.filter(d => d.severity === 1 /* Error */);
		expect(syntaxErrors.length).toBeGreaterThan(0);
	});
});
