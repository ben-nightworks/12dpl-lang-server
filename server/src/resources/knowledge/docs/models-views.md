> Source: 12d Model Macro Manual — §5.34 Models (pp. 307–326), §5.35 Views (pp. 327–349)

# Models and Views

---

## Models (§5.34)

The variable type `Model` is used to refer to 12d Model models. Model variables act as handles to
the actual 12d Model model so that the model can be easily referred to and manipulated within a
macro.

The items that can be stored in Models are known as Elements (strings, tins, plot frames, etc.).
The list of Elements in a model can be obtained as a `Dynamic_Element`, allowing you to "walk"
through all Elements in a Model:

```c
Element elt;
Dynamic_Element de;          // a list of Elements
Integer number_of_elts;
Text elt_type;
Get_elements(model, de, number_of_elts);
for (Integer i; i <= number_of_elts; i++) {
    Get_item(de, i, elt);   // get the next Element from the Model
    // the Element elt can now be processed
    ...
}
```

> **Important Note:** To add an Element `elt` to a `Model` model, use `Set_model(Element elt, Model model)`.

---

### Model Functions

#### Creation and Retrieval

**`Model Create_model(Text model_name)`** — ID 59

Create a Model with the name `model_name`. If the model is created, its handle is returned. If no model can be created, a null Model is returned.

---

**`Model Get_model_create(Text model_name)`** — ID 60

Get a handle to the model with name `model_name`. If the model exists, its handle is returned. If no such model exists, a new model is created and its handle returned. If creation fails, a null Model is returned.

---

**`Model Get_model(Text model_name)`** — ID 58

Get the Model with the name `model_name`. If the model exists, its handle is returned. If no model of that name exists, a null Model is returned.

---

**`Integer Get_model(Uid model_id, Model &model)`** — ID 1912

Get the model in the Project that has the Uid `model_id` and return it in `model`. Returns zero on success.

---

**`Integer Get_model(Integer model_id, Model &model)`** — ID 1180 *(deprecated)*

Get the model with integer id `model_id`. Use `Get_model(Uid, Model &)` instead.

---

**`Integer Get_element(Uid model_id, Uid element_id, Element &elt)`** — ID 1913

Get the Element with Uid `element_id` from the model with Uid `model_id` and return it in `elt`. Returns zero on success.

---

**`Integer Get_element(Integer model_id, Integer element_id, Element &elt)`** — ID 1181 *(deprecated)*

Get the Element with integer ids. Use `Get_element(Uid, Uid, Element &)` instead.

---

**`Integer Get_element(Text model_name, Uid model_id, Text element_name, Uid element_id, Element &elt)`** — ID 3936

Internal use only. Returns zero on success.

---

#### Existence Checks

**`Integer Model_exists(Text model_name)`** — ID 63

Checks to see if a model with the name `model_name` exists.
- Non-zero return value: model **does** exist.
- Zero return value: no model of that name exists.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer Model_exists(Model model)`** — ID 62

Checks if the Model `model` is valid (not null).
- Non-zero return value: model is not null.
- Zero return value: model is null.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

#### Listing and Finding Models

**`Integer Get_project_models(Dynamic_Text &model_names)`** — ID 231

Get the names of all the models in the project. The names are returned in `model_names`. Returns zero on success.

---

**`Integer Find_models(Text name_match, Dynamic_Text &model_names)`** — ID 3946

Find all models with names matching wild card pattern `name_match`. Returns the number of models found.

---

#### Name and ID

**`Integer Get_name(Model model, Text &model_name)`** — ID 57

Get the name of the Model `model`. Returns zero on success; non-zero if model is null.

---

**`Integer Get_id(Model model, Uid &id)`** — ID 1914

Get the Uid of the Model `model` and return it in `id`. Returns zero on success.

---

**`Integer Get_id(Model model, Integer &id)`** — ID 1182 *(deprecated)*

Get the integer id of the Model. Use `Get_id(Model, Uid &)` instead.

---

#### Time Stamps

**`Integer Get_time_created(Model model, Integer &time)`** — ID 2111

Get the time that the Model was created. Time is seconds since January 1, 1970. Returns zero on success.

---

**`Integer Get_time_updated(Model model, Integer &time)`** — ID 2112

Get the time the Model was last updated. Time is seconds since January 1, 1970. Returns zero on success.

---

**`Integer Set_time_updated(Model model, Integer time)`** — ID 2113

Set the update time for the Model to `time` (seconds since January 1, 1970). Returns zero on success.

---

#### Extents

**`Integer Get_extent_x(Model model, Real &xmin, Real &xmax)`** — ID 163

Gets the x-extents of the Model. Returns zero on success.

---

**`Integer Get_extent_y(Model model, Real &ymin, Real &ymax)`** — ID 164

Gets the y-extents of the Model. Returns zero on success.

---

**`Integer Get_extent_z(Model model, Real &zmin, Real &zmax)`** — ID 165

Gets the z-extents of the Model. Returns zero on success.

---

**`Integer Calc_extent(Model model)`** — ID 166

Calculate the extents of the Model. Necessary when Elements have been deleted from a model. Returns zero on success.

---

#### Element Access

**`Integer Get_number_of_items(Model model, Integer &num)`** — ID 452

Get the number of items (Elements) in the Model. Returns zero on success.

---

**`Integer Get_number_of_items_peek(Model model, Integer &num)`** — ID 7675

Get the number of items in the Model without force-loading the full model. Returns zero on success.

---

**`Integer Get_elements(Model model, Dynamic_Element &de, Integer &total_no)`** — ID 132

Get all the Elements from the Model and add them to the `Dynamic_Element` array `de`. The total number of Elements is returned in `total_no`.

> **Note:** Whilst this Dynamic_Element exists, all elements with handles in it are locked.

Returns zero on success.

---

#### Model Draw

**`Integer Model_draw(Model model)`** — ID 415

Draw each element in the Model for each view that the model is on, in their own colour. Returns zero on success.

---

**`Integer Model_draw(Model model, Integer col_num)`** — ID 416

Draw each element in the Model in the colour number `col_num` for each view. Returns zero on success.

---

**`Integer Model_draw2(Model model, Integer mode)`** — ID 7763

Do not use. Mode: bit 1024 on = exclusive or, off = replace; bit 1 on = draw all, off = draw normal. Returns zero on success.

---

**`Integer Model_draw2(Model model, Integer col_num, Integer mode)`** — ID 7764

Do not use. As above, with explicit colour. Returns zero on success.

---

#### Duplicate, Rename, Null

**`Integer Model_duplicate(Model model, Text dup_name)`** — ID 428

Create a new Model with the name `dup_name` and add duplicates of all elements in `model` to it. Error if a Model called `dup_name` already exists. Returns zero on success.

---

**`Integer Model_rename(Text original_name, Text new_name)`** — ID 423

Change the name of the Model `original_name` to `new_name`. Returns zero on success.

---

**`Integer Null(Model model)`** — ID 134

Set the Model handle `model` to null. Does not affect the actual 12d Model. Returns zero on success.

---

#### Empty Check, Delete, Clean

**`Integer Model_empty(Model model, Integer &is_empty)`** — ID 7671

Check if the Model is empty. Sets `is_empty` to 1 for empty, 0 for not empty. Returns zero on success.

---

**`Integer Model_delete(Model model)`** — ID 61

Delete from the project and disk the 12d Model pointed to by `model`. The handle is then set to null. Returns zero on success.

---

**`Integer Model_delete(Model model, Integer ignore_shared_out_flag)`** — ID 7887

Delete the model. If the model is shared out and `ignore_shared_out_flag` is zero, the function fails with return value 6. If `ignore_shared_out_flag` is non-zero, model will be deleted even when shared out.

---

**`Integer Delete_models(Text name_match, Integer views_redraw)`** — ID 3919

Delete all models whose names match the wildcard `name_match`. If `views_redraw` is 1, all affected views are redrawn after. **Cannot be undone.** Returns zero on success.

---

**`Integer Delete_all_models()`** — ID 3913

Delete all models from the project and disk. **Cannot be undone.** Returns zero on success.

---

**`Integer Delete_all_empty_models()`** — ID 3916

Delete all empty models from the project and disk. **Cannot be undone.** Returns zero on success.

---

**`Integer Delete_all_empty_models(Integer check_model_attributes)`** — ID 7668

Delete all empty models — additionally requiring no attributes when `check_model_attributes` is non-zero. **Cannot be undone.** Returns zero on success.

---

**`Integer Model_clean(Model model, Integer raster_mode)`** — ID 3836

Clean all elements from an existing Model. If the model or any element in it is locked, returns non-zero. `raster_mode` values:
- `0` — retain all raster elements
- `1` — pop up confirmation for each raster
- `2` — pop up confirmation once (for this macro call)
- `3` — clean all raster elements without confirmation

Returns zero on success.

---

**`Integer Model_clean(Model model, Integer raster_mode, Integer redraw)`** — ID 7958

As above; if `redraw` is non-zero, all views containing the model are redrawn after the clean.

---

### Model Attributes

**`Integer Get_model_attributes(Model model, Attributes &att)`** — ID 2042

Return the Attributes for the Model as `att`. If the Model has no Attributes, returns non-zero.

---

**`Integer Set_model_attributes(Model model, Attributes att)`** — ID 2043

Set the Attributes for the Model to `att`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Text att_name, Text &att)`** — ID 1411

Get the Text model attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Text att_name, Integer &att)`** — ID 1412

Get the Integer model attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Text att_name, Real &att)`** — ID 1413

Get the Real model attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Text att_name, Uid &uid)`** — ID 2044

Get the Uid model attribute with name `att_name`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Text att_name, Attributes &att)`** — ID 2045

Get the Attributes-type model attribute with name `att_name`. More efficient than getting the full Attributes tree first. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Integer att_no, Text &att)`** — ID 1414

Get the Text model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Integer att_no, Integer &att)`** — ID 1415

Get the Integer model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Integer att_no, Real &att)`** — ID 1416

Get the Real model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Integer att_no, Uid &uid)`** — ID 2046

Get the Uid model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_attribute(Model model, Integer att_no, Attributes &att)`** — ID 2047

Get the Attributes-type model attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Text att_name, Text att)`** — ID 1422

Set the Text model attribute with name `att_name`. The attribute must be of type Text. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Text att_name, Integer att)`** — ID 1423

Set the Integer model attribute with name `att_name`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Text att_name, Real att)`** — ID 1424

Set the Real model attribute with name `att_name`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Text att_name, Uid att)`** — ID 2048

For the Model, if the attribute `att_name` does not exist, create it as type Uid; if it exists and is type Uid, set its value. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Text att_name, Attributes att)`** — ID 2049

For the Model, if the attribute `att_name` does not exist, create it as type Attributes; if it exists and is type Attributes, set its value. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Integer att_no, Text att)`** — ID 1425

Set the Text model attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Integer att_no, Integer att)`** — ID 1426

Set the Integer model attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Integer att_no, Real att)`** — ID 1427

Set the Real model attribute at position `att_no`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Integer att_no, Uid uid)`** — ID 2050

If attribute number `att_no` exists and is type Uid, set its value to `uid`. Returns zero on success.

---

**`Integer Set_model_attribute(Model model, Integer att_no, Attributes att)`** — ID 2051

If attribute number `att_no` exists and is type Attributes, set its value to `att`. Returns zero on success.

---

**`Integer Model_attribute_exists(Model model, Text att_name)`** — ID 1403

Checks if a model attribute with name `att_name` exists.
- Non-zero: the attribute **does** exist.
- Zero: no attribute of that name exists.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer Model_attribute_exists(Model model, Text name, Integer &no)`** — ID 1404

Checks if a model attribute with name `name` exists. If found, its position is returned in `no` (for use with other Attribute functions).

---

**`Integer Model_attribute_delete(Model model, Text att_name)`** — ID 1405

Delete the model attribute with name `att_name`. Returns zero on success.

---

**`Integer Model_attribute_delete(Model model, Integer att_no)`** — ID 1406

Delete the model attribute at position `att_no`. Returns zero on success.

---

**`Integer Model_attribute_delete_all(Model model, Element elt)`** — ID 1407

Delete all the model attributes for the Model. (Second argument `elt` is not used.) Returns zero on success.

---

**`Integer Model_attribute_dump(Model model)`** — ID 1408

Write out information about the Model attributes to the Output Window. Returns zero on success.

---

**`Integer Model_attribute_debug(Model model)`** — ID 1409

Write out even more information about the Model attributes to the Output Window. Returns zero on success.

---

**`Integer Get_model_attribute_name(Model model, Integer att_no, Text &name)`** — ID 1417

Get the name for the model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_attribute_type(Model model, Text att_name, Integer &att_type)`** — ID 1418

Get the type of the model attribute with name `att_name`. For attribute type codes, see Data Type Attribute Type. Returns zero on success.

---

**`Integer Get_model_attribute_type(Model model, Integer att_name, Integer &att_type)`** — ID 1419

Get the type of the model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_attribute_length(Model model, Text att_name, Integer &att_len)`** — ID 1420

Get the length of the model attribute with name `att_name`. Useful for attributes of type Text and Binary (Blobs). Returns zero on success.

---

**`Integer Get_model_attribute_length(Model model, Integer att_no, Integer &att_len)`** — ID 1421

Get the length of the model attribute at position `att_no`. Returns zero on success.

---

**`Integer Get_model_number_of_attributes(Model model, Integer &no_atts)`** — ID 1410

Get the total number of model attributes for the Model. Returns zero on success.

---

---

## Views (§5.35)

The variable type `View` is used to refer to 12d Model views. View variables act as handles to the
actual view for easy reference and manipulation within a macro.

---

### View Functions

#### Existence and Access

**`Integer View_exists(Text view_name)`** — ID 373

Checks to see if a view with the name `view_name` exists.
- Non-zero: view **does** exist.
- Zero: no view of that name exists.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer View_exists(View view)`** — ID 374

Checks if the View `view` is valid (not null).
- Non-zero: view is not null.
- Zero: view is null.

> ⚠️ **Warning:** This is the opposite of most 12dPL function return values.

---

**`Integer Get_name(View view, Text &view_name)`** — ID 435

Get the name of the View. Returns zero on success; non-zero if view is null.

---

**`Integer Null(View view)`** — ID 375

Set the View handle `view` to null. Does not affect the actual 12d Model view. Returns zero on success.

---

**`Integer Get_project_views(Dynamic_Text &view_names)`** — ID 234

Get the names of all the views in the project. Returns zero on success.

---

**`View Get_view(Text view_name)`** — ID 347

Get the View with the name `view_name`. Returns its handle if it exists, or a null View if not.

---

**`Integer Find_views(Text name_match, Dynamic_Text &view_names)`** — ID 3948

Find all views with names matching wildcard pattern `name_match`. Returns zero on success.

---

**`Integer Get_last_view(Text &view_name)`** — ID 3480

Set `view_name` to the name of the last active view. Returns zero on success.

---

#### View Type

**`Integer Get_type(View view, Text &type)`** — ID 358

Get the type of the View as a Text value. Values:
- `"Plan"` — plan view
- `"Section"` — section view
- `"Perspective"` — perspective or OpenGL perspective view
- `"Hidden_perspective"` — hidden perspective view

Returns zero on success.

---

**`Integer Get_type(View view, Integer &view_num)`** — ID 357

Get the type of the View as an Integer:
- `2010` — Plan view
- `2011` — Section view
- `2012` — Perspective view / OpenGL
- `2030` — Hidden perspective

Returns zero on success.

---

#### Models on Views

**`Integer Model_get_views(Model model, Dynamic_Text &view_names)`** — ID 354

Get the names of all the views that the Model is on. Returns zero on success.

---

**`Integer View_get_models(View view, Dynamic_Text &model_names)`** — ID 350

Get the names of all the Models on the View. Returns zero on success.

---

**`Integer View_add_model(View view, Model model)`** — ID 348

Add the Model to the View. Returns zero on success.

---

**`Integer View_add_model_at_back(View view, Model model)`** — ID 7960

Add the Model to the back of the View. Returns zero on success.

---

**`Integer View_remove_model(View view, Model model)`** — ID 349

Remove the Model from the View. Returns zero on success.

---

#### View Drawing and Fitting

**`Integer View_redraw(View view)`** — ID 351

Redraw the View. Returns zero on success.

---

**`Integer View_fit(View view)`** — ID 353

Perform a fit on the View. Returns zero on success.

---

**`Integer Calc_extent(View view)`** — ID 477

Calculate the extents of the View. Necessary when Elements have been deleted from a model on a view. Returns zero on success.

---

**`Integer Section_view_profile(View view, Element string, Integer fit_view)`** — ID 2110

Profile the Element `string` on the section View. If `fit_view = 1`, also performs a fit. Returns non-zero if view is not a Section view.

---

**`Integer Section_view_regenerate(View section_view, Integer fit)`** — ID 3528

Regenerate a section view. If `fit` is 1, also performs a fit. Returns zero on success.

---

**`Integer Get_section_profile_string(View section_view, Element &profile_string)`** — ID 3529

Get the string being profiled on a section view. Returns zero on success.

---

#### View Size and Placement

**`Integer View_get_size(View view, Integer &width, Integer &height)`** — ID 352

Find the size in screen pixels of the View. Returns zero on success.

---

**`Integer View_get_draw_area_size(View view, Integer &width, Integer &height)`** — ID 3797

Find the size in screen pixels of the draw area of the View (excluding border, title, menu). Returns zero on success.

---

**`Integer View_set_draw_area_size(View view, Integer width, Integer height)`** — ID 3798

Set the size in screen pixels of the draw area of the View. Returns zero on success.

---

**`Integer View_get_draw_area_size(Integer &width, Integer &height)`** — ID 3774

*(Do not use — use the View overload instead.)* Get the draw area size of the last active view. Returns zero on success.

---

**`Integer View_set_draw_area_size(Integer width, Integer height)`** — ID 3775

*(Do not use — use the View overload instead.)* Set the draw area size of the last active view. Returns zero on success.

---

**`Integer View_get_placement(View v, Integer &left, Integer &top, Integer &right, Integer &bottom, Integer &status)`** — ID 7701

Get the placement of a View. `status`: 0 = normal, 1 = minimized, 2 = maximized. Returns zero on success.

---

#### View Window Management

**`Integer View_maximize(View v)`** — ID 3034

Maximize a View. Returns zero on success.

---

**`Integer View_minimize(View v)`** — ID 3035

Minimize a View. Returns zero on success.

---

**`Integer View_restore(View v)`** — ID 3036

Restore a View (unminimize or unmaximize). Returns zero on success.

---

**`Integer View_restore_normal(View view)`** — ID 3927

Restore a View to normal (unminimize or unmaximize). Returns zero on success.

---

**`Integer View_delete(View v)`** — ID 3443

Delete a View. Returns zero on success.

---

**`Integer View_clone(View v, Text clone_name)`** — ID 3384

Create a clone of an existing View with name `clone_name`. Returns zero on success.

---

**`Integer View_create(Integer type, Text name, Integer left, Integer top, Integer width, Integer height, Integer engine_type)`** — ID 3037

Create a new view. `type` values:
- `0` — Plan
- `1` — Section
- `2` — Perspective
- `3` — Perspective_Hide

`engine_type` values:
- `0` — GDI_Legacy
- `1` — GDI
- `2` — GDI_Threaded
- `3` — OpenGL_Legacy
- `4` — OpenGL
- `5` — OpenGL_Threaded
- `6` — OpenGL_GPU

Returns zero on success.

---

**`Integer View_move_resize(View v, Integer left, Integer top, Integer width, Integer height)`** — ID 3038

Move the View to a new position and set a new size (all in screen pixels). Returns zero on success.

---

**`Integer View_resize(View view, Integer top, Integer left, Integer bottom, Integer right)`** — ID 3924

Move View to position specified by left, top, bottom, right (screen pixels). Values less than zero retain existing values. Returns zero on success.

---

**`Integer View_check_empty(View v, Integer ignore_empty_models, Integer &is_empty)`** — ID 3928

Check if a View is empty:
- `ignore_empty_models = 0`: empty if it contains no model.
- `ignore_empty_models != 0`: empty if it contains no element (or all containing models are empty).

Returns zero on success.

---

**`Integer Tile_all_views(Integer mode)`** — ID 3923

Tile all views. `mode`: `0` = horizontal, `1` = vertical, `2` = cascade. Returns zero on success.

---

#### View Name and Appearance

**`Integer View_set_name(View v, Text name)`** — ID 3041

Set the name of the View. Returns zero on success.

---

**`Integer View_get_background_colour(View v, Integer &colour)`** — ID 3042

Get the background colour of the View. Returns zero on success.

---

**`Integer View_set_background_colour(View v, Integer colour)`** — ID 3043

Set the background colour of the View. Returns zero on success.

---

**`Integer View_get_exaggeration(View view, Real &exaggeration)`** — ID 3926

Get the exaggeration of a section or perspective View. Returns zero on success.

---

**`Integer View_set_exaggeration(View view, Real exaggeration)`** — ID 3925

Set the exaggeration of a section or perspective View. Returns zero on success.

---

**`Integer View_set_engine_type(View v, Integer engine_type)`** — ID 3049

Set the view engine type. Returns zero on success.

---

**`Integer View_get_engine_type(View v, Integer &engine_type)`** — ID 3048

Get the view engine type. Returns zero on success.

---

#### Plan View Specific

**`Integer Plan_view_set_rotation(View v, Real rotation_angle)`** — ID 3040

Set the rotation angle of a plan View. Returns zero on success.

---

**`Integer Plan_view_get_rotation(View v, Real &rotation_angle)`** — ID 3039

Get the rotation angle of a plan View. Returns zero on success.

---

**`Integer Plan_view_set_viewport(View view, Real x_min, Real y_min, Real x_max, Real y_max)`** — ID 7736

Set the viewport of a plan View. Returns zero on success.

---

**`Integer Plan_view_get_viewport(View view, Real &x_min, Real &y_min, Real &x_max, Real &y_max)`** — ID 7740

Get the viewport of a plan View. Returns zero on success.

---

**`Integer Plan_view_set_plot_scale(View v, Real scale)`** — ID 3045

Set the plot scale factor of a plan View. Returns zero on success.

---

**`Integer Plan_view_get_plot_scale(View v, Real &scale)`** — ID 3044

Get the plot scale factor of a plan View. Returns zero on success.

---

#### Section View Specific

**`Integer Section_view_set_viewport(View view, Real ch_min, Real height_min, Real ch_max, Real height_max)`** — ID 7737

Set the viewport of a section View. Returns zero on success.

---

**`Integer Section_view_get_viewport(View view, Real &ch_min, Real &height_min, Real &ch_max, Real &height_max)`** — ID 7741

Get the viewport of a section View. Returns zero on success.

---

#### Perspective View Specific

**`Integer Perspective_view_set_eye_point(View view, Real x, Real y, Real z)`** — ID 7734

Set the eye point of a perspective View. Returns zero on success.

---

**`Integer Perspective_view_get_eye_point(View view, Real &x, Real &y, Real &z)`** — ID 7738

Get the eye point of a perspective View. Returns zero on success.

---

**`Integer Perspective_view_set_target_point(View view, Real x, Real y, Real z)`** — ID 7735

Set the target point of a perspective View. Returns zero on success.

---

**`Integer Perspective_view_get_target_point(View view, Real &x, Real &y, Real &z)`** — ID 7739

Get the target point of a perspective View. Returns zero on success.

---

#### Grid Settings

**`Integer View_get_grid_settings(View v, Integer &draw_mode, Integer &text_x_mode, Integer &text_y_mode, Integer &grid_mode, Real &space_x, Real &space_y, Real &level, Integer &colour, Real &text_height, Real &text_plot_height, Integer &text_clour, Integer &cross_mode, Real &cross_size_pixel, Real &cross_size_mm, Text &text_style, Text &text_prefix_x, Text &text_prefix_y)`** — ID 3046

Get grid settings of a View. Parameters:
- `draw_mode`: 0 = no grid, 1 = last on view, 2 = first on view
- `text_x_mode`: 0 = no text, 1 = bottom, 2 = top, 3 = bottom and top
- `text_y_mode`: 0 = no text, 1 = left, 2 = right, 3 = left and right
- `grid_mode`: 1 = line, 2 = cross, -2 = mark, 3 = mark and cross
- `space_x`, `space_y`: spacing between grid lines
- `level`: level of grid lines
- `colour`, `text_clour`: colours
- `text_height`, `text_plot_height`: grid text heights
- `cross_mode`: 0 = not use, 1 = use; `cross_size_pixel`, `cross_size_mm`
- `text_style`, `text_prefix_x`, `text_prefix_y`

Returns zero on success.

---

**`Integer View_set_grid_settings(View v, Integer draw_mode, Integer text_x_mode, Integer text_y_mode, Integer grid_mode, Real space_x, Real space_y, Real level, Integer colour, Real text_height, Real text_plot_height, Integer text_colour, Integer cross_mode, Real cross_size_pixel, Real cross_size_mm, Text text_style, Text text_prefix_x, Text text_prefix_y)`** — ID 3047

Set grid settings of a View. Parameters same as `View_get_grid_settings`. Returns zero on success.

---

#### View Attributes

**`Integer View_set_attribute(View view, Text attribute_name, Integer value, Integer &internal_return)`** — ID 3066

Set an Integer attribute on the View. `internal_return` is for developer debugging. Returns zero on success.

---

**`Integer View_set_attribute(View view, Text attribute_name, Real value, Integer &internal_return)`** — ID 3067

Set a Real attribute on the View. Returns zero on success.

---

**`Integer View_set_attribute(View view, Text attribute_name, Text value, Integer &internal_return)`** — ID 3068

Set a Text attribute on the View. Returns zero on success.

---

**`Integer View_set_attribute(View view, Text model_name, Text attribute_name, Integer value, Integer &internal_return)`** — ID 3069

Set an Integer attribute on the View within a specific model. Returns zero on success.

---

**`Integer View_set_attribute(View view, Text model_name, Text attribute_name, Real value, Integer &internal_return)`** — ID 3070

Set a Real attribute on the View within a specific model. Returns zero on success.

---

**`Integer View_set_attribute(View view, Text model_name, Text attribute_name, Text value, Integer &internal_return)`** — ID 3071

Set a Text attribute on the View within a specific model. Returns zero on success.

---

**`Integer View_get_attribute(View view, Text attribute_name, Integer &value, Integer &internal_return)`** — ID 3072

Get an Integer attribute from the View. Returns zero on success.

---

**`Integer View_get_attribute(View view, Text attribute_name, Real &value, Integer &internal_return)`** — ID 3073

Get a Real attribute from the View. Returns zero on success.

---

**`Integer View_get_attribute(View view, Text attribute_name, Text &value, Integer &internal_return)`** — ID 3074

Get a Text attribute from the View. Returns zero on success.

---

**`Integer View_get_attribute(View view, Text model_name, Text attribute_name, Integer &value, Integer &internal_return)`** — ID 3075

Get an Integer attribute from the View within a specific model. Returns zero on success.

---

**`Integer View_get_attribute(View view, Text model_name, Text attribute_name, Real &value, Integer &internal_return)`** — ID 3076

Get a Real attribute from the View within a specific model. Returns zero on success.

---

**`Integer View_get_attribute(View view, Text model_name, Text attribute_name, Text &value, Integer &internal_return)`** — ID 3077

Get a Text attribute from the View within a specific model. Returns zero on success.

---

**`Integer View_remove_attribute(View view, Text attribute_name)`** — ID 3078

Remove an attribute from the View. Returns zero on success.

---

**`Integer View_remove_attribute(View view, Text model_name, Text attribute_name)`** — ID 3079

Remove an attribute from the View within a specific model. Returns zero on success.

---

#### View Favourite and Position Files (v12+)

**`Integer View_apply_favourite(View v, Text file_name, Text &return_message)`** — ID 3135

Apply a view favourite file to a View. Returns zero on success.

---

**`Integer View_apply_position(View v, Text file_name, Text &return_message)`** — ID 3136

Apply a view position file to a View. Returns zero on success.

---

**`Integer View_write_favourite_file(View v, Text favourite_name, Integer add_file_extension)`** — ID 3385

Write a view favourite file. If `add_file_extension` is 1, adds the appropriate file extension. Returns zero on success.

---

**`Integer View_write_position_file(View v, Text position_name, Integer add_file_extension)`** — ID 3386

Write a view position file. Returns zero on success.

---

**`Integer View_favourite_file_exists(View v, Text favourite_name, Integer &exists)`** — ID 3387

Check if a view favourite file exists. Sets `exists` to 1 if found, 0 otherwise. Returns zero on success.

---

**`Integer View_position_file_exists(View v, Text position_name, Integer &exists)`** — ID 3388

Check if a view position file exists. Sets `exists` to 1 if found, 0 otherwise. Returns zero on success.

---

> **Developer-only functions** (IDs 3080–3087): `View_remove_draw_data_textstyle`, `View_remove_plot_data_textstyle`, `View_get_draw_data_textstyle_merge`, `View_get_draw_data_textstyle`, `View_get_plot_data_textstyle`, `View_set_draw_data_textstyle`, `View_set_plot_data_textstyle` — intended for 12D developers only.
