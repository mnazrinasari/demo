const {test, expect} = require('@playwright/test');

class CartPage {
    constructor(page)
{
    this.page = page;
    this.cartItems = page.locator("[class='inventory_item_name']");
    this.checkout = page.locator("[class*='checkout_button']");
}

async verifyCart(productName)
{

    const cartVerified = expect(this.cartItems).toContainText(productName);
    expect (cartVerified).toBeTruthy();
     
}

async getCartList()
{
    return await this.cartItems.textContent();
}

async checkingOut()
{
await this.checkout.click();
}

}

module.exports = {CartPage};