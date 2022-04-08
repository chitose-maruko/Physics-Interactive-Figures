var initialInterval=400; //initial interval for auto play
var numBinsForHistogram=100; // number of bins for histogram

var screen = document.getElementById('screen');
var histogram = document.getElementById('histogram');
var probDensPlot = document.getElementById('probDensityPlot');
var bwSlit = document.getElementById('bwSlit');
var lambda = document.getElementById('wavelength');
var distWall=document.getElementById('distWall');
var clear = document.getElementById('clear');
var bulbOn = document.getElementById('bulbOn');
bulbOn.style.display ="none";
var bulbOff = document.getElementById('bulbOff');
var wallMid = document.getElementById('wallMiddle');
var wallRight = document.getElementById('wallRight');
var wallLeft = document.getElementById('wallLeft');
var speedReading = document.getElementById('speedReading');
var movingWall = document.getElementById('moving');

var ctxHistogram = histogram.getContext('2d');
var ctxScreen = screen.getContext('2d');

var plotLegend = document.getElementById('plotLegend');
var ctxLegend = plotLegend.getContext('2d');
ctxLegend.fillText("# of detected", 30,12);
ctxLegend.fillText("photons at x", 30,22);

ctxLegend.fillStyle="rgba(255,0,0, 0.5)";
ctxLegend.fillRect(5,10,20,7);

speedReading.innerHTML=1000/initialInterval;

var data = [];//initialize the data used for plotting histogram

let setUp = new DoubleSlit(screen.width);
var probDensity = {funcMath: function(x){return (setUp.probDensity(x))/2;}};

let plt = new Plot("histogramContainer", probDensity);
plt.plot();//plot the probability density function.

let hist = new Histogram(data,numBinsForHistogram,'histogram');
printNums();
hist.drawHist();
var particleCounter =0;

var play;
var interval = initialInterval;
playAuto();

function playAuto(){
    clearInterval(play);
	play = setInterval(shootAuto,interval);
	blinking = setInterval(blink,500);
	
}

function faster(){
	if (interval >5) {
	interval = interval/2;
		clearInterval(play);
	play=setInterval(shootAuto,interval);
	speedReading.innerHTML= (1000/interval).toPrecision(3);
}
}

function slower(){
	if (interval <400) {
	interval = interval*2;
	clearInterval(play);
	play=setInterval(shootAuto,interval);
	speedReading.innerHTML= (1000/interval).toPrecision(3);
}
}

function shootAuto(){
	if (particleCounter<10000) {
		shoot(1);
	}}

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
		ctxScreen.fillRect(setX[i],setY[i],2,2);
}}

function stop(){
	clearInterval(play);
	clearInterval(blinking);
}

function printNums(){
		document.getElementById("waveReading").innerHTML = Math.floor(setUp.wavelength*10**(9)) + "nm";
		document.getElementById("slitsReading").innerHTML = Math.floor(setUp.slitApart*10**(9) )+ "nm";
		document.getElementById("wallReading").innerHTML = setUp.distWall + "m";
	}

clear.onclick=function(){
	ctxScreen.clearRect(0,0,600,300);
	ctxHistogram.clearRect(0,0,300,150);
	hist.data=[];
	interval=initialInterval;
	speedReading.innerHTML= (1000/interval).toPrecision(3);
	
}


bwSlit.oninput=function(){
	hist.data=[];
	ctxHistogram.clearRect(0,0,300,150);
	ctxScreen.clearRect(0,0,600,300);
	setUp.slitApart = parseFloat(bwSlit.value)*10**(-8);
	probDensity = {funcMath: function(x){return (setUp.probDensity(x))/2;}};
	plt.func = probDensity;
	plt.plot();
	wallMid.style.width = parseFloat(bwSlit.value)/65*30 +"px";
	wallLeft.style.width = 130 + (30 -parseFloat(bwSlit.value)/65*30)/2 +"px";
	wallRight.style.width = 130 + (30 -parseFloat(bwSlit.value)/65*30)/2 +"px";
	wallMid.style.left = 145 -parseFloat(bwSlit.value)/65*30/2 +"px";
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
movingWall.style.top = 20 +(parseFloat(distWall.value)-300)/100*50 +"px";
};

function blink(){
	bulbOff.style.display="none";
	bulbOn.style.display ="block";
	var back = setTimeout(off,300);

	function off(){
		bulbOn.style.display ="none";
		bulbOff.style.display="block";
		console.log("off");
	}
}
