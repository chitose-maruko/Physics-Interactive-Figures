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
	var coordList ={x:xlist,y:ylist};
	return coordList;
	};

class Plot{
	constructor(id,mathFunc){
		this.func = mathFunc;
		this.pltDomain = {xmin: -10,xmax:10}; //default plot domain
		this.dataPoints = 250; //default number of data points for the plot
		this.myDiv = document.getElementById(id);
	}
	plot(){var coords = [createList(this.pltDomain,this.dataPoints,this.func)];
		Plotly.newPlot( this.myDiv, coords, {
	margin: { t: 0 } } );
	}
}