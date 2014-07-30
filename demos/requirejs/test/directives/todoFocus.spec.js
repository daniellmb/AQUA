define([
  'directives/todoFocus',
  'angularMocks'
], function(todoFocus, mocks) {
  'use strict';

  describe('directives', function() {
    beforeEach(mocks.module('todomvc'));

    var scope, compile, browser;

    beforeEach(inject(function ($rootScope, $compile, $browser) {
      scope = $rootScope.$new();
      compile = $compile;
      browser = $browser;
    }));

    describe('todoFocus directive', function() {
      it('should focus on truthy expression', function() {
        var el = angular.element('<input todo-focus="focus">');
        scope.focus = false;

        compile(el)(scope);
        expect(browser.deferredFns.length).toBe(0);

        scope.$apply(function () {
          scope.focus = true;
        });

        expect(browser.deferredFns.length).toBe(1);
      });
    });
  });
});