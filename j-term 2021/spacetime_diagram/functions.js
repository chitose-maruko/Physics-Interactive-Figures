function matMultiply(array1,array2){
	var mat = [];
	if(array1[0].length ==array2.length){
	for (var i = 0; i < array1.length; i++) {
		var row =[];
		for (var j = 0; j < array2[0].length; j++) {
			var elm =0;
			for (var k = 0; k < array2.length; k++) {
				elm += array1[i][k]*array2[k][j];
			}
			row.push(elm);
		}
		mat.push(row);
	}
return mat;
}}

function lorentzTransform(u,coords){//in this function it is assumed c=1;
	var gamma = 1/(Math.sqrt(1-(u)**2));
	var lorentzMat = [[gamma,-gamma*u],[-gamma*u,gamma]];
	var newCoords = matMultiply(lorentzMat,coords);
	return newCoords;
}

function drawNewAxes(canvas,worldLine){
	var deltT = worldLine[0][1]-worldLine[0][0];
	var deltX = worldLine[1][1]-worldLine[1][0];
	var u = deltX/deltT;
	var initAxesX= [[-200,200],[0,0]];
	var initAxesY=[[0,0],[-200,200]];
	var axTipsX = [[10,0,-10],[width/2 -15,width/2,width/2-15]];
	var axTipsY =[[height/2-15,height/2,height/2-15],[10,0,-10]];
	var ctx = canvas.getContext("2d");
	var height= canvas.height;
	var width = canvas.width;

	var newAxesX = lorentzTransform(u,initAxesX);
	var newAxesY = lorentzTransform(u,initAxesY);
	var newTipX = lorentzTransform(u,axTipsX);
	var newTipY = lorentzTransform(u,axTipsY);

	canvas.width = width;
	ctx.strokeStyle = "grey";
	ctx.moveTo(newAxesX[1][0]+200,200 - newAxesX[0][0]);
	ctx.lineTo(newAxesX[1][1]+200,200- newAxesX[0][1]);
	ctx.moveTo(200+newAxesX[1][0],200-newAxesY[0][0]);
	ctx.lineTo(200+newAxesX[1][1],200-newAxesY[0][1]);
	//drawing arraw tips
	ctx.moveTo(axTipsX[1][0]+200,200-axTipsX[0][0]);
	ctx.lineTo(axTipsX[1][1]+200,200-axTipsX[0][1]);
	ctx.lineTo(axTipsX[1][2]+200,200-axTipsX[0][2]);
	ctx.moveTo(axTipsY[1][0]+200,200-axTipsY[0][0]);
	ctx.lineTo(axTipsY[1][1]+200,200-axTipsY[0][1]);
	ctx.lineTo(axTipsY[1][2]+200,200-axTipsY[0][2]);

	ctx.stroke();
	console.log(newAxesX);
}

function transform(worldLine,ctx,init,canvAxes){
	var deltT = worldLine[0][1]-worldLine[0][0];
	var deltX = worldLine[1][1]-worldLine[1][0];
	var u = deltX/deltT;
	var R = [[0,worldLine[0][1]],[0,0]];
	
	if(u<1 &&u>-1){
		var newLine = lorentzTransform(u,worldLine);
		var newR = lorentzTransform(u,R);
		ctx.beginPath();
		ctx.moveTo(newLine[1][0]+init.x,-newLine[0][0]+init.y);
		ctx.lineTo(newLine[1][1]+init.x,-newLine[0][1]+init.y);
		ctx.strokeStyle="blue";
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(newR[1][0]+init.x,-newR[0][0]+init.y);
		ctx.lineTo(newR[1][1]+init.x,-newR[0][1]+init.y);
		ctx.strokeStyle="red";
		ctx.stroke();

		ctx.fillStyle ="red";
		ctx.fillRect(newR[1][1]+init.x-4,-newR[0][1]+init.y-4,8,8);
		ctx.fillStyle = "blue";
    	ctx.fillRect(newLine[1][1]+init.x-4,-newLine[0][1]+init.y-4,8,8);
    	ctx.fillStyle = "blue";
    	ctx.fillRect(newLine[1][1]+init.x-4,-newLine[0][1]+init.y-4,8,8);

		//drawNewAxes(canvAxes,worldLine);
	}
}

function checkIfOnLine(line,coords){
	/*line = [xlist,ylist]; coords = [xpos,ypos];*/
	var range = 5;
	var onLine = false;

	var deltY= line[1][1] - line[1][0];
	var deltX = line[0][1]-line[0][0];
	var grad = -deltY/deltY;//gradient of line
	var yIntercept = line[1][0]-grad*line[0][0]; //yintercept of line

	var yInt = coords[1] +1/grad * coords[0];

	var closestPtX = grad*(yInt- yIntercept)/(grad**2 +1);
	var closestPtY = grad*closestPtX + yIntercept;

	var xpos = coords[0];
	var ypos = coords[1];
	var dist = Math.sqrt((closestPtX - xpos)**2 + (closestPtY- ypos)**2);

	if(dist <= range){
		onLine =true;
	}
	
	return onLine;
}

function drawAxes(context,origin,width,height){
	//draw x-y axes for the graph
	context.setLineDash([5,4])
    context.moveTo(0,origin.y);
	context.lineTo(width,origin.y);
	context.moveTo(origin.x,height);
	context.lineTo(origin.x,0);
context.stroke(); //draw x-y axes

	context.setLineDash([]);
    context.moveTo(origin.x-10,15);
	context.lineTo(origin.x,0);
	context.lineTo(origin.x +10,15);
	context.moveTo(width-15, origin.y -10);
	context.lineTo(width,origin.y);
	context.lineTo(width-15, origin.y +10);

	context.stroke();//draw tips of arrows
};