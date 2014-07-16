/**
 * Type definition for AQUA project node config jasmine settings.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA node.js jasmine runner settings
 * @constructor
 * @nosideeffects
 */
var NodeConfigJasmine = function() { };


/**
 * If true, display spec names.
 * @type {boolean}
 */
NodeConfigJasmine.prototype.verbose = false;


/**
 * If true, include stack traces in failures.
 * @type {boolean}
 */
NodeConfigJasmine.prototype.includeStackTrace = false;


/**
 * Time to wait in milliseconds before a test automatically fails.
 * @type {number}
 */
NodeConfigJasmine.prototype.timeout = 0;
