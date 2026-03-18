/**
 * Common helpers and types used across validation modules.
 */

export function safeTokenText(node: any): string | null {
	const text = node?.symbol?.text ?? node?.getText?.();
	return typeof text === 'string' ? text : null;
}

export function safeTokenLine(node: any): number | null {
	const line = node?.symbol?.line;
	return typeof line === 'number' ? line : null;
}

export function safeTokenColumn(node: any): number | null {
	const column = node?.symbol?.column;
	return typeof column === 'number' ? column : null;
}

export function extractIdentifierFromDeclarator(ctx: any): { name: string; line: number; column: number } | null {
	let cur: any = ctx;
	while (cur) {
		try {
			const direct = cur.directDeclarator?.();
			if (direct) { cur = direct; continue; }
		} catch { /* ignore */ }
		try {
			const idNode = cur.Identifier?.();
			const text = safeTokenText(idNode);
			const line = safeTokenLine(idNode);
			const column = safeTokenColumn(idNode);
			if (text && line !== null && column !== null) return { name: text, line, column };
		} catch { /* ignore */ }
		break;
	}
	return null;
}

export interface DeclaredVariable {
	name: string;
	line: number;
	column: number;
	scopeDepth: number;
	isFunction: boolean;
}

export interface DeclaredSymbol {
	name: string;
	type?: string;
	line: number;
	column: number;
}

export interface IdentifierUsage {
	name: string;
	line: number;
	column: number;
	isAssignmentTarget: boolean;
	isFunctionCall: boolean;
}

export interface SwitchCaseMismatch {
	caseLine: number;
	caseColumn: number;
	caseLength: number;
	switchType: string;
	caseType: string;
}
