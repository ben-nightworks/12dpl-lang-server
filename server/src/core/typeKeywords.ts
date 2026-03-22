/**
 * Derives the set of all type keywords directly from the ANTLR grammar's ATN.
 *
 * Uses the parser's Augmented Transition Network to walk the `typeSpecifier`
 * rule and collect every token literal it can accept. This means the set is
 * always in sync with the grammar — no manual list to maintain.
 *
 * Computed once at module load.
 */

import proglang12dParser from '../antlr/src/proglang12dParser';

function extractTypeKeywords(): Set<string> {
	const atn = proglang12dParser._ATN;
	const startState = atn.ruleToStartState[proglang12dParser.RULE_typeSpecifier];
	const tokenSet = atn.nextTokens(startState);

	const types = new Set<string>();
	for (const interval of tokenSet.intervals) {
		for (let t = interval.start; t <= interval.stop; t++) {
			const lit = proglang12dParser.literalNames[t];
			if (!lit) continue;
			const name = lit.replace(/^'|'$/g, '');
			// All 12dPL types are PascalCase or 'void'. This filters out
			// follow-set leakage (lowercase keywords like 'for', 'return'
			// and operators like '...').
			if (name === 'void' || /^[A-Z]/.test(name)) {
				types.add(name);
			}
		}
	}
	return types;
}

/** All type keywords accepted by the grammar's `typeSpecifier` rule. */
export const typeKeywords: ReadonlySet<string> = extractTypeKeywords();
