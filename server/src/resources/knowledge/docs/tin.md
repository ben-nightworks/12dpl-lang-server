> Source: 12d Model Macro Manual — §5.37 Tin Element (pp. 373–392), §5.48 Grid String and Grid Tin Element (pp. 748–758)

# TIN and Grid Elements

---

## TIN Element (§5.37)

The variable type `Tin` is used to refer to the standard 12d Model tins or triangulations. Tin
variables act as handles to the actual tin for easy manipulation within a macro.

---

### TIN Creation (§5.37.1 Triangulate Data)

**`Integer Triangulate(Dynamic_Element de, Text tin_name, Integer tin_colour, Integer preserve, Integer bubbles, Tin &tin)`** — ID 142

Triangulate the elements from a `Dynamic_Element` and create a tin named `tin_name` with colour `tin_colour`.
- `preserve != 0` — allows break lines to be preserved
- `bubbles != 0` — removes bubbles from the triangulation

The created tin is returned by `tin`. Returns zero on success.

---

**`Integer Triangulate(Dynamic_Text list, Text tin_name, Integer colour, Integer preserve, Integer bubbles, Tin &tin)`** — ID 1428

Triangulate the data from a list of model names (`Dynamic_Text list`). Tin name, colour, preserve, and bubble-removal options same as above. Returns zero on success.

---

**`Integer Triangulate_points(Dynamic_Real &x, Dynamic_Real &y, Integer full_tin, Dynamic_Integer &pt1, Dynamic_Integer &pt2, Dynamic_Integer &pt3)`** — ID 7995

Triangulate from points with given x,y coordinates. The two lists must have the same number of items and at least 3.
- `full_tin != 0` — triangulation is for full tin
- Results stored in `pt1`, `pt2`, `pt3` — lists of indices; the `i`-th item of `pt1` is the index of the first point of the `i`-th triangle face.

Returns zero on success.

---

**`Integer Triangulate_points(Dynamic_Real &x, Dynamic_Real &y, Dynamic_Real &z, Text tin_name, Tin &tin)`** — ID 7996

Triangulate from points with given x,y,z coordinates. All three lists must have the same number of items and at least 3. Returns zero on success.

---

**`Integer Triangulate_points(Integer npts, Real x[], Real y[], Real z[], Text tin_name, Tin &tin)`** — ID 7997

Triangulate from `npts` points with given x,y,z coordinate arrays. The arrays must have the same number of items and at least 3. Returns zero on success.

---

### TIN Query (§5.37.2 Tin Functions)

**`Integer Tin_exists(Text tin_name)`** — ID 355

Checks if a tin with the name `tin_name` exists.
- Non-zero: tin **does** exist.
- Zero: no tin of that name exists.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer Tin_exists(Tin tin)`** — ID 356

Checks if the Tin `tin` is valid (not null).
- Non-zero: `tin` is not null.
- Zero: `tin` is null.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer Get_project_tins(Dynamic_Text &tins)`** — ID 232

Get the names of all the tins in the project. Returns zero on success.

---

**`Tin Get_tin(Text tin_name)`** — ID 146

Get a Tin handle for the tin with name `tin_name`. Returns the handle if it exists, or a null Tin if not.

---

**`Tin Get_tin(Element elt)`** — ID 370

If the Element is of type Tin and the tin exists, returns a Tin handle. Returns null Tin otherwise.

---

**`Integer Find_tins(Text name_match, Dynamic_Text &tin_names)`** — ID 3947

Find all tins with names matching wildcard pattern `name_match`. Returns zero on success.

---

**`Integer Get_name(Tin tin, Text &tin_name)`** — ID —

Get the name of the Tin. Returns zero on success; non-zero if `tin` is null.

---

**`Integer Tin_models(Tin tin, Dynamic_Text &models_used)`** — ID 431

Get the names of all the models that were used to create the Tin. Returns zero on success.

---

**`Integer Get_time_created(Tin tin, Integer &time)`** — ID 2114

Get the time that the Tin was created (seconds since January 1, 1970). Returns zero on success.

---

**`Integer Get_time_updated(Tin tin, Integer &time)`** — ID 2115

Get the time that the Tin was last updated (seconds since January 1, 1970). Returns zero on success.

---

**`Integer Set_time_updated(Tin tin, Integer time)`** — ID 2116

Set the update time for the Tin (seconds since January 1, 1970). Returns zero on success.

---

**`Integer Tin_number_of_points(Tin tin, Integer &notri)`** — ID 472

Get the total number of points used in creating the Tin. This includes duplicate points and the four construction points. Returns zero on success; non-zero if `tin` is null.

---

**`Integer Tin_number_of_triangles(Tin tin, Integer &notri)`** — ID 473

Get the number of triangles in the Tin. This includes null triangles and construction triangles. Returns zero on success; non-zero if `tin` is null.

---

**`Integer Tin_number_of_duplicate_points(Tin tin, Integer &notri)`** — ID 474

Get the number of duplicate points found whilst creating the Tin. Returns zero on success; non-zero if `tin` is null.

---

**`Integer Tin_number_of_items(Tin tin, Integer &num_items)`** — ID 475

Get the number of strings in the tin. Note: if the original string had invisible segments (discontinuities), it may be broken into two or more strings in the tin. Returns zero on success.

---

**`Integer Tin_colour(Tin tin, Real x, Real y, Integer &colour)`** — ID 218

Get the colour of the tin at point (x,y). Returns zero on success.

---

**`Integer Tin_height(Tin tin, Real x, Real y, Real &height)`** — ID 215

Get the height of the tin at point (x,y). If (x,y) is outside the tin, returns non-zero. Returns zero on success.

---

**`Integer Tin_slope(Tin tin, Real x, Real y, Real &slope)`** — ID 216

Get the slope of the tin at point (x,y). Slope is an angle in radians measured from the horizontal plane. Returns non-zero if (x,y) is outside the tin.

---

**`Integer Tin_aspect(Tin tin, Real x, Real y, Real &aspect)`** — ID 217

Get the aspect of the tin at point (x,y). Aspect is a bearing in radians (clockwise from positive y-axis / North). Returns non-zero if (x,y) is outside the tin.

---

**`Integer Tin_get_point(Tin tin, Integer np, Real &x, Real &y, Real &z)`** — ID 831

Get the (x,y,z) coordinate of the `np`-th point of the tin. Returns zero on success.

---

**`Integer Tin_get_triangle_points(Tin tin, Integer nt, Integer &p1, Integer &p2, Integer &p3)`** — ID 832

Get the three point indices of the `nt`-th triangle of the tin.

> **Note:** Looking at the triangle from down the direction of the normal (pointing "upward"), points `p1`, `p2`, `p3` are in **clockwise** order. This is the opposite to the right-hand screw rule, and also opposite to the order in a trimesh (§5.51).

Returns zero on success.

---

**`Integer Tin_get_triangle_neighbours(Tin tin, Integer nt, Integer &n1, Integer &n2, Integer &n3)`** — ID 833

Get the three neighbour triangle indices of the `nt`-th triangle of the tin. Returns zero on success.

---

**`Integer Tin_get_point_from_point(Tin tin, Real x, Real y, Integer &np)`** — ID 1436

For the coordinate (x,y), get the tin point number of the vertex of the triangle closest to (x,y). Returns zero on success.

---

**`Integer Tin_get_triangles_about_point(Tin tin, Integer n, Integer &no_triangles)`** — ID 1628

Get the number of triangles surrounding the `n`-th point of the tin (includes construction triangles). Returns zero on success.

---

**`Integer Tin_get_triangles_about_point(Tin tin, Integer n, Integer max_triangles, Integer &no_triangles, Integer triangles[], Integer points[], Integer status[])`** — ID 1629

For the `n`-th point, get:
- `no_triangles` — number of surrounding triangles
- `triangles[]` — list of triangle numbers
- `points[]` — list of all vertex point numbers (same count as triangles)
- `status[]` — status of each triangle: `2` = normal visible, `1`/`0` = null or construction

`max_triangles` is the array sizes; if `max_triangles <= no_triangles`, the function fails with return 12. Returns zero on success.

---

**`Integer Tin_get_triangle_inside(Tin tin, Integer triangle, Integer &Inside)`** — ID 835

Get the condition of the triangle:
- `0` — not a valid triangle
- `1` — null triangle or construction triangle
- `2` — non-null (valid) triangle

Returns zero on success.

---

**`Integer Tin_get_triangle(Tin tin, Integer triangle, Integer &p1, Integer &p2, Integer &p3, Integer &n1, Integer &n2, Integer &n3, Real &x1, Real &y1, Real &z1, Real &x2, Real &y2, Real &z2, Real &x3, Real &y3, Real &z3)`** — ID 836

Get all three points (with coordinates) and three neighbour triangles of the `n`-th triangle in one call. Returns zero on success.

---

**`Integer Tin_get_triangle_from_point(Tin tin, Real x, Real y, Integer &triangle)`** — ID 837

Get the triangle of the tin containing the coordinate (x,y). Returns zero on success.

---

**`Integer Draw_triangle(Tin tin, Integer tri, Integer c)`** — ID 1433

Draw triangle `tri` with colour `c` inside the Tin. Returns zero on success.

---

**`Integer Draw_triangles_about_point(Tin tin, Integer pt, Integer c)`** — ID 1434

Draw the triangles about point `pt` with colour `c`. Returns zero on success.

---

**`Integer Triangles_clip(Real x1, Real y1, Real x2, Real y2, Real x3, Real y3, Real x4, Real y4, Real z4, Real x5, Real y5, Real z5, Real x6, Real y6, Real z6, Integer &npts_out, Real xarray_out[], Real yarray_out[], Real zarray_out[])`** — ID 1439

Clip a 3D triangle (vertices at `(x4,y4,z4)`, `(x5,y5,z5)`, `(x6,y6,z6)`) by a 2D triangle (`(x1,y1)`, `(x2,y2)`, `(x3,y3)`). The output arrays must have dimensions at least 9. Returns the clipped polygon points in `xarray_out[]`, `yarray_out[]`, `zarray_out[]`, with count `npts_out`. Returns zero on success.

---

**`Integer Tin_drop_point_3d(Tin tin, Real px, Real py, Real pz, Real &dx, Real &dy, Real &dz, Real &distance, Integer &above_tin, Integer &triangle, Integer &status)`** — ID 3030

Drop a point with xyz-coordinate (`px`,`py`,`pz`) to the Tin. Returns:
- `(dx,dy,dz)` — dropped coordinate
- `distance` — distance to the tin
- `above_tin` — 1 if point is above the tin, else 0
- `triangle` — triangle index of the dropped point
- `status` — drop status

Returns zero on success.

---

**`Integer Supertin_number_of_tins(Tin supertin, Integer &ntins)`** — ID 3217

Get the number of component tins of a supertin. Returns zero if input is an actual supertin.

---

**`Integer Supertin_get_tin(Tin supertin, Integer pos, Text &name, Integer &mode, Integer &active)`** — ID 3218

Get the details of component tin number `pos` of a supertin:
- `name` — name of the component tin
- `mode` — whether it is a hole (1 = true, 0 = false)
- `active` — active flag (1 = true, 0 = false)

Returns zero if the input is an actual supertin and position is valid.

---

### TIN Modification

**`Integer Tin_duplicate(Tin tin, Text dup_name)`** — ID 429

Create a new Tin with name `dup_name` which is a duplicate of `tin`. Error if a Tin called `dup_name` already exists. Returns zero on success.

---

**`Integer Tin_rename(Text original_name, Text new_name)`** — ID 422

Change the name of the Tin `original_name` to `new_name`. Returns zero on success.

---

**`Integer Tin_boundary(Tin tin, Integer colour_for_strings, Dynamic_Element &de)`** — ID 476

Get the boundary polygons for the Tin, returned in `de` with colour `colour_for_strings`. Returns zero on success.

---

**`Integer Tin_delete(Tin tin)`** — ID 219

Delete the Tin from the project and disk. Does not work on super tins or grid tins. Returns zero on success.

---

**`Integer Tin_delete(Tin tin, Integer ignore_shared_out_flag)`** — ID 7888

Delete the Tin. If it is shared out and `ignore_shared_out_flag` is zero, the function fails with return value 6. If `ignore_shared_out_flag` is non-zero, deletes even when shared out. Returns zero on success.

---

**`Integer Delete_tins(Text name_match)`** — ID 3920

Delete all tins with names matching the wildcard `name_match`. **Cannot be undone.** Returns zero on success.

---

**`Integer Delete_all_tins()`** — ID 3914

Delete all tins from the project and disk. **Cannot be undone.** Returns zero on success.

---

**`Integer Retriangulate(Tin tin)`** — ID 1429

Retriangulate the Tin. Returns zero on success.

---

**`Integer Breakline(Tin tin, Integer p1, Integer p2)`** — ID 1430

Add a breakline in Tin from point `p1` to point `p2`. Returns zero on success.

---

**`Integer Flip_triangles(Tin tin, Integer t1, Integer t2)`** — ID 1431

Flip triangles `t1` and `t2` in the Tin. Returns zero on success.

---

**`Integer Set_height(Tin tin, Integer pt, Real ht)`** — ID 1432

Set the height `ht` for the point `pt` on the Tin. Returns zero on success.

---

### Null Triangles (§5.37.3)

**`Integer Null(Tin tin)`** — ID 376

Set the Tin handle `tin` to null. Does not affect the actual tin. Returns zero on success.

---

**`Integer Null_triangles(Tin tin, Element poly, Integer mode)`** — ID 153

Set any triangle whose centroid is inside or outside a given polygon to null.
- `mode = 0` — the inside of the polygon is nulled
- `mode = 1` — the outside is nulled

Returns zero if no errors occur in the nulling calculations.

---

**`Integer Reset_null_triangles(Tin tin, Element poly, Integer mode)`** — ID 154

Set any null triangle whose centroid is inside or outside a given polygon back to a valid triangle.
- `mode = 0` — inside is reset
- `mode = 1` — outside is reset

Returns zero if no errors occur.

---

**`Integer Reset_null_triangles(Tin tin)`** — ID 155

Set all triangles of the Tin to be valid triangles. Returns zero on success.

---

**`Integer Null_by_angle_length(Tin tin, Real l1, Real a1, Real l2, Real a2)`** — ID 1435

Null triangles based on angle and length criteria:
- triangles with an external side greater than `l2` are nulled
- triangles with an external side having an angle less than `a2` (radians) are nulled
- triangles with a combined external side meeting both `l1` length and `a1` angle criteria are nulled

Various view draw flags may not be set correctly after this call; consider the 7-parameter overload instead.

---

**`Integer Null_by_angle_length(Tin tin, Real length, Real angle, Real length_only, Real angle_only, Integer regenerate_boundary)`** — ID 7953

Null triangles with more precise criteria:
- `length_only` — null if an external non-breakline side is greater
- `angle_only` — null if an external non-breakline side angle is less (radians)
- combined `length` and `angle` — null if an external side meets both criteria

If `regenerate_boundary != 0`, the boundary is regenerated after nulling. Returns zero on success.

---

**`Integer Null_by_angle_length_seed(Tin tin, Real length, Real angle, Real length_only, Real angle_only, Real seed_x, Real seed_y, Integer regenerate_boundary)`** — ID 7954

Null triangles from a seed point at (seed_x, seed_y) using the same angle/length criteria as above. Returns zero on success.

---

**`Integer Tin_null_by_colour(Tin tin, Integer colour, Integer is_colour, Integer is_null)`** — ID 3219

Reset or null triangles based on triangle colour:
- `is_colour = 1` — only process triangles with matching colour; `0` = only process non-matching
- `is_null = 0` — resets null triangles; `1` = sets null triangles

> **Note:** A triangle with no own colour (using main tin colour) matches with `colour = 0`. A triangle with its own colour that happens to equal the main tin colour is different from `colour = 0`.

Returns zero on success.

---

**`Integer Tin_null_by_colours(Tin tin, Dynamic_Integer colours, Integer in_colours_list, Integer is_null)`** — ID 3220

Reset or null triangles based on a list of colours:
- `in_colours_list = 1` — process triangles with colours in the list; `0` = process those not in list
- `is_null = 0` — resets null triangles; `1` = sets null triangles

Returns zero on success.

---

### Colour Triangles (§5.37.4)

**`Integer Tin_get_triangle_colour(Tin tin, Integer triangle, Integer &colour)`** — ID 834

Get the colour of the `n`-th triangle of the tin.

> **Note 1:** If the triangle is not a valid triangle, the return colour will be 0. Use `Tin_get_triangle_inside` and check if `error = 2` to validate.
>
> **Note 2:** If the triangle does not have its own colour (uses the common tin colour), the return colour will also be 0.

Returns zero on success.

---

**`Integer Colour_triangles(Tin tin, Integer col_num, Element poly, Integer mode)`** — ID 156

Colour all triangles in the Tin whose centroids are inside or outside a given polygon.
- `mode = 0` — triangles inside the polygon are coloured
- `mode = 1` — triangles outside the polygon are coloured

Returns zero if no errors in the colour calculations.

---

**`Integer Colour_triangle(Tin tin, Integer triangle_number, Integer colour)`** — ID 3843

Colour one triangle at index `triangle_number` to the specified colour. Returns zero on success.

---

**`Integer Colour_triangle(Tin tin, Dynamic_Integer triangle_numbers, Integer colour)`** — ID 3844

Colour all triangles at the given indices to the specified colour. Returns zero on success.

---

**`Integer Reset_colour_triangles(Tin tin, Element poly, Integer mode)`** — ID 157

Set any triangle in the Tin whose centroid is inside or outside a polygon back to the base tin colour.
- `mode = 0` — triangles inside are reset
- `mode = 1` — triangles outside are reset

Returns zero if no errors in the colour reset calculations.

---

**`Integer Reset_colour_triangles(Tin tin)`** — ID 158

Set all triangles in the Tin back to the base tin colour. Returns zero on success.

---

---

## Grid String / Grid TIN (§5.48)

Grid string and grid tin are two separate element types that share the same underlying structures:
- **Grid geometry**: origin point coordinates, angle of grid lines, spacings of grid lines
- **Grid range**: start and end in both directions (can start before or after the origin point)
- **Grid heights**: levels of points defined by the grid range and geometry

---

### Creation

**`Element Create_grid_string()`** — ID 2908

Return an Element of type grid string. Use `Set_grid_geometry` and `Set_grid_range` to set up the data.

---

**`Tin Create_grid_tin(Text name)`** — ID 2909

Create a grid Tin with the given name. Use `Set_grid_geometry` and `Set_grid_range` to set up the data. Returns the created Tin.

---

**`Integer Can_edit_grid_data(Element elt, Integer &result)`** — ID 2910

Set `result` to 1 if the grid data of Element `elt` can be edited, 0 otherwise.
- Return 1: element does NOT have valid grid data
- Return 0: element has valid grid data

---

### Geometry and Range

**`Integer Set_grid_geometry(Element elt, Real origin_x, Real origin_y, Real spacing_x, Real spacing_y, Real angle)`** — ID 2911

Set the geometry of the grid data of the Element:
- `(origin_x, origin_y)` — origin point
- `spacing_x`, `spacing_y` — spacing in x and y directions
- `angle` — grid rotation angle

Return 10: element does not have valid unlocked grid data. Return 0: success.

---

**`Integer Get_grid_geometry(Element elt, Real &origin_x, Real &origin_y, Real &spacing_x, Real &spacing_y, Real &angle)`** — ID 2912

Get the geometry of the grid data, returning origin, spacings, and angle. Returns zero on success.

---

**`Integer Set_grid_range(Element elt, Integer xmin, Integer ymin, Integer xmax, Integer ymax)`** — ID 2913

Set the range of the grid data. x-range from `xmin` to `xmax`, y-range from `ymin` to `ymax`.
- Return 10: element does not have valid unlocked grid data
- Return 11: input range is not valid
- Return 100: input range exceeded the points limit
- Return 0: success

---

**`Integer Get_grid_range(Element elt, Integer &xmin, Integer &ymin, Integer &xmax, Integer &ymax)`** — ID 2914

Get the range of the grid data. Returns zero on success.

---

### Grid Dimension Queries

**`Integer Grid_get_x_points(Element elt, Integer &count)`** *(alias: `Grid_get_x_count`)* — ID 2915

Get the number of points in the x-range of the grid data. Returns zero on success.

---

**`Integer Grid_get_y_points(Element elt, Integer &count)`** *(alias: `Grid_get_y_count`)* — ID 2916

Get the number of points in the y-range of the grid data. Returns zero on success.

---

**`Integer Grid_get_x_cells(Element elt, Integer &count)`** *(alias: `Grid_get_x_range`)* — ID 2917

Get the number of cells in the x-range (should be 1 less than the points count). Returns zero on success.

---

**`Integer Grid_get_y_cells(Element elt, Integer &count)`** *(alias: `Grid_get_y_range`)* — ID 2918

Get the number of cells in the y-range (should be 1 less than the points count). Returns zero on success.

---

### Coordinate System Transforms

The grid has three coordinate systems:
- **World coordinate** — normal 12D x-y coordinate system
- **Grid coordinate** — origin same as cell, x-y axis rotated by grid angle; values equal cell coordinate × spacing
- **Cell coordinate** — counts number of cells from the origin; non-integer values indicate positions within a cell

The **Integer cell coordinate** of a point is the real cell coordinate of the bottom-left corner of the containing grid square (values rounded to 6 decimal places before determining containing square).

---

**`Integer Grid_world_to_grid(Element elt, Real world_x, Real world_y, Real &grid_x, Real &grid_y)`** — ID 2919

Transform world coordinate to grid coordinate. Returns zero on success; 10 = invalid grid data; 11 = transform failed.

---

**`Integer Grid_world_to_cell(Element elt, Real world_x, Real world_y, Real &cell_x, Real &cell_y)`** — ID 2920

Transform world coordinate to real cell coordinate. Returns zero on success.

---

**`Integer Grid_world_to_cell(Element elt, Real world_x, Real world_y, Integer &cell_x, Integer &cell_y)`** — ID 2921

Transform world coordinate to integer cell indices. Returns zero on success.

---

**`Integer Grid_grid_to_world(Element elt, Real grid_x, Real grid_y, Real &world_x, Real &world_y)`** — ID 2922

Transform grid coordinate to world coordinate. Returns zero on success.

---

**`Integer Grid_grid_to_cell(Element elt, Real grid_x, Real grid_y, Real &cell_x, Real &cell_y)`** — ID 2923

Transform grid coordinate to real cell coordinate. Returns zero on success.

---

**`Integer Grid_grid_to_cell(Element elt, Real grid_x, Real grid_y, Integer &cell_x, Integer &cell_y)`** — ID 2924

Transform grid coordinate to integer cell indices. Returns zero on success.

---

**`Integer Grid_cell_to_world(Element elt, Real cell_x, Real cell_y, Real &world_x, Real &world_y)`** — ID 2925

Transform real cell coordinate to world coordinate. Returns zero on success.

---

**`Integer Grid_cell_to_world(Element elt, Integer cell_x, Integer cell_y, Real &world_x, Real &world_y)`** — ID 2926

Transform integer cell indices to world coordinate. Returns zero on success.

---

**`Integer Grid_cell_to_grid(Element elt, Real cell_x, Real cell_y, Real &grid_x, Real &grid_y)`** — ID 2927

Transform real cell coordinate to grid coordinate. Returns zero on success.

---

**`Integer Grid_cell_to_grid(Element elt, Integer cell_x, Integer cell_y, Real &grid_x, Real &grid_y)`** — ID 2928

Transform integer cell indices to grid coordinate. Returns zero on success.

---

**`Integer Shift_grid_range(Element elt, Integer xshift, Integer yshift)`** — ID 2929

Shift the grid data by `(xshift, yshift)` cells in the x and y direction. The new minimum x index equals old minimum x minus `xshift`. Returns zero on success.

---

### Height Operations

**`Integer Set_grid_heights(Element elt)`** — ID 2930

Null all heights of the grid data of the Element. Returns zero on success.

---

**`Integer Set_grid_heights(Element elt, Real value)`** — ID 2931

Set all heights of the grid data to a single Real value. Returns zero on success.

---

**`Integer Set_grid_heights(Element elt, Tin tin)`** — ID 2932

Set the heights of the grid data to the levels of Tin `tin`. Returns zero on success.

---

**`Integer Set_grid_heights(Element elt, Dynamic_Element list)`** — ID 2933

Set the heights of the grid data according to the `Dynamic_Element list`. Returns zero on success.

---

**`Integer Set_grid_height(Element elt, Integer xc, Integer yc, Real ht)`** — ID 2934

Set the height at cell indices (`xc`, `yc`) to `ht`. Returns zero on success.

---

**`Integer Get_grid_height(Element elt, Integer xc, Integer yc, Real &ht)`** — ID 2935

Get the height at cell indices (`xc`, `yc`). Returns zero on success.

---

### Conversion Functions

**`Integer Convert_grid_string_to_grid_tin(Element elt, Text tin_name, Tin &tin)`** — ID 2936

Create a new grid Tin with name `tin_name` from the grid data of element `elt`.
- Return 10: a tin named `tin_name` already exists
- Return 11: creation failed
- Return 0: success

---

**`Integer Convert_grid_tin_to_grid_string(Element tin, Element &elt)`** — ID 2937

Create a new grid string `elt` from the grid data of tin Element `tin`. Returns zero on success.

---

**`Integer Convert_grid_to_strings(Element elt, Dynamic_Element &list)`** — ID 2938

Create a list of strings from the grid data of element `elt`. Returns zero on success.

---

**`Integer Convert_grid_to_tin(Element elt, Text tin_name, Tin &tin)`** — ID 2939

Create a new tin with name `tin_name` from the grid data of element `elt`. Returns zero on success.

---

### Grid Merging

**`Integer Compute_merged_grid(Dynamic_Element list, Real &origin_x, Real &origin_y, Real &spacing_x, Real &spacing_y, Real &angle, Integer &xmin, Integer &ymin, Integer &xmax, Integer &ymax)`** — ID 2940

Calculate the geometry and range of the merged grid for a list of grid elements. Returns geometry (origin, spacings, angle) and range (xmin, ymin, xmax, ymax).
- Return 11: list has no element with valid grid data
- Return 12: list has only one element with valid grid data
- Return 14: merging failed
- Return 0: success

---

**`Integer Merge_grids(Dynamic_Element list, Element &grid)`** — ID 2941

Merge the grid data of a list of grid elements into the grid data of Element `grid`.
- Return 11: list has no element with valid grid data
- Return 12: list has only one element with valid grid data
- Return 14: merging failed
- Return 0: success
