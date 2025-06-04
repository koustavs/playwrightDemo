const { test, expect } = require('@playwright/test');
const loginData = require("../testData/login.json");
const product = require("../testData/products.json");

exports.ProductPage = class ProductPage {

    constructor(page) {

        this.page = page;

        this.saleImage_image=page.getByAltText("Website for practice");
        this.searchBox_textBox=page.getByPlaceholder("Search Product");
        this.searchButton_button=page.locator("#submit_search");
        this.searchResultHeadingText_textLabel=page.locator("//h2[normalize-space()='Searched Products']");
        this.searchResultProductCount = page.locator(".product-image-wrapper");
        this.searchResultProductAddToCart_button=page.locator(".product-image-wrapper > div > div > a ");
        this.continueShopping_button=page.locator("//button[normalize-space()='Continue Shopping']");

    }


    async searchForProduct(productName){

        await this.searchBox_textBox.fill(productName);
        await this.searchButton_button.click();
        return this.searchResultProductCount.count();

    }

    async addProductToCart(){

        const addToCartItems=this.searchResultProductAddToCart_button;
        const count = await addToCartItems.count();
    for (let i = 0; i < count; i++){
        //console.log(await addToCartItems.nth(i).textContent());
    await addToCartItems.nth(i).click();
    await this.page.locator('button:has-text("Continue Shopping")').click();
    }
    // await this.waitForTimeout(1000);
    // await this.page.locator("//div[@id='cartModal']//button").click();
    //await this.page.getByRole('button', { name: 'Continue Shopping' }).highlight();

    }

}