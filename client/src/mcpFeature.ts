/* MCP server registration: offers the 12dPL Macro Assistant (server/out/mcpServer.js) to chat in VS Code */
import * as path from 'path';
import { commands, env, EventEmitter, ExtensionContext, lm, McpStdioServerDefinition, window, workspace } from 'vscode';

const providerId = '12dpl.macroAssistant';
const serverLabel = '12dPL Macro Assistant';

/** Must match MCP_ENV in server/src/mcp/config.ts. */
const MCP_ENV = {
	version: 'TWELVEDPL_MCP_VERSION',
	workspaceFolder: 'TWELVEDPL_MCP_WORKSPACE_FOLDER',
	compilerPath: 'TWELVEDPL_MCP_COMPILER_PATH',
	includePaths: 'TWELVEDPL_MCP_INCLUDE_PATHS',
	knowledgePaths: 'TWELVEDPL_MCP_KNOWLEDGE_PATHS',
} as const;

function stringList(value: unknown): string[] {
	return (Array.isArray(value) ? value : []).map((v) => String(v).trim()).filter(Boolean);
}

/** The 12dpl.* settings the MCP server needs, as environment variables. */
function serverEnvironment(context: ExtensionContext): Record<string, string> {
	const config = workspace.getConfiguration('12dpl');
	return {
		[MCP_ENV.version]: String(context.extension.packageJSON.version ?? ''),
		[MCP_ENV.workspaceFolder]: workspace.workspaceFolders?.[0]?.uri.fsPath ?? '',
		[MCP_ENV.compilerPath]: String(config.get<string>('compiler.path') ?? '').trim(),
		[MCP_ENV.includePaths]: JSON.stringify(stringList(config.get('compiler.includePaths'))),
		[MCP_ENV.knowledgePaths]: JSON.stringify(stringList(config.get('mcp.knowledgePaths'))),
	};
}

export function registerMcpFeatures(context: ExtensionContext) {
	const serverModule = context.asAbsolutePath(path.join('server', 'out', 'mcpServer.js'));

	// For MCP clients outside VS Code chat (e.g. Claude Code, Claude Desktop).
	// The editor's own runtime runs the server as Node via ELECTRON_RUN_AS_NODE.
	context.subscriptions.push(
		commands.registerCommand('12dpl.copyMcpServerConfig', async () => {
			const config = {
				mcpServers: {
					'12dpl-macro-assistant': {
						command: process.execPath,
						args: [serverModule],
						env: { ELECTRON_RUN_AS_NODE: '1', ...serverEnvironment(context) },
					},
				},
			};
			await env.clipboard.writeText(JSON.stringify(config, null, 2));
			void window.showInformationMessage(
				'Copied the 12dPL MCP server configuration. It points into this extension version\'s folder, so copy it again after the extension updates.'
			);
		})
	);

	// Editors older than VS Code 1.101 have no MCP API; the language features still work.
	if (typeof lm?.registerMcpServerDefinitionProvider !== 'function') {
		return;
	}

	const definitionsChanged = new EventEmitter<void>();
	context.subscriptions.push(definitionsChanged);
	context.subscriptions.push(
		workspace.onDidChangeConfiguration((e) => {
			if (e.affectsConfiguration('12dpl.mcp') || e.affectsConfiguration('12dpl.compiler')) {
				definitionsChanged.fire();
			}
		})
	);

	context.subscriptions.push(
		lm.registerMcpServerDefinitionProvider(providerId, {
			onDidChangeMcpServerDefinitions: definitionsChanged.event,
			provideMcpServerDefinitions: () => {
				if (!workspace.getConfiguration('12dpl').get<boolean>('mcp.enabled', true)) {
					return [];
				}
				const environment = serverEnvironment(context);
				const definition = new McpStdioServerDefinition(
					serverLabel,
					process.execPath,
					[serverModule],
					{ ELECTRON_RUN_AS_NODE: '1', ...environment },
					environment[MCP_ENV.version]
				);
				const workspaceFolder = workspace.workspaceFolders?.[0];
				if (workspaceFolder) {
					definition.cwd = workspaceFolder.uri;
				}
				return [definition];
			},
		})
	);
}
