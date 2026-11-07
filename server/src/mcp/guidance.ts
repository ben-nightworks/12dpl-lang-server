/**
 * Text the MCP server hands to the model: the always-on server instructions,
 * the guide topics served by `get_macro_guide`, and the prompt templates.
 *
 * Guide topics select headings from the bundled guides (guide/instructions
 * and guide/create-macro). Heading matches ignore case and punctuation; a
 * trailing `*` matches a prefix.
 */

export const SERVER_INSTRUCTIONS = `12dPL Macro Assistant: knowledge and checks for writing 12d Model macros (.4dm source, .H/.h headers) in 12dPL, a C-like language that is not C.

Workflow for any 12dPL task:
1. Call get_macro_guide("essentials") before writing 12dPL in a session; add topics such as "panels", "attributes", "elements" or "files" when the task needs them.
2. Never guess a library call. Use lookup_function for every 12d function you call (signatures, overloads and recorded gotchas) and search_functions to find one by purpose.
3. Use search_knowledge / read_knowledge for topics (widgets, super strings, TINs, files, set_ups.h constants) and find_examples / read_example for working macros.
4. For a new macro project, start from scaffold_macro and put the processing in includes/<Name>_process.H.
5. After every edit run validate_macro, then compile_macro (Windows with cc4d.exe), until both are clean. A clean compile does not prove runtime behaviour in 12d Model; say what was and was not tested.

12dPL rules that compile cleanly but crash or misbehave in 12d Model:
- && and || do not short-circuit: both sides always run. Put a guard in its own if. Arrays are 1-based.
- Never use a ternary inline as an operand of +; assign it to a variable first.
- Output parameters are left untouched on failure and an unset Text is a null handle, not "". Seed variables (Text name = "";) and check return codes.
- Model_exists(Text) and Tin_exists(Text) return non-zero when the item exists; test != 0, never == MODEL_EXISTS / TIN_EXISTS.
- Element and Model handles lock their model. Do not keep them in globals across panel events; Null() them on every return path.
- There is no Print_error() and no Create_attributes(). Errors: Error_prompt(). Output Window: Print(text + "\\n"), then Show_console(1).
- Prompt(Text) inside a panel is an input dialog, not a message.
- No adjacent string literals ("a" "b"); join with +. Keep source lines under about 600 characters. Only ASCII in literals (Set_char for degree, copyright).
- Create Model_Box / Tin_Box with flags 0 and check existence in the Process handler.
- cc4d does not find set_ups.h on its own: define the constants you use, or ship a local copy next to the macro.`;

export interface GuideTopic {
	description: string;
	headings: string[];
}

export const GUIDE_TOPICS: Record<string, GuideTopic> = {
	essentials: {
		description: 'Types, preprocessor, functions, output, differences from C and the runtime crashes that compile cleanly. Read first.',
		headings: [
			'Language', 'Types', 'Entry point', 'Preprocessor', 'Functions', 'Output & User Interaction',
			'Key Differences from C', 'Core language rules', 'Output and errors', 'Constants',
			'Runtime crashes that compile clean',
		],
	},
	workflow: {
		description: 'Step-by-step macro creation: requirements, references, templates, verified patterns, compiling.',
		headings: ['Workflow'],
	},
	panels: {
		description: 'Panel UI: widget constructors, focus traps, event loop, Source_Box, grids, lists, logs, Panel_prompt, help pages.',
		headings: [
			'Panel UI Patterns', 'Panel macros', 'Panel assembly order', 'Event loop pattern', 'Source_Box pattern',
			'About popup panel pattern', 'Editable grid panel (GridCtrl_Box)', 'List_Box instead of Tree_Box for a hierarchy',
			'Log_Box structured results pattern', 'Panel_prompt*', 'In-app HTML help button pattern',
		],
	},
	attributes: {
		description: 'User attributes on elements, vertices and projects: building trees, upserts, type-aware reads.',
		headings: ['Attributes System', 'Attributes', 'Type-aware vertex attribute access', 'Export and Attribute Review Rules'],
	},
	elements: {
		description: 'Creating and editing elements and models: super strings, iteration, re-import, undo, dry runs.',
		headings: [
			'Element creation', 'Model handling', 'Model iteration pattern', 'Model clean before re-import pattern',
			'Single-entry undo for in-place edits', 'Report-only (dry run) tick',
		],
	},
	signatures: {
		description: 'Common library calls and the verified function signatures collected from working macros.',
		headings: ['Common Library Functions', 'Verified Function Signatures'],
	},
	conventions: {
		description: 'Code style, project layout, logging and testing requirements, and the construction checklist.',
		headings: [
			'Code Style', 'Macro Project Structure', 'File Separation Rules', 'Testing and Logging Requirements',
			'Macro Construction Checklist',
		],
	},
	compiler: {
		description: 'cc4d.exe usage, flags, how library calls are resolved, and compile testing.',
		headings: ['Compiler', 'Step 6*', 'Compile Testing'],
	},
	files: {
		description: 'File I/O, XML rewriting, Excel ODBC, Synergy-managed files and deployment gotchas.',
		headings: [
			'XML Rewriting Gotchas*', 'Excel ODBC Update Pattern', 'Synergy-Managed*', 'External File and Deployment Gotchas',
		],
	},
};

export function createMacroPrompt(description: string, kind?: string): string {
	const kindLine = kind ? `\nPreferred macro kind: ${kind}.` : '';
	return `Create a 12dPL macro for 12d Model.

Request: ${description}${kindLine}

Use the 12dPL Macro Assistant tools:
1. Call get_macro_guide with topic "essentials", then "workflow". Add "panels", "attributes", "elements" or "files" as the macro needs them.
2. Settle the requirements: panel or headless, inputs, outputs, processing and the macro name. Ask only when a missing detail blocks the work.
3. Look up every library function you plan to call with lookup_function, or find one with search_functions. Do not invent function names or signatures.
4. Check search_knowledge for the topic and find_examples for similar working macros.
5. Call scaffold_macro with the chosen kind (headless, panel, source_box or tabs) and an outputDirectory, then write the processing in includes/<Name>_process.H. Keep the main .4dm to UI setup and the event loop.
6. Run validate_macro on the main file and fix every error and warning. Then run compile_macro and fix cc4d errors until it compiles cleanly.
7. Report what was verified (validation, cc4d compile) and what still needs a live test in 12d Model.`;
}

export function reviewMacroPrompt(filePath: string): string {
	return `Review the 12dPL macro at ${filePath}.

1. Run validate_macro on it, then compile_macro (Windows with cc4d.exe).
2. Read the file and its includes. Check them against get_macro_guide topics "essentials" and "conventions" (including the Macro Construction Checklist), plus "panels", "attributes", "elements" or "files" where relevant.
3. For any library call whose use looks doubtful, call lookup_function and compare the signature and notes.
4. Report problems ordered by severity, each with its line number and a concrete fix. Keep runtime crash risks separate from style points.`;
}
