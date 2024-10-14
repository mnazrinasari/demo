const {test, expect} = require('@playwright/test');

class ProductPage {
    constructor(page)
    
{
    this.page = page;
    this.products = page.locator("[class='inventory_item']")
    this.badgeIcon = page.locator("[class*='cart_badge']");
    this.removeIcon = page.locator("[class='btn_secondary btn_inventory']")
    this.productPrice = page.locator("[class='inventory_item_price']");

}


async selectProducts(selectproductName)
{
    let count =  await this.products.count();
    for(let i=0; i<count; i++)
        {   
            const allProducts = await this.products.nth(i).locator("div >> a >> div").textContent();
            // //printing trimmed products
            // console.log(await allProducts.trim());
            //logic to check if product is from the list
            if(selectproductName.includes(allProducts.trim())){
                await this.products.nth(i).locator("button").click();
            }
        }

}


async selectFirstThreeProduct()
{
    let count =3;

    //selecting product
    
    for(let i=0; i<count; i++)
        {
            await this.products.nth(i).locator("button").click();
        }

}

async getProductAmount(selectproductName, countType)
{   
    let count;
    if(countType === "allProducts")
    {
        count = await this.products.count();
    }
    else if(countType === "fixedQuantity")
    {
        count = 3; 
    }
    
    // console.log(count);
    let productAmount = 0;
    for(let i=0; i<count; i++)
        {   
            const allProducts = await this.products.nth(i).locator("div >> a >> div").textContent();
            // console.log(allProducts);
            if(selectproductName.includes(allProducts.trim())){
                const total = await this.products.nth(i).locator("[class='inventory_item_price']").textContent();
                const totalArray = total.split(' ');
                for (let i=0; i<totalArray.length; i++){
                    const totals = Number(totalArray[i].replace('$', ''));
                    productAmount += totals;

                }

            //         
            }
        }  
return productAmount;
}

async verifyItemQuantity(countType)
{
    let finalCount;
    if(countType === "allProducts")
    {
        finalCount = await this.removeIcon.count();
    }
    else if(countType === "fixedQuantity")
    {
        finalCount = 3;
    }
    
    expect(await this.badgeIcon.textContent()).toBe(String(finalCount));
    
}



async addingCart()
{
        //proceed to checkout
    await this.badgeIcon.click();
}





}

module.exports = {ProductPage};