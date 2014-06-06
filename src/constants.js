/**
 * @file
 *
 * ### Responsibilities
 * - AQUA constant values
 *
 * @module constants
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */

(function closure() {

  // export AQUA version
  (function version() {
    var fs = require('fs'),
        pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json').toString());

    exports.VERSION = pkg.version;
  }());

  // export log levels
  (function logLevels() {
    // log levels
    exports.LOG_DISABLE = 'OFF';
    exports.LOG_ERROR = 'ERROR';
    exports.LOG_WARN = 'WARN';
    exports.LOG_INFO = 'INFO';
    exports.LOG_DEBUG = 'DEBUG';
  }());

  // export logging patterns
  (function patterns() {
    /*
     * PatternLayout
     * Format for specifiers is %[padding].[truncation][field]{[format]}
     * e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
     * Fields can be any of:
     *  - %r time in toLocaleTimeString format
     *  - %p log level
     *  - %c log category
     *  - %h hostname
     *  - %m log data
     *  - %d date in various formats
     *  - %% %
     *  - %n newline
     *  - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
     * You can use %[ and %] to define a colored block.
     */
    // default patterns for the pattern layout.
    exports.COLOR_PATTERN = '%[%p [%c]: %]%m';
    exports.NO_COLOR_PATTERN = '%p [%c]: %m';
  }());

  // export console appender
  (function consoleAppender() {
    // default console appender
    exports.CONSOLE_APPENDER = {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: exports.COLOR_PATTERN
      }
    };
  }());

}());
