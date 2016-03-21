require.config({
	baseUrl: '../src/'
	
});
require(['column', 'pie', 'line'], function (Column, Pie, Line) {
	var col = new Column(data,{
		box: document.getElementById('columnChart'),
		width: 300,
		height:200
	});
	
	
	var pie = new Pie(pieData,{
		box: document.getElementById('pieChart'),
		width: 400,
		height:400
	});
	var Line = new Line(lineData,{
		box: document.getElementById('lineChart'),
		width: 400,
		height:400
	});
});