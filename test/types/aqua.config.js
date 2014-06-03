/**
 * Type definition for AQUA config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA configuration file
 * @constructor
 * @nosideeffects
 */
var AquaConfig = function() { };


/**
 * Configure doc generation for all projects
 * @type {AquaConfigDocs}
 */
AquaConfig.prototype.docs = null;


/**
 * Configure thresholds for all projects
 * @type {AquaConfigThresholds}
 */
AquaConfig.prototype.thresholds = null;


/**
 * Configure test coverage for all projects
 * @type {AquaConfigCoverage}
 */
AquaConfig.prototype.coverage = null;


/**
 * Configure testing for all projects
 * @type {AquaConfigTesting}
 */
AquaConfig.prototype.testing = null;
