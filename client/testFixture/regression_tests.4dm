// ============================================================================
// Test5.4dm - Regression Tests for Issues Fixed 2026-02-24
// ============================================================================
// This file tests fixes for:
//   1. Function overloading (same name, different signatures) → OK
//   2. For-loop variables inside functions not leaked as globals
//   3. All built-in types recognised as function return types
//   4. Opening brace on next line (indented) after function signature → OK
//   5. #if 0 dead-code blocks fully stripped
// ============================================================================


// ############################################################################
//              TEST 1: FUNCTION OVERLOADING (same name, different params)
// ############################################################################
// Rule: Multiple function declarations/prototypes with the same name but
//       different parameter lists are valid (function overloading).
//       They must NOT be flagged as re-declarations.
// Severity: OK (no diagnostic)
// ############################################################################

// --- 1a: Overloaded prototypes ---
void PrintLog(Text msg, Integer log_level);                        // OK
void PrintLog(Text msg, Integer log_level, Element &elt);          // OK - overload, not redeclaration

// --- 1b: Overloaded function definitions ---
void PrintLog(Text msg, Integer log_level)
{
	Print(msg);
}

void PrintLog(Text msg, Integer log_level, Element &elt)
{
	Print(msg);
}

// --- 1c: Multiple overloads of another function ---
Integer Process(Text input);                                       // OK
Integer Process(Text input, Integer flags);                        // OK - overload
Integer Process(Text input, Integer flags, Real threshold);        // OK - overload

Integer Process(Text input)
{
	return 0;
}

Integer Process(Text input, Integer flags)
{
	return 0;
}

Integer Process(Text input, Integer flags, Real threshold)
{
	return 0;
}


// ############################################################################
//              TEST 2: FOR-LOOP VARIABLES STAY LOCAL
// ############################################################################
// Rule: Variables declared in for-loops inside functions must NOT be
//       exported as global symbols. They are local to the function.
// Severity: OK (no diagnostic for using 'i' etc. elsewhere)
// ############################################################################

void function_with_for_loops()
{
	for (Integer i = 0; i < 10; i++)
	{
		Print(To_text(i));
	}

	for (Integer j = 0; j < 5; j++)
	{
		Print(To_text(j));
	}
}

// Using 'i' and 'j' here must NOT conflict with the for-loop variables above
void another_function()
{
	Integer i = 42;   // OK - the 'i' in function_with_for_loops is local
	Integer j = 99;   // OK - the 'j' in function_with_for_loops is local
}


// ############################################################################
//              TEST 3: ALL BUILT-IN TYPES AS RETURN TYPES
// ############################################################################
// Rule: Functions returning any built-in type must be recognised as function
//       definitions, not wrapped as top-level script blocks.
// Severity: OK (no parse errors)
// ############################################################################

// --- Types that were previously missing from the wrapper detection list ---

Log_Line create_log(Text msg, Integer level)
{
	Log_Line result;
	return result;
}

Uid get_uid(Element &elt)
{
	Uid id;
	return id;
}

Colour get_colour()
{
	Colour c;
	return c;
}

Curve build_curve()
{
	Curve c;
	return c;
}

Integer64 get_big_number()
{
	Integer64 n = 0;
	return n;
}

// --- Types that already worked (sanity check) ---

Integer get_count()
{
	return 0;
}

Text get_name()
{
	return "test";
}

Real get_value()
{
	return 3.14;
}

void do_nothing()
{
	return;
}

Element get_element()
{
	Element e;
	return e;
}


// ############################################################################
//              TEST 4: OPENING BRACE ON NEXT LINE (INDENTED)
// ############################################################################
// Rule: A function signature followed by '{' on the next line (possibly
//       indented with tabs or spaces) must be treated as a function body,
//       not a top-level script block.
// Severity: OK (no "missing ';' at '{'" errors)
// ############################################################################

// --- 4a: Brace indented with tab ---
Integer tabbed_brace_function(Text input)
	{
	Integer len = Text_length(input);
	return len;
	}

// --- 4b: Brace indented with spaces ---
Integer spaced_brace_function(Text input)
   {
   Integer len = Text_length(input);
   return len;
   }

// --- 4c: Brace on same line (normal style, should still work) ---
Integer normal_brace_function(Text input) {
	Integer len = Text_length(input);
	return len;
}

// --- 4d: Brace on next line at column 0 ---
Integer col0_brace_function(Text input)
{
	Integer len = Text_length(input);
	return len;
}

// --- 4e: Comment between signature and brace ---
Integer commented_brace_function(Text input)
/* This function has a comment before the brace */
{
	Integer len = Text_length(input);
	return len;
}


// ############################################################################
//              TEST 5: #if 0 DEAD CODE BLOCKS
// ############################################################################
// Rule: Content inside #if 0 ... #endif blocks is dead code and must be
//       completely stripped. It must not cause parse errors or leak symbols.
// Severity: OK (no diagnostics from dead code)
// ############################################################################

// --- 5a: Simple #if 0 block ---
#if 0
	This is dead code that would normally cause parse errors.
	Integer ghost_var = 999;
	switch(id) {
		clearly invalid syntax here @@@ ###
	}
#endif

// --- 5b: #if 0 with #else (code after #else is live) ---
#if 0
	Dead code branch - should be stripped
	Invalid stuff &*^% here
#else
Integer live_after_else()
{
	return 1;    // This function IS live code
}
#endif

// --- 5c: Nested #if inside #if 0 ---
#if 0
	Outer dead code
	#if 1
		Still dead - nested inside #if 0
	#endif
	Still dead
#endif

// --- 5d: Variable after #if 0 block must not be affected ---
{
	Integer after_if_zero = 42;   // OK - not inside any #if 0 block
}


// ############################################################################
//              TEST 6: COMBINED SCENARIOS
// ############################################################################
// Rule: All fixes interact correctly together.
// ############################################################################

// --- 6a: Overloaded functions with non-standard brace placement ---
Log_Line make_log(Text msg)
	{
	Log_Line result;
	return result;
	}

Log_Line make_log(Text msg, Integer level)
{
	Log_Line result;
	return result;
}

// --- 6b: For-loop variable 'i' inside an overloaded function ---
Integer count_items(Text input)
{
	Integer total = 0;
	for (Integer i = 0; i < 10; i++)
	{
		total++;
	}
	return total;
}

Integer count_items(Text input, Integer max)
{
	Integer total = 0;
	for (Integer i = 0; i < max; i++)
	{
		total++;
	}
	return total;
}

// --- 6c: Dead code containing overloaded function names ---
#if 0
	void count_items(Text input, Integer max, Real factor)
	{
		// This dead overload should be stripped entirely
	}
#endif

// Using 'i' here should be fine — it was only local to count_items above
{
	Integer i = 0;    // OK
}
