import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderReviewPage } from '../pages/orderreviewPage';
import { ThankYouPage } from '../pages/thankyouPage';

test('1 - Login - Valid User', async ({page}) =>
    {
        const loginPage = new LoginPage(page);
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
        
        const loginPage = new LoginPage(page);
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

test.only('3 - Complete Order Flow - Single Product', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    //go to url
    const sourceURL = "https://www.saucedemo.com/v1/index.html";
    await loginPage.goTo(sourceURL);
    //login
    const emails = "standard_user";
    const passwords = "secret_sauce";
    await loginPage.validLogin(emails, passwords);

    //selecting product in PDP
    const productPage = new ProductPage(page);
    const productName = "Sauce Labs Bolt T-Shirt";
    await productPage.selectProduct(productName);

    //verify product added to cart in PDP
    await productPage.verifyItemQuantity();
    await productPage.addingCart();

    //checkingout in cart page
    const cartPage = new CartPage(page);
    await cartPage.verifyCart(productName);
    console.log(await cartPage.getCartList());
    await cartPage.checkingOut();


    
    //placing order in checkout page
    const checkoutPage = new CheckoutPage(page);
    const firstName = "Foo";
    const lastName = "Bar"
    const postalCode = "11111"
    await checkoutPage.completeShipping(firstName, lastName, postalCode);
    await checkoutPage.submitOrder();


    //verify product in order overview
    const orderReviewPage = new OrderReviewPage(page);
    await orderReviewPage.verifyOrderComplete(productName);
    console.log(await orderReviewPage.verifyReferenceNumber());
    await orderReviewPage.completeOrder();

    //verify order success
    const thankyouPage = new ThankYouPage(page);
    await thankyouPage.verifyThankYouMessage();

   
   //pause
    // await page.pause();



    })

test('4 - Cart - Multiple Products(First 3 products)', async ({page}) =>
    {
    
        //go to url
        await page.goto("https://www.saucedemo.com/v1/");
        //login
        await page.locator("[data-test='username']").fill("standard_user");
        await page.locator("[data-test='password']").fill("secret_sauce");
        await page.locator("[id='login-button']").click();
        //logged-in
        await page.waitForLoadState('networkidle');
        await expect(page.locator("[class='product_label']")).toContainText("Products");
        //selecting product
    
        const products = await page.locator("[class='inventory_item']")
        const count = 3;
        //product name
        const productName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt"
        ];
        for(let i=0; i<count; i++)
            {
                await products.nth(i).locator("button").click();
                }
        page.pause();        
        //verify product added to cart
        const badgeIcon = await page.locator("[class*='cart_badge']");
        await expect(badgeIcon).toContainText(String(count));
        await badgeIcon.click();
        
        //verify all products names in cart
        
        for(let i=0; i<count; i++){
            const productCheckedOut = await page.locator("[class='inventory_item_name']").nth(i);
            console.log(await productCheckedOut.textContent()); //priting checkout item
            await expect(productCheckedOut).toContainText(productName[i]);
        }
        
       
       //pause
        // await page.pause();
    
    
    
    })
    
test('5 - Cart - Multiple Products(Fixed Products)', async ({page}) =>
    {
    
        //go to url
        await page.goto("https://www.saucedemo.com/v1/");
        //login
        await page.locator("[data-test='username']").fill("standard_user");
        await page.locator("[data-test='password']").fill("secret_sauce");
        await page.locator("[id='login-button']").click();
        //logged-in
        await page.waitForLoadState('networkidle');
        await expect(page.locator("[class='product_label']")).toContainText("Products");
        //selecting product
    
        const products = await page.locator("[class='inventory_item']")
        const count = await products.count();
        const productCount = 3
        //product name
        const productName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ];
        for(let i=0; i<count; i++)
            {   
                const allProducts = await products.nth(i).locator("div >> a >> div").textContent();
                // //printing trimmed products
                // console.log(await allProducts.trim());
                //logic to check if product is from the list
                if(productName.includes(allProducts.trim())){
                    await products.nth(i).locator("button").click();
                }
            }        
        //verify product added to cart
        const badgeIcon = await page.locator("[class*='cart_badge']");
        await expect(badgeIcon).toContainText(String(productCount));
        await badgeIcon.click();
        // await page.pause();
        
        //verify all products names in cart
        
        for(let i=0; i<productCount; i++){
            const productCheckedOut = await page.locator("[class='inventory_item_name']").nth(i);
            console.log(await productCheckedOut.textContent()); //priting checkout item
            await expect(productCheckedOut).toContainText(productName[i]);
        }
        
        
        //pause
        // await page.pause();
    
    
    
    })

test('6 - Cart - Total Sum of the Order in Cart)', async ({page}) =>
    {
    
        //go to url
        await page.goto("https://www.saucedemo.com/v1/");
        //login
        await page.locator("[data-test='username']").fill("standard_user");
        await page.locator("[data-test='password']").fill("secret_sauce");
        await page.locator("[id='login-button']").click();
        //logged-in
        await page.waitForLoadState('networkidle');
        await expect(page.locator("[class='product_label']")).toContainText("Products");
        //selecting product
    
        const products = await page.locator("[class='inventory_item']");
        const price = await page.locator("[class='inventory_item_price']");
        const count = await products.count();
        const productCount = 3;
        //product name
        const productName = ["Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ];

        let cartTotals = 0;
        for(let i=0; i<count; i++)
            {   
                const allProducts = await products.nth(i).locator("div >> a >> div").textContent();
                // //printing trimmed products
                // console.log(await allProducts.trim());
                //logic to check if product is from the list
                if(productName.includes(allProducts.trim())){
                    const total = await price.nth(i).textContent();
                    const totalArray = total.split(' ');
                    console.log(await totalArray); 
                    for (let i=0; i<totalArray.length; i++ ){
                    const totals = Number(totalArray[i].replace('$', ''));
                    cartTotals += totals
                    }
                //proceed to add products       
                    await products.nth(i).locator("button").click();
                }
            }     
        console.log(await cartTotals); //priting Cart amount
   
        //verify product added to cart
        const badgeIcon = await page.locator("[class*='cart_badge']");
        await expect(badgeIcon).toContainText(String(productCount));
        await badgeIcon.click();
        // await page.pause();
        
        //verify all products names in cart
        
        for(let i=0; i<productCount; i++){
            const productCheckedOut = await page.locator("[class='inventory_item_name']").nth(i);
            await expect(productCheckedOut).toContainText(productName[i]);
        }
        
        await page.locator("[class*='checkout_button']").click();
        //fill up checkout information
        await page.locator("[id='first-name']").fill("Foo");
        await page.locator("[id='last-name']").fill("bar");
        await page.locator("[id='postal-code']").fill("00000");
        await page.locator("[type='submit']").click();

        //verify amount in order sumarry is same as cart amount
        const sumAmount = await page.locator("[class='summary_subtotal_label']").textContent();
        const finalAmount = await Number(sumAmount.split(' ').pop().replace('$', ''));
        console.log(await finalAmount)
        await expect(cartTotals).toBe(finalAmount);

        //pause
        // await page.pause();
    

        
        
    
    })