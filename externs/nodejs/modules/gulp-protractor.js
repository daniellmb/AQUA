/**
 * Type definition for gulp-protractor.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


/**
 Gulp Protractor
 */
var gProtractor = {
  /**
   * Protractor
   * @param {Object} options - protractor config options
   */
  protractor: function(options) {},

  /**
   * Download the latest webdriver
   * @param {Object=} opt_opts - config options
   * @param {Function=} opt_cb - optional callback
   */
  webdriver_update: function(opt_opts, opt_cb) {},

  /**
   * Start a standalone selenium server
   * @param {Function=} opt_cb - optional callback
   */
  webdriver_standalone: function(opt_cb) {}
};
