;(function(){
  'use strict';

  angular
    .module('heatMapModule')
    .controller('heatMapController', heatMapController);


  heatMapController.$inject = [
    '$mdDialog',
    '$scope',
    'foursquareAPIFactory',
    'modalFactory',
    'geolocationFactory',
    'leafletFactory',
    'gmapsFactory'
  ];

  function heatMapController($mdDialog, $scope, foursquareAPIFactory, modalFactory, geolocationFactory, leafletFactory, gmapsFactory){
    /* jshint ignore:start */
    var vm = this;
    /* jshint ignore:end */

    vm.close = _close;
    vm.filter = _filter;


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

      var cords = {};

      gmapsFactory.getAddress(vm.city).then(function(data){

        cords = {
          latitude: data.data.results[0].geometry.location.lat,
          longitude: data.data.results[0].geometry.location.lng
        };

        leafletFactory.start(cords.latitude, cords.longitude);

        foursquareAPIFactory.searchVenues(cords, 1000000, '').then(function(data){
          _showHeatMapPlaces(data, cords);
        });
      });
    }

    /**
     *
     * @param places
     * @param cords
     * @private
     */
    function _showHeatMapPlaces(places, cords) {
      _close();
      leafletFactory.generateHeatMap(places.data.response.venues, cords);
    }

  }
})();
