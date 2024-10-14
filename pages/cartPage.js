const {test, expect} = require('@playwright/test');

class CartPage {
    constructor(page)
{
    this.page = page;
    this.cartItems = page.locator("[class='inventory_item_name']");
    this.checkout = page.locator("[class*='checkout_button']");
    this.amount = page.locator("[class='inventory_item_price']");
    
}


async getCartList(countType)
{
    {   
        let count;
        if(countType === "allProducts")
        {
            count = await this.cartItems.count();
        }
        else if(countType === "fixedQuantity")
        {
            count = 3; 
        }
        
        const productText = [];
        for(let i=0; i<count; i++)
            {
                const text = await this.cartItems.nth(i).textContent();
                if (text){
                    productText.push(text.trim());

                }
                else{
                    console.warn("undefined");
                }

            }
        return productText;
    }
    
}


async verifyCart(productName, countType)
{

    let count;
    if(countType === "allProducts")
    {
        count = await this.cartItems.count();
    }
    else if(countType === "fixedQuantity")
    {
        count = 3; 
    }

    for(let i=0; i<count; i++)
        {
            const productCheckedOut = await this.cartItems.nth(i);
            const cartVerified = expect(productCheckedOut).toContainText(productName[i]);
            expect (cartVerified).toBeTruthy();
        }           
}


async verifyCartAmount(countType)
{
    let count;
    if(countType === "allProducts")
    {
        count = await this.cartItems.count();
    }
    else if(countType === "fixedQuantity")
    {
        count = 3; 
    }

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
}

module.exports = {CartPage};