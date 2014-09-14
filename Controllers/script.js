/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);
var bands = 10;
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
findaHomeApp.controller('mainController', function ($scope, $http, $q) {

    function setUpMap(){
        console.log("Setting up map");
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    }
    //google.maps.event.addDomListener(window, 'load', initialize);
    setUpMap();
    function applyHeatmap(homeBands) {
        // Where homeBands is an array of of arrays of google.maps.LatLng(float, float)
        for (var i = 0; i < homeBands.length; i++) {
            //debugger;
            var homes = [];

            for(var j = 0; j < homeBands[i][0].length; j++){
                // console.log(i+ ' ' + j);

                // if(j==1121)
                //     debugger;
                if(!homeBands[i][0][j].hasOwnProperty('GeographicLocation'))
                    continue;

                var lng = homeBands[i][0][j].GeographicLocation.Longitude;
                var lat = homeBands[i][0][j].GeographicLocation.Latitude;

                homes.push(new google.maps.LatLng(lat, lng));
            }

            var pointArray = new google.maps.MVCArray(homes);
            if(pointArray.length==0)
                continue;

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray
            });

            heatmap.set('gradient', getColour(i, homeBands.length));
            heatmap.setMap($scope.map);
        }
    }

      function getColour(index, length){
        if(index < length/2){
          return ('rgba(255, ' + (255 * index / length) +', 0, 1)');
        }
        else{
          return 'rgba(' + (255 * index / length) + ', 255, 1)';
        }
      }

    $http({method: 'GET', url: 'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=500&region=15&return_metadata=true&' + auth}).
        success(function (data, status, headers, config) {
            getAllPages(data).then(function (things) {
//                debugger;
                var houseList = spitToList(things);
                console.log(houseList);
                houseList.sort(priceSort);
                var housesByBand = splitToBand(houseList);
                setUpMap();
                applyHeatmap(housesByBand);
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
        for (var i = 1; i <= bands; i++) {
            var bandArr = new Array();
            bandArr.push(col.filter(function (house) {
                return ( ( house.RateableValue > (i-1 * inc))&&(( house.RateableValue < (i * inc))) );
            }))
            allBandsArr.push(bandArr);
        }
        return allBandsArr;
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
