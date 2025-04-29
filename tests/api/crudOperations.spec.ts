import { test, expect } from '@playwright/test';

test("crud operations", async ({ request }) => {
  // Create (POST):
  let createResponse = await request.post("https://jsonplaceholder.typicode.com/posts/", {
    data: {  
      name: "vinay",
      job: "tester"
    }
  });
  expect(createResponse.status()).toBe(201);

  // For future use, save created user id.
  /*Commenting as NA for this example.
  let createBody = await createResponse.json();
  console.log("Created User", createBody);
  let createdUserId = createBody.id;  // Fixed the typo here
  expect(createdUserId).toBeDefined();
  */

  // Read (GET)
  const getResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/1`);
  console.log("GET Response status is:", getResponse.status());
  expect(getResponse.status()).toBe(200);  // Response will be 404 as in realirty the user won't get created there

  // Update (PUT)
  const updateResponse = await request.put(`https://jsonplaceholder.typicode.com/posts/1`, {
    data: {  
      name: "vinay updated",
      job: "Automation Tester"
    }
  });
  expect(updateResponse.status()).toBe(200);  // It will also not work and give 500
  const updateBody = await updateResponse.json();
  console.log("Updated user:", updateBody);
  expect(updateBody.name).toBe("vinay updated");
  expect(updateBody.job).toBe("Automation Tester");

  // Delete (DELETE) 
  const deleteResponse = await request.delete(`https://jsonplaceholder.typicode.com/posts/1`);
  expect(deleteResponse.status()).toBe(200);  
});
