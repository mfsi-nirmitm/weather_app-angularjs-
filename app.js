// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICE
weatherApp.service('cityService',function(){
	this.city = "New York, NY";
});


// CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService', function($scope,cityService) {
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forecastController', ['$scope','$resource','cityService', function($scope,$resource,cityService) {
    $scope.city = cityService.city;
	$scope.weatherAPI = $resource('http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b6907d289e10d714a6e88b30761fae22');
}]);