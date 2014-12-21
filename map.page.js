
$( document ).on( "pageinit", "#map-page", function() {
    initButtons();
    function success(pos) {
        if (!demo) {
            update(pos);
        }
    }
    function fail(error) {
        consoleLog("Error: " + error.message)
    }
    navigator.geolocation.watchPosition(success, fail, {maximumAge: 0, enableHighAccuracy:true, timeout: 500});
    setInterval(function() { drawMap(); }, 10000);
    setInterval(function() { average(); }, 1000);
    setInterval(function() { if (demo) fakeUpdate(); }, 200);
});


var demo = false;
function initButtons() {
    $('#demo').click(function(event) { 
        demo = !demo;
    });
    $('#average').click(function(event) { 
        doAverage = !doAverage;
        resetAverage();
    });
}

function consoleLog(message) {
    $("#console").text(message);
}

function fakeUpdate() {
    var lat = 57.7047;
    var lon = 11.96622;
    var accuracy = 0.1+100*Math.random();
    var error1 = (Math.random() - 0.5) * accuracy / 20000;
    var error2 = (Math.random() - 0.5) * accuracy / 20000;
    lat += error1;
    lon += error2;
    var pos = {
            coords: {
            latitude: lat,
            longitude: lon,
            accuracy: accuracy
        }
    };
    //consoleLog("fake: "+lat + " " + lon);
    update(pos);

}

var currentPosition;
function update(pos) {
    currentPosition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy
    };
    initMap();
    updateCurrentMarker();
    //consoleLog("Current: " + pos.coords.latitude + " " + pos.coords.longitude + " (" + pos.coords.accuracy + "m)");
}

var doAverage = false;
var averagePosition;
var averageBasePosition;
var averageOffset = {
    latitude: 0,
    longitude: 0,
    count: 0
};
var averageOffsetCount = 0;

function resetAverage() {
    averagePosition = null;
    averageBasePosition = null;
    averageOffset = {
        latitude: 0,
        longitude: 0,
        count: 0
    };  
}

function average() {
    if (!doAverage) return;
    var pos = currentPosition;
    if (!averageBasePosition) {
        averageBasePosition = pos;
        return;
    }
    var latOffset = pos.latitude - averageBasePosition.latitude;
    var lonOffset = pos.longitude - averageBasePosition.longitude;
    //var accuracy = (pos.accuracy < 1) ? 1 : pos.accuracy;
    //averageOffset.latitude += latOffset / pos.accuracy;
    //averageOffset.longitude += lonOffset  / pos.accuracy;
    averageOffset.latitude += latOffset;
    averageOffset.longitude += lonOffset;
    averageOffset.count++;
    averagePosition = {
        latitude: averageBasePosition.latitude + averageOffset.latitude/averageOffset.count,
        longitude: averageBasePosition.longitude + averageOffset.longitude/averageOffset.count
    }
    consoleLog("Averaging: " + averagePosition.latitude + " " + averagePosition.longitude + " (" + (averageOffset.count+1) + " samples)");
    updateAverageMarker();
}

var map = null;
var currentMarker = null;
var averageMarker = null;
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
    if (averageMarker == null) {
        averageMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Averaging!"
        });    
    }   
}


function updateCurrentMarker() {
    var latlng =  new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
    currentMarker.setPosition(latlng);    
}

function updateAverageMarker() {
    var latlng =  new google.maps.LatLng(averagePosition.latitude, averagePosition.longitude);
    averageMarker.setPosition(latlng);    
}
function drawMap() {
    var latlng =  new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
    initMap(latlng);
    map.panTo(latlng);
    currentMarker.setPosition(latlng);
}
