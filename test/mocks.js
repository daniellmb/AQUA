/**
 * @file
 *
 * ### Responsibilities
 * - create reusable mocks for unit testing
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
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
