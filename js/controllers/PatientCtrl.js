'use strict';

var controllers = angular.module('PatientCtrl', []);

controllers.controller('PatientController', function($scope) {

  $scope.intensity = 0;
  $scope.selected = null;

  // Intensity Values
  var depressionValues = {
    depression: 2,
    anxiety: 4
  };

  $scope.toggleButton = function(buttonDesc) {
    var prevSelected = $scope.selected;
    if (!_.isNil($scope.selected)) {
      $scope.selected = null;
      $scope.intensity = 0;
    }
    if (!_.isEqual(buttonDesc, prevSelected)) {
      $scope.selected = buttonDesc;
      $scope.intensity = depressionValues[buttonDesc];
    }
  };
});