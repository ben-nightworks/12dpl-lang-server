import * as path from 'path';
import { fileURLToPath } from 'url';

export function getModuleDir(): string {
    if (typeof __dirname === 'string') {
        return __dirname;
    }
    try {
        const importMetaUrl = new Function('return import.meta.url')() as string;
        if (typeof importMetaUrl === 'string' && importMetaUrl.length > 0) {
            return path.dirname(fileURLToPath(importMetaUrl));
        }
    } catch {
        // ignore
    }
    return process.cwd();
}
