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
	this.city = "London,us";
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
	//http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b6907d289e10d714a6e88b30761fae22
	$scope.weatherAPI = $resource('http://samples.openweathermap.org/data/2.5/forecast',{callback: "JSON_CALLBACK"},{get:{method:"JSONP"}});
	$scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, appid : 'b6907d289e10d714a6e88b30761fae22' });
	console.log($scope.weatherResult);
}]);