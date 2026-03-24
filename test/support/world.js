const { setWorldConstructor, setDefaultTimeout, World } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

setDefaultTimeout(30000);

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';
const SELENIUM_URL = process.env.SELENIUM_URL || null;

class AppWorld extends World {
  constructor(options) {
    super(options);
    this.baseUrl = BASE_URL;
    this.driver = null;
  }

  async openBrowser() {
    const opts = new chrome.Options();
    opts.addArguments(
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-features=HttpsUpgrades',
      '--allow-running-insecure-content',
    );

    if (SELENIUM_URL) {
      // Remote WebDriver — used in Docker / CI with selenium/standalone-chrome
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .usingServer(SELENIUM_URL)
        .build();
    } else {
      // Local WebDriver — used during local development
      opts.addArguments('--headless');
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build();
    }

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
