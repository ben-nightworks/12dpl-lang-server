import { CharStream, CommonTokenStream } from 'antlr4';

import proglang12dLexer from './src/proglang12dLexer';
import proglang12dParser from './src/proglang12dParser';

/** The lexer/parser pair used by validation and symbol extraction. */
export interface LexerAndParser {
	lexer: proglang12dLexer;
	parser: proglang12dParser;
	transformedText: string;
}

/**
 * Removes conditional/preprocessor directive lines before parsing.
 *
 * Keeps line numbers stable by replacing stripped lines with empty lines.
 */
export function stripConditionalDirectives(documentText: string): string {
	// The lexer has rules to skip some preprocessor directives, but real-world
	// headers include macros containing '#'/'##' which can defeat simplistic lexer
	// skipping and leak tokens into the parser.
	//
	// For parsing/validation, we treat ALL preprocessor directive lines as non-code,
	// including multi-line continuations with a trailing '\\'. We preserve
	// line numbers by replacing stripped lines with empty lines.
	//
	// Additionally, content inside `#if 0` blocks is dead code and must be
	// stripped entirely (not just the directive lines).
	const lines = documentText.split(/\r?\n/);
	const out: string[] = [];
	let inDirectiveContinuation = false;
	// Track nested #if 0 blocks. When > 0, ALL lines are stripped.
	let ifZeroDepth = 0;
	for (const line of lines) {
		const trimmed = line.trimStart();

		// Handle multi-line directive continuations (trailing backslash)
		if (inDirectiveContinuation) {
			out.push('');
			inDirectiveContinuation = /\\\s*$/.test(line);
			continue;
		}

		// Check for preprocessor directive lines
		if (trimmed.startsWith('#')) {
			// Track #if 0 blocks to strip their contents
			const directiveMatch = trimmed.match(/^#\s*(if|ifdef|ifndef|else|elif|endif)\b(.*)/);
			if (directiveMatch) {
				const directive = directiveMatch[1];
				const rest = directiveMatch[2]?.trim() ?? '';
				if (directive === 'if' && /^0\b/.test(rest)) {
					ifZeroDepth++;
				} else if ((directive === 'ifdef' || directive === 'ifndef' || directive === 'if') && ifZeroDepth > 0) {
					// Nested #if inside an #if 0 block
					ifZeroDepth++;
				} else if (directive === 'endif' && ifZeroDepth > 0) {
					ifZeroDepth--;
				} else if ((directive === 'else' || directive === 'elif') && ifZeroDepth === 1) {
					// #else/#elif at the same level as #if 0 means we're
					// back to potentially live code (e.g. #if 0 ... #else ... #endif)
					ifZeroDepth = 0;
				}
			}
			out.push('');
			inDirectiveContinuation = /\\\s*$/.test(line);
			continue;
		}

		// Inside #if 0 block — strip everything
		if (ifZeroDepth > 0) {
			out.push('');
			continue;
		}

		out.push(line);
	}
	return out.join('\n');
}

/**
 * Wraps top-level blocks/statements in implicit functions so they parse under the compilationUnit grammar.
 *
 * Inserts tokens without adding newlines to preserve line mapping.
 */
export function wrapTopLevelScriptsPreservingLines(documentText: string): string {
	// Wrap any top-level “script” segments (blocks/statements outside functions)
	// in implicit functions so the compilationUnit grammar can parse them.
	//
	// We only *insert* tokens (no newlines) to keep line numbers stable.
	const text = documentText;
	const insertions = new Map<number, string>();

	let braceDepth = 0;
	let parenDepth = 0;
	let bracketDepth = 0;
	let inLineComment = false;
	let inBlockComment = false;
	let inString = false;
	let stringQuote: string | null = null;
	let inScriptWrapper = false;
	let scriptIndex = 0;
	let awaitingFunctionBody = false;

	const isLineStart = (i: number) => i === 0 || text[i - 1] === '\n' || text[i - 1] === '\r';
	const isIdentChar = (ch: string) => /[A-Za-z0-9_]/.test(ch);
	const skipWhitespace = (i: number) => {
		while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;
		return i;
	};

	const typeKeywords = new Set([
		'void', 'Text', 'Integer', 'Real',
		'Element', 'Model', 'Tin', 'Dynamic_Element', 'Dynamic_Integer', 'Dynamic_Real', 'Dynamic_Text',
		'Menu', 'Dynamic_Text', 'Point', 'Line', 'Arc', 'Segment', 'File', 'View',
		'Panel', 'Vertical_Group', 'Horizontal_Group', 'Message_Box', 'Model_Box',
		'Named_Tick_Box', 'Button', 'Widget', 'Map_File', 'Select_Button', 'Select_Box',
		'Select_Boxes', 'Angle_Box', 'Choice_Box', 'Colour_Box', 'Directory_Box',
		'Real_Box', 'File_Box', 'Input_Box', 'Integer_Box', 'Justify_Box', 'Linestyle_Box',
		'Map_File_Box', 'Name_Box', 'Plotter_Box', 'Report_Box', 'Template_Box',
		'Sheet_Size_Box', 'Text_Style_Box', 'Text_Units_Box', 'Tick_Box', 'Tin_Box',
		'View_Box', 'XYZ_Box', 'Apply_Many_Function', 'Kerb_Return_Function', 'Function',
		'Macro_Function', 'Apply_Function', 'Function_Box', 'Widget_Pages', 'Sheet_Panel',
		'List_Box', 'Draw_Box', 'Screen_Text', 'Text_Edit_Box', 'Overlay_Widget', 'Tab_Box',
		'ListCtrl_Box', 'Bitmap_List_Box', 'Undo_List', 'Undo', 'Textstyle_Data',
		'Textstyle_Data_Box', 'Source_Box', 'Target_Box', 'SDR_Attribute', 'Spiral',
		'Parabola', 'Billboard_Box', 'Texture_Box', 'Bitmap_Fill_Box', 'Date_Time_Box',
		'HyperLink_Box', 'Uid', 'Attributes', 'Symbol_Box', 'Chainage_Box', 'Graph_Box',
		'Attributes_Box', 'Equality_Info', 'Equality_Label', 'New_Select_Box', 'Polygon_Box',
		'New_XYZ_Box', 'Vector2', 'Vector3', 'Vector4', 'Matrix3', 'Matrix4', 'GridCtrl_Box',
		'XML_Document', 'XML_Node', 'Plot_Parameter_File', 'Connection', 'Select_Query',
		'Database_Result', 'Insert_Query', 'Update_Query', 'Delete_Query', 'Manual_Query',
		'Transaction', 'Query_Condition', 'Parameter_Collection', 'Manual_Condition',
		'Tree_Box', 'Tree_Page', 'Colour_Message_Box', 'Unknown', 'Log_Line', 'Log_Box',
		'Slider_Box', 'Function_Property_Collection', 'Curve', 'Integer64', 'Guid',
		'Attribute_Blob', 'Attribute', 'Functions', 'Database_Results', 'Transactions',
		'Dynamic_Integer64', 'Colour', 'Time', 'Drainage_Network', 'Integer_Set', 'List',
		'Process_Handle', 'Real_Set', 'Selection', 'String', 'Text_Set', 'Time_Zone_Box',
		'Time_Zone_Box_Box',
	]);

	const tryMatchFunctionSignatureAt = (i: number): boolean => {
		let j = skipWhitespace(i);
		// Read a potential type keyword
		const kwStart = j;
		while (j < text.length && isIdentChar(text[j])) j++;
		if (j === kwStart) return false;
		const kw = text.slice(kwStart, j);
		if (!typeKeywords.has(kw)) return false;
		j = skipWhitespace(j);
		// Must be followed by an identifier (function name)
		if (!/[A-Za-z_0-9]/.test(text[j] || '')) return false;
		j++;
		while (j < text.length && isIdentChar(text[j])) j++;
		j = skipWhitespace(j);
		return text[j] === '(';
	};

	const lineHasRealCode = (i: number): boolean => {
		let j = skipWhitespace(i);
		const ch = text[j] || '';
		const next = text[j + 1] || '';
		if (!ch) return false;
		// Preprocessor-like directives (e.g. #define/#include) are handled by the lexer
		// and should not trigger implicit script wrapping.
		if (ch === '#') return false;
		if (ch === '/' && (next === '/' || next === '*')) return false;
		if (ch === '\r' || ch === '\n') return false;
		return true;
	};

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		const next = text[i + 1] || '';

		if (ch === '\n') {
			inLineComment = false;
			continue;
		}
		if (inLineComment) continue;
		if (inBlockComment) {
			if (ch === '*' && next === '/') {
				inBlockComment = false;
				i++;
			}
			continue;
		}
		if (inString) {
			if (ch === '\\') {
				i++;
				continue;
			}
			if (ch === stringQuote) {
				inString = false;
				stringQuote = null;
			}
			continue;
		}

		if (ch === '/' && next === '/') {
			inLineComment = true;
			i++;
			continue;
		}
		if (ch === '/' && next === '*') {
			inBlockComment = true;
			i++;
			continue;
		}
		if (ch === '"' || ch === '\'') {
			inString = true;
			stringQuote = ch;
			continue;
		}

		// Track brace depth to know when we're at the top-level.
		if (ch === '{') {
			// If we recently saw a function signature at top-level, this '{' is the function body.
			if (braceDepth === 0 && parenDepth === 0 && bracketDepth === 0 && awaitingFunctionBody) {
				awaitingFunctionBody = false;
				braceDepth++;
				continue;
			}

			// If this is a top-level block at the start of a line, open a wrapper *before*
			// consuming the '{' so the wrapper encloses the block.
			if (
				braceDepth === 0 &&
				parenDepth === 0 &&
				bracketDepth === 0 &&
				isLineStart(i) &&
				!tryMatchFunctionSignatureAt(i) &&
				lineHasRealCode(i) &&
				!inScriptWrapper
			) {
				const header = `void __12dpl__script__${scriptIndex++}(){`;
				insertions.set(i, (insertions.get(i) || '') + header);
				inScriptWrapper = true;
			}

			braceDepth++;
			continue;
		}
		if (ch === '}') {
			braceDepth = Math.max(0, braceDepth - 1);
			continue;
		}
		if (ch === ';' && braceDepth === 0 && parenDepth === 0 && bracketDepth === 0 && awaitingFunctionBody) {
			// Likely a prototype declaration ended; no body is coming.
			awaitingFunctionBody = false;
			continue;
		}
		if (ch === '(') {
			parenDepth++;
			continue;
		}
		if (ch === ')') {
			parenDepth = Math.max(0, parenDepth - 1);
			continue;
		}
		if (ch === '[') {
			bracketDepth++;
			continue;
		}
		if (ch === ']') {
			bracketDepth = Math.max(0, bracketDepth - 1);
			continue;
		}

		if (braceDepth !== 0 || parenDepth !== 0 || bracketDepth !== 0) {
			continue;
		}

		if (!isLineStart(i)) {
			continue;
		}

		// At top-level line start: decide whether to open/close a wrapper.
		if (tryMatchFunctionSignatureAt(i)) {
			if (inScriptWrapper) {
				insertions.set(i, (insertions.get(i) || '') + '}');
				inScriptWrapper = false;
			}
			awaitingFunctionBody = true;
			continue;
		}

		if (!lineHasRealCode(i)) {
			continue;
		}

		// If we're awaiting a function body (saw a signature but haven't
		// seen the opening '{' yet), don't start a wrapper — the upcoming
		// '{' belongs to the function definition, not a script block.
		if (awaitingFunctionBody) {
			continue;
		}

		if (!inScriptWrapper) {
			const header = `void __12dpl__script__${scriptIndex++}(){`;
			insertions.set(i, (insertions.get(i) || '') + header);
			inScriptWrapper = true;
		}
	}

	if (inScriptWrapper) {
		insertions.set(text.length, (insertions.get(text.length) || '') + '}');
	}

	if (insertions.size === 0) {
		return text;
	}

	const insertionPoints = Array.from(insertions.keys()).sort((a, b) => a - b);
	let out = '';
	let last = 0;
	for (const p of insertionPoints) {
		out += text.slice(last, p) + (insertions.get(p) || '');
		last = p;
	}
	out += text.slice(last);
	return out;
}


/**
 * Normalizes raw source text into something the ANTLR grammar can parse reliably.
 *
 * This strips directive lines and wraps top-level script blocks.
 */
export function prepareDocumentTextForParser(documentText: string): string {
	const cleanedText = stripConditionalDirectives(documentText);
	return wrapTopLevelScriptsPreservingLines(cleanedText);
}

/** Creates and configures an ANTLR lexer/parser for a 12dPL document. */
export function createLexerAndParser(documentText: string): LexerAndParser {
	const transformedText = prepareDocumentTextForParser(documentText);
	const chars = new CharStream(transformedText);
	const lexer = new proglang12dLexer(chars);
	const tokens = new CommonTokenStream(lexer);
	const parser = new proglang12dParser(tokens);
	// Needed for traversals (e.g. symbol collection) that rely on ctx.children.
	// antlr4 defaults can vary depending on runtime/build.
	(parser as any).buildParseTrees = true;
	return { lexer, parser, transformedText };
}
