/**
 * Export Karma unit test config
 * @param {*} config
 */
module.exports = {
  autoWatch: false,
  singleRun: true,
  reportSlowerThan: 250,

  /*
   dots
   progress
   nyan
   */
  reporters: ['dots'],

  /*
   jasmine
   mocha
   qunit
  */
  frameworks: ['jasmine'],

  /*
   Chrome
   ChromeCanary
   PhantomJS
   Firefox
   Opera
   IE
   Safari
   iOS
   */
  browsers: ['PhantomJS'],

  // code coverage settings
  coverage: {
    // used to generate reports and enforce test coverage thresholds
    reporters: ['html', 'text', 'json']
  }
};
