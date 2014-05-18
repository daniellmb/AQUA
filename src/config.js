/**
 * @file
 *
 * ### Responsibilities
 * - configure AQUA.
 *
 * @module init
 * @author dlamb.open.source@gmail.com (Daniel Lamb)
 */


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
