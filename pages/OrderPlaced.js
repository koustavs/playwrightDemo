import {promises as fs} from 'fs';
// const { expect } = require('@playwright/test');
import { expect } from '@playwright/test';

exports.OrderPlaced = class OrderPlaced {

    constructor(page) {

        this.page = page;
        const url="";
        this.orderPlacedHeader_header = page.locator("//b[normalize-space()='Order Placed!']");
        this.OrderPlacedSuccessBodyText_labelText = page.locator("//p[.='Congratulations! Your order has been confirmed!']");
        this.downloadInvoice_link = page.locator('a:has-text("Download Invoice")');
        this.successfulOrderPlacedContinue_link = page.locator('a:has-text("Continue")');

    }


    async verifyOrderPlacementSuccessScreen() {

        await expect(this.orderPlacedHeader_header).toBeVisible();
        await expect(this.downloadInvoice_link).toBeVisible();
        await expect(this.successfulOrderPlacedContinue_link).toBeVisible();
        await expect(this.OrderPlacedSuccessBodyText_labelText).toBeVisible();

    }

    async clickDownloadInvoiceButton() {
        const waitForDownload = this.page.waitForEvent('download');
        await this.downloadInvoice_link.click();
        const download = await waitForDownload;

        await download.saveAs("./" + download.suggestedFilename());

        const invoiceFilePath = await download.path();
        const fileContent = await fs.readFile(invoiceFilePath, 'utf-8');
        const invoiceTotalAmount = Number(fileContent.replace(/[^\d]/g, ""));

        console.log("File content: "+fileContent+"\n\nAmount printed in invoice file: ₹" + invoiceTotalAmount);
        
        // console.log("Amount printed in cart class: "+invoiceTotalFromCart);
        console.log(invoiceFilePath);
        

        await fs.unlink(invoiceFilePath);
        console.log("File deleted...");
        return invoiceTotalAmount;

    }

    async clickContinueButton() {
        await this.successfulOrderPlacedContinue_link.click();

    }


}