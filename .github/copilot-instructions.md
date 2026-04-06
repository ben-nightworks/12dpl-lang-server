# Copilot Instructions — 12dPL Language Server

## Project Overview

This is a **VS Code Language Server Protocol (LSP) extension** for **12dPL**, the C-like scripting language used by [12d Model](https://www.12d.com/) civil engineering software. It provides syntax highlighting, code completion, real-time validation, hover documentation, go-to-definition, and formatting for `.4dm` (source) and `.h` (header/include) files.

- **Publisher:** nightworks
- **Language ID:** `12dpl`
- **File extensions:** `.4dm` (source), `.h` (headers), `.4do` (compiled output), `.mtfsnippet` (MTF snippets)
- **License:** GPL-3.0-only

## Architecture

All code changes should work towards the architecture defined in ARCHITECTURE.md.

### Client–Server Split

The project follows standard LSP architecture with two packages:

| Component | Entry Point | Output | Purpose |
|-----------|-------------|--------|---------|
| **Client** | `client/src/extension.ts` | `client/out/` | VS Code extension host — registers commands, starts the language server |
| **Server** | `server/src/server.ts` | `server/out/` | Language server process — parsing, validation, completions, formatting |

Communication is over **Node IPC** (not stdio). The server is launched as a child process by the client via `vscode-languageclient`.

### Key Directories

```
client/src/              → Extension activation, compile command, format-on-save
server/src/server.ts     → LSP connection wiring, provider registration
server/src/antlr/        → ANTLR grammar, parse pipeline, validator, symbol collector
server/src/providers/    → LSP feature handlers (completion, hover, definition, formatting, includes)
server/src/util/         → Shared utilities (formatter, defines, includes, prototypes, fuzzy matching)
server/src/resources/    → Runtime JSON data (function prototypes, type documentation)
server/src/proglang12d.g4 → ANTLR4 grammar (TypeScript target)
tests/                   → Unit tests (bun:test)
client/testFixture/      → .4dm/.h fixture files used by tests and for manual testing
syntax/                  → TextMate grammars for syntax highlighting
snippets/                → VS Code snippet definitions
```

## Tech Stack & Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| **Bun** | ≥1.3 | Package manager, test runner, script executor |
| **TypeScript** | ^4.9.5 | Source language for both client and server |
| **ANTLR4** | 4.13.1 | Parser generator (TypeScript target) |
| **vscode-languageserver** | ^7.0.0 | LSP server implementation |
| **vscode-languageclient** | ^7.0.0 | LSP client implementation |
| **VS Code Engine** | ^1.74.0 | Minimum supported VS Code version |

### Build Commands

```bash
bun install              # Install all dependencies (runs postinstall for client + server)
bun run compile          # TypeScript compile (tsc -b) + copy resource files
bun run watch            # TypeScript watch mode (tsc -b -w)
bun run test             # Run unit tests (bun test tests/)
bun run test:all         # Compile + run tests
bun run lint             # ESLint on client and server sources
```

### ANTLR Grammar Regeneration

When changing `server/src/proglang12d.g4`:

```bash
cd server
java -jar antlr-4.13.1-complete.jar -Dlanguage=TypeScript -visitor -o src/antlr/src src/proglang12d.g4
```

This regenerates all files in `server/src/antlr/src/` (lexer, parser, listener, visitor, interp files). **Never hand-edit files in `server/src/antlr/src/`** — they are auto-generated.

### Resource Files

The server depends on JSON resource files in `server/src/resources/`:

- `functions.enriched.json` — Human-readable function documentation extracted from PDF docs (preferred for hover text)
- `functions.compiler.json` — Complete function prototype list from the compiler (full set with overloads)
- `typeDocumentation.json` — Documentation for built-in type names

These are copied to `server/out/resources/` at build time by `server/copy-resources.js`. If completions/hover are missing at runtime, check that these files exist in the output directory.

## 12dPL Language Characteristics

12dPL is a **C-like language** with important differences that affect how the language server works:

### Identifiers
- **Digit-prefixed identifiers allowed** — e.g., `2d_string`, `3d_point` are valid. The grammar uses `Digit+ IdentifierNondigit ...` in the `Identifier` rule.

### Type System
- ~138 built-in types defined in the grammar's `builtInTypeSpecifier` rule (e.g., `Element`, `Model`, `Tin`, `Widget`, `Panel`, `Dynamic_Element`, `Text`, `Integer`, `Real`, various `*_Box` widget types, database types, etc.)
- Types are used in declarations, function parameters, and return types

### Preprocessor
- `#include "file.h"` and `#include <file.h>` — resolved relative to the including file, then searched in configured include paths
- `#define NAME value` and `#define NAME(params) value` — function-like macros supported
- `#if` / `#ifdef` / `#ifndef` / `#else` / `#elif` / `#endif` — conditional compilation
- Preprocessor directives are stripped before ANTLR parsing; line numbers are preserved by replacing stripped lines with empty lines

### Functions
- Function overloading is supported (same name, different parameter signatures)
- Pass-by-reference parameters use `&` prefix: `void foo(Integer &result)`
- Array parameters use `[]` suffix: `void bar(Real values[])`
- Combined: `void baz(Integer &arr[])`

### Script-Level Code
- 12dPL files can contain **top-level statements** (code outside any function body), similar to a script
- The parse pipeline wraps these in synthetic `void __12dpl__script__N() { ... }` wrappers so the C-like grammar can parse them
- Generated wrapper function names are detected by the `__12dpl__` prefix and filtered from symbol lists

## Core Parse & Validation Pipeline

Understanding this pipeline is essential for working on the server:

```
Raw .4dm text
    ↓
stripConditionalDirectives()     → removes #if/#ifdef/#else/#endif, strips #if 0 dead code
    ↓
wrapTopLevelScriptsPreservingLines() → wraps script-level code in synthetic functions
    ↓
ANTLR Lexer + Parser            → parse tree
    ↓
Validator (syntax errors)        → Diagnostic[] from ANTLR error listener
    ↓
Validator (semantic: redeclarations) → only runs if 0 syntax errors
    ↓
Symbol Collector                 → functions, variables, parameters for completions/hover/goto
```

**Critical invariant:** All preprocessing transformations must preserve original line numbers. Lines are replaced with empty strings, never removed or inserted.

### Redeclaration Validator Rules

The validator uses scoped tracking with these rules:
- **Same-scope redeclaration** → Error
- **Shadowing an include-file symbol** → Error (cannot override)
- **Shadowing a global from the same file** → Warning (with line number)
- **Shadowing an outer scope variable** → Warning
- **Function overloading** (same name, different params) → Allowed
- **For-loop variables** get their own scope
- Wrapper functions (`__12dpl__script__*`) are treated as global scope; real user functions create nested scopes

## Provider Registration Pattern

All LSP feature providers follow the same pattern:

```typescript
// In server/src/providers/someProvider.ts
export function registerSomeProvider(opts: {
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    documentSymbols: DocumentSymbolStore;
    includesProvider: { getIncludeFilesForUri(uri: string): Promise<...> };
    // ... other shared services
}) {
    opts.connection.onSomeRequest((params) => {
        // implementation
    });
}
```

Providers are registered in `server.ts` after initialization. They share:
- `connection` — the LSP connection
- `documents` — the open document manager
- `documentSymbols` — cached symbol store (keyed by URI+version for open docs, mtime for disk files)
- `includesProvider` — shared include-file resolver (avoids duplicate graph traversals)

## Symbol Resolution Priority

When looking up symbols (for completion, hover, go-to-definition), the resolution order is:

1. **Document symbols** — functions/variables in the current file
2. **`#define` macros** — from the current file and its includes
3. **Include-file symbols** — functions/variables from `#include`'d files
4. **Prototypes** — 8000+ built-in 12dPL library functions
5. **Type names** — built-in type documentation
6. **Keywords** — `if`, `else`, `for`, `while`, `return`, etc.

Completion items use group priority scores: document (600) > include (590) > define (350) > keyword (200) > type (180) > prototype (160).

## Caching Strategy

The server uses multi-layer caching:
- **Open documents:** Cached by `URI + document.version`. Invalidated on content change.
- **Header files on disk:** Cached by file `mtime`. Automatically refreshed when the file changes.
- **Include file lists:** Cached per document URI+version. Cleared on content change or close.
- **Completion/hover data:** Rebuilt lazily when the cache key (URI+version) changes.
- **Prototypes:** Loaded once on server initialization, cached permanently.
- Path comparisons use `canonicalizeFsPath()` which normalizes to forward-slash lowercase for Windows compatibility.

## Testing

### Test Framework
Tests use **`bun:test`** (`describe`, `test`, `expect`). Run with `bun test tests/` or `bun run test`.

### Test Files

| Test File | What It Tests |
|-----------|---------------|
| `tests/formatter.test.ts` | Brace-based indentation, CRLF preservation, preprocessor directives, strings/comments with braces |
| `tests/fuzzyMatching.test.ts` | `fuzzyScore()` — case-insensitive subsequence matching, scoring, word boundaries |
| `tests/prototypes.test.ts` | Prototype loading, function resolution, overload support (>1000 items expected) |
| `tests/symbols.test.ts` | Symbol extraction — functions, globals, locals excluded, type/signature extraction, ranges, wrapper filtering |
| `tests/validator.test.ts` | ANTLR parse validation, redeclaration detection (11 cases), include-file conflicts, case-insensitive checks |

### Test Fixtures
Fixture `.4dm` and `.h` files live in `client/testFixture/`. Tests read these files directly (using `fs.readFileSync` with path resolution relative to the project root).

### Test Expectations
- Server tests (25): **All must pass**
- Client integration tests (2): Require the VS Code extension test host — they normally fail when run outside `vscode:test`

### Writing New Tests
- Import from `bun:test`: `import { describe, test, expect } from 'bun:test';`
- Fixtures go in `client/testFixture/`
- Path resolution: `path.resolve(__dirname, '..', 'client', 'testFixture', 'MyTest.4dm')`
- Validate that existing tests still pass after any change: `bun run test`

## Formatting

The formatter (`server/src/util/formatter.ts`) is a simple brace-based indenter:
- Tracks `{ }` depth for indentation, ignoring braces inside strings and comments
- Preprocessor lines (`#...`) always stay at column 0
- `case`/`default:` labels get reduced indentation
- Preserves the original newline style (CRLF or LF)
- Configurable indent size via `12dpl.indentSize` (default: 4)

## Compiler Integration

The extension can invoke the **cc4d.exe** compiler (Windows-only):
- Compiler path configured via `12dpl.compiler.path` setting
- Two commands: `12dpl.compile` (immediate) and `12dpl.compileWithFlags` (shows flag picker)
- Include paths from `12dpl.compiler.includePaths` are prepended to PATH
- The `.4do` output is moved to the source file's directory if needed
- Compiler version is detected by running `cc4d.exe ?` and shown in status bar tooltip

## Coding Conventions

### General
- **TypeScript strict mode** is enabled in the server
- **CommonJS modules** (`module: "commonjs"`) — use `import`/`export` syntax (transpiled by tsc)
- **ES2020** target — async/await, optional chaining, nullish coalescing are all available
- Prefer `const` over `let`; avoid `var`
- Use descriptive function and variable names

### Naming
- Files: `camelCase.ts` (e.g., `completionProvider.ts`, `parsePipeline.ts`)
- Classes: `PascalCase` (e.g., `Validator`, `PrototypesLoader`, `DocumentSymbolStore`)
- Interfaces/Types: `PascalCase` (e.g., `DeclaredVariable`, `FunctionSymbolInfo`, `IncludeFileVariable`)
- Functions: `camelCase` (e.g., `collectDocumentSymbolIndex`, `stripConditionalDirectives`)
- Constants: `camelCase` for module-level (e.g., `typeKeywords`, `prototypesLoader`)

### Error Handling
- The server catches parse errors via ANTLR's `ErrorListener` mechanism
- Semantic validation only runs when there are zero syntax errors
- Resource loading (prototypes, type docs) fails silently with console warnings if files are missing
- Include file resolution logs warnings for unresolvable paths but does not throw

### String Comparisons
- Path comparisons on Windows use `canonicalizeFsPath()` (forward-slash + lowercase)

### ANTLR Visitor Pattern
- Validators and symbol collectors extend ANTLR's generated visitor classes
- Override `visit*` methods for specific parse tree nodes
- Always call `this.visitChildren(ctx)` (or super method) to continue tree traversal
- Use `ctx.start.line` and `ctx.stop?.line` for position information (1-indexed)
- LSP diagnostics use 0-indexed lines; subtract 1 from ANTLR line numbers

## Important Gotchas

1. **Line number indexing:** ANTLR lines are 1-based; LSP positions are 0-based. Always subtract 1 when converting.

2. **Wrapper functions:** The parse pipeline wraps script-level code in `__12dpl__script__N` functions. These must be filtered from any user-visible symbol list. Use `isGeneratedWrapperFunctionName()` to detect them.

3. **`typeKeywords` set in `parsePipeline.ts`:** This must stay in sync with the grammar's `builtInTypeSpecifier` rule. Currently contains ~138 types. If you add types to the grammar, add them here too.

4. **Resource copying:** The build step runs `server/copy-resources.js` to copy `server/src/resources/*.json` to `server/out/resources/`. If you add new resource files, update this script.

5. **Include graph cycles:** The include resolver caps traversal at 500 files and de-duplicates by canonical path to prevent infinite loops.

6. **ANTLR generation output:** Generated files go to `server/src/antlr/src/`. The `-o` flag in the generate command must point there. Never edit these files directly.

7. **Test fixture paths:** Tests resolve fixtures relative to the project root. If you move test files, update path resolution accordingly.

8. **`inRealFunction` vs `inWrapperFunction`:** The symbol collector and validator track whether code is inside a user-defined function or a synthetic wrapper. Global-scope behavior (exporting symbols, allowing redeclaration checks) depends on this distinction.

## Extension Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `12dpl.compiler.path` | string | `C:\Program Files\12d\12dmodel\15.00\nt.x64\` | Path to cc4d.exe folder |
| `12dpl.compiler.includePaths` | string[] | `[]` | Additional include directories |
| `12dpl.compiler.availableFlags` | string[] | `["-p", "-proto", ...]` | Flags shown in compile picker |
| `12dpl.compiler.defaultFlags` | string[] | `[]` | Pre-selected flags (remembered per workspace) |
| `12dpl.formatOnSave` | boolean | `false` | Auto-format on save |
| `12dpl.indentSize` | number | `4` | Formatter indent width |
| `langServer.maxNumberOfProblems` | number | `100` | Max diagnostics reported |
| `langServer.trace.server` | string | `"off"` | LSP trace level (`off`/`messages`/`verbose`) |

## Git Workflow

- The default integration branch is **`dev`**, not `main`.
- All pull requests should target **`dev`** (`--base dev`).
- Feature/fix branches should be created from `dev`.

## Common Development Tasks

### Adding a new LSP feature
1. Create provider in `server/src/providers/newFeatureProvider.ts`
2. Export a `registerNewFeatureProvider(opts)` function
3. Register it in `server/src/server.ts` alongside existing providers
4. Add the capability in `onInitialize`'s `capabilities` return

### Adding a new built-in type
1. Add the type name to `builtInTypeSpecifier` in `server/src/proglang12d.g4`
2. Regenerate ANTLR files: `cd server && bun run generate-antlr`
3. Add the type (lowercased) to the `typeKeywords` Set in `server/src/antlr/parsePipeline.ts`
4. Optionally add documentation to `server/src/resources/typeDocumentation.json`

### Adding a new validation rule
1. Add the rule in `server/src/antlr/validator.ts` inside the visitor class
2. Create diagnostics with `Diagnostic.create(range, message, severity)`
3. Add test cases in `tests/validator.test.ts`
4. Ensure semantic validation still gates on zero syntax errors

### Modifying the grammar
1. Edit `server/src/proglang12d.g4`
2. Regenerate: `cd server && bun run generate-antlr`
3. Recompile: `bun run compile`
4. Run tests: `bun run test`
5. If adding new types, also update `typeKeywords` in `parsePipeline.ts`

### Adding test fixtures
1. Create `.4dm` or `.h` files in `client/testFixture/`
2. Reference them in test files with `path.resolve(__dirname, '..', 'client', 'testFixture', 'filename.4dm')`
3. Fixtures should be valid 12dPL unless specifically testing error cases

### Debugging the language server
1. Set `langServer.trace.server` to `"verbose"` in VS Code settings
2. Open the Output panel → "12dPL Language Server" channel
3. For breakpoint debugging: launch the Extension Development Host (F5) with debugger attached
4. Server debug port: `--inspect=6009`
