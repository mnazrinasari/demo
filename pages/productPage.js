const {test, expect} = require('@playwright/test');

class ProductPage {
    constructor(page)
    
{
    this.page = page;
    this.products = page.locator("[class='inventory_item']")
    this.badgeIcon = page.locator("[class*='cart_badge']");
    this.removeIcon = page.locator("[class='btn_secondary btn_inventory']")
    this.productPrice = page.locator("[class='inventory_item_price']");
    this.sortings = page.locator("[class='product_sort_container']");

}

async selectSorting(ascendOption){
    await this.sortings.selectOption(ascendOption);
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



async getProductAmount(selectproductName)
{   
    let count = await this.products.count();
   
    
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

async verifyItemQuantity()
{
    let finalCount = await this.removeIcon.count();
    expect(await this.badgeIcon.textContent()).toBe(String(finalCount));
    
}



async addingCart()
{
        //proceed to checkout
    await this.badgeIcon.click();
}

async priceDisplay()
{
    let priceArray = [];
    const count = await this.productPrice.count();
    for(let i=0; i<count; i++){
        const total2 = await this.productPrice.nth(i).textContent();
        const totalArray = total2.split(' ');
        for (let i=0; i<totalArray.length; i++){
            const pricedone = Number(totalArray[i].replace('$', ''));
            priceArray.push(pricedone);
        }  
    }
    return priceArray; 
}

async priceSortingAscend(pricing){
    const sorted = [];
    while (pricing.length > 0){
        let minIndex = 0;
        for(let i=1; i<pricing.length; i++){
            if (pricing[i]<pricing[minIndex]){
                minIndex = i;
            }
        }
    sorted.push(pricing[minIndex]);
    pricing.splice(minIndex, 1);
    }
    return sorted;
    // for (var i = 1; i < pricing.length; i++)
    //     for (var j = 0; j < i; j++)
    //         if (pricing[i] < pricing[j]) {
    //             var x = pricing[i];
    //             pricing[i] = pricing[j];
    //             pricing[j] = x;
    //             sorted += x;
    //         }
    // return pricing;
}

async compareSorting(pricing, afterSorting){
        expect(pricing).toEqual(afterSorting);

}



}

module.exports = {ProductPage};