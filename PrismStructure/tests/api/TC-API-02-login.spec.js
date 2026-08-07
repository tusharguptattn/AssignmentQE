/**
 * TC-API-02: User Login via API (valid credentials)
 * Tags: @smoke
 * POST /users/login → 200 with access_token.
 *
 * TC-API-03: Login with invalid credentials
 * Tags: @regression
 * POST /users/login → 401 or error body.
 */

const { test, expect } = require('@playwright/test');
const ApiClient = require('../../api/ApiClient');
const testData = require('../../test-data/testData');

test.describe('@smoke TC-API-02: Valid Login via API', () => {
  let client;

  test.beforeEach(async () => { client = await ApiClient.create(); });
  test.afterEach(async () => { await client.dispose(); });

  test('should return 200 and access_token on valid login', async () => {
    const response = await client.login(
      testData.existingUser.email,
      testData.existingUser.password
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('access_token');
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
  });
});

test.describe('@regression TC-API-03: Invalid Login via API', () => {
  let client;

  test.beforeEach(async () => { client = await ApiClient.create(); });
  test.afterEach(async () => { await client.dispose(); });

  test('should return 401 on invalid credentials', async () => {
    const response = await client.login(
      testData.invalidUser.email,
      testData.invalidUser.password
    );
    expect([401, 422]).toContain(response.status());
  });
});
