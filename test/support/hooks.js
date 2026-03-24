const { Before, After, BeforeAll } = require('@cucumber/cucumber');
const path = require('path');

// Wipe the database once before the full test suite runs.
// This prevents stale data from previous runs from breaking scenarios.
BeforeAll(async function () {
  const Database = require('better-sqlite3');
  const dbPath = path.join(process.cwd(), 'data', 'prompts.db');
  const db = new Database(dbPath);
  db.prepare('DELETE FROM prompts').run();
  db.close();
});

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  if (this.driver) {
    // Always attach a final screenshot — shows the last state for passed and failed tests
    const screenshot = await this.driver.takeScreenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.closeBrowser();
});
