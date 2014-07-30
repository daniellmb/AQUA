/**
 * @file
 *
 * ### Responsibilities
 * - validate a AQUA and AQUA project configuration files.
 *
 * @module validate
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {
  /**
   * Validate an AQUA configuration file
   * @param {AquaConfig} acfg - an AQUA configuration object to validate
   * @return {AQUA}
   * @this {AQUA}
   */
  module.exports = function(acfg) {
    // validate AQUA config

    // validate project config
    // including:
    //  id must be valid for use as folder & file names
    //  sub objects: such as .unit is optional but .unit.tests is required

    // support call chaining
    return this;
  };

}());
