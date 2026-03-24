const { setWorldConstructor, setDefaultTimeout, World } = require('@cucumber/cucumber');

setDefaultTimeout(30000);
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';

class AppWorld extends World {
  constructor(options) {
    super(options);
    this.baseUrl = BASE_URL;
    this.driver = null;
  }

  async openBrowser() {
    const opts = new chrome.Options();
    opts.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(opts)
      .build();

    await this.driver.manage().setTimeouts({ implicit: 5000 });
  }

  async closeBrowser() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  url(path) {
    return `${this.baseUrl}${path}`;
  }
}

setWorldConstructor(AppWorld);
