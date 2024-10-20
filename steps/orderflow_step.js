const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../pages/POManager');
const {expect} = require('@playwright/test');
const {playwright} = require('@playwright/test');
const {chromium} = require('playwright');



Given('Login and landing in product detail page', async function () {
    this.loginPage = this.pomanager.getLoginPage();
    //go to url
    const sourceURL = "https://www.saucedemo.com/v1/index.html";
    await this.loginPage.goTo(sourceURL);  
    this.emails = "standard_user";
    this.passwords = "secret_sauce";
    await this.loginPage.validLogin(this.emails, this.passwords);
    await this.loginPage.loginSuceed();
    });

  Then('Click add single product to cart', async function () {
    this.productPage = this.pomanager.getProductPage();
    this.selectproductName = "Sauce Labs Bolt T-Shirt";
  
    await this.productPage.selectProducts(this.selectproductName);

  });

  Then('Verify product is added to cart', async function () {
    await this.productPage.verifyItemQuantity();
  });


  Then('Click view cart', async function () {
    await this.productPage.addingCart();
  });


  Then('Verify product is in the cart page', async function () {
    this.cartPage = this.pomanager.getCartPage();
    this.productName = await this.cartPage.getCartList();
    await this.cartPage.verifyCart(this.productName);
    console.log(await this.cartPage.getCartList());
  });


  Then('Click checkout', async function () {
    await this.cartPage.checkingOut();
  });



  Then('Enter the checkout details', async function () {
    this.checkoutPage = this.pomanager.getCheckoutPage();
    const firstName = "Foo";
    const lastName = "Bar"
    const postalCode = "11111"
    await this.checkoutPage.completeShipping(firstName, lastName, postalCode);
  });


  Then('Click continue to order', async function () {
    await this.checkoutPage.submitOrder();
  });

  Then('Verify products is in the order review page', async function () {
    this.orderReviewPage = this.pomanager.getOrderReviewPage();
    await this.orderReviewPage.verifyOrderComplete(this.productName);
    console.log(await this.orderReviewPage.verifyProductComplete());
    
  });



  Then('Verify Order ID', async function () {
    console.log(await this.orderReviewPage.verifyReferenceNumber());

  });


  Then('Click Finish', async function () {
    await this.orderReviewPage.completeOrder();
  });


  Then('Verify thank you page is displayed', async function () {
    this.thankyouPage = this.pomanager.getThankYouPage();
    await this.thankyouPage.verifyThankYouMessage();
  });


  Then('Click add multiple product to cart', async function () {
    this.productPage = this.pomanager.getProductPage();
    this.selectproductName =  ["Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Onesie"
  ];
    await this.productPage.selectProducts(this.selectproductName);

  });


  Then('Verify total amount of product added to cart', async function () {
    this.getTotal = await this.productPage.getProductAmount(this.selectproductName);
    console.log(`Total Amount in Product Page ${this.getTotal}`);
  });


  Then('Verify Cart Amount', async function () {
    this.cartPage = this.pomanager.getCartPage();
    this.getCartTotal = await this.cartPage.verifyCartAmount();
    console.log(`Total Amount in Cart Page ${this.getCartTotal}`);
    await this.cartPage.compareTotalCart(this.getTotal, this.getCartTotal);

  });

  Then('Verify total amount in order review page', async function () {
    this.orderReviewPage = this.pomanager.getOrderReviewPage();
    this.getORTotal = await this.orderReviewPage.orderTotal();
    await console.log(`Total Amount in Order Review Page ${this.getORTotal}`);
    await this.orderReviewPage.compareTotalPDP(this.getTotal, this.getORTotal);
  });


  Then('Navigate to checkout', async function () {
    await this.cartPage.checkingOut();
  });

  Then('Navigate to order review', async function () {
    this.checkoutPage = this.pomanager.getCheckoutPage();
    const firstName = "Foo";
    const lastName = "Bar"
    const postalCode = "11111"
    await this.checkoutPage.completeShipping(firstName, lastName, postalCode);
    await this.checkoutPage.submitOrder()

  });

  

