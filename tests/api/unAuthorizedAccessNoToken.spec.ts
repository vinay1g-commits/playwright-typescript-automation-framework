import {test,expect} from '@playwright/test';

test("unAuthorized Access API Endpoint Check",async({request})=>{
  const response=await request.get("https://api.github.com/user");
  expect(response.status()).toBe(401);
  if(response.status()===401){
    const responseBody=await response.json();
    expect(responseBody.message).toBe("Requires authentication");
  }else{
    console.warn("Note: This endpoint is public. Authorization check skipped.");
  }
});