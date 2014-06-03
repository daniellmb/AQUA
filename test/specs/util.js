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
      src = '../../src/';

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

});
