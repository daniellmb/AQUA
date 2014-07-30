/**
 * @file
 *
 * ### Responsibilities
 * - base AQUA task
 *
 * @module base
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';



/**
 * Base AQUA task.
 * @constructor
 * @implements {Task}
 * @param {string} name - The task name.
 * @param {string} warning - The task config warning.
 * @param {Array=} opt_deps - The optional task dependency tasks.
 */
var Base = function(name, warning, opt_deps) {
  this.name = name;
  this.warning = warning;
  this.deps = opt_deps || [];
};

Base.prototype = {
  /**
   * Create Project Task to lint source code
   * @param {!AQUA} aqua - AQUA instance.
   * @param {!ProjConfig} pcfg - AQUA project configuration.
   * @param {!Gulp} gulp - Gulp instance.
   */
  reg: function(aqua, pcfg, gulp) {
    var id = pcfg.id.toLowerCase(),
        task = this;

    // debug task registrations
    //aqua.logger.create().debug('create task', id + '-' + task.name, task.deps);

    //TODO: register the project with AQUA

    // create task to lint all JavaScript in the project
    gulp.task(id + '-' + task.name, this.deps, function(done) {
      // check if project is configured properly
      if (task.canRun(pcfg, aqua.cfg)) {
        // run the task
        task.run(aqua, pcfg, gulp);
      } else {
        aqua.warn(task.warning);
      }
      done();
    });
  },

  // the following methods are implemented in derived tasks
  run: function() {
    throw new Error('Run Not Implemented');
  },
  canRun: function() {
    throw new Error('Can Run Not Implemented');
  },
  about: function() {
    throw new Error('About Not Implemented');
  }
};


/**
 * Expose Base.
 */
module.exports = Base;
