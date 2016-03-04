;(function() {
  'use strict';

  angular
    .module('app')
    .controller('softOptionsController', softOptionsController);

  softOptionsController.$inject = [
      '$scope',
      '$timeout',
      'modalFactory',
      'geolocationFactory',
      'leafletFactory'
    ];

  function softOptionsController($scope, $timeout, modalFactory, geolocationFactory, leafletFactory) {
    $scope.openPlacesModal = _openPlacesModal;
    $scope.openHeatMapModal = _openHeatMapModal;
    $scope.openTopFiveModal = _openTopFiveModal;

    $timeout(function(){
      _openWelcome();
    });

    /**
     *
     * @private
     */
    function _openWelcome() {
      modalFactory.showWelcomeModal().then(function(){
        _initialActions();
      });
    }

    /**
     *
     * @private
     */
    function _openPlacesModal() {
      modalFactory.showPlacesModal();
    }

    /**
     *
     * @private
     */
    function _openHeatMapModal() {
      modalFactory.showHeatMapModal();
    }

    /**
     *
     * @private
     */
    function _openTopFiveModal() {
      modalFactory.showTopFiveModal();
    }

    /**
     *
     * @private
     */
    function _initialActions() {
      modalFactory.loadingModal(true);
      geolocationFactory.getPermission().then(function(cords) {
        leafletFactory.setView(cords.latitude, cords.longitude);
        modalFactory.loadingModal(false);
      });
    }
  }
})();
