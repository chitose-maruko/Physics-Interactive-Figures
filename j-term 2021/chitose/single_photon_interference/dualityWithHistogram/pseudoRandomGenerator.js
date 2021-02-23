function gaussianGenerator(numPoints,width){
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
		if(ypos < (doubleSlit(xpos,width))**2){
			positionsX.push(xpos);
			counter +=1;
		}

	}
	return positionsX;
}

class DoubleSlit{
	constructor(canvasWidth){
		this.wavelength = 593*10**(-9); //default wavelength in cm
		this.slitApart = 65*10**(-8);// distance between slits in cm
		this.distWall = 3; //distance to the wall in meter
		this.canvasWidth = canvasWidth;
	}
	probDensity(x){
		var lambda = this.wavelength;
		var d = this.slitApart;
		var L = this.distWall;
		var canvasWidth = this.canvasWidth;
		var scFactor = canvasWidth/40;
		var k = 2*Math.PI*d/L/lambda;
		var theta = (x-canvasWidth/2)/L/scFactor;
		var interference = (Math.cos(k*(x- canvasWidth/2)/scFactor)+1)/2;
		var diffraction = (Math.sin(theta)/theta)**2;
		return interference*diffraction;
	}
	randomDoubleSlit(numParticles){
		var counter =0;
		var xpos =0;
		var ypos =0;
		var positionsX = [];
		
		while(counter < numParticles){
			xpos = Math.random()*this.canvasWidth;
			ypos = Math.random();
			if(ypos < this.probDensity(xpos)){
				
				positionsX.push(xpos);
				counter +=1;
			}

		}
		return positionsX;}
}

