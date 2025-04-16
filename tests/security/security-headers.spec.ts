// ✅ Pass   ❌ Fail   🛑 Fatal   🔍 Inspect   ⚠️ Warning


import {test,expect} from '@playwright/test';
const domains=[
  "https://www.saucedemo.com",
  "https://www.youtube.com",
  "https://www.wikipedia.org"
];
test.describe("security test",()=>{
  domains.forEach((domain)=>{
    test(`security header checks for ${domain}`,async({request})=>{
      const response=await request.get(domain);
      const headers=response.headers();

      const errors: string[] = []; 

      console.log(`headers for ${domain} are:`);
      for(const [key,value] of Object.entries(headers)){
        console.log(`${key}:${value}`);
      }
      // Collect errors instead of failing immediately
      if ((headers['x-content-type-options'] ?? '') !== 'nosniff') {
        errors.push(`❌ x-content-type-options: expected "nosniff", got "${headers['x-content-type-options'] ?? 'MISSING'}"`);
      }

      if (!/DENY|SAMEORIGIN/.test(headers['x-frame-options'] ?? '')) {
        errors.push(`❌ x-frame-options: expected "DENY" or "SAMEORIGIN", got "${headers['x-frame-options'] ?? 'MISSING'}"`);
      }

      if (!headers['content-security-policy']) {
        errors.push(`❌ content-security-policy header is missing or empty`);
      }

      if (!(headers['strict-transport-security'] ?? '').includes('max-age')) {
        errors.push(`❌ strict-transport-security: must include "max-age", got "${headers['strict-transport-security'] ?? 'MISSING'}"`);
      }

      if (!/(no-referrer|strict-origin-when-cross-origin|same-origin)/.test(headers['referrer-policy'] ?? '')) {
        errors.push(`❌ referrer-policy: expected strict policy, got "${headers['referrer-policy'] ?? 'MISSING'}"`);
      }

      if (!headers['permissions-policy']) {
        errors.push(`❌ permissions-policy header is missing or empty`);
      }

      if (!/(no-store|private|no-cache)/.test(headers['cache-control'] ?? '')) {
        errors.push(`❌ cache-control: expected "no-store", "private" or "no-cache", got "${headers['cache-control'] ?? 'MISSING'}"`);
      }

      // Final assertion
      if (errors.length > 0) {
        throw new Error(`🛑 Security header check failed for ${domain}:\n` + errors.join('\n'));
      } else {
        console.log(`✅ All required headers are present and valid for ${domain}`);
      }
    });
  });
});