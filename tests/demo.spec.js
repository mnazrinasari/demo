import { test, expect } from '@playwright/test';

test('Login - Valid User', async ({page}) =>
    {
    
        //go to url
        await page.goto("https://www.saucedemo.com/v1/");
        //login
        await page.locator("[data-test='username']").fill("standard_user");
        await page.locator("[data-test='password']").fill("secret_sauce");
        await page.locator("[id='login-button']").click();
        //verify if user is logged-in
        console.log(await page.url());
        expect(await page.url()).toBe("https://www.saucedemo.com/v1/inventory.html");
    
    })

test('Login - Locked out user', async ({page}) =>
    {
    
        //go to url
        await page.goto("https://www.saucedemo.com/v1/");
        //login
        await page.locator("[data-test='username']").fill("locked_out_user");
        await page.locator("[data-test='password']").fill("secret_sauce");
        await page.locator("[id='login-button']").click();
        //verify error for locked out user
        const expectedError = "Sorry, this user has been locked out.";
        const error = await page.locator("[data-test='error']");
        await expect(error).toContainText(expectedError);
        //printing error message
        console.log(await error.textContent());
    
    })


test('Complete Order Flow - Single Product', async ({page}) =>
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
    const productName = "Sauce Labs Bolt T-Shirt";
    for(let i=0; i<count; i++)
        {
            if(await products.nth(i).locator("div >> a >> div").textContent() === productName){
                await products.nth(i).locator("button").click();
                break;
            }
        }

    //verify product added to cart
    const badgeIcon = await page.locator("[class*='cart_badge']");
    await expect(badgeIcon).toContainText("1");
    await badgeIcon.click();
    //verify product is in cart page
    const productCheckedOut = await page.locator("[class='inventory_item_name']");
    await expect(productCheckedOut).toContainText(productName);
    console.log(await productCheckedOut.textContent()); //priting checkout item
    //checkout product
    await page.locator("[class*='checkout_button']").click();
    //fill up checkout information
    await page.locator("[id='first-name']").fill("Foo");
    await page.locator("[id='last-name']").fill("bar");
    await page.locator("[id='postal-code']").fill("00000");
    await page.locator("[type='submit']").click();

    //verify product in order overview
    const orderCompleted = await page.locator("[class='inventory_item_name']");
    await expect(orderCompleted).toContainText(productName);
    const refNumber = await page.locator("[class='summary_value_label']").nth(0).textContent();
    //printing order reference number
    console.log(refNumber);
    //proceed to finish
    await page.locator("[class='btn_action cart_button']").click();
    //verify order success

    const orderSuccess = page.locator("[class='complete-header']");
    await expect(orderSuccess).toContainText("THANK YOU");

   
   //pause
    // await page.pause();



})

test('Cart - Multiple Products(First 3 products)', async ({page}) =>
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
    
    test.only('Cart - Multiple Products(Fixed Products)', async ({page}) =>
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
                    //printing trimmed products
                    console.log(await allProducts.trim());
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

