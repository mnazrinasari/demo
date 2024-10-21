const {test, expect} = require('@playwright/test');

class OrderReviewPage {
    constructor(page)
{
    this.page = page;
    this.orderCompletedProducts = page.locator("[class='inventory_item_name']");
    this.refNumber = page.locator("[class='summary_value_label']").nth(0);
    this.completedOrder = page.locator("[class='btn_action cart_button']");
    this.sumAmount = page.locator("[class='summary_subtotal_label']");

}

async verifyOrderComplete(productName)
{

    let count = await this.orderCompletedProducts.count();

    for(let i=0; i<count; i++)
        {
            const productCompleted = await this.orderCompletedProducts.nth(i);
            const orderReviewed = expect(productCompleted).toContainText(productName[i]);
            expect (orderReviewed).toBeTruthy();
        }           
}


async verifyProductComplete()
{ 
    let count = await this.orderCompletedProducts.count();
    
    
    const productText = [];
    for(let i=0; i<count; i++)
        {
            const text = await this.orderCompletedProducts.nth(i).textContent();
            if (text){
                productText.push(text.trim());

            }
            else{
                console.warn("undefined");
            }

        }
    return productText;

}


async verifyReferenceNumber()
{
    const getrefNum = await this.refNumber.textContent();
    return await getrefNum;
}

async orderTotal()
{
    //verify amount in order sumarry is same as cart amount
    const sumAmounts = await this.sumAmount.textContent();
    const finalAmount = Number(sumAmounts.split(' ').pop().replace('$', ''));
    return finalAmount
}

async compareTotalPDP(getTotal, getORTotal)
{
    await expect(getTotal).toBe(getORTotal);
}

async completeOrder()
{
    await this.completedOrder.click();
}

async compareORProducts(selectproductName, ORProducts)
{
    if(selectproductName.length !== ORProducts.length){
        throw new Error("List not match in length")
    }

    for(let i=0; i<selectproductName.length; i++){
        await expect(ORProducts[i]).toBe(selectproductName[i]);
    }

}


}

module.exports = {OrderReviewPage};