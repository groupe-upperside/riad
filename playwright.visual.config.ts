import {defineConfig} from '@playwright/test';
import base from './playwright.config';

export default defineConfig({
    ...base,
    testDir: './tests/visual',
    timeout: 60000,
    outputDir: './test-results/visual',
    snapshotPathTemplate: '{testDir}/snapshots/{arg}{ext}',
    use: {...base.use, browserName: 'chromium', colorScheme: 'light'},
    projects: [{name: 'chromium'}],
});
