import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';

describe('function declarations split before the parameter list (#178)', () => {
	test('accepts the opening parenthesis on the next line', () => {
		const result = parse(`
void Assign_pit_stages
(
    Element drain,
    Dynamic_Element valid_polys,
    Integer &pit_updates
)
{
}
`);

		expect(result.syntaxErrors).toHaveLength(0);
	});
});