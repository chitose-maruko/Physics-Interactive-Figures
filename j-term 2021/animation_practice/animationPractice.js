var bulbOn = document.getElementById('bulbOn');
var bulbOff = document.getElementById('bulbOff');
bulbOn.style.display ="none";
var canvas = document.getElementById('screen');
var ctx = canvas.getContext("2d");
var height =300;
var width =600;

function myMove(){
	var elm = document.getElementById('animate');
	var posX = 0;
	var time = 0;
	var id = setInterval(frame,8);
	var bulbSwith = setTimeout(backToOff,1000);
	bulbOff.style.display="none";
	bulbOn.style.display ="block";
	elm.style.display="block";

	function frame(){
		if (time >= 260) {
			clearInterval(id);
			elm.style.display ="none";
		} else{
			posX = Math.sin(time/20)*30 + 295;
			elm.style.bottom = 110+.6*time +"px";
			elm.style.left= posX +"px";
			time +=1;
		}
		
	}

	function backToOff(){
		bulbOn.style.display="none";
		bulbOff.style.display="block";
	}
}

function shootOneK(){
	myMove();
	var shoot = setTimeout(func,2100);
	function func(){
	var setX = doubleSlitGenerator(1000,width);
	var setY = gaussianGenerator(1000,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function shootTenK(){
	myMove();
	var shoot = setTimeout(func,2100);
	function func(){
	var setX = doubleSlitGenerator(10000,width);
	var setY = gaussianGenerator(10000,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function shootHundred(){
	myMove();
	var shoot = setTimeout(func,2100);
	function func(){
	var setX = doubleSlitGenerator(100,width);
	var setY = gaussianGenerator(100,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function shootOne(){
	myMove();
	var shoot = setTimeout(func,2100);
	function func(){
	var setX = doubleSlitGenerator(1,width);
	var setY = gaussianGenerator(1,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function clearCanvas(){
	ctx.clearRect(0,0,width,height);
}