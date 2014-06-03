/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA init method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('init', function() {
  'use strict';

  var init,
      src = '../../src/',
      rewire = require('rewire');

  beforeEach(function() {
    // get method under test
    init = require(src + 'init');
    global.tasks = {
      unit: {
        reg: jasmine.createSpy('reg')
      }
    };
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof init).toBe('function');
  });
  it('should loop through the AQUA configuration files', function() {
    // arrange
    spyOn(Array.prototype, 'forEach').andCallThrough();
    var cfgs = [];
    // act
    init(cfgs);
    // assert
    expect(cfgs.forEach).toHaveBeenCalled();
  });
  it('should validate the AQUA configuration files', function() {
    // arrange
    var cfg = {};
    global.validate = jasmine.createSpy('validate');
    // act
    init([cfg]);
    // assert
    expect(global.validate).toHaveBeenCalledWith(cfg);
  });
  it('should register each task', function() {
    // arrange
    // act
    init([{}]);
    // assert
    expect(global.tasks.unit.reg).toHaveBeenCalled();
  });
  it('should return the gulp instance', function() {
    // arrange
    var gulp = mockGulp(),
        mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return gulp; }),
        task = rewire(src + 'init');
    task.__set__('require', mockReq);
    // act
    var result = task([]);
    // assert
    expect(result).toBe(gulp);
  });

});
