const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../pages/POManager');
const {expect} = require('@playwright/test');
const {playwright} = require('@playwright/test');
const {chromium} = require('playwright');



Given('User on lagin page enters a valid username and password', async function () {
  this.loginPage = this.pomanager.getLoginPage();
  //go to url
  const sourceURL = "https://www.saucedemo.com/v1/index.html";
  await this.loginPage.goTo(sourceURL);  
  this.emails = "standard_user";
  this.passwords = "secret_sauce";
  });

When('User click the login button', async function () {
  await this.loginPage.validLogin(this.emails, this.passwords);
});

Then('User is logged in', async function () {
  await this.loginPage.loginSuceed();
});


Given('User on login page enters a locked username and password', async function () {
  this.emails = "locked_out_user";
  this.passwords = "secret_sauce";
});


Then('User recieve error message', async function () {
  await this.loginPage.loginNotSuceed;
  console.log(await this.loginPage.loginNotSuceed());
});
