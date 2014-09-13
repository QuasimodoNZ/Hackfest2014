/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
//findaHomeApp.run(function($http) {
//    $http.defaults.headers.common.Authorization = 'Authorization: OAuth 5815646823D13FA7222C0797A2749E60", oauth_token="DA88138F569C33AD938CA41753487034", oauth_signature_method="PLAINTEXT", oauth_signature="8A6E9A02BD6316ACA7CB3F2D57C28609&F0676D085E1F584D5992FBE42D6546A3"'
//});

findaHomeApp.controller('mainController', function($scope, $http){

    $scope.someWord = "SomESHITs";

    $http({method:'GET', url:'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=240&return_metadata=true&' + auth}).
        success(function(data,status,headers,config){
            debugger;
            $scope.homes = data;
        }).
        error(function(data, status, headers, config){
          alert ("Something done not right and stuff");
        });



});