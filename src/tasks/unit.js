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
 * Collect all the files needed to - run the unit tests
 * @param {ProjConfigUnitTest} utCfg - AQUA project unit test configuration.
 * @param {Array.<string>} src - AQUA project source file configuration.
 * @return {!Array.<string>}
 */
Unit.prototype.collect = function(utCfg, src) {
  // start with "sourceonly"
  var files = ['./test/sourceonly.js'];

  // check for globals
  if (utCfg.globals) {
    files = files.concat(utCfg.globals);
  }

  // check for dependencies
  if (utCfg.deps) {
    files = files.concat(utCfg.deps);
  }

  // check for mocks
  if (utCfg.mocks) {
    files = files.concat(utCfg.mocks);
  }

  // add source and spec files
  files = files.concat(src, utCfg.tests);

  // return the list
  return files;
};


/**
 * Unit test web projects
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!Array.<string>} files - files needed for testing.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.testWeb = function(aqua, files, gulp) {
  // load dependencies
  var karma = /** @type {Function} */(require('gulp-karma'));

  // get files needed for testing
  gulp.src(files)
    .pipe(karma({
        // run unit tests with karma
        configFile: aqua.cfg.testing.web,
        action: 'run'
      }))
    .on('error', aqua.error);
};


/**
 * Unit test node.js projects
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Array.<string>} files - files needed for testing.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.testNode = function(aqua, pcfg, files, gulp) {

  // load dependencies
  var istanbul = /** @type {Function} */(require('gulp-istanbul')),
      task = this;

  // get the files needed for testing
  gulp.src(pcfg.src)
      .pipe(istanbul(/* instrument source code for coverage */))
      .on('finish', function() {
        // run unit tests
        task.runNodeTests(aqua, pcfg.id, files, gulp);
      })
      .on('error', aqua.error);
};


/**
 * Run Node.js unit tests
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!string} id - AQUA project id.
 * @param {!Array.<string>} files - files needed for testing.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.runNodeTests = function(aqua, id, files, gulp) {

  // load dependencies
  var jasmine = /** @type {Function} */(require('gulp-jasmine')),
      ncfg = /** @type {Object} */(require('../../' + aqua.cfg.testing.node)),
      task = this;

  // run unit tests
  gulp.src(files)
      .pipe(jasmine(ncfg.jasmine))
      .pipe(task.createReports(aqua.cfg, ncfg, id))
      .on('end', function() {
        // enforce thresholds
        task.enforceThresholds(aqua, id, gulp);
      })
      .on('error', aqua.error);
};


/**
 * Enforce unit test code coverage reports
 * @param {AquaConfig} acfg - AQUA configuration.
 * @param {!Object} ncfg - NodeJS test runner configuration.
 * @param {!string} id - AQUA project id.
 * @return {Object} istanbul report writer
 */
Unit.prototype.createReports = function(acfg, ncfg, id) {
  var istanbul = /** @type {Istanbul} */(require('gulp-istanbul')),
      path = require('path');

  return istanbul.writeReports({
    // create reports
    dir: path.join(acfg.coverage.report, id.toLowerCase()),
    reporters: ncfg.coverage.reporters
  });
};


/**
 * Enforce unit test code coverage thresholds
 * @param {AQUA} aqua - AQUA configuration.
 * @param {!string} id - AQUA project id.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.enforceThresholds = function(aqua, id, gulp) {
  // load dependencies
  var enforcer = /** @type {Function} */(require('gulp-istanbul-enforcer')),
      noErrors = true;

  // enforce coverage thresholds
  gulp.src('.')
      .pipe(enforcer({
        thresholds: aqua.cfg.thresholds.coverage,
        coverageDirectory: id.toLowerCase(),
        rootDirectory: aqua.cfg.coverage.report
      }))
      .on('error', function(e) {
        noErrors = false;
        aqua.log('Coverage Check: Below Thresholds:\n' +
            aqua.colors.yellow(e.message.replace(/ERROR: /g, '')));
        aqua.error(arguments);
      })
      .on('finish', function(e) {
        if (noErrors) {
          aqua.log('Coverage Check: ' + aqua.colors.green('Coverage is at or over the minimum thresholds.'));
        }
      });
};


/**
 * Unit test JavaScript Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} cfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.run = function(aqua, cfg, gulp) {
  //aqua.log(' > run task', cfg.id + '-unit');

  // default project type to web
  cfg.type = cfg.type ? cfg.type : 'web';

  // collect files needed for testing
  var files = this.collect(cfg.unit, cfg.src);

  // check project type
  switch (cfg.type) {

    case 'web':
      // unit test web project
      this.testWeb(aqua, files, gulp);
      break;

    case 'nodejs':
      // unit test node.js project
      this.testNode(aqua, cfg, files, gulp);
      break;

    default:
      aqua.error('unsupported project type:', cfg.type);
      break;
  }
};


/**
 * Create Project Task to unit test source code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} cfg - AQUA project configuration.
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
  // need source files unit test config and test config
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
