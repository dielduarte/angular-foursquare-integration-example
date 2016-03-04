;(function() {
  'use strict';

  angular
    .module('welcomeModule')
    .controller('welcomeController', welcomeController);

  welcomeController.$inject = ['$mdDialog'];

  function welcomeController($mdDialog){
    /* jshint ignore:start */
    var vm = this;
    /* jshint ignore:end */

    vm.close = _close;
    vm.startest = _startest;

    /////////////////

    /**
     *
     * @private
     */
    function _close() {
      $mdDialog.cancel();
    }

    function _startest() {
      $mdDialog.hide();
    }

  }
})();
