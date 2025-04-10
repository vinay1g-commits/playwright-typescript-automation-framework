import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';

test('Accessibility check - demoqa homepage', async ({ page }) => {
  await page.goto('https://demoqa.com');

  // Run axe-core accessibility scan
  const results = await new AxeBuilder({ page }).analyze();

  // Filter only serious or critical issues
  const seriousOrCritical = results.violations.filter(v =>
    ['serious', 'critical'].includes(v.impact || '')
  );

  // Exclude known third-party issues (like ads)
  const actionable = seriousOrCritical.filter(v =>
    !v.nodes.some(n =>
      n.html.includes('google_ads_iframe') || n.html.includes('adplus')
    )
  );

  // Save filtered issues to a JSON file
  fs.writeFileSync('accessibility-report.json', JSON.stringify(actionable, null, 2));

  // Fail test if there are any actionable accessibility violations
  expect(actionable).toHaveLength(0);
});
