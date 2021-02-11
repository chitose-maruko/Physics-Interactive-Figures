function gaussianGenerator(numPoints,width){
	//random variate generator for Gaussian distribution.
	var counter =0;
	var xpos =0;
	var ypos =0;
	var positions = []
	while(counter <numPoints){
		xpos = Math.random()*width;
		ypos = Math.random();
		if(ypos < gaussian(xpos,width)){
			positions.push(xpos);
			counter +=1;
		}

	}
	return positions;
}

function gaussian(x,width){
	return Math.exp(-((x-width/2)**2)/8000);
}

function doubleSlit(x,width){ //probability density of double slit
	var wavelength= 593*10**(-9); //wavelength in cm
	var slitApart = 45*10**(-6);// distance between slits in cm
	var distWall = 1.5; //distance to the wall in meter
	var scFactor = width/40;
	var lambda = wavelength;
	var d = slitApart;
	var L = distWall;
	var k = 2*Math.PI*d/L/lambda;
	var theta = (x-width/2)/L/scFactor;
	var interference = (Math.cos(k*(x-width/2)/scFactor+1))/2;
	var diffraction = (Math.sin(theta)/theta)**2;
	return interference*diffraction;
	}

function doubleSlitGenerator(numPoints,width){
	var counter =0;
	var xpos =0;
	var ypos =0;
	var positionsX = [];
	while(counter <numPoints){
		xpos = Math.random()*width;
		ypos = Math.random();
		if(ypos < doubleSlit(xpos,width)){
			positionsX.push(xpos);
			counter +=1;
		}

	}
	return positionsX;
}

class DoubleSlit{
	//a class that stores information about the setup of double slit.
	//basic parameters can be easily redefined, and the changes will be automatically 
	//reflected on the random variate generation with randomDoubleSlit() method.
	constructor(canvasWidth){
		this.wavelength = 593*10**(-9); //default wavelength in cm
		this.slitApart = 45*10**(-6);// distance between slits in cm
		this.distWall = 1.5; //distance to the wall in meter
		this.canvasWidth = canvasWidth;
	}

	randomDoubleSlit(numParticles){
		//generates the random variate according to the given probability density
		var counter =0;//counter of how many coordinates has been stored.
		var xpos =0;
		var ypos =0;
		var positionsX = [];
		var lambda = this.wavelength;
		var d = this.slitApart;
		var L = this.distWall;
		var canvasWidth = this.canvasWidth;
		var scFactor = canvasWidth/40;//scaling factor
		while(counter < numParticles){
			//refer to histogram/randomVariate.js for the detail of this algorithm
			xpos = Math.random()*canvasWidth;
			ypos = Math.random();
			if(ypos < doubleSlitProbDensity(xpos)){
				positionsX.push(xpos);
				counter +=1;
			}

		}
		return positionsX;

		function doubleSlitProbDensity(x){
			//defines the probability density function of the given setup
		var k = 2*Math.PI*d/L/lambda;
		var theta = (x-canvasWidth/2)/L/scFactor;
		var interference = (Math.cos(k*(x- canvasWidth/2)/scFactor+1))/2;
		var diffraction = (Math.sin(theta)/theta)**2;
		return interference*diffraction;
	}
}
}
