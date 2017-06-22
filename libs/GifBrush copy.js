void gifBrush(int x1,int y1,int x2,int y2, int mouseBut){
	//brushLine(x1,y1,x2,y2,leftBrush);
	//drawGifBrush(x2,y2);
	gifbrushLine(x1,y1,x2,y2);
}


int gifBrushFrame		= 0;
int gifBrushTotalFrames = 0;
void drawGifBrush(x,y,PGraphics brushCanvas){
	//console.log(gifBrushFrame);
                
	    imageMode(CENTER);
	    frames[currentFrame].imageMode(CENTER); /* Do we need this? */
	    image(gifBrushCanvas[gifBrushFrame],x,y);
	    frames[currentFrame].image(gifBrushCanvas[gifBrushFrame],x,y);
	    imageMode(CORNER);
	    frames[currentFrame].imageMode(CORNER);
		gifBrushFrame = (gifBrushFrame + 1) % (gifBrushTotalFrames);
}


void initGifBrush(gifWidth,gifHeight,gifLength){
	gifBrushTotalFrames = gifLength;
	gifBrushCanvas = new Array(gifLength);
	for (var i=0; i < gifBrushCanvas.length; i++) {
        gifBrushCanvas[i] = createGraphics(gifWidth,gifHeight);
    }
    console.log("Init GifBrush:"+gifWidth+","+gifHeight+","+gifLength);
}

void addGifBrushFrame(frameNumber,importedFrame){
	gifBrushCanvas[frameNumber].image(importedFrame,0,0);	  
	console.log("imported:"+frameNumber+"/"+gifBrushCanvas.length);
	if (frameNumber == gifBrushCanvas.length) {console.log("DONE!");};
    
}

void gifbrushLine(int x, int y, int x2, int y2) {
	
    boolean yLonger = false;
    int shortLen = y2-y;
    int longLen = x2-x;
    if (abs(shortLen)>abs(longLen)) {
        int swap = shortLen;
        shortLen = longLen;
        longLen = swap;              
        yLonger = true;
    }
    int decInc;
    if (longLen == 0) {decInc=0;}
    else{ decInc = (shortLen << 8) / longLen;}
    if (yLonger) {
        if (longLen>0) {
            longLen += y;
            for (int j=0x80+(x<<8);y<=longLen;++y) {
                drawGifBrush(j >> 8,y);   
                j+=decInc;
            }
            return;
        }
        longLen += y;
        for (int j=0x80+(x<<8);y>=longLen;--y) {
            drawGifBrush(j >> 8,y);   
            j -= decInc;
        }
        return;
    }
    if (longLen>0) {
        longLen += x;
        for (int j=0x80+(y<<8);x<=longLen;++x) {
            drawGifBrush(x,j >> 8);
            j+=decInc;
        }
        return;
    }
    longLen += x;
    for (int j=0x80+(y<<8);x>=longLen;--x) {
        drawGifBrush(x,j >> 8);
        j-=decInc;
    }



}
