# Server Architecture — Proposed Design

> This document describes the target architecture for the language server (`server/src/`).
> See [ISSUES.md](ISSUES.md) for the current-state audit that motivates these changes.

## Design Goals

1. **Single source of truth for symbols** — one resolution path used by all providers
2. **Clear layered boundaries** — each layer depends only on the layer below it
3. **Testable in isolation** — every layer can be unit-tested without LSP wiring

---

## Layer Overview

```
┌─────────────────────────────────────────────────────┐
│  LSP Transport Layer              (server.ts)       │
│  Connection wiring, capability negotiation,         │
│  document lifecycle events                          │
├─────────────────────────────────────────────────────┤
│  Provider Layer                   (providers/)      │
│  Completion, Hover, Definition, Formatting          │
│  Thin adapters: translate LSP requests into         │
│  queries against the services below                 │
├─────────────────────────────────────────────────────┤
│  Service Layer                    (services/)       │
│  DocumentService    — owns the parse-once cache     │
│  SymbolResolver     — unified symbol lookup         │
│  IncludeService     — include graph resolution      │
│  PrototypeService   — built-in function metadata    │
│  DiagnosticService  — orchestrates all validators   │
├─────────────────────────────────────────────────────┤
│  Core Layer                       (core/)           │
│  ParsePipeline      — preprocess + ANTLR parse      │
│  SymbolCollector    — AST → symbol index            │
│  Validators         — redecl, undeclared, deprecated│
│  Formatter          — brace-based indentation       │
├─────────────────────────────────────────────────────┤
│  Data Layer                       (data/)           │
│  Prototypes JSON, type documentation JSON           │
│  Loaded once, immutable after init                  │
└─────────────────────────────────────────────────────┘
```

Dependency rule: each layer may only import from the layer directly below it (or from shared types). The LSP transport layer never appears in service or core imports.

---

## Layer Details

### 1. Core Layer (`server/src/core/`)

Pure functions and classes with **no LSP or I/O dependencies**. Everything here accepts plain strings or typed data structures and returns results. Fully unit-testable.

#### `ParsePipeline`

```
stripConditionalDirectives(text) → { text, conditionalLines }
wrapTopLevelScripts(text)        → transformedText
parse(text)                      → ParseResult
```

`ParseResult` is the single artifact produced from a document's text:

```ts
interface ParseResult {
  tree: ParseTree;                   // ANTLR parse tree
  tokens: CommonTokenStream;         // token stream (for deprecated-call scanning)
  transformedText: string;           // text after preprocessing
  conditionalLines: Set<number>;     // 1-based lines inside #if branches
  syntaxErrors: SyntaxError[];       // errors from ANTLR error listener
}
```

All downstream consumers receive `ParseResult` — no one re-parses.

#### `SymbolCollector`

```ts
collectSymbolTable(parseResult: ParseResult): SymbolTable
```

Extracts all named symbols from the AST in a single traversal and returns a `SymbolTable` — a scope tree that serves as the primary representation of all symbols in a document.

##### Why a scope tree instead of flat maps?

The current `DocumentSymbolIndex` is a flat `Record<string, FunctionSymbolInfo>` plus `Record<string, VariableSymbolInfo>`. It only stores globals (locals are deliberately excluded). This creates several problems:

1. **Two incompatible views of the same file.** Include files only need exported globals. The file being edited needs scope-aware locals too. The current code handles this by having `symbols.ts` collect globals only, while `validator.ts` independently rebuilds full scope structure. That's two AST walks with duplicated logic.
2. **Overloads are lost.** A plain `Record<string, T>` can only hold one entry per name.
3. **Defines are separate.** They're parsed by a regex pass (`parseDefinesFromText`) that doesn't respect `#if 0` blocks.
4. **No position-aware queries.** "What's visible at line 42?" requires scope context the flat index doesn't have.

The scope tree solves all of these: it's the single structure the collector builds, and flat lookup indexes are cheap derived views.

##### The SymbolTable

```ts
interface SymbolTable {
  /** Root scope — always kind 'global'. Contains the full tree. */
  root: ScopeNode;
  /** #define macros (extracted during the preprocessing pass, before AST walk).
   *  Stored separately from the scope tree because defines don't follow lexical scoping. */
  defines: SymbolDeclaration[]; // kind === 'define'
}
```

##### ScopeNode — the primary data structure

```ts
interface ScopeNode {
  kind: 'global' | 'function' | 'block' | 'for';
  name?: string;                     // function name, if kind === 'function'
  range: SymbolRange;                // opening '{' to closing '}' (0-indexed, inclusive)
  declarations: SymbolDeclaration[]; // symbols declared directly in this scope
  children: ScopeNode[];             // nested scopes, in source order
}

interface SymbolDeclaration {
  name: string;
  type?: string;
  range: SymbolRange;                // location of the identifier token
  kind: 'variable' | 'function' | 'parameter' | 'define';

  // ── function-specific ──
  /** For functions: full signature string (e.g., 'void foo(Integer a)'). */
  signature?: string;
  params?: ParameterSymbolInfo[];
  returnType?: string;
  /** True if this is a forward declaration (no body). */
  isForwardDeclaration?: boolean;

  // ── define-specific ──
  /** For defines: macro parameter names, if function-like (e.g., #define MAX(a,b)). */
  defineParams?: string[];
  /** For defines: the replacement text after the macro name/params. */
  value?: string;
}
```

Every symbol lives in exactly one scope node. No duplication.

##### Derived views

Flat lookups are derived on demand by `DocumentService` and cached alongside the tree:

```ts
interface DerivedSymbolViews {
  /** All globally-visible functions (for includes, knownSymbols, completion).
   *  Keyed by original-case name. Arrays for overloads. */
  exportedFunctions: ReadonlyMap<string, SymbolDeclaration[]>;
  /** All globally-visible variables. Keyed by original-case name. */
  exportedVariables: ReadonlyMap<string, SymbolDeclaration>;
  /** All function declarations across all scopes (for document outline). */
  allFunctions: ReadonlyMap<string, SymbolDeclaration[]>;
}

function deriveViews(root: ScopeNode): DerivedSymbolViews { ... }
```

`exportedFunctions` and `exportedVariables` are what the current `DocumentSymbolIndex.functions` and `.variables` contain — globals only, exposed to other files via `#include`. They're computed by collecting declarations from the root `global` scope (and its wrapper function children), filtering out locals inside real functions.

This is the only view needed for include files. For the file being edited, consumers use the scope tree directly.

##### Querying the scope tree

```ts
/** Returns the scope chain at a position: [global, function?, block?, ...] outermost to innermost. */
function scopeChainAt(root: ScopeNode, position: Position): ScopeNode[]

/** Returns all symbols visible at a position (walk chain bottom-up, collecting declarations). */
function visibleSymbolsAt(root: ScopeNode, position: Position): SymbolDeclaration[]

/** Returns the innermost scope that declares a given name. */
function findDeclaringScope(root: ScopeNode, position: Position, name: string): ScopeNode | null
```

These are pure functions over the tree — no mutation, no caching, trivially testable.

Consumer usage:

| Consumer | Query |
|---|---|
| **Completion** | `visibleSymbolsAt()` — all symbols in scope at cursor position |
| **Hover** | `findDeclaringScope()` → read the `SymbolDeclaration` for signature/type |
| **Go-to-definition** | `findDeclaringScope()` → return the declaration's `range` |
| **Redeclaration validator** | Walk tree, check each scope's `declarations` for conflicts |
| **Shadowing validator** | `scopeChainAt()` at declaration site, check ancestors for same name |
| **Include aggregation** | `exportedFunctions` + `exportedVariables` derived views |
| **Undeclared identifier check** | `visibleSymbolsAt()` at usage site, check if name exists |

##### Defines

Defines use the same `SymbolDeclaration` type with `kind: 'define'`, plus define-specific fields (`defineParams`, `value`). They're stored at the `SymbolTable` level (not in the scope tree) because `#define` is a preprocessor concept — it doesn't respect lexical scoping. A define is visible from its point of definition to the end of the file (or until `#undef`).

Since `stripConditionalDirectives` already processes the raw text line-by-line, define extraction is folded into that pass, ensuring `#if 0` dead-code blocks are respected.

Using a unified `SymbolDeclaration` means consumers like `SymbolResolver`, hover, and go-to-definition don't need separate code paths for defines vs. other symbols — they all have a `name`, `range`, and `kind`.

#### `Validators`

Each validator is a standalone function. Semantic validators consume the `SymbolTable` (the scope tree) rather than re-walking the AST:

```ts
/** Walks the scope tree checking for duplicate declarations within the same scope
 *  and shadowing across scope boundaries. */
validateRedeclarations(symbolTable: SymbolTable, includeVars: IncludeFileVariable[]): Diagnostic[]

/** Uses visibleSymbolsAt() to verify every identifier usage resolves to a known symbol. */
validateUndeclaredIdentifiers(
  symbolTable: SymbolTable,
  parseResult: ParseResult,          // for walking identifier usage sites in the AST
  knownSymbols: KnownSymbols
): Diagnostic[]

/** Token-based — only needs the token stream. */
validateDeprecatedCalls(result: ParseResult): Diagnostic[]
```

Because the scope tree already represents the full declaration structure, `validateRedeclarations` doesn't need to rebuild scope tracking from scratch — it just walks `ScopeNode.children` recursively, checking each node's `declarations` array for same-name conflicts and comparing against ancestor scopes for shadowing.

`validateUndeclaredIdentifiers` still needs the `ParseResult` to find identifier usage sites in the AST, but resolves each name via `visibleSymbolsAt(root, position)` on the scope tree.

Semantic validators are only called when `result.syntaxErrors` is empty. This invariant is enforced by the `DiagnosticService`, not duplicated inside each validator.

#### `Formatter`

Unchanged — already a pure function. Moves from `util/` to `core/`.

---

### 2. Service Layer (`server/src/services/`)

Stateful services that manage caching, lifecycle, and cross-cutting concerns. Services may depend on other services and on the core layer. They do **not** import from `vscode-languageserver`.

#### `DocumentService`

The central owner of parsed document state. Replaces the current `DocumentSymbolStore` and the ad-hoc parsing inside `Validator`.

```ts
class DocumentService {
  /** Called on every content change. Parses once, caches everything. */
  update(uri: string, version: number, text: string): void;

  /** Called on document close. */
  clear(uri: string): void;

  getParseResult(uri: string): ParseResult | null;
  getSymbolTable(uri: string): SymbolTable | null;
  /** Derived flat views for include aggregation and completion. Cached alongside the tree. */
  getDerivedViews(uri: string): DerivedSymbolViews | null;
  getText(uri: string): string | null;

  /** For on-disk header files (not open in the editor). Cached by mtime. */
  getHeaderSymbolTable(fsPath: string): SymbolTable | null;
  getHeaderDerivedViews(fsPath: string): DerivedSymbolViews | null;
  getHeaderText(fsPath: string): string | null;
}
```

One parse per `(uri, version)`. The `ParseResult`, `SymbolTable`, and `DerivedSymbolViews` are computed lazily on first access after an update and cached until the next version.

All state is keyed by document URI, so multiple open documents are tracked independently.

#### Cross-Document Invalidation

When a header file changes on disk (detected via `fs.watch` or by re-stat on access), downstream caches that depend on it must be invalidated. `DocumentService` maintains a reverse dependency map:

```ts
/** Maps a header fsPath → set of open-document URIs that include it. */
private dependents: Map<string, Set<string>>;
```

When a header's mtime changes:
1. Its cached `HeaderIndex` is evicted.
2. All dependent document URIs have their `IncludeService` and `SymbolResolver` caches cleared.
3. Those documents are re-validated via `DiagnosticService`.

This replaces the current approach where every request re-walks the include graph from scratch.

#### `IncludeService`

Wraps the include graph traversal. Caches resolved file lists per `(uri, version)`.

```ts
class IncludeService {
  constructor(
    documentService: DocumentService,
    /** Per-document include dirs: combines workspace-level setting with
     *  the including file's own directory. */
    getIncludeDirs: (uri: string) => Promise<string[]>
  );

  getIncludeFiles(uri: string): Promise<string[]>;

  /** Aggregated symbol index across all transitive includes. */
  getIncludeSymbols(uri: string): Promise<AggregatedSymbols>;

  /** Aggregated defines across all transitive includes.
   *  Returns SymbolDeclaration[] (kind === 'define') — same type as everything else. */
  getIncludeDefines(uri: string): Promise<SymbolDeclaration[]>;
}
```

`AggregatedSymbols` combines function and variable lookups from all included files into a single structure, avoiding the repeated `for (const includeFsPath of ...)` loops currently duplicated across `server.ts`, `completionProvider.ts`, `hoverProvider.ts`, and `definitionProvider.ts`.

#### `SymbolResolver`

The single entry point for "find symbol by name". Encapsulates the priority chain:

```
document symbols → include symbols → defines → prototypes → types → keywords
```

```ts
class SymbolResolver {
  constructor(
    documentService: DocumentService,
    includeService: IncludeService,
    prototypeService: PrototypeService
  );

  /** Returns the best match for a name in the context of a document.
   *  Position is needed for scope-aware resolution (locals, parameters). */
  resolve(uri: string, name: string, position: Position): Promise<ResolvedSymbol | null>;

  /** Returns all symbols visible from a document at a given cursor position.
   *  Position determines which local/block-scoped symbols are in scope. */
  allVisible(uri: string, position: Position): Promise<ResolvedSymbol[]>;
}
```

Completion, hover, and definition providers all call `SymbolResolver` instead of each implementing their own lookup loops.

#### `PrototypeService`

Wraps `PrototypesLoader` with a ready-state promise so consumers can `await` it:

```ts
class PrototypeService {
  /** Resolves when prototypes have finished loading. */
  readonly ready: Promise<void>;

  getPrototype(name: string): FunctionData[] | null;
  getCompletionItems(): CompletionItem[];
  getAllNames(): string[];
}
```

Providers call `await prototypeService.ready` before accessing data, eliminating the race condition.

#### `DiagnosticService`

Orchestrates all validation for a document in a single pass:

```ts
class DiagnosticService {
  constructor(
    documentService: DocumentService,
    includeService: IncludeService,
    prototypeService: PrototypeService
  );

  /** Returns all diagnostics for a document. Single entry point. */
  async validate(uri: string): Promise<Diagnostic[]>;
}
```

Internally:
1. Gets the `ParseResult` and `SymbolTable` from `DocumentService` (already parsed — no re-parse)
2. Collects syntax errors from the parse result
3. If zero syntax errors → runs `validateRedeclarations(symbolTable, includeVars)` and `validateUndeclaredIdentifiers(symbolTable, parseResult, knownSymbols)`
4. Always runs `validateDeprecatedCalls` (token-based, works even with syntax errors)
5. Returns the combined diagnostic list

`DiagnosticService` builds `KnownSymbols` directly from `DocumentService` + `IncludeService` + `PrototypeService` rather than depending on `SymbolResolver`. This avoids a circular-feeling dependency and keeps validation self-contained — the resolver is a convenience for providers, not a prerequisite for correctness.

This eliminates the current `ValidateWithIncludes` / `ValidateWithSymbols` split and the accidental triple-parse.

---

### 3. Provider Layer (`server/src/providers/`)

Thin adapters that translate between LSP protocol types and the service layer. Each provider:
- Receives LSP request params
- Calls the appropriate service method(s)
- Maps the result to LSP response types

Providers become small enough to not need their own caches — caching is owned by the services.

```ts
// Example: hover provider becomes ~30 lines
export function registerHoverProvider(opts: {
  connection: Connection;
  symbolResolver: SymbolResolver;
  documents: TextDocuments<TextDocument>;
}): void {
  opts.connection.onHover(async (params) => {
    const word = getWordAtPosition(docs.get(params.textDocument.uri), params.position);
    if (!word) return null;
    const symbol = await opts.symbolResolver.resolve(params.textDocument.uri, word, params.position);
    if (!symbol) return null;
    return { contents: symbol.toHoverMarkdown() };
  });
}
```

The current per-provider caches (`includeHoverCache`, `includeCompletionsCache`, `defineHoverCache`, `defineCompletionsCache`) are eliminated — the service layer caches the underlying data once.

---

### 4. LSP Transport Layer (`server/src/server.ts`)

Stays thin. Responsibilities:
- Create the `Connection` and `TextDocuments` manager
- Construct services in dependency order
- Register providers, passing services as dependencies
- Wire document lifecycle events to `DocumentService`

```ts
// Pseudocode
const documentService = new DocumentService();
const prototypeService = new PrototypeService();
const includeService = new IncludeService(documentService, getIncludeDirs);
const symbolResolver = new SymbolResolver(documentService, includeService, prototypeService);
const diagnosticService = new DiagnosticService(documentService, includeService, prototypeService);

documents.onDidChangeContent(async (e) => {
  documentService.update(e.document.uri, e.document.version, e.document.getText());
  const diagnostics = await diagnosticService.validate(e.document.uri);
  connection.sendDiagnostics({ uri: e.document.uri, diagnostics });
});

registerCompletionProvider({ connection, documents, symbolResolver, prototypeService });
registerHoverProvider({ connection, documents, symbolResolver });
registerDefinitionProvider({ connection, documents, symbolResolver });
registerFormattingProvider({ connection, documents });
```

---

## Dependency Graph

```
server.ts
  ├── providers/completionProvider  → SymbolResolver, PrototypeService
  ├── providers/hoverProvider       → SymbolResolver
  ├── providers/definitionProvider  → SymbolResolver
  ├── providers/formattingProvider  → Formatter (core)
  │
  ├── services/DiagnosticService    → DocumentService, IncludeService, PrototypeService
  ├── services/SymbolResolver       → DocumentService, IncludeService, PrototypeService
  ├── services/IncludeService       → DocumentService
  ├── services/DocumentService      → ParsePipeline, SymbolCollector (core)
  └── services/PrototypeService     → data/functions.*.json
```

No circular dependencies. Services depend on other services only in a DAG.

---

## Migration Strategy

This can be done incrementally, layer by layer, keeping tests green at each step:

1. **Extract core layer** — move `parsePipeline`, `symbols`, `validator` functions, `formatter`, `defines` into `core/`. No behaviour change, just file moves and import updates.
2. **Introduce `DocumentService`** — wrap the parse-once logic. Have `server.ts` call it. Keep existing `DocumentSymbolStore` as a thin wrapper initially.
3. **Introduce `IncludeService`** — extract the shared include-graph logic currently in `includesProvider` + `server.ts`.
4. **Introduce `SymbolResolver`** — replace the ad-hoc lookup loops in each provider.
5. **Introduce `DiagnosticService`** — replace `validateTextDocument()` body in `server.ts`.
6. **Simplify providers** — remove per-provider caches; delegate to services.
7. **Introduce `PrototypeService`** — wrap with ready-state promise.

---

## Design Notes

### Cancellation

All async service methods that touch the include graph or prototype data should accept an optional `CancellationToken` parameter. The LSP connection provides a token for each request; providers should forward it to service calls so that in-flight work can be abandoned when the user types again. This is not reflected in every signature above for brevity, but the implementation should thread tokens through:

```ts
resolve(uri: string, name: string, position: Position, token?: CancellationToken): Promise<...>
allVisible(uri: string, position: Position, token?: CancellationToken): Promise<...>
validate(uri: string, token?: CancellationToken): Promise<Diagnostic[]>
```

### Document Sync Mode

The server uses `TextDocumentSyncKind.Full` — the client sends the entire document text on every change. This is the simplest correct approach and is fine for file sizes typical in 12dPL projects.

Incremental sync (`TextDocumentSyncKind.Incremental`) is a future optimisation. It would reduce the data transferred per keystroke but requires maintaining an in-memory text buffer that applies incremental edits — added complexity that isn't warranted until profiling shows sync overhead is a bottleneck.
8. **Clean up** — remove dead code, add missing tests for new boundaries.