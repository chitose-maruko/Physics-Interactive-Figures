var bulbOn = document.getElementById('bulbOn'); //image of buld on
var bulbOff = document.getElementById('bulbOff');//image of bulb off
bulbOn.style.display ="none"; //initially suppress the image
var canvas = document.getElementById('screen');
var ctx = canvas.getContext("2d");
var height =300;//height of canvas
var width =600;//width of canavs
let setUp = new DoubleSlit(width); //see pseudoRandomGenerator.js line 54 about the object

setUp.distWall = 2;
setUp.wavelength=700*10**(-9);

function myMove(){
	//function for the animaton 
	var elm = document.getElementById('animate');//element subject to the movement
	var posX = 0;//initialize the x coordinate of animated object
	var time = 0;//time/y-coordinate
	var id = setInterval(frame,8);
	var bulbSwith = setTimeout(backToOff,1000);//swithes teh bulb off after 1 sec
	bulbOff.style.display="none";
	bulbOn.style.display ="block";
	elm.style.display="block";

	function frame(){
		//function that defines the motion of a particle
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
		//function that switches the bulb image back to off.
		bulbOn.style.display="none";
		bulbOff.style.display="block";
	}
}

function shootOneK(){
	//function to show 1000 particles on screen after an animation
	myMove();
	var shoot = setTimeout(func,2100);
	var num = 1000; //number of photons to be shot
	function func(){
	var setX = setUp.randomDoubleSlit(num);
	var setY = gaussianGenerator(1000,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function shootTenK(){
	myMove();
	//function to show 10000 particles on screen after an animation
	var shoot = setTimeout(func,2100);
	var num = 10000; //number of photons to be shot
	function func(){
	var setX = setUp.randomDoubleSlit(num);
	var setY = gaussianGenerator(10000,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function shootHundred(){
	//function to show 100 particles on screen after an animation
	myMove();
	var shoot = setTimeout(func,2100);
	var num = 100; //number of photons to be shot
	function func(){
	var setX = setUp.randomDoubleSlit(num);
	var setY = gaussianGenerator(100,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function shootOne(){
	//function to show 1 particles on screen after an animation
	myMove();
	var shoot = setTimeout(func,2100);
	var num = 1; //number of photons to be shot
	function func(){
	var setX = setUp.randomDoubleSlit(num);
	var setY = gaussianGenerator(num,height);
	ctx.fillStyle ="red";
	for (var i = 0; i < setX.length; i++) {
		ctx.fillRect(setX[i],setY[i],1,1);
}}
}

function clearCanvas(){
	ctx.clearRect(0,0,width,height);
}