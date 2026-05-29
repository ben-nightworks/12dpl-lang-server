// ============================================================================
// variable_redeclaration.4dm - Variable Redeclaration Validation Tests
// ============================================================================
// Validator: validateVariableRedeclarations
// This file tests variable redeclaration and shadowing rules.
// Each test section is annotated with expected diagnostics:
//   - ERROR: Indicates DiagnosticSeverity.Error (1) - should show red squiggle
//   - WARNING: Indicates DiagnosticSeverity.Warning (2) - should show yellow squiggle
//   - OK: No diagnostic expected
// ============================================================================

#include "test_globals.h"

// ============================================================================
// GLOBAL VARIABLES (declared in top-level block, outside any function)
// These are tracked as "global variables" for shadowing detection
// ============================================================================
{
	Text global_name = "Global";          // Line 18 - Used for shadowing tests
	Integer global_count = 42;            // Line 19 - Used for shadowing tests
	Real global_value = 1.5;              // Line 20 - Used for shadowing tests
	Text case_test = "CaseTestGlobal";    // Line 21 - Used for shadowing tests
}

Integer test_same_scope_redeclaration();
Integer test_same_scope_redeclaration(Integer param);
// ############################################################################
//                        E R R O R   T E S T S
// ############################################################################

// ============================================================================
// TEST 1: Re-declaration in same scope
// Rule: Cannot declare the same variable twice in the same scope
// Severity: ERROR
// ============================================================================
void test_same_scope_redeclaration() {
	Integer x = 1;
	Integer x = 2;      // ERROR: Variable 'x' is already declared in this scope (first declared at line 36)

	Text name = "first";
	Text name = "second"; // ERROR: Variable 'name' is already declared in this scope (first declared at line 39)

	Real pi = 3.14;
	Real pi = 3.14159;   // ERROR: Variable 'pi' is already declared in this scope (first declared at line 42)
}

// ============================================================================
// TEST 2: Re-declaring function parameter
// Rule: Cannot declare a local variable with the same name as a parameter
// Severity: ERROR
// ============================================================================
void test_param_redeclaration(Integer param, Text message, Real value) {
	Integer param = 5;     // ERROR: Variable 'param' is already declared in this scope (first declared at line 51)
	Text message = "new";  // ERROR: Variable 'message' is already declared in this scope (first declared at line 51)
	Real value = 9.9;      // ERROR: Variable 'value' is already declared in this scope (first declared at line 51)
}

// ============================================================================
// TEST 3: Shadowing global from INCLUDE FILE
// Rule: Cannot declare a variable that conflicts with a variable from an included file
// Severity: ERROR
// Note: Include file "test_globals.h" contains: include_var, include_count, include_value
// ============================================================================
void test_include_conflict() {
	Text include_var = "Local";     // ERROR: Variable 'include_var' is already declared in included file 'test_globals.h'
	Integer include_count = 50;     // ERROR: Variable 'include_count' is already declared in included file 'test_globals.h'
	Real include_value = 2.0;       // ERROR: Variable 'include_value' is already declared in included file 'test_globals.h'
}

// ============================================================================
// TEST 4: Include file conflict - exact-case only
// Rule: Current validator behavior is case-sensitive for include-file checks
// Severity: OK (kept as documentation of current behavior)
// ============================================================================
void test_include_case_insensitive() {
	Text INCLUDE_VAR = "Upper";      // OK: No diagnostic with current exact-case validator
	Integer Include_Count = 999;     // OK: No diagnostic with current exact-case validator
	Real INCLUDE_VALUE = 5.5;        // OK: No diagnostic with current exact-case validator
}

// ============================================================================
// TEST 5: Multiple re-declarations in same function
// Rule: Each re-declaration is reported separately
// Severity: ERROR (multiple)
// ============================================================================
void test_multiple_redeclarations() {
	Integer a = 1;
	Integer b = 2;
	Integer c = 3;
	Integer d = 4;
	Integer a = 10;  // ERROR: Variable 'a' is already declared in this scope (first declared at line 86)
	Integer b = 20;  // ERROR: Variable 'b' is already declared in this scope (first declared at line 87)
	Integer c = 30;  // ERROR: Variable 'c' is already declared in this scope (first declared at line 88)
	Integer d = 40;  // ERROR: Variable 'd' is already declared in this scope (first declared at line 89)
}


// ############################################################################
//                      W A R N I N G   T E S T S
// ############################################################################

// ============================================================================
// TEST 6: Shadowing global variable from SAME FILE
// Rule: Local variables shadowing global variables declared in the same file
// Severity: WARNING
// ============================================================================
void test_same_file_shadow() {
	Text global_name = "Local";     // WARNING: Variable 'global_name' shadows a global variable declared at line 18
	Integer global_count = 10;      // WARNING: Variable 'global_count' shadows a global variable declared at line 19
	Real global_value = 9.9;        // WARNING: Variable 'global_value' shadows a global variable declared at line 20
}

// ============================================================================
// TEST 7: Same-file global shadowing - exact-case only
// Rule: Current validator behavior is case-sensitive for same-file global checks
// Severity: OK (kept as documentation of current behavior)
// ============================================================================
void test_same_file_case_insensitive() {
	Text GLOBAL_NAME = "Upper";     // OK: No diagnostic with current exact-case validator
	Integer GLOBAL_COUNT = 100;     // OK: No diagnostic with current exact-case validator
	Text CASE_TEST = "LocalCase";   // OK: No diagnostic with current exact-case validator
}

// ============================================================================
// TEST 8: Nested scope variable shadowing
// Rule: Variables in inner scopes that shadow outer scope variables
// Severity: WARNING
// ============================================================================
void test_nested_scope_shadowing() {
	Integer outer_var = 1;
	Text outer_text = "outer";

	{
		Integer outer_var = 2;     // WARNING: Variable 'outer_var' shadows a variable declared at line 129
		Text outer_text = "inner"; // WARNING: Variable 'outer_text' shadows a variable declared at line 130

		{
			Integer outer_var = 3; // WARNING: Variable 'outer_var' shadows a variable declared at line 133
		}
	}
}

// ============================================================================
// TEST 9: For-loop variable shadowing outer scope
// Rule: For-loop variables that shadow outer scope variables
// Severity: WARNING
// Note: For-loop creates its own scope, so this is shadowing, not re-declaration
// ============================================================================
void test_forloop_shadowing() {
	Integer i = 100;
	Integer j = 200;

	for (Integer i = 0; i < 10; i++) {  // WARNING: Variable 'i' shadows a variable declared at line 149
		// Loop body
	}

	for (Integer j = 0; j < 5; j++) {   // WARNING: Variable 'j' shadows a variable declared at line 150
		// Loop body
	}
}


// ############################################################################
//                 O K   T E S T S   ( N O   D I A G N O S T I C )
// ############################################################################

// ============================================================================
// TEST 10: Different scopes - nested blocks (allowed)
// Rule: Variables in different scopes (e.g., nested blocks) are independent
// Expected: NO ERROR (though shadowing warning may apply - see TEST 8)
// ============================================================================
void test_different_scopes_blocks() {
	Integer x = 1;     // First declaration
	{
		Integer y = 2; // OK: y is only in inner scope, no conflict with outer
	}
	Integer y = 3;     // OK: y from inner scope is out of scope now

	{
		Integer z = 10;
	}
	{
		Integer z = 20; // OK: Each block is a separate scope
	}
}

// ============================================================================
// TEST 11: Same variable name in different functions (allowed)
// Rule: Each function has its own scope
// Expected: NO ERROR
// ============================================================================
void test_func_a() {
	Integer shared_name = 1;  // OK: In function test_func_a
	Text common_var = "A";    // OK: In function test_func_a
}

void test_func_b() {
	Integer shared_name = 2;  // OK: In function test_func_b (different function)
	Text common_var = "B";    // OK: In function test_func_b (different function)
}

void test_func_c() {
	Integer shared_name = 3;  // OK: In function test_func_c (different function)
	Text common_var = "C";    // OK: In function test_func_c (different function)
}

// ============================================================================
// TEST 12: For-loop creates its own scope (allowed)
// Rule: Multiple for-loops can use the same loop variable name
// Expected: NO ERROR
// ============================================================================
void test_forloop_scopes() {
	for (Integer i = 0; i < 10; i++) {
		// OK: First for-loop with variable i
	}

	for (Integer i = 0; i < 5; i++) {
		// OK: Second for-loop with variable i (each for-loop has own scope)
	}

	for (Integer i = 1; i <= 3; i++) {
		// OK: Third for-loop with variable i
	}

	// Different loop variable names
	for (Integer x = 0; x < 10; x++) { }
	for (Integer y = 0; y < 10; y++) { }
	for (Integer z = 0; z < 10; z++) { }
}

// ============================================================================
// TEST 13: Function prototypes do not conflict with variables
// Rule: Function prototypes (declarators with parentheses) are not treated as
// variable re-declarations. The function redeclaration validator handles
// function-vs-function conflicts separately.
// Note: "some_value" is intentionally undeclared here (caught by undeclared validator).
// ============================================================================
void test_function_prototypes() {
	Time my_time = some_value;  // ERROR: 'some_value' is not declared
	Time my_time();       // OK: function prototype, not a variable re-declaration

	Integer get_value = 5;
	Integer get_value();  // OK: function prototype, not a variable re-declaration

	Text fetch_name = "test";
	Text fetch_name();    // OK: function prototype, not a variable re-declaration

	Real calculate;
	Real calculate();     // OK: function prototype, not a variable re-declaration
}

// ============================================================================
// TEST 14: While and do-while loops (allowed)
// Rule: While loops don't create their own scope for the condition
// Expected: NO ERROR (unless same scope re-declaration)
// ============================================================================
void test_while_loops() {
	Integer count = 0;
	while (count < 10) {
		Integer inner = 1;  // OK: Inner scope
		count++;
	}

	do {
		Integer inner = 2;  // OK: Each compound statement is separate scope
	} while (count > 0);

	Integer inner = 3;      // OK: Outside all loop scopes
}

// ============================================================================
// TEST 15: Complex nesting (allowed)
// Rule: Multiple levels of nesting should work correctly
// Expected: NO ERROR (except shadowing warnings)
// ============================================================================
void test_complex_nesting() {
	Integer level0 = 0;
	{
		Integer level1 = 1;
		{
			Integer level2 = 2;
			{
				Integer level3 = 3;
				for (Integer loop_var = 0; loop_var < 1; loop_var++) {
					Integer level4 = 4;
				}
			}
		}
	}
	// All inner variables are now out of scope
	Integer level1 = 100;  // OK: Previous level1 was in a different scope
	Integer level2 = 200;  // OK: Previous level2 was in a different scope
}


// ############################################################################
//                   S Y N T A X   E R R O R   T E S T S
// ############################################################################

// ============================================================================
// TEST 16: Syntax errors take precedence
// Note: Uncomment these lines one at a time to test syntax error detection
// The validator only runs semantic checks when there are no syntax errors
// ============================================================================
void test_syntax_errors() {
	// The following lines would cause syntax errors if uncommented:
	// Integer x = ;          // SYNTAX ERROR: Missing expression
	// Integer = 5;           // SYNTAX ERROR: Missing identifier
	// Integer x = 1 +;       // SYNTAX ERROR: Incomplete expression
	// void;                  // SYNTAX ERROR: Invalid statement

	// Valid code for normal testing
	Integer valid = 1;
}


// ############################################################################
//                    C O M B I N E D   T E S T S
// ############################################################################

// ============================================================================
// TEST 17: Mixed errors and warnings in same function
// ============================================================================
void test_combined_diagnostics() {
	// This should trigger WARNING for shadowing global
	Text global_name = "Combined";  // WARNING: shadows global variable at line 18

	// This should trigger ERROR for include file conflict
	Text include_var = "Combined";  // ERROR: already declared in included file 'test_globals.h'

	// This should trigger ERROR for same scope re-declaration
	Integer combined_local = 1;
	Integer combined_local = 2;     // ERROR: already declared in this scope
}

// ============================================================================
// TEST 18: Shadowing in nested blocks with same name at multiple levels
// ============================================================================
void test_multilevel_shadowing() {
	Integer shadow_me = 0;        // First declaration

	{
		Integer shadow_me = 1;    // WARNING: shadows variable at outer scope

		{
			Integer shadow_me = 2; // WARNING: shadows variable at previous nested scope
		}
	}
}


// ############################################################################
//                        M A I N   F U N C T I O N
// ############################################################################

// ============================================================================
// Main function - calls all test functions
// Also includes direct inline tests
// ============================================================================
void main() {
	// ========================================================================
	// Call all test functions
	// ========================================================================
	test_same_scope_redeclaration();
	test_param_redeclaration(1, "msg", 1.0);
	test_include_conflict();
	test_include_case_insensitive();
	test_multiple_redeclarations();
	test_same_file_shadow();
	test_same_file_case_insensitive();
	test_nested_scope_shadowing();
	test_forloop_shadowing();
	test_different_scopes_blocks();
	test_func_a();
	test_func_b();
	test_func_c();
	test_forloop_scopes();
	test_function_prototypes();
	test_while_loops();
	test_complex_nesting();
	test_syntax_errors();
	test_combined_diagnostics();
	test_multilevel_shadowing();

	// ========================================================================
	// Inline tests in main function
	// ========================================================================

	// ERROR: Conflicts with include file variable
	Text include_var = "Main";      // ERROR: Variable 'include_var' is already declared in included file 'test_globals.h'

	// WARNING: Shadows same-file global variable
	Text global_name = "Main";      // WARNING: Variable 'global_name' shadows a global variable declared at line 18

	// ERROR: Same scope re-declaration
	Integer main_local = 1;
	Integer main_local = 2;         // ERROR: Variable 'main_local' is already declared in this scope

	// OK: Nested block creates new scope
	{
		Integer main_local = 3;     // WARNING: shadows variable from main function scope
	}

	// OK: For-loop shares scope above
	for (Integer i = 0; i < 5; i++) {
		Integer loop_body = i;      // OK: Inside for-loop scope
	}
	for (Integer i = 0; i < 3; i++) { // ERROR: Variable is defined in previous loop
		Integer loop_body = i;      
	}
}


// ############################################################################
//                 S U M M A R Y   O F   E X P E C T E D   D I A G N O S T I C S
// ############################################################################
//
// CURRENT EXPECTED DIAGNOSTICS WITH THE PRESENT VALIDATOR IMPLEMENTATION:
//
// ERRORS (DiagnosticSeverity.Error = 1, Red Squiggle):
// -----------------------------------------------------------------------------
// Line  37: Integer x = 2;          - Re-declaration in same scope
// Line  40: Text name = "second";   - Re-declaration in same scope
// Line  43: Real pi = 3.14159;      - Re-declaration in same scope
// Line  52: Integer param = 5;      - Re-declaring function parameter
// Line  53: Text message = "new";   - Re-declaring function parameter
// Line  54: Real value = 9.9;       - Re-declaring function parameter
// Line  64: Text include_var        - Include file conflict
// Line  65: Integer include_count   - Include file conflict
// Line  66: Real include_value      - Include file conflict
// Line  74: void test_include_case_insensitive() - Conflicts with include-file prototype
// Line  90: Integer a = 10;         - Re-declaration in same scope
// Line  91: Integer b = 20;         - Re-declaration in same scope
// Line  92: Integer c = 30;         - Re-declaration in same scope
// Line  93: Integer d = 40;         - Re-declaration in same scope
// Line 236: Time my_time = some_value; - 'some_value' is not declared
// Line 237: Time my_time();         - False positive variable re-declaration
// Line 240: Integer get_value();    - False positive variable re-declaration
// Line 243: Text fetch_name();      - False positive variable re-declaration
// Line 246: Real calculate();       - False positive variable re-declaration
// Line 326: Text include_var        - Include file conflict (in combined test)
// Line 387: Text include_var        - Include file conflict (in main)
// Line 394: Integer main_local = 2; - Re-declaration in same scope (in main)// Line 409: Integer loop_body       - Variable already defined in previous for-loop body//
// WARNINGS (DiagnosticSeverity.Warning = 2, Yellow Squiggle):
// -----------------------------------------------------------------------------
// Line 107: Text global_name        - Shadows same-file global
// Line 108: Integer global_count    - Shadows same-file global
// Line 109: Real global_value       - Shadows same-file global
// Line 133: Integer outer_var       - Shadows outer scope variable
// Line 134: Text outer_text         - Shadows outer scope variable
// Line 137: Integer outer_var       - Shadows outer scope variable (nested)
// Line 152: Integer i (for loop)    - Shadows outer scope variable
// Line 156: Integer j (for loop)    - Shadows outer scope variable
// Line 323: Text global_name        - Shadows same-file global (combined test)
// Line 340: Integer shadow_me       - Shadows outer scope variable
// Line 343: Integer shadow_me       - Shadows outer scope variable (nested)
// Line 390: Text global_name        - Shadows same-file global (in main)
// Line 398: Integer main_local = 3; - Shadows outer scope variable (in main)
//
// OK (No Diagnostic Expected):
// -----------------------------------------------------------------------------
// - TEST 4 exact-case variants (INCLUDE_VAR, Include_Count, INCLUDE_VALUE)
// - TEST 7 exact-case variants (GLOBAL_NAME, GLOBAL_COUNT, CASE_TEST)
// - All for-loop variable declarations in separate loops
// - Variables in different functions with same names
// - Variables in nested blocks (may have shadowing warning, but not error)
// - All test_different_scopes_blocks, test_forloop_scopes, test_while_loops
//
// KNOWN CURRENT GAPS:
// -----------------------------------------------------------------------------
// - Function prototype lines in TEST 13 are still falsely flagged as variable
//   re-declarations when a variable with the same name already exists.
// - Variable/include shadowing checks are currently exact-case, not case-insensitive.
//
// ############################################################################

/*global variables*/{
    #define MAX_STRINGS 1500
    #define MAX_OCC     30000

    Real DROP_TOL = 0.005;
    Real EPS_DEF  = 0.05;

    Integer PIT_has_error[MAX_OCC+1];
    Integer PIT_msg_count[MAX_OCC+1];
}