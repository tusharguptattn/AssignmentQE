/**
 * TC-API-06: Create Cart, Add Product, Generate Invoice
 * Tags: @regression
 * Full API lifecycle: login → create cart → add product → create invoice → 201.
 */

const { test, expect } = require('@playwright/test');
const ApiClient = require('../../api/ApiClient');
const testData = require('../../test-data/testData');

test.describe('@regression TC-API-06: Cart Creation and Invoice Generation', () => {
  let client;

  test.beforeEach(async () => {
    client = await ApiClient.create();
    const loginResp = await client.login(
      testData.existingUser.email,
      testData.existingUser.password
    );
    expect(loginResp.status()).toBe(200);
  });

  test.afterEach(async () => { await client.dispose(); });

  test('should create cart successfully', async () => {
    const response = await client.createCart();
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('should add product to cart and verify cart contents', async () => {
    // Create cart
    const cartResp = await client.createCart();
    expect(cartResp.status()).toBe(201);
    const cart = await cartResp.json();
    const cartId = cart.id;

    // Get a product id
    const productsResp = await client.getProducts({ page: 1 });
    const products = await productsResp.json();
    const productId = products.data[0].id;

    // Add product to cart (returns 200 with result message)
    const addResp = await client.addProductToCart(cartId, productId, 1);
    expect(addResp.status()).toBe(200);

    // Get cart and verify
    const getCartResp = await client.getCart(cartId);
    expect(getCartResp.status()).toBe(200);
    const cartBody = await getCartResp.json();
    expect(cartBody).toHaveProperty('cart_items');
    expect(cartBody.cart_items.length).toBeGreaterThan(0);
  });

  test('should generate invoice successfully (full end-to-end via API)', async () => {
    // Create cart
    const cartResp = await client.createCart();
    const cart = await cartResp.json();
    const cartId = cart.id;

    // Get product
    const productsResp = await client.getProducts({ page: 1 });
    const products = await productsResp.json();
    const productId = products.data[0].id;

    // Add to cart (returns 200)
    const addResult = await client.addProductToCart(cartId, productId, 1);
    expect(addResult.status()).toBe(200);

    // Generate invoice
    const invoiceResp = await client.createInvoice(cartId, testData.billing);
    expect(invoiceResp.status()).toBe(201);
    const invoiceBody = await invoiceResp.json();
    expect(invoiceBody).toHaveProperty('id');
    expect(invoiceBody).toHaveProperty('invoice_number');
    expect(invoiceBody.invoice_number).toMatch(/^INV-/);
  });
});
