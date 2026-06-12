// ============================================================================
// syntax_patterns.4dm - Comprehensive Real-World Pattern Tests
// ============================================================================
// Patterns sourced from macros/ and macros_mattmonk/ folders.
// Every section should produce ZERO diagnostics unless annotated otherwise.
// ============================================================================

#include "test_globals.h"


// ############################################################################
//  SECTION 1: DIGIT-PREFIXED IDENTIFIERS
// ############################################################################
// 12dPL allows identifiers starting with digits (e.g. 2d_string).
// The grammar was extended to support this pattern.
// ############################################################################

void test_digit_prefixed_identifiers()
{
	Element 2d_string1;
	Element 2d_string2;
	Element 3d_string;
	Element 4d_data;
	Text 12dpl_version = "15.00";
	Integer 1st_index = 1;
	Integer 2nd_index = 2;
	Real 3d_length = 0.0;
}


// ############################################################################
//  SECTION 2: VARIABLE-LENGTH ARRAY DECLARATIONS
// ############################################################################
// Arrays whose size is determined by a variable or expression.
// ############################################################################

void test_variable_length_arrays()
{
	Integer count = 10;
	Text    list[count];
	Integer values[count];
	Real    coords[count * 3];

	for (Integer i = 0; i < count; i++)
	{
		list[i] = "item";
		values[i] = i;
	}
}


// ############################################################################
//  SECTION 3: ARRAY PARAMETERS IN FUNCTION SIGNATURES
// ############################################################################
// Functions accepting arrays — plain, by-ref, and by-ref array.
// ############################################################################

// --- 3a: Prototypes with array params ---
Integer Sort_array(Integer count, Integer index[], Integer data[]);
Integer Sort_array(Integer count, Integer index[], Real data[]);
Integer Sort_array(Integer count, Integer index[], Text data[]);

// --- 3b: Pass-by-reference array params ---
Integer Fill_array(Integer count, Text &items[]);

// --- 3c: Implementations ---
Integer Sort_array(Integer count, Integer index[], Integer data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Real data[])
{
	return 0;
}

Integer Sort_array(Integer count, Integer index[], Text data[])
{
	return 0;
}

Integer Fill_array(Integer count, Text &items[])
{
	return count;
}


// ############################################################################
//  SECTION 4: COMMA-SEPARATED DECLARATIONS
// ############################################################################
// Multiple variables declared on a single line.
// ############################################################################

void test_comma_declarations()
{
	Real x, y, z;
	Integer r, g, b;
	Text first_name, last_name;
	Real x1, y1, z1, x2, y2, z2;
	Integer c1, c2;
	Integer start, end;
}


// ############################################################################
//  SECTION 5: COMPLEX PREPROCESSOR DIRECTIVES
// ############################################################################

// --- 5a: #define with hex constants ---
#define VIEW_COLOUR 0x7fffffff
#define TRIMESH_PROPERTY_VOLUME 0x01
#define TRIMESH_PROPERTY_AREA   0x02
#define TRIMESH_PROPERTY_ALL    0xFF
#define CREATE_NO_WINDOW 0x08000000

// --- 5b: #define with negative values ---
#define NO_COLOUR -1
#define MIN_INT_VAL -2147483648
#define MAX_INT_VAL 2147483647

// --- 5c: #define with string values ---
#define PROGRAM_NAME "Test6 Macro"
#define PROGRAM_VERSION "1.0"
#define INDENT_STR "    "
#define DATE_FORMAT "%Y/%m/%d %H:%M:%S"

// --- 5d: #define with expressions ---
#define PRINT_MODE_OUTPUT 0x0001
#define PRINT_MODE_LOG    0x0002
#define PRINT_MODE_ALL    PRINT_MODE_OUTPUT | PRINT_MODE_LOG
#define PRINT_MODE_CLEAR  0xfffe

// --- 5e: Multi-line #define macros with \ continuation ---
#define PRINTD(x)           \
do                      \
{                       \
	Print((x) + "\n");  \
} while (0)

#define BITSET_(f, i)     \
do                    \
{                     \
	f = f | i;        \
} while (0)

#define BITCHK_(f, i)     \
((f) & (i))

// --- 5f: #ifndef / #endif guards (inline, not include-guard) ---
#ifndef LOG_LINE_NONE_T6
#define LOG_LINE_NONE_T6    0
#define LOG_LINE_WARNING_T6 2
#define LOG_LINE_ERROR_T6   3
#endif

// --- 5g: #if VERSION_4D guards ---
#if VERSION_4D >= 1000
#define HAS_LOG_LINES 1
#else
#define HAS_LOG_LINES 0
#endif

// --- 5h: #if defined() ---
#if defined(CODEPAGE_4D)
#define USE_CODEPAGE 1
#endif

// --- 5i: #if DEBUG conditional ---
#define DEBUG_T6 0
#if DEBUG_T6 == 1
#define T6_TRACE(x) Print(x)
#else
#define T6_TRACE(x)
#endif

// --- 5j: Doxygen-style trailing doc comments on #define ---
#define CASE_MODE_UPPER 1  /*!< Convert text to UPPER CASE */
#define CASE_MODE_LOWER 2  /*!< Convert text to lower case */
#define CASE_MODE_TITLE 3  /*!< Convert text to Title Case */

// --- 5k: #if 0 block with code that would fail to parse ---
#if 0
This is dead code.
switch(invalid_syntax) {
	clearly not parseable @@@ %%%
}
Integer ghost_variable = 42;
#endif


// ############################################################################
//  SECTION 6: SWITCH / CASE PATTERNS
// ############################################################################
// 12dPL supports string-valued case labels — unique to this language.
// ############################################################################

// --- 6a: Switch with string case labels ---
Integer classify_string_type(Text type)
{
	Integer result = 0;
	switch(type) {
	case "2d" : {
			result = 1;
		} break;
	case "3d" : {
			result = 2;
		} break;
	case "4d" : {
			result = 3;
		} break;
	case "Polyline" :
	case "Super"    : {
			result = 4;
		} break;
	case "Alignment" :
	case "Pipeline"  : {
			result = 5;
		} break;
		default : {
			result = -1;
		} break;
	}
	return result;
}

// --- 6b: Switch with function call in case expression ---
void test_switch_with_get_id()
{
	Panel panel = Create_panel("Test", 1);
	Button finish = Create_button("Finish", "finish_callback");
	Integer doit = 1;

	while (doit)
	{
		Integer id;
		Text cmd;
		Text msg;
		Integer ret = Wait_on_widgets(id, cmd, msg);

		if (cmd == "keystroke") continue;

		switch(id) {
		case Get_id(panel) : {
				if (cmd == "Panel Quit") doit = 0;
			} break;
		case Get_id(finish) : {
				if (cmd == "finish") doit = 0;
			} break;
		}
	}
}

// --- 6c: Switch with integer and parenthesized constants ---
Integer decode_mode(Integer mode)
{
	Integer result = 0;
	switch (mode) {
	case (0): {
			result = 10;
		} break;
	case (1): {
			result = 20;
		} break;
	case (2): {
			result = 30;
		} break;
	default: {
			result = -1;
		} break;
	}
	return result;
}


// ############################################################################
//  SECTION 7: BITWISE OPERATIONS & COMPOUND ASSIGNMENT
// ############################################################################

Integer create_rgb_colour(Integer r, Integer g, Integer b)
{
	return (1 << 31) | (r << 16) | (g << 8) | b;
}

Integer extract_red(Integer colour)
{
	return (colour & 16711680) >> 16;
}

Integer extract_green(Integer colour)
{
	return (colour & 65280) >> 8;
}

Integer extract_blue(Integer colour)
{
	return colour & 255;
}

Integer is_direct_colour(Integer colour)
{
	return (colour & (1 << 31)) ? 1 : 0;
}

Integer get_highest_bit_pos(Integer n)
{
	Integer r = 0;
	while (n)
	{
		n = n >> 1;
		r++;
	}
	return r;
}

void test_compound_assignment()
{
	Integer flags = 0;
	flags |= 0x01;
	flags |= 0x02;
	flags &= 0xFF;
	flags ^= 0x03;

	Integer val = 256;
	val >>= 4;
	val <<= 2;

	Integer count = 0;
	count += 10;
	count -= 3;
	count *= 2;
}


// ############################################################################
//  SECTION 8: TERNARY EXPRESSIONS
// ############################################################################

Integer test_ternary(Integer a, Integer b)
{
	Integer max = (a > b) ? a : b;
	Integer min = (a < b) ? a : b;
	Integer sign = (a >= 0) ? 1 : -1;
	return max;
}


// ############################################################################
//  SECTION 9: SCIENTIFIC NOTATION & NUMERIC LITERALS
// ############################################################################

void test_numeric_literals()
{
	Real tolerance = 1.0e-6;
	Real large = 1.5e10;
	Real small = 3.14e-3;
	Real normal = 3.14159;
	Integer hex_val = 0x7fffffff;
	Integer zero = 0;
	Integer negative = -42;
	Real neg_real = -0.001;
}


// ############################################################################
//  SECTION 10: STRING / TEXT OPERATIONS
// ############################################################################

void test_string_operations()
{
	// String concatenation
	Text name = "Hello" + " " + "World";
	Integer count = 42;
	Text message = "Count is: " + To_text(count);
	Text detailed = "Item " + To_text(count) + " of " + To_text(100);

	// Empty string
	Text empty = "";
	if (empty == "")
	{
		empty = "not empty anymore";
	}

	// Escape sequences
	Text with_newline = "Line 1\nLine 2";
	Text with_tab = "Col1\tCol2";

	// Text manipulation
	Integer len = Text_length(name);
	Text sub = Get_subtext(name, 1, 5);
	Integer pos = Find_text(name, "World");
}


// ############################################################################
//  SECTION 11: ALL UNCOMMON BUILT-IN TYPES
// ############################################################################
// These types appear in the grammar and real-world files.
// Functions with these return types must be correctly identified as functions.
// ############################################################################

// --- Widget / Panel types ---
Panel create_test_panel()
{
	Panel p = Create_panel("Test", 1);
	return p;
}

Vertical_Group create_vgroup()
{
	Vertical_Group vg = Create_vertical_group(2);
	return vg;
}

Button create_test_button(Text label)
{
	Button b = Create_button(label, "button_callback");
	return b;
}

// --- Data types ---
Log_Line create_test_log(Text msg, Integer level)
{
	Log_Line ll;
	return ll;
}

Uid get_test_uid(Element &elt)
{
	Uid id;
	return id;
}

Colour get_test_colour()
{
	Colour c;
	return c;
}

Integer64 get_big_number()
{
	Integer64 n = 0;
	return n;
}

Curve build_test_curve()
{
	Curve c;
	return c;
}

// --- Vector / Matrix types ---
Vector2 make_vector2()
{
	Vector2 v;
	return v;
}

Vector3 make_vector3()
{
	Vector3 v;
	return v;
}

Vector4 make_vector4()
{
	Vector4 v;
	return v;
}

Matrix3 make_matrix3()
{
	Matrix3 m;
	return m;
}

Matrix4 make_matrix4()
{
	Matrix4 m;
	return m;
}

// --- Container types ---
void test_dynamic_types()
{
	Dynamic_Element de;
	Dynamic_Text dt;
	Dynamic_Integer di;
	Dynamic_Real dr;
	Dynamic_Integer64 di64;
}

// --- I/O types ---
File open_test_file(Text path)
{
	File f;
	File_open(path, "r", f);
	return f;
}

// --- Database types ---
void test_database_types()
{
	XML_Document xdoc;
	XML_Node xnode;
	Connection conn;
}

// --- Specialised element types ---
void test_geometric_types()
{
	Tin tin;
	Point pt;
	Line ln;
	Arc arc;
	Segment seg;
	Spiral spi;
	Parabola par;
}


// ############################################################################
//  SECTION 12: GLOBAL BLOCKS (top-level code)
// ############################################################################
// Top-level code in braces is valid and defines global variables.
// ############################################################################

// --- 12a: Standard global block ---
{
	Text T6_PROGRAM_NAME = "Test6 Comprehensive";
	Text T6_PROGRAM_AUTHOR = "Test Suite";
	Text T6_PROGRAM_VERSION = "1.0";
	Integer T6_Shutdown_code = 424242;
}

// --- 12b: Multiple global blocks ---
{
	Integer T6_global_flag = 0;
	Real T6_global_tolerance = 0.001;
}


// ############################################################################
//  SECTION 13: FUNCTION SIGNATURE EDGE CASES
// ############################################################################

// --- 13a: Comment block between signature and brace (macros/ style) ---
Integer compute_length(Element string, Text &result)
// -----------------------------------------------------------------------
// Returns the 3d length of a string element.
// -----------------------------------------------------------------------
{
	result = "0.0";
	return 0;
}

// --- 13b: Doxygen comment between signature and brace ---
void process_data(Dynamic_Element &data, Integer mode)
/*! @brief Processes a set of elements.
*  @param data     Source data elements
*  @param mode     Processing mode flags
*/
{
	Integer count = 0;
}

// --- 13c: Multi-style comment between signature and brace ---
Integer analyse_model(Model model)
/*------------------------------------------------------------------
**   Input:   model - the model to analyse
**   Output:  number of elements found
**   Purpose: Analyses elements in a model
**------------------------------------------------------------------
*/
{
	return 0;
}

// --- 13d: Indented brace (tab) ---
Integer tabbed_function(Text name)
{
	return Text_length(name);
}

// --- 13e: Indented brace (spaces) ---
Integer spaced_function(Text name)
{
	return Text_length(name);
}


// ############################################################################
//  SECTION 14: CONTROL FLOW PATTERNS FROM REAL MACROS
// ############################################################################

// --- 14a: Panel event loop pattern (ubiquitous in macros/) ---
Integer manage_test_panel()
{
	Panel panel = Create_panel("Test Panel", 1);
	Button finish = Create_button("Done", "done_callback");
	Button apply = Create_button("Apply", "apply_callback");
	Colour_Message_Box status = Create_colour_message_box("Ready");
	Integer doit = 1;

	while (doit)
	{
		Integer id;
		Text cmd;
		Text msg;
		Integer ret = Wait_on_widgets(id, cmd, msg);

		if (cmd == "keystroke") continue;

		switch(id) {
		case Get_id(panel) : {
				if (cmd == "Panel Quit")
				doit = 0;
			} break;
		case Get_id(finish) : {
				if (cmd == "finish")
				doit = 0;
			} break;
		case Get_id(apply) : {
				// Process
				Integer rv = 0;
			} break;
		}
	}
	return 0;
}

// --- 14b: If without braces (single statement) ---
Integer test_single_line_if(Integer x)
{
	if (x < 0)
	return -1;
	if (x == 0)
	return 0;
	return 1;
}

// --- 14c: Nested for loops ---
void test_nested_loops()
{
	Integer total = 0;
	for (Integer i = 1; i <= 10; i++)
	{
		for (Integer j = 1; j <= 10; j++)
		{
			total = total + i * j;
		}
	}
}

// --- 14d: Do-while loop ---
void test_do_while()
{
	Integer attempts = 0;
	Integer success = 0;
	do
	{
		attempts++;
		if (attempts > 3)
		success = 1;
	} while (!success);
}

// --- 14e: While loop with bit manipulation ---
Integer count_bits(Integer value)
{
	Integer count = 0;
	while (value)
	{
		value = value >> 1;
		count++;
	}
	return count;
}


// ############################################################################
//  SECTION 15: EXPRESSION PATTERNS FROM REAL MACROS
// ############################################################################

// --- 15a: Chain assignment ---
void test_chain_assignment()
{
	Integer a, b, c;
	a = b = c = 0;

	Integer num_success, num_error, num_warning;
	num_success = num_error = num_warning = 0;
}

// --- 15b: Logical operators ---
Integer test_logical_ops(Text type)
{
	if (type == "2d" || type == "3d" || type == "4d" || type == "Polyline" || type == "Super")
	return 1;
	if (type == "Alignment" || type == "Pipeline")
	return 2;
	return 0;
}

// --- 15c: Negation on function calls ---
void test_negation()
{
	Model model;
	Element elt;
	if (!Model_exists(model))
	return;
	if (!Element_exists(elt))
	return;
}

// --- 15d: Math expressions ---
Real compute_distance(Real x1, Real y1, Real x2, Real y2)
{
	Real dx = x2 - x1;
	Real dy = y2 - y1;
	return Sqrt(dx * dx + dy * dy);
}

// --- 15e: Return with complex expression ---
Integer pack_rgb(Integer r, Integer g, Integer b)
{
	return ((1 << 31) | (r << 16) | (g << 8) | b);
}

// --- 15f: Increment / decrement ---
void test_increment_decrement()
{
	Integer count = 0;
	count++;
	count++;
	count--;
}


// ############################################################################
//  SECTION 16: FUNCTION OVERLOADING (real-world patterns)
// ############################################################################
// These patterns come directly from Matt_standard_library.H and other files.

// --- 16a: Overloaded with different parameter count ---
Integer xeqy(Real x, Real y);
Integer xeqy(Real x, Real y, Real tolerance);

Integer xeqy(Real x, Real y)
{
	Real mindif = 1.0e-6;
	if (Absolute(x - y) < mindif)
	return 1;
	return 0;
}

Integer xeqy(Real x, Real y, Real tolerance)
{
	if (Absolute(x - y) < tolerance)
	return 1;
	return 0;
}

// --- 16b: Overloaded with different parameter types ---
Integer Model_shared(Model model);
Integer Model_shared(Text model_name);
Integer Model_shared(Model model, Integer flag);

Integer Model_shared(Model model)
{
	return 0;
}

Integer Model_shared(Text model_name)
{
	return 0;
}

Integer Model_shared(Model model, Integer flag)
{
	return 0;
}

// --- 16c: Overloaded with same return type but different ref/array combos ---
Text Format_number(Real value);
Text Format_number(Real value, Integer decimals);

Text Format_number(Real value)
{
	return To_text(value, 3);
}

Text Format_number(Real value, Integer decimals)
{
	return To_text(value, decimals);
}


// ############################################################################
//  SECTION 17: #if VERSION_4D CONDITIONAL (live code after #else)
// ############################################################################

void test_version_conditional()
{
	Text msg = "Hello";
	Integer level = 0;
	Integer is_error = 0;
#if VERSION_4D >= 1000
	Log_Line log_line;
	Print(msg);
#else
	Print(msg + "\n");
#endif
}


// ############################################################################
//  SECTION 18: MULTIPLE STATEMENTS ON ONE LINE
// ############################################################################
// Unusual but valid in real-world macros.
// ############################################################################

void test_multi_statement_line()
{
	Integer a = 1; Integer b = 2; Integer c = 3;
	a = a + 1; b = b + 2;
}


// ############################################################################
//  SECTION 19: FILE I/O AND SYSTEM CALLS
// ############################################################################

void test_file_io()
{
	File file;
	File_open("output.txt", "w", file);
	File_write_line(file, "Header line");
	File_write_line(file, "Data line: " + To_text(42));
	File_close(file);
}


// ############################################################################
//  SECTION 20: RETURN STATEMENT VARIATIONS
// ############################################################################
// 12dPL supports return with/without parens, with/without value.
// ############################################################################

void return_void()
{
	return;
}

Integer return_bare_value()
{
	return 0;
}

Integer return_parens_value()
{
	return(1);
}

Integer return_parens_space_value()
{
	return (0);
}

Integer return_negative()
{
	return(-1);
}

Integer return_complex_expression()
{
	Integer r = 255;
	Integer g = 128;
	Integer b = 64;
	return((1 << 31) | (r << 16) | (g << 8) | b);
}

Text return_text()
{
	return "result";
}

Text return_concatenated()
{
	return "value: " + To_text(42);
}

void main()
{
}
