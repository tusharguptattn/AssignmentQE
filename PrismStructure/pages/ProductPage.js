const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.getByTestId('product-name'); // H1
    this.unitPrice = page.getByTestId('unit-price');
    this.quantityInput = page.getByTestId('quantity');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.cartQuantityBadge = page.getByTestId('cart-quantity'); // SPAN in nav
    this.navCart = page.getByTestId('nav-cart'); // A in nav
  }

  async addToCart() {
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
    // Wait for cart badge to update
    await this.cartQuantityBadge.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getCartCount() {
    const text = await this.cartQuantityBadge.textContent();
    return parseInt(text, 10);
  }

  async getProductName() {
    return this.productName.textContent();
  }

  async goToCart() {
    await this.navCart.click();
    await this.page.waitForTimeout(2000);
  }
}

module.exports = ProductPage;
