var diagram = document.getElementById("diagram");
var ctx = diagram.getContext("2d");
var init = {x:200,y:350};
var mouseDown = false;
var drawn = false;
var xpos = 0;
var ypos =0;
var selected = document.getElementById("selected");
var ctxSelected = selected.getContext("2d");
var axes = document.getElementById("axes");
var ctxAxes = axes.getContext("2d");
var  light= document.getElementById("light");
var ctxLight = light.getContext("2d");
var diagram2 = document.getElementById("diagram2");
var ctx2 = diagram2.getContext("2d");
var axes2 = document.getElementById("axes2");
var ctxAxes2 = axes2.getContext("2d");
var  light2= document.getElementById("light2");
var ctxLight2 = light2.getContext("2d");
var newAxes = document.getElementById("newAxes");
var ctxNewAxes = newAxes.getContext("2d");
var userLine = [[init.y,init.y],[init.x,init.x]];
var frameR = [[init.y,init.y],[init.x,init.x]];
var onUserLine = false;
var onFrameR = false;
var inFrameR = true;



drawAxes(ctxAxes,init,axes.width,axes.height,"x","t");//draw axes
drawLight(ctxLight);
drawAxes(ctxAxes2,init,axes2.width,axes2.height,"x'","t'");
drawLight(ctxLight2);

diagram.addEventListener("mousemove",onMouseMove);
diagram.addEventListener("mouseup",onMouseUp);
diagram.addEventListener("mousedown",onMouseDown);
//diagram.addEventListener("dblclick",onClick);


function onMouseDown(event){
	mouseDown =true;
}

function onMouseMove(event){
    var xpos = event.pageX -diagram.offsetLeft;
    var ypos = event.pageY -diagram.offsetTop;
	if (mouseDown) {
    var coords = [[init.y,ypos],[init.x,xpos]];
	diagram.width =diagram.width;
    drawLine(coords,ctx,"blue","R'");
    ctx.fillStyle = "blue";
    ctx.fillRect(xpos,ypos,2,2);
} else if (drawn){
    var position = [[ypos],[xpos]];

    onUserLine = checkIfOnLine(userLine,position,init);
    onFrameR = checkIfOnLine(frameR,position,init);
console.log(onUserLine)
    if (onFrameR) {
        ctxSelected.clearRect(0,0,400,400);
        ctxSelected.beginPath();
        ctxSelected.lineWidth = 5;
        ctxSelected.strokeStyle = "red";
        ctxSelected.moveTo(frameR[1][0],frameR[0][0]);
        ctxSelected.lineTo(frameR[1][1],frameR[0][1]);
        ctxSelected.stroke();
        ctxSelected.closePath();

    } else if (onUserLine) {
        ctxSelected.clearRect(0,0,400,400);
        ctxSelected.beginPath();
        ctxSelected.lineWidth = 5;
        ctxSelected.strokeStyle = "blue";
        ctxSelected.moveTo(userLine[1][0],userLine[0][0]);
        ctxSelected.lineTo(userLine[1][1],userLine[0][1]);
        ctxSelected.stroke();
        ctxSelected.closePath();
}}

	}

function onMouseUp(event){
	mouseDown =false;
    var xpos = event.pageX -selected.offsetLeft;
    var ypos = event.pageY -selected.offsetTop;
    var position = [[ypos],[xpos]];
    var lines =[];

    onUserLine = checkIfOnLine(userLine,position,init);
    onFrameR = checkIfOnLine(frameR,position,init);
    if(drawn&&(onUserLine||onFrameR)){if(onUserLine&&inFrameR){
        ctx.clearRect(0,0,400,400);
        ctxSelected.clearRect(0,0,400,400);
        lines =transform(userLine,frameR,ctx,init,"blue","red");
        frameR=lines[1];
        userLine=lines[0];
        inFrameR =false;
    } else if(onFrameR&& !inFrameR){
        ctx.clearRect(0,0,400,400);
        ctxSelected.clearRect(0,0,400,400);
        lines =transform(frameR,userLine,ctx,init,"red","blue");
        console.log(lines);
        frameR =lines[0];
        userLine=lines[1];
        inFrameR =true;
    }

    } else{
        diagram.width = diagram.width;
    userLine = [[init.y,ypos],[init.x,xpos]];
    frameR = [[init.y,ypos],[init.x,init.x]];

    drawLine(userLine,ctx,"blue","R'");
    ctx.fillStyle = "blue";
    ctx.fillRect(xpos-4,ypos-4,8,8);
    drawLine(frameR,ctx,"red","R");
    ctx.fillStyle = "red";
    ctx.fillRect(196,ypos-4,8,8);
    diagram2.width = diagram2.width;

    transform(userLine,frameR,ctx2,init,"blue","red");
    inFrameR =true;
    drawn = true;
    }
	
}

function onClick(){
    var xpos = event.pageX -selected.offsetLeft;
    var ypos = event.pageY -selected.offsetTop;
    var position = [[ypos],[xpos]];
    var lines =[];

    onUserLine = checkIfOnLine(userLine,position,init);
    onFrameR = checkIfOnLine(frameR,position,init);
    if(onUserLine&&inFrameR){
        ctx.clearRect(0,0,400,400);
        lines =transform(userLine,frameR,ctx,init,"blue","red");
        frameR=lines[1];
        userLine=lines[0];
        inFrameR =false;
    } else if(onFrameR&& !inFrameR){
        ctx.clearRect(0,0,400,400);
        lines =transform(frameR,userLine,ctx,init,"red","blue");
        console.log(lines);
        frameR =lines[0];
        userLine=lines[1];
        inFrameR =true;
    }
}


function drawLight(ctx){
	ctx.moveTo(0+init.y-200,400);
	ctx.lineTo(400+init.y-200,0);
	ctx.setLineDash([5,3]);
	ctx.strokeStyle ='red';
	ctx.stroke(); //draw line of reference for u=c
	ctx.font="25px Arial";
	ctx.fillText("c",380,50+init.y-200);
}