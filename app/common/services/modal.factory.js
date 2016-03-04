;(function(){
  'use strict';

  angular
    .module('app')
    .factory('modalFactory', modalFactory);

  modalFactory.$inject = ['$mdDialog'];

  function modalFactory($mdDialog) {
    var baseTemplateUrl = 'modules/';
    var templateUrl, controller;

    return {
      showPlacesModal: _showPlacesModal,
      showWelcomeModal: _showWelcomeModal,
      loadingModal: _loadingModal,
      showTopFiveModal: _showTopFiveModal,
      showHeatMapModal: _showHeatMapModal
    };

    /////////////////

    /**
     *
     * @param ev
     * @param templateUrl
     * @param controller
     * @returns {*}
       * @private
       */
    function _open(templateUrl, controller) {
      return $mdDialog.show({
        controller: controller,
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });
    }


      /**
       *
       * @param ev
       * @returns {*}
       */
    function _showPlacesModal() {
      templateUrl = baseTemplateUrl + 'places/places.template.html';
      controller = 'PlacesController as vm';
      return  _open(templateUrl, controller );
    }

    /**
     *
     * @param ev
     * @returns {*}
     */
    function _showWelcomeModal() {
      templateUrl = baseTemplateUrl + 'welcome/welcome.template.html';
      controller = 'welcomeController as vm';
      return  _open(templateUrl, controller );
    }

    /**
     *
     * @param ev
     * @param open
     * @returns {*}
     * @private
     */
    function _loadingModal(open) {
      templateUrl = 'common/layout/modals/loading.template.html';

      if(open)
        return  _open(templateUrl, '');
      else
        $mdDialog.cancel();
    }

    /**
     *
     * @returns {*}
     * @private
     */
    function _showTopFiveModal() {
      templateUrl = baseTemplateUrl + 'topFive/topFive.template.html';
      controller = 'topFiveController as vm';
      return  _open(templateUrl, controller );
    }

    /**
     *
     * @returns {*}
     * @private
     */
    function _showHeatMapModal() {
      templateUrl = baseTemplateUrl + 'heatMap/heatMap.template.html';
      controller = 'heatMapController as vm';
      return  _open(templateUrl, controller );
    }

  }

})();
