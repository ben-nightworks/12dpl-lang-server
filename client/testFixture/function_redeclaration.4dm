// ============================================================================
// function_redeclaration.4dm - Function Redeclaration Validation Tests
// ============================================================================
// Validator: validateFunctionRedeclarations
//
// Diagnostic Rules:
//   ERROR: "Function '${name}' is already defined at line ${line}"
//          → Same function name with identical parameter signature defined twice
//   ERROR: "Function '${name}' is already defined in included file '${sourceFile}'"
//          → Function with same signature as include-file function
//
// Allowed (no diagnostic):
//   - Function overloading (same name, different parameter signatures)
//   - Forward declaration followed by full definition (same signature)
//   - Forward declaration after full definition (silently ignored)
//   - Functions on conditional (#if/#ifdef) lines (suppressed)
//
// Parameter signature = parameter types + array-ness (return type is irrelevant)
//
// ============================================================================

#include "test_globals.h"

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Same-signature redefinition → ERROR
// Two full definitions with identical parameter signatures.
// ──────────────────────────────────────────────────────────────────────────────

Integer my_func(Integer a, Integer b)
{
	return a + b;
}

Integer my_func(Integer a, Integer b) // ERROR: already defined at line 31
{
	return a - b;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Overloads with different parameter signatures → OK
// Different param count, different param type, array vs non-array.
// ──────────────────────────────────────────────────────────────────────────────

void process_data(Integer x)
{
}

void process_data(Integer x, Integer y) // OK: different param count
{
}

void process_data(Real x) // OK: different param type
{
}

void process_data(Integer x[]) // OK: array vs non-array
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Forward declaration followed by definition → OK
// A forward declaration (no body) then a full definition (with body).
// ──────────────────────────────────────────────────────────────────────────────

Integer compute(Integer val);

Integer compute(Integer val) // OK: forward + definition allowed
{
	return val * 2;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Forward declaration after full definition → OK
// ──────────────────────────────────────────────────────────────────────────────

void setup()
{
}

void setup(); // OK: forward after full definition (silently accepted)

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Multiple redeclarations — each occurrence flagged → ERROR (each)
// ──────────────────────────────────────────────────────────────────────────────

void duplicate()
{
}

void duplicate() // ERROR: already defined
{
}

void duplicate() // ERROR: already defined
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Include file conflict → ERROR
// test_globals.h declares:
//   void test_include_case_insensitive(Integer x);
//   void test_include_case_insensitive();
// Re-defining the same signatures here triggers include conflict errors.
// ──────────────────────────────────────────────────────────────────────────────

void test_include_case_insensitive(Integer x) // ERROR: already defined in test_globals.h
{
}

void test_include_case_insensitive() // ERROR: already defined in test_globals.h
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: Include overload — different signature from include → OK
// The include has (Integer x) and (), so (Integer x, Integer y) is a new overload.
// ──────────────────────────────────────────────────────────────────────────────

void test_include_case_insensitive(Integer x, Integer y) // OK: different signature
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: Case sensitivity — different case = different function → OK
// Function names are case-sensitive. These are three distinct functions.
// ──────────────────────────────────────────────────────────────────────────────

void My_Function(Integer x)
{
}

void my_function(Integer x) // OK: different name (case-sensitive)
{
}

void MY_FUNCTION(Integer x) // OK: different name (case-sensitive)
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 9: Duplicate forward declarations — upgraded, not errored → OK
// Multiple forward declarations of the same signature are fine.
// ──────────────────────────────────────────────────────────────────────────────

Real calculate(Real a, Real b);

Real calculate(Real a, Real b); // OK: duplicate forward decl

Real calculate(Real a, Real b) // OK: forward + definition
{
	return a + b;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 10: Return type irrelevant — only param signature matters → ERROR
// Same param signature but different return type is still a redefinition.
// ──────────────────────────────────────────────────────────────────────────────

Integer get_value(Integer x)
{
	return x;
}

Real get_value(Integer x) // ERROR: same param signature (Integer)
{
	return 0.0;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 11: Conditional line suppression → OK
// Functions inside #ifdef/#else branches should not trigger redeclaration
// errors because the conditional preprocessor strips one branch.
// ──────────────────────────────────────────────────────────────────────────────

#ifdef SOME_FLAG
void conditional_func()
{
}
#else
void conditional_func() // OK: on conditional branch, suppressed
{
}
#endif

// ──────────────────────────────────────────────────────────────────────────────
// TEST 12: Mix of prototypes and definitions (from real-world patterns)
// Forward declarations → definitions → duplicate definitions
// ──────────────────────────────────────────────────────────────────────────────

Integer create_rgb(Integer r, Integer g, Integer b);

Integer create_rgb(Integer r, Integer g, Integer b, Integer a);

Integer create_rgb(Integer r, Integer g, Integer b) // OK: forward + definition
{
	return 0;
}

Integer create_rgb(Integer r, Integer g, Integer b, Integer a) // OK: forward + definition
{
	return 0;
}

Integer create_rgb(Integer r, Integer g, Integer b); // OK: forward after full definition

Integer create_rgb(Integer r, Integer g, Integer b) // ERROR: already fully defined
{
	return 0;
}

Integer create_rgb(Integer r, Integer g, Integer b, Integer a) // ERROR: already fully defined
{
	return 0;
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// ERRORS:
//   TEST 1:  my_func(Integer, Integer) — same-signature redefinition
//   TEST 5:  duplicate() — two redefinitions (2 errors)
//   TEST 6:  test_include_case_insensitive(Integer) — include conflict
//   TEST 6:  test_include_case_insensitive() — include conflict
//   TEST 10: get_value(Integer) — same param sig, different return type
//   TEST 12: create_rgb(Integer,Integer,Integer) — already fully defined
//   TEST 12: create_rgb(Integer,Integer,Integer,Integer) — already fully defined
//
// OK (no diagnostic):
//   TEST 2:  Overloads with different param signatures
//   TEST 3:  Forward declaration + definition
//   TEST 4:  Forward after full definition
//   TEST 7:  Include overload (different signature)
//   TEST 8:  Case-sensitive different names
//   TEST 9:  Duplicate forward declarations
//   TEST 11: Conditional branch suppression
//   TEST 12: Forward + definition pairs (first occurrence)
//
// ============================================================================
