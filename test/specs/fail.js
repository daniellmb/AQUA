/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA fail method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('fail', function() {
  var fail,
      src = '../../src/',
      rewire = require('rewire'),
      exit;

  beforeEach(function() {
    global.error = jasmine.createSpy('error');
    exit = jasmine.createSpy('exit');

    // use dependency injection to inject mock require
    fail = rewire(src + 'fail');
    fail.__set__({
      process: {
        exit: exit
      }
    });
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof fail).toBe('function');
  });
  it('should set the process exit code to 1', function() {
    // arrange
    // act
    fail();
    // assert
    expect(exit).toHaveBeenCalledWith(1);
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = fail();
    // assert
    expect(result).toBe(global);
  });

});
