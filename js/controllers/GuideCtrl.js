'use strict';

var controllers = angular.module('GuideCtrl', ['PeerService']);

controllers.controller('GuideController', function($scope, $location, PeerServ) {
  $scope.enterTherapy = function() {
    var guidePeer = new Peer('guideTest',
      { key: 'cos2lor9r725ipb9' });
    // Implementing voicecall.
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia({ video: false, audio: true },
      function (stream) {
        var audioCall = guidePeer.call('patientTest', stream);
        audioCall.on('stream', function(stream) {
          var audio = document.getElementById('streamAudio');
          audio.src = URL.createObjectURL(stream);
        });
      },
      function () {
        console.log('Audio not retrieved!');
      }
    );

    $location.url('/virtuheal');
    };
});
