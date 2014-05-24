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
 * Where to find all of your unit tests
 * @type {Array}
 */
ProjConfigUnitTest.prototype.tests = null;


/**
 * Where to find your unit test config file
 * @type {string}
 */
ProjConfigUnitTest.prototype.config = '';


/**
 * Where to find the scripts the project depends on (such as AngularJS or jQuery)
 * @type {Array}
 */
ProjConfigUnitTest.prototype.deps = null;


/**
 * Where to find all of the projects unit tests
 * @type {Array}
 */
ProjConfigUnitTest.prototype.mocks = null;
