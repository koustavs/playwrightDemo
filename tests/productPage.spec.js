const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const { PageObjectManager } = require('../pages/PageObjectManager');
const loginData = require("../testData/login.json");
const productData = require("../testData/products.json");
const Evidence = require('../utils/common');
const report = new Evidence();


test.describe('Product page > Search Product', () => {
    test('Test - Verify product search(User not Logged-in)', { tag: '@Smoke' }, async ({ page },testInfo )=> {

        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify product search(User not Logged-in)");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Search");
        await allure.severity("Critical");

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(200);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName1);
        await PgObjManager.Home.scrollPageVerticallyBy(200);
        await report.captureScreenshot(page,'Searched for Product');
        await expect(count).toBe(Number(productData.kidsCount));
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });


    test('Test - Verify product search(User Logged-in)', { tag: '@Regression' }, async ({ page },testInfo) => {

        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify product search(User Logged-in)");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Search");
        await allure.severity("Critical");

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await report.captureScreenshot(page,'Login Screen Loaded');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await PgObjManager.Home.verifySuccessfulLogin();
        await report.captureScreenshot(page,'Logged in successfully');
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName2);
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page,'Searched for Product');
        await expect(count).toBe(Number(productData.tshirtCount));
        await page.waitForTimeout(2000);
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page,'Logged out successfully');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });
});


test.describe('Product page > Add Product to Cart', () => {
    test('Test - Verify add product to cart(User Logged-in)', { tag: '@Regression' }, async ({ page },testInfo) => {

        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify add product to cart(User Logged-in)");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Cart");
        await allure.severity(Severity.CRITICAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await report.captureScreenshot(page,'Login Screen Loaded');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await PgObjManager.Home.verifySuccessfulLogin();
        await report.captureScreenshot(page,'Logged in successfully');
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName2);
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page,'Searched for Product');
        await expect(count).toBe(Number(productData.tshirtCount));
        await PgObjManager.Product.addProductToCart();
        await report.captureScreenshot(page,'Product added to cart');
        await PgObjManager.Home.clickCartLink();
        await report.captureScreenshot(page,'Cart loaded successfully');
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await report.captureScreenshot(page,'Checkout screen  displayed');
        await PgObjManager.Cart.verifyCartTotal();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page,'Checkout total  verified');
        await page.waitForTimeout(2000);
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page,'Logged out successfully');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });


    test('Test - Validate Cart Total', { tag: '@Regression' }, async ({ page },testInfo) => {

        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify Cart Total");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Cart");
        await allure.severity("Critical");

        await PgObjManager.Login.loadApplicationUrl();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await report.captureScreenshot(page,'Login Screen Loaded');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await PgObjManager.Home.clickCartLink();
        await report.captureScreenshot(page,'Logged in successfully');
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Home.scrollPageVerticallyBy(250);
        await report.captureScreenshot(page,'Cart loaded successfully');
        await PgObjManager.Cart.verifyCartTotal();
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page,'Logged out successfully');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });
});