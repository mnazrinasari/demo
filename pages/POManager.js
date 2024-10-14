const {LoginPage} = require('./loginPage');
const {ProductPage} = require('./productPage');
const {CartPage} = require('./cartPage');
const {CheckoutPage} = require('./checkoutPage');
const {OrderReviewPage} = require('./orderreviewPage');
const {ThankYouPage} = require('./thankyouPage');

class POManager
{
constructor (page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.orderreviewPage = new OrderReviewPage(this.page);
    this.thankyouPage = new ThankYouPage(this.page);

}

getLoginPage()
{
    return this.loginPage;
}

getProductPage()
{
    return this.productPage;
}

getCartPage()
{
    return this.cartPage;
}

getCheckoutPage()
{
    return this.checkoutPage;
}

getOrderReviewPage()
{
    return this.orderreviewPage;
}

getThankYouPage()
{
    return this.thankyouPage;
}

}

module.exports = {POManager}