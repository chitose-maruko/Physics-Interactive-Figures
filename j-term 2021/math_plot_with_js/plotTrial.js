var canvasId = "myCanvas"
var sin = {funcMath: function(x){return Math.sin(x);}};
var quad = {funcMath:function(x){return x**2;}};
let myPlot = new Plot(canvasId,sin);

myPlot.plot();