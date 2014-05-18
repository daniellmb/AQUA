/**
 * @file
 *
 * ### Responsibilities
 * - lint JavaScript source code.
 * - register task to run linting.
 *
 * @module lintjs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * @constructor
 * @implements {Task}
 */
function LintJS() {

}


/**
 * Lint JavaScript Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!Config} cfg AQUA project config file.
 * @param {!Gulp} gulp - Gulp instance.
 */
LintJS.prototype.run = function(aqua, cfg, gulp) {
  // load node modules needed
  var jshint = /** @type {Function} */(require('gulp-jshint')),
      reporter = /** @type {JSHint} */(require('gulp-jshint')).reporter('default'),
      failOnEx = /** @type {JSHint} */(require('gulp-jshint')).reporter('fail');

  //aqua.log(' > run task', cfg.id + '-lint');

  // lint all JavaScript against anti-patterns
  gulp.src(cfg.alljs)
      .pipe(jshint())
      .pipe(reporter)
      .pipe(failOnEx)
      .on('error', aqua.error);
};


/**
 * Create Project Task to Lint Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!Config} cfg AQUA project config file.
 * @param {!Gulp} gulp - Gulp instance.
 */
LintJS.prototype.reg = function(aqua, cfg, gulp) {

  var id = cfg.id.toLowerCase(),
      task = this;

  //TODO: register the project with AQUA

  // create task to lint all JavaScript in the project
  gulp.task(id + '-lint', [], function(done) {
    // check if project is configured properly
    if (cfg.alljs) {
      // run the task
      task.run(aqua, cfg, gulp);
    } else {
      aqua.warn('linting source code not configured');
    }
    done();
  });

};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
*/
LintJS.prototype.about = function() {
  return '`gulp {id}-lint` to validate source files against anti-patterns';
};


/**
 * Export an instance of the task
 * @type {LintJS}
 */
module.exports = new LintJS();
