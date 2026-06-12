// ============================================================================
// undeclared_symbols.4dm - Undeclared Symbol Validation Tests
// ============================================================================
// Validator: validateUndeclaredIdentifiers
//
// Diagnostic Rules:
//   ERROR: "Function '${text}' is not declared"
//          → Identifier used as function call but not in any symbol source
//   ERROR: "'${text}' is not declared"
//          → Identifier used as variable but not in any symbol source
//   WARNING: "Case type mismatch: switch expression is '${switchType}'
//             but case value is '${caseType}'"
//          → Switch/case type mismatch
//
// Symbol Resolution Order:
//   1. Local scope (innermost to outermost)
//   2. Known functions (prototypes — 8000+ built-in library functions)
//   3. Known variables (from includes)
//   4. Known defines (#define macros)
//
// All identifier matching is case-sensitive.
//
// ============================================================================

#define MY_MACRO 42
#define FUNC_MACRO(x) ((x) * 2)

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Declared local variables → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_declared_variables()
{
	Integer x = 10;
	Integer y = x + 5;          // OK: x is declared in this scope
	Real z = 3.14;
	Real w = z * 2.0;           // OK: z is declared in this scope
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Undeclared variables on RHS → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_undeclared_variables()
{
	Integer x = not_declared_var;        // ERROR: 'not_declared_var' is not declared
	Integer y = another_missing + 5;     // ERROR: 'another_missing' is not declared
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Undeclared function calls → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_undeclared_functions()
{
	totally_fake_function();             // ERROR: Function 'totally_fake_function' is not declared
	Integer result = nonexistent_fn(1);  // ERROR: Function 'nonexistent_fn' is not declared
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Known built-in prototype functions → OK
// Print and To_text are in the 8000+ function prototype database.
// ──────────────────────────────────────────────────────────────────────────────

void test_known_prototypes()
{
	Print("Hello");                      // OK: Print is a known prototype
	Text txt = To_text(42);              // OK: To_text is a known prototype
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Function parameters are in scope → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_parameters(Integer param_a, Real param_b)
{
	Integer x = param_a;                 // OK: param_a is declared as parameter
	Real y = param_b;                    // OK: param_b is declared as parameter
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: For-loop variable in scope within loop → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_for_loop_scope()
{
	for (Integer i = 0; i < 10; i++)
	{
		Integer x = i;                   // OK: i is declared in for-loop
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: #define macros recognized as declared → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_define_usage()
{
	Integer x = MY_MACRO;                // OK: MY_MACRO is a #define
	Integer y = FUNC_MACRO(5);           // OK: FUNC_MACRO is a function-like define
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: Case sensitivity — identifiers are case-sensitive → ERROR for wrong case
// ──────────────────────────────────────────────────────────────────────────────

void test_case_sensitivity()
{
	Integer myVar = 10;
	Integer x = myVar;                   // OK: exact case match
	Integer y = MyVar;                   // ERROR: 'MyVar' is not declared
	Integer z = MYVAR;                   // ERROR: 'MYVAR' is not declared
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 9: Switch/case type mismatch → WARNING
// The validator detects when case literal type differs from switch expression.
// ──────────────────────────────────────────────────────────────────────────────

void test_switch_type_mismatch()
{
	Integer mode = 1;
	switch (mode)
	{
	case 0:                              // OK: Integer switch, Integer case
		break;
	case 1:
		break;
	case "text":                         // WARNING: switch is Integer but case is Text
		break;
	}

	Text name = "test";
	switch (name)
	{
	case "hello":                        // OK: Text switch, Text case
		break;
	case 42:                             // WARNING: switch is Text but case is Integer
		break;
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 10: Conditional line suppression
// Variables on #if/#ifdef stripped lines are not checked for undeclared.
// ──────────────────────────────────────────────────────────────────────────────

#ifdef SOME_FLAG
void test_conditional()
{
	Integer x = conditional_only_var;    // OK: on conditional line, suppressed
}
#endif

// ──────────────────────────────────────────────────────────────────────────────
// TEST 11: Function-like macro argument suppression
// Arguments passed to function-like macros are not checked for undeclared.
// ──────────────────────────────────────────────────────────────────────────────

void test_macro_args()
{
	Integer result = FUNC_MACRO(some_arg); // OK: arg to function-like macro not checked
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 12: Nested expressions with multiple undeclared symbols → multiple ERRORs
// ──────────────────────────────────────────────────────────────────────────────

void test_nested_expressions()
{
	Integer x = 10;
	Integer y = x + undeclared_1 + undeclared_2; // ERROR: undeclared_1, undeclared_2
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 13: Global variables visible in functions → OK
// ──────────────────────────────────────────────────────────────────────────────

{
	Integer global_count = 0;
	Text global_name = "test";
}

void test_global_access()
{
	Integer x = global_count;            // OK: global_count declared at file level
	Text y = global_name;                // OK: global_name declared at file level
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 14: Local function calls → OK
// Functions defined in this file are known.
// ──────────────────────────────────────────────────────────────────────────────

Integer helper_func(Integer x)
{
	return x * 2;
}

void test_local_function_call()
{
	Integer result = helper_func(5);     // OK: helper_func defined in this file
}

void main()
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 15: Variable declared inside if-block is not accessible outside (issue #150)
// ──────────────────────────────────────────────────────────────────────────────

void test_if_block_scope()
{
	if (1 == 1)
	{
		Integer block_var = 99;
	}
	Integer x = block_var;              // ERROR: 'block_var' not declared in this scope
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 16: Variable declared before if-block remains in scope after
// ──────────────────────────────────────────────────────────────────────────────

void test_outer_scope_persists()
{
	Integer outer = 10;
	if (outer > 5)
	{
		Integer inner = outer + 1;      // OK: outer declared in function scope
	}
	Integer z = outer;                  // OK: outer still in scope after if-block
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// ERRORS:
//   TEST 2:  'not_declared_var' is not declared
//   TEST 2:  'another_missing' is not declared
//   TEST 3:  Function 'totally_fake_function' is not declared
//   TEST 3:  Function 'nonexistent_fn' is not declared
//   TEST 8:  'MyVar' is not declared (case mismatch)
//   TEST 8:  'MYVAR' is not declared (case mismatch)
//   TEST 12: 'undeclared_1' is not declared
//   TEST 12: 'undeclared_2' is not declared
//   TEST 15: 'block_var' is not declared (used outside if-block scope)
//
// WARNINGS:
//   TEST 9:  Case type mismatch: Integer switch, Text case ("text")
//   TEST 9:  Case type mismatch: Text switch, Integer case (42)
//
// OK (no diagnostic):
//   TEST 1:  All declared local variables
//   TEST 4:  Known prototype functions (Print, To_text)
//   TEST 5:  Function parameters in scope
//   TEST 6:  For-loop variable in scope
//   TEST 7:  #define macros
//   TEST 10: Conditional line identifiers (suppressed)
//   TEST 11: Function-like macro arguments (suppressed)
//   TEST 13: Global variables accessible in functions
//   TEST 14: Local function calls
//   TEST 16: Variable declared before if-block remains in scope after
//
// ============================================================================
