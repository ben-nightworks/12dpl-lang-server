# Contributing & Developer Guide

This document contains developer-focused information for working on the 12dPL language server: build instructions, tests, architecture, prototype generation and troubleshooting.

If you're a user looking for quick usage instructions, see `README.md`.

## Development Brief

- Inputs: TypeScript source under `server/src` and `client/src`; resource files in `server/src/resources/`.
- Outputs: Compiled JavaScript under `server/out` and the VS Code extension package in `client/out`.
- Success: Project compiles, unit tests pass, and the extension runs in a VS Code test window (F5).
- Errors: Type errors from tsc, failing tests, missing resource files (prototypes JSON), ANTLR parse errors.

## Project Layout

Key folders:

- `client/` — VS Code extension source (entry: `client/src/extension.ts`)
- `server/` — language server source (entry: `server/src/server.ts`)
- `server/src/resources/` — JSON resources used at runtime (`functions.enriched.json`, `functions.compiler.json`)
- `tests/` — unit/integration tests run under Bun

See individual modules under `server/src/providers/` for completion, hover and formatting logic.

## Build

We use Bun for package management and scripts.

Install deps and compile:

```bash
# Install
bun install

# Compile TypeScript
bun run compile

# Watch mode for development (recompiles on change)
bun run watch
```

If you see missing runtime resources at startup, ensure `server/src/resources/functions.enriched.json` and `server/src/resources/functions.compiler.json` are present and listed in the build output (check `server/out/`).

## Tests

Run fast local tests:

```bash
bun run test
```

Run all checks (typecheck + tests):

```bash
bun run test:all
```

Notes:

- The `tests/` directory contains unit and small integration tests that use fixtures in `client/testFixture/` (.4dm files).
- Full integration or UI tests that exercise the VS Code extension require the VS Code test harness and network access to download a test VS Code; these are not included in the fast test target.

## Architecture Notes

High level flows:

- Prototype loading: on server initialization, prototypes loader reads both JSON resources, merges them and caches CompletionItem arrays.
- Completion: `server/src/providers/completionProvider.ts` combines keywords, loaded prototypes and document/local symbols. Trigger characters include `.` and `#`.
- Validation: `server/src/validator.ts` performs ANTLR-based parsing and produces diagnostics with line/column accuracy.

Important modules:

- `server/src/prototypes.ts` — loader and signature generation
- `server/src/providers/completionProvider.ts` — completion logic
- `server/src/providers/hoverProvider.ts` — hover documentation
- `server/src/validator.ts` — parsing and diagnostics


### Project Structure

```
12dpl-lang-server/
├── client/                    # VS Code Extension
│   ├── src/
│   │   └── extension.ts      # Extension entry point
│   └── testFixture/          # Test fixture files (.4dm / .h)
│       ├── variable_redeclaration.4dm
│       ├── function_redeclaration.4dm
│       ├── undeclared_symbols.4dm
│       ├── function_arguments.4dm
│       ├── return_values.4dm
│       ├── void_return_usage.4dm
│       ├── deprecated_calls.4dm
│       ├── array_size.4dm
│       ├── include_resolution.4dm
│       ├── symbol_extraction.4dm
│       ├── syntax_patterns.4dm
│       ├── regression_tests.4dm
│       └── realworld_smoke_test.4dm
│
├── server/                    # Language Server
│   ├── src/
│   │   ├── resources/
│   │   │   ├── functions.enriched.json # PDF-extracted docs (best descriptions)
│   │   │   └── functions.compiler.json # Compiler-extracted list (full set / overloads)
│   │   ├── antlr/             # ANTLR parser files
│   │   ├── providers/         # LSP feature providers (completion/hover/formatting)
│   │   ├── server.ts          # LSP wiring + provider registration
│   │   └── ...
│   └── out/                   # Compiled output
│
├── syntax/                    # Syntax Highlighting
│   └── 12dpl.tmLanguage.json
│
└── README.md                  # Consolidated documentation
```


#### Prototype Loading Flow

```
1. Server Initialization
	 ↓
2. onInitialized() triggered
	 ↓
3. prototypesLoader.load()
	 - Reads functions.enriched.json + functions.compiler.json from resources/
	 - Merges by function name (prefer enriched descriptions)
	 - Preserves overload variants (multiple signatures per name)
	 - Builds CompletionItem array
	 ↓
4. Prototypes cached in memory
	 - Ready for auto-completion
	 - Available for validation
```

#### Auto-Completion Flow

```
User types "Sin"
	 ↓
connection.onCompletion() triggered
	 ↓
Combine results:
	- Keywords (if, while, for, etc.)
	- Prototypes (Sin, Cos, Tan, etc. from XML)
	 ↓
Return CompletionItem[] array
	 ↓
User sees suggestions with:
	- Function name
	- Return type
	- Parameter list
	- Documentation on hover
```


## Troubleshooting

Prototypes not loading or missing completions:

- Confirm `server/src/resources/functions.enriched.json` and `functions.compiler.json` exist.
- Ensure they are copied/compiled to the `server/out/` directory by the build.
- Check the Language Server Output channel in VS Code (F1 → "Show Language Server Output") for loader errors.

Type errors / build failures:

- Run `bun run compile` and inspect `tsc` output. Fix types or add missing exports/imports.

Completions don't show up in VS Code:

- Confirm the extension is running in the test host (F5 launched window).
- Open Developer Tools (Help → Toggle Developer Tools) and check console for errors thrown by the extension.


## Prototypes (built-in function list)

The language server loads built-in function prototypes from two runtime JSON files in `server/src/resources/`:

- `functions.enriched.json` — user-friendly descriptions extracted from documentation (preferred for hover text)
- `functions.compiler.json` — compiler-extracted list of functions and overloads (full set)

At runtime the server merges these sources so completions include overloads while hover prefers enriched descriptions.

Source artifacts and regeneration:

- Raw compiler outputs and processing scripts are in `compiler/prototypes/`:
	- `compiler_prototypes.xml`
	- `compiler_prototypes_list.txt`

## Screenshots & GIFs (developer notes)

Store GIFs and screenshots under  `docs/gifs/` or `docs/images`. Use small GIFs (5–10s) and optimize size for GitHub.

Suggested naming:

- `images/completion.gif`
- `images/goto_definition.gif`
- `images/formatting.gif`

Add or update the `README.md` image links to reference committed assets.

## Future Enhancement Opportunities

#### Near Term
- ✅ Context-aware completions
- [ ] Parameter hints
- ✅ Go-to-definition support
- [ ] Find references

#### Medium Term
- ✅ Custom library support
- [ ] Symbol documentation panel
- [ ] Code formatting (partially done)
- [ ] Workspace symbol search

#### Long Term
- [ ] Incremental parsing
- [ ] Background analysis
- [ ] Custom diagnostics
- [ ] Debug support

## Contact / Author

Maintainer: Ben Olsen (ben@nightworks.dev)

Main Contributor: Kamal Jarada

---

Thanks for contributing — pull requests, issues and documentation improvements are welcome.

