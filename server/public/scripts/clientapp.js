var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/default', {
      templateUrl: '/views/default.html',
      controller: "ApplicationController"
    })
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "PassportController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "PassportController"
    })
    .otherwise({
    redirectTo: 'default'
});

}]);
