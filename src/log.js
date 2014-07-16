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
  /**
   * logs information to the console.
   * @this {AQUA}
   * @return {AQUA}
   * @deprecated perfer using task logger
  */
  module.exports = function() {

    // convert arguments to array
    var args = Array.prototype.slice.call(arguments);

    // prefix the log with "[aqua] "
    args.unshift('[' + this.colors.cyan('aqua') + ']');

    // log to the console
    console.log.apply(console, args);

    // support call chaining
    return this;
  };

}());
