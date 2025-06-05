const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const { PageObjectManager } = require('../pages/PageObjectManager');
const loginData = require("../testData/login.json");
const productData = require("../testData/products.json");
const Evidence = require('../utils/common');
const { setupPageCrashListener } = require('../utils/common');
// const authFile="config/auth.json"
const report = new Evidence();

test.describe('Checkout', () => {
    test('Test - Verify Checkout page', { tag: '@Regression' }, async ({ page }, testInfo) => {
        // setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);

        await allure.displayName("Test - Verify Checkout page");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Checkout");
        await allure.severity(Severity.CRITICAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Login Screen Loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await PgObjManager.Home.verifySuccessfulLogin();
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName1);
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page, 'Product added to cart');
        await expect(count).toBe(Number(productData.kidsCount));
        await PgObjManager.Product.addProductToCart();
        await PgObjManager.Home.clickCartLink();
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Cart.clickProceedToCheckout();
        await PgObjManager.Checkout.verifyAllHeaders();
        await PgObjManager.Checkout.verifyPlaceOrderButtonAndTotalAmount();
        await PgObjManager.Home.clickLogoutLink();
        await test.step('Verify successful logout', async () => {
            await report.captureScreenshot(page, 'Logged out successfully');
        });
        await test.step('Create PDF report file', async () => {
            await report.createPDF(report.generateFileName(testInfo), testInfo);
        });
        // await page.context().storageState({path:authFile});

    });//report
});