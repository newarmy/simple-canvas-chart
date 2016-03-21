require.config({
	baseUrl: '../src/'
	
});
require([ 'line'], function ( Line) {
	
	var Line = new Line(lineData,{
		box: document.getElementById('lineChart'),
		width: 400,
		height:400
	});
});