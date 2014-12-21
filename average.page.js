$( document ).on( "pageinit", "#average-page", function() {
	setInterval(function() { updateAveragePage(); }, 1000 );
});

function updateAveragePage() {
	$("#gps-current-stats").text(currentPosition.longitude + " " + currentPosition.latitude + " (" + currentPosition.accuracy+ " m)" );
}
