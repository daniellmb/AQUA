/**
 * Type definition for AQUA testing config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA testing configurations
 * @constructor
 * @nosideeffects
 */
var AquaConfigTesting = function() { };


/**
 * name of the testing framework to use (such as Jasmine)
 * @type {string}
 */
AquaConfigTesting.prototype.framework = '';


/**
 * Where to find the configuration file for running unit tests on web projects (using karma)
 * @type {string}
 */
AquaConfigTesting.prototype.web = '';


/**
 * Where to find the configuration file for running end-to-end tests on web projects (using protractor)
 * @type {string}
 */
AquaConfigTesting.prototype.e2e = '';


/**
 * Where to find the configuration file for running unit tests for node.js projects
 * @type {string}
 */
AquaConfigTesting.prototype.node = '';
