/*global requirejs*/
/*
 With Karma we don't need to list all test files ourselves as we can easily find them from the files specified.
 Karma includes all the files in window.__karma__.files, so by filtering this array we find all our test files.
 */
var tests = [], files = window.__karma__.files;
for (var file in files) {
  if (files.hasOwnProperty(file)) {
    // check file name convention to see if it's a unit test
    if (/\.spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/demos/requirejs/js/',

  paths: {
    angular: '/base/demos/requirejs/bower_components/angular/angular',
    angularMocks: '/base/demos/requirejs/bower_components/mocks/angular-mocks'

  },

  shim: {
    'angular' : {'exports' : 'angular'},
    'angularMocks': {
      deps:['angular'],
      'exports':'angular.mock'
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});