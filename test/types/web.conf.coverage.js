/**
 * Type definition for AQUA project test web config coverage settings.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA web test coverage settings
 * @constructor
 * @nosideeffects
 */
var WebConfigCoverage = function() { };


/**
 * List of reporters, used to generate reports and enforce test coverage thresholds.
 * Examples: html, lcovonly, lcov, cobertura, text-summary, text, json, teamcity, clover
 * @type {Array.<string>}
 */
WebConfigCoverage.prototype.reporters = null;
