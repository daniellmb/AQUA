/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA code Doc task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/

describe('doc', function() {
  'use strict';

  var task, aqua, cfg, gulp,
      rewire = require('rewire'),
      root = '../../../',
      src = root + 'src/tasks/';

  beforeEach(function() {
    // get AQUA
    aqua = rewire(root);

    // set task under test
    task = rewire(src + 'doc');

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

  describe('getSrc', function() {
    beforeEach(function() {
      // extend the default config
      cfg.src = [];

      // add spies
      spyOn(cfg.src, 'slice').andCallThrough();
    });

    it('should copy the source array', function() {
      // arrange
      // act
      task.getSrc(cfg);
      // assert
      expect(cfg.src.slice).toHaveBeenCalled();
    });
    it('should check for optional type definitions', function() {
      // arrange
      cfg.types = ['types'];
      // act
      var result = task.getSrc(cfg);
      // assert
      expect(result).toEqual(cfg.types);
    });
    it('should check for optional readme file', function() {
      // arrange
      cfg.readme = 'readme';
      // act
      var result = task.getSrc(cfg);
      // assert
      expect(result).toEqual([cfg.readme]);
    });
    it('should check for optional page objects', function() {
      // arrange
      cfg.e2e = {
        pgobj: ['pgobj']
      };
      // act
      var result = task.getSrc(cfg);
      // assert
      expect(result).toEqual(cfg.e2e.pgobj);
    });
    it('should return the list of sources', function() {
      // arrange
      // act
      var result = task.getSrc(cfg);
      // assert
      expect(result).toEqual([]);
    });
  });

  describe('getExtras', function() {
    var acfg;
    beforeEach(function() {
      // reset mock aqua config
      acfg = {
        docs: {}
      };
    });

    it('should check for extra css', function() {
      // arrange
      acfg.docs.css = 'css';
      // act
      var result = task.getExtras(acfg);
      // assert
      expect(result).toEqual('<link rel="stylesheet" type="text/css" href="../../css">');
    });
    it('should check for extra js', function() {
      // arrange
      acfg.docs.js = 'js';
      // act
      var result = task.getExtras(acfg);
      // assert
      expect(result).toEqual('<script src="../../js"></script>');
    });
  });

  describe('getTemplate', function() {
    var acfg;
    beforeEach(function() {
      // reset mock aqua config
      acfg = {
        docs: {}
      };
    });

    it('should extend the default template', function() {
      // arrange
      // act
      var result = task.getTemplate(acfg, cfg);
      // assert
      expect(result).toEqual(task.template);
    });
  });

  describe('run', function() {
    var doc, mockReq, path, lodash;

    beforeEach(function() {
      /// extend the aqua config
      aqua.cfg.docs = {
        dir: 'dir'
      };

      // mock doc
      doc = jasmine.createSpy('doc').andCallFake(function() {
        return doc;
      });
      doc.on = jasmine.createSpy('on').andReturn('on');

      // mock path module
      path = {
        join: jasmine.createSpy('join').andReturn('join')
      };

      // mock lodash module
      lodash = {
        assign: jasmine.createSpy('assign').andReturn('assign')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').andCallFake(function(name) {
        switch (name) {
          case 'gulp-jsdoc': return doc;
          case 'path': return path;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'getSrc').andReturn('getSrc');
      spyOn(task, 'getExtras').andReturn('getExtras');
      spyOn(task, 'getTemplate').andReturn('getTemplate');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-jsdoc');
    });
    it('should look up the sources to generate docs from', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(task.getSrc).toHaveBeenCalledWith(cfg);
      expect(gulp.src).toHaveBeenCalledWith('getSrc');
    });
    it('should build the output path', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.docs.dir, cfg.id.toLowerCase());
    });
    it('should check the complexity of the JavaScript source code', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(doc).toHaveBeenCalledWith('join', 'getTemplate', task.options);
      expect(gulp.pipe).toHaveBeenCalledWith('on');
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.run(aqua, cfg, gulp);
      // assert
      expect(doc.on).toHaveBeenCalledWith('error', aqua.error);
    });

  });

  describe('canRun', function() {
    it('should return true if the task can run', function() {
      // arrange
      var acfg = {
        docs: {
          dir: 'dir'
        }
      };
      cfg.src = [];
      // act
      var result = task.canRun(cfg, acfg);
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
      expect(result).toBe('`gulp {id}-doc` to generate documentation from code annotations');
    });
  });
});
