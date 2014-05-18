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
