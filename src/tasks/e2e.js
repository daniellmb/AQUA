/**
 * @file
 *
 * ### Responsibilities
 * - run end-to-end integration tests.
 *
 * You may need to run "node_modules/protractor/bin/webdriver-manager update" before using this task
 *
 * @module e2e
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
function E2E(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./base'));

  // reuse Base's constructor
  base.call(this, name, warning, opt_deps);
}


/**
 * Run end-to-end tests
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
E2E.prototype.run = function(aqua, pcfg, gulp) {
  // load node modules needed
  var gProtractor = require('gulp-protractor'),
      protractor = gProtractor.protractor;

  //aqua.log('run task', pcfg.id + '-e2e');

  // run end-to-end tests
  gulp.src(pcfg.e2e.tests)
      .pipe(protractor({
        configFile: aqua.cfg.testing.e2e
      }))
      .on('error', aqua.fail);
};


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {AquaConfig=} opt_acfg - optional AQUA config JSON.
 * @return {boolean}
 */
E2E.prototype.canRun = function(pcfg, opt_acfg) {
  return !!(pcfg.e2e && opt_acfg.testing && opt_acfg.testing.e2e);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
 */
E2E.prototype.about = function() {
  return '`gulp {id}-e2e` to run end-to-end integration tests';
};


/**
 * Inherit from the base AQUA task.
 */
E2E.prototype.__proto__ = require('./base').prototype;

(function closure() {
  /**
   * Export an instance of the task
   * @type {E2E}
   */
  module.exports = new E2E('e2e', 'running end-to-end tests not configured', ['webdriver_update']);
}());
