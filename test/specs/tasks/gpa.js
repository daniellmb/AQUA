/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA code GPA task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('gpa', function() {
  'use strict';

  var task, aqua, cfg, gulp, ERR_MSG, OK_MSG,
      rewire = require('rewire'),
      root = '../../../',
      src = root + 'src/tasks/';

  beforeEach(function() {
    // get AQUA
    aqua = rewire(root);

    ERR_MSG = 'GPA Check: ' + aqua.colors.yellow('Complexity issues found');
    OK_MSG = 'GPA Check: ' + aqua.colors.green('No issues found');

    // set task under test
    task = rewire(src + 'gpa');

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
    var gpa, mockReq,
        defaults = {
          cyclomatic: [8],
          halstead: [16],
          maintainability: [100]
        };

    beforeEach(function() {
      // mock gpa
      gpa = jasmine.createSpy('gpa').andReturn('bar');

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return gpa; });

      // use dependency injection to inject mock require
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
    it('should provide default complexity thresholds', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gpa).toHaveBeenCalledWith(defaults);
      expect(gulp.pipe).toHaveBeenCalledWith('bar');
    });
    it('should allow overriding the default complexity thresholds', function() {
      // arrange
      var expected = {
        'cyclomatic': [1234],
        'halstead': [4321],
        'maintainability': [1337]
      };
      aqua.cfg = {
        'thresholds': {
          'complexity': {
            'cyclomatic': 1234,
            'halstead': 4321,
            'maintainability': 1337
          }
        }
      };
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gpa).toHaveBeenCalledWith(expected);
      expect(gulp.pipe).toHaveBeenCalledWith('bar');
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
      expect(gulp.on).toHaveBeenCalledWith('error', jasmine.any(Function));
    });
    it('should listen for when the task is finished', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('finish', jasmine.any(Function));
    });

    describe('when error found', function() {
      it('should log "complexity issues found" to the console', function() {
        // arrange
        task.run(aqua, cfg, gulp);
        var onErr = gulp.on.calls[0].args[1];
        // act
        onErr();
        // assert
        expect(aqua.log).toHaveBeenCalledWith(ERR_MSG);
        expect(aqua.error).toHaveBeenCalled();
      });
      it('should not log "no issues found" to the console', function() {
        // arrange
        task.run(aqua, cfg, gulp);
        var onErr = gulp.on.calls[0].args[1],
            onDone = gulp.on.calls[1].args[1];
        // act
        onErr();
        onDone();
        // assert
        expect(aqua.log).not.toHaveBeenCalledWith(OK_MSG);
      });
    });

    describe('when no errors', function() {
      it('should log "no issues found" to the console', function() {
        // arrange
        task.run(aqua, cfg, gulp);
        var onDone = gulp.on.calls[1].args[1];
        // act
        onDone();
        // assert
        expect(aqua.log).toHaveBeenCalledWith(OK_MSG);
      });
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
    it('should create task to check the complexity of the JavaScript source code', function() {
      // arrange
      // act
      task.reg(aqua, cfg, gulp);
      // assert
      expect(gulp.task).toHaveBeenCalledWith('test-gpa', [], jasmine.any(Function));
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
        expect(aqua.warn).toHaveBeenCalledWith('checking source code complexity not configured');
      });
      it('should only run if project is configured properly', function() {
        // arrange
        task.reg(aqua, cfg, gulp);
        arg = gulp.task.calls[0].args[2];
        // act
        arg(done);
        // assert
        expect(task.canRun).toHaveBeenCalledWith(cfg);
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
      // act
      var result = task.canRun(cfg);
      // assert
      expect(result).toBe(true);
    });
    it('should return false if the project is not properly configured', function() {
      // arrange
      // act
      var result = task.canRun({});
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
      expect(result).toBe('`gulp {id}-gpa` to check source code against complexity thresholds');
    });
  });
});
