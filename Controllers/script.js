/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
findaHomeApp.controller('mainController', function($scope, $http, $q){


    $http({method:'GET', url:'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=500&region=15&return_metadata=true&' + auth}).
        success(function(data,status,headers,config){
            $scope.homes = getAllPages(data);
        }).
        error(function(data, status, headers, config){
          alert ("Something done not right and stuff");
        });


    function getAllPages (dataArray){

        var allData = new Array();
        var totPages = Math.round( dataArray.TotalCount / 500);
//        var totPages = 7;

        for(var i=1; i <= totPages; i++){
            $http({method:'GET', url:'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=' + +i +'&rows=500&region=15&return_metadata=true&' + auth}).
                success(function(data,status,headers,config){
                    console.log(data);
                    allData.push(data);
                }).
                error(function(data, status, headers, config){
                    alert ("Something done not right and stuff");
                });
        }
        return allData;
    }
});

