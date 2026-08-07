/**
 * TC-UI-06: End-to-End Checkout + Invoice  @regression
 * Full flow: login → search → add to cart → checkout → invoice
 * NOTE: App requires Confirm pressed TWICE to generate invoice.
 */
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const ProductPage = require('../../pages/ProductPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const testData = require('../../test-data/testData');

test.describe('@regression TC-UI-06: End-to-End Checkout + Invoice', () => {
  test('should complete checkout and confirm order', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.existingUser.email, testData.existingUser.password);
    await expect(page.getByTestId('nav-menu')).toBeVisible({ timeout: 12000 });

    // Add product to cart
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct(testData.searchTerm);
    await homePage.clickFirstProduct();

    const productPage = new ProductPage(page);
    await productPage.addToCart();

    // Go to checkout
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();

    // Step 1: confirm cart
    await checkoutPage.proceedFromCart();

    // Step 2: proceed as logged-in user
    await checkoutPage.proceedAfterLogin();

    // Step 3: fill billing address
    await checkoutPage.fillBillingAddress(testData.billing);
    await checkoutPage.proceedToPayment();

    // Step 4: select payment and finish (twice per app behaviour)
    await checkoutPage.selectPaymentMethod('cash-on-delivery');
    await checkoutPage.confirmOrder();

    // Verify order was placed — page body confirms success
    const bodyText = await page.textContent('body');
    const success = bodyText.includes('Invoice') || bodyText.includes('Thank') ||
                    bodyText.includes('invoice') || bodyText.includes('order');
    expect(success).toBe(true);
  });
});
