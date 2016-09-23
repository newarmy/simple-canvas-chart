// 圆环图 

define(['Util'],function(util){
	var flag = null;
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||  
	     function( callback ){
           flag = window.setTimeout(callback, 1000 / 60);
         };
   var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||window.webkitCancelAnimationFrame || window.msCancelAnimationFrame ||
       function( callback ){
			window.clearTimeout(flag);
         };

	// canvas的默认设置
	var setting = {
		width: 400,
		height:300,
		box: null,
		padding: 5,
		isPC: false,
		isAnimate: true
	};
	/*
	* data: 数据
	* opt: 配置属性
	*/
	function ringChart(data,opt) {
		this.data = data;
		this.dLen = data.length;
		this.totalValue = 0;
		this.outerRadius = 0;//外圆半径
		this.innerRadius = 0;//内圆半径
		this.startAngle = 0;//开始绘画弧度
		this.stepAngle = Math.PI/30;//动态绘画时的每轮间隔弧度数值
		this.endAngle = 0;////动态绘画时的结束弧度数值
		util.copy(setting, opt);
		this.init();
	}
	ringChart.prototype = {
		constructor: ringChart,
		init: function() {
			var k = this;
			k.setCanvas();
			k.computeRadius();
			k.handler();
		},
		//根据新的数据重新绘画
		redraw: function (data) {
			var k = this;
			k.data = data;
			k.dLen = data.length;
			k.totalValue = 0;
			k.startAngle = 0;
			k.endAngle = 0;
			k.ctx.clearRect(0, 0, setting.width, setting.height);
			k.handler();
		},
		handler: function () {
			var k = this;
			k.compute();
			if(setting.isAnimate) {
				k.animateDrawChart();
			} else {
				k.drawChart();
			}
		},
		//创建添加canvas元素，并获取context
		setCanvas: function () {
			var k = this;
			if(setting.isPC) {
				k.ctx = util.getCtx(setting.box);
			} else {
				var canvasDom = util.createCanvas(setting);
				k.ctx = util.getCtx(canvasDom);
			}
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
				k.outerRadius = setting.height/2 - setting.padding;
			} else {
				k.outerRadius = setting.width/2 - setting.padding;
			}
			k.innerRadius = k.outerRadius*(2/3);
		},
		animateDrawChart: function() {
			var k = this;
			k.endAngle += k.stepAngle;
			requestAnimationFrame(function () {k.animate.call(k)});
		},
		animate: function () {
			var k = this;
			k.ctx.clearRect(0, 0, setting.width, setting.height);
			k.startAngle = 0;
			k.ctx.beginPath();
			for(var i = 0; i < k.dLen; i++) {
				if(k.drawItem(k.data[i])) {
					break;
				}
				
			}
			k.ctx.save();
			k.ctx.fillStyle = '#fff';
			k.ctx.beginPath();
			k.ctx.moveTo(setting.width/2, setting.height/2);
			k.ctx.arc(setting.width/2, setting.height/2, k.innerRadius, 0, 2*Math.PI);
			k.ctx.fill();
			k.ctx.restore();
			k.ctx.closePath();
			k.endAngle += k.stepAngle;
			if(k.endAngle > 2*Math.PI) {
				cancelAnimationFrame(function () {k.animate.call(k)});
			} else{
				requestAnimationFrame(function () {k.animate.call(k)});
			}
		},
		drawChart: function () {
			var k = this;
			k.ctx.beginPath();
			for(var i = 0; i < k.dLen; i++) {
				k.drawItem(k.data[i]);
			}
			k.ctx.save();
			k.ctx.fillStyle = '#fff';
			k.ctx.beginPath();
			k.ctx.moveTo(setting.width/2, setting.height/2);
			k.ctx.arc(setting.width/2, setting.height/2, k.innerRadius, 0, 2*Math.PI);
			k.ctx.fill();
			
			k.ctx.restore();
			k.ctx.closePath();
		},
		drawItem: function (data) {
			var k = this;
			var angle = 2*Math.PI*(data.value/k.totalValue);
			k.ctx.save();
			k.ctx.fillStyle = data.color;
			k.ctx.beginPath();
			k.ctx.moveTo(setting.width/2, setting.height/2);
			if(setting.isAnimate) {
				k.ctx.arc(setting.width/2, setting.height/2, k.outerRadius, k.startAngle, k.endAngle); 
			} else{
				k.ctx.arc(setting.width/2, setting.height/2, k.outerRadius, k.startAngle, k.startAngle+angle);
			}
			k.ctx.fill();
			k.ctx.restore();
			k.ctx.save();
			k.ctx.fillStyle = '#fff';
			k.ctx.beginPath();
			k.ctx.moveTo(setting.width/2, setting.height/2);
			if(setting.isAnimate) {
				k.ctx.arc(setting.width/2, setting.height/2, k.innerRadius, k.startAngle, k.endAngle); 
			} else{
				k.ctx.arc(setting.width/2, setting.height/2, k.innerRadius, k.startAngle, k.startAngle+angle);
			}
			k.ctx.fill();
			k.ctx.restore();
			if(setting.isAnimate) {
				if(k.endAngle >= (k.startAngle+angle)) {
					//当k.endAngle 大于 (k.startAngle+angle)时，继续本轮绘画；
					k.startAngle += angle;
					return false;
				} else {
					//当k.endAngle 小于 (k.startAngle+angle)时，结束本轮绘画；
					return true;
				}
			} else {
				k.startAngle += angle;
			}
		}
	};
	return ringChart;
});