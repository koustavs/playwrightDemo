const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";
const { setupPageCrashListener } = require('../utils/common');
const { PageObjectManager } = require('../pages/PageObjectManager');
const productData = require("../testData/products.json");
const Evidence = require('../utils/common');
let count = 0;
let invoiceTotalFromCheckout = 0;
let invoiceTotalFromFile = 0;


test.describe('Account Operations', () => {
    test.only('Test - Verify New User Registration', { tag: ['@Regression', '@WebApp'] }, async ({ page }, testInfo) => {
        // setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);
        const report = new Evidence();

        await allure.displayName("Test - Verify New User Registration");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Registration");
        await allure.severity("Critical");

        await test.step('Loading Application URL', async (page) => {
            await PgObjManager.Login.loadApplicationUrl();
        });
        await test.step('Verify the page title', async () => {
            await PgObjManager.Home.verifyTitle();
        });
        // await test.step('Take screenshot', async () => {
        //     await report.captureScreenshot(page, 'Login Screen Loaded');
        // });
        await test.step('Click Login/SignUp link', async () => {
            await PgObjManager.Home.clickLoginSignUpLink();
        });
        await test.step('Capturing New user details', async () => {
            await PgObjManager.Login.inputNewUserDetails();
        });
        await test.step('Capturing all New user registration details', async () => {
            await PgObjManager.Account.fillRegistrationForm(); // a@c.in
        });
        // await test.step('Take screenshot', async () => {
        //     await report.captureScreenshot(page, 'Captured all details');
        // });
        await test.step('Click Create Account button', async () => {
            await PgObjManager.Account.clickCreateAccount();
        });
        // await test.step('Success message displayed', async () => {
        //     await report.captureScreenshot(page, 'Successfully created account');
        // });
        await test.step('Click the continue button',async()=>{
            await PgObjManager.Account.clickCreateUserSuccessContinue();
        });
        await test.step('Verify login with new user details is successful',async()=>{
            await PgObjManager.Home.verifySuccessfulLogin();
        });
        await test.step('Click Logout link',async()=>{
            await PgObjManager.Home.clickLogoutLink();
        });
        // await test.step('Verify successful logout', async () => {
        //     await report.captureScreenshot(page, 'Logged out successfully');
        // });
        // await test.step('Create PDF report file', async () => {
        //     await report.createPDF(report.generateFileName(testInfo), testInfo);
        
    });//report

    test('Test - Verify Existing User Registration', { tag: '@Regression' }, async ({ page }, testInfo) => {
        // setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);
        const report = new Evidence();

        await allure.displayName("Test - Verify Existing User Registration");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Registration");
        await allure.severity("Critical");

        await test.step('Loading Application URL', async (page) => {
            await PgObjManager.Login.loadApplicationUrl();
        });
        await test.step('Verify the page title', async () => {
            await PgObjManager.Home.verifyTitle();
        });
        // await test.step('Take screenshot', async () => {
        //     await report.captureScreenshot(page, 'Login Screen Loaded');
        // });
        await test.step('Click Login/SignUp link', async () => {
            await PgObjManager.Home.clickLoginSignUpLink();
        });
        await test.step('Capturing New user details', async () => {
            await PgObjManager.Login.inputNewUserDetails(); // a@c.in
        });
        // await test.step('Take screenshot', async () => {
        //     await report.captureScreenshot(page, 'Captured already existing user details');
        // });
        await test.step('verify the error message', async () => {
            await PgObjManager.Login.verifyAlreadyExistsUserMessage();
        });
        // await test.step('Take screenshot', async () => {
        //     await report.captureScreenshot(page, 'Error message displayed');
        // });
        // await test.step('Create PDF report file', async () => {
        //     await report.createPDF(report.generateFileName(testInfo), testInfo);
        // });

    });

    test('Test - Verify Registration flow before Checkout', { tag: '@Regression' }, async ({ page }, testInfo) => {
        // setupPageCrashListener(page);
        const PgObjManager = new PageObjectManager(page);
        const report = new Evidence();

        await allure.displayName("Test - Verify product search(User not Logged-in)");
        await allure.owner("Koustav Saha");
        await allure.tags("Web interface", "Search");
        await allure.severity("Critical");

        await test.step('Loading Application URL', async (page) => {
            await PgObjManager.Login.loadApplicationUrl();
        });
        await test.step('Verify the page title', async () => {
            await PgObjManager.Home.verifyTitle();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Login Screen Loaded');
        // });
        await test.step('Click Products link', async () => {
            await PgObjManager.Home.clickProductsLink();
        });
        await test.step('Scroll page', async () => {
            await PgObjManager.Home.scrollPageVerticallyBy(200);
        });
        await test.step('Search for product', async () => {
            count = await PgObjManager.Product.searchForProduct(productData.searchProductName2);
        });
        await test.step('Scroll page', async () => {
            await PgObjManager.Home.scrollPageVerticallyBy(200);
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Searched for product');
        // });
        await test.step('Verify product count', async () => {
            expect(count).toBe(Number(productData.tshirtCount));
        });
        await test.step('Add product to Cart', async () => {
            await PgObjManager.Product.addProductToCart();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Clicked Add to Cart');
        // });
        await test.step('Click Cart link', async () => {
            await PgObjManager.Home.clickCartLink();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Cart page loaded');
        // });
        await test.step('Verify Checkout button', async () => {
            await PgObjManager.Cart.verifyProceedToCheckoutButton();
        });
        await test.step('Click Proceed to Checkout', async () => {
            await PgObjManager.Cart.clickProceedToCheckout();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Login popup displayed');
        // });
        await test.step('Verify login popup is displayed', async () => {
            await PgObjManager.Cart.verifyRegisterLoginPopupLink();
        });
        await test.step('Click Register/Login button', async () => {
            await PgObjManager.Cart.clickRegisterLogin();
        });
        await test.step('Input New user details', async () => {
            await PgObjManager.Login.inputNewUserDetailsWhileCheckout(); // a@d.in
        });
        await test.step('Capturing all New user registration details', async () => {
            await PgObjManager.Account.fillRegistrationFormWhileCheckout();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Captured user details');
        // });
        await test.step('Click Create Account', async () => {
            await PgObjManager.Account.clickCreateAccount();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Successfully created account');
        // });
        await test.step('Click Continue after User creation', async () => {
            await PgObjManager.Account.clickCreateUserSuccessContinue();
        });
        await test.step('Verify successful login - Home screen', async () => {
            await PgObjManager.Home.verifySuccessfulLogin();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Logged in successfully');
        // });
        await test.step('Click Cart option', async () => {
            await PgObjManager.Home.clickCartLink();
        });
        await test.step('Verify Proceed to Checkout button', async () => {
            await PgObjManager.Cart.verifyProceedToCheckoutButton();
        });
        await test.step('Click Proceed to Checkout', async () => {
            await PgObjManager.Cart.clickProceedToCheckout();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Checkout page');
        // });
        await test.step('Verify Cart total', async () => {
            const invoiceTotalFromCart = await PgObjManager.Cart.verifyCartTotal();
        });
        await test.step('Verify All Headers', async () => {
            await PgObjManager.Checkout.verifyAllHeaders();
        });
        await test.step('Verify Checkout Total', async () => {
            invoiceTotalFromCheckout = await PgObjManager.Checkout.verifyCheckoutTotal();
        });
        await test.step('Enter order comments', async () => {
            await PgObjManager.Checkout.enterOrderComment();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Comments entered');
        // });
        await test.step('Click Place Order', async () => {
            await PgObjManager.Checkout.clickPlaceOrder();
        });
        await test.step('Verify Payment screen Headers', async () => {
            await PgObjManager.Payment.verifyPaymentHeader();
        });
        await test.step('Capture card details', async () => {
            await PgObjManager.Payment.enterCardDetails();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Captured payment details', [PgObjManager.Payment.cardNumber_textBox, PgObjManager.Payment.cardCVC_textBox, PgObjManager.Payment.cardExpiryMonth_textBox]);
        // });
        await test.step('Click Pay & Confirm Order', async () => {
            await PgObjManager.Payment.clickPayAndConfirmOrder();
        });
        await test.step('Verify Order is placed', async () => {
            await PgObjManager.Order.verifyOrderPlacementSuccessScreen();
        });
        await test.step('Download Invoice', async () => {
            invoiceTotalFromFile = await PgObjManager.Order.clickDownloadInvoiceButton();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Invoice Downloaded');
        // });
        // await expect(invoiceTotalFromCart,"Amount Should match").toBe(invoiceTotalFromFile);
        await test.step('Verifying Checkout Amount with Invoice Amount', async () => {
            expect(invoiceTotalFromCheckout, "Amount Should match").toBe(invoiceTotalFromFile);
        });
        await test.step('Click Continue button', async () => {
            await PgObjManager.Order.clickContinueButton();
        });
        // await test.step('Take Screenshot', async () => {
        //     await report.captureScreenshot(page, 'Redirect to Home page');
        // });
        await test.step('Verify Successful Login', async () => {
            await PgObjManager.Home.verifySuccessfulLogin();
        });
        await test.step('Click Logout', async () => {
            await PgObjManager.Home.clickLogoutLink();
        });
        // await test.step('Take screenshot', async () => {
        //     await report.captureScreenshot(page, 'Error message displayed');
        // });
        // await test.step('Create PDF report file', async () => {
        //     await report.createPDF(report.generateFileName(testInfo), testInfo);
        // });

    });
});