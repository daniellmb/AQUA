/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA config method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('log', function() {
  var log,
      src = '../../src/',
      colors = require('colors'),
      rewire = require('rewire'),
      apply;

  beforeEach(function() {
    apply = jasmine.createSpy('apply');

    global.colors = colors;

    // use dependency injection to inject mock require
    log = rewire(src + 'log');
    log.__set__({
      console: {
        log: {
          apply: apply
        }
      }
    });
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof log).toBe('function');
  });
  it('should prefix the message with "[aqua]"', function() {
    // arrange
    var arg;
    // act
    log('');
    // assert
    arg = apply.calls.argsFor(0)[1].join(' ');
    expect(arg).toContain('[' + colors.cyan('aqua') + '] ');
  });
  it('should log to the console', function() {
    // arrange
    // act
    log('bar');
    // assert
    expect(apply).toHaveBeenCalled();
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = log('baz');
    // assert
    expect(result).toBe(global);
  });

});
