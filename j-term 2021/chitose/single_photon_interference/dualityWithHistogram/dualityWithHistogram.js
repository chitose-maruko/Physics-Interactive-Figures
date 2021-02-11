var screen = document.getElementById('screen');
var histogram = document.getElementById('histogram');
var probDensPlot = document.getElementById('probDensityPlot');
var bwSlit = document.getElementById('bwSlit');
var lambda = document.getElementById('wavelength');
var distWall=document.getElementById('distWall');
var clear = document.getElementById('clear');

var ctxHistogram = histogram.getContext('2d');
var ctxScreen = screen.getContext('2d');

var data = [];//initialize the data used for plotting histogram

let setUp = new DoubleSlit(screen.width);
var probDensity = {funcMath: function(x){return (setUp.probDensity(x))/2;}};

let plt = new Plot("probDensityPlot", probDensity);
plt.plot();//plot the probability density function.

let hist = new Histogram(data,100,'histogram');
printNums();


function shoot(num){
	// takes number of photons to be shot
	var setX = setUp.randomDoubleSlit(num);
	var setY = gaussianGenerator(num,screen.height);
	for (var i = 0; i < setX.length; i++) {
		hist.addData(setX[i]);

	}
	ctxHistogram.clearRect(0,0,300,150);
	hist.drawHist();
	ctxScreen.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctxScreen.fillRect(setX[i],setY[i],1,1);
}}

function printNums(){
		document.getElementById("waveReading").innerHTML = Math.floor(setUp.wavelength*10**(9)) + "nm";
		document.getElementById("slitsReading").innerHTML = Math.floor(setUp.slitApart*10**(6) )+ "micro meter";
		document.getElementById("wallReading").innerHTML = setUp.distWall + "m";
	}

clear.onclick=function(){
	ctxScreen.clearRect(0,0,600,300);
	ctxHistogram.clearRect(0,0,300,150);
	hist.data=[];
}


bwSlit.oninput=function(){
	hist.data=[];
	ctxHistogram.clearRect(0,0,300,150);
	ctxScreen.clearRect(0,0,600,300);
	setUp.slitApart = parseFloat(bwSlit.value)*10**(-6);
	probDensity = {funcMath: function(x){return (setUp.probDensity(x))/2;}};
	plt.func = probDensity;
	plt.plot();
	printNums();

	};

lambda.oninput=function(){
	hist.data=[];
	ctxHistogram.clearRect(0,0,300,150);
	ctxScreen.clearRect(0,0,600,300);
	setUp.wavelength = parseFloat(lambda.value)*10**(-9);
	probDensity = {funcMath: function(x){return (setUp.probDensity(x))/2;}};
	plt.func = probDensity;
	plt.plot();
	printNums();

	};

distWall.oninput=function(){
ctxHistogram.clearRect(0,0,300,150);
hist.data=[];
ctxScreen.clearRect(0,0,600,300);
setUp.distWall = parseFloat(distWall.value)/100;
probDensity = {funcMath: function(x){return (setUp.probDensity(x))/2;}};
plt.func = probDensity;
plt.plot();
printNums();
};

