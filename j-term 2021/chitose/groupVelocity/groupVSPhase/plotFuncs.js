function autoScale(list, height, width, origin){
	//calculate scaling fuctors to fit the graph into the given window size
xmax = Math.max(...list[0]);
xmin = Math.min(...list[0]);
ymax = Math.max(...list[1]);
ymin = Math.min(...list[1]);

xscale = (width *3)/(xmax-xmin);
yscale = (height * 0.9)/(ymax-ymin);
/*var translationY = ymax -(ymax-ymin)/2;
origin.y = height/2 +translationY*yscale; //translate the position of origin so that the graph fit in the canvas
var translationX = xmax -(xmax-xmin)/2;
origin.x = width/2 -translationX*xscale; */

var scale = {x: xscale, y:yscale/1.5}; //an object to store information about scaling
return scale;
};

function drawAxes(context,origin,width,height){
	//draw x-y axes for the graph
	context.beginPath();
	context.setLineDash([5,4])
    context.moveTo(0,origin.y);
	context.lineTo(width,origin.y);
	context.moveTo(origin.x,height);
	context.lineTo(origin.x,0);
context.stroke(); //draw x-y axes
context.closePath();
	context.beginPath();
	context.setLineDash([]);
    context.moveTo(origin.x-10,15);
	context.lineTo(origin.x,0);
	context.lineTo(origin.x +10,15);
	context.moveTo(width-15, origin.y -10);
	context.lineTo(width,origin.y);
	context.lineTo(width-15, origin.y +10);

	context.stroke();//draw tips of arrows
	context.closePath();
};

function listPlot(context, list, origin, scale,height,width,color){
	//a function that takes list and plots a graph on the given canvas
	context.beginPath();
	context.strokeStyle=color;
	context.moveTo(list[0][0]*scale.x + origin.x,origin.y-list[1][0]*scale.y);
for (var i = 1; i <list[0].length; i++) {
	context.lineTo(list[0][i]*scale.x + origin.x,origin.y-list[1][i]*scale.y);
};
context.stroke();
context.closePath();
};

function createList(plotRange,pointsNum,mathFunc){
	/*function to create a 2D array of coordinates from given mathematical function and
	plot Range and smoothness/number of points*/
	var incr = (plotRange.xmax - plotRange.xmin)/pointsNum; //x intervals for plots
	var xlist =[];
	var ylist =[];
	var x = plotRange.xmin;
	for (var i = 0; i < pointsNum+1; i++) {
		xlist.push(x);
		ylist.push(mathFunc.funcMath(x));
		x += 2*incr;
		};
	var coordList =[xlist,ylist];
	return coordList;
	};
    
function drawScales(context,height,width,scale,origin){
	//draws scale on a graph according to the scaling
	var incrX = width/10;
	var incrY = height/10;
	var posX = incrX; //x-coordinate on the canvas
    var numX = (posX - origin.x)/scale.x; // x-coordinate the scale should read
	var posY = incrY;
    var numY = (origin.y-posY)/scale.y;
    var decimalY = 1; //a parameter used to decide how many decimal points to show
    var decimalX =1;
    context.font =("10px Arial")
    
    while(incrX/scale.x*decimalX<10){ //while loop to determin number of decimal points to show on scale
    	decimalX *= 10;
    }
    while(incrY/scale.y*decimalY<10){
    	decimalY *= 10;
    }
    context.beginPath();
	for (var i = 1; i < 10; i++) { //for loop to draw scale
		context.moveTo(posX,origin.y-.02*height);
		context.lineTo(posX, origin.y + 0.02*height);
		context.moveTo(origin.x-.02*width,posY);
		context.lineTo(origin.x+.02*width,posY);
        
        context.textAlign ="center";
        context.fillText(Math.round(numX*decimalX)/decimalX, posX, origin.y-.03*height);
        context.textAlign ="start";
        context.fillText(Math.round(numY*decimalY)/decimalY,origin.x + .03*width, posY);
        
		posX += incrX;
		posY +=incrY;
        numX += incrX/(scale.x);
        numY -= incrY/scale.y;
		
	}
	context.stroke();
	context.closePath();
};

function markerCircle(x,y,ctx, scale, origin){
R=7
ctx.beginPath();
ctx.arc(x*scale.x + origin.x, origin.y-y*scale.y, R, 0, 2 * Math.PI, false);
ctx.lineWidth = 3;
ctx.fillStyle = 'orange';
ctx.fill();
ctx.closePath();
}

function markerGroup(x,y,ctx, scale, origin){
R=7
ctx.beginPath();
ctx.arc(x*scale.x + origin.x, origin.y-y*scale.y, R, 0, 2 * Math.PI, false);
ctx.lineWidth = 3;
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
}

function plotLegend(ctx,mk1,mk2){
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.strokeRect(699, 149, 100,50);
	ctx.fillStyle= "rgba(255, 255, 255, 0.81)";
	ctx.fillRect(700, 150, 98, 48);
	ctx.arc(713,161,7,0,2*Math.PI,false);
	ctx.fillStyle ='orange';
	ctx.fill();
	ctx.fillStyle='black';
	ctx.fillText("Phase Velocity", 725, 165);
	ctx.fillText("Group Velocity", 725, 185);
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(713,181,7,0,2*Math.PI,false);
	ctx.fillStyle ='green';
	ctx.fill();
	ctx.closePath();

}