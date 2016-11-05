'use strict';

var controllers = angular.module('PatientCtrl', []);

controllers.controller('PatientController', function($scope) {
  $scope.depression = false;
  $scope.anxiety = false;

  $scope.toggleDepression = function() {
    if ($scope.depression) {
      $scope.depression = false;
    }
    else if ($scope.anxiety) {
      $scope.depression = true;
      $scope.anxiety = false;
    }
    else {
      $scope.depression = true;
    }
  };

  $scope.toggleAnxiety = function() {
    if ($scope.depression) {
      $scope.depression = false;
      $scope.anxiety = true;
    }
    else if ($scope.anxiety) {
      $scope.anxiety = false;
    }
    else {
      $scope.anxiety = true;
    }
  };
});