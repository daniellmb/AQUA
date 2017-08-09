/**
 * @file
 *
 * ### Responsibilities
 * This is the logger module for AQUA. It uses [log4js](https://github.com/nomiddlename/log4js-node)
 * to handle and configure all logging that happens inside of AQUA.
 *
 * @module logger
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */

(function closure() {

  var log4js, util, constant;

  /**
   * load dependencies, keeping these in a separate file so they can be mocked more easily
   */
  exports.deps = function() {
    log4js = require('log4js');
    util = require('./util');
    constant = require('./constants');
  };

  /**
   * Setup the logger by passing in the configuration options. It needs three arguments.
   * to allow for fine grained configuration of log4js. For more information
   * see https://github.com/nomiddlename/log4js-node.
   * @param {string} level - Defines the global log level.
   * @param {boolean} colors - Use colors in the stdout or not.
   * @param {Array} appenders - This will be passed as appenders to log4js.
   * */
  exports.setup = function(level, colors, appenders) {

    // get dependencies
    this.deps();

    // turn color on/off on the console appenders with pattern layout
    var pattern = colors ? constant.COLOR_PATTERN : constant.NO_COLOR_PATTERN;

    // if there are no appenders use the default one
    appenders = util.isDefined(appenders) ? appenders : [constant.CONSOLE_APPENDER];

    // set up appenders
    appenders = appenders.map(function(appender) {
      if (appender.type === 'console') {
        if (util.isDefined(appender.layout) && appender.layout.type === 'pattern') {
          appender.layout.pattern = pattern;
        }
      }
      return appender;
    });

    // pass the values to log4js
    log4js.configure({
      appenders: { console: { type: 'console' } },
      categories: { default: { appenders: [ 'console' ], level: level } }
    });
  };

  /**
   * Create a new logger. There are two optional arguments
   * @param {string=} opt_name - Defaults to `aqua`.
   * @param {string=} opt_level - Defaults to the global level.
   * @return {Logger} logger instance
   * */
  exports.create = function(opt_name, opt_level) {
    // get dependencies
    this.deps();

    var name = util.isDefined(opt_name) ? 'aqua-' + opt_name : 'aqua',
        logger = log4js.getLogger(name);

    if (util.isDefined(opt_level)) {
      logger.setLevel(opt_level);
    }

    return logger;
  };

}());
