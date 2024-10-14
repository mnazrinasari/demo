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

async verifyOrderComplete(productName, countType)
{

    let count;
    if(countType === "allProducts")
    {
        count = await this.orderCompletedProducts.count();
    }
    else if(countType === "fixedQuantity")
    {
        count = 3; 
    }

    for(let i=0; i<count; i++)
        {
            const productCompleted = await this.orderCompletedProducts.nth(i);
            const orderReviewed = expect(productCompleted).toContainText(productName[i]);
            expect (orderReviewed).toBeTruthy();
        }           
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

}

module.exports = {OrderReviewPage};