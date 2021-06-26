var height = 200;
var width = 800;
var ori ={x:400,y:100};
var ori2 ={x:500,y:100};
var pltDomain = {xmin:-40, xmax:40};
var smoothness = 800;
var increment = .1;
var kIncrement = -.1;
var kCrt = 8;
var kList = [8,7.9];
var colorList = ["blue"];
var interval = 10;
var time =0;
var domain = pltDomain;

var wave3 ={funcMath:  function(x){return groupVelocity(x,time);}};

var wave1 = {k:2,funcMath: function(x,t){return Math.sin(2*Math.PI/(this.k)*x - 2*(2*Math.PI/(this.k))**2*time);}};

var lstWave4 =createList(domain, 500,wave3);
var scaling2 =autoScale(lstWave4,height,100,ori2);

var canvWave1 = document.getElementById('wave1');
var ctxWave1 = canvWave1.getContext('2d');

var canvAxes1 = document.getElementById('axes1');
var ctxAxes1 = canvAxes1.getContext('2d');
var canvAxes3 = document.getElementById('axes3');
var ctxAxes3 = canvAxes3.getContext('2d');
var canvAxes4 = document.getElementById('axes4');
var ctxAxes4 = canvAxes4.getContext('2d');

var canvWave2 = document.getElementById('wave2');
var ctxWave2 = canvWave2.getContext('2d');
var canvWave3 = document.getElementById('wave3');
var ctxWave3 = canvWave3.getContext('2d');
var canvWave4 = document.getElementById('wave4');
var ctxWave4 = canvWave4.getContext('2d');
var viewWindow = document.getElementById('window');
var ctxWindow = viewWindow.getContext('2d');

var lstWave1 = createList(pltDomain, smoothness,wave1);


var scaling = autoScale(lstWave1,height,width,ori);
drawAxes(ctxAxes1,ori,width,height);
drawAxes(ctxAxes3,ori,width,height);
drawAxes(ctxAxes4,ori2,1000,height);


var wave1Animate = setInterval(drawPlot,interval);

function play(){
	clearInterval(wave1Animate);
	wave1Animate = setInterval(drawPlot,interval);
}
function pause(){
	clearInterval(wave1Animate);
}

function drawPlot(){
time += increment;
var waveNumLocal=0;
ctxWave1.clearRect(0,0,800,200);
for (var i = 0; i < 2; i++) {
	waveNumLocal =kList[i];
	wave = {funcMath: function(x){return Math.sin((2*Math.PI/waveNumLocal)*x - 2*(2*Math.PI/(waveNumLocal))**2*time)}};
	lstWave = createList(pltDomain, smoothness,wave);
	listPlot(ctxWave1,lstWave,ori,scaling,height,width,colorList[i]);
}


wave3 ={funcMath:  function(x){return groupVelocity(x,time);}}
lstWave3 =createList(pltDomain, smoothness,wave3);
ctxWave3.clearRect(0,0,800,200);
ctxWave4.clearRect(0,0,1000,200);
lstWave4 =createList(domain, 2000,wave3);
listPlot(ctxWave4,lstWave4,ori2,scaling2, height,100, "purple");
listPlot(ctxWave3,lstWave3,ori,scaling,height,width,"purple");
}

function groupVelocity(x,t){
	var val=0;
	var waveNum =0;
	for (var i = 0; i < kList.length; i++) {
		waveNum = kList[i];
		val +=Math.sin(2*Math.PI/waveNum*x - 2*(2*Math.PI/waveNum)**2*t);
	}
	return val /(kList.length*(0.99**kList.length));
}