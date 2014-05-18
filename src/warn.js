/**
 * @file
 *
 * ### Responsibilities
 * - log information to the console as a yellow warning.
 *
 * @module warn
 * @author dlamb.open.source@gmail.com (Daniel Lamb)
 */

// require console colors module
var colors = /** @type {Colors} */ (require('colors'));


/**
 * logs information to the console as a yellow warning.
 * @return {AQUA}
 * @this {AQUA}
 */
module.exports = function() {
  // convert arguments to array
  var args = Array.prototype.slice.call(arguments);

  // put yellow around the warning message
  args.unshift('\x1B[33mWARNING:');
  args.push('\x1B[39m');

  // prefix the log with "[aqua] "
  args.unshift('[' + colors.cyan('aqua') + ']');

  // log to the console
  console.log.apply(console, args);

  // support call chaining
  return this;
};
