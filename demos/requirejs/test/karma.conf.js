/**
 * Export Karma unit test config
 * @param {*} config
 */
module.exports = {
  basePath: '',

  /*
   list of files / patterns to load in the browser
   */
  files: require('../aqua.project').unit.deps.concat([
    { pattern: './demos/requirejs/js/**/*.js', included: false },
    { pattern: './demos/requirejs/test/**/*.spec.js', included: false },
    // needs to be last
    './demos/requirejs/test/test-main.js'
  ]),

  exclude: [
    './demos/requirejs/js/main.js'
  ],

  /*
   Test results reporter to use:
   dots, progress, nyan, story
   */
  reporters: ['dots'],

  /*
   Frameworks to use:
   jasmine, mocha, qunit, requirejs
   */
  frameworks: ['jasmine', 'requirejs'],

  /*
   SauceLabs browsers above or locally installed:
   Chrome, ChromeCanary, PhantomJS, Firefox, Opera, IE, Safari, iOS
   */
  browsers: ['PhantomJS'],

  // code coverage settings
  coverage: {
    // html, lcovonly, lcov, cobertura, text-summary, text, json, teamcity, clover
    reporters: ['html', 'text']
  },

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // Continuous Integration mode: if true, it capture browsers, run tests and exit
  singleRun: true,

  // report slow running tests, time in ms
  reportSlowerThan: 250
};