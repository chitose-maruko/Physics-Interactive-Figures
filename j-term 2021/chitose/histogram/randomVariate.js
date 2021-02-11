/*the algorithm for this random variate generation is to first generate random x,y with the range of 
0<x<xMax, 0<y<yMax by Math.random() method, then check if the generated 2D coordinates fall under 
the curve of the given probability density. If the coordinates falls under the curve, then the
function stores the generated coordinates as a random variate. If not, it regenerate the random
coordinates and repeats the process until it obtaines the coordinate that falls under the probability
density function*/

function randomVariate(numPoints,xMax){
	var counter =0;
	var xpos =0;
	var ypos =0;
	var positions = []
	while(counter <numPoints){
		xpos = Math.random()*xMax;
		ypos = Math.random();
		if(ypos < probDensity(xpos,xMax)){
			positions.push(xpos);
			counter +=1;
		}

	}
	return positions;
}

/*user can change the following expression to any arbitrary mathematical function*/

/*Note 1:Maxmum value of probDensity(x) has to be one or you have to adjust the scaling
by changing yMax in the function above. yMax does not have to be exact expression for 
the global maximum of function, as long as yMax is greater than the maximum value in the 
given domain. However, it is best to have as close value to the exact value to reduce
the computation.*/

/*Note 2: Make sure probDensity(x)>=0, or you might not get the distribution you want*/
function probDensity(x,xMax){
	return Math.exp(-((x-xMax/2)**2));
}
