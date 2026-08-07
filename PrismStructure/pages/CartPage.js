const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.productTitles = page.locator('[data-test="product-title"]');
    this.quantityInputs = page.locator('[data-test="product-quantity"]');
    this.cartTotal = page.getByTestId('cart-total');
    this.proceedStep1 = page.getByTestId('proceed-1');
  }

  async getCartItemCount() {
    return this.productTitles.count();
  }

  async proceedToCheckout() {
    await this.proceedStep1.waitFor({ state: 'visible', timeout: 10000 });
    await this.proceedStep1.click();
    await this.page.waitForTimeout(1000);
  }

  async updateQuantity(index, quantity) {
    const input = this.quantityInputs.nth(index);
    await input.waitFor({ state: 'visible', timeout: 8000 });
    await input.fill(String(quantity));
    await input.press('Enter');
    await this.page.waitForTimeout(1000);
  }
}

module.exports = CartPage;
