/**
 * Export Node.js unit test config
 */
module.exports = {
  // jasmine runner settings
  jasmine: {
    // if true, display spec names.
    verbose: false,

    // if true, include stack traces in failures.
    includeStackTrace: true,

    // time to wait in milliseconds before a test automatically fails.
    timeout: 250
  },

  // code coverage settings
  coverage: {
    // used to generate reports and enforce test coverage thresholds.
    reporters: ['html', 'text', 'json', 'lcovonly']
  }
};
