const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit'); // INPUT type=submit
    this.errorAlert = page.locator('.alert-danger, [class*="alert"]').first();
    this.registerLink = page.getByTestId('register-link');
    // Post-login: nav-menu button appears
    this.navMenu = page.getByTestId('nav-menu');
  }

  async goto() {
    await this.navigate('/auth/login');
    await this.emailInput.waitFor({ state: 'visible', timeout: 20000 });
  }

  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(2500);
  }

  async isLoggedIn() {
    return this.navMenu.isVisible().catch(() => false);
  }

  async isErrorVisible() {
    try {
      await this.errorAlert.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessage() {
    try {
      return await this.errorAlert.textContent();
    } catch {
      return '';
    }
  }
}

module.exports = LoginPage;
