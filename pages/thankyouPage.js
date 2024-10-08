const {test, expect} = require('@playwright/test');

class ThankYouPage {
    constructor(page)
{
    this.page = page;
    this.orderSuccess = page.locator("[class='complete-header']");

}


async verifyThankYouMessage()
{
    await expect(this.orderSuccess).toContainText("THANK YOU");
}

}

module.exports = {ThankYouPage};