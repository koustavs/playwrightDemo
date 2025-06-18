const { test, expect } = require('@playwright/test');

exports.CartPage = class CartPage {

    constructor(page) {

        this.page = page;

        this.proceedToCheckout_link = page.locator("//a[normalize-space()='Proceed To Checkout']").describe('Proceed To Checkout link');
        this.itemUnitPrice = page.locator("//td[@class='cart_price']/p").describe('Item Unit Price');
        this.itemCartQuantity = page.locator("//td[@class='cart_quantity']/button").describe('Item Cart Quantity');
        this.itemCartTotal = page.locator("//td[@class='cart_total']/p").describe('Item Cart Total');
        this.removeCartItemIcon = page.locator(".cart_quantity_delete").describe('Remove Cart Item Icon');
        this.emptyCartText_textLabel=page.getByText("Cart is empty!").describe('Empty Cart Text Label');
        this.cartPageRegisterLoginPopupHeader_header=page.locator("//h4[.='Checkout']").describe('Cart Page Register Login Popup Header');
        this.cartPageRegisterLoginLink_link=page.locator("//a[.='Register / Login']").describe('Cart Page Register Login Link');

    }


    async verifyProceedToCheckoutButton() {
        await expect(this.proceedToCheckout_link).toBeVisible();
        await expect(this.page.getByText("Shopping Cart")).toBeVisible();
    }


    async verifyCartTotal() {

        const numberOfCartItems = this.itemUnitPrice;
        const count = await numberOfCartItems.count();
        for (let i = 0; i < count; i++) {
            const price = await numberOfCartItems.nth(i).textContent();
            const quantity = await this.itemCartQuantity.nth(i).textContent();
            const totalPrice = await this.itemCartTotal.nth(i).textContent();
            // console.log(price.replace(/[^\d]/g, ""));
            // console.log("Quantity: ",quantity.replace(/[^\d]/g, ""));
            // console.log("totalPrice: ",totalPrice.replace(/[^\d]/g, ""));
            await this.page.mouse.wheel(300, 0);
            const calculatedTotal = Number(price.replace(/[^\d]/g, "")) * Number(quantity.replace(/[^\d]/g, ""));
            await expect(calculatedTotal).toBe(Number(totalPrice.replace(/[^\d]/g, "")));

            console.log("calculatedTotal: ₹", calculatedTotal, " vs Displayed total ₹",Number(totalPrice.replace(/[^\d]/g, "")));
            // invoiceTotalFromCart=calculatedTotal;
            return calculatedTotal;

        }

    }


    async removeCartItem() {

        const cartItemsCount = await this.removeCartItemIcon.count();

        console.log("Cart Item Count: ",cartItemsCount);
        
        for (let i = 0; i < cartItemsCount; i++) {
            await this.removeCartItemIcon.nth(0).click();
            await this.page.waitForTimeout(200);

        }

        console.log("Count after remove completed: "+await this.removeCartItemIcon.count());
        

    }


    async verifyCartEmpty(){
            
        await expect(this.emptyCartText_textLabel).toBeVisible();

    }


    async clickProceedToCheckout(){
        await this.proceedToCheckout_link.click();
    }


    async verifyRegisterLoginPopupLink(){
        await expect(this.cartPageRegisterLoginLink_link).toBeVisible();
        await expect(this.cartPageRegisterLoginPopupHeader_header).toBeVisible();
    }


    async clickRegisterLogin(){
        await this.cartPageRegisterLoginLink_link.click();
    }


}
