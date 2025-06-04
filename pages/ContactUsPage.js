const { expect } = require('@playwright/test');
const registrationData = require("../testData/registration.json")

exports.ContactUsPage = class ContactUsPage {

    constructor(page) {

        this.page = page;

        this.contactUsHeader_label=page.locator("//h2[contains(.,'Contact Us')]");
        this.getInTouchHeader_label=page.locator("//h2[.='Get In Touch']");
        this.feedbackForUsHeader_label=page.locator("//h2[.='Feedback For Us']");
        this.contactFormName_textBox=page.getByPlaceholder("Name");
        this.contactFormEmail_textBox=page.locator("//input[@placeholder='Email']");
        this.contactFormSubject_textBox=page.getByPlaceholder("Subject");
        this.messageFormText_textArea=page.getByRole('textbox',{name:'message'});
        this.contactFormUploadFile_inputFile=page.locator("//input[@name='upload_file']");
        this.contactFormSubmit_button=page.locator("//input[@name='submit']");
        this.feedbackEmailLink_link=page.locator("//a[@href='mailto:feedback@automationexercise.com']");
        this.contactFormElement_form=page.locator("//input[@name='submit']");

    }


    async verifyContactUsPageLoad(){
        await expect(this.contactUsHeader_label).toBeVisible();
        await expect(this.getInTouchHeader_label).toBeVisible();
        await expect(this.feedbackForUsHeader_label).toBeVisible();
        await expect(this.feedbackEmailLink_link).toBeVisible();
    }

    async fillContactUsForm(){

        await this.contactFormName_textBox.fill(registrationData[0].name);
        await this.contactFormEmail_textBox.fill(registrationData[0].email);
        await this.contactFormSubject_textBox.fill("My Feedback Text");
        await this.messageFormText_textArea.fill("This site is under construction...");

    }

    async uploadFile(){

        await this.contactFormUploadFile_inputFile.setInputFiles("Test.pdf");
    }


    async clickSubmitOnForm(){
        // await this.contactFormSubmit_button.click();
        // await this.contactFormElement_form.submit()
        // await this.page.evaluate(() => {
        //     document.myForm.submit();
        //   });
        // await this.page.press('Enter');
        // const box = await this.contactFormSubmit_button.boundingBox();
        // await this.page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
          
    }
}