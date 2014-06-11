/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA base task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('base', function() {
  'use strict';

  var task, aqua, cfg, gulp, ERR_MSG, OK_MSG,
      rewire = require('rewire'),
      root = '../../../',
      src = root + 'src/tasks/';

  beforeEach(function() {
    var Task;

    // get AQUA
    aqua = rewire(root);

    ERR_MSG = 'Lint Check: ' + aqua.colors.yellow('Lint errors found');
    OK_MSG = 'Lint Check: ' + aqua.colors.green('No errors found');

    // set task under test
    Task = rewire(src + 'base');
    task = new Task('task', 'task warning');

    // set aqua config to nothing
    aqua.config({});

    // mock project config
    cfg = {
      id: 'TEST'
    };

    // mock gulp
    gulp = mockGulp();

    // add spies
    spyOn(aqua, 'log');
    spyOn(aqua, 'error');
    spyOn(aqua, 'warn');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof task).toBe('object');
  });

  describe('run', function() {
    it('should throw not implemented', function() {
      // arrange
      // act
      function shouldThrow() {
        task.run();
      }
      // assert
      expect(shouldThrow).toThrow(new Error('Run Not Implemented'));
    });
  });

  describe('reg', function() {

    it('should register the project with AQUA', function() {
      // arrange
      // act
      // assert
    });
    it('should create task to lint all JavaScript in the project', function() {
      // arrange
      // act
      task.reg(aqua, cfg, gulp);
      // assert
      expect(gulp.task).toHaveBeenCalledWith('test-task', [], jasmine.any(Function));
    });

    describe('gulp task', function() {
      var arg, done, canRun;

      beforeEach(function() {
        canRun = true;
        // add spies
        done = jasmine.createSpy('done');
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
        expect(aqua.warn).toHaveBeenCalledWith('task warning');
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
    it('should throw not implemented', function() {
      // arrange
      // act
      function shouldThrow() {
        task.canRun();
      }
      // assert
      expect(shouldThrow).toThrow(new Error('Can Run Not Implemented'));
    });
  });

  describe('about', function() {
    it('should throw not implemented', function() {
      // arrange
      // act
      function shouldThrow() {
        task.about();
      }
      // assert
      expect(shouldThrow).toThrow(new Error('About Not Implemented'));
    });
  });
});
