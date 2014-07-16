/**
 * @file
 *
 * ### Responsibilities
 * - Use Google Closure Compiler to minify the JavaScript source code.
 *
 * @module min
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';



/**
 * @constructor
 * @extends {GCC}
 * @param {string} name - The task name.
 * @param {string} warning - The task warning.
 * @param {Array=} opt_deps - The optional task dependency tasks.
 */
function MIN(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./gcc'));

  // reuse GCC's constructor
  base.call(this, name, warning, opt_deps);
}


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @return {boolean}
 */
MIN.prototype.canRun = function(pcfg) {
  return !!(pcfg.src && pcfg.dest);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
 */
MIN.prototype.about = function() {
  return '`gulp {id}-min` to minify the source code';
};


/**
 * Inherit from the base GCC base task.
 */
MIN.prototype.__proto__ = require('./gcc').prototype;

(function closure() {
  /**
   * Export an instance of the task
   * @type {MIN}
   */
  module.exports = new MIN('min', 'minifying source code not configured');
}());
