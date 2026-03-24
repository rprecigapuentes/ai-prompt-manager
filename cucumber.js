module.exports = {
  default: {
    paths: ['test/features/**/*.feature'],
    require: [
      'test/support/allure-env.js',
      'test/support/world.js',
      'test/support/hooks.js',
      'test/step-definitions/**/*.steps.js',
    ],
    format: [
      'progress-bar',
      'allure-cucumberjs/reporter',
    ],
    formatOptions: {
      resultsDir: 'allure-results',
    },
    publishQuiet: true,
  },
};
