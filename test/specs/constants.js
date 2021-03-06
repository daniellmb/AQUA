/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA constants.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('constants', function() {
  var constants,
      src = '../../src/';

  beforeEach(function() {
    // get method under test
    constants = require(src + 'constants');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof constants).toBe('object');
  });

});
