/**
 * @file
 *
 * ### Responsibilities
 * - analyze the JavaScript source code against complexity thresholds.
 *
 * @module doc
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
function DOC(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./base'));

  // set the default template
  this.template = {
    linenums: true,
    inverseNav: false,
    navType: 'vertical',
    path: 'ink-docstrap',
    collapseSymbols: false,
    copyright: '<div id="aqua-footer"></div>'
  };

  // set the default options
  this.options = {
    plugins: ['plugins/markdown'],
    markdown: {
      // gitHub flavored markdown
      parser: 'gfm'
    }
  };

  // reuse Base's constructor
  base.call(this, name, warning, opt_deps);
}


/**
 * Get the sources to generate documentation from
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @return {Array} list of sources
 */
DOC.prototype.getSrc = function(pcfg) {
  // copy the source array
  var src = pcfg.src.slice();

  // check for optional type definitions
  if (pcfg.types) {
    src = src.concat(pcfg.types);
  }

  // check for optional readme file
  if (pcfg.readme) {
    src.push(pcfg.readme);
  }

  // check for optional page objects
  if (pcfg.e2e && pcfg.e2e.pgobj) {
    src = src.concat(pcfg.e2e.pgobj);
  }

  // return the list of sources
  return src;
};


/**
 * Get optional extra content to include in the generated docs
 * @param {!AquaConfig} acfg - AQUA configuration.
 * @return {string} content to include
 */
DOC.prototype.getExtras = function(acfg) {
  // extra content to include in the generated files
  var extra = [],
      root = '../../',
      path = require('path');

  if (acfg.docs.css) {
    // make path relative to the root
    extra.push('<link rel="stylesheet" type="text/css" href="', path.join(root, acfg.docs.css), '">');
  }

  if (acfg.docs.js) {
    // make path relative to the root
    extra.push('<script src="', path.join(root, acfg.docs.js), '"></script>');
  }

  return extra.join('');
};


/**
 * Extend the default template options with project spesific settings
 * @param {!AquaConfig} acfg - AQUA configuration.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @return {Object} template options
 */
DOC.prototype.getTemplate = function(acfg, pcfg) {
  // load node modules needed
  var _ = require('lodash');

  // extend default template options
  return _.assign(this.template, {
    systemName: pcfg.name,
    theme: acfg.docs.theme,
    footer: this.getExtras(acfg)
  });
};


/**
 * Check generate documentation
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project configuration.
 * @param {!Gulp} gulp - Gulp instance.
 */
DOC.prototype.run = function(aqua, pcfg, gulp) {
  // load node modules needed
  var jsdoc = /** @type {Function} */(require('gulp-jsdoc')),
      path = require('path'),
      acfg = aqua.cfg;

  //aqua.log(' > run task', pcfg.id + '-doc');

  // generate documentation from code comments
  gulp.src(this.getSrc(pcfg))
      .pipe(jsdoc(
          path.join(acfg.docs.dir, pcfg.id.toLowerCase()),
          this.getTemplate(acfg, pcfg), this.options)
          .on('error', aqua.error)
      );
};


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {AquaConfig=} opt_acfg - optional AQUA config JSON.
 * @return {boolean}
 */
DOC.prototype.canRun = function(pcfg, opt_acfg) {
  return !!(pcfg.src && opt_acfg.docs && opt_acfg.docs.dir);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
 */
DOC.prototype.about = function() {
  return '`gulp {id}-doc` to generate documentation from code annotations';
};


/**
 * Inherit from the base AQUA task.
 */
DOC.prototype.__proto__ = require('./base').prototype;

(function closure() {
  /**
   * Export an instance of the task
   * @type {DOC}
   */
  module.exports = new DOC('doc', 'generating documentation not configured');
}());
