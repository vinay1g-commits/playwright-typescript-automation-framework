import {test,expect} from '@playwright/test';

test.describe("Positive API Test ",()=>{
  test("reqres user test @api",async({request})=>{
    const response=await request.get("https://reqres.in/api/users/2")
    
    expect(response.status()).toBe(200);
    
    const responseBody=await response.json();
    expect(responseBody.data).toBeDefined();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBe("janet.weaver@reqres.in");
    expect(responseBody.data.first_name).toBe("Janet");
    expect(responseBody.data.last_name).toBe("Weaver");
    expect(responseBody.data.avatar).toContain("https://");

    expect(response.headers()["content-type"]).toContain("application/json");
  });
});