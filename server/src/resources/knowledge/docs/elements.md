> Source: 12d Model Macro Manual — §5.36 Elements (pp. 350–372), §5.55 General Element Operations (pp. 888–897)

# Elements

---

## Element Overview

The variable type `Element` is used as a handle to all data types that can be stored in a 12d Model
model — strings, tins, super tins, plot frames, etc. This allows macros to "walk" through a model
accessing each element without needing to know its type in advance.

```c
Element elt;
Dynamic_Element de;           // a list of Elements
Integer number_of_elts;
Text elt_type;
Get_elements(model, de, number_of_elts);
for (Integer i; i <= number_of_elts; i++) {
    Get_item(de, i, elt);     // get the next Element from the Model
    Get_type(elt, elt_type);  // find out if elt is a super string, tin, etc.
    if (elt_type == "Super") {
        ...
    }
}
```

---

## Element Type Codes

| Text Type | Integer | Description |
|-----------|---------|-------------|
| `Super` | — | Super string — a general string with (x,y,z,radius,text,attributes) at each point, plus optional dimensions |
| `Super_Alignment` | — | Super Alignment string — separate horizontal and vertical geometry |
| `Arc` | — | Arc string — arc in plan with linearly varying z (helix in 3D) |
| `Circle` | — | Circle string — circle in plan with constant z |
| `Drafting` | 326 | Drafting element: dimension, leader, or table |
| `Feature` | — | Circle with z-value at centre, null values on circumference |
| `Drainage` | — | String for drainage and sewer elements |
| `Interface` | — | String with (x,y,z,cut-fill flag) at each point |
| `Text` | — | String with text at a point |
| `Tin` | 18 | Triangulated irregular network |
| `Grid_tin` | 275 | Grid TIN |
| `SuperTin` | 70 | SuperTin of tins |
| `Plot Frame` | — | Element used for production of plan plots |
| `Pipeline` | — | String with separate horizontal/vertical geometry, single diameter |
| `Trimesh` | 750 | Trimesh |
| `2d` | — | *(superseded)* 2d string with (x,y) and constant z — replaced by Super with Type Like 11 |
| `3d` | — | *(superseded)* 3d string with (x,y,z) — replaced by Super with Type Like 12 |
| `4d` | — | *(superseded)* 4d string with (x,y,z,text) — replaced by Super with Type Like 29 |
| `Pipe` | — | *(superseded)* Pipe string — replaced by Super with Type Like 36 |
| `Polyline` | — | *(superseded)* Polyline string with (x,y,z,radius) — replaced by Super with Type Like 62 |
| `Alignment` | — | *(superseded)* Alignment string — replaced by Super Alignment |

### Super String Type Like Codes

| Type Like Number | Type Like Text |
|-----------------|----------------|
| 11 | 2d string — constant height for entire string |
| 12 | 3d string — different height allowed for each vertex |
| 13 | Interface string — colour for segments for cut and fill |
| 29 | 4d string — variable vertex text |
| 36 | Pipe string — constant diameter for entire string |
| 62 | Polyline string — different radius allowed for each segment |
| 40 | Face string |
| 71 | None of the above — just a normal super string |

---

## Element Header Functions

All new Elements are given default header information:
- Uid: unique Uid
- model: none
- colour: magenta
- name: none
- chainage: 0
- style: 1
- weight: 0

---

**`Integer Element_exists(Element elt)`** — ID 56

Checks the validity of an Element (that it has not been set to null).
- Non-zero return value: `elt` is not null.
- Zero return value: `elt` is null.

---

**`Integer Get_points(Element elt, Integer &num_verts)`** — ID 43

Get the number of vertices in the Element. For Elements of type Alignment, Arc, and Circle, returns the number of vertices when the Element is approximated using the 12d Model chord-to-arc tolerance. Returns zero on success.

---

**`Integer Get_data(Element elt, Integer i, Real &x, Real &y, Real &z)`** — ID 653

Get the (x,y,z) data for the `i`th vertex of the string Element. Returns zero on success.

> **Note:** Functions to set data arrays are given in the sections for each string type (e.g. §5.38 Super String).

---

**`Integer Set_name(Element elt, Text elt_name)`** — ID 45

Set the name of the Element. Returns zero on success.

> **Note:** Will not set the name of an Element of type Tin.

---

**`Integer Get_name(Element elt, Text &elt_name)`** — ID 44

Get the name of the Element. Returns zero on success; non-zero if `elt` is null.

---

**`Integer Set_colour(Element elt, Integer colour)`** — ID 47

Set the colour of the Element.

> **Notes:**
> (a) For an Interface string, the colour is only used when converting to a different string type.
> (b) There are functions to convert the colour number to a colour name and vice-versa.

Returns zero on success.

---

**`Integer Get_colour(Element elt, Integer &colour)`** — ID 46

Get the colour of the Element as an integer. There are 12dPL functions to convert colour numbers to names. Returns zero on success.

---

**`Integer Set_model(Element elt, Model model)`** — ID 55

Sets the 12d Model model of the Element. If `elt` is already in a model, it is moved to `model`. If not in a model, it is added to `model`. Returns zero on success.

---

**`Integer Set_model(Tin tin, Model model)`** — ID 480

Sets the 12d Model model of the Tin. Note that a tin can belong to more than one model. Returns zero on success.

---

**`Integer Remove_model(Tin tin, Model model)`** — ID 6889

Removes Tin `tin` out of containing Model `model`. Returns zero on success.

---

**`Integer Set_model(Dynamic_Element de, Model model)`** — ID 141

Sets the Model of all Elements in a `Dynamic_Element`. For each element, if already in a model it is moved; if not, it is added. Returns zero on success.

---

**`Integer Get_model(Element elt, Model &model)`** — ID 54

Get the model handle of the model containing the Element. Returns zero on success.

> **Note:** Cannot get the model when `elt` is a tin.

---

**`Integer Set_breakline(Element elt, Integer break_type)`** — ID 53

Sets the breakline type for triangulation:
- `0` — use as a point string
- `1` — use as a breakline string

Returns zero on success.

---

**`Integer Get_breakline(Element elt, Integer &break_type)`** — ID 52

Gets the breakline type of the Element (`0` = point string, `1` = breakline string). Returns zero on success.

---

**`Integer Get_type(Element elt, Text &elt_type)`** — ID 64

Get the Element type as a Text value. For values, see the Element Type Codes table above. Returns zero on success.

---

**`Integer Get_type(Element elt, Integer &elt_type)`** — ID 42

Get the Element type as an Integer value. For values, see the Element Type Codes table above. Returns zero on success.

---

**`Integer Set_style(Element elt, Text elt_style)`** — ID 49

Set the line style of the Element by name. Returns zero on success.

---

**`Integer Get_style(Element elt, Text &elt_style)`** — ID 48

Get the line style of the Element. Not used for Elements of type Tin or Text. Returns zero on success.

---

**`Integer Set_weight(Element elt, Real weight)`** — ID 1609

Set the weight of the Element. Returns zero on success.

---

**`Integer Get_weight(Element elt, Real &weight)`** — ID 1608

Get the line weight of the Element. Returns zero on success.

---

**`Integer Set_chainage(Element elt, Real start_chain)`** — ID 51

Set the start chainage of the Element. Returns zero on success.

---

**`Integer Get_chainage(Element elt, Real &start_chain)`** — ID 50

Get the start chainage of the Element. Returns zero on success.

---

**`Integer Get_end_chainage(Element elt, Real &chainage)`** — ID 654

Get the end chainage of the Element. Returns zero on success.

---

**`Integer Get_id(Element elt, Uid &uid)`** — ID 1908

Get the unique Uid of the Element. If `elt` is null or error occurs, `uid` is set to zero. Returns zero on success.

---

**`Integer Get_id(Element elt, Integer &id)`** — ID 378 *(deprecated)*

Get the unique integer id. Use `Get_id(Element, Uid &)` instead.

---

**`Integer Get_time_created(Element elt, Integer &time)`** — ID 673

Get the time of creation of the Element (seconds since January 1, 1970). Returns zero on success.

---

**`Integer Get_time_updated(Element elt, Integer &time)`** — ID 674

Get the time of the last update of the Element (seconds since January 1, 1970). Returns zero on success.

---

**`Integer Set_time_updated(Element elt, Integer time)`** — ID 675

Set the time of the last update of the Element. Returns zero on success.

---

**`Integer Null(Element elt)`** — ID 133

Set the Element to null. Does not affect the database item pointed to. Returns zero on success.

---

## Element Geometry Functions

**`Integer Get_extent_x(Element elt, Real &xmin, Real &xmax)`** — ID 159

Gets the x-extents of the Element. Returns zero on success.

---

**`Integer Get_extent_y(Element elt, Real &ymin, Real &ymax)`** — ID 160

Gets the y-extents of the Element. Returns zero on success.

---

**`Integer Get_extent_z(Element elt, Real &zmin, Real &zmax)`** — ID 161

Gets the z-extents of the Element. Returns zero on success.

---

**`Integer Calc_extent(Element elt)`** — ID 162

Calculate the extents of the Element. Necessary after an Element's body data has been modified. Returns zero on success.

---

**`Integer Element_duplicate(Element elt, Element &dup_elt)`** — ID 430

Create a duplicate of the Element and return it as `dup_elt`. Returns zero on success.

---

**`Integer Element_replace(Element &source, Element &target)`** — ID 7813

Update the content of Element `target` using Element `source` while preserving the target element ID. The two elements must be of the same type. Returns zero on success.

---

**`Integer Element_delete(Element elt)`** — ID 41

Delete from the 12d Model database the item pointed to by `elt`. The Element is then set to null. Returns zero on success.

---

**`Integer Element_delete(Element elt, Integer redraw)`** — ID 7962

Delete the database item. If `redraw` is non-zero, the Element is redrawn in all containing views; if zero, no redraw occurs. Returns zero on success.

---

**`Integer Delete_element(Text model_name, Uid model_id, Text element_name, Uid element_id)`** — ID 3917

Delete from the database the Element specified by model name, model Uid, element name, and element Uid. Returns zero on success.

---

**`Integer Find_element(Text model_name, Text element_name, Element &first_found, Integer &count)`** — ID 3922

Find the first database Element matching `model_name` and `element_name`, returning it in `first_found` and the total count in `count`. Returns zero on success.

---

## Element Attributes Functions (§5.36.2.2)

**`Integer Get_attributes(Element elt, Attributes &att)`** — ID 1972

Return the Attributes for the Element as `att`. If the Element has no attributes, returns non-zero.

> ⚠️ Only call this when the element **already has** attributes. Calling on an element with no attrs returns a null handle.

---

**`Integer Set_attributes(Element elt, Attributes att)`** — ID 1973

Set the Attributes for the Element to `att`.

> ⚠️ **Warning: Replaces the ENTIRE attribute tree.** If the element may already have other attribute groups, load the existing tree with `Get_attributes()` first before modifying.

Returns zero on success.

---

**`Integer Get_attribute(Element elt, Text att_name, Uid &uid)`** — ID 1974

Get the Uid attribute `att_name` from the Element. More efficient than loading full Attributes first. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Text att_name, Attributes &att)`** — ID 1975

Get the Attributes-type attribute `att_name` from the Element. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Integer att_no, Uid &uid)`** — ID 1976

Get the Uid attribute at position `att_no` from the Element. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Integer att_no, Attributes &att)`** — ID 1977

Get the Attributes-type attribute at position `att_no` from the Element. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Text att_name, Uid uid)`** — ID 1978

For the Element, if attribute `att_name` does not exist, create it as type Uid; if it exists and is type Uid, set its value. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Text att_name, Attributes att)`** — ID 1979

For the Element, if attribute `att_name` does not exist, create it as type Attributes; if it exists and is type Attributes, set its value.

> ⚠️ This is **CREATE-ONLY** for Attributes type — no-op if the group already exists. Use `Set_attribute(Attributes, Text, Attributes)` (ID 1964) for upsert behaviour on handle-level operations.

Returns zero on success.

---

**`Integer Set_attribute(Element elt, Integer att_no, Uid uid)`** — ID 1980

If attribute number `att_no` exists and is type Uid, set its value. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Integer att_no, Attributes att)`** — ID 1981

If attribute number `att_no` exists and is type Attributes, set its value. Returns zero on success.

---

**`Integer Attribute_exists(Element elt, Text att_name)`** — ID 555

Checks if a user attribute with name `att_name` exists in the Element.
- Non-zero: attribute **does** exist.
- Zero: no attribute of that name exists.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer Attribute_exists(Element elt, Text att_name, Integer &att_no)`** — ID 556

Checks if a user attribute with name `att_name` exists. If found, its position is returned in `att_no`. Returns non-zero if exists.

---

**`Integer Attribute_delete(Element elt, Text att_name)`** — ID 557

Delete the user attribute with name `att_name` for the Element. Returns zero on success.

---

**`Integer Attribute_delete(Element elt, Integer att_no)`** — ID 558

Delete the user attribute at position `att_no` for the Element. Returns zero on success.

---

**`Integer Attribute_delete_all(Element elt)`** — ID 559

Delete all user attributes for the Element. Returns zero on success.

---

**`Integer Get_number_of_attributes(Element elt, Integer &no_atts)`** — ID 560

Get the total number of user attributes for the Element. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Text att_name, Text &att)`** — ID 561

Get the Text user attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Text att_name, Integer &att)`** — ID 562

Get the Integer user attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Text att_name, Real &att)`** — ID 563

Get the Real user attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Integer att_no, Text &att)`** — ID 564

Get the Text user attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Integer att_no, Integer &att)`** — ID 565

Get the Integer user attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_attribute(Element elt, Integer att_no, Real &att)`** — ID 566

Get the Real user attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_attribute_name(Element elt, Integer att_no, Text &name)`** — ID 567

Get the name of the user attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_attribute_type(Element elt, Text att_name, Integer &att_type)`** — ID 568

Get the type of the user attribute with name `att_name`. For attribute type codes, see Data Type Attribute Type. Returns zero on success.

---

**`Integer Get_attribute_type(Element elt, Integer att_no, Integer &att_type)`** — ID 569

Get the type of the user attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_attribute_length(Element elt, Text att_name, Integer &att_len)`** — ID 570

Get the length of the user attribute with name `att_name`. Useful for attributes of type Text and Binary. Returns zero on success.

---

**`Integer Get_attribute_length(Element elt, Integer att_no, Integer &att_len)`** — ID 571

Get the length of the user attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Text att_name, Text att)`** — ID 572

Set the Text user attribute with name `att_name`. The attribute must be of type Text. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Text att_name, Integer att)`** — ID 573

Set the Integer user attribute with name `att_name`. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Text att_name, Real att)`** — ID 574

Set the Real user attribute with name `att_name`. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Integer att_no, Text att)`** — ID 575

Set the Text user attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Integer att_no, Integer att)`** — ID 576

Set the Integer user attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_attribute(Element elt, Integer att_no, Real att)`** — ID 577

Set the Real user attribute at position `att_no`. Returns zero on success.

---

**`Integer Attribute_dump(Element elt)`** — ID 578

Write out information about the Element attributes to the Output Window. Returns zero on success.

---

**`Integer Attribute_debug(Element elt)`** — ID 589

Write out even more information about the Element attributes to the Output Window. Returns zero on success.

---

---

## General Element Operations (§5.55)

---

### Selecting Strings (§5.55.1)

**`Integer Select_string(Text msg, Element &string)`** — ID 29

Write the message `msg` to the 12d Model Output Window and wait until a selection is made. Return codes:
- `-1` — cancel was chosen from the pick-ops menu
- `0` — pick unsuccessful
- `1` — pick was successful
- `2` — a cursor pick

---

**`Integer Select_string(Text msg, Element &string, Real &x, Real &y, Real &z, Real &ch, Real &ht)`** — ID 214

Write the message and return the Element picked plus coordinates of the picked point. `(x,y,z)` and `ch` are the position and chainage of the picked point. `ht` is reserved for future use. Return codes same as above.

---

**`Integer Select_string(Text msg, Element &string, Real &x, Real &y, Real &z, Real &ch, Real &ht, Integer &dir)`** — ID 547

As above, additionally returning `dir` — whether the picking motion was in the same direction as the string (`dir = 1`) or opposite direction (`dir = -1`). Return codes same as above.

---

### Drawing Elements (§5.55.2)

**`Integer Element_draw(Element elt)`** — ID 371

Draw the Element in its natural colour on all views it is displayed on. Returns zero on success.

---

**`Integer Element_draw(Element elt, Integer col_num)`** — ID 372

Draw the Element in colour number `col_num` on all views it is displayed on. Returns zero on success.

---

**`Integer Element_draw2(Element elt, Integer mode)`** — ID 7765

*(Do not use.)* Mode: bit 1024 = exclusive or/replace; bit 1 = draw all/draw normal. Returns zero on success.

---

**`Integer Element_draw2(Element elt, Integer col_num, Integer mode)`** — ID 7766

*(Do not use.)* As above, with explicit colour. Returns zero on success.

---

### Open and Closing Strings (§5.55.3)

**`Integer String_closed(Element elt, Integer &closed)`** — ID 368

Check if the Element is closed (first and last points are the same). `closed`: 1 = closed, 0 = open. Returns zero on success.

---

**`Integer String_open(Element elt)`** — ID 366

Open the Element. If the first and last points are the same, deletes the last point. Returns zero on success.

---

**`Integer String_close(Element elt)`** — ID 367

Close the Element. If the first and last points are not the same, adds a point to the end equal to the first point. Returns zero on success.

---

### Length and Area of Strings (§5.55.4)

**`Integer Get_length(Element string, Real &length)`** — ID 122

Get the plan length of the Element (end chainage minus start chainage). Returns zero on success.

---

**`Integer Get_length_3d(Element string, Real &length)`** — ID 359

Get the 3D length of the Element. Returns zero on success.

---

**`Integer Get_length_3d(Element string, Real ch, Real &length)`** — ID 2681

Get the 3D length of the Element from the start up to the given chainage `ch`. Returns zero on success.

---

**`Integer Plan_area(Element string, Real &plan_area)`** — ID 221

Calculate the plan area of the Element. If not closed, first and last points are joined before calculating. For an arc, returns the plan area of the sector. Returns zero on success.

---

**`Integer Plan_area_signed(Element string, Real &plan_area)`** — ID 3137

Calculate the signed plan area of the Element. Returns zero on success.

---

**`Integer Surface_area_tin_polygon(Tin tin, Element polygon, Real &slope_area, Real &plan_area)`** — ID 3736

Calculate the slope area and plan area of `polygon` within `tin`. If not closed, first and last points are joined. Returns zero on success.

---

### Position and Drop Point on Strings (§5.55.5)

**`Integer Get_position(Element elt, Real ch, Real &x, Real &y, Real &z, Real &inst_dir)`** — ID 190

Get the (x,y,z) position and instantaneous direction (in radians) of the point at chainage `ch` on the Element. Returns zero on success.

---

**`Integer Get_position(Element elt, Real ch, Real &x, Real &y, Real &z, Real &inst_dir, Real &rad, Real &inst_grade)`** — ID 471

For an Alignment element only — get the (x,y,z) position, radius `rad`, instantaneous direction, and instantaneous grade at chainage `ch`. Returns zero on success.

---

**`Integer Get_position(Element string, Real ch, Real &x, Real &y, Real &z, Real &dir, Integer &vertex, Real &distance)`** — ID 1775

Find the point at chainage `ch`. Returns coordinate, direction, index of the vertex before the point, and distance past that vertex. Not implemented for all string types. Returns zero on success.

---

**`Integer Drop_point(Element elt, Real xd, Real yd, Real zd, Real &xf, Real &yf, Real &zf, Real &ch, Real &inst_dir, Real &off)`** — ID 191

In plan, drop the point (`xd`,`yd`) perpendicularly onto the Element. If the point cannot be dropped onto any segment, it is dropped onto the closest end point. A z-value is interpolated.
- `(xf,yf,zf)` — position of the dropped point
- `ch` — chainage of the dropped point
- `inst_dir` — instantaneous direction at dropped point (radians)
- `off` — plan distance from the original point to the dropped point

Returns zero on success.

---

**`Integer Drop_point(Element elt, Real xd, Real yd, Real zd, Real &xf, Real &yf, Real &zf, Real &ch, Real &inst_dir, Real &off, Segment &segment)`** — ID 302

As above, additionally returning the `Segment` of the string that the point drops onto. Returns zero on success.

---

### Parallel Strings (§5.55.6)

The parallel command is a plan parallel — used for all Elements except Tin and Text. A positive distance parallels the object to the right; a negative distance to the left.

**`Integer Parallel(Element elt, Real distance, Element &parallelled)`** — ID 365

Plan parallel the Element by `distance`. The z-values are not modified. Returns zero on success.

---

### Self Intersection of String (§5.55.7)

**`Integer String_self_intersects(Element elt, Integer &intersects)`** — ID 328

Find the number of self-intersections for the Element. The number is returned in `intersects`.

> **Note:** For Elements of type Alignment, Arc, Circle, and Text, the number of intersects is set to negative.

Returns zero on success.

---

### Loop Clean Up for String (§5.55.8)

**`Integer Loop_clean(Element elt, Point ok_pt, Element &new_elt)`** — ID 329

Try to remove any plan loops in the Element. If `elt` is closed, `ok_pt` should be near a segment that will be in the cleaned string. If open, cleaning starts from the end closest to `ok_pt`. The cleaned Element is returned as `new_elt`.

> **Note:** Not defined for Elements of type Alignment, Arc, Circle, and Text.

Returns zero on success.

---

### Check Element Locks (§5.55.9)

**`Integer Get_read_locks(Element elt, Integer &num_locks)`** — ID 1453

Return the number of read locks on `elt` in `num_locks`.

> **Note:** There are no 12dPL functions that a macro programmer can use to set read locks. They are automatically assigned and removed by various 12dPL functions.

Returns zero on success.

---

**`Integer Get_write_locks(Element elt, Integer &num_locks)`** — ID 1454

Return the number of write locks on `elt` in `num_locks`.

> **Note:** As above — write locks are automatically managed.

Returns zero on success.

---

### Miscellaneous Element Functions (§5.55.10)

**`Integer String_replace(Element from, Element &to)`** — ID 1176

Copy the contents of Element `from` and use them to replace the contents of Element `to`. The ID/Uid of `to` is not replaced. Both elements must be strings of the same type (e.g. both Super).

> **Note:** Does not work for Elements of type Tin.

Returns zero on success.

---

**`Integer Line_cut_string(Real px, Real py, Real dir, Real cut_lim, Element string, Real &cx, Real &cy)`** — ID 5445

Find the closest cut of a line going through the original point (`px`,`py`) with direction `dir` to the Element `string`. The cut cannot be further from the original point than `cut_lim`. Returns the x-y coordinate of the closest cut in (`cx`,`cy`). Returns zero if a valid cut point is found.

---

**`Integer Chainage_height_profile(Element input_3d_string, Element &output_ch_h)`** — ID 7857

From a given 3D string, form a new 2D string such that (2D chainage, height) from the input matches (x,y) in the output at every point. Returns zero on success.

---

**`Integer Strings_from_sections(Model strings_model, Model sections_model, Text &error_message)`** — ID 7858

From a model of section strings `sections_model`, try to construct the strings that might form those sections and put them in `strings_model`. Any error is set in `error_message`. Returns zero on success.
