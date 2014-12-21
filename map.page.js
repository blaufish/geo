
$( document ).on( "pageinit", "#map-page", function() {
    updateAverageMarker();

    setTimeout(function() { drawMap(); }, 1000);
    setInterval(function() { drawMap(); }, 10000);
    setInterval(function() { average(); }, 1000);
});

function initButtons() {
    $('#average').click(function(event) { 
        doAverage = !doAverage;
        resetAverage();
    });
}

function consoleLog(message) {
    $("#console").text(message);
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

function updateAverageMarker() {
    if(averagePosition === undefined) return;
    var latlng =  new google.maps.LatLng(averagePosition.latitude, averagePosition.longitude);
    averageMarker.setPosition(latlng);    
}
function updateCurrentMarker() {
    if(currentPosition === undefined) return;
    var latlng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
    currentMarker.setPosition(latlng);    
}

function drawMap() {
    if(currentPosition === undefined) return;
    var latlng =  new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
    initMap(latlng);
    map.panTo(latlng);
    currentMarker.setPosition(latlng);
}
