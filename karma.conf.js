// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    // 0 - Plugins
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      // require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-mocha-reporter'),
    ],

    // 1 - Trigger
    autoWatch: true,
    restartOnFileChange: true,
    singleRun: false,

    // 2 - Build
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // 3 - Run

    browsers: ['Chrome', 'ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--enable-features=NetworkService',
        ],
      },
    },
    port: 9876,

    // 4 - Report
    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ['mocha'],

    mochaReporter: {
      showDiff: false,
      ignoreSkipped: true,
      output: 'autowatch',
    },

    client: {
      jasmine: {},
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },

    // 5 - Coverage
    // coverageReporter: {
    //   dir: require('path').join(__dirname, './tests/output/coverage/flightsFinder'),
    //   subdir: '.',
    //   reporters: [{ type: 'html' }, { type: 'text-summary' }],
    //   check: {
    //     global: {
    //       statements: 75,
    //       branches: 75,
    //       functions: 75,
    //       lines: 75,
    //     },
    //   },
    // },
  });
};
