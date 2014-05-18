/**
 * Gulp mocks for unit testing
 * @type {{task: (!jasmine.Spy|*), src: (!jasmine.Spy|*), pipe: (!jasmine.Spy|*), on: (!jasmine.Spy|*)}}
 */


/**
 * Create a mock gulp instance
 * @return {{task: (!jasmine.Spy), src: (!jasmine.Spy), pipe: (!jasmine.Spy), on: (!jasmine.Spy)}}
 */
global.mockGulp = function() {
  var gulp = {
    'task': jasmine.createSpy('task').andCallFake(function() { return gulp; }),
    'src': jasmine.createSpy('src').andCallFake(function() { return gulp; }),
    'pipe': jasmine.createSpy('pipe').andCallFake(function() { return gulp; }),
    'on': jasmine.createSpy('on').andCallFake(function() { return gulp; })
  };

  return gulp;
};
