/**
 * @file
 *
 * ### Responsibilities
 * - validate a AQUA configuration file.
 *
 * @module validate
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {
  /**
   * Validate an AQUA configuration file
   * @param {AquaConfig} cfg - an AQUA configuration file to validate
   * @return {AQUA}
   * @this {AQUA}
   */
  module.exports = function(cfg) {
    // validate AQUA config
    // validate project config (including sub objects such as .unit is optional but .unit.tests is required)
    // support call chaining
    return this;
  };

}());
