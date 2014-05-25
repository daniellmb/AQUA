/**
 * Export Karma unit test config
 * @param {*} config
 */
module.exports = function(config) {

  config.set({
    basePath: '../',

    reporters: ['dots', 'coverage'],

    //preprocessors: source_coverage,

    coverageReporter: {
      reporters: [{
        type: 'text',
        //TODO fix to support more than one project!
        dir: 'coverage/aqaw'
      }, {
        type: 'html',
        //TODO fix to support more than one project!
        dir: 'coverage/aqaw'
      }]
    },

    colors: true,

    autoWatch: false,

    singleRun: false,

    logLevel: config.LOG_INFO,

    captureTimeout: 60000,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ]
  });
};
