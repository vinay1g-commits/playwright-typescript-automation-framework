import { test, expect } from '@playwright/test';

test('verify seo meta tags (soft)', async ({ page, request }, testInfo) => {
  // 1. Go to page
  const response = await page.goto('https://www.saucedemo.com');
  // soft-check status & content-type
  await expect.soft(response).not.toBeNull();
  await expect.soft(response!.status()).toBe(200);
  await expect.soft(response!.headers()['content-type']).toContain('text/html');

  // 2. Title
  const title = await page.title();
  await expect.soft(title).toContain('Swag Labs');

  // 3. Core meta tags
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  const robots      = await page.locator('meta[name="robots"]').getAttribute('content');
  const viewport    = await page.locator('meta[name="viewport"]').getAttribute('content');
  await expect.soft(description).toBeTruthy();
  await expect.soft(robots).toMatch(/^(index|noindex)(,(follow|nofollow))?$/);
  await expect.soft(viewport).toContain('width=device-width');

  // 4. Open Graph
  for (const tag of ['og:title','og:description','og:image','og:url','og:type']) {
    const locator = page.locator(`meta[property="${tag}"]`);
    if (await locator.count() > 0) {
      const content = await locator.getAttribute('content');
      await expect.soft(content, `${tag} should exist`).toBeTruthy();
    } else {
      console.info(`OG tag not present: ${tag}`);
    }
  }
  

  // 5. Canonical
  const canonicalLocator = page.locator('link[rel="canonical"]');
  if (await canonicalLocator.count() > 0) {
    const canonical = await canonicalLocator.getAttribute('href');
    await expect.soft(canonical).toContain('saucedemo.com');
  } else {
  console.info('Canonical link tag not present');
    }


  // 6. Headings
  await expect.soft(await page.locator('h1').count()).toBe(1);

  // 7. Image alts
  const images = page.locator('img');
  for (let i = 0, n = await images.count(); i < n; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    await expect.soft(alt, `img[${i}] alt`).toBeTruthy();
  }

  // 8. JSON‑LD
  const ldjsonLocator = page.locator('script[type="application/ld+json"]');
  if (await ldjsonLocator.count() > 0) {
    const ldjson = await ldjsonLocator.first().innerText();
    await expect.soft(() => JSON.parse(ldjson), 'valid JSON‑LD').not.toThrow();
  }

  // 9. robots.txt
  const robotsRes = await request.get('https://www.saucedemo.com/robots.txt');
  await expect.soft(robotsRes.status()).toBe(200);
  await expect.soft((await robotsRes.text()).includes('User-agent')).toBeTruthy();

  // 10. sitemap.xml
  const sitemapRes = await request.get('https://www.saucedemo.com/sitemap.xml');
  await expect.soft(sitemapRes.status()).toBe(200);

  // Finally, fail the test if any soft assertions failed:
  expect(testInfo.errors).toHaveLength(0);
});
