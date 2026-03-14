/**
 * Core layer barrel export.
 *
 * Re-exports all core types, functions, and utilities.
 */

export * from './types';
export { parse, stripConditionalDirectives, wrapTopLevelScriptsPreservingLines } from './parsePipeline';
export {
	collectSymbolTable,
	deriveViews,
	toLegacyIndex,
	parseDefines,
	isGeneratedWrapperFunctionName,
	scopeChainAt,
	visibleSymbolsAt,
	findDeclaringScope,
} from './symbolCollector';
export {
	validateRedeclarations,
	validateUndeclaredIdentifiers,
	validateDeprecatedCalls,
} from './validators';
