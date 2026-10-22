/**
 * stdout carries the MCP protocol, so anything the shared language-server
 * modules log with console.log/info/debug must go to stderr instead.
 *
 * Import this module first in the MCP entry point, before any module that
 * might log while it loads.
 */

console.log = console.error;
console.info = console.error;
console.debug = console.error;

export {};
