/**
 * @file
 *
 * ### Responsibilities
 * - create reusable logger mock for unit testing
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


/**
 * Create a mock logger instance
 * @return {{trace: (!jasmine.Spy), debug: (!jasmine.Spy), info: (!jasmine.Spy),
 * warn: (!jasmine.Spy)}}, error: (!jasmine.Spy)}}, fatal: (!jasmine.Spy)}}
 */
global.mockLogger = function() {
  return {
    'trace': jasmine.createSpy('trace'),
    'debug': jasmine.createSpy('debug'),
    'info': jasmine.createSpy('info'),
    'warn': jasmine.createSpy('warn'),
    'error': jasmine.createSpy('error'),
    'fatal': jasmine.createSpy('fatal')
  };
};
