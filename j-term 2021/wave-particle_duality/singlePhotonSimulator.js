var canvas = document.getElementById('histogram');
var ctx = canvas.getContext("2d");
var setX = doubleSlitGenerator(10000,800);
var setY = gaussianGenerator(10000,400);
ctx.fillStyle ="red";
for (var i = 0; i < setX.length; i++) {
	ctx.fillRect(setX[i],setY[i],1,1);
}

function shootOneK(){
	var setX = doubleSlitGenerator(1000,800);
	var setY = gaussianGenerator(1000,400);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function shootTenK(){
	var setX = doubleSlitGenerator(10000,800);
	var setY = gaussianGenerator(10000,400);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function shootHundred(){
	var setX = doubleSlitGenerator(100,800);
	var setY = gaussianGenerator(100,400);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function shootOne(){
	var setX = doubleSlitGenerator(1,800);
	var setY = gaussianGenerator(1,400);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}
}

function clearCanvas(){
	ctx.clearRect(0,0,800,400);
}