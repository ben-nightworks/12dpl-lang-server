// ============================================================================
// void_return_overloads.4dm - Overload-Aware Void Return Value Validation
// ============================================================================
// Validator: validateVoidFunctionReturnValues
//
// Tests argument-count-aware overload resolution for void return checking.
// The validator counts arguments at each call site and only considers
// overloads with a matching parameter count. A call is flagged only if
// ALL matching overloads return void.
//
// ============================================================================

// ──────── Overloaded function declarations ─────────────────────────────────

// Pattern A: all overloads return void (always flagged when consumed)
void all_void()
{
}

void all_void(Integer x)
{
}

void all_void(Integer x, Integer y)
{
}

// Pattern B: no overloads return void (never flagged)
Integer no_void()
{
	return 0;
}

Integer no_void(Integer x)
{
	return x;
}

// Pattern C: mixed - 0-arg returns Integer, 1-arg returns void (Ben's case)
Integer mixed_func()
{
	return 42;
}

void mixed_func(Real value)
{
}

// Pattern D: mixed - 0-arg returns void, 1-arg returns Integer
void mixed_reverse()
{
}

Integer mixed_reverse(Integer x)
{
	return x;
}

// Pattern E: three overloads, only the 2-arg is void
Integer triple(Integer x)
{
	return x;
}

void triple(Integer x, Integer y)
{
}

Real triple(Integer x, Integer y, Integer z)
{
	return 1.0;
}

// ──────── Helper ────────────────────────────────────────────────────────────

void takes_int(Integer x)
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: All-void overloads consumed -> WARNING for every arity
// ──────────────────────────────────────────────────────────────────────────────

void test_all_void_consumed()
{
	Integer a = all_void();          // WARNING: all_void() returns void
	Integer b = all_void(1);         // WARNING: all_void() returns void
	Integer c = all_void(1, 2);      // WARNING: all_void() returns void
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: All-void overloads standalone -> OK
// ──────────────────────────────────────────────────────────────────────────────

void test_all_void_standalone()
{
	all_void();                      // OK: standalone
	all_void(1);                     // OK: standalone
	all_void(1, 2);                  // OK: standalone
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: No-void overloads consumed -> OK (never flagged)
// ──────────────────────────────────────────────────────────────────────────────

void test_no_void_consumed()
{
	Integer a = no_void();           // OK: no_void returns Integer
	Integer b = no_void(1);          // OK: no_void returns Integer
	if (no_void() != 0)              // OK
	{
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Mixed overloads - 0-arg (Integer) consumed -> OK
//         Ben's case: the 0-arg overload returns Integer, not void.
// ──────────────────────────────────────────────────────────────────────────────

void test_mixed_0arg_ok()
{
	Integer x = mixed_func();        // OK: 0-arg overload returns Integer
	if (mixed_func() != 0)           // OK: 0-arg overload returns Integer
	{
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Mixed overloads - 1-arg (void) consumed -> WARNING
//         Ben's case: the 1-arg overload returns void.
// ──────────────────────────────────────────────────────────────────────────────

void test_mixed_1arg_void()
{
	Real r = 1.0;
	Integer x = mixed_func(r);       // WARNING: 1-arg overload returns void
	if (mixed_func(r))               // WARNING: 1-arg overload returns void
	{
	}
	takes_int(mixed_func(r));        // WARNING: 1-arg overload returns void
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Mixed overloads - 1-arg (void) standalone -> OK
// ──────────────────────────────────────────────────────────────────────────────

void test_mixed_1arg_standalone()
{
	Real r = 1.0;
	mixed_func(r);                   // OK: standalone call to void overload
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: Reverse mixed - 0-arg (void) consumed -> WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_reverse_0arg_void()
{
	Integer x = mixed_reverse();     // WARNING: 0-arg overload returns void
	if (mixed_reverse())             // WARNING: 0-arg overload returns void
	{
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: Reverse mixed - 1-arg (Integer) consumed -> OK
// ──────────────────────────────────────────────────────────────────────────────

void test_reverse_1arg_ok()
{
	Integer x = mixed_reverse(5);    // OK: 1-arg overload returns Integer
	if (mixed_reverse(5) != 0)       // OK: 1-arg overload returns Integer
	{
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 9: Triple overload - 1-arg (Integer) consumed -> OK
// ──────────────────────────────────────────────────────────────────────────────

void test_triple_1arg_ok()
{
	Integer x = triple(1);           // OK: 1-arg overload returns Integer
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 10: Triple overload - 2-arg (void) consumed -> WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_triple_2arg_void()
{
	Integer x = triple(1, 2);        // WARNING: 2-arg overload returns void
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 11: Triple overload - 3-arg (Real) consumed -> OK
// ──────────────────────────────────────────────────────────────────────────────

void test_triple_3arg_ok()
{
	Real x = triple(1, 2, 3);        // OK: 3-arg overload returns Real
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 12: Mixed overload in arithmetic expression -> WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_mixed_in_arithmetic()
{
	Real r = 1.0;
	Integer x = mixed_func(r) + 1;   // WARNING: 1-arg overload returns void
	Integer y = mixed_func() + 1;    // OK: 0-arg overload returns Integer
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 13: Mixed overload in return statement -> WARNING / OK
// ──────────────────────────────────────────────────────────────────────────────

Integer test_mixed_return_void()
{
	Real r = 1.0;
	return mixed_func(r);            // WARNING: 1-arg overload returns void
}

Integer test_mixed_return_ok()
{
	return mixed_func();             // OK: 0-arg overload returns Integer
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// WARNINGS (12 total):
//   TEST 1:  all_void() in assignment (x3 -- one per arity)
//   TEST 5:  mixed_func(r) in assignment, condition, argument (x4)
//   TEST 7:  mixed_reverse() in assignment, condition (x2)
//   TEST 10: triple(1, 2) in assignment (x1)
//   TEST 12: mixed_func(r) + 1 in arithmetic (x1)
//   TEST 13: mixed_func(r) in return (x1)
//
// OK (no diagnostic):
//   TEST 2:  all_void() standalone (x3)
//   TEST 3:  no_void() consumed (x3)
//   TEST 4:  mixed_func() 0-arg consumed (x2)
//   TEST 6:  mixed_func(r) 1-arg standalone (x1)
//   TEST 8:  mixed_reverse(5) 1-arg consumed (x2)
//   TEST 9:  triple(1) 1-arg consumed (x1)
//   TEST 11: triple(1,2,3) 3-arg consumed (x1)
//   TEST 12: mixed_func() + 1 in arithmetic (x1)
//   TEST 13: mixed_func() in return (x1)
//
// ============================================================================
