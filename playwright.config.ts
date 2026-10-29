import {defineConfig, devices} from '@playwright/test';
import 'dotenv/config';

const PORT = Number(process.env.E2E_PORT ?? 3101);
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
    testDir: './tests/e2e',
    outputDir: './test-results/functional',
    testMatch: /.*\.spec\.ts$/,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: process.env.CI ? [['github'], ['html', {open: 'never'}]] : 'list',
    use: {
        baseURL: BASE_URL,
        locale: 'fr-FR',
        timezoneId: 'Europe/Paris',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
    webServer: {
        command: 'node tests/e2e/server/start.cjs',
        url: `${BASE_URL}/api/health`,
        env: {E2E_PORT: String(PORT), NODE_ENV: 'production'},
        reuseExistingServer: false,
        timeout: 120_000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
