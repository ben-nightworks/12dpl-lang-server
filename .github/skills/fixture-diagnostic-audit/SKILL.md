---
name: fixture-diagnostic-audit
description: 'Audit 12dPL .4dm files for errors and warnings across fixtures, macros, and macros_mattmonk. Use when reviewing whether diagnostics make sense, checking expected-vs-actual validator behavior, validating smoke tests, or scanning repo-wide .4dm files on another developer machine. Runs the repo validation script and then reviews mismatches or real issues.'
argument-hint: '[optional targets like fixtures macros macros_mattmonk or a custom folder] [optional --filter text]'
user-invocable: true
---

# Fixture Diagnostic Audit

Use this skill when you need to validate `.4dm` files with the same validator stack the language server uses and decide whether the resulting errors and warnings are correct.

## What It Covers

- Test fixtures under `client/testFixture`
- Real macros under `macros`
- Matt Monk macros under `macros_mattmonk`
- Any other repo folder containing `.4dm` files

The underlying repo script auto-discovers `.4dm` files repo-wide by default, so the workflow stays usable even when another developer places files in different directories.

## Validation Runner

Use the wrapper script [run-validation.ps1](./scripts/run-validation.ps1).

That wrapper calls the repo runner at `scripts/validate-fixtures.ts`, which:

- parses with the same preprocessor pipeline as the server
- runs deprecated-call, redeclaration, undeclared-symbol, argument, return-value, void-return, and array-size validation
- resolves quoted includes from the file's own directory first
- falls back to repo-wide header discovery by filename for portability
- prints diagnostics grouped by file

## Standard Procedure

1. Run the wrapper with no arguments to scan all `.4dm` files in the repo.
2. If the result set is noisy, rerun with focused targets such as `fixtures`, `macros`, `macros_mattmonk`, or a workspace-relative folder.
3. Review diagnostics by file and separate them into three buckets:
   - expected fixture cases
   - real source issues
   - false positives or stale fixture comments
4. If a fixture comment is stale, update the comment to match current behavior unless the validator itself is clearly wrong and in scope to fix.
5. If a validator looks wrong, inspect the responsible validator file before changing test fixtures.
6. Summarize the outcome for the user with counts and the highest-signal findings first.

## Commands

Scan everything:

```powershell
./.github/skills/fixture-diagnostic-audit/scripts/run-validation.ps1
```

Scan only fixtures:

```powershell
./.github/skills/fixture-diagnostic-audit/scripts/run-validation.ps1 fixtures
```

Scan only macro folders:

```powershell
./.github/skills/fixture-diagnostic-audit/scripts/run-validation.ps1 macros macros_mattmonk
```

Scan a custom folder and filter filenames:

```powershell
./.github/skills/fixture-diagnostic-audit/scripts/run-validation.ps1 some/custom/folder --filter panel
```

## Review Guidance

- For fixture files, compare diagnostics against the annotated expectations in the file.
- For macros, treat syntax errors and undeclared symbols as likely real until proven otherwise.
- If many diagnostics cluster around a single overloaded built-in, verify prototype signatures before changing source files.
- If a file depends on VS Code include-path settings, prefer fixing the source include or documenting the dependency instead of assuming local settings exist.
- Keep edits minimal and targeted: fix stale comments separately from validator logic.

## Expected Outputs

- A per-file diagnostic audit
- A short explanation of which diagnostics make sense and which do not
- Any follow-up code or fixture comment fixes needed to align repo expectations with current validator behavior