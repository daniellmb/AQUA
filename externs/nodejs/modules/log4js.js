/**
 * Type definition for log4js public APIs.
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



/**
 * Logger instance
 * @constructor
 * @nosideeffects
 */
var Logger = function() { };


/**
 * logs trace information to the console
 * @param {...*} var_args
 */
Logger.prototype.trace = function(var_args) {};


/**
 * logs debug information to the console
 * @param {...*} var_args
 */
Logger.prototype.debug = function(var_args) {};


/**
 * logs warning information to the console
 * @param {...*} var_args
 */
Logger.prototype.warn = function(var_args) {};


/**
 * logs error information to the console
 * @param {...*} var_args
 */
Logger.prototype.error = function(var_args) {};


/**
 * logs fatal error information to the console
 * @param {...*} var_args
 */
Logger.prototype.fatal = function(var_args) {};
