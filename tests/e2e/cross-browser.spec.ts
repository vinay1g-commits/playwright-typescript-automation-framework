import {test,expect} from '@playwright/test';

test.describe("cross-browser-test",()=>{
  test("testing saucedemo across browsers",async({page,browserName})=>{
    await page.goto("https://www.saucedemo.com/")
    //expect(page.title).toBe(/Swag Labs/);
    console.log(`Test executesd successfully on ${browserName}`);
  });
})