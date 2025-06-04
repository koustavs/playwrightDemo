const { expect } = require('@playwright/test');
const registrationData = require("../testData/registration.json");
const registrationData2 = require("../testData/registrationCheckout.json");



class LoginPage {

    constructor(page) {

        this.page = page;
        // this.logger=logger;

        this.emailAddressLogin_textBox = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordLogin_textBox = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
        this.nameSignUp_textBox = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Name');
        this.emailSignUp_textBox = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.login_button = page.locator('button:has-text("Login")');
        this.signUp_button = page.locator('button:has-text("Signup")');
        this.loginErrorMessage_label = page.getByText("Your email or password is incorrect!");
        this.alreadyExistsUserErrorMessage_label = page.getByText("Email Address already exist!");

    }

    async loadApplicationUrl() {
        // await this.page.goto(url.automationExcercise);
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
        // this.logger.info("Navigated to URL "+this.page.context()._options.baseURL);

    }

    async validLogin(email, password) {

        // creds from JSON/.env files:
        await this.emailAddressLogin_textBox.fill(email);
        await this.passwordLogin_textBox.fill(password);
        await this.login_button.click();

    }


    async invalidLogin(email, password) {

        await this.emailAddressLogin_textBox.fill(email);
        await this.passwordLogin_textBox.fill(password);
        await this.login_button.click();

    }

    async verifyInvalidLoginError() {
        await expect(this.loginErrorMessage_label).toBeVisible;
        await expect(this.login_button).toBeVisible;

    }

    async inputNewUserDetails() {

        await this.nameSignUp_textBox.fill(registrationData[0].name);
        await this.emailSignUp_textBox.fill(registrationData[0].email);
        await this.signUp_button.click();

    }

    async inputNewUserDetailsWhileCheckout() {

        await this.nameSignUp_textBox.fill(registrationData2.name);
        await this.emailSignUp_textBox.fill(registrationData2.email);
        await this.signUp_button.click();

    }

    async verifyAlreadyExistsUserMessage() {

        await expect(this.alreadyExistsUserErrorMessage_label).toBeVisible();
        await expect(this.signUp_button).toBeVisible();

    }


}module.exports=LoginPage