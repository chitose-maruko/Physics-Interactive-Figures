class Plot{
	constructor (id,mathFunc) {
		// mathematical function to plot (format-> mathFunc = {funcMath: function(){some math function}})
		this.func = mathFunc; 
		//defalt canvas setting
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.height = 500; //default canvas size
		this.canvas.width = 500; 
		
		//default setting of plot
		this.originPos = {x:this.canvas.width/2, y: this.canvas.height/2}; //origin of the graph is centered by default
		this.pltDomain = {xmin: -10, xmax: 10}; //default plot domain
		this.numPoints = 100; // default number of points of the plot(accuracy of plot will increase with increasing number)
		this.scale = {x:1,y:1}; //this might cause trouble //default scaling factor
	}

	plot(){//function to plot given function
		var lst = createList(this.pltDomain,this.numPoints,this.func);
		this.scale = autoScale(lst,this.canvas.height,this.canvas.width);
		listPlot(this.ctx,lst,this.originPos,this.scale,this.canvas.height,this.canvas.width);
		drawAxes(this.ctx,this.originPos,this.canvas.width,this.canvas.height);
		drawScales(this.ctx,this.canvas.height,this.canvas.width,this.scale,this.originPos);
	}

}

function autoScale(list, height, width){
	//calculate scaling fuctors to fit the graph into the given window size
xmax = Math.max(...list[0]);
xmin = Math.min(...list[0]);
ymax = Math.max(...list[1]);
ymin = Math.min(...list[1]);

xscale = Math.floor((width * 1.1)/(xmax-xmin));
yscale = Math.floor((height * 0.9)/(ymax-ymin));
var scale = {x: xscale,y:yscale}; //an object to store information about scaling
return scale;
};

function drawAxes(context,origin,width,height){
	//draw x-y axes for the graph
	context.setLineDash([5,4])
    context.moveTo(0,origin.y);
	context.lineTo(width,origin.y);
	context.moveTo(origin.x,height);
	context.lineTo(origin.x,0);
context.stroke(); //draw x-y axes

	context.setLineDash([]);
    context.moveTo(origin.x-10,15);
	context.lineTo(origin.x,0);
	context.lineTo(origin.x +10,15);
	context.moveTo(width-15, origin.y -10);
	context.lineTo(width,origin.y);
	context.lineTo(width-15, origin.y +10);

	context.stroke();//draw tips of arrows
};

function listPlot(context, list, origin, scale,height,width){
	//a function that takes list and plots a graph on the given canvas
	context.moveTo(list[0][0]*scale.x + origin.x,origin.y-list[1][0]*scale.y);
for (var i = 1; i <list[0].length; i++) {
	context.lineTo(list[0][i]*scale.x + origin.x,origin.y-list[1][i]*scale.y);
};
context.stroke();
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
		x += incr;
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
};