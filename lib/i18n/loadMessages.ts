import {unstable_noStore as noStore} from 'next/cache';
import {promises as fs} from 'fs';
import path from 'path';

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(base: T, extra: U): T & U {
    const out: Record<string, unknown> = {...base};
    for (const [key, val] of Object.entries(extra)) {
        if (key in out && isPlainObject(out[key]) && isPlainObject(val)) {
            out[key] = deepMerge(out[key] as Record<string, unknown>, val as Record<string, unknown>);
        } else {
            out[key] = val;
        }
    }
    return out as T & U;
}

export async function loadMessagesFromDisk(locale: string) {
    noStore();
    const dir = path.join(process.cwd(), 'translations');
    const baseFile = path.join(dir, `${locale}.json`);
    const extraFile = path.join(dir, `${locale}.extra.json`);

    const raw = await fs.readFile(baseFile, 'utf-8');
    const base = JSON.parse(raw) as Record<string, unknown>;

    try {
        const rawExtra = await fs.readFile(extraFile, 'utf-8');
        const extra = JSON.parse(rawExtra) as Record<string, unknown>;
        return deepMerge(base, extra) as Record<string, unknown>;
    } catch {
        // No extra file; fall back to base
        return base;
    }
}
