import {existsSync, promises as fs} from 'node:fs';
import path from 'node:path';
const KEY_VALUE_LINE = /^([A-Z0-9_]+)=.*/gm;
const ENCODING: BufferEncoding = 'utf8';
async function main(): Promise<void> {
    const fileName = process.argv[2] ?? '.env';
    const envPath = path.join(process.cwd(), fileName);
    if (!existsSync(envPath)) {
        console.log(`\nNo ${fileName} file found`);
        return;
    }
    try {
        const fileData = (await fs.readFile(envPath, ENCODING)).replace(/\r\n?/g, '\n');
        const outPath = path.join(process.cwd(), '.env.example');
        const template = existsSync(outPath)
            ? (await fs.readFile(outPath, ENCODING)).replace(/\r\n?/g, '\n')
            : fileData.replace(KEY_VALUE_LINE, '$1=');
        const knownKeys = new Set(Array.from(template.matchAll(KEY_VALUE_LINE), (match) => match[1]));
        const missingKeys = Array.from(new Set(Array.from(fileData.matchAll(KEY_VALUE_LINE), (match) => match[1])))
            .filter((key) => !knownKeys.has(key))
            .map((key) => `${key}=`);
        const output = [template.trimEnd(), ...missingKeys].join('\n') + '\n';
        await fs.writeFile(outPath, output, ENCODING);
        console.log(`\nSuccessfully refreshed ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
        console.error('Error:', err);
        process.exitCode = 1;
    }
}
void main();
