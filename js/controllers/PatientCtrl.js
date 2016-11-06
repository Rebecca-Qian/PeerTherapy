'use strict';

var controllers = angular.module('PatientCtrl', ['PeerService']);

controllers.controller('PatientController', function($scope, $location, PeerServ) {

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

  $scope.enterTherapy = function() {
    var patientPeer = new Peer('patientTest',
      { key: 'cos2lor9r725ipb9' });

    patientPeer.on('call', function(mediaConnection) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      
      navigator.getUserMedia({ video: false, audio: true },
        function (stream) {
          mediaConnection.answer(stream);
        },
        function () {
          console.log('Audio not retrieved!');
        }
      );
      mediaConnection.on('stream', function(stream) {
        $location.url('/virtuheal');
        $scope.$apply();
        var audio = document.getElementById('streamAudio');
        audio.src = URL.createObjectURL(stream);
      });

      var selectionOptions = {
        button: $scope.selected,
        intensity: $scope.intensity
      };
    });
  };
});