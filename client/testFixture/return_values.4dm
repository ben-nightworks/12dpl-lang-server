// ============================================================================
// return_values.4dm - Return Statement Validation Tests
// ============================================================================
// Validator: validateReturnStatements
//
// Diagnostic Rules:
//   ERROR: "Function '${name}' has return type '${returnType}' but does not
//           end with a return statement"
//          → Non-void function's last statement is not a return
//   ERROR: "Function '${name}' has return type '${returnType}' but returns
//           no value"
//          → Non-void return statement has no expression (bare return)
//   ERROR: "Void function '${name}' should not return a value"
//          → Void function has return with expression
//   ERROR: "Function '${name}' returns '${exprType}' but declared return
//           type is '${returnType}'"
//          → Return expression type doesn't match declared return type
//
// Type Compatibility on return:
//   - Exact match, Integer→Real promotion, Point→Segment promotion
//   - Subtype: Panel is-a Widget, etc.
//
// Script-level code (wrapper functions) is skipped.
//
// ============================================================================

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Non-void function with correct return → OK
// ──────────────────────────────────────────────────────────────────────────────

Integer test_return_ok()
{
	return 42;                   // OK: Integer function returns Integer literal
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Non-void function without return → ERROR
// ──────────────────────────────────────────────────────────────────────────────

Integer test_no_return()         // ERROR: has return type 'Integer' but does not end with return
{
	Integer x = 10;
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Void function without return → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_void_no_return()
{
	Integer x = 10;              // OK: void functions don't need return
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Void function with bare return → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_void_bare_return()
{
	Integer x = 10;
	return;                      // OK: bare return in void function
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Void function returning a value → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_void_returns_value()
{
	return 42;                   // ERROR: Void function should not return a value
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Non-void with bare return (no value) → ERROR
// ──────────────────────────────────────────────────────────────────────────────

Integer test_empty_return()
{
	return;                      // ERROR: has return type 'Integer' but returns no value
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: If/else both branches end with return → OK
// ──────────────────────────────────────────────────────────────────────────────

Integer test_if_else_return(Integer x)
{
	if (x > 0)
	{
		return 1;
	}
	else
	{
		return 0;
	}                            // OK: both branches end with return
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: If without else — missing return path → ERROR
// ──────────────────────────────────────────────────────────────────────────────

Integer test_if_no_else(Integer x) // ERROR: does not end with return statement
{
	if (x > 0)
	{
		return 1;
	}
	// No else branch, no final return
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 9: Return type mismatch — literal wrong type → ERROR
// ──────────────────────────────────────────────────────────────────────────────

Integer test_return_wrong_literal()
{
	return "hello";              // ERROR: returns 'Text' but declared type is 'Integer'
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 10: Return type mismatch — variable wrong type → ERROR
// ──────────────────────────────────────────────────────────────────────────────

Integer test_return_wrong_var_type()
{
	Text msg = "hello";
	return msg;                  // ERROR: returns 'Text' but declared type is 'Integer'
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 11: Integer → Real promotion on return → OK
// ──────────────────────────────────────────────────────────────────────────────

Real test_int_to_real_literal()
{
	return 42;                   // OK: Integer literal promotes to Real
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 12: Integer variable → Real promotion on return → OK
// ──────────────────────────────────────────────────────────────────────────────

Real test_int_var_to_real()
{
	Integer x = 42;
	return x;                    // OK: Integer variable promotes to Real
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 13: Script-level code → ignored (wrapper functions skipped)
// ──────────────────────────────────────────────────────────────────────────────

{
	Integer x = 10;
	// No return needed — this is script-level code (wrapped in __12dpl__script__)
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 14: Widget subtype return → OK
// Panel is a recognized subtype of Widget.
// ──────────────────────────────────────────────────────────────────────────────

Widget test_panel_as_widget()
{
	Panel p;
	return p;                    // OK: Panel is a subtype of Widget
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 15: Wrong subtype direction → ERROR
// Widget is NOT a subtype of Panel (it's the parent).
// ──────────────────────────────────────────────────────────────────────────────

Panel test_widget_as_panel()
{
	Widget w;
	return w;                    // ERROR: returns 'Widget' but declared type is 'Panel'
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 16: Non-void function with return in both if/else branches (nested) → OK
// ──────────────────────────────────────────────────────────────────────────────

Integer test_nested_if_else(Integer a, Integer b)
{
	if (a > 0)
	{
		if (b > 0)
		{
			return 1;
		}
		else
		{
			return 2;
		}
	}
	else
	{
		return 3;
	}
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 17: Text function returns Text → OK
// ──────────────────────────────────────────────────────────────────────────────

Text test_text_return()
{
	return "some text";          // OK: Text function returns Text literal
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 18: Multiple return paths, some wrong → ERROR on wrong type
// ──────────────────────────────────────────────────────────────────────────────

Integer test_mixed_returns(Integer x)
{
	if (x > 0)
	{
		return "wrong";          // ERROR: returns 'Text' but declared type is 'Integer'
	}
	else
	{
		return 0;                // OK: Integer matches Integer
	}
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// ERRORS:
//   TEST 2:  test_no_return() — missing return statement
//   TEST 5:  test_void_returns_value() — void returns a value
//   TEST 6:  test_empty_return() — non-void returns no value (bare return)
//   TEST 8:  test_if_no_else() — missing return (no else branch)
//   TEST 9:  test_return_wrong_literal() — returns Text, declared Integer
//   TEST 10: test_return_wrong_var_type() — returns Text, declared Integer
//   TEST 15: test_widget_as_panel() — returns Widget, declared Panel
//   TEST 18: test_mixed_returns() — "wrong" returns Text, declared Integer
//
// OK (no diagnostic):
//   TEST 1:  Integer returns Integer
//   TEST 3:  Void without return
//   TEST 4:  Void with bare return
//   TEST 7:  If/else both branches return
//   TEST 11: Integer literal → Real promotion
//   TEST 12: Integer variable → Real promotion
//   TEST 13: Script-level code (skipped)
//   TEST 14: Panel → Widget subtype return
//   TEST 16: Nested if/else all branches return
//   TEST 17: Text function returns Text
//   TEST 18: One branch returns correct type (0)
//
// ============================================================================
