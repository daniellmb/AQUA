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

describe('util', function() {
  'use strict';

  beforeEach(function() {
    // add spies
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.util).toBeDefined();
  });

  describe('mkdirParent', function() {
    it('should exist', function() {
      // arrange
      // act
      // assert
      expect(typeof aqua.util.mkdirParent).toBe('function');
    });
    it('should support call chaining', function() {
      // arrange
      // act
      var result = aqua.util.mkdirParent();
      // assert
      expect(result).toBe(aqua.util);
    });
  });

});
