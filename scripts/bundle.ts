/**
 * esbuild-based bundler for the 12dPL VS Code extension.
 *
 * Produces two single-file CJS bundles:
 *   client/out/extension.js  — the VS Code extension host entry
 *   server/out/server.js     — the language server process entry
 *
 * JSON resource files are copied to server/out/resources/ so they
 * can be loaded at runtime via fs.readFileSync.
 */

import { join, resolve } from 'path';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { build, type Plugin } from 'esbuild';

const root = join(import.meta.dir, '..');

// antlr4's ESM entry uses `createRequire(import.meta.url)` which is
// undefined in a CJS bundle. This plugin forces the CJS entry instead.
const antlr4CjsPlugin: Plugin = {
	name: 'antlr4-cjs',
	setup(build) {
		build.onResolve({ filter: /^antlr4$/ }, () => ({
			path: resolve(root, 'server/node_modules/antlr4/dist/antlr4.node.cjs'),
		}));
	},
};

// Shared options: force CJS-compatible resolution so ESM-only patterns
// like `createRequire(import.meta.url)` in antlr4 are avoided.
const shared: Parameters<typeof build>[0] = {
	bundle: true,
	platform: 'node',
	format: 'cjs',
	minify: false,
	sourcemap: false,
};

// ── Clean previous output ────────────────────────────────────────────────────
for (const dir of ['client/out', 'server/out']) {
	const abs = join(root, dir);
	if (existsSync(abs)) {
		rmSync(abs, { recursive: true });
	}
}

// ── Bundle client ────────────────────────────────────────────────────────────
await build({
	...shared,
	entryPoints: [join(root, 'client/src/extension.ts')],
	outfile: join(root, 'client/out/extension.js'),
	external: ['vscode'],
});
console.log('✓ Client bundled → client/out/extension.js');

// ── Bundle server ────────────────────────────────────────────────────────────
await build({
	...shared,
	entryPoints: [join(root, 'server/src/server.ts')],
	outfile: join(root, 'server/out/server.js'),
	plugins: [antlr4CjsPlugin],
});
console.log('✓ Server bundled → server/out/server.js');

// ── Copy resource JSON files ─────────────────────────────────────────────────
const resSrc = join(root, 'server/src/resources');
const resDest = join(root, 'server/out/resources');

if (existsSync(resSrc)) {
	mkdirSync(resDest, { recursive: true });
	cpSync(resSrc, resDest, { recursive: true });
	console.log('✓ Resources copied → server/out/resources/');
} else {
	console.warn('⚠ Resources directory not found at', resSrc);
}
