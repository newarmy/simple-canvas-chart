require.config({
	baseUrl: '../src/'
	
});
require(['ring'], function (Ring) {
	var Ring = new Ring(RingData,{
		box: document.getElementById('pieChart'),
		width: 400,
		height:300,
		isPC: true
	});
	document.getElementById('redrawBtn').onclick = function (e) {
		e = e || window.event;
		if(e.preventDefault) {
		  e.preventDefault();
		} else {
			e.returnValue = false;
		}
		Ring.redraw(RingData);
	} 
});