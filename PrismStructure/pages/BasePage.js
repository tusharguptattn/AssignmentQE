class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '') {
    await this.page.goto(path || '/', { waitUntil: 'domcontentloaded' });
  }

  async waitForVisible(selector, timeout = 15000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async getTitle() {
    return this.page.title();
  }
}

module.exports = BasePage;
