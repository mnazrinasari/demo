
const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../pages/POManager');
const {expect} = require('@playwright/test');
const {playwright} = require('@playwright/test');
const {chromium} = require('playwright');


Then('Verify product grid is sorted alphabetically ascending by default', async function () {
    this.productPage = this.pomanager.getProductPage();
    this.allProducts = await this.productPage.getProductList();
    const afterSorting = await this.productPage.getProductList(); 
    let productsInitial = [...this.allProducts];
    const afterSortingAZ = await this.productPage.letterSortingAscend(this.allProducts); 
    const sortingOption = afterSortingAZ;
    await this.productPage.compareSorting(afterSorting, sortingOption);  
  });

  Then('Sort product grid to alphabetically descending', async function () {
    this.allProducts = await this.productPage.getProductList();
    const ascendOption = "Name (Z to A)";
    await this.productPage.selectSorting(ascendOption); 
  });

  Then('Verify product grid is sorted alphabetically descending', async function () {

    const afterSorting = await this.productPage.getProductList(); 
    let productsInitial = [...this.allProducts];
    const afterSortingZA = await this.productPage.letterSortingDescend(this.allProducts); 
    const sortingOption = afterSortingZA;
    await this.productPage.compareSorting(afterSorting, sortingOption);  
  });

  Then('Sort product grid to numerically ascending', async function () {
    const ascendOption = "Price (low to high)";
    this.pricing = await this.productPage.priceDisplay();
    await this.productPage.selectSorting(ascendOption); 
  });

  Then('Verify product grid is sorted numerically ascending', async function () {
    const afterSorting = await this.productPage.priceDisplay();
    let pricingInitial = [...this.pricing]; 
    const afterSortingLow = await this.productPage.priceSortingAscend(this.pricing); 
    const sortingOption = afterSortingLow;
    await this.productPage.compareSorting(afterSorting, sortingOption);

  });

  Then('Sort product grid to numerically descending', async function () {
    const ascendOption = "Price (high to low)";
    this.pricing = await this.productPage.priceDisplay();
    await this.productPage.selectSorting(ascendOption); 
  });

  Then('Verify product grid is sorted numerically descending', async function () {
    const afterSorting = await this.productPage.priceDisplay(); 
    pricingInitial = [...this.pricing]; 
    const afterSortingHigh= await this.productPage.priceSortingDescend(this.pricing);  
    const sortingOption = afterSortingHigh;
    await this.productPage.compareSorting(afterSorting, sortingOption);
  });

  Then('Sort product grid to alphabetically ascending', async function () {
    this.allProducts = await this.productPage.getProductList();
    const ascendOption = "Name (A to Z)";
    await this.productPage.selectSorting(ascendOption); 
  });

  Then('Verify product grid is sorted alphabetically ascending', async function () {
    const afterSorting = await this.productPage.getProductList(); 
    let productsInitial = [...this.allProducts];

    const afterSortingAZ = await this.productPage.letterSortingAscend(this.allProducts); 
    const sortingOption = afterSortingAZ;
    await this.productPage.compareSorting(afterSorting, sortingOption);
  });


