/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA unit task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('unit', function() {
  var task, aqua, pcfg, gulp, OK_MSG,
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

  describe('constructor', function() {
    it('should set the PIPE_NOTHING constant', function() {
      // arrange
      // act
      // assert
      expect(task.PIPE_NOTHING).toBe('pipe.in.nothing.let.karma.load.the.files.js');
    });
  });

  describe('collect', function() {
    var utCfg, src;
    beforeEach(function() {
      utCfg = {};
      src = [];
      // add spies
      spyOn(Array.prototype, 'concat').and.callThrough();
    });
    it('should start with "sourceonly.js"', function() {
      // arrange
      // act
      var result = task.collect(utCfg, src);
      // assert
      expect(result[0]).toContain('externs/sourceonly.js');
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

  describe('getFilesToCover', function() {
    var wcfg, usingRequire;
    beforeEach(function() {
      // mock web test config
      wcfg = {};

      // mock using require.js function result
      usingRequire = false;

      // add spies
      spyOn(task, 'usingRequireJS').and.callFake(function(){
        return usingRequire;
      });
    });

    it('should check if the project is using require.js', function() {
      // arrange
      // act
      task.getFilesToCover(wcfg, pcfg, aqua);
      // assert
      expect(task.usingRequireJS).toHaveBeenCalledWith(wcfg);
    });

    describe('when not using require.js', function(){
      beforeEach(function() {
        // extend project config
        pcfg.src = ['FOO'];

        // add spies
      });

      it('should return the project source files', function() {
        // arrange
        // act
        var result = task.getFilesToCover(wcfg, pcfg, aqua);
        // assert
        expect(result).toBe(pcfg.src);
      });
    });

    describe('when using require.js', function(){
      beforeEach(function() {
        // mock using require.js
        usingRequire = true;

        // extend project config
        pcfg.src = ['./FOO', './BAR', './ZAB'];

        // mock web test files config
        wcfg.files = ['foo', {pattern:'bar'}, {pattern:'baz'}];
      });

      it('should filter the test files to match the source files', function() {
        // arrange
        // act
        var result = task.getFilesToCover(wcfg, pcfg, aqua);
        // assert
        expect(result).toEqual([{pattern:'bar'}]);
      });
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
        join: jasmine.createSpy('join').and.returnValue('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
        switch (name) {
          case 'path': return path;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(aqua.util, 'forEach');
      spyOn(task, 'getFilesToCover');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, pcfg, aqua);
      // assert
      expect(mockReq).toHaveBeenCalledWith('path');
    });
    it('should get the files to cover', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, pcfg, aqua);
      // assert
      expect(task.getFilesToCover).toHaveBeenCalledWith(wcfg, pcfg, aqua);
    });
    it('should loop through the source files', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, pcfg, aqua);
      // assert
      expect(aqua.util.forEach).toHaveBeenCalledWith(pcfg.src, jasmine.any(Function));
    });
    it('should set coverage preprocessor for source files', function() {
      // arrange
      task.getCoverageConfig(wcfg, pcfg, aqua);
      var loop = aqua.util.forEach.calls.argsFor(0)[1];
      // act
      loop('file');
      // assert
      expect(wcfg.preprocessors.file).toEqual(['coverage']);
    });
    it('should add coverage reporter', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, pcfg, aqua);
      // assert
      expect(wcfg.reporters).toEqual(['coverage']);
    });
    it('should set coverage report output folder', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, pcfg, aqua);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.coverage.report, pcfg.id.toLowerCase());
    });
    it('should loop through the coverage reporters', function() {
      // arrange
      // act
      task.getCoverageConfig(wcfg, pcfg, aqua);
      // assert
      expect(aqua.util.forEach).toHaveBeenCalledWith(wcfg.coverage.reporters, jasmine.any(Function));
    });
    it('should add coverage reporters', function() {
      // arrange
      task.getCoverageConfig(wcfg, pcfg, aqua);
      var loop = aqua.util.forEach.calls.argsFor(1)[1];
      // act
      loop('reporter');
      // assert
      expect(wcfg.coverageReporter.reporters[0].type).toBe('reporter');
      expect(wcfg.coverageReporter.reporters[0].dir).toBe('join');
    });
  });

  describe('usingRequireJS', function() {
    var tcfg;
    beforeEach(function() {
      // test config
      tcfg = {
        frameworks: []
      };

      // add spies
    });

    it('should return true when requirejs is used', function() {
      // arrange
      tcfg.frameworks.push('foo', 'requirejs', 'bar');
      // act
      var result = task.usingRequireJS(tcfg);
      // assert
      expect(result).toBe(true);
    });
    it('should return false when requirejs is not used', function() {
      // arrange
      // act
      var result = task.usingRequireJS(tcfg);
      // assert
      expect(result).toBe(false);
    });
  });

  describe('validateWebConfig', function(){
    var tcfg;
    beforeEach(function() {
      // test config
      tcfg = {};

      // add spies
    });

    it('should exist', function() {
      // arrange
      // act
      // assert
      expect(typeof task.validateWebConfig).toBe('function');
    });

    it('should throw an error when reporters is not set', function() {
      // arrange
      // act
      function shouldThrow() {
        task.validateWebConfig(tcfg);
      }
      // assert
      expect(shouldThrow).toThrow(new Error('Unit test reporters are required'));
    });

    it('should throw an error when reporters is empty', function() {
      // arrange
      tcfg.reporters = [];
      // act
      function shouldThrow() {
        task.validateWebConfig(tcfg);
      }
      // assert
      expect(shouldThrow).toThrow(new Error('Unit test reporters are required'));
    });

    it('should not throw an error when reporters properly set', function() {
      // arrange
      tcfg.reporters = ['foo'];
      // act
      function shouldNotThrow() {
        task.validateWebConfig(tcfg);
      }
      // assert
      expect(shouldNotThrow).not.toThrow();
    });
  });

  describe('validateNodeConfig', function(){
    var tcfg;
    beforeEach(function() {
      // test config
      tcfg = {};

      // add spies
    });

    it('should exist', function() {
      // arrange
      // act
      // assert
      expect(typeof task.validateNodeConfig).toBe('function');
    });

    it('should not throw an error when properly configured', function() {
      // arrange
      // act
      function shouldNotThrow() {
        task.validateNodeConfig(tcfg);
      }
      // assert
      expect(shouldNotThrow).not.toThrow();
    });

  });

  describe('getTestConfig', function(){
    var path, mockReq, tcfg, validate;
    beforeEach(function() {
      // test config
      tcfg = {};

      // mock config validate method
      validate = jasmine.createSpy('validate');

      // mock path module
      path = {
        join: jasmine.createSpy('join').and.callFake(function() {
          return Array.prototype.slice.call(arguments).join('');
        })
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
        switch (name) {
          case 'path': return path;
          case '__dirname../../../../foo': return 'file found';
          case '__dirname../../../../bar': throw new Error('file not found');
          default: return name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);
      task.__set__('__dirname', '__dirname')

      // add spies
    });

    it('should use project level config override', function() {
      // arrange
      pcfg.unit = {
        config: 'proj-confg'
      }
      // act
      task.getTestConfig(pcfg, 'foo', validate);
      // assert
      expect(validate).toHaveBeenCalledWith('__dirname../../../../proj-confg');
    });

    it('should try to load the parent config', function() {
      // arrange
      // act
      task.getTestConfig(pcfg, 'foo', validate);
      // assert
      expect(validate).toHaveBeenCalledWith('file found');
    });

    it('should load the default config', function() {
      // arrange
      // act
      task.getTestConfig(pcfg, 'bar', validate);
      // assert
      expect(validate).toHaveBeenCalledWith('__dirname../../bar');
    });

    it('should validate the config', function() {
      // arrange
      // act
      task.getTestConfig(pcfg, 'baz', validate);
      // assert
      expect(validate).toHaveBeenCalledWith('__dirname../../../../baz');
    });

    it('should return the config', function() {
      // arrange
      // act
      var result = task.getTestConfig(pcfg, 'foo', validate);
      // assert
      expect(result).toBe('file found');
    });

  });

  describe('testWeb', function() {
    var karma, wcfg, mockReq, files, usingRequire;

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
      karma = jasmine.createSpy('karma').and.returnValue('karma');

      // mock web test config
      wcfg = {};

      // mock using require.js function result
      usingRequire = false;

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
        switch (name) {
          case 'gulp-karma': return karma;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'getTestConfig').and.returnValue(wcfg);
      spyOn(aqua.util, 'assign').and.returnValue(wcfg);
      spyOn(task, 'getCoverageConfig');
      spyOn(task, 'usingRequireJS').and.callFake(function(){
        return usingRequire;
      });
      spyOn(task, 'enforceThresholds');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.testWeb(aqua, pcfg, files, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-karma');
    });
    it('should merge the web config with dynamic settings', function() {
      // arrange
      // act
      task.testWeb(aqua, pcfg, files, gulp);
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
      task.testWeb(aqua, pcfg, files, gulp);
      // assert
      expect(task.getCoverageConfig).toHaveBeenCalledWith(wcfg, pcfg, aqua);
    });
    it('should look up the files needed for testing', function() {
      // arrange
      // act
      task.testWeb(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(files);
    });
    it('should run unit tests with karma', function() {
      // arrange
      // act
      task.testWeb(aqua, pcfg, files, gulp);
      // assert
      expect(karma).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('karma');
    });
    it('should listen for when the task is complete', function() {
      // arrange
      // act
      task.testWeb(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('end', jasmine.any(Function));
    });
    it('should call enforceThresholds when the task is done', function() {
      // arrange
      task.testWeb(aqua, pcfg, files, gulp);
      var onEnd = gulp.on.calls.argsFor(0)[1];
      // act
      onEnd();
      // assert
      expect(task.enforceThresholds).toHaveBeenCalledWith(aqua, pcfg.id, gulp);
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.testWeb(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.fail);
    });

    describe('when using require.js', function(){
      beforeEach(function() {
        // mock using require.js
        usingRequire = true;
      });

      it('should NOT look up the files needed for testing', function() {
        // arrange
        // act
        task.testWeb(aqua, pcfg, files, gulp);
        // assert
        expect(gulp.src).toHaveBeenCalledWith([task.PIPE_NOTHING]);
      });
    });
  });

  describe('testNode', function() {
    var istanbul, mockReq, files;

    beforeEach(function() {
      files = ['bar', 'baz'];

      // mock dependencies
      istanbul = jasmine.createSpy('istanbul').and.returnValue('istanbul');
      istanbul.hookRequire = jasmine.createSpy('hookRequire').and.returnValue('hookRequire');

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function() { return istanbul; });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'runNodeTests');
    });
    it('should load dependencies', function() {
      // arrange
      // act
      task.testNode(aqua, pcfg, files, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-istanbul');
    });
    it('should look up the source code to instrument', function() {
      // arrange
      // act
      task.testNode(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(pcfg.src);
    });
    it('should instrument source code for coverage', function() {
      // arrange
      // act
      task.testNode(aqua, pcfg, files, gulp);
      // assert
      expect(istanbul).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('istanbul');
    });
    it('should force require to return covered files', function() {
      // arrange
      // act
      task.testNode(aqua, pcfg, files, gulp);
      // assert
      expect(istanbul.hookRequire).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('hookRequire');
    });
    it('should listen for when instrumentation finishes', function() {
      // arrange
      // act
      task.testNode(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('finish', jasmine.any(Function));
    });
    it('should run tests when instrumentation finishes', function() {
      // arrange
      task.testNode(aqua, pcfg, files, gulp);
      var done = gulp.on.calls.argsFor(0)[1];
      // act
      done();
      // assert
      expect(task.runNodeTests).toHaveBeenCalledWith(aqua, pcfg, files, gulp);
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.testNode(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.fail);
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
      gulpJasmine = jasmine.createSpy('jasmine').and.returnValue('jasmine');
      mockNodeCfg = {
        jasmine: {}
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
        switch (name) {
          case 'gulp-jasmine': return gulpJasmine;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'getTestConfig').and.returnValue(mockNodeCfg);
      spyOn(task, 'createReports').and.returnValue('createReports');
      spyOn(task, 'enforceThresholds');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-jasmine');
    });
    it('should set show colors to match the aqua config', function() {
      // arrange
      aqua.cfg.logging = {
        colors: false
      };
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      var args = gulpJasmine.calls.argsFor(0)[0];
      expect(args.showColors).toBe(false);
    });
    it('should look up the files to unit test', function() {
      // arrange
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith(files);
    });
    it('should run the unit tests', function() {
      // arrange
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      expect(gulpJasmine).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('jasmine');
    });
    it('should create code coverage reports', function() {
      // arrange
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      expect(task.createReports).toHaveBeenCalled();
      expect(gulp.pipe).toHaveBeenCalledWith('createReports');
    });
    it('should listen for when reports have been written', function() {
      // arrange
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('finish', jasmine.any(Function));
    });
    it('should run enforce thresholds when reports exist', function() {
      // arrange
      task.runNodeTests(aqua, pcfg, files, gulp);
      var done = gulp.on.calls.argsFor(0)[1];
      // act
      done();
      // assert
      expect(task.enforceThresholds).toHaveBeenCalledWith(aqua, pcfg.id, gulp);
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.runNodeTests(aqua, pcfg, files, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', aqua.fail);
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
      istanbul = jasmine.createSpy('istanbul').and.returnValue('istanbul');
      istanbul.writeReports = jasmine.createSpy('writeReports').and.returnValue('writeReports');
      path = {
        join: jasmine.createSpy('join').and.returnValue('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
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
      task.createReports(aqua.cfg, ncfg, pcfg.id);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-istanbul');
    });
    it('should build the report output path', function() {
      // arrange
      // act
      task.createReports(aqua.cfg, ncfg, pcfg.id);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.coverage.report, pcfg.id.toLowerCase());
    });
    it('should write coverage reports', function() {
      // arrange
      // act
      task.createReports(aqua.cfg, ncfg, pcfg.id);
      // assert
      expect(istanbul.writeReports).toHaveBeenCalledWith({
        dir: 'join',
        reporters: ['foo']
      });
    });
    it('should return the report writer', function() {
      // arrange
      // act
      var result = task.createReports(aqua.cfg, ncfg, pcfg.id);
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
      enforcer = jasmine.createSpy('enforcer').and.returnValue('enforcer');
      path = {
        join: jasmine.createSpy('join').and.returnValue('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
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
      task.enforceThresholds(aqua, pcfg.id, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-istanbul-enforcer');
    });
    it('should look up whatever (not using if)', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, pcfg.id, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith('.');
    });
    it('should build output path', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, pcfg.id, gulp);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.coverage.report, pcfg.id.toLowerCase());
    });
    it('should enforce coverage thresholds', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, pcfg.id, gulp);
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
      task.enforceThresholds(aqua, pcfg.id, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('error', jasmine.any(Function));
    });
    it('should listen for when the task is finished', function() {
      // arrange
      // act
      task.enforceThresholds(aqua, pcfg.id, gulp);
      // assert
      expect(gulp.on).toHaveBeenCalledWith('end', jasmine.any(Function));
    });

    describe('when error found', function() {
      it('should log errors to the console', function() {
        // arrange
        task.enforceThresholds(aqua, pcfg.id, gulp);
        var onErr = gulp.on.calls.argsFor(0)[1],
            err = {message: ''};
        // act
        onErr(err);
        // assert
        expect(task.log.warn).toHaveBeenCalled();
        expect(aqua.fail).toHaveBeenCalled();
      });
      it('should not log "at minimum thresholds" to the console', function() {
        // arrange
        task.enforceThresholds(aqua, pcfg.id, gulp);
        var onErr = gulp.on.calls.argsFor(0)[1],
            onDone = gulp.on.calls.argsFor(1)[1],
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
        task.enforceThresholds(aqua, pcfg.id, gulp);
        var onDone = gulp.on.calls.argsFor(1)[1];
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
      spyOn(task, 'collect').and.returnValue(files);
      spyOn(task, 'testWeb');
      spyOn(task, 'testNode');
    });

    it('should default project type to web', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(task.testWeb).toHaveBeenCalled();
    });
    it('should collect files needed for testing', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(task.collect).toHaveBeenCalled();
    });
    it('should support testing web projects', function() {
      // arrange
      pcfg.type = 'web';
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(task.testWeb).toHaveBeenCalledWith(aqua, pcfg, files, gulp);
    });
    it('should support testing node.js projects', function() {
      // arrange
      pcfg.type = 'nodejs';
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(task.testNode).toHaveBeenCalledWith(aqua, pcfg, files, gulp);
    });
    it('should show a warning for unsupported project types', function() {
      // arrange
      pcfg.type = 'foo';
      // act
      task.run(aqua, pcfg, gulp);
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
      pcfg.src = [];
      pcfg.unit = {};
      // act
      var result = task.canRun(pcfg, aqua.cfg);
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
