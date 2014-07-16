/**
 * Type definition for AQUA project node config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA node.js unit test configuration
 * @constructor
 * @nosideeffects
 */
var NodeConfig = function() { };


/**
 * Where to find all of the projects end-to-end tests
 * @type {NodeConfigJasmine}
 */
NodeConfig.prototype.jasmine = null;


/**
 * Code coverage settings
 * @type {NodeConfigCoverage}
 */
NodeConfig.prototype.coverage = null;
