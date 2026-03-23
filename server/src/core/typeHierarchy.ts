/**
 * Built-in type inheritance for 12dPL.
 *
 * 12dPL has implicit type hierarchies — for example, all UI widget types
 * (Panel, Button, *_Box, etc.) inherit from Widget. This module defines
 * those relationships so that type-checking validators can recognise when
 * a subtype is passed where a base type is expected.
 *
 * The Widget subtypes are derived from the grammar's `builtInWidgetTypeSpecifier`
 * rule via the ANTLR ATN, so the hierarchy stays in sync automatically when
 * the grammar changes.
 */

import proglang12dParser from '../antlr/src/proglang12dParser';

/**
 * Extracts all token literals from a parser rule via its ATN start state.
 */
function extractTypesFromRule(ruleIndex: number): Set<string> {
	const atn = proglang12dParser._ATN;
	const startState = atn.ruleToStartState[ruleIndex];
	const tokenSet = atn.nextTokens(startState);

	const types = new Set<string>();
	for (const interval of tokenSet.intervals) {
		for (let t = interval.start; t <= interval.stop; t++) {
			const lit = proglang12dParser.literalNames[t];
			if (!lit) continue;
			const name = lit.replace(/^'|'$/g, '');
			if (/^[A-Z]/.test(name)) {
				types.add(name);
			}
		}
	}
	return types;
}

/**
 * Maps each base type to the set of types that can be used in its place.
 * Derived from the grammar's builtInWidgetTypeSpecifier rule.
 */
const typeChildren: ReadonlyMap<string, ReadonlySet<string>> = new Map([
	['Widget', extractTypesFromRule(proglang12dParser.RULE_builtInWidgetTypeSpecifier)],
	['Message_Box', new Set(['Colour_Message_Box'])],
	['Function', new Set(['Apply_Many_Function', 'Apply_Function', 'Kerb_Return_Function', 'Macro_Function'])],
]);

/**
 * Automatic type promotions supported by 12dPL.
 *
 * Maps a source type to the set of types it can be implicitly promoted to.
 * These promotions apply when matching function argument types and when
 * converting return expressions to the declared return type.
 */
const typePromotions: ReadonlyMap<string, ReadonlySet<string>> = new Map([
	['Integer',    new Set(['Real', 'Integer64'])],
	['Real',       new Set(['Integer', 'Integer64'])],
	['Integer64',  new Set(['Real', 'Integer'])],
	['Model',      new Set(['Dynamic_Element'])],
	['Element',    new Set(['Dynamic_Element'])],
	['Tin',        new Set(['Dynamic_Element'])],
	['Point',      new Set(['Segment'])],
	['Line',       new Set(['Segment'])],
	['Arc',        new Set(['Segment'])],
	['Vector2',    new Set(['Vector3'])],
	['Vector3',    new Set(['Vector4', 'Vector2'])],
	['Vector4',    new Set(['Vector3'])],
]);

/**
 * Returns true if `childType` can be used where `parentType` is expected,
 * considering built-in type inheritance.
 *
 * This does NOT check exact equality — callers should check that first.
 */
export function isSubtypeOf(childType: string, parentType: string): boolean {
	const children = typeChildren.get(parentType);
	return children !== undefined && children.has(childType);
}

/**
 * Returns true if `fromType` can be implicitly promoted to `toType`.
 *
 * This does NOT check exact equality — callers should check that first.
 */
export function isPromotableTo(fromType: string, toType: string): boolean {
	const targets = typePromotions.get(fromType);
	return targets !== undefined && targets.has(toType);
}
