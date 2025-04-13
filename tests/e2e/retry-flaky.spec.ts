import {test,expect} from '@playwright/test';

test.describe("retrying test",()=>{
  test("timout retry",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
    await page.locator("//button[.='Start']").click();
    const helloworld=page.locator("#finish h4");
    await expect(helloworld).toBeVisible({timeout:5000});
  });
});