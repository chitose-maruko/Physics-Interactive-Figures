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



function drawAxes(context,origin,width,height,xLabel,yLabel){
	//draw x-y axes for the graph
	context.beginPath();
	context.strokeStyle ="black";
	context.lineWidth =1;
    context.moveTo(0,origin.y);
	context.lineTo(width,origin.y);
	context.moveTo(origin.x,height);
	context.lineTo(origin.x,0);
	context.stroke(); //draw x-y axes
	context.closePath();

	context.beginPath();
	context.setLineDash([]);
    context.moveTo(origin.x-10,15);
	context.lineTo(origin.x,0);
	context.lineTo(origin.x +10,15);
	context.moveTo(width-15, origin.y -10);
	context.lineTo(width,origin.y);
	context.lineTo(width-15, origin.y +10);

	context.stroke();//draw tips of arrows
	context.closePath();

	context.font ="25px Arial";
	context.fillText(yLabel,origin.x-20,20);
	context.fillText(xLabel,width -20,origin.y-20);

};

function cartToPos(origin,cartesianList){
	var xList = [];
	var ylist =[];
	for (var i = 0; i < cartesianList[0].length; i++) {
		xList.push(cartesianList[1][i] + origin.x);
		ylist.push(origin.y - cartesianList[0][i]);
	}
	return [ylist,xList];
}


function posToCart(origin,position){
	var xList = [];
	var ylist =[];
	for (var i = 0; i < position[0].length; i++) {
		xList.push(position[1][i] - origin.x);
		ylist.push(origin.y - position[0][i]);
	}
	return [ylist,xList];
}

function drawLine(coords,ctx,color,label){
	var textCoord = {x:(coords[1][0]+coords[1][1])/2 +5, 
		y: (coords[0][0]+coords[0][1])/2 +5
	 };

	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 3;
	ctx.font = "25px Arial";
	ctx.fillText(label, textCoord.x,textCoord.y);

	ctx.moveTo(coords[1][0],coords[0][0])
	for (var i = 1; i < coords[0].length; i++) {
		ctx.lineTo(coords[1][i],coords[0][i]);
	}
	ctx.stroke();
	ctx.closePath();
}

function checkIfOnLine(line,coords,origin){
	/*line = [ylist,xlist]; coords = [[ypos],[xpos]];*/
	var range = 5;
	var onLine = false;
	var lineInCart = posToCart(origin,line);
	var posInCart = posToCart(origin,coords);
	var x = coords[1][0];
	var y=coords[0][0];
	var deltX = lineInCart[1][1]-lineInCart[1][0];
	var deltY = lineInCart[0][1]-lineInCart[0][0];
	var bool = (y< (range +Math.max.apply(null,line[0])) && y> (Math.min.apply(null,line[0])-range));
	
	if(bool){	
	if (deltX==0){
		var closestPtY = coords[0][0];
		var closestPtX = line[1][0];
	} else{
		var grad = deltY/deltX;
		var b = lineInCart[0][0]-grad*lineInCart[1][0];
		var yIntcept = posInCart[0][0] + 1/grad * posInCart[1][0];
		var PtX = grad * (yIntcept-b)/(grad**2 +1);
		var PtY = grad*PtX + b;
		var pos = cartToPos(origin,[[PtY],[PtX]]);
		var closestPtX = pos[1][0];
		var closestPtY = pos[0][0];
	}
	var dist = Math.sqrt((closestPtX - x)**2+(closestPtY - y)**2);

	
	if(dist <= range){
		onLine =true;
	};
};
	return onLine;
}