;(function(){
  'use strict';

  angular
    .module('PlacesModule')
    .controller('PlacesController', PlacesController);


  PlacesController.$inject = [
    '$mdDialog',
    '$scope',
    'foursquareAPIFactory',
    'geolocationFactory',
    'leafletFactory'
  ];

  function PlacesController($mdDialog, $scope, foursquareAPIFactory, geolocationFactory, leafletFactory){
    /* jshint ignore:start */
    var vm = this;
    /* jshint ignore:end */

    vm.close = _close;
    vm.filter = _filter;

    foursquareAPIFactory.getCategories().then(function(data){
      $scope.categories = data.data.response.categories;
    });

    /**
     *
     * @private
     */
    function _close() {
      $mdDialog.cancel();
    }

    /**
     *
     * @private
     */
    function _filter() {
      var cords = geolocationFactory.getLocation();
      leafletFactory.start(cords.latitude, cords.longitude);
      foursquareAPIFactory.searchVenues(cords, vm.distance, $scope.categories).then(function(data){
        _showPlaces(data.data.response.venues);
      });
    }

    /**
     *
     * @param places
     * @private
     */
    function _showPlaces(places) {
      _close();

      angular.forEach(places, function(v, k){
        leafletFactory.setMarkerWithPopup(places[k].location.lat, places[k].location.lng, places[k].name);
      });

    }
  }
})();
