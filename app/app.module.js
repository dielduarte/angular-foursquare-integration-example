;(function () {
    'use strict';

    angular
        .module('app', ['env',
                        'ngRoute',
                        'ngSanitize',
                        'ngMaterial',
                        'ngMessages',
                        'PlacesModule',
                        'welcomeModule',
                        'topFiveModule',
                        'heatMapModule']);
})();
