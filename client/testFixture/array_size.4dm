// ============================================================================
// array_size.4dm - Array Size Validation Tests
// ============================================================================
// Validator: validateArraySize
//
// Diagnostic Rules:
//   ERROR: "Array '${fullType} ${name} [ ]' requires a size"
//          → Array variable declaration has [] without a size
//
// Exceptions (NOT flagged):
//   - Function parameters: void foo(Integer arr[])  → OK
//   - Pass-by-reference parameters: void foo(Integer &arr[]) → OK
//
// ============================================================================

#include "large_header.h"

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Unsized arrays in function body → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_unsized_in_function()
{
	Text my_choices[];               // ERROR: requires a size
	Integer my_int_array[];          // ERROR: requires a size
	Real my_real_array[];            // ERROR: requires a size
	Element my_element_array[];      // ERROR: requires a size
	Model my_model_array[];          // ERROR: requires a size
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Sized arrays → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_sized_arrays()
{
	Text text_var = "Hello, World!";
	Text sized_array[10];            // OK: constant size
	Integer sized_int[5];            // OK: constant size
	Real sized_real[100];            // OK: constant size
	Integer x = 5;
	Integer dynamic_size[x];         // OK: variable size (runtime)
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Function parameters without size → OK (not flagged)
// ──────────────────────────────────────────────────────────────────────────────

void test_param_unsized(Integer arr[], Text texts[], Real values[])
{
	// Function parameters may omit array size — this is allowed
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Pass-by-reference parameters without size → OK (not flagged)
// ──────────────────────────────────────────────────────────────────────────────

void test_ref_param_unsized(Integer &arr[], Text &texts[])
{
	// Pass-by-reference array parameters may also omit size
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Unsized arrays at top level (global scope) → ERROR
// ──────────────────────────────────────────────────────────────────────────────

{
	Integer global_unsized[];        // ERROR: requires a size
	Text global_text_unsized[];      // ERROR: requires a size
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Mixed valid and invalid in same function
// ──────────────────────────────────────────────────────────────────────────────

void test_mixed()
{
	Text valid_array[10];            // OK
	Integer invalid_array[];         // ERROR: requires a size
	Integer also_valid[3];           // OK
	Real another_invalid[];          // ERROR: requires a size
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// ERRORS:
//   TEST 1: my_choices[] — requires size
//   TEST 1: my_int_array[] — requires size
//   TEST 1: my_real_array[] — requires size
//   TEST 1: my_element_array[] — requires size
//   TEST 1: my_model_array[] — requires size
//   TEST 5: global_unsized[] — requires size
//   TEST 5: global_text_unsized[] — requires size
//   TEST 6: invalid_array[] — requires size
//   TEST 6: another_invalid[] — requires size
//
// OK (no diagnostic):
//   TEST 2: All sized arrays (constant and variable size)
//   TEST 3: Function parameters (unsized allowed)
//   TEST 4: Pass-by-ref parameters (unsized allowed)
//   TEST 6: Valid arrays in mixed function
//
// ============================================================================