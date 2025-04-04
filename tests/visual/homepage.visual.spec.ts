import {test,expect} from '@playwright/test';

const url="http://127.0.0.1:5500/tests/visual/visual%20test.html";
test.describe("visual testing",()=>{
  test("complete page test",async({page})=>{
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot()).toMatchSnapshot("fullpage-enhanced.png");
  })
  test("card component snapshot check",async({page})=>{
    await page.goto(url);
    const cards=await page.locator('.card-container').first();
    await expect(cards).toBeVisible();
    await cards.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    expect(await cards.screenshot()).toMatchSnapshot("cards.png");
  })
  test("dropdown visual check",async({page})=>{
    await page.goto(url);
    const dropdown=await page.locator('.dropdown').first();
    await expect(dropdown).toBeVisible();
    await dropdown.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    expect(await dropdown.screenshot()).toMatchSnapshot("dropdown.png");
  })
  test("button visual check",async({page})=>{
    await page.goto(url);
    const button=await page.locator('.btn').first();
    await expect(button).toBeVisible()
    await button.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    expect(await button.screenshot()).toMatchSnapshot("button.png");
  })
})