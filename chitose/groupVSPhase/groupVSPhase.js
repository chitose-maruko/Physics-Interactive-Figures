var height = 200;
var width = 800;
var ori ={x:400,y:100};
var ori2 ={x:400,y:100};
var pltDomain = {xmin:-204, xmax:204};
var smoothness = 800;
var increment = .1;
var kIncrement = -.1;
var kCrt = 8;
var kList = [8,8.5];
var colorList = ["blue","red"];
var interval = 5;
var time =0;
var domain = {xmin: -204, xmax:204};
var offset=2.06061;
var offset2 = 63.8788;
var offset3=-59.7576;
var offset4=129.818;
var offset5=-125.697;
var offsetg=68;
var offset2g = -68;
var offset3g=-68*3;
var offset4g=68*3;

var wave3 ={funcMath:  function(x){return groupVelocity(x,time);}};

var wave1 = {k:2,funcMath: function(x,t){return Math.sin(2*Math.PI/(this.k)*x - 1/2*(2*Math.PI/(this.k))**2*time);}};

var lstWave4 =createList(domain, 500,wave3);
var scaling2 =autoScale(lstWave4,height,width,ori2);

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
	wave = {funcMath: function(x){return Math.sin((2*Math.PI/waveNumLocal)*x - 1/2*(2*Math.PI/(waveNumLocal))**2*time)}};
	lstWave = createList(pltDomain, smoothness,wave);
	listPlot(ctxWave1,lstWave,ori,scaling2,height,width,colorList[i]);
}


wave3 ={funcMath:  function(x){return groupVelocity(x,time);}}
lstWave3 =createList(domain, 2000,wave3);
ctxWave3.clearRect(0,0,800,200);
ctxWave4.clearRect(0,0,1000,200);
lstWave4 =createList(domain, 2000,wave3);
k1 = 2*Math.PI/kList[0];
k2 = 2*Math.PI/kList[1];
dk = k1 -k2;
omega1 = 1/2*k1**2;
omega2 = 1/2*k2**2;
dOmega = omega1-omega2;
groupV = dOmega/dk;
vPhase = (omega1+omega2)/(k1 +k2);
var xCurr = vPhase*time +offset;
if (xCurr>=204) {offset-=408;};
var xCurr2 = offset2+vPhase*time;
if (xCurr2>=204) {offset2-=408;};
var xCurr3 = offset3 + vPhase*time;
if (xCurr3>=204) {offset3-=408;};
var xCurr4 = offset4 + vPhase*time;
if (xCurr4>=204) {offset4-=408;};
var xCurr5 = offset5 + vPhase*time;
if (xCurr5>=204) {offset5-=408;};

var xCurrg = groupV*time +offsetg;
if (xCurrg>=204) {offsetg-=408;};
var xCurr2g = offset2g+groupV*time;
if (xCurr2g>=204) {offset2g-=408;};
var xCurr3g = offset3g + groupV*time;
if (xCurr3g>=204) {offset3-=408;};
var xCurr4g = offset4g + groupV*time;
if (xCurr4g>=204) {offset4g-=408;};

var yCurr = groupVelocity(xCurr,time);
var yCurr2 = groupVelocity(xCurr2,time);
var yCurr3 = groupVelocity(xCurr3,time);
var yCurr4 = groupVelocity(xCurr4,time);
var yCurr5 = groupVelocity(xCurr5,time);

var yCurrg = groupVelocity(xCurrg,time);
var yCurr2g = groupVelocity(xCurr2g,time);
var yCurr3g= groupVelocity(xCurr3g,time);
var yCurr4g = groupVelocity(xCurr4g,time);

listPlot(ctxWave3,lstWave3,ori2,scaling2,height,width,"purple");
markerCircle(xCurr, yCurr, ctxWave3, scaling2,ori2);
markerCircle(xCurr2, yCurr2, ctxWave3, scaling2,ori2);
markerCircle(xCurr3, yCurr3, ctxWave3, scaling2,ori2);
markerCircle(xCurr4, yCurr4, ctxWave3, scaling2,ori2);
markerCircle(xCurr5, yCurr5, ctxWave3, scaling2,ori2);
markerGroup(xCurrg,0,ctxWave3,scaling2,ori2);
markerGroup(xCurr2g,0,ctxWave3,scaling2,ori2);
markerGroup(xCurr3g,0,ctxWave3,scaling2,ori2);
markerGroup(xCurr4g,0,ctxWave3,scaling2, ori2);
plotLegend(ctxWave3);
}

function groupVelocity(x,t){
	var val=0;
	var waveNum =0;
	for (var i = 0; i < 2; i++) {
		waveNum = kList[i];
		val +=Math.sin(2*Math.PI/waveNum*x - 1/2*(2*Math.PI/waveNum)**2*t);
	}
	return val /(kList.length*(0.99**kList.length));
}