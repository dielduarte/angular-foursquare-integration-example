;(function(){
  'use strict';

  angular
    .module('app')
    .factory('leafletFactory', leafletFactory);

  leafletFactory.$inject = [
    'MAPBOX_CLIENTID',
    'MAPBOX_ACCESTOKEN',
    'geolocationFactory'
  ];

  function leafletFactory(MAPBOX_CLIENTID, MAPBOX_ACCESTOKEN, geolocationFactory){
    var map;


    var markerIcon = L.icon({
      iconUrl: 'assets/img/marker.svg'
    });

    var currentLocationIcon = L.icon({
      iconUrl: 'assets/img/userMarker.svg'
    });

    return {
      start: _start,
      setView: _setView,
      setMarker: _setMarker,
      setMarkerWithPopup: _setMarkerWithPopup,
      generateHeatMap: _generateHeatMap
    };

    /////////////////

    /**
     *
     * @param lat
     * @param long
     * @private
     */
    function _start(lat, long){
      if(map !== undefined)
        map.remove();

      map = L.map('map').setView([lat, long], 13);
      _startImagery();
      _setMarker(lat, long);
    }

    /**
     *
     * @private
     */
    function _startImagery(){
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + MAPBOX_ACCESTOKEN, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: MAPBOX_CLIENTID,
        accessToken: MAPBOX_ACCESTOKEN
      }).addTo(map);
    }

      /**
       *
       * @param lat
       * @param long
       * @private
       */
    function _setView(lat, long) {
      map.setView(L.latLng(lat, long), 16);
      _setMarker(lat, long);
    }

    /**
     *
     * @param lat
     * @param long
     */
    function _setMarker(lat, long) {
      L.marker(L.latLng(lat, long), {icon: currentLocationIcon})
        .bindPopup('Current location! =)')
        .addTo(map);
    }

    /**
     *
     * @param lat
     * @param long
     * @param popupText
     * @private
     */

    function _setMarkerWithPopup(lat, long, popupText) {
      L.marker(L.latLng(lat, long), {icon: markerIcon})
        .bindPopup(popupText)
        .addTo(map);
    }

    /**
     *
     * @param places
     * @param cords
     * @private
     */
    function _generateHeatMap(places, cords){

      var heatMapMarkers = [];

      angular.forEach(places, function(v, k) {
        heatMapMarkers.push([
          places[k].location.lat,
          places[k].location.lng
        ]);
      });

      var heat = L.heatLayer(heatMapMarkers,{
        radius: 20,
        blur: 15,
        maxZoom: 17,
      }).addTo(map);

      _setView(cords.latitude, cords.longitude);
    }

  }

})();
