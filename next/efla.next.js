
function drawBrush(_x,_y,meh) {
   brushCanvas = leftBrush;
   // ellipse(_x,_y,20,20);
   // frames[currentFrame].ellipse(_x,_y,20,20);
   x = Math.floor(_x);
   y = Math.floor(_y);
   imageMode(CENTER);
   frames[currentFrame].imageMode(CENTER);
   image(brushCanvas,x,y);
   frames[currentFrame].image(brushCanvas,x,y);
   imageMode(CORNER);
   frames[currentFrame].imageMode(CORNER);
}

// EFLA - Po-Han Lin
function brushLine(x, y, x2, y2, _brushCanvas) {	
   var brushCanvas = null;
   var yLonger = false;
   var shortLen = y2-y;
   var longLen = x2-x;
   if (abs(shortLen)>abs(longLen)) {
     var swap = shortLen;
     shortLen = longLen;
     longLen = swap;              
     yLonger = true;
   }
   var decInc;
   if (longLen == 0) {decInc=0;}
   else{ decInc = (shortLen << 8) / longLen;}
   if (yLonger) {
     if (longLen>0) {
         longLen += y;
         for (var j=0x80+(x<<8);y<=longLen;++y) {
             drawBrush(j >> 8,y,brushCanvas);   
             j+=decInc;
         }
         return;
     }
     longLen += y;
     for (var j=0x80+(x<<8);y>=longLen;--y) {
         drawBrush(j >> 8,y,brushCanvas);   
         j -= decInc;
     }
     return;
   }
   if (longLen>0) {
     longLen += x;
     for (var j=0x80+(y<<8);x<=longLen;++x) {
         drawBrush(x,j >> 8,brushCanvas);
         j+=decInc;
     }
     return;
   }
   longLen += x;
   for (var j=0x80+(y<<8);x>=longLen;--x) {
     drawBrush(x,j >> 8,brushCanvas);
     j-=decInc;
   }
}

function efLine(x, y, x2, y2, targetCanvas, R, G, B) {
    var yLonger=false;
    var shortLen=y2-y;
    var longLen=x2-x;
    if (abs(shortLen)>abs(longLen)) {
        var swap=shortLen;
        shortLen=longLen;
        longLen=swap;              
        yLonger=true;
    }
    var decInc;
    if (longLen==0) {decInc=0;}
    else{ decInc = (shortLen << 8) / longLen;}
    if (yLonger) {
        if (longLen>0) {
            longLen+=y;
            for (var j=0x80+(x<<8);y<=longLen;++y) {
                setPixel(j >> 8,y,targetCanvas,R,G,B);   
                j+=decInc;
            }
            return;
        }
        longLen+=y;
        for (var j=0x80+(x<<8);y>=longLen;--y) {
            setPixel(j >> 8,y,targetCanvas,R,G,B);   
            j-=decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen+=x;
        for (var j=0x80+(y<<8);x<=longLen;++x) {
            setPixel(x,j >> 8,targetCanvas,R,G,B);
            j+=decInc;
        }
        return;
    }
    longLen+=x;
    for (var j=0x80+(y<<8);x>=longLen;--x) {
        setPixel(x,j >> 8,targetCanvas,R,G,B);
        j-=decInc;
    }
}

function bCircle(x0, y0, radius, targetCanvas, R, G, B){
  var f = 1 - radius;
  var ddF_x = 1;
  var ddF_y = -2 * radius;
  var x = 0;
  var y = radius;
  efLine(x0, y0 + radius,x0, y0 - radius,targetCanvas,R,G,B);
  efLine(x0 + radius, y0,x0 - radius, y0,targetCanvas,R,G,B);
  while(x < y){
    if(f >= 0){
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;    
    efLine(x0 + x, y0 + y,x0 - x, y0 + y,targetCanvas,R,G,B);
    efLine(x0 + x, y0 - y,x0 - x, y0 - y,targetCanvas,R,G,B);
    efLine(x0 + y, y0 + x,x0 - y, y0 + x,targetCanvas,R,G,B);
    efLine(x0 + y, y0 - x,x0 - y, y0 - x,targetCanvas,R,G,B);
  }
}

function setPixel(x,y, targetCanvas, R, G, B) {
    targetCanvas.set(x,y,color(R,G,B));
}

function setBrush(size,brushColor) {
   bCircle(35,35,size,leftBrush,100,255,0);
   leftBrush.updatePixels();
   image(leftBrush,50,50);
}