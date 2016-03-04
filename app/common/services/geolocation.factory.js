;(function(){
  'use strict';

  angular
    .module('app')
    .factory('geolocationFactory', geolocationFactory);

  geolocationFactory.$inject = [
    '$q',
    '$mdDialog'
  ];

  function geolocationFactory($q, $mdDialog) {
    var cords = {};
    var deferred = $q.defer();

    return {
      getPermission: _getPermission,
      getLocation: _getLocation
    };

    ///////////////

    /**
     *
     * @private
     */
    function _getPermission() {

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(_setLocation);
      }
      else {
        deferred.reject("Geolocation is not supported by this browser.");
      }

      return deferred.promise;
    }


    /**
     *
     * @param data
     * @private
     */
    function _setLocation(data) {
      cords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };

      deferred.resolve(cords);
    }

    /**
     *
     * @returns {{}}
     * @private
     */
    function _getLocation() {
      return cords;
    }

  }
})();
