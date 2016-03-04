;(function(){
  'use strict';

  angular
    .module('topFiveModule')
    .controller('topFiveController', topFiveController);


  topFiveController.$inject = [
    '$mdDialog',
    '$scope',
    'foursquareAPIFactory',
    'modalFactory',
    'geolocationFactory',
    'leafletFactory',
    '$mdToast'
  ];

  function topFiveController($mdDialog, $scope, foursquareAPIFactory, modalFactory, geolocationFactory, leafletFactory, $mdToast){
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
      var cords = geolocationFactory.getLocation();

      leafletFactory.start(cords.latitude, cords.longitude);

      foursquareAPIFactory.searchTrendings(cords, vm.distance, 5).then(function(data){
        _showTopFive(data.data.response.venues);
      });
    }

    /**
     *
     * @param places
     * @private
     */
    function _showTopFive(places) {
      if(places.length > 0) {
        _close();

        angular.forEach(places, function(v, k){
          leafletFactory.setMarkerWithPopup(places[k].location.lat, places[k].location.lng, places[k].name);
        });
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('For you current position foursquare did not find any top five place :/!')
            .position('top right')
            .hideDelay(5000)
        );
      }
    }
  }
})();
