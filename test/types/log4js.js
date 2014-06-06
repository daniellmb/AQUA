/**
 * Type definition for log4js instance.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * Log4JS
 * @constructor
 * @nosideeffects
 */
var Log4JS = function() { };


/**
 * gets the global logging level
 * @param {string} level - the logging level to set
 */
Log4JS.prototype.setGlobalLogLevel = function(level) {};


/**
 * configures the logger instance
 * @param {string|Object=} opt_config - the configuration file or object
 * @param {Object=} opt_options - optional options
 */
Log4JS.prototype.configure = function(opt_config, opt_options) {};


/**
 * Get a logger instance. Instance is cached on categoryName level.
 * @param  {string=} opt_categoryName - name of category to log to.
 * @return {Log4JS} instance of logger for the category
 */
Log4JS.prototype.getLogger = function(opt_categoryName) { return this; };


/**
 * Get a logger instance. Instance is cached on categoryName level.
 * @param {string} level - the logging level to set
 */
Log4JS.prototype.setLevel = function(level) {};
