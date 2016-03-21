// to do 

define(['Util'],function(util){
	function columnChart(data,opt) {
		this.opt = opt || null;
		this.ctx = null;
		this.step = this.opt.step || 5;
		this.data = data;
		this.dLen = data.length;
		this.max = this.opt.max || null;
		this.min = this.opt.min || 0;
		this.yHeight = null;
		this.xWidth = null;
		this.paddingTop = 20;
		this.paddingLeft = 20;
		this.paddingBottom = 20;
		this.paddingRight = 10;
		this.init();
	}
	columnChart.prototype = {
		constructor: columnChart,
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
			var mark = 0;
			for(var i =0; i < 4; i++) {
				k.ctx.beginPath();
				k.ctx.moveTo(k.paddingLeft, k.paddingTop+i*step);
				k.ctx.lineTo(k.opt.width - k.paddingRight, k.paddingTop+i*step);
				k.ctx.stroke();
				switch(i){
					case 0 :
						mark = k.max;
						break;
					case 1 :
						mark = k.max*(3/4);
						break;
					case 2 :
						mark = k.max*(2/4);
						break;
					case 3 :
						mark = k.max*(1/4);
						break;
				}
				k.drawText(k.paddingLeft-10, k.paddingTop+i*step, mark);
			}
			k.drawText(k.paddingLeft-10, k.opt.height - k.paddingBottom, 0);
			k.ctx.restore();
		},
		drawMarkX: function () {
			var k = this;
			k.xStep = k.xWidth/k.dLen;
			k.ctx.save();
			k.ctx.strokeStyle  = "#ccc";
			k.ctx.lineWidth = 1;
			for(var i = 1;i <= k.dLen; i++) {
				k.ctx.beginPath();
				k.ctx.moveTo(k.paddingLeft+i*k.xStep, k.paddingTop+2);
				k.ctx.lineTo(k.paddingLeft+i*k.xStep, k.opt.height - k.paddingBottom);
				k.ctx.stroke();
				
				k.drawText(k.paddingLeft+(i-1)*k.xStep+k.xStep/2, k.opt.height - k.paddingBottom+15, k.data[i-1].name);
			}
			k.ctx.restore();
		},
		drawAllItem: function(){
			var k = this, startY, v;
			for(var i = 0; i < k.dLen; i++) {
				v = k.data[i].value;
				startY = k.yHeight*v/k.max;
				k.drawItem(i, startY, k.data[i]);
			}
		},
		drawItem: function (i, sy, data) {
			var k = this,x , y, w, h;
			k.ctx.save();
			k.ctx.strokeStyle  = data.color;
			k.ctx.fillStyle = data.color;
			x = k.paddingLeft+i*k.xStep+10;
			y = k.opt.height - (sy+k.paddingBottom);
			w = k.paddingLeft+(i+1)*k.xStep - x - 10;
			h = sy;
			k.drawText(k.paddingLeft+i*k.xStep+k.xStep/2, y-8, data.value);
			k.ctx.fillRect(x, y, w, h);
			k.ctx.restore();
		},
		drawText: function (x, y, v) {
			var k = this;
			k.ctx.font = "12px";
			k.ctx.textAlign = "center";
			k.ctx.fillText(v, x, y);
		},
		getMaxAndMin: function () {
			var k = this, arr = k.data, maxV, minV;
			maxV = arr[0].value, minV = arr[0].value;
			for(var i = 1; i < k.dLen; i++) {
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