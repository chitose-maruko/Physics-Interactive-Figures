var diagram = document.getElementById("diagram");
var ctx = diagram.getContext("2d");
var init = {x:200,y:350};
var mouseDown = false;
var xpos = 0;
var ypos =0;
var selected = document.getElementById("selected");
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



drawAxes(ctxAxes,init,axes.width,axes.height);//draw axes
ctxAxes.font ="25px Arial";
ctxAxes.fillText("t",init.x-20,20);
ctxAxes.fillText("x",axes.width -20,init.y-20);
ctxAxes2.font ="25px Arial";
ctxAxes2.fillText("t'",init.x-20,20);
ctxAxes2.fillText("x'",axes.width -20,init.y-20);
drawLight(ctxLight);
drawAxes(ctxAxes2,init,axes2.width,axes2.height);
drawLight(ctxLight2);


diagram.onmousedown= function (event){
	mouseDown =true;
}

diagram.onmousemove = function(event){
	if (mouseDown) {
	diagram.width =diagram.width;
	xpos = event.pageX -diagram.offsetLeft;
    ypos = event.pageY -diagram.offsetTop;
    ctx.strokeStyle="blue";
    ctx.moveTo(init.x,init.y);
    ctx.lineTo(xpos,ypos);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fillRect(xpos,ypos,2,2);
};

	}

diagram.onmouseup=function(event){
	mouseDown =false;
	diagram.width = diagram.width;
    xpos = event.pageX -diagram.offsetLeft;
    ypos = event.pageY -diagram.offsetTop;
    
    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.moveTo(init.x,init.y);
    ctx.lineTo(xpos,ypos);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fillRect(xpos-4,ypos-4,8,8);
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.moveTo(init.x,init.y);
    ctx.lineTo(init.x,ypos);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fillRect(196,ypos-4,8,8);
    diagram2.width = diagram2.width;
    var worldLineA = [[0,init.y-ypos],[0,xpos-init.x]];
    transform(worldLineA,ctx2,init,newAxes);
}

/*diagram.onmousemove = function(event){
	
	var line = [[init.y -200,200+init.y],[400,0]];
	var xpos = event.pageX -diagram.offsetLeft;
   	var ypos = event.pageY -diagram.offsetTop;
    var coords = [xpos,ypos];
    var ctx= diagram.getContext("2d");
    var state = false;
    state = checkIfOnLine(line,coords);
    console.log(state);
    if (state) {
    	ctx.lineWidth = 4;
    	ctx.strokeStyle = "red";
    	ctx.moveTo(line[0][0],line[1][0]);
    	ctx.lineTo(line[0][1],line[1][1]);
    	ctx.stroke();

    } else{diagram.width = diagram.width;}

}*/

function drawLight(ctx){
	ctx.moveTo(0+init.y-200,400);
	ctx.lineTo(400+init.y-200,0);
	ctx.setLineDash([5,3]);
	ctx.strokeStyle ='red';
	ctx.stroke(); //draw line of reference for u=c
	ctx.font="25px Arial";
	ctx.fillText("c",380,50+init.y-200);
}