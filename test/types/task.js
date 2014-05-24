/**
 * Type definition for AQUA task.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
AQUA command interface
@interface
*/
function Task() { }


/**
Executes the task
@param {!AQUA} aqua - AQUA instance.
@param {!Config} cfg AQUA project config file.
@param {!Gulp} gulp - Gulp instance.
*/
Task.prototype.run = function(aqua, cfg, gulp) { };


/**
Registers the task with AQUA
@param {!AQUA} aqua - AQUA instance.
@param {!Config} cfg - AQUA project config file.
@param {!Gulp} gulp - Gulp instance.
*/
Task.prototype.reg = function(aqua, cfg, gulp) { };


/**
Information about what the task is for and how to run it.
@return {string}
*/
Task.prototype.about = function() { };
