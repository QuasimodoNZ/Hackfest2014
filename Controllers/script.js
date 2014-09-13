/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);

findaHomeApp.controller('mainController', function($scope, $http){

    $scope.someWord = "SomESHITs";
    $scope.homes =
        $http({method:'GET', url:'/https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=240&return_metadata=true'}).
            success(function(data,status,headers,config){

            }).
            error(function(data, status, headers, config){

            });



});