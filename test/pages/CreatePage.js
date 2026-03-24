const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CreatePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.titleInput = By.id('title');
    this.bodyTextarea = By.id('body');
    this.tagsInput = By.id('tags');
    this.saveButton = By.css('button[type="submit"]');
    this.cancelButton = By.css('a.btn-ghost');
    this.errorAlert = By.css('.alert-error');
  }

  async open(baseUrl) {
    await this.navigate(`${baseUrl}/prompts/new`);
  }

  async fillForm(title, body, tags = '') {
    await this.type(this.titleInput, title);
    await this.type(this.bodyTextarea, body);
    if (tags) {
      await this.type(this.tagsInput, tags);
    }
  }

  async submit() {
    await this.click(this.saveButton);
  }

  async createPrompt(title, body, tags = '') {
    await this.fillForm(title, body, tags);
    await this.submit();
  }

  async getErrorMessage() {
    return this.getText(this.errorAlert);
  }

  async isErrorVisible() {
    return this.isVisible(this.errorAlert);
  }
}

module.exports = CreatePage;
