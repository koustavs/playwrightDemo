// @ts-check
import { defineConfig, devices } from '@playwright/test';
import * as os from "node:os";

const isCI = !!process.env.CI;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
if(!process.env.EXE_ENV){
  require('dotenv').config({path:'./config/.env'});
  console.log(`./config/.env`);
}else{
  require('dotenv').config({ path: `./config/.env.${process.env.EXE_ENV}` });
  console.log(`./config/.env.${process.env.EXE_ENV}`);
}
console.log(`Running tests with environment: ${process.env.EXE_ENV || 'default'}\nheadless: ${isCI ? 'true' : 'false'}`);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout:75*1000,
  expect:{
    timeout:25*1000,
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  workers:1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 2,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    ["line"],
    ['html'],
    ["allure-playwright",
      {
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },

    ]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://www.automationexercise.com/',
    baseURL: process.env.URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video:'off',
    headless: isCI,
    // storageState:'config/auth.json',
    screenshot:'off',
    launchOptions: {
      args: [
        "--start-maximized",
        /*'--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-setuid-sandbox',
        '--no-zygote',
        '--single-process',
        '--disable-dev-tools'*/
      ],
      // slowMo:190
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {viewport: null,}
      // name: "Google Chrome",
      // use: { ...devices['Desktop Chrome'] },

    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

