/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA validate method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var root = '../../',
    aqua = require(root);

describe('util', function() {
  'use strict';

  var util,
      src = '../../src/',
      _ = require('lodash');

  beforeEach(function() {
    // get method under test
    util = require(src + 'util');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof util).toBe('object');
  });

  describe('isDefined', function() {
    beforeEach(function() {
      // add spies
      spyOn(_, 'isUndefined').andCallThrough();
    });

    it('should call is isUndefined', function() {
      // arrange
      // act
      util.isDefined();
      // assert
      expect(_.isUndefined).toHaveBeenCalledWith(undefined);
    });
    it('should return true if value is defined', function() {
      // arrange
      // act
      var result = util.isDefined({});
      // assert
      expect(result).toBe(true);
    });
    it('should return false if value is not defined', function() {
      // arrange
      // act
      var result = util.isDefined();
      // assert
      expect(result).toBe(false);
    });
  });

  it('should export forOwn', function() {
    // arrange
    // act
    // assert
    expect(util.forOwn).toBe(_.forOwn);
  });

  it('should export forEach', function() {
    // arrange
    // act
    // assert
    expect(util.forEach).toBe(_.forEach);
  });

  it('should export assign', function() {
    // arrange
    // act
    // assert
    expect(util.assign).toBe(_.assign);
  });

  it('should export lodash', function() {
    // arrange
    // act
    // assert
    expect(util._).toBe(_);
  });

});
