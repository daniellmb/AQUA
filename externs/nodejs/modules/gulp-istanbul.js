/**
 * Type definition for gulp-istanbul.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 Gulp Istanbul
 @constructor
 @nosideeffects
 */
var Istanbul = function() { };


/**
 Istanbul report writer
 @param {Object} options - config options
 */
Istanbul.prototype.writeReports = function(options) {};


/**
 * Overwrite require so it returns the covered files. Always use this option if you're running tests in Node.js
 * @param {Object=} opt_options - optional settings
 */
Istanbul.prototype.hookRequire = function(opt_options) {};
