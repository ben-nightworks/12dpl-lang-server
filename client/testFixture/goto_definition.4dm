// ============================================================================
// goto_definition.4dm - Goto Definition Tests (#91)
// ============================================================================
// Tests that goto-definition resolves to the full function definition rather
// than to an earlier forward declaration of the same function.
//
// ============================================================================

#include "/includes/Test_Include.h"

// ──────── Forward declarations ───────────────────────────────────────────────
void forward_only(Integer x);

void both_decl_and_def(Integer a, Integer b);

Integer returns_value(Real x);

// ──────── Full definitions ───────────────────────────────────────────────────

void forward_only(Integer x)
{
}

void both_decl_and_def(Integer a, Integer b)
{
	Integer result = a + b;
}

Integer returns_value(Real x)
{
	return 0;
}

// ──────── No forward declaration ─────────────────────────────────────────────

void definition_only(Text msg)
{
}

// ──────── Callers (to exercise goto-definition from a call site) ─────────────

void main()
{
	forward_only(1);
	both_decl_and_def(1, 2);
	Integer v = returns_value(1.0);
	definition_only("hello");

	Add(1, 2);
}

// ============================================================================
// EXPECTED GOTO-DEFINITION RESULTS
// ============================================================================
//
// forward_only        -> line of 'void forward_only(Integer x)'  (definition, ~line 20)
// both_decl_and_def   -> line of 'void both_decl_and_def(...)'   (definition, ~line 24)
// returns_value       -> line of 'Integer returns_value(Real x)'  (definition, ~line 29)
// definition_only     -> line of 'void definition_only(Text msg)'  (~line 35)
//
// None should point at a forward declaration.
//
// ============================================================================
