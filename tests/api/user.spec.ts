import {test,expect} from '@playwright/test';

test.describe("API testing with reqres",()=>{
  test("Get /api/users/",async({request})=>{
    const response= await request.get("https://reqres.in/api/users?page=2");

    expect(response.ok()).toBeTruthy();//check 200 ok
    expect(response.status()).toBe(200);//check exact status

    const body=await response.json();//parse JSON body
    expect(body.page).toBe(2);//check page number
    expect(body.data.length).toBeGreaterThan(0);//check atleast one user returned
  })
  test("Post /api/users/",async({request})=>{
    const response=await request.post("https://reqres.in/api/users",{
      data:{
        name:"Playwright Tester",
        job:"Automation Testing",
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const body=await response.json();
    expect(body.name).toBe("Playwright Tester");
    expect(body.job).toBe("Automation Testing");
  });
});

/*
Logic: for get request we saw following via reqbin:
"page": 2,
"data": [ {...}, {...}, ... ] // 6 users
*/
