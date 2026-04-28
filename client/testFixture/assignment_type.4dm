// ============================================================================
// assignment_type.4dm - Assignment Type Validation (issue #100)
// ============================================================================
// Validator: validateAssignmentTypes
//
// Checks that assignments and initialisers respect 12dPL's type rules,
// reporting "Cannot promote 'X' to 'Y'" when a value cannot be converted
// to the destination type.
// ============================================================================

// ──────── Initialiser checks ────────────────────────────────────────────────

void test_init_compatible()
{
	Integer i = 0;                 // OK: Integer literal
	Real    r = 0;                 // OK: Integer promotes to Real
	Real    r2 = 1.5;              // OK: Real literal
	Text    t = "hello";           // OK: Text literal
	Integer64 big = 42;            // OK: Integer promotes to Integer64
}

void test_init_incompatible()
{
	Integer i = "hello";           // ERROR: Cannot promote 'Text' to 'Integer'
	Text    t = 0;                 // ERROR: Cannot promote 'Integer' to 'Text'
	Text    t2 = 1.5;              // ERROR: Cannot promote 'Real' to 'Text'
}

// ──────── Plain assignment checks ───────────────────────────────────────────

void test_assign_compatible()
{
	Integer i;
	Real    r;
	Text    t;

	i = 0;                         // OK: Integer literal
	r = 0;                         // OK: Integer promotes to Real
	r = 1.5;                       // OK: Real literal
	t = "hello";                   // OK: Text literal

	Integer src;
	r = src;                       // OK: Integer variable promotes to Real
}

void test_assign_incompatible()
{
	Integer i = 0;
	Text    t;
	Real    r;

	t = i;                         // ERROR: Cannot promote 'Integer' to 'Text'
	t = 0;                         // ERROR: Cannot promote 'Integer' to 'Text'
	t = 1.5;                       // ERROR: Cannot promote 'Real' to 'Text'

	Text other;
	i = other;                     // ERROR: Cannot promote 'Text' to 'Integer'
	r = other;                     // ERROR: Cannot promote 'Text' to 'Real'
}

// ──────── Subtype / promotion families ──────────────────────────────────────

void test_promotion_chain()
{
	Integer    i = 0;
	Integer64  big;
	Real       r;

	big = i;                       // OK: Integer promotes to Integer64
	r   = big;                     // OK: Integer64 promotes to Real
	i   = big;                     // OK: Integer64 promotes to Integer
}

// ──────── Scope isolation between functions ─────────────────────────────────

void test_scope_a()
{
	Text x;
	x = "hello";                   // OK
}

void test_scope_b()
{
	Integer x;
	x = 0;                         // OK: x here is Integer, not Text
}
