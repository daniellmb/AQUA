/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA code GPA task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*gpa maxstatements: 100*/

var aqua = require('../../../');
var rewire = require('rewire');

describe('gpa', function() {
  'use strict';
  var cfg, gulp;

  beforeEach(function() {
    // mock config
    cfg = {
      id: 'TEST'
    };

    //mock gulp
    gulp = mockGulp();

    // add spies
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof aqua.tasks.gpa).toBe('object');
  });

  describe('run', function() {
    var gpa, task, mockReq;

    beforeEach(function() {
      // mock gpa
      gpa = jasmine.createSpy('gpa').andReturn('bar');

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return gpa; });

      // use dependency injection to inject mock require
      task = rewire('../../../src/tasks/gpa');
      task.__set__('require', mockReq);
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-complexity');
    });
    it('should look up the javascript source code', function() {
      // arrange
      cfg.src = 'pathtosrc';
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith('pathtosrc');
    });
    it('should check the complexity of the JavaScript source code', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gpa).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('bar');
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.error);
    });
  });

  describe('reg', function() {
    var task;

    beforeEach(function() {
      task = aqua.tasks.gpa;
    });

    it('should register the project with AQUA', function() {
      // arrange
      // act
      // assert
    });
    it('should create task to check the complexity of the JavaScript source code', function() {
      // arrange
      // act
      task.reg(aqua, cfg, gulp);
      // assert
      expect(gulp.task).toHaveBeenCalledWith('test-gpa', [], jasmine.any(Function));
    });

    describe('gulp task', function() {
      var arg, done;

      beforeEach(function() {
        // add spies
        done = jasmine.createSpy('done');
        spyOn(aqua, 'warn');
        spyOn(task, 'run');
      });
      it('should show warning if not supported', function() {
        // arrange
        task.reg(aqua, cfg, gulp);
        arg = gulp.task.calls[0].args[2];
        // act
        arg(done);
        // assert
        expect(aqua.warn).toHaveBeenCalledWith('checking source code complexity not configured');
      });
      it('should only run if project is configured properly', function() {
        // arrange
        cfg.src = [];
        task.reg(aqua, cfg, gulp);
        arg = gulp.task.calls[0].args[2];
        // act
        arg(done);
        // assert
        expect(task.run).toHaveBeenCalledWith(aqua, cfg, gulp);
        expect(aqua.warn).not.toHaveBeenCalled();
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

  describe('about', function() {
    it('should return information about the task', function() {
      // arrange
      // act
      var result = aqua.tasks.gpa.about();
      // assert
      expect(result).toBe('`gulp {id}-gpa` to check source code against complexity thresholds');
    });
  });
});
