const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
// const dataSet = JSON.parse(require("../utils/testdata.json"));

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
        await loginPage.loginSuceed();
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
    const selectproductName = ["Sauce Labs Bolt T-Shirt"];
    await productPage.selectProducts(selectproductName);

    //verify product added to cart in PDP
    await productPage.verifyItemQuantity();
    await productPage.addingCart();

    //checkingout in cart page
    const cartPage = pomanager.getCartPage();
    const productName = await cartPage.getCartList();
    await cartPage.verifyCart(productName);
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
    await orderReviewPage.verifyOrderComplete(productName);
    console.log(await orderReviewPage.verifyProductComplete());
    console.log(await orderReviewPage.verifyReferenceNumber());
    await orderReviewPage.completeOrder();

    //verify order success
    const thankyouPage = pomanager.getThankYouPage();
    await thankyouPage.verifyThankYouMessage();

    })
    
test.only('4 - Cart - Multiple Products(Fixed Products)', async ({page}) =>
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
        const selectproductName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ];
        // const productCount = selectproductName.length;
        const addingCart = await productPage.selectProducts(selectproductName);
        console.log(addingCart);
        
        //verify product added to cart in PDP

        const cartquantity = await productPage.totalproductCart();
        console.log(cartquantity);
        const totalremove = 1;
        const removed = await productPage.removeProducts(selectproductName, totalremove);
        await console.log(removed);

        const quantity = cartquantity - totalremove;

        await console.log(quantity);
        console.log(await productPage.getProductList());

        await productPage.verifyItemQuantityafter(quantity);


        await productPage.verifyItemQuantity();
        await productPage.addingCart();
         //verify product added to cart
        //checkingout in cart page
        const cartPage = pomanager.getCartPage();
        // await cartPage.getCartList();
        const productName = await cartPage.getCartList();
        await cartPage.verifyCart(productName);

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
        // await page.pause();
        await orderReviewPage.verifyOrderComplete(productName);
        console.log(await orderReviewPage.verifyReferenceNumber());
        await orderReviewPage.completeOrder();

        //verify order success
        const thankyouPage = pomanager.getThankYouPage();
        await thankyouPage.verifyThankYouMessage();
       
    
    
    
    })

test('5 - Cart - Total Sum of the Order in Cart)', async ({page}) =>
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
        //product name
        const selectproductName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ];
        // const productCount = selectproductName.length;   
   
        await productPage.selectProducts(selectproductName);
        const getTotal = await productPage.getProductAmount(selectproductName);
        await console.log(`Total Amount in Product Page ${getTotal}`);
       
        // verify product added to cart in PDP
 
        await productPage.verifyItemQuantity();


        //sorting to A to Z (Default)
        let allProducts = await productPage.getProductList();
        await console.log(`[CASE1]Before Ascend ${allProducts}`); //display initial price display
        let ascendOption = "Name (A to Z)";
        await productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high
        let afterSorting = await productPage.getProductList(); //get the low to high list
        let productsInitial = [...allProducts];
        //store the unsorted list in pricing in pricingFinal
        await console.log(`After Manual Sorting ${afterSorting}`); //display low to high after sorting
        await console.log(`After Ascend,Initial Value ${allProducts}`); //display low to high after sorting

        const afterSortingAZ = await productPage.letterSortingAscend(allProducts); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial

        await console.log(`After Manual Sorting ${afterSortingAZ}`);
        await console.log(`Before Ascend ${productsInitial}`);
        let sortingOption = afterSortingAZ;
        await productPage.compareSorting(afterSorting, sortingOption);

        //sorting to Z to A 
        allProducts = await productPage.getProductList();
        await console.log(`[CASE2]Before Ascend ${allProducts}`); //display initial price display
        ascendOption = "Name (Z to A)";
        await productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high
        afterSorting = await productPage.getProductList(); //get the low to high list
        productsInitial = [...allProducts];
        //store the unsorted list in pricing in pricingFinal
        await console.log(`After Ascend ${afterSorting}`); //display low to high after sorting
        await console.log(`After Ascend,Initial Value ${allProducts}`); //display low to high after sorting

        const afterSortingZA = await productPage.letterSortingDescend(allProducts); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial

        await console.log(`After Sorting ${afterSortingZA}`);
        await console.log(`Before Ascend ${productsInitial}`);
        sortingOption = afterSortingZA;
        await productPage.compareSorting(afterSorting, sortingOption);  




        //sorting to low to high
        ascendOption = "Price (low to high)";
        let pricing = await productPage.priceDisplay();
        await console.log(`[CASE3]Before Ascend ${pricing}`); //display initial price display
        await productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high
        afterSorting = await productPage.priceDisplay(); //get the low to high list
        let pricingInitial = [...pricing]; //store the unsorted list in pricing in pricingFinal
        await console.log(`After Ascend ${afterSorting}`); //display low to high after sorting
        await console.log(`After Ascend,Initial Value ${pricing}`); //display low to high after sorting

        const afterSortingLow = await productPage.priceSortingAscend(pricing); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial
        await console.log(`After Sorting ${afterSortingLow}`);
        await console.log(`Before Ascend ${pricingInitial}`);
        sortingOption = afterSortingLow;
        await productPage.compareSorting(afterSorting, sortingOption);

        //sorting to low to high
        ascendOption = "Price (high to low)";
        pricing = await productPage.priceDisplay();
        await console.log(`[CASE4]Before Ascend ${pricing}`); //display initial price display
        await productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high
        afterSorting = await productPage.priceDisplay(); //get the low to high list
        pricingInitial = [...pricing]; //store the unsorted list in pricing in pricingFinal
        await console.log(`After Ascend ${afterSorting}`); //display low to high after sorting
        await console.log(`After Ascend,Initial Value ${pricing}`); //display low to high after sorting

        const afterSortingHigh= await productPage.priceSortingDescend(pricing); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial
        await console.log(`After Logic Sorting ${afterSortingHigh}`);
        await console.log(`Before Ascend ${pricingInitial}`);
        sortingOption = afterSortingHigh;
        await productPage.compareSorting(afterSorting, sortingOption);


        

        await productPage.addingCart();

        //verify product added to cart
        //checkingout in cart page
        const cartPage = pomanager.getCartPage();
        // await cartPage.getCartList();
        const productName = await cartPage.getCartList();
        await cartPage.verifyCart(productName);
        const getCartTotal = await cartPage.verifyCartAmount();
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
        await orderReviewPage.verifyOrderComplete(productName);
        const getORTotal = await orderReviewPage.orderTotal();
        await console.log(`Total Amount in Order Review Page ${getORTotal}`);
        await orderReviewPage.compareTotalPDP(getTotal, getORTotal);
        console.log(await orderReviewPage.verifyReferenceNumber());
        await orderReviewPage.completeOrder();

        //verify order success
        const thankyouPage = pomanager.getThankYouPage();
        await thankyouPage.verifyThankYouMessage();
               
    
    })