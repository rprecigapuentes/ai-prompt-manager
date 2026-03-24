const { When } = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');
const DetailPage = require('../pages/DetailPage');

When('I click the Delete button on the detail page', async function () {
  this.detailPage = new DetailPage(this.driver);
  await this.detailPage.clickDelete();
  await this.driver.switchTo().alert().accept();
  // Wait for redirect back to home page after delete
  await this.driver.wait(until.urlIs(`${this.baseUrl}/`), 10000);
  // Refresh homePage reference so subsequent assertions use fresh DOM
  const HomePage = require('../pages/HomePage');
  this.homePage = new HomePage(this.driver);
});
