'use strict';

var app = angular.module('peerTherapyApp', [
  'ui.router',
  'appRoutes'
  ])
  // Global access for lodash in angular modules
  .constant('_', window._);