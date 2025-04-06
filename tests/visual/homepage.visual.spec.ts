import {test,expect} from '@playwright/test';

test.describe("visual regression tests",()=>{
  test("LoginPg visual check",async({page})=>{
    await page.goto("https://demo.applitools.com/index.html");
    //wait for the page to load completely
    await page.waitForLoadState('networkidle');
    //snapshot of entire loginpg
    expect(await page.screenshot()).toMatchSnapshot("loginpg.png");
  });
  test("specific element visual check",async({page})=>{
    await page.goto("https://demo.applitools.com/index.html");
    const twitterImg=await page.locator("//img[@src='img/social-icons/twitter.png']");
    await twitterImg.waitFor({state:'visible'});
    expect(await twitterImg.screenshot()).toMatchSnapshot("twitterIcon.png");
  })
})