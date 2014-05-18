/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA error method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var aqua = require('../../');

describe('error', function() {
  'use strict';

  beforeEach(function() {
    // add spies
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.error).toBeDefined();
  });

  it('should support call chaining', function() {
    // arrange
    // act
    var result = aqua.error();
    // assert
    expect(result).toBe(aqua);
  });

});
