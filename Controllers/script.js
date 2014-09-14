/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', []);
var bands = 5;
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
findaHomeApp.controller('mainController', function ($scope, $http, $q) {
var map;
    function setUpMap() {
        return;
        console.log("Setting up map");
        var mapOptions = {
            center: { lat: -42, lng: 174},
            zoom: 6
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        console.log(map);
        console.log(document.getElementById('map-canvas'));

        var taxiData = [
          new google.maps.LatLng(36.782551, -122.445368),
          new google.maps.LatLng(36.782745, -122.444586),
          new google.maps.LatLng(36.782842, -122.443688),
          new google.maps.LatLng(36.782919, -122.442815)];
          var pointArray = new google.maps.MVCArray(taxiData);
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
          });  heatmap.setMap(map);
    }

    //google.maps.event.addDomListener(window, 'load', initialize);
    setUpMap();
    function applyHeatmap(homeBands) {
        console.log("Setting up map");
        var mapOptions = {
            center: { lat: -42, lng: 174},
            zoom: 6
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        //Uncomment the following for sample data (in san fransisco)
        var taxiData = [];
          // new google.maps.LatLng(37.782551, -122.445368),
          // new google.maps.LatLng(37.782745, -122.444586),
          // new google.maps.LatLng(37.782842, -122.443688),
          // new google.maps.LatLng(37.782919, -122.442815)];

//         for (var i = 0; i < homeBands.length; i++) 
// for(var j = 0; j < homeBands[i].length; j++){
//                 if(!homeBands[i][j].hasOwnProperty('GeographicLocation'))
//                     continue;

//                 var lng = homeBands[i][j].GeographicLocation.Longitude;
//                 var lat = homeBands[i][j].GeographicLocation.Latitude;

//                 taxiData.push(new google.maps.LatLng(lat, lng));
//             }/////////////

          // var pointArray = new google.maps.MVCArray(taxiData);
        // heatmap = new google.maps.visualization.HeatmapLayer({
        //     data: pointArray
        //   });  heatmap.setMap(map);

        // Where homeBands is an array of of arrays of google.maps.LatLng(float, float)
        for (var i = 0; i < homeBands.length; i++) {
            var homes = [];

            for(var j = 0; j < homeBands[i].length; j++){
                if(!homeBands[i][j].hasOwnProperty('GeographicLocation'))
                    continue;

                var lng = homeBands[i][j].GeographicLocation.Longitude;
                var lat = homeBands[i][j].GeographicLocation.Latitude;

                homes.push(new google.maps.LatLng(lat, lng));
            }

            var pointArray = new google.maps.MVCArray(homes);

            if(!pointArray || pointArray.length==0)
                continue;

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray
            });


            var midColour = "rgba(" + (getRed(i, homeBands.length)*0.25).toString() + ", " + (getGreen(i, homeBands.length)*0.25).toString() + ", 0, 1)";
            var finalColour = "rgba(" + getRed(i, homeBands.length) + ", " + getGreen(i, homeBands.length) + ", 0, 1)";

            var gradient = ['rgba(0, 0, 0, 0)'];
            //gradient.push(midColour);
            gradient.push(finalColour);

            heatmap.set('gradient', gradient);
            heatmap.setMap(map);
            
        }
    }

    function getRed(index, length) {
        if (index < length / 2) {
            return 255;
        }
        else {
            return 255 * index / length;
        }
    }

    function getGreen(index, length) {
        if (index < length / 2) {
            return 255 * index / length;
        }
        else {
            return 255;
        }
    }

    $http({method: 'GET', url: 'https://api.trademe.co.nz/v1/Search/Property/Residential.json?category=3399&page=1&rows=500&region=15&return_metadata=true&' + auth}).
        success(function (data, status, headers, config) {
            getAllPages(data).then(function (things) {
                var houseList = spitToList(things);
                console.log(houseList);
                houseList.sort(priceSort);
                var housesByBand = splitToBand(houseList);
                console.log("Calling the applyHeatmap function");
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
                if (house.RateableValue && parseInt(house.RateableValue, 10) > 100000) {
                    splitList.push(house);
                }
            })
        })
        return splitList;
    }

    function splitToBand(col) {
        var allBandsArr = new Array();
        var inc = col.length /bands;
        var num  =  inc;
        var idx =0;
        for(var i =0; i < bands ; i++){
            var band = col.slice(idx, num);
            idx = num;
            num +=inc;
            allBandsArr.push(band);
        }
        return allBandsArr;
    }

});
function priceSort(a, b) {
    console.log("sorting fings");
    return a.RateableValue - b.RateableValue;
}
