function setup() {
   init(500,500,5);
}

var currentFrame = 0;
var frames;
var totalFrames;
var gifBackgroundColor;

var leftBrush;
var rightBrush;


function init(_width, _height, _totalFrames) {
   // Setup Canvas
   
   if (paintCanvas) {
      paintCanvas.remove();
      paintCanvas = null;
   }
   var paintCanvas = createCanvas(_width,_height);
   pixelDensity(1);
   paintCanvas.id('paintCanvas');
   paintCanvas.parent('canvasBorder');
   
   totalFrames = _totalFrames;
   frames = new Array(totalFrames);
   gifBackgroundColor = color(200);
   background(gifBackgroundColor);
   
   
   for (var i=0; i < frames.length; i++) {
       frames[i] = createGraphics(_width,_height);
       frames[i].strokeWeight(5);
       frames[i].stroke(255,0,0);
       frames[i].fill(255,0,0);
       frames[i].fill(0,0,0);
   }  
   
   // Setup Brushes
   leftBrush     = createGraphics(70,70);
   rightBrush    = createGraphics(70,70);
   
   setBrush(15,color(0,0,0));
}

function gotoFrame(_frame) {
   currentFrame = _frame;
   redrawFrame(currentFrame);
}

function redrawFrame(_framenum){
    background(gifBackgroundColor);
    image(frames[_framenum],0,0);	
}

function prevFrame() {
   if (currentFrame == 0) {
      currentFrame = totalFrames - 1;
   } else {
      currentFrame--;         
   }
   gotoFrame(currentFrame);
}

function nextFrame() {
   currentFrame = (currentFrame+1) % totalFrames;
   gotoFrame(currentFrame);
}


// TEMP TOOLS

function mouseDragged() {
   brushLine(pmouseX,pmouseY,mouseX,mouseY,null);
}

function mousePressed() {
   drawBrush(mouseX,mouseY,null);
}

function mouseReleased(){
    // frames[currentFrame].loadPixels();
    redrawFrame(currentFrame);
 }
 
 function keyPressed() {
   if (keyCode === LEFT_ARROW) {
      prevFrame();
   } else if (keyCode === RIGHT_ARROW) {
      nextFrame();
   }
   console.log(currentFrame);
 }
// END TEMP TOOLS