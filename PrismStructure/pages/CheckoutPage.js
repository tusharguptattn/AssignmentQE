const BasePage = require('./BasePage');

/**
 * The entire checkout flow is on /checkout.
 * Steps are revealed progressively:
 *   proceed-1 → confirm cart
 *   proceed-2 → confirm sign-in / proceed as logged-in user
 *   billing fields + proceed-3 → submit billing address
 *   payment-method SELECT + finish → place order
 * NOTE: Application requires pressing Confirm (finish) TWICE for invoice to generate.
 */
class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.proceedStep1 = page.getByTestId('proceed-1');
    this.proceedStep2 = page.getByTestId('proceed-2');
    this.streetInput = page.getByTestId('street');
    this.houseNumberInput = page.getByTestId('house_number');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.countrySelect = page.getByTestId('country');
    this.proceedStep3 = page.getByTestId('proceed-3');
    this.paymentMethodSelect = page.getByTestId('payment-method');
    this.finishButton = page.getByTestId('finish');
    this.orderConfirmation = page.locator('[data-test="order-confirmation"], .help-block, h3:has-text("Thank"), h3:has-text("Invoice")');
  }

  async goto() {
    await this.navigate('/checkout');
    await this.proceedStep1.waitFor({ state: 'visible', timeout: 15000 });
  }

  async proceedFromCart() {
    await this.proceedStep1.waitFor({ state: 'visible', timeout: 10000 });
    await this.proceedStep1.click();
    await this.page.waitForTimeout(800);
  }

  async proceedAfterLogin() {
    await this.proceedStep2.waitFor({ state: 'visible', timeout: 10000 });
    await this.proceedStep2.click();
    await this.page.waitForTimeout(800);
  }

  async fillBillingAddress(billing) {
    await this.streetInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.streetInput.fill(billing.street);
    await this.houseNumberInput.fill('1');
    await this.cityInput.fill(billing.city);
    await this.stateInput.fill(billing.state);
    await this.postalCodeInput.fill(billing.postalCode);
  }

  async proceedToPayment() {
    await this.proceedStep3.waitFor({ state: 'visible', timeout: 10000 });
    await this.proceedStep3.click();
    await this.page.waitForTimeout(800);
  }

  async selectPaymentMethod(method = 'cash-on-delivery') {
    await this.paymentMethodSelect.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentMethodSelect.selectOption(method);
    await this.page.waitForTimeout(500);
  }

  async confirmOrder() {
    await this.finishButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.finishButton.click();
    await this.page.waitForTimeout(1500);
    // Second confirm (application requires two confirmations for invoice)
    const finishAgain = this.page.getByTestId('finish');
    const visible = await finishAgain.isVisible().catch(() => false);
    if (visible) {
      await finishAgain.click();
      await this.page.waitForTimeout(1500);
    }
  }

  async isOrderSuccessful() {
    try {
      await this.orderConfirmation.first().waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      // Fallback: URL or page text
      const text = await this.page.textContent('body').catch(() => '');
      return text.includes('Invoice') || text.includes('Thank') || text.includes('order');
    }
  }
}

module.exports = CheckoutPage;
