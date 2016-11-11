angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $ionicPush) {
  $scope.settings = {
    enableFriends: true
  };
  
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
  console.log("markers");
  console.log(Markers);
  $scope.markers = Markers;
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

   /* $scope.markers = [];
    $scope.infoVisible = false;
    $scope.infoBusiness = {};

    // Initialize and show infoWindow for business
    $scope.showInfo = function(marker, eventName, markerModel) {
      $scope.infoBusiness = markerModel;
      $scope.infoVisible = true;
    };

    // Hide infoWindow when 'x' is clicked
    $scope.hideInfo = function() {
      $scope.infoVisible = false;
    };

    var initializeMap = function(position) {
      console.log(position);
      if (!position) {
        // Default to downtown Toronto
        position = {
          coords: {
            latitude: 43.6722780,
            longitude: -79.3745125
          }
        };
      }
      console.log(position);
      // TODO add marker on current location

      $scope.map = {
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        zoom: 16
      };

      // Make info window for marker show up above marker
      $scope.windowOptions = {
        pixelOffset: {
          height: -32,
          width: 0
        }
      };

      Yelp.search(position).then(function(data) {
        console.log(data);
        for (var i = 0; i < 10; i++) {
          var business = data.data.businesses[i];
          $scope.markers.push({
            id: i,
            name: business.name,
            url: business.url,
            location: {
              latitude: business.location.coordinate.latitude,
              longitude: business.location.coordinate.longitude
            }
          });
        }
      }, function(error) {
        console.log("Unable to access yelp");
        console.log(error);
      });
    };

    uiGmapGoogleMapApi.then(function(maps) {
      // Don't pass timeout parameter here; that is handled by setTimeout below
      var posOptions = {enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
        console.log("Got location: " + JSON.stringify(position));
        initializeMap(position);
      }, function(error) {
        console.log(error);
        initializeMap();
      });
    });

    // Deal with case where user does not make a selection
    $timeout(function() {
      if (!$scope.map) {
        console.log("No confirmation from user, using fallback");
        initializeMap();
      }
    }, 5000);
    */
  });
