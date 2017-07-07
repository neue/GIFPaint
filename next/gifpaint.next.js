function setup() {
   init(500,500,5);
}

var currentFrame = 0;
var frames;
var totalFrames;
var gifBackgroundColor;

var leftBrush, rightBrush;
var leftColor, rightColor;
var brushWeight = 3;
var toolBrushWeight;
var colorPickerLeft, colorPickerRight;
var mousePrevX,mousePrevY;


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
   // Disable context menu
   paintCanvas.elt.oncontextmenu = function (e) {
    e.preventDefault();
   };
   
   totalFrames = _totalFrames;
   frames = new Array(totalFrames);
   gifBackgroundColor = color(240);
   background(gifBackgroundColor);
   
   
   for (var i=0; i < frames.length; i++) {
       frames[i] = createGraphics(_width,_height);
   }  
   
   // Setup Brushes
   mousePrevX = mouseX; 
   mousePrevY = mouseY;
   
   
   toolBrushWeight = createSlider(1, 34, brushWeight);
   toolBrushWeight.input(toolBrushWeightSet);
   toolBrushWeight.parent('toolbox');
   
   colorPickerLeft = createInput("#000000",'color');
   colorPickerLeft.input(toolSetColors);
   colorPickerLeft.parent('toolbox');

   colorPickerRight = createInput("#FFFFFF",'color');
   colorPickerRight.input(toolSetColors);
   colorPickerRight.parent('toolbox');
   
   leftColor = color(colorPickerLeft.value());
   rightColor = color(colorPickerRight.value());

   paintbrush.set(brushWeight,leftColor);
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


function mouseMoved() {
   mousePrevX = mouseX;
   mousePrevY = mouseY;
}
function mouseDragged() {
   paintbrush.use(mousePrevX,mousePrevY,mouseX,mouseY,mouseButton);      
   mousePrevX = mouseX;
   mousePrevY = mouseY;
}

function mousePressed() {
   paintbrush.use(mouseX,mouseY,mouseX,mouseY,mouseButton);  
}

function toolBrushWeightSet(){
  brushWeight = toolBrushWeight.value();
  paintbrush.set(brushWeight,leftColor);
}

function toolSetColors(){
  leftColor = color(colorPickerLeft.value());
  rightColor = color(colorPickerRight.value());
  paintbrush.set(brushWeight,leftColor);
}

function mouseReleased() {
    // frames[currentFrame].loadPixels();
    redrawFrame(currentFrame);
 }
 
 function keyPressed() {
   if (keyCode === LEFT_ARROW) {
      prevFrame();
   }
   if (keyCode === RIGHT_ARROW) {
      nextFrame();
   }
   // -
   if (keyCode === 187) {
      brushWeight++;
      brushWeight = constrain(brushWeight,1,34);
      toolBrushWeight.value(brushWeight);
      paintbrush.set(brushWeight,leftColor);
   }
   // +
   if (keyCode === 189) {
      brushWeight--;
      brushWeight = constrain(brushWeight,1,34);
      toolBrushWeight.value(brushWeight);
      paintbrush.set(brushWeight,leftColor);
   }
   // R
   if (keyCode === 82) {
      let newColor = color(
         random(0,255),
         random(0,255),
         random(0,255)
      );
      let rgb = blue(newColor) | (green(newColor) << 8) | (red(newColor) << 16);
      let newColorHex = '#' + (0x1000000 + rgb).toString(16).slice(1)
      
      colorPickerLeft.value(newColorHex);
      toolSetColors();
   }

 }
// END TEMP TOOLS