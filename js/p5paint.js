// Canvases
var canvasWidth  = 500;
var canvasHeight = 500;
var gifBackgroundColor;
var mainCanvas, clipboard, undo, frames, tracingFrame, tracingFrames;
var currentFrame, totalFrames;

//Tools
var undoPossible = false;
var onionSkin, onionSkinNext, tracing, tracingOpacity, lineWidth;





window.leftColour  = [0,0,0];
window.rightColour = [255,255,255];



function setup() {
  init(canvasWidth,canvasHeight,5);
  
}


function init(initWidth,initHeight,animationLength) {
	canvasWidth  = initWidth;
	canvasHeight = initHeight;
	stroke(0);
	fill(0);
  lineWidth = $('#size').val();
	strokeWeight(5);
  setStrokeWeight(lineWidth);
  
	mainCanvas = createCanvas(canvasWidth,canvasHeight);
  window.pjsin = mainCanvas;
	clipboard = createGraphics(canvasWidth,canvasHeight);
	undo = createGraphics(canvasWidth,canvasHeight);
  
  currentFrame = 0;
  frames = null;
	tracingFrame = null;
	frames          = new Array(animationLength);
	tracingFrames   = new Array(animationLength);
  
  onionSkin = $('#tool_onion').hasClass('on');
  onionSkinNext = $('#tool_onionNext').hasClass('on');
  tracing = $('#tool_tracing').hasClass('on');
  tracingOpacity = $("#tracingOpacity").val();
	totalFrames = frames.length;
  window.totalFramesForEncoder = totalFrames;
	$("#framenumber").attr("max",totalFrames-1);
	$("#framenumber").val(currentFrame);  
	$("#totalFrames").text(totalFrames);  
  for (var i=0; i < frames.length; i++) {
      frames[i] = createGraphics(canvasWidth,canvasHeight);
      frames[i].strokeWeight(5);
      frames[i].stroke(0);
      frames[i].fill(255,0,0);
      frames[i].fill(0,0,0);
  }
  for (var i=0; i < tracingFrames.length; i++) {
      tracingFrames[i] = createGraphics(canvasWidth,canvasHeight);
      tracingFrames[i].strokeWeight(5);
      tracingFrames[i].stroke(0);
      tracingFrames[i].fill(0,255,0);
      tracingFrames[i].fill(0,0,0);
  }
  gifBackgroundColor = color(rightColour[0],rightColour[1],rightColour[2]);
  switchFrame(0);
}

function resetFrameData(targetFrame){
	totalFrames = frames.length;
  window.totalFramesForEncoder = totalFrames;
	$("#framenumber").attr("max",totalFrames-1);
	$("#framenumber").val(currentFrame);  
	$("#totalFrames").text(totalFrames);  
	if(targetFrame < 0){
		switchFrame(0);      
	} else {
		switchFrame(targetFrame); 
	}
    
};
