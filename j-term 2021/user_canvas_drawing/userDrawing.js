var canv = document.getElementById("drawing");
var ctx = canv.getContext("2d");
var init = {x:0,y:0};
var mouseDown = false;

canv.onmousedown= function (event){
	var canvas = document.getElementById("drawing");
	init.x = event.pageX - canvas.offsetLeft;
	init.y = event.pageY - canvas.offsetTop;
	mouseDown =true;
}

canv.onmousemove = function(event){
	if (mouseDown) {
	canv.width =canv.width;
	xpos = event.pageX -canv.offsetLeft;
    ypos = event.pageY -canv.offsetTop;
    ctx.moveTo(init.x,init.y);
    ctx.lineTo(xpos,ypos);
    ctx.stroke();};

	}

canv.onmouseup=function(event){
	mouseDown =false;
	canv.width = canv.width;
    xpos = event.pageX -canv.offsetLeft;
    ypos = event.pageY -canv.offsetTop;
    ctx.moveTo(init.x,init.y);
    ctx.lineTo(xpos,ypos);
    ctx.stroke();
}