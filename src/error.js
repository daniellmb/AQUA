/**
 * @file
 *
 * ### Responsibilities
 * - handle errors in a consistent way
 *
 * @module error
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
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
