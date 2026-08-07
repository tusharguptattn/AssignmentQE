const { request } = require('@playwright/test');
const testData = require('../test-data/testData');

class ApiClient {
  constructor(apiContext) {
    this.api = apiContext;
    this.baseUrl = testData.apiBaseUrl;
    this.token = null;
  }

  static async create() {
    const apiContext = await request.newContext({
      baseURL: testData.apiBaseUrl,
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    return new ApiClient(apiContext);
  }

  authHeaders() {
    if (!this.token) throw new Error('No bearer token. Call login() first.');
    return { Authorization: `Bearer ${this.token}` };
  }

  async registerUser(user) {
    return this.api.post('/users/register', {
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        dob: user.dob,
        address: {
          street: user.address,
          house_number: '1',
          city: user.city,
          state: user.state,
          country: user.country,
          postal_code: user.postcode,
        },
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
    });
  }

  async login(email, password) {
    const response = await this.api.post('/users/login', {
      data: { email, password },
    });
    if (response.ok()) {
      const body = await response.json();
      this.token = body.access_token;
    }
    return response;
  }

  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.api.get(`/products${query ? '?' + query : ''}`);
  }

  async getProductById(id) {
    return this.api.get(`/products/${id}`);
  }

  async createCart() {
    return this.api.post('/carts', {
      headers: this.authHeaders(),
      data: {},
    });
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    return this.api.post(`/carts/${cartId}`, {
      headers: this.authHeaders(),
      data: { product_id: productId, quantity },
    });
  }

  async getCart(cartId) {
    return this.api.get(`/carts/${cartId}`, {
      headers: this.authHeaders(),
    });
  }

  async createInvoice(cartId, billing) {
    return this.api.post('/invoices', {
      headers: this.authHeaders(),
      data: {
        billing_street: billing.street,
        billing_city: billing.city,
        billing_state: billing.state,
        billing_country: billing.country,
        billing_postal_code: billing.postalCode,
        payment_method: 'cash-on-delivery',
        cart_id: cartId,
        payment_details: {},
      },
    });
  }

  async dispose() {
    await this.api.dispose();
  }
}

module.exports = ApiClient;
