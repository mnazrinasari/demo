const {test, expect} = require('@playwright/test');

class ProductPage {
    constructor(page)
    
{
    this.page = page;
    this.products = page.locator("[class='inventory_item']")
    this.badgeIcon = page.locator("[class*='cart_badge']");
}

async selectProduct(productName)
{
    //selecting product

    const count = await this.products.count();
    
    for(let i=0; i<count; i++)
        {
            if(await this.products.nth(i).locator("div >> a >> div").textContent() === productName){
                await this.products.nth(i).locator("button").click();
                break;
            }
        }

}

async verifyItemQuantity()
{

    await expect(this.badgeIcon).toContainText("1");

}



async addingCart()
{
        //proceed to checkout
    await this.badgeIcon.click();
}



}

module.exports = {ProductPage};