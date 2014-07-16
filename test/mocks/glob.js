/**
 * @file
 *
 * ### Responsibilities
 * - create reusable glob mock for unit testing
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


/**
 * Create a mock glob instance
 * @this {Object}
 * @return {{sync: (!jasmine.Spy)}}
 */
global.mockGlob = function() {
  return {
    'sync': jasmine.createSpy('task').andCallFake(function(pattern) { return [pattern]; })
  };
};
