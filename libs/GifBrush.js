int gifBrushFrame			= 0;
int gifBrushTotalFrames		= 0;
int lastFramePaintedto		= 0;
int gifBrushMode			= 1;


void gifBrush(int x1,int y1,int x2,int y2, int mouseBut){
	if (gifBrushLoaded) {
	    if (window.playing) {
	    	if (lastFramePaintedto != currentFrame) {
				switch(gifBrushMode){
					case 1:
					    drawGifBrush(x2,y2);	    
					break;
					case 2:
					    gifBrushLine(x1,y1,x2,y2);	    
					break;
					case 3:
					    sprayGifBrush(x2,y2);	    
					break;	
					case 4:
					    placeGifBrush(x2,y2);	    
					break;	
					case 5:
					    placeGifBrushStretched(x2,y2);	    
					break;	
				}
	            lastFramePaintedto = currentFrame;
	    	};        
	    } else {    
			switch(gifBrushMode){
				case 1:
				    drawGifBrush(x2,y2);	    
				break;
				case 2:
				    gifBrushLine(x1,y1,x2,y2);	    
				break;
				case 3:
				    sprayGifBrush(x2,y2);	    
				break;	
				case 4:
				    placeGifBrush(x2,y2);	    
				break;	
				case 5:
				    placeGifBrushStretched(x2,y2);	    
				break;	
			}
	    };		
	}
}

void setGifBrushMode(mode){
	gifBrushMode = mode;
}

void drawGifBrush(x,y){
	//console.log(gifBrushFrame);
	    imageMode(CENTER);
	    frames[currentFrame].imageMode(CENTER); 
	    image(gifBrushCanvas[gifBrushFrame],x,y);
	    frames[currentFrame].image(gifBrushCanvas[gifBrushFrame],x,y);
	    imageMode(CORNER);
	    frames[currentFrame].imageMode(CORNER);
		gifBrushFrame = (gifBrushFrame + 1) % (gifBrushTotalFrames);
}

void sprayGifBrush(x,y){
	//console.log(gifBrushFrame);
		int randX = random((lineWidth*3)*-1,lineWidth*3);
		int randY = random((lineWidth*3)*-1,lineWidth*3);
	    imageMode(CENTER);
	    frames[currentFrame].imageMode(CENTER); 
	    image(gifBrushCanvas[gifBrushFrame],x+randX,y+randY);
	    frames[currentFrame].image(gifBrushCanvas[gifBrushFrame],x+randX,y+randY);
	    imageMode(CORNER);
	    frames[currentFrame].imageMode(CORNER);
		gifBrushFrame = (gifBrushFrame + 1) % (gifBrushTotalFrames);
}

var currentlyPlacing = false;
void placeGifBrush(x,y){
	if (currentlyPlacing == false) {
		currentlyPlacing = true;
		for (gifBrushFrame=0; gifBrushFrame < gifBrushTotalFrames; gifBrushFrame++) {
		    imageMode(CENTER);
		    frames[currentFrame].imageMode(CENTER); 
		    image(gifBrushCanvas[gifBrushFrame],x,y);
		    frames[currentFrame].image(gifBrushCanvas[gifBrushFrame],x,y);
		    imageMode(CORNER);
		    frames[currentFrame].imageMode(CORNER);
			nextFrame();
			
		}
		currentlyPlacing = false;	
	}
	gifBrushFrame=0; //Safeguard	
}

void placeGifBrushStretched(x,y){
	if (currentlyPlacing == false) {
		currentlyPlacing = true;
		frameIncrement = gifBrushTotalFrames / totalFrames;
		gifBrushFrame = 0; //Safeguard	
		gifBrushCounter = 0;
		for (i=0; i < totalFrames; i++) {
		    imageMode(CENTER);
		    frames[currentFrame].imageMode(CENTER); 
		    image(gifBrushCanvas[gifBrushFrame],x,y);
		    frames[currentFrame].image(gifBrushCanvas[gifBrushFrame],x,y);
		    imageMode(CORNER);
		    frames[currentFrame].imageMode(CORNER);
			gifBrushCounter += frameIncrement;
			gifBrushFrame = Math.floor(gifBrushCounter);
			nextFrame();
			
		}
		currentlyPlacing = false;	
	}
	gifBrushFrame=0; //Safeguard	
}



void initGifBrush(gifWidth,gifHeight,gifLength){
    gifBrushFrame        = 0;
	gifBrushTotalFrames  = gifLength;
	gifBrushCanvas = new Array(gifLength);
	for (var i=0; i < gifBrushCanvas.length; i++) {
        gifBrushCanvas[i] = createGraphics(gifWidth,gifHeight);
    }
    console.log("Init GifBrush:"+gifWidth+","+gifHeight+","+gifLength);
}

void addGifBrushFrame(frameNumber,importedFrame){
	gifBrushCanvas[frameNumber].image(importedFrame,0,0);	  
	console.log("imported:"+frameNumber+"/"+gifBrushCanvas.length);
	if (frameNumber == (gifBrushCanvas.length-1)) {
		console.log("DONE!");
		$('#tool_gifbrush').click();
		$('#gifBrushInfo').text("Frames:"+gifBrushTotalFrames);
		
	};
    
}

void gifBrushLine(int x, int y, int x2, int y2) {
	
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
