;(function(){
  'use strict';

  angular
    .module('app')
    .controller('appController', appController);

  appController.$inject = ['leafletFactory'];

  function appController(leafletFactory){
    /* jshint ignore:start */
    var vm = this;
    /* jshint ignore:end */


    leafletFactory.start(51.505, -0.09);
  }
})();
