
$( document ).on( "pageinit", "#map-page", function() {
    function success(pos) {
        drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        consoleLog("Current: " + pos.coords.latitude + " " + pos.coords.longitude + " (" + pos.coords.accuracy + "m)");
    }
    function fail(error) {
        consoleLog("Error: " + error.message)
    }
    navigator.geolocation.watchPosition(success, fail, {maximumAge: 0, enableHighAccuracy:true, timeout: 500});
});

function consoleLog(message) {
    $("#console").show();
    $("#console").text(message);
}

var map = null;
var currentMarker = null;
function initMap(latlng) {
    if (map == null) {
        var myOptions = {
            zoom: 20,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    };
    if (currentMarker == null) {
        currentMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Current Location!"
        });    
    }   
}
function drawMap(latlng) {
    initMap(latlng);
    map.panTo(latlng);
    currentMarker.setPosition(latlng);

}
