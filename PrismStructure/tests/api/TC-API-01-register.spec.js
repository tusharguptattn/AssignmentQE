/**
 * TC-API-01: User Registration via API
 * Tags: @smoke
 * POST /users/register → 201 with user data.
 */

const { test, expect } = require('@playwright/test');
const ApiClient = require('../../api/ApiClient');
const testData = require('../../test-data/testData');

test.describe('@smoke TC-API-01: User Registration via API', () => {
  let client;

  test.beforeEach(async () => {
    client = await ApiClient.create();
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should register a new user and return 201', async () => {
    const timestamp = Date.now();
    const user = {
      ...testData.newUser,
      email: `api.qatest+${timestamp}@mailinator.com`,
    };

    const response = await client.registerUser(user);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('email', user.email);
    expect(body).toHaveProperty('first_name', user.firstName);
  });
});
