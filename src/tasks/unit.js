/**
 * @file
 *
 * ### Responsibilities
 * - unit testing projects
 * - register task to run unit tests.
 *
 * @module unit
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * @constructor
 * @implements {Task}
 */
function Unit() {

}


/**
 * Collect all the files needed to run the unit tests
 */
Unit.prototype.collect = function() {
  // start with "sourceonly"
  // check for globals
  // check for deps
  // check for mocks
  // add source and spec files
  // return the list
};


/**
 * Unit test web projects
 */
Unit.prototype.testWeb = function() {
  // load dependencies
  // collect files
  // run unit tests with karma
};


/**
 * Unit test node.js projects
 */
Unit.prototype.testNode = function() {
  // load dependencies
  // collect files
  // set the coverage output dir based on the config
  // make sure coverage folder exists
  // instrument source code for coverage
  // run unit tests with gulp-jasmine runner
  // gather coverage data
  // enforce coverage thresholds
  // listen for errors
  // create code coverage report
};


/**
 * Unit test JavaScript Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} cfg AQUA project config file.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.run = function(aqua, cfg, gulp) {
  //aqua.log(' > run task', cfg.id + '-unit');

  // default project type to web
  cfg.type = cfg.type ? cfg.type : 'web';

  // check project type
  switch (cfg.type) {

    case 'web':
      // web project
      this.testWeb();
      break;

    case 'nodejs':
      // node.js project
      this.testNode();
      break;

    default:
      aqua.error('unsupported project type:', cfg.type);
      break;
  }
};


/**
 * Create Project Task to unit test source code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} cfg AQUA project config file.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.reg = function(aqua, cfg, gulp) {

  var id = cfg.id.toLowerCase(),
      task = this;

  //TODO: register the project with AQUA

  // create task to run all unit tests in the project
  gulp.task(id + '-unit', [], function(done) {

    // check if project is configured properly
    if (task.canRun(cfg, aqua.cfg)) {
      // run the task
      task.run(aqua, cfg, gulp);
    } else {
      aqua.warn('unit testing source code not configured');
    }
    done();
  });

};


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {AquaConfig=} opt_acfg - optional AQUA config JSON.
 * @return {boolean}
 */
Unit.prototype.canRun = function(pcfg, opt_acfg) {
  return !!(pcfg.src && pcfg.unit && opt_acfg.testing && opt_acfg.testing.web);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
*/
Unit.prototype.about = function() {
  return '`gulp {id}-unit` to run unit tests against the source code';
};


(function closure() {
  /**
   * Export an instance of the task
   * @type {Unit}
   */
  module.exports = new Unit();
}());
