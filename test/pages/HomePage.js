const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.newPromptButton = By.css('a[href="/prompts/new"]');
    this.searchInput = By.id('search');
    this.searchButton = By.css('button[type="submit"]');
    this.clearButton = By.css('a.btn-ghost');
    this.promptCards = By.css('.prompt-card');
    this.promptTitles = By.css('.prompt-card h3 a');
    this.tagLinks = By.css('.tag-cloud .tag');
    this.emptyState = By.css('.empty-state');
    this.logoutButton = By.css('a[href="/logout"]');
  }

  async open(baseUrl) {
    await this.navigate(`${baseUrl}/`);
  }

  async clickNewPrompt() {
    await this.click(this.newPromptButton);
  }

  async search(term) {
    await this.type(this.searchInput, term);
    await this.click(this.searchButton);
  }

  async clickTag(tagName) {
    const tags = await this.findElements(this.tagLinks);
    for (const tag of tags) {
      const text = await tag.getText();
      if (text.trim() === tagName) {
        await tag.click();
        return;
      }
    }
    throw new Error(`Tag "${tagName}" not found in tag cloud`);
  }

  async getPromptTitles() {
    const els = await this.findElements(this.promptTitles);
    return Promise.all(els.map(el => el.getText()));
  }

  async getPromptCount() {
    const cards = await this.findElements(this.promptCards);
    return cards.length;
  }

  async clickPromptByTitle(title) {
    const links = await this.findElements(this.promptTitles);
    for (const link of links) {
      const text = await link.getText();
      if (text.trim() === title) {
        await link.click();
        return;
      }
    }
    throw new Error(`Prompt "${title}" not found on home page`);
  }

  async isEmptyStateVisible() {
    return this.isVisible(this.emptyState);
  }

  async clickLogout() {
    await this.click(this.logoutButton);
  }
}

module.exports = HomePage;
