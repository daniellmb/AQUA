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
 * Configure test coverage settings for karma
 * @param {!Object} wcfg - unit test for web configuration
 * @param {!ProjConfig} pcfg - aqua project configuration
 * @param {!AquaConfig} acfg - aqua configuration
 */
Unit.prototype.getCoverageConfig = function(wcfg, pcfg, acfg) {
  var path = require('path'), folder;

  // set coverage preprocessor
  wcfg.preprocessors = {};
  pcfg.src.forEach(function(path) {
    wcfg.preprocessors[path] = ['coverage'];
  });

  // add coverage reporter
  wcfg.reporters.push('coverage');

  // set coverage report output folder
  folder = path.join(acfg.coverage.report, pcfg.id.toLowerCase());

  // add coverage reporters
  wcfg.coverageReporter = {
    reporters: []
  };
  wcfg.coverage.reporters.forEach(function(rptr) {
    wcfg.coverageReporter.reporters.push({
      type: rptr,
      dir: folder
    });
  });
};


/**
 * Unit test web projects
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Array.<string>} files - files needed for testing.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.testWeb = function(aqua, pcfg, files, gulp) {
  // load dependencies
  var karma = /** @type {Function} */(require('gulp-karma')),
      wcfg = /** @type {Object} */(require('../../' + aqua.cfg.testing.web)),
      acfg = aqua.cfg, task = this;

  //TODO: refactor to use util.assign
  // set action (used by gulp-karma)
  wcfg.action = 'run';

  // set karma logging level to match aqua logging level
  wcfg.logLevel = acfg.logging.level;

  // set karma colors setting to match aqua
  wcfg.colors = acfg.logging.colors;

  // set karma base path
  wcfg.basePath = './';

  if (aqua.cfg.coverage) {
    task.getCoverageConfig(wcfg, pcfg, acfg);
  }

  task.log.debug('karma config', wcfg);

  // get files needed for testing
  gulp.src(files)
      .pipe(karma(wcfg))
      .on('end', function() {
        // enforce thresholds
        task.enforceThresholds(aqua, pcfg.id, gulp);
      })
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
      acfg = aqua.cfg, task = this;

  // set gulp-jasmine show colors to match AQUA setting
  if (acfg.logging && !acfg.logging.colors) {

    // default is true so we only need to set when false
    ncfg.jasmine.showColors = acfg.logging.colors;
  }

  task.log.debug(ncfg);

  // run unit tests
  gulp.src(files)
      .pipe(jasmine(ncfg.jasmine))
      .pipe(task.createReports(acfg, ncfg, id))
      .on('end', function() {
        // enforce thresholds
        task.enforceThresholds(aqua, id, gulp);
      })
      .on('error', aqua.error);
};


/**
 * Enforce unit test code coverage reports
 * @param {AquaConfig} acfg - AQUA configuration.
 * @param {!Object} rcfg - unit test runner configuration.
 * @param {!string} id - AQUA project id.
 * @return {Object} istanbul report writer
 */
Unit.prototype.createReports = function(acfg, rcfg, id) {
  var istanbul = /** @type {Istanbul} */(require('gulp-istanbul')),
      path = require('path');

  return istanbul.writeReports({
    // create reports
    dir: path.join(acfg.coverage.report, id.toLowerCase()),
    reporters: rcfg.coverage.reporters
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
      path = require('path'),
      noErrors = true,
      task = this;

  // enforce coverage thresholds
  gulp.src('.')
      .pipe(enforcer({
        thresholds: aqua.cfg.thresholds.coverage,
        rootDirectory: path.join(aqua.cfg.coverage.report, id.toLowerCase())
      }))
      .on('error', function(e) {
        noErrors = false;
        task.log.warn('Coverage Below Thresholds:\n' +
            aqua.colors.yellow(e.message.replace(/ERROR: /g, '')));
        aqua.error(arguments);
      })
      .on('end', function() {
        if (noErrors) {
          task.log.info(aqua.colors.green('Coverage is at or over the minimum thresholds.'));
        }
      });
};


/**
 * Unit test JavaScript Source Code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.run = function(aqua, pcfg, gulp) {
  //aqua.log(' > run task', cfg.id + '-unit');

  // default project type to web
  pcfg.type = pcfg.type ? pcfg.type : 'web';

  // collect files needed for testing
  var files = this.collect(pcfg.unit, pcfg.src);

  // check project type
  switch (pcfg.type) {

    case 'web':
      // unit test web project
      this.testWeb(aqua, pcfg, files, gulp);
      break;

    case 'nodejs':
      // unit test node.js project
      this.testNode(aqua, pcfg, files, gulp);
      break;

    default:
      aqua.error('unsupported project type:', pcfg.type);
      break;
  }
};


/**
 * Create Project Task to unit test source code
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.reg = function(aqua, pcfg, gulp) {

  var id = pcfg.id.toLowerCase(),
      task = this;

  //TODO: register the project with AQUA

  // create task to run all unit tests in the project
  gulp.task(id + '-unit', [], function(done) {

    // check if project is configured properly
    if (task.canRun(pcfg, aqua.cfg)) {
      // run the task
      task.run(aqua, pcfg, gulp);
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
