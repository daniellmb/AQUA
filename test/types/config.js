/**
AQUA configuration file
@constructor
@nosideeffects
*/
var Config = function () { };
/**
A short but unique id for the project
@type {string}
*/
Config.prototype.id = '';
/**
A descriptive name of the project
@type {string}
*/
Config.prototype.name = '';
/**
Name and email of the the teams or individuals that worked on the project
@type {string}
*/
Config.prototype.by = '';
/**
Where to find all source code written for the project
@type {Array}
*/
Config.prototype.src = [];
/**
Where to find the warkdown file of the project readme (used as the index documentation page)
@type {string}
*/
Config.prototype.readme = '';
/**
Where to find all the JavaScript written for the project, including specs (used for linting)
@type {Array}
*/
Config.prototype.alljs = [];
/**
Everything needed to run unit tests
@type {ConfigUnitTest}
*/
Config.prototype.unit = null;
/**
Everything needed to run end-to-end tests
@type {ConfigE2ETest}
*/
Config.prototype.e2e = null;
/**
Where to find all type definitions used by the project
@type {Array}
*/
Config.prototype.types = [];
/**
Used to indicate the type of peoject (such as Node.js)
@type {string}
*/
Config.prototype.type = '';