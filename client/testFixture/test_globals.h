// ============================================================================
// test_globals.h - Include file with global variables for testing
// ============================================================================
// This file is included by variable_redeclaration.4dm and function_redeclaration.4dm
// Variables declared here should trigger ERROR diagnostics when re-declared
// in files that include this header.
//
// Variables defined here:
//   - include_var   (Text)
//   - include_count (Integer)
//   - include_value (Real)
// ============================================================================

{
	Text include_var = "From Include";       // Global variable from include file
	Integer include_count = 100;             // Global variable from include file
	Real include_value = 3.14;               // Global variable from include file
}
void test_include_case_insensitive(Integer x); // Forward declaration to test function declaration conflicts
void test_include_case_insensitive(); // Forward declaration to test function declaration conflicts
