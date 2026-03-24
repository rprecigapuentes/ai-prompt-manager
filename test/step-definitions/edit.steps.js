const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const DetailPage = require('../pages/DetailPage');

When('I click the Edit button', async function () {
  this.detailPage = new DetailPage(this.driver);
  await this.detailPage.clickEdit();
  // Wait for the edit page to fully load before interacting with its form
  await this.driver.wait(until.elementLocated(By.id('title')), 10000);
});

When('I update the title to {string}', async function (title) {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  await this.detailPage.type(this.detailPage.titleInput, title);
});

When('I update the body to {string}', async function (body) {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  await this.detailPage.type(this.detailPage.bodyTextarea, body);
});

When('I update the tags to {string}', async function (tags) {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  await this.detailPage.type(this.detailPage.tagsInput, tags);
});

When('I clear the title field', async function () {
  const input = await this.driver.findElement(By.id('title'));
  await input.clear();
});

When('I click Update Prompt', async function () {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  // Disable HTML5 native validation so server-side validation is what gets tested
  await this.driver.executeScript('document.querySelector("form").noValidate = true;');
  await this.detailPage.click(this.detailPage.saveButton);
});

Then('I should see {string} on the detail page', async function (title) {
  // Wait for navigation back to the detail page after successful edit
  await this.driver.wait(until.urlMatches(/\/prompts\/\d+$/), 10000);
  this.detailPage = new DetailPage(this.driver);
  const text = await this.detailPage.getTitle();
  assert.strictEqual(text.trim(), title, `Expected title "${title}", got "${text}"`);
});

Then('I should be on the detail page', async function () {
  await this.driver.wait(until.urlMatches(/\/prompts\/\d+$/), 10000);
  const url = await this.driver.getCurrentUrl();
  assert.ok(url.match(/\/prompts\/\d+$/), `Expected to be on a detail page, got: ${url}`);
});

Then('I should see an error message on the edit page', async function () {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  const visible = await this.detailPage.isErrorVisible();
  assert.ok(visible, 'Expected an error alert on the edit page');
});
