import {test,expect} from '@playwright/test';

test.describe("performance test of swagger",()=>{
  test("page load time",async({page})=>{
    const startTime=Date.now();
    await page.goto("https://petstore.swagger.io/");
    const loadTime=Date.now()-startTime;
    console.log(`time to load the page is: ${loadTime}`);
    expect(loadTime).toBeLessThan(5000);
  })
  test("api load time",async({request})=>{
    const start=Date.now();
    const response=await request.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
    const endTime=Date.now()-start;
    expect(response.ok()).toBeTruthy();
    console.log(`time taken to get api ersponse is:${endTime}`);
    expect(endTime).toBeLessThan(3000);
  })
})