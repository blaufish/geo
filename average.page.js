$( document ).on( "pageinit", "#average-page", function() {
	setInterval(function() { updateAveragePage(); }, 1000 );
});

function updateAveragePage() {
	if(currentPosition === undefined) return;
	$("#gps-current-stats-accuracy").text(currentPosition.accuracy+ " m" );
	$("#gps-current-stats-position").text(fmt(currentPosition.longitude,'N','S') + " " + fmt(currentPosition.latitude,'E','W') );
}

function fmt(number, ne, sw) {
	var letter = (number >= 0) ? ne : sw;
	var abs = Math.abs(number);
	var deg = Math.trunc(number);
	var decimals = abs - deg;
	var decimals60 = decimals * 60;
	var minutes = Math.trunc(decimals60);
	var minutesDecimals = pad(Math.trunc((decimals60-minutes) * 10000), 4);
	return letter + " " + deg + " " + minutes + "." + minutesDecimals;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}