# 12dPL Coding Conventions

## File Naming

- Use **snake_case** for macro filenames: `my_macro_01.4dm`
- Suffix panel macros with `_panel`: `drawcross_panel_01.4dm`
- Include version numbers: `_01`, `_02`, etc. or `_01.1`, `_01.2`, `_01.3` for minor revisions
- Header files: `set_ups.h`, `math_constants.H` (case-insensitive on Windows)

## Code Style

- Use **4-space indentation** (no tabs)
- Opening braces on the **same line** as the statement or on the **next line** (be consistent within a file)
- One blank line between function definitions
- Align variable declarations where practical
- `++` and `--` increment/decrement operators are valid (C-like)
- `+=` compound assignment works on `Text` (string append) and numeric types: `msg += "suffix"`, `count += 1`
- Ternary operator: `(condition) ? value1 : value2`
- Function overloading: Same name, different parameter types (user-defined). Compiler resolves by type.
- `return(value);` with parentheses is valid: `return(0);`, `return(reply);`

## Naming Conventions

| Item           | Convention    | Example                |
|----------------|---------------|------------------------|
| Variables      | snake_case    | `model_name`           |
| Global vars    | g_ prefix     | `g_count`, `g_cx1[]`   |
| Functions      | PascalCase    | `Get_model`            |
| Constants      | UPPER_CASE    | `COLOUR_RED`           |
| Macro defines  | UPPER_CASE    | `#define MAX_POINTS`   |

## Global Variable Blocks

Use bare `{ }` blocks at file scope to declare global state shared across functions:

```c
#define MAX_ITEMS 1000

{
    Integer g_count;
    Real    g_x[MAX_ITEMS], g_y[MAX_ITEMS], g_z[MAX_ITEMS];
    Text    g_names[MAX_ITEMS];
    Integer g_values[MAX_ITEMS];
}
```

Use a `g_` prefix convention for global variables to distinguish them from locals.

## Documentation

Every macro file should include a header block:

```c
//---------------------------------------------------------------------
// Programmer           [Name]
// Date                 [DD/MM/YY]
// 12d Model            [Version]
// Version              [Macro Version]
// Macro Name           [Name]
// Type                 [Type Number]
//
// Brief description
// [What this macro does]
//---------------------------------------------------------------------
```

### Extended Header Block

Production macros may include additional fields like contact email, detailed description, and disclaimer:

```c
//---------------------------------------------------------------------
// Programmer           [Name]
// Email                [email@example.com]
// Date                 [DD/MM/YY]
// 12d Model            [Version]
// Version              [Macro Version]
// Macro Name           [Name]
// Type                 [Type Number]
//
// Description
// [Multi-line description of what the macro does,
//  inputs, outputs, and behavior.]
//
// DISCLAIMER
// [Warranty/liability notice for distribution.]
//---------------------------------------------------------------------
```

## Error Handling

- Return `0` for success, non-zero for errors (e.g. `-1` for failure, `1`–5 for specific error codes)
- Use `Error_prompt()` for error messages — there is NO `Print_error()` function
- Use `Prompt()` for informational messages — NOT the same as `Print()`
- `Print(Text msg)` writes to the 12d **Output Window** (not console). Always add `"\n"` for newlines. Call `Show_console(1)` **after** all `Print()` calls to display the window.
- `Exit(Text msg)` terminates the macro immediately with a message
- Always validate model/element references before use
- Use `goto` labels for structured error cleanup and input retry loops

## Functions Returning Handles

Functions can return handle types (`Element`, `Model`, etc.), not just scalars. This is useful for factory/helper functions:

```c
Element create_centroid_point(Real cx, Real cy, Real cz,
                              Text name, Integer colour,
                              Model out_model, Text proj_data,
                              Integer attr_on)
{
    Element pt = Create_super(7, 1);
    Set_super_vertex_coord(pt, 1, cx, cy, cz);
    Set_name(pt, name);
    Set_colour(pt, colour);
    Calc_extent(pt);
    Set_model(pt, out_model);
    // ... optionally attach attributes ...
    return(pt);
}
```

## Element Creation Workflow

When creating a new element and adding it to a model:

1. `Create_super(flag1, n_vertices)` - allocate dimensions using flags, not an element type code
2. `Set_super_vertex_coord(el, vertex, x, y, z)` — set coordinates
3. `Set_name(el, name)` — set name
4. `Set_colour(el, colour)` — set colour
5. `Calc_extent(el)` — **must call** to compute bounding box
6. `Set_model(el, model)` — assign to model
7. After all elements added: `Calc_extent(model)` — recalculate model extents

## Model Validation Pattern

When processing model names from a `Model_Box` with `flags=0` (manual validation):

```c
Text in_name;
Get_data(model_box, in_name);
if(in_name == "") {
    Set_data(message, "Please enter a model name");
    break;
}
if(Model_exists(in_name) != MODEL_EXISTS) {
    Set_data(message, "Model '" + in_name + "' does not exist");
    break;
}
Model m = Get_model(in_name);
```

### Validate(Model_Box) Pattern

Alternatively, use `Validate(Model_Box, error_code, Model)` for direct model retrieval:

```c
Model design_model;
if(Validate(design_model_box, GET_MODEL_ERROR, design_model) != MODEL_EXISTS) {
    Set_data(message, "Please select a valid design model");
    break;
}
// design_model is now ready to use
```

For output models that should be created if they don't exist:

```c
Text out_name;
Get_data(output_model_box, out_name);
Model out_model;
if(Model_exists(out_name) == MODEL_EXISTS)
    out_model = Get_model(out_name);
else
    out_model = Create_model(out_name);
```

## Projection Handling

Get projection data from a `Projection_Box` in the process handler (not the event loop):

```c
Text proj_name, proj_type, proj_data;
Integer proj_ok = Validate(proj_box, proj_name, proj_type, proj_data);
if(proj_ok != 1 || proj_data == "")
    proj_data = Get_project_setting_text("PROJECTION_DATUM_DATA");
```

**Fallback:** If the user hasn't set a projection in the box, fall back to the project's default projection using `Get_project_setting_text("PROJECTION_DATUM_DATA")`.

## Enable/Disable Process Button Pattern

Check all required fields each event-loop iteration to dynamically enable the Process button. Use `Get_data()` (not `Validate()`) to avoid stealing focus:

```c
Text chk_in, chk_out, chk_proj;
Get_data(input_model_box,  chk_in);
Get_data(output_model_box, chk_out);
Get_data(proj_box,         chk_proj);
Set_enable(process_btn, (chk_in != "" && chk_out != "" && chk_proj != ""));
```

Start with `Set_enable(process, 0)` before `Show_widget()` so the button is greyed out until all fields are filled.

## Multi-Line Message Box Display

Build a result string with `\n` newlines and display in a `Message_Box`:

```c
Text result;
result = "Model: " + in_name + "\n";
result = result + "Total elements: " + To_text(no_elts) + "\n";
result = result + "Processed: " + To_text(processed) + "\n";
Set_data(output_message, result);
```

## Attributes

- **No `Create_attributes()` exists** — and none is needed. `Set_attribute(Attributes, Text, value)` **auto-initialises** the handle on first call.
- **For flat attributes:** Use element-level `Set_attribute(Element, Text, Text)` (ID 572). Simplest — no handle needed.
- **For nested groups (new elements):** Build the entire tree from uninitialised handles, then `Set_attributes(elt, root)`. **Do NOT call `Get_attributes()` on elements that have no existing attributes** — it returns a null handle that silently breaks the chain.
- **For nested groups (existing elements):** `Get_attributes(elt, root)` → modify root → `Set_attributes(elt, root)`. Safe only when the element already has attributes.
- **For project attributes:** Build tree from scratch → `Set_project_attributes(root)`.
- **Path syntax:** `"Group/Field"` for nested access, `"Name[2]"` for array syntax.
- **Extract helper functions** for attribute assignment instead of duplicating the pattern inline.

### Attribute Helper Function Pattern

Extract coordinate-conversion + attribute-building into a helper function. For **new elements** (always fresh, no pre-existing attributes), build the tree from scratch using uninitialised handles:

```c
// Fresh element — always build from scratch (no Get_attributes needed)
void write_gps_attrs_fresh(Element pt, Real lon_val, Real lat_val, Integer is_first)
{
    Attributes asset;
    Attributes de;
    Attributes root;
    if(is_first == 1)
    {
        Set_attribute(asset, "TfNSW_GPSStartLong", lon_val);  // Real type
        Set_attribute(asset, "TfNSW_GPSStartLat",  lat_val);
    }
    else
    {
        Set_attribute(asset, "TfNSW_GPSEndLong", lon_val);
        Set_attribute(asset, "TfNSW_GPSEndLat",  lat_val);
    }
    Set_attribute(de,   "TfNSW_Asset", asset);
    Set_attribute(root, "TfNSW_DE",    de);
    Set_attributes(pt, root);
}
```

For **existing elements** (may have attributes from other macros), use the deep navigation pattern to update only target leaf fields without disturbing sibling groups. See the _Updating Leaf Fields Without Losing Sibling Groups_ section in reference.md.

### Attribute Type-Safe Overwrite Pattern

When a field may already exist with an unknown type (written as Text by another macro, now you want Real), use `Attribute_delete` on the **Attributes handle** first, then re-create:

```c
// Delete-then-recreate ensures the field always ends up as Real
Attribute_delete(asset, "MyField");    // no-op if absent; removes if present
Set_attribute(asset, "MyField", real_value);  // creates fresh as Real
```

Do **not** use `Get_attribute_type` + branching for this — it's cleaner to always delete and recreate when the target type is fixed.

### Help Button → 12d Output Window Pattern

To show in-panel help text in the 12d Output Window (not a blocking dialog):

```c
case Get_id(help_btn):
{
    if(cmd != "help") break;
    Text h;
    h = "Macro Title\n";
    h = h + "----------------------------\n";
    h = h + "What this macro does.\n";
    h = h + "\n";
    h = h + "Developer: name@email.com";
    Clear_console();
    Print(h + "\n");
    Show_console(1);   // brings Output Window to front; panel stays open
} break;
```

Do NOT use `Prompt(Text)` for display-only info inside an event loop — the single-argument `Prompt` is an **input** dialog (user types back). Use `Print` + `Show_console(1)` for informational output, or `Error_prompt(text)` for a modal OK dialog.

## Panel Widgets

- Use `Model_Box` with `flags=0` to avoid focus-stealing on empty fields; validate manually in the process handler.
- Use `Named_Tick_Box` (not `Tick_Box`) for labeled checkboxes: `Create_named_tick_box("Label", initial_state, "response")`.
- Read `Named_Tick_Box` values with `Validate(tick, &result)`, NOT `Get_data(tick, &Integer)`.
- `Tick_Box` only takes `Create_tick_box(Message_Box msg)` — no label, no initial state. Almost never used.
- Use `Get_data(proj_box, &name)` for non-focus-stealing presence checks on `Projection_Box`.
- Use `Validate(proj_box, ...)` only when you actually need the projection data (it steals focus).
- `Set_enable(widget, 0/1)` to grey out / enable widgets. Accepts boolean expressions.
- `Create_button_group()` is shorthand for a horizontal button layout.
- `Set_data(model_box, "default name")` to set default text in a `Model_Box`.
- `Set_optional(Real_Box, 1)` to mark optional fields — check emptiness via `Get_data()` before `Validate()`.
- Align widget variable declarations for readability:
  ```c
  Panel          panel   = Create_panel("Title");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box("");
  ```

### Select_Button Pick-and-Re-arm Pattern

Use `Select_Button` for interactive element picking from the view. After processing a pick, re-arm the button with `Select_start()` so the user can pick again:

```c
Select_Button pick_design = Create_select_button("Pick Design", SELECT_STRING, message);
// ...
switch(id) {
    case Get_id(pick_design):
        if(cmd == "response") {
            Element design_string;
            if(Validate(pick_design, design_string) == OK) {
                // process the picked element
                // ...
                Select_start(pick_design);  // re-arm for next pick
            }
        }
        break;
}
```

### Button + Select_string Pick-with-Coordinates Pattern

When you need pick coordinates (e.g. for vertex snapping), use a regular `Button` with the extended `Select_string()` call instead of `Select_Button`. The extended form returns the XY click location, which `Select_Button` does not provide:

```c
Button pick_btn = Create_button("&Pick Vertex", "man_pick");
Integer_Box vert_box = Create_integer_box("Vertex Number", message);
// ...
case Get_id(pick_btn): {
    Element elt;
    Real px, py, pz, ch, ht;
    Integer ret = Select_string("Pick near a vertex", elt, px, py, pz, ch, ht);
    if(ret != 1) break;  // NOTE: extended Select_string returns 1 on success

    // Find nearest vertex to pick coordinates
    Integer nearest_vi = find_nearest_vertex(elt, px, py);
    Set_data(vert_box, nearest_vi);
} break;
```

**Key difference from `Select_Button`:** `Select_Button` sends `"accept select"` (not `"response"`) as its command and does not provide pick coordinates. Use Button + `Select_string()` when you need the click XY position.

### Nested Attribute Search Pattern

When attributes may be in any sub-group of an element's attribute tree, search breadth-first through nested levels:

```c
Integer search_nested_attr(Attributes root, Text att_name, Text &out_val)
{
    // Try direct on root
    Text val;
    if(Get_attribute(root, att_name, val) == 0 && val != "") { out_val = val; return(1); }

    // Iterate through sub-groups (type 5 = Attributes)
    Integer n;
    Get_number_of_attributes(root, n);
    Integer i;
    for(i = 1; i <= n; i = i + 1)
    {
        Integer att_type;
        Get_attribute_type(root, i, att_type);
        if(att_type == 5)
        {
            Attributes sub;
            Get_attribute(root, i, sub);
            if(Get_attribute(sub, att_name, val) == 0 && val != "") { out_val = val; return(1); }
            // Search one more level deep if needed...
        }
    }
    return(0);
}
```

Use `Get_attribute_type(Attributes, Integer index, Integer &type)` to enumerate fields by index and filter by type (1=Int, 2=Real, 3=Text, 5=Attributes). Then `Get_attribute(Attributes, Integer index, Attributes &val)` to retrieve sub-groups by index.

### Per-Vertex Attribute Consistency Checking Pattern

When processing elements whose vertices may have different attribute values (e.g. mixed pipe diameters), check all vertices before applying an operation:

```c
Integer check_vertex_values(Element elt, Text attr_name, Real &out_val, Integer &out_count)
{
    Integer n_verts;
    Get_points(elt, n_verts);
    Real first = 0.0;
    Integer found = 0;
    Integer mixed = 0;

    Integer vi;
    for(vi = 1; vi <= n_verts; vi = vi + 1)
    {
        Text val;
        Integer ret = Get_super_vertex_attribute(elt, vi, attr_name, val);
        if(ret == 0 && val != "")
        {
            Real d;
            if(From_text(val, d) == 0 && d > 0.0)
            {
                if(found == 0) { first = d; found = 1; }
                else
                {
                    Real diff = d - first;
                    if(diff < 0.0) diff = 0.0 - diff;
                    if(diff > 0.001) mixed = 1;
                }
            }
        }
    }
    out_val = first;
    if(found == 0) return(2);  // none found
    if(mixed == 1) return(1);  // mixed
    return(0);                  // consistent
}
```

Return codes: 0=consistent, 1=mixed values, 2=no values. Include a `skip_mixed` option in batch operations.

### Linear Interpolation Range Mapping Pattern

Map a value from one range to another with clamping (e.g. diameter to line weight):

```c
Real map_range(Real value, Real in_min, Real in_max, Real out_min, Real out_max)
{
    if(in_max <= in_min) return(out_min);
    Real t = (value - in_min) / (in_max - in_min);
    if(t < 0.0) t = 0.0;
    if(t > 1.0) t = 1.0;
    return(out_min + t * (out_max - out_min));
}
```

### File_Box Usage Pattern

Use `File_Box` for file path selection with filtering and default values:

```c
File_Box report_file_box = Create_file_box("Report File", message, FILE_MODE_WRITE, "*.rpt");
Set_data(report_file_box, "C:\\temp\\output.rpt");  // set default path
// ...
Text report_file_name;
Get_data(report_file_box, report_file_name);
if(report_file_name != "") {
    File report_file;
    if(File_open(report_file_name, "w", report_file) == 0) {
        File_write_line(report_file, "Header line");
        // ... write data ...
        File_close(report_file);
    }
}
```

### Bearing & Angle Calculation Pattern

For comparing survey/design angles:

```c
Real dx = end_x - start_x;
Real dy = end_y - start_y;
Real dz = end_z - start_z;

// Bearing (clockwise from North)
Real bearing_rad = Atan2(dx, dy);
Real bearing_deg;
Radians_to_degrees(bearing_rad, bearing_deg);
while (bearing_deg < 0.0) bearing_deg = bearing_deg + 360.0;

// Vertical angle
Real horiz_dist = Sqrt(dx * dx + dy * dy);
Real vert_angle_rad = Atan2(dz, horiz_dist);
Real vert_angle_deg;
Radians_to_degrees(vert_angle_rad, vert_angle_deg);
```

**Direction reversal:** When comparing two strings, check if the bearing difference exceeds 90° — if so, one string is digitised in the opposite direction. Flip its bearing by +180° and negate its vertical angle before computing differences.

### Point Name Matching Strategy

When matching elements between models by name, try multiple retrieval methods:

```c
Text name;
Get_super_vertex_point_number(elt, 1, name);  // first: structured point ID
if(name == "") Get_name(elt, name);            // second: element name
if(name == "") Get_super_vertex_text(elt, 1, name);  // third: vertex text
if(name == "") continue;  // skip unnamed elements
```

### CSV Report File Pattern

Structure report output with header, data rows, and summary using helper functions:

```c
void write_header(File &report_file)
{
    File_write_line(report_file, "Name,Design_Bearing,AsBuilt_Bearing,Diff");
}

void write_result(File &report_file, Text name, Real design_val, Real asbuilt_val, Real diff)
{
    Text line = name + "," + To_text(design_val, 4) + "," + To_text(asbuilt_val, 4) + "," + To_text(diff, 4);
    File_write_line(report_file, line);
}

void write_summary(File &report_file, Integer count, Real max_diff)
{
    File_write_line(report_file, "");
    File_write_line(report_file, "Total Comparisons: " + To_text(count));
    File_write_line(report_file, "Max Difference: " + To_text(max_diff, 6));
}
```

### Inline Constant Definitions

When not including `set_ups.h`, define required constants at file scope:

```c
#define SELECT_STRING   5509
#define SELECT_POINT    5505
#define OK              1
#define TRUE            1
#define FILE_MODE_WRITE 1
#define CHECK_MODEL_EXISTS 3
#define GET_MODEL_ERROR    13
#define MODEL_EXISTS       2
```

Prefer `#include "set_ups.h"` when available. Only define inline when the macro must be self-contained.

### Widget_Pages Tabbed Interface Pattern

Use `Choice_Box` to control which page of a `Widget_Pages` container is visible:

```c
Text choices[3];
choices[1] = "View"; choices[2] = "Model"; choices[3] = "String";
Choice_Box pages_box = Create_choice_box("Data source", message);
Set_data(pages_box, 3, choices);
Set_data(pages_box, choices[1]);  // default

Vertical_Group g1 = Create_vertical_group(-1);  Set_border(g1, 0, 0);
Vertical_Group g2 = Create_vertical_group(-1);  Set_border(g2, 0, 0);
Vertical_Group g3 = Create_vertical_group(-1);  Set_border(g3, 0, 0);

Widget_Pages pages = Create_widget_pages();
Append(g1, pages); Append(g2, pages); Append(g3, pages);

// In event loop:
case Get_id(pages_box): {
    Text page_text;
    Validate(pages_box, page_text);
    if(page_text == choices[1]) Set_page(pages, 1);
    else if(page_text == choices[2]) Set_page(pages, 2);
    else if(page_text == choices[3]) Set_page(pages, 3);
}
```

Use `Create_vertical_group(-1)` and `Set_border(group, 0, 0)` for invisible page containers.

### Menu UI Pattern (Pre-Panel)

Older macros use popup menus for option selection and read-only report display:

```c
Menu menu = Create_menu("Options");
Create_button(menu, "Option 1", "opt1");
Create_button(menu, "Option 2", "opt2");
Create_button(menu, "Finish",   "finish");
Text reply;
Display_relative(menu, -1, -1, reply);
Menu_delete(menu);
switch(reply) {
    case "opt1": { /* handle */ } break;
    case "finish": { goto done; } break;
}
```

Menus can also display non-interactive read-only text rows (empty response strings).

### View → Model → Element Pipeline

Standard workflow for processing all elements visible in a view:

```c
Dynamic_Text model_list;
View_get_models(view, model_list);
Integer no_models;
Get_number_of_items(model_list, no_models);
for(Integer i = 1; i <= no_models; i++) {
    Text name;
    Get_item(model_list, i, name);
    Model model = Get_model(name);
    Dynamic_Element de;
    Integer count;
    Get_elements(model, de, count);
    for(Integer j = 1; j <= count; j++) {
        Element elt;
        Get_item(de, j, elt);
        // process elt...
    }
}
```

### Project Model Enumeration Pattern

Get all models in a project, useful for batch operations or filtering empty models:

```c
Dynamic_Text all_models;
Get_project_models(all_models);
Integer num_models;
Get_number_of_items(all_models, num_models);
for(Integer i = 1; i <= num_models; i++) {
    Text name;
    Get_item(all_models, i, name);
    Model model = Get_model(name);
    Integer count;
    Get_number_of_items(model, count);
    if(count == 0) Model_delete(model);  // e.g. delete empty models
}
```

### Dynamic_Element Collector + Batch Set_model

Accumulate created elements in a `Dynamic_Element`, assign all to model at once:

```c
Dynamic_Element created;
Append(elt1, created);
Append(elt2, created);
Set_model(created, out_model);  // batch assign
Calc_extent(out_model);
```

### Element Type Dispatch Pattern

Switch on `Get_type()` result to handle each string type's specific data accessor:

```c
Get_type(elt, type);
switch(type) {
    case "2d":        { Get_2d_data(elt, pt, x, y); } break;
    case "3d":        { Get_3d_data(elt, pt, x, y, z); } break;
    case "4d":        { Get_4d_data(elt, pt, x, y, z, t); } break;
    case "Polyline":  { Get_polyline_data(elt, pt, x, y, z, r, f); } break;
    case "Super":     { Get_super_data(elt, pt, x, y, z, r, f); } break;
    case "Alignment": { Get_position(elt, ch, x, y, z, dir); } break;
    case "Arc":       { Get_arc_start(elt, x1, y1, z1); Get_arc_end(elt, x2, y2, z2); } break;
    case "Circle":    { Get_circle_data(elt, x, y, z, r); } break;
}
```

Known type strings: "2d", "3d", "4d", "Arc", "Polyline", "Alignment", "Pipeline", "Super", "Inteface" (sic), "Pipe", "Circle", "Text", "Tin", "Plot_Frame", "Feature", "Drainage", "Sewer".

### Convert Element Type Pattern

Convert elements to a common type for uniform processing, then clean up:

```c
Get_type(elt, type);
if(type == "Alignment" || type == "Circle" || type == "Polyline") {
    Element converted;
    Convert(elt, "3d", converted);
    Get_length_3d(converted, length);
    Element_delete(converted);  // clean up converted copy
}
```

### File Reading Loop Pattern

Read a file line-by-line, tokenize, and parse:

```c
File file;
if(File_open(file_name, "r", file) != 0) {
    Error_prompt("Cannot open file");
    return;
}
while(1) {
    Text line;
    if(File_read_line(file, line) != 0) break;  // EOF
    Dynamic_Text words;
    From_text(line, words);  // split into tokens
    Integer word_count;
    Get_number_of_items(words, word_count);
    // process words...
}
File_close(file);
```

### File Exists / Overwrite-Append Dialog

Check before writing and offer the user choices:

```c
if(File_exists(file_name)) {
    Text choices[3];
    choices[1] = "Overwrite"; choices[2] = "Append"; choices[3] = "New name";
    Text ans;
    Choice_prompt("File exists", 3, choices, ans);
    if(ans == choices[1]) File_open(file_name, "w", file);
    else if(ans == choices[2]) File_open(file_name, "a", file);
    else goto get_filename;  // re-prompt
}
```

### Optional Widget Fields Pattern

Mark a `Real_Box` as optional, check emptiness before validation:

```c
Set_optional(maxz_box, 1);  // allow empty
// ...
Text temp_text;
Get_data(maxz_box, temp_text);
if(temp_text != "") {
    Real temp_val;
    Validate(maxz_box, temp_val);
    max_z = temp_val;
}
```

### Error Focus Recovery Pattern

After a failed file or widget operation, return focus to the relevant widget:

```c
Set_focus(file_box);
Set_cursor_position(file_box);
Set_data(message, "Cannot write to file");
```

### Alignment HIP Iteration (Skip First & Last)

Process arc/spiral centres, skipping the first and last IPs:

```c
Integer no_hip;
Get_hip_points(align, no_hip);
for(Integer i = 2; i <= no_hip - 1; i++) {
    Text hip_type;
    Get_hip_type(align, i, hip_type);
    if(hip_type != "IP") {
        Real cx, cy;
        Get_hip_geom(align, i, 1, cx, cy);
        // process arc/spiral centre at cx, cy
    }
}
```

HIP type strings: "IP" (straight), "Curve" (arc), "Spiral" (transition).

**Important:** `Get_points()` on alignment elements returns the IP count **excluding** start and end points. You must add 2 for the total vertex count:

```c
Integer no_pts;
Get_points(align, no_pts);
no_pts = no_pts + 2;  // start and end not included in Get_points count
```

In contrast, `Get_hip_points()` returns the actual HIP count directly — no adjustment needed.

### Chainage from Element Name Parsing

Parse structured names like "design 1500.000" to extract chainage:

```c
Text elt_name;
Get_name(elt, elt_name);
Dynamic_Text name_parts;
From_text(elt_name, name_parts);
Text ch_text;
Get_item(name_parts, 2, ch_text);  // "1500.000"
Real ch_val;
From_text(ch_text, ch_val);        // parse to Real
```

### Null() Cleanup for Dynamic Arrays

Release dynamic arrays when no longer needed to free memory:

```c
Dynamic_Element strings;
// ... use strings ...
Null(strings);  // release when done
```

### Source_Box Data Selection Pattern

Use `Source_Box` to provide a built-in "Data to write/read" widget with element-type filter icons, model/view selection, and fence picking — all in a single widget. The `Source_Box` title is automatically prefixed with "Data ":

```c
Source_Box src_box = Create_source_box("to write", message, Source_Box_All);
Append(src_box, vg_panel);
```

This creates the standard 12d "Data to write" section with all selection icons (Model, View, String, Rectangle, Polygon, Lasso, Filter, etc.) and a Model box with colour bar.

**Retrieving selected elements:**

```c
Dynamic_Element src_data;
Null(src_data);
Integer rv = Validate(src_box, src_data);
if (rv != TRUE)
{
    Set_data(message, "No source data selected.", 3);
    break;
}

Integer count = 0;
Get_number_of_items(src_data, count);
for (Integer i = 1; i <= count; i++)
{
    Element elt;
    Get_item(src_data, i, elt);
    // process elt...
}
Null(src_data);  // release when done
```

**Limiting selection icons:** Combine flags with `|` to show only specific pickers:

```c
// Only Model + Filter icons
Source_Box src = Create_source_box("to process", msg, Source_Box_Model | Source_Box_Filter);

// Model + View + common fences
Source_Box src = Create_source_box("to export", msg, Source_Box_Standard);
```

Use `Source_Box` instead of manually building Model_Box + tick boxes when you need 12d's standard data selection UI.

### File_Box Default Path Pattern

Preset a `File_Box` with a default file path using `Set_data()`:

```c
File_Box src_file_box = Create_file_box("Source File", message, CHECK_FILE_MUST_EXIST, "*.4d");
Set_data(src_file_box, "C:\\ProgramData\\path\\to\\default_file.4d");

File_Box out_file_box = Create_file_box("Output File", message, CHECK_FILE_CREATE, "*.4d");
Set_data(out_file_box, "output.4d");
```

Use `GET_FILE_MUST_EXIST` (17) in `Validate()` for input files and `GET_FILE_CREATE` (15) for output files.

### Segment Text Annotation Pattern

Apply per-segment text to super string elements for visual labelling (e.g. displaying owner names along utility lines):

```c
Integer npts;
Get_points(elt, npts);
if(npts > 1)
{
    Integer colour;
    Get_colour(elt, colour);

    // Enable per-segment text array and annotation display
    Set_super_use_segment_text_array(elt, 1);
    Set_super_use_segment_annotation_value(elt, 1);

    // Set text for each segment (1-based, N-1 segments for N vertices)
    Integer seg;
    for(seg = 1; seg < npts; seg++)
    {
        Set_super_segment_text(elt, seg, "Label Text");
        Set_super_segment_text_size(elt, seg, 0.035);
        Set_super_segment_text_colour(elt, seg, colour);
    }
}
```

Both `Set_super_use_segment_text_array` and `Set_super_use_segment_annotation_value` must be enabled for per-segment text to display. The text array enables different text per segment; the annotation value enables visual rendering.

### Dynamic_Integer as Parallel Index Array

Use `Dynamic_Integer` alongside `Dynamic_Element` to maintain a mapping between elements and a lookup table:

```c
Dynamic_Integer elt_pair_idx;
Integer i;
for(i = 1; i <= n_elts; i++)
{
    Element elt;
    Get_item(source_elts, i, elt);
    Integer idx = find_matching_index(elt);  // returns index or 0
    Append(idx, elt_pair_idx);               // parallel to source_elts
}

// Later, retrieve the mapping:
Integer pair_idx;
Get_item(elt_pair_idx, i, pair_idx);
if(pair_idx > 0)
{
    // Use pair_idx to look up from global arrays
}
```

## Include Files

- Compile from the source folder: on this V15 installation relative headers require that working directory, even when the source argument is absolute
- Place shared headers in `includes/` or next to the macros that use them
- Use `set_ups.h` for standard 12d constants (`TRUE`, `FALSE`, `SELECT_STRING`, etc.)
- Case-insensitive on Windows: `set_ups.h` and `set_ups.H` both work

## Multi-File .H Project Structure

For non-trivial macros, split the code into multiple `.H` files under a local `includes/` subfolder. The main `.4dm` file should contain **only** UI setup and event routing — all processing logic, helpers, and business functions go in `.H` files.

```text
Macro_Projects/MacroName/
├── MacroName_panel_01.4dm          # Main: UI creation, layout, event loop
└── includes/
    ├── MacroName_globals.H         # #define constants, global variable block, forward declarations
    ├── MacroName_utils.H           # log_msg(), validation helpers, text builders
    ├── MacroName_process.H         # Core processing (or split by feature)
    └── MacroName_[feature].H       # Feature-specific logic (create, style, placement, etc.)
```

**Globals header** (`_globals.H`) pattern:

```c
#define CHECK_MODEL_CREATE  14
#define NUM_ATTRS           5
#define DEBUG 1    // comment out for release

{
    File g_log;
    Integer g_log_open = 0;
    // Other global state...
}

void log_msg(Text msg);  // forward declaration
```

**Include order** in the main `.4dm`:

```c
#include "includes/MacroName_globals.H"
#include "includes/MacroName_utils.H"      // depends on globals
#include "includes/MacroName_process.H"    // depends on utils
```

Files that depend on functions defined in earlier includes must be listed after them. The compiler processes includes in order, so `_utils.H` can call `log_msg()` (forward-declared in `_globals.H`), and `_process.H` can call functions from `_utils.H`.

**Include guards.** Guard every project header so a second `#include` (two files both pulling in the globals) is harmless:

```c
#ifndef MYMACRO_UTILS_H
#define MYMACRO_UTILS_H
// ... the header ...
#endif
```

QLA_FLAG_Trimesh guards all five of its headers, as do about fifty other headers in the workspace.

## Compilation

- Press **Ctrl+Shift+B** in VS Code to compile the current file
- Compiler: `C:\Program Files\12d\12dmodel\15.00\nt.x64\cc4d.exe`
- Exit code 0 = success (produces `.4do`), non-zero = errors
- Library functions (`Prompt`, `Get_model`, etc.) are resolved at runtime by 12d Model — no special flags needed
- Built-in declarations are checked by `cc4d`; normal mode rejects unknown functions and obsolete calls. A successful compile does not prove runtime behavior.
- Set VS Code task `options.cwd` to `${fileDirname}` and resolve relative diagnostic paths against that folder.
- Record exactly which macros and compiler flags were tested; never extend one successful build to an entire example collection.

## Panel Organisation Pattern: `manage_panel()`

Panel macros conventionally extract all UI logic into a `manage_panel()` function, with `main()` as a thin wrapper:

```c
void manage_panel()
{
    Panel panel = Create_panel("My Macro");
    // ... widget creation, layout, event loop ...
}

void main()
{
    manage_panel();
}
```

This keeps `main()` clean and allows reusable panel functions.

### do_process() Extraction Pattern

For complex macros, extract the processing logic into a `do_process()` function called from the event loop. Pass widget handles as parameters so the function can read inputs and update status:

```c
Integer do_process(Source_Box source_box, File_Box file_box,
                   Named_Tick_Box opt_tick,
                   Colour_Message_Box status_box)
{
    // Validate inputs from widgets
    // Process data
    // Update status_box with progress/results
    return(0);
}

// In event loop:
case Get_id64(process_btn):
    if(cmd != "process") continue;
    Set_data(status_box, "Processing...", MESSAGE_LEVEL_GENERAL);
    do_process(source_box, file_box, opt_tick, status_box);
    break;
```

This separates UI concerns from business logic and keeps the event loop clean.

## CodeShutdown Event Handling

When 12d Model is closing (project close or application exit), macros receive a `"CodeShutdown"` event. Handle it to exit cleanly:

```c
while (doit)
{
    Integer64 id;
    Text cmd, msg;
    Wait_on_events(id, cmd, msg);

    if (cmd == "CodeShutdown") {
        Set_exit_code("CodeShutdown");
        doit = 0;
        break;
    }
    // ... normal event handling ...
}
```

Use `Set_exit_code("CodeShutdown")` to signal clean termination. Return immediately from all function levels after detecting shutdown.

## Wait_on_events vs Wait_on_widgets

Two event loop functions exist:

| Function | ID Type | Usage |
|----------|---------|-------|
| `Wait_on_widgets(Integer &id, Text &cmd, Text &msg)` | `Integer` | Older, standard |
| `Wait_on_events(Integer64 &id, Text &cmd, Text &msg)` | `Integer64` | Newer, supports more widgets |

When using `Wait_on_events`, use `Get_id64(widget)` instead of `Get_id(widget)` in switch cases:

```c
Integer64 id;
Text cmd, msg;
Wait_on_events(id, cmd, msg);
switch (id) {
    case Get_id64(panel):   { /* ... */ } break;
    case Get_id64(button):  { /* ... */ } break;
}
```

## About Panel Pattern

Use the `about_panel()` helper function (from Matt_standard_library.H) to display a standard About dialog:

```c
case Get_id(panel):
{
    if (cmd == "Panel Quit") doit = 0;
    if (cmd == "Panel About") about_panel(panel);
}
break;
```

The function has multiple overloads:
- `about_panel(Panel panel)` — Simple form
- `about_panel(Panel panel, Text build)` — With build number
- `about_panel(Panel panel, Dynamic_Text info)` — With additional info
- `about_panel(Panel panel, Integer enableDisplay)` — Control field editability

## Tab_Box Tabbed Interface Pattern

Use `Tab_Box` for modern tabbed interfaces (alternative to `Widget_Pages` + `Choice_Box`):

```c
Tab_Box tab_box = Create_tab_box();
Vertical_Group vg_tab1 = Create_vertical_group(ALL_WIDGETS_OWN_HEIGHT);
Vertical_Group vg_tab2 = Create_vertical_group(ALL_WIDGETS_OWN_HEIGHT);

// Add widgets to each tab group...

Append(vg_tab1, "Basic", tab_box);     // Tab 1 with label "Basic"
Append(vg_tab2, "Advanced", tab_box);  // Tab 2 with label "Advanced"

Append(tab_box, panel);
```

## Log_Box Structured Results Pattern

Use `Log_Box` with `Log_Line` for structured, expandable results display with clickable element highlights:

```c
Log_Box lb_results = Create_log_box("Results", 400, 100);
Append(lb_results, vgroup);
// ...

// In process handler:
Clear(lb_results);

// Create expandable group headers with nested child lines
Log_Line group = Create_group_log_line("Main: pipe_name", 1);  // level 1=info/green
Add_log_line(lb_results, group);

// Nest clickable element highlight under the group
Uid model_id, string_id;
Get_id(elt, string_id);
Get_id(model, model_id);
Log_Line highlight = Create_highlight_string_log_line("Updated: pc_name", 1, model_id, string_id);
Append_log_line(highlight, group);

// Plain text child
Log_Line note = Create_text_log_line("No matches found", 2);  // level 2=warning/orange
Append_log_line(note, group);

// Print to Output Window
Print_log_line(group, 1);  // mode 1 = print to Output Window
```

**Log_Line levels:** 0=default, 1=info/green, 2=warning/orange, 3=error/red. Use `Create_highlight_string_log_line` for lines that zoom to the element when clicked.

## Cross-Model Element Matching Pattern

When matching elements between two models (e.g. property connections to mains), use a done-flag array to avoid duplicate matches:

```c
Integer pc_done[10000];
Integer i;
for(i = 1; i <= 10000; i++) pc_done[i] = 0;

Integer main_i;
for(main_i = 1; main_i <= main_count; main_i++)
{
    Element main_elt;
    Get_item(main_list, main_i, main_elt);

    Integer pc_i;
    for(pc_i = 1; pc_i <= prop_count; pc_i++)
    {
        if(pc_done[pc_i] != 0) continue;  // already matched

        Element pc_elt;
        Get_item(prop_list, pc_i, pc_elt);

        // ... spatial matching logic (Drop_point, offset check) ...

        if(matched)
        {
            pc_done[pc_i] = 1;  // mark as processed
        }
    }
}
```

## Pipe Invert Interpolation Pattern

Interpolate invert levels along a drainage pipe segment by chainage ratio:

```c
Real denom = ch_ds - ch_us;
if(Absolute(denom) < 0.000001) return(1);  // degenerate segment

Real frac = (proj_ch - ch_us) / denom;
Real interp_il = il_us + frac * (il_ds - il_us);
```

## Panel_prompt for CAD Commands

Invoke built-in 12d panels programmatically with the field-array overload:

```c
Text cad_name = "";
Get_command_argument(1, cad_name);

Integer no_fields = 0;
Text field_name[0];
Text field_value[0];

Integer rv = Panel_prompt(cad_name, 1, no_fields, field_name, field_value);
```

This is useful for macros that wrap built-in CAD commands with pre-configured arguments.

## Text Manipulation Helper Functions

Common text helper patterns from Matt_text_library:

### trim() — Remove Whitespace
```c
Text trim(Text input)
{
    input = Text_justify(input);
    // Also remove quotes if present
    Integer last = Text_length(input);
    if (Get_subtext(input, last, last) == "\"") input = Get_subtext(input, 1, last-1);
    if (Get_subtext(input, 1, 1) == "\"") input = Get_subtext(input, 2, last);
    return input;
}
```

### change_text() — Find and Replace
```c
Integer change_text(Text &text, Text to_change, Text replace_with)
{
    Integer location = Find_text(text, to_change);
    Integer length_change = Text_length(to_change);
    while (location) {
        Integer length = Text_length(text);
        text = Get_subtext(text, 1, location-1) + replace_with + Get_subtext(text, location+length_change, length);
        location = Find_text(text, to_change);
    }
    return 0;
}
```

### from_text() — Split by Custom Delimiter
```c
Integer from_text(Text input, Dynamic_Text &words, Text delimiter)
{
    Integer count = 0;
    Null(words);
    while (1) {
        Integer pos = Find_text(input, delimiter);
        if (pos == 0) {
            Append(trim(input), words);
            count++;
            break;
        }
        if (pos > 1) {
            Append(trim(Get_subtext(input, 1, pos-1)), words);
            count++;
        }
        input = Get_subtext(input, pos+1, Text_length(input));
    }
    return count;
}
```

## Debug Macro Pattern

Use preprocessor conditionals for debug output:

```c
#define DEBUG 0

#if DEBUG == 1
#define PRINTD(x) do { Print((x) + "\\n"); } while (0)
#else
#define PRINTD(x) do { } while (0)
#endif

// Usage:
PRINTD("Processing element " + To_text(i));
```

Set `DEBUG 1` during development, `DEBUG 0` for production.

## Global Constants Pattern

Define program metadata as global variables for consistent access:

```c
{
    Text PROGRAM_NAME = "My Macro";
    Text PROGRAM_AUTHOR = "Author Name";
    Text PROGRAM_VERSION = "1.0";
    Text PROGRAM_DATE = "2024-01";
}
```

Use in `main()` for startup banner:
```c
Print();
Print("by " + PROGRAM_AUTHOR + "\\n");
Print(PROGRAM_NAME + " version " + PROGRAM_VERSION + " " + PROGRAM_DATE + "\\n");
```

## Command Line Arguments Pattern

Support both panel mode and command-line mode:

```c
void main()
{
    Integer cmd_line = FALSE;
    Text arg1 = "";

    Integer argc = Get_number_of_command_arguments();
    if (argc > 0) {
        Integer rv = Get_command_argument(1, arg1);
        if (rv == 0) cmd_line = TRUE;
    }

    if (cmd_line) {
        // Process with arg1 directly
    } else {
        // Show panel
        manage_panel();
    }
}
```

## Environment Variable Substitution Pattern

Replace `$LIB`, `$USER_LIB` environment placeholders in paths:

```c
Text replace_env_4d(Text text, Text name)
{
    Text env = "$" + name;
    Text env4d = name + "_4D";
    Integer envlen = Text_length(env);
    Text envpath = Getenv(env4d);
    while (1) {
        Integer pos = Find_text(text, env);
        if (pos <= 0) break;
        if (pos == 1)
            text = envpath + Get_subtext(text, pos + envlen, 9999);
        else
            text = Get_subtext(text, 1, pos - 1) + envpath + Get_subtext(text, pos + envlen, 9999);
    }
    return text;
}

// Usage:
Text path = replace_env_4d("$LIB/macros/myfile.txt", "LIB");
```

**The variable is `USER_LIB_4D`, not `USER_LIB`.** `Getenv("USER_LIB")` is normally empty. A helper that falls back to "treat as present" when it cannot expand a path then silently skips its existence checks.

**Expand for checks, hand 12d the original.** Expand `$USER_LIB` / `$LIB` only for local existence checks and log lines. Pass 12d the unexpanded `$USER_LIB\...` form — in SLX, chains and plot parameters — and let it resolve it (QLA_FLAG_Trimesh, `_utils.H`). The manual's `Text Get_absolute_path(Text)` (ID 7815) expands `$USER_LIB/`. It compiles on V15 but is untested here; prefer it over hand-rolled substitution once it is confirmed live.

## Shell_execute / External Process Launch Pattern

To launch an external application from a macro, use `Shell_execute`. It requires a shown `Panel` widget as its first argument (the Win32 HWND owner). In a panel-based macro, pass the existing panel. In a simple script macro, create a minimal hidden/empty panel first:

```c
// Simple script usage (no existing panel)
Panel panel = Create_panel("");
Show_widget(panel);
Integer rc = Shell_execute(panel, "open", "C:\\path\\to\\app.exe", "--flag value", "", 1);
// rc == 0 means success
```

```c
// Inside a panel event loop — reuse the existing panel
Integer rc = Shell_execute(panel, "open", json_path, "", "", 1);
// "open" on a data file triggers the OS default handler (e.g. .html opens browser)
```

**Key parameter values:**
- `operation`: `"open"` (launch/default action), `"edit"`, `"print"`
- `showcmd`: `1` (normal), `0` (hidden), `3` (maximized)
- `directory`: working directory or `""` for default

## About Popup Panel Pattern

When a panel has an About button, display information in a **separate popup panel** with its own sub-event-loop. This avoids the `Prompt()` input-dialog trap and keeps the main panel responsive:

```c
// In main event loop:
if(id == Get_id64(about_btn) && cmd == "about")
{
    Hide_widget(panel);

    Panel about_panel = Create_panel("About - My Macro");
    Vertical_Group about_vg = Create_vertical_group(0);

    Vertical_Group info_vg = Create_vertical_group(0);
    Set_border(info_vg, "Information");
    Message_Box ab_title = Create_message_box("My Macro  v1.0");
    Message_Box ab_dev   = Create_message_box("Developer: Name");
    Append(ab_title, info_vg);
    Append(ab_dev, info_vg);

    Horizontal_Group ab_btn = Create_button_group();
    Button ab_ok = Create_button("OK", "ok");
    Append(ab_ok, ab_btn);

    Append(info_vg, about_vg);
    Append(ab_btn, about_vg);
    Append(about_vg, about_panel);
    Show_widget(about_panel);

    // Sub event loop — runs until OK or panel close
    Integer ab_doit = 1;
    while(ab_doit)
    {
        Integer64 ab_id;
        Text ab_cmd, ab_msg;
        Wait_on_events(ab_id, ab_cmd, ab_msg);
        if(ab_cmd == "CodeShutdown")
        {
            Set_exit_code("CodeShutdown");
            doit = 0;       // also exit main loop
            ab_doit = 0;
            break;
        }
        if(ab_id == Get_id64(about_panel) && ab_cmd == "Panel Quit")
            ab_doit = 0;
        if(ab_id == Get_id64(ab_ok) && ab_cmd == "ok")
            ab_doit = 0;
    }

    Show_widget(panel);
    continue;
}
```

**Key points:**
- `Hide_widget(main_panel)` before showing the about panel
- Always handle `CodeShutdown` in the sub-loop (set both `doit` and `ab_doit` to 0)
- `Show_widget(main_panel)` when the about panel closes

## Non-Blocking External Process with Done-File Pattern

When a long-running external process (e.g. PowerShell download) would freeze the 12d UI if run via `System()`, use `Create_process()` with `wait=0` and a done-file for completion detection:

```c
// Launch non-blocking with visible console (flag 16 = CREATE_NEW_CONSOLE)
Integer cp_ret = Create_process(ps_exe, ps_args, work_dir, 16, 0, 0);
g_dl_running = 1;

// ... later, check if done:
File df;
Integer dfr = File_open(done_file, "r", "", df);
if(dfr != 0) { /* file doesn't exist yet — still running */ }
else
{
    Text done_check;
    File_read_line(df, done_check);
    File_close(df);
    if(Find_text(done_check, "DONE") > 0)
        g_dl_running = 0;  // completed
}
```

The external script writes `"DONE"` to the done-file as its final action. The macro polls by trying to open and read it.

**`CREATE_NEW_CONSOLE` = 16:** Opens a visible console window for the child process, useful for showing download progress. Without it, the process runs hidden.

### Background process checked on the next button press

There is no timer a macro can poll with (`Start_timer` is rejected by V15 `cc4d`; see reference.md, External Processes), and 12d shows *Not Responding* until an event handler returns. So a long job that should leave 12d usable is started hidden, the handler returns at once, and completion is checked **on the user's next press** of a related button:

```c
Process_Handle g_proc;                  // the type is Process_Handle, not "Unknown"
Integer g_engine_pending = 0;

// Plot pressed: launch and return to Wait_on_events
if(Create_process(exe, args, dir, CREATE_NO_WINDOW, 0, g_proc) == 0) g_engine_pending = 1;
Set_enable(plot_btn, 0);                // grey out actions while it runs

// Any later Check / Plot press:
if(g_engine_pending == 1)
{
    if(Process_exists(g_proc) != 0) { Set_data(cmb, "Still working...", MESSAGE_LEVEL_WARNING); continue; }
    g_engine_pending = 0;               // finished: read its result file, report,
    Set_enable(plot_btn, 1);            // and let this press do nothing else
    continue;
}
```

Source: `Macro_Projects/FastPlot` (`_run.H`, `_job.H`, panel). FastPlot's README reports a live run: the engine wrote a 28.8 MB, 66-page PDF in 21 s "while 12d was free". FastPlot treats `Process_exists(handle) != 0` straight after launch as "started"; the manual says the handle overload returns 0 on success, so checking the return code is fine too.

### Live progress window: shared append file, console tailer, sentinel line

To show progress while the work runs elsewhere, the macro and the engine append to one file, and a small console script tails it:

```c
File_open(path, "a", "ccs=UTF-8", g_prog);       // Unicode mode adds a BOM: the tailer strips U+FEFF
File_write_line(g_prog, msg);  File_flush(g_prog);
...
File_write_line(g_prog, "FASTPLOT_DONE");        // sentinel: the monitor closes itself
File_close(g_prog);
```

Launch the monitor with `Create_process(ps, args, dir, CREATE_NEW_CONSOLE, 0, 0)`. The tailer opens the file with shared read/write, exits on the sentinel or after a long idle, and must always see a sentinel: the macro writes it itself on failure, or when the engine finished without writing one. Hand the file to the engine by **closing the macro's handle first**. Source: FastPlot (`_utils.H`, `_job.H`, `_run.H`, the monitor script embedded in `_embed.H`).

### Ship helper scripts inside the `.4do`

A macro that depends on PowerShell / C# helpers can carry them in its own binary, so deployment stays one file. FastPlot's `build_embed.ps1` turns each line of each helper into `File_write_line(f, "...");` (escaping `\` and `"`, tabs to spaces, ~200 lines per generated function, refusing non-ASCII input), and the macro rewrites the helpers to `%TEMP%\<Macro>\engine` at the start of every run. The generator must also respect the ~600-character literal limit (see "cc4d Per-Line String Length Limit") — FastPlot's is safe only because no helper line exceeds about 250 characters.

## File-Based IPC (Script Generation + Parse Results)

For complex external operations (API queries, data processing), generate a script file from 12dPL, launch it, and parse the results:

1. **Generate script:** Write a `.ps1` (or `.bat`) file using `File_write_line()` with embedded variables
2. **Launch:** `Create_process(powershell_exe, "-File script.ps1", dir, 16, 0, 0)`
3. **Exchange data:** Script writes results to intermediate text files with a simple tagged format
4. **Parse results:** Read text files in 12dPL with `File_read_line()` + tokenization

The intermediate text format should use simple line-based tags for easy parsing:

```text
F                          # start feature
N lot_name                 # name
A fieldname value          # attribute
R                          # start ring/path
V 123.456 789.012          # vertex
E                          # end feature
```

## Special Characters via Set_char (Encoding Workaround)

12dPL source files compiled with `cc4d.exe` use ANSI encoding. Multi-byte UTF-8 characters (©, °, ², etc.) in string literals produce garbage at runtime. Use `Set_char()` to inject special characters by ASCII/ANSI code at runtime:

```c
Text copyright = " ";
Set_char(copyright, 1, 169);  // ANSI 169 = ©
Text title = copyright + "TfNSW - My Macro";
```

Common ANSI codes: `169` = ©, `176` = °, `178` = ², `179` = ³, `181` = µ, `177` = ±.

## Model Clean Before Re-Import Pattern

When re-importing data that replaces previous results, delete existing models first using `Model_delete()`. Guard with `Model_empty()` to avoid deleting models that don't exist:

```c
Text model_name = "NSW Lot";
Model m = Get_model(model_name);
Integer is_empty = 1;
Model_empty(m, is_empty);
if(is_empty == 0)
{
    Model_delete(m);
    Print("Cleaned model: " + model_name + "\n");
}
```

**Tip:** Also clean associated label models (e.g. `"NSW Lot Labels"`). Use a `Named_Tick_Box` to let the user opt in to cleaning.

### Fixed-name working models: guard, gate, keep failures visible

A macro that chains several steps through named scratch models (QLA_FLAG_Trimesh):

- **Refuse to start** when a scratch model name already holds data: it is someone's work, or a failed earlier run.
- **Delete scratch models only after the downstream step produced output.** Judge that by counting elements in the output model, not by a return code.
- **The project-wide "delete empty models" sweep skips the output model**, so a failed run stays visible.
- **Print every deletion.**
- `Get_project_models` returns a snapshot of names, so deleting while walking it is safe (source comment).

### Temporary project changes that recover after a crash

When a macro must change the project temporarily (park rasters out of a view while plotting, draw outline models), make the change recoverable by the *next* run, not only by its own clean-up (FastPlot, `_plot.H`):

- **Encode the undo in the change itself.** Park elements in a model named after where they came from (`"FastPlot/hold/" + home_model`). `restore_rasters()` moves everything back with the batch `Set_model(Dynamic_Element, Model)` and deletes the hold model.
- **Write the list of temporary models to a `%TEMP%` file before creating any of them**, so the next start can remove them even if this run is killed.
- Run the restore at macro start, at run start and on every failure path.
- Check the names 12d will accept before relying on them: `Valid_model_name(name, valid)`, then compare `valid` with `name`.

A temporary *copy* of a view (`View_create` + `View_add_model`) does not keep the original's per-view model settings, so FastPlot moves the data out of the real view instead (claimed in its README).

## Area-Weighted Polygon Centroid (Shoelace Formula)

For polygon label placement, use the area-weighted centroid rather than a simple vertex average. The shoelace formula gives the true geometric centre:

```c
Real area2 = 0.0;
Real sum_cx = 0.0;
Real sum_cy = 0.0;
Integer vi;
for(vi = 1; vi <= ring_npts; vi = vi + 1)
{
    Real vx, vy, vz, vx2, vy2, vz2;
    Get_super_vertex_coord(elt, vi, vx, vy, vz);
    Integer next_i = vi + 1;
    if(next_i > ring_npts) next_i = 1;
    Get_super_vertex_coord(elt, next_i, vx2, vy2, vz2);
    Real cross = vx * vy2 - vx2 * vy;
    area2 = area2 + cross;
    sum_cx = sum_cx + (vx + vx2) * cross;
    sum_cy = sum_cy + (vy + vy2) * cross;
}
Real poly_area = area2;
if(poly_area < 0.0) poly_area = -poly_area;
poly_area = poly_area / 2.0;

Real cx, cy;
if(poly_area > 0.001)
{
    cx = sum_cx / (3.0 * area2);
    cy = sum_cy / (3.0 * area2);
}
else
{
    // Degenerate polygon — fall back to vertex average
}
```

**Closed ring detection:** Check if last vertex equals first (within tolerance) and exclude the duplicate before computing the centroid.

## Ray-Casting Point-in-Polygon Test

To verify a centroid or label insertion point is actually inside a concave polygon, use the ray-casting algorithm:

```c
Integer inside = 0;
Integer pj = ring_npts;
for(vi = 1; vi <= ring_npts; vi = vi + 1)
{
    Real xi, yi, zi, xj, yj, zj;
    Get_super_vertex_coord(elt, vi, xi, yi, zi);
    Get_super_vertex_coord(elt, pj, xj, yj, zj);
    Integer above_i = 0;
    if(yi > cy) above_i = 1;
    Integer above_j = 0;
    if(yj > cy) above_j = 1;
    if(above_i != above_j)
    {
        Real x_int = (xj - xi) * (cy - yi) / (yj - yi) + xi;
        if(cx < x_int) inside = 1 - inside;
    }
    pj = vi;
}
// inside == 1 means point is inside the polygon
```

If the centroid falls outside a concave polygon, shift it toward the longest edge midpoint: `cx = (cx + best_mx) / 2.0`.

## Polygon Label Auto-Sizing Based on Area

Scale text labels proportionally to polygon area for readable labelling across varying lot sizes:

```c
// Reference: 2.5m text height looks good for ~530 m² lots
Real auto_size = base_size * Sqrt(poly_area / 530.0);
if(auto_size < 1.0) auto_size = 1.0;     // minimum readable size
if(auto_size > 20.0) auto_size = 20.0;   // maximum size cap
```

Use negative `base_size` to disable auto-scaling and use a fixed text height (e.g. `-6.0` → always 6.0m).

For blocking subprocess execution, use `Create_process(..., wait=1, ...)` instead. For non-blocking with handle monitoring, use the `Create_process` overload that fills a `Process_Handle &handle` (not `Unknown`, which V15 `cc4d` rejects) and poll with `Process_exists(handle)` — on the user's next button press, since there is no timer (see "Background process checked on the next button press").

## Floating-Point Equality Pattern

Never compare floats with `==`. Use tolerance-based comparison:

```c
Integer xeqy(Real x, Real y)
{
    Real tolerance = 1.0e-6;
    if (Absolute(x - y) < tolerance) return 1;
    return 0;
}

Integer xeqy(Real x, Real y, Real tolerance)  // overload with custom tolerance
{
    if (Absolute(x - y) < tolerance) return 1;
    return 0;
}

// Usage:
if (xeqy(dist1, dist2)) { /* equal within tolerance */ }
```

## Function Overloading Pattern

12dPL supports function overloading by parameter type. Use this to write a single function name that operates on different data sources:

```c
Integer process(Model model)   { /* process single model */ }
Integer process(View view)     { /* process all models in view */ }
Integer process(Element elt)   { /* process single element */ }
```

The compiler resolves the correct overload by the first parameter type.

## Get_model_create() Shorthand

Instead of checking `Model_exists()` then calling `Get_model()` or `Create_model()`, use `Get_model_create()` for a combined get-or-create:

```c
// ✅ Simpler
Model out_model = Get_model_create(model_name);

// ❌ Verbose equivalent
Model out_model;
if(Model_exists(model_name) == MODEL_EXISTS)
    out_model = Get_model(model_name);
else
    out_model = Create_model(model_name);
```

## goto Labels for Input Retry

`goto` with labels is the standard pattern for re-prompting on invalid input in non-panel macros:

```c
model_name:
    Text name;
    if(Model_prompt("Model name", name) != 0) return;
    if(!Model_exists(name)) {
        Error_prompt("Model does not exist");
        goto model_name;
    }
```

Common label names: `model:`, `model_name:`, `tin_name:`, `text_size:`, `fname:`, `done:`

## Output Model Overwrite Pattern

When a macro writes output elements to a model and may be run multiple times, clear the output model before writing new data to prevent accumulation:

```c
Text pts_name = "XSEC_Pipes_Points";
if(Model_exists(pts_name) != 0)
    Delete_models(pts_name, 0);    // delete existing; 0 = don't redraw views
Model pts_model = Create_model(pts_name);
// ... write new elements to pts_model ...
```

Use `Delete_models(name, 0)` + `Create_model(name)` rather than iterating and deleting elements individually. The `0` flag avoids view redraws during deletion.

**Making output visible:** After creating a new model programmatically, add it to the user's current view:

```c
View_add_model(source_view, pts_model);
```

**Clearing in place instead of deleting.** When the output model may already be on a view the user arranged, delete its *contents* and keep the model, so the view goes on showing the new output with its settings intact. `Model_clean(model, 0)` does this in one call, and returns non-zero if anything in the model is locked. MultiPlot (`_boxes.H`) instead walks `Get_elements` and `Element_delete`s each element while the `Dynamic_Element` still holds them. Prefer `Model_clean`, or `Null()` the list before deleting. Redraw the view afterwards: one-argument `Element_delete` does not repaint, but `Element_delete(elt, 1)` does.

**Never add a construction model to a plotted view.** A view named in a plot sheet's `<view_to_draw>` prints every model on it, so frame outlines or markers added there end up on the PDF. Check for this and warn: MultiPlot warns at level 2.

## Output Model Skip in Element Collection

When collecting elements from all models on a view, skip the macro's own output models to avoid processing self-generated elements from previous runs:

```c
Text out_name, pts_name;
Get_data(output_model_box, out_name);
Get_data(pts_model_box, pts_name);

for(mi = 1; mi <= n_view_models; mi++)
{
    Text mname;
    Get_item(view_model_names, mi, mname);
    if(mname == out_name || mname == pts_name) continue;  // skip our output
    // ... collect elements from mname ...
}
```

Retrieve output model names *before* the collection loop so they can be used as skip filters.

## Element Identity Comparison via Uid

Compare element identity across models using `Uid` → `Text` conversion:

```c
Uid sec_uid;
Get_id(section_line, sec_uid);
Text sec_uid_txt = To_text(sec_uid);

// Later, to check if an element is the same:
Uid elt_uid;
Get_id(elt, elt_uid);
if(To_text(elt_uid) == sec_uid_txt) continue;  // same element → skip
```

This is useful for skipping a known element (e.g. the section line) when iterating source elements from a view that contains it.

**De-duplicate and exclude by Uid text.** When one element can be found two ways (picked, and matched by name), read it once. Keep a store of `To_text(uid)` values that have been claimed: never store an empty Uid, and log once when the store fills. Use the same store to exclude the section line, or the picked element itself, from other scans (potholeCards, `_trench.H`, `_intersect.H`).

## Bounding Box Pre-Filter

Use `Get_extent_x/y` for fast spatial filtering before expensive geometry operations:

```c
Real ex_min, ex_max, ey_min, ey_max;
if(Get_extent_x(elt, ex_min, ex_max) != 0) continue;
if(Get_extent_y(elt, ey_min, ey_max) != 0) continue;

// Skip if element bbox doesn't overlap region of interest (with buffer)
if(ex_max < region_xmin || ex_min > region_xmax) continue;
if(ey_max < region_ymin || ey_min > region_ymax) continue;
```

## Sign-Change Intersection Detection

To find where element geometry crosses a reference line (e.g. a cross-section), sample points along the element and detect sign changes in the signed distance to the line:

```c
Real sample_step = 0.5;  // metres
Real start_ch, end_ch;
Get_chainage(elt, start_ch);
Get_end_chainage(elt, end_ch);
Integer n_samples = (end_ch - start_ch) / sample_step;
Real actual_step = (end_ch - start_ch) / n_samples;

Real prev_sd = 0.0;
Real prev_px, prev_py, prev_pz;
Integer have_prev = 0;

for(Integer s = 0; s <= n_samples; s++)
{
    Real ch = start_ch + s * actual_step;
    Real px, py, pz, pdir;
    if(Get_position(elt, ch, px, py, pz, pdir) != 0) { have_prev = 0; continue; }

    // Signed distance from sample point to reference line
    Real sd = (px - lx1) * (-uy) + (py - ly1) * ux;

    if(have_prev && ((prev_sd > 0.0 && sd < 0.0) || (prev_sd < 0.0 && sd > 0.0)))
    {
        // Sign change → interpolate crossing point
        Real frac = Absolute(prev_sd) / (Absolute(prev_sd) + Absolute(sd));
        Real cx = prev_px + frac * (px - prev_px);
        Real cy = prev_py + frac * (py - prev_py);
        Real cz = prev_pz + frac * (pz - prev_pz);
        // cx,cy,cz is the intersection point
    }

    prev_sd = sd;
    prev_px = px; prev_py = py; prev_pz = pz;
    have_prev = 1;
}
```

This handles arcs and curves correctly (unlike vertex-to-vertex line intersection). Use `Get_position()` to sample the actual element geometry at regular chainage intervals.

### Exact polyline crossings of a vertical plane

Sampling (above) suits curves. For straight-segment strings, walk vertex to vertex and solve each segment exactly, adding the closing segment last→first when `String_closed` reports the string closed. Work in the section's frame:

```c
t  = (x - sx1) * ux + (y - sy1) * uy;        // distance along the section
sd = (x - sx1) * (-uy) + (y - sy1) * ux;     // signed offset, + = left of start->end

// Half-open rule: a vertex exactly on the plane belongs to the left side
if(sa >= 0.0) left_a = 1;
if(sb >= 0.0) left_b = 1;
if(left_a == left_b) return(0);              // no crossing; a zero-length segment never crosses
Real f = sa / (sa - sb);                     // cannot divide by zero here
```

With the half-open rule, a string passing through a vertex crosses once, and a touch from one side gives a zero-width pair. Sort crossings by `t` and pair them 1-2, 3-4. Clip each pair to the section extent only *after* pairing, so a dig straddling the section's end keeps its in-section wall. Source: potholeCards `_trench.H`.

## Trimesh Plane Section

`Trimesh_section` returns one polyline and reports a hollow solid (two loops) as "Multiple Intersection" (manual, `trimesh.md`; potholeCards README). To cut a trimesh with a vertical plane into its outline loops, do it triangle by triangle (potholeCards `_solids.H`):

1. Pre-filter: skip the solid unless the four corners of its bounding box straddle the plane (signed distances of both signs).
2. For each triangle (capped): snap |sd| < 1e-9 to 0. A vertex on the plane is a point; an edge with a sign change is interpolated. Keep only results with exactly two distinct points.
3. De-duplicate segments: an edge lying in the plane is cut by both faces that share it.
4. Chain the segments greedily with a small join tolerance (0.5 mm), flagging the loops that close.
5. Re-read the triangles when writing, rather than storing them all.

`Trimesh_closed(elt, &closed)` and `Get_trimesh_centroid(elt, &x, &y, &z)` (both 0 on success) help classify the solids.

### Sampled profiles, pinned at the features

Sample a surface at a fixed step (0.5 m), then add exact points at every crossing, feature and wall offset, so a kerb step survives the sampling. Take every level from **one** ground function — the TIN where it reaches, otherwise the draped section Z (but not |z| < 0.001) — so the pin, the stated depth and the report cannot disagree (potholeCards `_json.H`, `_features.H`, `_trench.H`).

## Circle Creation from Semicircular Arcs

Create a circle in cross-section space using `Set_super_data` with arc radii:

```c
Real radius = diameter / 2.0;
Element circle = Create_super(12, 3);  // dims 12 = z per vertex (4) + radius per vertex (8); 3 vertices
Set_super_data(circle, 1, ch - radius, centre_z, 0.0, radius, 0);  // with arc
Set_super_data(circle, 2, ch + radius, centre_z, 0.0, radius, 0);  // with arc
Set_super_data(circle, 3, ch - radius, centre_z, 0.0, 0.0, 0);    // close (straight)
```

This creates two semicircular arcs that form a closed circle. The `radius` parameter in `Set_super_data` defines the arc curvature to the next vertex.

## Parallel Array Bubble Sort

Without structs, sort multiple parallel global arrays together by swapping all fields in lockstep:

```c
for(Integer i = 1; i < g_count; i++)
{
    for(Integer j = i + 1; j <= g_count; j++)
    {
        if(g_sort_key[j] < g_sort_key[i])
        {
            Real tmp_r; Text tmp_t; Integer tmp_i;
            // Swap all fields
            tmp_r = g_sort_key[i]; g_sort_key[i] = g_sort_key[j]; g_sort_key[j] = tmp_r;
            tmp_t = g_name[i]; g_name[i] = g_name[j]; g_name[j] = tmp_t;
            tmp_r = g_value[i]; g_value[i] = g_value[j]; g_value[j] = tmp_r;
            // ... swap all other parallel arrays ...
        }
    }
}
```

Acceptable for small arrays (≤500) **when every parallel array is numeric**. For larger datasets, consider `Quick_sort()`.

**Do not use it when any of the parallel arrays is `Text`.** Swapping `Text` between array slots copies string handles around and risks leaving a dangling one behind — the failure surfaces later, somewhere else, as an `ACCESS_VIOLATION` reading `0x0`. Sort an index instead (below).

## Sorted Index Array Instead of Shuffling Parallel Arrays

Sort a separate `Integer` order array and read the data through it. Nothing in the parallel arrays ever moves, so no `Text` handle is ever copied:

```c
{
    Integer g_count;
    Real    g_chainage[MAX_UTILS];
    Text    g_name[MAX_UTILS];      // never shuffled
    Integer g_order[MAX_UTILS];     // the only array that gets sorted
}

void sort_by_chainage()
{
    Integer i;
    for(i = 1; i <= g_count; i++) g_order[i] = i;

    Integer j;
    for(i = 2; i <= g_count; i++)
    {
        Integer key = g_order[i];
        Real    kch = g_chainage[key];

        // The guard is its own statement: 12dPL does not short-circuit &&,
        // so `while(j >= 1 && g_chainage[g_order[j]] > kch)` reads index 0
        // and dies with "heap array bounds error - size=500 index=0".
        j = i - 1;
        while(j >= 1)
        {
            if(g_chainage[g_order[j]] <= kch) break;
            g_order[j + 1] = g_order[j];
            j--;
        }

        g_order[j + 1] = key;
    }
}

// Physical slot of the k-th record in sorted order
Integer ord(Integer k)
{
    if(k < 1) return(1);
    if(k > g_count) return(1);
    return(g_order[k]);
}
```

Every consumer then reads `Integer i = ord(k);` and indexes the data arrays with `i`. Insertion sort is used rather than a bubble sort because it is already O(n) on the common case of records recorded in near-order.

### Native `Quick_sort` for anything large

Insertion sort, heapsort and every other sort written in 12dPL run step by step in the interpreter, and a text comparison written with `Get_char` costs one call per character. For hundreds of rows or more, hand the keys to 12d's own sort, which does the same index-array job natively:

```c
Integer Quick_sort(Integer count, Integer index[], Text    keys[]);  // also Real, Integer
```

`index[1..count]` comes back holding the slots of `keys[]` in ascending order; `keys[]` itself is not moved. Lower-case text keys first for a case-insensitive order, and seed every `Text` slot once before the first call (an unwritten slot is a null handle).

**`Quick_sort` makes no promise about equal keys.** If equal values must keep their original order — vertices within a string, strings that share a name — fix each run of equal keys afterwards. Runs can be long (a mostly-blank column is one run), so sort the run natively too:

```c
Integer idx[MAX_ROWS];
if(Quick_sort(n, idx, keys) != 0) return;          // keep the natural order

Integer run_val[MAX_ROWS];
Integer run_idx[MAX_ROWS];
Integer s = 1;
while(s <= n)
{
    Integer e = s;
    while(e < n)
    {
        if(keys[idx[e + 1]] != keys[idx[s]]) break;  // separate test: && does not short-circuit
        e = e + 1;
    }
    if(e > s)
    {
        Integer len = e - s + 1;
        Integer j;
        for(j = 1; j <= len; j = j + 1) run_val[j] = idx[s + j - 1];
        if(Quick_sort(len, run_idx, run_val) == 0)
            for(j = 1; j <= len; j = j + 1) idx[s + j - 1] = run_val[run_idx[j]];
    }
    s = e + 1;
}
```

For **descending** order, walk the runs from the end and emit each run forwards, so ties stay in natural order in both directions. A Python port of this logic, run against a deliberately unstable stand-in for `Quick_sort`, matched a reference stable sort in 6000 random cases; the 12d `Quick_sort` itself is compile-verified on V15 but has not been timed live. Source: `Macro_Projects/VertexAttributeTable/includes/VertexAttributeTable_sort.H` (`sort_grid_rows`) and `_grid.H` (`order_indices`, for a list ordered by name).

## Seed Fixed-Size Text Arrays Before Passing Them

An unwritten `Text` slot in a fixed-size array is a **null handle, not `""`** — the same trap as an untouched `Text` output parameter, but easier to miss because the array looks initialised. Passing an array with unwritten slots into a function that indexes past the written ones reads through a null pointer inside the 12d runtime (`ACCESS_VIOLATION` reading `0x0`), and the macro compiles clean:

```c
Text tin_names[MAX_TINS];

// Initialise EVERY slot, not just the ones about to be filled.
Integer ti;
for(ti = 1; ti <= MAX_TINS; ti++) tin_names[ti] = "";

add_tin(tn1, n_tins, tin1, tin2, tin3, tin_names);   // fills 1..n_tins
print_report(section_line, sec_name, tin_names, n_tins, n_models);
```

The same applies to a helper that writes a whole table into a caller's array — write every slot up to the declared size, and keep the count in a `#define` the caller sizes its array with, so the two cannot drift apart.

## Fill Consecutive Slots When the Rest of the Macro Addresses Them by Ordinal

When optional inputs feed numbered slots (surface 1, 2, 3) and downstream code reads "slot 1 is the first surface", the slots must be packed consecutively — assigning box 2 straight into `tin2` leaves `tin1` unset whenever box 1 is blank, and sampling an unset handle is fatal:

```c
void add_tin(Text name, Integer &n, Tin &t1, Tin &t2, Tin &t3, Text names[])
{
    if(name == "") return;
    if(Tin_exists(name) == 0) return;       // ignore a name that is not a tin
    if(n >= MAX_TINS) return;

    n++;
    names[n] = name;

    if(n == 1)      t1 = Get_tin(name);
    else if(n == 2) t2 = Get_tin(name);
    else            t3 = Get_tin(name);
}
```

## Log to %TEMP% Instead of Next to the Macro

When a macro is deployed under a corporate-controlled path (e.g. `C:\ProgramData\TfNSW\...\TfNSW_Toolbars`) the folder may be read-only for the user. Log files written next to the `.4do` will then fail to open. `%TEMP%` is always writable — prefer it as the default log location:

```c
#ifdef DEBUG
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    Text log_path = temp_dir + "\\MacroName_panel_01.log";
    Integer fret = File_open(log_path, "w", "", g_log);
    if(fret == 0) { g_log_open = 1; File_write_line(g_log, "=== Log ==="); }
#endif
```

This also keeps the project folder clean — logs disappear with standard `%TEMP%` cleanup.

## Quiet-Success Logging (File-Only log_msg)

When a macro should report one line to the Output Window (success / failure summary) but capture full diagnostics for debugging, write `log_msg()` to **only** the log file — not to `Print()`:

```c
// Quiet log_msg — log file only, no Output Window noise
void log_msg(Text msg)
{
    if(g_log_open) File_write_line(g_log, msg);
}
```

Combine with a one-line summary at the end of processing:

```c
// All mid-flow status went to the log file; user sees a single summary line.
Print(To_text(count, 0) + " attributes copied.\n");
Show_console(1);
```

Contrast with the verbose `log_msg` pattern that calls both `Print(msg)` and `File_write_line()` — use that for macros where the user wants progress in the Output Window, and use the quiet version for macros where the Output Window should remain a clean one-line status display.

## Upward Folder Walk to Locate a Resource

When a resource (spreadsheet, config file) may live in the project folder or one of its ancestors, walk up by stripping trailing path components. Use `Get_char` to locate the last backslash:

```c
Text find_file_upward(Text start_folder, Text filename, Integer max_levels)
{
    // Try the start folder itself
    Text path = start_folder + "\\" + filename;
    if(File_exists(path)) return path;

    Text folder = start_folder;
    Integer level;
    for(level = 1; level <= max_levels; level = level + 1)
    {
        Integer len = Text_length(folder);
        Integer last_bs = 0;
        Integer ci;
        for(ci = len; ci >= 1; ci = ci - 1)
        {
            Integer code;
            Get_char(folder, ci, code);
            if(code == 92) { last_bs = ci; ci = 0; }   // 92 = backslash; set ci=0 to break
        }
        if(last_bs <= 1) return "";                    // reached drive root

        folder = Get_subtext(folder, 1, last_bs - 1);
        path = folder + "\\" + filename;
        if(File_exists(path)) return path;
    }
    return "";
}
```

## Recursive Attributes Tree Walk by Index

When searching or dumping an `Attributes` tree where the structure is unknown (field names unpredictable, row positions variable), iterate by INDEX rather than by name using the three-function triplet. Type code `5` marks a nested `Attributes` sub-group:

```c
// Attribute type-code constants (from SynergyMeta_globals.H)
#define ATTR_TYPE_INTEGER    1
#define ATTR_TYPE_REAL       2
#define ATTR_TYPE_TEXT       3
#define ATTR_TYPE_BLOB       4
#define ATTR_TYPE_ATTRIBUTES 5
#define ATTR_TYPE_UID        6
#define ATTR_TYPE_INTEGER64  7
#define ATTR_TYPE_GUID       8

// Deep search by name at any depth
Integer find_attr_deep(Attributes attr, Text target, Text &value)
{
    // 1) Direct lookup by name at this level — try Text, Integer, Real
    Text tval;  if(Get_attribute(attr, target, tval) == 0) { value = tval; return 0; }
    Integer iv; if(Get_attribute(attr, target, iv)   == 0) { value = To_text(iv); return 0; }
    Real rv;    if(Get_attribute(attr, target, rv)   == 0) { value = To_text(rv, 6); return 0; }

    // 2) Recurse into every Attributes sub-group by index
    Integer n = 0;
    Get_number_of_attributes(attr, n);
    Integer i;
    for(i = 1; i <= n; i = i + 1)
    {
        Integer att_type = 0;
        Get_attribute_type(attr, i, att_type);
        if(att_type == ATTR_TYPE_ATTRIBUTES)
        {
            Attributes sub;
            if(Get_attribute(attr, i, sub) == 0)
            {
                if(find_attr_deep(sub, target, value) == 0) return 0;
            }
        }
    }
    return 1;
}
```

**Safety-max iteration** for diagnostic dumps: the declared count from `Get_number_of_attributes` can occasionally understate the real number of entries. When dumping, iterate up to a safety max (e.g. 500) and bail only after N consecutive `Get_attribute_name` misses past the declared count:

```c
#define DUMP_MAX_INDEX 500
Integer misses = 0;
Integer i;
for(i = 1; i <= DUMP_MAX_INDEX; i = i + 1)
{
    Text name;
    if(Get_attribute_name(attr, i, name) != 0)
    {
        misses = misses + 1;
        if(i > declared_n && misses >= 3) break;   // end of list
        continue;
    }
    misses = 0;
    // ... dump this entry ...
}
```

A readable `attr_type_name(Integer)` helper is useful for diagnostic dumps:

```c
Text attr_type_name(Integer t)
{
    if(t == ATTR_TYPE_INTEGER)    return "Integer";
    if(t == ATTR_TYPE_REAL)       return "Real";
    if(t == ATTR_TYPE_TEXT)       return "Text";
    if(t == ATTR_TYPE_BLOB)       return "Blob";
    if(t == ATTR_TYPE_ATTRIBUTES) return "Attributes";
    if(t == ATTR_TYPE_UID)        return "Uid";
    if(t == ATTR_TYPE_INTEGER64)  return "Integer64";
    if(t == ATTR_TYPE_GUID)       return "Guid";
    return "Unknown(" + To_text(t, 0) + ")";
}
```

## SQL String Escaping for Manual_Query

Single quotes inside SQL string literals must be doubled. Use a small helper that iterates `Get_char` by position:

```c
Text escape_sql(Text input)
{
    Text result = "";
    Integer len = Text_length(input);
    Integer i;
    for(i = 1; i <= len; i = i + 1)
    {
        Integer code;
        Get_char(input, i, code);
        if(code == 39)   // single quote
            result = result + "''";
        else
            result = result + Get_subtext(input, i, i);
    }
    return result;
}
```

Apply before building `UPDATE`/`INSERT` SQL against user-supplied values:

```c
Text update_sql = "UPDATE " + table_full
    + " SET [" + col_b + "] = '" + escape_sql(new_value) + "'"
    + " WHERE [" + col_a + "] = '" + escape_sql(label) + "'";
```

## Excel ODBC Update Flow (Read, Probe, Update)

A working pattern for in-place updates on an `.xlsm` via the 64-bit Microsoft Excel ODBC driver. See reference.md "Excel ODBC Driver Gotchas" for why each step is necessary:

```c
// 1. Writable check — Excel ODBC "Operation must use an updateable query"
//    is actually a file-permission error, not SQL. Detect early.
if(check_file_writable(xlsm_path) == 0) { /* abort with a clear message */ }

// 2. Connect
Text cs = "Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ="
    + xlsm_path + ";ReadOnly=0;";
Connection conn = Create_ODBC_connection();
if(Connect(conn, cs) != 0 || Has_error(conn) != 0) { /* abort */ }

// 3. Snapshot col A/B into parallel arrays for positional lookup
Text labels[201]; Text old_vals[201]; Integer n_rows = 0;
Manual_Query rq = Create_manual_query("SELECT * FROM [" + tab + "$]");
Database_Result rr;
if(Execute(conn, rq, rr) == 0 && Has_error(conn) == 0)
{
    while(Move_next(rr) == 0 && n_rows < 200)
    {
        n_rows = n_rows + 1;
        Get_result_column(rr, 1, labels[n_rows]);
        Get_result_column(rr, 2, old_vals[n_rows]);
    }
    Close(rr);
}

// 4. Probe column A's real name (driver names it after A5's text)
Text col_a = "";
if(probe_col_a_name(conn, tab, default_candidate, col_a) != 0)
    Prompt("Enter sheet title cell text", col_a);   // user fallback

// 5. Column B is "F2" when B5 is empty in the template
Text col_b = "F2";

// 6. Emit UPDATE per target row
Text sql = "UPDATE [" + tab + "$] SET [" + col_b + "] = '" + escape_sql(val)
    + "' WHERE [" + col_a + "] = '" + escape_sql(label) + "'";
Manual_Query uq = Create_manual_query(sql);
if(Execute(conn, uq) == 0 && Has_error(conn) == 0) { /* success */ }

// 7. Always Close(conn)
Close(conn);
```

## Attribute-Cache Idempotence Pattern (Avoid Touching Hash/mtime-Tracked External Files)

When the external file is watched by a system that flags any write (e.g. 12dSynergy creates a new version on any mtime change, Git tracks the working-tree hash, etc.), the only way to avoid spurious "modified" notifications is to not open the file at all when nothing has changed. Snapshot+restore preserves content bytes but cannot roll back mtime (see `reference.md` — `Touch_file_modified_time` only moves mtime to *now*).

The pattern: cache the last-exported values under a dedicated sub-group on the project attribute root. On each run, compare the in-memory "what I'd export" against the cache. If they match, skip the file entirely.

```c
#define EXPORT_CACHE_GROUP "MyMacroLastExport"

// Compare current values against the cache; return 1 if fully matching.
Integer cache_matches(Attributes &root, Text values[])
{
    Attributes cache;
    if(Get_attribute(root, EXPORT_CACHE_GROUP, cache) != 0) return 0;

    Integer i;
    for(i = 1; i <= NUM_FIELDS; i = i + 1)
    {
        Text key = g_keys[i];
        Text nval = values[i];
        if(key == "" || nval == "") continue;

        Text cached = "";
        if(Get_attribute(cache, key, cached) != 0) return 0;
        // Trim both sides — see "Trimmed-compare rule" in odbc.md
        if(Text_justify(cached) != Text_justify(nval)) return 0;
    }
    return 1;
}

// Commit the current values to the cache after a successful write.
void write_cache(Attributes &root, Text values[])
{
    Attributes cache;
    // Load existing cache sub-group if present, so unrelated fields are preserved.
    Get_attribute(root, EXPORT_CACHE_GROUP, cache);
    Integer i;
    for(i = 1; i <= NUM_FIELDS; i = i + 1)
    {
        if(g_keys[i] == "" || values[i] == "") continue;
        Set_attribute(cache, g_keys[i], values[i]);
    }
    Set_attribute(root, EXPORT_CACHE_GROUP, cache);   // true upsert (ID 1964)
    Set_project_attributes(root);
}
```

Caller short-circuits before touching the file:

```c
if(cache_matches(root, values))
{
    Clear_console();
    Print("Synced. External file already up to date.\n");
    Show_console(1);
    return 0;
}
// ... do the real work, then write_cache(root, values);
```

Caveats and tradeoffs:
- If someone edits the external file out-of-band, the cache drifts out of sync and the macro won't repair the file until one of the source values actually changes. Acceptable when the external file is rarely hand-edited.
- The cache lives inside the 12d project itself, so it travels with checkouts/shares.
- Use with the trimmed-compare rule — never store a value in the cache with leading/trailing whitespace that the external system would silently strip.

## Binary Snapshot + Restore Pattern

For external files where content-hash identity (but not necessarily mtime) must be preserved across an ODBC or library call that perturbs internal metadata:

```c
#define XLSM_BUFFER 2000000              // 2 MB; size for your file

Integer snapshot[XLSM_BUFFER];
Integer snap_n = 0;

// Capture BEFORE touching the file
{
    File sf;
    if(File_open(path, "rb", "", sf) == 0)
    {
        snap_n = File_read(sf, XLSM_BUFFER, snapshot);   // returns count actually read
        File_close(sf);
    }
}

// ... perform ODBC work that might rewrite internal zip metadata ...

// If no real update was needed, restore the original bytes
if(no_updates_applied && snap_n > 0)
{
    File rf;
    if(File_open(path, "wb", "", rf) == 0)
    {
        File_write(rf, snap_n, snapshot);
        File_close(rf);
    }
}
```

`File_read(File, Integer length, Integer array[])` (ID 1716) returns the number of bytes actually read. `File_write(File, Integer length, Integer array[])` (ID 1718) writes that count back.

**Limit:** snapshot+restore preserves the file's content hash but NOT its mtime — the `wb` write always bumps mtime forward to *now*, and 12dPL has no API to set mtime to a specific past value. If mtime is the tracking signal (as with 12dSynergy), combine with the attribute-cache pattern above so the snapshot/restore path is rarely needed.

## Summary-Clobbering via Clear_console Before Final Print

When a macro runs inside a host that writes its own progress lines to the Output Window (e.g. the 12dSynergy plugin prints "Downloading project attributes...", "Project attributes downloaded"), call `Clear_console()` immediately before the final user-facing `Print(...)` to wipe the host's chatter and leave one clean status line:

```c
// ... macro work completes, diagnostic log_msg() went to the log file ...

Clear_console();                                   // wipes plugin chatter
Print("Synced. " + To_text(write_count, 0) + " attributes copied.\n");
Show_console(1);
```

Pair this with the Quiet-Success Logging pattern so mid-run diagnostics don't need to be in the Output Window in the first place. `Clear_console()` is safe to call at any point — it operates on the Output Window, not on the macro's own state.

## Output Window Formatted Table Report

Build tabular reports with helper functions for column alignment:

```c
Text pad_right(Text t, Integer w) { while(Text_length(t) < w) t = t + " "; return(t); }
Text pad_left(Text t, Integer w) { while(Text_length(t) < w) t = " " + t; return(t); }
Text fmt_real(Real val, Integer dp, Integer w, Integer valid)
{
    Text t;
    if(valid) t = To_text(val, dp); else t = "-";
    return(pad_left(t, w));
}
Text repeat_text(Text ch, Integer n) { Text t = ""; for(Integer i = 1; i <= n; i++) t = t + ch; return(t); }
```

Use these to build header, separator, and data rows:

```c
Clear_console();
Print(repeat_text("=", 80) + "\n");
Print("  REPORT TITLE\n");
Print(repeat_text("=", 80) + "\n");

Text hdr = pad_right("#", 4) + " | " + pad_left("Value", 10) + " | " + pad_right("Name", 20);
Print(hdr + "\n");
Print(repeat_text("-", 4) + "-+-" + repeat_text("-", 10) + "-+-" + repeat_text("-", 20) + "\n");

for(Integer i = 1; i <= count; i++)
{
    Text row = pad_left(To_text(i), 4) + " | " + fmt_real(values[i], 3, 10, 1) + " | " + pad_right(names[i], 20);
    Print(row + "\n");
}
Show_console(1);
```

## Drainage Pipe Segment Property Extraction

To get pipe properties at an intersection point on a Drainage element, find which pipe segment the point falls on by comparing chainages:

```c
// Get chainage of intersection point on the drainage element
Real dx_f, dy_f, dz_f, d_ch, d_dir, d_off;
Drop_point(elt, cx, cy, cz, dx_f, dy_f, dz_f, d_ch, d_dir, d_off);

// Find which pipe segment the point is on
Integer drain_nv;
Get_points(elt, drain_nv);
Integer pipe_idx = 1;
for(Integer dv = 1; dv <= drain_nv; dv++)
{
    Real dvx, dvy, dvz;
    Get_data(elt, dv, dvx, dvy, dvz);
    Real dv_xf, dv_yf, dv_zf, dv_ch, dv_dir, dv_off;
    Drop_point(elt, dvx, dvy, dvz, dv_xf, dv_yf, dv_zf, dv_ch, dv_dir, dv_off);
    if(d_ch >= dv_ch && dv < drain_nv) pipe_idx = dv;
}

// Query properties for that segment
Real diam;
Get_drainage_pipe_diameter(elt, pipe_idx, diam);
Real inv_lhs, inv_rhs;
Get_drainage_pipe_inverts(elt, pipe_idx, inv_lhs, inv_rhs);
Real w_top, w_bot, w_left, w_right;
Get_drainage_pipe_thickness(elt, pipe_idx, w_top, w_bot, w_left, w_right);
```

Interpolate between `inv_lhs` and `inv_rhs` for the invert level at the exact intersection chainage.

## Null Real Sentinel Detection

12dPL uses a very large value (~9.9e29) as a null/undefined sentinel for Real values. Detect this before treating elevation data as valid:

```c
#define NULL_REAL_LIMIT 1.0e20

Integer has_height = (Absolute(z) >= 0.01 && Absolute(z) < NULL_REAL_LIMIT) ? 1 : 0;
```

This guards against both zero elevations (which may be legitimately at sea level or truly missing) and the null sentinel.

## DRF Leader Creation + Override Workflow

The standard pattern for creating a DRF leader with customised appearance:

```c
Element leader;
Integer lret = DRF_leader_create(style_name, leader_text, ax, ay, hx, hy, model, leader);
if(lret == 0)
{
    // Apply size overrides
    DRF_set_override_value(leader, "text_size", text_size);
    DRF_set_override_value(leader, "arrow_size", arrow_size);
    DRF_set_override_value(leader, "hook_length", hook_length);

    // Optional: inherit element colour
    if(inherit_colour == 1)
    {
        Integer elt_colour;
        Get_colour(source_elt, elt_colour);
        DRF_set_override_value(leader, "colour", elt_colour);
        DRF_set_override_value(leader, "arrow_colour", elt_colour);
        DRF_set_override_value(leader, "text_colour", elt_colour);
    }

    DRF_recalc(leader);  // MUST recalc after setting any overrides
}
```

**CRITICAL:** Always call `DRF_recalc()` after setting overrides — without it, the leader won't update visually.

### Changing Leader Style on Existing Leaders

Use `DRF_drafting_edit_set_style()` to change the style template, then re-apply overrides:

```c
DRF_drafting_edit_set_style(new_style_name, leader);
DRF_set_override_value(leader, "text_size", text_size);
DRF_set_override_value(leader, "arrow_size", arrow_size);
DRF_set_override_value(leader, "hook_length", hook_length);
DRF_recalc(leader);
```

### Detecting Leader Elements

Use `DRF_get_leader_hook()` as a filter — it returns 0 only on leader elements:

```c
Real hx, hy;
if(DRF_get_leader_hook(elt, hx, hy) != 0) continue;  // not a leader
// elt is a leader — process it
```

### Populating Leader Styles from Project

```c
Dynamic_Text leader_styles;
Integer sret = DRF_get_leader_styles(leader_styles);
Integer n_styles;
Get_number_of_items(leader_styles, n_styles);
if(n_styles > 0)
{
    Text style_arr[n_styles];
    Integer si;
    for(si = 1; si <= n_styles; si = si + 1)
    {
        Text sname;
        Get_item(leader_styles, si, sname);
        style_arr[si] = sname;
    }
    Set_data(choice_box, n_styles, style_arr);
}
```

## Model Tree Naming Convention

Use `/` separators to create a hierarchical model tree. For example, leaders organised by asset owner and quality level:

```c
Text model_name = base_name + "/" + asset_owner + "/" + quality_level;
Model mdl = Get_model_create(model_name);
```

This creates models like `Leaders/Telstra/A`, `Leaders/Water NSW/B` visible in the 12d model tree.

### Model Tree Cleanup with Find_models

To clean all sub-models in a tree, use `Find_models()` with a wildcard, then delete in reverse order (leaves first):

```c
void clean_output_models(Text base_name)
{
    Dynamic_Text found;
    Integer n_found = Find_models(base_name + "/*", found);
    if(n_found <= 0) return;

    // Delete in reverse order (leaves first)
    Integer i;
    for(i = n_found; i >= 1; i = i - 1)
    {
        Text mname;
        Get_item(found, i, mname);
        Model mdl = Get_model(mname);
        if(Model_exists(mdl) != 0)
        {
            Model_delete(mdl);
        }
    }

    // Optionally delete the base model if empty
    Model base_mdl = Get_model(base_name);
    if(Model_exists(base_mdl) != 0)
    {
        Integer is_empty;
        Model_empty(base_mdl, is_empty);
        if(is_empty == 1) Model_delete(base_mdl);
    }
}
```

## Source_Box → Fixed Array → Null() Lock Release Pattern

When validating a `Source_Box`, copy elements to a fixed array immediately and release the dynamic array lock. This prevents 12d Model's internal element locks from being held during long processing operations:

```c
Dynamic_Element src_elts;
Integer src_vret = Validate(source_box, src_elts);
Integer n_src;
Get_number_of_items(src_elts, n_src);
if(src_vret <= 0 || n_src == 0)
{
    Null(src_elts);
    continue;
}

// Copy to fixed array
Element src_arr[n_src + 1];
Integer ci;
for(ci = 1; ci <= n_src; ci = ci + 1)
{
    Get_item(src_elts, ci, src_arr[ci]);
}
Null(src_elts);  // release locks immediately

// Now process src_arr[] freely — no locks held
```

## Handles Lock What They Point At

The Source_Box case above is one instance of a general 12d rule: **every `Element` (and, through its elements, every `Model`) a macro holds a handle to is locked** for as long as the handle lives. `Get_elements` says so in the manual ("whilst this Dynamic_Element exists, all elements with handles in it are locked"), and the same holds for a single `Element` variable. A locked model cannot be cleaned or deleted — not by the user, and not by the macro itself:

```
Model "VAT Highlight" is locked hence cannot be deleted!
```

That message (seen live) came from a macro that kept its own marker elements in globals for the whole session and then called `Delete_models` on close.

Rules:

- **Do not keep `Element`/`Model` handles in globals across events** unless the macro genuinely edits those elements later (a table that Applies back to the strings it scanned). Keep names, flags or indices instead, and look the element up when it is needed.
- **Release a handle with `Null(h)` as soon as the work is done** — `Null(Element &)`, `Null(Model &)`, `Null(Dynamic_Element &)` are all accepted by V15 `cc4d`. Do it on every return path, error paths included, in any helper that fetches one.
- **Release an undo snapshot once `Add_undo_change` has it.** Otherwise the copy stays locked until the next run.
- **Say what stays locked.** If the selection itself has to be held (it is what Apply writes to), tell the user those strings cannot be edited elsewhere until the panel closes.
- To diagnose, `Get_read_locks(Element, Integer &n)` / `Get_write_locks(Element, Integer &n)` report the lock counts on one element (manual §5.55.9; compile-accepted). `Model_clean(Model, Integer raster_mode)` returns non-zero when the model or any element in it is locked.

## Active View Model Management Pattern

After creating output models programmatically, add them to the user's active view and redraw:

```c
void add_output_models_to_view(Text base_name)
{
    Text view_name;
    if(Get_last_view(view_name) != 0) return;

    View out_view = Get_view(view_name);
    Dynamic_Text sub_models;
    Integer n = Find_models(base_name + "/*", sub_models);
    Integer i;
    for(i = 1; i <= n; i = i + 1)
    {
        Text name;
        Get_item(sub_models, i, name);
        Model mdl = Get_model(name);
        if(Model_exists(mdl) != 0)
        {
            View_add_model(out_view, mdl);
        }
    }
    View_redraw(out_view);
}
```

## Special Character Insertion via Set_char

Insert special Unicode characters by ASCII code using `Set_char()`:

```c
// Phi (Φ) symbol for diameter display: ASCII 216
Text phi = " ";
Set_char(phi, 1, 216);
Text display = phi + "300m";  // "Φ300m"
```

Common 12dPL character codes:
- 216 = Φ (diameter symbol / phi)
- 10 = newline (for `Get_char` detection)

## Nested Attribute Tree Traversal Pattern

Search for a named attribute at any nesting depth within an Attributes handle. Uses `Get_attribute_type()` by index to identify sub-groups (type 5):

```c
Integer search_nested_attr(Attributes root, Text att_name, Text &out_val)
{
    // Try direct on root
    Text val;
    if(Get_attribute(root, att_name, val) == 0 && val != "")
    {
        out_val = val;
        return(1);
    }

    // Iterate sub-groups by index
    Integer n_atts;
    Get_number_of_attributes(root, n_atts);
    Integer i;
    for(i = 1; i <= n_atts; i = i + 1)
    {
        Integer att_type;
        Get_attribute_type(root, i, att_type);
        if(att_type == 5)  // 5 = Attributes sub-group
        {
            Attributes sub;
            Get_attribute(root, i, sub);
            if(Get_attribute(sub, att_name, val) == 0 && val != "")
            {
                out_val = val;
                return(1);
            }
            // Recurse one more level
            // ...
        }
    }
    return(0);
}
```

**Attribute type codes for `Get_attribute_type()` by index:** 1=Integer, 2=Real, 3=Text, 5=Attributes sub-group. This by-index enumeration is essential for walking an attribute tree when field names are unknown.

## Per-Vertex Attribute Fallback Pattern

Try element-level attributes first, then fall back to per-vertex attributes:

```c
// Element-level attributes (shared across all vertices)
Integer elt_attr_count;
Get_number_of_attributes(elt, elt_attr_count);
if(elt_attr_count > 0)
{
    Attributes root;
    Get_attributes(elt, root);
    // search root for attribute names...
}

// Per-vertex fallback (different value at each vertex)
for(vi = 1; vi <= n_verts; vi = vi + 1)
{
    Text val;
    Integer ret = Get_super_vertex_attribute(elt, vi, "AttrName", val);
    if(ret == 0 && val != "")
    {
        // use val for this vertex
    }
}
```

## Even Chainage Calculation Pattern

Calculate the first "even" chainage after a start point (e.g. rounding to increment boundaries):

```c
Real second_ch = start_ch - Mod(start_ch, incr) + incr;
```

This rounds up `start_ch` to the next multiple of `incr`. For example, if `start_ch = 123.4` and `incr = 50.0`, then `second_ch = 150.0`.

## Negative Text Size Convention

When prompting for text size, a positive value means world/model units and a negative value means pixel units:

```c
Prompt("Text size (+ world, - pixel):", text_size);
if(text_size < 0.0) {
    text_units = 0;     // pixel
    text_size = -text_size;
} else {
    text_units = 1;     // world
}
```

## Radians to DMS Text Conversion

Convert an angle from radians to a formatted DMS (degrees, minutes, seconds) string:

```c
Real angle_rad = ...;
Real angle_deg;
Radians_to_degrees(angle_rad, angle_deg);
Integer d, m;
Real s;
Degrees_to_dms(angle_deg, d, m, s);
Text dms = To_text(d) + "^" + To_text(m) + "'" + To_text(s, "%.0lf") + "\"";
```

Note: `Radians_to_degrees()` can use the same variable for input and output (in-place conversion).

## Undo Tracking Pattern (macro's own Undo button)

> **This is not 12d's undo stack.** It is a home-grown "delete what I just created" button, and it only works for elements the macro created. For an edit made **in place** to existing elements, register it with the real 12d undo API instead so the user gets it on Edit → Undo (Ctrl+Z) like any other 12d operation — see "Single-Entry Undo for an In-Place Edit Run" below.

Track created elements in a `Dynamic_Element` to support an Undo button:

```c
Dynamic_Element undo_list;

// After creating elements:
Append(new_elt, undo_list);

// On undo button:
Integer count;
Get_number_of_items(undo_list, count);
for(Integer i = count; i >= 1; i--) {
    Element elt;
    Get_item(undo_list, i, elt);
    Element_delete(elt);
}
Null(undo_list);
```

Iterate backwards to safely delete elements in reverse creation order.

## Hide Parent / Show Child Panel Pattern

For child dialogs (e.g. About panels), hide the parent panel, show the child, then re-show the parent on close:

```c
Hide_widget(parent_panel);
Show_widget(child_panel);
// ... child event loop ...
Show_widget(parent_panel);
```

This prevents the user from interacting with the parent while the child is open.

## Panel_prompt Built-in Panel Invocation Pattern

Use `Panel_prompt()` to invoke 12d Model's built-in panels with pre-filled data. This allows macros to automate standard 12d operations (e.g. raster import, model export) without requiring the user to manually fill in panel fields:

```c
// Build SLX XML data string describing widget values
Text d;
d = d + "<widget_pages>";
d = d + "<name>create raster</name>";
d = d + "<current_page>Source Image</current_page>";
d = d + "<widget_page>";
d = d + "<name>Source Image</name>";
d = d + "<input_box><name>Image format</name><value>PNG</value></input_box>";
d = d + "<file_box><name>Raster file</name><value>" + file_path + "</value></file_box>";
d = d + "<input_box><name>Width in pixels</name><value>" + To_text(w, 0) + "</value></input_box>";
d = d + "<input_box><name>Height in pixels</name><value>" + To_text(h, 0) + "</value></input_box>";
d = d + "</widget_page>";
d = d + "</widget_pages>";

// Non-interactive: auto-run immediately
Integer ret = Panel_prompt("Create Raster Element", 0xff00, d);

// Interactive: show panel for user to review/modify
Integer ret = Panel_prompt("Create Raster Element", 0xff01, d);
```

**Interactive modes:**
- `0xff00` = auto-run (non-interactive) — executes immediately without showing the panel
- `0xff01` = show panel for user review — user can modify values and click OK

**SLX format tips:**
- Widget names in SLX must match the exact field labels in the built-in panel
- Use `<input_box>` for text fields, `<file_box>` for file paths, `<tick_box>` for checkboxes, `<xyz_box>` for coordinate groups
- Tabbed panels use `<widget_pages>` → `<widget_page>` hierarchy
- To discover widget names, use `Read_SLX(panel, data)` on a manually configured panel, or inspect `.slx` files

## Driving a Macro Panel through a Generated Chain

`Panel_prompt` reaches built-in 12d panels only. To run a **compiled library macro's** panel non-interactively, write a one-command chain to `%TEMP%` and run it with `Run_chain(path)` (0 = the chain ran). Source: `Macro_Projects/QLA_FLAG_Trimesh/includes/QLA_FLAG_Trimesh_engines.H`; the format was copied from a chain 12d wrote, and the behaviours are stated in comments rather than recorded as observed.

```xml
<xml12d xmlns="http://www.12d.com/schema/xml12d-10.0" ...><Chain><Settings>...</Settings><Commands>
 <Manual_option>
  <Panel_Data><screen_layout><macro_panel>
    <name>$USER_LIB\SomeMacro.4do</name>
    <flags><flag>-close_on_exit</flag><flag>-no_console</flag></flags>
    <panel><name>Panel Title</name> ...widget values, raw nested XML... </panel>
  </macro_panel></screen_layout></Panel_Data>
  <Panel_Name>Panel Title</Panel_Name>
  <Buttons><Button><Name>Read</Name><Order>0</Order></Button> ...</Buttons>
 </Manual_option>
</Commands></Chain></xml12d>
```

- The `<Buttons>` list is how the chain drives the panel: it presses them in `Order`. QLA lists both `Read` and `&amp;Read`.
- Panel data is raw nested XML, not escaped, which is how 12d writes and reads it.
- Widget and column names must match exactly, trailing spaces included.
- 12d writes chains as UTF-16: open with `"ccs=UNICODE"`, falling back to `""`.
- Check every `File_write_line` and the `File_close` before calling `Run_chain` (QLA's writer does not yet).
- Afterwards, verify the step by its output (an element count), not by the return code alone.

Source and target boxes use the SLX form in reference.md ("Source and target boxes in SLX").

## Longest-Edge Text Alignment for Polygon Labels

When placing text labels inside polygons, align the text angle to the longest edge for best readability:

```c
Real max_len_sq = 0.0;
Real best_dx = 1.0;
Real best_dy = 0.0;
Integer vi;
for(vi = 1; vi <= ring_npts; vi = vi + 1)
{
    Real x1, y1, z1, x2, y2, z2;
    Get_super_vertex_coord(elt, vi, x1, y1, z1);
    Integer next_vi = vi + 1;
    if(next_vi > ring_npts) next_vi = 1;
    Get_super_vertex_coord(elt, next_vi, x2, y2, z2);
    Real edx = x2 - x1;
    Real edy = y2 - y1;
    Real len_sq = edx * edx + edy * edy;
    if(len_sq > max_len_sq)
    {
        max_len_sq = len_sq;
        best_dx = edx;
        best_dy = edy;
    }
}
Real ang = Atan2(best_dy, best_dx);
// Keep text readable: normalise to [-PI/2, PI/2]
if(ang > HALF_PI) ang = ang - HALF_PI - HALF_PI;
if(ang < -HALF_PI) ang = ang + HALF_PI + HALF_PI;
```

Combine with area-weighted centroid and ray-casting PIP test for complete polygon label placement.

## Bounding Box from Picked Element

Compute a bounding box by iterating an element's vertices, useful for defining a spatial query extent:

```c
Integer npts;
Get_points(picked, npts);
Real vx, vy, vz;
Get_super_vertex_coord(picked, 1, vx, vy, vz);
Real xmin = vx, xmax = vx, ymin = vy, ymax = vy;
Integer vi;
for(vi = 2; vi <= npts; vi = vi + 1)
{
    Get_super_vertex_coord(picked, vi, vx, vy, vz);
    if(vx < xmin) xmin = vx;
    if(vx > xmax) xmax = vx;
    if(vy < ymin) ymin = vy;
    if(vy > ymax) ymax = vy;
}
```

Store in global variables (`g_bb_xmin`, etc.) and display in a `Message_Box` for user feedback.

## Conditional Compilation Pattern

Use `#if` / `#else` / `#endif` to switch between alternative implementations:

```c
#if 1
    Select_Box select_box = Create_select_box("Pick", "Select element", SELECT_STRING, message);
#else
    Select_Button string_pick = Create_select_button("Pick", SELECT_STRING, message);
#endif
```

Toggle the `#if` value between `1` and `0` to swap implementations. Useful during development when evaluating different UI approaches.

## Column-Grid Layout Pattern

Display a legend or catalog in a multi-column grid layout:

```c
Integer page_size = 20;
Integer columns = count / page_size + 1;
Real x_start = 0.0;

for(Integer col = 1; col <= columns; col++) {
    Real x_pos = x_start + (col - 1) * column_width;
    for(Integer row = 1; row <= page_size; row++) {
        Integer idx = (col - 1) * page_size + row;
        if(idx > count) break;
        Real y_pos = y_start - (row - 1) * row_height;
        // Create text label and sample line at (x_pos, y_pos)
        Element label = Create_text(item_name, x_pos, y_pos, text_size, colour);
        Element sample = Create_2d(2);
        Set_2d_data(sample, 1, x_pos + label_offset, y_pos);
        Set_2d_data(sample, 2, x_pos + label_offset + line_length, y_pos);
        Set_style(sample, item_name);
    }
}
```

## File-Based Debug Logging Pattern

When you need persistent debug output for a long-running macro (longer than the console window), open a log file at startup gated by `#ifdef DEBUG` and route every diagnostic through a single `log_msg()` helper. This complements the inline `PRINTD()` macro pattern but writes to disk so you can inspect it after the macro exits.

**Globals header:**

```c
#define DEBUG 1   // comment out for release
{
    File g_log;
    Integer g_log_open = 0;
}
void log_msg(Text msg);   // forward decl
```

**`log_msg()` in utils.H:**

```c
void log_msg(Text msg)
{
    Print(msg);                       // always to console
#ifdef DEBUG
    if(g_log_open)
    {
        // Strip trailing \n — File_write_line adds its own
        Integer len = Text_length(msg);
        if(len > 0)
        {
            Integer last;
            Get_char(msg, len, last);
            if(last == 10) msg = Get_subtext(msg, 1, len - 1);
        }
        File_write_line(g_log, msg);
    }
#endif
}
```

**Open/close in `main()`:**

```c
#ifdef DEBUG
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    if(temp_dir == "") temp_dir = ".";
    Text log_path = temp_dir + "\\MacroName_panel_01.log";
    if(File_open(log_path, "w", "", g_log) == 0) g_log_open = 1;
#endif
    // ... main body using log_msg() ...
#ifdef DEBUG
    if(g_log_open) { File_close(g_log); g_log_open = 0; }
#endif
```

**Write the log to `%TEMP%`, not beside the `.4do`.** An earlier version of this snippet derived the path from `Get_macro_name()` (the `.4do` path, extension stripped), and MultiPlot still does. The workspace rule is TEMP: a deployed `.4do` often sits in a read-only corporate library folder (see "Log to %TEMP% Instead of Next to the Macro"). Default `log_msg` to the file only, with `File_flush(g_log)` after each `File_write_line` so a crash still leaves the last lines (see "Quiet-Success Logging"). Without `#ifdef DEBUG`, both the file open and the `if(g_log_open)` check compile out cleanly so release builds pay zero cost.

## XML Helpers — `xml_escape`, `xml_unescape`, `extract_tag_value`

For macros that emit or rewrite XML files **without** going through the formal `Create_XML_document` / `Write_XML_document` DOM API (which is much heavier and not always wanted for simple line-oriented files like `.12dmpsf`), keep three small helpers in your utils header:

```c
// Escape the four XML predefined entities. Order doesn't matter
// here because we walk character-by-character.
Text xml_escape(Text src)
{
    Text result = "";
    Integer len = Text_length(src);
    Integer i;
    for(i = 1; i <= len; i = i + 1)
    {
        Integer code;
        Get_char(src, i, code);
        if(code == 38)       result = result + "&amp;";    // &
        else if(code == 60)  result = result + "&lt;";     // <
        else if(code == 62)  result = result + "&gt;";     // >
        else if(code == 34)  result = result + "&quot;";   // "
        else result = result + Get_subtext(src, i, i);
    }
    return(result);
}

// Reverse common XML escaping. Order MATTERS — &amp; must be last so
// content like "&amp;lt;" doesn't get double-unescaped to "<".
Text xml_unescape(Text t)
{
    Text result = t;
    Integer pos;
    pos = Find_text(result, "&lt;");
    while(pos > 0) { result = Get_subtext(result, 1, pos - 1) + "<" + Get_subtext(result, pos + 4, 9999); pos = Find_text(result, "&lt;"); }
    pos = Find_text(result, "&gt;");
    while(pos > 0) { result = Get_subtext(result, 1, pos - 1) + ">" + Get_subtext(result, pos + 4, 9999); pos = Find_text(result, "&gt;"); }
    pos = Find_text(result, "&quot;");
    while(pos > 0) { result = Get_subtext(result, 1, pos - 1) + "\"" + Get_subtext(result, pos + 6, 9999); pos = Find_text(result, "&quot;"); }
    pos = Find_text(result, "&amp;");
    while(pos > 0) { result = Get_subtext(result, 1, pos - 1) + "&" + Get_subtext(result, pos + 5, 9999); pos = Find_text(result, "&amp;"); }
    return(result);
}

// Extract the inner text of <tag>...</tag> when both open and close
// fit on a single line. Returns 1 on hit, 0 on miss.
Integer extract_tag_value(Text line, Text tag, Text &value)
{
    Text open_tag  = "<" + tag + ">";
    Text close_tag = "</" + tag + ">";
    Integer p1 = Find_text(line, open_tag);
    if(p1 == 0) return(0);
    Integer p2 = Find_text(line, close_tag);
    if(p2 == 0) return(0);
    Integer val_start = p1 + Text_length(open_tag);
    Integer val_end   = p2 - 1;
    if(val_end < val_start) { value = ""; return(1); }
    value = Get_subtext(line, val_start, val_end);
    return(1);
}
```

`extract_tag_value` is single-line only by design — it does not handle `<tag>` and `</tag>` on separate lines. For 12d's pretty-printed XML files this is almost always sufficient because each leaf value sits on its own line.

## Self-Closing XML Tag Gotcha — Search With `<tag` Not `<tag>`

When 12d Model writes an XML file and a leaf element is empty, it usually emits the **self-closing form** `<user_variable/>` instead of the open/close pair `<user_variable></user_variable>`. If you scan the file looking for value lines with `Find_text(line, "<user_variable>") > 0`, the self-closing form is **silently skipped** — the substring `<user_variable>` (with trailing `>`) does not appear in `<user_variable/>`.

**Symptom:** a line-based rewriter that walks the values block, replaces `<user_variable>...</user_variable>` lines, and counts entries will undercount when 12d has stripped some empties to self-closing form. The replacement loop processes the wrong number of slots, and any post-loop padding logic mis-aligns.

**Fix:** drop the trailing `>` from the search pattern — match `<user_variable` instead. That substring is present in both `<user_variable>...` and `<user_variable/>`, and crucially it is **not** present in `</user_variables_value>` (which starts with `</`), so the close tag of the surrounding block is not mistakenly matched.

```c
// WRONG — misses self-closing <user_variable/>
if(Find_text(cur, "<user_variable>") > 0) { ... }

// RIGHT — catches both forms, safe vs </user_variables_value>
if(Find_text(cur, "<user_variable") > 0) { ... }
```

## 12d "Drops Empty Values" Workaround — Write `" "` Not `""`

When 12d Model loads an XML file (e.g. `.12dmpsf`), edits it via the GUI, and saves it back, it removes leaf elements whose text content is the empty string. A `<user_variable></user_variable>` from your emitter becomes `<user_variable/>` on the next round-trip, and on the round-trip after that 12d may drop the entry entirely from the values block — which corrupts positional alignment with the names block (see the next section).

**Defence:** when writing a value that is logically empty, emit a single space instead of an empty string. 12d treats `" "` as non-empty and preserves it across save cycles.

```c
Text out_v = xml_escape(uv[i]);
if(out_v == "") out_v = " ";   // prevent 12d from dropping this slot
File_write_line(f, "<user_variable>" + out_v + "</user_variable>");
```

Apply this to every leaf you write whose content might legitimately be empty, not just user variables. The cost is one space character; the benefit is round-trip stability.

## Manual Line-Based XML Rewriter Pattern

For files where you only need to replace a small, well-bounded section of the XML (e.g. update one block of values without touching the rest), a manual two-phase line walker is much simpler than the full DOM API and preserves the file's exact formatting, comments, and whitespace.

**Two-phase rewrite (read all → write back):**

```c
Integer update_block(Text path, Text new_values[])
{
    // Phase 1: slurp the whole file
    File fin;
    if(open_file_read(path, fin) != 0) return(1);
    Dynamic_Text lines;
    Text line;
    while(File_read_line(fin, line) == 0) Append(line, lines);
    File_close(fin);

    Integer n_lines;
    Get_number_of_items(lines, n_lines);
    if(n_lines == 0) return(2);

    // Phase 2: write back, replacing the target block in place
    File fout;
    if(File_open(path, "w", "", fout) != 0) return(3);

    Integer in_block = 0;
    Integer val_idx = 0;
    Integer li;
    for(li = 1; li <= n_lines; li = li + 1)
    {
        Text cur;
        Get_item(lines, li, cur);

        if(in_block == 0)
        {
            File_write_line(fout, cur);
            if(Find_text(cur, "<my_block>") > 0)
            {
                in_block = 1;
                val_idx = 0;
            }
        }
        else
        {
            if(Find_text(cur, "</my_block>") > 0)
            {
                // Pad missing slots before the close tag so 12d-stripped
                // entries get re-added (see "Drops Empty Values" above)
                Integer pi;
                for(pi = val_idx + 1; pi <= EXPECTED_COUNT; pi = pi + 1)
                {
                    Text pad = xml_escape(new_values[pi]);
                    if(pad == "") pad = " ";
                    File_write_line(fout, "    <leaf>" + pad + "</leaf>");
                }
                File_write_line(fout, cur);
                in_block = 0;
            }
            else if(Find_text(cur, "<leaf") > 0)   // catches <leaf> AND <leaf/>
            {
                val_idx = val_idx + 1;
                if(val_idx <= EXPECTED_COUNT)
                {
                    Text out_v = xml_escape(new_values[val_idx]);
                    if(out_v == "") out_v = " ";
                    File_write_line(fout, "    <leaf>" + out_v + "</leaf>");
                }
                // val_idx > EXPECTED_COUNT: DROP — do not write through
                // (see "Stale Extras Cleanup" below)
            }
            else
            {
                File_write_line(fout, cur);
            }
        }
    }
    File_close(fout);
    return(0);
}
```

**Key invariants:**

1. **Phase separation matters** — if you try to read and write the same path simultaneously you'll truncate the file mid-read. Slurp first, close, then re-open for write.
2. **`Dynamic_Text` not array** — file size is not known up front; `Append()` into a `Dynamic_Text` and use `Get_number_of_items` after.
3. **State machine is one bit per nesting level** — for simple block replacement, `Integer in_block` is enough. For overlapping or sibling blocks, use multiple flags (see [includes/MultiPlot_utils.H](../Macro_Projects/MultiPlot/includes/MultiPlot_utils.H) `load_user_variables` for `in_set`/`in_names`/`in_values`).

### Read and write back in the file's own encoding

`File_open` with a non-blank ccs lets an existing file's BOM decide the encoding, and **a BOM-less file opened with `"ccs=UNICODE"` is read as UTF-16LE — the open does not fail** (manual table, `io-files.md`). So a read helper that tries `UNICODE`, then `UTF-8`, then `""` only falls back on a *failed* open, never on a wrong encoding. And a rewrite that reads a 12d-written UTF-16 file but writes it back with `""` (ANSI, no BOM) drops the BOM and any non-cp1252 characters — after which the next `UNICODE` read decodes it as UTF-16LE.

- Read with `"ccs=UTF-8"`: no BOM → UTF-8, a UTF-16 BOM still → UTF-16LE.
- Remember which ccs the file was read with, and write it back with the same one.
- 12d's own `.12dmpsf` and chain files are UTF-16 (FastPlot and QLA_FLAG_Trimesh source comments).

Manual-derived: `Macro_Projects/MultiPlot` reads `UNICODE` first and writes rewrites back with `""`, which exposes it to exactly this; it has not been observed failing live.

### Replace whole blocks, with an id range per writer

When a rewrite replaces whole sub-trees (every `<chapter>` of a plot sheet, say) rather than single leaves:

1. Pre-scan the slurped lines, recording each target block's start and end line. Check both were found and are in order before writing anything.
2. Write: lines before the first block, the new block, the untouched lines between blocks, the next new block, then the rest.
3. Give each writer its **own id range** (10001, 20001, 30001 ...), so newly generated shapes cannot collide with ids kept in the blocks that were not rewritten.
4. Rename only names the macro generated (`"Sheet N"`, `"Page N"`), keep names the user changed, and keep the original indentation.

Watch for a tag whose meaning depends on its parent. In `.12dmpsf`, the `<name>` that follows `<chapter>` is the chapter name, not a page name: set a flag on `<chapter>` and take the next `<name>`. Source: MultiPlot (`_sync.H`, panel).

## Stale Extras Cleanup — Drop, Don't Write Through

When a block has a fixed expected entry count (e.g. exactly 20 user variables) but a previous broken write left the block with extras (e.g. 25 entries), the rewriter must **drop** the surplus entries, not write them through. Otherwise the count never recovers and downstream readers that check `len(values) == len(names)` will reject the whole block.

**Wrong** (lets corruption persist):

```c
val_idx = val_idx + 1;
if(val_idx <= EXPECTED_COUNT)
    File_write_line(fout, "    <leaf>" + new_value + "</leaf>");
else
    File_write_line(fout, cur);   // ← writes leftover #21..#25 through, corruption sticks
```

**Right** (cleans up on next pass):

```c
val_idx = val_idx + 1;
if(val_idx <= EXPECTED_COUNT)
    File_write_line(fout, "    <leaf>" + new_value + "</leaf>");
// else: silently drop — surplus entries are removed from the file
```

Real-world example: 12d Model's GUI parser refuses to bind any user-variable value to its display field when `count(<user_variables_value>)` does not exactly equal `count(<user_variables_name>)`. The plotter is more lenient (it iterates by `<user_variables_set>` indices and ignores extras), so you can have a file that PDFs correctly but appears completely empty in the multi-plot sheet GUI. Always normalise count on write.

## Per-Block Context Tracking During Line Rewrite

Sometimes a value to write into block B depends on data parsed from a sibling block A that appeared earlier in the file. Track that data in a few extra state variables as you scan, and consult them when emitting the dependent block.

Example from MultiPlot: each `<page>` contains a `<plan_frame>` (with its own `<scale>`) followed by a `<title_block>` (with a `<user_variables_value>` block whose slot 17 should display *that page's* scale, not a global one).

```c
Integer in_plan_frame = 0;
Text current_scale = "";

for(li = 1; li <= n_lines; li = li + 1)
{
    Text cur;
    Get_item(lines, li, cur);

    if(in_values == 0)
    {
        // Update tracking state as we walk the file
        if(Find_text(cur, "<plan_frame>") > 0)       in_plan_frame = 1;
        else if(Find_text(cur, "</plan_frame>") > 0) in_plan_frame = 0;
        else if(in_plan_frame == 1)
        {
            Text sv;
            if(extract_tag_value(cur, "scale", sv) == 1)
                current_scale = sv;   // freshest plan_frame scale
        }
        File_write_line(fout, cur);
        // ... block-open detection ...
    }
    else
    {
        // Inside <user_variables_value> — when writing the SCALE slot,
        // override with the most recently seen plan_frame scale instead
        // of using the global new_values[17].
        if(val_idx == 17 && current_scale != "")
            out_v = "1:" + current_scale;
        else
            out_v = xml_escape(new_values[val_idx]);
        // ... emit ...
    }
}
```

The trick is that **state must only update outside the target block**, otherwise you'd capture the title_block's own (unrelated) `<scale>1000</scale>` entry. Gating the update with `if(in_values == 0)` and a `in_plan_frame` flag confines tracking to the right XML region.

## Single-File-Box Multi-Tab Panel Pattern

For panels where every workflow tab operates on the **same** file (e.g. an XML config you're creating, editing, and maintaining), put **one** `File_Box` outside the `Tab_Box` and have every handler validate it with the appropriate flag. Do not put one file box per tab — users will set them inconsistently and not notice.

```c
Panel panel = Create_panel("My Tool");
Colour_Message_Box message = Create_colour_message_box("Ready");

// === Shared file box, OUTSIDE the tabs ===
Vertical_Group file_vg = Create_vertical_group(0);
Set_border(file_vg, "File (used by every tab)");
File_Box file_box = Create_file_box("File", message, 14, "*.xml");
Append(file_box, file_vg);

// === Tab 1: Create — needs a NEW or existing path ===
// ... handler validates with GET_FILE_CREATE (accepts NO_FILE | FILE_EXISTS)

// === Tab 2: Edit — must point at an existing file ===
// ... handler validates with GET_FILE_MUST_EXIST

Tab_Box tab_box = Create_tab_box();
Append(create_tab, "Create New",    tab_box);
Append(edit_tab,   "Edit Existing", tab_box);
Append(maint_tab,  "Maintenance",   tab_box);

Vertical_Group main_vg = Create_vertical_group(0);
Append(message, main_vg);
Append(file_vg, main_vg);     // shared header above tabs
Append(tab_box, main_vg);
```

The `File_Box` creation mode (`14` = create) sets the *default* validation behaviour. Each handler can re-validate the same widget with a different flag at runtime:

```c
case Get_id(generate_btn) : {
    Text path;
    Integer r = Validate(file_box, GET_FILE_CREATE, path);     // new OR existing
    if(r != NO_FILE && r != FILE_EXISTS) { /* error */ continue; }
    // ...
}

case Get_id(load_btn) : {
    Text path;
    Integer r = Validate(file_box, GET_FILE_MUST_EXIST, path); // existing only
    if(r != FILE_EXISTS) { /* error */ continue; }
    // ...
}
```

When tabs need their *own* set of input boxes for the same logical fields (e.g. a Create tab and an Edit tab both showing "Drawing Title"), give each its own widgets and prefix the names (`model_name_box` vs `e_model_name_box`). Loading from file populates the Edit-tab widgets; the Create-tab widgets stay independent. This eliminates the "did Load fill the right boxes?" confusion users get when a single set of fields is shared across workflows.

## Corporate / TfNSW User Identification via Getenv

Detect whether a macro is running under a TfNSW (or other corporate) Windows account purely from environment variables — no `cmd`, `whoami`, or `Create_process` call required. Useful for tailoring the panel welcome message, logging the runtime context, or branching on corporate-only behaviours.

```c
Integer check_tfnsw_user(Text &user_name, Text &domain)
{
    user_name = Getenv("USERNAME");

    Text dns      = Getenv("USERDNSDOMAIN");   // e.g. corp.trans.internal
    Text netbios  = Getenv("USERDOMAIN");      // e.g. CORP, TFNSW
    Text logonsrv = Getenv("LOGONSERVER");     // e.g. \\TRANS-DC01

    if(dns != "") domain = dns;
    else          domain = netbios;

    Text dns_l = Text_lower(dns);
    Text nb_l  = Text_lower(netbios);
    Text ls_l  = Text_lower(logonsrv);

    if(Find_text(dns_l, "tfnsw") > 0)               return(1);
    if(Find_text(dns_l, "transport.nsw") > 0)       return(1);
    if(Find_text(dns_l, "corp.trans.internal") > 0) return(1);
    if(Find_text(dns_l, "trans.internal") > 0)      return(1);
    if(Find_text(nb_l,  "tfnsw") > 0)               return(1);
    if(Find_text(nb_l,  "transport") > 0)           return(1);
    if(Find_text(nb_l,  "corp") > 0)                return(1);
    if(Find_text(ls_l,  "tfnsw") > 0)               return(1);
    if(Find_text(ls_l,  "trans") > 0)               return(1);

    return(0);
}
```

**Verified env vars on TfNSW machines:** `USERDNSDOMAIN` is `corp.trans.internal` (preferred — most specific). `USERDOMAIN` typically `CORP`. `USERNAME` is the SAM account name.

**Important — never display the result in shared output.** The check is fine for runtime behaviour (e.g. setting a Welcome message in the panel `Message_Box`, writing the user/domain to the macro's `g_log` file, branching on corporate-only behaviour). Do NOT render `User: <name>` / `Domain: <domain>` / "verified" badges in any HTML report or output that the user might share or attach to a deliverable. Generated documents should be context-free so they can be reused without revealing the running operator.

## HTML Help Generation + Browser Open Pattern

For multi-tab panels with non-trivial workflow, ship an in-app **Help** button that generates a self-contained HTML reference and opens it in the user's default browser. The HTML lives in `%TEMP%`, is regenerated each time, and is shareable.

```c
//---------------------------------------------------------------------
// hwl - one-line shortcut for File_write_line, used heavily by the
// HTML emitter to keep generate_help_html() readable.
//---------------------------------------------------------------------
void hwl(File f, Text line)
{
    File_write_line(f, line);
}

Integer generate_help_html(Text out_path)
{
    File f;
    Integer fret = File_open(out_path, "w", "", f);
    if(fret != 0) return(fret);

    hwl(f, "<!DOCTYPE html>");
    hwl(f, "<html lang=\"en\"><head><meta charset=\"UTF-8\">");
    hwl(f, "<title>My Macro - Help</title>");
    hwl(f, "<style>");
    hwl(f, "body{font-family:Segoe UI,Arial,sans-serif;max-width:1080px;margin:24px auto;padding:0 24px;}");
    hwl(f, "h1{color:#00467f;}h2{color:#00467f;border-bottom:1px solid #cfd8e3;}");
    hwl(f, "table{border-collapse:collapse;width:100%;}th,td{border:1px solid #d6dde5;padding:6px 10px;}");
    hwl(f, "code{background:#f4f6f8;padding:1px 5px;border-radius:3px;}");
    hwl(f, "</style></head><body>");
    hwl(f, "<h1>My Macro</h1>");
    hwl(f, "<p>&copy; Transport for NSW</p>");
    // ... emit body sections ...
    hwl(f, "</body></html>");

    File_close(f);
    return(0);
}

void show_help_doc(Panel panel, Message_Box msg)
{
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    if(temp_dir == "") temp_dir = ".";

    Text help_path = temp_dir + "\\MyMacro_Help.html";

    Integer gret = generate_help_html(help_path);
    if(gret != 0)
    {
        Set_data(msg, "Could not write help file to " + help_path);
        return;
    }

    // Shell_execute "open" routes .html to the OS default browser
    Integer rc = Shell_execute(panel, "open", help_path, "", "", 1);
    if(rc != 0) Set_data(msg, "Help written to " + help_path + " (open it manually)");
    else        Set_data(msg, "Help opened in browser");
}

// In the event loop:
case Get_id(help_btn) : { show_help_doc(panel, message); } break;
```

**Conventions:**
- Use HTML entities (`&copy;`, `&Oslash;`, `&hellip;`, `&mdash;`) for special characters rather than embedding multi-byte UTF-8 in source literals (which 12dPL handles unreliably).
- Open with `File_open(path, "w", "", f)` — the empty `ccs` writes ANSI text, sufficient for entity-escaped HTML.
- Regenerate every click — `"w"` mode truncates, so the HTML is always current.
- Pass the existing panel as the `Shell_execute` first arg; it owns the spawned process.

## Inline SVG Annotated Panel Mock-ups in HTML Help

Real screenshots aren't available from inside a macro, but inline SVG mock-ups with numbered callouts give the same effect — and stay self-contained in a single HTML file. Build small per-widget helper functions that emit SVG fragments at given y-positions, then assemble each tab as a stack of widget rows with a numbered legend table beneath.

```c
//---------------------------------------------------------------------
// SVG widget helpers. Coordinates: panel inner x = 60..440,
// callout circles at x = 475. Each widget row consumes 28 px of height.
//---------------------------------------------------------------------
void svg_callout(File f, Integer y, Integer num)
{
    Text yc = To_text(y + 10);
    Text yt = To_text(y + 14);
    hwl(f, "<circle cx=\"475\" cy=\"" + yc + "\" r=\"11\" fill=\"#d62828\" stroke=\"#fff\" stroke-width=\"2\"/>");
    hwl(f, "<text x=\"475\" y=\"" + yt + "\" text-anchor=\"middle\" font-family=\"Segoe UI\" font-size=\"11\" fill=\"#fff\" font-weight=\"700\">" + To_text(num) + "</text>");
}

void svg_field(File f, Integer y, Integer num, Text label, Text value)
{
    Text ys = To_text(y);
    Text yt = To_text(y + 14);
    hwl(f, "<text x=\"60\" y=\"" + yt + "\" font-family=\"Segoe UI\" font-size=\"11\">" + label + "</text>");
    hwl(f, "<rect x=\"190\" y=\"" + ys + "\" width=\"250\" height=\"20\" fill=\"#fff\" stroke=\"#aab\"/>");
    hwl(f, "<text x=\"196\" y=\"" + yt + "\" font-family=\"Consolas\" font-size=\"11\" fill=\"#444\">" + value + "</text>");
    svg_callout(f, y, num);
}

void svg_button(File f, Integer y, Integer num, Integer x, Integer w, Text label)
{
    Text xc = To_text(x + w / 2);
    hwl(f, "<rect x=\"" + To_text(x) + "\" y=\"" + To_text(y) + "\" width=\"" + To_text(w) + "\" height=\"22\" rx=\"3\" fill=\"#e8eef4\" stroke=\"#7a8da0\"/>");
    hwl(f, "<text x=\"" + xc + "\" y=\"" + To_text(y + 15) + "\" text-anchor=\"middle\" font-family=\"Segoe UI\" font-size=\"11\" font-weight=\"600\">" + label + "</text>");
    svg_callout(f, y, num);
}
// (svg_choice, svg_tick, svg_message, svg_section similar — see
//  Macro_Projects/Leaders/includes/Vertex_leaders_help.H for full set.)

void svg_open(File f, Integer height, Integer active_tab)
{
    hwl(f, "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"540\" height=\"" + To_text(height) + "\">");
    hwl(f, "<rect x=\"40\" y=\"22\" width=\"460\" height=\"" + To_text(height - 32) + "\" fill=\"#fafbfc\" stroke=\"#9aa6b2\"/>");
    // ... draw tab strip with active_tab highlighted ...
}
void svg_close(File f) { hwl(f, "</svg>"); }
```

Then in the help generator, build a tab section as: a `<div>` wrapper, an SVG mock with numbered callouts, a centered caption, and a numbered legend table:

```c
hwl(f, "<div class=\"panelwrap\">");
svg_open(f, 380, 1);                                  // 380 px tall, tab 1 active
svg_field (f,  64, 1, "Source",       "Water_Strings");
svg_field (f,  92, 2, "Output Model", "Leaders");
svg_choice(f, 120, 3, "Style",        "Arial Border");
svg_tick  (f, 148, 4, "Clean first",  1);
svg_button(f, 178, 5, 190, 160, "Create");
svg_close(f);
hwl(f, "</div>");

hwl(f, "<table>");
hwl(f, "<tr><th>#</th><th>Widget</th><th>Description</th></tr>");
hwl(f, "<tr><td><span class=\"cnum\">1</span></td><td>Source</td><td>...</td></tr>");
// ...
hwl(f, "</table>");
```

CSS for the numbered callouts in the legend (matches the SVG circle):

```css
.cnum{display:inline-block;width:22px;height:22px;line-height:22px;
      border-radius:11px;background:#d62828;color:#fff;
      text-align:center;font-weight:700;font-size:12px;}
```

Browsers render inline SVG natively — no images, no external files, no MIME issues. Mock-ups stay synchronised with the panel because the same code that knows the layout draws the diagram.

## cc4d Per-Line String Length Limit — Split Long String Literals

The 12dPL compiler `cc4d.exe` has a per-line parser limit and chokes on very long single string literals with a misleading `"syntax error - giving up"` message. The exact threshold isn't published but failures begin around 600 characters of source per line.

```c
// FAILS — single ~620-char literal triggers "syntax error - giving up"
hwl(f, "<tr><td>Skip</td><td><code>DP*</code>, <code>PGAT*</code>, <code>PGUL*</code>, ... <code>WT*</code></td><td>Point features.</td></tr>");

// WORKS — split across multiple File_write_line / hwl calls.
// HTML treats adjacent text as a single run (whitespace collapses)
// so the rendered output is identical.
hwl(f, "<tr><td>Skip</td><td>");
hwl(f, "<code>DP*</code>, <code>PGAT*</code>, <code>PGUL*</code>, <code>PJBX*</code>, ");
hwl(f, "<code>TS*</code>, <code>POFM*</code>, <code>PTTP*</code>, <code>POFP*</code>, ");
hwl(f, "<code>PT3P*</code>, <code>PTDP*</code>, <code>PTMP*</code>, <code>PTPL*</code>");
hwl(f, "</td><td>Point features.</td></tr>");
```

The error reports a column number on the offending line — if the column points well past where you can see anything wrong, suspect length. The same trick applies to long SQL queries, long XML/SLX payloads passed to `Panel_prompt`, or any other long literal. Build long values as `Text x = "a"; x = x + "b"; ...` if you need a single Text variable rather than streaming directly to a file.

## Validate-Context-Required Guard in Text Builders

When a function builds a label / description from optional fields, return `""` early if no "context" attribute is present — even when an isolated value (e.g. a diameter, a number) would otherwise produce non-empty output. Callers already check `if(text == "") continue;` and will skip silently, which is the correct behaviour: a leader showing only `Ø125mm` with no owner / type / material / depth / QL is meaningless.

```c
Text build_leader_text(Text display_names[], Text values[])
{
    Integer has_owner = is_valid_value(values[1]);  // AssetOwner
    Integer has_diam  = is_valid_value(values[2]);  // PipeDiameter
    Integer has_conf  = is_valid_value(values[3]);  // Configuration
    Integer has_depth = is_valid_value(values[4]);  // Depth
    Integer has_ql    = is_valid_value(values[5]);  // QualityLevel
    Integer has_mat   = is_valid_value(values[6]);  // Material
    Integer has_type  = is_valid_value(values[7]);  // AssetType

    // Optional: suppress redundant trivial values BEFORE the guard
    if(has_conf && is_simple_single_config(values[3])) has_conf = 0;

    // Reject "diameter-only" records — meaningless without context.
    // Require at least one non-diameter signal before producing text.
    if(has_owner == 0 && has_type == 0 && has_mat == 0 && has_conf == 0
        && has_depth == 0 && has_ql == 0)
        return("");

    // ... build text from whichever of the others are set ...
}
```

The pattern is symmetric with `if(has_any == 0) continue;` guards in the per-vertex and per-element scanners, but those only catch the "no attributes at all" case. The context guard inside the builder catches the rarer "one trivial attribute set" case at the same chokepoint that every caller already routes through.

## Choice_Box for a Two-Part Value (Coordinate System Picker)

When what a macro actually needs is a **pair** of values that always travel together — a datum year and an MGA zone, a standard and its revision — do not put two `Input_Box`es on the panel and do not reach for a `Projection_Box`:

* Two typed boxes let the halves disagree, and a zone typed one digit out looks no different on the panel while putting the output a state away.
* A `Projection_Box` only accepts a projection name this 12d install recognises, so it cannot be pre-filled and opens empty however the panel is seeded.

Use a `Choice_Box` whose entries are worded the way a 12d projection name is, so **one parser** reads both the project's own setting and the panel choice:

```c
// globals.H — the list length must match what the filler writes
#define COORD_SYS_COUNT     16
#define DEFAULT_COORD_SYS   "GDA2020 MGA Zone 56"

// utils.H
void coord_sys_list(Text out[])
{
    out[1]  = "GDA2020 MGA Zone 49";
    // ... zones 50-55 ...
    out[8]  = "GDA2020 MGA Zone 56";
    out[9]  = "GDA94 MGA Zone 49";
    // ... zones 50-55 ...
    out[16] = "GDA94 MGA Zone 56";
}

// The list entry for a parsed pair, or "" when the pair is not one of them.
Text coord_sys_for(Text datum, Text zone)
{
    if(datum == "") return("");
    if(zone  == "") return("");

    Text want = "";
    if(datum == "2020") want = "GDA2020";
    if(datum == "1994") want = "GDA94";
    if(want  == "") return("");

    Text name = want + " MGA Zone " + zone;

    Text list[COORD_SYS_COUNT];
    coord_sys_list(list);

    Integer i;
    for(i = 1; i <= COORD_SYS_COUNT; i++)
    {
        if(list[i] == name) return(name);
    }

    return("");
}
```

Build, seed and read it:

```c
Choice_Box coord_box = Create_choice_box("Coordinate system", message);
Set_width_in_chars(coord_box, FIELD_CHARS);

Text coord_choices[COORD_SYS_COUNT];
coord_sys_list(coord_choices);
Set_data(coord_box, COORD_SYS_COUNT, coord_choices);   // populate

// Seed from the open project, falling back to the default. coord_sys_for()
// returning "" is what stops an unmatched projection being written into a
// box that will not validate it.
Text seed_datum = "", seed_zone = "";
json_parse_projection(Get_project_setting_text("PROJECTION_DATUM_DATA"),
                      seed_datum, seed_zone);

Text seed = coord_sys_for(seed_datum, seed_zone);
if(seed == "") seed = DEFAULT_COORD_SYS;
Set_data(coord_box, seed);                             // select

// ... in the process handler: Get_data, not Validate (see reference.md)
Text coord_sys = "";
Get_data(coord_box, coord_sys);
json_parse_projection(coord_sys, g_datum, g_zone);     // split back apart
```

The parser is the same one used on the project setting, so it must tolerate both spellings it will meet:

```c
void json_parse_projection(Text proj, Text &datum, Text &zone)
{
    datum = "";
    zone  = "";
    if(proj == "") return;

    Text hay = Text_lower(proj);

    if(Find_text(hay, "2020") > 0)       datum = "2020";
    else if(Find_text(hay, "1994") > 0)  datum = "1994";
    else if(Find_text(hay, "gda94") > 0) datum = "1994";

    zone = json_digits_after(hay, "zone");
    if(zone == "") zone = json_digits_after(hay, "mga");

    if(zone == datum) zone = "";    // "MGA2020" is a datum, not a zone
}
```

Adding an entry means bumping the count `#define` — keep the two adjacent and say so in a comment.

## ASCII-Only JSON for Browser Consumption

A browser reads a dropped or picked file with `FileReader`, which decodes as **UTF-8**. 12d `Text` is single-byte ANSI, so a degree sign or an accented name written raw arrives as mojibake, and a stray high byte can break `JSON.parse` outright. Force the output to pure ASCII at the escape step:

```c
Text json_hex2(Integer v)                     // two lower-case hex digits
{
    Text digits = "0123456789abcdef";

    Integer hi = v / 16;
    Integer lo = v - hi * 16;

    if(hi < 0)  hi = 0;
    if(hi > 15) hi = 15;
    if(lo < 0)  lo = 0;
    if(lo > 15) lo = 15;

    return(Get_subtext(digits, hi + 1, hi + 1) + Get_subtext(digits, lo + 1, lo + 1));
}

Text escape_json_ascii(Text t)
{
    Text result = "";
    Integer len = Text_length(t);
    Integer i;

    for(i = 1; i <= len; i++)
    {
        Integer code;
        Get_char(t, i, code);

        if(code == 92)      result = result + "\\\\";      // backslash
        else if(code == 34) result = result + "\\\"";      // quote
        else if(code == 10) result = result + "\\n";
        else if(code == 13) result = result + "\\r";
        else if(code == 9)  result = result + "\\t";
        else if(code < 32)  result = result + " ";         // other controls
        else if(code < 127) result = result + Get_subtext(t, i, i);
        else if(code == 133) result = result + "...";      // cp1252 ellipsis
        else if(code == 145) result = result + "'";        // curly quotes
        else if(code == 146) result = result + "'";
        else if(code == 147) result = result + "\\\"";
        else if(code == 148) result = result + "\\\"";
        else if(code == 150) result = result + "-";        // en/em dash
        else if(code == 151) result = result + "-";
        else if(code < 160)  result = result + " ";        // rest of cp1252
        else result = result + "\\u00" + json_hex2(code);  // 160-255
    }

    return(result);
}
```

Two ranges, two treatments:

* **160-255** — cp1252 and Latin-1 agree here, so the byte value *is* the Unicode code point: `\u00XX` is exact and round-trips.
* **128-159** — cp1252 punctuation that Latin-1 does not define. Fold each to its plain-ASCII equivalent (`'`, `"`, `-`, `...`) rather than escaping it — an escape in that range decodes to an unprintable control character, not to the punctuation mark the source byte stood for.

This is the JSON sibling of the `Set_char` workaround used for HTML output — reach for it whenever the consumer is a browser rather than 12d.

## Leading-Comma Field Emitter

Writing JSON (or any comma-separated structure) a field at a time normally means knowing which field turns out to be last, which every conditional field then breaks. Lead with the comma instead and carry a `first` flag by reference:

```c
void json_field_text(File f, Integer &first, Text indent, Text key, Text val)
{
    Text pre = ",";
    if(first) { pre = ""; first = 0; }

    hwl(f, indent + pre + "\"" + escape_json_ascii(key) + "\": \""
         + escape_json_ascii(val) + "\"");
}

void json_field_raw(File f, Integer &first, Text indent, Text key, Text raw)
{
    Text pre = ",";
    if(first) { pre = ""; first = 0; }

    hwl(f, indent + pre + "\"" + escape_json_ascii(key) + "\": " + raw);
}
```

```c
Integer first = 1;
hwl(f, " \"project\": {");
json_field_text(f, first, "  ", "name",   project_name);
json_field_text(f, first, "  ", "client", client);        // may be skipped
hwl(f, " },");
```

Any field can now be emitted conditionally, in any order, with no trailing-comma bug. For the closing brace of an **array element**, where the comma does have to trail, assign the tail to a variable first — a ternary used inline as an operand of `+` yields a null `Text` and takes 12d Model down:

```c
Text tail = ",";
if(is_last) tail = "";
hwl(f, "  }" + tail);
```

Count the objects that will actually be written **before** writing any of them, so `is_last` is known when a slot can be skipped:

```c
Integer n_valid = 0;
for(t = 1; t <= n_tins; t++) { if(Tin_exists(tin_of(t)) != 0) n_valid++; }

Integer n_written = 0;
for(t = 1; t <= n_tins; t++)
{
    if(Tin_exists(tin_of(t)) == 0) continue;
    n_written++;
    write_surface(..., (n_written == n_valid));
}
```

## Attribute Flatten-to-Cache with Normalised Key Lookup

When the output format has a **fixed key schedule** — every record carries the same field list, whatever the source element happens to hold — the code has to *look up* attributes rather than discover them. Flatten the whole tree once per record into a parallel key/value cache, keyed by a normalised name, then answer each scheduled key from the cache:

```c
{
    Text    g_ra_key[MAX_RECATTR];   // normalised names
    Text    g_ra_val[MAX_RECATTR];   // values, already as Text
    Integer g_ra_n;
}

// Lower case, letters and digits only: "Invert_Level", "invert level" and
// "invertLevel" all collapse to the same name.
Text json_norm_key(Text t)
{
    Text out = "";
    Integer len = Text_length(t);
    Integer i;

    for(i = 1; i <= len; i++)
    {
        Integer c;
        Get_char(t, i, c);

        if(c >= 65 && c <= 90) c = c + 32;

        Integer keep = 0;
        if(c >= 97 && c <= 122) keep = 1;
        if(c >= 48 && c <= 57)  keep = 1;

        if(keep)
        {
            Text ch = " ";
            Set_char(ch, 1, c);
            out = out + ch;
        }
    }

    return(out);
}

void json_attr_cache_group(Attributes grp, Integer depth);   // forward decl

void json_attr_cache_group(Attributes grp, Integer depth)
{
    Integer n = 0;
    if(Get_number_of_attributes(grp, n) != 0) return;
    if(n < 1) return;

    Integer i;

    // Cache insertion skips blanks and replaces placeholders, so only a
    // populated leaf at this level takes precedence over a nested duplicate.
    for(i = 1; i <= n; i++)
    {
        Text aname = "";
        if(Get_attribute_name(grp, i, aname) != 0) continue;
        if(aname == "") continue;

        Integer atype = 0;
        if(Get_attribute_type(grp, i, atype) != 0) continue;

        if(atype == 3)
        {
            Text sval = "";
            if(Get_attribute(grp, i, sval) != 0) continue;
            json_attr_cache_add(aname, sval);
        }
        else if(atype == 2)
        {
            Real rval = 0.0;
            if(Get_attribute(grp, i, rval) != 0) continue;
            if(!is_valid_height(rval)) continue;          // reject sentinels
            json_attr_cache_add(aname, To_text(rval, 4));
        }
        else if(atype == 1)
        {
            Integer ival = 0;
            if(Get_attribute(grp, i, ival) != 0) continue;
            json_attr_cache_add(aname, To_text(ival));
        }
        else if(atype == 7)
        {
            Integer64 value64 = 0;
            if(Get_attribute(grp, i, value64) != 0) continue;
            json_attr_cache_add(aname, To_text(value64));
        }
        else if(atype == 6)
        {
            Uid uid_value;
            if(Get_attribute(grp, i, uid_value) != 0) continue;
            json_attr_cache_add(aname, To_text(uid_value));
        }
        else if(atype == 8)
        {
            Guid guid_value;
            if(Get_attribute(grp, i, guid_value) != 0) continue;
            json_attr_cache_add(aname, To_text(guid_value));
        }
    }

    if(depth >= JSON_ATTR_DEPTH) return;                 // bounded recursion

    for(i = 1; i <= n; i++)                              // then sub-groups
    {
        Integer atype = 0;
        if(Get_attribute_type(grp, i, atype) != 0) continue;
        if(atype != 5) continue;

        Attributes sub;
        if(Get_attribute(grp, i, sub) != 0) continue;

        json_attr_cache_group(sub, depth + 1);
    }
}

void json_attr_cache_element(Element elt)
{
    if(Element_exists(elt) == 0) return;

    // Guarded: Get_attributes() on an element with none returns a null handle
    Integer n = 0;
    if(Get_number_of_attributes(elt, n) != 0) return;
    if(n < 1) return;

    Attributes root;
    if(Get_attributes(elt, root) != 0) return;

    json_attr_cache_group(root, 0);
}
```

The caller resets the cache once per record, loads the chosen vertex and its
aliases when applicable, then loads element defaults without another reset.
Cache insertion must skip whitespace-only values and replace an existing
placeholder only with a populated value. The scheduled write uses a stored
value or fallback, with the key present either way so records keep the same shape.

```c
Integer json_attr_missing(Text value)
{
    Text trimmed = Text_justify(value);
    return(trimmed == "" || trimmed == "-" || trimmed == "--");
}

void json_util_text(File f, Integer &first, Text ind, Text key, Text fallback)
{
    Text v = json_attr(key);            // cache lookup, "" when absent
    if(json_attr_missing(v))
    {
        if(fallback != "") v = fallback;
    }

    json_field_text(f, first, ind, key, v);
}
```

Rules that matter:

* **Non-empty leaves before sub-groups, at each level.** A blank or dash placeholder must not mask a populated nested value. This is depth-first group traversal, not a guarantee that the globally shallowest duplicate wins across separate branches.
* **Never route a measured value through the cache.** Fields the macro computed — an offset, a position — are written with `json_field_raw` directly, so an element attribute that happens to be called `Offset` cannot move it.

### Attribute Scope, Aliases and Missing Values

Choose and document precedence for the workflow. A per-crossing measurement
can use the nearest vertex first and element attributes as fallback; an
element-wide label may deliberately use element-first defaults. Never search
all vertices for the first non-empty measurement when location matters.
An empty nearest vertex should fall back to the element, not a remote vertex.

Normalising spelling does not resolve semantic aliases: `PipeDiameter` and
`Size` normalise to different keys. Keep an explicit mapping supported by the
source standard. Resolve a local vertex's aliases before loading element
defaults, otherwise an element `Size` can override that vertex's `PipeDiameter`.

Skip whitespace-only cache entries. Permit a non-placeholder value to replace
a cached placeholder, even when the cache has reached capacity. Keep meaningful
values such as `Unknown`, `Not Applicable` and numeric zero distinct from missing
data. Do not globally rewrite them or remove source domain warnings.

For utility JSON, an explicit `Size` wins within its source; fallback aliases
are `PipeDiameter` and `SUI_PipeDia`, then complete culvert width/height or
`PitDiameter`. Attribute dimensions remain in the supplied units (the schema
expects millimetres). Convert only known metre-valued geometric diameters;
never mine arbitrary configuration text for a guessed size.

Walk attribute trees by type: 1=Integer, 2=Real, 3=Text, 5=Attributes,
6=Uid, 7=Integer64, 8=Guid. Format identifiers directly to Text, not through
Real, which can lose 64-bit precision. Blob handling needs a separate format.
Log cache/depth limits instead of implying that all attributes were exported.

### Section and Export Validity

- Distinguish a successful TIN sample at RL zero from a failed query with an
    explicit validity flag. Guard the handle before calling `Tin_height`.
- Add the section's actual start chainage when sampling distances from its
    start. A schema with one start/end axis needs a straight section; validate
    that assumption rather than mixing a bent path with chord-based offsets.
- Sign-change sampling must handle samples exactly on the cut and suppress
    adjacent duplicate hits. Do not stop after the first crossing of a string
    when the output promises a record per crossing. Sampling still has finite
    resolution; it is not an exact curved-geometry intersection algorithm.
- Check `File_write_line` and `File_close`, not just `File_open`, before
    reporting a successful export. A failed write can leave a partial file.
- Keep unit/lookup tests separate from live-host checks. Source-backed tests
    with mocked 12d APIs and real JSON ingestion do not establish actual project
    attributes, native handle behavior, or panel operation.

## Write Output Beside the 12d Project, Not to %TEMP%

`%TEMP%` is right for a debug log and wrong for a deliverable — Windows is free to clear it, and a dataset belongs with the job it was cut from. Write to the open project's own folder, and let a bare file name in the panel's `File_Box` mean exactly that:

```c
Text get_project_dir()
{
    Text dir = "";
    if(Get_project_folder(dir) != 0) dir = "";

    dir = strip_trailing_slash(dir);

    if(dir == "") return(get_temp_dir());   // no project open — nowhere better
    return(dir);
}

Text resolve_json_path(Text name)
{
    if(name == "") return(get_project_dir() + "\\" + JSON_FILE_NAME);

    if(has_directory(name)) return(name);   // a real path wins

    return(get_project_dir() + "\\" + name);
}
```

`has_directory()` must count a drive letter, so `"C:out.json"` is not mistaken for a bare name:

```c
Integer has_directory(Text path)
{
    Integer len = Text_length(path);
    Integer i;

    for(i = 1; i <= len; i++)
    {
        Integer c = 0;                      // Get_char leaves it alone on failure
        Get_char(path, i, c);

        if(c == 92) return(1);              // backslash
        if(c == 47) return(1);              // forward slash
        if(c == 58) return(1);              // colon — drive letter
    }

    return(0);
}
```

Seed the `File_Box` with the bare name (`Set_data(json_box, JSON_FILE_NAME)`), not the full path: the folder is not a decision worth making every run, and a path that long buries the part that matters. Then print the resolved full path to the Output Window and put it on the clipboard, so nothing is hidden by leaving the folder off the panel.

## Handing a Local File to a Hosted Web App

No page served over `https` can read a file off the local disk — the browser forbids it, and a hosted app generally has no address, query string or paste handler that would take a path anyway. So a macro cannot make a web app load what it just wrote. What it *can* do is set up the shortest manual route and say so:

```c
// Open the page with the path already on the clipboard: its own Open
// dialog is an ordinary Windows file dialog, which takes a pasted path.
//     Open... -> Ctrl+V -> Enter
void hand_over_dataset(Panel panel, Text path)
{
    if(path != "") Set_clipboard_text(path);

    Shell_execute(panel, "open", CROSSSECT_URL, "", "", 1);
}

// The other way in: the file shown selected in Explorer, to be dragged
// onto the page.
void reveal_dataset(Panel panel, Text path)
{
    if(path == "") return;

    Shell_execute(panel, "open", "explorer.exe",
                  "/select,\"" + path + "\"", "", 1);
}
```

Design rules learned from this:

* **Put each on its own button, and do neither on write.** A macro that throws a browser window over the top of 12d every time Process is pressed is one nobody presses twice. Write the file, print where it went, leave 12d in front.
* **Do not open Explorer from the same handler that opened the browser** — it lands on top of the page the file is meant to go to.
* **Print the steps last.** Every `Print()` is buffered until something calls `Show_console(1)`, so the closing "how to load it" block both raises the window and ends up at the bottom of it rather than buried above a warning.
* Keep the "why" in a comment. The next reader will assume the macro should just open the file in the app, and needs to know that was tried.

## Guard Null() on a Dynamic_Element with a Ready Flag

`Null()` on a `Dynamic_Element` that has never been appended to is not worth finding out about. When a collector is reset at the top of each run, track whether it was ever populated:

```c
{
    Dynamic_Element g_util_elt;
    Integer g_util_elt_ready;
}

// top of the collection pass
if(g_util_elt_ready) Null(g_util_elt);
g_util_elt_ready = 0;

// on each append
Append(elt, g_util_elt);
g_util_elt_ready = 1;
```

Appending exactly once per recorded record also makes the list index-parallel with the fixed arrays — item *i* of the list is the element of slot *i* — so the element behind a record can be recovered later with `Get_item(g_util_elt, i, elt)` without storing an `Element` array.

## Single-Entry Undo for an In-Place Edit Run

When a macro modifies existing elements rather than creating new ones, register the edits with 12d's own undo stack. The whole run then collapses to **one** entry, and Ctrl+Z reverses all of it.

Three rules make it work:

1. **Snapshot before touching anything.** `Add_undo_change` needs the original and the modified element, so duplicate first.
2. **The snapshot must sit outside every model.** `Set_model(copy, null_model)` where `null_model` is a `Model` handle that has been `Null()`ed. Skip this and the undo does not register.
3. **One snapshot per element, not per edit.** Walk the work grouped by element — with a grid, that means walking the rows in element-contiguous order, which a sorted grid is *not* (see below).
4. **Snapshot only what changes.** `Element_duplicate` copies the whole string with every vertex attribute; taking one for every visible string, changed or not, was most of the cost of an Apply that touched a few cells. Take it just before the first write (below).
5. **Release the snapshot handle once it is registered.** A macro handle on an element locks it (see "Handles Lock What They Point At"); held until the next run, the undo copy is one Ctrl+Z may not be able to put back.

```c
Integer process_one_element(Element elt, ..., Undo_List &undo_list,
                            Integer &undo_count)
{
    // ---- snapshot before any edit ----
    Element original;
    Integer have_original = 0;
    if(dry_run == 0)
    {
        if(Element_duplicate(elt, original) == 0)
        {
            Model null_model;
            Null(null_model);
            Set_model(original, null_model);   // outside every model
            have_original = 1;
        }
    }

    Integer changed = 0;
    // ... edit vertices of elt in place, incrementing changed ...

    if(changed == 0) return(0);                // nothing to register

    if(dry_run == 0)
    {
        Calc_extent(elt);                      // the edit moved the geometry

        if(have_original == 1)
        {
            Undo u = Add_undo_change(PROGRAM_NAME, original, elt);
            Append(u, undo_list);
            undo_count = undo_count + 1;
        }
    }
    return(changed);
}
```

The caller owns the list and pushes it once at the end:

```c
Undo_List undo_list;
Null(undo_list);
Integer undo_count = 0;

Integer i;
for(i = 1; i <= count; i = i + 1)
{
    Element elt;
    if(Get_item(elements, i, elt) != 0) continue;
    if(Element_exists(elt) == 0) continue;

    process_one_element(elt, ..., undo_list, undo_count);
}

// One entry on the 12d undo list for the whole run
if(undo_count > 0)
{
    Add_undo_list(PROGRAM_NAME + " (" + To_text(undo_count) + " strings)", undo_list);
}
```

Tell the user, in the status line and the report: `"Adjusted 412 vertices on 37 strings. Ctrl+Z to undo."` An in-place edit with no visible undo affordance is one nobody dares run on real data.

### Grid write-back: lazy snapshot, walked in element order

When the rows come from a grid, two things go wrong with a straight walk down the screen:

- **After a sort, a string's rows are scattered.** Closing an element off "as the loop crosses into the next one" then snapshots, registers and counts the same string once for every run of its rows. Walk the *visible* rows in master (scan) order instead — master rows are element-contiguous whatever the sort.
- **Most strings are not changed.** Defer the snapshot to the moment the first change is about to be written, from inside the writer, and let "a snapshot was taken" be the authoritative sign the string changed — it also catches a write that deleted the old value and then failed.

```c
{
    Integer g_snap_state = 0;      // 0 not yet, 1 taken, 2 tried and failed
    Element g_snap_elt;
}

// Called by the attribute writer before EVERY mutating call
// (Super_vertex_attribute_delete, Set_super_vertex_attribute ...)
void snapshot_before_write(Element elt)
{
    if(g_snap_state != 0) return;
    g_snap_state = 2;
    if(Element_duplicate(elt, g_snap_elt) == 0)
    {
        Model null_model;
        Null(null_model);
        Set_model(g_snap_elt, null_model);   // outside every model
        g_snap_state = 1;
    }
    Set_super_use_vertex_attribute(elt, 1);  // after the copy, not before
}

void finalise_element(Element &elt, Undo_List &ul, Integer &undo_count)
{
    if(g_snap_state == 0) return;            // nothing was written
    Calc_extent(elt);
    if(g_snap_state != 1) return;
    Undo u = Add_undo_change(PROGRAM_NAME, g_snap_elt, elt);
    Append(u, ul);
    undo_count = undo_count + 1;
    Null(g_snap_elt);                        // the undo has it now
}

// The walk: visible rows, in master order
Integer grid_row_of[MAX_ROWS];
for(m = 1; m <= g_n_rows; m++) grid_row_of[m] = 0;
for(r = 1; r <= g_n_grid_rows; r++) grid_row_of[g_grid_master[r]] = r;

for(m = 1; m <= g_n_rows; m++)
{
    Integer r = grid_row_of[m];
    if(r == 0) continue;                     // not on screen
    Integer ei = g_row_elt[m];
    if(ei != prev_ei)
    {
        if(prev_ei != 0) finalise_element(cur_elt, ul, undo_count);
        g_snap_state = 0;
        prev_ei = ei;
        if(Get_item(g_elements, g_elt_src[ei], cur_elt) != 0) { prev_ei = 0; continue; }
    }
    // ... write_attr(cur_elt, ...) for each cell of grid row r ...
}
if(prev_ei != 0) finalise_element(cur_elt, ul, undo_count);
g_snap_state = 0;
Null(g_snap_elt);
Null(cur_elt);
```

**Validate before you destroy.** A writer that has to change an attribute's type deletes the old value and sets the new one. Parse the new value *first* — deleting and only then finding the text will not parse as the column's `Real` loses the stored value and writes nothing.

Source: `Macro_Projects/VertexAttributeTable/includes/VertexAttributeTable_grid.H` (`grid_apply`) and `_utils.H` (`write_attr`, `snapshot_before_write`). Compile-verified on V15; not yet exercised live.

## Report-Only (Dry Run) Tick

Any macro that modifies data in place should offer a dry run, and it must count and report **exactly** as the real run does — the whole point is to see what would happen:

```c
Named_Tick_Box dry_tick = Create_named_tick_box("Report only - do not modify", 0, "dryrun");
...
Integer dry_run = 0;
if(Validate(dry_tick, dry_run) != TRUE) dry_run = 0;
```

Gate only the writes, never the counting:

```c
if(dry_run == 0)
{
    if(Set_super_vertex_coord(elt, vi, x, y, new_z) != 0) continue;
}

changed = changed + 1;              // counted either way
g_stat_vert_adjusted = g_stat_vert_adjusted + 1;
note_shift(dz);
```

Skip the undo snapshot on a dry run — there is nothing to undo — and close the report with which mode ran:

```c
if(dry_run == 1) log_msg("  REPORT ONLY - nothing was modified.");
else             log_msg("  Strings were modified in place. Use Edit => Undo (Ctrl+Z) to reverse.");
```

## Editable Grid Panel (GridCtrl_Box) Lifecycle

The order is not negotiable: discover the columns, build one box per column, create the grid, show the panel, **then** load data.

```c
// 1. Scan the data first - the column names are the box titles
scan_selection(elements);

// 2. One Input_Box per column; its title is the column heading
build_columns(msg_box);

// 3. Create the grid with the widget and read-only arrays
GridCtrl_Box grid = Create_gridctrl_box("Vertices", g_n_rows, g_n_cols,
                                        g_col_widgets, g_col_readonly,
                                        1, mb, 900, 480);
Set_warn_on_modified(grid, 0);

// 4. Assemble and show
Append(grid, right_vg);
Append(main_hg, panel);
Show_widget(panel);

// 5. ONLY NOW can cells be written
populate_grid(grid);
```

**Repopulate from empty, not by blanking.** Fresh rows come up blank, so only cells that actually carry a value need writing — a handful per row instead of one per column:

```c
Delete_all_rows(grid);

Integer r;
for(r = 1; r <= g_n_grid_rows; r = r + 1) Insert_row(grid);
// ... then Set_cell only where there is something to say ...
```

**Size columns from what you wrote, not with `Format_grid`.** `Format_grid` measures every cell and is far too slow to run on each repopulate. Record the longest text per column as the cells go in, then set the widths directly — one call per column:

```c
void put_cell(GridCtrl_Box grid, Integer r, Integer c, Text value)
{
    Set_cell(grid, r, c, value);

    Integer len = Text_length(value);
    if(len > g_col_maxlen[c]) g_col_maxlen[c] = len;
}

void size_columns(GridCtrl_Box grid)
{
    Integer c;
    for(c = 1; c <= g_n_cols; c = c + 1)
    {
        Integer w = g_col_maxlen[c] * CELL_CHAR_PX + CELL_PADDING_PX;
        if(w < CELL_MIN_PX) w = CELL_MIN_PX;
        if(w > CELL_MAX_PX) w = CELL_MAX_PX;
        Set_column_width(grid, c, w);
    }
}
```

Seed `g_col_maxlen[c]` from the heading length so a column never comes up narrower than its own title.

**Track "unsaved edits" with a flag, never by rescanning.** `Set_modified` has no getter, so the grid's own state cannot be read back. Catch the keystroke instead:

```c
if(cmd == "keystroke")
{
    if(id == Get_id64(grid)) g_grid_dirty = 1;
    continue;
}
```

Set it after a paste or fill-down too, and clear it in `populate_grid` and after Apply. A cell-by-cell comparison against the model is acceptable only as a fallback on a small view, behind a cell budget:

```c
Integer grid_has_edits(GridCtrl_Box grid)
{
    if(g_grid_dirty == 1) return(1);

    Integer cells = g_n_grid_rows * g_n_attr_cols;
    if(cells > EDIT_VERIFY_CELLS) return(0);    // too big to check; trust the flag
    // ... compare each cell against the model ...
}
```

Running that comparison on every click is what makes the panel stop responding.

**Refuse destructive view changes while edits are pending.** Sorting, filtering and narrowing all rebuild the grid from the model, which would silently discard typing:

```c
if(grid_has_edits(grid) == 1)
{
    Set_data(cmb, "Unsaved edits - Apply or Reload before sorting.",
             MESSAGE_LEVEL_WARNING);
    continue;
}
```

**Identity columns.** Put the read-only context (which string, which vertex, which model) in the first N columns, mark them in `col_readonly[]`, and refuse to write them from paste, fill-down and apply as well — `col_readonly[]` stops the user typing, not the macro.

**Re-read after Apply** (`populate_grid(grid)`) so the cells show exactly what is now stored, including values the writer rejected or normalised.

## Reading a Whole Row's Attributes at Once

When populating a wide grid, ask each vertex what it *has* rather than asking it for every column:

```c
Attributes att;
if(Get_super_vertex_attributes(elt, vi, att) != 0) continue;

Integer n_att = 0;
if(Get_number_of_attributes(att, n_att) != 0) continue;

Integer k;
for(k = 1; k <= n_att; k = k + 1)
{
    Text aname = "";
    if(Get_attribute_name(att, k, aname) != 0) continue;

    Integer col = find_column(aname);
    if(col == 0) continue;                  // not a column we are showing

    Integer atype = 0;
    if(Get_attribute_type(att, k, atype) != 0) continue;
    // ... read with the matching overload and write the cell ...
}
```

A vertex with five attributes in a forty-column table costs five lookups this way, not eighty.

## List_Box as a Tree Substitute

**`Tree_Box` does not work for a hierarchy the macro has to react to**: a tree page change raises no event the macro can see, so the event loop never learns the node moved. A `Tree_Page` per item also burns GDI handles, which the 12d docs warn about.

A `List_Box` is an ordinary input widget, reports its selection through `Get_selection`, and costs nothing per row — so every string can be listed rather than the first few hundred. Draw the hierarchy with indentation and a folder glyph:

```c
add_list_entry(lb, "All strings  (" + To_text(g_n_rows) + " vertices)", FILTER_ALL, 0);

Integer mi;
for(mi = 1; mi <= g_n_models; mi = mi + 1)
{
    Text glyph = "  > ";
    if(g_model_open[mi] == 1) glyph = "  v ";

    add_list_entry(lb, glyph + g_model_name[mi] + "  (" + To_text(n_in_model) + ")",
                   FILTER_MODEL, mi);

    if(g_model_open[mi] == 0) continue;

    Integer ei;
    for(ei = 1; ei <= g_n_elements; ei = ei + 1)
    {
        if(g_elt_model[ei] != mi) continue;
        add_list_entry(lb, "        " + g_elt_label[ei]
                       + "  [" + To_text(g_elt_rows[ei]) + "]"
                       + "  #" + To_text(ei), FILTER_STRING, ei);
    }
}
```

`>` and `v` are the usual modern tree affordance and avoid drawing branch lines. **Box-drawing characters are not an option** — they are multi-byte and come out as garbage from source literals with this compiler.

Keep a parallel array of what each row *means* (`g_list_kind[]`, `g_list_ref[]`) and match the selection back **by label text**, so the code does not depend on whether the list is 0- or 1-based:

```c
Integer list_current_entry(List_Box lb, Integer &kind, Integer &ref)
{
    Integer pos = 0;
    if(Get_selection(lb, pos) != 0)
    {
        if(Get_caret(lb, pos) != 0) return(0);   // keyboard nav moves the caret only
    }

    Text txt = "";
    if(Get_item(lb, pos, txt) != 0) return(0);

    Integer i;
    for(i = 1; i <= g_n_list; i = i + 1)
    {
        if(g_list_label[i] != txt) continue;
        kind = g_list_kind[i];
        ref  = g_list_ref[i];
        return(1);
    }
    return(0);
}
```

Labels must therefore be **unique** — survey strings very often share a name, so append `#index`.

There is no clear-all call. Delete from the end, bounded:

```c
void clear_list(List_Box lb)
{
    Integer guard;
    for(guard = 1; guard <= MAX_LIST + 8; guard = guard + 1)
    {
        Integer n = 0;
        if(Get_number_of_items(lb, n) != 0) break;
        if(n <= 0) break;

        if(Delete_item(lb, n) == 0) continue;
        if(Delete_item(lb, n - 1) == 0) continue;   // in case it is 0-based
        break;
    }
    g_n_list = 0;
}
```

**Handle the list from its own event, and poll only as a fallback.** A repeat click on the row already selected changes nothing a poll can detect — and that click is exactly how a folder is meant to close again:

```c
if(id == Get_id64(tree_list))
{
    // ... same-row click on a model row = toggle open/closed ...
}
```

**Put the fallback poll last in the event loop**, after every button has had its chance to claim the event. A pending selection change ends in `continue`, so a poll placed first will swallow button presses — which is how an Apply button silently stops working.

## Zoom a View to One Feature

`View_fit` is the only framing call there is and it fits *everything* on the view. To aim it at one feature, lift the other models out, fit, and put them straight back:

```c
Integer zoom_to_highlight(View v, Model hm)
{
    Dynamic_Text names;
    Null(names);
    if(View_get_models(v, names) != 0) return(1);

    Integer n = 0;
    if(Get_number_of_items(names, n) != 0) n = 0;

    Integer i;
    for(i = 1; i <= n; i = i + 1)                 // capture the list FIRST
    {
        Text mn = "";
        if(Get_item(names, i, mn) != 0) continue;
        if(mn == HL_MODEL) continue;

        Model m = Get_model(mn);
        if(Model_exists(m) == 0) continue;
        View_remove_model(v, m);
    }

    View_add_model(v, hm);
    Calc_extent(v);
    View_fit(v);

    for(i = 1; i <= n; i = i + 1)                 // restore on every path
    {
        Text mn = "";
        if(Get_item(names, i, mn) != 0) continue;
        if(mn == HL_MODEL) continue;

        Model m = Get_model(mn);
        if(Model_exists(m) == 0) continue;
        View_add_model(v, m);
    }

    View_redraw(v);
    return(0);
}
```

Capture the model list before removing anything and restore unconditionally, so a view can never be left stripped. **Removing and re-adding a model resets any per-model view settings it carried**, so make this opt-in (a tick box), never automatic.

## Marker-in-a-Model Highlight

There is no confirmed way to highlight from a macro in V15: the `Highlight_*` calls compile, but the manual calls them "under development" and they are untested here, and `Element_draw(elt, colour)` lasts only until the view next repaints. Showing the user *where* a row or a string is means drawing into dedicated models added to the active view. `Macro_Projects/VertexAttributeTable/includes/VertexAttributeTable_view.H` is the reference implementation, and it draws two things:

- the **feature** — the whole selected string — traced into `"VAT Highlight Feature"` in a bright colour;
- the **vertex** — a cross and a small square — into `"VAT Highlight"`.

They are separate models so a zoom can be aimed at either. `View_fit` fits everything on the view, so zooming to one means lifting every other model out, the other highlight model included (see "Zoom a View to One Feature").

Two rules, both learned in 12d. The symptoms were seen live; the fixes are compile-verified, and the trail was not reported again after rule 1.

### 1. Never change geometry while its model is on a view

Moving a marker with `Set_super_vertex_coord` while its model is displayed, then calling `View_redraw`, draws the moved marker **without erasing the old one** — every row visited left a cross behind. Deleting and recreating a displayed element did the same to the outline. So every update is lift → rebuild → put back → one redraw:

```c
void hl_place_marker(Real x, Real y, Real z, Real s)
{
    hl_lift(HL_MODEL, g_hl_on_view);          // View_remove_model; caller redraws

    Model m = Get_model_create(HL_MODEL);
    if(Model_exists(m) == 0) { Null(m); return; }
    Model_clean(m, 0);                        // off the view, so safe to rebuild
    hl_add_line(m, x - s, y, x + s, y, z);    // each sets coords BEFORE Set_model
    hl_add_line(m, x, y - s, x, y + s, z);    // and Nulls its own handle
    hl_add_box(m, x, y, z, 1.5 * s);
    Calc_extent(m);
    Null(m);
    g_hl_show = 1;
}
// caller: hl_attach_view(v, vname);  View_redraw(v);
```

Rebuilding three small strings costs no more than moving them, and means nothing has to be kept.

### 2. Never keep a highlight handle between events

12d locks every model and element a macro holds a handle to. Keeping the marker elements and models in globals for the session left both models locked, so closing the panel printed this on the command line and left the models in the project:

```
Model "VAT Highlight" is locked hence cannot be deleted!
Model "VAT Highlight Feature" is locked hence cannot be deleted!
```

Keep **flags only** in globals — wanted on screen, currently on the view, which string is outlined, which view — and look each model up by name when it is needed:

```c
Integer hl_find_model(Text name, Model &m)
{
    if(Model_exists(name) == 0) return(1);
    m = Get_model(name);
    if(Model_exists(m) == 0) return(1);
    return(0);
}

Integer hl_lift(Text name, Integer &on_view)   // take one model off its view
{
    if(on_view == 0) return(0);
    on_view = 0;
    View v;
    if(hl_current_view(v) != 0) return(1);
    Model m;
    if(hl_find_model(name, m) == 0) View_remove_model(v, m);
    Null(m);                                    // released before returning
    return(1);
}
```

Every `Model` and `Element` handle in the file is released with `Null` on every return path, error paths included. See "Handles Lock What They Point At".

### Tracing the feature

Copy the geometry, not the element. `Element_duplicate` would carry the name, style and every vertex attribute into the highlight model, where a killed run could leave it looking like survey data.

```c
#define HL_FEAT_DIMS 28     // z (4) + radius (8) + major-arc flag (16) per vertex

Element line = Create_super(HL_FEAT_DIMS, n);
for(i = 1; i <= n; i++)
{
    Real x = 0.0; Real y = 0.0; Real z = 0.0; Real r = 0.0; Integer b = 0;
    if(Get_super_data(elt, i, x, y, z, r, b) != 0)   // no arc data: plain vertex
    {
        r = 0.0; b = 0;
        if(Get_super_vertex_coord(elt, i, x, y, z) != 0)
        { Element_delete(line); Null(line); Null(m); Null(elt); return(1); }
    }
    Set_super_data(line, i, x, y, z, r, b);
}
Integer closed = 0;
if(String_closed(elt, closed) != 0) closed = 0;
if(closed == 1) String_close(line);
Set_colour(line, hl_colour());  Set_weight(line, 1.0);
Set_model(line, m);  Calc_extent(line);  Null(line);
```

Rebuild the outline only when the string changes, so moving down one string's rows costs only the marker.

### Sizing, views and clean-up

**Size the marker so it stays visible at any zoom.** A plan view reports a plot scale, which converts a fixed size on screen into real units; section and perspective views do not, so fall back to a fraction of the element's own extent and finally to 1 metre:

```c
Real marker_size(View v, Element elt)
{
    Real scale = 0.0;
    if(Plan_view_get_plot_scale(v, scale) == 0)
    {
        if(scale > 0.0) return(scale / 200.0);      // ~5mm on the plot
    }
    // ... else span/40 from Get_extent_x / Get_extent_y ...
    return(1.0);
}
```

**Keep the highlight on exactly one view.** `Get_last_view` follows the user between views. Draw into whatever it reports and the models end up added to every view visited, while only the newest is ever redrawn — the others keep showing the old selection. Track the view by name; when it changes, lift both models off the old view and redraw *that* view before attaching to the new one.

**Removing a model is not enough to remove what it drew.** `Delete_models(name, 0)` and `View_remove_model` both leave the paint until something forces a redraw. Redraw the view on the path that lifts a model off, and use `Delete_models(name, 1)` for the final clean-up, since a model may still sit on a view this session never tracked.

**Clean up at startup as well as on close.** A run that was killed rather than closed leaves its highlight models in the project, still added to a view. With no handle held anywhere, the delete succeeds.

**After the table is rebuilt** (sort, apply, reload) row numbers mean different vertices. Lift the marker off and let tracking re-place it on the next event. Keep the outline only if the table still shows that one string — otherwise drop it too, since a rebuild can leave no row selected, and then nothing moves it. Lift everything first and redraw once.

**Track the selection on burst events too.** A grid click may raise no event of its own, so the selected row is polled on every event. `keystroke` (from the grid) and `motion select` (mouse over a view) arrive in bursts with no command for the panel, but they are exactly the moments the user is moving through the table or looking across at the view, so run the poll there as well — it costs one `Get_selected_cells` when nothing has moved. Read tick-box states from cached globals on those events rather than calling `Validate` on every one.

## Where Macro Time Goes: Interpreted Inner Loops

Native 12d calls are fast; what costs is work done step by step in 12dPL, repeated per cell. Before optimising anything else, count the interpreted iterations on the paths that run per click. The fixes below come from `Macro_Projects/VertexAttributeTable` (5000 vertices × ~43 attributes is its design limit). They are compile-verified; the speed-up is reasoned from operation counts, not timed live.

### Positional hint for a repeated name lookup

Looking up a column by name with a linear search, for every attribute of every vertex, was ~7 million comparisons per repopulate. Survey vertices carry their attributes in the same order, so remember the answer by *position* and check it first:

```c
{
    Integer g_col_hint[MAX_COLS];      // column found at attribute position k last time
}

Integer find_column_at(Text name, Integer k)
{
    Integer use_hint = 0;
    if(k >= 1) { if(k <= MAX_COLS) use_hint = 1; }   // nested ifs: && does not short-circuit

    if(use_hint == 1)
    {
        Integer h = g_col_hint[k];
        if(h > N_ID_COLS) { if(h <= g_n_cols) { if(g_col_name[h] == name) return(h); } }
    }

    Integer c = find_column(name);       // the full search, only on a miss
    if(c != 0) { if(use_hint == 1) g_col_hint[k] = c; }
    return(c);
}
```

The hint is validated by name every time, so a stale one costs a comparison, never a wrong answer. Reset it with the rest of the scan state. The same idea serves any lookup whose answer usually repeats: the model of the previous string, the list entry at the clicked position (confirm by label, fall back to the search).

### Cache a handle across consecutive rows

When rows are grouped by element, fetch the element once per group, not once per row:

```c
if(ei != prev_ei)
{
    prev_ei  = ei;
    have_elt = 0;
    if(Get_item(g_elements, g_elt_src[ei], elt) == 0) have_elt = 1;
}
if(have_elt == 0) continue;
```

### Build long text in blocks

`a = a + b` copies the whole of `a`, so appending every cell to one growing string costs the square of its length — a whole-grid clipboard copy becomes unusable. Build in tiers: cells into a row, rows into a block of ~64, blocks into the result.

```c
line = line + v;                         // per cell
block = block + line;                    // per row
if(++in_block >= 64) { out = out + block; block = ""; in_block = 0; }
...
out = out + block;                       // after the loop
```

### Do invariant work once

Fold the search text to lower case once per search, not once per cell; skip empty cells before any text work; count per-model strings once at scan instead of walking every string for every model on each list click; read numeric sort keys as numbers instead of formatting to text and parsing back.

## Rebuild a Panel to Change a Widget's Size

A widget's size is set when it is created (`Set_width_in_chars`, constructor pixel sizes). Whether `Set_width_in_chars` or `Set_size` re-lays-out a panel that is already on screen is untested, so `VertexAttributeTable` changes its list width by **building the panel again**: the panel function returns a rebuild code and its caller loops.

```c
#define TABLE_CLOSED   0
#define TABLE_SHUTDOWN 1
#define TABLE_REBUILD  2

Integer show_table_panel()
{
    // ... reset per-session state (see below) ...
    Integer result = TABLE_REBUILD;
    while(result == TABLE_REBUILD) result = run_table_panel();
    clear_highlight();
    if(result == TABLE_SHUTDOWN) return(1);
    return(0);
}

// inside run_table_panel, on the Wider button:
if(grid_has_edits(grid) == 1) { /* refuse: the rebuild repopulates */ continue; }
g_list_width = g_list_width + LIST_WIDTH_STEP;
result = TABLE_REBUILD;  doit = 0;  break;

// after the loop:
if(result == TABLE_REBUILD)
{
    save_table_state(...);               // Get_data, not Validate: no focus moves
    if(Get_widget_position(panel, px, py) == 0) { g_panel_x = px; g_panel_y = py; g_panel_placed = 1; }
}
Hide_widget(panel);
return(result);

// when building the new panel:
if(g_panel_placed == 1) Show_widget(panel, g_panel_x, g_panel_y);
else Show_widget(panel);
```

Everything the user set on the old panel — filter, sort, list order, tick boxes, search fields — lives in globals and is put back as the new widgets are created (`Create_named_tick_box(label, g_track_on, ...)`, `Set_data(box, g_find_text)`). A panel the user had dragged larger comes back at its natural size. `Get_widget_position`, `Show_widget(Widget, Integer x, Integer y)`, `Get_size`/`Set_size` and `Set_sizing_constraints` are all accepted by V15 `cc4d`; the rebuild itself is compile-verified, not yet run live.

## Reset Globals That Outlive a Panel

Globals outlive the panel that set them. When one macro run opens the same panel several times — a setup panel that opens a table for each new selection — anything left from the previous showing points at the previous data:

- a sort column index can exceed the new column count, or name a column that no longer exists;
- a "show matches only" narrowing keeps filtering rows by flags computed for the old rows;
- per-model "open" flags apply to whatever model now has that index.

Reset those at the start of each session, and deliberately keep only real preferences (list order, list width, tick-box choices):

```c
g_sort_col   = 0;
g_sort_dir   = 1;
g_match_only = 0;
for(mc = 1; mc <= MAX_MODELS; mc = mc + 1) g_model_open[mc] = 0;
```

**Input boxes too.** `Get_data(Input_Box, Text &)` on an empty box leaves the destination untouched, by the same rule as any output parameter (potholeCards comments). Read straight into a global and a field the user cleared keeps the previous value. Reset the globals first, or read through a seeded local:

```c
Text box_text(Input_Box b)
{
    Text v = "";
    if(Get_data(b, v) != 0) v = "";
    return(v);
}
```

**Run counters too.** Globals persist between clicks of the same panel, so zero the per-run counters at the top of every Process handler (`reset_counters()` in QLA_FLAG_Trimesh), not only at macro start.

## Grid Clipboard TSV Round-Trip with Excel

Tab-separated text with newline row breaks is what Excel reads and writes, so a grid that copies and pastes TSV moves ranges straight in and out of a spreadsheet.

Build the separators at runtime — escapes in source literals are unreliable with this compiler:

```c
Text one_char(Integer code)
{
    Text t = " ";
    Set_char(t, 1, code);
    return(t);
}
// #define CHAR_TAB 9 / CHAR_LF 10 / CHAR_CR 13
```

**Copy** the selection rectangle:

```c
Integer sr, sc, er, ec;
if(Get_selected_cells(grid, sr, sc, er, ec) != 0) return(1);

Text tab = one_char(CHAR_TAB);
Text out = "";
Integer r;
for(r = sr; r <= er; r = r + 1)
{
    Integer c;
    for(c = sc; c <= ec; c = c + 1)
    {
        Text v = "";
        if(Get_cell(grid, r, c, v) != 0) v = "";
        out = out + v;
        if(c < ec) out = out + tab;
    }
    if(r < er) out = out + "\n";
}
if(Set_clipboard_text(out) != 0) return(2);
```

**Paste** anchored at the top-left of the selection, with two spreadsheet behaviours that matter:

* **Strip carriage returns first.** Text copied from Excel arrives CRLF; the row split works on LF alone. Check for a CR before rebuilding the string — character-by-character rebuilds are quadratic and text copied from the grid itself has none.
* **One value pasted over a range fills the range.** That is the quickest way to set one attribute across many vertices, and it is what a user expects.
* Drop the empty tail field: clipboard text usually ends with a newline.
* Never write the identity columns; count what was blocked and say so.

Call `Format_grid(grid)` after a paste or fill-down so the display refreshes, and set the dirty flag.

## Type-Aware Vertex Attribute Read and Write

The same attribute name arrives as `Real` on one job and `Text` on another, depending on how it was captured. **Query the type, then use the matching overload** — assuming Text loses every numeric value:

```c
Integer read_vertex_depth(Element elt, Integer vert, Text att_name, Real &out_depth)
{
    out_depth = 0.0;

    Integer att_type = 0;
    if(Get_super_vertex_attribute_type(elt, vert, att_name, att_type) != 0)
        return(DEPTH_ABSENT);

    if(att_type == ATT_TYPE_REAL)
    {
        Real rv = 0.0;
        if(Get_super_vertex_attribute(elt, vert, att_name, rv) != 0) return(DEPTH_ABSENT);
        out_depth = rv;
        return(DEPTH_OK);
    }
    if(att_type == ATT_TYPE_INTEGER)
    {
        Integer iv = 0;
        if(Get_super_vertex_attribute(elt, vert, att_name, iv) != 0) return(DEPTH_ABSENT);
        out_depth = iv * 1.0;
        return(DEPTH_OK);
    }
    if(att_type == ATT_TYPE_TEXT)
    {
        Text tv = "";
        if(Get_super_vertex_attribute(elt, vert, att_name, tv) != 0) return(DEPTH_ABSENT);
        tv = Text_justify(tv);
        if(tv == "") return(DEPTH_ABSENT);

        Real rv = 0.0;
        if(From_text(tv, rv) != 0) return(DEPTH_BAD);      // present but not a number
        out_depth = rv;
        return(DEPTH_OK);
    }

    return(DEPTH_BAD);       // Attributes, Uid, Blob ... not a depth
}
```

Distinguish **absent** from **bad** in the return code and count them separately in the report: "no Depth at that vertex" and "Depth present but unparseable" are different problems with different fixes, and lumping them together hides a data-entry error behind a plausible total.

**Writing back keeps the discovered type**, so a column that came in as Real stays Real, and a value that will not parse for that type is rejected rather than silently stringified:

```c
Integer write_attr(Element elt, Integer vert, Text name, Integer col_type, Text cell)
{
    Text want = Text_justify(cell);
    Integer exists = attr_exists(elt, vert, name);

    if(want == "")                                  // blank clears the attribute
    {
        if(exists == 0) return(0);
        if(Super_vertex_attribute_delete(elt, vert, name) != 0) return(4);
        return(2);
    }

    if(col_type == ATT_TYPE_REAL)
    {
        Real rv = 0.0;
        if(From_text(want, rv) != 0) return(4);     // rejected, not coerced

        if(exists == 1)                             // skip a no-op write
        {
            Real cur = 0.0;
            if(Get_super_vertex_attribute(elt, vert, name, cur) == 0)
            {
                Real diff = rv - cur;
                if(diff < 0.0) diff = 0.0 - diff;
                if(diff <= REAL_EPS) return(0);
            }
        }
        if(Set_super_vertex_attribute(elt, vert, name, rv) != 0) return(4);
        if(exists == 0) return(3);
        return(1);
    }
    // ... Integer and Text branches ...
}
```

Return a small code per outcome (unchanged / written / deleted / created / rejected) so the caller can report each separately, and compare before writing so an untouched cell never counts as a change or triggers an undo entry.

When a name is seen with two different types across the selection, **widen to Text** — every value can be written as text:

```c
if(g_col_type[existing] != att_type) g_col_type[existing] = ATT_TYPE_TEXT;
```

## Snapshot Attribute Names Before Deleting

Deleting while enumerating by index reshuffles the numbering, so collect every name first, then act on the snapshot:

```c
Integer collect_vertex_attr_names(Element elt, Integer vert, Text names[])
{
    Integer n = vertex_attr_count(elt, vert);
    if(n > MAX_VERT_ATTS) n = MAX_VERT_ATTS;        // and say so in the report

    Integer count = 0;
    Integer i;
    for(i = 1; i <= n; i = i + 1)
    {
        Text nm = "";
        if(Get_super_vertex_attribute_name(elt, vert, i, nm) != 0) continue;
        if(nm == "") continue;
        count = count + 1;
        names[count] = nm;
    }
    return(count);
}
```

## Archiving Attributes into a Nested Group

Moving a set of attributes into a sub-group differs between the vertex level and the element level, and both orders are unforgiving.

**Vertex level** — `Set_super_vertex_attribute` with an `Attributes` value does **not** reliably upsert, so delete the old group entry first. Write the group *before* removing the originals, so a failed write leaves the data intact:

```c
Attributes grp;
Integer gtype = vertex_attr_type(elt, vert, g_group_name);

if(gtype == ATT_TYPE_ATTRIBUTES)
{
    // Only load an existing group when one is really there and really is a
    // group - a failed Get would leave the handle unusable.
    if(Get_super_vertex_attribute(elt, vert, g_group_name, grp) != 0) return(0);
}

// ... add each hit into grp ...

if(gtype != 0) Super_vertex_attribute_delete(elt, vert, g_group_name);

Integer sret = Set_super_vertex_attribute(elt, vert, g_group_name, grp);
if(sret != 0) return(0);              // originals left in place on failure

// Only now is it safe to remove the originals
for(i = 1; i <= nh; i = i + 1) delete_vertex_attr(elt, vert, hits[i]);
```

**Element level** — go through the whole tree. `Set_attribute(Element, name, Attributes)` (ID 1979) is create-only, whereas `Set_attribute(Attributes, name, Attributes)` (ID 1964) is a true upsert; and `Set_attributes` replaces the entire tree, so the existing tree must be read first or the element's other groups are lost:

```c
Integer n_atts = 0;
Get_number_of_attributes(elt, n_atts);

Attributes root;
if(n_atts > 0)
{
    if(Get_attributes(elt, root) != 0) return(0);
}

Integer sret = Set_attribute(root, g_group_name, grp);   // ID 1964, true upsert
if(sret == 0) sret = Set_attributes(elt, root);
```

An uninitialised `Attributes grp;` is the correct starting state for a new group — `Set_attribute` auto-initialises it.

## Behavioural Type Test Instead of Type-Code Whitelisting

Rather than listing the element type codes that count as a super string, ask the API whether it will answer:

```c
// A super string is anything Get_super_vertex_coord will talk to.
Real px = 0.0, py = 0.0, pz = 0.0;
if(Get_super_vertex_coord(elt, 1, px, py, pz) != 0)
{
    g_skip_not_super = g_skip_not_super + 1;
    continue;
}
```

`Get_super_use_vertex_attribute(elt, &use)` works the same way — it only succeeds on a super string, so it doubles as the type test *and* tells you whether the vertex-attribute array exists:

```c
Integer use = 0;
if(Get_super_use_vertex_attribute(elt, use) != 0) { /* not a super string */ }
else if(use == 0)                                 { /* super string, no vertex attrs */ }
```

Testing behaviour survives new element types and legacy variants that a whitelist would reject. Where a type code genuinely changes the meaning of the operation — type 11 holds one height for the whole string — check the code explicitly and refuse, rather than writing one arbitrary value over the lot.

## Dynamic_Element to Fixed Array for Repeated Indexing

When the same selection is indexed many times, copy it once into a local array sized from the count. 12dPL supports a variable-length local array, so the size can come from the validate:

```c
Dynamic_Element elts;
Integer n_src = collect_source(src_box, elts);
if(n_src == 0) { Null(elts); continue; }

Element src[n_src + 1];                 // +1 because indices are 1-based
Integer i;
for(i = 1; i <= n_src; i = i + 1) Get_item(elts, i, src[i]);
Null(elts);                             // release the Source_Box lock early
```

This also releases the `Source_Box` data lock before the long processing loop starts.

## Progress Reporting from a Long Loop

Update the status line every N items rather than every item — a `Set_data` per element on a 20,000 element run costs more than the work:

```c
#define PROGRESS_INTERVAL 100
...
for(i = 1; i <= n_src; i = i + 1)
{
    process_element(src[i], include_empty);

    if(i % PROGRESS_INTERVAL == 0)
        Set_data(message, "Converting " + To_text(i) + " / " + To_text(n_src),
                 MESSAGE_LEVEL_GENERAL);
}
```

## Skip-Reason Counters in a Scan Report

A run that processed fewer elements than were selected must be able to say why. Keep one counter per reason and print only the non-zero ones:

```c
{
    Integer g_stat_elt_not_super     = 0;   // not a super string
    Integer g_stat_elt_no_vert_attrs = 0;   // no vertex-attribute array
    Integer g_stat_elt_flat          = 0;   // 2d string - one height per string
}
...
if(g_stat_elt_not_super > 0)
    log_msg("  Skipped, not super string: " + To_text(g_stat_elt_not_super));
if(g_stat_elt_flat > 0)
    log_msg("  Skipped, 2d string       : " + To_text(g_stat_elt_flat));
```

Do the same for truncation against a hard limit, and make it a warning rather than a count, because the result is incomplete rather than merely smaller:

```c
if(g_rows_truncated > 0)
    log_msg("  WARNING: row limit reached (" + To_text(MAX_ROWS)
          + ") - some vertices are not shown.");
```

Then turn the totals into one status line that answers "why did nothing happen?" directly:

```c
if(n_adjusted == 0)
{
    Text why = "No vertex carried a readable '" + att_name + "'.";
    if(g_stat_vert_off_tin > 0) why = "Every vertex fell outside the tin.";
    Set_data(cmb, "Nothing adjusted. " + why, MESSAGE_LEVEL_WARNING);
}
```

## Index-Never-Zero Lookup Helpers

A helper that returns an index into a 1-based array must never return 0 as "not found" if the caller will use the result directly — index 0 is a hard bounds error, not an empty slot. Give the overflow case a real slot instead:

```c
Integer find_or_add_model(Text name)
{
    Integer i;
    for(i = 1; i <= g_n_models; i = i + 1)
    {
        if(g_model_name[i] == name) return(i);
    }

    if(g_n_models < MAX_MODELS - 1)
    {
        g_n_models = g_n_models + 1;
        g_model_name[g_n_models] = name;
        return(g_n_models);
    }

    // Table full: everything else collects under one overflow entry
    if(g_n_models < MAX_MODELS)
    {
        g_n_models = g_n_models + 1;
        g_model_name[g_n_models] = "(other models)";
    }
    return(g_n_models);
}
```

Where 0 *is* a legitimate "not found" (`find_column` returning 0 for an attribute that has no column), the caller must test it before use — `if(col == 0) continue;`.
## Explode Vertices to Points, Keeping Attributes

Turn each vertex of a string into a one-vertex point that carries the vertex's own attributes and the string's (QLA_FLAG_Trimesh, `_explode.H`):

```c
Element pt = Create_super(1, elt);                  // SEEDED overload: 1 = vertex count
Set_super_vertex_coord(pt, 1, x, y, z);
Attributes vatt;
if(Get_super_vertex_attributes(elt, vert, vatt) == 0)
{
    Set_super_use_vertex_attribute(pt, 1);          // required before the next call
    Set_super_vertex_attributes(pt, 1, vatt);       // the whole group, in one call
}
if(have_elt_atts == 1)                              // Get_number_of_attributes(elt) > 0
{
    Attributes eatt;
    if(Get_attributes(elt, eatt) == 0) Set_attributes(pt, eatt);
}
Set_model(pt, out_model);
```

`Create_super(Integer num_pts, Element seed)` copies the seed's colour, name, style and flags. Its first argument is the vertex count, the opposite of `Create_super(flags, n)`. Guard `Get_attributes` with the attribute count, as everywhere else.

## Saved Panel Settings as a `name = value` File

A panel whose fields are re-typed for every job can save them and load them back (potholeCards, `_info.H`):

- **Write** with `File_open(path, "w", "ccs=UTF-8", f)`, one `key = value` per line. Check every `File_write_line` and the `File_close`.
- **Never rename a key.** Keys are case-insensitive, `#` lines are comments, and unknown keys are logged and skipped. The value is everything after the first `=`, `Text_justify`'d, with trailing CR/LF stripped.
- **Keep a per-key "have" flag**, so a key saved blank comes back blank and a key that is absent leaves its box alone.
- **Check a `Choice_Box` value against its list** before `Set_data`.
- **Resolve a bare file name against the project folder.** Auto-load the default file when `File_exists` finds it, and apply loaded values through one pending path at the top of the event loop that the Load button uses too.

## Variable-Length Records in Fixed Arrays

12dPL has no structs and no 2-D arrays. Keep variable-length records (a profile per trench, say) in **one flat pool** with a `first`/`n` pair per record, and roll the pool back when a record is rejected late:

```c
Integer pool_mark = g_pool_used;
// ... append this record's points to g_pool_x[] / g_pool_z[] ...
if(record_usable(...) == 0) { g_pool_used = pool_mark; return(0); }   // discard cleanly
g_rec_first[r] = pool_mark + 1;
g_rec_n[r]     = g_pool_used - pool_mark;
```

For fixed-width records, flatten with a stride: `slot = (i - 1) * 3 + p`. Source: potholeCards `_trench.H`, `_globals.H`.

## Optional New_Select_Box: Presence, Then Silent Validate

The two-argument `Validate(New_Select_Box, Element &)` writes a message and moves the cursor when it fails, and returns `NO_NAME` (10) for an optional empty box. For an optional pick, test presence first and validate silently:

```c
Set_optional(trench_select, 1);
Text chk = "";
if(Get_data(trench_select, chk) != 0) chk = "";
if(chk != "")
{
    Integer ok = Validate(trench_select, elt, 1);   // silent: no message, cursor stays
    if(ok == TRUE) have_trench = 1;
    else if(ok == 0) { /* an invalid pick: say so in the status line */ }
}
```

Source: potholeCards panel (manual IDs 2241/2242).

## Auto Value with a Manual Override

A value the macro can work out, and the user may override: a `Named_Tick_Box` "Auto" drives `Set_enable(int_box, !auto)` from its toggle event, starting from `Set_enable(int_box, 0)` before `Show_widget`. In Auto, recount from the source data instead of trusting a stored total (MultiPlot counts the `<title_block>` entries). On Load, warn at level 2 when the stored total disagrees with the recount. Remember that `Validate(Integer_Box, Integer &)` returns `TRUE` (1) when valid.

## Plot Sheet Viewport Footprint

To draw where each sheet of a `.12dmpsf` multi-plot falls in world coordinates (MultiPlot `_boxes.H`, FastPlot `_mpsf.H`):

- The first `<plan_frame>` of a `<page>` is the main frame; a second is an inset.
- `<origin_x>`/`<origin_y>` are the **world point at the viewport centre** (FastPlot: "checked against 12d's own output").
- `<scale>` is the plot scale and `<rotation>` is in degrees, anticlockwise. The four `*_margin` values are mm on the sheet.
- `<view_to_draw>` and `<frame_model>` name the view and the frame model. `<title_block>` follows the frame; match its `<title_file>` by lower-cased file name.
- `plotter_type` and `paper_code` are inherited from the nearest enclosing `<page>`.
- The `user_variables_set/_name/_value` lists run in parallel, and when an index repeats, the first entry wins.

```c
Real k  = scale / 1000.0;                       // mm on the sheet -> world units
Real hw = (W_MM - ml - mr) / 2.0 * k;
Real hh = (H_MM - mb - mt) / 2.0 * k;
// each corner (dx, dy) in (+-hw, +-hh), rotated by a and moved to the origin:
x = ox + dx * Cos(a) - dy * Sin(a);
y = oy + dx * Sin(a) + dy * Cos(a);
```

Draw the footprint into a construction model with `Create_super(12, 5)` and `String_close`, and keep that model off any plotted view. For plotting a sheet headlessly, see reference.md, "Plotting (plot frames and Plot_Parameter_File)".

## Two-Column Tab Layout

For a tab with many fields, use `Create_horizontal_group(BALANCE_WIDGETS_OVER_WIDTH)` holding two `Create_vertical_group(ALL_WIDGETS_OWN_HEIGHT)` columns. Give every field the same `FIELD_CHARS` width, so there is no empty band down the right, and size the status box from the worst-case message it will show (potholeCards panel).

## TfNSW Survey Conventions Seen in the Macros

Domain rules stated in macro source or comments. They come from the TfNSW Utility Schema and the hosted app, not from 12d behaviour, but they recur in every TfNSW survey macro:

- **A utility string's Z is the obvert (top of pipe).** Invert = Z − diameter. A `Drainage` element states inverts, so `DepthLocation` is "Invert" there and "Obvert" for other strings. Do not write `invertLevel` when a Depth can be stated: the app trusts a stated level. potholeCards `_json.H` records the failure: writing "Invert" for a utility string "put every pipe one size too high on the sheet".
- **Mapfile code classification.** The code is the first two characters of the string name when the third is not a letter (`BK`, `bk1` and `BK 2` match; `Fibre` does not). The code decides first, then the model name: `UTILITY*` is a service, `SURVEY*` is a feature by its words, or left out. `XB` (trench bottom) is an excavation, `XT` is left out, and `LG` is gas, not lip (potholeCards `_features.H`).
- **`QualityLevel` stores the whole phrase**: `"Quality Level A"` (also B, C, D, Unknown). `DepthLocation` holds `"Ground Level"` and similar. Compare with an exact, trimmed, case-insensitive match (QLA_FLAG_Trimesh `_globals.H`, `_utils.H`).
- **Em and en dash:** build them with `Set_char` (151 = em dash, 150 = en dash, cp1252). A typed one is three UTF-8 bytes, which `cc4d` takes as three characters.
