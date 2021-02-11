var canvas = document.getElementById('histogram');
var ctx = canvas.getContext("2d");
var height =300;
var width =600;
var setX = doubleSlitGenerator(10000,width);
var setY = gaussianGenerator(10000,height);
var probDensity = {funcMath: function(x){var wavelength= 593*10**(-9); //wavelength in cm
	var slitApart = 45*10**(-6);// distance between slits in cm
	var distWall = 1.5; //distance to the wall in meter
	var scFactor = 1;
	var lambda = wavelength;
	var d = slitApart;
	var L = distWall;
	var k = 2*Math.PI*d/L/lambda;
	var theta = (x)/L/scFactor;
	var interference = (Math.cos(k*(x)/scFactor)+1)/2;
	var diffraction = (Math.sin(theta)/theta)**2;
	return interference*diffraction;}}

let plt = new Plot("plot", probDensity);

plt.plot();

ctx.fillStyle ="red";
for (var i = 0; i < setX.length; i++) {
	ctx.fillRect(setX[i],setY[i],1,1);
}

function shootOneK(){
	var setX = doubleSlitGenerator(1000,width);
	var setY = gaussianGenerator(1000,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function shootTenK(){
	var setX = doubleSlitGenerator(10000,width);
	var setY = gaussianGenerator(10000,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function shootHundred(){
	var setX = doubleSlitGenerator(100,width);
	var setY = gaussianGenerator(100,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function shootOne(){
	var setX = doubleSlitGenerator(1,width);
	var setY = gaussianGenerator(1,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function clearCanvas(){
	ctx.clearRect(0,0,width,height);
}