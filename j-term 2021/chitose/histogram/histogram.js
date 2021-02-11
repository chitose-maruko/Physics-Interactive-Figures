class Histogram { //a module which produces a histogram
	constructor(data, numBins,canvasId){
		this.sorted = freqsDistribution(data,numBins); // data stored in array of [[range],[frequency]]
		this.canvas = document.getElementById(canvasId); //canvas to draw the histogram
		this.ctx = this.canvas.getContext("2d");
		this.height = this.canvas.height; // height of canvas for drawing histogram
		this.width =this.canvas.width; // width of canvas for drawing histogram
	}
	drawHistorgram(){ 
		drawHistorgram(this.sorted,this.height,this.width,this.ctx);
	}
}

function freqsDistribution(data,numBins){ 
	//function to sort data into bins (for mat of [ranges, frequencies])
	//it takes a list and number of bins user wants to use. 
	//bin width of the frequency distribution is determined according to the number of 
	//elements in the data 
	var binWidth = (Math.max.apply(null,data) - Math.min.apply(null,data))/numBins; //bin width
	var ordered = data.sort((a,b)=>a-b);//data sorted in numerical ordered
	var freqs =[]; // data sorted into multiple bins
	var upperBound = ordered[0]+binWidth;//initialize the upperbound of first range
	var freq =0;//initialize the frequency of the first bin
	var counter =0; //index of the element in the data
	var range = [Math.min.apply(null,data)]; //lowest bound for the range.

	for (var i = 0; i <numBins; i++) {
		 //clear bin
		 freq=0
		 while(data[counter]<upperBound){
		 	//count the frequency of a certain range
		 	freq +=1;
		 	counter += 1;
		 }
		 freqs.push(freq); //append the counted frequency to the frequency list
		 range.push(upperBound);//append the upperbound to the range list
		 upperBound += binWidth;//update an upperbound for the next range
	}

	return  [range,freqs];
}


function drawHistorgram(sortedSet,height,width,ctx){
	//takes an array of [range,freqs], canvas height, canvas width, context and draws a histogram
	var freqMax = Math.max.apply(null,sortedSet[1]);//find maximum frequency to scale the height of 
	//unit frequency.
	var unitHeight = .9*height/freqMax;
	var unitWidth = .9*width/(sortedSet[1].length);
	var xpos =.05*width; //initialize the position of x

	for (var i = 0; i < sortedSet[1].length; i++) {
		ctx.beginPath();
		ctx.moveTo(xpos,.95*height);
		ctx.lineTo(xpos+unitWidth,.95*height);
		ctx.lineTo(xpos+unitWidth,.95*height-sortedSet[1][i]*unitHeight);
		ctx.lineTo(xpos,.95*height-sortedSet[1][i]*unitHeight);
		ctx.lineTo(xpos,.95*height);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "#BEF8F4";
		ctx.fill();
		xpos += unitWidth;
	}
}/*
var canvas = document.getElementById("histogram");
var ctxCanvas = canvas.getContext("2d");
drawHistorgram(result,400,400,ctxCanvas);*/

//test run of the code
testSet= randomVariate(10000,800);
let test = new Histogram(testSet,20,"histogram");
test.drawHistorgram();