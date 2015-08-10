/**
 * @file
 *
 * ### Responsibilities
 * - GCC (Google Closure Compiler) base AQUA task
 *
 * @module gcc
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';



/**
 * GCC AQUA base task.
 * @constructor
 * @extends {Base}
 * @param {string} name - The task name.
 * @param {string} warning - The task config warning.
 * @param {Array=} opt_deps - The optional task dependency tasks.
 */
var GCC = function(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./base'));

  // reuse Base's constructor
  base.call(this, name, warning, opt_deps);
};

GCC.prototype = {

  /**
   * Return the source code list.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @return {Array.<string>} list of source code
   */
  getSource: function(pcfg) {
    // make an immutable copy
    var src = pcfg.src.slice(),
        path = require('path');

    // add source only before everything (removed with dead-code)
    src.unshift(path.join(__dirname, '../../externs/sourceonly.js'));

    return src;
  },

  /**
   * Return output file name based on the project config. Only used if `dest` is also set.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @return {string} file name.
   */
  getFileName: function(pcfg) {
    return pcfg.destName || (pcfg.id.toLowerCase() + '.js');
  },

  /**
   * Return a list of node.js specific externs.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @param {Array.<string>} externs - the current list of externs to append to.
   * @return {Array.<string>} externs list.
   */
  getNodeExterns: function(pcfg, externs) {
    // check project type
    if (pcfg.type !== 'nodejs') {
      // only need this for node.js
      return externs;
    }

    // common core node.js externs
    return externs.concat(['buffer', 'core', 'process'].map(function(name) {
      // build path to node.js externs
      return './externs/nodejs/' + name + '.js';
    }));
  },

  /**
   * Append the list of globals used by the project.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @param {Array.<string>} externs - the current list of externs to append to.
   * @param {Glob} glob - the glob function.
   * @return {Array.<string>} externs list.
   */
  getGlobals: function(pcfg, externs, glob) {
    if (pcfg.unit && pcfg.unit.globals) {
      pcfg.unit.globals.forEach(function(pattern) {
        externs = glob.sync(pattern).concat(externs);
      });
    }
    return externs;
  },

  /**
   * Uses the provided glob pattern and returns a list of matching files.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @param {string} pattern - glob pattern to search for
   * @param {Glob} glob - the glob function.
   * @return {Array.<string>} list of matching files.
   */
  findFiles: function(pcfg, pattern, glob) {
    var matches, externsDir = './externs/';

    // check project type
    if (pcfg.type === 'nodejs') {
      externsDir += 'nodejs/';
    }

    // check if it's NOT a "bundled extern"
    if (pattern.charAt(0) === '.') {
      //task.log.debug('not bundled', pattern);
      matches = glob.sync(pattern);
    } else {
      //task.log.debug('is bundled', externsDir + pattern + '.js');
      matches = glob.sync(externsDir + pattern + '.js');
    }

    return matches;
  },

  /**
   * Return a list of project specific type definition files (externs).
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @param {Array.<string>} externs - the current list of externs to append to.
   * @param {Glob} glob - the glob function.
   * @return {Array.<string>} project externs list.
   */
  getProjTypes: function(pcfg, externs, glob) {
    var task = this;

    if (!pcfg.types) {
      return externs;
    }

    //get file list using glob
    var list = [];
    pcfg.types.forEach(function(pattern) {
      // search for files
      var matches = task.findFiles(pcfg, pattern, glob);

      // check if file was found
      if (matches.length === 0) {
        task.log.warn('Type file not found: ' + pattern);
      } else {
        list = list.concat(matches);
      }
    });

    return externs.concat(list);
  },

  /**
   * Return a list of "externs" to use when type checking.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @return {Array.<string>} externs list.
   */
  getExterns: function(pcfg) {
    var glob = /** @type {Glob} */(require('glob')),
        externs = [], task = this;

    // append nodejs externs
    externs = task.getNodeExterns(pcfg, externs);

    // append globals
    externs = task.getGlobals(pcfg, externs, glob);

    // append project type definitions
    externs = task.getProjTypes(pcfg, externs, glob);

    task.log.debug('externs', externs);

    return externs;
  },

  /**
   * Extends the flags object provided with conditional flags based on the project config.
   * @param {Object} flags - GCC command-line flags
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   */
  getConditionalFlags: function(flags, pcfg) {
    var path = require('path'),
        task = this;

    // check task type
    if (this.name === 'chk') {

      // this setting prevents creating the minified file
      flags.summary_detail_level = 3;

    } else if (pcfg.dest) {

      // need to create a source map
      flags.create_source_map = path.join(pcfg.dest, task.getFileName(pcfg) + '.map');
      flags.source_map_format = 'V3';
    }

    // check the project type
    flags.language_in = (pcfg.type === 'nodejs' ? 'ECMASCRIPT5_STRICT' : 'ECMASCRIPT3');

  },

  /**
   * Return a list of Google Closure Compiler command-line flags
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @return {Object} GCC flags
   */
  getGccFlags: function(pcfg) {
    var task = this,
        flags = {
          warning_level: 'VERBOSE',
          define: ['SOURCEONLY=false'],
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          extra_annotation_name: 'alias',
          externs: task.getExterns(pcfg)
        };

    // get optional GCC flags
    this.getConditionalFlags(flags, pcfg);

    return flags;
  },

  /**
   * Return a list of Google Closure Compiler command-line flags
   * @param {!AQUA} aqua - AQUA instance.
   * @param {string} message - message.
   * @return {boolean} is valid
   */
  checkPercentTyped: function(aqua, message) {
    var percent = /\d+(\.\d{1,2})?%/.exec(message);

    // check percent typed
    if (aqua.cfg.thresholds &&
        aqua.cfg.thresholds.percentTyped &&
        percent !== null &&
        parseFloat(percent[0]) < aqua.cfg.thresholds.percentTyped) {
      // below threshold
      aqua.log(aqua.colors.yellow('Type Check Threshold Not Met:\n') + 'Expected at least ' +
          aqua.cfg.thresholds.percentTyped + '% of source code to be typed, but is currently ' + percent[0] + '%');
      aqua.fail();
      return false;
    }
    return true;
  },

  /**
   * Check for errors once GCC has completed analysis.
   * @param {!AQUA} aqua - AQUA instance.
   * @param {!Error} err - error object from GCC.
   */
  handelErrors: function(aqua, err) {
    // check for errors and warnings
    if (err.message.indexOf('0 error(s), 0 warning(s)') === 0) {
      // if minifying the code or the percent typed is high enough
      if (this.name === 'min' || this.checkPercentTyped(aqua, err.message)) {
        // show no errors, no warnings message
        aqua.log('Type Check: ' + aqua.colors.green(err.message));
      }
    } else {
      // check error type
      if (err.message.indexOf('Unsupported major.minor version') > -1) {
        // invalid Java version
        aqua.log('Java 7+ is required to run type checking.');
      } else {
        // assume type errors and show them
        aqua.log(aqua.colors.yellow('Type Check Issues:\n') + err.message);
      }
      aqua.error();
    }
  },

  /**
   * Gets the GCC jar path.
   */
  getJarPath: function() {
    var path = require('path');

    // get jar path based on where the script is running
    return path.join(__dirname, '../../lib/gcc/compiler.jar');
  },

  /**
   * Run Google Closure Compiler Task
   * @param {!AQUA} aqua - AQUA instance.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @param {!Gulp} gulp - Gulp instance.
   */
  run: function(aqua, pcfg, gulp) {
    // load node modules needed
    var gcc = /** @type {Function} */(require('gulp-closure-compiler')),
        task = this,
        src = task.getSource(pcfg),
        flags = task.getGccFlags(pcfg),
        fileName = task.getFileName(pcfg);

    //aqua.log(' > run task', pcfg.id + '-gcc');

    // run google closure compiler
    gulp.src(src)
        .pipe(gcc({
          fileName: fileName,
          compilerFlags: flags,
          compilerPath: task.getJarPath(),
          jscomp_warning: 'reportUnknownTypes'
        }).on('error', function(e) {
          task.handelErrors(aqua, e);
        }))
        .pipe(gulp.dest(pcfg.dest || ''));
  }
};


/**
 * Inherit from the base AQUA task.
 */
GCC.prototype.__proto__ = require('./base').prototype;


/**
 * Expose GCC.
 */
module.exports = GCC;
