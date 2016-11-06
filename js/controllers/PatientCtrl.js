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
      { host: 'localhost', port: 8080, path:'/peerjs' });

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


    navigator.getUserMedia({ video: false, audio: true },
      function (stream) {
        patientPeer.on('call', function(mediaConnection) {
          mediaConnection.answer(stream);
          mediaConnection.on('stream', function(stream) {
            var audio = document.getElementById('streamAudio');
            audio.src = URL.createObjectURL(stream);
          });

          $location.path('/virtuheal');
          $scope.$apply();
        });
      },
      function () {
        console.log('Audio not retrieved!');
      }
    );


    var selectionOptions = {
      button: $scope.selected,
      intensity: $scope.intensity
    };

  }
});