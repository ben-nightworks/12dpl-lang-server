// ============================================================================
// test_globals.h - Include file with global variables for testing
// ============================================================================
// This file is included by Test4.4dm to test include file variable conflicts.
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
