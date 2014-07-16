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
      cfg,
      src = '../../src/';

  beforeEach(function() {
    //reset config
    cfg = {
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
      create: jasmine.createSpy('create').andReturn(mockLogger())
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
    config(cfg);
    // assert
    expect(global.cfg).toBe(cfg);
  });
  it('should create the config logger', function() {
    // arrange
    var lcfg = cfg.logging;
    // act
    config(cfg);
    // assert
    expect(global.logger.setup).toHaveBeenCalledWith(lcfg.level, lcfg.colors, lcfg.loggers);
  });
  it('should loop through the tasks', function() {
    // arrange
    // act
    config(cfg);
    // assert
    expect(global.util.forOwn).toHaveBeenCalledWith(global.tasks, jasmine.any(Function));
  });
  it('should configure the task loggers', function() {
    // arrange
    config(cfg);
    var cfgTaskLogger = global.util.forOwn.calls[0].args[1],
        name = 'task-name';
    // act
    cfgTaskLogger(null, name);
    // assert
    expect(global.logger.create).toHaveBeenCalledWith(name);
    expect(global.tasks[name].log).toBeDefined();
  });
  it('should set the AQUA config', function() {
    // arrange
    cfg.logging = undefined;
    // act
    config(cfg);
    // assert
    expect(global.cfg).toBe(cfg);
  });
  it('should support call chaining', function() {
    // arrange
    cfg.logging = undefined;
    // act
    var result = config(cfg);
    // assert
    expect(result).toBe(global);
  });

});
