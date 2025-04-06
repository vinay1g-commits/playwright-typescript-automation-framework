import {test,expect} from '@playwright/test';

test.describe("Authentication Tests",()=>{
  test("Basic Auth Login",async({page})=>{
    await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await expect(page.locator('p')).toHaveText(/Congratulations/);//for matching partial text is given here 'Congratualtions' using regex(regular expressions)
    })
  
    test("Session persistence using storage State",async({browser})=>{
      const context=await browser.newContext();
      const page=await context.newPage();
      await page.goto('https://www.saucedemo.com/');
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('secret_sauce');
      await page.locator('#login-button').click();
      await expect(page).toHaveURL(/inventory.html/);

      //saving the above login session:
      await context.storageState({path:"auth.json"});
      await context.close();

      //load session from saved context
      const contextReuse=await browser.newContext({storageState:"auth.json"});
      const pageReuse=await contextReuse.newPage();
      await pageReuse.goto("https://www.saucedemo.com/inventory.html");
      await expect(pageReuse).toHaveURL(/inventory.html/); 
    });  
});