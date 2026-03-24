const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const assert = require('assert');
const DetailPage = require('../pages/DetailPage');

When('I click the Ask AI button', async function () {
  this.detailPage = new DetailPage(this.driver);
  await this.detailPage.clickAskAi();
});

Then('the AI response box should become visible', async function () {
  // Wait up to 10s for the response box to appear (mock endpoint may have a delay)
  await this.driver.wait(
    until.elementIsVisible(await this.driver.findElement(By.id('ai-response-box'))),
    10000
  );
  this.detailPage = new DetailPage(this.driver);
  const visible = await this.detailPage.isAiResponseVisible();
  assert.ok(visible, 'Expected AI response box to be visible');
});

Then('the AI response text should not be empty', async function () {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  const text = await this.detailPage.getAiResponseText();
  assert.ok(text && text.trim().length > 0, 'Expected AI response text to be non-empty');
});

Then('the Ask AI button should be present on the page', async function () {
  this.detailPage = this.detailPage || new DetailPage(this.driver);
  const visible = await this.detailPage.isVisible(this.detailPage.askAiButton);
  assert.ok(visible, 'Expected Ask AI button to be present');
});
