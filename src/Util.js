// to do 

define(function(){
	return {
		getId: function(id) {
			return document.getElementById(id);
		},
		createCanvas: function (opt) {
			var canvasDom = document.createElement('canvas');
			canvasDom.width = opt.width;
			canvasDom.height = opt.height;
			canvasDom.innerHTML = "THIS IS A CANVAS ELEMENT";
			opt.box.appendChild(canvasDom);
			return canvasDom;
		},
		getCtx: function (dom) {
			return dom.getContext('2d');
		},
		copy: function (sObj, dObj) {
			for(var i in dObj) {
				sObj[i] = dObj[i];
			}
		}
	};
});