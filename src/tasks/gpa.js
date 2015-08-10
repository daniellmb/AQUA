/**
 * @file
 *
 * ### Responsibilities
 * - analyze the JavaScript source code against complexity thresholds.
 *
 * @module gpa
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';



/**
 * @constructor
 * @extends {Base}
 * @param {string} name - The task name.
 * @param {string} warning - The task warning.
 * @param {Array=} opt_deps - The optional task dependency tasks.
 */
function GPA(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./base'));

  // reuse Base's constructor
  base.call(this, name, warning, opt_deps);
}


/**
 * Check source code complexity
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
GPA.prototype.run = function(aqua, pcfg, gulp) {
  // load node modules needed
  var complexity = /** @type {Function} */(require('gulp-complexity')),
      noErrors = true,
      enforce = {
        cyclomatic: [8],
        halstead: [16],
        maintainability: [100]
      };

  //aqua.log(' > run task', pcfg.id + '-gpa');

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
  gulp.src(pcfg.src)
      .pipe(complexity(enforce))
      .on('error', function() {
        noErrors = false;
        aqua.log('GPA Check: ' + aqua.colors.yellow('Complexity issues found'));
        aqua.fail(arguments);
      })
      .on('finish', function() {
        if (noErrors) {
          aqua.log('GPA Check: ' + aqua.colors.green('No issues found'));
        }
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


/**
 * Inherit from the base AQUA task.
 */
GPA.prototype.__proto__ = require('./base').prototype;

(function closure() {
  /**
   * Export an instance of the task
   * @type {GPA}
   */
  module.exports = new GPA('gpa', 'checking source code complexity not configured');
}());
