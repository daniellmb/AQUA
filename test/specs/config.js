/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA config method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('config', function() {
  'use strict';

  var config,
      src = '../../src/';

  beforeEach(function() {
    // get method under test
    config = require(src + 'config');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof config).toBe('function');
  });
  it('should set the AQUA config', function() {
    // arrange
    var cfg = {};
    // act
    config(cfg);
    // assert
    expect(global.cfg).toBe(cfg);
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = config();
    // assert
    expect(result).toBe(global);
  });

});
