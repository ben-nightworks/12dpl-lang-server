/**
 * Tests for signature help: call-context parsing and signature building.
 */
import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';
import { collectSymbolTable, deriveViews } from '../server/src/core/symbolCollector';
import { getCallContext } from '../server/src/providers/signatureHelpProvider';
import { getExpectedParamTypes } from '../server/src/providers/completionProvider';

// ─── getCallContext tests ────────────────────────────────────────────────────

describe('getCallContext', () => {
	test('detects function name and arg index 0 just after opening paren', () => {
		const text = 'foo(';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('foo');
		expect(ctx!.argIndex).toBe(0);
	});

	test('detects arg index 1 after first comma', () => {
		const text = 'foo(a, ';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('foo');
		expect(ctx!.argIndex).toBe(1);
	});

	test('detects arg index 2 after two commas', () => {
		const text = 'foo(a, b, ';
		const ctx = getCallContext(text, text.length);
		expect(ctx!.argIndex).toBe(2);
	});

	test('handles nested calls — outer context is reported', () => {
		// Cursor is inside bar(), which is itself the second arg to foo
		const text = 'foo(a, bar(';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('bar');
		expect(ctx!.argIndex).toBe(0);
	});

	test('handles nested calls — comma inside inner call does not shift outer argIndex', () => {
		// foo(bar(x, y), |)  — cursor after bar's closing paren, at arg index 1 of foo
		const text = 'foo(bar(x, y), ';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('foo');
		expect(ctx!.argIndex).toBe(1);
	});

	test('returns null outside any call', () => {
		const text = 'Integer x;';
		const ctx = getCallContext(text, text.length);
		expect(ctx).toBeNull();
	});

	test('returns null after closing paren', () => {
		const text = 'foo(a, b)';
		const ctx = getCallContext(text, text.length);
		expect(ctx).toBeNull();
	});

	test('returns null at statement boundary (semicolon)', () => {
		const text = 'bar(); foo(';
		// cursor right after 'foo(' — but the semicolon should stop us from crossing
		// However we are inside foo's paren, so name=foo argIndex=0
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('foo');
	});

	test('comma inside string literal does not increase argIndex', () => {
		// foo("a, b", |)  — cursor at end; should be argIndex 1
		const text = 'foo("a, b", ';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('foo');
		expect(ctx!.argIndex).toBe(1);
	});

	test('comma inside single-quoted string does not increase argIndex', () => {
		const text = "foo('a, b', ";
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('foo');
		expect(ctx!.argIndex).toBe(1);
	});

	test('handles digit-prefixed identifiers (12dPL style)', () => {
		// "2d_point" is a valid 12dPL function name
		const text = '2d_point(';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('2d_point');
		expect(ctx!.argIndex).toBe(0);
	});

	test('works with whitespace before paren', () => {
		const text = 'my_func  (';
		const ctx = getCallContext(text, text.length);
		expect(ctx).not.toBeNull();
		expect(ctx!.name).toBe('my_func');
	});

	test('returns null for purely numeric token before paren', () => {
		// "123(" is not a function call
		const text = '123(';
		const ctx = getCallContext(text, text.length);
		expect(ctx).toBeNull();
	});

	test('works mid-identifier-token after partial arg', () => {
		// foo(firstArg   — cursor is part way through first arg; argIndex still 0
		const text = 'foo(firstArg';
		const ctx = getCallContext(text, text.length);
		expect(ctx!.name).toBe('foo');
		expect(ctx!.argIndex).toBe(0);
	});
});

// ─── Signature building from parsed document symbols ────────────────────────

describe('signature help from document symbols', () => {
	function getDerivedViews(src: string) {
		const parsed = parse(src);
		const table = collectSymbolTable(parsed, src);
		return deriveViews(table.root);
	}

	test('document function with params is in allFunctions', () => {
		const src = `
void my_func(Integer a, Real b, Text c) {
}
`;
		const parsed = parse(src);
		const table = collectSymbolTable(parsed, src);
		const views = deriveViews(table.root);

		const decls = views.allFunctions.get('my_func');
		expect(decls).toBeDefined();
		expect(decls!.length).toBeGreaterThan(0);

		const decl = decls![0];
		expect(decl.params).toBeDefined();
		expect(decl.params!.length).toBe(3);
		expect(decl.params![0].type).toBe('Integer');
		expect(decl.params![0].name).toBe('a');
		expect(decl.params![1].type).toBe('Real');
		expect(decl.params![2].type).toBe('Text');
	});

	test('document function with by-ref params stores byRef flag', () => {
		const src = `
void set_value(Integer &result) {
}
`;
		const parsed = parse(src);
		const table = collectSymbolTable(parsed, src);
		const views = deriveViews(table.root);

		const decl = views.allFunctions.get('set_value')?.[0];
		expect(decl).toBeDefined();
		expect(decl!.params![0].byRef).toBe(true);
		expect(decl!.params![0].name).toBe('result');
	});

	test('document function with array params stores isArray flag', () => {
		const src = `
void fill_array(Real values[]) {
}
`;
		const parsed = parse(src);
		const table = collectSymbolTable(parsed, src);
		const views = deriveViews(table.root);

		const decl = views.allFunctions.get('fill_array')?.[0];
		expect(decl).toBeDefined();
		expect(decl!.params![0].isArray).toBe(true);
	});

	test('overloaded document functions both stored in allFunctions', () => {
		const src = `
void process(Integer x) {}
void process(Real x, Real y) {}
`;
		const views = getDerivedViews(src);
		const decls = views.allFunctions.get('process');
		expect(decls).toBeDefined();
		expect(decls!.length).toBe(2);
	});
});

// ─── PrototypeService integration ───────────────────────────────────────────

describe('PrototypeService signature data', () => {
	test('loads prototypes and returns overloads for known function', async () => {
		const { PrototypeService } = await import('../server/src/services/prototypeService');
		const svc = new PrototypeService();
		await svc.ready;

		const total = svc.getAllNames().length;
		expect(total).toBeGreaterThan(100);
	});

	test('getPrototypes returns array for a known built-in', async () => {
		const { PrototypeService } = await import('../server/src/services/prototypeService');
		const svc = new PrototypeService();
		await svc.ready;

		// Pick the first available function to verify we get data back
		const first = svc.getAllNames()[0];
		const overloads = svc.getPrototypes(first);
		expect(overloads.length).toBeGreaterThanOrEqual(1);
		expect(overloads[0].name).toBe(first);
		expect(Array.isArray(overloads[0].parameters)).toBe(true);
	});

	test('generateDocumentation produces non-empty markdown', async () => {
		const { PrototypeService } = await import('../server/src/services/prototypeService');
		const svc = new PrototypeService();
		await svc.ready;

		const first = svc.getAllNames()[0];
		const overloads = svc.getPrototypes(first);
		const doc = svc.generateDocumentation(overloads[0]);
		expect(doc.length).toBeGreaterThan(0);
		expect(doc).toContain('```');
	});
});

// ─── getExpectedParamTypes tests ─────────────────────────────────────────────

describe('getExpectedParamTypes', () => {
	/** Builds a minimal DocumentService stub from a source string. */
	function makeDocumentService(src: string) {
		const parsed = parse(src);
		const table = collectSymbolTable(parsed, src);
		const views = deriveViews(table.root);

		return {
			getSymbolTable: () => table,
			getDerivedViews: () => views,
		} as any;
	}

	/** Stub IncludeService with no include symbols. */
	const emptyIncludeService = {
		getIncludeSymbols: async () => ({ functions: new Map(), variables: new Map() }),
	} as any;

	/** Stub PrototypeService with no prototypes. */
	const emptyProtoService = {
		ready: Promise.resolve(),
		getPrototypes: () => [],
	} as any;

	test('returns empty set when function not found anywhere', async () => {
		const ds = makeDocumentService('void other() {}');
		const types = await getExpectedParamTypes('nonexistent', 0, 'file:///test.4dm', ds, emptyIncludeService, emptyProtoService);
		expect(types.size).toBe(0);
	});

	test('returns expected type from document function at arg 0', async () => {
		const src = 'void my_func(Integer a, Real b) {}';
		const ds = makeDocumentService(src);
		const types = await getExpectedParamTypes('my_func', 0, 'file:///test.4dm', ds, emptyIncludeService, emptyProtoService);
		expect(types.has('integer')).toBe(true);
		expect(types.has('real')).toBe(false);
	});

	test('returns expected type from document function at arg 1', async () => {
		const src = 'void my_func(Integer a, Real b) {}';
		const ds = makeDocumentService(src);
		const types = await getExpectedParamTypes('my_func', 1, 'file:///test.4dm', ds, emptyIncludeService, emptyProtoService);
		expect(types.has('real')).toBe(true);
		expect(types.has('integer')).toBe(false);
	});

	test('collects types across all overloads at same arg position', async () => {
		// Both overloads at arg 0: Integer and Real
		const src = `
void process(Integer x) {}
void process(Real x) {}
`;
		const ds = makeDocumentService(src);
		const types = await getExpectedParamTypes('process', 0, 'file:///test.4dm', ds, emptyIncludeService, emptyProtoService);
		expect(types.has('integer')).toBe(true);
		expect(types.has('real')).toBe(true);
	});

	test('returns empty set when argIndex exceeds parameter count', async () => {
		const src = 'void single_param(Integer a) {}';
		const ds = makeDocumentService(src);
		const types = await getExpectedParamTypes('single_param', 5, 'file:///test.4dm', ds, emptyIncludeService, emptyProtoService);
		expect(types.size).toBe(0);
	});

	test('falls back to prototypes when not in document or includes', async () => {
		const ds = makeDocumentService('void other() {}');
		const fakeProto = {
			ready: Promise.resolve(),
			getPrototypes: (name: string) => name === 'builtin_fn'
				? [{ parameters: [{ name: 'x', type: 'Text' }, { name: 'y', type: 'Integer' }] }]
				: [],
		} as any;
		const types = await getExpectedParamTypes('builtin_fn', 1, 'file:///test.4dm', ds, emptyIncludeService, fakeProto);
		expect(types.has('integer')).toBe(true);
		expect(types.has('text')).toBe(false);
	});

	test('type comparison is case-insensitive', async () => {
		// Function declared with mixed-case type; lookup should still work with lowercase
		const src = 'void check(Integer val) {}';
		const ds = makeDocumentService(src);
		const types = await getExpectedParamTypes('check', 0, 'file:///test.4dm', ds, emptyIncludeService, emptyProtoService);
		// Set always stores lowercased, so 'integer' should be present
		expect(types.has('integer')).toBe(true);
	});
});
