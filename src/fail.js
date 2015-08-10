/**
 * @file
 *
 * ### Responsibilities
 * - handle setting the exit code of the current process to 1
 *
 * @module fail
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
*/


(function closure() {
  /**
   * Fail on stream errors
   * @param {*} e - error details
   * @return {AQUA}
   * @this {AQUA}
  */
  module.exports = function(e) {
    var aqua = this;

    // set the process exit code to 1
    process.exit(1);

    // support call chaining
    return aqua;
  };

}());
