
$( document ).on( "pageinit", "#map-page", function() {
    function success(pos) {
        update(pos);
    }
    function fail(error) {
        consoleLog("Error: " + error.message)
    }
    navigator.geolocation.watchPosition(success, fail, {maximumAge: 0, enableHighAccuracy:true, timeout: 500});
    setInterval(function() { drawMap(); }, 10000);
    setInterval(function() { average(); }, 1000);
});

function consoleLog(message) {
    $("#console").show();
    $("#console").text(message);
}

var currentPosition;
function update(pos) {
    currentPosition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
    };
    initMap();
    //consoleLog("Current: " + pos.coords.latitude + " " + pos.coords.longitude + " (" + pos.coords.accuracy + "m)");
}

var doAverage = true;
var averagePosition;
var averageBasePosition;
var averageOffset = {
    latitude: 0,
    longitude: 0,
    count: 0
};
var averageOffsetCount = 0;
function average() {
    if (!doAverage) return;
    var pos = currentPosition;
    if (!averageBasePosition) {
        averageBasePosition = pos;
        return;
    }
    var latOffset = pos.latitude - averageBasePosition.latitude;
    var lonOffset = pos.longitude - averageBasePosition.longitude;
    averageOffset.latitude += latOffset;
    averageOffset.longitude += lonOffset;
    averageOffset.count++;
    averagePosition = {
        latitude: averageBasePosition.latitude + averageOffset.latitude/averageOffset.count,
        longitude: averageBasePosition.longitude + averageOffset.longitude/averageOffset.count
    }
    consoleLog("Averaging: " + averagePosition.latitude + " " + averagePosition.longitude + " (" + (averageOffset.count+1) + " samples)");
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
function drawMap() {
    var latlng =  new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
    initMap(latlng);
    map.panTo(latlng);
    currentMarker.setPosition(latlng);

}
