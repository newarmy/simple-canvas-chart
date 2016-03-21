require.config({
	baseUrl: '../src/'
	
});
require(['column'], function (Column) {
	var col = new Column(data,{
		box: document.getElementById('columnChart'),
		width: 300,
		height:200
	});
});