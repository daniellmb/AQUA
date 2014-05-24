/**
 * @file
 *
 * ### Responsibilities
 * - Take the project config files and generate gulp tasks for them.
 *
 * @module init
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {
  /**
   * Take the project config files and generate gulp tasks for them.
   * @param {Array} cfgs - Array of AQUA configuration files
   * @this {AQUA}
   * @return {Gulp}
   */
  module.exports = function(cfgs) {
    var aqua = /** @type {AQUA} */(this),
        tasks = /** @type {Object} */(aqua.tasks),
        gulp = /** @type {Gulp} */(require('gulp'));

    // loop through the AQUA configuration files
    cfgs.forEach(function(cfg) {

      //aqua.log(cfg.name + ' Project');

      // validate the AQUA configuration files
      aqua.validate(cfg);

      // check for tasks to register
      if (tasks !== null) {

        // loop through the AQUA tasks
        Object.keys(tasks).forEach(function(name) {

          //aqua.log(' -', name);

          // register each task using the config
          tasks[name].reg(aqua, cfg, gulp);
        });
      }
    });

    // return the gulp instance
    return gulp;
  };

}());
