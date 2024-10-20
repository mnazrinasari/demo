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
    this.productsname = page.locator("[class ='inventory_item_name']");

}

async selectSorting(ascendOption){
    await this.sortings.selectOption(ascendOption);
}

async getProductList()
{
    {   
        let count = await this.productsname.count();
        
        const productText = [];
        for(let i=0; i<count; i++)
            {
                const text = await this.productsname.nth(i).textContent();
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

async selectProducts(selectproductName)
{
    let count =  await this.products.count();
    for(const produk of selectproductName){
        for(let i=0; i<count; i++)
            {   
                const allProducts = await this.productsname.nth(i).textContent();
                // //printing trimmed products
                // console.log(await allProducts.trim());
                //logic to check if product is from the list
                if(allProducts.trim() === produk){
                    await this.products.nth(i).locator("button").click();
                    break;
                }
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
            const allProducts = await this.productsname.nth(i).textContent();
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
}


async priceSortingDescend(pricing){
    const sorted = [];
    while (pricing.length > 0){
        let maxIndex = 0;
        for(let i=1; i<pricing.length; i++){
            if (pricing[i]>pricing[maxIndex]){
                maxIndex = i;
            }
        }
    sorted.push(pricing[maxIndex]);
    pricing.splice(maxIndex, 1);
    }
    return sorted;  
}


async letterSortingAscend(allProducts){
    const sorted = [];
    for(let i=0; i<allProducts.length; i++){
        for(let j=0; j<allProducts.length-i-1; j++){
            if(allProducts[j] > allProducts[j+1]){
                const temp = allProducts[j];
                allProducts[j] = allProducts[j+1];
                allProducts[j+1] = temp;
            }
        }
    }
    for(let i=0; i<allProducts.length; i++){
        sorted.push(allProducts[i]);
    }
    
    return sorted;  
}

async letterSortingDescend(allProducts){
    const sorted = [];
    for(let i=0; i<allProducts.length; i++){
        for(let j=0; j<allProducts.length-i-1; j++){
            if(allProducts[j] < allProducts[j+1]){
                const temp = allProducts[j];
                allProducts[j] = allProducts[j+1];
                allProducts[j+1] = temp;
            }
        }
    }
    for(let i=0; i<allProducts.length; i++){
        sorted.push(allProducts[i]);
    }
    
    return sorted;  
}

async compareSorting(pricing, sortingOption){
        expect(pricing).toEqual(sortingOption);

}



}

module.exports = {ProductPage};