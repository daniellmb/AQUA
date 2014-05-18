/**
 * @file
 *
 * ### Responsibilities
 * - Take the project config files and generate gulp tasks for them.
 *
 * @module init
 * @author dlamb.open.source@gmail.com (Daniel Lamb)
 */


/**
 * Take the project config files and generate gulp tasks for them.
 * @param {Array} cfgs - Array of AQUA configuration files
 * @return {AQUA}
 * @this {AQUA}
 */
module.exports = function(cfgs) {
  var aqua = this,
      gulp = require('gulp');

  // loop through the AQUA configuration files
  cfgs.forEach(function(cfg) {

    //aqua.log(cfg.name + ' Project');

    // validate the AQUA configuration files
    aqua.validate(cfg);

    // loop through the AQUA tasks
    Object.keys(aqua.tasks).forEach(function(name) {

      //aqua.log(' -', name);

      // register each task using the config
      aqua.tasks[name].reg(aqua, cfg, gulp);
    });
  });

  // return the gulp instance
  return gulp;
};
