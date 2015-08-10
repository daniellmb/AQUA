if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
  var fs = require('fs');
  if (fs.existsSync('sauce.json')) {
    var credentials = require('../sauce');
    // set SL username
    process.env.SAUCE_USERNAME = credentials.username;
    // set SL access key
    process.env.SAUCE_ACCESS_KEY = credentials.accessKey;
  }
}

/**
 * Define SauceLabs browsers
 * */
var customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7'
  },
  sl_chrome_linux: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'linux'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '27'
  },

  // Internet Explorer
  sl_ie_6: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows XP',
    version: '6'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2008',
    version: '9'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2012',
    version: '10'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },

  // Mobile
  sl_ios_safari: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  },
  sl_android: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'linux',
    version: '4.0'
  }
};


/**
 * Export Karma unit test config
 * @param {*} config
 */
module.exports = {
  /*
   Test results reporter to use:
   dots, progress, nyan, story
   */
  reporters: ['dots'],

  /*
   Frameworks to use:
   jasmine, mocha, qunit, requirejs
   */
  frameworks: ['jasmine'],

  /*
   SauceLabs browsers above or locally installed:
   Chrome, ChromeCanary, PhantomJS, Firefox, Opera, IE, Safari, iOS
   */
  browsers: ['PhantomJS'], //Object.keys(customLaunchers),
  //customLaunchers: customLaunchers,

  // sauce labs settings
  sauceLabs: {
    testName: 'AQUA',
    //Note that this will by default start Sauce Connect to establish a secure tunnel between your local machine and
    // Sauce's cloud. To speed up the time it takes to connect to Sauce's cloud, you can start Sauce Connect in the
    // background by using one of the binaries or the Mac app and then setting the startConnect option to false.
    startConnect: false,
    recordScreenshots: false
  },

  // code coverage settings
  coverage: {
    // html, lcovonly, lcov, cobertura, text-summary, text, json, teamcity, clover
    reporters: ['html', 'text', 'json']
  },

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // Continuous Integration mode: if true, it capture browsers, run tests and exit
  singleRun: true,

  // report slow running tests, time in ms
  reportSlowerThan: 250,

  // If browser does not capture in given timeout [ms], kill it
  // Increase timeout in case connection in CI is slow
  captureTimeout: 120000,

  // optimize the the karma plugins to load
  plugins: [
    'karma-jasmine',
    'karma-coverage',
    'karma-phantomjs-launcher'
  ]
};
