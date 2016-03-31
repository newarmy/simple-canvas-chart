// 饼状图 

define(['Util'],function(util){
	// canvas的默认设置
	var setting = {
		width: 400,
		height:300,
		box: null
	};
	/*
	* data: 数据
	* opt: 配置属性
	*/
	function pieChart(data,opt) {
		this.data = data;
		this.dLen = data.length;
		this.totalValue = 0;
		this.radius = 0;
		this.startAngle = 0;
		this.fontBackAngle = 0;
		util.copy(setting, opt);
		this.init();
	}
	pieChart.prototype = {
		constructor: pieChart,
		init: function() {
			var k = this;
			k.setCanvas();
			k.compute();
			k.computeRadius();
			k.drawChart();
		},
		//创建添加canvas元素，并获取context
		setCanvas: function () {
			var k = this, 
			canvasDom = util.createCanvas(setting);
			k.ctx = util.getCtx(canvasDom);
		},
		compute: function () {
			var k = this;
			for(var i = 0; i < k.dLen; i++) {
				k.totalValue += k.data[i].value;
			}
		},
		computeRadius: function () {
			var k = this;
			if(setting.width > setting.height) {
				k.radius = setting.height/2 - 20;
			} else {
				k.radius = setting.width/2 - 20;
			}
		},
		drawChart: function () {
			var k = this;
			k.ctx.save();
			k.ctx.strokeStyle = "#000";
			k.ctx.lineWidth = 1;
			k.ctx.translate(setting.width/2, setting.height/2);
			for(var i = 0; i < k.dLen; i++) {
				k.drawItem(k.data[i]);
			}
			k.ctx.restore();
		},
		drawItem: function (data) {
			var k = this;
			var angle = 2*Math.PI*data.value/k.totalValue;
			k.ctx.save();
			k.ctx.fillStyle = data.color;
			k.ctx.beginPath();
			k.ctx.moveTo(0, 0);
			k.ctx.lineTo(k.radius, 0);
			k.ctx.arc(0, 0, k.radius, k.startAngle, angle);
			k.ctx.fill();
			k.ctx.closePath();
			
			k.ctx.restore();
			k.ctx.rotate(angle);
			k.fontBackAngle +=angle;
			k.drawText(angle, data.label+"("+data.value+")");
		},
		drawText: function (angle, v) {
			var k = this;
			var x = k.radius*Math.cos(angle/2)/2;
			var y = k.radius*Math.sin(angle/2)/2;
			k.ctx.save();
			k.ctx.rotate(-angle);
			//k.ctx.rotate(2*Math.PI-);
			var x1 = x*Math.cos(k.fontBackAngle)+y*Math.sin(k.fontBackAngle);
			var y1 = x*Math.sin(k.fontBackAngle)+y*Math.cos(k.fontBackAngle);
			k.ctx.strokeStyle = "#fff";
			k.ctx.font = "12px";
			k.ctx.textAlign = "center";
			k.ctx.fillText(v, x, y);
			k.ctx.rotate(-k.fontBackAngle);
			k.ctx.restore();
		},
	};
	return pieChart;
});