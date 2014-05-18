/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA config method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var aqua = require('../../');

describe('config', function() {
  'use strict';

  beforeEach(function() {
    // add spies
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.config).toBeDefined();
  });

  it('should support call chaining', function() {
    // arrange
    // act
    var result = aqua.config();
    // assert
    expect(result).toBe(aqua);
  });

});
