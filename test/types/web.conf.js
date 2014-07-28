/**
 * Type definition for AQUA project test web config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA web unit test configuration (aka Karma)
 * @constructor
 * @nosideeffects
 */
var WebConfig = function() { };


/**
 * List of files to load.
 * @type {Array}
 */
WebConfig.prototype.files = null;

/**
 * Test results reporters to use, such as:
 *   dots, progress, nyan, story
 * @type {Array.<string>}
 */
WebConfig.prototype.reporters = null;


/**
 * Frameworks to use, such as:
 *   jasmine, mocha, qunit, requirejs
 * @type {Array.<string>}
 */
WebConfig.prototype.frameworks = null;


/**
 * Browsers to run the tests in, such as:
 *   Chrome, ChromeCanary, PhantomJS, Firefox, Opera, IE, Safari, iOS
 * @type {Array.<string>}
 */
WebConfig.prototype.browsers = null;


/**
 * Code coverage settings
 * @type {WebConfigCoverage}
 */
WebConfig.prototype.coverage = null;


/**
 * Enable / disable watching file and executing tests whenever any file changes.
 * @type {boolean}
 */
WebConfig.prototype.autoWatch = false;


/**
 * Continuous Integration mode: if true, it capture browsers, run tests and exit.
 * @type {boolean}
 */
WebConfig.prototype.singleRun = false;


/**
 * Report slow running tests, time in milliseconds.
 * @type {number}
 */
WebConfig.prototype.reportSlowerThan = 0;


/**
 * If browser does not capture in given timeout [ms], kill it.
 * You may want to increase timeout in case connection in a CI server is slow.
 * @type {number}
 */
WebConfig.prototype.captureTimeout = 0;
