import {defineConfig} from '@playwright/test';
import base from './playwright.config';

export default defineConfig({
    ...base,
    testDir: './tests/media',
    outputDir: './test-results/media',
    timeout: 60000,
    workers: 2,
    retries: 0,
    projects: [{name: 'chromium'}],
});
