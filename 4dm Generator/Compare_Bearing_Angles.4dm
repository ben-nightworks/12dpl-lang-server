//---------------------------------------------------------------------
// Programmer           Kamal Jarada
// Email                kamaljarada@gmail.com
// Date                 2026
// Macro Name           Compare_Bearing_Angles
// Version              BETA
// Type                 SOURCE
//
// Brief description
// Compare bearing and vertical angles between a design string and an as-built string.
//---------------------------------------------------------------------
// Description
// This macro compares the bearing angles (horizontal) and vertical angles
// (inclination/slope) between a design string and an as-built string.
// It calculates the angles from the first point to the last point of
// each string and reports the differences.
//---------------------------------------------------------------------
// DISCLAIMER
// This software is provided "as is" without warranty of any kind.
// Use at your own risk. The developer is not responsible for any
// errors, damages, or losses resulting from the use of this macro.
//---------------------------------------------------------------------

// Define constants normally from set_ups.H
#define SELECT_STRING 5509
#define OK 1
#define TRUE 1
#define FILE_MODE_WRITE 1
#define CHECK_MODEL_EXISTS 3
#define GET_MODEL_ERROR 13
#define MODEL_EXISTS 2

//---------------------------------------------------------------------
// Write single string result to an already open file
//---------------------------------------------------------------------
void write_string_result(File &report_file, Text design_name, Text asbuilt_name,
Real design_start_x, Real design_start_y, Real design_start_z,
Real design_end_x, Real design_end_y, Real design_end_z,
Real asbuilt_start_x, Real asbuilt_start_y, Real asbuilt_start_z,
Real asbuilt_end_x, Real asbuilt_end_y, Real asbuilt_end_z,
Real design_bearing_deg, Real asbuilt_bearing_deg,
Real design_vert_angle_deg, Real asbuilt_vert_angle_deg,
Real corrected_abs_diff, Real vert_angle_abs_diff,
Real corrected_diff, Real vert_angle_diff,
Integer direction_reversed, Real corrected_asbuilt_bearing,
Real corrected_asbuilt_vert_angle, Real abs_diff)
{
	Text rev_text = "No";
	if (direction_reversed == 1) rev_text = "Yes";

	File_write_line(report_file, design_name + "," +
	To_text(design_bearing_deg, 4) + "," +
	To_text(design_vert_angle_deg, 4) + "," +
	To_text(asbuilt_bearing_deg, 4) + "," +
	To_text(asbuilt_vert_angle_deg, 4) + "," +
	To_text(corrected_abs_diff, 4) + "," +
	To_text(vert_angle_abs_diff, 4) + "," +
	rev_text);
}

//---------------------------------------------------------------------
// Calculate comparison values for a single string pair (no output)
//---------------------------------------------------------------------
Integer calc_string_comparison(Element design_string, Element asbuilt_string,
Real &design_start_x, Real &design_start_y, Real &design_start_z,
Real &design_end_x, Real &design_end_y, Real &design_end_z,
Real &asbuilt_start_x, Real &asbuilt_start_y, Real &asbuilt_start_z,
Real &asbuilt_end_x, Real &asbuilt_end_y, Real &asbuilt_end_z,
Real &design_bearing_deg, Real &asbuilt_bearing_deg,
Real &design_vert_angle_deg, Real &asbuilt_vert_angle_deg,
Real &corrected_abs_diff, Real &vert_angle_abs_diff,
Real &corrected_diff, Real &vert_angle_diff,
Integer &direction_reversed, Real &corrected_asbuilt_bearing,
Real &corrected_asbuilt_vert_angle, Real &abs_diff)
{
	Integer ret;
	Integer design_num_pts;
	Integer asbuilt_num_pts;

	ret = Get_points(design_string, design_num_pts);
	if (ret != 0 || design_num_pts < 2) return 1;

	ret = Get_points(asbuilt_string, asbuilt_num_pts);
	if (ret != 0 || asbuilt_num_pts < 2) return 1;

	ret = Get_super_vertex_coord(design_string, 1, design_start_x, design_start_y, design_start_z);
	if (ret != 0) return 1;

	ret = Get_super_vertex_coord(design_string, design_num_pts, design_end_x, design_end_y, design_end_z);
	if (ret != 0) return 1;

	ret = Get_super_vertex_coord(asbuilt_string, 1, asbuilt_start_x, asbuilt_start_y, asbuilt_start_z);
	if (ret != 0) return 1;

	ret = Get_super_vertex_coord(asbuilt_string, asbuilt_num_pts, asbuilt_end_x, asbuilt_end_y, asbuilt_end_z);
	if (ret != 0) return 1;

	// Calculate bearing angles
	Real design_dx = design_end_x - design_start_x;
	Real design_dy = design_end_y - design_start_y;
	Real design_dz = design_end_z - design_start_z;
	Real design_angle_rad = Atan2(design_dx, design_dy);

	Real asbuilt_dx = asbuilt_end_x - asbuilt_start_x;
	Real asbuilt_dy = asbuilt_end_y - asbuilt_start_y;
	Real asbuilt_dz = asbuilt_end_z - asbuilt_start_z;
	Real asbuilt_angle_rad = Atan2(asbuilt_dx, asbuilt_dy);

	// Calculate horizontal distances for vertical angle
	Real design_horiz_dist = Sqrt(design_dx * design_dx + design_dy * design_dy);
	Real asbuilt_horiz_dist = Sqrt(asbuilt_dx * asbuilt_dx + asbuilt_dy * asbuilt_dy);

	// Calculate vertical angles
	Real design_vert_angle_rad = Atan2(design_dz, design_horiz_dist);
	Real asbuilt_vert_angle_rad = Atan2(asbuilt_dz, asbuilt_horiz_dist);

	// Convert to degrees
	Radians_to_degrees(design_angle_rad, design_bearing_deg);
	Radians_to_degrees(asbuilt_angle_rad, asbuilt_bearing_deg);
	Radians_to_degrees(design_vert_angle_rad, design_vert_angle_deg);
	Radians_to_degrees(asbuilt_vert_angle_rad, asbuilt_vert_angle_deg);

	// Normalize bearings to 0-360
	while (design_bearing_deg < 0.0) design_bearing_deg = design_bearing_deg + 360.0;
	while (design_bearing_deg >= 360.0) design_bearing_deg = design_bearing_deg - 360.0;
	while (asbuilt_bearing_deg < 0.0) asbuilt_bearing_deg = asbuilt_bearing_deg + 360.0;
	while (asbuilt_bearing_deg >= 360.0) asbuilt_bearing_deg = asbuilt_bearing_deg - 360.0;

	// Calculate bearing difference
	Real bearing_diff = asbuilt_bearing_deg - design_bearing_deg;
	while (bearing_diff > 180.0) bearing_diff = bearing_diff - 360.0;
	while (bearing_diff < -180.0) bearing_diff = bearing_diff + 360.0;

	abs_diff = Absolute(bearing_diff);
	direction_reversed = 0;
	corrected_asbuilt_bearing = asbuilt_bearing_deg;
	corrected_diff = bearing_diff;
	corrected_abs_diff = abs_diff;

	if (abs_diff > 90.0) {
		direction_reversed = 1;
		corrected_asbuilt_bearing = asbuilt_bearing_deg + 180.0;
		while (corrected_asbuilt_bearing >= 360.0) corrected_asbuilt_bearing = corrected_asbuilt_bearing - 360.0;
		corrected_diff = corrected_asbuilt_bearing - design_bearing_deg;
		while (corrected_diff > 180.0) corrected_diff = corrected_diff - 360.0;
		while (corrected_diff < -180.0) corrected_diff = corrected_diff + 360.0;
		corrected_abs_diff = Absolute(corrected_diff);
	}

	// Vertical angle difference
	corrected_asbuilt_vert_angle = asbuilt_vert_angle_deg;
	if (direction_reversed == 1) corrected_asbuilt_vert_angle = -asbuilt_vert_angle_deg;
	vert_angle_diff = corrected_asbuilt_vert_angle - design_vert_angle_deg;
	vert_angle_abs_diff = Absolute(vert_angle_diff);

	return 0;
}

//---------------------------------------------------------------------
// Compare all strings by name between two models
//---------------------------------------------------------------------
Integer do_model_compare(Model design_model, Model asbuilt_model, Message_Box &message, Text report_file_name)
{
	Show_console(1);
	Print();
	Print("============================================================");
	Print("  MODEL TO MODEL COMPARISON");
	Print("============================================================");

	Dynamic_Element design_elts;
	Dynamic_Element asbuilt_elts;
	Integer design_count;
	Integer asbuilt_count;

	Get_elements(design_model, design_elts, design_count);
	Get_elements(asbuilt_model, asbuilt_elts, asbuilt_count);

	Print("Design model has " + To_text(design_count) + " elements.");
	Print("As-built model has " + To_text(asbuilt_count) + " elements.");
	Print();

	// Open report file
	File report_file;
	Integer file_opened = 0;
	if (report_file_name != "") {
		Integer fret = File_open(report_file_name, "w", report_file);
		if (fret == 0) {
			file_opened = 1;
			// Write CSV header
			File_write_line(report_file, "String Name,Design Bearing,Design Vertical,AsBuilt Bearing,AsBuilt Vertical,Bearing Diff,Vertical Diff,Direction Reversed");
		}
	}

	Integer matched = 0;
	Integer not_found_in_asbuilt = 0;
	Integer not_found_in_design = 0;
	Integer errors = 0;

	// Loop through design elements and find matching as-built by name
	Integer i;
	for (i = 1; i <= design_count; i = i + 1) {
		Element design_elt;
		Get_item(design_elts, i, design_elt);

		Text design_name;
		Get_name(design_elt, design_name);

		// Search for matching name in as-built model
		Integer j;
		Integer found = 0;
		for (j = 1; j <= asbuilt_count; j = j + 1) {
			Element asbuilt_elt;
			Get_item(asbuilt_elts, j, asbuilt_elt);

			Text asbuilt_name;
			Get_name(asbuilt_elt, asbuilt_name);

			if (design_name == asbuilt_name) {
				found = 1;

				// Calculate comparison
				Real ds_x, ds_y, ds_z, de_x, de_y, de_z;
				Real as_x, as_y, as_z, ae_x, ae_y, ae_z;
				Real d_bear, a_bear, d_vert, a_vert;
				Real corr_abs, vert_abs, corr_diff, vert_diff;
				Integer dir_rev;
				Real corr_bear, corr_vert, abs_d;

				Integer calc_ret = calc_string_comparison(design_elt, asbuilt_elt,
				ds_x, ds_y, ds_z, de_x, de_y, de_z,
				as_x, as_y, as_z, ae_x, ae_y, ae_z,
				d_bear, a_bear, d_vert, a_vert,
				corr_abs, vert_abs, corr_diff, vert_diff,
				dir_rev, corr_bear, corr_vert, abs_d);

				if (calc_ret == 0) {
					matched = matched + 1;
					Print("Match: " + design_name + " - Bearing diff: " + To_text(corr_abs, 2) + " deg, Vertical diff: " + To_text(vert_abs, 2) + " deg");

					if (file_opened == 1) {
						write_string_result(report_file, design_name, asbuilt_name,
						ds_x, ds_y, ds_z, de_x, de_y, de_z,
						as_x, as_y, as_z, ae_x, ae_y, ae_z,
						d_bear, a_bear, d_vert, a_vert,
						corr_abs, vert_abs, corr_diff, vert_diff,
						dir_rev, corr_bear, corr_vert, abs_d);
					}
				} else {
					errors = errors + 1;
					Print("Error comparing: " + design_name);
				}
				break;
			}
		}

		if (found == 0) {
			not_found_in_asbuilt = not_found_in_asbuilt + 1;
			Print("Not in as-built: " + design_name);
		}
	}

	// Now check for as-built strings not in design model
	for (i = 1; i <= asbuilt_count; i = i + 1) {
		Element asbuilt_elt;
		Get_item(asbuilt_elts, i, asbuilt_elt);

		Text asbuilt_name;
		Get_name(asbuilt_elt, asbuilt_name);

		// Search for matching name in design model
		Integer j;
		Integer found = 0;
		for (j = 1; j <= design_count; j = j + 1) {
			Element design_elt;
			Get_item(design_elts, j, design_elt);

			Text design_name;
			Get_name(design_elt, design_name);

			if (asbuilt_name == design_name) {
				found = 1;
				break;
			}
		}

		if (found == 0) {
			not_found_in_design = not_found_in_design + 1;
			Print("Not in design: " + asbuilt_name);
		}
	}

	Print();
	Print("============================================================");
	Print("Summary: " + To_text(matched) + " matched");
	Print("         " + To_text(not_found_in_asbuilt) + " design strings not in as-built");
	Print("         " + To_text(not_found_in_design) + " as-built strings not in design");
	Print("         " + To_text(errors) + " errors");
	Print("============================================================");

	if (file_opened == 1) {
		File_write_line(report_file, "");
		File_write_line(report_file, "SUMMARY,Matched," + To_text(matched) + ",Design Not In AsBuilt," + To_text(not_found_in_asbuilt) + ",AsBuilt Not In Design," + To_text(not_found_in_design) + ",Errors," + To_text(errors));
		File_close(report_file);
		Print();
		Print("Report saved to: " + report_file_name);
	}

	Set_data(message, "Compared " + To_text(matched) + " strings");
	return 0;
}

//---------------------------------------------------------------------
// Write report to file
//---------------------------------------------------------------------
Integer write_report_file(Text file_name, Text design_name, Text asbuilt_name,
Real design_start_x, Real design_start_y, Real design_start_z,
Real design_end_x, Real design_end_y, Real design_end_z,
Real asbuilt_start_x, Real asbuilt_start_y, Real asbuilt_start_z,
Real asbuilt_end_x, Real asbuilt_end_y, Real asbuilt_end_z,
Real design_bearing_deg, Real asbuilt_bearing_deg,
Real design_vert_angle_deg, Real asbuilt_vert_angle_deg,
Real corrected_abs_diff, Real vert_angle_abs_diff,
Real corrected_diff, Real vert_angle_diff,
Integer direction_reversed, Real corrected_asbuilt_bearing,
Real corrected_asbuilt_vert_angle, Real abs_diff)
{
	File report_file;
	Integer ret = File_open(file_name, "w", report_file);
	if (ret != 0) {
		return 1;
	}

	Text rev_text = "No";
	if (direction_reversed == 1) rev_text = "Yes";

	// Write CSV header
	File_write_line(report_file, "String Name,Design Bearing,Design Vertical,AsBuilt Bearing,AsBuilt Vertical,Bearing Diff,Vertical Diff,Direction Reversed");

	// Write data row
	File_write_line(report_file, design_name + "," +
	To_text(design_bearing_deg, 4) + "," +
	To_text(design_vert_angle_deg, 4) + "," +
	To_text(asbuilt_bearing_deg, 4) + "," +
	To_text(asbuilt_vert_angle_deg, 4) + "," +
	To_text(corrected_abs_diff, 4) + "," +
	To_text(vert_angle_abs_diff, 4) + "," +
	rev_text);

	File_close(report_file);
	return 0;
}

//---------------------------------------------------------------------
// Calculate bearing and display results
//---------------------------------------------------------------------
Integer do_compare(Element design_string, Element asbuilt_string, Message_Box &message, Text report_file_name)
{
	Integer ret;
	Text design_name;
	Text asbuilt_name;

	// Show the console for output
	Show_console(1);

	// Get the string names
	Get_name(design_string, design_name);
	Get_name(asbuilt_string, asbuilt_name);

	Print();
	Print("Design string selected: " + design_name);
	Print("As-built string selected: " + asbuilt_name);

	// Get number of points in each string
	Integer design_num_pts;
	Integer asbuilt_num_pts;

	ret = Get_points(design_string, design_num_pts);
	if (ret != 0 || design_num_pts < 2) {
		Set_data(message, "Error: Design string must have at least 2 points.");
		return 1;
	}

	ret = Get_points(asbuilt_string, asbuilt_num_pts);
	if (ret != 0 || asbuilt_num_pts < 2) {
		Set_data(message, "Error: As-built string must have at least 2 points.");
		return 1;
	}

	Print("Design string has " + To_text(design_num_pts) + " points.");
	Print("As-built string has " + To_text(asbuilt_num_pts) + " points.");

	// Get coordinates from design string (first and last points)
	Real design_start_x;
	Real design_start_y;
	Real design_start_z;
	Real design_end_x;
	Real design_end_y;
	Real design_end_z;

	ret = Get_super_vertex_coord(design_string, 1, design_start_x, design_start_y, design_start_z);
	if (ret != 0) {
		Set_data(message, "Error: Could not get design string start point.");
		return 1;
	}

	ret = Get_super_vertex_coord(design_string, design_num_pts, design_end_x, design_end_y, design_end_z);
	if (ret != 0) {
		Set_data(message, "Error: Could not get design string end point.");
		return 1;
	}

	// Get coordinates from as-built string (first and last points)
	Real asbuilt_start_x;
	Real asbuilt_start_y;
	Real asbuilt_start_z;
	Real asbuilt_end_x;
	Real asbuilt_end_y;
	Real asbuilt_end_z;

	ret = Get_super_vertex_coord(asbuilt_string, 1, asbuilt_start_x, asbuilt_start_y, asbuilt_start_z);
	if (ret != 0) {
		Set_data(message, "Error: Could not get as-built string start point.");
		return 1;
	}

	ret = Get_super_vertex_coord(asbuilt_string, asbuilt_num_pts, asbuilt_end_x, asbuilt_end_y, asbuilt_end_z);
	if (ret != 0) {
		Set_data(message, "Error: Could not get as-built string end point.");
		return 1;
	}

	// Calculate bearing angles using Atan2
	// Bearing is measured CLOCKWISE from North (Y-axis positive direction)
	// Atan2(dx, dy) gives angle from Y-axis: 0=North, 90=East, 180=South, 270=West
	Real design_dx = design_end_x - design_start_x;
	Real design_dy = design_end_y - design_start_y;
	Real design_dz = design_end_z - design_start_z;
	Real design_angle_rad = Atan2(design_dx, design_dy);

	Real asbuilt_dx = asbuilt_end_x - asbuilt_start_x;
	Real asbuilt_dy = asbuilt_end_y - asbuilt_start_y;
	Real asbuilt_dz = asbuilt_end_z - asbuilt_start_z;
	Real asbuilt_angle_rad = Atan2(asbuilt_dx, asbuilt_dy);

	// Calculate horizontal distances for vertical angle computation
	Real design_horiz_dist = Sqrt(design_dx * design_dx + design_dy * design_dy);
	Real asbuilt_horiz_dist = Sqrt(asbuilt_dx * asbuilt_dx + asbuilt_dy * asbuilt_dy);

	// Calculate vertical angles (inclination from horizontal)
	// Positive = upward slope, Negative = downward slope
	Real design_vert_angle_rad = Atan2(design_dz, design_horiz_dist);
	Real asbuilt_vert_angle_rad = Atan2(asbuilt_dz, asbuilt_horiz_dist);

	// Convert radians to degrees
	Real design_bearing_deg;
	Real asbuilt_bearing_deg;
	Real design_vert_angle_deg;
	Real asbuilt_vert_angle_deg;

	Radians_to_degrees(design_angle_rad, design_bearing_deg);
	Radians_to_degrees(asbuilt_angle_rad, asbuilt_bearing_deg);
	Radians_to_degrees(design_vert_angle_rad, design_vert_angle_deg);
	Radians_to_degrees(asbuilt_vert_angle_rad, asbuilt_vert_angle_deg);

	// Normalize bearings to 0-360 range (always clockwise from North)
	while (design_bearing_deg < 0.0) {
		design_bearing_deg = design_bearing_deg + 360.0;
	}
	while (design_bearing_deg >= 360.0) {
		design_bearing_deg = design_bearing_deg - 360.0;
	}
	while (asbuilt_bearing_deg < 0.0) {
		asbuilt_bearing_deg = asbuilt_bearing_deg + 360.0;
	}
	while (asbuilt_bearing_deg >= 360.0) {
		asbuilt_bearing_deg = asbuilt_bearing_deg - 360.0;
	}

	// Calculate the difference in bearing (positive = clockwise rotation)
	Real bearing_diff = asbuilt_bearing_deg - design_bearing_deg;

	// Normalize difference to -180 to +180 range
	while (bearing_diff > 180.0) {
		bearing_diff = bearing_diff - 360.0;
	}
	while (bearing_diff < -180.0) {
		bearing_diff = bearing_diff + 360.0;
	}

	Real abs_diff = Absolute(bearing_diff);

	// Check if strings are pointing in opposite directions (abs_diff > 90°)
	// If so, flip the as-built bearing by 180° to get the corrected comparison
	Integer direction_reversed = 0;
	Real corrected_asbuilt_bearing = asbuilt_bearing_deg;
	Real corrected_diff = bearing_diff;
	Real corrected_abs_diff = abs_diff;

	if (abs_diff > 90.0) {
		direction_reversed = 1;
		// Flip as-built bearing by 180°
		corrected_asbuilt_bearing = asbuilt_bearing_deg + 180.0;
		while (corrected_asbuilt_bearing >= 360.0) {
			corrected_asbuilt_bearing = corrected_asbuilt_bearing - 360.0;
		}
		// Recalculate difference
		corrected_diff = corrected_asbuilt_bearing - design_bearing_deg;
		while (corrected_diff > 180.0) {
			corrected_diff = corrected_diff - 360.0;
		}
		while (corrected_diff < -180.0) {
			corrected_diff = corrected_diff + 360.0;
		}
		corrected_abs_diff = Absolute(corrected_diff);
	}

	// Calculate vertical angle difference
	// If direction is reversed, also flip the vertical angle sign for as-built
	Real corrected_asbuilt_vert_angle = asbuilt_vert_angle_deg;
	if (direction_reversed == 1) {
		corrected_asbuilt_vert_angle = -asbuilt_vert_angle_deg;
	}
	Real vert_angle_diff = corrected_asbuilt_vert_angle - design_vert_angle_deg;
	Real vert_angle_abs_diff = Absolute(vert_angle_diff);

	// Output results
	Print();
	Print("============================================================");
	Print("  BEARING & VERTICAL ANGLE COMPARISON RESULTS (BETA VERSION)");
	Print("============================================================");
	Print();
	Print("Design String:   " + design_name);
	Print("  Start Point:   (" + To_text(design_start_x, 3) + ", " + To_text(design_start_y, 3) + ", " + To_text(design_start_z, 3) + ")");
	Print("  End Point:     (" + To_text(design_end_x, 3) + ", " + To_text(design_end_y, 3) + ", " + To_text(design_end_z, 3) + ")");
	Print("  Bearing:       " + To_text(design_bearing_deg, 2) + " degrees");
	Print("  Vertical Angle: " + To_text(design_vert_angle_deg, 2) + " degrees");
	Print();
	Print("As-Built String: " + asbuilt_name);
	Print("  Start Point:   (" + To_text(asbuilt_start_x, 3) + ", " + To_text(asbuilt_start_y, 3) + ", " + To_text(asbuilt_start_z, 3) + ")");
	Print("  End Point:     (" + To_text(asbuilt_end_x, 3) + ", " + To_text(asbuilt_end_y, 3) + ", " + To_text(asbuilt_end_z, 3) + ")");
	Print("  Bearing:       " + To_text(asbuilt_bearing_deg, 2) + " degrees");
	Print("  Vertical Angle: " + To_text(asbuilt_vert_angle_deg, 2) + " degrees");

	if (direction_reversed == 1) {
		Print();
		Print("*** AS-BUILT STRING DIRECTION REVERSED FOR COMPARISON ***");
		Print("  Corrected Bearing: " + To_text(corrected_asbuilt_bearing, 2) + " degrees");
		Print("  Corrected Vertical Angle: " + To_text(corrected_asbuilt_vert_angle, 2) + " degrees");
	}

	Print();
	Print("------------------------------------------------------------");
	if (direction_reversed == 1) {
		Print("RAW BEARING DIFF:       " + To_text(abs_diff, 2) + " degrees (opposite directions)");
		Print("CORRECTED BEARING DIFF: " + To_text(corrected_abs_diff, 2) + " degrees");
	} else {
		Print("BEARING DIFFERENCE:     " + To_text(corrected_abs_diff, 2) + " degrees");
	}
	Print("VERTICAL ANGLE DIFF:    " + To_text(vert_angle_abs_diff, 2) + " degrees");
	Print("------------------------------------------------------------");
	Print();

	// Provide interpretation using corrected difference
	Text result_msg;
	if (corrected_abs_diff < 0.01 && vert_angle_abs_diff < 0.01) {
		result_msg = "Angles identical";
	} else if (corrected_abs_diff < 1.0 && vert_angle_abs_diff < 1.0) {
		result_msg = "Minor: B=" + To_text(corrected_abs_diff, 2) + " V=" + To_text(vert_angle_abs_diff, 2) + " deg";
	} else if (corrected_abs_diff < 5.0 && vert_angle_abs_diff < 5.0) {
		result_msg = "Moderate: B=" + To_text(corrected_abs_diff, 2) + " V=" + To_text(vert_angle_abs_diff, 2) + " deg";
	} else {
		result_msg = "Significant: B=" + To_text(corrected_abs_diff, 2) + " V=" + To_text(vert_angle_abs_diff, 2) + " deg";
	}

	if (direction_reversed == 1) {
		Print("Note: As-built was digitized in opposite direction.");
	}

	if (corrected_diff > 0.01) {
		Print("Bearing: As-built is rotated " + To_text(corrected_diff, 2) + " deg CLOCKWISE from design.");
	} else if (corrected_diff < -0.01) {
		Print("Bearing: As-built is rotated " + To_text(corrected_abs_diff, 2) + " deg COUNTER-CLOCKWISE from design.");
	} else {
		Print("Bearing: Bearings are aligned.");
	}

	// Vertical angle interpretation
	if (vert_angle_diff > 0.01) {
		Print("Vertical: As-built is " + To_text(vert_angle_diff, 2) + " deg STEEPER (more upward) than design.");
	} else if (vert_angle_diff < -0.01) {
		Print("Vertical: As-built is " + To_text(vert_angle_abs_diff, 2) + " deg SHALLOWER (more downward) than design.");
	} else {
		Print("Vertical: Vertical angles are aligned.");
	}

	Print();
	Print("============================================================");
	Print("Comparison complete. ");
	Print();
	Print("DISCLAIMER: This software is provided 'as is' without ");
	Print("any warranty.");
	Print();
	Print("Developer: Kamal Jarada (kamaljarada@gmail.com)");

	// Write report file if filename provided
	if (report_file_name != "") {
		Integer file_ret = write_report_file(report_file_name, design_name, asbuilt_name,
		design_start_x, design_start_y, design_start_z,
		design_end_x, design_end_y, design_end_z,
		asbuilt_start_x, asbuilt_start_y, asbuilt_start_z,
		asbuilt_end_x, asbuilt_end_y, asbuilt_end_z,
		design_bearing_deg, asbuilt_bearing_deg,
		design_vert_angle_deg, asbuilt_vert_angle_deg,
		corrected_abs_diff, vert_angle_abs_diff,
		corrected_diff, vert_angle_diff,
		direction_reversed, corrected_asbuilt_bearing,
		corrected_asbuilt_vert_angle, abs_diff);
		if (file_ret == 0) {
			Print();
			Print("Report saved to: " + report_file_name);
			result_msg = result_msg + " (Report saved)";
		} else {
			Print();
			Print("ERROR: Could not write report file!");
			result_msg = result_msg + " (File error)";
		}
	}

	Set_data(message, result_msg);

	return 0;
}

//---------------------------------------------------------------------
// Main panel function
//---------------------------------------------------------------------
void manage_panel()
{
	// Create the panel
	Panel panel = Create_panel("Compare Bearing Angles");
	Vertical_Group vgroup = Create_vertical_group(0);
	Message_Box message = Create_message_box("Select strings or models to compare");

	// --- Single String Comparison Section ---
	Vertical_Group string_group = Create_vertical_group(0);
	Set_border(string_group, "Single String Comparison");

	Message_Box design_msg = Create_message_box("Design: (not selected)");
	Message_Box asbuilt_msg = Create_message_box("As-Built: (not selected)");

	Horizontal_Group string_btn_group = Create_button_group();
	Select_Button pick_design = Create_select_button("Pick &Design", SELECT_STRING, message);
	Select_Button pick_asbuilt = Create_select_button("Pick &As-Built", SELECT_STRING, message);
	Button compare_btn = Create_button("&Compare Strings", "compare");

	Append(design_msg, string_group);
	Append(asbuilt_msg, string_group);
	Append(pick_design, string_btn_group);
	Append(pick_asbuilt, string_btn_group);
	Append(compare_btn, string_btn_group);
	Append(string_btn_group, string_group);

	// --- Model Comparison Section ---
	Vertical_Group model_group = Create_vertical_group(0);
	Set_border(model_group, "Model to Model Comparison (by string name)");

	Model_Box design_model_box = Create_model_box("Design Model", message, CHECK_MODEL_EXISTS);
	Model_Box asbuilt_model_box = Create_model_box("As-Built Model", message, CHECK_MODEL_EXISTS);

	Horizontal_Group model_btn_group = Create_button_group();
	Button compare_models_btn = Create_button("Compare &Models", "compare_models");

	Append(design_model_box, model_group);
	Append(asbuilt_model_box, model_group);
	Append(compare_models_btn, model_btn_group);
	Append(model_btn_group, model_group);

	// --- Output Section ---
	Vertical_Group output_group = Create_vertical_group(0);
	Set_border(output_group, "Output");

	File_Box file_box = Create_file_box("Report File", message, FILE_MODE_WRITE, "*.rpt");
	Set_data(file_box, "bearing_comparison.rpt");

	Append(file_box, output_group);

	// --- Finish Button ---
	Horizontal_Group finish_group = Create_button_group();
	Button finish_btn = Create_button("&Finish", "finish");
	Append(finish_btn, finish_group);

	// Build the panel layout
	Append(string_group, vgroup);
	Append(model_group, vgroup);
	Append(output_group, vgroup);
	Append(message, vgroup);
	Append(vgroup, panel);
	Append(finish_group, panel);

	Show_widget(panel);

	Integer doit = 1;
	Element design_string;
	Element asbuilt_string;
	Integer design_selected = 0;
	Integer asbuilt_selected = 0;

	while (doit) {

		Integer id;
		Text cmd;
		Text msg;
		Integer ret = Wait_on_widgets(id, cmd, msg);

		if (cmd == "keystroke") continue;

		switch (id) {

		case Get_id(panel): {
				if (cmd == "Panel Quit") doit = 0;
			} break;

		case Get_id(finish_btn): {
				if (cmd == "finish") doit = 0;
			} break;

		case Get_id(pick_design): {
				if (cmd == "accept select") {
					if (Validate(pick_design, design_string) == OK) {
						Text name;
						Get_name(design_string, name);
						Set_data(design_msg, "Design: " + name);
						design_selected = 1;
						Set_data(message, "Design string selected");
					}
					Select_start(pick_design);
				}
			} break;

		case Get_id(pick_asbuilt): {
				if (cmd == "accept select") {
					if (Validate(pick_asbuilt, asbuilt_string) == OK) {
						Text name;
						Get_name(asbuilt_string, name);
						Set_data(asbuilt_msg, "As-Built: " + name);
						asbuilt_selected = 1;
						Set_data(message, "As-built string selected");
					}
					Select_start(pick_asbuilt);
				}
			} break;

		case Get_id(compare_btn): {
				if (cmd == "compare") {
					if (design_selected == 0) {
						Set_data(message, "Please select a design string first");
					} else if (asbuilt_selected == 0) {
						Set_data(message, "Please select an as-built string first");
					} else {
						Text report_file_name;
						Get_data(file_box, report_file_name);
						do_compare(design_string, asbuilt_string, message, report_file_name);
					}
				}
			} break;

		case Get_id(compare_models_btn): {
				if (cmd == "compare_models") {
					Model design_model;
					Model asbuilt_model;
					Integer dm_ret = Validate(design_model_box, GET_MODEL_ERROR, design_model);
					Integer am_ret = Validate(asbuilt_model_box, GET_MODEL_ERROR, asbuilt_model);

					if (dm_ret != MODEL_EXISTS) {
						Set_data(message, "Please enter a valid design model");
					} else if (am_ret != MODEL_EXISTS) {
						Set_data(message, "Please enter a valid as-built model");
					} else {
						Text report_file_name;
						Get_data(file_box, report_file_name);
						do_model_compare(design_model, asbuilt_model, message, report_file_name);
					}
				}
			} break;
		}
	}

	Hide_widget(panel);
}

void main()
{
	manage_panel();
}
