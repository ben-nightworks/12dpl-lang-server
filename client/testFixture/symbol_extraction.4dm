// ============================================================================
// symbol_extraction.4dm - Symbol Extraction / Symbol Collector Tests
// ============================================================================
// Tests the symbol collector's ability to extract:
//   - Global variables from script-level code
//   - Function declarations (prototypes and definitions)
//   - Function overloads
//   - Complex types (Matrix3, Vector3, etc.)
//   - Variables inside functions (should NOT be exported)
//   - Function parameters (should NOT be exported as variables)
//   - Various return types
//   - Complex parameter signatures (arrays, pass-by-reference)
//
// Used by: symbolCollector, completion provider, hover provider
//
// ============================================================================

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Global variables in script block → exported as variables
// ──────────────────────────────────────────────────────────────────────────────

{
	Integer count = 0;
	Integer other_var = 5;
	Text global_text = "hello";
	Real global_real = 3.14;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Overloaded function forward declarations → exported as functions
// Each overload should be listed separately with its signature.
// ──────────────────────────────────────────────────────────────────────────────

void process();
void process(Integer x);
void process(Integer x, Integer y);

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Function definitions with body → exported as functions
// Local variables inside should NOT be exported.
// ──────────────────────────────────────────────────────────────────────────────

void Test()
{
	Matrix3 mat;
	Real a, b, c, d, e, f;

	Get_matrix(mat, 1, 2, a);
	Get_matrix(mat, 1, 2, c);
}

void Test2()
{
	Vector3 c;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Local variables inside functions → NOT exported
// These should not appear in the exported symbols list.
// ──────────────────────────────────────────────────────────────────────────────

void function_with_locals()
{
	Integer local_int = 10;      // NOT exported
	Text local_text = "test";    // NOT exported
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Function parameters → NOT exported as variables
// Parameters are scoped to their function only.
// ──────────────────────────────────────────────────────────────────────────────

void function_with_params(Integer param_a, Real param_b)
{
	Integer x = param_a;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Various return types → correctly extracted
// The symbol collector should capture the return type of each function.
// ──────────────────────────────────────────────────────────────────────────────

Integer returns_integer()
{
	return 0;
}

Real returns_real()
{
	return 0.0;
}

Text returns_text()
{
	return "hello";
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: Complex parameter signatures → correctly extracted
// Array params, pass-by-reference, and combined variations.
// ──────────────────────────────────────────────────────────────────────────────

void complex_params(Integer x, Real &y, Text arr[], Integer &ref_arr[])
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: Multiple global blocks → all exported
// ──────────────────────────────────────────────────────────────────────────────

{
	Text second_block_var = "world";
	Integer another_global = 99;
}

void main()
{
	Test();
	Test2();
	process();
	process(1);
	process(1, 2);
}

// ============================================================================
// EXPECTED SYMBOL EXTRACTION
// ============================================================================
//
// Exported Variables:
//   count (Integer), other_var (Integer), global_text (Text), global_real (Real)
//   second_block_var (Text), another_global (Integer)
//
// Exported Functions:
//   process() — 3 overloads: (), (Integer), (Integer, Integer)
//   Test(), Test2()
//   function_with_locals()
//   function_with_params(Integer, Real)
//   returns_integer(), returns_real(), returns_text()
//   complex_params(Integer, Real&, Text[], Integer&[])
//   main()
//
// NOT Exported:
//   local_int, local_text   — locals in function_with_locals()
//   param_a, param_b        — parameters of function_with_params()
//   x                       — local in function_with_params()
//   mat, a, b, c, d, e, f   — locals in Test()
//   c                       — local in Test2()
//
// ============================================================================
