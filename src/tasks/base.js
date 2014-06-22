/**
 * @file
 *
 * ### Responsibilities
 * - base AQUA task
 *
 * @module base
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



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
  run: function() {
    throw new Error('Run Not Implemented');
  },
  canRun: function() {
    throw new Error('Can Run Not Implemented');
  },
  about: function() {
    throw new Error('About Not Implemented');
  },


  /**
   * Create Project Task to lint source code
   * @param {!AQUA} aqua - AQUA instance.
   * @param {!ProjConfig} cfg - AQUA project configuration.
   * @param {!Gulp} gulp - Gulp instance.
   */
  reg: function(aqua, cfg, gulp) {
    var id = cfg.id.toLowerCase(),
        task = this;

    // debug task registrations
    //aqua.logger.create().debug('create task', id + '-' + task.name, task.deps);

    //TODO: register the project with AQUA

    // create task to lint all JavaScript in the project
    gulp.task(id + '-' + task.name, this.deps, function(done) {
      // check if project is configured properly
      if (task.canRun(cfg, aqua.cfg)) {
        // run the task
        task.run(aqua, cfg, gulp);
      } else {
        aqua.warn(task.warning);
      }
      done();
    });
  }
};


/**
 * Expose Base.
 */
module.exports = Base;
