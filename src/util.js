/**
 * @file
 *
 * ### Responsibilities
 * - AQUA utility methods.
 *
 * @module util
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {

  var util;

  util = {
    /**
     * Recursively create all parent folders needed for a given path
     * @param {string} dirPath - path to create
     * @param {number=} opt_mode - optional reading mode
     * @param {Function=} opt_callback - optional callback when completed
     * @return {Object}
     */
    mkdirParent: function(dirPath, opt_mode, opt_callback) {
      // support call chaining
      return util;
    }
  };

  module.exports = util;

}());
