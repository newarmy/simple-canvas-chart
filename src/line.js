// to do 

define(['Util'],function(util){
	// canvas的默认设置
	var setting = {
		width: 400,
		height:300,
		box: null
	};
	function lineChart(data,opt) {
		this.ctx = null;
		util.copy(setting, opt);
		//this.step = this.opt.step || 5;
		this.step = setting.step || 9;
		this.data = data;
		this.max = setting.max || 0;
		this.min = setting.min || 0;
		this.yHeight = null;
		this.xWidth = null;
		this.paddingTop = 20;
		this.paddingLeft = 20;
		this.paddingBottom = 20;
		this.paddingRight = 60;
		this.init();
	}
	lineChart.prototype = {
		constructor: lineChart,
		init: function() {
			var k = this;
			k.setCanvas();
			k.compute();
			k.drawYX();
			k.drawMarkY();
			k.drawMarkX();
			k.drawAllItem();
		},
		setCanvas: function () {
			var k = this, 
			canvasDom = util.createCanvas(setting);
			k.ctx = util.getCtx(canvasDom);
			k.xWidth = setting.width - k.paddingLeft - k.paddingRight;
			k.yHeight = setting.height - k.paddingTop - k.paddingBottom;
		},
		compute: function () {
			var k = this;
			 k.getMaxAndMin();
		},
		// 获得最大最小值
		getMaxAndMin: function () {
			var k = this;
			k.xLabels = k.data.labels;
			k.sets = k.data.datasets;
			var arr = [];
			for(var i = 0, len = k.sets.length; i < len; i++) {
					arr.push(k.computeMM(k.sets[i].data));
			}
			arr.forEach(function(o){
				if(k.max < o.max) {
					k.max = o.max;
				}
				if(k.min > o.min) {
					k.min = o.min;
				}
			});
		},
		computeMM: function (arr) {
			var max = 0, min = 0;
			arr.forEach(function (v, i) {
				if(max < v) {
					max = v;
				}
				if(min > v) {
					min = v;
				}
			});
			return {max: max, min: min};
		},
		drawYX: function () {
			var k = this;
			k.ctx.save();
			k.ctx.strokeStyle  = "blue";
			k.ctx.lineWidth = 2;
			k.ctx.beginPath();
			k.ctx.moveTo(k.paddingLeft, k.paddingTop-5);
			k.ctx.lineTo(k.paddingLeft, setting.height-k.paddingBottom);
			k.ctx.lineTo(setting.width - k.paddingRight+5, setting.height - k.paddingBottom);
			k.ctx.stroke();
			k.ctx.restore();
		},
		drawMarkY: function () {
			var k = this;
			var stepHeight = k.yHeight/k.step;// 
			k.ctx.save();
			k.ctx.strokeStyle  = "#ccc";
			k.ctx.lineWidth = 1;
			var mark = 0;
			for(var i =0; i < k.step; i++) {
				k.ctx.beginPath();
				k.ctx.moveTo(k.paddingLeft, k.paddingTop+i*stepHeight);
				k.ctx.lineTo(setting.width - k.paddingRight, k.paddingTop+i*stepHeight);
				k.ctx.stroke();
				if( i == 0) {
					mark = k.max;
				} else {
					mark = k.max*((k.step-i)/k.step);
				}
				k.drawText(k.paddingLeft-10, k.paddingTop+i*stepHeight, mark);
			}
			k.drawText(k.paddingLeft-10, setting.height - k.paddingBottom, 0);
			k.ctx.restore();
		},
		drawMarkX: function () {
			var k = this;
			var len = k.xLabels.length ;
			k.xStepWidth = k.xWidth/(len-1);
			k.ctx.save();
			k.ctx.strokeStyle  = "#ccc";
			k.ctx.lineWidth = 1;
			for(var i = 1;i <= (len-1); i++) {
				k.ctx.beginPath();
				k.ctx.moveTo(k.paddingLeft+i*k.xStepWidth, k.paddingTop-5);
				k.ctx.lineTo(k.paddingLeft+i*k.xStepWidth, setting.height - k.paddingBottom);
				k.ctx.stroke();
				
				k.drawText(k.paddingLeft+(i)*k.xStepWidth, setting.height - k.paddingBottom+15, k.xLabels[i]);
			}
			//特殊处理第一个数据（xLabels）
			k.drawText(k.paddingLeft, setting.height - k.paddingBottom+15, k.xLabels[0]);
			k.ctx.restore();
		},
		drawAllItem: function(){
			var k = this, startY, v;
			var len = k.sets.length;
			var data = null;
			for(var i = 0; i < len; i++) {
				data = k.sets[i];
				k.drawItem(data);
			}
		},
		drawItem: function (d) {
			var k = this;
			k.ctx.save();
			k.ctx.strokeStyle = d.strokeColor;
			k.ctx.lineWidth = 1;
			k.ctx.beginPath();
			var pointArr = [];
			var y = null;
			for (var i = 0; i < d.data.length; i++) {
				//原点在左上角
				y = setting.height - (k.yHeight*d.data[i]/k.max+k.paddingBottom);
				if(i == 0) {
					k.ctx.moveTo(k.paddingLeft, y);
					pointArr.push({x:k.paddingLeft,y:y});
				} else {
					k.ctx.lineTo((k.paddingLeft+k.xStepWidth*i ), y);
					pointArr.push({x:(k.paddingLeft+k.xStepWidth*i ),y:y});
					
				}
			}
			k.ctx.stroke();
			k.ctx.closePath();
			k.ctx.restore();
			k.drawArc(pointArr, d);
		},
		drawLegend: function () {
			
		},
		drawArc: function (pointArr,d) {
			var k = this;
			
			k.ctx.save();
			for(var i = 0, len = pointArr.length; i < len; i++) {
				k.ctx.beginPath();
				console.log(d.pointColor);
				k.ctx.fillStyle = d.pointColor;
				k.ctx.arc(pointArr[i].x, pointArr[i].y, 3, 0, 2*Math.PI);
				k.ctx.fill();
				k.ctx.closePath();
			}
			k.ctx.restore();
		},
		drawText: function (x, y, v) {
			var k = this;
			k.ctx.font = "12px";
			k.ctx.textAlign = "center";
			k.ctx.fillText(v, x, y);
		}
	};
	return lineChart;
});