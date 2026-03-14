# Architecture Review & Known Issues

> Generated from a full codebase audit — March 2025

## High-Level Architecture

Standard LSP client–server split:

- **Client** (`client/src/`) — VS Code extension host; activation, compile command, format-on-save
- **Server** (`server/src/`) — Language server process; parsing, validation, completions, hover, go-to-definition, formatting
- Communication via **Node IPC**

### Parse & Validation Pipeline

```
Raw text → stripConditionalDirectives() → wrapTopLevelScriptsPreservingLines()
         → ANTLR Lexer + Parser → Parse tree
         → Validator (syntax errors) → Validator (semantic: redeclarations, undeclared identifiers)
         → Symbol Collector → functions, variables, parameters
```

---

## Critical Issues

### 1. Document Is Parsed Up to Three Times Per Validation Cycle

**Files:** `server/src/server.ts`, `server/src/antlr/validator.ts`, `server/src/antlr/diagnosticHelper.ts`

`validateTextDocument()` in `server.ts` calls both `Validator.ValidateWithIncludes()` and `Validator.ValidateWithSymbols()`. Each method independently calls `createLexerAndParser(documentText)`, which runs the full preprocessing pipeline (`stripConditionalDirectives` + `wrapTopLevelScriptsPreservingLines`) and constructs a new ANTLR lexer/parser pair.

Additionally, `ValidateWithSymbols` calls `checkDeprecatedFunctions(parser)` which internally calls `parser.compilationUnit()` a second time (line 193 of `diagnosticHelper.ts`), re-parsing the token stream. This means each validation triggers **three full parses** of the same text.

For large files, this is a measurable performance hit on every keystroke.

**Fix:** Parse once, pass the tree and token stream to all validation stages.

### 2. Prototypes Load Race Condition

**Files:** `server/src/server.ts` (line 102), `server/src/util/prototypes.ts`

`prototypesLoader.load()` is called with `.catch()` (fire-and-forget) in `onInitialized`. Completion, hover, and definition providers can be invoked before loading completes. Those calls will silently return empty results for prototype functions — users see missing completions with no indication of why.

**Fix:** Have providers await a loading promise, or block initialization until prototypes are loaded.

### 3. `ValidateWithSymbols` Runs Semantic Checks Even With Syntax Errors

**File:** `server/src/antlr/validator.ts` (lines 895–932)

The comment on line 921 says *"Only run semantic validation if there are no syntax errors"*, but the code unconditionally runs `validateUndeclaredIdentifiers(tree, knownSymbols)` without checking `syntaxDiagnostics.length`. This contrasts with `ValidateWithIncludes` which correctly gates on zero syntax errors. Running semantic validation on a malformed AST produces false-positive diagnostics.

**Fix:** Add the missing `if (syntaxDiagnostics.length === 0)` guard.

---

## High Severity Issues

### 4. Debug `console.log` Calls Left in Production Code

**File:** `server/src/antlr/diagnosticHelper.ts` (lines 90, 100)

`checkPostfixExpression()` contains `console.log(\`Found function call: ...\`)` and `console.log(\`Found deprecated function: ...\`)`. These fire for every function call expression in every document on every validation pass, flooding the LSP output channel in production.

**Fix:** Remove or gate behind a debug flag.

### 5. `checkDeprecatedFunctions` Re-Parses the Already-Parsed Tree

**File:** `server/src/antlr/diagnosticHelper.ts` (line 193)

`checkDeprecatedFunctions(parser)` calls `parser.compilationUnit()` again even though the caller already parsed with the same parser. ANTLR parsers are stateful — re-invoking the start rule produces a new parse tree but also resets internal state. This is both wasteful and potentially inconsistent with the tree the caller validated against.

**Fix:** Accept the parse tree as a parameter instead of re-parsing.

### 6. Function Overloads Lost in Symbol Index

**File:** `server/src/antlr/symbols.ts` (line ~260)

Document symbols store functions in a plain `Record<string, FunctionSymbolInfo>` keyed by name. If a file defines two overloads of the same function, only the last one is stored. Hover/completion/go-to-definition will show incorrect information for earlier overloads.

Prototypes correctly store overloads as arrays (`Map<string, FunctionData[]>`), but document symbols do not.

**Fix:** Use `Record<string, FunctionSymbolInfo[]>` or similar structure.

### 7. Header Cache Never Evicts Stale Entries

**File:** `server/src/providers/documentSymbols.ts` (line ~48)

`headerIndexCache` stores parsed header file indexes by canonical path keyed on `mtimeMs`. Entries for deleted or renamed files persist indefinitely. In a long-running server with many header churn (refactoring, branch switching), this accumulates stale data.

**Fix:** Add LRU eviction or periodic cleanup; remove entries when file no longer exists.

### 8. `buildFunctionCallSnippet` Silently Skips Parameters Without Names/Types

**File:** `server/src/util/utils.ts` (line ~62)

When a parameter has neither a name nor a type, the snippet generation skips it entirely (`if (!label.length) continue`). The resulting snippet has fewer tab stops than the function has parameters, causing users to miss filling in arguments.

**Fix:** Always emit a placeholder (e.g., `${n:param}` or `${n:?}`).

---

## Medium Severity Issues

### 9. `typeKeywords` Set Recreated on Every Call

**File:** `server/src/antlr/parsePipeline.ts` (line 149)

The ~138-element `typeKeywords` `Set` is constructed inside `wrapTopLevelScriptsPreservingLines()`, which is called on every parse. This allocates and populates a new Set every time.

**Fix:** Move to module scope as a constant.

### 10. Inconsistent Path Canonicalization

**Files:** Multiple (`includes.ts`, `documentSymbols.ts`, `definitionProvider.ts`)

`canonicalizeFsPath()` is used in most places but not all. Some code paths pass raw `fsPath` values as cache keys or comparison targets. On Windows (the primary target platform for 12d Model users), backslash vs. forward-slash and case differences cause cache misses or failed lookups.

**Fix:** Ensure all path comparisons and cache keys go through `canonicalizeFsPath()`.

### 11. Silent Failure in Symbol Collection

**File:** `server/src/antlr/symbols.ts` (line ~249)

`collectDocumentSymbolIndex()` wraps the entire parse + tree traversal in a `try/catch` that returns an empty index on any error. Users get silently broken completions/hover/definitions with no error log.

**Fix:** Log the error via the LSP connection console.

### 12. Include Graph Silently Truncates at 500 Files

**File:** `server/src/util/includes.ts` (line ~150)

`collectRecursiveIncludeFiles()` caps traversal at 500 files with no warning to the user. If a project exceeds this, symbols from later-discovered files are silently missing from completions and validation.

**Fix:** Emit a diagnostic or console warning when the limit is hit; make the limit configurable.

### 13. `walkAndCheckTree` Duplicates AST Traversal

**File:** `server/src/antlr/diagnosticHelper.ts`

The deprecated function detection uses two approaches simultaneously:
1. `checkTokensForDeprecatedCalls()` — scans the raw token stream for `Time(` patterns
2. `walkAndCheckTree()` — recursively walks the AST checking `PostfixExpressionContext` nodes

Both are called from `checkDeprecatedFunctions()`. Since `Time` is now a type keyword, it won't appear as an `Identifier` in the AST — meaning `walkAndCheckTree` will never find it (the token-based approach is the one that works). The AST walk is dead code for the current set of deprecated functions and adds unnecessary overhead.

**Fix:** Remove `walkAndCheckTree` or document when each approach is needed.

### 14. Error Messages Show Second Declaration's Casing

**File:** `server/src/antlr/validator.ts` (~line 219)

When two variables differ only in case (e.g., `myVar` and `MYVAR`), the redeclaration error message uses the second variable's casing: `Variable 'MYVAR' is already declared...`. Since 12dPL is case-insensitive, users may not understand why their differently-cased name is flagged. The error should reference the original declaration's casing.

**Fix:** Store and display the first occurrence's original case.

### 15. No Path Traversal Boundary Check in Include Resolution

**File:** `server/src/util/includes.ts` (line ~89)

`resolveIncludeToFsPath()` accepts any path including `../../..` traversals and checks only `fs.existsSync()`. A malicious or misconfigured `#include` directive could reference files outside the project tree. Low severity in a local IDE context but poor practice.

**Fix:** Validate that resolved paths stay within expected boundaries.

---

## Low Severity Issues

### 16. Magic Numbers in Completion Scoring

**File:** `server/src/providers/completionProvider.ts`

Group priority scores (600, 590, 350, 200, 180, 160) are inline literals with no named constants or comments explaining the relative ordering.

### 17. Completion Item `data` Property Is Untyped

**File:** `server/src/providers/completionProvider.ts`

Completion items attach a `data` payload with shape `{ source: string, kind: string, ... }` but no TypeScript type definition. The resolve handler reads these properties with implicit `any` casts.

### 18. `DocumentSymbolIndex` Interface Lacks Documentation

**File:** `server/src/antlr/symbols.ts`

The interface doesn't document whether keys are original-case or lowercased, whether ranges are 0-indexed or 1-indexed, or uniqueness guarantees.

### 19. Unnecessary Re-parse in `updateForDocument`

**File:** `server/src/providers/documentSymbols.ts` (line ~60)

`updateForDocument()` parses the document via `collectDocumentSymbolIndex()`. Then `validateTextDocument()` in `server.ts` also parses the same text (twice) via the validator. The symbol index parse could be unified with the validation parse.

### 20. `console.error` Used Instead of LSP Console

**Files:** `server/src/util/prototypes.ts` (lines 48, 55, 73), `server/src/antlr/validator.ts`

Several error paths use `console.error` instead of `connection.console.error()`. Since the connection object isn't available in utility modules, these logs go to Node.js stderr instead of the VS Code Output panel where users would see them.

---

## Testing Gaps

| Area | Gap |
|------|-----|
| **Double/triple parse** | No test verifies parse count; performance regression invisible |
| **Circular includes** | No test for `A.h → B.h → A.h` include cycles |
| **Include graph limit** | No test for behaviour at the 500-file cap |
| **Prototype load race** | Tests `await load()` before asserting; no test for pre-load state |
| **Deprecated function detection** | `walkAndCheckTree` path is exercised but cannot find current deprecated functions |
| **Windows path handling** | No cross-platform path normalization tests |
| **Formatter edge cases** | No test for escaped quotes or escaped braces inside strings |
| **Function overloads in symbols** | No test verifying multiple same-named functions are preserved |

---

## Architectural Observations

### Completion Provider Does Too Much

`completionProvider.ts` (~450 lines) handles document symbols, include-file symbols, define macros, prototype functions, include-path filesystem completion, fuzzy filtering, scoring, and resolution — all in one registration function. This makes it hard to test and modify individual completion sources.

### No Shared Symbol Resolution Layer

Symbol lookup is implemented ad-hoc in each provider (completion, hover, definition). Each re-implements the priority chain: document → includes → defines → prototypes → types → keywords. A shared `SymbolResolver` service would reduce duplication and ensure consistent resolution order.

### Multiple Overlapping Caches

The server maintains separate caches in `DocumentSymbolStore` (completion items, symbol indexes for open docs, header indexes), plus per-provider caches for include completions and define completions. There is no unified invalidation strategy — each cache has its own staleness logic.

---

## Summary

| Severity | Count | Key Examples |
|----------|-------|-------------|
| **Critical** | 3 | Triple parse per validation, prototype race condition, missing syntax-error guard |
| **High** | 5 | Debug logging in production, re-parse in deprecated check, overloads lost, cache leak, snippet gaps |
| **Medium** | 7 | typeKeywords allocation, path canonicalization, silent failures, include limit, dead code |
| **Low** | 5 | Magic numbers, untyped data, missing docs, redundant parse, stderr logging |
| **Test gaps** | 8 | Circular includes, race conditions, cross-platform paths |
