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
   * Create project agnostic tasks
   * @param {AQUA} aqua - AQUA instance.
   * @param {Gulp} gulp - Gulp instance.
   * @param {Logger} log - log4js logger instance
   */
  function projectAgnosticTasks(aqua, gulp, log) {
    // load node modules needed
    var gProtractor = require('gulp-protractor');

    // Downloads the latest selenium webdriver
    gulp.task('webdriver_update', [], gProtractor.webdriver_update);

    // Starts the standalone selenium server
    gulp.task('webdriver_standalone', [], gProtractor.webdriver_standalone);
  }

  /**
   * Create project dependant tasks
   * @param {AQUA} aqua - AQUA instance.
   * @param {Array} pcfgs - Array of AQUA project configuration objects
   * @param {Gulp} gulp - Gulp instance.
   * @param {Logger} log - log4js logger instance
   */
  function projectDependantTasks(aqua, pcfgs, gulp, log) {
    var tasks = (aqua.tasks),
        util = aqua.util;

    // loop through the AQUA project configurations
    pcfgs.forEach(function(pcfg) {

      log.debug('%s Project', pcfg.name);

      // validate the AQUA project configuration
      aqua.validate(pcfg);

      // loop through the AQUA tasks
      util.forOwn(tasks, function(value, key) {

        // register each task using the config
        tasks[key].reg(aqua, pcfg, gulp);

        // debug the task
        log.debug('  run %s', tasks[key].about().replace('{id}', pcfg.id.toLowerCase()));
      });
    });
  }

  /**
   * Get gulp instance
   * @return {Gulp} gulp - Gulp instance.
   */
  function getGulp() {
    // try to use parent instance
    try {
      return /** @type {Gulp} */(require('../../gulp'))
    } catch(e) {
      return /** @type {Gulp} */(require('gulp'))
    }
  }

  /**
   * Take the project config files and generate gulp tasks for them.
   * @param {Array} pcfgs - Array of AQUA project configuration objects
   * @this {AQUA}
   * @return {Gulp}
   */
  module.exports = function(pcfgs) {
    var aqua = /** @type {AQUA} */(this),
        gulp = getGulp(),
        log = /** @type {Logger} */(aqua.logger.create('init'));

    // create project agnostic tasks
    projectAgnosticTasks(aqua, gulp, log);

    // create project dependant tasks
    projectDependantTasks(aqua, pcfgs, gulp, log);

    // return the gulp instance
    return gulp;
  };

}());
