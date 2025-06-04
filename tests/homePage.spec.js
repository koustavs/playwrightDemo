const { test } = require('@playwright/test');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const loginData = require("../testData/login.json");
const registrationData = require("../testData/registration.json");
const Evidence = require('../utils/common');
import { setupPageCrashListener } from '../utils/common';
const { PageObjectManager } = require('../pages/PageObjectManager');


test.describe('Home Page Landing > Brand/Category Checking', () => {
    test('Test - Verify Home page category & brand names display for user not logged-in', { tag: '@Smoke' }, async ({ page }, testInfo) => {
        setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);
        const Login = PgObjManager.getLoginPage();
        const Home = PgObjManager.getHomePage();
        const report = new Evidence();

        await allure.displayName("Test - Verify Home page category & brand names");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Registration");
        await allure.severity(Severity.NORMAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Home page loaded');
        await PgObjManager.Home.verifyCategoryListCount();
        await PgObjManager.Home.verifyBrandNameListCount();
        await report.captureScreenshot(page, 'Validated Brand & Category list');
        await test.step('Create PDF report file', async () => {
            await report.createPDF(report.generateFileName(testInfo), testInfo);
        });

    });


    test('Test - Verify Home page Category & Brand names display for logged-in user', { tag: '@Regression' }, async ({ page }, testInfo) => {
        setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);
        const Login = PgObjManager.getLoginPage();
        const Home = PgObjManager.getHomePage();
        const report = new Evidence();

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await report.captureScreenshot(page, 'Logged in successfully');
        await PgObjManager.Home.verifySuccessfulLogin();
        await PgObjManager.Home.verifyCategoryListCount();
        await PgObjManager.Home.verifyBrandNameListCount();
        await report.captureScreenshot(page, 'Validated Brand & Category list');
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page, 'Logged out successfully');
        await test.step('Create PDF report file', async () => {
            await report.createPDF(report.generateFileName(testInfo), testInfo);
        });
    });
});

test.describe('Account Deletion Flow', () => {
    for (const reg of registrationData) {
        test(`Test - Verify successful account deletion of ${reg.email}`, { tag: '@Regression' }, async ({ page }, testInfo) => {
            setupPageCrashListener(page);
            const PgObjManager = new PageObjectManager(page);
            const Login = PgObjManager.getLoginPage();
            const Home = PgObjManager.getHomePage();
            const report = new Evidence();

            await PgObjManager.Login.loadApplicationUrl();
            await PgObjManager.Home.verifyTitle();
            await report.captureScreenshot(page, 'Home page loaded');
            await PgObjManager.Home.clickLoginSignUpLink();
            await PgObjManager.Login.validLogin(reg.email, reg.password);  //a@c.in  //a@d.in
            await report.captureScreenshot(page, 'Logged in successfully');
            await PgObjManager.Home.verifySuccessfulLogin();
            await PgObjManager.Home.clickDeleteAccountLink();
            await report.captureScreenshot(page, 'Account deleted successfully');
            await PgObjManager.Home.verifySuccessfulAccountDeletionAndContinue();
            await test.step('Create PDF report file', async () => {
                await report.createPDF(report.generateFileName(testInfo), testInfo);
            });

        });
    }
});