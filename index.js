/**
 * AQUA API: Gather up the AQUA source code and export it
 * @type {AQUA}
 */
module.exports = {
  tasks: {
    // tasks are listed in the order they should run
    lintjs: require('./src/tasks/lintjs'),
    gpa: require('./src/tasks/gpa'),
    doc: require('./src/tasks/doc'),
    unit: require('./src/tasks/unit'),
    chk: require('./src/tasks/chk'),
    min: require('./src/tasks/min'),
    e2e: require('./src/tasks/e2e')
  },
  config: require('./src/config'),
  constants: require('./src/constants'),
  fail: require('./src/fail'),
  init: require('./src/init'),
  logger: require('./src/logger'),
  util: require('./src/util'),
  validate: require('./src/validate'),
  // NPM modules
  colors: require('colors'),
  // DEPRECATED
  log: require('./src/log'),
  warn: require('./src/warn'),
  error: require('./src/error')
};
