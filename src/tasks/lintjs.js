/**
 * @file
 *
 * ### Responsibilities
 * - lint JavaScript source code.
 *
 * @module lintjs
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
function LintJS(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./base'));

  // reuse Base's constructor
  base.call(this, name, warning, opt_deps);
}


/**
 * Lint JavaScript source code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
LintJS.prototype.run = function(aqua, pcfg, gulp) {
  // load node modules needed
  var lintJs = /** @type {Function} */(require('gulp-jshint')),
      jshint = /** @type {JSHint} */(require('gulp-jshint'));

  //aqua.log(' > run task', pcfg.id + '-lint');

  var no_errors = true;

  // lint all JavaScript against anti-patterns
  gulp.src(pcfg.alljs)
      .pipe(lintJs())
      .pipe(jshint.reporter(function() {
        // show on the first error only
        if (no_errors) {
          aqua.log('Lint Check: ' + aqua.colors.yellow('Lint errors found'));
          aqua.fail(arguments);
        }
        no_errors = false;
      }).on('end', function() {
        if (no_errors) {
          aqua.log('Lint Check: ' + aqua.colors.green('No errors found'));
        }
      }))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'))
      .on('error', aqua.fail);
};


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @return {boolean}
 */
LintJS.prototype.canRun = function(pcfg) {
  return !!(pcfg.alljs);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
 */
LintJS.prototype.about = function() {
  return '`gulp {id}-lint` to validate source files against anti-patterns';
};


/**
 * Inherit from the base AQUA task.
 */
LintJS.prototype.__proto__ = require('./base').prototype;


(function closure() {
  /**
   * Export an instance of the task
   * @type {LintJS}
   */
  module.exports = new LintJS('lint', 'linting source code not configured');
}());
