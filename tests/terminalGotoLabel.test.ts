import { describe, expect, test } from 'bun:test';
import { parse } from '../server/src/core/parsePipeline';

describe('goto labels at the end of a block (#177)', () => {
	test('accepts a label with no following statement', () => {
		const result = parse(`
void main() {
    if (1) {
        if (1) goto end;
        Print("This should not print\\n");
        end:
    }
    Print("This should print\\n");
    return;
}
`);

		expect(result.syntaxErrors).toHaveLength(0);
	});
});