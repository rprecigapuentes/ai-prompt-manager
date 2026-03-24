const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class DetailPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.promptTitle = By.css('.page-header h2');
    this.promptBody = By.css('.prompt-body-text');
    this.tagLinks = By.css('.tag-list .tag');
    this.editButton = By.css('a[href*="/edit"]');
    this.deleteButton = By.css('button.btn-danger');
    this.backButton = By.css('a.btn-ghost');
    this.askAiButton = By.id('ask-ai-btn');
    this.aiResponseBox = By.id('ai-response-box');
    this.aiResponseText = By.id('ai-response-text');
    this.titleInput = By.id('title');
    this.bodyTextarea = By.id('body');
    this.tagsInput = By.id('tags');
    this.saveButton = By.css('button[type="submit"]');
    this.errorAlert = By.css('.alert-error');
  }

  async getTitle() {
    return this.getText(this.promptTitle);
  }

  async getBody() {
    return this.getText(this.promptBody);
  }

  async clickEdit() {
    await this.click(this.editButton);
  }

  async clickDelete() {
    await this.click(this.deleteButton);
  }

  async clickAskAi() {
    await this.click(this.askAiButton);
  }

  async isAiResponseVisible() {
    return this.isVisible(this.aiResponseBox);
  }

  async getAiResponseText() {
    return this.getText(this.aiResponseText);
  }

  async editPrompt(title, body, tags = '') {
    await this.type(this.titleInput, title);
    await this.type(this.bodyTextarea, body);
    if (tags !== null) {
      await this.type(this.tagsInput, tags);
    }
    await this.click(this.saveButton);
  }

  async isErrorVisible() {
    return this.isVisible(this.errorAlert);
  }

  async getErrorMessage() {
    return this.getText(this.errorAlert);
  }
}

module.exports = DetailPage;
