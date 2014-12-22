$( document ).on( "pageinit", function() {
    initButtons();
    function success(pos) {
        update(pos);
    }
    function fail(error) {
       	
    }
    navigator.geolocation.watchPosition(success, fail, {maximumAge: 0, enableHighAccuracy:true, timeout: 500});
});

var currentPosition;
function update(pos) {
    currentPosition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy
    };
    average();
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
    averagePosition = undefined;
    averageBasePosition = undefined;
    averageOffset = {
        latitude: 0,
        longitude: 0,
        count: 0
    };  
}

function average() {
    if (!doAverage) return;
    var pos = currentPosition;
    if (averageBasePosition === undefined) {
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
}
