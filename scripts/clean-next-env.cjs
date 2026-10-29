const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'next-env.d.ts');
const text = fs.readFileSync(file, 'utf8');
const routeImport =
    text.match(/import\s+["'](.+\.next\/(?:dev\/)?types\/routes\.d\.ts)["'];?/)?.[1] ?? './.next/types/routes.d.ts';

fs.writeFileSync(file, `import 'next';\nimport 'next/image-types/global';\nimport '${routeImport}';\n`);
