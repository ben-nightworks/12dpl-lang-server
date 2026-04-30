// ============================================================================
// logical_condition.4dm - Logical-condition validation (issue #101)
// ============================================================================
// Validator: validateLogicalConditions
//
// Reports when an `if`, `while`, `do…while`, or `for` test expression
// has a type that cannot be evaluated as a logical (boolean) value.
// ============================================================================

// ──────── Compatible conditions (no diagnostics) ───────────────────────────

void test_compatible()
{
	Integer i = 0;
	Real    r = 0.0;
	Text    t = "hello";

	if (1) {}                       // OK: Integer literal
	if (i) {}                       // OK: Integer variable
	if (i < 10) {}                  // OK: relational expression

	while (i < 10)                  // OK: relational expression
	{
		i = i + 1;
	}

	while (i)                       // OK: Integer variable (truthy)
	{
		i = i - 1;
	}

	do
	{
		i = i + 1;
	} while (i < 100);              // OK: relational expression

	for (Integer j = 0; j < 10; j = j + 1) {} // OK: relational

	if (t == "hello") {}            // OK: equality is logical
	if (i != 0 && r > 0.0) {}       // OK: combined relational
}

// ──────── Incompatible conditions (issue #101) ─────────────────────────────

void test_incompatible_while_literal()
{
	while ("123")                   // ERROR: Cannot use 'Text' as a logical condition
	{
	}
}

void test_incompatible_while_var()
{
	Text t = "hello";
	while (t)                       // ERROR: Cannot use 'Text' as a logical condition
	{
	}
}

void test_incompatible_if_literal()
{
	if ("yes")                      // ERROR: Cannot use 'Text' as a logical condition
	{
	}
}

void test_incompatible_if_var()
{
	Text t = "no";
	if (t)                          // ERROR: Cannot use 'Text' as a logical condition
	{
	}
}

void test_incompatible_do_while()
{
	Integer i = 0;
	Text msg = "loop";
	do
	{
		i = i + 1;
	} while (msg);                  // ERROR: Cannot use 'Text' as a logical condition
}

void test_incompatible_for_condition()
{
	Text guard = "x";
	for (Integer j = 0; guard; j = j + 1) // ERROR: Cannot use 'Text' as a logical condition
	{
	}
}
