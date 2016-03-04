;(function(){
  'use strict';

  angular
    .module('app')
    .directive('softOptions', softOptions);

  function softOptions() {
    return {
      restrict:'EA',
      templateUrl: 'widgets/soft-options/template.html',
      controller: 'softOptionsController'
    };
  }
})();
