/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);
var bands = 10;
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
findaHomeApp.controller('mainController', function ($scope, $http, $q) {


    $http({method: 'GET', url: 'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=500&region=15&return_metadata=true&' + auth}).
        success(function (data, status, headers, config) {
            getAllPages(data).then(function (things) {
//                debugger;
                var houseList = spitToList(things);
                console.log(houseList);
                houseList.sort(priceSort);
                var housesByBand = splitToBand(houseList);

            });

        }).
        error(function (data, status, headers, config) {
            alert("Something done not right and stuff");
        });

    function getAllPages(dataArray) {
        console.log("In get all")
        var promArr = new Array();
        var totPages = Math.round(dataArray.TotalCount / 500);
        for (var i = 1; i <= totPages; i++) {
            promArr.push($http({method: 'GET', url: 'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=' + +i + '&rows=500&region=15&return_metadata=true&' + auth}));
        }
        var megaProm = $q.all(promArr);
        return megaProm;
    }

    function spitToList(arr) {
        var splitList = new Array();
        arr.forEach(function (coll) {
            coll.data.List.forEach(function (house) {
                if (house.RateableValue != undefined && house.RateableValue > 100000) {
                    splitList.push(house);
                }
            })
        })
        return splitList;
    }

    function splitToBand(col) {
        var minRV = col[0].RateableValue;
        var maxRV = col[col.length - 1].RateableValue;
        console.log(maxRV);
        console.log(minRV);
        var rangeRV = maxRV - minRV;
        var inc = rangeRV / bands;
        console.log(inc);
        var allBandsArr = new Array();
        for (var i = 0; i < bands; i++) {
            var bandArr = new Array();
            bandArr.push(col.filter(function (house) {
                return house.RateableValue < (i * inc);
            }))
            allBandsArr.push(bandArr);
        }
        return allBandsArr;
    }

});
function priceSort(a, b) {
    console.log("sorting fings");
    return a.RateableValue - b.RateableValue;

}
//module.exports = {priceSort: priceSort };