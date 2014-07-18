/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA init method.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('init', function() {
  var init,
      src = '../../src/',
      rewire = require('rewire'),
      cfg,
      cfgs;

  beforeEach(function() {
    // get method under test
    init = require(src + 'init');

    // mock project config
    cfg = {
      id: 'TEST'
    };

    // mock aqua project configs
    cfgs = [];

    // mock aqua tasks
    global.tasks = {
      test: {
        reg: jasmine.createSpy('reg'),
        about: jasmine.createSpy('about').andReturn('{id}')
      }
    };

    // mock aqua logger
    global.logger = {
      create: jasmine.createSpy('create').andReturn(mockLogger())
    };

    // mock aqua validate
    global.validate = jasmine.createSpy('validate');

    // mock aqua util
    global.util = mockUtil();
  });
  afterEach(function() {
    // tear down
    global.tasks = global.logger = global.validate = global.util = undefined;
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof init).toBe('function');
  });
  it('should loop through the AQUA configuration objects', function() {
    // arrange
    spyOn(Array.prototype, 'forEach').andCallThrough();
    // act
    init(cfgs);
    // assert
    expect(cfgs.forEach).toHaveBeenCalled();
  });
  it('should create the init logger', function() {
    // arrange
    // act
    init(cfgs);
    // assert
    expect(global.logger.create).toHaveBeenCalledWith('init');
  });
  it('should validate the AQUA configuration settings', function() {
    // arrange
    cfgs.push(cfg);
    // act
    init(cfgs);
    // assert
    expect(global.validate).toHaveBeenCalledWith(cfg);
  });
  it('should loop through the tasks', function() {
    // arrange
    cfgs.push(cfg);
    // act
    init(cfgs);
    // assert
    expect(global.util.forOwn).toHaveBeenCalledWith(global.tasks, jasmine.any(Function));
  });
  it('should register each task', function() {
    // arrange
    var cfgTaskLogger, name = 'test', gulp = require('gulp');
    cfgs.push(cfg);
    init(cfgs);
    cfgTaskLogger = global.util.forOwn.calls[0].args[1];
    // act
    cfgTaskLogger(null, name);
    // assert
    expect(global.tasks[name].reg).toHaveBeenCalledWith(global, cfg, gulp);
  });
  it('should use about to debug the task', function() {
    // arrange
    var cfgTaskLogger, name = 'test';
    cfgs.push(cfg);
    init(cfgs);
    cfgTaskLogger = global.util.forOwn.calls[0].args[1];
    // act
    cfgTaskLogger(null, name);
    // assert
    expect(global.tasks[name].about).toHaveBeenCalled();
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
