class Histogram {
	constructor(data, numBins,canvasId){
		this.sorted = freqsDistribution(data,numBins); // data stored in array
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.height = this.canvas.height;
		this.width =this.canvas.width;
	}
	drawHistorgram(){
		drawHistorgram(this.sorted,this.height,this.width,this.ctx);
	}
}

function freqsDistribution(data,numBins){
	//function to sort data into bins
	var binWidth = (Math.max.apply(null,data) - Math.min.apply(null,data))/numBins;
	var ordered = data.sort((a,b)=>a-b);//data sorted in numerical ordered
	var freqs =[]; // data sorted into multiple bins
	var upperBound = ordered[0]+binWidth;
	var freq =0;
	var counter =0;
	var range = [Math.min.apply(null,data)];

	for (var i = 0; i <numBins; i++) {
		 //clear bin
		 freq=0
		 while(data[counter]<upperBound){
		 	freq +=1;
		 	counter += 1;
		 }
		 freqs.push(freq);
		 range.push(upperBound);
		 upperBound += binWidth;
	}

	return  [range,freqs];
}

/*result =freqsDistribution(testSet,10);*/

function drawHistorgram(sortedSet,height,width,ctx){
	//takes an array of [range,freqs]
	var ferqMax = Math.max.apply(null,sortedSet[1]);
	var unitHeight = .9*height/ferqMax;
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
var testSet =[];

for (var i = 0; i < 100; i++) {
	testSet.push(Math.random()*100);
}
let test = new Histogram(testSet,20,"histogram");
test.drawHistorgram();