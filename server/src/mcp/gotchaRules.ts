/**
 * Gotcha rules — static checks for 12dPL mistakes recorded in the macro
 * knowledge base. Most of these compile cleanly with cc4d and then crash or
 * misbehave inside 12d Model, so neither the compiler nor the language
 * server's grammar checks report them.
 *
 * Rules run on a masked copy of the source where comments and the insides
 * of string literals are blanked out, so offsets still map to the original.
 */

export type GotchaSeverity = 'error' | 'warning' | 'info';

export interface GotchaFinding {
	rule: string;
	severity: GotchaSeverity;
	/** 1-based. */
	line: number;
	/** 1-based. */
	column: number;
	message: string;
}

interface Literal {
	/** Offset of the opening quote. */
	start: number;
	/** Offset just past the closing quote. */
	end: number;
	value: string;
}

export interface MaskedSource {
	masked: string;
	literals: Literal[];
}

/** Blanks comments and string contents (keeping quotes and newlines). */
export function maskSource(text: string): MaskedSource {
	const out = text.split('');
	const literals: Literal[] = [];
	let i = 0;
	const blank = (from: number, to: number) => {
		for (let k = from; k < to; k++) if (out[k] !== '\n' && out[k] !== '\r') out[k] = ' ';
	};

	while (i < text.length) {
		const ch = text[i];
		const next = text[i + 1];
		if (ch === '/' && next === '/') {
			let end = text.indexOf('\n', i);
			if (end < 0) end = text.length;
			blank(i, end);
			i = end;
		} else if (ch === '/' && next === '*') {
			let end = text.indexOf('*/', i + 2);
			end = end < 0 ? text.length : end + 2;
			blank(i, end);
			i = end;
		} else if (ch === '"') {
			let j = i + 1;
			while (j < text.length && text[j] !== '"' && text[j] !== '\n') {
				j += text[j] === '\\' ? 2 : 1;
			}
			const closed = j < text.length && text[j] === '"';
			const end = closed ? j + 1 : j;
			literals.push({ start: i, end, value: text.slice(i + 1, closed ? j : end) });
			blank(i + 1, closed ? j : end);
			i = end;
		} else {
			i++;
		}
	}
	return { masked: out.join(''), literals };
}

// ─── Small scanning helpers ─────────────────────────────────────────────────

function matchingClose(s: string, open: number): number {
	let depth = 0;
	for (let i = open; i < s.length; i++) {
		if (s[i] === '(') depth++;
		else if (s[i] === ')' && --depth === 0) return i;
	}
	return -1;
}

function enclosingOpen(s: string, at: number): number {
	let depth = 0;
	for (let i = at - 1; i >= 0; i--) {
		if (s[i] === ')') depth++;
		else if (s[i] === '(') {
			if (depth === 0) return i;
			depth--;
		} else if (s[i] === ';' || s[i] === '{' || s[i] === '}') {
			return -1;
		}
	}
	return -1;
}

/** Splits `s[from, to)` on top-level separators matched by `sep` (e.g. commas). */
function splitTopLevel(s: string, from: number, to: number, sep: RegExp): Array<{ start: number; text: string }> {
	const parts: Array<{ start: number; text: string }> = [];
	let depth = 0;
	let partStart = from;
	for (let i = from; i < to; i++) {
		const c = s[i];
		if (c === '(' || c === '[') depth++;
		else if (c === ')' || c === ']') depth--;
		else if (depth === 0) {
			sep.lastIndex = i;
			const m = sep.exec(s);
			if (m && m.index === i) {
				parts.push({ start: partStart, text: s.slice(partStart, i) });
				i += m[0].length - 1;
				partStart = i + 1;
			}
		}
	}
	parts.push({ start: partStart, text: s.slice(partStart, to) });
	return parts;
}

function prevNonSpace(s: string, at: number): number {
	let i = at - 1;
	while (i >= 0 && /\s/.test(s.charAt(i))) i--;
	return i;
}

function nextNonSpace(s: string, at: number): number {
	let i = at + 1;
	while (i < s.length && /\s/.test(s.charAt(i))) i++;
	return i;
}

/** Arguments of the call whose `(` is at `open`. */
function callArgs(s: string, open: number): Array<{ start: number; text: string }> | null {
	const close = matchingClose(s, open);
	if (close < 0) return null;
	if (s.slice(open + 1, close).trim() === '') return [];
	return splitTopLevel(s, open + 1, close, /,/y);
}

// ─── Rules ──────────────────────────────────────────────────────────────────

interface RuleContext {
	text: string;
	masked: string;
	literals: Literal[];
	hasEventLoop: boolean;
	report: (rule: string, severity: GotchaSeverity, offset: number, message: string) => void;
}

const SIMPLE_CALL_RULES: Array<{ rule: string; severity: GotchaSeverity; pattern: RegExp; message: string }> = [
	{
		rule: 'print-error',
		severity: 'error',
		pattern: /\bPrint_error\s*\(/g,
		message: 'Print_error() does not exist in 12dPL. Use Error_prompt(msg) for an error dialog, or Print(msg + "\\n") followed by Show_console(1) for the Output Window.',
	},
	{
		rule: 'create-attributes',
		severity: 'error',
		pattern: /\bCreate_attributes\s*\(/g,
		message: 'There is no Create_attributes(). A local Attributes handle initialises itself on its first Set_attribute(handle, name, value) call.',
	},
	{
		rule: 'start-timer',
		severity: 'error',
		pattern: /\bStart_timer\s*\(/g,
		message: 'cc4d rejects Start_timer ("Non implimented function call"), and a macro cannot yield to 12d mid-handler. Hand long jobs to Create_process(..., Process_Handle &h) and check Process_exists(h) on the next user action.',
	},
	{
		rule: 'obsolete-get-pipe-diameter',
		severity: 'error',
		pattern: /\bGet_pipe_diameter\s*\(/g,
		message: 'Get_pipe_diameter is obsolete and rejected by a normal V15 compile. Use Get_super_pipe(super, &diameter) for a constant-diameter super string; drainage elements use Get_drainage_pipe_diameter.',
	},
];

function ruleSimpleCalls(ctx: RuleContext): void {
	for (const { rule, severity, pattern, message } of SIMPLE_CALL_RULES) {
		pattern.lastIndex = 0;
		let m: RegExpExecArray | null;
		while ((m = pattern.exec(ctx.masked)) !== null) ctx.report(rule, severity, m.index, message);
	}
}

function ruleAdjacentLiterals(ctx: RuleContext): void {
	for (let i = 0; i + 1 < ctx.literals.length; i++) {
		const first = ctx.literals[i];
		const second = ctx.literals[i + 1];
		if (!first || !second) continue;
		const between = ctx.masked.slice(first.end, second.start);
		if (between.length > 0 && between.trim() === '') {
			ctx.report('adjacent-string-literals', 'error', second.start,
				'Adjacent string literals ("a" "b") are a parse error in 12dPL. Join them with +.');
		}
	}
}

function ruleInlineTernaryConcat(ctx: RuleContext): void {
	const s = ctx.masked;
	const reported = new Set<number>();
	for (let q = s.indexOf('?'); q >= 0; q = s.indexOf('?', q + 1)) {
		const open = enclosingOpen(s, q);
		if (open < 0 || reported.has(open)) continue;
		const close = matchingClose(s, open);
		if (close < 0 || !s.slice(q, close).includes(':')) continue;

		const before = prevNonSpace(s, open);
		const after = nextNonSpace(s, close);
		const plusBefore = before >= 0 && (s[before] === '+' || (s[before] === '=' && s[before - 1] === '+'));
		const plusAfter = after < s.length && s[after] === '+' && s[after + 1] !== '+';
		if (plusBefore || plusAfter) {
			reported.add(open);
			ctx.report('inline-ternary-concat', 'warning', open,
				'A ternary used inline as an operand of + yields a null Text and crashes 12d Model at runtime (ACCESS_VIOLATION), although it compiles. Assign the ternary to a variable first, then concatenate.');
		}
	}
}

function ruleExistsComparedToValidateCode(ctx: RuleContext): void {
	const re = /\b(Model_exists|Tin_exists)\s*\(/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(ctx.masked)) !== null) {
		const open = m.index + m[0].length - 1;
		const close = matchingClose(ctx.masked, open);
		if (close < 0) continue;
		const tail = /^\s*==\s*(MODEL_EXISTS|TIN_EXISTS)\b/.exec(ctx.masked.slice(close + 1));
		if (tail) {
			ctx.report('exists-vs-validate-code', 'warning', m.index,
				`${m[1]}() returns non-zero when the item exists, not ${tail[1]} (that is a Validate() return code), so this test can reject an item that exists. Test ${m[1]}(...) != 0.`);
		}
	}
}

function rulePromptInPanel(ctx: RuleContext): void {
	if (!ctx.hasEventLoop) return;
	const re = /\bPrompt\s*\(/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(ctx.masked)) !== null) {
		const args = callArgs(ctx.masked, m.index + m[0].length - 1);
		if (args && args.length === 1) {
			ctx.report('prompt-in-panel', 'warning', m.index,
				'In a panel macro Prompt(Text) opens an input dialog (the user types back); it is not a display message. Use Set_data(message_box, text), Error_prompt(text), or Print(text + "\\n") + Show_console(1).');
		}
	}
}

function ruleLiterals(ctx: RuleContext): void {
	const lineOf = (offset: number) => {
		const start = ctx.text.lastIndexOf('\n', offset - 1) + 1;
		let end = ctx.text.indexOf('\n', offset);
		if (end < 0) end = ctx.text.length;
		return ctx.text.slice(start, end).replace(/\r$/, '');
	};
	const longLines = new Set<string>();
	for (const lit of ctx.literals) {
		const line = lineOf(lit.start);
		if ((lit.value.length > 500 || line.length > 600) && !longLines.has(line)) {
			longLines.add(line);
			ctx.report('long-string-literal', 'warning', lit.start,
				`This line is ${line.length} characters with a long string literal. cc4d fails around 600 characters per line with a misleading "syntax error - giving up". Split it across several statements (Text x = x + "...") or File_write_line calls.`);
		}
		if (/[^\x00-\x7F]/.test(lit.value)) {
			ctx.report('non-ascii-literal', 'warning', lit.start,
				'Non-ASCII characters in a string literal come out as garbage at runtime (the compiler is ANSI). Build them with Set_char(text, pos, code), e.g. 176 = degree sign, 169 = copyright, 178 = superscript 2.');
		}
	}
}

function ruleFocusTrapBoxes(ctx: RuleContext): void {
	const boxes: Array<[RegExp, RegExp, string, string]> = [
		[/\bCreate_model_box\s*\(/g, /^(CHECK_MODEL_MUST_EXIST|7)$/, 'Model_Box', 'Model_exists(name) != 0'],
		[/\bCreate_tin_box\s*\(/g, /^(CHECK_TIN_MUST_EXIST|8)$/, 'Tin_Box', 'Tin_exists(name) != 0'],
	];
	for (const [call, flag, widget, check] of boxes) {
		let m: RegExpExecArray | null;
		while ((m = call.exec(ctx.masked)) !== null) {
			const flagArg = callArgs(ctx.masked, m.index + m[0].length - 1)?.[2];
			if (flagArg && flag.test(flagArg.text.trim())) {
				ctx.report('must-exist-focus-trap', 'info', flagArg.start + (flagArg.text.length - flagArg.text.trimStart().length),
					`A ${widget} created with a must-exist flag refuses focus while it is empty, so on panel open the user cannot type into or pick from it. Use flags 0 and check ${check} in the Process handler.`);
			}
		}
	}
}

function ruleNamedTickGetData(ctx: RuleContext): void {
	const names = new Set<string>();
	const decl = /\bNamed_Tick_Box\s+([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)/g;
	let m: RegExpExecArray | null;
	while ((m = decl.exec(ctx.masked)) !== null) {
		for (const n of (m[1] ?? '').split(',')) names.add(n.trim());
	}
	if (names.size === 0) return;
	const getData = /\bGet_data\s*\(\s*([A-Za-z_]\w*)\s*,/g;
	while ((m = getData.exec(ctx.masked)) !== null) {
		if (m[1] && names.has(m[1])) {
			ctx.report('named-tick-get-data', 'warning', m.index,
				`Read a Named_Tick_Box with Validate(${m[1]}, Integer &state); Get_data() does not return the tick state.`);
		}
	}
}

function rulePrintWithoutShowConsole(ctx: RuleContext): void {
	// Headers usually leave Show_console to main(), so only check the main file.
	if (!/\bmain\s*\(/.test(ctx.masked)) return;
	const print = /\bPrint\s*\(/.exec(ctx.masked);
	if (print && !/\bShow_console\s*\(/.test(ctx.masked)) {
		ctx.report('print-without-show-console', 'info', print.index,
			'Print() writes to the 12d Output Window. Call Show_console(1) after the Print calls so the user sees the output.');
	}
}

function ruleGlobalHandles(ctx: RuleContext): void {
	if (!ctx.hasEventLoop) return;
	const s = ctx.masked;
	let depth = 0;
	let globalBlockStart = -1;
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (c === '{') {
			if (depth === 0) {
				// A function body follows ')'; anything else at file scope is a global block.
				const before = prevNonSpace(s, i);
				globalBlockStart = before >= 0 && s[before] === ')' ? -1 : i;
			}
			depth++;
		} else if (c === '}') {
			depth--;
			if (depth === 0 && globalBlockStart >= 0) {
				const block = s.slice(globalBlockStart, i);
				const decl = /\b(Element|Model|Dynamic_Element)\s+[A-Za-z_]\w*/g;
				let m: RegExpExecArray | null;
				while ((m = decl.exec(block)) !== null) {
					ctx.report('global-handle-lock', 'info', globalBlockStart + m.index,
						`A global ${m[1]} handle keeps what it points at locked across panel events: the model cannot be cleaned or deleted ("is locked hence cannot be deleted"). Keep names or indices in globals, look the handle up when needed, and Null() it on every return path.`);
				}
				globalBlockStart = -1;
			}
		}
	}
}

function ruleNoShortCircuit(ctx: RuleContext): void {
	const s = ctx.masked;
	const seenGroups = new Set<number>();
	const op = /&&|\|\|/g;
	let m: RegExpExecArray | null;
	while ((m = op.exec(s)) !== null) {
		const open = enclosingOpen(s, m.index);
		if (open < 0 || seenGroups.has(open)) continue;
		seenGroups.add(open);
		const close = matchingClose(s, open);
		if (close < 0) continue;

		const operands = splitTopLevel(s, open + 1, close, /&&|\|\|/y);
		const guarded = new Set<string>();
		for (const [k, operand] of operands.entries()) {
			if (k > 0) {
				let flagged = false;
				for (const v of guarded) {
					const index = new RegExp(`\\[[^\\]]*\\b${v}\\b[^\\]]*\\]`).exec(operand.text);
					if (index) {
						ctx.report('no-short-circuit', 'warning', operand.start + index.index,
							`&& and || do not short-circuit in 12dPL: both sides always run, so the test on '${v}' does not protect this array index (arrays are 1-based; index 0 or past the end is a fatal runtime error). Put the guard in its own if statement.`);
						flagged = true;
						break;
					}
				}
				const tinHeight = /\bTin_height\s*\(/.exec(operand.text);
				if (!flagged && tinHeight) {
					ctx.report('no-short-circuit', 'warning', operand.start + tinHeight.index,
						'&& and || do not short-circuit, so Tin_height still runs when the left-hand guard fails, and Tin_height on an unset Tin handle is fatal. Guard with Tin_exists(tin) in its own if statement.');
				}
			}
			const compared = /\b([A-Za-z_]\w*)\s*(?:>=|<=|==|!=|>|<)|(?:>=|<=|==|!=|>|<)\s*([A-Za-z_]\w*)\b/g;
			let c: RegExpExecArray | null;
			while ((c = compared.exec(operand.text)) !== null) {
				const name = c[1] ?? c[2];
				if (name && !/^[A-Z0-9_]+$/.test(name)) guarded.add(name);
			}
		}
	}
}

const RULES = [
	ruleSimpleCalls,
	ruleAdjacentLiterals,
	ruleInlineTernaryConcat,
	ruleExistsComparedToValidateCode,
	rulePromptInPanel,
	ruleLiterals,
	ruleFocusTrapBoxes,
	ruleNamedTickGetData,
	rulePrintWithoutShowConsole,
	ruleGlobalHandles,
	ruleNoShortCircuit,
];

export function checkGotchas(text: string): GotchaFinding[] {
	const { masked, literals } = maskSource(text);
	const lineStarts = [0];
	for (let i = 0; i < text.length; i++) if (text[i] === '\n') lineStarts.push(i + 1);
	const position = (offset: number) => {
		let lo = 0;
		let hi = lineStarts.length - 1;
		while (lo < hi) {
			const mid = (lo + hi + 1) >> 1;
			if ((lineStarts[mid] ?? 0) <= offset) lo = mid;
			else hi = mid - 1;
		}
		return { line: lo + 1, column: offset - (lineStarts[lo] ?? 0) + 1 };
	};

	const findings: GotchaFinding[] = [];
	const ctx: RuleContext = {
		text,
		masked,
		literals,
		hasEventLoop: /\bWait_on_(widgets|events)\s*\(/.test(masked),
		report: (rule, severity, offset, message) => findings.push({ rule, severity, ...position(offset), message }),
	};
	for (const rule of RULES) rule(ctx);
	return findings.sort((a, b) => a.line - b.line || a.column - b.column);
}
