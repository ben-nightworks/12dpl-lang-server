import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { collectWorkspaceFiles } from "../server/src/services/workspaceScan";
import { DiagnosticService } from "../server/src/services/diagnosticService";
import { DocumentService } from "../server/src/services/documentService";
import { IncludeService } from "../server/src/services/includeService";
import { PrototypeService } from "../server/src/services/prototypeService";
import { canonicalizeFsPath, fileUriToFsPath, fsPathToFileUri } from "../server/src/services/includeUtils";

// ─── collectWorkspaceFiles ──────────────────────────────────────────────────

describe("collectWorkspaceFiles", () => {
	let tmpDir: string;

	beforeAll(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ws-scan-"));
	});

	afterAll(() => {
		fs.rmSync(tmpDir, { recursive: true, force: true });
	});

	test("collects .4dm files from nested directories", () => {
		const dir = path.join(tmpDir, "nested");
		fs.mkdirSync(path.join(dir, "sub"), { recursive: true });
		fs.writeFileSync(path.join(dir, "a.4dm"), "");
		fs.writeFileSync(path.join(dir, "sub", "b.4dm"), "");
		fs.writeFileSync(path.join(dir, "c.h"), ""); // Not collected

		const files = collectWorkspaceFiles(dir);
		expect(files.length).toBe(2);
		expect(files.some(f => f.endsWith("a.4dm"))).toBe(true);
		expect(files.some(f => f.endsWith("b.4dm"))).toBe(true);
	});

	test("respects maxFiles limit", () => {
		const dir = path.join(tmpDir, "limit");
		fs.mkdirSync(dir, { recursive: true });
		for (let i = 0; i < 15; i++) {
			fs.writeFileSync(path.join(dir, `file${i}.4dm`), "");
		}

		const files = collectWorkspaceFiles(dir, 5);
		expect(files.length).toBe(5);
	});

	test("skips node_modules, .git, out, .vscode directories", () => {
		const dir = path.join(tmpDir, "skip");
		for (const skip of ["node_modules", ".git", "out", ".vscode"]) {
			fs.mkdirSync(path.join(dir, skip), { recursive: true });
			fs.writeFileSync(path.join(dir, skip, "skip.4dm"), "");
		}
		fs.mkdirSync(path.join(dir, "src"), { recursive: true });
		fs.writeFileSync(path.join(dir, "src", "keep.4dm"), "");

		const files = collectWorkspaceFiles(dir);
		expect(files.length).toBe(1);
		expect(files[0]).toContain("keep.4dm");
	});

	test("returns empty array for non-existent directory", () => {
		const files = collectWorkspaceFiles(path.join(tmpDir, "does-not-exist"));
		expect(files.length).toBe(0);
	});

	test("maxFiles=0 returns empty array", () => {
		const dir = path.join(tmpDir, "nested");
		const files = collectWorkspaceFiles(dir, 0);
		expect(files.length).toBe(0);
	});
});

describe("file URI conversion", () => {
	test("round-trips a relative path on the current platform", () => {
		const fsPath = path.join(tmpDirRoot(), "uri-roundtrip", "sample.4dm");
		const uri = fsPathToFileUri(fsPath);
		const roundTripped = fileUriToFsPath(uri);
		expect(canonicalizeFsPath(roundTripped ?? "")).toBe(canonicalizeFsPath(path.resolve(fsPath)));
	});

	test("parses VS Code style Windows file URIs", () => {
		if (process.platform !== "win32") {
			expect(true).toBe(true);
			return;
		}

		const fsPath = fileUriToFsPath("file:///c%3A/Users/test/folder/file.4dm");
		expect(fsPath).toBe(path.normalize("c:/Users/test/folder/file.4dm"));
	});

	test("emits VS Code style Windows file URIs", () => {
		if (process.platform !== "win32") {
			expect(true).toBe(true);
			return;
		}

		const uri = fsPathToFileUri("c:/Users/test/folder/file.4dm");
		expect(uri).toBe("file:///c%3A/Users/test/folder/file.4dm");
	});
});

function tmpDirRoot(): string {
	return path.join(os.tmpdir(), "ws-scan-tests");
}

// ─── DiagnosticService.validateFsFile ───────────────────────────────────────

describe("DiagnosticService.validateFsFile", () => {
	let tmpDir: string;

	beforeAll(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "diag-fs-"));
	});

	afterAll(() => {
		fs.rmSync(tmpDir, { recursive: true, force: true });
	});

	// Build a minimal service stack with a real DocumentService (no open docs)
	// and a PrototypeService (unloaded, so no built-ins — tests are self-contained).
	function createServices() {
		// TextDocuments mock — no open documents
		const documents: any = {
			all: () => [],
			get: () => undefined,
		};
		const documentService = new DocumentService(documents);
		const prototypeService = new PrototypeService();
		const includeService = new IncludeService(documentService, documents, async () => []);
		const diagnosticService = new DiagnosticService(documentService, includeService, prototypeService);
		return { diagnosticService, documentService };
	}

	test("returns syntax errors for invalid file", async () => {
		const { diagnosticService } = createServices();
		const text = `void foo( { }`;
		const diags = await diagnosticService.validateFsFile(
			path.join(tmpDir, "bad.4dm"), text, []
		);
		expect(diags.length).toBeGreaterThan(0);
		expect(diags.some(d => d.severity === 1)).toBe(true); // Error severity
	});

	test("returns no errors for valid file", async () => {
		const { diagnosticService } = createServices();
		const text = `void main()\n{\n  Integer x = 1;\n}\n`;
		const diags = await diagnosticService.validateFsFile(
			path.join(tmpDir, "good.4dm"), text, []
		);
		// Should have no syntax errors (may have undeclared identifier warnings
		// for 'Integer' since prototypes are not loaded — that's expected)
		const syntaxErrors = diags.filter(d => d.severity === 1); // Error severity
		expect(syntaxErrors.length).toBe(0);
	});

	test("resolves symbols from include files", async () => {
		const { diagnosticService } = createServices();

		// Write a header file with a function declaration
		const headerPath = path.join(tmpDir, "funcs.h");
		fs.writeFileSync(headerPath, `void helper_func()\n{\n}\n`);

		// Main file includes the header and calls the function
		const mainPath = path.join(tmpDir, "main.4dm");
		const mainText = `#include "funcs.h"\nvoid main()\n{\n  helper_func();\n}\n`;

		const diags = await diagnosticService.validateFsFile(mainPath, mainText, []);

		// helper_func should be recognized from the include — no "undeclared" error for it
		const undeclaredHelperFunc = diags.filter(d =>
			d.message.toLowerCase().includes("undeclared") &&
			d.message.toLowerCase().includes("helper_func")
		);
		expect(undeclaredHelperFunc.length).toBe(0);
	});

	test("validateFsFile handles complex code without crashing", async () => {
		// Use a real PrototypeService that has loaded the built-in prototypes
		const documents: any = {
			all: () => [],
			get: () => undefined,
		};
		const documentService = new DocumentService(documents);
		const prototypeService = new PrototypeService();
		const includeService = new IncludeService(documentService, documents, async () => []);
		const diagnosticService = new DiagnosticService(documentService, includeService, prototypeService);

		// Wait for prototypes to load
		await prototypeService.ready;

		const text = `
void helper() { }
void main()
{
  Integer x;
  Integer y = 42;
  if (x > 0) {
    helper();
    x = y + 1;
  }
  for (Integer i = 0; i < 10; i = i + 1) {
    x = x + i;
  }
}
`;
		const diags = await diagnosticService.validateFsFile(
			path.join(tmpDir, "complex.4dm"), text, []
		);

		// Should not crash and should handle the complex code
		expect(diags.length).toBeGreaterThanOrEqual(0);
	});

	test("header file with many symbols does not crash", async () => {
		const { diagnosticService } = createServices();

		// Generate a large header with 500 function declarations
		const lines: string[] = [];
		for (let i = 0; i < 500; i++) {
			lines.push(`void large_func_${i}()\n{\n}\n`);
		}
		const headerPath = path.join(tmpDir, "large.h");
		fs.writeFileSync(headerPath, lines.join("\n"));

		const mainPath = path.join(tmpDir, "large_main.4dm");
		const mainText = `#include "large.h"\nvoid main()\n{\n  large_func_0();\n  large_func_499();\n}\n`;

		const diags = await diagnosticService.validateFsFile(mainPath, mainText, []);

		// large_func_0 and large_func_499 should be recognized
		const undeclaredLargeFunc = diags.filter(d =>
			d.message.toLowerCase().includes("undeclared") &&
			(d.message.toLowerCase().includes("large_func_0") || d.message.toLowerCase().includes("large_func_499"))
		);
		expect(undeclaredLargeFunc.length).toBe(0);
	});
});

// ─── Header dependency tracking ────────────────────────────────────────────

describe("DocumentService dependency tracking", () => {
	function createDocumentService() {
		const documents: any = {
			all: () => [],
			get: () => undefined,
		};
		return new DocumentService(documents);
	}

	test("invalidateHeader returns dependent document URIs", () => {
		const ds = createDocumentService();

		ds.registerDependency("file:///project/main.4dm", "/project/header.h");
		ds.registerDependency("file:///project/other.4dm", "/project/header.h");

		const deps = ds.invalidateHeader("/project/header.h");
		expect(deps.length).toBe(2);
		expect(deps).toContain("file:///project/main.4dm");
		expect(deps).toContain("file:///project/other.4dm");
	});

	test("clearDependencies removes document from dependents", () => {
		const ds = createDocumentService();

		ds.registerDependency("file:///project/main.4dm", "/project/header.h");
		ds.registerDependency("file:///project/other.4dm", "/project/header.h");

		ds.clearDependencies("file:///project/main.4dm");

		const deps = ds.invalidateHeader("/project/header.h");
		expect(deps.length).toBe(1);
		expect(deps).toContain("file:///project/other.4dm");
	});

	test("invalidateHeader returns empty for untracked headers", () => {
		const ds = createDocumentService();
		const deps = ds.invalidateHeader("/project/unknown.h");
		expect(deps.length).toBe(0);
	});
});
