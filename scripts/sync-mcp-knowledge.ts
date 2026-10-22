/**
 * Copies the 12dPL macro-writing knowledge base into the MCP server's
 * bundled resources (server/src/resources/knowledge/).
 *
 * The source is a MacroProgramming-style workspace:
 *   CLAUDE.md                              → knowledge/guide/instructions.md
 *   .github/skills/create-macro/SKILL.md   → knowledge/guide/create-macro.md
 *   docs/*.md                              → knowledge/docs/
 *   macros examples/**\/*.4dm|.h           → knowledge/examples/   (only with --with-examples)
 *
 * Example macros are opt-in because they are mostly third-party code (12d
 * shipped examples and contributed libraries). Users can load them locally
 * through the `12dpl.mcp.knowledgePaths` setting instead.
 *
 * Usage:
 *   bun scripts/sync-mcp-knowledge.ts <path-to-MacroProgramming> [--with-examples]
 */

import { join, relative, resolve } from 'path';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'fs';
import { execFileSync } from 'child_process';

const root = join(import.meta.dir, '..');
const target = join(root, 'server/src/resources/knowledge');

const args = process.argv.slice(2);
const withExamples = args.includes('--with-examples');
const sourceArg = args.find(a => !a.startsWith('--'));

if (!sourceArg) {
	console.error('Usage: bun scripts/sync-mcp-knowledge.ts <path-to-MacroProgramming> [--with-examples]');
	process.exit(1);
}

const source = resolve(sourceArg);
const guideSources: Array<[string, string]> = [
	['CLAUDE.md', 'guide/instructions.md'],
	['.github/skills/create-macro/SKILL.md', 'guide/create-macro.md'],
];

for (const [from] of guideSources) {
	if (!existsSync(join(source, from))) {
		console.error(`✗ ${from} not found in ${source}`);
		process.exit(1);
	}
}

// ── Clean previous snapshot so deletions in the source propagate ─────────────
for (const dir of ['guide', 'docs', 'examples']) {
	rmSync(join(target, dir), { recursive: true, force: true });
}
mkdirSync(join(target, 'guide'), { recursive: true });
mkdirSync(join(target, 'docs'), { recursive: true });

for (const [from, to] of guideSources) {
	cpSync(join(source, from), join(target, to));
}
console.log(`✓ Guides copied (${guideSources.length})`);

const docsDir = join(source, 'docs');
const docs = existsSync(docsDir) ? readdirSync(docsDir).filter(f => f.toLowerCase().endsWith('.md')) : [];
for (const file of docs) {
	cpSync(join(docsDir, file), join(target, 'docs', file));
}
console.log(`✓ Docs copied (${docs.length})`);

let exampleCount = 0;
if (withExamples) {
	const examplesDir = join(source, 'macros examples');
	const walk = (dir: string) => {
		for (const entry of readdirSync(dir)) {
			if (entry.startsWith('.')) continue;
			const full = join(dir, entry);
			if (statSync(full).isDirectory()) {
				walk(full);
			} else if (/\.(4dm|h)$/i.test(entry)) {
				const dest = join(target, 'examples', relative(examplesDir, full));
				mkdirSync(join(dest, '..'), { recursive: true });
				cpSync(full, dest);
				exampleCount++;
			}
		}
	};
	if (existsSync(examplesDir)) walk(examplesDir);
	console.log(`✓ Examples copied (${exampleCount})`);
}

let commit = '';
try {
	commit = execFileSync('git', ['-C', source, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf-8' }).trim();
} catch {
	// Source is not a git checkout; leave the commit blank.
}

writeFileSync(join(target, 'manifest.json'), JSON.stringify({
	source: 'MacroProgramming',
	commit,
	syncedAt: new Date().toISOString().slice(0, 10),
	guides: guideSources.map(([, to]) => to),
	docs: docs.length,
	examples: exampleCount,
}, null, '\t') + '\n');
console.log(`✓ Manifest written (source commit ${commit || 'unknown'})`);
