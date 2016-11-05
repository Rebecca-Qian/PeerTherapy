'use strict';

var appRoutes = angular.module('appRoutes', []);

appRoutes.config([
  '$stateProvider',
  '$locationProvider',
  function($stateProvider, $locationProvider) {

    $locationProvider.html5Model(true);
  }]);
