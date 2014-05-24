/**
 * Type definition for AQUA project config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
AQUA configuration file
@constructor
@nosideeffects
*/
var ProjConfig = function() { };


/**
A short but unique id for the project
@type {string}
*/
ProjConfig.prototype.id = '';


/**
A descriptive name of the project
@type {string}
*/
ProjConfig.prototype.name = '';


/**
Name and email of the the teams or individuals that worked on the project
@type {string}
*/
ProjConfig.prototype.by = '';


/**
Where to find all source code written for the project
@type {Array}
*/
ProjConfig.prototype.src = null;


/**
Where to find the markdown file of the project readme (used as the index documentation page)
@type {string}
*/
ProjConfig.prototype.readme = '';


/**
Where to find all the JavaScript written for the project, including specs (used for linting)
@type {Array}
*/
ProjConfig.prototype.alljs = null;


/**
Everything needed to run unit tests
@type {ProjConfigUnitTest}
*/
ProjConfig.prototype.unit = null;


/**
Everything needed to run end-to-end tests
@type {ProjConfigE2ETest}
*/
ProjConfig.prototype.e2e = null;


/**
Where to find all type definitions used by the project
@type {Array}
*/
ProjConfig.prototype.types = null;


/**
Used to indicate the type of project (such as Node.js)
@type {string}
*/
ProjConfig.prototype.type = '';
