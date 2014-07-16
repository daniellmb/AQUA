/**
 * Type definition for AQUA docs config.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA documentation configuration
 * @constructor
 * @nosideeffects
 */
var AquaConfigDocs = function() { };


/**
 * Where put the generated documentation files
 * @type {string}
 */
AquaConfigDocs.prototype.dir = '';


/**
 * Optional stylesheet to include in documentation files
 * @type {string}
 */
AquaConfigDocs.prototype.css = '';


/**
 * Optional javaScript to include in documentation files
 * @type {string}
 */
AquaConfigDocs.prototype.js = '';


/**
 * Optional theme name for documentation files
 * @type {string}
 */
AquaConfigDocs.prototype.theme = '';
