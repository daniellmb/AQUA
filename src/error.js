/**
 * @file
 *
 * ### Responsibilities
 * - handle errors in a consistent way
 *
 * @module error
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
*/


(function closure() {
  /**
   * Handle stream errors
   * @param {*} e - error details
   * @return {AQUA}
   * @this {AQUA}
   * @deprecated perfer using task logger
  */
  module.exports = function(e) {
    var aqua = this;

    // write "beep" sound to the console
    console.log('\x07');

    // support call chaining
    return aqua;
  };

}());
