# Copilot Instructions for 12dPL Language Server

## Runtime Environment

This project uses **Bun** as the primary runtime and package manager. **Do not use Node.js or npm**.

### Key Commands

```bash
# Install dependencies
bun install

# Compile TypeScript
bun run compile

# Watch mode for development
bun run watch

# Run tests
bun run test

# Run all checks (typecheck + tests)
bun run test:all
```

## Testing

### Running Tests

All tests are located in the `tests/` directory and use Bun's built-in test runner.

```bash
# Run all tests
bun run test

# Run a specific test file
bun test tests/validator.test.ts

# Run tests with verbose output
bun test --verbose
```

### Test Fixtures

Test fixtures are located in `client/testFixture/` and include `.4dm`, `.4do`, and `.h` files that are used by the test suite.

### Writing Tests

Use Bun's test API:

```typescript
import { describe, it, expect } from 'bun:test';

describe('feature name', () => {
    it('should do something', () => {
        expect(result).toBe(expected);
    });
});
```

## Project Structure

- `client/` — VS Code extension source (entry: `client/src/extension.ts`)
- `server/` — Language server source (entry: `server/src/server.ts`)
- `server/src/resources/` — JSON resources used at runtime
- `server/src/antlr/` — ANTLR4 parser files for 12dPL grammar
- `server/src/providers/` — LSP feature providers (completion, hover, formatting, etc.)
- `tests/` — Unit and integration tests

## Development Workflow

1. Run `bun install` to install dependencies
2. Run `bun run watch` to start the TypeScript compiler in watch mode
3. Press F5 in VS Code to launch the extension in a test window
4. Run `bun run test` to validate changes

## Important Notes

- **Do NOT use `npm` or `node` commands** - Use `bun` equivalents
- **Do NOT add Node.js-specific dependencies** - Use Bun-compatible packages
- The project uses ANTLR4 for parsing 12dPL grammar
- The extension communicates via the Language Server Protocol (LSP)
