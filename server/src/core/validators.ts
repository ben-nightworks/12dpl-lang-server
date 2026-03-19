/**
 * Core validators — produce diagnostics from ParseResult and SymbolTable.
 * 
 * Re-exports from modular validation files:
 * - validation.Common — shared helpers and types
 * - validation.VariableRedeclaration — variable redeclaration detection
 * - validation.FunctionRedeclaration — function redeclaration detection (#44)
 * - validation.FunctionDeprecation — deprecated function call detection
 * - validation.UndeclaredSymbols — undeclared identifier and type mismatch detection
 *
 * Each validator is a pure function. No LSP connection or I/O dependencies.
 * Uses vscode-languageserver only for Diagnostic/DiagnosticSeverity types.
 */

export { validateVariableRedeclarations } from './validation.VariableRedeclaration';
export { validateFunctionRedeclarations } from './validation.FunctionRedeclaration';
export { validateDeprecatedCalls } from './validation.FunctionDeprecation';
export { validateUndeclaredIdentifiers } from './validation.UndeclaredSymbols';
