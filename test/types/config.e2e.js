/**
 * @file
 *
 * ### Responsibilities
 * - type definition for AQUA project e2e config
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
AQUA end-to-end test configuration
@constructor
@nosideeffects
*/
var ConfigE2ETest = function() { };


/**
Where to find all of the projects end-to-end tests
@type {Array}
*/
ConfigE2ETest.prototype.tests = null;


/**
Where to find the page objects used by the project end-to-end tests
@type {Array}
*/
ConfigE2ETest.prototype.deps = null;
