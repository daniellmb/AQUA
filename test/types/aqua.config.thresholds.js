/**
 * Type definition for AQUA thresholds config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA enforce threshold configuration
 * @constructor
 * @nosideeffects
 */
var AquaConfigThresholds = function() { };


/**
 * code complexity thresholds config
 * @type {AquaConfigThresholdsComplexity}
 */
AquaConfigThresholds.prototype.complexity = null;


/**
 * test coverage thresholds config
 * @type {AquaConfigThresholdsCoverage}
 */
AquaConfigThresholds.prototype.coverage = null;


/**
 * minimum amount of the project source code that must be typed.
 * @type {number}
 */
AquaConfigThresholds.prototype.percentTyped = 0;
