;(function(){
  'use strict';

  angular
    .module('app')
    .factory('foursquareAPIFactory', foursquareAPIFactory);

  foursquareAPIFactory.$inject  = [
    'FOURSQUARE_CLIENID',
    'FOURSQUARE_CLIENSECRET',
    'FOURSQUARE_APIVERSION',
    'FOURSQUARE_APIURL',
    'FOURSQUARE_VERSIONPARAMETER',
    '$http',
    '$httpParamSerializerJQLike'
  ];

  function foursquareAPIFactory(FOURSQUARE_CLIENID, FOURSQUARE_CLIENSECRET, FOURSQUARE_APIVERSION, FOURSQUARE_APIURL, FOURSQUARE_VERSIONPARAMETER, $http, $httpParamSerializerJQLike) {
    var base_url = FOURSQUARE_APIURL + FOURSQUARE_APIVERSION;

    return {
      getCategories: _getCategories,
      searchVenues: _searchVenues,
      searchTrendings: _searchTrendings
    };

    ///////////////

    /**
     *
     * @param endpoint
     * @param params
     * @returns {*}
     * @private
     */
    function _get(endpoint, params) {
      var defaultParams = {
        client_id: FOURSQUARE_CLIENID,
        client_secret: FOURSQUARE_CLIENSECRET,
        v: FOURSQUARE_VERSIONPARAMETER
      };

      if(params !== null) {
        defaultParams = angular.merge(defaultParams, params);
      }

      var paramsURL = $httpParamSerializerJQLike(defaultParams);

      return $http.get(base_url + endpoint + paramsURL);
    }
    /**
     *
     * @returns {*}
     * @private
     */
    function _getCategories() {
      var endpoint = 'venues/categories?';

      return _get(endpoint, null);
    }

    /**
     *
     * @param cords
     * @param radius
     * @param categories
     * @returns {*}
     * @private
     */
    function _searchVenues(cords, radius, categories) {
      var endpoint = 'venues/search?';
      var ids = [];

      angular.forEach(categories, function(v, k) {
        if(categories[k].selected)
          ids.push(categories[k].id);
      });

      if(ids.length > 1)
        ids.join(',');
      else
        ids = ids[0];

      var params = {
        ll: cords.latitude + ',' + cords.longitude,
        radius: radius,
        categoryId: ids
      };

      return _get(endpoint, params);
    }

    /**
     *
     * @param cords
     * @param radus
     * @param limit
     * @returns {*}
     * @private
     */
    function _searchTrendings(cords, radius, limit) {
      var endpoint = 'venues/trending?';

      var params = {
        ll: cords.latitude + ',' + cords.longitude,
        radius: radius,
        limit: limit
      };

      return _get(endpoint, params);
    }

  }
})();
