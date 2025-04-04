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


/*
This is a Basic Auth test.

Some websites (like the-internet.herokuapp.com/basic_auth) pop up a browser-level auth prompt (username & password).

Playwright lets you embed the username and password in the URL: https://username:password@website.com
So here:
username = admin
password = admin

*/


/*
Login Session Storage and Reuse steps:
1.Opens the login page.
2.Fills in username and password.
3.Clicks login.
4.Waits for navigation to inventory.html, which confirms a successful login.
5.Save Session
6.Reuse the session
So why await context.close();?
✅ 1. Free up resources (memory, browser tabs):

    The context holds an isolated browser environment.

    If you keep it open, it keeps consuming resources (like RAM and CPU).

    Closing it is like saying: "I'm done with this login session — now let’s clean it up."

✅ 2. Isolate tests properly:

    Playwright encourages test isolation.

    By closing the context, your next test or reused context starts fresh and clean (except for the session which you saved).

✅ 3. Real-world simulation:

    Imagine logging into a website, closing the browser, and then opening it again — you're still logged in.

    That’s what you’re simulating: "login once → save session → later, reuse session in a fresh browser".
*/