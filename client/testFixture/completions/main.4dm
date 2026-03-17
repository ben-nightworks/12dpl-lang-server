// Main test file for completion scenarios
#include "header1.h"

#define LOCAL_MACRO 5
#define LOCAL_FUNC(a, b) ((a) + (b))

{
	// Global variables
	Integer global_var1;
	Real global_var2;
	Text global_text;
}

// Global function definitions
void my_function() {
	Integer local_in_my_function;
	Real local_real;
	local_in_my_function = 10;
}

void another_function(Integer param1, Real &param2) {
	Integer local_var;
	
	// This position should see:
	// - local_var, param1, param2 (local scope)
	// - global_var1, global_var2, global_text, my_function, another_function (global scope)
	// - global_from_header, another_global, process_data, get_model (from header1.h)
	// - LOCAL_MACRO, LOCAL_FUNC, HEADER_MACRO, HEADER_FUNC (all defines)
	// - Prototype functions from the language
}

void function_with_block_scope() {
	Integer outer_local;
	
	
	if (1) {
		Integer block_local;
		Real block_real;
		// At this position, should see: block_local, block_real, outer_local, ...
	}
	
	for (Integer loop_counter = 0; loop_counter < 10; loop_counter = loop_counter + 1) {
		Integer for_var;
		// At this position, should see: for_var, loop_counter, outer_local, ...
	}
}

// Overloaded functions
void overloaded_func(Integer val);
void overloaded_func(Real val);
void overloaded_func(Integer val1, Integer val2);
