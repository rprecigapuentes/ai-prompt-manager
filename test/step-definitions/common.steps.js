const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../pages/HomePage');
const CreatePage = require('../pages/CreatePage');

// ── Background: seed a prompt directly via HTTP ─────────────────────────────

Given(
  'a prompt exists with title {string} body {string} and tags {string}',
  async function (title, body, tags) {
    const http = require('http');
    const postData = new URLSearchParams({ title, body, tags }).toString();

    await new Promise((resolve, reject) => {
      const url = new URL(`${this.baseUrl}/prompts`);
      const req = http.request(
        {
          hostname: url.hostname,
          port: url.port || 3000,
          path: url.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
          },
        },
        (res) => {
          res.resume();
          res.on('end', resolve);
        }
      );
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }
);

// ── Navigation ───────────────────────────────────────────────────────────────

When('I open the home page', async function () {
  this.homePage = new HomePage(this.driver);
  await this.homePage.open(this.baseUrl);
});

When('I navigate to the new prompt page', async function () {
  this.createPage = new CreatePage(this.driver);
  await this.createPage.open(this.baseUrl);
  // Wait for the form to be ready before interacting with its fields
  await this.driver.wait(until.elementLocated(By.id('title')), 10000);
});

// ── Create form interactions ─────────────────────────────────────────────────

When('I fill in the title with {string}', async function (title) {
  this.createPage = this.createPage || new CreatePage(this.driver);
  await this.createPage.type(this.createPage.titleInput, title);
});

When('I fill in the body with {string}', async function (body) {
  this.createPage = this.createPage || new CreatePage(this.driver);
  await this.createPage.type(this.createPage.bodyTextarea, body);
});

When('I fill in the tags with {string}', async function (tags) {
  this.createPage = this.createPage || new CreatePage(this.driver);
  await this.createPage.type(this.createPage.tagsInput, tags);
});

When('I click Save Prompt', async function () {
  this.createPage = this.createPage || new CreatePage(this.driver);
  // Disable HTML5 native validation so the server-side validation is what gets tested
  await this.driver.executeScript('document.querySelector("form").noValidate = true;');
  await this.createPage.submit();
});

// ── Home page interactions ───────────────────────────────────────────────────

When('I search for {string}', async function (term) {
  this.homePage = this.homePage || new HomePage(this.driver);
  await this.homePage.search(term);
  // Wait for the search results page to load (URL gains the search param)
  await this.driver.wait(until.urlContains('search='), 10000);
});

When('I click the tag {string}', async function (tag) {
  this.homePage = this.homePage || new HomePage(this.driver);
  await this.homePage.clickTag(tag);
  // Wait for tag filter to apply (URL gains the tag param)
  await this.driver.wait(until.urlContains('tag='), 10000);
});

When('I click the clear filter link', async function () {
  await this.driver.findElement(By.css('a.btn-ghost')).click();
  // Wait for the clean home page URL
  await this.driver.wait(until.urlIs(`${this.baseUrl}/`), 10000);
});

When('I click on {string}', async function (title) {
  this.homePage = this.homePage || new HomePage(this.driver);
  await this.homePage.clickPromptByTitle(title);
  // Wait for navigation to the detail page
  await this.driver.wait(until.urlContains('/prompts/'), 10000);
});

When('I delete {string} from the list', async function (title) {
  const cards = await this.driver.findElements(By.css('.prompt-card'));
  for (const card of cards) {
    const h3 = await card.findElement(By.css('h3 a'));
    const text = await h3.getText();
    if (text.trim() === title) {
      const deleteBtn = await card.findElement(By.css('button.btn-danger'));
      await deleteBtn.click();
      await this.driver.switchTo().alert().accept();
      // Wait for redirect back to home page after delete
      await this.driver.wait(until.urlIs(`${this.baseUrl}/`), 10000);
      // Refresh homePage reference so element queries are on the new DOM
      this.homePage = new HomePage(this.driver);
      return;
    }
  }
  throw new Error(`Prompt "${title}" not found on home page`);
});

// ── Assertions ───────────────────────────────────────────────────────────────

Then('I should be redirected to the home page', async function () {
  // Wait up to 10s for navigation to the home page to complete
  await this.driver.wait(
    async () => {
      const url = await this.driver.getCurrentUrl();
      return url === `${this.baseUrl}/` || url === this.baseUrl;
    },
    10000,
    'Expected to be redirected to the home page'
  );
  this.homePage = new HomePage(this.driver);
});

Then('I should see {string} in the prompt list', async function (title) {
  this.homePage = this.homePage || new HomePage(this.driver);
  const titles = await this.homePage.getPromptTitles();
  assert.ok(
    titles.some(t => t.trim() === title),
    `Expected "${title}" in prompt list but got: ${titles.join(', ')}`
  );
});

Then('I should not see {string} in the prompt list', async function (title) {
  this.homePage = this.homePage || new HomePage(this.driver);
  const cards = await this.driver.findElements(By.css('.prompt-card'));
  const titles = await Promise.all(
    cards.map(card => card.findElement(By.css('h3 a')).then(el => el.getText()))
  );
  assert.ok(
    !titles.some(t => t.trim() === title),
    `Expected "${title}" NOT in prompt list but it was found`
  );
});

Then('I should see an error message on the create page', async function () {
  this.createPage = this.createPage || new CreatePage(this.driver);
  const visible = await this.createPage.isErrorVisible();
  assert.ok(visible, 'Expected an error alert on the create page');
});
