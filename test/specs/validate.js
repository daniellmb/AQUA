/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA validate method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var aqua = require('../../');

describe('validate', function() {
  'use strict';

  beforeEach(function() {
    // add spies
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.validate).toBeDefined();
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = aqua.validate({});
    // assert
    expect(result).toBe(aqua);
  });

});
