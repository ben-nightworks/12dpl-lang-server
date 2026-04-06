// ============================================================================
// function_arguments.4dm - Function Argument Validation Tests
// ============================================================================
// Validator: validateFunctionArguments
//
// Diagnostic Rules:
//   ERROR: "Function '${funcName}' expects ${expectedCounts} argument(s) but got ${argCount}"
//          → Function call argument count doesn't match any overload
//   ERROR: "Function call '${funcName}' args mismatch — got (${argTypeStr}),
//           expected ${expectedSigs}"
//          → Argument types don't match any overload (after arg-count filter)
//
// Type Compatibility:
//   - Exact match: same type name
//   - Promotion: Integer→Real, Point→Segment, Element→Dynamic_Element,
//                Vector2→Vector3
//   - Subtype: Panel is-a Widget, various Box types is-a Widget
//
// Unknown functions/types are silently skipped (no diagnostic).
//
// ============================================================================

// ──────── Helper function declarations for testing ─────────────────────────

void no_args()
{
}

void one_int(Integer x)
{
}

void two_ints(Integer x, Integer y)
{
}

void takes_real(Real x)
{
}

void takes_text(Text msg)
{
}

Integer returns_int(Integer x)
{
	return x;
}

void takes_array(Integer arr[])
{
}

void takes_ref(Integer &x)
{
}

void takes_widget(Widget w)
{
}

void takes_element(Element e)
{
}

// Overloaded function — three signatures
void overloaded(Integer x)
{
}

void overloaded(Real x, Real y)
{
}

void overloaded(Text msg)
{
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 1: Correct argument count → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_correct_count()
{
	no_args();                 // OK: expects 0, got 0
	one_int(5);                // OK: expects 1, got 1
	two_ints(1, 2);            // OK: expects 2, got 2
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 2: Wrong argument count → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_wrong_count()
{
	no_args(1);                // ERROR: expects 0 but got 1
	one_int();                 // ERROR: expects 1 but got 0
	one_int(1, 2);             // ERROR: expects 1 but got 2
	two_ints(1);               // ERROR: expects 2 but got 1
	two_ints(1, 2, 3);         // ERROR: expects 2 but got 3
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 3: Correct argument types → OK
// ──────────────────────────────────────────────────────────────────────────────

void test_correct_types()
{
	Integer a = 10;
	Real b = 3.14;
	Text c = "hello";

	one_int(a);                // OK: Integer matches Integer
	takes_real(b);             // OK: Real matches Real
	takes_text(c);             // OK: Text matches Text
	takes_text("literal");     // OK: string literal matches Text
	one_int(42);               // OK: integer literal matches Integer
	takes_real(2.5);           // OK: real literal matches Real
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 4: Type mismatch → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_type_mismatch()
{
	Integer a = 10;
	Text msg = "hello";

	takes_text(a);             // ERROR: got (Integer), expected (Text)
	one_int(msg);              // ERROR: got (Text), expected (Integer)
	takes_real(msg);           // ERROR: got (Text), expected (Real)
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 5: Integer → Real promotion → OK
// Integer values are promotable to Real.
// ──────────────────────────────────────────────────────────────────────────────

void test_integer_real_promotion()
{
	Integer a = 10;
	takes_real(a);             // OK: Integer promotes to Real
	takes_real(42);            // OK: Integer literal promotes to Real
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 6: Overload selection → OK (matching overload found)
// ──────────────────────────────────────────────────────────────────────────────

void test_overload_selection()
{
	overloaded(5);             // OK: matches overloaded(Integer)
	overloaded(1.0, 2.0);     // OK: matches overloaded(Real, Real)
	overloaded("hi");          // OK: matches overloaded(Text)
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 7: No matching overload — wrong count → ERROR
// ──────────────────────────────────────────────────────────────────────────────

void test_no_matching_overload()
{
	overloaded(1, 2, 3);       // ERROR: expects 1 or 2 or 1 but got 3
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 8: Widget subtyping → OK
// Panel is a recognized subtype of Widget.
// ──────────────────────────────────────────────────────────────────────────────

void test_widget_subtype()
{
	Panel p;
	takes_widget(p);           // OK: Panel is a subtype of Widget
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 9: Function call return type resolution in arguments → OK
// When a function call is used as an argument, its return type is resolved.
// ──────────────────────────────────────────────────────────────────────────────

void test_return_type_resolution()
{
	Integer x = returns_int(5);
	one_int(returns_int(3));   // OK: returns_int returns Integer, one_int takes Integer
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 10: Integer literal promotion in overload context → OK
// Integer literal 5 should match both overloaded(Integer) and promote to Real.
// ──────────────────────────────────────────────────────────────────────────────

void test_literal_promotion_overload()
{
	overloaded(5);             // OK: matches overloaded(Integer) directly
	overloaded(5, 10);         // OK: Integer promotes to Real, matches overloaded(Real, Real)
}

// ──────────────────────────────────────────────────────────────────────────────
// TEST 11: Unknown function — no argument error, but undeclared-symbol error
// If a function is not in local definitions or prototype database,
// the argument validator skips it (undeclared symbols validator handles it).
// ──────────────────────────────────────────────────────────────────────────────

void test_unknown_function()
{
	unknown_function(1, 2, 3); // No argument error here; full pipeline still reports undeclared function
}

void main()
{
}

// ============================================================================
// EXPECTED DIAGNOSTICS SUMMARY
// ============================================================================
//
// ERRORS:
//   TEST 2:  no_args(1) — expects 0 but got 1
//   TEST 2:  one_int() — expects 1 but got 0
//   TEST 2:  one_int(1,2) — expects 1 but got 2
//   TEST 2:  two_ints(1) — expects 2 but got 1
//   TEST 2:  two_ints(1,2,3) — expects 2 but got 3
//   TEST 4:  takes_text(a) — type mismatch (Integer vs Text)
//   TEST 4:  one_int(msg) — type mismatch (Text vs Integer)
//   TEST 4:  takes_real(msg) — type mismatch (Text vs Real)
//   TEST 7:  overloaded(1,2,3) — no matching overload
//   TEST 11: unknown_function(1,2,3) — undeclared function (from undeclared-symbol validator)
//
// OK (no diagnostic):
//   TEST 1:  Correct argument counts
//   TEST 3:  Correct argument types (variables and literals)
//   TEST 5:  Integer→Real promotion
//   TEST 6:  Overload selection
//   TEST 8:  Widget subtyping (Panel→Widget)
//   TEST 9:  Return type resolution nested in arguments
//   TEST 10: Literal promotion in overload context
//   TEST 11: No argument-count/type diagnostic from this validator
//
// ============================================================================
