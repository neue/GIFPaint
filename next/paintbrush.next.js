function tool_paintbrush() {
   
  tool_paintbrush.prototype.use = function(x,y,x2,y2,mouseButton){
    if (mouseButton == LEFT) {
      var brushCanvas = leftBrush;
    } else {
      var brushCanvas = rightBrush;            
    }
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
              this.drawBrush(j >> 8,y,brushCanvas);   
              j+=decInc;
          }
          return;
      }
      longLen += y;
      for (var j=0x80+(x<<8);y>=longLen;--y) {
          this.drawBrush(j >> 8,y,brushCanvas);   
          j -= decInc;
      }
      return;
    }
    if (longLen>0) {
      longLen += x;
      for (var j=0x80+(y<<8);x<=longLen;++x) {
          this.drawBrush(x,j >> 8,brushCanvas);
          j+=decInc;
      }
      return;
    }
    longLen += x;
    for (var j=0x80+(y<<8);x>=longLen;--x) {
      this.drawBrush(x,j >> 8,brushCanvas);
      j-=decInc;
    }
  };
  
  tool_paintbrush.prototype.drawBrush = function(_x,_y,brushCanvas){
    var _x = Math.floor(_x);
    var _y = Math.floor(_y);
    imageMode(CENTER);
    frames[currentFrame].imageMode(CENTER);
    image(brushCanvas,_x,_y);
    frames[currentFrame].image(brushCanvas,_x,_y);
    imageMode(CORNER);
    frames[currentFrame].imageMode(CORNER);
  };
  
  tool_paintbrush.prototype.efLine = function(x, y, x2, y2, targetCanvas, R, G, B){
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
                this.setPixel(j >> 8,y,targetCanvas,R,G,B);   
                j+=decInc;
            }
            return;
        }
        longLen+=y;
        for (var j=0x80+(x<<8);y>=longLen;--y) {
            this.setPixel(j >> 8,y,targetCanvas,R,G,B);   
            j-=decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen+=x;
        for (var j=0x80+(y<<8);x<=longLen;++x) {
            this.setPixel(x,j >> 8,targetCanvas,R,G,B);
            j+=decInc;
        }
        return;
    }
    longLen+=x;
    for (var j=0x80+(y<<8);x>=longLen;--x) {
        this.setPixel(x,j >> 8,targetCanvas,R,G,B);
        j-=decInc;
    }
  };
  
  tool_paintbrush.prototype.bCircle = function(x0, y0, radius, targetCanvas, R, G, B){
    var f = 1 - radius;
    var ddF_x = 1;
    var ddF_y = -2 * radius;
    var x = 0;
    var y = radius;
    this.efLine(x0, y0 + radius,x0, y0 - radius,targetCanvas,R,G,B);
    this.efLine(x0 + radius, y0,x0 - radius, y0,targetCanvas,R,G,B);
    while(x < y){
      if(f >= 0){
        y--;
        ddF_y += 2;
        f += ddF_y;
      }
      x++;
      ddF_x += 2;
      f += ddF_x;    
      this.efLine(x0 + x, y0 + y,x0 - x, y0 + y,targetCanvas,R,G,B);
      this.efLine(x0 + x, y0 - y,x0 - x, y0 - y,targetCanvas,R,G,B);
      this.efLine(x0 + y, y0 + x,x0 - y, y0 + x,targetCanvas,R,G,B);
      this.efLine(x0 + y, y0 - x,x0 - y, y0 - x,targetCanvas,R,G,B);
    }
  };
  
  
  tool_paintbrush.prototype.setPixel = function(x,y, targetCanvas, R, G, B){
    targetCanvas.set(x,y,color(R,G,B));
  };
  
  tool_paintbrush.prototype.set = function(_size,leftColor){
     if (leftBrush) {
        leftBrush.remove();        
     }
    leftBrush     = createGraphics(70,70);
    rightBrush    = createGraphics(70,70);
    leftBrush.parent('brushPreview');
    leftBrush.show();
    if (_size == 1) {
      // left
      this.setPixel(35,35,leftBrush,red(leftColor),green(leftColor),blue(leftColor));
      // right
      this.setPixel(35,35,rightBrush,red(rightColor),green(rightColor),blue(rightColor));
    } else if (_size == 2) {
      // left
      this.setPixel(35,35,leftBrush,red(leftColor),green(leftColor),blue(leftColor));
      this.setPixel(36,35,leftBrush,red(leftColor),green(leftColor),blue(leftColor));
      this.setPixel(35,36,leftBrush,red(leftColor),green(leftColor),blue(leftColor));
      this.setPixel(36,36,leftBrush,red(leftColor),green(leftColor),blue(leftColor));    
      // right
      this.setPixel(35,35,rightBrush,red(rightColor),green(rightColor),blue(rightColor));
      this.setPixel(36,35,rightBrush,red(rightColor),green(rightColor),blue(rightColor));
      this.setPixel(35,36,rightBrush,red(rightColor),green(rightColor),blue(rightColor));
      this.setPixel(36,36,rightBrush,red(rightColor),green(rightColor),blue(rightColor));    
    } else {
      // left
      this.bCircle(35,35,_size-2,leftBrush,red(leftColor),green(leftColor),blue(leftColor));
      // left
      this.bCircle(35,35,_size-2,rightBrush,red(rightColor),green(rightColor),blue(rightColor));
    };
    leftBrush.updatePixels();
    rightBrush.updatePixels();
  };
}

var paintbrush = new tool_paintbrush();

