import { test, expect } from '@playwright/test';

test("Authentication login test for reqres @api", async ({ request }) => {
  const response = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass'
    }
  });

  const responseBody = await response.json();
  console.log('Status:', response.status());
  console.log('Body:', responseBody);

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain("application/json");

  expect(responseBody.accessToken).toBeDefined();
  expect(typeof responseBody.accessToken).toBe('string');
});

//Run This code via cmd : npx playwright test tests/api/validAuthentication.spec.ts --project=firefox