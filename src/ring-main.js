require.config({
	baseUrl: '../src/'
	
});
require(['ring'], function (Ring) {
	var Ring = new Ring(RingData,{
		box: document.getElementById('pieChart'),
		width: 400,
		height:400
	});
	document.getElementById('redrawBtn').onclick = function (e) {
		e.preventDefault();
		Ring.redraw(RingData);
	} 
});