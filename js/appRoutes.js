'use strict';

var appRoutes = angular.module('appRoutes', []);

appRoutes.config([
  '$stateProvider',
  '$locationProvider',
  function($stateProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../partials/home.html'
      })
      .state('patient', {
        url:'/patient',
        templateUrl: '../partials/patient.html'
      })
      .state('guide', {
        url:'/guide',
        templateUrl:'../partials/guide.html'
      });

    $locationProvider.html5Mode(true);
  }]);
