/**
 * Type definition for AQUA task.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * AQUA command interface
 * @interface
 */
function Task() { }


/**
 * Executes the task
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {!Gulp} gulp - Gulp instance.
 */
Task.prototype.run = function(aqua, pcfg, gulp) { };


/**
 * Registers the task with AQUA
 * @param {!AQUA} aqua - AQUA instance.
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {!Gulp} gulp - Gulp instance.
 */
Task.prototype.reg = function(aqua, pcfg, gulp) { };


/**
 * Check if a project is properly configured to run the task
 * @param {!ProjConfig} pcfg - AQUA project config JSON.
 * @param {AquaConfig=} opt_acfg - optional AQUA config JSON.
 * @return {boolean}
 */
Task.prototype.canRun = function(pcfg, opt_acfg) { };


/**
 * Information about what the task is for and how to run it.
 * @return {string}
 */
Task.prototype.about = function() { };
