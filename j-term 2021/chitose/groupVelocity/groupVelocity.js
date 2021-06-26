var height = 200;
var width = 800;
var ori ={x:400,y:100};
var ori2 ={x:500,y:100};
var pltDomain = {xmin:-40, xmax:40};
var smoothness = 800;
var increment = .1;
var kIncrement = -.1;
var kCrt = 8;
var kList = [kCrt];
var colorList = ["blue"];
var interval = 10;
const lcmsPrecomputed = [
	8,
	632,
	24648,
	1897896,
	36060024,
	180300120,
	6671104440,
	486990624120,
	1460971872360,
	103729002937560,
	103729002937560,
	2385767067563880,
	40558040148585960,
	2717388689955259320,
	2717388689955259320,
	2717388689955259320,
	10869554759821037280,
	10869554759821037280,
	336956197554452155680,
	20554328050821581496480,
	20554328050821581496480,
	1212705354998473308292320,
	35168455294955725940477280,
	35168455294955725940477280,
	35168455294955725940477280,
	35168455294955725940477280,
	105505365884867177821431840,
	5591784391897960424535887520,
	5591784391897960424535887520,
	5591784391897960424535887520,
	5591784391897960424535887520,
	39142490743285722971751212640,
	39142490743285722971751212640,
	1839697064934428979672306994080,
	1839697064934428979672306994080,
	1839697064934428979672306994080,
	1839697064934428979672306994080,
	79106973792180446125909200745440,
	79106973792180446125909200745440,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040,
	3243385925479398291162277230563040];
var testSet=[3,4,6];
var domain = domainOfZoomedOut(kList);

var time =0;
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
for (var i = 0; i < kList.length; i++) {
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

function addNewWave(increment){
	if(kCrt>1){

	time =0;
 kCrt += kIncrement;
 kList.push(kCrt);
 domain = domainOfZoomedOut(kList);
 lstWave4 =createList(domain, 2000,wave3);
 scaling2 =autoScale(lstWave4,height,1000,ori2);
 lstWave3 =createList(pltDomain, smoothness,wave3);
ctxWave3.clearRect(0,0,800,200);
ctxWave4.clearRect(0,0,1000,200);
listPlot(ctxWave4,lstWave4,ori2,scaling2, height,100, "purple");
listPlot(ctxWave3,lstWave3,ori,scaling,height,width,"purple");
drawWindow(scaling2,pltDomain,ctxWindow,ori2);
 colorList.push("#"+randomColor());}
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

function randomColor(){
	return Math.floor(Math.random()*16777215).toString(16);
}

function lcm(set){
	var index = set.length;
	return lcmsPrecomputed[index];

}

function domainOfZoomedOut(list){
	var LCM = lcm(list);
	return {xmin:-LCM/20*.5, xmax:LCM/20*.5};

}

function drawWindow(scale, domain,context,origin){
	var ymax = 90;
context.beginPath();
ctxWindow.clearRect(0,0,1000,200);
	context.strokeStyle="red";
    context.moveTo(domain.xmin*scale.x + origin.x,origin.y+ymax);
	context.lineTo(domain.xmax*scale.x + origin.x,origin.y+ymax);
	context.lineTo(domain.xmax*scale.x + origin.x,origin.y-ymax);
	context.lineTo(domain.xmin*scale.x + origin.x,origin.y-ymax);
	context.lineTo(domain.xmin*scale.x + origin.x,origin.y+ymax);
context.stroke();
}


