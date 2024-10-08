const {test, expect} = require('@playwright/test');

class CheckoutPage {
    constructor(page)
{
    this.page = page;
    this.firstname = page.locator("[id='first-name']");
    this.lastname = page.locator("[id='last-name']");
    this.postalcode = page.locator("[id='postal-code']");
    this.submitbutton = page.locator("[type='submit']");

}

async completeShipping(firstName, lastName, postalCode)
{
    await this.firstname.fill(firstName);
    await this.lastname.fill(lastName);
    await this.postalcode.fill(postalCode);

}

async submitOrder()
{
    await this.submitbutton.click();
}

}

module.exports = {CheckoutPage};