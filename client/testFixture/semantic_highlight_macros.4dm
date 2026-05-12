#include "semantic_highlight_macros.h"

#define LOCAL_LIMIT 12
#define LOCAL_SCALE(x) ((x) * 2)

#if LOCAL_LIMIT
void semantic_highlight_if_branch()
{
	Integer if_value = INCLUDED_LIMIT;
}
#endif

#if INCLUDED_SWITCH
void semantic_highlight_included_if_branch()
{
	Integer included_if_value = LOCAL_SCALE(INCLUDED_LIMIT);
}
#endif

void semantic_highlight_macro_fixture()
{
	Integer local_value = LOCAL_LIMIT;
	Integer included_value = INCLUDED_LIMIT;
	Integer scaled_value = LOCAL_SCALE(local_value);
	Integer ALL_CAPS_VALUE = 7;
	Text text_value = "LOCAL_LIMIT INCLUDED_LIMIT LOCAL_SCALE INCLUDED_SWITCH";

	// LOCAL_LIMIT INCLUDED_LIMIT LOCAL_SCALE INCLUDED_SWITCH
	/* LOCAL_LIMIT INCLUDED_LIMIT LOCAL_SCALE INCLUDED_SWITCH */
}
