var height = 200;
var width = 800;
var ori ={x:400,y:100};
var pltDomain = {xmin:-40, xmax:40};
var smoothness = 1000;
var increment = .01;
var kIncrement = .1;
var kCrt = 2;
var kList = [kCrt];
var colorList = ["blue"];
var clearing = document.getElementById('clear');

var time =0;

var wave1 = {k:2,funcMath: function(x,t){return Math.sin(this.k*x - 2*(this.k)**2*time);}};


var canvWave1 = document.getElementById('wave1');
var ctxWave1 = canvWave1.getContext('2d');

var canvAxes1 = document.getElementById('axes1');
var ctxAxes1 = canvAxes1.getContext('2d');
var canvAxes3 = document.getElementById('axes3');
var ctxAxes3 = canvAxes3.getContext('2d');

var canvWave2 = document.getElementById('wave2');
var ctxWave2 = canvWave2.getContext('2d');
var canvWave3 = document.getElementById('wave3');
var ctxWave3 = canvWave3.getContext('2d');

var lstWave1 = createList(pltDomain, smoothness,wave1);


var scaling = autoScale(lstWave1,height,width,ori);
drawAxes(ctxAxes1,ori,width,height);
drawAxes(ctxAxes3,ori,width,height);
drawPlot();
clearing.addEventListener("click",function(){
	kList = [kCrt];
 	colorList = ["blue"];
 	kCrt =2;
 	drawPlot();
});

function drawPlot(){
var waveNumLocal=0;
ctxWave1.clearRect(0,0,800,200);
for (var i = 0; i < kList.length; i++) {
	waveNumLocal =kList[i];
	wave = {funcMath: function(x){return Math.sin(waveNumLocal*x - 2*(waveNumLocal)**2*time)}};
	lstWave = createList(pltDomain, smoothness,wave);
	listPlot(ctxWave1,lstWave,ori,scaling,height,width,colorList[i]);
}


wave3 ={funcMath:  function(x){return groupVelocity(x,time);}}
lstWave3 =createList(pltDomain, smoothness,wave3);
ctxWave3.clearRect(0,0,800,200);
listPlot(ctxWave3,lstWave3,ori,scaling,height,width,"purple");
}

function addNewWave(increment){
	time =0;
 kCrt += kIncrement;
 kList.push(kCrt);
 colorList.push("#"+randomColor());
 drawPlot();
}

function clear(){
	kList = [kCrt];
 	colorList = ["blue"];
 	drawPlot();
 	console.log("clear");
}

function groupVelocity(x,t){
	var val=0;
	var waveNum =0;
	for (var i = 0; i < kList.length; i++) {
		waveNum = kList[i];
		val +=Math.sin(waveNum*x - 2*(waveNum)**2*t);
	}
	return val /(kList.length*(0.99**kList.length));
}

function randomColor(){
	return Math.floor(Math.random()*16777215).toString(16);
}

