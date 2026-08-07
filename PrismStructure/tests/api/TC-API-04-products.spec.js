/**
 * TC-API-04: Get Products List
 * Tags: @smoke
 * GET /products → 200 with paginated product list.
 *
 * TC-API-05: Get Product by ID
 * Tags: @regression
 * GET /products/:id → 200 with product details.
 */

const { test, expect } = require('@playwright/test');
const ApiClient = require('../../api/ApiClient');

test.describe('@smoke TC-API-04: Get Products List', () => {
  let client;

  test.beforeEach(async () => { client = await ApiClient.create(); });
  test.afterEach(async () => { await client.dispose(); });

  test('should return 200 and a list of products', async () => {
    const response = await client.getProducts({ page: 1 });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });
});

test.describe('@regression TC-API-05: Get Product by ID', () => {
  let client;
  let productId;

  test.beforeEach(async () => {
    client = await ApiClient.create();
    // Fetch first product id
    const listResponse = await client.getProducts({ page: 1 });
    const body = await listResponse.json();
    productId = body.data[0].id;
  });
  test.afterEach(async () => { await client.dispose(); });

  test('should return 200 with product details for valid id', async () => {
    const response = await client.getProductById(productId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', productId);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('price');
  });
});
