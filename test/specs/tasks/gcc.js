/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA gcc base task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('gcc', function() {
  var Task, task, aqua, cfg, gulp,
      rewire = require('rewire'),
      root = '../../../',
      src = root + 'src/tasks/',
      NO_ERRS, NO_ERR_LOG,
      ERR_TYPECHK, ERR_TYPECHK_LOG,
      ERR_JAVA_VER, ERR_JAVA_VER_LOG;

  beforeEach(function() {
    // get AQUA
    aqua = rewire(root);

    // constants
    NO_ERRS = '0 error(s), 0 warning(s) FOO BAR';
    NO_ERR_LOG = 'Type Check: ' + aqua.colors.green(NO_ERRS);
    ERR_TYPECHK = 'FOO BAR :(';
    ERR_TYPECHK_LOG = aqua.colors.yellow('Type Check Issues:\n') + ERR_TYPECHK;
    ERR_JAVA_VER = 'Unsupported major.minor version';
    ERR_JAVA_VER_LOG = 'Java 7+ is required to run type checking.';

    // set task under test
    Task = rewire(src + 'gcc');
    task = new Task('task', 'task warning');
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

  describe('getSource', function() {
    beforeEach(function() {
      // add spies
    });

    it('should prepend sourceonly.js', function() {
      // arrange
      cfg.src = ['foo.js'];
      // act
      var result = task.getSource(cfg);
      // assert
      expect(result).toEqual(['./test/sourceonly.js', 'foo.js']);
    });

  });

  describe('getFileName', function() {
    beforeEach(function() {
      // add spies
    });

    describe('when "destName" not set', function() {
      it('should use the project id to build a unique name', function() {
        // arrange
        // act
        var result = task.getFileName(cfg);
        // assert
        expect(result).toBe('test.js');
      });
    });

    describe('when "destName" is set', function() {
      it('should use it to as the file name', function() {
        // arrange
        var name = 'foo.bar';
        cfg.destName = name;
        // act
        var result = task.getFileName(cfg);
        // assert
        expect(result).toBe(name);
      });
    });

  });

  describe('getNodeExterns', function() {
    var externs;
    beforeEach(function() {
      // mock externs
      externs = ['foo.bar.js'];
      // add spies
    });

    describe('when not a node.js project', function() {
      it('should do nothing', function() {
        // arrange
        // act
        var result = task.getNodeExterns(cfg, externs);
        // assert
        expect(result).toBe(externs);
      });
    });

    describe('when a node.js project', function() {
      it('should append the core externs', function() {
        // arrange
        cfg.type = 'nodejs';
        // act
        var result = task.getNodeExterns(cfg, externs);
        // assert
        expect(result).toEqual([
          'foo.bar.js',
          './externs/nodejs/buffer.js',
          './externs/nodejs/core.js'
        ]);
      });
    });

  });

  describe('getGlobals', function() {
    var externs, glob;
    beforeEach(function() {
      // mock externs
      externs = ['foo.baz.js'];
      // mock glob
      glob = mockGlob();
      // add spies
    });

    describe('when there are no project globals', function() {
      it('should do nothing', function() {
        // arrange
        // act
        var result = task.getGlobals(cfg, externs, glob);
        // assert
        expect(result).toEqual(['foo.baz.js']);
      });
    });

    describe('when there are project globals', function() {
      it('should append the globals', function() {
        // arrange
        cfg.unit = {
          globals: ['global1.js', 'global2.js']
        };
        // act
        var result = task.getGlobals(cfg, externs, glob);
        // assert
        expect(result).toEqual([
          'global2.js',
          'global1.js',
          'foo.baz.js'
        ]);
      });
    });

  });

  describe('findFiles', function() {
    var pattern, glob;
    beforeEach(function() {
      // mock glob pattern
      pattern = 'pattern';
      // mock glob
      glob = mockGlob();
      // add spies
    });

    it('should find non-bundled externs', function() {
      // arrange
      pattern = './pattern.js';
      // act
      var result = task.findFiles(cfg, pattern, glob);
      // assert
      expect(result).toEqual([
        './pattern.js'
      ]);
    });

    describe('when cfg is a web project', function() {
      it('should use the externs folder', function() {
        // arrange
        // act
        var result = task.findFiles(cfg, pattern, glob);
        // assert
        expect(result).toEqual([
          './externs/pattern.js'
        ]);
      });
    });

    describe('when cfg is a node.js project', function() {
      it('should use the nodejs externs folder', function() {
        // arrange
        cfg.type = 'nodejs';
        // act
        var result = task.findFiles(cfg, pattern, glob);
        // assert
        expect(result).toEqual([
          './externs/nodejs/pattern.js'
        ]);
      });
    });

  });

  describe('getProjTypes', function() {
    var externs, glob, noMatches;
    beforeEach(function() {
      // mock externs
      externs = ['foo.bar.baz.js'];
      noMatches = false;
      // mock glob
      glob = mockGlob();
      // add spies
      spyOn(task, 'findFiles').andCallFake(function(pcfg, pattern) {
        return noMatches ? [] : [pattern];
      });
    });

    describe('when there are no project types', function() {
      it('should do nothing', function() {
        // arrange
        // act
        var result = task.getProjTypes(cfg, externs, glob);
        // assert
        expect(result).toEqual(['foo.bar.baz.js']);
      });
    });

    describe('when there are project types', function() {
      beforeEach(function() {
        // mock project types
        cfg.types = [
          'bundled',
          './not.bundled.js'
        ];
        // add spies
      });

      it('should search for externs files', function() {
        // arrange
        // act
        task.getProjTypes(cfg, externs, glob);
        // assert
        expect(task.findFiles).toHaveBeenCalledWith(cfg, 'bundled', glob);
        expect(task.findFiles).toHaveBeenCalledWith(cfg, './not.bundled.js', glob);
      });

      describe('when the file is missing', function() {
        it('should write a warning to the console', function() {
          // arrange
          noMatches = true;
          cfg.types = ['missing.js'];
          // act
          task.getProjTypes(cfg, externs, glob);
          // assert
          expect(task.log.warn).toHaveBeenCalledWith('Type file not found: missing.js');
        });
      });

      it('should append the type definitions', function() {
        // arrange
        // act
        var result = task.getProjTypes(cfg, externs, glob);
        // assert
        expect(result).toEqual([
          'foo.bar.baz.js',
          'bundled',
          './not.bundled.js'
        ]);
      });
    });

  });

  describe('getExterns', function() {
    beforeEach(function() {
      // add spies
      spyOn(task, 'getNodeExterns').andCallFake(function(pcfg, externs) {
        externs.push('getNodeExterns');
        return externs;
      });
      spyOn(task, 'getGlobals').andCallFake(function(pcfg, externs) {
        externs.push('getGlobals');
        return externs;
      });
      spyOn(task, 'getProjTypes').andCallFake(function(pcfg, externs) {
        externs.push('getProjTypes');
        return externs;
      });
    });

    it('should append nodejs externs', function() {
      // arrange
      // act
      var result = task.getExterns(cfg);
      // assert
      expect(result).toContain('getNodeExterns');
    });
    it('should append globals', function() {
      // arrange
      // act
      var result = task.getExterns(cfg);
      // assert
      expect(result).toContain('getGlobals');
    });
    it('should append project type definitions', function() {
      // arrange
      // act
      var result = task.getExterns(cfg);
      // assert
      expect(result).toContain('getProjTypes');
    });

  });

  describe('getConditionalFlags', function() {
    var flags, path, mockReq;
    beforeEach(function() {
      // mock path module
      path = {
        join: jasmine.createSpy('join').andReturn('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return path; });

      // use dependency injection to inject mock require
      Task.__set__('require', mockReq);

      // mock flags
      flags = {};
      // add spies
      spyOn(task, 'getFileName').andReturn('getFileName');
    });

    describe('when chk task is run', function() {
      it('should set the summary detail level to 3', function() {
        // arrange
        task.name = 'chk';
        // act
        task.getConditionalFlags(flags, cfg);
        // assert
        expect(flags.summary_detail_level).toBe(3);
      });
    });

    describe('when pcfg.dest is set', function() {
      it('should set source map flags', function() {
        // arrange
        cfg.dest = 'dest';
        // act
        task.getConditionalFlags(flags, cfg);
        // assert
        expect(flags.create_source_map).toBe('join');
        expect(flags.source_map_format).toBe('V3');
      });
    });

    describe('node.js project', function() {
      it('should set the language in to ECMASCRIPT5_STRICT', function() {
        // arrange
        cfg.type = 'nodejs';
        // act
        task.getConditionalFlags(flags, cfg);
        // assert
        expect(flags.language_in).toBe('ECMASCRIPT5_STRICT');
      });
    });

    describe('web project', function() {
      it('should set the language in to ECMASCRIPT3', function() {
        // arrange
        // act
        task.getConditionalFlags(flags, cfg);
        // assert
        expect(flags.language_in).toBe('ECMASCRIPT3');
      });
    });

  });

  describe('getGccFlags', function() {
    beforeEach(function() {
      // add spies
      spyOn(task, 'getExterns').andReturn('getExterns');
      spyOn(task, 'getConditionalFlags');
    });

    it('should get the externs list', function() {
      // arrange
      // act
      task.getGccFlags(cfg);
      // assert
      expect(task.getExterns).toHaveBeenCalledWith(cfg);
    });

    it('should set the default gcc flags', function() {
      // arrange
      // act
      var result = task.getGccFlags(cfg);
      // assert
      expect(result).toEqual({
        warning_level: 'VERBOSE',
        define: ['SOURCEONLY=false'],
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        extra_annotation_name: 'alias',
        externs: 'getExterns'
      });
    });

    it('should set the conditional gcc flags', function() {
      // arrange
      // act
      task.getGccFlags(cfg);
      // assert
      expect(task.getConditionalFlags).toHaveBeenCalledWith(jasmine.any(Object), cfg);
    });

  });

  describe('checkPercentTyped', function() {
    var msg;
    beforeEach(function() {
      msg = '0 error(s), 0 warning(s), 1.9% typed';
      // add spies
    });

    it('should do nothing if not configured', function() {
      // arrange
      // act
      var result = task.checkPercentTyped(aqua, msg);
      // assert
      expect(result).toBe(true);
    });
    it('should validate the percent typed against threshold', function() {
      // arrange
      aqua.cfg.thresholds = {
        percentTyped: 2
      };
      // act
      var result = task.checkPercentTyped(aqua, msg);
      // assert
      expect(aqua.log).toHaveBeenCalled();
      expect(aqua.error).toHaveBeenCalled();
      expect(result).toBe(false);
    });

  });

  describe('handelErrors', function() {
    var e;

    beforeEach(function() {
      // mock error message
      e = {
        message: ''
      };
      // add spies
      spyOn(task, 'checkPercentTyped').andReturn(false);
    });

    describe('and no errors found', function() {
      it('should log "no errors" to the console', function() {
        // arrange
        e.message = NO_ERRS;
        task.name = 'min';
        // act
        task.handelErrors(aqua, e);
        // assert
        expect(aqua.log).toHaveBeenCalledWith(NO_ERR_LOG);
      });
    });

    describe('and errors found', function() {
      it('should log "invalid Java version" to the console', function() {
        // arrange
        e.message = ERR_JAVA_VER;
        // act
        task.handelErrors(aqua, e);
        // assert
        expect(aqua.log).toHaveBeenCalledWith(ERR_JAVA_VER_LOG);
        expect(aqua.error).toHaveBeenCalled();
      });
    });

    describe('and type errors found', function() {
      it('should log errors to the console', function() {
        // arrange
        e.message = ERR_TYPECHK;
        // act
        task.handelErrors(aqua, e);
        // assert
        expect(aqua.log).toHaveBeenCalledWith(ERR_TYPECHK_LOG);
        expect(aqua.error).toHaveBeenCalled();
      });
    });

    describe('and percent typed is not high enough', function() {
      it('should not log "no errors" to the console', function() {
        // arrange
        e.message = NO_ERRS;
        // act
        task.handelErrors(aqua, e);
        // assert
        expect(aqua.log).not.toHaveBeenCalled();
      });
    });

  });

  describe('getJarPath', function() {
    var path, mockReq;
    beforeEach(function() {
      // mock path module
      path = {
        join: jasmine.createSpy('join').andReturn('join')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return path; });

      // use dependency injection to inject mock require
      Task.__set__('require', mockReq);
      Task.__set__('__dirname', '__dirname');
      // add spies
    });

    it('should get jar path based on where the script is running', function() {
      // arrange
      // act
      var result = task.getJarPath(cfg);
      // assert
      expect(path.join).toHaveBeenCalledWith('__dirname', '../../lib/gcc/compiler.jar');
      expect(result).toBe('join');
    });

  });

  describe('run', function() {
    var gccReq, gcc, mockReq;

    beforeEach(function() {
      // mock gcc
      gcc = {
        on: jasmine.createSpy('gcc-on').andReturn('gcc-on')
      };
      gccReq = jasmine.createSpy('gccReq').andReturn(gcc);

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function() { return gccReq; });

      // use dependency injection to inject mock require
      Task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'getSource').andReturn('getSource');
      spyOn(task, 'getGccFlags').andReturn('getGccFlags');
      spyOn(task, 'getFileName').andReturn('getFileName');
      spyOn(task, 'getJarPath').andReturn('getJarPath');
      spyOn(task, 'handelErrors').andReturn('handelErrors');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-closure-compiler');
    });
    it('should look up the javascript source code', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gulp.src).toHaveBeenCalledWith('getSource');
    });
    it('should get the GCC options', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.getGccFlags).toHaveBeenCalledWith(cfg);
    });
    it('should get the output file name', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.getFileName).toHaveBeenCalledWith(cfg);
    });
    it('should run GCC the JavaScript source code', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gccReq).toHaveBeenCalledWith({
        fileName: 'getFileName',
        compilerFlags: 'getGccFlags',
        compilerPath: 'getJarPath',
        jscomp_warning: 'reportUnknownTypes'
      });
      expect(gulp.pipe).toHaveBeenCalledWith('gcc-on');
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(gcc.on).toHaveBeenCalledWith('error', jasmine.any(Function));
    });

    describe('when complete', function() {
      it('should call handelErrors', function() {
        // arrange
        var e = {};
        task.run(aqua, cfg, gulp);
        var onErr = gcc.on.calls[0].args[1];
        // act
        onErr(e);
        // assert
        expect(task.handelErrors).toHaveBeenCalledWith(aqua, e);
      });

    });
  });

});
