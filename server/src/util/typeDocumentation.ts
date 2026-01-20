import * as fs from 'fs';
import * as path from 'path';
import { getModuleDir } from './moduleDir';

const moduleDir = getModuleDir();
const docPath = path.join(moduleDir, '..', 'resources', 'typeDocumentation.json');

let typeDocumentation: Record<string, string> = {};
try {
    if (fs.existsSync(docPath)) {
        const json = fs.readFileSync(docPath, 'utf-8');
        typeDocumentation = JSON.parse(json) as Record<string, string>;
    } else {
        console.error('typeDocumentation.json not found:', docPath);
    }
} catch (error) {
    console.error('Error loading typeDocumentation.json:', error);
}

export { typeDocumentation };