const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameInput = By.id('username');
    this.passwordInput = By.id('password');
    this.submitButton = By.css('button[type="submit"]');
    this.errorAlert = By.css('.alert-error');
  }

  async open(baseUrl) {
    await this.navigate(`${baseUrl}/login`);
  }

  async login(username, password) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.submitButton);
  }

  async getErrorMessage() {
    return this.getText(this.errorAlert);
  }

  async isErrorVisible() {
    return this.isVisible(this.errorAlert);
  }
}

module.exports = LoginPage;
