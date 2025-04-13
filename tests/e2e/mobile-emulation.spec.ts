import {test,expect} from '@playwright/test';

test.describe("testing in mobile view",()=>{
  test("mobile test",async({page,browserName})=>{
    await page.goto("https://www.saucedemo.com");
    const viewportSize=page.viewportSize();
    console.log(`${browserName} of viewwport size:`,viewportSize);
    await expect(page.locator('#login-button')).toBeVisible();
  })
})