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
   * @param {Array} cfgs - Array of AQUA project configuration objects
   * @this {AQUA}
   * @return {Gulp}
   */
  module.exports = function(cfgs) {
    var aqua = /** @type {AQUA} */(this),
        tasks = (aqua.tasks),
        util = aqua.util,
        gulp = /** @type {Gulp} */(require('gulp')),
        log = aqua.logger.create('init');

    // loop through the AQUA project configurations
    cfgs.forEach(function(cfg) {

      log.debug('%s Project', cfg.name);

      // validate the AQUA project configuration
      aqua.validate(cfg);

      // loop through the AQUA tasks
      util.forOwn(tasks, function(value, key) {

        log.debug(' - %s', key);

        // register each task using the config
        tasks[key].reg(aqua, cfg, gulp);
      });
    });

    // return the gulp instance
    return gulp;
  };

}());
