import {test,expect} from "@playwright/test";

test("api schema validation",async({request})=>{
  const response=await request.get("https://reqres.in/api/users/2");
  expect(response.status()).toBe(200);
  let responseBody=await response.json();
  expect(responseBody).toHaveProperty("data");
  expect(responseBody.data).toHaveProperty("id");
  expect(responseBody.data).toHaveProperty("email");
  expect(responseBody.data).toHaveProperty("first_name");
  expect(responseBody.data).toHaveProperty("last_name");
  expect(responseBody.data).toHaveProperty("avatar");

  expect(responseBody).toHaveProperty("support");
  expect(responseBody.support).toHaveProperty("url");
  expect(responseBody.support).toHaveProperty("text");

  //validate Types
  expect(typeof responseBody.data.id).toBe('number');
  expect(typeof responseBody.data.email).toBe('string');
  expect(typeof responseBody.data.first_name).toBe('string');
  expect(typeof responseBody.data.last_name).toBe('string');
  expect(typeof responseBody.data.avatar).toBe('string');
  expect(typeof responseBody.support.url).toBe('string');
  expect(typeof responseBody.support.text).toBe('string');
})