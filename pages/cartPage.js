const {test, expect} = require('@playwright/test');

class CartPage {
    constructor(page)
{
    this.page = page;
    this.cartItems = page.locator("[class='inventory_item_name']");
    this.checkout = page.locator("[class*='checkout_button']");
    this.amount = page.locator("[class='inventory_item_price']");
    
}


async getCartList()
{
    {   
        let count = await this.cartItems.count();
        
        const productText = [];
        for(let i=0; i<count; i++)
            {
                const text = await this.cartItems.nth(i).textContent();
                productText.push(text.trim());
            }
        return productText;
    }
    
}



async verifyCart(productName)
{

    let count = await this.cartItems.count();
   
    for(let i=0; i<count; i++)
        {
            const productCheckedOut = await this.cartItems.nth(i);
            const cartVerified = expect(productCheckedOut).toContainText(productName[i]);
            expect (cartVerified).toBeTruthy();
        }           
}


async verifyCartAmount()
{
    let count = await this.cartItems.count();

    const amountText = [];
    let totalCartAmount = 0;
    for(let i=0; i<count; i++){
        const itemCartAmount = await this.amount.nth(i).textContent();
        amountText.push(itemCartAmount.trim());
    }
    for(let i=0; i<amountText.length; i++){
        const itemCartAmounts = Number(amountText[i]);
        totalCartAmount += itemCartAmounts;
        }
    return totalCartAmount;
}

async compareTotalCart(getTotal, getCartTotal)
{
    await expect(getTotal).toBe(getCartTotal);
}

async checkingOut()
{
    await this.checkout.click();
}

async compareCartProducts(selectproductName, cartProducts)
{
    if(selectproductName.length !== cartProducts.length){
        throw new Error("List not match in length")
    }

    for(let i=0; i<selectproductName.length; i++){
        await expect(cartProducts[i]).toBe(selectproductName[i]);
    }


}


}

module.exports = {CartPage};