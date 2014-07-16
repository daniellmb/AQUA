/**
 * Type definition for AQUA project e2e config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA end-to-end test configuration
 * @constructor
 * @nosideeffects
 */
var ProjConfigE2ETest = function() { };


/**
 * Where to find all of the projects end-to-end tests
 * @type {Array.<string>}
 */
ProjConfigE2ETest.prototype.tests = null;


/**
 * Where to find the page objects used by the project end-to-end tests
 * @type {Array.<string>}
 */
ProjConfigE2ETest.prototype.pgobj = null;
