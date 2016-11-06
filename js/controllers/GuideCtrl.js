'use strict';

var controllers = angular.module('GuideCtrl', ['PeerService']);

controllers.controller('GuideController', function($scope, $location, PeerServ) {
  $scope.enterTherapy = function() {
    var guidePeer = new Peer('guideTest',
      { host: 'localhost', port: 8080, path: '/peerjs' });

    PeerServ.getIds()
      .then(function(ids) {
          let patientIds = ids.data.patientIds;
          if (!_.isEmpty(patientIds)) {
            var patientId = patientIds[0];
            // Implementing voicecall.
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            navigator.getUserMedia({ video: false, audio: true },
              function (stream) {
                var audioCall = guidePeer.call(patientId, stream);
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
  }
});
