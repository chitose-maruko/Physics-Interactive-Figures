var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var height = 500;
var width = 500;
var ori ={x:250,y:250};
var pltDomain = {xmin:-10, xmax:10};
var smoothness = 100;
var sin = {funcMath: function(x){return Math.sin(x);}};
var gaussian = {funcMath:function(x){return Math.exp(-(x**2));}};
var quad = {funcMath:function(x){return x**2;}};
var expo = {funcMath:function(x){return Math.exp(x);}};
var crtFunc = expo;
var lst = createList(pltDomain, smoothness,crtFunc);
var scaling = autoScale(lst,width,height,ori);

canvas.height = height;
canvas.width =width;
listPlot(ctx,lst,ori,scaling,height,width);
drawAxes(ctx,ori,width,height);
drawScales(ctx,height,width,scaling,ori);



function quadratic(){
crtFunc = quad;
lst = createList(pltDomain, smoothness,crtFunc);
scaling = autoScale(lst,width,height,ori);

canvas.height = height;
canvas.width =width;
listPlot(ctx,lst,ori,scaling,height,width);
drawAxes(ctx,ori,width,height);
drawScales(ctx,height,width,scaling,ori);
	
};

function plotSin(){
	crtFunc = sin;
    lst = createList(pltDomain, smoothness,crtFunc);
    scaling = autoScale(lst,width,height,ori);

    canvas.height = height;
    canvas.width =width;
    listPlot(ctx,lst,ori,scaling,height,width);
    drawAxes(ctx,ori,width,height);
    drawScales(ctx,height,width,scaling,ori);
};

function plotGaussian(){
	crtFunc = gaussian;
    lst = createList(pltDomain, smoothness,crtFunc);
    scaling = autoScale(lst,width,height,ori);

    canvas.height = height;
    canvas.width =width;
    listPlot(ctx,lst,ori,scaling,height,width);
    drawAxes(ctx,ori,width,height);
    drawScales(ctx,height,width,scaling,ori);
};

function applyChnage(){
var xMin =parseFloat(document.getElementById("xmin").value);
var xMax =parseFloat(document.getElementById("xmax").value);
pltDomain.xmin = xMin;
pltDomain.xmax =xMax;

	lst = createList(pltDomain, smoothness,crtFunc);
    scaling = autoScale(lst,width,height,ori);
    
    canvas.height = height;
	canvas.width =width;
    listPlot(ctx,lst,ori,scaling,height,width);
    drawAxes(ctx,ori,width,height);
    drawScales(ctx,height,width,scaling,ori);

};