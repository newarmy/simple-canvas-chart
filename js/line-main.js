define("Util",[],function(){return{getId:function(e){return document.getElementById(e)},createCanvas:function(e){var t=document.createElement("canvas");return t.width=e.width,t.height=e.height,t.innerHTML="THIS IS A CANVAS ELEMENT",e.box.appendChild(t),t},getCtx:function(e){return e.getContext("2d")},copy:function(e,t){for(var n in t)e[n]=t[n]}}}),define("line",["Util"],function(e){function n(n,r){this.ctx=null,e.copy(t,r),this.step=t.step||9,this.data=n,this.max=t.max||0,this.min=t.min||0,this.yHeight=null,this.xWidth=null,this.paddingTop=20,this.paddingLeft=20,this.paddingBottom=20,this.paddingRight=60,this.init()}var t={width:400,height:300,box:null};return n.prototype={constructor:n,init:function(){var e=this;e.setCanvas(),e.compute(),e.drawYX(),e.drawMarkY(),e.drawMarkX(),e.drawAllItem()},setCanvas:function(){var n=this,r=e.createCanvas(t);n.ctx=e.getCtx(r),n.xWidth=t.width-n.paddingLeft-n.paddingRight,n.yHeight=t.height-n.paddingTop-n.paddingBottom},compute:function(){var e=this;e.getMaxAndMin()},getMaxAndMin:function(){var e=this;e.xLabels=e.data.labels,e.sets=e.data.datasets;var t=[];for(var n=0,r=e.sets.length;n<r;n++)t.push(e.computeMM(e.sets[n].data));t.forEach(function(t){e.max<t.max&&(e.max=t.max),e.min>t.min&&(e.min=t.min)})},computeMM:function(e){var t=0,n=0;return e.forEach(function(e,r){t<e&&(t=e),n>e&&(n=e)}),{max:t,min:n}},drawYX:function(){var e=this;e.ctx.save(),e.ctx.strokeStyle="blue",e.ctx.lineWidth=2,e.ctx.beginPath(),e.ctx.moveTo(e.paddingLeft,e.paddingTop-5),e.ctx.lineTo(e.paddingLeft,t.height-e.paddingBottom),e.ctx.lineTo(t.width-e.paddingRight+5,t.height-e.paddingBottom),e.ctx.stroke(),e.ctx.restore()},drawMarkY:function(){var e=this,n=e.yHeight/e.step;e.ctx.save(),e.ctx.strokeStyle="#ccc",e.ctx.lineWidth=1;var r=0;for(var i=0;i<e.step;i++)e.ctx.beginPath(),e.ctx.moveTo(e.paddingLeft,e.paddingTop+i*n),e.ctx.lineTo(t.width-e.paddingRight,e.paddingTop+i*n),e.ctx.stroke(),i==0?r=e.max:r=e.max*((e.step-i)/e.step),e.drawText(e.paddingLeft-10,e.paddingTop+i*n,r);e.drawText(e.paddingLeft-10,t.height-e.paddingBottom,0),e.ctx.restore()},drawMarkX:function(){var e=this,n=e.xLabels.length;e.xStepWidth=e.xWidth/(n-1),e.ctx.save(),e.ctx.strokeStyle="#ccc",e.ctx.lineWidth=1;for(var r=1;r<=n-1;r++)e.ctx.beginPath(),e.ctx.moveTo(e.paddingLeft+r*e.xStepWidth,e.paddingTop-5),e.ctx.lineTo(e.paddingLeft+r*e.xStepWidth,t.height-e.paddingBottom),e.ctx.stroke(),e.drawText(e.paddingLeft+r*e.xStepWidth,t.height-e.paddingBottom+15,e.xLabels[r]);e.drawText(e.paddingLeft,t.height-e.paddingBottom+15,e.xLabels[0]),e.ctx.restore()},drawAllItem:function(){var e=this,t,n,r=e.sets.length,i=null;for(var s=0;s<r;s++)i=e.sets[s],e.drawItem(i)},drawItem:function(e){var n=this;n.ctx.save(),n.ctx.strokeStyle=e.strokeColor,n.ctx.lineWidth=1,n.ctx.beginPath();var r=[],i=null;for(var s=0;s<e.data.length;s++)i=t.height-(n.yHeight*e.data[s]/n.max+n.paddingBottom),s==0?(n.ctx.moveTo(n.paddingLeft,i),r.push({x:n.paddingLeft,y:i})):(n.ctx.lineTo(n.paddingLeft+n.xStepWidth*s,i),r.push({x:n.paddingLeft+n.xStepWidth*s,y:i}));n.ctx.stroke(),n.ctx.closePath(),n.ctx.restore(),n.drawArc(r,e)},drawLegend:function(){},drawArc:function(e,t){var n=this;n.ctx.save();for(var r=0,i=e.length;r<i;r++)n.ctx.beginPath(),console.log(t.pointColor),n.ctx.fillStyle=t.pointColor,n.ctx.arc(e[r].x,e[r].y,3,0,2*Math.PI),n.ctx.fill(),n.ctx.closePath();n.ctx.restore()},drawText:function(e,t,n){var r=this;r.ctx.font="12px",r.ctx.textAlign="center",r.ctx.fillText(n,e,t)}},n}),require.config({baseUrl:"../src/"}),require(["line"],function(e){var e=new e(lineData,{box:document.getElementById("lineChart"),width:400,height:400})}),define("line-main",function(){});