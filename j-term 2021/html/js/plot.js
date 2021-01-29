function mathFunc(x){
	return Math.sin(x);
}

function createList(plotRange,pointsNum){
	var incr = (plotRange.xmax - plotRange.xmin)/pointsNum; //x intervals for plots
	var xlist =[];
	var ylist =[];
	var x = plotRange.xmin;
	for (var i = 0; i < pointsNum+1; i++) {
		xlist.push(x);
		ylist.push(mathFunc(x));
		x += incr;
		};
	var coordList =[xlist,ylist];
	return coordList;
	};

function autoScale(list, height, width){
xmax = Math.max(...list[0]);
xmin = Math.min(...list[0]);
ymax = Math.max(...list[1]);
ymin = Math.min(...list[1]);

xscale = Math.floor((height * 0.9)/(xmax-xmin));
yscale = Math.floor((height * 0.9)/(ymax-ymin));
var scale = {x: xscale,y:yscale}
return scale;
};

function listPlot(context, list, origin, scale){
	context.moveTo(list[0][0]*scale.x+origin.x,origin.y-list[1][0]*scale.y);
for (var i = 1; i <list[0].length; i++) {
	context.lineTo(list[0][i]*scale.x+origin.x,origin.y-list[1][i]*scale.y);
};
context.stroke();
};
