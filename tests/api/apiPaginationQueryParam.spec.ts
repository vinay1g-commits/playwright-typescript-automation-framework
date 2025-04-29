import {test,expect} from '@playwright/test';

test("apiPagination and QueryParam check",async({request})=>{
  const response=await request.get("https://reqres.in/api/users?page=2");
  expect(response.status()).toBe(200);

  let responseBody=await response.json();
  console.log("page 2 users",responseBody.data);

  expect(responseBody.page).toBe(2);
  expect(Array.isArray(responseBody.data)).toBeTruthy();
  responseBody.data.forEach(user => {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("last_name");
    expect(user).toHaveProperty("avatar");
  });
});