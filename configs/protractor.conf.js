baseUrl = 'http://localhost:63342';

// checks if a given console log message is an error
function isError(log) {
  // more severe than a warning
  return log.level.value > 900 &&
         // ignore missing file errors (404)
         log.message.indexOf('server responded with a status of 404') === -1;
}

// save screen shot to a file
function saveScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

// make common utility methods available by exporting them to the global scope
function exportUtilityMethods() {
  // provide a way to turn off angularjs syncing
  global.isAngularSite = function(flag) {
    browser.ignoreSynchronization = !flag;

    if (!flag) {
      // since we aren't using angular, set timeouts according to expected latency
      browser.manage().timeouts().implicitlyWait(15); //in milliseconds
    }
  };

  // provide a way to fail tests if an uncaught exception is thrown
  global.failIfJSError = function() {
    // get the browser log.
    browser.manage().logs().get('browser').then(function(browserLog) {
      // filter out anything that isn't an error
      var errors = browserLog.filter(isError);

      // expect no errors in the browser console log
      expect(errors.length).toEqual(0);

      if (errors.length > 0) {
        console.log('errors: ' + require('util').inspect(errors));
      }
    });
  };

  // take a screenshot and save it to file
  global.takeScreenshot = function(fileName) {
    browser.takeScreenshot().then(function(png) {
      saveScreenShot(png, (fileName || 'exception') + '.png');
    });
  };
}


/**
 * Export Protractor end-to-end test config
 * @type {{capabilities: {browserName: string, chromeOptions: {args: string[]}, loggingPrefs: {browser: string}}, onPrepare: onPrepare, jasmineNodeOpts: {showColors: boolean, includeStackTrace: boolean}, baseUrl: (string|*)}}
 */
exports.config = {

  //seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.42.0.jar',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
        'incognito',
        'disable-extensions',
        'start-maximized',
        'enable-crash-reporter-for-testing',
        'test-type'
      ]
    },
    'loggingPrefs': {
      'browser': 'ALL'
    }
  },

  // Run before all tests
  onPrepare: function() {

    // make common utility methods available by exporting them to the global scope
    exportUtilityMethods();

  },

  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace: true
  },

  baseUrl: baseUrl
};
