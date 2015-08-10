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

describe('config', function() {
  var config,
      acfg,
      src = '../../src/';

  beforeEach(function() {
    //reset config
    acfg = {
      logging: {
        level: 'level',
        colors: 'colors',
        loggers: 'loggers'
      }
    };

    // get method under test
    config = require(src + 'config');

    // mock aqua tasks
    global.tasks = {
      'task-name': {}
    };

    // mock aqua logger
    global.logger = {
      setup: jasmine.createSpy('setup'),
      create: jasmine.createSpy('create').and.returnValue(mockLogger())
    };

    // mock aqua util
    global.util = mockUtil();
  });
  afterEach(function() {
    // tear down
    global.tasks = global.logger = global.util = undefined;
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof config).toBe('function');
  });
  it('should configure logging', function() {
    // arrange
    // act
    config(acfg);
    // assert
    expect(global.cfg).toBe(acfg);
  });
  it('should create the config logger', function() {
    // arrange
    var lcfg = acfg.logging;
    // act
    config(acfg);
    // assert
    expect(global.logger.setup).toHaveBeenCalledWith(lcfg.level, lcfg.colors, lcfg.loggers);
  });
  it('should loop through the tasks', function() {
    // arrange
    // act
    config(acfg);
    // assert
    expect(global.util.forOwn).toHaveBeenCalledWith(global.tasks, jasmine.any(Function));
  });
  it('should configure the task loggers', function() {
    // arrange
    config(acfg);
    var cfgTaskLogger = global.util.forOwn.calls.argsFor(0)[1],
        name = 'task-name';
    // act
    cfgTaskLogger(null, name);
    // assert
    expect(global.logger.create).toHaveBeenCalledWith(name);
    expect(global.tasks[name].log).toBeDefined();
  });
  it('should set the AQUA config', function() {
    // arrange
    acfg.logging = undefined;
    // act
    config(acfg);
    // assert
    expect(global.cfg).toBe(acfg);
  });
  it('should support call chaining', function() {
    // arrange
    acfg.logging = undefined;
    // act
    var result = config(acfg);
    // assert
    expect(result).toBe(global);
  });

});
