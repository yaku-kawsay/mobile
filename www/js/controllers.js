angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope, $ionicPush, YakuService) {
  console.log('holas');
  YakuService.getDevices().then(function(devices){
  console.log(devices);
});

 $scope.notificaciones = [
    { title: 'Helada daña 43 hectáreas de papa, arveja y oca en Vinto' },
    { title: 'Alalay, Quenamari y Coña Coña, casi secas'},
    { title: 'Declaran en emergencia a Cercado por sequía y activan plan de mitigación' },
    { title: 'Declaran emergencia por sequía en la ciudad'},
    { title: 'Municipios afectados por sequía sin recursos pese a emisión de 12 decretos'},
    { title: 'Nivel de agua de la Alalay baja y peces están en riesgo'}
  ];
  
  $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Token saved:', t.token);
  });
  
  $scope.$on('cloud:push:notification', function(event, datas) {
    console.log("Datas from Push Notification");
    if(datas.message.app.asleep) {
      $state.go('tab/account'); 
    }
  });

})

.controller('MapCtrl', function($scope, $timeout, $cordovaGeolocation, uiGmapGoogleMapApi, Markers) {
  var initializeMap = function(position) {
    $scope.map = { 
      center: { 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, 
      zoom: 15
    };
  };


  $scope.markers = Markers;
  console.log(Markers);
    console.log("markers");
  uiGmapGoogleMapApi.then(function(maps) {
    if( typeof _.contains === 'undefined' ) {
        _.contains = _.includes;
      }
      if( typeof _.object === 'undefined' ) {
        _.object = _.zipObject;
    }
    
    var posOptions = {enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      console.log("Got location: " + JSON.stringify(position));
      initializeMap(position);
    }, function(error) {
      console.log(error);
    });
  });
  });
