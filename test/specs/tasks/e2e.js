/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA E2E (aka end-to-end) task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('e2e', function() {
  var task, aqua, pcfg, gulp,
      rewire = require('rewire'),
      root = '../../../',
      src = root + 'src/tasks/';

  beforeEach(function() {
    // get AQUA
    aqua = rewire(root);

    // set task under test
    task = rewire(src + 'e2e');

    // set aqua config to nothing
    aqua.config({});

    // mock project config
    pcfg = {
      id: 'TEST'
    };

    // mock gulp
    gulp = mockGulp();

    // add spies
    spyOn(aqua, 'log');
    spyOn(aqua, 'warn');
    spyOn(aqua, 'error');
    spyOn(aqua, 'fail');
  });

  it('should exist', function() {
    // arrange
    // act
    // assert
    expect(typeof task).toBe('object');
  });

  describe('run', function() {
    var e2e, mockReq;

    beforeEach(function() {
      // mock e2e
      e2e = jasmine.createSpy('e2e').and.returnValue('baz');
      e2e.protractor = jasmine.createSpy('e2e').and.returnValue('boz');

      // extend mock project config
      pcfg.e2e = {
        tests: 'tests',
        testing: {
          e2e: 'e2e'
        }
      };

      // extend mock aqua config
      aqua.cfg = {
        testing: {
          e2e: 'e2e'
        }
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function() { return e2e; });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-protractor');
    });
    it('should look up the end to end tests', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(pcfg.e2e.tests);
    });
    it('should run the end to end tests', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(e2e.protractor).toHaveBeenCalledWith({
        configFile: aqua.cfg.testing.e2e
      });
      expect(gulp.pipe).toHaveBeenCalledWith('boz');
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', jasmine.any(Function));
    });

    describe('when error found', function() {
      it('should call AQUA fail', function() {
        // arrange
        task.run(aqua, pcfg, gulp);
        var onErr = gulp.on.calls.argsFor(0)[1];
        // act
        onErr();
        // assert
        expect(aqua.fail).toHaveBeenCalled();
      });
    });

  });

  describe('canRun', function() {
    it('should return true if the task can run', function() {
      // arrange
      // extend mock project config
      pcfg.e2e = {
        tests: 'tests',
        testing: {
          e2e: 'e2e'
        }
      };
      // extend mock aqua config
      var acfg = {
        testing: {
          e2e: 'e2e'
        }
      };
      // act
      var result = task.canRun(pcfg, acfg);
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
      expect(result).toBe('`gulp {id}-e2e` to run end-to-end integration tests');
    });
  });
});
