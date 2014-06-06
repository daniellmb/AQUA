/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA constants.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('logger', function() {
  'use strict';

  var logger,
      rewire = require('rewire'),
      src = '../../src/',
      log4js, constants, instance, mockReq;

  beforeEach(function() {
    // get method under test
    logger = rewire(src + 'logger');

    // mock logger instance
    instance = {
      setLevel: jasmine.createSpy('setLevel').andReturn('setLevel')
    };

    // mock dependencies
    log4js = {
      setGlobalLogLevel: jasmine.createSpy('setGlobalLogLevel').andReturn('setGlobalLogLevel'),
      configure: jasmine.createSpy('configure').andReturn('configure'),
      getLogger: jasmine.createSpy('getLogger').andReturn(instance)
    };

    constants = {
      COLOR_PATTERN: 'COLOR_PATTERN',
      NO_COLOR_PATTERN: 'NO_COLOR_PATTERN',
      CONSOLE_APPENDER: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: 'COLOR_PATTERN'
        }
      }
    };

    // mock require
    mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
      switch (name) {
        case 'log4js': return log4js;
        case './util': return mockUtil();
        case './constants': return constants;
        default: throw 'Unexpected require ' + name;
      }
    });

    // use dependency injection to inject mock require
    logger.__set__('require', mockReq);
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof logger).toBe('object');
  });

  //TODO: finish assertions
  describe('setup', function() {
    beforeEach(function() {
      // add spies
    });

    it('should use color pattern if colors are enabled', function() {
      // arrange
      // act
      logger.setup(undefined, true);
      // assert
    });
    it('should use no color pattern if colors are disabled', function() {
      // arrange
      // act
      logger.setup();
      // assert
    });
    it('should use the provided appenders if set', function() {
      // arrange
      // act
      logger.setup(undefined, undefined, [{}]);
      // assert
    });
    it('should support patterns for console appenders', function() {
      // arrange
      // act
      logger.setup(undefined, undefined, [{type: 'console'}]);
      // assert
    });
    it('should set the appender pattern if supported', function() {
      // arrange
      // act
      logger.setup(undefined, undefined, [constants.CONSOLE_APPENDER]);
      // assert
    });
    it('should set the global logging level', function() {
      // arrange
      // act
      logger.setup('level');
      // assert
      expect(log4js.setGlobalLogLevel).toHaveBeenCalledWith('level');
    });
    it('should configure appenders', function() {
      // arrange
      // act
      // assert
    });
  });

  describe('create', function() {
    beforeEach(function() {
      // add spies
    });

    it('should use the default name of aqua if not set', function() {
      // arrange
      // act
      logger.create();
      // assert
      expect(log4js.getLogger).toHaveBeenCalledWith('aqua');
    });
    it('should prefix the name with aqua if set', function() {
      // arrange
      // act
      logger.create('test');
      // assert
      expect(log4js.getLogger).toHaveBeenCalledWith('aqua-test');
    });
    it('should set the logging level if set', function() {
      // arrange
      // act
      logger.create(undefined, 'level');
      // assert
      expect(instance.setLevel).toHaveBeenCalledWith('level');
    });
    it('should return the logger instance', function() {
      // arrange
      // act
      var result = logger.create();
      // assert
      expect(result).toBe(instance);
    });
  });

});
