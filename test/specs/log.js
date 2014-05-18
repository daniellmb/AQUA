/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA config method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var aqua = require('../../');
var colors = require('colors');

describe('log', function() {
  'use strict';

  beforeEach(function() {
    // add spies
    spyOn(console.log, 'apply');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.log).toBeDefined();
  });
  it('should prefix the message with "[aqua]"', function() {
    // arrange
    var arg;
    // act
    aqua.log('');
    // assert
    arg = console.log.apply.calls[0].args[1].join(' ');
    expect(arg).toContain('[' + colors.cyan('aqua') + '] ');
  });
  it('should log to the console', function() {
    // arrange
    // act
    aqua.log('bar');
    // assert
    expect(console.log.apply).toHaveBeenCalled();
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = aqua.log('baz');
    // assert
    expect(result).toBe(aqua);
  });

});
