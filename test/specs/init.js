/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA init method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var aqua = require('../../');
var rewire = require('rewire');

describe('init', function() {
  'use strict';

  var tasks = aqua.tasks;

  beforeEach(function() {
    // add spies
    Object.keys(tasks).forEach(function(name) {
      spyOn(tasks[name], 'reg');
    });
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(aqua.init).toBeDefined();
  });
  it('should loop through the AQUA configuration files', function() {
    // arrange
    var cfgs = [];
    spyOn(cfgs, 'forEach');
    // act
    aqua.init(cfgs);
    // assert
    expect(cfgs.forEach).toHaveBeenCalled();
  });
  it('should validate the AQUA configuration files', function() {
    // arrange
    var cfg = {};
    spyOn(aqua, 'validate');
    // act
    aqua.init([cfg]);
    // assert
    expect(aqua.validate).toHaveBeenCalledWith(cfg);
  });
  it('should register each task', function() {
    // arrange
    // act
    aqua.init([{}]);
    // assert
    Object.keys(tasks).forEach(function(name) {
      expect(tasks[name].reg).toHaveBeenCalled();
    });
  });
  it('should return the gulp instance', function() {
    // arrange
    var gulp = mockGulp(),
        mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return gulp; }),
        task = rewire('../../src/init');
    task.__set__('require', mockReq);
    // act
    var result = task([]);
    // assert
    expect(result).toBe(gulp);
  });

});
