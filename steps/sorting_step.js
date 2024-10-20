
const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../pages/POManager');
const {expect} = require('@playwright/test');
const {playwright} = require('@playwright/test');
const {chromium} = require('playwright');


Then('Verify product grid is sorted alphabetically ascending by default', async function () {
    this.productPage = this.pomanager.getProductPage();


    this.allProducts = await this.productPage.getProductList();
    const afterSorting = await this.productPage.getProductList(); //get the low to high list
    console.log(`[CASE1]Before Ascend ${this.allProducts}`); //display initial price display
    let productsInitial = [...this.allProducts];
    const afterSortingAZ = await this.productPage.letterSortingAscend(this.allProducts); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial
    console.log(`After Sorting ${afterSortingAZ}`);
    console.log(`Before Ascend ${productsInitial}`);
    const sortingOption = afterSortingAZ;
    await this.productPage.compareSorting(afterSorting, sortingOption);  

  });

  Then('Sort product grid to alphabetically descending', async function () {



    this.allProducts = await this.productPage.getProductList();
    console.log(`[CASE1]Before Ascend ${this.allProducts}`); //display initial price display
    const ascendOption = "Name (Z to A)";
    await this.productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high

  });



  Then('Verify product grid is sorted alphabetically descending', async function () {

    const afterSorting = await this.productPage.getProductList(); //get the low to high list
    let productsInitial = [...this.allProducts];
    //store the unsorted list in pricing in pricingFinal
    console.log(`After Ascend ${afterSorting}`); //display low to high after sorting
    console.log(`After Ascend,Initial Value ${this.allProducts}`); //display low to high after sorting

    const afterSortingZA = await this.productPage.letterSortingDescend(this.allProducts); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial

    console.log(`After Sorting ${afterSortingZA}`);
    console.log(`Before Ascend ${productsInitial}`);
    const sortingOption = afterSortingZA;
    await this.productPage.compareSorting(afterSorting, sortingOption);  


  });



  Then('Sort product grid to numerically ascending', async function () {
    const ascendOption = "Price (low to high)";
    this.pricing = await this.productPage.priceDisplay();
    console.log(`[CASE2]Before Ascend ${this.pricing}`); //display initial price display
    await this.productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high


  });



  Then('Verify product grid is sorted numerically ascending', async function () {
    const afterSorting = await this.productPage.priceDisplay(); //get the low to high list
    let pricingInitial = [...this.pricing]; //store the unsorted list in pricing in pricingFinal
    console.log(`After Ascend ${afterSorting}`); //display low to high after sorting
    console.log(`After Ascend,Initial Value ${this.pricing}`); //display low to high after sorting

    const afterSortingLow = await this.productPage.priceSortingAscend(this.pricing); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial
    console.log(`After Sorting ${afterSortingLow}`);
    console.log(`Before Ascend ${pricingInitial}`);
    const sortingOption = afterSortingLow;
    await this.productPage.compareSorting(afterSorting, sortingOption);

  });


  Then('Sort product grid to numerically descending', async function () {
    const ascendOption = "Price (high to low)";
    this.pricing = await this.productPage.priceDisplay();
    console.log(`[CASE3]Before Ascend ${this.pricing}`); //display initial price display
    await this.productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high
    

  });


  Then('Verify product grid is sorted numerically descending', async function () {
    const afterSorting = await this.productPage.priceDisplay(); //get the low to high list
    pricingInitial = [...this.pricing]; //store the unsorted list in pricing in pricingFinal
    console.log(`After Ascend ${afterSorting}`); //display low to high after sorting
    console.log(`After Ascend,Initial Value ${this.pricing}`); //display low to high after sorting

    const afterSortingHigh= await this.productPage.priceSortingDescend(this.pricing); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial
    console.log(`After Logic Sorting ${afterSortingHigh}`);
    console.log(`Before Ascend ${pricingInitial}`);
    const sortingOption = afterSortingHigh;
    await this.productPage.compareSorting(afterSorting, sortingOption);

  });

  Then('Sort product grid to alphabetically ascending', async function () {
    this.allProducts = await this.productPage.getProductList();
    console.log(`[CASE4]Before Ascend ${this.allProducts}`); //display initial price display
    const ascendOption = "Name (A to Z)";
    await this.productPage.selectSorting(ascendOption); //CLICK ACTION !! sorting to low to high

  });


  Then('Verify product grid is sorted alphabetically ascending', async function () {
    const afterSorting = await this.productPage.getProductList(); //get the low to high list
    let productsInitial = [...this.allProducts];
    //store the unsorted list in pricing in pricingFinal
    console.log(`After Manual Sorting ${afterSorting}`); //display low to high after sorting
    console.log(`After Ascend,Initial Value ${this.allProducts}`); //display low to high after sorting

    const afterSortingAZ = await this.productPage.letterSortingAscend(this.allProducts); //MANUAL SORTING !!! manipulating pricing without touching intial in pricingInitial

    console.log(`After Manual Sorting ${afterSortingAZ}`);
    console.log(`Before Ascend ${productsInitial}`);
    const sortingOption = afterSortingAZ;
    await this.productPage.compareSorting(afterSorting, sortingOption);


  });


