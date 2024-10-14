const {test, expect} = require('@playwright/test');

class LoginPage {
    constructor(page)
{
    this.page = page;
    this.username = page.locator("[id='user-name']");
    this.password = page.locator("[id='password']");
    this.loginbutton = page.locator("[id='login-button']");
    this.loggedInUser = page.locator("[class='product_label']");
    this.lockedOutError = page.locator("[data-test='error']");
}

async goTo(sourceURL)
{
    await this.page.goto(sourceURL);

}

async validLogin(usernames, passwords)
{
    await this.username.fill(usernames);
    await this.password.fill(passwords);
    await this.loginbutton.click();
    await this.page.waitForLoadState('networkidle');
}

async loginSuceed()
{
    expect(await this.page.url()).toBe("https://www.saucedemo.com/v1/inventory.html");
}

async loginNotSuceed()
{
    const expectedError = "Sorry, this user has been locked out.";
    const loginVerified = expect(this.lockedOutError).toContainText(expectedError);
    expect (loginVerified).toBeTruthy();

    //printing error message
    return await this.lockedOutError.textContent(); 

}

}

module.exports = {LoginPage};