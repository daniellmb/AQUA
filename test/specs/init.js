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
      pcfg,
      pcfgs;

  beforeEach(function() {
    // get method under test
    init = require(src + 'init');

    // mock project config
    pcfg = {
      id: 'TEST'
    };

    // mock aqua project configs
    pcfgs = [];

    // mock aqua tasks
    global.tasks = {
      test: {
        reg: jasmine.createSpy('reg'),
        about: jasmine.createSpy('about').and.returnValue('{id}')
      }
    };

    // mock aqua logger
    global.logger = {
      create: jasmine.createSpy('create').and.returnValue(mockLogger())
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
    spyOn(Array.prototype, 'forEach').and.callThrough();
    // act
    init(pcfgs);
    // assert
    expect(pcfgs.forEach).toHaveBeenCalled();
  });
  it('should create the init logger', function() {
    // arrange
    // act
    init(pcfgs);
    // assert
    expect(global.logger.create).toHaveBeenCalledWith('init');
  });
  it('should validate the AQUA configuration settings', function() {
    // arrange
    pcfgs.push(pcfg);
    // act
    init(pcfgs);
    // assert
    expect(global.validate).toHaveBeenCalledWith(pcfg);
  });
  it('should loop through the tasks', function() {
    // arrange
    pcfgs.push(pcfg);
    // act
    init(pcfgs);
    // assert
    expect(global.util.forOwn).toHaveBeenCalledWith(global.tasks, jasmine.any(Function));
  });
  it('should register each task', function() {
    // arrange
    var cfgTaskLogger, name = 'test', gulp = require('gulp');
    pcfgs.push(pcfg);
    init(pcfgs);
    cfgTaskLogger = global.util.forOwn.calls.argsFor(0)[1];
    // act
    cfgTaskLogger(null, name);
    // assert
    expect(global.tasks[name].reg).toHaveBeenCalledWith(global, pcfg, gulp);
  });
  it('should use about to debug the task', function() {
    // arrange
    var cfgTaskLogger, name = 'test';
    pcfgs.push(pcfg);
    init(pcfgs);
    cfgTaskLogger = global.util.forOwn.calls.argsFor(0)[1];
    // act
    cfgTaskLogger(null, name);
    // assert
    expect(global.tasks[name].about).toHaveBeenCalled();
  });
  it('should return the gulp instance', function() {
    // arrange
    var gulp = mockGulp(),
        mockReq = jasmine.createSpy('mockReq').and.callFake(function() { return gulp; }),
        task = rewire(src + 'init');
    task.__set__('require', mockReq);
    // act
    var result = task([]);
    // assert
    expect(result).toBe(gulp);
  });

});
