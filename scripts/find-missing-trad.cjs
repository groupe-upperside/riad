const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const keys = new Set();
const flatten = (node, prefix) =>
    typeof node === 'string'
        ? keys.add(prefix)
        : Object.entries(node).forEach(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
flatten(JSON.parse(fs.readFileSync(path.join(ROOT, 'translations/fr.json'), 'utf8')), '');

const listFiles = (dir) =>
    fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? listFiles(full) : /\.tsx?$/.test(entry.name) ? [full] : [];
    });

const binding =
    /(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:\{[^}]*namespace:\s*)?'([\w.]+)'/g;
const missing = [];

for (const file of ['app', 'components'].flatMap((dir) => listFiles(path.join(ROOT, dir)))) {
    const source = fs.readFileSync(file, 'utf8');
    const namespacesByName = new Map();
    for (const [, name, namespace] of source.matchAll(binding)) {
        namespacesByName.set(name, [...(namespacesByName.get(name) ?? []), namespace]);
    }
    for (const [name, namespaces] of namespacesByName) {
        for (const [, key] of source.matchAll(
            new RegExp(`\\b${name}(?:\\.(?:rich|markup|raw|has))?\\(\\s*'([\\w.]+)'`, 'g'),
        )) {
            if (!namespaces.some((namespace) => keys.has(`${namespace}.${key}`))) {
                missing.push(`${namespaces.join('|')}.${key}  ${path.relative(ROOT, file)}`);
            }
        }
    }
}

console.log(missing.length ? [...new Set(missing)].join('\n') : 'No missing translation keys.');
process.exitCode = missing.length ? 1 : 0;
