/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA unit task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

var rewire = require('rewire');

describe('unit', function() {
  'use strict';
  var aqua, cfg, gulp, task;

  beforeEach(function() {
    // get AQUA
    aqua = require('../../../');

    task = aqua.tasks.unit;

    // set aqua config
    aqua.config({});

    // mock project config
    cfg = {
      id: 'TEST'
    };

    // mock gulp
    gulp = mockGulp();

    // add spies
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof task).toBe('object');
  });

  describe('collect', function() {
    // start with "sourceonly"
    // check for globals
    // check for deps
    // check for mocks
    // add source and spec files
    // return the list
  });

  describe('testWeb', function() {
    // load dependencies
    // collect files
    // run unit tests with karma
  });

  describe('testNode', function() {
    // load dependencies
    // collect files
    // set the coverage output dir based on the config
    // make sure coverage folder exists
    // instrument source code for coverage
    // run unit tests with gulp-jasmine runner
    // gather coverage data
    // enforce coverage thresholds
    // listen for errors
    // create code coverage report
  });

  describe('run', function() {

    beforeEach(function() {
      // add spies
      spyOn(aqua, 'error');
      spyOn(task, 'collect');
      spyOn(task, 'testWeb');
      spyOn(task, 'testNode');
    });

    it('should default project type to web', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.testWeb).toHaveBeenCalled();
    });
    it('should support testing web projects', function() {
      // arrange
      cfg.type = 'web';
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.testWeb).toHaveBeenCalled();
    });
    it('should support testing node.js projects', function() {
      // arrange
      cfg.type = 'nodejs';
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.testNode).toHaveBeenCalled();
    });
    it('should show a warning for unsupported project types', function() {
      // arrange
      cfg.type = 'foo';
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(aqua.error).toHaveBeenCalledWith('unsupported project type:', 'foo');
    });
  });

  describe('reg', function() {

    beforeEach(function() {
      // add spies
    });

    it('should register the project with AQUA', function() {
      // arrange
      // act
      // assert
    });
    it('should create task to run all the unit tests in the project', function() {
      // arrange
      // act
      task.reg(aqua, cfg, gulp);
      // assert
      expect(gulp.task).toHaveBeenCalledWith('test-unit', [], jasmine.any(Function));
    });

    describe('gulp task', function() {
      var arg, done, canRun;

      beforeEach(function() {
        canRun = true;
        // add spies
        done = jasmine.createSpy('done');
        spyOn(aqua, 'warn');
        spyOn(task, 'canRun').andCallFake(function() {
          return canRun;
        });
        spyOn(task, 'run');
      });
      it('should show warning if not supported', function() {
        // arrange
        canRun = false;
        task.reg(aqua, cfg, gulp);
        arg = gulp.task.calls[0].args[2];
        // act
        arg(done);
        // assert
        expect(aqua.warn).toHaveBeenCalledWith('unit testing source code not configured');
      });
      it('should only run if project is configured properly', function() {
        // arrange
        task.reg(aqua, cfg, gulp);
        arg = gulp.task.calls[0].args[2];
        // act
        arg(done);
        // assert
        expect(task.canRun).toHaveBeenCalledWith(cfg, aqua.cfg);
      });
      it('should run the done callback', function() {
        // arrange
        task.reg(aqua, cfg, gulp);
        arg = gulp.task.calls[0].args[2];
        // act
        arg(done);
        // assert
        expect(done).toHaveBeenCalled();
      });
    });
  });

  describe('canRun', function() {

    it('should return true if the task can run', function() {
      // arrange
      cfg.src = [];
      cfg.unit = {};
      aqua.cfg.testing = {
        web: 'path'
      };
      // act
      var result = task.canRun(cfg, aqua.cfg);
      // assert
      expect(result).toBe(true);
    });
    it('should return false if the project is not properly configured', function() {
      // arrange
      // act
      var result = task.canRun({}, {});
      // assert
      expect(result).toBe(false);
    });
  });

  describe('about', function() {
    it('should return information about the task', function() {
      // arrange
      // act
      var result = task.about();
      // assert
      expect(result).toBe('`gulp {id}-unit` to run unit tests against the source code');
    });
  });
});
