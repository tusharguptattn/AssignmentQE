/**
 * TC-UI-05: Add Product to Cart  @smoke
 */
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const testData = require('../../test-data/testData');

test.describe('@smoke TC-UI-05: Add Product to Cart', () => {
  test('should add product to cart and show cart badge', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.existingUser.email, testData.existingUser.password);
    await expect(page.getByTestId('nav-menu')).toBeVisible({ timeout: 12000 });

    // Search and click first in-stock product
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct(testData.searchTerm);
    await homePage.clickFirstProduct();

    // Add to cart
    const productPage = new ProductPage(page);
    await productPage.addToCart();

    // Cart badge appears with count >= 1
    const count = await productPage.getCartCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
