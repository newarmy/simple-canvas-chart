// to do 

define(['Util'],function(util){
	function columnChart(opt) {
		this.opt = opt || null;
		this.ctx = null;
		this.step = this.opt.step || 5;
		this.data = null;
		this.max = this.opt.max || null;
		this.min = this.opt.min || 0;
		this.yHeight = null;
		this.xWidth = null;
		this.paddingTop = 10;
		this.paddingLeft = 20;
		this.paddingBottom = 20;
		this.paddingRight = 10;
		this.init();
	}
	columnChart.prototype = {
		constructor: columnChart,
		init: function() {
			var k = this;
			k.data = k.opt.data;
			k.setCanvas();
			k.compute();
			k.drawYX();
			k.drawMarkY();
		},
		setCanvas: function () {
			var k = this, 
			canvasDom = util.createCanvas(k.opt);
			k.ctx = util.getCtx(canvasDom);
			k.xWidth = k.opt.width - k.paddingLeft - k.paddingRight;
			k.yHeight = k.opt.height - k.paddingTop - k.paddingBottom;
		},
		compute: function () {
			var k = this;
			var MM = k.getMaxAndMin();
			if(!k.max) {
				k.max = Math.ceil(MM.max);
				k.min = 0;
			}
		},
		drawYX: function () {
			var k = this;
			k.ctx.save();
			k.ctx.strokeStyle  = "blue";
			k.ctx.lineWidth = 2;
			k.ctx.beginPath();
			k.ctx.moveTo(k.paddingLeft, k.paddingTop);
			k.ctx.lineTo(k.paddingLeft, k.opt.height-k.paddingBottom);
			k.ctx.lineTo(k.opt.width - k.paddingRight, k.opt.height - k.paddingBottom);
			k.ctx.stroke();
			k.ctx.restore();
		},
		drawMarkY: function () {
			var k = this;
			var step = k.yHeight/4;
			k.ctx.save();
			k.ctx.strokeStyle  = "#ccc";
			k.ctx.lineWidth = 1;
			k.ctx.beginPath();
			k.ctx.moveTo(k.paddingLeft, k.paddingTop+2);
			k.ctx.lineTo(k.opt.width - k.paddingRight, k.paddingTop+2);
			k.ctx.stroke();
			k.ctx.beginPath();
			k.ctx.moveTo(k.paddingLeft, k.paddingTop+step);
			k.ctx.lineTo(k.opt.width - k.paddingRight, k.paddingTop+step);
			k.ctx.stroke();
			k.ctx.beginPath();
			k.ctx.moveTo(k.paddingLeft, k.paddingTop+2*step);
			k.ctx.lineTo(k.opt.width - k.paddingRight, k.paddingTop+2*step);
			k.ctx.stroke();
			k.ctx.beginPath();
			k.ctx.moveTo(k.paddingLeft, k.paddingTop+3*step);
			k.ctx.lineTo(k.opt.width - k.paddingRight, k.paddingTop+3*step);
			k.ctx.stroke();
			k.ctx.restore();
		},
		getMaxAndMin: function () {
			var k = this, arr = k.data, len = arr.length, maxV, minV;
			maxV = arr[0].value, minV = arr[0].value;
			for(var i = 1; i < len; i++) {
				if( maxV < arr[i].value) {
					maxV = arr[i].value;
				}
				if( minV > arr[i].value){
					minV = arr[i].value;
				}
			}
			return {max:maxV, min:minV};
			
		}
		
		
	};
	return columnChart;
});