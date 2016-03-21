require.config({
	baseUrl: '../src/'
	
});
require(['pie'], function (Pie) {
	var pie = new Pie(pieData,{
		box: document.getElementById('pieChart'),
		width: 400,
		height:400
	});
});