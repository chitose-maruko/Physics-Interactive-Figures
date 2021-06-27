function createList(plotRange,pointsNum,mathFunc){
	/*function to create a 2D array of coordinates from given mathematical function and
	plot Range and smoothness/number of points*/
	var incr = (plotRange.xmax - plotRange.xmin)/pointsNum; //x intervals for plots
	var xlist =[];
	var ylist =[];
	var x = plotRange.xmin;
	for (var i = 0; i < pointsNum+1; i++) {
		xlist.push((x/30-10));
		ylist.push(mathFunc.funcMath(x));
		x += incr;
		};
	var coordList ={x:xlist,y:ylist};
	return coordList;
	};

class Plot{
	constructor(id,mathFunc){
		this.func = mathFunc;
		this.pltDomain = {xmin: 0,xmax:600}; //default plot domain
		this.dataPoints = 1000; //default number of data points for the plot
		this.myDiv = document.getElementById(id);
		this.layout={
					  title: {
					    text:'Theoretical Plot',
					    font: {
					      family: 'Arial',
					      size: 18
					    }
					  },
					  xaxis: {
					    title: {
					      text: 'x  in cm',
					      font: {
					        family: 'Arial',
					        size: 15,
					      }
					    },
					  },
					  yaxis: {
					    title: {
					      text: '$$|\\Psi_{(x)}|^2$$',
					      font: {
					        family: 'Arial',
					        size: 15,
					      }
					    }
					  }
					};
	}
	plot(){var coords = [createList(this.pltDomain,this.dataPoints,this.func)];
		Plotly.newPlot( this.myDiv, coords,this.layout,{displayModeBar: false});
	}
}