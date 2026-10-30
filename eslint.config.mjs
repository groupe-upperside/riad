import {defineConfig, globalIgnores} from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
    ...tseslint.configs.recommended,
    globalIgnores([
        'node_modules/**',
        '.next/**',
        '.agents/**',
        '**/.*/**',
        '.idea/**',
        '.swc/**',
        'out/**',
        'build/**',
        'coverage/**',
        'test-results/**',
        'playwright-report/**',
        'next-env.d.ts',
    ]),
    {
        files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
        plugins: {
            '@next/next': nextPlugin,
            'react-hooks': reactHooks,
        },
        rules: {
            '@next/next/google-font-display': 'warn',
            '@next/next/google-font-preconnect': 'warn',
            '@next/next/next-script-for-ga': 'warn',
            '@next/next/no-async-client-component': 'warn',
            '@next/next/no-before-interactive-script-outside-document': 'warn',
            '@next/next/no-css-tags': 'warn',
            '@next/next/no-head-element': 'warn',
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',
            '@next/next/no-page-custom-font': 'warn',
            '@next/next/no-styled-jsx-in-document': 'warn',
            '@next/next/no-sync-scripts': 'error',
            '@next/next/no-title-in-document-head': 'warn',
            '@next/next/no-typos': 'warn',
            '@next/next/no-unwanted-polyfillio': 'warn',
            '@next/next/inline-script-id': 'error',
            '@next/next/no-assign-module-variable': 'error',
            '@next/next/no-document-import-in-page': 'error',
            '@next/next/no-duplicate-head': 'error',
            '@next/next/no-head-import-in-document': 'error',
            '@next/next/no-script-component-in-head': 'error',
            'react-hooks/purity': 'warn',
            'react-hooks/static-components': 'warn',
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/immutability': 'warn',
            'react-hooks/preserve-manual-memoization': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
            quotes: ['warn', 'single', {avoidEscape: true}],
        },
    },
    {
        files: ['tests/setup/jsdom-environment.js'],
        plugins: {'@typescript-eslint': tseslint.plugin},
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['*.cjs', 'scripts/*.cjs', 'tests/**/*.cjs', 'tests/**/*.ts', 'tests/**/*.tsx'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        ignores: [
            'push-trad.ts',
            'pull-trad.ts',
            'generate-env-example.js',
            'next.config.ts',
            'lib/i18n/custom-next-intl-client-provider.tsx',
            'lib/playwright/base-fixtures.ts',
            'lib/markerio/markerio-provider.ts',
            'types/api-schema.d.ts',
        ],
    },
]);

export default eslintConfig;
