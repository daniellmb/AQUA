/*jshint maxstatements: 100*/

var aqua = require('../../');
var colors = require('colors');

describe('warn', function() {
  'use strict';

  beforeEach(function() {
    // add spies
    spyOn(console.log, 'apply');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.warn).toBeDefined();
  });
  it('should prefix the message with "[aqua] WARNING:"', function() {
    // arrange
    var arg;
    // act
    aqua.warn('');
    // assert
    arg = console.log.apply.calls[0].args[1].join(' ');
    expect(arg).toContain('[' + colors.cyan('aqua') + '] \x1B[33mWARNING:');
  });
  it('should put yellow around the warning', function() {
    // arrange
    var arg;
    // act
    aqua.warn('foo');
    // assert
    arg = console.log.apply.calls[0].args[1].join(' ');
    expect(arg).toContain('\x1B[33mWARNING: foo \x1B[39m');
  });
  it('should log to the console', function() {
    // arrange
    // act
    aqua.warn('bar');
    // assert
    expect(console.log.apply).toHaveBeenCalled();
  });
  it('should support call chaining', function() {
    // arrange
    // act
    var result = aqua.warn('baz');
    // assert
    expect(result).toBe(aqua);
  });

});
