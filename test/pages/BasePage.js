const { By, until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate(url) {
    await this.driver.get(url);
  }

  async findElement(locator) {
    return this.driver.findElement(locator);
  }

  async findElements(locator) {
    return this.driver.findElements(locator);
  }

  async click(locator) {
    const el = await this.driver.findElement(locator);
    await el.click();
  }

  async type(locator, text) {
    const el = await this.driver.findElement(locator);
    await el.clear();
    await el.sendKeys(text);
  }

  async getText(locator) {
    const el = await this.driver.findElement(locator);
    return el.getText();
  }

  async getValue(locator) {
    const el = await this.driver.findElement(locator);
    return el.getAttribute('value');
  }

  async isVisible(locator) {
    try {
      const el = await this.driver.findElement(locator);
      return el.isDisplayed();
    } catch {
      return false;
    }
  }

  async waitForVisible(locator, timeout = 5000) {
    await this.driver.wait(until.elementIsVisible(
      await this.driver.findElement(locator)
    ), timeout);
  }

  async getCurrentUrl() {
    return this.driver.getCurrentUrl();
  }

  async getTitle() {
    return this.driver.getTitle();
  }
}

module.exports = BasePage;
