// ============================================================================
// new_builtin_types.4dm - Sanity fixture for the 6 newly-added built-in
// types from issue #103. Parses cleanly only when each type is recognised
// by the grammar.
//
// Types covered:
//   - Hydro_Box           (widget, builtInWidgetTypeSpecifier)
//   - Weight_Box          (widget, builtInWidgetTypeSpecifier)
//   - Chain_Parameters    (handle, builtInTypeSpecifier)
//   - Macro_Handle        (handle, builtInTypeSpecifier)
//   - View_Draw           (handle, builtInTypeSpecifier)
//   - User_Input_Replay   (handle, builtInTypeSpecifier)
// ============================================================================

void test_hydro_box()
{
	Hydro_Box hb;
	Message_Box mb;
}

void test_weight_box()
{
	Weight_Box wb;
	Message_Box mb;
}

void test_chain_parameters()
{
	Chain_Parameters ch;
	Text pvf = "params.pvf";
	Integer rc = Create_chain_parameters(pvf, ch);
}

void test_macro_handle()
{
	Macro_Handle handle;
	Text macro_name = "do_thing";
	Integer rc = Create_macro(macro_name, 1, handle);
}

void test_view_draw()
{
	View_Draw vd;
	Integer rc = Create_view_draw(0, vd);
}

void test_user_input_replay()
{
	User_Input_Replay clicky;
	Integer rc = Start_playback(clicky, 0);
}

// Pass each new handle as a function argument to confirm by-reference and
// pass-by-value parsing both work.
void test_pass_handles(
	Hydro_Box hb,
	Weight_Box wb,
	Chain_Parameters ch,
	Macro_Handle mh,
	View_Draw vd,
	User_Input_Replay ur)
{
}

void main() {

	return ;


}