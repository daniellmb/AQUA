/**
 * @file
 *
 * ### Responsibilities
 * - configure AQUA.
 *
 * @module init
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {
  /**
   * configure AQUA
   * @param {string} cfg - AQUA configuration file
   * @return {AQUA}
   * @this {AQUA}
   */
  module.exports = function(cfg) {
    var aqua = this;

    // support call chaining
    return aqua;
  };

}());
