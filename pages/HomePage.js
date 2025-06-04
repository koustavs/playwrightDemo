const { test, expect } = require('@playwright/test');
const loginData = require("../testData/login.json");
const url = require("../testData/url.json");

exports.HomePage = class HomePage {

    constructor(page) {

        this.page = page;

        this.home_link = page.locator('a:h as-text("Home")');
        //this.products_link = page.getByRole('link', { name: 'Products' });
        this.products_link = page.locator("//a[contains(normalize-space(),'Products')]");
        //await page.locator('button:text("Button Text Here")').click();
        this.cart_link = page.locator("//a[normalize-space()='Cart']");
        this.loginSignUp_link = page.locator("//a[normalize-space()='Signup / Login']")
        this.contactUs_link = page.locator("//a[normalize-space()='Contact us']");
        this.logout_link = page.locator("//a[normalize-space()='Logout']");
        this.deleteAccount_link = page.locator("//a[normalize-space()='Delete Account']");
        this.deleteAccountContinue_button=page.locator('a:has-text("Continue")');
        this.deleteSuccessMessage_textLabel=page.getByText("Account Deleted!");
        this.loggedInText_label = page.locator('a:h as-text("Logged in as")');
        
    }

    

    async clickHomeLink() {
        await this.home_link.click();
    }

    async clickProductsLink() {
        //await this.products_link.highlight();
        await this.products_link.click();
    }

    async clickLoginSignUpLink() {
        // await reportPDF.highLightElementDuration(this.page,this.loginSignUp_link);
        await this.loginSignUp_link.click();
    }

    async clickCartLink() {
        await this.cart_link.click();
    }

    async clickContactUsLink() {
        await this.contactUs_link.click();
    }

    async clickLogoutLink() {
        // await reportPDF.highLightElementDuration(this.page,this.logout_link);
        await this.logout_link.click();
    }

    async clickDeleteAccountLink() {
        await this.deleteAccount_link.click();
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }


    async verifySuccessfulLogin() {
        await expect(this.logout_link).toBeVisible;
        await expect(this.loggedInText_label).toBeVisible;

    }

    async scrollPageVerticallyBy(pixel){
        await this.page.mouse.wheel(0, pixel);
    }

    async scrollPageHorizontallyBy(pixel){
        await this.page.mouse.wheel(pixel, 0);
    }

    async verifyBrandNameListCount(){
        const brandNameListCount=await this.page.locator(".nav.nav-pills.nav-stacked li");
        await expect(brandNameListCount).toHaveCount(8);
    }

    async verifyCategoryListCount(){
        const categoryListCount=await this.page.locator(".panel-group.category-products div h4");
        await expect(categoryListCount).toHaveCount(3);
    }

    async verifySuccessfulAccountDeletionAndContinue(){

        await expect(this.deleteSuccessMessage_textLabel).toBeVisible();
        await this.deleteAccountContinue_button.click();
        await expect(this.loginSignUp_link).toBeVisible();
    }


}