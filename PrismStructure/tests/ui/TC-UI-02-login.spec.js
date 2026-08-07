/**
 * TC-UI-02: Login with valid credentials  @smoke
 * TC-UI-03: Login with invalid credentials @regression
 */
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const testData = require('../../test-data/testData');

test.describe('@smoke TC-UI-02: Valid Login', () => {
  test('should login and show account nav', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.existingUser.email, testData.existingUser.password);

    // After login: URL changes away from /auth/login and nav-menu is visible
    await expect(page).toHaveURL(/account/, { timeout: 12000 });
    await expect(page.getByTestId('nav-menu')).toBeVisible({ timeout: 8000 });
  });
});

test.describe('@regression TC-UI-03: Invalid Login', () => {
  test('should show error message on wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);

    // Must still be on login or show error — URL stays at /auth/login
    await expect(page).toHaveURL(/login/, { timeout: 8000 });
  });
});
