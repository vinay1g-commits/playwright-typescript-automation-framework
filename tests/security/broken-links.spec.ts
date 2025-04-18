import { test, expect } from '@playwright/test';

test('✅ Broken Link Check with Best Practices', async ({ page, request }) => {
  await page.goto('https://demo.guru99.com/test/newtours/');

  const links = await page.$$eval('a', anchors =>
    anchors
      .map(a => a.href)
      .filter(href =>
        href &&
        href.startsWith('http') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('javascript:')
      )
  );

  for (const link of links) {
    try {
      const res = await request.get(link);
      const status = res.status();

      if (res.ok()) {
        console.log(` ${link} => ${status}`);
      } else {
        console.warn(` ${link} => ${status}`);
      }

      expect(res.ok()).toBeTruthy(); 
    } catch (err) {
      console.error(` Error checking ${link}:`, err);
      throw err; 
    }
  }
});


//npm run test -- tests/security/broken-links.spec.ts --trace on
//Or
//npx playwright test tests/security/broken-links.spec.ts --trace on --reporter html

