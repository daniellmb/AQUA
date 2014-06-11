/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA unit task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('unit', function() {
  'use strict';
  var task, aqua, cfg, gulp, OK_MSG,
      rewire = require('rewire'),
      root = '../../../',
      src = root + 'src/tasks/';

  beforeEach(function() {
    // get AQUA
    aqua = rewire(root);

    OK_MSG = aqua.colors.green('Coverage is at or over the minimum thresholds.');

    // set task under test
    task = rewire(src + 'unit');

    // mock logging
    task.log = mockLogger();

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

  describe('collect', function() {
    var utCfg, src;
    beforeEach(function() {
      utCfg = {};
      src = [];
      // add spies
      spyOn(Array.prototype, 'concat').andCallThrough();
    });
    it('should start with "sourceonly.js"', function() {
      // arrange
      // act
      var result = task.collect(utCfg, src);
      // assert
      expect(result[0]).toContain('sourceonly.js');
    });
    it('should include globals if configured', function() {
      // arrange
      utCfg.globals = ['globals'];
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).toHaveBeenCalledWith(utCfg.globals);
    });
    it('should not include globals if not configured', function() {
      // arrange
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).not.toHaveBeenCalledWith(utCfg.globals);
    });
    it('should include deps if configured', function() {
      // arrange
      utCfg.deps = ['deps'];
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).toHaveBeenCalledWith(utCfg.deps);
    });
    it('should not include deps if not configured', function() {
      // arrange
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).not.toHaveBeenCalledWith(utCfg.deps);
    });
    it('should include mocks if configured', function() {
      // arrange
      utCfg.mocks = ['mocks'];
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).toHaveBeenCalledWith(utCfg.mocks);
    });
    it('should not include mocks if not configured', function() {
      // arrange
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).not.toHaveBeenCalledWith(utCfg.mocks);
    });
    // add source and spec files
    it('should include source then tests', function() {
      // arrange
      utCfg.tests = ['tests'];
      src.push('source');
      // act
      task.collect(utCfg, src);
      // assert
      expect(Array.prototype.concat).toHaveBeenCalledWith(src, utCfg.tests);
    });
    it('should return the list of files', function() {
      // arrange
      // act
      var result = task.collect(utCfg, src);
      // assert
      expect(result instanceof Array).toBe(true);
    });
  });

  describe('getCoverageConfig', function() {
    var path, mockReq, wcfg;
    beforeEach(function() {
      // web config
      wcfg = {
        reporters: [],
        coverage: {
          reporters: []
        }
      };

      // mock aqua config
      aqua.cfg.coverage = {
        report: 'report'
      };

      // mock path module
      path = {
        join: jasmine.createSpy('join').andReturn('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
        switch (name) {
          case 'path': return path;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(aqua.util, 'forEach');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, cfg, aqua);
      // assert
      expect(mockReq).toHaveBeenCalledWith('path');
    });
    it('should loop through the source files', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, cfg, aqua);
      // assert
      expect(aqua.util.forEach).toHaveBeenCalledWith(cfg.src, jasmine.any(Function));
    });
    it('should set coverage preprocessor for source files', function() {
      // arrange
      task.getCoverageConfig(wcfg, cfg, aqua);
      var loop = aqua.util.forEach.calls[0].args[1];
      // act
      loop('file');
      // assert
      expect(wcfg.preprocessors.file).toEqual(['coverage']);
    });
    it('should add coverage reporter', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, cfg, aqua);
      // assert
      expect(wcfg.reporters).toEqual(['coverage']);
    });
    it('should set coverage report output folder', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, cfg, aqua);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.coverage.report, cfg.id.toLowerCase());
    });
    it('should loop through the coverage reporters', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, cfg, aqua);
      // assert
      expect(aqua.util.forEach).toHaveBeenCalledWith(wcfg.coverage.reporters, jasmine.any(Function));
    });
    it('should add coverage reporters', function() {
      // arrange
      task.getCoverageConfig(wcfg, cfg, aqua);
      var loop = aqua.util.forEach.calls[1].args[1];
      // act
      loop('reporter');
      // assert
      expect(wcfg.coverageReporter.reporters[0].type).toBe('reporter');
      expect(wcfg.coverageReporter.reporters[0].dir).toBe('join');
    });
  });

  describe('testWeb', function() {
    var karma, wcfg, mockReq, files;

    beforeEach(function() {
      files = ['foo', 'bar'];

      // mock aqua config
      aqua.cfg.testing = {
        web: 'path'
      };
      aqua.cfg.logging = {
        level: 'level',
        colors: true
      };

      // mock karma
      karma = jasmine.createSpy('karma').andReturn('karma');
      wcfg = {};

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
        switch (name) {
          case 'gulp-karma': return karma;
          case '../../' + aqua.cfg.testing.web: return wcfg;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(aqua.util, 'assign').andReturn(wcfg);
      spyOn(task, 'getCoverageConfig');
      spyOn(task, 'enforceThresholds');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-karma');
    });
    it('should merge the web config with dynamic settings', function() {
      // arrange
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(aqua.util.assign).toHaveBeenCalledWith(wcfg, {
        logLevel: 'level',
        colors: true,
        basePath: './',
        action: 'run'
      });
    });
    it('should call getCoverageConfig when coverage is enabled', function() {
      // arrange
      aqua.cfg.coverage = {};
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(task.getCoverageConfig).toHaveBeenCalledWith(wcfg, cfg, aqua);
    });
    it('should look up the files needed for testing', function() {
      // arrange
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(files);
    });
    it('should run unit tests with karma', function() {
      // arrange
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(karma).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('karma');
    });
    it('should listen for when the task is complete', function() {
      // arrange
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('end', jasmine.any(Function));
    });
    it('should call enforceThresholds when the task is done', function() {
      // arrange
      task.testWeb(aqua, cfg, files, gulp);
      var onEnd = gulp.on.calls[0].args[1];
      // act
      onEnd();
      // assert
      expect(task.enforceThresholds).toHaveBeenCalledWith(aqua, cfg.id, gulp);
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.testWeb(aqua, cfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.error);
    });
  });

  describe('testNode', function() {
    var istanbul, mockReq, files;

    beforeEach(function() {
      files = ['bar', 'baz'];

      // mock dependencies
      istanbul = jasmine.createSpy('istanbul').andReturn('istanbul');

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return istanbul; });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'runNodeTests');
    });
    it('should load dependencies', function() {
      // arrange
      // act
      task.testNode(aqua, cfg, files, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-istanbul');
    });
    it('should look up the source code to instrument', function() {
      // arrange
      // act
      task.testNode(aqua, cfg, files, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(cfg.src);
    });
    it('should instrument source code for coverage', function() {
      // arrange
      // act
      task.testNode(aqua, cfg, files, gulp);
      // assert
      expect(istanbul).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('istanbul');
    });
    it('should listen for when instrumentation finishes', function() {
      // arrange
      // act
      task.testNode(aqua, cfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('finish', jasmine.any(Function));
    });
    it('should run tests when instrumentation finishes', function() {
      // arrange
      task.testNode(aqua, cfg, files, gulp);
      var done = gulp.on.calls[0].args[1];
      // act
      done();
      // assert
      expect(task.runNodeTests).toHaveBeenCalledWith(aqua, cfg.id, files, gulp);
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.testNode(aqua, cfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.error);
    });
  });

  describe('runNodeTests', function() {
    var gulpJasmine, mockReq, files;

    beforeEach(function() {
      var mockNodeCfg;

      files = ['bar03', 'baz12'];

      // mock aqua config
      aqua.cfg.testing = {
        node: 'test'
      };

      // mock dependencies
      gulpJasmine = jasmine.createSpy('jasmine').andReturn('jasmine');
      mockNodeCfg = {
        jasmine: {}
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
        switch (name) {
          case 'gulp-jasmine': return gulpJasmine;
          case '../../test': return mockNodeCfg;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'createReports').andReturn('createReports');
      spyOn(task, 'enforceThresholds');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-jasmine');
    });
    it('should set show colors to match the aqua config', function() {
      // arrange
      aqua.cfg.logging = {
        colors: false
      };
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      var args = gulpJasmine.calls[0].args[0];
      expect(args.showColors).toBe(false);
    });
    it('should look up the files to unit test', function() {
      // arrange
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(files);
    });
    it('should run the unit tests', function() {
      // arrange
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      expect(gulpJasmine).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('jasmine');
    });
    it('should create code coverage reports', function() {
      // arrange
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      expect(task.createReports).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('createReports');
    });
    it('should listen for when reports have been written', function() {
      // arrange
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('end', jasmine.any(Function));
    });
    it('should run enforce thresholds when reports exist', function() {
      // arrange
      task.runNodeTests(aqua, cfg.id, files, gulp);
      var done = gulp.on.calls[0].args[1];
      // act
      done();
      // assert
      expect(task.enforceThresholds).toHaveBeenCalledWith(aqua, cfg.id, gulp);
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.runNodeTests(aqua, cfg.id, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.error);
    });
  });

  describe('createReports', function() {
    var istanbul, path, mockReq, ncfg;

    beforeEach(function() {
      // mock aqua config
      aqua.cfg.coverage = {
        report: {}
      };

      // mock node unit test runner config
      ncfg = {
        coverage: {
          reporters: ['foo']
        }
      };

      // mock dependencies
      istanbul = jasmine.createSpy('istanbul').andReturn('istanbul');
      istanbul.writeReports = jasmine.createSpy('writeReports').andReturn('writeReports');
      path = {
        join: jasmine.createSpy('join').andReturn('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
        switch (name) {
          case 'gulp-istanbul': return istanbul;
          case 'path': return path;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.createReports(aqua.cfg, ncfg, cfg.id);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-istanbul');
    });
    it('should build the report output path', function() {
      // arrange
      // act
      task.createReports(aqua.cfg, ncfg, cfg.id);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.coverage.report, cfg.id.toLowerCase());
    });
    it('should write coverage reports', function() {
      // arrange
      // act
      task.createReports(aqua.cfg, ncfg, cfg.id);
      // assert
      expect(istanbul.writeReports).toHaveBeenCalledWith({
        dir: 'join',
        reporters: ['foo']
      });
    });
    it('should return the report writer', function() {
      // arrange
      // act
      var result = task.createReports(aqua.cfg, ncfg, cfg.id);
      // assert
      expect(result).toBe('writeReports');
    });
  });

  describe('enforceThresholds', function() {
    var enforcer, path, mockReq;

    beforeEach(function() {
      // mock aqua config
      aqua.cfg.thresholds = {
        coverage: {}
      };
      aqua.cfg.coverage = {
        report: 'coverage-report-path'
      };

      // mock dependencies
      enforcer = jasmine.createSpy('enforcer').andReturn('enforcer');
      path = {
        join: jasmine.createSpy('join').andReturn('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
        switch (name) {
          case 'gulp-istanbul-enforcer': return enforcer;
          case 'path': return path;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
    });
    it('should load dependencies', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, cfg.id, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-istanbul-enforcer');
    });
    it('should look up whatever (not using if)', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, cfg.id, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith('.');
    });
    it('should build output path', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, cfg.id, gulp);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.coverage.report, cfg.id.toLowerCase());
    });
    it('should enforce coverage thresholds', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, cfg.id, gulp);
      // assert
      expect(enforcer).toHaveBeenCalledWith({
        thresholds: aqua.cfg.thresholds.coverage,
        rootDirectory: 'join'
      });
      expect(gulp.pipe).toHaveBeenCalledWith('enforcer');
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, cfg.id, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', jasmine.any(Function));
    });
    it('should listen for when the task is finished', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, cfg.id, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('end', jasmine.any(Function));
    });

    describe('when error found', function() {
      it('should log errors to the console', function() {
        // arrange
        task.enforceThresholds(aqua, cfg.id, gulp);
        var onErr = gulp.on.calls[0].args[1],
            err = {message: ''};
        // act
        onErr(err);
        // assert
        expect(task.log.warn).toHaveBeenCalled();
        expect(aqua.error).toHaveBeenCalled();
      });
      it('should not log "at minimum thresholds" to the console', function() {
        // arrange
        task.enforceThresholds(aqua, cfg.id, gulp);
        var onErr = gulp.on.calls[0].args[1],
            onDone = gulp.on.calls[1].args[1],
            err = {message: ''};
        // act
        onErr(err);
        onDone();
        // assert
        expect(task.log.warn).not.toHaveBeenCalledWith(OK_MSG);
      });
    });
    describe('when no errors', function() {
      it('should log "at minimum thresholds" to the console', function() {
        // arrange
        task.enforceThresholds(aqua, cfg.id, gulp);
        var onDone = gulp.on.calls[1].args[1];
        // act
        onDone();
        // assert
        expect(task.log.info).toHaveBeenCalledWith(OK_MSG);
      });
    });
  });

  describe('run', function() {
    var files;
    beforeEach(function() {
      files = ['001', '002', '003'];
      // add spies
      spyOn(task, 'collect').andReturn(files);
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
    it('should collect files needed for testing', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.collect).toHaveBeenCalled();
    });
    it('should support testing web projects', function() {
      // arrange
      cfg.type = 'web';
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.testWeb).toHaveBeenCalledWith(aqua, cfg, files, gulp);
    });
    it('should support testing node.js projects', function() {
      // arrange
      cfg.type = 'nodejs';
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.testNode).toHaveBeenCalledWith(aqua, cfg, files, gulp);
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

  describe('canRun', function() {

    beforeEach(function() {
      // mock aqua config
      aqua.cfg.testing = {
        web: {}
      };
    });

    it('should return true if the task can run', function() {
      // arrange
      cfg.src = [];
      cfg.unit = {};
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
