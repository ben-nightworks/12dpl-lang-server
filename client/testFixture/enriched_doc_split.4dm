// ---------------------------------------------------------------------------
// Regression fixture for issue #125 — "Documentation enrichment merges function
// entries when manual ID footer is missing or malformed".
//
// The enrichment process used the manual's "ID = <number>" footer as the entry
// boundary. When that footer was malformed (e.g. "D = 879") or missing, the next
// function's manual block was swallowed into the previous function's description,
// so functions such as Set_focus lost their own documentation.
//
// HOW TO USE THIS FILE:
//   Hover over each library call below. Every function should show its OWN
//   description (the "hover ->" comment states what you should see). None of the
//   host functions (Get_id, Get_name, ...) should leak the following function's
//   text into their hover any more.
//
// This file is also a syntax/validation smoke test: it must produce ZERO
// diagnostics from the language server (every call uses a real overload).
// ---------------------------------------------------------------------------

void main()
{
	Integer result;

	// --- Widget handles -----------------------------------------------------
	Widget w;

	// hover -> Get_id(Widget): "When a Widget is created, it is given a unique
	// identifying number (id) ..." and must NO LONGER contain the Set_focus text.
	result = Get_id(w);

	// hover -> Set_focus: "Set the focus to the typed input area for an Input
	// Widget widget, or on the button for a Button Widget widget. ..."
	// (was previously buried inside Get_id, with no standalone entry).
	result = Set_focus(w);

	// --- Tin handles --------------------------------------------------------
	Tin tin;
	Text tin_name;
	Dynamic_Text model_names;

	// hover -> Get_name(Tin, Text): "Get the name of the Tin tin. ..." and must
	// NO LONGER contain the Tin_models text.
	result = Get_name(tin, tin_name);

	// hover -> Tin_models: "Get the names of all the models that were used to
	// create the Tin tin. ..." (recovered standalone entry).
	result = Tin_models(tin, model_names);

	// --- Pipe / 3d string data (array + indexed overloads) ------------------
	Element elt;
	Real x[100], y[100], z[100];
	Integer num_pts = 100;
	Integer max_pts = 100;
	Integer offset = 1;
	Integer i = 1;
	Real xi, yi, zi;

	// hover -> Get_3d_data(Element, Real[], Real[], Real[], Integer, Integer,
	// Integer): the start_pt chunked overload (recovered standalone entry).
	result = Get_3d_data(elt, x, y, z, max_pts, num_pts, offset);

	// hover -> Get_3d_data(Element, Integer, Real, Real, Real): "Get the (x,y,z)
	// data for the ith point of the string. ..." (recovered standalone entry).
	result = Get_3d_data(elt, i, xi, yi, zi);

	// hover -> Set_3d_data(Element, Integer, Real, Real, Real): "Set the (x,y,z)
	// data for the ith point of the string. ..." (replaced a placeholder).
	result = Set_3d_data(elt, i, xi, yi, zi);

	// hover -> Set_pipe_data(Element, Real[], Real[], Real[], Integer): the
	// first-num_pts overload (recovered — Set_pipe_data had no entries at all).
	result = Set_pipe_data(elt, x, y, z, num_pts);

	// hover -> Set_pipe_data(Element, Real[], Real[], Real[], Integer, Integer):
	// the start_pt chunked overload (recovered standalone entry).
	result = Set_pipe_data(elt, x, y, z, num_pts, offset);

	// hover -> Set_pipe_data(Element, Integer, Real, Real, Real): the ith-point
	// overload (recovered standalone entry).
	result = Set_pipe_data(elt, i, xi, yi, zi);

	// hover -> Get_pipe_data(Element, Integer, Real, Real, Real): "Get the
	// (x,y,z) data for the ith point of the string. ..." (recovered overload).
	result = Get_pipe_data(elt, i, xi, yi, zi);

	// --- Select_Button widgets ----------------------------------------------
	Select_Button btn;
	Real sx, sy, sz, sch, sht;

	// hover -> Get_select_coordinate(Select_Button, Real, Real, Real, Real,
	// Real): "Get the coordinate of the selected snap point. ..." (the #1047
	// overload that was swallowed into Set_select_snap_mode).
	result = Get_select_coordinate(btn, sx, sy, sz, sch, sht);

	// --- Drape (4-argument overload) ----------------------------------------
	Dynamic_Element source_strings;
	Dynamic_Element draped_strings;
	Integer create_supers = 1;

	// hover -> Drape(Tin, Dynamic_Element, Dynamic_Element, Integer): "... The
	// resulting elements in draped_elts will be super string only if
	// create_supers is non zero. ..." (recovered #3790 overload).
	result = Drape(tin, source_strings, draped_strings, create_supers);

	// --- Split_string -------------------------------------------------------
	Element source_string, string1, string2;
	Real chainage = 100.0;

	// hover -> Split_string(Element, Real, Element, Element): "Split a string
	// about a chainage ..." (recovered — was swallowed into Polygons_clip).
	result = Split_string(source_string, chainage, string1, string2);

	return;
}
