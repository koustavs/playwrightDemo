const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const Evidence = require('../utils/common');
const { PaymentPage } = require('../pages/PaymentPage');
const { PageObjectManager } = require('../pages/PageObjectManager');
const loginData = require("../testData/login.json");
const productData = require("../testData/products.json");
const report = new Evidence();

test.describe('Login Module', () => {
    test('Test - Unsuccessful Login - Automation Exercise.com', { tag: '@Regression' }, async ({ page }, testInfo) => {

        const PgObjManager = new PageObjectManager(page);

        await allure.displayName("Test - Verify Unsuccessful Login");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Login");
        await allure.severity(Severity.TRIVIAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Login Screen Loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await PgObjManager.Login.invalidLogin(loginData.email, loginData.invalidPassword);
        await PgObjManager.Login.verifyInvalidLoginError();
        await report.captureScreenshot(page, 'Error message displayed');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });//report


    test('Test - Successful Login - Automation Exercise.com', { tag: '@Regression' }, async ({ page }, testInfo) => {

        const PgObjManager = new PageObjectManager(page);

        await allure.displayName("Test - Verify Successful Login");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Login");
        await allure.severity(Severity.CRITICAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Login Screen Loaded');
        await report.highLightElementDuration(page, PgObjManager.Home.loginSignUp_link, 300);
        // await report.highLightElementDuration(page,,300);
        await PgObjManager.Home.clickLoginSignUpLink();
        // await Login.validLogin(loginData.email, loginData.password);
        await PgObjManager.Login.validLogin(process.env.EMAIL, process.env.PASSWORD);
        await PgObjManager.Home.verifySuccessfulLogin();
        await report.captureScreenshot(page, 'Logged In successfully');
        await report.highLightElementDuration(page, PgObjManager.Home.logout_link, 300);
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page, 'Logged Out successfully');
        // await report.captureScreenshot(page,'');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });

    test('Test - Verify Login before Checkout', { tag: '@Smoke' }, async ({ page }, testInfo) => {

        const PgObjManager = new PageObjectManager(page);

        await allure.displayName("Test - Verify product search(User not Logged-in)");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Search");
        await allure.severity("Critical");

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page, 'Login Screen Loaded');
        await report.highLightElementDuration(page, PgObjManager.Home.products_link, 300);
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(200);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName2);
        await PgObjManager.Home.scrollPageVerticallyBy(200);
        await report.captureScreenshot(page, 'Searched product');
        await expect(count).toBe(Number(productData.tshirtCount));
        await PgObjManager.Product.addProductToCart();
        await report.captureScreenshot(page, 'Added product');
        await PgObjManager.Home.clickCartLink();
        await report.captureScreenshot(page, 'Landed in Cart screen');
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Cart.clickProceedToCheckout();
        await report.captureScreenshot(page, 'Popup displayed');
        await PgObjManager.Cart.verifyRegisterLoginPopupLink();
        await PgObjManager.Cart.clickRegisterLogin();
        await report.captureScreenshot(page, 'Login screen displayed');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await PgObjManager.Home.clickCartLink();
        await report.captureScreenshot(page, 'Landed on Cart screen');
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Cart.clickProceedToCheckout();
        const invoiceTotalFromCart = await PgObjManager.Cart.verifyCartTotal();
        await PgObjManager.Checkout.verifyAllHeaders();
        await report.captureScreenshot(page, 'Landed on Checkout screen');
        const invoiceTotalFromCheckout = await PgObjManager.Checkout.verifyCheckoutTotal();
        await PgObjManager.Checkout.enterOrderComment();
        await report.captureScreenshot(page, 'Entered required details');
        await PgObjManager.Checkout.clickPlaceOrder();
        await PgObjManager.Payment.verifyPaymentHeader();
        await PgObjManager.Payment.enterCardDetails();
        await report.captureScreenshot(page, 'Entering payement details - masked for security/privacy', [PgObjManager.Payment.cardNumber_textBox, PgObjManager.Payment.cardCVC_textBox, PgObjManager.Payment.cardExpiryMonth_textBox]);
        await PgObjManager.Payment.clickPayAndConfirmOrder();
        await report.captureScreenshot(page, 'Confirmed Order');
        await PgObjManager.Order.verifyOrderPlacementSuccessScreen();
        const invoiceTotalFromFile = await PgObjManager.Order.clickDownloadInvoiceButton();
        await report.captureScreenshot(page, 'Invoice Downloaded');
        // await expect(invoiceTotalFromCart,"Amount Should match").toBe(invoiceTotalFromFile);
        await expect(invoiceTotalFromCheckout, "Amount Should match").toBe(invoiceTotalFromFile);
        await PgObjManager.Order.clickContinueButton();
        await report.captureScreenshot(page, 'Redirect to Home page');
        await PgObjManager.Home.verifySuccessfulLogin();
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page, 'Logged out');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });
});

test.skip('Test runUFTBatFile()', async ({ page }) => {

    runUFTBatFile();
    await page.waitForTimeout(3000);

});

test.skip('Test - Read .env File', async ({ page }) => {

    console.log(process.env.EXE_ENV);
    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);
    console.log(process.env.URL);
    console.log({ path: `.env.${process.env.EXE_ENV}` });
    console.log({ path: './config/.env' });


});