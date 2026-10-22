# 12dPL Macro Development Reference

## File Types

| Extension | Purpose                           |
|-----------|-----------------------------------|
| `.4dm`    | 12dPL macro source file           |
| `.H`/`.h` | Header / include file            |
| `.4do`    | Compiled macro (output)           |

## Data Types

### Core Types

| Type               | Description                        |
|--------------------|------------------------------------|
| `Integer`          | 32-bit whole number                |
| `Integer64`        | 64-bit whole number (e.g. `123LL`) |
| `Real`             | 64-bit floating-point number       |
| `Text`             | String / text value                |
| `void`             | No return value                    |

### Geometric Types

| Type               | Description                        |
|--------------------|------------------------------------|
| `Point`            | 3D point (x, y, z)                |
| `Line`             | 3D line joining two Points         |
| `Arc`              | Helix projecting onto a circle     |
| `Spiral`           | Transition with varying radius     |
| `Parabola`         | Parabola (used in vertical geometry) |
| `Segment`          | Point, Line, Arc, Parabola, or Spiral |

### 12d Model Handles

| Type               | Description                        |
|--------------------|------------------------------------|
| `Element`          | Handle to a 12d Model entity       |
| `Model`            | Handle to a 12d Model model        |
| `Tin`              | Handle to a 12d Model tin          |
| `View`             | Handle to a 12d Model view         |
| `File`             | File handle                        |

### Dynamic Arrays

| Type               | Description                        |
|--------------------|------------------------------------|
| `Dynamic_Element`  | Dynamic array of elements          |
| `Dynamic_Integer`  | Dynamic array of integers          |
| `Dynamic_Integer64` | Dynamic array of 64-bit integers  |
| `Dynamic_Real`     | Dynamic array of reals             |
| `Dynamic_Text`     | Dynamic array of text              |

### Math Types

| Type               | Description                        |
|--------------------|------------------------------------|
| `Vector2`          | 2D vector (X, Y)                  |
| `Vector3`          | 3D vector (X, Y, Z)               |
| `Vector4`          | 4D vector (X, Y, Z, W)            |
| `Matrix3`          | 3x3 matrix (9 Reals)              |
| `Matrix4`          | 4x4 matrix (16 Reals)             |

### UI Widget Types

| Type               | Description                        |
|--------------------|------------------------------------|
| `Panel`            | User-defined panel                 |
| `Button`           | Button on a panel                  |
| `Vertical_Group`   | Vertical widget container          |
| `Horizontal_Group` | Horizontal widget container        |
| `Input_Box`        | General text input                 |
| `Model_Box`        | Model selection                    |
| `Tin_Box`          | Tin selection                      |
| `View_Box`         | View selection                     |
| `Colour_Box`       | Colour picker                      |
| `Message_Box`      | Message display (supports multi-line text with `\n`) |
| `Choice_Box`       | Choice selection                   |
| `Tick_Box`         | Unnamed checkbox (takes only `Message_Box`) |
| `Named_Tick_Box`   | Labelled checkbox with initial state       |
| `Projection_Box`   | Coordinate system / projection picker      |
| `Attributes_Box`   | Attribute editor widget                    |
| `Real_Box`         | Real number input                  |
| `Integer_Box`      | Integer input                      |
| `Name_Box`         | Name input                         |
| `File_Box`         | File selection                     |
| `Source_Box`       | Source/string selection             |
| `GridCtrl_Box`     | Grid control                       |
| `Select_Box`       | Selection box                      |
| `New_Select_Box`   | Inline element selection (newer Select_Box variant) |
| `Select_Button`    | Selection button                   |
| `Menu`             | Popup/context menu (pre-panel UI)  |
| `Widget_Pages`     | Tabbed page container              |
| `Tab_Box`          | Modern tabbed interface container  |
| `GridCtrl_Box`     | Grid/table control                 |
| `Colour_Message_Box` | Coloured status message display  |
| `Draw_Box`         | Custom drawing canvas              |
| `Log_Box`          | Structured log/results display with expandable groups |
| `Log_Line`         | Individual line in a `Log_Box` (text, group, or highlight) |
| `Screen_Text`      | Non-interactive text label on a panel |

### Other Types

| Type               | Description                        |
|--------------------|------------------------------------|
| `Uid`              | Unique identifier for entities     |
| `Guid`             | Global unique identifier           |
| `Blob`             | Binary object                      |
| `Attributes`       | Attribute tree handle (see Attributes section) |
| `SDR_Attribute`    | Survey Data Reduction attribute    |
| `Undo` / `Undo_List` | Undo system handles             |
| `XML_Document`     | XML document handle                |
| `XML_Node`         | XML node handle                    |
| `Connection`       | Database connection                |
| `Select_Query`     | Database select query              |
| `Transaction`      | Database transaction               |
| `Map_File`         | Map file handle                    |
| `Screen_Text`      | Screen text handle                 |
| `Textstyle_Data`   | Text style information             |

## Global Variable Blocks

12dPL supports file-scope global variables using bare `{ }` blocks outside any function. This is the standard way to declare shared state accessible by all functions in a macro:

```c
#define MAX_ITEMS 1000

{
    Integer g_count;
    Real    g_x[MAX_ITEMS], g_y[MAX_ITEMS], g_z[MAX_ITEMS];
    Text    g_names[MAX_ITEMS];
}
```

Fixed-size arrays (`Real arr[N]`) can be declared in global blocks for inter-function shared data. Use a `#define` constant for the array size.

## Preprocessor Directives

```c
#define NAME value
#define FUNC(x, y) ((x) + (y))
#include "filename.H"
#ifdef NAME
#ifndef NAME
#else
#endif
```

Compile with the macro's directory as the working directory. On this V15
installation, passing an absolute source path from the workspace root did
not resolve its relative headers. The VS Code tasks use `${fileDirname}`.

### Compile-Time Version Check

```c
#if VERSION_4D >= 1500
    // Code for 12d Model V15+ only
#endif
```

`VERSION_4D` is a predefined preprocessor constant set by the compiler/runtime. Use `#if` (not `#ifdef`) with `>=` or `==` comparisons to target specific 12d Model versions.

## Function Declaration

```c
Integer my_function(Real param1, Text &param2)
{
    // pass by value: param1
    // pass by reference: &param2
    return 0;
}
```

- Use `&` for pass-by-reference / output parameters
- Array parameters: `Integer arr[]`
- Forward declarations: `void bar();` then define later
- Comma-separated declarations: `Real x, y, z;`
- Functions can return handle types (e.g. `Element`, `Model`), not just scalars
- `++` and `--` increment/decrement operators are supported (C-like)
- `+=` compound assignment works on `Text` (string append): `msg += "suffix"`, and on numeric types: `count += 1`
- Real literals with trailing dot are valid: `Real x = 0.;` (equivalent to `0.0`)
- Empty array declarations are valid for passing zero-length arrays: `Text field_name[0];`

## Output & User Interaction

| Function | Purpose |
|----------|---------|
| `Prompt(Text msg)` | Display a message |
| `Prompt(Text msg, Text &ret)` | Prompt for text input |
| `Prompt(Text msg, Integer &ret)` | Prompt for integer input |
| `Prompt(Text msg, Real &ret)` | Prompt for real input |
| `Error_prompt(Text msg)` | Display an error message |
| `Choice_prompt(Text msg, Integer count, Text choices[], Text &reply)` | Multi-choice prompt |
| `Yes_no_prompt(Text msg, Text &reply)` | Yes/No prompt |
| `View_prompt(Text msg, Text &name)` | Prompt for view name |
| `Colour_prompt(Text msg, Text &name)` | Prompt for colour name |
| `Exit(Text msg)` | Terminate macro immediately with message |
| `Model_prompt(Text msg, Text &ret)` | Prompt for model name |
| `Tin_prompt(Text msg, Text &ret)` | Prompt for TIN name |
| `File_prompt(Text msg, Text ext, Text &ret)` | Prompt for file path |

**CRITICAL:** `Print(Text msg)` writes to the 12d **Output Window** (not a console). Add `"\n"` for newlines. Call `Show_console(1)` AFTER all `Print()` calls. For interactive prompts, use `Prompt()` and `Error_prompt()`.

**NOTE:** `Prompt(Text)` called from inside a panel event loop behaves as a text **input** dialog (the one-argument form expects the user to type something back). It is not a display-only dialog. To show non-interactive information:
- **Output Window:** `Clear_console(); Print(text + "\n"); Show_console(1);` — brings the 12d Output Window to front. Panel stays open.
- **Modal dialog:** `Error_prompt(text)` — shows a modal OK-dismiss dialog. Use sparingly (blocks input).

**Multi-line string building:** 12dPL does **not** support adjacent string literal concatenation like C (`"a" "b"`). Concatenate with `+`:
```c
Text msg;
msg = "Line 1\n";
msg = msg + "Line 2\n";
msg = msg + "Line 3";
Print(msg + "\n");
```

## Common Library Functions

Library implementations run inside 12d Model, but `cc4d` knows built-in
declarations and checks calls. Normal mode rejects unknown function names;
compilation is not a substitute for testing handle validity or live results.

### Model Operations
- `Get_model(Text name, Model &model)` — Get model by name (reference param form)
- `Model Get_model(Text name)` — Get model by name (return value form)
- `Create_model(Text name, Model &model)` — Create a new model (reference param form)
- `Model Create_model(Text name)` — Create a new model (return value form)
- `Delete_model(Model model)` — Delete a model
- `Model_delete(Model model)` — Delete a model (alternative name)
- `Delete_models(Text name_match, Integer views_redraw)` — Delete all models matching a name. `views_redraw`: 0=don't redraw views, 1=redraw. Useful for clearing output models between runs. **Pass 1 if the model was visible.** Deleting a model does not rub out what is already painted — with 0 the elements stay drawn on screen until something else happens to force a redraw, which reads to the user as a leftover from the previous run. **It fails on a locked model** — one whose elements this or another macro still holds handles to — with `Model "<name>" is locked hence cannot be deleted!` on the command line; release the handles first (see "Handles hold locks" below).
- `Integer Model_clean(Model model, Integer raster_mode)` — delete every element in a model but keep the model (ID 3836; `raster_mode` 0 keeps raster elements). Returns non-zero if the model or any element in it is locked. Cheaper than delete-and-recreate for a scratch model whose contents are rebuilt each time; take the model off any view first if it is displayed.
- `Get_name(Model model, Text &name)` — Get model name
- `Get_model(Element elt, Model &model)` — Get the model an element belongs to (reverse of `Set_model`)
- `Model_exists(Text name)` — Check if model exists by name. Returns **non-zero** if it exists, 0 if not (manual ID 63, `models-views.md`: "the opposite of most 12dPL return values"). Test `!= 0` / `== 0`. **Do not compare against `MODEL_EXISTS`** — that constant (2 in the V15 `set_ups.h`, 1 in some older copies) is what `Validate(Model_Box, ...)` returns, not this function; comparing the two can reject a model that exists, the same trap as `Tin_exists` vs `TIN_EXISTS`. Evidence: the reference examples `macros examples/Trimesh_centroid_panel_01.3/01.4` compare `Model_exists(name) == MODEL_EXISTS` and work only because they `#define MODEL_EXISTS 1` locally (line 18); with the installed `set_ups.h` (2) the same test would reject every existing model. `MODEL_EXISTS` is not a compiler built-in.
- `Model_exists(Model handle)` — Check if a model handle is valid (overload taking handle, not name). Returns non-zero if valid, 0 if invalid.
- `Get_model_create(Text name)` — Combined get-or-create: returns existing model or creates a new one. Simpler than checking `Model_exists()` first. **Guard the result with `Model_exists(m)`**: 12d refuses some names outright — FastPlot reports that `"FastPlot frames (temporary)"` and `"FastPlot hold - x"` were refused, and keeps to letters, digits, spaces and `/` (folders). `Valid_model_name(Text name, Text &valid)` returns the name 12d would actually use; compare it with yours before relying on a name.
- `Get_project_models(Dynamic_Text &models)` — Get names of all models in the project
- `Get_number_of_items(Model model, Integer &count)` — Get number of elements in a model
- `Model_empty(Model model, Integer &is_empty)` — Check if a model has no elements. Sets `is_empty` to 1 if empty, 0 if not.
- `Integer Find_models(Text pattern, Dynamic_Text &names)` — Find all models matching a wildcard pattern (e.g. `"Leaders/*"`). Returns the count of matching models. Useful for enumerating tree-structured model hierarchies.
- `Set_model(Element el, Model model)` — Assign an element to a model
- `Set_model(Dynamic_Element de, Model model)` — Batch-assign all elements in a dynamic array to a model
- `Calc_extent(Model model)` — Recalculate model extents (call after adding/modifying elements)

### Element Operations
- `Element_exists(Element el)` — Check if an element handle is valid. Returns non-zero if the element exists; 0 if the handle is null/invalid. Use before operations on elements stored in arrays.
- `Create_string(Integer type, Model model, Text name, Integer colour)` — Create a string element
- `Set_name(Element el, Text name)` — Set element name
- `Set_colour(Element el, Integer colour)` — Set element colour
- `Get_colour(Element el, Integer &colour)` — Get element colour as integer
- `Get_name(Element el, Text &name)` — Get element name
- `Get_type(Element el, Text &type)` — Get element type as text ("2d", "3d", "4d", "Alignment", "Circle", "Arc", "Polyline", "Super", "Pipeline", "Pipe", "Text", "Tin", "Plot_Frame", "Feature", "Drainage", "Sewer", "Inteface" [sic])
- `Get_id(Element el, Integer &id)` — Get internal element ID (distinct from `Get_id(Widget)`)
- `Get_id(Element el, Uid &uid)` — Get element's unique identifier as a `Uid`. Use `To_text(uid)` for string comparison between elements.
- `Get_points(Element el, Integer &n_pts)` — Get number of points
- `Element_delete(Element el)` — Delete an element
- `Element_duplicate(Element src, Element &dst)` — Duplicate an element
- `Convert(Element src, Text target_type, Element &result)` — Convert element type (e.g. "Alignment" → "3d"). Delete the converted copy with `Element_delete()` when done.
- `Set_breakline(Element el, Integer flag)` — Set breakline flag (0 = not breakline)
- `Set_style(Element el, Text linestyle)` — Set line style
- `Get_style(Element el, Text &style_name)` — Get element's linestyle name. Returns 0 on success. Not used for Tin or Text elements.
- `Set_weight(Element el, Real weight)` — Set line weight (thickness) on an element. Weight is a Real value (e.g. 0.5 to 10.0). Call `Calc_extent(el)` after setting.
- `Get_weight(Element el, Real &weight)` — Get line weight of an element. Returns 0 on success.

### Super String Data (preferred)
- `Create_super_string()` — Create a super string
- `Element Create_super(Integer flag1, Integer n_vertices)` - Allocate a super string using dimension flags, not element type codes. Values such as 7, 12 and 21 are bitmasks. Use the dimension definitions in the installed `set_ups.h`; use `Create_text` for a text element. Manual section 5.38.2.1, ID 691.
  - **Decoding the bits.** `set_ups.h` defines `String_Super_Bit(n)` as `(1 << Att_n)` with `Att_ZCoord_Value = 1`, `Att_ZCoord_Array = 2`, `Att_Radius_Array = 3`, `Att_Major_Array = 4` (lines 389-392, 442 of the V15 install). So z-per-vertex is **4**, radius-per-vertex **8**, major-arc flag per vertex **16**: `12` = 3d with arcs, `28` = 3d with arcs including > 180° ones (what a geometry copy needs). `12` is not "type 12".
- `Element Create_super(Integer num_pts, Element seed)` — **seeded** overload (ID 692): a super string of `num_pts` vertices copying the seed's colour, name, style and flags. **The first argument is the vertex count here**, where in `Create_super(7, 1)` it is the dimension flags — `Create_super(1, elt)` is a one-vertex point that looks like `elt`. The seed must be a super string. QLA_FLAG_Trimesh still calls `Set_super_use_vertex_attribute(pt, 1)` before writing vertex attributes, so do not rely on the seed carrying that flag.
- `Integer Get_super_data(Element super, Integer i, Real &x, Real &y, Real &z, Real &r, Integer &b)` / `Set_super_data(Element super, Integer i, Real x, Real y, Real z, Real r, Integer b)` — one vertex with its following segment's radius `r` and major-arc flag `b` (IDs 696, 699). Use the pair to copy a string's geometry, arcs included, into a fresh `Create_super(28, n)` without duplicating its name, style and attributes. `Set_super_data` needs the radius/major dimensions allocated.
- `Integer String_closed(Element elt, Integer &closed)` / `Integer String_close(Element elt)` — test and set closure (IDs 368, 367); use the pair when copying geometry.
- `Integer Get_super_pipe(Element super, Real &diameter)` - Read a constant-diameter round super pipe; returns non-zero if the dimension is absent or the element is not Super. ID 707. The legacy `Get_pipe_diameter` is rejected as obsolete by normal V15 compilation; do not substitute a drainage getter for it.
- `Set_super_vertex_coord(Element el, Integer vertex, Real x, Real y, Real z)` — Set vertex coordinates (1-based)
- `Get_super_vertex_coord(Element el, Integer vertex, Real &x, Real &y, Real &z)` — Get vertex coordinates (1-based)
- `Get_super_vertex_point_number(Element el, Integer vertex, Text &name)` — Get point ID/name from a vertex. Returns 0 on success.
- `Get_super_vertex_text(Element el, Integer vertex, Text &text)` — Get text annotation from a vertex. Returns 0 on success.
- **Element type 11 is a 2d string** — one constant height for the whole string (type 12 is the 3d string with a height per vertex). A macro that writes a per-vertex Z must refuse type 11 rather than write one arbitrary height over the lot: `Get_type(elt, t); if(t == 11) skip;`
- `Set_super_data(Element el, Integer pt, Real x, Real y, Real z, Real radius, Integer flag)` — Set super string vertex with arc radius. Use `radius > 0` for arc segments between vertices; `radius = 0.0` for straight segments. `flag`: typically 0.
- `Set_data(Element el, Integer pt_num, Real x, Real y, Real z)` — Set point data
- `Get_data(Element el, Integer pt_num, Real &x, Real &y, Real &z)` — Get point data

### Per-Vertex Attributes (Super Strings)

A super string can carry a whole attribute tree on **each vertex**, independent of the element's own attributes. All calls are 1-based on the vertex number and return 0 on success.

**The array switch** — a string either has a vertex-attribute array or it does not. Nothing can be read or written until it does:
- `Get_super_use_vertex_attribute(Element el, Integer &uses)` — `uses` = 1 when the string has a vertex-attribute array. **Non-zero return means the element is not a super string at all**, so this doubles as a behavioural super-string test.
- `Set_super_use_vertex_attribute(Element el, Integer on)` — turn the array on (`1`). Required before writing a brand new attribute onto a string that has never carried one; harmless when it is already on.

**Enumerating one vertex:**
- `Get_super_vertex_number_of_attributes(Element el, Integer vertex, Integer &n)` — count of top-level attributes on that vertex.
- `Get_super_vertex_attribute_name(Element el, Integer vertex, Integer idx, Text &name)` — name at a 1-based index. **Snapshot every name before deleting any of them** — deleting while enumerating by index reshuffles the numbering.
- `Get_super_vertex_attributes(Element el, Integer vertex, Attributes &att)` — the vertex's whole attribute group as one handle. Then use the ordinary `Get_number_of_attributes(Attributes, &n)` / `Get_attribute_name(Attributes, idx, &name)` / `Get_attribute(Attributes, idx, …)` walk. **Prefer this when reading many attributes**: it costs one call per attribute the vertex actually has, instead of one lookup per column you might be looking for.

**Reading and writing by name** (query the type first and use the matching overload — the same attribute name may be stored as Real on one job and Text on another):
- `Get_super_vertex_attribute_type(Element el, Integer vertex, Text att_name, Integer &type)` — type codes as elsewhere: 1=Integer, 2=Real, 3=Text, 4=Blob, 5=Attributes, 6=Uid, 7=Integer64, 8=Guid. Non-zero return = the vertex has no such attribute.
- `Super_vertex_attribute_exists(Element el, Integer vertex, Text att_name)` — non-zero when present.
- `Get_super_vertex_attribute(Element el, Integer vertex, Text att_name, Text &value)` — Text overload.
- `Get_super_vertex_attribute(…, Real &value)` / `(…, Integer &value)` / `(…, Integer64 &value)` / `(…, Uid &value)` / `(…, Guid &value)` — one per stored type.
- `Get_super_vertex_attribute(Element el, Integer vertex, Text att_name, Attributes &group)` — read a nested attribute **group** off a vertex.
- `Set_super_vertex_attribute(Element el, Integer vertex, Text att_name, Text value)` — and the `Real` / `Integer` / `Attributes` overloads. Creates the attribute if absent.
- `Integer Set_super_vertex_attributes(Element el, Integer vertex, Attributes att)` — write a vertex's whole attribute group in one call (ID 2003); non-zero if the vertex-attribute dimension is not on, so call `Set_super_use_vertex_attribute(el, 1)` first. Pairs with `Get_super_vertex_attributes` to copy a vertex's attributes onto another string (conventions.md, "Explode Vertices to Points, Keeping Attributes").
- `Super_vertex_attribute_delete(Element el, Integer vertex, Text att_name)` — remove one attribute from one vertex.

**Gotcha — `Set_super_vertex_attribute` with an `Attributes` group does not reliably upsert.** When replacing an existing group on a vertex, delete the old entry first, then set:
```c
if(gtype != 0) Super_vertex_attribute_delete(elt, vert, group_name);
Integer sret = Set_super_vertex_attribute(elt, vert, group_name, grp);
```
(This is the opposite of the element-level handle call `Set_attribute(Attributes, Text, Attributes)` ID 1964, which *is* a true upsert.)

### 2D/3D/4D String Data Access
- `Create_2d(Integer n_pts)` — Create empty 2D string with n points
- `Create_2d(Real x[], Real y[], Real z, Integer count)` — Create 2D string from coordinate arrays with fixed height
- `Create_3d(Integer n_pts)` — Create empty 3D string with n points
- `Create_3d(Real x[], Real y[], Real z[], Integer count)` — Create 3D string from coordinate arrays
- `Get_2d_data(Element el, Integer pt, Real &x, Real &y)` — Get per-point 2D coordinates (1-based)
- `Get_2d_data(Element el, Real &level)` — Get z-height of entire 2D string
- `Set_2d_data(Element el, Integer pt, Real x, Real y)` — Set per-point 2D coordinates
- `Set_2d_data(Element el, Real level)` — Set z-height for entire 2D string
- `Get_3d_data(Element el, Integer pt, Real &x, Real &y, Real &z)` — Get per-point 3D coordinates
- `Get_3d_data(Element el, Real x[], Real y[], Real z[], Integer max, Integer &npts)` — Batch: get all 3D data into arrays (more efficient than per-point loop)
- `Set_3d_data(Element el, Integer pt, Real x, Real y, Real z)` — Set per-point 3D coordinates
- `Get_4d_data(Element el, Integer pt, Real &x, Real &y, Real &z, Text &t)` — Get per-point 4D data
- `Get_4d_data(Element el, Real x[], Real y[], Real z[], Text t[], Integer max, Integer &npts)` — Batch: get all 4D data into arrays
- `Get_polyline_data(Element el, Integer pt, Real &x, Real &y, Real &z, Real &r, Integer &f)` — Get polyline point data (includes radius and flag)
- `Get_super_data(Element el, Integer pt, Real &x, Real &y, Real &z, Real &r, Integer &f)` — Get super string point data
- `Get_interface_data(Element el, Integer pt, Real &x, Real &y, Real &z, Integer &f)` — Get interface point data
- `Get_pipe_data(Element el, Integer pt, Real &x, Real &y, Real &z)` — Get pipe point data

### Segment Text Annotation (Super Strings)
- `Set_super_use_segment_text_array(Element el, Integer use)` — Enable (`1`) or disable (`0`) per-segment text on a super string. When enabled, each segment can have different text. ID 1189.
- `Set_super_use_segment_text_value(Element el, Integer use)` — Enable/disable single segment text for all segments. Ignored if the array dimension already exists. ID 1239.
- `Set_super_use_segment_annotation_value(Element el, Integer use)` — Enable/disable segment text annotation display. `1` = show segment text visually. ID 1193.
- `Set_super_segment_text(Element el, Integer seg, Text text)` — Set text for segment `seg` (1-based). ID 1191.
- `Get_super_segment_text(Element el, Integer seg, Text &text)` — Get text for segment `seg`. ID 1192.
- `Set_super_segment_text_size(Element el, Integer seg, Real size)` — Set text size for segment `seg`. ID varies.
- `Set_super_segment_text_colour(Element el, Integer seg, Integer colour)` — Set text colour for segment `seg`. ID 1213.
- `Set_super_segment_text_angle(Element el, Integer seg, Real angle)` — Set text rotation (radians, counterclockwise from segment direction). ID 1203.
- `Set_super_segment_text_justify(Element el, Integer seg, Integer just)` — Set text justification for segment `seg`. ID 1197.
- `Set_super_segment_text_offset_width(Element el, Integer seg, Real offset)` — Set text offset width. ID 1199.
- `Set_super_segment_text_offset_height(Element el, Integer seg, Real raise)` — Set text raise/height offset. ID 1201.
- `Set_super_segment_world_text(Element el)` — Set segment text units to world (metres). ID 1233.
- `Set_super_segment_device_text(Element el)` — Set segment text units to pixels/screen. ID 1232.
- `Set_super_segment_paper_text(Element el)` — Set segment text units to paper (mm). ID 1634.

### Alignment & Chainage
- `Get_chainage(Element el, Real &chainage)` — Get stored start chainage
- `Get_end_chainage(Element el, Real &end_chainage)` — Get end chainage
- `Get_position(Element el, Real chainage, Real &x, Real &y, Real &z, Real &dir)` — Get position at chainage on an alignment. Returns 0 on success.
- `Drop_point(Element el, Real x, Real y, Real z, Real &xf, Real &yf, Real &zf, Real &ch, Real &dir, Real &off)` — Drop perpendicular from point to string. Returns foot point (xf,yf,zf), chainage (ch), direction (dir), and offset (off).
- `Get_hip_points(Element el, Integer &count)` — Get number of Horizontal IP points
- `Get_hip_type(Element el, Integer hip, Text &type)` — Get HIP type: "IP", "Curve", or "Spiral" (1-based)
- `Get_hip_geom(Element el, Integer hip, Integer mode, Real &x, Real &y)` — Get HIP geometry by mode:

| Mode | Returns |
|------|---------|
| 0 | IP (HIP) coordinates |
| 1 | TC/TS (start of curve / left tangent point) |
| 2 | CT/ST (end of curve / right tangent point) |
| 3 | Curve centre |
| 4 | SC point (spiral to curve) |
| 5 | CS point (curve to spiral) |

- `Get_hip_data(Element el, Integer hip, Real &x, Real &y, Real &radius, Real &left_spiral, Real &right_spiral)` — Get full HIP numeric data: IP position, radius, and spiral lengths

**HIP type integer encoding** (from `Get_hip_type` as integer values):

| Type | Meaning |
|------|---------|
| 0 | HIP only (straight) |
| 1 | Curve only |
| 2 | LH Spiral only |
| 3 | LH spiral + curve |
| 4 | RH spiral only |
| 5 | Curve + RH spiral |
| 6 | LH + RH spiral |
| 7 | LH spiral + curve + RH spiral |
- `Get_vip_points(Element el, Integer &count)` — Get number of Vertical IP points
- `Delete_vip(Element el, Integer index)` — Delete VIP at index (always deletes index 1 when stripping all)
- `Append_vip(Element el, Real chainage, Real height)` — Add VIP at chainage with height
- `Get_length(Element el, Real &length)` — Get element length
- `Get_length_3d(Element el, Real &length)` — Get 3D length specifically

### Drainage & Pipeline Operations
- `Get_drainage_pipe_diameter(Element el, Integer pipe_idx, Real &diameter)` — Get diameter of pipe segment at `pipe_idx` (1-based). Returns 0 on success. Works on both Drainage and Pipeline elements.
- `Get_drainage_pipe_inverts(Element el, Integer pipe_idx, Real &inv_lhs, Real &inv_rhs)` — Get invert levels at start (LHS) and end (RHS) of pipe segment. Returns 0 on success. Interpolate between `inv_lhs` and `inv_rhs` for intermediate positions.
- `Get_drainage_pipe_thickness(Element el, Integer pipe_idx, Real &w_top, Real &w_bot, Real &w_left, Real &w_right)` — Get pipe wall thickness values (top, bottom, left, right). Returns 0 on success.
- `Set_drainage_pipe_inverts(Element el, Integer pipe_idx, Real inv_lhs, Real inv_rhs)` — Set invert levels at start (LHS) and end (RHS) of pipe segment. Returns 0 on success.
- `Get_drainage_flow(Element el, Integer &dir)` — Get drainage flow direction. `dir`: 1 = downstream is last vertex (increasing index), other values = downstream is first vertex. Returns 0 on success.
- `Get_drainage_data(Element el, Real x[], Real y[], Real z[], Real r[], Integer f[], Integer max, Integer &count)` — Batch get all drainage vertex coordinates and attributes into arrays. `max` = array capacity, `count` = actual vertex count returned. Returns 0 on success.
- `Get_drainage_pit_attribute(Element el, Integer pit_no, Text name, Real &value)` — Get a named attribute from a drainage pit (1-based pit index). Common attribute: `"pit chainage"`. Returns 0 on success.
- `Set_drainage_pipe_attribute(Element el, Integer pipe_idx, Text name, Integer value)` — Set a named attribute on a drainage pipe segment (1-based). Returns 0 on success.

**Pipe segment indexing:** A Drainage element with N vertices has N-1 pipe segments. Segment 1 runs from vertex 1 to vertex 2, etc. To find which segment a point is on: use `Drop_point()` to get chainage, then iterate vertices comparing chainages.

### Arc & Circle
- `Get_arc_centre(Element el, Real &x, Real &y, Real &z)` — Get arc centre point
- `Get_arc_start(Element el, Real &x, Real &y, Real &z)` — Get arc start point
- `Get_arc_end(Element el, Real &x, Real &y, Real &z)` — Get arc end point
- `Get_circle_data(Element el, Real &x, Real &y, Real &z, Real &r)` — Get circle centre and radius

### Text Elements
- `Create_text(Text txt, Real x, Real y, Real size, Integer colour)` — Create text element (5-param)
- `Create_text(Text txt, Real x, Real y, Real size, Integer colour, Real angle)` — With angle (6-param)
- `Create_text(Text txt, Real x, Real y, Real size, Integer colour, Real angle, Integer justif, Integer text_units)` — With combined justification and text units (8-param). `justif`: combined code (5=middle-centre). `text_units`: 0=pixel, 1=world. The prototypes file draws the grid as top row 3 6 7, middle 2 5 8, bottom 1 4 9 (left to right), so 3 = top-left and 1 = bottom-left; its right column (7 top, 9 bottom) breaks the pattern — check 7/9 live before relying on them. MultiPlot passes `angle` in radians.
- `Create_text(Text txt, Real x, Real y, Real size, Integer colour, Real angle, Integer justif, Integer text_units, Real offset, Real rise)` — Full form (10-param). `justif`: 1=left. `text_units`: 0=pixel, 1=world.
- `Get_text_value(Element el, Text &value)` — Get the displayed text content
- `Get_text_xy(Element el, Real &x, Real &y)` — Get text insertion point
- `Set_text_style(Element el, Text style)` — Set text style/font name (e.g. `"Arial"`, `"Consolas"`)
- `Set_text_rise(Element el, Real rise)` — Set vertical rise/offset for text element. Useful for multi-line labels where lines need vertical separation.
- `Set_text_units(Element el, Integer mode)` — Set text size units (0=pixel, 1=world)

### Extent / Bounding Box
- `Get_extent_x(Element el, Real &xmin, Real &xmax)` — Get X-axis extent
- `Get_extent_y(Element el, Real &ymin, Real &ymax)` — Get Y-axis extent

### Geometry
- `Calc_extent(Element el)` — Calculate element extents (call after creating/modifying an element before adding to model)
- `Calc_length(Element el, Real &length)` — Calculate element length

### TIN Operations
- `Tin_exists(Text name)` — Check if a TIN of this name exists. Test with `!= 0`: it returns **non-zero**, not the `TIN_EXISTS` (11) code — that code belongs to `Validate()`. Comparing `== TIN_EXISTS` silently rejects every tin, grid tins included.
- `Tin_exists(Tin tin)` — **Handle overload.** Non-zero if the `Tin` handle is valid. Use it to guard a handle that may never have been assigned — an unset `Tin` slot passed to `Tin_height()` takes 12d Model down rather than returning an error. Guard as its own `if`, never as `n >= 2 && Tin_height(tin2, ...)`: `&&` does not short-circuit, so the call still happens.
- `Get_tin(Text name, Tin &tin)` — Get TIN by name (reference param form)
- `Tin Get_tin(Text name)` — Get TIN by name (return value form)
- `Tin_height(Tin tin, Real x, Real y, Real &z)` — Get height from TIN. Returns 0 on success. **Fatal on an unset handle** — see `Tin_exists(Tin)` above.

### Math
- `Pi()` — Returns π
- `Two_pi()` — Returns 2π
- `Sin(Real angle)`, `Cos(Real angle)`, `Tan(Real angle)` — Trigonometry (radians)
- `Asin(Real val)`, `Acos(Real val)` — Inverse trig functions, return radians
- `Atan2(Real y, Real x)` — Arctangent of y/x, returns radians (-π to π). For bearings: `Atan2(dx, dy)` gives clockwise angle from North (0=N, 90=E, 180=S, 270=W).
- `Radians_to_degrees(Real rad, Real &deg)` — Convert radians to degrees
- `Degrees_to_radians(Real deg, Real &rad)` — Convert degrees to radians
- `Degrees_to_dms(Real degrees, Integer &d, Integer &m, Real &s)` — Convert decimal degrees to degrees/minutes/seconds
- `Absolute(Real val)` — Absolute value (Real overload)
- `Absolute(Integer val)` — Absolute value (Integer overload)
- `Sqrt(Real val)` — Square root
- `Mod(Real a, Real b)` — Modulo / remainder
- `Is_null(Real val)` — Returns non-zero if the Real value is null/undefined
- `Quick_sort(Integer count, Integer index[], Real array[])` — Sort arrays. Overloads for `Integer array[]` and `Text array[]` too (IDs 2745-2747). `index[1..count]` comes back holding the slots of `array[]` in **ascending** order; `array[]` is not moved — the native way to sort an index instead of shuffling parallel arrays. **No promise about equal keys**: fix runs of equal keys afterwards when ties must keep their order (conventions.md, "Native `Quick_sort` for anything large"). Seed every `Text` slot before the first call.
- `Min(Real a, Real b)`, `Max(Real a, Real b)` — Minimum/maximum of two values
- `Floor(Real val)`, `Ceil(Real val)` — Floor and ceiling functions
- `Exp(Real val)`, `Log(Real val)`, `Log10(Real val)` — Exponential and logarithm

### I/O
- `File_open(Text filename, Text mode, File &fp)` — Open a file (3-param). Modes: `"w"` = write, `"r"` = read, `"a"` = append. Returns 0 on success. Note: this form now creates UNICODE files only.
- `File_open(Text filename, Text mode, Text ccs_text, File &fp)` — Open a file with encoding control (4-param). `ccs_text`: `""` for ANSI/default, `"ccs=UNICODE"` for Unicode, `"ccs=UTF-8"` for UTF-8. Use this form when ANSI output is needed.
  - **Reading: a BOM wins, and a missing one does not fail the open.** With a non-blank ccs, an existing file's BOM decides the encoding; with no BOM, the ccs does — so `"ccs=UNICODE"` reads a BOM-less ANSI/UTF-8 file as **UTF-16LE** and the open still succeeds (`io-files.md` table). Trying `UNICODE`, then `UTF-8`, then `""` only falls back when an open *fails*, which a wrong encoding never does. Read with `"ccs=UTF-8"` (no BOM → UTF-8; a UTF-16 BOM still → UTF-16LE).
  - **Writing in Unicode mode adds a BOM** (`io-files.md`); an external reader of a `ccs=UTF-8` file must strip U+FEFF. Writing with `""` adds none.
  - **Round-trip a file in the encoding it came in.** Reading a 12d-written UTF-16 file and writing it back with `""` drops the BOM and any non-cp1252 characters; the next `ccs=UNICODE` read then decodes it as UTF-16LE. (Manual-derived; not yet observed live.)
- `File_close(File fp)` — Close a file
- `File_write_line(File fp, Text line)` — Write a line to file
- `File_read_line(File fp, Text &line)` — Read a line from file. Returns 0 on success, non-zero at EOF.
- `File_flush(File fp)` — Flush buffered writes to disk without closing. Call after each line in a debug log (a crash otherwise loses the whole buffer — which is exactly when the log is needed) and after each major block of a large generated file.
- `File_exists(Text filename)` — Returns non-zero if file exists on disk

### Format & Text Parsing
- `To_text(Real val, Integer decimals)` — Format real as text with specified decimal places
- `To_text(Real val, Text format)` — Format real using printf-style format string (e.g. `"%.0lf"`)
- `To_text(Integer val)` — Convert integer to text
- `To_text(Uid uid)` — Convert a Uid handle to its text representation. Useful for element identity comparison: `To_text(uid1) == To_text(uid2)`.
- `From_text(Text source, Real &value)` — Parse text to Real. Returns 0 on success.
- `From_text(Text source, Integer &value)` — Parse text to Integer. Returns 0 on success.
- `From_text(Text source, Dynamic_Text &words)` — Split text into whitespace-delimited tokens
- `Get_subtext(Text source, Integer start, Integer end)` — Extract substring (1-based). Use `end=9999` for "to the end".

### Date & Time
- `Date(Text &date)` — Get current date as text string
- `Time(Text &time)` — Get current time as text string

### Colour
- `Colour_exists(Text name)` — Returns non-zero if named colour exists
- `Colour_prompt(Text msg, Text &name)` — Prompt user for colour name
- `Convert_colour(Text name, Integer &colour)` — Convert colour name to integer code

### View Operations
- `Get_view(Text name)` — Get view by name (return-value form)
- `View_exists(Text name)` — Check if view exists by name
- `View_exists(View view)` — Check if view handle is valid
- `View_prompt(Text msg, Text &name)` — Prompt for view name
- `View_get_models(View view, Dynamic_Text &models)` — Get all model names in a view
- `View_add_model(View view, Model model)` — Add a model to a view so it becomes visible. Useful after creating output models programmatically.
- `View_redraw(View view)` — Force redraw of a view. Call after modifying elements or adding models to refresh the display.
- `Get_last_view(Text &name)` — Get the name of the currently active (last-used) view. Returns 0 on success. Use with `Get_view()` to get the View handle.
- `View_remove_model(View view, Model model)` — Remove a model from a view. **Removing and re-adding a model resets any per-model view settings it carried**, so do it only when the user asked for the effect.
- `View_fit(View view)` — Frame the view on its contents. This is the **only** framing call available: there is no zoom-to-point and no view-centre call, and it fits *everything* currently on the view. To aim it at one feature, remove the other models, fit, then add them back (see conventions.md, "Zoom a View to One Feature"). A negative compile probe on V15 confirms the gap: `View_zoom`, `View_zoom_to`, `View_zoom_extent`, `View_set_centre`, `View_set_window`, `Plan_view_set_centre`, `Plan_view_set_window` and `Plan_view_zoom` are all undefined, and `View_fit` has no extent overload.
- `Calc_extent(View view)` / `Calc_extent(Model model)` — Recalculate extents. The `Element` form is the common one; the `View` form is needed before `View_fit` picks up newly moved geometry, and the `Model` form after bulk element edits.
- `Plan_view_get_plot_scale(View view, Real &scale)` — Plot scale of a **plan** view. Returns non-zero for section and perspective views, which have no plot scale — fall back to a fraction of the data extent. Use it to size a screen-constant marker: `scale / 200.0` is roughly 5 mm on the plot.
- `Model_exists(Model model)` — **Handle overload** of the `Model_exists(Text)` name check; non-zero when the handle is valid.

**Declared, but not relied on.** V15 `cc4d` accepts the whole `Highlight_*` family — `Highlight_create`, `_add_point`, `_add_line`, `_add_arc`, `_add_string`, `_add_text`, `_set_weight`, `_set_linestyle`, `_draw`, `_redraw`, `_clear_drawing`, `_reset`, `_remove`, `_delete_all` — and `Set_cell_back_colour` / `Set_cell_text_colour` for a grid. An earlier note here said they were absent; that came from the 2018 `macros\prototypes.4dm`, which is not what the compiler checks against. The manual still calls the Highlight calls "under development" and marks `Set_cell_colour` "Do not use"; none of them has been run here. `Element_draw(Element, Integer colour)` (ID 372) is confirmed but only paints until the next repaint. The proven way to show the user where something is remains a dedicated model added to the view — see conventions.md, "Marker-in-a-Model Highlight".

### Undo (12d Model Edit → Undo)

In-place edits can be registered with 12d's own undo stack, so the user reverses a whole macro run with **Ctrl+Z**. This is the real undo API — not a home-grown list of created elements to delete.

- `Undo Add_undo_change(Text name, Element original, Element modified)` — register one element's before/after pair. Returns an `Undo` handle.
- `Append(Undo u, Undo_List &list)` — collect the handles.
- `Add_undo_list(Text name, Undo_List list)` — push the whole collection onto the 12d undo stack as **one** entry. `name` is what the user sees on the Undo menu.
- `Null(Undo_List &list)` — initialise/clear before use.

**CRITICAL: the "original" snapshot must sit outside every model.** Duplicate the element before touching it, then detach the copy:
```c
Element original;
if(Element_duplicate(elt, original) == 0)
{
    Model null_model;
    Null(null_model);
    Set_model(original, null_model);   // required — the copy must be in no model
    have_original = 1;
}
// ... modify elt in place ...
Calc_extent(elt);
Undo u = Add_undo_change(PROGRAM_NAME, original, elt);
Append(u, undo_list);
```
Snapshot **once per element**, not once per edit — walk rows grouped by element so each element is duplicated a single time. A sorted grid is *not* grouped by element: walk its visible rows in scan order. Snapshot **only elements that change** (just before the first write), and `Null()` the snapshot handle once `Add_undo_change` has it. See conventions.md, "Single-Entry Undo for an In-Place Edit Run".

### Selection
- `Select_string(Text msg, Element &elt)` — Interactive string selection from view. Returns 0 on success.
- `Select_string(Text msg, Element &elt, Real &x, Real &y, Real &z, Real &ch, Real &ht)` — Extended: also returns pick coordinates (x,y,z), chainage (ch), and height (ht) at the click location. Returns **1** on success (not 0 like the basic form). Use with `find_nearest_vertex()` to snap to the closest vertex.

### Dynamic Arrays
- `Append(Element el, Dynamic_Element &de)` — Add element to array
- `Append(Text item, Dynamic_Text &dt)` — Add text to array
- `Append(Integer val, Dynamic_Integer &di)` — Add integer to array
- `Append(Real val, Dynamic_Real &dr)` — Add real to array
- `Append(Dynamic_Element src, Dynamic_Element &dst)` — Merge one dynamic array into another
- `Get_number_of_items(Dynamic_Element de, Integer &count)` — Count items
- `Get_number_of_items(Dynamic_Text dt, Integer &count)` — Count items
- `Get_number_of_items(Dynamic_Integer di, Integer &count)` — Count items
- `Get_number_of_items(Dynamic_Real dr, Integer &count)` — Count items
- `Get_item(Dynamic_Element de, Integer index, Element &el)` — Get item (1-based)
- `Get_item(Dynamic_Text dt, Integer index, Text &item)` — Get item (1-based)
- `Get_item(Dynamic_Integer di, Integer index, Integer &val)` — Get item (1-based)
- `Get_item(Dynamic_Real dr, Integer index, Real &val)` — Get item (1-based)
- `Set_item(Dynamic_Integer di, Integer index, Integer val)` — Overwrite an item in place (1-based). Also `Set_item(Dynamic_Text …)`, `Set_item(Dynamic_Real …)`. Use for a running tally kept in a dynamic array.
- `Null(Dynamic_Element &de)` — Clear/release dynamic element array
- `Null(Dynamic_Text &dt)` — Clear/release dynamic text array
- `Null(Dynamic_Real &dr)` — Clear/release dynamic real array
- `Null(Dynamic_Integer &di)` — Clear/release dynamic integer array
- `Null(Real array[N])` — Reset a fixed-size Real array to zeros
- `Null(Integer array[N])` — Reset a fixed-size Integer array to zeros
- `Null(Undo_List &ul)` / `Null(Model &m)` — the same initialise/clear call works on other handle types. `Null(Model)` produces the "no model" handle that `Set_model()` needs to detach an element (see the Undo section).
- `Null(Element &e)` — release one element handle. Compile-accepted on V15.

**Handles hold locks.** 12d locks every element a macro holds a handle to, and a model whose elements are held cannot be cleaned or deleted — `Delete_models` then prints `Model "<name>" is locked hence cannot be deleted!` (seen live). Never keep `Element`/`Model` handles in globals across events unless the macro will edit those elements later; keep names or indices, look them up when needed, and `Null()` every handle on every return path. Diagnose with `Get_read_locks(Element, Integer &n)` / `Get_write_locks(Element, Integer &n)`. See conventions.md, "Handles Lock What They Point At".

**Guard `Null()` on a collector that may never have been appended to.** Calling it on a handle that was never initialised is not worth finding out about — track a ready flag and only null when something was actually added.

### Linestyle & Textstyle Enumeration
- `Get_all_linestyles(Dynamic_Text &styles)` — Get all project linestyle names
- `Get_all_textstyles(Dynamic_Text &styles)` — Get all project textstyle names

### Coordinate Conversion
- `Convert_long_lat(Text proj_data, Integer direction, Integer mode, Real &lon, Real &lat)` — Converts easting/northing to WGS84. `direction=1` for grid→geo. Pass easting as `lon`, northing as `lat` (in/out parameters). Returns 0 on success.

### Project Settings
- `Text Get_project_setting_text(Text key)` — Get a project setting as text. Useful keys: `"PROJECTION_DATUM_DATA"` for the current project projection.

### Output Window
- `Print(Text msg)` — Writes to 12d Output Window. Add `"\n"` manually for newlines.
- `Print()` — No-argument form outputs a blank line to the Output Window.
- `Show_console(Integer show)` — `1` to show the Output Window. Call AFTER all `Print()` calls.
- `Clear_console()` — Clear the Output Window contents

### Environment Variables
- `Text Getenv(Text name)` — Get environment variable value (e.g. `Getenv("LIB_4D")`). The variable behind `$USER_LIB` is **`USER_LIB_4D`** — `Getenv("USER_LIB")` is normally empty.
- `Text Get_absolute_path(Text path)` — expand `$USER_LIB/`-style prefixes (manual ID 7815; compile-accepted on V15 though absent from the 2018 prototypes file; untested at runtime). Expand only for local checks and log lines — hand 12d the unexpanded `$USER_LIB\...` form, which it resolves itself.
- `AUTO_OPEN_PDF_PLOTS_4D` — when not `0`/`false`, 12d opens a PDF viewer for every plot it writes; a macro cannot change it (read it with `Getenv` and warn).
- Common 12d environment variables: `LIB_4D`, `USER_LIB_4D`, `USER_4D`, `EDIT_BOX_WIDTH_IN_CHARACTERS_4D`
- Common Windows environment variables: `TEMP` / `TMP` (writable scratch dir — preferred location for log files), `USERNAME` (SAM account name), `USERDOMAIN` (NetBIOS domain — e.g. `CORP`, `TFNSW`), `USERDNSDOMAIN` (full DNS domain — e.g. `corp.trans.internal`), `LOGONSERVER` (e.g. `\\TRANS-DC01`), `COMPUTERNAME`, `USERPROFILE`. The DNS-domain variant is the most specific signal for corporate-user detection — see `docs/conventions.md` "Corporate / TfNSW User Identification via Getenv".

### External Processes
- `Integer System(Text msg)` — Make an OS system call (e.g. `System("dir > out.txt")`). Returns 0 on success. ID 21.
- `Integer Shell_execute(Widget widget, Text operation, Text file, Text parameters, Text directory, Integer showcmd)` — Wraps Win32 `ShellExecute`. `widget` must be a shown `Panel`; `operation` is `"open"` (launch/open), `"edit"`, `"print"`, etc.; `file` is the executable or document path; `parameters` are command-line args; `directory` is working dir ("" for default); `showcmd` = 1 (normal), 0 (hidden), 3 (maximized). Returns 0 on success. ID 1623.
- `Integer Create_process(Text program, Text cmdline, Text start_dir, Integer flags, Integer wait, Integer inherit)` — Wraps Win32 `CreateProcess`. `wait=1` blocks until process exits. `flags`: 0=default, 16=`CREATE_NEW_CONSOLE` (opens a visible console window for the child process), 134217728=`CREATE_NO_WINDOW` (hidden, no console). Returns 0 on success. ID 1620.
- `Integer Create_process(Text program, Text cmdline, Text start_dir, Integer flags, Integer inherit, Process_Handle &handle)` — Non-blocking form; fills a handle for `Process_exists()`. ID 2635. 0 = started (manual). The handle type is **`Process_Handle`** — an earlier note here said `Unknown`, which V15 `cc4d` rejects (`Unknown not defined`).
- `Integer Process_exists(Process_Handle handle)` — Returns non-zero if process is still running. **NOTE:** opposite convention — non-zero = exists. ID 2636.
- **There is no timer and no way to yield.** `Start_timer(Graph_Box, Integer ms)` is in the prototypes but V15 `cc4d` rejects it ("Non implimented function call"); `TDF_wait_for_timer(Integer ms)` compiles but is reported to return -1 in 12d (FastPlot README). 12d shows *Not Responding* until an event handler returns, so a long job either runs inside one handler or is handed to an external process whose completion is checked on the user's next button press (conventions.md, "Background Process Checked on the Next Press").

**CRITICAL: `Shell_execute` requires a shown Panel widget.** Create a minimal `Panel` with `Create_panel("")` and call `Show_widget(panel)` before invoking `Shell_execute`. Example:

```c
Panel panel = Create_panel("");
Show_widget(panel);
Integer rc = Shell_execute(panel, "open", "C:\\path\\to\\app.exe", "--arg value", "", 1);
```

### Command Line Arguments
- `Integer Get_number_of_command_arguments()` — Returns count of command line arguments passed to macro
- `Integer Get_command_argument(Integer index, Text &arg)` — Get argument at index (1-based). Returns 0 on success.
- `Text Get_macro_name()` — Returns full path to the running `.4do` file
- `Set_exit_code(Text code)` — Set exit code text (e.g. `"CodeShutdown"` for clean shutdown)

### Text Manipulation
- `Integer Text_length(Text t)` — Returns character count
- `Integer Find_text(Text source, Text target)` — Find first occurrence of target in source. Returns position (1-based) or 0 if not found.
- `Text Get_subtext(Text source, Integer start, Integer end)` — Extract substring (1-based). Use `end=9999` for "to end".
- `Text Text_lower(Text t)` — Convert to lowercase
- `Text Text_upper(Text t)` — Convert to uppercase
- `Text Text_justify(Text t)` — Trim whitespace from both ends
- `Integer Get_char(Text t, Integer pos, Integer &char_code)` — Get ASCII code of character at position (1-based)
- `Integer Set_char(Text t, Integer pos, Integer char_code)` — Set character at position by ASCII code
- `Integer From_text(Text source, Integer char1, Integer char2, Dynamic_Text &parts)` — Split text by delimiter (char2) into parts

### Panel UI
- `Create_panel(Text title)` — Create a panel (simple form)
- `Create_panel(Text title, Integer flags)` — Create panel with flags. `flags=1` or `TRUE` for standard panel with About menu.
- `Create_button(Text label, Text response)` — Create a button. `&` prefix for keyboard accelerator: `"&Process"` → Alt+P
- `Create_finish_button(Text label, Text response)` — Create a styled finish/close button
- `Create_help_button(Panel panel, Text label)` — Create a help button linked to panel
- `Create_vertical_group(Integer mode)` — Create vertical group. Modes: `0`=normal, `-1`=hidden/collapsed, `BALANCE_WIDGETS_OVER_HEIGHT`=expand to fill, `ALL_WIDGETS_OWN_HEIGHT`=use natural heights, `ALL_WIDGETS_OWN_LENGTH`=use length.
- `Create_horizontal_group(Integer mode)` — Create horizontal group. Modes: `0`=normal, `-1`=hidden, `BALANCE_WIDGETS_OVER_WIDTH`=expand to fill, `ALL_WIDGETS_OWN_WIDTH`=use natural widths, `COMPRESS_WIDGETS_OVER_WIDTH`=compress
- `Create_button_group()` — Convenience: horizontal group for button rows
- `Create_model_box(Text label, Message_Box msg, Integer flags)` — Model selection. `flags=0` prevents focus-stealing. `CHECK_MODEL_EXISTS` validates on input. `CHECK_MODEL_CREATE` creates if missing.
- `Validate(Model_Box box, Integer error_code, Model &result)` — Validate and get model. `GET_MODEL_ERROR` returns `MODEL_EXISTS` on success. `GET_MODEL_CREATE` auto-creates.
- `Create_select_button(Text label, Integer select_type, Message_Box msg)` — Selection button for picking elements. `select_type`: `SELECT_STRING`, `SELECT_POINT`, etc.
- `Create_select_box(Text label, Text prompt, Integer select_type, Message_Box msg)` — Inline selection widget (4 params, alternative to `Select_Button`)
- `Validate(Select_Button btn, Element &elt)` — Get selected element. Returns `OK` on success.
- `Validate(Select_Box box, Element &elt)` — Get selected element from Select_Box. Returns `TRUE` on success.
- `Select_start(Select_Button btn)` — Re-arm selection button after a pick
- `Select_start(Select_Box box)` — Re-arm Select_Box
- `Create_new_select_box(Text label, Text prompt, Integer type, Message_Box msg)` — Creates a `New_Select_Box` (newer inline element selection widget). `type`: `SELECT_STRING` etc.
- `Validate(New_Select_Box box, Element &elt)` — Get selected element. Returns `TRUE` (1) when valid, `NO_NAME` (10) when the box is optional and empty, 0 on error (ID 2241). On error it writes a message and moves the cursor to the box.
- `Validate(New_Select_Box box, Element &elt, Integer silent)` — `silent = 1`: no message, no cursor move (ID 2242). For an optional box, test presence with `Get_data(box, &text)` first and validate silently only when it is non-empty.
- `Get_data(New_Select_Box box, Text &data)` — Read current selection text (non-focus-stealing).
- `Create_file_box(Text label, Message_Box msg, Integer mode, Text filter)` — File selection. `FILE_MODE_WRITE` for output. `CHECK_FILE_CREATE` flag for output.
- `Validate(File_Box box, Integer flag, Text &filename)` — Get file path. Use `GET_FILE_CREATE` flag. Returns `NO_FILE` on success.
- `Create_projection_box(Text label, Message_Box msg)` — Projection/datum picker
- `Validate(Projection_Box box, Text &name, Text &type, Text &data)` — Get full projection info. Returns 1 on success. **Steals focus** — only call in the process handler.
- `Create_message_box(Text initial_text)` — Message display. Supports `\n` for multi-line.
- `Create_choice_box(Text label, Message_Box msg)` — Choice/dropdown selector. Populate with `Set_data(box, count, choices[])`.
- `Create_choice_box(Text label, Message_Box msg, Integer allow_search)` — Same, with the search mechanism enabled when `allow_search` is non-zero. Worth it once the list runs past ~20 entries. ID 7697.
- `Validate(Choice_Box box, Text &value)` — Get selected choice. **Return codes are not a status** and are the reverse of the usual convention: `1` = valid, `-1` / `-2` = invalid choice, `0` = drastic error, `NO_NAME` = optional box left empty. Prefer `Get_data(box, &value)` for a plain read — the box can only hold a value that came off the list, so there is nothing to validate, and `Get_data` does not steal focus.
- `Create_colour_box(Text label, Message_Box msg)` — Colour picker widget
- `Validate(Colour_Box box, Integer &colour)` — Get selected colour as integer
- `Create_real_box(Text label, Message_Box msg)` — Real number input
- `Validate(Real_Box box, Real &value)` — Get real value. Returns `TRUE` on success.
- `Set_optional(Real_Box box, Integer flag)` — Mark as optional (`flag=1`): empty value accepted
- `Set_optional(Integer_Box box, Integer flag)` — Mark as optional (`flag=1`)
- `Set_optional(Input_Box box, Integer flag)` — Mark as optional (`flag=1`)
- `Set_optional(Choice_Box box, Integer flag)` — Mark as optional (`flag=1`). **The 12d manual lists `Choice_Box` (with `Named_Tick_Box` and `Source_Box`) among the widgets that cannot be made optional** — do not rely on it. Give the box a sensible default with `Set_data(box, value)` instead, so it is never empty in the first place.
- `Create_integer_box(Text label, Message_Box msg)` — Integer input
- `Validate(Integer_Box box, Integer &value)` — Get integer value. Returns `TRUE` (1) when valid, `NO_NAME` when optional and empty, 0 on error (ID 915) — not 0-on-success.
- `Create_name_box(Text label, Message_Box msg)` — Name input
- `Validate(Name_Box box, Text &name)` — Get name value
- `Create_tin_box(Text label, Message_Box msg, Integer flags)` — TIN selection. `flags`: `CHECK_TIN_MUST_EXIST` (8) to validate existence on input. Use `Set_optional(tin_box, 1)` for optional TIN fields.
- `Validate(Tin_Box box, Integer flag, Tin &tin)` — Get TIN. Returns `TIN_EXISTS` (11) on success.
- `Set_optional(Tin_Box box, Integer flag)` — Mark TIN box as optional (`flag=1`): empty value accepted without error.
- `Create_view_box(Text label, Message_Box msg, Integer flags)` — View selection. `CHECK_VIEW_MUST_EXIST` flag.
- `Validate(View_Box box, Integer flag, View &view)` — Get view. Use `GET_VIEW_ERROR`. Returns `VIEW_EXISTS` on success.
- `Create_named_tick_box(Text title, Integer state, Text response)` — Labeled checkbox. `state`: 0=off, 1=on. Read with `Validate(tick, &result)`.
- `Create_tick_box(Message_Box msg)` — Unnamed tick box. Prefer `Named_Tick_Box`.
- `Create_input_box(Text label, Message_Box msg)` — General input box
- `Create_source_box(Text title_text, Message_Box msg, Integer flags)` — Source data selector with built-in element-type filter icons and model/view/fence pickers. Title is prefixed with "Data " automatically (e.g. `"to write"` → "Data to write"). `flags`: combine `Source_Box_*` constants with `|`. Use `Source_Box_All` (`0xFFF`) for all icons.
- `Create_source_box(Text title_text, Message_Box msg, Integer flags, Integer start_flag)` — Same as above with `start_flag` to select the initial data source choice.
- `Validate(Source_Box box, Dynamic_Element &data)` — Retrieve filtered elements from the Source_Box. Returns `TRUE` (1), `NO_NAME` (10, optional and empty — positive, so a `<= 0` test lets it through), -2 (bad choices) or 0 (drastic error). The manual: "Having no Elements returned is NOT an error. Always check the number of Elements" — decide on `Get_number_of_items`, not the return code. Call `Null(data)` before and after use.
- `Set_data(Source_Box box, Text data)` — Set source box data string.
- `Get_data(Source_Box box, Text &data)` — Get source box data string.
- `Create_widget_pages()` — Tabbed page container. Append groups for each page, switch with `Set_page()`.
- `Set_page(Widget_Pages pages, Integer page)` — Show specified page (1-based)
- `Create_tab_box()` — Modern tabbed interface. Append groups with `Append(group, "Tab Label", tab_box)`.
- `Create_colour_message_box(Text initial)` — Coloured status message box
- `Set_level(Colour_Message_Box cmb, Integer level)` — Set message level colour (1-4)
- `Screen_Text Create_screen_text(Text text)` — Create a non-interactive text label for display on a panel. Use for instructions, notes, or section descriptions.
- `Log_Box Create_log_box(Text label, Integer width, Integer height)` — Create a structured results display with expandable groups and clickable element highlights. `width`/`height` in pixels.
- `Create_draw_box(Integer width, Integer height, Integer flags)` — Custom drawing canvas
- `Start_batch_draw(Draw_Box db)` — Begin batch drawing (faster)
- `End_batch_draw(Draw_Box db)` — End batch drawing
- `Clear(Draw_Box db, Integer r, Integer g, Integer b)` — Clear with RGB colour
- `Draw_transparent_BMP(Draw_Box db, Text path, Integer x, Integer y)` — Draw transparent bitmap
- `Get_size(Draw_Box db, Integer &width, Integer &height)` — Get draw box dimensions
- `Set_sizing_constraints(Draw_Box db, Integer w_mode, Integer h_mode)` — Set sizing behaviour
- `Append(Widget item, Widget group)` — Add widget to group
- `Set_border(Widget w, Text title)` — Add titled border to group
- `Set_border(Widget w, Integer a, Integer b)` — Integer overload: `Set_border(group, 0, 0)` removes the border frame
- `Set_enable(Widget w, Integer state)` — `0`=greyed out, `1`=enabled. Accepts boolean expressions.
- `Show_widget(Panel p)` — Display the panel
- `Hide_widget(Panel p)` — Hide/close the panel
- `Wait_on_widgets(Integer &id, Text &cmd, Text &msg)` — Event loop wait (32-bit ids, matched with `Get_id(w)`)
- `Wait_on_events(Integer64 &id, Text &cmd, Text &msg)` — V14+ event loop wait. Use with `Get_id64(w)` and `if/else if` chains rather than `switch` (a `switch` on `Integer64` is awkward). Preferred for panels with many widgets.
- `Get_id64(Widget w)` — 64-bit widget id, for `Wait_on_events`.
- **Events worth filtering at the top of the loop:** `"CodeShutdown"` (12d is closing — call `Set_exit_code("CodeShutdown")` and break), `"keystroke"` (fires per key; carries the id of the widget being typed into, so it can be used to detect edits), `"motion select"` (mouse movement over the panel — ignore, it fires constantly), `"Panel Quit"` (the panel's own close button).
- `Get_id(Widget w)` — Get widget ID for switch/case matching
- `Validate(Widget w, ...)` — Read/validate widget data (signature varies by widget type)
- `Get_data(Widget w, Text &data)` — Read widget text value (non-focus-stealing). Works on `Model_Box`, `Projection_Box`, `Input_Box`, etc.
- `Set_data(Widget w, Text data)` — Set widget text value. On `Message_Box`, supports multi-line strings with `\n`.
- `Set_width_in_chars(Widget w, Integer chars)` — Set widget width in character units. Set it before `Show_widget`; whether it (or `Set_size(Widget, Integer w_px, Integer h_px)`) re-lays-out a panel already on screen is untested, so `VertexAttributeTable` rebuilds the panel to change a width (conventions.md, "Rebuild a Panel to Change a Widget's Size").
- `Integer Get_widget_position(Widget w, Integer &x, Integer &y)` / `Integer Show_widget(Widget w, Integer x, Integer y)` — screen position in pixels (IDs 1040, 1039). Capture before `Hide_widget` and re-show a rebuilt panel where the old one was, instead of at the cursor. `Get_size(Widget, Integer &w, Integer &h)` / `Set_size(...)` and `Set_sizing_constraints(Widget, Integer h_mode, Integer v_mode)` (modes 0-5, `docs/panel-widgets.md` §5.61.4) also compile on V15 for any widget, not only `Draw_Box`.
- `Set_tooltip(Widget w, Text tip)` — Set widget tooltip text
- `Use_browse_button(Input_Box ib, Integer flag)` — Show (1) or hide (0) browse button
- `Set_data(Choice_Box cb, Integer count, Text items[])` — Populate a Choice_Box with items
- `Set_data(Choice_Box cb, Text value)` — Set selected item in Choice_Box
- `Set_data(Colour_Message_Box cmb, Text msg, Integer level)` — Set message with level: `MESSAGE_LEVEL_GENERAL` (1=green), `MESSAGE_LEVEL_WARNING` (2=orange), `MESSAGE_LEVEL_ERROR` (3=red), `MESSAGE_LEVEL_GOOD` (4=green check)
- `Set_data(Real_Box rb, Real value)` — Set Real_Box value. Also accepts Text via generic `Set_data(Widget, Text)`: `Set_data(real_box, "2.0")`
- `Set_data(Integer_Box ib, Integer value)` — Set Integer_Box value
- `Set_data(Name_Box nb, Text value)` — Set Name_Box value
- `Set_data(Colour_Box cb, Text colour)` — Set Colour_Box value
- `Set_focus(Widget w)` — Move input focus to a widget (useful for error recovery)

### GridCtrl_Box (editable spreadsheet grid)

A real editable grid: one `Widget` per column defines that column's type and heading, rows are added and removed at runtime, and cells are read and written as `Text`.

```c
// 1. One box per column. Its title becomes the column heading, so the
//    boxes can only be built after the column names are known.
Widget    col_widgets[MAX_COLS];
Integer   col_readonly[MAX_COLS];
Input_Box col_boxes[MAX_COLS];

Integer c;
for(c = 1; c <= n_cols; c = c + 1)
{
    col_boxes[c]   = Create_input_box(col_name[c], msg_box);
    col_widgets[c] = cast(col_boxes[c]);          // see the cast rule below
    col_readonly[c] = 0;
}

GridCtrl_Box grid = Create_gridctrl_box("Vertices", n_rows, n_cols,
                                        col_widgets, col_readonly,
                                        1, msg_box, 900, 480);
Set_warn_on_modified(grid, 0);
Append(grid, panel);
Show_widget(panel);
populate_grid(grid);        // ONLY after Show_widget
```

**Constructors:**
- `GridCtrl_Box Create_gridctrl_box(Text name, Integer num_rows, Integer num_cols, Widget col_widgets[], Integer show_nav, Message_Box msg, Integer width, Integer height)` — ID 2393. `show_nav` 1 = navigation boxes down the side. `width`/`height` in **pixels**; scroll bars appear automatically when the content exceeds them.
- `GridCtrl_Box Create_gridctrl_box(Text name, Integer num_rows, Integer num_cols, Widget col_widgets[], Integer col_readonly[], Integer show_nav, Message_Box msg, Integer width, Integer height)` — same plus `col_readonly[]`, an `Integer` array of size `num_cols` where 1 = the whole column is read-only. The manual marks this overload "For V10 only"; **it works in V15**.

**CRITICAL — the `cast()` requirement.** Every widget type derives from `Widget`, but filling a `Widget[]` array with a derived type needs an explicit cast, and 12dPL has no cast syntax. Define this one-line helper in every macro that builds a grid:
```c
Widget cast(Widget w)
{
    return w;
}
```
Without it, `col_widgets[c] = Create_input_box(...)` will not compile.

**CRITICAL — grid data can only be loaded after `Show_widget()`** on the owning panel. Populating before the panel is on screen silently does nothing.

**Cells, rows, columns:**
- `Set_cell(GridCtrl_Box grid, Integer row, Integer col, Text value)` — 1-based.
- `Get_cell(GridCtrl_Box grid, Integer row, Integer col, Text &value)`
- `Insert_row(GridCtrl_Box grid)` — append a row. Also `Insert_row(grid, Integer row_num, Integer is_before)`.
- `Delete_all_rows(GridCtrl_Box grid)` — clear every row. Fresh rows come up **blank**, so rebuilding from empty means only cells that carry a value need writing — usually far cheaper than reusing rows and blanking them.
- `Set_column_width(GridCtrl_Box grid, Integer col, Integer width_px)`
- `Format_grid(GridCtrl_Box grid)` — re-lay out the grid; it sizes columns by measuring **every** cell, which is too slow to run on each repopulate. Track the longest text per column while writing cells and call `Set_column_width` instead. Do call `Format_grid` after a paste or fill so the display refreshes.
- `Get_selected_cells(GridCtrl_Box grid, Integer &start_row, Integer &start_col, Integer &end_row, Integer &end_col)` — the current selection rectangle. Non-zero return = nothing selected. This is also the only way to learn which row the user is on.
- `Set_modified(GridCtrl_Box grid, Integer modified)` — clear (0) or set the modified flag. **There is no matching getter**, so the macro cannot read the grid's own modified state back; track a dirty flag of your own instead.
- `Set_warn_on_modified(GridCtrl_Box grid, Integer warn)` — 0 suppresses 12d's own "you have unsaved changes" prompt when the panel closes.

**Detecting edits.** A `keystroke` event carries the widget id, so typing in the grid can be caught in the event loop:
```c
if(cmd == "keystroke")
{
    if(id == Get_id64(grid)) g_grid_dirty = 1;
    continue;
}
```
This is the cheap answer. Comparing every cell against the model on each event is what makes a grid panel stop responding. If the panel also tracks the selected row (to highlight it in a view), run that poll before the `continue` — arrow-key moves arrive as `keystroke` events too.

- `Integer Get_focus_cells(GridCtrl_Box grid, Integer &row, Integer &col)` — the focus cell (ID 7897); `Integer Is_cell_selected(GridCtrl_Box grid, Integer row, Integer col, Integer &selected)` (ID 7963). Both compile-accepted on V15, not yet used live.

**Cell colouring is declared but unproven.** `Set_cell_back_colour(grid, row, col, colour)` and `Set_cell_text_colour(...)` (IDs 6894, 6893) compile on V15; the manual says colouring "may be removed when grid is formatted", and marks `Set_cell_colour` (ID 6892) "Do not use". Not tried at runtime here — do not build a feature on them without a live test.

### List_Box

An ordinary input widget holding a scrolling list of text items. Unlike `Tree_Box` it reports its selection through `Get_selection`, which makes it the practical choice for a navigable hierarchy (see conventions.md, "List_Box as a Tree Substitute").

- `List_Box Create_list_box(Text title, Message_Box msg, Integer nlines)` — `nlines` = visible rows.
- `Set_selections(List_Box lb, Integer mode)` — 0 **disables** multi-select. Required: `Get_selection` and `Set_selection` fail with return code 1 on a multi-select list.
- `Add_item(List_Box lb, Text text)` — append an item.
- `Delete_item(List_Box lb, Integer pos)` — remove one item. **There is no clear-all call** — delete from the end in a bounded loop.
- `Insert_item(List_Box lb, Integer item, Text text)` — insert at a position (index semantics as unprobed as the rest).
- `Set_sort(List_Box lb, Integer mode)` / `Get_sort(...)` — the list's own sort. It sorts **every row as flat text**, which pulls indented children out from under their parents in a hierarchy list; order such a list yourself (sort parents and children separately with `Quick_sort` and nest them when building).
- `Get_item(List_Box lb, Integer pos, Text &text)` / `Get_number_of_items(List_Box lb, Integer &n)`
- `Get_selection(List_Box lb, Integer &pos)` / `Set_selection(List_Box lb, Integer pos)`
- `Get_caret(List_Box lb, Integer &pos)` / `Set_caret(List_Box lb, Integer pos, Integer scroll)` — the caret moves with keyboard navigation while the selection may not, so fall back to `Get_caret` when `Get_selection` fails.

**Whether items are numbered from 0 or from 1 is not documented.** Probe it once, and match selections back by their label text rather than by index:
```c
void detect_list_base(List_Box lb)
{
    g_list_base = 1;
    if(g_n_list < 1) return;

    Text t = "";
    if(Get_item(lb, 0, t) != 0) return;      // 1-based lists reject item 0
    if(t == g_list_label[1]) g_list_base = 0;
}
```
Matching by text means labels must be **unique** — append an index to rows whose names may repeat.
- `Set_cursor_position(Widget w)` — Set cursor position in widget text field

### Menu UI (Pre-Panel)
- `Create_menu(Text title)` — Create a popup menu
- `Create_button(Menu menu, Text label, Text response)` — Add item to menu. Also used as non-interactive text rows for report display.
- `Display(Menu menu, Integer x, Integer y, Text &reply)` — Show menu at absolute position, returns selected response
- `Display_relative(Menu menu, Integer x, Integer y, Text &reply)` — Show menu at relative position
- `Menu_delete(Menu menu)` — Free menu resources

### Built-in Panel Invocation (Panel_prompt)
- `Integer Panel_prompt(Text panel_name, Integer interactive, Text slx_data)` — Invoke a built-in 12d Model panel by name with pre-filled SLX XML data. `panel_name`: exact name of the built-in panel (e.g. `"Create Raster Element"`). `interactive`: `0xff00` = auto-run (non-interactive, executes immediately), `0xff01` = show panel for user to review/modify. `slx_data`: XML string in SLX format describing widget values. Returns 0 on success. ID 2068.

**SLX XML format:**
The SLX data string mirrors the panel's widget structure. Use `<widget_pages>` with `<widget_page>` children for tabbed panels. Widget values are set via `<input_box>`, `<file_box>`, `<tick_box>`, `<xyz_box>` elements with `<name>` and `<value>` children:

```c
Text d;
d = d + "<widget_pages>";
d = d + "<name>create raster</name>";
d = d + "<current_page>Source Image</current_page>";
d = d + "<widget_page>";
d = d + "<name>Source Image</name>";
d = d + "<input_box><name>Image format</name><value>PNG</value></input_box>";
d = d + "<file_box><name>Raster file</name><value>" + file_path + "</value></file_box>";
d = d + "</widget_page>";
d = d + "</widget_pages>";
Integer ret = Panel_prompt("Create Raster Element", 0xff00, d);
```

**Related SLX functions:**
- `Read_SLX(Panel panel, Text &slx_data)` — Read current widget state from a panel as SLX XML
- `Write_SLX(Panel panel, Text slx_data)` — Load SLX XML data into a panel's widgets

**Source and target boxes in SLX** (QLA_FLAG_Trimesh, `_engines.H`; source-backed, copied from a 12d-written chain): the mode is written as the constant's *name*, and the value sits in a nested `<input_box>` named after the box title:
```xml
<source_box><name>Data to process</name><mode>Source_Box_Model</mode>
  <input_box><name>Data to process - Model</name><value>MY MODEL</value></input_box></source_box>
<target_box><name>Target</name><mode>Target_Box_Move_To_One_Model</mode>
  <input_box><name>Target - Move to model</name><value>OUT MODEL</value></input_box></target_box>
<tick_box><name>Some option</name><value>true</value></tick_box>
```
Check the delegated step by what it produced (count the elements in the output model), not by the return code alone.

### Chains (Run_chain)
- `Integer Run_chain(Text chain_file)` — run a 12d chain file; 0 = the chain ran (manual ID 2096, `utilities.md`; compile-accepted). `Panel_prompt` reaches built-in panels only; to drive a **compiled macro's** panel, write a one-command chain to `%TEMP%` and run it. The chain format and the behaviours below come from QLA_FLAG_Trimesh source and comments, not from a live observation recorded here:
  - `<Panel_Data><screen_layout><macro_panel>` names the `.4do` with `<flags><flag>-close_on_exit</flag><flag>-no_console</flag></flags>`, then `<panel><name>` and the widget values as raw nested XML (not escaped).
  - `<Buttons><Button><Name>Read</Name><Order>0</Order>...` — the chain presses the listed buttons in `Order`.
  - Widget names must match exactly, trailing spaces included.
  - 12d writes its own chain files as UTF-16, so write the chain with `"ccs=UNICODE"`.
  See conventions.md, "Driving a Macro Panel through a Generated Chain".

### Plotting (plot frames and Plot_Parameter_File)
Headless plan plotting, from FastPlot (signatures from the manual, `trimesh.md` §5.52 and `utilities.md`; all compile-accepted on V15; parameter names are source-backed — an unknown name makes `Set_parameter` return non-zero):
```c
Element fr = Create_plot_frame(name);
Set_model(fr, frames);                     // a frame outside a model cannot be plotted
Set_plot_frame_sheet_size(fr, w_mm, h_mm); // the Text overload takes a Text& - pass a variable
Set_plot_frame_margins(fr, l, b, r, t);    // order: left, bottom, right, top
Set_plot_frame_scale(fr, 500.0);
Set_plot_frame_plotter_name(fr, plotter);
Plot_Parameter_File ppf;
Create_plot_frame_plot_parameter_file(ppf);
Set_parameter(ppf, "single_frame", fr);    // Element overload
Set_parameter(ppf, "view_name", view);
Set_parameter(ppf, "plot_stem", stem);
Integer r = Plot_parameter_file(ppf);      // 0 = plotted
Write_parameter_file(ppf, stem);           // optional: reopen it in the Plot Frames panel
```
Other parameter names FastPlot sets: `plot_border`, `use_title_file`, `title_file`, `title_text_size`, `title_colour`, `user_alias_N`, `user_text_N`, `start_page_number`, `start_drawing_number`, `drawing_register_enable`, `view_mode`, `plotter_type`, `use_drawing_numbers_in_filenames`, `use_frame_names_for_filenames`. Claimed by FastPlot, not re-verified: the named-sheet overload knows only 12d's own sheet names (not `sheets.4d` ones), string weights plot at the view's plot scale (`Plan_view_set_plot_scale` before each plot, restore after), each 12d plot costs about 3 s whatever it contains, and 12d may append a number to the stem.

### Panel Gotchas

1. **`Model_Box` with `CHECK_MODEL_MUST_EXIST` (7)** rejects focus on empty fields, causing focus to skip. Use `flags=0` and validate manually.
2. **`Validate(Projection_Box, ...)` steals focus.** Use `Get_data(proj_box, &name)` in enable-check loops. Only call `Validate(proj_box, &name, &type, &data)` in the process handler when you actually need the projection data string.
3. **`Named_Tick_Box` vs `Tick_Box`:** `Tick_Box` takes only `Message_Box msg` (no label, no initial state). Always use `Named_Tick_Box` for labelled checkboxes.
4. **Read `Named_Tick_Box`** with `Validate(tick, &Integer_result)`, NOT `Get_data(tick, &Integer)`.
5. **Panel append order** = top-to-bottom visual layout.
6. **Projection fallback:** If `Validate(proj_box, ...)` fails or returns empty data, fall back to `Get_project_setting_text("PROJECTION_DATUM_DATA")` to get the project's default projection.
7. **`Tin_Box` with `CHECK_TIN_MUST_EXIST` (8) has the same focus trap as `Model_Box`** — it refuses focus while the field is empty, so on panel open the box cannot be typed into or picked from at all. Create it with `flags=0` and check existence yourself with `Tin_exists(name) != 0`, which also lets grid tins through.
8. **A `Colour_Message_Box` takes its width from the string it was created with.** One created on `"Ready"` clips every real message. Size it explicitly with `Set_width_in_chars(status_box, N)`, where `N` is the longest message the macro shows.
9. **A `Projection_Box` cannot be pre-filled** — it only accepts a projection name this 12d install recognises, so it opens empty however the panel is seeded, which reads as a field somebody forgot. When what the macro actually needs is a datum/zone pair, use a `Choice_Box` of projection-shaped names instead (see conventions.md, "Choice_Box for a Two-Part Value").

### Enable/Disable Process Button Pattern

Check all required fields each event-loop iteration and enable/disable the Process button dynamically:

```c
// After Wait_on_widgets, before the switch:
Text chk_in, chk_out, chk_proj;
Get_data(input_model_box,  chk_in);
Get_data(output_model_box, chk_out);
Get_data(proj_box,         chk_proj);
Set_enable(process_btn, (chk_in != "" && chk_out != "" && chk_proj != ""));
```

Use `Get_data()` (not `Validate()`) here because it does not steal focus.

## User Defined Attributes

The `Attributes` type is a tree structure. Attributes can contain nested `Attributes` sub-groups. There is **no `Create_attributes()` function** — handles are auto-initialised on first `Set_attribute()` call.

### Key Functions

| Function | ID | Description |
|----------|----|-------------|
| `Set_attribute(Attributes, Text name, Text val)` | 1960 | Set/create Text attribute. **Auto-initialises handle.** |
| `Set_attribute(Attributes, Text name, Real val)` | 1962 | Set/create Real attribute. Auto-initialises handle. |
| `Set_attribute(Attributes, Text name, Integer val)` | 1961 | Set/create Integer attribute. Auto-initialises handle. |
| `Set_attribute(Attributes, Text name, Attributes val)` | 1964 | Set/create nested Attributes sub-group. |
| `Set_attributes(Element, Attributes root)` | 1973 | Write attribute tree to element. |
| `Get_attributes(Element, Attributes &root)` | 1972 | Get element's existing attribute tree. **Only for elements that already have attrs.** |
| `Set_attribute(Element, Text name, Text val)` | 572 | Set Text attribute directly on element (flat, simplest). |
| `Set_attribute(Element, Text name, Integer val)` | 573 | Set Integer attribute directly on element. |
| `Set_attribute(Element, Text name, Real val)` | 574 | Set Real attribute directly on element. |
| `Set_attribute(Element, Text name, Attributes val)` | 1979 | Set Attributes sub-group directly on element. |
| `Set_project_attributes(Attributes root)` | — | Write attributes to the project (not an element). |
| `Attribute_exists(Element, Text name)` | 556 | Non-zero if exists (**opposite of usual convention**). |
| `Get_number_of_attributes(Element, Integer &count)` | — | Count of top-level attributes. |
| `Get_attribute(Element, Text name, Text &val)` | — | Read a Text attribute by name. |
| `Get_attribute(Element, Text name, Real &val)` | — | Read a Real attribute by name. |
| `Get_attribute(Element, Text name, Integer &val)` | — | Read an Integer attribute by name. |
| `Get_attribute(Element, Text name, Attributes &val)` | — | Read a nested sub-group by name. |
| `Get_attribute_name(Element, Integer idx, Text &name)` | — | Get name of attribute by 1-based index. |
| `Get_attribute_type(Element, Integer idx, Integer &type)` | — | Get type (1=Int, 2=Real, 3=Text, 5=Attrs). |
| `Attribute_delete(Element, Text name)` | — | Delete attribute by name from element. |
| `Attribute_delete_all(Element)` | — | Delete all attributes from element. |
| `Get_attribute(Attributes, Text name, Attributes &val)` | 1949 | Navigate to named sub-group within an Attributes handle. Returns 0 if found. |
| `Get_attribute(Attributes, Text name, Text &val)` | — | Read a Text leaf field from an Attributes handle. |
| `Get_attribute(Attributes, Text name, Real &val)` | — | Read a Real leaf field from an Attributes handle. |
| `Get_number_of_attributes(Attributes, Integer &count)` | — | Count of top-level fields in an Attributes handle. Works on handle (not just Element). |
| `Get_attribute_type(Attributes, Integer idx, Integer &type)` | — | Get the type of a field by 1-based index in an Attributes handle. Type codes: 1=Int, 2=Real, 3=Text, 5=Attrs. Use for enumerating all fields in a handle. |
| `Get_attribute(Attributes, Integer idx, Attributes &val)` | — | Get a sub-group by 1-based index from an Attributes handle. Use with `Get_attribute_type()` to walk the tree by index. |
| `Get_attribute_name(Attributes, Integer idx, Text &name)` | — | Name of the field at a 1-based index in an Attributes handle. The handle overload of the Element form above — this is what makes a full tree walk possible when the field names are not known ahead of time. |
| `Get_attribute(Attributes, Integer idx, Text &val)` | — | Read a Text leaf by 1-based index. Check `Get_attribute_type()` first — the wrong overload for the stored type returns non-zero. |
| `Get_attribute(Attributes, Integer idx, Real &val)` | — | Read a Real leaf by 1-based index. |
| `Get_attribute(Attributes, Integer idx, Integer &val)` | — | Read an Integer leaf by 1-based index. |
| `Get_attribute(Attributes, Integer idx, Integer64 &val)` | 3245 | Read a 64-bit integer without converting it through Real. |
| `Get_attribute(Attributes, Integer idx, Uid &val)` | 1953 | Read a Uid leaf; only format it after a successful read. |
| `Get_attribute(Attributes, Integer idx, Guid &val)` | 3246 | Read a Guid leaf; only format it after a successful read. |
| `Get_attribute_type(Attributes, Text name, Integer &type)` | 1956 | Check type of a named field in an Attributes handle. Returns 0 if field exists, non-zero if absent. Type codes: 1=Integer, 2=Real, 3=Text, 4=Blob, 5=Attributes, 6=Uid, 7=Integer64, 8=Guid. |
| `Attribute_delete(Attributes, Text name)` | — | Delete a named field from an Attributes handle (not an element). Clears the field so it can be re-created with a different type. |

### Export Field Lookup

Normalising spelling does not create semantic aliases: `PipeDiameter` and
legacy `SUI_PipeDia` need explicit fallbacks for the output field `Size`.
Choose source precedence for the workflow; crossing-local exports use the
nearest vertex before element defaults, resolving its aliases first. Blank,
whitespace and dash placeholders must not mask populated fallbacks. Preserve
meaningful domain values and numeric zero, and keep identifier reads in their
native type until formatting to Text. See the attribute-cache rules in
`docs/conventions.md` for units, limits and complete fallback handling.

### CRITICAL: How Attributes Handles Work

`Attributes myvar;` declares an uninitialised handle. Calling `Set_attribute(myvar, "Name", value)` **auto-initialises** it — the handle becomes valid and can hold further attributes or be nested into a parent.

This means you can build an entire attribute tree from scratch with uninitialised handles. No `Get_attributes()` call is needed for new elements.

### Building Nested Attributes from Scratch (PROVEN WORKING)

```c
// ✅ CORRECT — build tree without Get_attributes()
Attributes tfnsw;                                     // uninitialised — OK
Attributes root;                                      // uninitialised — OK
Set_attribute(tfnsw, "Latitude",  To_text(lat, 10));  // auto-inits tfnsw
Set_attribute(tfnsw, "Longitude", To_text(lon, 10));
Set_attribute(root, "TfNSW", tfnsw);                  // auto-inits root
Set_attributes(pt, root);                              // write to element
```

### DO NOT use Get_attributes() on New Elements

```c
// ❌ WRONG — Get_attributes() on an element with NO existing attrs
//    returns a null/broken handle. Subsequent Set_attribute calls on
//    that handle silently fail at runtime (compiles fine).
Attributes root;
Get_attributes(new_pt, root);       // new_pt has no attrs → root is null
Attributes sub;
Set_attribute(sub, "Field", "val");
Set_attribute(root, "Group", sub);  // FAILS — root is null
Set_attributes(new_pt, root);       // nothing written
```

### When to use Get_attributes()

Only when the element **already has** attributes and you want to add to or modify them:
```c
// Element already has attrs from a previous operation
Attributes existing;
Get_attributes(elt, existing);                   // safe — attrs exist
Set_attribute(existing, "NewField", "value");    // adds to existing tree
Set_attributes(elt, existing);
```

### Updating Leaf Fields Without Losing Sibling Groups (Deep Navigation)

When you need to update specific leaf fields inside a nested sub-group (`TfNSW_DE/TfNSW_Asset`) **without wiping** sibling fields or other sub-groups, use the deep navigation pattern. Navigate down the tree with `Get_attribute(Attributes, name, Attributes &)`, modify only the target leaf fields, then write the modified handles back up the chain.

Four cases must be handled:

```c
// Use Get_number_of_attributes — always safe on any element
Integer root_count;
Get_number_of_attributes(elt, root_count);

Attributes root;
if(root_count > 0)
    Get_attributes(elt, root);  // safe — element has attrs
// If root_count == 0, root stays uninitialised and auto-inits on first Set_attribute

Attributes de;
if(root_count > 0 && Get_attribute(root, "TfNSW_DE", de) == 0)
{
    // TfNSW_DE exists — de is the live handle
    Attributes asset;
    if(Get_attribute(de, "TfNSW_Asset", asset) == 0)
    {
        // --- Case D: both groups exist — delete+recreate target fields ---
        // Attribute_delete removes a field from the handle so it can be
        // re-created with a different type. All OTHER fields in asset untouched.
        Attribute_delete(asset, "MyField");
        Set_attribute(asset, "MyField", real_value);  // always Real now

        Set_attribute(de, "TfNSW_Asset", asset);      // write asset back into de
    }
    else
    {
        // --- Case C: TfNSW_DE exists, TfNSW_Asset missing --- create fresh
        Attributes asset_new;
        Set_attribute(asset_new, "MyField", real_value);
        Set_attribute(de, "TfNSW_Asset", asset_new);
    }
    Set_attribute(root, "TfNSW_DE", de);              // write de back into root
}
else
{
    // --- Cases A & B: TfNSW_DE missing (or no attrs at all) --- build from scratch
    Attributes asset_new;
    Attributes de_new;
    Set_attribute(asset_new, "MyField", real_value);
    Set_attribute(de_new, "TfNSW_Asset", asset_new);
    Set_attribute(root, "TfNSW_DE", de_new);          // auto-inits root if Case A
}

Set_attributes(elt, root);  // commit the whole tree
```

**Key rules:**
- `Set_attribute(Attributes, Text, Attributes)` ID 1964 is a **true upsert** at handle level — updates existing entry, creates if absent. It does NOT wipe sibling fields.
- `Set_attribute(Element, Text, Attributes)` ID 1979 is **create-only** at element level — it is a no-op if the group already exists.
- `Set_attributes(Element, Attributes)` **replaces the entire tree** on the element — you must have the full tree loaded first.
- `Get_number_of_attributes(Element, Integer &count)` is **always safe** on any element. Use it as a guard before calling `Get_attributes()`. Never call `Get_attributes()` when count is 0.
- To overwrite a field that may exist with a different type: call `Attribute_delete(Attributes handle, name)` first, then `Set_attribute(Attributes handle, name, value)` to re-create with the desired type.

### Project-Level Attributes

```c
// Build a structured attribute tree and attach to the project
Attributes job_val;
Set_attribute(job_val, "Type", "Text");
Set_attribute(job_val, "Value", job_number_text);

Attributes project_details;
Set_attribute(project_details, "JobNumber", job_val);

Attributes project_root;
Set_attribute(project_root, "ProjectDetails", project_details);
Set_project_attributes(project_root);
```

### Simple Flat Attributes (Element-Level)

```c
// Simplest: set directly on element, no handle needed
Set_attribute(pt, "Latitude",  To_text(lat_val, 10));   // ID 572
Set_attribute(pt, "Longitude", To_text(lon_val, 10));
```

## Verified Function Signatures

These signatures combine manual/prototype references and existing examples.
Record compile checks and live runtime checks separately; a clean build alone
does not establish behavior on a real project.

```c
// 3D Point creation + model assignment
Element pt = Create_super(7, 1);                        // dimension flags 7, one vertex
Set_super_vertex_coord(pt, 1, x, y, z);                 // set vertex 1 coordinates
Set_name(pt, name);
Set_colour(pt, colour);
Calc_extent(pt);                                         // MUST call before Set_model
Set_model(pt, out_model);                                // assign to model

// Model access (two forms)
Model m = Get_model(name);                               // return-value form
Model m2; Get_model(name, m2);                           // reference-param form
Model m3 = Create_model(name);                           // return-value form
Integer Model_exists(Text name);                         // check before Get_model
Calc_extent(Model model);                                // recalculate after adding elements

// Projection box — full validation (steals focus)
Integer Validate(Projection_Box box, Text &name, Text &type, Text &data);
// Returns 1 on success. data = projection string for Convert_long_lat().
// Fallback: Get_project_setting_text("PROJECTION_DATUM_DATA")

// Project settings
Text Get_project_setting_text(Text key);                 // e.g. "PROJECTION_DATUM_DATA"

// Trimesh inspection
Integer Is_trimesh(Element elt);                        // returns 1 if trimesh
Integer Trimesh_number_of_triangles(Element elt, Integer &n);
Integer Trimesh_closed(Element elt, Integer &is_closed);                  // 0 on success
Integer Get_trimesh_centroid(Element elt, Real &cx, Real &cy, Real &cz);  // 0 on success
// Trimesh_section returns ONE polyline and reports a hollow solid (two loops) as
// "Multiple Intersection" - cut the triangles yourself (conventions.md, "Trimesh Plane Section")
Integer Trimesh_get_triangle_points_coords(Element elt, Integer tri_no,
    Integer &p1, Integer &p2, Integer &p3,
    Real &x1, Real &y1, Real &z1,
    Real &x2, Real &y2, Real &z2,
    Real &x3, Real &y3, Real &z3);

// Coordinate conversion (easting/northing → WGS84)
Integer Convert_long_lat(Text proj_data, Integer direction, Integer mode, Real &lon, Real &lat);
// direction=1 for grid→geo, mode=0. lon/lat are in/out.

// Vertex data access
Integer Get_super_vertex_coord(Element el, Integer vertex, Real &x, Real &y, Real &z);
Integer Get_super_vertex_point_number(Element el, Integer vertex, Text &name);  // get point ID
Integer Get_super_vertex_text(Element el, Integer vertex, Text &text);          // get vertex text

// Math / Trigonometry
Real Atan2(Real y, Real x);                             // returns radians; for bearings: Atan2(dx, dy)
Integer Radians_to_degrees(Real rad, Real &deg);        // convert radians → degrees

// Model iteration
Integer Get_elements(Model m, Dynamic_Element &de, Integer &count);
Integer Get_item(Dynamic_Element de, Integer index, Element &elt);  // 1-based index
Integer Get_name(Model model, Text &name);                          // get model name

// File I/O
Integer File_open(Text filename, Text mode, File &fp);   // "w" = write, "r" = read, "a" = append
Integer File_close(File fp);
Integer File_write_line(File fp, Text line);
Integer File_read_line(File fp, Text &line);             // returns 0 on success, non-zero at EOF
Integer File_exists(Text filename);                      // non-zero if exists

// Select button / Select box / New_Select_Box
Select_Button Create_select_button(Text label, Integer select_type, Message_Box msg);
Select_Box Create_select_box(Text label, Text prompt, Integer type, Message_Box msg);
New_Select_Box Create_new_select_box(Text label, Text prompt, Integer type, Message_Box msg);
Integer Validate(Select_Button btn, Element &elt);       // returns OK (1) on success
Integer Validate(Select_Box box, Element &elt);          // returns TRUE on success
Integer Validate(New_Select_Box box, Element &elt);      // TRUE, NO_NAME (optional, empty) or 0
Integer Validate(New_Select_Box box, Element &elt, Integer silent);  // silent=1: no message / cursor move
void Select_start(Select_Button btn);                    // re-arm after pick
void Select_start(Select_Box box);                       // re-arm after pick

// Interactive pick with coordinates (Button + Select_string pattern)
Integer Select_string(Text msg, Element &elt);           // basic form; returns 0 on success
Integer Select_string(Text msg, Element &elt, Real &x, Real &y, Real &z, Real &ch, Real &ht);
// Extended form; returns 1 on success (not 0). Provides pick coords for vertex snapping.

// Model box validation
Integer Validate(Model_Box box, Integer error_code, Model &result);  // returns MODEL_EXISTS

// File box
File_Box Create_file_box(Text label, Message_Box msg, Integer mode, Text filter);
Integer Validate(File_Box box, Integer flag, Text &filename);  // GET_FILE_MUST_EXIST=17, GET_FILE_CREATE=15; returns NO_FILE (4) on success
void Set_data(File_Box box, Text default_path);          // preset file path in File_Box

// File I/O (4-param form with encoding)
Integer File_open(Text path, Text mode, Text ccs, File &fp);  // ccs="" for ANSI, "ccs=UNICODE", "ccs=UTF-8"

// Element linestyle
Integer Get_style(Element el, Text &style_name);         // get linestyle name; returns 0 on success
// Set_style(Element el, Text linestyle) already documented above

// Element line weight
void Set_weight(Element el, Real weight);                // set line weight (thickness)
Integer Get_weight(Element el, Real &weight);            // get line weight; returns 0 on success

// Drainage set functions (complement to Get_ functions above)
Integer Set_drainage_pipe_inverts(Element el, Integer pipe_idx, Real inv_lhs, Real inv_rhs);  // set inverts; 0 on success
Integer Get_drainage_flow(Element el, Integer &dir);     // get flow direction; dir 1=last vertex is downstream
Integer Get_drainage_data(Element el, Real x[], Real y[], Real z[], Real r[], Integer f[], Integer max, Integer &count);
Integer Get_drainage_pit_attribute(Element el, Integer pit_no, Text name, Real &value);  // 1-based pit
Integer Set_drainage_pipe_attribute(Element el, Integer pipe_idx, Text name, Integer value);

// Model identity
void Get_id(Model m, Uid &uid);                          // get model Uid for identity comparison

// Log_Box structured results widget
Log_Box Create_log_box(Text label, Integer width, Integer height);
Log_Line Create_group_log_line(Text msg, Integer level);   // expandable group; levels 0-3
Log_Line Create_text_log_line(Text msg, Integer level);    // text line
Log_Line Create_highlight_string_log_line(Text msg, Integer level, Uid model_id, Uid string_id);
Integer Add_log_line(Log_Box box, Log_Line line);          // add top-level line
Integer Append_log_line(Log_Line child, Log_Line parent);  // nest under group
void Print_log_line(Log_Line line, Integer mode);          // mode=1: print to Output Window
void Clear(Log_Box box);                                   // clear all lines

// Clipboard
Integer Set_clipboard_text(Text text);                     // copy to system clipboard; 0 on success
Integer Get_clipboard_text(Text &text);                    // read the system clipboard; 0 on success

// Panel_prompt field-array overload
Integer Panel_prompt(Text panel_name, Integer interactive, Integer no_fields, Text field_name[], Text field_value[]);

// Segment text annotation (per-segment text on super strings)
Integer Set_super_use_segment_text_array(Element el, Integer use);        // 1=enable per-segment text
Integer Set_super_use_segment_annotation_value(Element el, Integer use);  // 1=show annotation visually
Integer Set_super_segment_text(Element el, Integer seg, Text text);       // 1-based segment
Integer Set_super_segment_text_size(Element el, Integer seg, Real size);  // text height
Integer Set_super_segment_text_colour(Element el, Integer seg, Integer colour);

// Dynamic_Integer operations
void Append(Integer val, Dynamic_Integer &di);           // add integer to dynamic array
Integer Get_item(Dynamic_Integer di, Integer index, Integer &val);  // 1-based

// Tin box
Tin_Box Create_tin_box(Text label, Message_Box msg, Integer flags);  // CHECK_TIN_MUST_EXIST=8
void Set_optional(Tin_Box box, Integer flag);            // 1 = optional

// Widget constructors
Choice_Box Create_choice_box(Text label, Message_Box msg);
Colour_Box Create_colour_box(Text label, Message_Box msg);
Real_Box Create_real_box(Text label, Message_Box msg);
Integer_Box Create_integer_box(Text label, Message_Box msg);
Name_Box Create_name_box(Text label, Message_Box msg);
View_Box Create_view_box(Text label, Message_Box msg, Integer flags);
Widget_Pages Create_widget_pages();
void Set_page(Widget_Pages pages, Integer page);         // 1-based page number
void Set_optional(Real_Box box, Integer flag);           // 1 = optional

// Widget validation overloads
Integer Validate(Choice_Box box, Text &value);           // returns TRUE
Integer Validate(Colour_Box box, Integer &colour);
Integer Validate(Real_Box box, Real &value);             // returns TRUE
Integer Validate(Integer_Box box, Integer &value);      // TRUE (1) when valid, NOT 0
Integer Validate(Name_Box box, Text &name);
Integer Validate(View_Box box, Integer flag, View &view); // returns VIEW_EXISTS

// Panel lifecycle
void Hide_widget(Panel p);
void Set_focus(Widget w);                                // move focus for error recovery
void Set_cursor_position(Widget w);                      // set cursor in text field

// Menu UI (pre-panel)
Menu Create_menu(Text title);
void Create_button(Menu menu, Text label, Text response);
void Display(Menu menu, Integer x, Integer y, Text &reply);
void Display_relative(Menu menu, Integer x, Integer y, Text &reply);
void Menu_delete(Menu menu);

// Model operations
Model Get_model_create(Text name);                       // get-or-create
void Model_delete(Model model);
Integer Get_project_models(Dynamic_Text &models);        // all project model names; 0 on success
Integer Get_number_of_items(Model model, Integer &count); // element count

// Element operations
Integer Element_delete(Element elt);                     // 0 on success; the handle is set to null
Integer Element_delete(Element elt, Integer redraw);     // redraw != 0: repaint the views it was on
void Element_duplicate(Element src, Element &dst);
Integer Convert(Element src, Text type, Element &result); // e.g. "3d"

// Dynamic arrays
void Null(Dynamic_Element &de);                          // clear/release
void Null(Dynamic_Text &dt);

// String data access (batch array forms)
void Get_3d_data(Element el, Real x[], Real y[], Real z[], Integer max, Integer &npts);
void Get_4d_data(Element el, Real x[], Real y[], Real z[], Text t[], Integer max, Integer &npts);

// Alignment / Chainage
Integer Get_position(Element el, Real ch, Real &x, Real &y, Real &z, Real &dir);
Integer Drop_point(Element el, Real x, Real y, Real z, Real &xf, Real &yf, Real &zf, Real &ch, Real &dir, Real &off);
void Get_hip_points(Element el, Integer &count);
Integer Get_hip_type(Element el, Integer hip, Text &type);  // "IP", "Curve", "Spiral"
Integer Get_hip_geom(Element el, Integer hip, Integer mode, Real &x, Real &y);
void Get_hip_data(Element el, Integer hip, Real &x, Real &y, Real &r, Real &ls, Real &rs);

// Text elements
Element Create_text(Text txt, Real x, Real y, Real size, Integer colour);
void Get_text_value(Element el, Text &value);
void Get_text_xy(Element el, Real &x, Real &y);

// Text parsing
Integer From_text(Text source, Real &value);             // returns 0 on success
Integer From_text(Text source, Integer &value);          // returns 0 on success (Integer overload)
void From_text(Text source, Dynamic_Text &words);        // split into tokens
Text Get_subtext(Text source, Integer start, Integer end); // 1-based, end=9999 for "to end"

// Math
Real Pi();
Real Two_pi();
Real Mod(Real a, Real b);
Integer Is_null(Real val);
void Degrees_to_dms(Real deg, Integer &d, Integer &m, Real &s);

// Date/Time
void Date(Text &date);
void Time(Text &time);

// Colour
Integer Colour_exists(Text name);
Integer Convert_colour(Text name, Integer &colour);      // 0 on success

// Model operations (additional)
void Delete_models(Text name_match, Integer views_redraw);  // delete models by name; 0=no redraw
                                                            // use 1 if visible - 0 leaves it painted on screen

// Element identity
Integer Get_id(Element el, Uid &uid);                    // 0 on successful identity lookup
Text To_text(Uid uid);                                    // convert Uid to text for string comparison

// Super string dimension flags, not element type codes
Element Create_super(Integer flag1, Integer n_verts);
Integer Set_super_data(Element el, Integer pt, Real x, Real y, Real z, Real radius, Integer flag);
//   radius > 0 = arc segment to next vertex; 0.0 = straight segment

// Drainage pipe property queries (1-based pipe_idx)
Integer Get_drainage_pipe_diameter(Element el, Integer pipe_idx, Real &diameter);
Integer Get_drainage_pipe_inverts(Element el, Integer pipe_idx, Real &inv_lhs, Real &inv_rhs);
Integer Get_drainage_pipe_thickness(Element el, Integer pipe_idx, Real &w_top, Real &w_bot, Real &w_left, Real &w_right);

// View operations
View Get_view(Text name);
Integer View_exists(Text name);
Integer View_get_models(View view, Dynamic_Text &models);  // 0 on success
Integer View_add_model(View view, Model model);          // make model visible on view; returns a status
void View_redraw(View view);                              // force redraw of a view
Integer Get_last_view(Text &name);                        // get active view name; 0 on success

// Model operations (additional)
Integer Find_models(Text pattern, Dynamic_Text &names);   // wildcard search e.g. "Leaders/*"; returns count
void Model_empty(Model model, Integer &is_empty);         // 1=empty, 0=has elements
Integer Element_exists(Element el);                       // non-zero if valid handle

// Per-vertex attributes
Integer Get_super_vertex_attribute(Element el, Integer vertex, Text att_name, Text &value);  // 0 on success

// Dynamic_Real operations
void Append(Real val, Dynamic_Real &dr);
Integer Get_number_of_items(Dynamic_Real dr, Integer &count);
Integer Get_item(Dynamic_Real dr, Integer index, Real &val);  // 1-based
void Null(Dynamic_Real &dr);

// Attribute handle enumeration (by index)
Integer Get_number_of_attributes(Attributes attr, Integer &count);  // count fields in handle
Integer Get_attribute_type(Attributes attr, Integer idx, Integer &type);  // 1-based; type 5=sub-group
Integer Get_attribute(Attributes attr, Integer idx, Attributes &sub);    // get sub-group by index

// TIN operations (return-value form)
Tin Get_tin(Text name);                                   // return-value form

// Named tick box
Named_Tick_Box Create_named_tick_box(Text title, Integer state, Text response);
Integer Validate(Named_Tick_Box box, Integer &result);

// Source box (element-type filter icons + model/view/fence picker)
Source_Box Create_source_box(Text title_text, Message_Box msg, Integer flags);
Source_Box Create_source_box(Text title_text, Message_Box msg, Integer flags, Integer start_flag);
Integer Validate(Source_Box box, Dynamic_Element &data);  // TRUE / NO_NAME / -2 / 0 - decide on the element count
Integer Set_data(Source_Box box, Text data);
Integer Get_data(Source_Box box, Text &data);

// DRF Leader functions
Integer DRF_leader_create(Text style, Text text, Real ax, Real ay, Real hx, Real hy, Model &model, Element &out);
// Returns 0 on success. ax,ay = arrow point; hx,hy = hook point.
Integer DRF_get_leader_hook(Element leader, Real &hx, Real &hy);     // returns 0 for leader elements (use as filter)
Integer DRF_get_leader_arrow(Element leader, Real &ax, Real &ay);
Integer DRF_get_leader_text(Element leader, Text &text);
Integer DRF_leader_edit_move_hook(Real hx, Real hy, Element &leader, Integer mode);  // mode 0=absolute, 1=relative
Integer DRF_get_leader_styles(Dynamic_Text &styles);                 // all project leader styles
Integer DRF_drafting_edit_set_style(Text style_name, Element &draft); // change DRF style template
Integer DRF_set_override_value(Element &drf, Text name, Real value);  // set Real override
Integer DRF_set_override_value(Element &drf, Text name, Integer value); // set Integer override
Integer DRF_get_override_value(Element drf, Text name, Real &value);
Integer DRF_get_override_value(Element drf, Text name, Integer &value);
Integer DRF_recalc(Element &draft);                                   // MUST call after setting overrides

// Output Window
void Print(Text msg);              // add "\n" manually
void Print();                      // blank line (no-arg form)
void Show_console(Integer show);   // 1=show, call AFTER Print calls

// Built-in panel invocation
Integer Panel_prompt(Text panel_name, Integer interactive, Text slx_data);
// interactive: 0xff00 = auto-run (non-interactive), 0xff01 = show panel for user
// slx_data: SLX XML string describing widget values
// Returns 0 on success. ID 2068.

// Panel_prompt — field array overload (alternative to SLX XML)
Integer Panel_prompt(Text panel_name, Integer interactive, Integer no_fields, Text field_name[], Text field_value[]);
// interactive: 1 = interactive (display). Alternate to SLX: pass field names/values as arrays.
// no_fields: number of fields (0 for no pre-fill). field_name[0]/field_value[0] are valid empty arrays.

// Clipboard
void Set_clipboard_text(Text text);                      // copy text to system clipboard

// Status bar / message mode
void Set_message_mode(Integer mode);                     // set message display mode (0 = default)
void Set_message_text(Text text);                        // set status bar / message text

// Log_Box widget (structured results display)
Log_Box Create_log_box(Text label, Integer width, Integer height);  // create log widget
Log_Line Create_group_log_line(Text msg, Integer level);            // expandable group header
Log_Line Create_text_log_line(Text msg, Integer level);             // plain text line
Log_Line Create_highlight_string_log_line(Text msg, Integer level, Uid model_id, Uid string_id);  // clickable element highlight
Integer Add_log_line(Log_Box box, Log_Line line);                   // add top-level line to box
Integer Append_log_line(Log_Line child, Log_Line parent);           // nest child under parent group
void Print_log_line(Log_Line line, Integer mode);                   // print to Output Window (mode=1)
void Clear(Log_Box box);                                            // clear all lines
// Log_Line levels: 0=default, 1=info/green, 2=warning/orange, 3=error/red

// Null check variant
Integer Is_null2(Real val);             // variant of Is_null() — check if Real is null/undefined

// Widget error display
void Set_error_message(Widget w, Text msg);   // set error state/message on widget (e.g. Input_Box)

// Windows help
void Winhelp(Panel panel, Text hlp_file, Integer char_code, Text msg);  // invoke Windows help

// Model identity
void Get_id(Model m, Uid &uid);          // get model's unique Uid for identity comparison

// Project / system queries
Integer Get_project_name(Text &name);                // project name (e.g. "MyProject.12dproject")
Integer Get_project_folder(Text &folder);            // path to the .12dmodel project folder
Integer Get_project_attributes(Attributes &root);    // load project-attribute tree; non-zero = no project attrs

// Binary file reading (verified compiles; read 0 for immediate close fallback)
Integer File_open(Text path, Text mode, Text ccs, File &f);   // mode "rb" = read binary, "wb" = write binary (no line endings)
Integer File_read(File f, Integer length, Integer bytes[]);   // ID 1716 — read up to N bytes into Integer array as unsigned-byte values; returns count actually read
Integer File_write(File f, Integer length, Integer bytes[]);  // ID 1718 — write N bytes from Integer array to a binary file

// File modified-time (Windows mtime)
Integer Get_file_modified_time_utc(Text path, Integer64 &time);  // ID 3876 — read file mtime as UTC Integer64 (seconds since epoch)
Integer Touch_file_modified_time(Text path);                      // ID 7984 — set file mtime to NOW (there is NO API to set mtime to a specific past value)
// GOTCHA: because mtime cannot be forced backwards from 12dPL, any write to a Synergy-tracked
// file bumps mtime forward. A byte-for-byte snapshot+restore preserves content hash but NOT
// mtime — so the only reliable way to avoid a "new version" trigger is to NOT open the file
// at all when nothing needs to change (see attribute-cache idempotence pattern in conventions.md).

// ODBC — Excel driver connection + column-name probing pattern
// Connection string for 64-bit Microsoft Excel ODBC driver:
//   "Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ=<path>;ReadOnly=0;"
// Table name syntax: [SheetName$]  (note trailing $). Columns quoted as [col name].
// HDR=NO is SILENTLY IGNORED; first non-blank row is always treated as the column header.
// Blank leading rows are skipped during header detection.
Connection Create_ODBC_connection();                 // create handle; follow with Connect(conn, cs)
Integer Connect(Connection conn, Text connection_string);  // returns 0 on success; also check Has_error(conn)
Integer Has_error(Connection conn);                  // 0 = no error, 1 = error (check after every op)
Integer Get_last_error(Connection conn, Text &status, Text &message);
Manual_Query Create_manual_query(Text sql);          // build a custom SQL query
Integer Execute(Connection conn, Manual_Query q);                       // UPDATE/INSERT/DELETE form
Integer Execute(Connection conn, Manual_Query q, Database_Result &r);   // SELECT form
Integer Move_next(Database_Result r);                // 0 = moved to next row; non-zero = no more rows
Integer Get_result_column(Database_Result r, Integer col, Text &val);   // 1-based
Integer Close(Database_Result r);                    // always close Database_Result before re-executing
Integer Close(Connection conn);                      // close connection

// 12dSynergy (signatures from docs/odbc.md — verified compiling)
Integer Synergy_connect(Text server, Text &error);                                 // ID 3102
Integer Synergy_get_folder_info(Text job, Text path, Attributes &attrs, Text &err); // ID 3121
Integer Synergy_get_file_info(Text job, Text path, Attributes &attrs, Text &err);   // ID 3120
Integer Synergy_local_folder(Text synergy_path, Text &local_path, Text &err);       // ID 5446
// `job` = top-level Synergy container (e.g. "SU10465-UTL-Windsor Rd..._2057"), NOT the server name.
// Error shape when path doesn't match: "No entity found at /<job>/<path>!"
```

## DRF Leader Override Field Names (Verified)

When using `DRF_set_override_value()` / `DRF_get_override_value()` on leader elements, the following field names are confirmed working:

| Field Name | Type | Description |
|------------|------|-------------|
| `text_size` | Real | Leader text size |
| `arrow_size` | Real | Arrow symbol size |
| `hook_length` | Real | Leader hook line length |
| `colour` | Integer | Overall leader colour |
| `arrow_colour` | Integer | Arrow-specific colour |
| `text_colour` | Integer | Text-specific colour |

**Usage pattern:**
```c
DRF_set_override_value(leader, "text_size", 2.0);     // Real override
DRF_set_override_value(leader, "arrow_size", 2.0);    // Real override
DRF_set_override_value(leader, "hook_length", 5.0);   // Real override
DRF_set_override_value(leader, "colour", elt_colour);  // Integer override
DRF_set_override_value(leader, "arrow_colour", elt_colour);
DRF_set_override_value(leader, "text_colour", elt_colour);
DRF_recalc(leader);  // MUST recalc after setting overrides
```

**Detecting leader elements:** Use `DRF_get_leader_hook(elt, hx, hy) == 0` as a filter — returns 0 only for leader elements.

## Excel ODBC Driver Gotchas (Microsoft Excel ODBC Driver)

These behaviours of the 64-bit `Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)` are non-obvious and have shipped real bugs:

1. **`HDR=NO` is silently ignored.** The driver always treats the first non-blank row as the column header, regardless of any `HDR=NO` or `Extended Properties=...` in the connection string.
2. **Blank leading rows are skipped for header detection.** If rows 1–4 are empty and row 5 holds the sheet title, the driver names column A after the A5 text (e.g. `XXXXXX - SURVEY METADATA`) and column B becomes `F2` (because B5 is empty). This also holds for explicit ranges like `[Sheet$A1:B100]`.
3. **Unknown bracket-quoted identifiers raise `"Too few parameters. Expected 1."`** — this error also surfaces via `Has_error(conn)`. Use it as a column-name probe: a successful `SELECT TOP 1 [<candidate>] FROM [Sheet$]` means `<candidate>` IS a real column; an error means it isn't.
4. **UPDATE on a read-only file fails with `"Operation must use an updateable query."`** — misleading SQL-sounding error whose real cause is the Windows read-only file attribute. Files synced from 12dSynergy arrive read-only until checked out. Detect up-front with a writable-check:

    ```c
    Integer check_file_writable(Text path)
    {
        File f;
        Integer ret = File_open(path, "a", "", f);  // append mode = no truncate, no bytes written
        if(ret != 0) return 0;
        File_close(f);
        return 1;
    }
    ```

5. **Column-name probing pattern** (because `Database_Result` does not expose column-name enumeration in 12dPL):

    ```c
    Text sql = "SELECT TOP 1 [" + candidate + "] FROM [" + tab + "$]";
    Manual_Query q = Create_manual_query(sql);
    Database_Result r;
    if(Execute(conn, q, r) == 0 && Has_error(conn) == 0) {
        // candidate IS the real column name
        Close(r);
    } else {
        Text st, em;
        Get_last_error(conn, st, em);  // "Too few parameters. Expected 1."
        // try next candidate
    }
    ```

6. **Use `[Sheet$]` (with trailing `$`) as the table name** in `FROM` clauses: `FROM [MetaData$]`.

## 12dSynergy Project-Attribute Staleness

The `"12dSynergy"` sub-group under `Get_project_attributes(root)` is a CACHED snapshot. Its content depends on the project's sync state:

- **Fresh (checked-out or new) projects** have ~14 housekeeping entries only (`Job_Template`, `ProjectCreatedBy`, `12dProjectName`, `12dProjectPath`, etc.).
- **The full server-side attribute set (40+ entries including TfNSW/job-level metadata)** appears in the cache only AFTER a check-in → check-out cycle. Synergy's plugin refreshes the tree from the server during that action. `Save_project` alone does NOT refresh the cache.
- **`Get_number_of_attributes`** is authoritative — if it returns 14, there really are only 14 top-level leaves in the cached group.
- **The on-disk `project` binary file** (under `<project>.12dmodel\<name>.project\project`) holds attribute names as ASCII and values as UTF-16LE. The post-sync values land there before the cached group is refreshed — useful diagnostically, but not as a reading strategy (undocumented, version-fragile).

**12dSynergy local storage path pattern:**

```
C:\ProgramData\12dS\data\<server_id>\<job_name>\<folder_path>\<project>.12dmodel
```

Where `<server_id>` is the Synergy server (e.g. `tfnsw12dsynergy`) and `<job_name>` is the top-level Synergy job container. `Get_project_folder()` returns the `.12dmodel` directory, not its parent.

## Panel_prompt — Cannot Invoke Context Menus

`Panel_prompt(name, interactive, data)` can invoke only **named top-level panels**. It cannot reach right-click / context-menu actions such as the 12dSynergy attribute panel's "Write to file". SLX files written via "Save settings" are panel-state snapshots, not executable commands — they can be loaded into a Panel handle with `Write_SLX(Panel, Text)` but the panel still has to be opened by the user or a direct constructor chain.

12d's built-in "Write to file" action on the 12dSynergy attribute panel produces a UTF-16 tab-separated CSV with columns `"Attribute"` / `"Type    "` / `"Value   "` (padding preserved in headers) named `12dSynergyAttributes.csv` in the project folder.

## Bearing & Angle Calculation Pattern

For calculating bearing (horizontal) and vertical angles between two points:

```c
// Bearing = clockwise angle from North (Y-axis)
// Atan2(dx, dy) gives: 0=North, 90=East, 180=South, 270=West
Real dx = end_x - start_x;
Real dy = end_y - start_y;
Real dz = end_z - start_z;
Real bearing_rad = Atan2(dx, dy);

// Vertical angle = inclination from horizontal plane
Real horiz_dist = Sqrt(dx * dx + dy * dy);
Real vert_angle_rad = Atan2(dz, horiz_dist);

// Convert to degrees
Real bearing_deg;
Real vert_angle_deg;
Radians_to_degrees(bearing_rad, bearing_deg);
Radians_to_degrees(vert_angle_rad, vert_angle_deg);

// Normalize bearing to 0-360
while (bearing_deg < 0.0) bearing_deg = bearing_deg + 360.0;
while (bearing_deg >= 360.0) bearing_deg = bearing_deg - 360.0;
```

**Direction reversal detection:** If the absolute bearing difference between two strings exceeds 90°, they are likely digitised in opposite directions. Flip the as-built bearing by +180° and negate its vertical angle before comparing.

## Point Matching Pattern

When comparing points between two models by name, try multiple name-retrieval strategies in order:
1. `Get_super_vertex_point_number(elt, 1, name)` — structured point ID
2. `Get_name(elt, name)` — element name (fallback)
3. `Get_super_vertex_text(elt, 1, name)` — vertex text annotation (last resort)

Skip elements where all methods return empty. Use `Get_points(elt, num_pts)` to confirm single-point elements (`num_pts == 1`) before treating as a point.

## Language Features

### Operators
- Standard: `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `>`, `<=`, `>=`
- Compound assignment: `+=`, `-=` (e.g. `length += l;`)
- Increment/decrement: `++`, `--` (e.g. `count++;`)
- Ternary: `(condition) ? value_if_true : value_if_false`
- Logical: `&&`, `||`, `!` (e.g. `if(!Model_exists(name))`)
- String concatenation: `+` operator on `Text` values

### Flow Control
- `for(init; condition; increment)` — C-style, supports `for(; j <= n; i = j++)` with empty init
- `while(condition)` / `while(1)` infinite loops with `break`
- `switch(value) { case X: ... break; default: ... }` — Works on both `Integer` and `Text` values
- `goto label;` / `label:` — Commonly used for input retry loops and error handling
- `continue` — Skip to next iteration (common: `if(cmd == "keystroke") continue;`)
- `return(value);` — Parenthesised return is valid: `return(0);`, `return(reply);`

### Functions
- **User-defined function overloading**: Same name, different parameter types. Compiler resolves by parameter type.
- Functions can return any type including `Text`, `Element`, `Model`, `Real`, etc.
- Forward declarations: `void bar();` then define later

### Other Features
- Variable-length arrays: `Text list[count]` where count is a variable
- Implicit Real-to-Integer conversion: `Integer i = real_val * 100.0;`
- `Exit(Text msg)` — Terminates macro immediately with message
- `#if` / `#else` / `#endif` preprocessor conditionals
- 1-based indexing for all `Get_item`, `Get_*_data` calls

### Reserved Keywords
- **`Time` is a reserved keyword** in cc4d V15. Do NOT call `Time(Text &)` or `Time(Integer &h, Integer &m, Real &s)` — use `Get_time(Integer &time_val)` then `Convert_time(time_val, "%H:%M:%S", Text &output)` instead. For sub-second timing use `Get_time(Integer &h, Integer &m, Real &sec)` (compile-accepted on V15; FastPlot times its steps to 0.1 s with it).
- `Date(Text &)` works fine (not reserved).

## Compiler Reference

```powershell
Push-Location "path\to\macro-folder"
try {
    & "C:\Program Files\12d\12dmodel\15.00\nt.x64\cc4d.exe" "macro.4dm"
}
finally { Pop-Location }
```

| Flag | Purpose |
|------|---------|
| *(none)* | Normal compilation — produces `.4do` |
| `-p` | Output AST parse tree |
| `-proto` | Prototype/stub generation mode; not needed for normal builds |
| `-nocpp` | Skip C preprocessor |
| `-log file` | Write output to log file |
| `-allow_old_calls` | Allow deprecated function calls |
| `-allow_id_calls` | Allow identifier-style calls |
| `-macro_version N` | Target specific macro version |

Exit code 0 = success. Error format: `"filepath", line N.C: error: message`

Verified on this V15 installation on 2026-09-07: a deliberately unknown
function is rejected even without `-proto`; `Get_pipe_diameter` is rejected
as obsolete in normal mode. Do not add `-allow_old_calls` merely to hide an
incorrect API choice. Use the supported API for the actual element kind.

### Collection Review (2026-09-07)

The learning review covered 74 example sources (53 top-level and 21 under
`mattmonk`) and these eight project macros. This is a source-review inventory,
not a claim that every example was compiled or run in 12d during the review.

| Project entry point | Reusable behavior reviewed |
|---------------------|---------------------------|
| `Macro_Projects/DepthToZ/DepthToZ_panel_01.4dm` | Typed depth reads, dry run, detached undo snapshots |
| `Macro_Projects/FromSUI_To_DE/SUI_to_DE_panel.4dm` | DE/SUI field mappings, placeholder handling, attribute archiving |
| `Macro_Projects/Leaders/Utility Service Annotator.4dm` | Per-vertex labels, drafting styles, placement and diameter weights |
| `Macro_Projects/MultiPlot/MultiPlot_panel_01.4dm` | XML value counts, empty/self-closing leaves, per-block context |
| `Macro_Projects/NSWImport/NSWImport_panel.4dm` | Process/done-file IPC, import geometry, raster and DEM workflows |
| `Macro_Projects/SynergyMeta/SynergyMeta_panel_01.4dm` | ODBC probing, trimmed comparisons, no-touch export cache |
| `Macro_Projects/VertexAttributeTable/VertexAttributeTable_panel_01.4dm` | Grid lifecycle, typed vertex fields, clipboard edits and undo |
| `Macro_Projects/potholeCards/potholeCards_panel_01.4dm` | Attribute aliases and precedence, JSON fields, section/TIN validity |

`TfNSW_Survey_Utilities_Tree` contains a mapfile, not a `.4dm` entry point.
The example collection supplies panel/headless variants, alignment/HIP
workflows, reports, drainage matching, trimesh attributes, command arguments
and binary file helpers. Preserve their version and library requirements
rather than treating every old call or helper wrapper as a current built-in.

**Per-line string-literal limit.** `cc4d` chokes on very long single string literals with the misleading message `"syntax error - giving up"`. Failures begin around 600 characters of source per line — most often hit when emitting long HTML, SQL, or `Panel_prompt` SLX payloads as one big literal. Workaround: split into multiple `File_write_line` (or `hwl`) calls, or build the value across several `Text x = x + "..."` lines. HTML/XML output stays identical because adjacent text runs collapse on render. See `docs/conventions.md` "cc4d Per-Line String Length Limit".

## Header File: set_ups.h

The standard set_ups.h provides:

| Constant | Value | Purpose |
|----------|-------|---------|
| `TRUE` | 1 | Boolean true |
| `FALSE` | 0 | Boolean false |
| `OK` | 1 | Success return for widget validation |
| `SELECT_STRING` | 5509 | String selection flag |
| `SELECT_POINT` | 5505 | Point selection flag |
| `MODEL_EXISTS` | 2 | What `Validate(Model_Box, GET_MODEL_ERROR, ...)` returns for an existing model — **not** what `Model_exists(Text)` returns (that is just non-zero) |
| `CHECK_MODEL_EXISTS` | 3 | Model must exist flag (for `Model_Box`) |
| `CHECK_MODEL_MUST_EXIST` | 7 | Strict model must exist flag |
| `CHECK_MODEL_CREATE` | — | Create model if not exists (for `Model_Box`) |
| `GET_MODEL_ERROR` | 13 | Error code for `Model_Box` `Validate` |
| `GET_MODEL_CREATE` | — | Get-or-create for `Validate(Model_Box)` |
| `CHECK_VIEW_MUST_EXIST` | — | View must exist flag (for `View_Box`) |
| `GET_VIEW_ERROR` | — | Error code for `View_Box` `Validate` |
| `VIEW_EXISTS` | 7 | View existence check |
| `CHECK_TIN_MUST_EXIST` | 8 | TIN must exist flag (for `Tin_Box`) |
| `TIN_EXISTS` | 11 | TIN existence check return |
| `CHECK_FILE_MUST_EXIST` | 1 | File box: file must exist |
| `CHECK_FILE_CREATE` | 14 | File box: create/overwrite mode |
| `GET_FILE_MUST_EXIST` | 17 | Validate flag: require existing file |
| `GET_FILE_CREATE` | 15 | Validate flag: create/overwrite |
| `NO_FILE` | 4 | File box validate success return |
| `FILE_EXISTS` | 5 | File existence check return |
| `FILE_MODE_WRITE` | 1 | File box write mode |
| `NO_COLOUR` | -1 | Default colour value |
| `CHECK_MODEL_MUST_NOT_EXIST` | 60 | Model must not exist (for output) |

### Source_Box Flags

| Constant | Value | Icon/Mode |
|----------|-------|-----------|
| `Source_Box_Model` | `0x001` | Model picker |
| `Source_Box_View` | `0x002` | View picker |
| `Source_Box_String` | `0x004` | String pick |
| `Source_Box_Rectangle` | `0x008` | Rectangle fence |
| `Source_Box_Parallel` | `0x010` | Parallel fence |
| `Source_Box_Polygon` | `0x020` | Polygon fence |
| `Source_Box_Lasso` | `0x040` | Lasso selection |
| `Source_Box_Filter` | `0x080` | Element type filter |
| `Source_Box_Models` | `0x100` | Multi-model picker |
| `Source_Box_Favorites` | `0x200` | Favourites |
| `Source_Box_Multi_Pick` | `0x400` | Multi-pick |
| `Source_Box_Trapezoid` | `0x800` | Trapezoid fence |
| `Source_Box_All` | `0xFFF` | All of the above |
| `Source_Box_Fence_Inside` | `0x01000` | Fence inside mode |
| `Source_Box_Fence_Cross` | `0x02000` | Fence crossing mode |
| `Source_Box_Fence_Outside` | `0x04000` | Fence outside mode |
| `Source_Box_Fence_String` | `0x08000` | Fence string mode |
| `Source_Box_Fence_Points` | `0x10000` | Fence points mode |
| `Source_Box_Fence_All` | `0xFF000` | All fence modes |
| `Source_Box_Standard` | `Source_Box_All \| fences` | All icons + common fences |

### Vertical/Horizontal Group Modes

| Constant | Value | Purpose |
|----------|-------|---------|
| `BALANCE_WIDGETS_OVER_HEIGHT` | 1 | Expand widgets to fill vertical space |
| `ALL_WIDGETS_OWN_HEIGHT` | 2 | Use natural widget heights |
| `ALL_WIDGETS_OWN_LENGTH` | 4 | Use natural widget lengths |
| `BALANCE_WIDGETS_OVER_WIDTH` | 1 | Expand widgets to fill horizontal space |
| `ALL_WIDGETS_OWN_WIDTH` | 2 | Use natural widget widths |
| `COMPRESS_WIDGETS_OVER_WIDTH` | 4 | Compress widgets horizontally |

### Colour_Message_Box Levels

| Constant | Value | Colour |
|----------|-------|--------|
| `MESSAGE_LEVEL_GENERAL` | 1 | Green info icon |
| `MESSAGE_LEVEL_WARNING` | 2 | Orange warning icon |
| `MESSAGE_LEVEL_ERROR` | 3 | Red error icon |
| `MESSAGE_LEVEL_GOOD` | 4 | Green checkmark |

### Attribute Types

| Constant | Value | Purpose |
|----------|-------|---------|
| `ATT_TYPE_INTEGER` | 1 | Integer attribute |
| `ATT_TYPE_REAL` | 2 | Real attribute |
| `ATT_TYPE_TEXT` | 3 | Text attribute |
| `ATT_TYPE_BLOB` | 4 | Binary/blob attribute |
| `ATT_TYPE_ATTRIBUTES` | 5 | Nested Attributes group |
| `ATT_TYPE_UID` | 6 | UID attribute |
| `ATT_TYPE_INT64` | 7 | 64-bit integer attribute |
| `ATT_TYPE_GUID` | 8 | GUID attribute |

### Special Characters

| Constant | Value | Character |
|----------|-------|-----------|
| `Degrees_character` | 176 | ° |
| `Squared_character` | 178 | ² |
| `Cubed_character` | 179 | ³ |
| `Middle_dot_character` | 183 | · |
| `Diameter_large_character` | 216 | Ø |
| `Diameter_small_character` | 248 | ø |

Also provides: `create_rgb()`, `is_rgb()`, `get_rgb()` colour helpers.

**Note:** Different copies of `set_ups.h` exist — the full version is at `C:\Program Files\12d\12dmodel\15.00\set_ups\set_ups.h`. Workspace copies may be subsets. The value of `MODEL_EXISTS` can vary between copies (1 or 2). Always compare against the constant name, not a literal number.
