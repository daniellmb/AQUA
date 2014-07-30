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
   * @param {AquaConfig} acfg - AQUA configuration object
   * @return {AQUA}
   * @this {AQUA}
   */
  module.exports = function(acfg) {
    var aqua = this, log,
        tasks = aqua.tasks,
        util = aqua.util,
        lcfg = acfg.logging;

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

      log.debug('AQUA configuration', acfg);
    }

    // set the AQUA config
    aqua.cfg = acfg;

    // support call chaining
    return aqua;
  };

}());
