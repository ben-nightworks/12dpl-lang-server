/**
 * MCP server configuration.
 *
 * The VS Code extension passes its `12dpl.*` settings to the MCP server
 * process through environment variables (see client/src/mcpFeature.ts).
 * Other MCP clients can set the same variables by hand.
 */

import * as path from 'path';
import { resolvePathVariables } from '../services/includeUtils';

export const MCP_ENV = {
	version: 'TWELVEDPL_MCP_VERSION',
	workspaceFolder: 'TWELVEDPL_MCP_WORKSPACE_FOLDER',
	compilerPath: 'TWELVEDPL_MCP_COMPILER_PATH',
	includePaths: 'TWELVEDPL_MCP_INCLUDE_PATHS',
	knowledgePaths: 'TWELVEDPL_MCP_KNOWLEDGE_PATHS',
} as const;

/** Same default as the `12dpl.compiler.path` setting. */
export const DEFAULT_COMPILER_FOLDER = 'C:\\Program Files\\12d\\12dmodel\\15.00\\nt.x64\\';

export interface McpConfig {
	version: string;
	workspaceFolder?: string | undefined;
	/** Folder containing cc4d.exe. */
	compilerFolder: string;
	/** Raw `12dpl.compiler.includePaths` entries; may contain ${...} variables. */
	includePaths: string[];
	/** Extra knowledge folders, variables resolved. */
	knowledgePaths: string[];
}

/** Accepts a JSON array of strings or a `;`-separated list. */
export function parsePathList(value: string | undefined): string[] {
	if (!value || !value.trim()) return [];
	const trimmed = value.trim();
	if (trimmed.startsWith('[')) {
		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) {
				return parsed.map(p => String(p).trim()).filter(Boolean);
			}
		} catch {
			// Fall through to the delimited form.
		}
	}
	return trimmed.split(';').map(p => p.trim()).filter(Boolean);
}

export function readMcpConfig(env: NodeJS.ProcessEnv = process.env): McpConfig {
	const workspaceFolder = env[MCP_ENV.workspaceFolder]?.trim() || undefined;
	const knowledgePaths = parsePathList(env[MCP_ENV.knowledgePaths])
		.map(p => resolvePathVariables(p, { workspaceFolderPath: workspaceFolder, cwd: process.cwd() }))
		.map(p => path.resolve(workspaceFolder ?? process.cwd(), p));

	return {
		version: env[MCP_ENV.version]?.trim() || '0.0.0-dev',
		workspaceFolder,
		compilerFolder: env[MCP_ENV.compilerPath]?.trim() || DEFAULT_COMPILER_FOLDER,
		includePaths: parsePathList(env[MCP_ENV.includePaths]),
		knowledgePaths,
	};
}

/** Resolves the configured include paths for one source file. */
export function resolveIncludeDirs(config: McpConfig, fileFsPath: string): string[] {
	return config.includePaths.map(p => resolvePathVariables(p, {
		workspaceFolderPath: config.workspaceFolder,
		fileFsPath,
		cwd: process.cwd(),
	}));
}

/** Resolves a user-supplied path against the workspace folder (or cwd). */
export function resolveUserPath(config: McpConfig, p: string): string {
	return path.resolve(config.workspaceFolder ?? process.cwd(), p);
}
