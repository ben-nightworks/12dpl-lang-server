---
name: create-macro
description: Create a new 12dPL macro (.4dm) file from a user's description. Produces a complete, compilable macro following documented patterns, conventions, and verified function signatures. Use when the user says "create a macro", "write a macro", "make a panel", or describes macro functionality to build.
argument-hint: "[description of the macro to create, optional target file path, and any required inputs/outputs]"
---

# Create a 12dPL Macro

Create production-quality 12dPL macros that fit this workspace's conventions, compile cleanly with `cc4d.exe`, and follow verified 12d Model patterns.

## When to Use This Skill

Use this skill when the user asks for any of the following:
- A new `.4dm` macro from scratch
- A panel-based workflow macro
- A reporting or export macro
- A geometry, alignment, model, TIN, or trimesh utility
- A macro that creates or updates elements, models, or attributes
- A scaffold that should be immediately compilable and ready to refine

Do not use this skill for:
- Updating docs from an existing macro without writing a new macro; use `learn-macro`
- Tiny edits to an existing macro where a direct file change is simpler

## Workflow

### Step 1: Gather Requirements

Determine the macro's purpose from the user's request. Infer obvious details and ask only when a missing requirement blocks implementation.

Resolve these points:
1. Panel or headless: Does it need a UI panel, or should it run non-interactively?
2. Input data: What does it read: models, elements, TINs, files, or user input?
3. Output data: What does it produce: elements, models, files, reports, or prompts?
4. Processing: What computation or transformation is required?
5. File name: Derive from functionality, add `_panel` for panel macros, and use version suffixes like `_01`.
6. Project folder: New macros go under `Macro_Projects/MacroName/` with a local `includes/` subfolder.

### Step 2: Read the Relevant References First

Before writing code, read the documentation that matches the macro type.

At minimum, check the most relevant files under `docs/`:
- Panel macro: `docs/panel-widgets.md`, `docs/conventions.md`, `docs/reference.md`
- Model or element processing: `docs/elements.md`, `docs/models-views.md`, `docs/super-strings.md`
- Alignment work: `docs/alignment.md`, `docs/math-geometry.md`
- TIN or trimesh work: `docs/tin.md`, `docs/trimesh.md`
- Attribute writing: `docs/attributes.md`
- File or report export: `docs/io-files.md`, `docs/text-functions.md`

Also inspect one or more close examples from `macros examples/` before generating code.

### Step 3: Choose the Right Template

Pick the simplest interaction model that satisfies the request.

#### Template A: Simple Headless Macro
For non-interactive macros that process data and output results.

```text
Macro_Projects/MacroName/MacroName_01.4dm
Macro_Projects/MacroName/includes/MacroName_globals.H   (defines, globals, log_msg)
Macro_Projects/MacroName/includes/MacroName_utils.H     (processing functions)

Main .4dm contains:
  File header comment block
  #include "includes/MacroName_globals.H"
  #include "includes/MacroName_utils.H"
  void main()
  {
      // Open debug log
      // Collect inputs
      // Process data (call functions from .H files)
      // Output results via Print() + Show_console(1)
      // Close debug log
  }
```

#### Template B: Standard Panel Macro
For macros with input widgets, a Process button, and a message area.

```text
Macro_Projects/MacroName/MacroName_panel_01.4dm
Macro_Projects/MacroName/includes/MacroName_globals.H   (defines, globals, log_msg)
Macro_Projects/MacroName/includes/MacroName_utils.H     (helper functions)
Macro_Projects/MacroName/includes/MacroName_process.H   (processing logic)

Main .4dm contains:
  File header comment block
  #include directives
  void main()
  {
      // Open debug log
      // Create panel + widgets
      // Assemble layout with Append()
      // Show_widget(panel)
      // Event loop using Wait_on_events()
      // Validate -> call process function -> report results
      // Close debug log
  }
```

#### Template C: Panel Macro with Source_Box
For macros that need built-in element selection with model, view, or fence sources.

```text
Macro_Projects/MacroName/MacroName_panel_01.4dm
Macro_Projects/MacroName/includes/MacroName_globals.H
Macro_Projects/MacroName/includes/MacroName_utils.H
Macro_Projects/MacroName/includes/MacroName_process.H

Main .4dm contains:
  File header comment block
  #include directives
  void main()
  {
      // Open debug log
      // Create panel + Colour_Message_Box + Source_Box
      // Add output widgets
      // Event loop
      // Validate(src_box, dynamic_elements) -> call process -> report
      // Close debug log
  }
```

#### Template D: Panel Macro with Tabs
For larger workflows that need options split across multiple tabs.

```text
Macro_Projects/MacroName/MacroName_panel_01.4dm
Macro_Projects/MacroName/includes/MacroName_globals.H
Macro_Projects/MacroName/includes/MacroName_utils.H
Macro_Projects/MacroName/includes/MacroName_tab1.H     (tab 1 processing)
Macro_Projects/MacroName/includes/MacroName_tab2.H     (tab 2 processing)

Main .4dm contains:
  File header comment block
  #include directives
  void main()
  {
      // Open debug log
      // Create panel + Tab_Box
      // Build one Vertical_Group per tab
      // Append each tab group to the Tab_Box
      // Event loop — delegate each tab's handler to its .H function
      // Close debug log
  }
```

Do not add a panel unless the macro genuinely benefits from it.

### Step 4: Write a Complete Macro

Produce a working `.4dm` file, not pseudocode or fragments.

Every generated macro should include:
- A standard header comment block
- Required `#define` constants or `#include` lines only when needed
- A `void main()` entry point
- Helper functions where they improve clarity
- Real validation and error handling
- Concrete output behavior

Use this default shape unless the task clearly needs something else:

```c
//---------------------------------------------------------------------
// Programmer           [Name]
// Date                 [DD/MM/YY]
// 12d Model            15
// Version              01
// Macro Name           [Filename without extension]
// Type                 0
//
// Brief description
// [One or two lines describing what the macro does]
//---------------------------------------------------------------------

#include "includes/MacroName_globals.H"
#include "includes/MacroName_utils.H"

void main()
{
#ifdef DEBUG
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    if(temp_dir == "") temp_dir = ".";
    Text log_path = temp_dir + "\\MacroName.log";
    Integer fret = File_open(log_path, "w", "", g_log);
    if(fret == 0)
    {
        g_log_open = 1;
        File_write_line(g_log, "=== " + Get_macro_name() + " ===");
        File_flush(g_log);
    }
#endif

    // ... UI setup / processing ...

#ifdef DEBUG
    if(g_log_open) { File_close(g_log); g_log_open = 0; }
#endif
}
```

### Step 5: Follow Verified 12dPL Patterns

Apply these rules while generating code.

#### Core language rules
- Use verified 12dPL types like `Text`, `Integer`, `Real`, `Element`, `Model`, `Tin`, and `View`
- Use `&` for output or reference parameters
- Use string concatenation with `+`
- Use `+=` for string append and numeric compound assignment
- Never use adjacent string literals like `"a" "b"`
- Use `void main()` as the entry point

#### Output and errors
- Use `Error_prompt()` for errors
- Use `Print()` for Output Window output and add `"\n"` manually
- Call `Show_console(1)` after `Print()` output is complete
- Avoid using `Prompt(Text)` inside a panel event loop as a display message

#### Constants
- Define only the constants you actually use
- Prefer inline `#define` values if a macro depends on constants that may vary across `set_ups.h` copies
- Safe examples include:

```c
#define TRUE  1
#define FALSE 0
#define MODEL_EXISTS 2
#define CHECK_MODEL_MUST_EXIST 7
#define SELECT_STRING 5509
#define Source_Box_All 4095
```

#### Element creation
- Use the standard sequence: create element, set geometry, set name or colour if needed, call `Calc_extent(element)`, then `Set_model(element, model)`
- Recalculate model extents after bulk element creation when appropriate
- `Create_super(flag1, n_vertices)` takes dimension flags, not element type codes. Check the installed dimension constants; use `Create_text` for text elements.

#### Model handling
- Validate input model names before use
- For output models, prefer: if exists then get, else create

#### Panel macros
- Prefer `Model_Box` with `flags=0` and validate in the process handler. `Tin_Box` with `CHECK_TIN_MUST_EXIST` (8) has the same focus trap — use `flags=0` there too and test with `Tin_exists(name) != 0`
- Use `Get_data()` in enable-check logic instead of `Validate()` when focus-stealing is a risk
- Use `Named_Tick_Box` for labelled checkboxes
- For a value that comes off a known list, use a `Choice_Box`: `Set_data(cb, count, choices[])` to populate, `Set_data(cb, default)` to select, `Get_data(cb, &text)` to read. It cannot be made optional, so always seed a default. Prefer it over two typed boxes whenever the value is really a pair that must agree (datum + zone), and over a `Projection_Box` whenever a default has to be visible on open — a `Projection_Box` cannot be pre-filled
- Size a `Colour_Message_Box` with `Set_width_in_chars()`: it otherwise takes its width from the string it was created with, clipping every real message
- Use `Set_enable()` to control Process buttons
- Handle `CodeShutdown` in event loops
- Prefer `Wait_on_events()` with `Integer64` and `Get_id64()` for modern panels

#### Attributes
- For new nested attributes, build the tree from scratch with uninitialised `Attributes` handles, then call `Set_attributes()`
- Do not call `Get_attributes()` on new elements with no attributes
- When updating existing attribute trees, load existing attributes first and preserve sibling groups
- Define source precedence explicitly. Crossing-local measurements can use the nearest vertex, then element defaults; an empty nearest vertex is not a reason to search remote vertices.
- Name normalisation is not alias mapping: explicitly map `PipeDiameter` / `SUI_PipeDia` to `Size` for the utility schema. Resolve local aliases before loading lower-priority defaults.
- Skip blank/whitespace entries and allow populated values to replace `-` / `--` placeholders. Preserve `Unknown`, `Not Applicable` and numeric zero.
- Use typed getters for Integer, Real, Text, Integer64, Uid and Guid. Never convert an identifier through Real; handle blobs only when the output format supports them.
- State units for every derived dimension. Convert known geometry units, not arbitrary attribute text, and do not infer sizes from configuration notes.
- Test every scheduled export key with populated and absent values, plus nested duplicates, placeholders and source-priority conflicts.

### Step 6: Compile or Validate After Writing

After creating or updating the macro:
- Compile it with `cc4d.exe` from the macro's directory; the VS Code tasks set `options.cwd` to `${fileDirname}`. An absolute source path alone did not resolve local headers from the workspace root on this V15 installation.
- Fix compile errors caused by the new code
- Normal V15 mode checks built-in declarations and rejects unknown functions. Do not use `-proto` or `-allow_old_calls` as a workaround for choosing an unsupported API.
- For constant-diameter super pipes use `Get_super_pipe`; normal V15 rejects the obsolete `Get_pipe_diameter`. Drainage getters are for drainage elements only.
- Report compiler checks, source-backed fixture tests, importer tests and live 12d runtime checks separately. A clean compile does not prove native handle or panel behavior.

Save using a conventional name when creating a new file:
- Panel macros: `Macro_Projects/MacroName/MacroName_panel_01.4dm`
- Headless macros: `Macro_Projects/MacroName/MacroName_01.4dm`
- Globals header: `Macro_Projects/MacroName/includes/MacroName_globals.H`
- Utils header: `Macro_Projects/MacroName/includes/MacroName_utils.H`
- Feature headers: `Macro_Projects/MacroName/includes/MacroName_[feature].H`

### File Separation Rules

Keep the main `.4dm` file small — it should contain **only**:
- `#include` directives
- `void main()` with debug log open/close, panel UI creation, layout, and event loop
- Widget validation and dispatch to functions defined in `.H` files

Move **all** of the following to `.H` files:
- `#define` constants and global variable blocks → `_globals.H`
- `log_msg()` and small utility functions → `_utils.H`
- Processing logic, algorithms, and business functions → `_process.H` or `_[feature].H`

## Testing and Logging Requirements

All macros must include testing and logging support:

### Debug Logging

Every macro must have a `DEBUG` flag and log infrastructure:

```c
// In MacroName_globals.H:
#define DEBUG 1    // Comment out for release

{
    File g_log;
    Integer g_log_open = 0;
}
void log_msg(Text msg);   // forward declaration

// In MacroName_utils.H:
void log_msg(Text msg)
{
    if(g_log_open)
    {
        File_write_line(g_log, msg);
        File_flush(g_log);
    }
}
```

In `void main()`, open the log file when `DEBUG` is defined. Use `%TEMP%`
with `TMP` then `.` fallbacks, never the deployed macro's folder:

```c
#ifdef DEBUG
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    if(temp_dir == "") temp_dir = ".";
    Text log_path = temp_dir + "\\MacroName.log";
    Integer fret = File_open(log_path, "w", "", g_log);
    if(fret == 0) { g_log_open = 1; log_msg("=== Log ==="); }
#endif
```

Wrap verbose diagnostics in `#ifdef DEBUG` / `#endif` blocks.

### Quiet-Success Output Window Pattern

When the macro's Output Window summary should be a single line (success / error), keep `log_msg()` file-only so it doesn't leak into the Output Window:

```c
// Quiet log_msg — log file only
void log_msg(Text msg)
{
    if(g_log_open)
    {
        File_write_line(g_log, msg);
        File_flush(g_log);
    }
}
```

Then emit exactly one line at the end of processing:

```c
Print(To_text(count, 0) + " items processed.\n");
Show_console(1);
```

Add `Print(msg + "\n")` to the file-only logger only when progress should be
streamed to the Output Window. Keep its flush behavior in either variant.

### Output Window Reporting

- Call `Clear_console()` at the start of every handler.
- Print a summary of inputs before processing.
- Print a summary of results after processing.
- Call `Show_console(1)` after all `Print()` calls.

### Validation Logging

- In debug mode, log each widget validation result.
- Log error conditions before showing them to the user.
- Log return codes for 12d library calls that can fail.

### Compile Testing

- After creating or modifying a macro, always compile with `cc4d.exe`.
- Fix all errors before considering the task complete.
- Variable shadowing warnings are acceptable but should be minimised.

## Useful Patterns

### Panel assembly order
The `Append()` order determines layout. First appended is the top of the panel.

```c
Panel panel = Create_panel("Title");
Colour_Message_Box message = Create_colour_message_box("Ready");
Vertical_Group vg = Create_vertical_group(0);

Append(message, vg);
Append(vg, panel);
Show_widget(panel);
```

### Event loop pattern

```c
Integer doit = 1;
while(doit)
{
    Integer64 id;
    Text cmd = "", msg = "";
    Wait_on_events(id, cmd, msg);

    if(cmd == "CodeShutdown")
    {
        Set_exit_code("CodeShutdown");
        doit = 0;
        break;
    }
    if(cmd == "keystroke") continue;

    switch(id)
    {
    case Get_id64(panel):
        if(cmd == "Panel Quit") doit = 0;
        break;
    }
}
```

### Model iteration pattern

```c
Dynamic_Element de;
Integer count;
Get_elements(model, de, count);

Integer i;
for(i = 1; i <= count; i++)
{
    Element elt;
    Get_item(de, i, elt);
    // process elt
}
```

### Source_Box pattern

```c
Source_Box src = Create_source_box("to process", message, Source_Box_All);
Dynamic_Element elements;
Null(elements);

if(Validate(src, elements) != TRUE)
{
    Set_data(message, "No source data.", MESSAGE_LEVEL_ERROR);
}
```

### In-app HTML help button pattern

For multi-tab panels with non-trivial workflow, ship a **Help** button alongside Finish that generates a self-contained HTML reference and opens it in the user's default browser. The HTML lives in `%TEMP%`, regenerates on every click, uses HTML entities for special chars (avoid 12dPL multi-byte literal issues), and is shareable. Optionally, embed inline-SVG annotated panel mock-ups with numbered callouts so the reference stays synchronised with the panel layout. Full pattern, helpers (`hwl`, `svg_field`, `svg_button`, `svg_tick`, `svg_choice`, `svg_section`, `svg_open`, `svg_close`), and example: `docs/conventions.md` "HTML Help Generation + Browser Open Pattern" and "Inline SVG Annotated Panel Mock-ups in HTML Help".

```c
case Get_id(help_btn) : { show_help_doc(panel, message); } break;

void show_help_doc(Panel panel, Message_Box msg)
{
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    Text help_path = temp_dir + "\\MyMacro_Help.html";

    if(generate_help_html(help_path) != 0) {
        Set_data(msg, "Could not write help file"); return;
    }
    Shell_execute(panel, "open", help_path, "", "", 1);
}
```

### Corporate user identification pattern

Detect TfNSW / corporate Windows users purely from env vars (no `cmd` / `Create_process` required) — use the result for runtime behaviour only (welcome message in `Message_Box`, log entries, branching). NEVER render User / Domain / verification badges in HTML / report output that the user might share. See `docs/conventions.md` "Corporate / TfNSW User Identification via Getenv".

### About popup panel pattern

Hide the main panel, show a temporary About panel with its own event loop, then restore:

```c
Hide_widget(main_panel);
Panel about = Create_panel("About");
Message_Box about_msg = Create_message_box(PROGRAM_NAME + " v" + PROGRAM_VERSION);
Vertical_Group avg = Create_vertical_group(0);
Append(about_msg, avg);
Button about_ok = Create_button("&OK", "ok");
Append(about_ok, avg);
Append(avg, about);
Show_widget(about);

Integer about_doit = 1;
while(about_doit)
{
    Integer64 aid; Text acmd, amsg;
    Wait_on_events(aid, acmd, amsg);
    if(acmd == "CodeShutdown") { Set_exit_code("CodeShutdown"); about_doit = 0; doit = 0; break; }
    if(aid == Get_id64(about) && acmd == "Panel Quit") about_doit = 0;
    if(aid == Get_id64(about_ok) && acmd == "response") about_doit = 0;
}
Hide_widget(about);
Show_widget(main_panel);
```

### Model clean before re-import pattern

```c
Named_Tick_Box clean_tick = Create_named_tick_box("Clean existing models", 1, "clean");

// In process handler:
Integer do_clean;
Validate(clean_tick, do_clean);
if(do_clean == 1)
{
    Model old_model = Get_model(model_name);
    Integer is_empty;
    Model_empty(old_model, is_empty);
    if(is_empty == 0) Model_delete(old_model);
}
```

### Panel_prompt: Invoke a built-in 12d panel programmatically

Use `Panel_prompt()` to call any built-in 12d panel with pre-filled fields in SLX XML format:

```c
// Non-interactive (auto-run, no UI shown):
Text d = "";
d = d + "<SLX>";
d = d + "<FIELD name=\"Model\">" + model_name + "</FIELD>";
d = d + "<FIELD name=\"File\">" + file_path + "</FIELD>";
d = d + "</SLX>";
Integer ret = Panel_prompt("Panel Title", 0xff00, d);

// Interactive (show panel with pre-filled values):
Integer ret = Panel_prompt("Panel Title", 0xff01, d);
```

Field names must match the panel's SLX field names exactly. Export an `.slx` preset from the 12d panel to discover the correct field names.

### Single-entry undo for in-place edits

Any macro that **modifies existing elements** must register the run on 12d's undo stack, so Ctrl+Z reverses all of it. Three rules: snapshot before editing, detach the snapshot from every model, one snapshot per element.

```c
// per element, before any edit
Element original;
Integer have_original = 0;
if(dry_run == 0)
{
    if(Element_duplicate(elt, original) == 0)
    {
        Model null_model;
        Null(null_model);
        Set_model(original, null_model);     // REQUIRED - outside every model
        have_original = 1;
    }
}

// ... edit elt in place ...

if(changed > 0 && dry_run == 0)
{
    Calc_extent(elt);
    if(have_original == 1)
    {
        Undo u = Add_undo_change(PROGRAM_NAME, original, elt);
        Append(u, undo_list);
        undo_count = undo_count + 1;
    }
}

// once, after the whole run
if(undo_count > 0)
    Add_undo_list(PROGRAM_NAME + " (" + To_text(undo_count) + " strings)", undo_list);
```

Say so in the status line: `"Adjusted 412 vertices on 37 strings. Ctrl+Z to undo."`

### Report-only (dry run) tick

Pair every in-place edit with a dry run that counts and reports exactly as the real run does. Gate only the writes, never the counting:

```c
Named_Tick_Box dry_tick = Create_named_tick_box("Report only - do not modify", 0, "dryrun");
...
if(dry_run == 0)
{
    if(Set_super_vertex_coord(elt, vi, x, y, new_z) != 0) continue;
}
changed = changed + 1;        // counted either way
```

### Type-aware vertex attribute access

The same attribute name arrives as Real on one job and Text on another. Query the type, then use the matching overload — never assume Text:

```c
Integer att_type = 0;
if(Get_super_vertex_attribute_type(elt, vert, name, att_type) != 0) return(ABSENT);

if(att_type == ATT_TYPE_REAL)
{
    Real rv = 0.0;
    if(Get_super_vertex_attribute(elt, vert, name, rv) != 0) return(ABSENT);
    ...
}
else if(att_type == ATT_TYPE_TEXT)
{
    Text tv = "";
    if(Get_super_vertex_attribute(elt, vert, name, tv) != 0) return(ABSENT);
    Real rv = 0.0;
    if(From_text(Text_justify(tv), rv) != 0) return(BAD);   // present but not a number
    ...
}
```

Distinguish **absent** from **bad** and count them separately in the report — they are different problems with different fixes. Before writing a new attribute to a string that has never carried one, call `Set_super_use_vertex_attribute(elt, 1)`.

### Editable grid panel (GridCtrl_Box)

Order is not negotiable: scan the data, build one box per column, create the grid, `Show_widget`, **then** load cells.

```c
Widget cast(Widget w) { return w; }        // REQUIRED - no cast syntax in 12dPL

Integer c;
for(c = 1; c <= n_cols; c = c + 1)
{
    col_boxes[c]    = Create_input_box(col_name[c], msg_box);   // title = heading
    col_widgets[c]  = cast(col_boxes[c]);
    col_readonly[c] = 0;
}

GridCtrl_Box grid = Create_gridctrl_box("Rows", n_rows, n_cols, col_widgets,
                                        col_readonly, 1, msg_box, 900, 480);
Set_warn_on_modified(grid, 0);
Append(grid, group);
Show_widget(panel);
populate_grid(grid);        // ONLY after Show_widget
```

Repopulate from `Delete_all_rows` + `Insert_row` (fresh rows are blank, so only cells with a value need writing). Size columns from the longest text you wrote (`Set_column_width`) — `Format_grid` measures every cell and is far too slow per repopulate. Track unsaved edits with your own flag, set from the keystroke event, because `Set_modified` has no getter:

```c
if(cmd == "keystroke")
{
    if(id == Get_id64(grid)) g_grid_dirty = 1;
    continue;
}
```

Refuse sort/filter/reload while that flag is set, or typing is silently discarded.

### List_Box instead of Tree_Box for a hierarchy

**Do not use `Tree_Box` for a hierarchy the macro must react to** — a page change raises no event the macro can see. Use a `List_Box` with indentation and `>` / `v` folder glyphs (box-drawing characters are multi-byte and come out as garbage), call `Set_selections(lb, 0)` so `Get_selection` works, keep labels unique, and match the selection back **by label text** — whether items number from 0 or 1 is undocumented, so probe it once. Handle the list from its own event and put any fallback poll **last** in the event loop, after every button.

### Log_Box structured results pattern

Use `Log_Box` with `Log_Line` for expandable, structured results with clickable element highlights:

```c
Log_Box log_box = Create_log_box("Results", 80, 10);

// Group line (expandable header)
Log_Line group = Create_group_log_line("Section: " + name, 0);

// Text line (plain info)
Log_Line info = Create_text_log_line("  Detail: " + value, 0);
Append_log_line(info, group);

// Highlight line (click to zoom to element)
Uid model_uid, string_uid;
Get_id(model, model_uid);
Get_id(elt, string_uid);
Log_Line hl = Create_highlight_string_log_line("  " + elt_name, 0, model_uid, string_uid);
Append_log_line(hl, group);

// Add group to log box
Add_log_line(log_box, group);

// Print to Output Window too
Print_log_line(group, 1);
```

Use `Clear(log_box)` before re-populating and `Print_log_line(line, 1)` to echo results to the Output Window.

### Excel ODBC Update Pattern

Use the 64-bit Microsoft Excel ODBC driver to UPDATE an `.xlsm` from 12dPL without shelling out. Check writability first (read-only-file trap) and probe the column names (driver ignores `HDR=NO`):

```c
// 1. Writable check (detects Windows read-only attribute trap)
File f;
if(File_open(xlsm_path, "a", "", f) != 0) { /* file is read-only */ return 1; }
File_close(f);

// 2. Connect
Text cs = "Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ="
    + xlsm_path + ";ReadOnly=0;";
Connection conn = Create_ODBC_connection();
if(Connect(conn, cs) != 0 || Has_error(conn) != 0) { /* abort */ }

// 3. Probe real column-A name (driver names it after A5 text when rows 1-4 blank)
Manual_Query pq = Create_manual_query(
    "SELECT TOP 1 [" + candidate + "] FROM [MetaData$]");
Database_Result pr;
if(Execute(conn, pq, pr) == 0 && Has_error(conn) == 0)
{
    Close(pr);  // candidate IS real column A
}

// 4. UPDATE (always escape single quotes with escape_sql)
Text sql = "UPDATE [MetaData$] SET [F2] = '" + escape_sql(new_val)
    + "' WHERE [" + col_a + "] = '" + escape_sql(label) + "'";
Manual_Query uq = Create_manual_query(sql);
Execute(conn, uq);

Close(conn);
```

### Synergy-Managed / Hash-Tracked External File Idempotence

**Follow this for future macros that write to Synergy-managed or hash-tracked external files.**

When the external file is watched by a system that flags any write (12dSynergy creates a new version on any mtime change; hash-tracking CI; etc.), the macro must:

1. **Cache last-exported values on the project attribute root.** Define an `EXPORT_CACHE_GROUP` sub-group name. On every run, compare current mapped values against the cached ones. If every pair matches, short-circuit BEFORE opening the external file — no ODBC connect, no `File_open`, nothing.

   ```c
   #define EXPORT_CACHE_GROUP "MyMacroLastExport"

   Integer cache_matches(Attributes &root, Text values[])
   {
       Attributes cache;
       if(Get_attribute(root, EXPORT_CACHE_GROUP, cache) != 0) return 0;
       Integer i;
       for(i = 1; i <= NUM_FIELDS; i = i + 1)
       {
           if(g_keys[i] == "" || values[i] == "") continue;
           Text cached = "";
           if(Get_attribute(cache, g_keys[i], cached) != 0) return 0;
           if(Text_justify(cached) != Text_justify(values[i])) return 0;
       }
       return 1;
   }

   void write_cache(Attributes &root, Text values[])
   {
       Attributes cache;
       Get_attribute(root, EXPORT_CACHE_GROUP, cache);          // preserve existing
       Integer i;
       for(i = 1; i <= NUM_FIELDS; i = i + 1)
       {
           if(g_keys[i] == "" || values[i] == "") continue;
           Set_attribute(cache, g_keys[i], values[i]);
       }
       Set_attribute(root, EXPORT_CACHE_GROUP, cache);
       Set_project_attributes(root);
   }

   // In the main handler:
   if(cache_matches(root, values))
   {
       Clear_console();
       Print("Synced. External file already up to date.\n");
       Show_console(1);
       return 0;
   }
   // ... perform the real work, then write_cache(root, values);
   ```

2. **Always compare with `Text_justify` on BOTH sides** of any ODBC-round-tripped value. Excel silently strips leading/trailing whitespace from text cells, so raw `!=` will oscillate every run.

3. **Add `ReadOnly=1`** to Excel connection strings for SELECT-only passes. Partial mitigation only — the driver still rewrites internal zip metadata on close, so content hash and mtime still change even with no UPDATE issued.

4. **Byte-level snapshot+restore is NOT a substitute.** `File_open(path, "rb", "", &f)` + `File_read(f, length, Integer bytes[])` captures the file as Integer bytes; `File_open(path, "wb", "", &f)` + `File_write(f, length, bytes[])` (ID 1718) restores them. This preserves content hash but NOT mtime — `Touch_file_modified_time` (ID 7984) only sets mtime to *now*, and there is NO 12dPL API to set mtime to a specific past value. Therefore snapshot/restore alone does not defeat an mtime tracker.

5. **Summary-clobber enclosing plugin chatter.** When the macro runs inside a host that prints its own status (e.g. the 12dSynergy plugin's "Downloading project attributes..." lines), call `Clear_console()` immediately before the final `Print(...)` so the Output Window ends up with one clean line:

   ```c
   Clear_console();
   Print("Synced. " + To_text(write_count, 0) + " attributes copied.\n");
   Show_console(1);
   ```

## Key Gotchas

1. `Model_Box` with `CHECK_MODEL_MUST_EXIST` can steal focus when empty. Use `flags=0` and validate manually in the process handler.
2. `Validate(Projection_Box, ...)` steals focus. Use `Get_data()` for presence checks and `Validate()` only when the projection data is actually needed.
3. `Print()` writes to the 12d Output Window, not the console. Add `"\n"` and call `Show_console(1)` after all print calls.
4. There is no `Print_error()` function. Use `Error_prompt()` for errors.
5. `Named_Tick_Box` is the labelled checkbox. `Tick_Box` is not a drop-in replacement.
6. `To_text(Integer)` and `To_text(Integer64)` are documented single-argument overloads. Use the native type, especially for identifiers; choose explicit Real formatting for measurements.
7. Attribute handles auto-initialise on first `Set_attribute()`. No `Create_attributes()` call exists.
8. Multi-byte UTF-8 characters in source literals produce garbage at runtime (ANSI compiler). Use `Set_char(text, pos, code)` for special characters: 169=©, 176=°, 178=², 177=±.
9. `Prompt(Text)` inside a panel event loop is an INPUT dialog (user types back). Use `Print()` + `Show_console(1)` or `Error_prompt()` to display info non-interactively.
10. `Model_delete(Model)` deletes a model from the project and disk. Use it before re-importing to avoid duplicate elements.
11. **XML files round-tripped through 12d lose empty leaves.** When emitting an XML file that 12d will read/save (e.g. `.12dmpsf`), write a single space `" "` instead of `""` for any leaf whose content might legitimately be empty. 12d strips empty `<tag></tag>` to `<tag/>` and may then drop the entry entirely on subsequent saves, breaking positional alignment with sibling blocks.
12. **`Find_text(line, "<tag>") > 0` does NOT match self-closing `<tag/>`.** When line-scanning XML for value tags, search with `<tag` (no trailing `>`) so both `<tag>...</tag>` and `<tag/>` are caught. This pattern is still safe vs `</tag_block>` because the close tag starts with `</`.
13. **In a fixed-count XML block, drop surplus entries — do not write them through.** When rewriting a `<user_variables_value>` (or any other count-constrained block) and the input file already has more entries than expected, the rewriter must SKIP the extras, not pass them through. The 12d Multi-Plot Sheet GUI refuses to bind values when `count(values) != count(names)`, even though the plotter may tolerate the mismatch.
14. **Phase-separate read and write when rewriting a file in place.** Slurp the entire file into a `Dynamic_Text`, close it, then re-open the same path for write. Do not try to read and write the same path simultaneously — that truncates the file mid-read.
15. **Write the debug log to `%TEMP%`, never next to the `.4do`.** A macro deployed under a corporate-controlled path (`C:\ProgramData\...`) sits in a folder the user cannot write to, so `File_open` next to the compiled macro fails silently and the log never appears. Read `Getenv("TEMP")`, fall back to `Getenv("TMP")` then `"."`. (`Get_macro_name()` returns the `.4do` path and is still useful for identifying the running macro — just not for siting its log.)
16. **`extract_tag_value` is single-line only.** The standard one-line `extract_tag_value(line, tag, &value)` helper requires both the open and close tag to fit on the same line. For 12d's pretty-printed XML this is almost always the case for leaf elements, but don't try to use it across line boundaries — write a separate state machine for multi-line content.

### Runtime crashes that compile clean

These produce no compile error and no warning — 12d Model dies outright when the line runs. Apply them while generating, not afterwards.

17. **Never use a ternary `?:` inline as an operand of `+`.** It yields a null `Text` and the expression dies with `ACCESS_VIOLATION` reading `0x0`. Assign it to a variable first:
    ```c
    hwl(f, " ]}" + ((is_last) ? "" : ","));   // CRASHES 12d
    Text tail = ",";                          // correct
    if(is_last) tail = "";
    hwl(f, " ]}" + tail);
    ```
    Assigning a ternary to a variable is fine; it is only the inline-in-an-expression form that breaks.
18. **Output parameters are not set on failure, and an untouched `Text` is a null handle, not `""`.** Seed the destination AND check the return code: `Text name = ""; if(Get_name(elt, name) != 0) name = "";`
19. **Seed every slot of a fixed-size `Text` array before passing it to a function.** An unwritten slot is a null handle; a callee that indexes past the written entries reads through a null pointer. Size the array from a `#define` and fill all of it: `for(i = 1; i <= MAX_TINS; i++) tin_names[i] = "";`
20. **`&&` and `||` do not short-circuit.** A left-hand guard does not protect the right-hand side — write the guard as its own statement. Arrays are 1-based, so `while(j >= 1 && arr[j] > key)` reads index 0 and dies with `heap array bounds error - size=N index=0 array_base=1`. The same applies to guarding a call on a handle that may be unset: `if(n >= 2 && Tin_height(tin2, ...))` still calls `Tin_height`, and `Tin_height` on an unset `Tin` is fatal rather than an error return. Guard with `Tin_exists(Tin)` in its own `if`.
21. **Sort an `Integer` index array, never shuffle parallel `Text` arrays.** Swapping `Text` between slots copies string handles and risks a dangling one. Build `g_order[]`, sort that, and read the data through `ord(k)`.
22. **A handle locks what it points at.** 12d locks every element a macro holds an `Element`/`Dynamic_Element` handle to, and a model whose elements are held cannot be cleaned or deleted — `Delete_models` then prints `Model "<name>" is locked hence cannot be deleted!` and leaves it in the project. Never keep `Element`/`Model` handles in globals across events unless the macro writes back to those elements; keep names/flags/indices, look the model up by name when needed, and `Null(h)` every handle on every return path. Release an undo snapshot once `Add_undo_change` has it.
23. **Never change geometry while its model is on a view.** Moving a displayed string with `Set_super_vertex_coord` (or deleting and recreating it) then `View_redraw` draws the new state without erasing the old — a moved marker leaves a trail. Lift the model off the view (`View_remove_model`), rebuild it (`Model_clean` + create), add it back, redraw once.
24. **`Model_exists(Text)` returns non-zero, not `MODEL_EXISTS`.** Test `!= 0`. `MODEL_EXISTS` (2 in V15) is the `Validate(Model_Box)` code; `Model_exists(name) == MODEL_EXISTS` can reject a model that exists.
25. **A macro cannot yield to 12d mid-handler.** `Start_timer` is rejected by `cc4d`; `TDF_wait_for_timer` reportedly returns -1; 12d is *Not Responding* until the handler returns. Hand long jobs to `Create_process(..., Process_Handle &h)` (the type is `Process_Handle`, not `Unknown`) and check `Process_exists(h)` on the user's next press.
26. **A BOM wins on read, and a wrong encoding does not fail the open.** `"ccs=UNICODE"` reads a BOM-less file as UTF-16LE. Read with `"ccs=UTF-8"`; write a rewritten file back with the ccs it was read with; Unicode-mode writes add a BOM.
27. **`Get_data(Input_Box, Text &)` on an empty box leaves the destination untouched.** Reset globals before reading a panel, or read through a seeded local.

### External File and Deployment Gotchas

17. **Excel ODBC `HDR=NO` is silently ignored.** The 64-bit Microsoft Excel ODBC driver always treats the first non-blank row as the column header. If the sheet title sits at A5 with rows 1-4 empty, column A is named after A5's text (varies per file) and column B becomes `F2`. Probe the real column name with `SELECT TOP 1 [candidate] FROM [sheet$]` + `Has_error(conn)` — unknown identifiers raise `"Too few parameters. Expected 1."`.
18. **Excel ODBC UPDATE on a read-only file fails with `"Operation must use an updateable query."`** — the error sounds SQL-related but the real cause is the Windows read-only file attribute (common on 12dSynergy-synced files before check-out). Detect before connecting by attempting `File_open(path, "a", "", &f)`; append mode doesn't truncate and writes no bytes when closed immediately.
19. **12dSynergy project-attribute tree is cached and stale on fresh projects.** `Get_project_attributes(root)` + `Get_attribute(root, "12dSynergy", &sub)` returns only ~14 housekeeping entries until the user performs a check-in → check-out cycle in the Synergy client. Do NOT assume the full TfNSW/job-level attribute set is present on a freshly-opened project. `Save_project` does NOT refresh the cache.
20. **`Panel_prompt` cannot invoke right-click / context-menu actions** — only named top-level panels. If the UI action lives in a right-click menu (e.g. 12dSynergy attribute panel's "Write to file"), `Panel_prompt` cannot reach it.
21. **Pure 12dPL ODBC — no PowerShell on Airlock-controlled machines.** When Airlock (application allowlisting) is active, any `Create_process("powershell.exe", ...)` fails because PowerShell's on-the-fly generated policy-test script cannot be signed. Use the built-in ODBC API (`Create_ODBC_connection`, `Connect`, `Manual_Query`, `Database_Result`) instead of shelling out.
22. **Trimmed-compare rule for Excel-round-tripped text.** Excel silently strips leading/trailing whitespace from text cells. Always compare ODBC-read values against source values with `Text_justify(a) == Text_justify(b)` on BOTH sides. Raw `!=` will oscillate every run (write `"X "`, Excel stores `"X"`, next run sees mismatch, writes again).
23. **No 12dPL API to set mtime backwards.** `Touch_file_modified_time(path)` (ID 7984) sets mtime to *now*. `Get_file_modified_time_utc(path, &time)` (ID 3876) is read-only. There is NO function that takes a target timestamp. This means an "invisibly-write-then-restore" approach cannot defeat an mtime-based change tracker — the only reliable path for idempotence against Synergy / hash-tracked files is to NOT touch the file when no change is needed (see "Synergy-Managed / Hash-Tracked External File Idempotence" above).
24. **Excel ODBC `ReadOnly=1` is only a partial mitigation.** It prevents the driver from taking a write lock (no `~$*.xlsm` file created) but the driver still rewrites internal zip metadata on close, so content hash AND mtime still change even with no UPDATE issued. Sufficient to avoid concurrent-edit conflicts; NOT sufficient to keep Synergy from flagging the file as modified.
25. **`cc4d` per-line string-literal length limit (~600 chars).** Long single string literals fail with the misleading message `"syntax error - giving up"`. The error column points well past anything visibly wrong. Split long HTML / SQL / `Panel_prompt` SLX payloads across multiple `File_write_line` (or `hwl`) calls, or build with `Text x = x + "..."`. HTML / XML output stays identical because adjacent text runs collapse on render.
26. **Generated HTML / report files must not display user identification.** Detection of a corporate / TfNSW user via env-var probing (`USERDNSDOMAIN`, `USERDOMAIN`, `LOGONSERVER`) is fine for *behaviour* (welcome message in panel `Message_Box`, log entries, branching) but do NOT render `User: <name>` / `Domain: <domain>` / verification badges in any HTML opened by `Shell_execute`. Generated documents should be context-free so they can be shared without revealing the running operator.
27. **Logs always go to `%TEMP%`, not next to the `.4do`.** Macros may run from network shares, read-only deploys, or 12dSynergy-managed paths where writing alongside the macro fails silently. Open `g_log` via `Getenv("TEMP")` (fall back to `Getenv("TMP")` then `"."`) and use a stable per-macro filename like `<MacroName>.log`.

## Macro Construction Checklist

- [ ] Created under `Macro_Projects/MacroName/` with local `includes/` folder
- [ ] Main `.4dm` contains only UI setup, event loop, and `#include` directives
- [ ] Processing logic lives in `.H` files
- [ ] Every project `.H` has an include guard (`#ifndef X_H` / `#define X_H` / `#endif`)
- [ ] Deployment noted: 12d runs the `.4do` in its user library, so a fresh build is copied there before a live test
- [ ] No `Element`/`Model` handle kept in a global across events unless the macro writes back to it; every fetched handle `Null()`ed on every return path
- [ ] Has a `void main()` entry point
- [ ] Has `#define DEBUG` flag and `log_msg()` infrastructure
- [ ] Debug log file opens in **`%TEMP%`** (via `Getenv("TEMP")`), never next to the `.4do`, flushed per line with `File_flush()`
- [ ] Deliverables (reports, datasets) are written beside the open 12d project via `Get_project_folder()`, not to `%TEMP%`
- [ ] Every fixed-size `Text` array is fully seeded before being passed to a function
- [ ] Every handler calls `Clear_console()` + prints summary + `Show_console(1)`
- [ ] Uses verified 12dPL function names and types
- [ ] Handles required inputs and validation
- [ ] Uses the correct output mechanism: `Error_prompt`, `Print`, message box, or file output
- [ ] Calls `Calc_extent()` for created elements
- [ ] Assigns created elements to a model when needed
- [ ] Avoids known panel-focus and attribute-handle pitfalls
- [ ] Logs to `%TEMP%` when the macro may be deployed under read-only corporate paths
- [ ] Uses quiet-success `log_msg` (file only) + single-line summary `Print` when the Output Window should stay clean
- [ ] Uses pure 12dPL ODBC (no PowerShell) when the target machine has Airlock / application allowlisting
- [ ] Checks file writability before Excel ODBC UPDATE if the target file may be read-only
- [ ] Probes real Excel column names via `Has_error(conn)` instead of hard-coding (driver ignores `HDR=NO`)
- [ ] Uses `Text_justify` on BOTH sides when comparing ODBC-read values against source values (Excel strips whitespace on store)
- [ ] When writing to a Synergy-managed / hash-or-mtime-tracked external file, uses a project-attribute `EXPORT_CACHE_GROUP` to short-circuit before opening the file when no change is needed (write-then-restore cannot roll back mtime)
- [ ] Adds `;ReadOnly=1;` to Excel connection strings when the pass is SELECT-only (partial mitigation — driver still rewrites internal metadata on close)
- [ ] Clears the console immediately before the final summary `Print` when running inside a chatty host plugin (12dSynergy etc.)
- [ ] Multi-tab panels include a Help button that generates HTML to `%TEMP%` and opens via `Shell_execute(panel, "open", ...)` for shareable user reference
- [ ] Generated HTML / report output is context-free — no User / Domain / corporate-verification badges (env-var detection is fine for runtime behaviour only)
- [ ] Long string literals (HTML / SQL / SLX) are split across multiple `File_write_line` calls to stay under the cc4d ~600-char per-line limit
- [ ] Export keys, semantic aliases, source precedence, placeholder handling and dimension units have focused tests
- [ ] TIN sample success is tracked separately from its level; valid zero is not a failure sentinel
- [ ] Section sampling accounts for starting chainage and exact sample hits; supported axis geometry is validated
- [ ] File write and close failures are checked before export success is reported
- [ ] Compiles cleanly with `cc4d.exe` from the source folder, and untested live-host behavior is disclosed

## Example Requests This Skill Should Handle Well

- "Create a macro that reports the total length of selected strings by model"
- "Build a panel macro that selects a trimesh, creates centroid points, and writes attributes"
- "Create a macro that reads a CSV and places named points into a model"
- "Write a macro to compare two alignments and export chainage offsets"
- "Scaffold a panel macro with input model, output model, projection, and Process button"
