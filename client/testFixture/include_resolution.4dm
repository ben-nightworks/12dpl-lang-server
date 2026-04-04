// ============================================================================
// include_resolution.4dm - Include Path Resolution Tests
// ============================================================================
// Tests the include system's ability to resolve files from different locations:
//   1. Same folder as the including file
//   2. Relative path from the including file
//   3. Include directories configured in settings
//
// This file does NOT test a specific validator — it tests the include
// resolution mechanism that underlies include-based symbol visibility.
//
// If include directories are NOT configured, TEST 3 may show errors for
// unresolved includes and undeclared symbols from those includes.
//
// ============================================================================

// Include from same folder (set_ups.h is in client/testFixture/)
#include "set_ups.h"

// Include from relative path (includes/ subfolder)
#include "includes/Test_Includes.h"

// Include using configured include directories
// (Test_Indirect_includes.h is in indirect_includes/ folder,
//  which must be added to 12dpl.compiler.includePaths)
#include "Test_Indirect_includes.h"

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Symbols from same-folder include → accessible
// set_ups.h defines constants like TRUE/FALSE and helper functions like create_rgb().
// ──────────────────────────────────────────────────────────────────────────────

void test_same_folder_include()
{
	Integer x = TRUE;            // OK: TRUE defined in set_ups.h
	Integer y = FALSE;           // OK: FALSE defined in set_ups.h
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Symbols from relative path include → accessible
// includes/Test_Includes.h is essentially empty but should resolve without error.
// ──────────────────────────────────────────────────────────────────────────────

void test_relative_path_include()
{
	// Test_Includes.h is minimal — the include statement itself is the test.
	// No errors on the #include line = relative path resolved correctly.
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Symbols from include directory → accessible
// indirect_includes/Test_Indirect_includes.h defines Test_Indirect().
// ──────────────────────────────────────────────────────────────────────────────

void test_include_directory()
{
	Test_Indirect();             // OK: from Test_Indirect_includes.h
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Helper functions from includes → accessible
// set_ups.h defines create_rgb(Integer,Integer,Integer).
// ──────────────────────────────────────────────────────────────────────────────

void test_define_from_include()
{
	Integer rgb = create_rgb(255, 128, 0);  // OK: function from set_ups.h
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Include guard prevents double-inclusion
// set_ups.h uses #ifndef/#define/#endif guards.
// ──────────────────────────────────────────────────────────────────────────────

// Second include of the same file should be safely guarded:
#include "set_ups.h"

void test_include_guard()
{
	Integer x = TRUE;            // OK: still accessible after double-include
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS
// ============================================================================
//
// This file should produce ZERO diagnostics when include directories are
// configured correctly.
//
// Required configuration:
//   12dpl.compiler.includePaths: ["<path_to>/indirect_includes"]
//
// Without that:
//   - Line 28: #include "Test_Indirect_includes.h" — unresolved include
//   - TEST 3: Test_Indirect() — undeclared function
//
// ============================================================================
