# 12dPL Macro Programming — Copilot Instructions

## Language

This workspace uses **12dPL** (12d Programming Language), a C-like language for writing macros in 12d Model civil engineering software. Source files use the `.4dm` extension. Header/include files use `.H` or `.h`.

## Compiler

- **Path:** `C:\Program Files\12d\12dmodel\15.00\nt.x64\cc4d.exe`
- **Usage:** `cc4d [-p] [-proto] [-list list_file] [-log logfile] [-nocpp] [-nolines] [-allow_id_calls] [-allow_old_calls] [-macro_version xxx] file.4dm`
- **Output:** Produces a `.4do` compiled file alongside the source
- **Exit code 0** = success (no output on success), non-zero = errors printed to stderr/stdout
- **Error format:** `"filepath", line N.C: error: message` (parseable by VS Code problem matcher)

### Compiler flags

| Flag | Purpose |
|------|---------|
| *(none)* | Normal compilation — produces `.4do` output |
| `-p` | Outputs the AST parse tree (debugging) |
| `-proto` | Prototype/stub generation mode; not needed for normal builds |
| `-nocpp` | Skips C preprocessor |
| `-log file` | Writes output to a log file |
| `-allow_old_calls` | Allow deprecated/obsolete function calls |
| `-allow_id_calls` | Allow identifier-style function calls |
| `-macro_version N` | Target a specific macro version |

### How library function resolution works

12d Model supplies the library implementations at runtime, but `cc4d` knows
built-in declarations and checks calls. A negative probe on this V15 install
confirmed that **normal mode rejects unknown functions**, without `-proto`.

- Compile normally; the built-ins need no user-supplied prototypes file.
- `-proto` is a diagnostic/generation mode, not a remedy for an unknown call.
- Obsolete APIs may be rejected in normal mode. `Get_pipe_diameter` is one;
  use `Get_super_pipe` for a constant-diameter Super, not a drainage getter.
- Keep declaration/compile verification separate from live runtime evidence.

### Compiling a macro

```powershell
Push-Location "path\to\macro-folder"
try {
  & "C:\Program Files\12d\12dmodel\15.00\nt.x64\cc4d.exe" "macro.4dm"
}
finally { Pop-Location }
```

This is sufficient for all macros, including those calling 12d library functions.

**Compiling is not deploying.** 12d runs the copy of the `.4do` in its user library (for TfNSW, `C:\ProgramData\TfNSW\15.00\TfNSW_USER_LIB\`); a fresh `.4do` beside the source changes nothing until it is copied there. A stale copy shows up as missing new output (potholeCards README).

**Gotcha — per-line string-literal length limit.** `cc4d` chokes on very long single string literals with the misleading message `"syntax error - giving up"`. Failures begin around 600 characters of source per line — most often hit when emitting long HTML, SQL, or `Panel_prompt` SLX payloads as one big literal. Workaround: split into multiple `File_write_line` (or `hwl`) calls, or build the value with several `Text x = x + "..."` lines. HTML/XML output stays identical because adjacent text runs collapse on render.

### VS Code build task

Press **Ctrl+Shift+B** to compile the current `.4dm` file. The process task
sets `options.cwd` to `${fileDirname}` so relative includes resolve, and
auto-detects absolute/relative diagnostic paths against that folder.

### Compiling with AST output (for debugging)

```powershell
& "C:\Program Files\12d\12dmodel\15.00\nt.x64\cc4d.exe" -p "macro.4dm"
```

### Batch compilation (all examples)

```powershell
$compiler = "C:\Program Files\12d\12dmodel\15.00\nt.x64\cc4d.exe"
Get-ChildItem "macros examples\*.4dm" | ForEach-Object {
  $source = $_
  Push-Location $source.DirectoryName
  try {
    & $compiler $source.Name 2>&1
    if ($LASTEXITCODE -eq 0) { "PASS: $($source.Name)" } else { "FAIL: $($source.Name)" }
  }
  finally { Pop-Location }
}
```

The 2026-09-07 inventory contains 74 example sources (53 top-level, 21
mattmonk) and eight project macros. Record the actual files and flags tested;
the learning review is not a blanket compile or runtime certification.

### Reference: prototypes file

The file `C:\Program Files\12d\12dmodel\15.00\macros\prototypes.4dm` lists all 12d Model built-in library function declarations with their `L_FunctionName` linker symbols. Use it as a **reference** to find correct function signatures — do not pass it to the compiler. Note: it has a known parse error at line 3418 where `Time` conflicts with a reserved keyword in cc4d V15.

The language server's `server/src/resources/functions.enriched.json` and `functions.compiler.json` contain the same prototypes in structured JSON format with descriptions.

## Project Structure

```
MacroProgramming/
├── 12dpl-lang-server/     # Language server v1.2.0, dev branch (VS Code extension)
│   ├── client/            # VS Code extension client
│   ├── server/            # Language server (ANTLR parser, providers, resources)
│   ├── syntax/            # TextMate grammars (12dpl + mtfsnippet)
│   ├── snippets/          # Code snippets (for, if, Panel, Button, etc.)
│   ├── tests/             # Bun test suite (formatter, symbols, prototypes, etc.)
│   └── docs/              # Language server documentation with images
├── Macro_Projects/        # New macro projects — each in its own subfolder
│   └── MyMacro/           # Example project folder
│       ├── MyMacro_panel_01.4dm   # Main macro file
│       └── includes/              # .H files specific to this macro
│           ├── MyMacro_globals.H
│           ├── MyMacro_utils.H
│           └── MyMacro_create.H
├── macros examples/       # 74 reference sources, including mattmonk
├── includes/              # Shared header files (reusable across macros)
│   ├── set_ups.h          # Standard 12d setup defines and helpers
│   └── math_constants.H   # PI, DEG2RAD, tolerances
├── docs/                  # Workspace documentation (all extracted from 12d_progm.pdf)
│   ├── conventions.md          # Coding style guide
│   ├── reference.md            # Language quick-reference
│   ├── language.md             # Language structure: types, operators, flow control, preprocessor
│   ├── functions.md            # Function declarations, overloading, recursion, scopes
│   ├── text-functions.md       # All text functions: To_text, From_text, Get_subtext, etc.
│   ├── math-geometry.md        # Maths, vectors/matrices, geometric types, segment geometry
│   ├── io-files.md             # Output Window, clipboard, file I/O, 12d ASCII read/write
│   ├── dynamic-arrays.md       # Dynamic_Element/Text/Real/Integer/Integer64 functions
│   ├── project-system.md       # System, date/time, colours, folders, project, program paths
│   ├── panel-widgets.md        # All panel/widget types, event loop, Validate, Set_enable, etc.
│   ├── models-views.md         # Models (Get_model, Create_model, iteration) and Views
│   ├── elements.md             # Element type codes, header functions, general element operations
│   ├── tin.md                  # TIN element and Grid TIN functions
│   ├── super-strings.md        # Super String (core data type), Arc/Circle/Text/Pipeline strings
│   ├── alignment.md            # Alignment strings, chainage, HIP points, Drop_point, Get_position
│   ├── drainage.md             # Drainage strings, Feature/Interface/Face string elements
│   ├── drafting.md             # Drafting elements (dimensions, leaders, tables)
│   ├── trimesh.md              # Trimesh element: create, query, triangle functions
│   ├── xml-misc.md             # XML, Map File, Project Settings, Macro Console, valid names
│   ├── utilities.md            # General utilities, macro functions, plot params, undos
│   ├── odbc.md                 # ODBC/database, synergy, highlight, internal macro calls
│   ├── set-ups-appendix.md     # All set_ups.h constants with values and descriptions
│   └── attributes.md           # User-defined attributes API (Section 5.29)
└── .vscode/               # VS Code settings and build tasks
```

### Language server build (Bun)

```powershell
cd 12dpl-lang-server
bun install          # installs root + client + server deps
bun run compile      # tsc -b + copy resources
bun x @vscode/vsce package --allow-missing-repository   # produces .vsix
code --install-extension 12dpl-lang-server-1.2.0.vsix --force
```

## Documentation Files

All documentation is in `docs/`. When answering questions about 12dPL functions, read the relevant file for accurate signatures, parameters, and examples. Use `read_file` on these files to look up functions before generating code.

| File | Content |
|------|---------|
| `docs/attributes.md` | User-defined attributes API — `Set_attribute`, `Get_attribute`, `Set_attributes`, `Attribute_delete`, all IDs, deep navigation pattern |
| `docs/language.md` | Language structure: all variable types, operators, flow control (`if`/`while`/`for`/`switch`/`goto`), preprocessor (`#define`/`#include`/`#ifdef`) |
| `docs/functions.md` | User-defined functions: prototypes, overloading, pass by value/reference, array params, recursion, scope rules |
| `docs/text-functions.md` | All text functions: `To_text`, `From_text` (all overloads), `Text_length`, `Find_text`, `Get_subtext`, `Get_char`, `Set_char`, `Text_upper/lower/justify`, `Numchr` |
| `docs/math-geometry.md` | Maths (`Sin/Cos/Sqrt/Abs/Pow`…), containers (`Integer_Set` etc.), random numbers, `Vector2/3/4`, `Matrix3/4` transforms, triangles, `Point/Line/Arc/Spiral/Parabola/Segment/Curve`, all segment geometry (length, area, intersection, drop point, projection) |
| `docs/io-files.md` | Output Window (`Print/Show_console/Clear_console`), clipboard, `File_open/close/read/write`, 12d ASCII element read/write |
| `docs/dynamic-arrays.md` | `Dynamic_Element/Text/Real/Integer/Integer64` — `Create`, `Append`, `Get_size`, `Get_item`, `Set_item`, `Sort`, `Clear` |
| `docs/project-system.md` | System: `Date()`, `Time()`, `Getenv()`, `Sleep()`, `Create_process()`, UIDs/GUIDs; colours: `Create_rgb/Get_rgb/is_rgb`; project: name, save, attributes; 12d program version/paths; folder/file utilities |
| `docs/panel-widgets.md` | Every widget type: `Panel`, `Button`, `Select_Button`, `Message_Box`, `Colour_Message_Box`, `Input_Box`, `Integer_Box`, `Real_Box`, `Choice_Box`, `Tick_Box`, `Named_Tick_Box`, `Model_Box`, `Tin_Box`, `View_Box`, `File_Box`, `Directory_Box`, `Tab_Box`, `Projection_Box`, `Select_Box`, `XYZ_Box`, `Slider_Box`, `Draw_Box`, `Graph_Box`, `GridCtrl_Box`, `ListCtrl_Box`, `Tree_Box`, `Log_Box`, `HyperLink_Box` — all constructors, `Validate` overloads, `Set_data/Get_data`, `Set_enable`, `Wait_on_widgets/events`, event loop patterns |
| `docs/models-views.md` | Models: `Get_model`, `Create_model`, `Delete_model`, model iteration; Views: `Get_view`, `View_exists`, view inspection |
| `docs/elements.md` | Element type codes table, element header functions (`Get_name`, `Set_colour`, `Get_type`, etc.), general element operations (`Select_string`, `Drop_point`, `Get_position`, `Parallel`, etc.) |
| `docs/tin.md` | TIN element functions (`Tin_exists`, `Get_tin`, `Tin_height`, triangle query); Grid TIN (§5.48) |
| `docs/super-strings.md` | Super String — the core 12d Model data type; `Create_super_string`, `Set_data`/`Get_data` all overloads, vertex functions, Arc/Circle/Text/Pipeline string elements, legacy string types |
| `docs/alignment.md` | Alignment strings: `Get_chainage`, `Get_end_chainage`, `Get_position`, `Drop_point`, HIP functions (`Get_hip_points`, `Get_hip_type`, `Get_hip_geom`), Super/Legacy alignment types |
| `docs/drainage.md` | Drainage string element (pipe networks, manholes, pits), Feature/Interface/Face string elements |
| `docs/drafting.md` | Drafting elements: `DRF_dimension_*`, `DRF_leader_*`, `DRF_table_*`, `DRF_common_*` |
| `docs/trimesh.md` | Trimesh element: `Is_trimesh`, `Trimesh_number_of_triangles`, `Trimesh_get_triangle_points_coords`, create/modify/boolean operations, plot frame element |
| `docs/xml-misc.md` | XML (`XML_Document`, `XML_Node`), Map File, Project Settings, Macro Console, creating valid names |
| `docs/utilities.md` | General utilities, `Quick_sort`, string edits, templates, volumes, macro functions, plot parameters, `Undo`/`Undo_List` |
| `docs/odbc.md` | ODBC database calls (`Connection`, `Select_Query`, `Insert_Query`, etc.), Synergy integration, model/TIN sharing, highlight functions |
| `docs/set-ups-appendix.md` | ALL `set_ups.h` constants with values and descriptions: Model/File/View/Tin modes, widget flags, `CHECK_MODEL_MUST_EXIST`, `SELECT_STRING`, `MESSAGE_LEVEL_*`, `ALL_WIDGETS_OWN_HEIGHT`, etc. |
| `docs/conventions.md` | Coding style guide: patterns, naming conventions, error handling, attribute helper patterns |
| `docs/reference.md` | Quick-reference: verified function signatures, common library calls, key gotchas |

## 12dPL Language Rules

### Types

Core types: `Integer`, `Integer64`, `Real`, `Text`, `void`
Geometric: `Point`, `Line`, `Arc`, `Spiral`, `Parabola`, `Segment`
12d handles: `Element`, `Model`, `Tin`, `View`, `File`
Dynamic arrays: `Dynamic_Element`, `Dynamic_Integer`, `Dynamic_Integer64`, `Dynamic_Real`, `Dynamic_Text`
Math types: `Vector2`, `Vector3`, `Vector4`, `Matrix3`, `Matrix4`
UI Widgets: `Panel`, `Button`, `Input_Box`, `Model_Box`, `Colour_Box`, `Message_Box`, `Colour_Message_Box`, `Vertical_Group`, `Horizontal_Group`, `Source_Box`, `GridCtrl_Box`, `Choice_Box`, `Tick_Box`, `Named_Tick_Box`, `Projection_Box`, `Real_Box`, `Integer_Box`, `Name_Box`, `File_Box`, `Tin_Box`, `View_Box`, `Select_Box`, `Select_Button`, `Attributes_Box`, `Tab_Box`, `Widget_Pages`, `Draw_Box`, `Log_Box`, `Log_Line`, `Screen_Text`, etc.
Database: `Connection`, `Select_Query`, `Insert_Query`, `Update_Query`, `Delete_Query`, `Transaction`
XML: `XML_Document`, `XML_Node`
Other: `Uid`, `Guid`, `Blob`, `Attributes`, `SDR_Attribute`, `Undo`, `Undo_List`, `Screen_Text`, `Textstyle_Data`, `Map_File`, `Plot_Parameter_File`
Maps: `Integer_Integer_Map`, `Text_Text_Map`, etc.

### Entry point

Every executable macro must have: `void main() { ... }`

### Preprocessor

```c
#define NAME value
#define FUNC(x, y) ((x) + (y))
#include "filename.H"
#ifdef NAME / #ifndef NAME / #else / #endif
```

Compile from the macro's folder: on this V15 install an absolute source path
alone did not resolve relative headers from the workspace root. Windows file
lookup remains case-insensitive (`set_ups.H` and `set_ups.h` both work).

### Functions

```c
Integer my_function(Real param1, Text &param2)
{
    // pass by value: param1
    // pass by reference: &param2
    return 0;
}
```

- Return `0` for success, non-zero for errors (convention)
- Use `&` for output/reference parameters
- Array parameters: `Integer arr[]`
- Forward declarations supported: `void bar();` then define later

### Output & User Interaction

| Function | Purpose |
|----------|---------|
| `Prompt(Text msg)` | Display a message to the user |
| `Prompt(Text msg, Text &ret)` | Prompt user for text input |
| `Prompt(Text msg, Integer &ret)` | Prompt user for integer input |
| `Prompt(Text msg, Real &ret)` | Prompt user for real input |
| `Error_prompt(Text msg)` | Display an error message |
| `Model_prompt(Text msg, Text &ret)` | Prompt for model name |
| `Tin_prompt(Text msg, Text &ret)` | Prompt for TIN name |
| `File_prompt(Text msg, Text ext, Text &ret)` | Prompt for file path |

**CRITICAL:** There is NO `Print_error()` function in 12dPL. Use `Prompt()` for messages and `Error_prompt()` for errors. `Print(Text msg)` writes to the 12d Output Window (not console) — add `"\n"` for newlines and call `Show_console(1)` after all Print calls.

**CRITICAL: `Prompt(Text)` in a panel event loop is an INPUT dialog** (user types back). It is NOT a display-only message. To show information non-interactively while a panel is open:
- **Output Window:** `Clear_console(); Print(text + "\n"); Show_console(1);` — panel stays open
- **Modal dialog:** `Error_prompt(text)` — OK-dismiss dialog

### Common Library Functions

These are resolved at runtime by 12d Model (no special compiler flags needed):

- **Model:** `Get_model()`, `Create_model()`, `Delete_model()`, `Delete_models(Text name, Integer redraw)` (delete by name), `Find_models(Text pattern, Dynamic_Text &names)` — wildcard search returns count, `Model_empty(Model, Integer &is_empty)` — check if model has elements, `Get_model_create(Text name)` — get or create
- **Elements:** `Create_string()`, `Set_name()`, `Set_colour()`, `Get_colour()`, `Get_type()`, `Get_points()`, `Element_exists(Element)` — check handle validity
- **Super Strings:** `Create_super_string()`, `Set_data()`, `Get_data()` (preferred over older `Create_2d`/`Create_3d`)
- **3D Points:** `Create_super(7, 1)` creates a point element, `Set_super_vertex_coord(pt, 1, x, y, z)` sets coordinates
- **Super String Dimensions:** `Create_super(flag1, n_verts)` takes dimension flags, NOT element type codes. Use the installed dimension constants; 7, 12 and 21 are bitmasks. `String_Super_Bit(n)` is `1 << Att_n`, so z-per-vertex = 4, radius-per-vertex = 8, major-arc flag = 16: `12` is a 3d string with arcs, `28` adds > 180° arcs (use it to copy geometry with `Get_super_data`/`Set_super_data`). Use `Create_text` for text elements.
- **Arc Super String:** `Set_super_data(el, pt, x, y, z, radius, flag)` — set vertex with arc radius (radius=0 for straight)
- **Geometry:** `Calc_extent()`, `Calc_length()`
- **TIN:** `Tin_exists()`, `Get_tin()`, `Tin_height()`
- **Drainage:** `Get_drainage_pipe_diameter(el, pipe_idx, &diam)`, `Get_drainage_pipe_inverts(el, pipe_idx, &inv_lhs, &inv_rhs)`, `Get_drainage_pipe_thickness(el, pipe_idx, &w_top, &w_bot, &w_left, &w_right)` (1-based pipe segment index)
- **Files:** `File_open()`, `File_close()`, `File_write_line()`
- **Selection:** `Select_string(msg, &elt)` — returns 0 on success; `Select_string(msg, &elt, &x, &y, &z, &ch, &ht)` — extended form returns **1** on success, provides pick coordinates for vertex snapping
- **Alignment:** `Get_chainage()`, `Get_end_chainage()`, `Get_position()`, `Drop_point()`, `Get_hip_points()`, `Get_hip_type()`, `Get_hip_geom()`, `Get_hip_data()`
- **Arc/Circle:** `Get_arc_centre()`, `Get_arc_start()`, `Get_arc_end()`, `Get_circle_data()`
- **View:** `Get_view()`, `View_exists()`, `View_get_models()`, `View_add_model(View, Model)` — add model to view, `View_redraw(View)` — force redraw, `Get_last_view(Text &name)` — get active view name
- **Date/Time:** `Date()`, `Get_time()`, `Convert_time()` — **`Time` is a reserved keyword in cc4d V15; use `Get_time` instead**
- **Math:** `Sin()`, `Cos()`, `Absolute()`, `Sqrt()`, `Quick_sort()`
- **Format:** `To_text(Real val, Text format)`
- **Coordinate Conversion:** `Convert_long_lat(Text proj_data, Integer direction, Integer mode, Real &lon, Real &lat)` — converts easting/northing to WGS84 lon/lat (in-place; pass easting as lon, northing as lat)
- **Output Window:** `Print(Text msg)` writes to 12d Output Window (NOT console); add `"\n"` for newlines; `Show_console(1)` to show the window AFTER all Print calls
- **Panel:** `Create_panel()`, `Create_button()`, `Create_vertical_group()`, `Create_horizontal_group()`, `Create_model_box()`, `Create_input_box()`, `Append()`
- **Panel Invocation:** `Panel_prompt(Text name, Integer interactive, Text data)` — invoke a built-in 12d panel by name with SLX XML data. `0xff00`=non-interactive (auto-run), `0xff01`=interactive (display). Returns 0 on success.
- **Format:** `From_text(Text source, Integer &value)` — parse text to Integer (in addition to Real overload)

### Key Differences from C

- **NEVER use a ternary `?:` inline as an operand of `+`.** Assign it to a
  variable first. Used directly inside a concatenation it yields a null `Text`
  and the expression dies at runtime with `ACCESS_VIOLATION` reading `0x0`
  inside `VCRUNTIME140.dll` — 12d Model crashes outright, and the macro
  compiles clean so there is no warning:
  ```c
  hwl(f, " ]}" + ((is_last) ? "" : ","));   // CRASHES 12d
  ```
  ```c
  Text tail = ",";                          // correct
  if(is_last) tail = "";
  hwl(f, " ]}" + tail);
  ```
  Assigning a ternary to a variable is fine (`Text cmd = (n == 0) ? "M" : "L";`),
  including with `Text`, `Real` and `Integer` results. It is specifically the
  inline-in-an-expression form that breaks.
- **Output parameters are NOT set on failure.** `Get_name`, `Get_type`,
  `Get_model`, `Get_item`, `Date` etc. all return a status code and leave their
  output untouched when they fail. An untouched `Text` is a **null handle, not
  `""`** — the first read of it crashes the same way. Always seed the variable
  AND check the return code:
  ```c
  Text name = "";
  if(Get_name(elt, name) != 0) name = "";
  ```
- **Avoid copying `Text` between array slots.** Sorting parallel arrays by
  shuffling `Text` elements risks dangling handles. Sort an `Integer` index
  array and read through it instead.
- **Seed every slot of a fixed-size `Text` array before passing it.** An
  unwritten slot is a null handle, not `""`, and a function that indexes past
  the written entries reads through a null pointer — `ACCESS_VIOLATION`
  reading `0x0`, with a clean compile:
  ```c
  Text tin_names[MAX_TINS];
  Integer ti;
  for(ti = 1; ti <= MAX_TINS; ti++) tin_names[ti] = "";   // required
  ```
- **`Tin_height` on an unset `Tin` handle is fatal**, not an error return.
  Guard with the handle overload `Tin_exists(Tin)` as its own statement —
  `if(n >= 2 && Tin_height(tin2, ...))` still makes the call, because `&&`
  does not short-circuit.
- **`&&` and `||` do NOT short-circuit.** Both sides are always evaluated, so a
  left-hand guard does not protect the right-hand side. This is a runtime crash,
  not a compile error:
  ```c
  while(j >= 1 && g_array[j] > key)   // reads g_array[0] when j == 0
  //  -> "heap array bounds error - size=500 index=0 array_base=1"
  ```
  Arrays are **1-based** (`array_base=1`), which makes index 0 a hard error.
  Write the guard as its own statement instead:
  ```c
  while(j >= 1)
  {
      if(g_array[j] <= key) break;
      ...
  }
  ```
  The same applies to guarding a call on a handle that may be unset —
  `if(n >= 2 && Tin_height(tin2, ...))` still calls `Tin_height` on `tin2`.
- **A handle locks what it points at.** 12d locks every element a macro holds
  an `Element` (or `Dynamic_Element`) handle to, and a model whose elements
  are held cannot be cleaned or deleted. Keeping them in globals for a session
  ends with this on the command line, and the model left in the project:
  ```
  Model "VAT Highlight" is locked hence cannot be deleted!
  ```
  Keep names, flags or indices in globals instead; look the model or element
  up when it is needed and `Null(h)` every `Element`/`Model` handle on every
  return path. Hold a selection only when the macro will write back to it.
- **`Model_exists(Text)` returns non-zero, not `MODEL_EXISTS`.** Test `!= 0`.
  `MODEL_EXISTS` (2 in the V15 `set_ups.h`) is what `Validate(Model_Box, ...)`
  returns; comparing `Model_exists(name) == MODEL_EXISTS` can reject a model
  that exists — the same trap as `Tin_exists` vs `TIN_EXISTS`. The
  Trimesh_centroid_panel_01.3/01.4 examples only work because they
  `#define MODEL_EXISTS 1` locally — do not copy that define.
- **A macro cannot yield to 12d mid-handler.** There is no timer:
  `Start_timer` is rejected by `cc4d` ("Non implimented function call") and
  `TDF_wait_for_timer` is reported to return -1. 12d shows *Not Responding*
  until the handler returns, so hand long jobs to an external process
  (`Create_process` with a `Process_Handle`) and check `Process_exists` on the
  user's next button press.
- **A BOM wins on read, and a wrong encoding does not fail the open.**
  `File_open(path, "r", "ccs=UNICODE", f)` on a BOM-less file reads it as
  UTF-16LE. Read with `"ccs=UTF-8"`, and write a rewritten file back with the
  ccs it was read with — writing a 12d UTF-16 file back with `""` drops the BOM
  and non-cp1252 characters. Unicode-mode writes add a BOM.
- **`Get_data(Input_Box, Text &)` on an empty box leaves the destination
  untouched**, like any output parameter. Reset globals before reading a
  panel, or read through a seeded local.
- **Never change geometry while its model is on a view.** Moving a displayed
  string with `Set_super_vertex_coord`, or deleting and recreating it, then
  `View_redraw`, draws the new state **without erasing the old one** — a moved
  marker leaves a trail of old crosses. Lift the model off the view
  (`View_remove_model`), edit or rebuild it, add it back, redraw once.
- No pointers — use `&` reference parameters instead
- `Text` type instead of `char*` or `std::string`
- String concatenation with `+` operator
- **NO adjacent string literal concatenation** — `"a" "b"` is a parse error. Always use `+`: `"a" + "b"`
- `goto` and labels are supported and commonly used for error handling
- `+=` compound assignment works on `Text` (string append) and numeric types
- Global variable blocks use bare `{ ... }` syntax at file scope
- Comma-separated declarations: `Real x, y, z;`
- Library function prototypes use a trailing `L_FunctionName` linker symbol
- Arrays: `Integer arr[10];` and `Real data[];` as parameters

### Panel UI Patterns

**Widget creation and layout:**
```c
Panel panel = Create_panel("Title");
Message_Box message = Create_message_box("Ready");
Vertical_Group vg = Create_vertical_group(0);
Set_border(vg, "Section Title");
Append(child_widget, vg);     // add widget to group
Append(vg, panel);            // add group to panel
Show_widget(panel);           // display the panel
```

**Panel append order** determines top-to-bottom visual layout. First `Append` to panel = top of panel.

**Event loop pattern:**
```c
Integer doit = 1;
while(doit) {
    Integer id; Text cmd, msg;
    Wait_on_widgets(id, cmd, msg);
    if(cmd == "CodeShutdown") { Set_exit_code("CodeShutdown"); doit = 0; break; }
    if(cmd == "keystroke") continue;
    switch(id) {
        case Get_id(panel):  if(cmd == "Panel Quit") doit = 0; break;
        case Get_id(button): if(cmd == "response") { /* handle */ } break;
    }
}
```

**For V14+ panels:** Use `Wait_on_events(Integer64 &id, Text &cmd, Text &msg)` with `Get_id64(widget)` instead of `Get_id(widget)` for larger widget sets.

**Key widget constructors:**

| Widget | Constructor | Notes |
|--------|-------------|-------|
| `Model_Box` | `Create_model_box(Text label, Message_Box msg, Integer flags)` | Use `flags=0` to avoid focus-stealing on empty fields; `CHECK_MODEL_MUST_EXIST=7` validates on input. `MODEL_EXISTS` is this box's `Validate` code — `Model_exists(Text)` just returns non-zero |
| `Projection_Box` | `Create_projection_box(Text label, Message_Box msg)` | `Validate(proj_box, &name, &type, &data)` gets projection data; `Get_data(proj_box, &name)` just gets name without stealing focus |
| `Named_Tick_Box` | `Create_named_tick_box(Text title, Integer state, Text response)` | state: 0=unticked, 1=ticked. Read with `Validate(tick, &Integer_result)`. NOT `Tick_Box` — that takes only `Message_Box` |
| `Tick_Box` | `Create_tick_box(Message_Box msg)` | Unnamed tick box. Rarely used — prefer `Named_Tick_Box` |
| `Button` | `Create_button(Text label, Text response)` | `&` prefix for keyboard accelerator: `"&Process"` → Alt+P |
| `Horizontal_Group` | `Create_button_group()` | Convenience for button rows |
| `Colour_Message_Box` | `Create_colour_message_box(Text initial)` | Coloured status messages. Use `Set_data(cmb, msg, level)` with `MESSAGE_LEVEL_GENERAL` (1), `MESSAGE_LEVEL_WARNING` (2), `MESSAGE_LEVEL_ERROR` (3), `MESSAGE_LEVEL_GOOD` (4) |
| `Tab_Box` | `Create_tab_box()` | Modern tabbed interface. Add tabs with `Append(vgroup, "Tab Label", tab_box)` |
| `Vertical_Group` | `Create_vertical_group(Integer mode)` | `mode=0` normal, `-1` hidden, `ALL_WIDGETS_OWN_HEIGHT` (2) for natural heights, `BALANCE_WIDGETS_OVER_HEIGHT` (1) to expand |
| `Select_Button` | `Create_select_button(Text label, Integer type, Message_Box msg)` | `type=SELECT_STRING`. After pick: `Validate(btn, &elt)`, then `Select_start(btn)` to re-arm |
| `Select_Box` | `Create_select_box(Text label, Text prompt, Integer type, Message_Box msg)` | Inline pick widget. Alternative to `Select_Button` |
| `New_Select_Box` | `Create_new_select_box(Text label, Text prompt, Integer type, Message_Box msg)` | Newer inline element selection widget. `Validate(box, &elt)` returns `TRUE`, `NO_NAME` (optional and empty) or 0, and on error messages the user and moves the cursor. For an optional box: `Get_data(box, &text)` for presence, then `Validate(box, &elt, 1)` (silent). |
| `Widget_Pages` | `Create_widget_pages()` | Multi-page container. `Set_page(pages, n)` to switch (1-based). Drive with `Choice_Box` |
| `Source_Box` | `Create_source_box(Text title, Message_Box msg, Integer flags)` | Built-in data selector with element-type filter icons + model/view/fence pickers. Title auto-prefixed with "Data ". `Source_Box_All` (0xFFF) for all icons. `Validate(sb, &Dynamic_Element)` returns filtered elements; its return is `TRUE`, `NO_NAME` (10, positive), -2 or 0 — decide on the element count ("no elements is NOT an error"). |
| `File_Box` | `Create_file_box(Text label, Message_Box msg, Integer mode, Text ext)` | `CHECK_FILE_MUST_EXIST` (1) for input, `CHECK_FILE_CREATE` (14) for output. `Validate(fb, GET_FILE_MUST_EXIST, &name)` (17) or `Validate(fb, GET_FILE_CREATE, &name)` (15) returns `NO_FILE` (4) on success. `Set_data(fb, "default/path")` to preset. |
| `View_Box` | `Create_view_box(Text label, Message_Box msg, Integer flags)` | `CHECK_VIEW_MUST_EXIST`. `Validate(vb, GET_VIEW_ERROR, &view)` returns `VIEW_EXISTS` |
| `Tin_Box` | `Create_tin_box(Text label, Message_Box msg, Integer flags)` | `CHECK_TIN_MUST_EXIST` (8) has the **same focus trap as `Model_Box`** — it refuses focus while the field is empty, so the box cannot be typed into or picked from on panel open. Use `flags=0` and check existence yourself. `Set_optional(tb, 1)` for optional. Test with `Tin_exists(name) != 0` — it returns **non-zero**, NOT `TIN_EXISTS` (11); that code is returned by `Validate()`. Comparing `== TIN_EXISTS` silently rejects every tin, grid tins included. |
| `Choice_Box` | `Create_choice_box(Text label, Message_Box msg)` | Populate with `Set_data(cb, count, choices[])`, select a default with `Set_data(cb, text)`. Read with `Get_data(cb, &text)` — `Validate` returns 1/-1/-2/0 codes, not a status, and steals focus. `Create_choice_box(label, msg, allow_search)` enables search for long lists. The manual lists it among the widgets that **cannot** be made optional, so always seed a default. |
| `Real_Box` | `Create_real_box(Text label, Message_Box msg)` | `Set_optional(rb, 1)` for optional. `Validate(rb, &val)` returns `TRUE` |
| `Colour_Box` | `Create_colour_box(Text label, Message_Box msg)` | `Validate(cb, &colour)` returns integer colour |
| `Menu` | `Create_menu(Text title)` | Pre-panel popup menu. `Create_button(menu, label, response)`, `Display_relative(menu, x, y, &reply)`, `Menu_delete(menu)` |
| `GridCtrl_Box` | `Create_gridctrl_box(Text name, Integer rows, Integer cols, Widget col_widgets[], Integer col_readonly[], Integer show_nav, Message_Box msg, Integer w_px, Integer h_px)` | Editable spreadsheet grid. One box per column; its title is the heading. **Requires a `Widget cast(Widget w) { return w; }` helper** to fill `col_widgets[]` — there is no cast syntax. **Data can only be loaded after `Show_widget()`.** `Set_cell`/`Get_cell`, `Insert_row`, `Delete_all_rows`, `Set_column_width`, `Get_selected_cells`, `Set_warn_on_modified`. `Set_modified` has **no getter** — track your own dirty flag. `Set_cell_back_colour`/`Set_cell_text_colour` compile on V15 but are untested at runtime (the manual marks `Set_cell_colour` "Do not use"). |
| `List_Box` | `Create_list_box(Text title, Message_Box msg, Integer nlines)` | Scrolling text list. `Set_selections(lb, 0)` first — `Get_selection`/`Set_selection` fail on a multi-select list. `Add_item`, `Delete_item` (no clear-all), `Get_item`, `Get_caret`/`Set_caret`. Item numbering base (0 or 1) is undocumented — probe it and match rows by label text. Prefer it over `Tree_Box` for a navigable hierarchy: **a `Tree_Box` page change raises no event the macro can see.** |

**CRITICAL panel gotchas:**

1. **`Model_Box` with `CHECK_MODEL_MUST_EXIST` (7)** rejects focus when the field is empty on panel open, causing focus to skip to the next widget. Use `flags=0` and validate manually in the process handler.

2. **`Validate(Projection_Box, ...)` steals focus** to the projection widget. Never use it in the enable-check loop — use `Get_data(proj_box, &name)` for simple presence checks. Only call `Validate` when you actually need the projection data (e.g., in the process handler).

3. **`Set_enable(widget, 0/1)`** greys out or enables a widget. Useful for disabling Process button until all fields are filled.

4. **`Named_Tick_Box` vs `Tick_Box`:** Always use `Named_Tick_Box` for labelled checkboxes. `Tick_Box` only takes a `Message_Box` parameter and has no label or initial state. Read `Named_Tick_Box` values with `Validate(tick, &result)`, not `Get_data(tick, &Integer)`.

### Attributes System

User-defined attributes can be attached to Elements, Models, and Projects. The `Attributes` type is a tree structure (attributes can contain nested `Attributes` groups).

**How `Attributes` handles work:**

`Set_attribute(Attributes, Text, value)` (IDs 1960-1964) **auto-initialises** the handle on first use. A locally declared `Attributes myvar;` starts as an uninitialised handle, but becomes valid as soon as you call `Set_attribute(myvar, ...)`. No `Create_attributes()` function exists — none is needed.

**CRITICAL: Building attribute trees from scratch (PROVEN WORKING)**

Build the entire tree with uninitialised handles, then attach with `Set_attributes()`:

```c
// ✅ CORRECT — build from scratch, no Get_attributes() needed
Attributes tfnsw;                                    // uninitialised — OK
Attributes root;                                     // uninitialised — OK
Set_attribute(tfnsw, "Latitude",  To_text(lat, 10)); // auto-inits tfnsw
Set_attribute(tfnsw, "Longitude", To_text(lon, 10));
Set_attribute(root, "TfNSW", tfnsw);                 // auto-inits root, nests tfnsw
Set_attributes(pt, root);                             // write to element
```

```c
// ❌ WRONG — Get_attributes() on a NEW element returns a null handle
Attributes root;
Get_attributes(pt, root);   // pt has no attrs yet → root is null/broken
Attributes sub;
Set_attribute(sub, "Field", "value");
Set_attribute(root, "Group", sub);  // silently fails — root is null
Set_attributes(pt, root);           // nothing written
```

**When to use `Get_attributes()`:** ONLY when the element **already has** attributes and you want to **add to or modify** the existing tree. For new elements or elements with no prior attributes, always build from scratch.

**Project-level attributes** use `Set_project_attributes(Attributes root)` instead of `Set_attributes(Element, root)`.

**Two APIs for setting attributes on elements:**
- **Element-level (flat, simplest):** `Set_attribute(Element, Text name, value)` — IDs 572-574, 1978-1979. Creates if not exists. No handle needed.
- **Attributes-level (nested groups):** Build tree from uninitialised handles → `Set_attributes(Element, root)`. Required for hierarchical attribute structures.

**Attribute path syntax:** Use `/` separator: `"GroupName/FieldName"`. Array: `"Name[2]"`.

**Type matters:** Use the correct overload (Text/Real/Integer/Attributes). Mixing types on an existing attribute returns non-zero error. To force a type change: `Attribute_delete(Attributes_handle, name)` then re-create with the desired type.

**CRITICAL: `Set_attribute(Attributes, Text, Attributes)` ID 1964 is a TRUE UPSERT** at handle level — updates if exists, creates if absent, never wipes siblings. Contrast: `Set_attribute(Element, Text, Attributes)` ID 1979 is CREATE-ONLY — no-op if group already exists.

**CRITICAL: `Set_attributes(Element, Attributes)` REPLACES THE ENTIRE TREE.** Before calling it on an element that may already have other groups, always load the existing tree first with `Get_attributes()`. Guard with `Get_number_of_attributes()` before calling `Get_attributes()` — calling `Get_attributes()` on an element with no attrs returns a null handle.

**Deep navigation pattern for updating leaf fields without losing sibling groups:** Navigate down using `Get_attribute(Attributes, name, Attributes &)` (returns 0 if found), update only target leaves, then write modified handles back up the chain with `Set_attribute(Attributes, name, Attributes)`, commit with `Set_attributes(Element, root)`. Handle four cases: A) no attrs yet, B) root exists but target group missing, C) parent group exists but child missing, D) both exist (update in place).

### Panel UI Patterns

The standard `set_ups.h` (from `C:\Program Files\12d\12dmodel\15.00\set_ups\set_ups.h` or local copies) provides:
- Colour conversion: `create_rgb()`, `is_rgb()`, `get_rgb()`
- Constants: `TRUE` (1), `FALSE` (0), `SUCCESS` (usually 0)
- Model/file/view checking: `CHECK_MODEL_MUST_EXIST`, `GET_MODEL`, `CHECK_FILE_MUST_EXIST`, `MODEL_EXISTS`, `VIEW_EXISTS`, `SELECT_STRING`, etc.
- Panel helper functions for common UI patterns
- `NO_COLOUR` for default colour values

**Note:** The version of `set_ups.h` varies. The full install version at `C:\Program Files\12d\12dmodel\15.00\set_ups\set_ups.h` defines `TRUE`, `FALSE`, `SELECT_STRING`, `MODEL_EXISTS`, etc. The workspace copies in `includes/` and `macros examples/` may be subsets. When in doubt, use literal values (`1`, `0`) or check the include file being referenced.

### Examples

Reference macros are in:
- `macros examples/` - 53 top-level sources with panels, geometry and reporting; verify the required version/includes when reusing an example
- `macros examples/mattmonk/` — Professional production macros with command-line support, Tab_Box, Colour_Message_Box, about_panel(), text libraries
- `macros examples/Trimesh_centroid_panel_01.3.4dm` — Production panel example with Model_Box, Projection_Box, Named_Tick_Box, nested TfNSW attributes, coordinate conversion
- `macros examples/Trimesh_centroid_panel_01.4.4dm` - Deep four-case attribute updates, type-safe Real GPS fields and sibling-group preservation
- `Macro_Projects/Leaders/Utility Service Annotator.4dm` - DRF leaders, source selection, vertex-specific labels, placement, styles and diameter weights in local headers
- `Macro_Projects/NSWImport/NSWImport_panel.4dm` - ArcGIS queries, non-blocking process/done-file IPC, geometry, raster/DEM import and local processing headers
- `Macro_Projects/MultiPlot/MultiPlot_panel_01.4dm` - Multi-plot `.12dmpsf` generator and editor: XML rewriting that preserves empty leaves, field counts and surrounding block context; whole-chapter replacement with an id range per writer; plan-frame schema and sheet footprints drawn into a model cleared but kept; warning against construction models on a plotted view; Auto/manual total with a tick-driven enable; overlapping-grid sheet tiling. Its read-UNICODE-first / write-back-ANSI rewrite is exposed to the encoding trap in reference.md File I/O (5 include files)
- `Macro_Projects/SynergyMeta/SynergyMeta_panel_01.4dm` - Typed project-attribute discovery, Excel ODBC probing and no-touch export caching
- `Macro_Projects/FastPlot/FastPlot_panel_01.4dm` — Fast multi-sheet plan plotting: plot frames and `Plot_Parameter_File` driven headlessly (`Create_plot_frame`, `Set_plot_frame_*`, `Set_parameter`, `Plot_parameter_file`), a hidden background engine (`Create_process` + `Process_Handle`) whose completion is checked on the user's next press because a macro cannot yield to 12d, a live progress console tailing a shared append file with a sentinel line, helper PowerShell/C# scripts embedded in the `.4do` by a build script, crash-recoverable temporary project changes (rasters parked in a `hold/<home model>` model, temp-model list written to `%TEMP%` first), `.12dmpsf` viewport parsing (8 include files)
- `Macro_Projects/QLA_FLAG_Trimesh/QLA_FLAG_Trimesh_panel_01.4dm` — Flags utility strings by quality level and hands trimesh creation to a compiled library macro: one-command chain written to `%TEMP%` and run with `Run_chain` (the way to drive a macro panel, which `Panel_prompt` cannot reach), `Source_Box`/`Target_Box` SLX, vertices exploded to points with the seeded `Create_super(1, elt)` and `Set_super_vertex_attributes`, fixed-name working models guarded / gated / kept on failure, `$USER_LIB` kept unexpanded for 12d, include guards on every header (5 include files)
- `Macro_Projects/VertexAttributeTable/VertexAttributeTable_panel_01.4dm` — Spreadsheet editor for per-vertex attributes, and the reference for both grid widgets: `GridCtrl_Box` with per-column boxes + `cast()`, populate-after-Show_widget, column auto-sizing from written text, dirty-flag edit tracking via the `keystroke` event id, `List_Box` as a Tree_Box substitute with a probed index base and label matching, clipboard TSV round-trip with Excel (copy / block paste / single-value fill / fill-down), single-entry undo across many elements with a lazy snapshot (only strings that change, walked in scan order so a sorted grid registers each string once), highlight of the selected string and vertex in two models — lifted off the view before every edit and holding no handles between events, so nothing trails or locks — with `Plan_view_get_plot_scale` sizing and `View_fit` zoom by model swap, native `Quick_sort` index sorting with equal-key runs restored, positional column-lookup hint, blocked text building for large clipboard copies, panel rebuild to change a widget width, 8 include files
- `Macro_Projects/DepthToZ/DepthToZ_panel_01.4dm` — Rewrites vertex Z from a per-vertex attribute: the 12d Undo API (`Add_undo_change` + `Undo_List` + `Add_undo_list`, snapshot detached with `Set_model(copy, null_model)`), type-aware attribute reading (Real/Integer/Text with absent-vs-bad return codes), behavioural super-string test, 2d-string (type 11) refusal, report-only dry run, `Choice_Box` mode table, skip-reason counters, 3 include files
- `Macro_Projects/FromSUI_To_DE/SUI_to_DE_panel.4dm` — Vertex attribute standard upgrade: attribute-name snapshot before delete, archiving attributes into a nested group at both vertex and element level (delete-then-set at vertex level, read-tree/upsert/write-back at element level), prefix sweep, `Dynamic_Element` → variable-length local array, progress reporting by modulo, scan-vs-convert dual mode, 5 include files
- `Macro_Projects/potholeCards/potholeCards_panel_01.4dm` — AS 5488 cross-section dataset writer for a hosted web app: services, surface features classified by TfNSW mapfile code, trimesh pits/chambers cut by the section plane into outline loops (its own triangle cut — `Trimesh_section` gives one polyline), XB trench-bottom excavations (exact segment/plane crossings with a half-open side rule, pairing, clipping, irregular floor), surface points pinned at feature offsets from one ground function, an Info tab saved/loaded as a `name = value` UTF-8 file, optional `New_Select_Box` via `Get_data` + silent `Validate`, Uid-text de-duplication, variable-length records in a flat pool with rollback, plus the earlier `Choice_Box` coordinate picker, ASCII-only JSON, leading-comma emitter, flattened attribute cache, sorted index arrays and clipboard/Explorer hand-off (9 include files)
- `12dpl-lang-server/client/testFixture/` — Additional test fixture `.4dm` files
- `C:\Program Files\12d\12dmodel\15.00\macros\` — 12d Model shipped examples

Key mattmonk library files (reusable includes):
- `Matt_set_ups.H` — Extended constants (MESSAGE_LEVEL_*, group modes, special characters)
- `Matt_standard_library.H` — Helper functions (about_panel, process_messages_for_simple_panel, colour utilities)
- `Matt_text_library.4dm` — Text manipulation helpers (trim, change_text, from_text with delimiters). Included via `#include \"Matt_text_library.H\"` — Windows resolves case-insensitively.

### Verified Function Signatures

Use the manual/prototypes for signatures and record compilation and live
runtime tests separately. Do not infer runtime verification from a clean build.

```c
// 3D Point creation
Element pt = Create_super(7, 1);                        // dimension flags 7, one vertex
Set_super_vertex_coord(pt, 1, x, y, z);                 // set vertex 1 coordinates

// Super string dimension flags, not element type codes
Element line = Create_super(12, n_points);              // existing dimension bitmask
Integer Get_super_pipe(Element super, Real &diameter);  // constant-diameter Super only

// Arc/circle via Set_super_data
Set_super_data(el, pt, x, y, z, radius, flag);          // radius>0 = arc to next vertex

// Element identity via Uid
Uid uid; Get_id(elt, uid); Text uid_txt = To_text(uid);  // for element comparison

// Drainage pipe properties (1-based pipe segment index)
Integer Get_drainage_pipe_diameter(Element el, Integer pipe_idx, Real &diameter);
Integer Get_drainage_pipe_inverts(Element el, Integer pipe_idx, Real &inv_lhs, Real &inv_rhs);
Integer Get_drainage_pipe_thickness(Element el, Integer pipe_idx, Real &w_top, Real &w_bot, Real &w_left, Real &w_right);

// Model management
void Delete_models(Text name_match, Integer views_redraw);  // delete models by name; 0=no redraw
Integer Model_delete(Model model);                          // delete model from project+disk; returns 0 on success
Integer Find_models(Text pattern, Dynamic_Text &names);     // wildcard search e.g. "Leaders/*"; returns count
void Model_empty(Model model, Integer &is_empty);           // 1=empty, 0=has elements
Integer View_add_model(View view, Model model);             // add model to view; returns a status
void View_redraw(View view);                                // force redraw a view
Integer Get_last_view(Text &name);                          // get active view name; 0 on success
Integer Element_exists(Element el);                         // non-zero if handle valid
Tin Get_tin(Text name);                                     // return-value form

// Trimesh inspection
Integer Is_trimesh(Element elt);                        // returns 1 if trimesh
Integer Trimesh_number_of_triangles(Element elt, Integer &n);
Integer Trimesh_get_triangle_points_coords(Element elt, Integer tri_no,
    Integer &p1, Integer &p2, Integer &p3,
    Real &x1, Real &y1, Real &z1,
    Real &x2, Real &y2, Real &z2,
    Real &x3, Real &y3, Real &z3);

// Coordinate conversion (easting/northing → WGS84)
Integer Convert_long_lat(Text proj_data, Integer direction, Integer mode, Real &lon, Real &lat);
// direction=1 for grid→geo, lon receives easting then outputs longitude, lat receives northing then outputs latitude

// Model iteration
Integer Get_elements(Model m, Dynamic_Element &de, Integer &count);
Integer Get_item(Dynamic_Element de, Integer index, Element &elt);  // 1-based index

// Element colour
Integer Get_colour(Element elt, Integer &colour);                   // get element colour

// Alignment / HIP geometry
Integer Get_hip_geom(Element elt, Integer hip, Integer mode, Real &x, Real &y);
// mode: 0=IP coords, 1=TC/TS (start of curve), 2=CT/ST (end of curve), 3=centre, 4=SC, 5=CS
Integer Get_position(Element elt, Real ch, Real &x, Real &y, Real &z, Real &dir);
Integer Drop_point(Element elt, Real x, Real y, Real z, Real &xf, Real &yf, Real &zf, Real &ch, Real &dir, Real &off);
// NOTE: Get_points() on alignments excludes start/end — add 2 for total vertex count

// Element attributes (direct on element — simplest)
Integer Set_attribute(Element elt, Text att_name, Text att);        // ID 572
Integer Set_attribute(Element elt, Text att_name, Integer att);     // ID 573
Integer Set_attribute(Element elt, Text att_name, Real att);        // ID 574
Integer Set_attribute(Element elt, Text att_name, Attributes att);  // ID 1979

// Attributes handle manipulation (for nested groups)
// Handles auto-initialise on first Set_attribute() — no Create_attributes() needed
Integer Set_attributes(Element elt, Attributes root);               // ID 1973 — write tree to element; REPLACES ENTIRE TREE
Integer Set_attribute(Attributes attr, Text name, Text val);        // ID 1960 — creates if not exists, auto-inits handle
Integer Set_attribute(Attributes attr, Text name, Real val);        // ID 1962 — creates/updates Real leaf
Integer Set_attribute(Attributes attr, Text name, Attributes val);  // ID 1964 — TRUE upsert: creates or updates sub-group
Integer Get_attributes(Element elt, Attributes &root);              // ID 1972 — ONLY for elements that already have attrs
Integer Get_number_of_attributes(Element elt, Integer &count);      // always safe; use as guard before Get_attributes()
Integer Get_attribute(Attributes attr, Text name, Attributes &val); // ID 1949 — navigate to sub-group; returns 0 if found
Integer Get_attribute(Attributes attr, Text name, Text &val);       // read Text leaf from handle
Integer Get_attribute(Attributes attr, Text name, Real &val);       // read Real leaf from handle
Integer Get_attribute_type(Attributes attr, Text name, Integer &t); // ID 1956 — check field type; returns 0 if exists
                                                                    // type codes: 1=Int, 2=Real, 3=Text, 5=Attrs
Integer Attribute_delete(Attributes attr, Text name);               // delete named field from Attributes HANDLE (not element)
Integer Attribute_delete(Element elt, Text name);                   // delete named field from element directly
Integer Set_project_attributes(Attributes root);                    // Write attributes to the project

// Named tick box
Named_Tick_Box Create_named_tick_box(Text title, Integer state, Text response);
Integer Validate(Named_Tick_Box box, Integer &result);              // returns tick state

// Element linestyle
Integer Get_style(Element el, Text &style_name);                    // get linestyle name; returns 0 on success
void Set_style(Element el, Text linestyle);                         // set linestyle by name

// Element line weight
void Set_weight(Element el, Real weight);                           // set line weight (thickness); call Calc_extent after
Integer Get_weight(Element el, Real &weight);                       // get line weight; returns 0 on success

// Text elements
Element Create_text(Text txt, Real x, Real y, Real size, Integer colour, Real angle, Integer justif, Integer text_units);
// justif: 5=middle-centre. text_units: 0=pixel, 1=world. Returns text Element.
void Set_text_style(Element el, Text style);                        // e.g. "Arial", "Consolas"
void Set_text_rise(Element el, Real rise);                          // vertical offset for text element

// Special characters at runtime (encoding workaround)
// Multi-byte UTF-8 chars in source literals produce garbage. Use Set_char:
// Text copyright = " "; Set_char(copyright, 1, 169); // ANSI 169 = (c)
// Common codes: 169=(c), 176=deg, 178=^2, 177=+-, 150=en dash, 151=em dash (cp1252)

// Model management (deletion)

// Segment text annotation (per-segment labels on super strings)
Integer Set_super_use_segment_text_array(Element el, Integer use);        // 1=enable per-segment text
Integer Set_super_use_segment_annotation_value(Element el, Integer use);  // 1=show text visually
Integer Set_super_segment_text(Element el, Integer seg, Text text);       // 1-based segment index
Integer Set_super_segment_text_size(Element el, Integer seg, Real size);  // text height
Integer Set_super_segment_text_colour(Element el, Integer seg, Integer colour);

// File I/O (4-param form with encoding)
Integer File_open(Text path, Text mode, Text ccs, File &fp);       // ccs="" for ANSI, "ccs=UNICODE", "ccs=UTF-8"
void File_flush(File fp);                                          // flush buffered writes without closing — call per line in a debug log

// TIN handle validity (guard before Tin_height, which is fatal on an unset handle)
Integer Tin_exists(Tin tin);                                       // non-zero if the handle is valid

// Attributes handle enumeration by 1-based index
Integer Get_attribute_name(Attributes attr, Integer idx, Text &name);   // field name at index
Integer Get_attribute(Attributes attr, Integer idx, Text &val);         // Text leaf by index
Integer Get_attribute(Attributes attr, Integer idx, Real &val);         // Real leaf by index
Integer Get_attribute(Attributes attr, Integer idx, Integer &val);      // Integer leaf by index

// Project paths
Integer Get_project_folder(Text &folder);                          // folder the open project sits in; write deliverables here, not %TEMP%

// Per-vertex attributes (super strings) — 1-based vertex numbers, 0 on success
Integer Get_super_use_vertex_attribute(Element el, Integer &uses);      // non-zero return = NOT a super string (doubles as the type test)
Integer Set_super_use_vertex_attribute(Element el, Integer on);        // required before writing a NEW attribute to a string that has none
Integer Get_super_vertex_number_of_attributes(Element el, Integer vert, Integer &n);
Integer Get_super_vertex_attribute_name(Element el, Integer vert, Integer idx, Text &name);   // snapshot ALL names before deleting any
Integer Get_super_vertex_attribute_type(Element el, Integer vert, Text name, Integer &type);  // 1=Int 2=Real 3=Text 5=Attrs
Integer Get_super_vertex_attributes(Element el, Integer vert, Attributes &att);               // whole vertex group in one call
Integer Super_vertex_attribute_exists(Element el, Integer vert, Text name);                   // non-zero when present
Integer Super_vertex_attribute_delete(Element el, Integer vert, Text name);
Integer Get_super_vertex_attribute(Element el, Integer vert, Text name, Text &v);             // + Real/Integer/Integer64/Uid/Guid/Attributes overloads
Integer Set_super_vertex_attribute(Element el, Integer vert, Text name, Text v);              // + Real/Integer/Attributes overloads
// GOTCHA: the Attributes overload of Set_super_vertex_attribute does NOT reliably upsert —
//         Super_vertex_attribute_delete the old group entry first, then set.

// Undo — register in-place edits on 12d's own stack (Ctrl+Z)
Undo Add_undo_change(Text name, Element original, Element modified);
void Append(Undo u, Undo_List &list);
void Add_undo_list(Text name, Undo_List list);   // ONE entry for the whole run
// CRITICAL: the `original` must be a duplicate that sits OUTSIDE every model:
//   Element_duplicate(elt, original); Model nm; Null(nm); Set_model(original, nm);
// Snapshot once per element, not per edit, and only for elements that change
// (just before the first write). A sorted grid is not grouped by element: walk
// its visible rows in scan order. Null() the snapshot once it is registered.
// Call Calc_extent(elt) after editing.

// View framing and inspection
void View_remove_model(View v, Model m);            // resets that model's per-view settings
void View_fit(View v);                              // the ONLY framing call; fits EVERYTHING on the view
void Calc_extent(View v);                           // also Calc_extent(Model)
Integer Plan_view_get_plot_scale(View v, Real &scale);   // plan views only; use scale/200 for ~5mm on the plot
Integer Model_exists(Model m);                      // handle overload
// Highlight_* (Highlight_create/_add_string/_add_point/_draw/...) COMPILE on V15
// but the manual calls them "under development" and they are untested here; no
// View_zoom / View_set_centre / Plan_view_set_window exists at all. Draw into a
// dedicated model added to the view instead (conventions.md, "Marker-in-a-Model").
Integer Model_clean(Model m, Integer raster_mode);  // empty a model, keep it; non-zero if locked
void Null(Element &e);                              // release a handle - it holds a lock
Integer Get_widget_position(Widget w, Integer &x, Integer &y);
Integer Show_widget(Widget w, Integer x, Integer y); // re-show a rebuilt panel in place
Integer Quick_sort(Integer n, Integer index[], Text keys[]);   // + Real/Integer; ascending index; ties unordered
Element Create_super(Integer num_pts, Element seed);  // SEEDED: arg 1 is the VERTEX COUNT here
Integer Set_super_vertex_attributes(Element el, Integer vert, Attributes att);  // whole group; use_vertex_attribute on first
Integer Validate(New_Select_Box box, Element &elt, Integer silent);  // silent=1: no message / cursor move
Integer Run_chain(Text chain_file);                     // 0 = ran; drives a compiled macro's panel
Text Get_absolute_path(Text path);                      // expands $USER_LIB/ (compiles; untested live)
Integer Element_delete(Element elt, Integer redraw);    // redraw != 0 repaints the views it was on
Integer Get_time(Integer &h, Integer &m, Real &sec);    // sub-second timing
Integer Trimesh_closed(Element elt, Integer &is_closed);
Integer Get_trimesh_centroid(Element elt, Real &cx, Real &cy, Real &cz);
Element Create_plot_frame(Text name);                   // + Set_plot_frame_sheet_size/_margins(l,b,r,t)/_scale/_plotter_name
Integer Plot_parameter_file(Plot_Parameter_File ppf);   // after Create_plot_frame_plot_parameter_file + Set_parameter(...)

// Clipboard
Integer Get_clipboard_text(Text &text);             // 0 on success

// Dynamic_Integer operations
void Append(Integer val, Dynamic_Integer &di);                      // add to dynamic integer array
Integer Get_item(Dynamic_Integer di, Integer index, Integer &val);  // 1-based

// Dynamic_Real operations
void Append(Real val, Dynamic_Real &dr);                            // add to dynamic real array
Integer Get_number_of_items(Dynamic_Real dr, Integer &count);
Integer Get_item(Dynamic_Real dr, Integer index, Real &val);        // 1-based
void Null(Dynamic_Real &dr);                                        // clear/release

// Per-vertex attributes
Integer Get_super_vertex_attribute(Element el, Integer vertex, Text att_name, Text &value);  // 0 on success

// DRF Leader functions (drafting elements)
Integer DRF_leader_create(Text style, Text text, Real ax, Real ay, Real hx, Real hy, Model &model, Element &out);
Integer DRF_get_leader_hook(Element leader, Real &hx, Real &hy);    // also used to detect leaders (0=leader)
Integer DRF_get_leader_arrow(Element leader, Real &ax, Real &ay);
Integer DRF_get_leader_text(Element leader, Text &text);
Integer DRF_leader_edit_move_hook(Real hx, Real hy, Element &leader, Integer move_mode);  // mode 0=absolute, 1=relative
Integer DRF_get_leader_styles(Dynamic_Text &styles);                // all project leader styles
Integer DRF_drafting_edit_set_style(Text style_name, Element &draft);  // change style of existing drafting element
Integer DRF_set_override_value(Element &drf, Text name, Real value);   // set Real override
Integer DRF_set_override_value(Element &drf, Text name, Integer value); // set Integer override
Integer DRF_get_override_value(Element drf, Text name, Real &value);
Integer DRF_get_override_value(Element drf, Text name, Integer &value);
Integer DRF_recalc(Element &draft);                                 // MUST call after setting overrides
// Leader override field names: "text_size"(Real), "arrow_size"(Real), "hook_length"(Real),
//   "colour"(Int), "arrow_colour"(Int), "text_colour"(Int)

// Output Window
void Print(Text msg);                                               // add "\n" manually
void Print();                                                       // blank line (no-arg)
void Show_console(Integer show);                                    // 1=show, call AFTER Print calls
void Clear_console();                                               // clear output window

// External Processes
Integer System(Text msg);                                            // OS system call; returns 0 on success
Integer Shell_execute(Widget widget, Text operation, Text file,      // Win32 ShellExecute wrapper
    Text parameters, Text directory, Integer showcmd);               // widget=shown Panel, operation="open", showcmd=1
Integer Create_process(Text program, Text cmdline, Text start_dir,   // Win32 CreateProcess; wait=1 blocks
    Integer flags, Integer wait, Integer inherit);                   // flags: 0=default, 16=CREATE_NEW_CONSOLE, 134217728=CREATE_NO_WINDOW; returns 0 on success
Integer Create_process(Text program, Text cmdline, Text start_dir,   // non-blocking form with handle
    Integer flags, Integer inherit, Process_Handle &handle);         // NOT "Unknown" (cc4d rejects it)
Integer Process_exists(Process_Handle handle);                       // non-zero = still running (opposite convention!)

// Environment & Command Line
Text Getenv(Text name);                                             // e.g. Getenv("LIB_4D")
Integer Get_number_of_command_arguments();                          // count of args to macro
Integer Get_command_argument(Integer index, Text &arg);             // 1-based, returns 0 on success
Text Get_macro_name();                                              // full path to running .4do
void Set_exit_code(Text code);                                      // e.g. "CodeShutdown"

// Text Manipulation
Integer Text_length(Text t);                                        // character count
Integer Find_text(Text source, Text target);                        // returns position or 0
Text Get_subtext(Text source, Integer start, Integer end);          // 1-based, end=9999 for "to end"
Text Text_lower(Text t);                                            // to lowercase
Text Text_upper(Text t);                                            // to uppercase
Text Text_justify(Text t);                                          // trim whitespace
Integer Get_char(Text t, Integer pos, Integer &code);               // get ASCII code at position
Integer Set_char(Text t, Integer pos, Integer code);                // set character by ASCII

// Format parsing
Integer From_text(Text source, Integer &value);                     // parse text to integer; returns 0 on success
Integer From_text(Text source, Real &value);                        // parse text to real; returns 0 on success

// Built-in Panel Invocation
Integer Panel_prompt(Text name, Integer interactive, Text data);     // invoke built-in 12d panel by name
    // name = exact panel title e.g. "Create Raster Element"
    // interactive: 0xff00 = non-interactive (auto-run), 0xff01 = interactive (display)
    // data = SLX XML string with field values
    // returns 0 on success
```

### Code Style

- 4-space indentation
- Snake_case for variables: `model_name`, `string_colour`
- PascalCase for 12d library calls: `Get_model`, `Set_colour`
- File header comment block with programmer, date, version, description
- UPPER_CASE for `#define` constants
- Opening braces on same line or next line (be consistent within a file)

## Macro Project Structure

All **new macros** are created under `Macro_Projects/` in a dedicated subfolder:

```
Macro_Projects/
└── MacroName/
    ├── MacroName_panel_01.4dm       # Main macro (or MacroName_01.4dm for headless)
    └── includes/                    # .H files specific to this macro
        ├── MacroName_globals.H      # Defines, globals, forward declarations
        ├── MacroName_utils.H        # Utility/helper functions
        └── MacroName_[feature].H    # Feature-specific logic (create, style, etc.)
```

### Rules

- **One folder per macro** — the folder name matches the macro base name.
- **Local includes/** — each macro has its own `includes/` subfolder for `.H` files. Keep the main `.4dm` file small: only UI setup and event routing. All processing logic, helpers, and business functions go in `.H` files.
- **Shared includes** — reusable headers that are NOT macro-specific stay in the workspace-root `includes/` folder (e.g., `set_ups.h`, `math_constants.H`).
- **Include paths** use relative paths from the `.4dm` file: `#include "includes/MacroName_utils.H"`.
- **Existing macros** in the workspace root and `macros examples/` stay where they are (legacy).

### Testing and Logging Requirements

All macros (panel and headless) must include:

1. **Debug logging via `#define DEBUG`:**
   - Define a `DEBUG` flag in the globals `.H` file (comment out for release).
   - Use a global `File g_log` handle and `Integer g_log_open` flag.
  - Default `log_msg(Text msg)` to file-only, flushed per line with `File_flush`. Mirror to `Print(msg + "\n")` only when verbose progress is intended.
   - Open the log file in `main()` when `DEBUG` is defined.
   - **Always write the log to the user's TEMP folder, never next to the `.4do`.** Read `Getenv("TEMP")` (fall back to `Getenv("TMP")` then `"."`). Pattern:
     ```c
     Text temp_dir = Getenv("TEMP");
     if(temp_dir == "") temp_dir = Getenv("TMP");
     if(temp_dir == "") temp_dir = ".";
     Text log_path = temp_dir + "\\<MacroName>.log";
     ```
   - Wrap verbose diagnostic output in `#ifdef DEBUG` / `#endif` blocks.

5. **Generated help / report HTML must not display user identification.**
   - Detection of corporate / TfNSW user via env vars is fine for behaviour (welcome message in panel, log entries), but do NOT render `User: <name>` / `Domain: <domain>` / verification badges in any HTML or report opened by `Shell_execute`.
   - The HTML should be context-free so it can be shared without revealing the running operator.

2. **Output Window reporting:**
   - Every handler must call `Clear_console()` at the start.
   - Print a summary of inputs before processing.
   - Print a summary of results after processing.
   - Call `Show_console(1)` after all `Print()` calls.

3. **Validation logging:**
   - Log each widget validation result in debug mode.
   - Log error conditions before showing them to the user.
   - Log function return codes for 12d library calls that can fail.

4. **Batch compile testing:**
   - After creating or modifying a macro, always compile with `cc4d.exe`.
   - Fix all errors before considering the task complete.
   - Warnings about variable shadowing are acceptable but should be minimised.

## XML Rewriting Gotchas (apply when emitting or editing 12d XML files like `.12dmpsf`)

These are non-obvious failures that have shipped real bugs. Full code samples in `docs/conventions.md` (sections "Manual Line-Based XML Rewriter Pattern", "Self-Closing XML Tag Gotcha", etc.).

1. **12d strips empty leaves on save.** Round-tripping a file through 12d converts `<tag></tag>` to `<tag/>`, and on subsequent saves may drop the entry from the block entirely. Defence: when emitting a leaf whose value might be empty, write a single space `" "` instead of `""`. 12d treats `" "` as non-empty and preserves it.

2. **`<tag/>` self-closing form does NOT match `Find_text(line, "<tag>")`.** A line-based scanner that looks for `<tag>` (with the trailing `>`) silently skips self-closing entries. Always search with `<tag` (no trailing `>`) — that pattern hits both `<tag>...</tag>` and `<tag/>` while still NOT matching `</tag_block>` (which starts with `</`).

3. **Drop, don't write through, surplus entries.** When a block is supposed to contain exactly N entries but a previous broken write left N+5, the rewriter must DROP the extras, not pass them through. The 12d Multi-Plot Sheet GUI refuses to bind values to UI fields when `count(<user_variables_value>) != count(<user_variables_name>)`. Plotters often tolerate the mismatch (they iterate by `<user_variables_set>` index), so a corrupt file may PDF correctly while showing all GUI fields blank.

4. **Per-block context tracking only outside the target block.** When slot N in block B should inherit a value from block A earlier in the file (e.g. user-variable slot 17 should hold the surrounding `<plan_frame>`'s `<scale>`), gate the tracking-state updates with `if(in_target_block == 0)` so the target block's own unrelated `<scale>1000</scale>` field doesn't overwrite the captured value.

5. **Phase-separate read and write.** Slurp the whole file into a `Dynamic_Text`, close, then re-open the same path for write. Trying to read and write simultaneously truncates the file mid-read.

## Copilot Skills

### Export and Attribute Review Rules

- Normalised spelling is not semantic aliasing. A utility `Size` lookup must
  explicitly include DE `PipeDiameter` and legacy `SUI_PipeDia` where applicable.
- Document field precedence. Crossing-local exports use the nearest vertex
  first, then element defaults; resolve vertex aliases before loading defaults.
- Empty/whitespace, `-` and `--` permit populated fallbacks. Preserve meaningful
  `Unknown`, `Not Applicable` and numeric zero. Do not guess dimensions from notes.
- Add new fields to the fixed JSON schedule, including empty output when absent.
  Read scalar types with the correct overload; keep Integer64/Uid/Guid as Text.
- Check TIN sample validity separately from its numeric level; RL zero can be valid.
  Guard TIN handles before height queries and account for non-zero start chainage.
- A utility string's Z is the obvert (top of pipe); invert = Z - diameter. Only `Drainage` states inverts. Do not write `invertLevel` when a Depth can be stated - the app trusts a stated level.
- Check write and close results before reporting export success. Tests using
  stubbed host APIs are not live 12d verification.
- Excel ODBC ignores `HDR=NO`: probe actual column names, use `[Sheet$]`, escape
  SQL quotes, and check `Has_error` after operations. Read-only managed files
  need checkout before UPDATE; an append-open check can detect unwritability.
- For tracked external files, compare current values to a project-attribute
  export cache before opening the file. Trim both sides of Excel comparisons.
  `ReadOnly=1` and byte restoration do not guarantee an unchanged mtime.
- `Panel_prompt` invokes named panels, not context-menu actions. Non-blocking
  process/done-file workflows need explicit completion and error handling.
- Generated reports must not expose Windows user/domain detection. Explicit
  surveyor/locator business attributes are separate from the running operator.
- Keep this file, `.github/copilot-instructions.md`, and relevant skills under
  both `.github/skills/` and `.claude/skills/` consistent without discarding
  their other local content.

Custom skills live under `.github/skills/`.

- `learn-macro` — analyze an existing `.4dm` macro and update workspace docs with newly verified knowledge
- `create-macro` — create a new 12dPL macro or scaffold a substantial new macro feature using workspace conventions, docs, and example macros
