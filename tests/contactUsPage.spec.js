const { test } = require('@playwright/test');
const { PageObjectManager } = require('../pages/PageObjectManager');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const Evidence = require('../utils/common');
const { setupPageCrashListener } = require('../utils/common');
const report = new Evidence();

test.describe('Contact Us', () => {
    test('Test - Verify Contact Form flow', { tag: '@Smoke' }, async ({ page }, testInfo) => {
        // setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);

        await allure.displayName("Test - Verify Home page category/brand names");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Registration");
        await allure.severity(Severity.NORMAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Screen loaded');
        await PgObjManager.Home.clickContactUsLink();
        await report.captureScreenshot(page, 'Caontavt US page loaded');
        await PgObjManager.Contact.verifyContactUsPageLoad();
        await PgObjManager.Contact.fillContactUsForm();
        await PgObjManager.Contact.uploadFile();
        await report.captureScreenshot(page, 'Captured all feedback');
        await PgObjManager.Contact.clickSubmitOnForm();
        await test.step('Verify form submit successful', async () => {
            await report.captureScreenshot(page, 'Form submitted successfully');
        });
        await test.step('Create PDF report file', async () => {
            await report.createPDF(report.generateFileName(testInfo), testInfo);
        });

    });//report
});