import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
    //change default timeout
    //globalTimeout: 60000,
    timeout: 20000,

    //locator timeout
    expect: {
        timeout: 2000
    },

    retries: 0,
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:4200',
        globalQAUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
        trace: 'on-first-retry',
        navigationTimeout: 5000,
        video: {
            mode: 'off',
            size: { width: 1920, height: 1080 }
        }
    },

    projects: [
        // {
        //   name: 'qat1',
        //   use: { ...devices['Desktop Chrome'], 
        //   baseURL: 'http://localhost:4201'  
        //   },
        // },
        // {
        //   name: 'qat2',
        //   use: { ...devices['Desktop Chrome'], 
        //   baseURL: 'http://localhost:4202'  
        //   },
        // },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
    ],

    webServer: {
        command: 'npm run start',
        url: 'http://localhost:4200',
        timeout: 120 * 1000,
        reuseExistingServer: true
    }

});