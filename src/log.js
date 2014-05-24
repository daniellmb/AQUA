/**
 * @file
 *
 * ### Responsibilities
 * - log information to the console.
 *
 * @module log
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {
  // require console colors module
  var colors = /**  @type {Colors} */ (require('colors'));


  /**
   * logs information to the console.
   * @return {AQUA}
   * @this {AQUA}
  */
  module.exports = function() {

    // convert arguments to array
    var args = Array.prototype.slice.call(arguments);

    // prefix the log with "[aqua] "
    args.unshift('[' + colors.cyan('aqua') + ']');

    // log to the console
    console.log.apply(console, args);

    // support call chaining
    return this;
  };

}());
