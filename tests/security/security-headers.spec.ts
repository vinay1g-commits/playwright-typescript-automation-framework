import { test, expect } from '@playwright/test';

const domains = [
  "https://www.saucedemo.com",
  "https://www.youtube.com",
  "https://www.wikipedia.org"
];

test.describe("Security Headers Check", () => {
  domains.forEach(domain => {
    test(`Checking security headers for ${domain}`, async ({ request }) => {

      const response = await request.get(domain);
      const headers = response.headers();

      console.log(`\nHeaders from ${domain}:`);
      Object.entries(headers).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

      // x-content-type-options
      expect.soft(headers['x-content-type-options'], `'x-content-type-options' header missing for ${domain}`)
        .toBe('nosniff');

      // x-frame-options
      expect.soft(headers['x-frame-options'], `'x-frame-options' header missing for ${domain}`)
        .toMatch(/DENY|SAMEORIGIN/);

      // content-security-policy
      expect.soft(headers['content-security-policy'], `'content-security-policy' header missing for ${domain}`)
        .toBeDefined();

      // strict-transport-security
      expect.soft(headers['strict-transport-security'], `'strict-transport-security' header missing for ${domain}`)
        .toContain('max-age');

      // referrer-policy
      expect.soft(headers['referrer-policy'], `'referrer-policy' header missing for ${domain}`)
        .toMatch(/no-referrer|strict-origin-when-cross-origin|same-origin/);

      // permissions-policy
      expect.soft(headers['permissions-policy'], `'permissions-policy' header missing for ${domain}`)
        .toBeDefined();

      // cache-control
      expect.soft(headers['cache-control'], `'cache-control' header missing or incorrect for ${domain}`)
        .toMatch(/no-store|private|no-cache/);

      console.log(`✅ Completed security header check for ${domain}`);
    });
  });
});
