process.env.NODE_ENV = 'test';
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    modulePathIgnorePatterns: ['<rootDir>/.next/standalone'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
    testEnvironment: '<rootDir>/tests/setup/jsdom-environment.js',
    testMatch: ['<rootDir>/tests/(unit|integration)/**/*.test.ts?(x)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^server-only$': '<rootDir>/tests/setup/server-only.cjs',
    },
    collectCoverageFrom: [
        'lib/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!app/**/layout.tsx',
        '!app/**/route.ts',
        '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
};

const ESM_DEPENDENCIES = ['next-intl', 'use-intl', '@formatjs', 'intl-messageformat'];

module.exports = async () => {
    const config = await createJestConfig(customJestConfig)();

    return {
        ...config,
        transformIgnorePatterns: [`node_modules/(?!(?:.pnpm/)?(?:${ESM_DEPENDENCIES.join('|')}))`],
    };
};
