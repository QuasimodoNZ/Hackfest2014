/**
 * Created by samminns on 13/09/14.
 */
var findaHomeApp = angular.module('findaHomeApp', ['google-maps']);

var bands = 5;
var map;
var auth = 'oauth_consumer_key=5815646823D13FA7222C0797A2749E60&oauth_token=DA88138F569C33AD938CA41753487034&oauth_signature_method=PLAINTEXT&oauth_signature=8A6E9A02BD6316ACA7CB3F2D57C28609%26F0676D085E1F584D5992FBE42D6546A3';
findaHomeApp.controller('mainController', function ($scope, $http, $q, $rootScope) {
//    $scope.map = {
//        center: {
//            latitude: 45,
//            longitude: -73
//        },
//        zoom: 8
//    };
$scope.housesList = [{}];
//    // Dynamically insert the CSS style required for the markers with label.
//    var style = document.createElement('style');
//    style.type = 'text/css';
//    style.innerHTML = '.labelMarker { font-size: 15px; font-weight: bold; color: #FFFFFF;font-family: "DINNextRoundedLTProMediumRegular"; border-radius: 50%; background-color: blue;width: 20px;text-align: center;vertical-align: middle;line-height: 20px; }';
//    document.getElementsByTagName('head')[0].appendChild(style);
//
//
//    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {}};
//    $scope.options = {scrollwheel: false};
//    $scope.markersEvents = {
//        click: function (gMarker, eventName, model) {
//            if(model.$id){
//                model = model.coords;//use scope portion then
//            }
//            alert("Model: event:" + eventName + " " + JSON.stringify(model));
//        }
//    };
//
//
//    var createRandomMarker = function (i, bounds, idKey) {
//        var lat_min = bounds.southwest.latitude,
//            lat_range = bounds.northeast.latitude - lat_min,
//            lng_min = bounds.southwest.longitude,
//            lng_range = bounds.northeast.longitude - lng_min;
//
//        if (idKey == null) {
//            idKey = "id";
//        }
//
//        var latitude = lat_min + (Math.random() * lat_range);
//        var longitude = lng_min + (Math.random() * lng_range);
//        // Note, the label* properties are only used if isLabel='true' in the directive.
//        var ret = {
//            options: {draggable: true,
//                labelAnchor: '10 39',
//                labelContent: i,
//                labelClass: 'labelMarker'},
//            latitude: latitude,
//            longitude: longitude,
//            title: 'm' + i
//        };
//        ret[idKey] = i;
//        return ret;
//    };
//    $scope.randomMarkers = [];
//    $scope.randomMarkersWithLabel = [];
//    // Get the bounds from the map once it's loaded
//    $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
//        // Only need to regenerate once
//        // Create 25 markes with label, 25 without.
//        if (!ov.southwest && nv.southwest) {
//            var markers = [];
//            for (var i = 0; i < 25; i++) {
//                markers.push(createRandomMarker(i, $scope.map.bounds))
//            }
//            $scope.randomMarkers = markers;
//            markers = [];
//            for (var i = 25; i < 50; i++) {
//                markers.push(createRandomMarker(i, $scope.map.bounds))
//            }
//            $scope.randomMarkersWithLabel = markers;
//
//        }
//    }, true);




    function setUpMap() {
        console.log("Setting up map");
        var mapOptions = {
            center : {latitude : -41.2889,longitude :  174.7772},
            zoom: 11,
            panControl : false,
            streetViewControl : false,
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        map.data.loadGeoJson('wellington.geojson');
                    });
                }
            },
        bounds : { }
        };
//        $scope.map = new google.maps.Map(document.getElementById('map_canvas'),
//            mapOptions);
        $scope.map = mapOptions;

    }
    setUpMap();
    $scope.map.bounds = { southwest :-52.618591,northwest : 165.883804,
        southeast :-29.209970,northeast: -175.987198 };
    function addMarkers() {
//        for(var i=0; i< 20; i++){
//            if($scope.housesList[i].Geographics){
//                var location = new google.maps.LatLng($scope.housesList.GeographicLocation.Latitude, $scope.housesList.GeographicLocation.Longitude);
//            }
//        }

        $scope.markersEvents = {
            click: function (gMarker, eventName, model) {
                if(model.$id){
                    model = model.coords;//use scope portion then
                }
                alert("Model: event:" + eventName + " " + JSON.stringify(model));
            }
        };



    }
    var createRandomMarker = function (i, bounds, x) {
//        var lat_min = bounds.southwest.latitude,
//            lat_range = bounds.northeast.latitude - lat_min,
//            lng_min = bounds.southwest.longitude,
//            lng_range = bounds.northeast.longitude - lng_min;
//
//        if (idKey == null) {
//            idKey = "id";
//        }

        var latitude = x.GeographicLocation.Latitude;
        var longitude = x.GeographicLocation.Longitude;
        // Note, the label* properties are only used if isLabel='true' in the directive.
        var ret = {
            options: {draggable: true,
                labelAnchor: '10 39',
                labelContent: i,
                labelClass: 'labelMarker'},
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i
        };
//        ret[idKey] = i;
        return ret;
    };
    $scope.randomMarkers = [];
    $scope.randomMarkersWithLabel = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
        // Only need to regenerate once
        // Create 25 markes with label, 25 without.
//        debugger;
            var markers = [];
            for (var i = 0; i < $scope.housesList[0].length; i++) {
console.log("Making a marker");
                markers.push(createRandomMarker(i,$scope.map.bounds,$scope.housesList[0][i] ));

            }
            $scope.randomMarkers = markers;
            markers = [];
//            for (var i = 25; i < 50; i++) {
//
//            }
//            $scope.randomMarkersWithLabel = markers;


    }, true);
    //google.maps.event.addDomListener(window, 'load', initialize);

    // Load GeoJSON.
//    var geojson = $scope.map.data.loadGeoJson('wellington.geojson');
    // [END snippet-load]

    // [START snippet-style]
    // Set the stroke width, and fill color for each polygon
    var featureStyle = {

        fillColor: 'green',
        strokeWeight: 1.5,
        strokeColor: 'black',
        fillOpacity: 0.1
    }
//    $scope.map.data.setStyle(featureStyle);
    // [END snippet-style]
    function applyHeatmap(homeBands) {
        // Where homeBands is an array of of arrays of google.maps.LatLng(float, float)
        for (var i = 0; i < homeBands.length; i++) {
            //debugger;
            var homes = [];

            for (var j = 0; j < homeBands[i].length; j++) {
                if (!homeBands[i][j].hasOwnProperty('GeographicLocation'))
                    continue;

                var lng = homeBands[i][j].GeographicLocation.Longitude;
                var lat = homeBands[i][j].GeographicLocation.Latitude;

                homes.push(new google.maps.LatLng(lat, lng));
            }

            var pointArray = new google.maps.MVCArray(homes);
            if (pointArray.length == 0)
                continue;

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray
            });

            heatmap.set('gradient', getColour(i, homeBands.length));
            heatmap.setMap($scope.map);
        }
    }

    function getColour(index, length) {
        if (index < length / 2) {
            return ('rgba(255, ' + (255 * index / length) + ', 0, 1)');
        }
        else {
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
                $scope.housesList = splitToBand(houseList);
//                debugger;
                $scope.selectedHouse = $scope.housesList[1][200];
                var housesByBand = splitToBand(houseList);
//                applyHeatmap(housesByBand);
                addMarkers();
                // Only need to regenerate once
                // Create 25 markes with label, 25 without.
//        debugger;
                var markers = [];
//                debugger;
                for (var i = 0; i < $scope.housesList[0].length; i++) {

                    markers.push(createRandomMarker(i,$scope.map.bounds,$scope.housesList[0][i] ));

                }
                $scope.randomMarkers = markers;
                markers = [];
                for (var i = 25; i < 50; i++) {

                }
                $scope.randomMarkersWithLabel = markers;

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
                if (house.RateableValue && parseInt(house.RateableValue, 10) > 100000 && house.GeographicLocation != undefined) {
                    splitList.push(house);
                }
            })
        })
        return splitList;
    }

    function splitToBand(col) {
        var allBandsArr = new Array();
        var inc = col.length / bands;
        var num = inc;
        var idx = 0;
        for (var i = 0; i < bands; i++) {
            var band = col.slice(idx, num);
            idx = num;
            num += inc;
            allBandsArr.push(band);
        }
        return allBandsArr;
    }

});
function priceSort(a, b) {
    console.log("sorting fings");
    return a.RateableValue - b.RateableValue;
}
