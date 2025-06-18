const { expect } = require('@playwright/test');


exports.CheckoutPage = class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.addressDetailsHeader_textLabel = page.getByText("Address Details").describe('Address Details Header');
        this.deliveryAddressDetailsHeader_textLabel = page.getByText("Your delivery address").describe('Delivery Address Details Header');
        this.billingAddressDetailsHeader_textLabel = page.getByText("Your billing address").describe('Billing Address Details Header');
        this.reviewOrderHeader_textLabel = page.getByText("Review Your Order").describe('Review Order Header');
        this.orderCommentText_textBox = page.locator('textarea[name="message"]').describe('Order Comment Text Box');
        this.cartTotalAmountBold_textLabel = page.locator("//h4[.='Total Amount']").describe('Cart Total Amount Bold Text Label');
        this.placeOrder_button = page.locator("//a[.='Place Order']").describe('Place Order button');
        this.cartTotalAmountNumeric_textLabel = page.locator("//h4[.='Total Amount']/parent::td/following-sibling::td").describe('Cart Total Amount Numeric Text Label');


    }


    async verifyAllHeaders() {
        await expect(this.addressDetailsHeader_textLabel).toBeVisible();
        await expect(this.billingAddressDetailsHeader_textLabel).toBeVisible();
        await expect(this.deliveryAddressDetailsHeader_textLabel).toBeVisible();
        await expect(this.reviewOrderHeader_textLabel).toBeVisible();

    }

    
    async verifyPlaceOrderButtonAndTotalAmount() {
        await expect(this.placeOrder_button).toBeVisible();
        await expect(this.cartTotalAmountBold_textLabel).toBeVisible();

    }


    async enterOrderComment() {

        await this.orderCommentText_textBox.fill("Please call me before delivery. Follow the given address and map location.");
    }


    async clickPlaceOrder() {
        await this.placeOrder_button.click();
    }


    async verifyCheckoutTotal() {

        const total=await this.cartTotalAmountNumeric_textLabel.textContent();
        const calculatedTotal = Number(total.replace(/[^\d]/g, ""));
        console.log("Checkout page total: ₹"+calculatedTotal);
        
        return calculatedTotal;

    }

}