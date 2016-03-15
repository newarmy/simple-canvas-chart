require.config({
	baseUrl: '../src/'
	
});
require(['column'], function (column) {
	var col = new column({
		data: data,
		box: document.getElementById('columnChart'),
		width: 300,
		height:200
	});
	
});