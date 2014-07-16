/**
 * @file
 *
 * ### Responsibilities
 * - Use Google Closure Compiler to type check the JavaScript source code.
 *
 * @module chk
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
function CHK(name, warning, opt_deps) {
  var base = /** @type {Function} */(require('./gcc'));

  // reuse GCC's constructor
  base.call(this, name, warning, opt_deps);
}


/**
 * Check if the project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @return {boolean}
 */
CHK.prototype.canRun = function(pcfg) {
  return !!(pcfg.src && pcfg.types);
};


/**
 * Return information about what the task is for and how to run it.
 * @return {string}
 */
CHK.prototype.about = function() {
  return '`gulp {id}-chk` to type check the source code';
};


/**
 * Inherit from the base GCC base task.
 */
CHK.prototype.__proto__ = require('./gcc').prototype;

(function closure() {
  /**
   * Export an instance of the task
   * @type {CHK}
   */
  module.exports = new CHK('chk', 'type checking source code not configured');
}());
