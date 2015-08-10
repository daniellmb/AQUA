/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA warn method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('warn', function() {
  var warn,
      src = '../../src/',
      colors = require('colors'),
      rewire = require('rewire'),
      apply;

  beforeEach(function() {
    apply = jasmine.createSpy('apply');

    global.colors = colors;

    // use dependency injection to inject mock require
    warn = rewire(src + 'warn');
    warn.__set__({
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
    expect(typeof warn).toBe('function');
  });

  it('should prefix the message with "[aqua] WARNING:"', function() {
    // arrange
    var arg;
    // act
    warn('');
    // assert
    arg = apply.calls.argsFor(0)[1].join(' ');
    expect(arg).toContain('[' + colors.cyan('aqua') + '] \x1B[33mWARNING:');
  });
  it('should put yellow around the warning', function() {
    // arrange
    var arg;
    // act
    warn('foo');
    // assert
    arg = apply.calls.argsFor(0)[1].join(' ');
    expect(arg).toContain('\x1B[33mWARNING: foo \x1B[39m');
  });
  it('should log to the console', function() {
    // arrange
    // act
    warn('bar');
    // assert
    expect(apply).toHaveBeenCalled();
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = warn();
    // assert
    expect(result).toBe(global);
  });

});
