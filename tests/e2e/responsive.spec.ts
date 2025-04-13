//verifies ui correctness across various screen sizes(Tabs/mobiles/desktop)
import {test, expect, devices} from '@playwright/test';

test.describe("Responsive testing across various devices",()=>{
  test("test for desktop",async({page})=>{
    await page.setViewportSize({width:1366,height:768});
    await page.goto("https://www.saucedemo.com");
    await expect(page.viewportSize()).toEqual({width:1366,height:768});
  })
  test('Test for Mobile (Pixel 5)', async ({ browser }) => {
    test.skip(test.info().project.name === 'firefox', 'isMobile not supported in Firefox');
  
    const pixel5 = devices['Pixel 5'];
    const context = await browser.newContext(pixel5);
    const page = await context.newPage();
  
    await page.goto('https://www.saucedemo.com');
  
    // Dynamically compare to expected viewport
    const actualViewport = page.viewportSize();
    const expectedViewport = pixel5.viewport;
  
    expect(actualViewport).toEqual(expectedViewport);
  
    await context.close();
  });
});