/**
 * @file
 *
 * ### Responsibilities
 * - unit testing projects
 *
 * @module unit
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
function Unit(name, warning, opt_deps) {
  var task = this, base = /** @type {Function} */(require('./base'));

  // reuse Base's constructor
  base.call(task, name, warning, opt_deps);

  // set the pipe nothing const
  task.PIPE_NOTHING = 'pipe.in.nothing.let.karma.load.the.files.js';
}


/**
 * Collect all the files needed to - run the unit tests
 * @param {ProjConfigUnitTest} utCfg - AQUA project unit test configuration.
 * @param {Array.<string>} src - AQUA project source file configuration.
 * @return {!Array.<string>}
 */
Unit.prototype.collect = function(utCfg, src) {
  // start with "sourceonly"
  var files = ['./externs/sourceonly.js'];

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
 * Returns a list of files to instrument for coverage
 * @param {!WebConfig} wcfg - unit test for web configuration
 * @param {!ProjConfig} pcfg - aqua project configuration
 * @param {!AQUA} aqua - AQUA instance
 * @return {Array} list of files to instrument
 */
Unit.prototype.getFilesToCover = function(wcfg, pcfg, aqua) {
  var util = aqua.util;

  // check test config
  if (this.usingRequireJS(wcfg) && wcfg.files) {

    // return only karma files that are also in the project source files
    return util._.filter(wcfg.files, function (path) {
      var match = false;

      if (path.pattern) {

        // loop through the project source files
        pcfg.src.forEach(function (source) {

          // check for partial path match
          if (source.toLowerCase().indexOf(path.pattern.toLowerCase()) > -1) {

            // found match
            match = true;

            // stop looking
            return false;
          }

          // keep looping
          return true;
        });
      }

      // return filter boolean
      return match;
    });

  } else {

    // use the project source files
    return pcfg.src;
  }
};


/**
 * Configure test coverage settings for karma
 * @param {!WebConfig} wcfg - unit test for web configuration
 * @param {!ProjConfig} pcfg - aqua project configuration
 * @param {!AQUA} aqua - AQUA instance.
 */
Unit.prototype.getCoverageConfig = function(wcfg, pcfg, aqua) {
  // load dependencies
  var path = require('path'), folder, list,
      task = this, acfg = aqua.cfg, util = aqua.util;

  // set coverage preprocessor
  wcfg.preprocessors = {};

  // get a list of files to instrument for coverage
  list = task.getFilesToCover(wcfg, pcfg, aqua);

  // add coverage preprocessor for appropriate files
  util.forEach(list, function (path) {
    wcfg.preprocessors[path.pattern || path] = ['coverage'];
  });

  // add coverage reporter
  wcfg.reporters.push('coverage');

  // set coverage report output folder
  folder = path.join(acfg.coverage.report, pcfg.id.toLowerCase());

  // add coverage reporters
  wcfg.coverageReporter = {
    reporters: []
  };
  util.forEach(wcfg.coverage.reporters, function(rptr) {
    wcfg.coverageReporter.reporters.push({
      type: rptr,
      dir: folder
    });
  });
};

/**
 * Validate node.js unit test config
 * @param {WebConfig} wcfg - web test configuration.
 * @return {boolean} true if test project is configured to use require.jd
 */
Unit.prototype.usingRequireJS = function (wcfg) {
  return wcfg.frameworks.indexOf('requirejs') !== -1;
};

/**
 * Validate web unit test config
 * @param {WebConfig} wcfg - web test configuration.
 * @throws {Error} throws error if config is invalid.
 */
Unit.prototype.validateWebConfig = function (wcfg) {

  // reporters are required
  if (!wcfg.reporters || wcfg.reporters.length === 0) {
    throw new Error('Unit test reporters are required');
  }

};

/**
 * Validate node.js unit test config
 * @param {NodeConfig} ncfg - node test configuration.
 * @throws {Error} throws error if config is invalid.
 */
Unit.prototype.validateNodeConfig = function (ncfg) {
  // add as needed
};

/**
 * Unit test web projects
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {string} location - the relative configuration file location.
 * @param {Function} validate - validate the test configuration.
 * @return {WebConfig|NodeConfig} test configuration.
 */
Unit.prototype.getTestConfig = function (pcfg, location, validate) {
  var path = require('path'),
      backTwo = '../../',
      tcfg;

  // check for project level override
  if (pcfg.unit && pcfg.unit.config) {
    location = pcfg.unit.config;
  }

  try {
    // try to use parent location
    tcfg = /** @type {WebConfig|NodeConfig} */(require(path.join(__dirname, backTwo, backTwo, location)));
  } catch (e) {
    // use default test configs
    tcfg = /** @type {WebConfig|NodeConfig} */(require(path.join(__dirname, backTwo, location)));
  }

  this.log.debug('test config', tcfg);

  // validate the test config
  validate(tcfg);

  //return test configuration
  return tcfg;
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
  var task = this, acfg = aqua.cfg,
      karma = /** @type {Function} */(require('gulp-karma')),
      wcfg = /** @type {WebConfig} */(task.getTestConfig(pcfg, acfg.testing.web, task.validateWebConfig));

  // merge the web config with dynamic settings
  wcfg = aqua.util.assign(wcfg, {
    // set karma logging level to match aqua logging level
    logLevel: acfg.logging.level,
    // set karma colors setting to match aqua
    colors: acfg.logging.colors,
    // set karma base path
    basePath: './',
    // set action (used by gulp-karma)
    action: 'run'
  });

  if (aqua.cfg.coverage) {
    task.getCoverageConfig(wcfg, pcfg, aqua);
  }

  // check if running tests using AMD
  if (task.usingRequireJS(wcfg)) {
    // work around issue #7 in gulp-karma
    files = [task.PIPE_NOTHING];
  }

  console.log();

  // get files needed for testing
  gulp.src(files)
      .pipe(karma(wcfg))
      .on('end', function() {
        // enforce thresholds
        task.enforceThresholds(aqua, pcfg.id, gulp);
      })
      .on('error', aqua.fail);
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
  var instrument = /** @type {Function} */(require('gulp-istanbul')),
      istanbul = /** @type {Istanbul} */(require('gulp-istanbul')),
      task = this;

  // get the files needed for testing
  gulp.src(pcfg.src)
      .pipe(instrument(/* instrument source code for coverage */))
      .pipe(istanbul.hookRequire()) // force `require` to return covered files
      .on('finish', function() {
        // run unit tests
        task.runNodeTests(aqua, pcfg, files, gulp);
      })
      .on('error', aqua.fail);
};


/**
 * Run Node.js unit tests
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Array.<string>} files - files needed for testing.
 * @param {!Gulp} gulp - Gulp instance.
 */
Unit.prototype.runNodeTests = function(aqua, pcfg, files, gulp) {

  // load dependencies
  var acfg = aqua.cfg, task = this,
      jasmine = /** @type {Function} */(require('gulp-jasmine')),
      ncfg = /** @type {NodeConfig} */(task.getTestConfig(pcfg, acfg.testing.node, task.validateNodeConfig));

  // set gulp-jasmine show colors to match AQUA setting
  if (acfg.logging && !acfg.logging.colors) {

    // default is true so we only need to set when false
    ncfg.jasmine.showColors = acfg.logging.colors;
  }

  // run unit tests
  gulp.src(files)
      .pipe(jasmine(ncfg.jasmine))
      .pipe(task.createReports(acfg, ncfg, pcfg.id))
      .on('finish', function() {
        // enforce thresholds
        task.enforceThresholds(aqua, pcfg.id, gulp);
      })
      .on('error', aqua.fail);
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
        aqua.fail(arguments);
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
  //aqua.log(' > run task', pcfg.id + '-unit');

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
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {AquaConfig=} opt_acfg - optional AQUA config JSON.
 * @return {boolean}
 */
Unit.prototype.canRun = function(pcfg, opt_acfg) {
  // need source files unit test config and test config
  return !!(pcfg.src && pcfg.unit && opt_acfg.testing);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
*/
Unit.prototype.about = function() {
  return '`gulp {id}-unit` to run unit tests against the source code';
};


/**
 * Inherit from the base AQUA task.
 */
Unit.prototype.__proto__ = require('./base').prototype;


(function closure() {
  /**
   * Export an instance of the task
   * @type {Unit}
   */
  module.exports = new Unit('unit', 'unit testing source code not configured');
}());
