/**
 * @file
 *
 * ### Responsibilities
 * - create reusable util mock for unit testing
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


/**
 * Create a mock lodash instance
 * @return {{forOwn: (!jasmine.Spy), forEach: (!jasmine.Spy)}}
 */
global.mockLodash = function() {
  return {
    'forOwn': jasmine.createSpy('forOwn'),
    'forEach': jasmine.createSpy('forEach'),
    'assign': jasmine.createSpy('assign')
  };
};


/**
 * Create a mock AQUA util instance
 * @return {{forOwn: (!jasmine.Spy, forEach: (!jasmine.Spy, _: (!jasmine.Spy)}
 */
global.mockUtil = function() {
  var _ = mockLodash();
  return {
    isDefined: jasmine.createSpy('isDefined').andCallFake(function(value) {
      return !require('lodash').isUndefined(value);
    }),
    'forOwn': _.forOwn,
    'forEach': _.forEach,
    'assign': _.assign,
    '_': _
  };
};
