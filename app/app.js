'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.help',
  'myApp.login',
  'myApp.signup',
  'myApp.version',
  'myApp.exchange',
  'myApp.formatNumber'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
