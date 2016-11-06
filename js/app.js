'use strict';

var app = angular.module('peerTherapyApp', [
  'ui.router',
  'appRoutes',
  'PatientCtrl',
  'GuideCtrl',
  'PeerService'
  ])
  // Global access for lodash in angular modules
  .constant('_', window._);
