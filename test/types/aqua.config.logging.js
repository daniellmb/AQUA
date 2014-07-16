/**
 * Type definition for AQUA logging config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA documentation configuration
 * @constructor
 * @nosideeffects
 */
var AquaConfigLogging = function() { };


/**
 * The logging level AQUA should run at (INFO, DEBUG, WARN, ERROR etc.)
 * @type {string}
 */
AquaConfigLogging.prototype.level = '';


/**
 * Enable or disable colors in the console
 * @type {boolean}
 */
AquaConfigLogging.prototype.colors = true;


/**
 * Additional loggers to use
 * @type {Array.<Object>}
 */
AquaConfigLogging.prototype.loggers = [];
