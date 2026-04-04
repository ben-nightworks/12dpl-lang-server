// ============================================================================
// deprecated_calls.4dm - Deprecated Function Call Validation Tests
// ============================================================================
// Validator: validateDeprecatedCalls
//
// Currently tracked deprecated functions:
//   WARNING: "Time() function is deprecated. Time is now a type. Use the
//             Get_time() function with the Time type instead."
//            → Token text 'Time' followed by '('
//
// Detection is token-based (works even with syntax errors).
//
// ============================================================================

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Time() call → WARNING + syntax error
// `Time()` is token-detected as deprecated, but it also parses as invalid code
// because `Time` is now a type name.
// ──────────────────────────────────────────────────────────────────────────────

void test_time_deprecated()
{
	Time();                      // WARNING: deprecated, plus syntax error from parser
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Time as a type declaration → OK (not a function call)
// ──────────────────────────────────────────────────────────────────────────────

void test_time_as_type()
{
	Time t;                      // OK: Time used as a type, not a function call
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Get_time() replacement → OK (recommended alternative)
// ──────────────────────────────────────────────────────────────────────────────

void test_get_time()
{
	Time t;
	Get_time(t);                 // OK: Get_time is the recommended replacement
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Time() in different expression contexts → WARNING + syntax error
// ──────────────────────────────────────────────────────────────────────────────

void test_time_in_contexts()
{
	Time a = Time();             // WARNING: deprecated, plus syntax error from parser
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Time variable name (not a call) → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_time_variable_name()
{
	Time my_time;                // OK: declaring a Time variable
	Integer x = 10;
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// ERRORS:
//   TEST 1: Syntax error at `Time()`
//   TEST 4: Syntax errors around `Time a = Time()`
//
// WARNINGS:
//   TEST 1: Time() call — deprecated
//   TEST 4: Time() in assignment — deprecated
//
// OK (no diagnostic):
//   TEST 2: Time as type declaration
//   TEST 3: Get_time() replacement
//   TEST 5: Time variable name
//
// ============================================================================
