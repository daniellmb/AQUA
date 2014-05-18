/**
 * @file
 *
 * ### Responsibilities
 * - handle errors in a consistent way
 *
 * @module error
 * @author dlamb.open.source@gmail.com (Daniel Lamb)
*/


/**
 * Handle stream errors
 * @param {*} e - error details
 * @return {AQUA}
 * @this {AQUA}
*/
module.exports = function(e) {
  var aqua = this;

  // support call chaining
  return aqua;
};
