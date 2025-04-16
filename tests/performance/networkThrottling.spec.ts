import {test,expect} from '@playwright/test';
import { applyNetworkConditions } from './utils/apply-networkConditions';

test("test in slow 3g",async({browserName,browser})=>{
  test.skip(browserName!='chromium',"cdp only supported on chromium");
  const context=await browser.newContext();
  const page=await context.newPage();
  await applyNetworkConditions(context,page,'offline');
  await page.goto("https://www.saucedemo.com");
  await expect(page.locator("#login-button")).toBeVisible();
});