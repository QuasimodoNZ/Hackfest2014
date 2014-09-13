 function initialize() {
                var mapOptions = {
                    zIndex: -1,
                    center : new google.maps.LatLng(-41.2889, 174.7772),
                    zoom :11,
                    mapTypeId : google.maps.MapTypeId.ROADMAP,//TERRAIN, //ROADMAP SATELLITE
                    panControl : false,
                    streetViewControl : false,
                    scaleControl : true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    disableDoubleClickZoom : true,
                    zoomControlOptions : {
                        style : google.maps.ZoomControlStyle.DEFAULT,
                        position : google.maps.ControlPosition.RIGHT_CENTER
                    }
                };
                var map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
                  // [START snippet-load]
  // Load GeoJSON.
  map.data.loadGeoJson('wellington.geojson');
  // [END snippet-load]

  // [START snippet-style]
  // Set the stroke width, and fill color for each polygon
  var featureStyle = {
    fillColor: 'green',
    strokeWeight: 1.5,
    strokeColor: 'black',
    fillOpacity: 0.1
  }
  map.data.setStyle(featureStyle);
  // [END snippet-style]

                var strictBounds = new google.maps.LatLngBounds(
                     new google.maps.LatLng(-52.618591, 165.883804),
                     new google.maps.LatLng(-29.209970, -175.987198)                    
                );
                var boundingBoxPoints = [
                    strictBounds.getNorthEast(), new google.maps.LatLng(strictBounds.getNorthEast().lat(), strictBounds.getSouthWest().lng()),
                    strictBounds.getSouthWest(), new google.maps.LatLng(strictBounds.getSouthWest().lat(), strictBounds.getNorthEast().lng()), strictBounds.getNorthEast()
                ];
                var drawBounds= new google.maps.Polyline({
                    path: boundingBoxPoints,
                    strokeColor: '#F0F0F0',
                    strokeOpacity: 1.0,
                    strokeWeight: 0.5,
                      // map: map
                });
                drawBounds.setMap(map);
                //map.fitBounds(strictBounds);
                var mapCenter = new google.maps.LatLng(-41.2889,174.7772)

                google.maps.event.addListener(map, 'dragend', function() {

                
                 // We're out of bounds - Move the map back within the bounds

                var c = map.getCenter(),
                   x = c.lng(),
                   y = c.lat(),
                   maxX = strictBounds.getNorthEast().lng(),
                   maxY = strictBounds.getNorthEast().lat(),
                   minX = strictBounds.getSouthWest().lng(),
                   minY = strictBounds.getSouthWest().lat();
                 
                   console.log("max x");
                   console.log(maxX);
                   console.log("min x");
                   console.log(minX);
                   if (x < minX) x = minX;
                   if (x > maxX) x = maxX;

                   if (y < minY) y = minY;
                   if (y > maxY) y = maxY;

                   map.setCenter(mapCenter);
                   if (strictBounds.contains(map.getCenter())) return;
                });
              }
              

              google.maps.event.addDomListener(window, 'load', initialize);