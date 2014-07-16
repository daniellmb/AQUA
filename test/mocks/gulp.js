/**
 * @file
 *
 * ### Responsibilities
 * - create reusable gulp mock for unit testing
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


/**
 * Create a mock gulp instance
 * @this {Object}
 * @return {{task: (!jasmine.Spy), src: (!jasmine.Spy), pipe: (!jasmine.Spy), on: (!jasmine.Spy)}}
 */
global.mockGulp = function() {
  return {
    'task': jasmine.createSpy('task').andCallFake(function() { return this; }),
    'src': jasmine.createSpy('src').andCallFake(function() { return this; }),
    'pipe': jasmine.createSpy('pipe').andCallFake(function() { return this; }),
    'on': jasmine.createSpy('on').andCallFake(function() { return this; }),
    'dest': jasmine.createSpy('dest').andCallFake(function() { return this; })
  };
};
