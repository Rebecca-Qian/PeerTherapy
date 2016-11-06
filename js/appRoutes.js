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
      .state('navigation', {
        url:'/navigation',
        templateUrl: '../partials/navigation.html',
       // controller: 'PatientController'
      })
      .state('patient', {
        url:'/patient',
        templateUrl: '../partials/patient.html',
        controller: 'PatientController'
      })
      .state('guide', {
        url:'/guide',
        templateUrl:'../partials/guide.html'
      })
      .state('virtuheal', {
        url:'/virtuheal',
        templateUrl:'../partials/virtuheal.html'
      });

    $locationProvider.html5Mode(true);
  }]);
