/**
 * @file
 *
 * ### Responsibilities
 * - analyse the JavaScript source code against complexity thresholds.
 * - register task to check code complexity.
 *
 * @module gpa
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * @constructor
 * @implements {Task}
 */
function GPA() {

}


/**
 * Lint JavaScript Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!Config} cfg AQUA project config file.
 * @param {!Gulp} gulp - Gulp instance.
 */
GPA.prototype.run = function(aqua, cfg, gulp) {
  // load node modules needed
  var complexity = /** @type {Function} */(require('gulp-complexity'));

  //aqua.log(' > run task', cfg.id + '-lint');

  // check JavaScript source code complexity
  gulp.src(cfg.src)
      .pipe(complexity())
      .on('error', aqua.error);
};


/**
 * Create Project Task to Lint Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!Config} cfg AQUA project config file.
 * @param {!Gulp} gulp - Gulp instance.
 */
GPA.prototype.reg = function(aqua, cfg, gulp) {

  var id = cfg.id.toLowerCase(),
      task = this;

  //TODO: register the project with AQUA

  // create task to lint all JavaScript in the project
  gulp.task(id + '-gpa', [], function(done) {
    // check if project is configured properly
    if (cfg.src) {
      // run the task
      task.run(aqua, cfg, gulp);
    } else {
      aqua.warn('checking source code complexity not configured');
    }
    done();
  });

};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
 */
GPA.prototype.about = function() {
  return '`gulp {id}-gpa` to check source code against complexity thresholds';
};


(function closure() {
  /**
   * Export an instance of the task
   * @type {GPA}
   */
  module.exports = new GPA();
}());
