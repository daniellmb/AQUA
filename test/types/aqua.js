/**
 * Type definition for AQUA.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA: Automated QUality Analysis public API
 * @constructor
 * @nosideeffects
 */
var AQUA = function() { };


/**
 * Available AQUA tasks
 * @type {Object}
 */
AQUA.prototype.tasks = null;


/**
 * Handle errors in a consistent way.
 */
AQUA.prototype.error = function() { };


/**
 * Configure AQUA
 * @param {Object} cfg - configure AQUA
 */
AQUA.prototype.config = function(cfg) { };


/**
 * Take the project config files and generate gulp tasks for them
 * @param {Array} cfgs - Array of AQUA configuration files
 */
AQUA.prototype.init = function(cfgs) { };


/**
 * Log information to the console.
 * @param {*} data
 * @param {...*} var_args
 */
AQUA.prototype.log = function(data, var_args) { };


/**
 * Validate a AQUA configuration file.
 * @param {Config} cfg
*/
AQUA.prototype.validate = function(cfg) { };


/**
 * Log information to the console as a yellow warning.
 * @param {*} data
 * @param {...*} var_args
 */
AQUA.prototype.warn = function(data, var_args) { };


/**
 * Dynamic list of available AQUA projects
 * @type {Object}
 */
AQUA.prototype.projects = null;
