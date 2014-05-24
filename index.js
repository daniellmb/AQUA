/**
 * AQUA API: Gather up the AQUA source code and export it
 * @type {AQUA}
 */
module.exports = {
  tasks: {
    gpa: require('./src/tasks/gpa'),
    lintjs: require('./src/tasks/lintjs')
  },
  error: require('./src/error'),
  config: require('./src/config'),
  init: require('./src/init'),
  log: require('./src/log'),
  validate: require('./src/validate'),
  warn: require('./src/warn')
};
