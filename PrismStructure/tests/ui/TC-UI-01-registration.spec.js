/**
 * TC-UI-01: User Registration
 * Tags: @smoke
 */
const { test, expect } = require('@playwright/test');
const RegisterPage = require('../../pages/RegisterPage');
const testData = require('../../test-data/testData');

test.describe('@smoke TC-UI-01: User Registration', () => {
  test('should register a new user and redirect to login', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await expect(page).toHaveURL(/register/);

    await registerPage.register(testData.newUser);

    // After successful registration app redirects to login
    await expect(page).toHaveURL(/login/, { timeout: 12000 });
  });
});
