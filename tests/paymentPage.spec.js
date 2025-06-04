const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
const { PageObjectManager } = require('../pages/PageObjectManager');
const loginData = require("../testData/login.json");
const productData = require("../testData/products.json");
const Evidence = require('../utils/common');
import { setupPageCrashListener } from '../utils/common';
const report = new Evidence();


test.describe('Payments', () => {
    test('Test - Verify Place order flow', { tag: '@Regression' }, async ({ page },testInfo) => {
setupPageCrashListener(page);
        const PgObjManager=new PageObjectManager(page);

        await allure.displayName("Test - Verify Place order flow");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Place order");
        await allure.severity(Severity.CRITICAL);

        await PgObjManager.Login.loadApplicationUrl();
        await PgObjManager.Home.verifyTitle();
        await report.captureScreenshot(page,'Home page loaded');
        await PgObjManager.Home.clickLoginSignUpLink();
        await report.captureScreenshot(page,'Login Screen Loaded');
        await PgObjManager.Login.validLogin(loginData.email, loginData.password); //a@b.in
        await PgObjManager.Home.verifySuccessfulLogin();
        await PgObjManager.Home.clickProductsLink();
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        const count = await PgObjManager.Product.searchForProduct(productData.searchProductName1)
        await PgObjManager.Home.scrollPageVerticallyBy(300);
        await report.captureScreenshot(page,'Searched for product');
        await expect(count).toBe(Number(productData.kidsCount));
        await PgObjManager.Product.addProductToCart();
        await PgObjManager.Home.clickCartLink();
        await report.captureScreenshot(page,'Product added to cart');
        await PgObjManager.Cart.verifyProceedToCheckoutButton();
        await PgObjManager.Cart.clickProceedToCheckout();
        const invoiceTotalFromCart = await PgObjManager.Cart.verifyCartTotal();
        await PgObjManager.Checkout.verifyAllHeaders();
        await report.captureScreenshot(page,'Checkout page loaded');
        const invoiceTotalFromCheckout = await PgObjManager.Checkout.verifyCheckoutTotal();
        await PgObjManager.Checkout.enterOrderComment();
        await PgObjManager.Checkout.clickPlaceOrder();
        await PgObjManager.Payment.verifyPaymentHeader();
        await PgObjManager.Payment.enterCardDetails();
        await report.captureScreenshot(page,'Captured payment details',[PgObjManager.Payment.cardNumber_textBox,PgObjManager.Payment.cardCVC_textBox,PgObjManager.Payment.cardExpiryMonth_textBox]);
        await PgObjManager.Payment.clickPayAndConfirmOrder();
        await PgObjManager.Order.verifyOrderPlacementSuccessScreen();
        const invoiceTotalFromFile = await PgObjManager.Order.clickDownloadInvoiceButton();
        await report.captureScreenshot(page,'Invoice Downloaded');
        // await expect(invoiceTotalFromCart,"Amount Should match").toBe(invoiceTotalFromFile);
        await expect(invoiceTotalFromCheckout,"Amount Should match").toBe(invoiceTotalFromFile);
        await PgObjManager.Order.clickContinueButton();
        await PgObjManager.Home.verifySuccessfulLogin();
        await report.captureScreenshot(page,'Redirect to Home page');
        await PgObjManager.Home.clickLogoutLink();
        await report.captureScreenshot(page,'Logged out successfully');
        await test.step('Create PDF report file',async()=>{
            await report.createPDF(report.generateFileName(testInfo),testInfo);
        });

    });//report
});