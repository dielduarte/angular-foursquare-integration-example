;(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {

      $routeProvider.otherwise({redirectTo: '/'});

      $routeProvider
        .when('/', {
          templateUrl: 'common/layout/index.html',
          controller: 'appController',
          controllerAs: 'vm'
        });
    }
})();
