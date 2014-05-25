/**
 * Export Node.js unit test config
 */
module.exports = {
  // Jasmine runner settings
  jasmine: {
    // If true, display spec names.
    verbose: false,

    // If true, include stack traces in failures.
    includeStackTrace: true,

    // Time to wait in milliseconds before a test automatically fails
    timeout: 250
  },

  // Code coverage settings
  coverage: {
    // report options
    reporters: ['html', 'text', 'json']
  }
};
