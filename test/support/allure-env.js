const fs = require('fs');
const path = require('path');

// Writes allure-results/environment.properties before the run
// so the Allure report shows the test environment details
const resultsDir = path.join(process.cwd(), 'allure-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });

const env = [
  `App.URL=${process.env.APP_URL || 'http://localhost:3000'}`,
  'Browser=Chrome (headless)',
  'Framework=Cucumber.js + Selenium WebDriver',
  'Node=' + process.version,
  'OS=' + process.platform,
].join('\n');

fs.writeFileSync(path.join(resultsDir, 'environment.properties'), env);
