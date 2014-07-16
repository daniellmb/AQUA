/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA error method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('error', function() {
  var error,
      src = '../../src/',
      rewire = require('rewire'),
      log;

  beforeEach(function() {
    log = jasmine.createSpy();

    // use dependency injection to inject mock require
    error = rewire(src + 'error');
    error.__set__({
      console: {
        log: log
      }
    });
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof error).toBe('function');
  });
  it('should beep to sound', function() {
    // arrange
    // act
    error();
    // assert
    expect(log).toHaveBeenCalledWith('\x07');
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = error();
    // assert
    expect(result).toBe(global);
  });

});
