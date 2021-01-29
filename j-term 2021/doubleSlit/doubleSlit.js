
function createList(plotRange,pointsNum,setUp){
	/*function to create a 2D array of coordinates from given mathematical function and
	plot Range and smoothness/number of points*/
	var incr = (plotRange.xmax - plotRange.xmin)/pointsNum; //x intervals for plots
	var xlist =[];
	var ylist =[];
	var x = plotRange.xmin;
	for (var i = 0; i < pointsNum+1; i++) {
		xlist.push(x);
		ylist.push(setUp.probDensity(x));
		x += incr;
		};
	var coordList ={x:xlist,y:ylist};
	return coordList;
	};

class Plot{
	constructor(idPlot,setUp,screen){
		this.pltDomain = {xmin: -10,xmax:10}; //default plot domain
		this.dataPoints = ACC; //default number of data points for the plot
		this.myDiv = document.getElementById(idPlot);
		this.setUp = setUp;
		this.ctx= screen.getContext("2d"),
		this.width= screen.width
	}
	plot(){var coords = [createList(this.pltDomain,this.dataPoints,this.setUp)];
		Plotly.newPlot( this.myDiv, coords, {
	margin: { t: 0 } } );
	}

	drawInterference(){
		var incr = Math.ceil(ACC/this.width);
		var coords = createList(this.pltDomain,this.dataPoints,this.setUp);
		var yCoords = coords.y;
		var light = 0;
		var hue = this.setUp.wavelength * (-275)/300 * 10**9 + 275; //rough conversion from spectral wavelength to hue
		var color = "hsl("+hue+",100%,0%)";
		var x =0;
		for (var i = 0; i < yCoords.length; i+= incr) {
			light = 100* yCoords[i];
			color = "hsl("+ hue +",100%," + light + "%)";
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x,0,2,screen.height);
			x+=1;
		}
	}

	printNums(){
		document.getElementById("waveReading").innerHTML = Math.floor(this.setUp.wavelength*10**(9)) + "nm";
		document.getElementById("slitsReading").innerHTML = Math.floor(this.setUp.slitApart*10**(6) )+ "micro meter";
		document.getElementById("wallReading").innerHTML = this.setUp.distWall + "m";
	}
}

var setUp = {
	wavelength: 550*10**(-9), //wavelength in cm
	slitApart: 45*10**(-6), // distance between slits in cm
	distWall: 1.5, //distance to the wall in meter
	probDensity: function(x){
		var lambda = this.wavelength;
		var d = this.slitApart;
		var L = this.distWall;
		var k = 2*Math.PI*d/L/lambda;
		var scaling = 1;
		var theta = x/L;
		var interference = (Math.cos(k*x)+1)/2;
		var diffraction = (Math.sin(theta)/theta)**2;
		return interference*diffraction*scaling;
	}
};
var ACC = 1000; //number of data points used for plot
var waveL = document.getElementById("wavelength");
var screen = document.getElementById("screen");
var bwSlit=document.getElementById("bwSlit");
var distWall = document.getElementById("distWall");


let plt = new Plot("tester",setUp,screen);
plt.plot();
plt.drawInterference();
plt.printNums();

bwSlit.oninput=function(){
	plt.setUp.slitApart = Math.round(parseFloat(bwSlit.value))*10**(-6);
	plt.plot();
	plt.drawInterference();
	plt.printNums();

	};

waveL.oninput = function(){
	plt.setUp.wavelength = Math.round(parseFloat(waveL.value))*10**(-9);
	plt.plot();
	plt.drawInterference();
	plt.printNums();
};

distWall.oninput=function(){
	plt.setUp.distWall = parseFloat(distWall.value)/100;
	plt.plot();
	plt.drawInterference();
	plt.printNums();
	};



