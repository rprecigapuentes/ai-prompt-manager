const { Given } = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');

Given('I am logged in', async function () {
  const loginPage = new LoginPage(this.driver);
  await loginPage.open(this.baseUrl);
  await loginPage.login('admin', 'password');
  // Wait for the post-login redirect to complete before the next step navigates
  await this.driver.wait(until.urlIs(`${this.baseUrl}/`), 10000);
});
