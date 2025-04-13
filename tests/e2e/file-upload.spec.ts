import {test,expect} from '@playwright/test';

test.describe("File upload test",()=>{
  test("uploading",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.setInputFiles("#file-upload","students.json");
    await page.locator("#file-submit").click();
    await expect(page.locator('h3')).toHaveText("File Uploaded!");
  });
});