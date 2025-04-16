import {test,expect} from '@playwright/test';

test('login testOne @critical @login',async({page})=>{
  await page.goto("https://www.saucedemo.com");
  expect(await page.title()).toContain('Swag Labs');
});
test('login testTwo @lowPriority',async({page})=>{
  await page.goto("https://www.yahoo.com");
  await expect(page).toHaveTitle(/Yahoo/);
});

//Run only critical tests clearly:npx playwright test --grep @critical

//Run tests excluding a specific tag:npx playwright test --grep-invert @lowPriority

