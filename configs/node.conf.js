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
    report: {
      reporter: 'html',
      outFile: 'index.html'
    },
    // coverage threshold levels
    enforce: {
      statements: -1,
      blocks: -1,
      lines: -1
    }
  }
};
