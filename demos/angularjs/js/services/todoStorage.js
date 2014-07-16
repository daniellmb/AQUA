/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc')
	.factory('todoStorage', function () {
		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		return {
			get: function () {
				return JSON.parse(window.localStorage.getItem(STORAGE_ID) || '[]');
			},

			put: function (todos) {
        window.localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			}
		};
	});
