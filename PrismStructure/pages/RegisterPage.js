const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dobInput = page.getByTestId('dob');
    this.countrySelect = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.registerButton = page.getByTestId('register-submit');
  }

  async goto() {
    await this.navigate('/auth/register');
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 20000 });
  }

  async register(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dobInput.fill(user.dob);
    // Select country by value or first available
    await this.countrySelect.selectOption({ label: 'India' }).catch(async () => {
      const options = await this.countrySelect.locator('option').all();
      if (options.length > 1) await this.countrySelect.selectOption({ index: 1 });
    });
    await this.postalCodeInput.fill(user.postcode);
    await this.houseNumberInput.fill('1');
    await this.streetInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.registerButton.click();
    await this.page.waitForTimeout(3000);
  }

  async isRedirectedToLogin() {
    return this.page.url().includes('login');
  }
}

module.exports = RegisterPage;
