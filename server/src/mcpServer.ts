/**
 * 12dPL Macro Assistant — MCP server entrypoint (stdio).
 *
 * Serves the macro-writing knowledge base, built-in function lookup,
 * offline validation, cc4d compiling and project scaffolding to MCP
 * clients. The VS Code extension registers it with the editor
 * (client/src/mcpFeature.ts); see mcp/config.ts for its settings.
 */

// Must stay first: stdout is the protocol channel.
import './mcp/stdoutGuard';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getResourcePath } from './data/resourceLoader';
import { PrototypeService } from './services/prototypeService';
import { readMcpConfig } from './mcp/config';
import { FunctionCatalog } from './mcp/functionCatalog';
import { SERVER_INSTRUCTIONS } from './mcp/guidance';
import { loadKnowledgeBase } from './mcp/knowledgeBase';
import { MacroValidator } from './mcp/macroValidator';
import { registerMcpFeatures } from './mcp/tools';

async function main(): Promise<void> {
	const config = readMcpConfig();
	const knowledge = loadKnowledgeBase({
		bundledRoot: getResourcePath('knowledge'),
		extraRoots: config.knowledgePaths,
	});
	const prototypes = new PrototypeService();
	const catalog = new FunctionCatalog(prototypes, knowledge);
	const validator = new MacroValidator(config, prototypes, catalog);

	const server = new McpServer(
		{ name: '12dpl-macro-assistant', title: '12dPL Macro Assistant', version: config.version },
		{ instructions: SERVER_INSTRUCTIONS }
	);
	registerMcpFeatures(server, { config, knowledge, catalog, validator });
	await server.connect(new StdioServerTransport());

	console.error(`12dPL MCP server ready: ${knowledge.docs.length} docs, ${knowledge.sectionCount} sections, ${knowledge.examples.length} examples`);
}

main().catch(err => {
	console.error('12dPL MCP server failed to start:', err);
	process.exit(1);
});
