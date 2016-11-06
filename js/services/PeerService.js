'use strict';

var services = angular.module('PeerService', []);

services.factory('PeerServ', ['$http', function($http) {
  return {
    getIds: function() {
      return $http.get('/api/peerIds');
    }
  };
}]);
