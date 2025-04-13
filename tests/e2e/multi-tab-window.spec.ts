import {test,expect} from '@playwright/test';

test.describe("to check for new tab",()=>{
  test(`new window/tab`,async({context})=>{
    //1. create a new page
    const page=await context.newPage();
    //2.navigate to parent page
    await page.goto("https://the-internet.herokuapp.com/windows");
    //3.wait for new page to open after clicking "Click Here"
    const [newPage]=await Promise.all([
      context.waitForEvent("page"),
      await page.click('text="Click Here"'),
    ]);
    //4.ensure new page has openened fully
    await page.waitForLoadState("domcontentloaded");
    //5.Assertions on the newly opened page
    await expect(newPage).toHaveURL(/\/windows\/new/);
    await expect(newPage.locator("h3")).toHaveText("New Window");
    //6.Close the tab
    await newPage.close();
    //7.verify original page url remains correct
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/windows");
  });
});