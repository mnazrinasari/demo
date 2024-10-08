const {test, expect} = require('@playwright/test');

class OrderReviewPage {
    constructor(page)
{
    this.page = page;
    this.orderCompletedProducts = page.locator("[class='inventory_item_name']");
    this.refNumber = page.locator("[class='summary_value_label']").nth(0);
    this.completedOrder = page.locator("[class='btn_action cart_button']");

}

async verifyOrderComplete(productName)
{
    await expect(this.orderCompletedProducts).toContainText(productName);

}

async verifyReferenceNumber()
{
    const getrefNum = await this.refNumber.textContent();
    return await getrefNum;
}

async completeOrder()
{
    await this.completedOrder.click();
}

}

module.exports = {OrderReviewPage};