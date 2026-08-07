/**
 * TC-UI-04: Product Search  @smoke
 */
const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');
const testData = require('../../test-data/testData');

test.describe('@smoke TC-UI-04: Product Search', () => {
  test('should return products matching search term', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct(testData.searchTerm);

    // Product list must show at least one result
    const firstProductName = page.locator('[data-test="product-name"]').first();
    await expect(firstProductName).toBeVisible({ timeout: 10000 });

    const count = await page.locator('[data-test^="product-"]').filter({ has: page.locator('h5') }).count();
    expect(count).toBeGreaterThan(0);
  });
});
