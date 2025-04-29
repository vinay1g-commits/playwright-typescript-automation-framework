import{test,expect} from '@playwright/test';

test("api response time check",async({request})=>{
  
  let start=Date.now();
  const response=await request.get("https://reqres.in/api/users/2");
  let end=Date.now();
  let responseTime=end-start;
  console.log(`Response Time is:${responseTime}`);
  expect(response.status()).toBe(200);
  expect(responseTime).toBeLessThan(2000);
});