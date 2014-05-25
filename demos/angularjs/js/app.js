/*global angular */

angular.module('todomvc', ['ngRoute'])
      .config(function($routeProvider) {
      'use strict';

      $routeProvider.when('/', {
        controller: 'TodoCtrl',
        templateUrl: 'todomvc-index.html'
      }).when('/:status', {
        controller: 'TodoCtrl',
        templateUrl: 'todomvc-index.html'
      }).otherwise({
        redirectTo: '/'
      });
    });
