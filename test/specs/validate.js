/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA validate method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('validate', function() {
  'use strict';

  var validate,
      src = '../../src/';

  beforeEach(function() {
    // get method under test
    validate = require(src + 'validate');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof validate).toBe('function');
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = validate();
    // assert
    expect(result).toBe(global);
  });

});
