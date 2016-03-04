;(function(){
  'use strict';

  angular
    .module('app')
    .factory('gmapsFactory', gmapsFactory);

  gmapsFactory.$inject = [
    '$http'
  ];

  function gmapsFactory($http){


    return {
      getAddress: _getAddress
    };

    /////////////////


    function _getAddress(address){
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&sensor=false');
    }

  }

})();
