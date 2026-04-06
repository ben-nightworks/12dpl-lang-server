/**
 * Prototype integration tests — verifies that loaded prototype data drives
 * validation and hover documentation correctly.
 *
 * Covers:
 *   - PrototypeService documentation generation (hover content)
 *   - Undeclared-symbol validation honours prototype function names
 *   - Function-argument validation uses prototype parameter signatures
 *   - Void-return-value validation uses prototype return types
 */

import { describe, expect, test, beforeAll } from "bun:test";
import { PrototypeService } from "../server/src/services/prototypeService";
import type { FunctionData } from "../server/src/services/prototypeService";
import { parse } from "../server/src/core/parsePipeline";
import {
	validateUndeclaredIdentifiers,
	validateFunctionArguments,
	validateVoidFunctionReturnValues,
} from "../server/src/core/validators";
import type { FunctionSignatureMap } from "../server/src/core/validators";
import type { KnownSymbols } from "../server/src/core/types";

// ─── Shared service — loaded once ────────────────────────────────────────────

let service: PrototypeService;

beforeAll(async () => {
	service = new PrototypeService();
	await service.ready;
});

// ─── Derived maps — computed lazily after service is ready ───────────────────

type Diagnostic = { severity: number; range: any; message: string; [key: string]: any };

function buildKnownSymbols(): KnownSymbols {
	return {
		functions: new Set(service.getAllNames()),
		variables: new Set(),
		defines: new Set(),
	};
}

function buildSignatureMap(): FunctionSignatureMap {
	const map: FunctionSignatureMap = new Map();
	for (const name of service.getAllNames()) {
		const overloads = service.getPrototypes(name);
		map.set(name, overloads.map(o => o.parameters.map(p => ({ name: p.name, type: p.type }))));
	}
	return map;
}

function buildReturnTypes(): Map<string, string> {
	const map = new Map<string, string>();
	for (const name of service.getAllNames()) {
		const overloads = service.getPrototypes(name);
		if (overloads.length > 0) {
			const allVoid = overloads.every(o => o.returnType === "void");
			map.set(name, allVoid ? "void" : overloads[0].returnType);
		}
	}
	return map;
}

// ─── Validation helpers ───────────────────────────────────────────────────────

function syntaxDiags(text: string): Diagnostic[] {
	const result = parse(text);
	return result.syntaxErrors.map(err => ({
		severity: 1,
		range: {
			start: { line: err.line - 1, character: err.column },
			end: { line: err.line - 1, character: err.column + 1 },
		},
		message: err.message,
	}));
}

function validateUndeclared(text: string, knownSymbols: KnownSymbols): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) return syntaxDiags(text);
	return validateUndeclaredIdentifiers(result.tree, knownSymbols, result.conditionalLines) as Diagnostic[];
}

function validateArgs(text: string, signatures: FunctionSignatureMap, returnTypes: Map<string, string>): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) return syntaxDiags(text);
	return validateFunctionArguments(result.tree, signatures, returnTypes) as Diagnostic[];
}

function validateVoidReturns(text: string, returnTypes: Map<string, string>): Diagnostic[] {
	const result = parse(text);
	if (result.syntaxErrors.length > 0) return syntaxDiags(text);
	return validateVoidFunctionReturnValues(result.tree, returnTypes) as Diagnostic[];
}

// =============================================================================
// Suite 1 — Hover documentation generation
// =============================================================================

describe("PrototypeService hover documentation", () => {
	test("getPrototypeSignature formats signature correctly for a single-param function", () => {
		// Sin: Real Sin(Real value)
		const sig = service.getPrototypeSignature("Sin");
		expect(sig).toBeDefined();
		expect(sig).toContain("Sin(");
		expect(sig).toContain("Real");
	});

	test("getPrototypeSignature formats signature for a parameterless function", () => {
		// Get_number_of_command_arguments: Integer Get_number_of_command_arguments()
		const sig = service.getPrototypeSignature("Get_number_of_command_arguments");
		expect(sig).toBeDefined();
		expect(sig).toMatch(/Get_number_of_command_arguments\(\)/);
	});

	test("generateDocumentation includes a fenced code block with the signature", () => {
		const func = service.getPrototype("Sin");
		expect(func).toBeDefined();
		const doc = service.generateDocumentation(func!);
		expect(doc).toContain("```12dpl");
		expect(doc).toContain("Sin(");
		expect(doc).toContain("```");
	});

	test("generateDocumentation includes a Parameters section for functions with parameters", () => {
		// Exit: void Exit(Integer exit_code) — single param
		const func = service.getPrototype("Exit");
		expect(func).toBeDefined();
		const doc = service.generateDocumentation(func!);
		expect(doc).toContain("**Parameters:**");
		expect(doc).toContain("exit_code");
	});

	test("generateDocumentation omits Parameters section for parameterless functions", () => {
		// Get_number_of_command_arguments has no parameters
		const func = service.getPrototype("Get_number_of_command_arguments");
		expect(func).toBeDefined();
		const doc = service.generateDocumentation(func!);
		expect(doc).not.toContain("**Parameters:**");
	});

	test("generateDocumentation includes description text when a description is available", () => {
		// Exit has an enriched description about exiting the program
		const func = service.getPrototype("Exit");
		expect(func).toBeDefined();
		// The description should not be the fallback
		const doc = service.generateDocumentation(func!);
		expect(doc).not.toContain("No description available");
		expect(doc.length).toBeGreaterThan(50);
	});

	test("generateDocumentation falls back to 'No description available' when description is empty", () => {
		// Directly supply a FunctionData with no description to exercise the fallback path
		const func: FunctionData = {
			name: "TestFunc",
			id: 99999,
			returnType: "void",
			parameters: [{ name: "x", type: "Integer" }],
			description: "",
		};
		const doc = service.generateDocumentation(func);
		expect(doc).toContain("No description available");
	});

	test("generateOverloadDocumentation for a multi-overload function shows all signatures", () => {
		// Print has many overloads (Integer, Real, Text, void, ...)
		const overloads = service.getPrototypes("Print");
		expect(overloads.length).toBeGreaterThan(1);

		const doc = service.generateOverloadDocumentation(overloads);
		// Each overload signature should appear
		const overloadCount = overloads.length;
		expect(doc).toContain(`${overloadCount} overloads`);
		// All signatures should be in a single code block
		expect(doc).toContain("```12dpl");
		expect(doc).toContain("Print(");
	});

	test("generateOverloadDocumentation shows every overload signature in the code block", () => {
		const overloads = service.getPrototypes("Print");
		const doc = service.generateOverloadDocumentation(overloads);

		// The code block should contain one "Print(" entry per overload
		const codeBlockMatch = doc.match(/```12dpl\n([\s\S]*?)\n```/);
		expect(codeBlockMatch).not.toBeNull();
		const codeBlock = codeBlockMatch![1];
		const lines = codeBlock.trim().split("\n").filter(l => l.includes("Print("));
		expect(lines.length).toBe(overloads.length);
	});

	test("generateOverloadDocumentation for a single-overload function does not add overload count line", () => {
		// Sin has exactly one overload
		const overloads = service.getPrototypes("Sin");
		expect(overloads.length).toBe(1);

		const doc = service.generateOverloadDocumentation(overloads);
		expect(doc).not.toContain("overloads");
	});

	test("generateOverloadDocumentation for a multi-overload function includes a description when available", () => {
		// Exit has enriched description and 2 overloads (Integer and Text exit_code)
		const overloads = service.getPrototypes("Exit");
		expect(overloads.length).toBeGreaterThan(1);
		const doc = service.generateOverloadDocumentation(overloads);
		// Should not fall back to "No description available"
		expect(doc).not.toContain("No description available");
	});
});

// =============================================================================
// Suite 2 — Prototype-aware undeclared symbol validation
// =============================================================================

describe("Prototype-aware undeclared symbol validation", () => {
	test("calling a built-in prototype function is NOT flagged when knownSymbols contains prototype names", () => {
		const code = `
void main()
{
	Real x;
	Real result;
	result = Sin(x);
}
`;
		const diagnostics = validateUndeclared(code, buildKnownSymbols());
		const undeclaredSin = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(undeclaredSin.length).toBe(0);
	});

	test("calling a built-in prototype function IS flagged when knownSymbols is empty", () => {
		const code = `
void main()
{
	Real x;
	Real result;
	result = Sin(x);
}
`;
		const emptySymbols: KnownSymbols = {
			functions: new Set(),
			variables: new Set(),
			defines: new Set(),
		};
		const diagnostics = validateUndeclared(code, emptySymbols);
		const undeclaredSin = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(undeclaredSin.length).toBeGreaterThan(0);
	});

	test("calling a genuinely unknown function IS flagged even when prototype names are in knownSymbols", () => {
		const code = `
void main()
{
	SomeFunctionThatDefinitelyDoesNotExistInPrototypes();
}
`;
		const diagnostics = validateUndeclared(code, buildKnownSymbols());
		const unknownCall = diagnostics.filter(d =>
			d.message.toLowerCase().includes("somefunctionthatdefinitelydoesnotexistinprototypes")
		);
		expect(unknownCall.length).toBeGreaterThan(0);
	});

	test("multiple prototype calls in a single function are none flagged", () => {
		const code = `
void main()
{
	Real angle;
	Real s;
	Real c;
	s = Sin(angle);
	c = Cos(angle);
}
`;
		const diagnostics = validateUndeclared(code, buildKnownSymbols());
		const protoRelated = diagnostics.filter(d =>
			d.message.toLowerCase().includes("sin") ||
			d.message.toLowerCase().includes("cos")
		);
		expect(protoRelated.length).toBe(0);
	});

	test("Print (void, multi-overload) is not flagged as undeclared", () => {
		const code = `
void main()
{
	Integer i;
	Print(i);
}
`;
		const diagnostics = validateUndeclared(code, buildKnownSymbols());
		const printRelated = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printRelated.length).toBe(0);
	});
});

// =============================================================================
// Suite 3 — Prototype-aware function argument validation
// =============================================================================

describe("Prototype-aware function argument validation", () => {
	test("Sin(Real) with a Real argument produces no diagnostic", () => {
		const code = `
void main()
{
	Real x;
	Real result;
	result = Sin(x);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const sinDiags = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(sinDiags.length).toBe(0);
	});

	test("Sin(Real) with a Text argument produces a type mismatch diagnostic", () => {
		const code = `
void main()
{
	Text t;
	Real result;
	result = Sin(t);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const sinDiags = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(sinDiags.length).toBe(1);
		expect(sinDiags[0].message).toContain("mismatch");
	});

	test("Sin(Real) called with wrong argument count produces an argument count diagnostic", () => {
		const code = `
void main()
{
	Real x;
	Real y;
	Sin(x, y);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const sinDiags = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(sinDiags.length).toBe(1);
		expect(sinDiags[0].message).toContain("expects");
	});

	test("Print called with an Integer argument matches the Integer overload — no diagnostic", () => {
		const code = `
void main()
{
	Integer i;
	Print(i);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBe(0);
	});

	test("Print called with a Real argument matches the Real overload — no diagnostic", () => {
		const code = `
void main()
{
	Real r;
	Print(r);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBe(0);
	});

	test("Print called with a Text argument matches the Text overload — no diagnostic", () => {
		const code = `
void main()
{
	Text msg;
	Print(msg);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBe(0);
	});

	test("Print called with a type not matching any overload produces a type mismatch diagnostic", () => {
		// Panel is not accepted by any Print overload (Integer, Real, Text, Uid, Integer64, Guid, Attribute_Blob)
		const code = `
void main()
{
	Panel p;
	Print(p);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBe(1);
		expect(printDiags[0].message).toContain("mismatch");
	});

	test("Exit(Integer) with an Integer argument produces no diagnostic", () => {
		const code = `
void main()
{
	Integer code;
	Exit(code);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const exitDiags = diagnostics.filter(d => d.message.toLowerCase().includes("exit"));
		expect(exitDiags.length).toBe(0);
	});

	test("Absolute called with Real matches the Real overload — no diagnostic", () => {
		// Absolute has overloads for both Real and Integer
		const code = `
void main()
{
	Real val;
	Real result;
	result = Absolute(val);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const absDiags = diagnostics.filter(d => d.message.toLowerCase().includes("absolute"));
		expect(absDiags.length).toBe(0);
	});

	test("Integer is promotable to Real — calling Sin with Integer arg produces no diagnostic", () => {
		// Integer can be used where Real is expected
		const code = `
void main()
{
	Integer i;
	Real result;
	result = Sin(i);
}
`;
		const diagnostics = validateArgs(code, buildSignatureMap(), buildReturnTypes());
		const sinDiags = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(sinDiags.length).toBe(0);
	});
});

// =============================================================================
// Suite 4 — Prototype-aware void return value validation
// =============================================================================

describe("Prototype-aware void return value validation", () => {
	test("using Print (void) result in an assignment produces a diagnostic", () => {
		// Print returns void — assigning its result is invalid
		const code = `
void main()
{
	Integer i;
	Integer result;
	result = Print(i);
}
`;
		const diagnostics = validateVoidReturns(code, buildReturnTypes());
		expect(diagnostics.length).toBeGreaterThan(0);
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBeGreaterThan(0);
	});

	test("using Print (void) result in an if condition produces a diagnostic", () => {
		const code = `
void main()
{
	Integer i;
	if (Print(i) == 0)
	{
	}
}
`;
		const diagnostics = validateVoidReturns(code, buildReturnTypes());
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBeGreaterThan(0);
	});

	test("calling Print (void) as a standalone statement produces no diagnostic", () => {
		// A standalone call is fine — no void return used in an expression
		const code = `
void main()
{
	Integer i;
	Print(i);
}
`;
		const diagnostics = validateVoidReturns(code, buildReturnTypes());
		const printDiags = diagnostics.filter(d => d.message.toLowerCase().includes("print"));
		expect(printDiags.length).toBe(0);
	});

	test("using Sin (non-void, Real) result in an expression produces no diagnostic", () => {
		const code = `
void main()
{
	Real x;
	Real result;
	result = Sin(x);
}
`;
		const diagnostics = validateVoidReturns(code, buildReturnTypes());
		const sinDiags = diagnostics.filter(d => d.message.toLowerCase().includes("sin"));
		expect(sinDiags.length).toBe(0);
	});

	test("all Print overloads are recognised as void in the return types map", () => {
		const returnTypes = buildReturnTypes();
		// Print is void for ALL overloads — the map should mark it as void
		expect(returnTypes.get("Print")).toBe("void");
	});

	test("Sin is recognised as non-void in the return types map", () => {
		const returnTypes = buildReturnTypes();
		expect(returnTypes.get("Sin")).not.toBe("void");
		expect(returnTypes.get("Sin")).toBe("Real");
	});

	test("Exit is recognised as void in the return types map", () => {
		const returnTypes = buildReturnTypes();
		expect(returnTypes.get("Exit")).toBe("void");
	});
});
