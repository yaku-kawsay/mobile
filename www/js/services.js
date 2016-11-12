angular.module('starter.services', ['starter.constants'])

.factory('Yelp', function($http, $q, apiUrl) {
    return {
      search: function(position) {
        return $http({
          method: "get",
          url: apiUrl + 'api/v1/yelp/search',
          params: {
            limit: 10,
            radius_filter: 500,
            sort: 1,
            ll: [position.coords.latitude, position.coords.longitude].join()
          }
        });
      }
    };
  })

.factory("Markers", function(){
  var Markers = [
    {
      "id": "0",
      "coords": {
        "latitude": "-17.4194",
        "longitude": "-66.1325"
      },
      "window": {
        "title": "Sensor de humedad 1",
        "description": "Descripcion"
      }
    },
    {
      "id": "1",
      "coords": {
        "latitude": "-17.3333",
        "longitude": "-66.1667"
      },
      "window" : {
        "title": "Sensor de humedad 2",
        "description": "Descripcion"
      }
    }
  ];
  return Markers;
});