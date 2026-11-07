/**
 * Macro project scaffolding — the create-macro templates from the macro
 * knowledge base, as compilable starting points:
 *
 *   <Name>/<Name>_01.4dm or <Name>_panel_01.4dm   UI setup and event loop only
 *   <Name>/includes/<Name>_globals.H              defines, globals, forward declarations
 *   <Name>/includes/<Name>_utils.H                debug log helpers (log goes to %TEMP%)
 *   <Name>/includes/<Name>_process.H              processing logic
 *
 * The set_ups.h constants the templates use are defined in the globals
 * header, because cc4d does not find set_ups.h on its own.
 */

import * as fs from 'fs';
import * as path from 'path';

export const MACRO_KINDS = ['headless', 'panel', 'source_box', 'tabs'] as const;
export type MacroKind = typeof MACRO_KINDS[number];

export interface ScaffoldOptions {
	name: string;
	kind: MacroKind;
	description?: string | undefined;
	programmer?: string | undefined;
	date?: Date | undefined;
}

export interface ScaffoldFile {
	/** Relative to the folder the project is created in. */
	path: string;
	content: string;
}

export interface Scaffold {
	mainFile: string;
	files: ScaffoldFile[];
}

const KIND_DESCRIPTIONS: Record<MacroKind, string> = {
	headless: 'Prompts for a model and processes its elements.',
	panel: 'Panel with a model box and a Process button.',
	source_box: 'Panel that processes elements chosen with a Source_Box.',
	tabs: 'Tabbed panel with input and option pages.',
};

function formatDate(date: Date): string {
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${pad(date.getFullYear() % 100)}`;
}

function header(o: { file: string; programmer: string; date: string; description: string }): string {
	return `//---------------------------------------------------------------------
// Programmer           ${o.programmer}
// Date                 ${o.date}
// 12d Model            15
// Version              01
// Macro Name           ${o.file}
// Type                 0
//
// Brief description
// ${o.description}
//---------------------------------------------------------------------
`;
}

function globalsHeader(name: string, kind: MacroKind, forwardDeclarations: string[]): string {
	const guard = `${name.toUpperCase()}_GLOBALS_H`;
	const constants: Array<[string, string]> = [['TRUE', '1'], ['FALSE', '0']];
	if (kind !== 'headless') {
		constants.push(
			['MESSAGE_LEVEL_GENERAL', '1'],
			['MESSAGE_LEVEL_WARNING', '2'],
			['MESSAGE_LEVEL_ERROR', '3'],
			['MESSAGE_LEVEL_GOOD', '4'],
		);
	}
	if (kind === 'source_box') {
		constants.push(['Source_Box_All', '0xfff']);
	}
	const defines = constants.map(([k, v]) => `#ifndef ${k}\n#define ${k} ${v}\n#endif`).join('\n');

	return `// ${name}_globals.H
// Defines, global variables and forward declarations for ${name}.

#ifndef ${guard}
#define ${guard}

#define DEBUG 1    // comment out for release builds

#define PROGRAM_NAME    "${name}"
#define PROGRAM_VERSION "01"

// set_ups.h values, defined here so the macro compiles without that header.
${defines}

// Globals hold names, flags and counts only. An Element or Model handle kept
// here would lock its model for the whole session.
{
    File    g_log;
    Integer g_log_open = 0;
}

void log_msg(Text msg);
void open_log();
void close_log();
${forwardDeclarations.join('\n')}

#endif
`;
}

function utilsHeader(name: string): string {
	const guard = `${name.toUpperCase()}_UTILS_H`;
	return `// ${name}_utils.H
// Debug log helpers. The log is written to %TEMP%, never next to the .4do,
// because deployed macros often sit in folders the user cannot write to.

#ifndef ${guard}
#define ${guard}

// Writes one line to the debug log (file only, flushed per line).
void log_msg(Text msg)
{
    if(g_log_open)
    {
        File_write_line(g_log, msg);
        File_flush(g_log);
    }
}

// Opens %TEMP%\\<PROGRAM_NAME>.log when DEBUG is defined.
void open_log()
{
#ifdef DEBUG
    Text temp_dir = Getenv("TEMP");
    if(temp_dir == "") temp_dir = Getenv("TMP");
    if(temp_dir == "") temp_dir = ".";
    Text log_path = temp_dir + "\\\\" + PROGRAM_NAME + ".log";
    if(File_open(log_path, "w", "", g_log) == 0)
    {
        g_log_open = 1;
        log_msg("=== " + PROGRAM_NAME + " v" + PROGRAM_VERSION + " ===");
        log_msg("Macro: " + Get_macro_name());
    }
#endif
}

void close_log()
{
    if(g_log_open)
    {
        File_close(g_log);
        g_log_open = 0;
    }
}

#endif
`;
}

const PROCESS_MODEL = `// Walks the elements of a model. Replace the loop body with the macro's work.
// Returns 0 on success, non-zero on error.
Integer process_model(Text model_name, Integer list_elements, Integer &count)
{
    count = 0;
    if(Model_exists(model_name) == 0)
    {
        log_msg("Model not found: " + model_name);
        return 1;
    }

    Model model = Get_model(model_name);
    Dynamic_Element elements;
    Integer n = 0;
    if(Get_elements(model, elements, n) != 0)
    {
        log_msg("Get_elements failed for " + model_name);
        Null(elements);
        Null(model);
        return 2;
    }

    Integer i;
    for(i = 1; i <= n; i++)
    {
        Element elt;
        if(Get_item(elements, i, elt) != 0) continue;

        Text elt_name = "";
        if(Get_name(elt, elt_name) != 0) elt_name = "";
        if(list_elements) Print("  " + elt_name + "\\n");

        // ... process elt ...

        count++;
        Null(elt);
    }

    // Release every handle: a held handle locks the model.
    Null(elements);
    Null(model);
    log_msg("Processed " + To_text(count) + " elements in " + model_name);
    return 0;
}`;

const PROCESS_ELEMENTS = `// Walks the selected elements. Replace the loop body with the macro's work.
// Returns 0 on success, non-zero on error.
Integer process_elements(Dynamic_Element elements, Integer n, Integer &count)
{
    count = 0;
    Integer i;
    for(i = 1; i <= n; i++)
    {
        Element elt;
        if(Get_item(elements, i, elt) != 0) continue;

        Text elt_name = "";
        if(Get_name(elt, elt_name) != 0) elt_name = "";
        Text elt_type = "";
        if(Get_type(elt, elt_type) != 0) elt_type = "";
        log_msg("Element " + To_text(i) + ": " + elt_type + " " + elt_name);

        // ... process elt ...

        count++;
        Null(elt);
    }
    return 0;
}`;

function handleModelProcess(withTick: boolean): string {
	const params = withTick
		? 'Model_Box model_box, Named_Tick_Box list_tick, Colour_Message_Box message'
		: 'Model_Box model_box, Colour_Message_Box message';
	const listRead = withTick
		? `
    Integer list_elements = 0;
    Validate(list_tick, list_elements);      // Named_Tick_Box: read with Validate, not Get_data
    log_msg("List elements: " + To_text(list_elements));
`
		: `
    Integer list_elements = 0;
`;
	return `// Process button handler: validate the inputs, run, report.
void handle_process(${params})
{
    Clear_console();

    // Get_data leaves the destination untouched on an empty box, so seed it.
    Text model_name = "";
    Get_data(model_box, model_name);
    model_name = Text_justify(model_name);
    log_msg("Model box: <" + model_name + ">");
    if(model_name == "")
    {
        Set_data(message, "Enter a model name.", MESSAGE_LEVEL_ERROR);
        return;
    }
    // Model_exists returns non-zero when the model exists (not MODEL_EXISTS).
    if(Model_exists(model_name) == 0)
    {
        Set_data(message, "Model " + model_name + " does not exist.", MESSAGE_LEVEL_ERROR);
        log_msg("Model not found: " + model_name);
        return;
    }
${listRead}
    Print("Model: " + model_name + "\\n");

    Integer count = 0;
    Integer ret = process_model(model_name, list_elements, count);
    if(ret != 0)
    {
        Print("Processing failed (code " + To_text(ret) + ").\\n");
        Show_console(1);
        Set_data(message, "Processing failed. See the Output Window.", MESSAGE_LEVEL_ERROR);
        return;
    }

    Print("Processed " + To_text(count) + " elements.\\n");
    Show_console(1);
    Set_data(message, "Processed " + To_text(count) + " elements.", MESSAGE_LEVEL_GOOD);
}`;
}

const HANDLE_SOURCE_PROCESS = `// Process button handler: validate the source, run, report.
void handle_process(Source_Box source, Colour_Message_Box message)
{
    Clear_console();

    Dynamic_Element elements;
    Integer ret = Validate(source, elements);
    log_msg("Validate(source) returned " + To_text(ret));

    // Validate returns TRUE, NO_NAME or an error code. Decide on the count:
    // no elements is not an error.
    Integer n = 0;
    Get_number_of_items(elements, n);
    if(n == 0)
    {
        Set_data(message, "No elements selected.", MESSAGE_LEVEL_WARNING);
        Null(elements);
        return;
    }
    Print("Selected elements: " + To_text(n) + "\\n");

    Integer count = 0;
    ret = process_elements(elements, n, count);
    Null(elements);
    if(ret != 0)
    {
        Print("Processing failed (code " + To_text(ret) + ").\\n");
        Show_console(1);
        Set_data(message, "Processing failed. See the Output Window.", MESSAGE_LEVEL_ERROR);
        return;
    }

    Print("Processed " + To_text(count) + " elements.\\n");
    Show_console(1);
    Set_data(message, "Processed " + To_text(count) + " elements.", MESSAGE_LEVEL_GOOD);
}`;

function processHeader(name: string, body: string[]): string {
	const guard = `${name.toUpperCase()}_PROCESS_H`;
	return `// ${name}_process.H
// Processing logic for ${name}.

#ifndef ${guard}
#define ${guard}

${body.join('\n\n')}

#endif
`;
}

function includes(name: string): string {
	return `#include "includes/${name}_globals.H"
#include "includes/${name}_utils.H"
#include "includes/${name}_process.H"
`;
}

function headlessMain(name: string, head: string): string {
	return `${head}
${includes(name)}
void main()
{
    open_log();
    Clear_console();

    // Output parameters are not set on failure, so seed before the call.
    Text model_name = "";
    Model_prompt("Model to process", model_name);
    model_name = Text_justify(model_name);
    if(model_name == "")
    {
        Print("No model selected.\\n");
        Show_console(1);
        close_log();
        return;
    }
    Print("Model: " + model_name + "\\n");

    Integer count = 0;
    Integer ret = process_model(model_name, 0, count);
    if(ret != 0)
    {
        Print("Processing failed (code " + To_text(ret) + "). Log: %TEMP%\\\\" + PROGRAM_NAME + ".log\\n");
    }
    else
    {
        Print("Processed " + To_text(count) + " elements.\\n");
    }
    Show_console(1);
    close_log();
}
`;
}

/** The event loop shared by the panel templates. `cases` are switch cases. */
function eventLoop(cases: string): string {
	return `    Integer doit = 1;
    while(doit)
    {
        // Declared inside the loop so every event starts from blank values.
        Integer64 id = 0;
        Text cmd = "", msg = "";
        Wait_on_events(id, cmd, msg);
        log_msg("event id=" + To_text(id) + " cmd=<" + cmd + "> msg=<" + msg + ">");

        if(cmd == "CodeShutdown")
        {
            Set_exit_code("CodeShutdown");
            doit = 0;
            break;
        }
        if(cmd == "keystroke") continue;

        switch(id)
        {
        case Get_id64(panel) :
            {
                if(cmd == "Panel Quit") doit = 0;
            }
            break;
        case Get_id64(finish_button) :
            {
                if(cmd == "finish") doit = 0;
            }
            break;
${cases}
        }
    }`;
}

function panelMain(name: string, head: string, kind: Exclude<MacroKind, 'headless'>): string {
	const commonTop = `    open_log();

    Panel panel = Create_panel(PROGRAM_NAME + " v" + PROGRAM_VERSION);
    Colour_Message_Box message = Create_colour_message_box("Ready");
    Set_width_in_chars(message, 60);    // otherwise sized to "Ready" and clips messages
`;
	const buttons = `    Button process_button = Create_button("&Process", "process");
    Button finish_button = Create_button("&Finish", "finish");
    Horizontal_Group buttons = Create_button_group();
    Append(process_button, buttons);
    Append(finish_button, buttons);
`;

	let widgets: string;
	let layout: string;
	let handlerCall: string;
	if (kind === 'panel') {
		widgets = `
    // flags 0: a must-exist flag makes an empty box refuse focus on open.
    // The model is checked in handle_process instead.
    Model_Box model_box = Create_model_box("Model", message, 0);
    Vertical_Group inputs = Create_vertical_group(0);
    Set_border(inputs, "Input");
    Append(model_box, inputs);
`;
		layout = `    Append(inputs, layout);`;
		handlerCall = 'handle_process(model_box, message);';
	} else if (kind === 'source_box') {
		widgets = `
    Source_Box source = Create_source_box("to process", message, Source_Box_All);
`;
		layout = `    Append(source, layout);`;
		handlerCall = 'handle_process(source, message);';
	} else {
		widgets = `
    Tab_Box tabs = Create_tab_box();

    // flags 0: a must-exist flag makes an empty box refuse focus on open.
    Model_Box model_box = Create_model_box("Model", message, 0);
    Vertical_Group input_page = Create_vertical_group(0);
    Append(model_box, input_page);

    Named_Tick_Box list_tick = Create_named_tick_box("List each element in the Output Window", 0, "list");
    Vertical_Group options_page = Create_vertical_group(0);
    Append(list_tick, options_page);

    Append(input_page, "Input", tabs);
    Append(options_page, "Options", tabs);
`;
		layout = `    Append(tabs, layout);`;
		handlerCall = 'handle_process(model_box, list_tick, message);';
	}

	const cases = `        case Get_id64(process_button) :
            {
                if(cmd == "process") ${handlerCall}
            }
            break;`;

	return `${head}
${includes(name)}
void main()
{
${commonTop}${widgets}
${buttons}
    // Append order is top-to-bottom order on the panel.
    Vertical_Group layout = Create_vertical_group(0);
${layout}
    Append(message, layout);
    Append(buttons, layout);
    Append(layout, panel);
    Show_widget(panel);

${eventLoop(cases)}

    close_log();
}
`;
}

export function scaffoldMacro(options: ScaffoldOptions): Scaffold {
	const { name, kind } = options;
	if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
		throw new Error(`Invalid macro name "${name}". Use letters, digits and underscores, starting with a letter.`);
	}
	if (!MACRO_KINDS.includes(kind)) {
		throw new Error(`Unknown macro kind "${kind}". Use one of: ${MACRO_KINDS.join(', ')}.`);
	}

	const baseName = kind === 'headless' ? `${name}_01` : `${name}_panel_01`;
	const head = header({
		file: baseName,
		programmer: options.programmer?.trim() || '[Name]',
		date: formatDate(options.date ?? new Date()),
		description: (options.description?.trim() || KIND_DESCRIPTIONS[kind]).replace(/\s*\r?\n\s*/g, ' '),
	});

	let main: string;
	let forward: string[];
	let processBody: string[];
	if (kind === 'headless') {
		main = headlessMain(name, head);
		forward = ['Integer process_model(Text model_name, Integer list_elements, Integer &count);'];
		processBody = [PROCESS_MODEL];
	} else if (kind === 'source_box') {
		main = panelMain(name, head, kind);
		forward = [
			'Integer process_elements(Dynamic_Element elements, Integer n, Integer &count);',
			'void handle_process(Source_Box source, Colour_Message_Box message);',
		];
		processBody = [PROCESS_ELEMENTS, HANDLE_SOURCE_PROCESS];
	} else {
		main = panelMain(name, head, kind);
		const withTick = kind === 'tabs';
		forward = [
			'Integer process_model(Text model_name, Integer list_elements, Integer &count);',
			withTick
				? 'void handle_process(Model_Box model_box, Named_Tick_Box list_tick, Colour_Message_Box message);'
				: 'void handle_process(Model_Box model_box, Colour_Message_Box message);',
		];
		processBody = [PROCESS_MODEL, handleModelProcess(withTick)];
	}

	const mainFile = `${name}/${baseName}.4dm`;
	return {
		mainFile,
		files: [
			{ path: mainFile, content: main },
			{ path: `${name}/includes/${name}_globals.H`, content: globalsHeader(name, kind, forward) },
			{ path: `${name}/includes/${name}_utils.H`, content: utilsHeader(name) },
			{ path: `${name}/includes/${name}_process.H`, content: processHeader(name, processBody) },
		],
	};
}

/** Writes a scaffold under `directory`; refuses to overwrite existing files. */
export function writeScaffold(scaffold: Scaffold, directory: string): string[] {
	const targets = scaffold.files.map(f => ({ file: f, target: path.join(directory, f.path) }));
	const existing = targets.filter(t => fs.existsSync(t.target)).map(t => t.target);
	if (existing.length > 0) {
		throw new Error(`Refusing to overwrite existing files:\n${existing.join('\n')}`);
	}
	for (const { file, target } of targets) {
		fs.mkdirSync(path.dirname(target), { recursive: true });
		fs.writeFileSync(target, file.content.replace(/\r?\n/g, '\r\n'), 'utf-8');
	}
	return targets.map(t => t.target);
}
