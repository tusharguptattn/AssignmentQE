const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.navSignIn = page.getByTestId('nav-sign-in');
    // Products: data-test="product-{id}" anchor tags
    this.productCards = page.locator('[data-test^="product-"]').filter({ has: page.locator('h5') });
  }

  async goto() {
    await this.navigate('/');
    await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
  }

  async searchProduct(term) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.page.waitForTimeout(2500);
  }

  async clickFirstProduct() {
    // Click first product that is NOT out of stock
    const available = this.page.locator('[data-test^="product-"]').filter({
      hasNot: this.page.locator('[data-test="out-of-stock"]'),
    });
    await available.first().waitFor({ state: 'visible', timeout: 15000 });
    await available.first().click();
    await this.page.waitForTimeout(2000);
  }

  async getProductCount() {
    return this.productCards.count();
  }

  async clickSignIn() {
    await this.navSignIn.click();
  }
}

module.exports = HomePage;
