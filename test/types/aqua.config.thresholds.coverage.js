/**
 * Type definition for AQUA unit test coverage threshold config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA thresholds for unit test coverage
 * @constructor
 * @nosideeffects
*/
var AquaConfigThresholdsCoverage = function() { };


/**
 * Statement coverage threshold percent, 0 to 100%
 * @type {number}
*/
AquaConfigThresholdsCoverage.prototype.statements = 0;


/**
 * Branche coverage threshold percent, 0 to 100%
 * @type {number}
 */
AquaConfigThresholdsCoverage.prototype.branches = 0;


/**
 * Line coverage threshold percent, 0 to 100%
 * @type {number}
 */
AquaConfigThresholdsCoverage.prototype.lines = 0;


/**
 * Function coverage threshold percent, 0 to 100%
 * @type {number}
 */
AquaConfigThresholdsCoverage.prototype.functions = 0;
