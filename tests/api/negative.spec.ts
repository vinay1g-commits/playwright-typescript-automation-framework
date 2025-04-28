import {test,expect} from '@playwright/test';

test("Negative Test check for reqres invalid user",async({page})=>{
  const response=await page.goto("https://jsonplaceholder.typicode.com/users/999");
  expect(response?.status()).toBe(404);
  const responseBody=await response?.json();
  expect(responseBody).toEqual({});

  expect(response?.headers()["content-type"]).toContain("application/json");

})