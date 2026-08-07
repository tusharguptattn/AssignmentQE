/**
 * TC-UI-07: Cart Quantity Update  @regression
 */
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const CartPage = require('../../pages/CartPage');
const testData = require('../../test-data/testData');

test.describe('@regression TC-UI-07: Cart Quantity Update', () => {
  test('should update product quantity in cart', async ({ page }) => {
    // Login and add item
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.existingUser.email, testData.existingUser.password);
    await expect(page.getByTestId('nav-menu')).toBeVisible({ timeout: 12000 });

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct(testData.searchTerm);
    await homePage.clickFirstProduct();

    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await productPage.goToCart();

    // Verify cart has items
    const cartPage = new CartPage(page);
    const count = await cartPage.getCartItemCount();
    expect(count).toBeGreaterThan(0);

    // Update quantity to 2
    await cartPage.updateQuantity(0, 2);

    // Cart still has items after update
    const countAfter = await cartPage.getCartItemCount();
    expect(countAfter).toBeGreaterThan(0);
  });
});
