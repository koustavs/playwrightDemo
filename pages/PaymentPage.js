const { test, expect } = require('@playwright/test');
const cardData = require("../testData/cardDetails.json");

exports.PaymentPage = class PaymentPage {

    constructor(page) {

        this.page = page;

        // this.paymentDetailsHeader_textLabel = page.locator("//h2[normalize-space()='Payment']");
        this.paymentDetailsHeader_textLabel = page.locator('h2:has-text("Payment")');
        this.cardName_textBox = page.locator("//input[@name='name_on_card']");
        this.cardNumber_textBox = page.locator("//input[@name='card_number']");
        this.cardCVC_textBox = page.locator("//input[@name='cvc']");
        this.cardExpiryMonth_textBox = page.locator("//input[@name='expiry_month']");
        this.cardexpiryYear_textBox = page.locator("//input[@name='expiry_year']");
        this.payAndConfirmOrder_button = page.locator('button:has-text("Pay and Confirm Order")');

    }
    
    async verifyPaymentHeader(){
        await expect(this.paymentDetailsHeader_textLabel).toBeVisible();
        await expect(this.payAndConfirmOrder_button).toBeVisible();

    }

    async enterCardDetails(){
        await this.cardName_textBox.fill(cardData.name);
        await this.cardNumber_textBox.fill(cardData.cardNumber);
        await this.cardCVC_textBox.fill(cardData.cvv);
        await this.cardExpiryMonth_textBox.fill(cardData.month);
        await this.cardexpiryYear_textBox.fill(cardData.year);

    }

    async clickPayAndConfirmOrder(){
        await this.payAndConfirmOrder_button.click();
    }

}