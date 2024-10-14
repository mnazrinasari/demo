import { test, expect } from '@playwright/test';
import { POManager } from '../pages/POManager';

test('1 - Login - Valid User', async ({page}) =>
    {   
        const pomanager = new POManager(page);
        const loginPage = pomanager.getLoginPage();
        //go to url
        const sourceURL = "https://www.saucedemo.com/v1/index.html";
        await loginPage.goTo(sourceURL);        
        //login
        const emails = "standard_user";
        const passwords = "secret_sauce";
        await loginPage.validLogin(emails, passwords);
    })

test('2 - Login - Locked out user', async ({page}) =>
    {
        const pomanager = new POManager(page);
        const loginPage = pomanager.getLoginPage();
        //go to url
        const sourceURL = "https://www.saucedemo.com/v1/index.html"
        await loginPage.goTo(sourceURL);
        //login
        const emails = "locked_out_user";
        const passwords = "secret_sauce";
        await loginPage.validLogin(emails, passwords);
        //verify error for locked out user
        await loginPage.loginNotSuceed;
        console.log(await loginPage.loginNotSuceed());
    

    
    })

test('3 - Complete Order Flow - Single Product', async ({page}) =>
{
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    //go to url
    const sourceURL = "https://www.saucedemo.com/v1/index.html";
    await loginPage.goTo(sourceURL);
    //login
    const emails = "standard_user";
    const passwords = "secret_sauce";
    await loginPage.validLogin(emails, passwords);

    //selecting product in PDP
    const productPage = pomanager.getProductPage();
    const selectproductName = "Sauce Labs Bolt T-Shirt";
    const countType = "allProducts";
    await productPage.selectProducts(selectproductName);

    //verify product added to cart in PDP
    await productPage.verifyItemQuantity(countType);
    await productPage.addingCart();

    //checkingout in cart page
    const cartPage = pomanager.getCartPage();
    const productName = await cartPage.getCartList(countType);
    await cartPage.verifyCart(productName, countType);
    console.log(await cartPage.getCartList());
    await cartPage.checkingOut();


    
    //placing order in checkout page
    const checkoutPage = pomanager.getCheckoutPage();
    const firstName = "Foo";
    const lastName = "Bar"
    const postalCode = "11111"
    await checkoutPage.completeShipping(firstName, lastName, postalCode);
    await checkoutPage.submitOrder();


    //verify product in order overview
    const orderReviewPage = pomanager.getOrderReviewPage();
    await orderReviewPage.verifyOrderComplete(productName, countType);
    console.log(await orderReviewPage.verifyReferenceNumber());
    await orderReviewPage.completeOrder();

    //verify order success
    const thankyouPage = pomanager.getThankYouPage();
    await thankyouPage.verifyThankYouMessage();

    })

test('4 - Cart - Multiple Products(First 3 products)', async ({page}) =>
    {
    
        //go to url
        const pomanager = new POManager(page);
        
        const loginPage = pomanager.getLoginPage();
        //go to url
        const sourceURL = "https://www.saucedemo.com/v1/index.html";
        await loginPage.goTo(sourceURL);
        const username = "standard_user";
        const password = "secret_sauce";
        await loginPage.validLogin(username, password);
        //login
        await loginPage.loginSuceed();
        //selecting products
        const productPage = pomanager.getProductPage();
        const countType = "fixedQuantity";
        await productPage.selectFirstThreeProduct();

        //verify product added to cart in PDP

        await productPage.verifyItemQuantity(countType);
        await productPage.addingCart();
          
        //verify product added to cart
        //checkingout in cart page
        const cartPage = pomanager.getCartPage();
        // await cartPage.getCartList(countType);
        const productName = await cartPage.getCartList(countType);
        console.log(productName);
        await cartPage.verifyCart(productName, countType);

        await cartPage.checkingOut();

        //placing order in checkout page
        const checkoutPage = pomanager.getCheckoutPage();
        const firstName = "Foo";
        const lastName = "Bar"
        const postalCode = "11111"
        await checkoutPage.completeShipping(firstName, lastName, postalCode);
        await checkoutPage.submitOrder();

        //verify product in order overview
        const orderReviewPage = pomanager.getOrderReviewPage();
        await orderReviewPage.verifyOrderComplete(productName, countType);
        console.log(await orderReviewPage.verifyReferenceNumber());
        await orderReviewPage.completeOrder();

        //verify order success
        const thankyouPage = pomanager.getThankYouPage();
        await thankyouPage.verifyThankYouMessage();
       
    })
    
test('5 - Cart - Multiple Products(Fixed Products)', async ({page}) =>
    {
    
       
        //go to url
        const pomanager = new POManager(page);
        
        const loginPage = pomanager.getLoginPage();
        //go to url
        const sourceURL = "https://www.saucedemo.com/v1/index.html";
        await loginPage.goTo(sourceURL);
        const username = "standard_user";
        const password = "secret_sauce";
        await loginPage.validLogin(username, password);
        //login
        await loginPage.loginSuceed(); 
        //selecting product
        const productPage = pomanager.getProductPage();
        const countType = "allProducts";
        const selectproductName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ];
        // const productCount = selectproductName.length;
        await productPage.selectProducts(selectproductName);
        
        //verify product added to cart in PDP
 
        await productPage.verifyItemQuantity(countType);
        await productPage.addingCart();
         //verify product added to cart
        //checkingout in cart page
        const cartPage = pomanager.getCartPage();
        // await cartPage.getCartList(countType);
        const productName = await cartPage.getCartList(countType);
        console.log(productName);
        await cartPage.verifyCart(productName, countType);

        await cartPage.checkingOut();

        //placing order in checkout page
        const checkoutPage = pomanager.getCheckoutPage();
        const firstName = "Foo";
        const lastName = "Bar"
        const postalCode = "11111"
        await checkoutPage.completeShipping(firstName, lastName, postalCode);
        await checkoutPage.submitOrder();

        //verify product in order overview
        const orderReviewPage = pomanager.getOrderReviewPage();
        await orderReviewPage.verifyOrderComplete(productName, countType);
        console.log(await orderReviewPage.verifyReferenceNumber());
        await orderReviewPage.completeOrder();

        //verify order success
        const thankyouPage = pomanager.getThankYouPage();
        await thankyouPage.verifyThankYouMessage();
       
    
    
    
    })

test('6 - Cart - Total Sum of the Order in Cart)', async ({page}) =>
    {
    
        //go to url
        const pomanager = new POManager(page);
        
        const loginPage = pomanager.getLoginPage();
        //go to url
        const sourceURL = "https://www.saucedemo.com/v1/index.html";
        await loginPage.goTo(sourceURL);
        const username = "standard_user";
        const password = "secret_sauce";
        await loginPage.validLogin(username, password);
        //login
        await loginPage.loginSuceed(); 
        //selecting product
        const productPage = pomanager.getProductPage();
        const countType = "allProducts";
        //product name
        const selectproductName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ];
        // const productCount = selectproductName.length;   
   
        await productPage.selectProducts(selectproductName);
        const getTotal = await productPage.getProductAmount(selectproductName, countType);
        await console.log(`Total Amount in Product Page ${getTotal}`);
       
        // verify product added to cart in PDP
 
        await productPage.verifyItemQuantity(countType);
        await productPage.addingCart();
        //verify product added to cart
        //checkingout in cart page
        const cartPage = pomanager.getCartPage();
        // await cartPage.getCartList(countType);
        const productName = await cartPage.getCartList(countType);
        await cartPage.verifyCart(productName, countType);
        const getCartTotal = await cartPage.verifyCartAmount(countType);
        await console.log(`Total Amount in Cart Page ${getCartTotal}`);
        await cartPage.compareTotalCart(getTotal, getCartTotal);
        await cartPage.checkingOut();

        //placing order in checkout page
        const checkoutPage = pomanager.getCheckoutPage();
        const firstName = "Foo";
        const lastName = "Bar";
        const postalCode = "11111";
        await checkoutPage.completeShipping(firstName, lastName, postalCode);
        await checkoutPage.submitOrder();


        //verify product in order overview
        const orderReviewPage = pomanager.getOrderReviewPage();
        await orderReviewPage.verifyOrderComplete(productName, countType);
        const getORTotal = await orderReviewPage.orderTotal();
        await console.log(`Total Amount in Order Review Page ${getORTotal}`);
        await orderReviewPage.compareTotalPDP(getTotal, getORTotal);
        console.log(await orderReviewPage.verifyReferenceNumber());
        await orderReviewPage.completeOrder();

        //verify order success
        const thankyouPage = pomanager.getThankYouPage();
        await thankyouPage.verifyThankYouMessage();
               
    
    })