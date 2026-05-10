// ============================================================================
// void_return_usage.4dm - Void Return Value Usage Validation Tests
// ============================================================================
// Validator: validateVoidFunctionReturnValues
//
// Diagnostic Rules:
//   WARNING: "'${funcName}()' returns void and cannot be used as a value
//             in an expression"
//            → Void function call's return value is consumed
//
// "Consumed" means: used in assignment, condition, argument, arithmetic,
//                   return, etc.
// "NOT consumed" means: standalone function call statement (just the call).
//
// Detection works by walking the parent context chain of the PostfixExpression.
// Local function definitions override external signatures.
//
// ============================================================================

// ──────── Helper declarations ──────────────────────────────────────────────

void void_func()
{
}

void void_with_args(Integer x)
{
}

Integer int_func()
{
	return 42;
}

void takes_int(Integer x)
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Standalone void call → OK (return value not consumed)
// ──────────────────────────────────────────────────────────────────────────────

void test_standalone_call()
{
	void_func();                 // OK: return value not consumed
	void_with_args(5);           // OK: standalone call
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Void in assignment → WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_void_in_assignment()
{
	Integer x = void_func();     // WARNING: void_func() returns void, used as value
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Void in if condition → WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_void_in_condition()
{
	if (void_func())             // WARNING: void_func() returns void, used as value
	{
	}

	if (void_func() == 1)        // WARNING: void_func() returns void, used as value
	{
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Void as function argument → WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_void_as_argument()
{
	takes_int(void_func());      // WARNING: void_func() returns void, used as value
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Void in while condition → WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_void_in_while()
{
	while (void_func())          // WARNING: void_func() returns void, used as value
	{
		break;
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Void in arithmetic expression → WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_void_in_arithmetic()
{
	Integer x = void_func() + 1; // WARNING: void_func() returns void, used as value
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: Void in return statement → WARNING
// ──────────────────────────────────────────────────────────────────────────────

Integer test_void_in_return()
{
	return void_func();          // WARNING: void_func() returns void, used as value
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: Non-void function in expression → OK (no diagnostic)
// ──────────────────────────────────────────────────────────────────────────────

void test_nonvoid_in_expression()
{
	Integer x = int_func();      // OK: int_func returns Integer
	if (int_func())              // OK: returns Integer
	{
	}
	takes_int(int_func());       // OK: returns Integer
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 9: Non-void as standalone → OK (return value just discarded)
// ──────────────────────────────────────────────────────────────────────────────

void test_nonvoid_standalone()
{
	int_func();                  // OK: standalone call, return value discarded (no warning)
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 10: Multiple void calls consumed → multiple WARNINGs
// ──────────────────────────────────────────────────────────────────────────────

void test_multiple_void_consumed()
{
	Integer x = void_func();     // WARNING
	Integer y = void_func();     // WARNING
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 11: Void function with arguments consumed → WARNING
// ──────────────────────────────────────────────────────────────────────────────

void test_void_args_consumed()
{
	Integer x = void_with_args(5); // WARNING: void_with_args() returns void, used as value
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// WARNINGS:
//   TEST 2:  void_func() in assignment
//   TEST 3:  void_func() in if condition (x2 — bare and comparison)
//   TEST 4:  void_func() as function argument
//   TEST 5:  void_func() in while condition
//   TEST 6:  void_func() in arithmetic expression
//   TEST 7:  void_func() in return statement
//   TEST 10: void_func() in assignment (x2)
//   TEST 11: void_with_args() in assignment
//
// OK (no diagnostic):
//   TEST 1:  Standalone void calls
//   TEST 8:  Non-void function in expressions
//   TEST 9:  Non-void standalone call (return discarded)
//
// ============================================================================
