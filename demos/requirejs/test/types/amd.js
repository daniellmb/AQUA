/**
 * Type definitions for AMD.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


/**
 * define API
 * @param {string|Array.<string>|Function} name - module name, list of module deps or factory method
 * @param {Array.<string>|Function=} opt_deps - optional list of module deps or factory method
 * @param {Function=} opt_factory - optional factory method
 */
var define = function (name, opt_deps, opt_factory) { };
define.amd = true;