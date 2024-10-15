
const {POManager} = require('../../pages/POManager');
const {Before, After} = require('@cucumber/cucumber');
const {AfterStep, BeforeStep, Status} = require('@cucumber/cucumber');
const {chromium} = require('playwright');

Before(async function () {

  this.browser = await chromium.launch({
    headless: false
  });
  this. context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.pomanager = new POManager(this.page);  
    
 

})

After(async function () {
    await this.page.close();
    await this.context.close();
    await this.browser.close();

    console.log("Execution done");  
      
   
  
  })


  AfterStep( async function ({result}) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        const timestamp = new Date().toISOString().replace(/:/g, '_');
        const spath = `./screenshots/Failed-${timestamp}.png`;
        await this.page.screenshot({path: spath});
        console.log("screenshot captured");
    }
  });