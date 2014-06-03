/**
 * @file
 *
 * ### Responsibilities
 * - analyze the JavaScript source code against complexity thresholds.
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
 * Check source code complexity
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} cfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
GPA.prototype.run = function(aqua, cfg, gulp) {
  // load node modules needed
  var complexity = /** @type {Function} */(require('gulp-complexity')),
      noErrors = true,
      enforce = {
        cyclomatic: [8],
        halstead: [16],
        maintainability: [100]
      };

  //aqua.log(' > run task', cfg.id + '-gpa');

  //TODO: refactor this part into it's own method
  // check for complexity settings
  if (aqua.cfg.thresholds && aqua.cfg.thresholds.complexity) {
    // set cyclomatic threshold
    enforce.cyclomatic = [aqua.cfg.thresholds.complexity.cyclomatic];

    // set halstead threshold
    enforce.halstead = [aqua.cfg.thresholds.complexity.halstead];

    // set maintainability threshold
    enforce.maintainability = [aqua.cfg.thresholds.complexity.maintainability];
  }

  // check JavaScript source code complexity
  gulp.src(cfg.src)
      .pipe(complexity(enforce))
      .on('error', function() {
        noErrors = false;
        aqua.log('GPA Check: ' + aqua.colors.yellow('Complexity issues found'));
        aqua.error(arguments);
      })
      .on('finish', function() {
        if (noErrors) {
          aqua.log('GPA Check: ' + aqua.colors.green('No issues found'));
        }
      });
};


/**
 * Create Project Task to check source code complexity
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} cfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
GPA.prototype.reg = function(aqua, cfg, gulp) {

  var id = cfg.id.toLowerCase(),
      task = this;

  //TODO: register the project with AQUA

  // create task to check the gpa of the project source code
  gulp.task(id + '-gpa', [], function(done) {
    // check if project is configured properly
    if (task.canRun(cfg)) {
      // run the task
      task.run(aqua, cfg, gulp);
    } else {
      aqua.warn('checking source code complexity not configured');
    }
    done();
  });

};


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @return {boolean}
 */
GPA.prototype.canRun = function(pcfg) {
  return !!(pcfg.src);
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
