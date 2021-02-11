var origin = {x:200,y:350};

var diagram = document.getElementById('diagram');
var ctxDiagram = diagram.getContext('2d');

var selected = document.getElementById('selected');
var ctxSelected = selected.getContext('2d');

var axes = document.getElementById('diagram');
var ctxAxes = axes.getContext('2d');

//event coordinates in cartesian ([list-t,list-x])
var eventEarth = [[0,300],[0,0]];
var eventOutgoing = [[0,150],[0,75]];
var eventIncoming = [[150,300],[75,0]];

var earthLine = eventEarth;
var outgoingLine = eventOutgoing;
var incomingLine = eventIncoming;
var onEarth =false;
var onOutgoing =false;
var onIncoming =false;

//drawing worldlines in Earth reference frame
earthFrame();
diagram.addEventListener("mousemove",onMouseMove);
diagram.addEventListener("click",onClick);

function onMouseMove(event){
	var xpos = event.pageX -selected.offsetLeft;
   	var ypos = event.pageY -selected.offsetTop;
    var coords = [[ypos],[xpos]];
    var ctx= selected.getContext("2d");
    var onEarth = false;
    var onOutgoing = false;
    var onIncoming = false;
    

    onEarth = checkIfOnLine(earthLine,coords,origin);
    onOutgoing = checkIfOnLine(outgoingLine,coords,origin);
    onIncoming = checkIfOnLine(incomingLine,coords,origin);
   
    if (onEarth) {
    	ctx.clearRect(0,0,400,400);
    	ctx.beginPath();
    	ctx.lineWidth = 5;
    	ctx.strokeStyle = "red";
    	ctx.moveTo(earthLine[1][0],earthLine[0][0]);
    	ctx.lineTo(earthLine[1][1],earthLine[0][1]);
    	ctx.stroke();
    	ctx.closePath();

    } else if (onOutgoing) {
    	ctx.clearRect(0,0,400,400);
    	ctx.beginPath();
    	ctx.lineWidth = 5;
    	ctx.strokeStyle = "blue";
    	ctx.moveTo(outgoingLine[1][0],outgoingLine[0][0]);
    	ctx.lineTo(outgoingLine[1][1],outgoingLine[0][1]);
    	ctx.stroke();
    	ctx.closePath();

    } else if (onIncoming) {
    	ctx.clearRect(0,0,400,400);
    	ctx.beginPath();
    	ctx.lineWidth = 5;
    	ctx.strokeStyle = "blue";
    	ctx.moveTo(incomingLine[1][0],incomingLine[0][0]);
    	ctx.lineTo(incomingLine[1][1],incomingLine[0][1]);
    	ctx.stroke();
    	ctx.closePath();

    } else{selected.width = selected.width;}
}

function onClick(){
	var xpos = event.pageX -selected.offsetLeft;
   	var ypos = event.pageY -selected.offsetTop;
    var coords = [[ypos],[xpos]];
	onEarth = checkIfOnLine(earthLine,coords,origin);
    onOutgoing = checkIfOnLine(outgoingLine,coords,origin);
    onIncoming = checkIfOnLine(incomingLine,coords,origin);

	if(onEarth){
		ctxSelected.clearRect(0,0,selected.width,selected.height);
		earthFrame();
	} else if(onOutgoing) {
		ctxSelected.clearRect(0,0,selected.width,selected.height);
		outgoingFrame();
	} else if(onIncoming){
		ctxSelected.clearRect(0,0,selected.width,selected.height);
		incomingFrame();
	}
}

function earthFrame(){
	var earth = cartToPos(origin,eventEarth);
	var outgoing = cartToPos(origin,eventOutgoing);
	var incoming = cartToPos(origin,eventIncoming);
	ctxDiagram.clearRect(0,0,400,400);
	drawAxes(ctxAxes,origin,axes.width,axes.height,"x","t");
	drawLine(earth,ctxDiagram,"red","R");
	drawLine(outgoing,ctxDiagram,"blue","R'");
	drawLine(incoming,ctxDiagram,"blue","R''");
	earthLine = earth; //coordinates of line 
	outgoingLine = outgoing;
	incomingLine = incoming;
}

function outgoingFrame(){
	var deltT = eventOutgoing[0][1]-eventOutgoing[0][0];
	var deltX = eventOutgoing[1][1]-eventOutgoing[1][0];
	var u = deltX/deltT;

	var transformedE = lorentzTransform(u,eventEarth);
	var transformedO = lorentzTransform(u,eventOutgoing);
	var transformedI = lorentzTransform(u,eventIncoming);

	var earth = cartToPos(origin,transformedE);
	var outgoing = cartToPos(origin,transformedO);
	var incoming = cartToPos(origin,transformedI);
	ctxDiagram.clearRect(0,0,400,400);
	drawAxes(ctxAxes,origin,axes.width,axes.height,"x'","t'");
	drawLine(earth,ctxDiagram,"red","R");
	drawLine(outgoing,ctxDiagram,"blue","R'");
	drawLine(incoming,ctxDiagram,"blue","R''");
	earthLine = earth;
	outgoingLine = outgoing;
	incomingLine = incoming;

}

function incomingFrame(){
	var deltT = eventIncoming[0][1]-eventIncoming[0][0];
	var deltX = eventIncoming[1][1]-eventIncoming[1][0];
	var u = deltX/deltT;

	var transformedE = lorentzTransform(u,eventEarth);
	var transformedO = lorentzTransform(u,eventOutgoing);
	var transformedI = lorentzTransform(u,eventIncoming);

	var earth = cartToPos(origin,transformedE);
	var outgoing = cartToPos(origin,transformedO);
	var incoming = cartToPos(origin,transformedI);
	ctxDiagram.clearRect(0,0,400,400);
	drawAxes(ctxAxes,origin,axes.width,axes.height,"x''","t''");
	drawLine(earth,ctxDiagram,"red","R");
	drawLine(outgoing,ctxDiagram,"blue","R'");
	drawLine(incoming,ctxDiagram,"blue","R''");
	earthLine = earth;
	outgoingLine = outgoing;
	incomingLine = incoming;

}