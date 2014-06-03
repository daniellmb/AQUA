/**
 * Type definition for AQUA project unit test config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA unit test configuration
 * @constructor
 * @nosideeffects
 */
var ProjConfigUnitTest = function() { };


/**
 * Where to find the files containing expected global variables
 * @type {Array.<string>}
 */
ProjConfigUnitTest.prototype.globals = null;


/**
 * Where to find the scripts the project depends on (such as AngularJS or jQuery)
 * @type {Array.<string>}
 */
ProjConfigUnitTest.prototype.deps = null;


/**
 * Where to find all of the projects unit tests
 * @type {Array.<string>}
 */
ProjConfigUnitTest.prototype.mocks = null;


/**
 * Where to find all of your unit tests
 * @type {Array.<string>}
 */
ProjConfigUnitTest.prototype.tests = null;
