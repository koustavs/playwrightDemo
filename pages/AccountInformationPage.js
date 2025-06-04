const { expect } = require('@playwright/test');
const registrationData = require("../testData/registration.json");
const registrationData2 = require("../testData/registrationCheckout.json");

exports.AccountInformationPage = class AccountInformationPage {

    constructor(page) {

        this.page = page;

        this.title_radioButton = page.getByRole('radio', { name: 'Mr.' });
        this.passwordSignUp_textBox = page.locator("//input[@id='password']");
        this.dobDay_dropdown = page.locator('#days');
        this.dobMonth_dropdown = page.locator('#months');
        this.dobYear_dropdown = page.locator('#years');
        this.newsletterSubscribe_checkBox = page.getByLabel('newsletter');
        this.receiveSpecialOffer_checkbox = page.locator('#optin');
        this.firstName_textBox = page.locator("//input[@id='first_name']");
        this.lastName_textBox = page.locator("//input[@id='last_name']");
        this.companyName_textBox = page.locator("//input[@id='company']");
        this.addrLine1_textBox = page.locator("//input[@id='address1']");
        this.addrLine2_textBox = page.locator("//input[@id='address2']");
        this.addrState_textBox = page.locator("//input[@id='state']");
        this.addrCity_textBox = page.locator("//input[@id='city']");
        this.addrZipcode_textBox = page.locator("//input[@id='zipcode']");
        this.userMobile_textBox = page.locator("//input[@id='mobile_number']");
        this.createAccount_button = page.locator('button:has-text("Create Account")');
        this.createSuccessMessage_textLabel=page.locator("//b[normalize-space()='Account Created!']");
        this.createUserContinue_button=page.locator("//a[normalize-space()='Continue']");


    }


    async fillRegistrationForm() {
        // await this.page.waitForSelector(this.title_radioButton);
        await this.title_radioButton.check();
        await this.passwordSignUp_textBox.fill(registrationData[0].password);
        await this.page.mouse.wheel(0, 200);
        await this.dobDay_dropdown.selectOption('1');
        await this.dobMonth_dropdown.selectOption('1');
        await this.dobYear_dropdown.selectOption('1947');
        await this.newsletterSubscribe_checkBox.check();
        await this.receiveSpecialOffer_checkbox.check();
        await this.firstName_textBox.fill(registrationData[0].firstName);
        await this.lastName_textBox.fill(registrationData[0].lastName);
        await this.companyName_textBox.fill(registrationData[0].company);
        await this.page.mouse.wheel(300, 0);
        await this.addrLine1_textBox.fill(registrationData[0].addrLn1);
        await this.addrLine2_textBox.fill(registrationData[0].addrLn2);
        await this.addrState_textBox.fill(registrationData[0].state);
        await this.addrCity_textBox.fill(registrationData[0].city);
        await this.addrZipcode_textBox.fill(registrationData[0].zipcode);
        await this.userMobile_textBox.fill(registrationData[0].mobile);
        // await this.createAccount_button.click();

    }

    async fillRegistrationFormWhileCheckout() {
        await this.title_radioButton.check();
        await this.passwordSignUp_textBox.fill(registrationData2.password);
        await this.page.mouse.wheel(0, 200);
        await this.dobDay_dropdown.selectOption('1');
        await this.dobMonth_dropdown.selectOption('1');
        await this.dobYear_dropdown.selectOption('1990');
        await this.newsletterSubscribe_checkBox.check();
        await this.receiveSpecialOffer_checkbox.check();
        await this.firstName_textBox.fill(registrationData2.firstName);
        await this.lastName_textBox.fill(registrationData2.lastName);
        await this.companyName_textBox.fill(registrationData2.company);
        await this.page.mouse.wheel(300, 0);
        await this.addrLine1_textBox.fill(registrationData2.addrLn1);
        await this.addrLine2_textBox.fill(registrationData2.addrLn2);
        await this.addrState_textBox.fill(registrationData2.state);
        await this.addrCity_textBox.fill(registrationData2.city);
        await this.addrZipcode_textBox.fill(registrationData2.zipcode);
        await this.userMobile_textBox.fill(registrationData2.mobile);

    }

    async verifySuccessfulAccountCreation(){
        await expect(this.createSuccessMessage_textLabel).toBeVisible();
        await expect(this.createUserContinue_button).toBeVisible();
    }

    async clickCreateUserSuccessContinue(){
        await this.createUserContinue_button.click();
    }

    async clickCreateAccount(){

        await this.createAccount_button.click();
    }
}