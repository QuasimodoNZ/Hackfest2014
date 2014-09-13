/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
findaHomeApp.controller('mainController', function ($scope, $http, $q) {


    $http({method: 'GET', url: 'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=500&region=15&return_metadata=true&' + auth}).
        success(function (data, status, headers, config) {
            $scope.homes = getAllPages(data);
        }).
        error(function (data, status, headers, config) {
            alert("Something done not right and stuff");
        });
    function getAllPages(dataArray) {
        console.log("In get all")
        var allData = new Array();
        var totPages = Math.round(dataArray.TotalCount / 500);
        for (var i = 1; i <= totPages; i++) {
            var promise = $http({method: 'GET', url: 'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=' + +i + '&rows=500&region=15&return_metadata=true&' + auth});
            promise.then(function (data) {
                for (var i = 0; i < data.data.List.length; i++) {
                    if (data.data.List[i].RateableValue != undefined && data.data.List[i].RateableValue > 100000 ) {
                        allData.push(data.data.List[i])
                    }

                }
                allData.sort(priceSort);
            }, function (error) {
                alert("Oh bollocks that didnt work right cuzzz" + error);
            });
        }
        return allData;
    }
});
function priceSort(a, b) {
    console.log("sorting fings");
    if (a.RateableValue < b.RateableValue) {
        return -1;
    }
    else if (a.RateableValue > b.RateableValue) {
        return 1;
    }
    return 0;
}
