/**
 * Type definition for gulp instance.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
Gulp
@constructor
@nosideeffects
*/
var Gulp = function() { };


/**
Registers a task
@param {string} name - gulp task name
@param {Array} deps - optional list of dependencies to run first
@param {Function} fn - function to run
@return {Gulp}
*/
Gulp.prototype.task = function(name, deps, fn) { return this; };


/**
Runs a function when a file that matches the glob changes
@param {...*} var_args - see [API docs](https://github.com/gulpjs/gulp/blob/master/docs/API.md) for params
@return {Gulp}
*/
Gulp.prototype.watch = function(var_args) { return this; };


/**
Takes a file system glob (like grunt) and starts emitting files that match
@param {string|Array} glob - glob pattern, see [node-glob](https://github.com/isaacs/node-glob)
@return {Gulp}
*/
Gulp.prototype.src = function(glob) { return this; };


/**
File objects piped to this are saved to the file system
@param {string} folder - folder to write the stream to
@return {Gulp}
*/
Gulp.prototype.dest = function(folder) { return this; };


/**
Pipe the stream into a function
@param {*} input - input function
@return {Gulp}
*/
Gulp.prototype.pipe = function(input) { return this; };


/**
Listen for events
@param {string} name - event name
@param {Function} fn - function to call
@return {Gulp}
*/
Gulp.prototype.on = function(name, fn) { return this; };
