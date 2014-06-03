/**
 * AQUA API: Gather up the AQUA source code and export it
 * @type {AQUA}
 */
module.exports = {
  tasks: {
    lintjs: require('./src/tasks/lintjs'),
    gpa: require('./src/tasks/gpa'),
    unit: require('./src/tasks/unit')
  },
  error: require('./src/error'),
  config: require('./src/config'),
  init: require('./src/init'),
  log: require('./src/log'),
  util: require('./src/util'),
  validate: require('./src/validate'),
  warn: require('./src/warn'),
  // NPM modules
  colors: require('colors')
};
