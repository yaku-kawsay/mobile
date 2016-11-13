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
        "latitude": "-17.372841",
        "longitude": "-66.138232"
      },
      "window": {
        "title": "Sensor de Temperatura 1",
        "description": "Descripcion"
      }
    },
    {
      "id": "1",
      "coords": {
        "latitude": "-17.370294",  
        "longitude": "-66.135580"
      },
      "window" : {
        "title": "Sensor de Temperatura 2",
        "description": "Descripcion"
      }
    }
  ];
  return Markers;
})

.factory('YakuService', function($http) {
  var users = [];

  return {
    getDevices: function(){
      return $http.get("http://10.100.160.39:8080/yakukawsay/resources/devices").then(function(response){
        users = response;
        return users;
      });
    },

    getDeviceData: function(){
      return $http.get("http://10.100.160.39:8080/yakukawsay/resources/devices/1/datas").then(function(response){
        users = response;
        return users;
      });
    }
  }
});