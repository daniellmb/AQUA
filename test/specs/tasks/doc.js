/**
 * @file
 *
 * ### Responsibilities
 * - unit test the AQUA Doc task.
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
/*jshint maxstatements: 100*/
'use strict';

describe('doc', function() {
  var task, aqua, pcfg, gulp,
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

  describe('getSrc', function() {
    beforeEach(function() {
      // extend the default config
      pcfg.src = [];

      // add spies
      spyOn(pcfg.src, 'slice').and.callThrough();
    });

    it('should copy the source array', function() {
      // arrange
      // act
      task.getSrc(pcfg);
      // assert
      expect(pcfg.src.slice).toHaveBeenCalled();
    });
    it('should check for optional type definitions', function() {
      // arrange
      pcfg.types = ['types'];
      // act
      var result = task.getSrc(pcfg);
      // assert
      expect(result).toEqual(pcfg.types);
    });
    it('should check for optional readme file', function() {
      // arrange
      pcfg.readme = 'readme';
      // act
      var result = task.getSrc(pcfg);
      // assert
      expect(result).toEqual([pcfg.readme]);
    });
    it('should check for optional page objects', function() {
      // arrange
      pcfg.e2e = {
        pgobj: ['pgobj']
      };
      // act
      var result = task.getSrc(pcfg);
      // assert
      expect(result).toEqual(pcfg.e2e.pgobj);
    });
    it('should return the list of sources', function() {
      // arrange
      // act
      var result = task.getSrc(pcfg);
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
      var result = task.getTemplate(acfg, pcfg);
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
      doc = jasmine.createSpy('doc').and.callFake(function() {
        return doc;
      });
      doc.on = jasmine.createSpy('on').and.returnValue('on');

      // mock path module
      path = {
        join: jasmine.createSpy('join').and.returnValue('join')
      };

      // mock lodash module
      lodash = {
        assign: jasmine.createSpy('assign').and.returnValue('assign')
      };

      // mock require
      mockReq = jasmine.createSpy('mockReq').and.callFake(function(name) {
        switch (name) {
          case 'gulp-jsdoc': return doc;
          case 'path': return path;
          default: throw 'Unexpected require ' + name;
        }
      });

      // use dependency injection to inject mock require
      task.__set__('require', mockReq);

      // add spies
      spyOn(task, 'getSrc').and.returnValue('getSrc');
      spyOn(task, 'getExtras').and.returnValue('getExtras');
      spyOn(task, 'getTemplate').and.returnValue('getTemplate');
    });

    it('should load dependencies', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(mockReq).toHaveBeenCalledWith('gulp-jsdoc');
    });
    it('should look up the sources to generate docs from', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(task.getSrc).toHaveBeenCalledWith(pcfg);
      expect(gulp.src).toHaveBeenCalledWith('getSrc');
    });
    it('should build the output path', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(path.join).toHaveBeenCalledWith(aqua.cfg.docs.dir, pcfg.id.toLowerCase());
    });
    it('should check the complexity of the JavaScript source code', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
      // assert
      expect(doc).toHaveBeenCalledWith('join', 'getTemplate', task.options);
      expect(gulp.pipe).toHaveBeenCalledWith('on');
    });
    it('should listen for errors', function() {
      // arrange
      // act
      task.run(aqua, pcfg, gulp);
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
      pcfg.src = [];
      // act
      var result = task.canRun(pcfg, acfg);
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
