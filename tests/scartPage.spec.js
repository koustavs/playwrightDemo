const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const { PageObjectManager } = require('../pages/PageObjectManager');
const loginData = require("../testData/login.json");
const productData = require("../testData/products.json");
const Evidence = require('../utils/common');
const { setupPageCrashListener } = require('../utils/common');
const report = new Evidence();


test.describe('Cart Operations', () => {
    test('Test - Validate Cart Item Removal', { tag: '@Smoke' }, async ({ page },testInfo) => {
setupPageCrashListener(page);
        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify Cart Item Removal");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Cart");
        await allure.severity("Critical");

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await report.captureScreenshot(page,'Login Screen Loaded');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await report.captureScreenshot(page,'Logged in successfully');
        await PgObjManager.Home.clickCartLink();
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page,'Cart loaded successfully');
        await PgObjManager.Cart.removeCartItem();
        await PgObjManager.Cart.verifyCartEmpty();
        await report.captureScreenshot(page,'Cart empty');
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page,'Logged out successfully');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });

    test('Test - Verify Proceed to checkout flow for Logged-in User', { tag: '@Regression' }, async ({ page },testInfo) => {
setupPageCrashListener(page);
        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify checkout flow for Logged-in User");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Checkout");
        await allure.severity(Severity.CRITICAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await report.captureScreenshot(page,'Login Screen Loaded');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await report.captureScreenshot(page,'Logged in successfully');
        await PgObjManager.Home.verifySuccessfulLogin();
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName2);
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page,'Searched for Product');
        await expect(count).toBe(Number(productData.tshirtCount));
        await PgObjManager.Product.addProductToCart();
        await report.captureScreenshot(page,'Cart loaded successfully');
        await PgObjManager.Home.clickCartLink();
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Cart.clickProceedToCheckout();
        await report.captureScreenshot(page,'Checkout screen  displayed');
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page,'Logged out successfully');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });
});