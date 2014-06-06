/**
 * @file
 *
 * ### Responsibilities
 * - configure AQUA.
 *
 * @module config
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {
  /**
   * configure AQUA
   * @param {AquaConfig} cfg - AQUA configuration object
   * @return {AQUA}
   * @this {AQUA}
   */
  module.exports = function(cfg) {
    var aqua = this, log,
        tasks = aqua.tasks,
        util = aqua.util,
        lcfg = cfg.logging;

    // configure logging
    if (lcfg) {
      // configure the logger for AQUA
      aqua.logger.setup(lcfg.level, lcfg.colors, lcfg.loggers);

      // create config logger
      log = aqua.logger.create('config');

      // loop through the tasks
      util.forOwn(tasks, function(value, key) {

        // configure the task loggers
        tasks[key].log = aqua.logger.create(key);
      });

      log.debug('AQUA configuration', cfg);
    }

    // set the AQUA config
    aqua.cfg = cfg;

    // support call chaining
    return aqua;
  };

}());
