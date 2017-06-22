importScripts('NeuQuant.js');

self.onmessage = function(event) {
    //console.log("message!");
    var frame_index,
    gifheight, 
    gifwidth,
    frameData; //get it from onmessage

    frame_index = event.data["frame_index"];
    gifheight = event.data["height"];
    gifwidth = event.data["width"];
    frameData = event.data["frameData"];

	var pixels = new Uint8Array( gifwidth * gifheight );

    var palette = generatePalette(frameData,pixels);
    var indexedPixels;
    //console.log("Colours:"+palette.length);
    if(palette.length > 256) {
        //console.log("!!!!!! Doing Quant");
        doQuant(frameData,gifwidth,gifheight)
        var palette = generatePalette(frameData,pixels);	
    } else {
        //console.log("Under 256");
    }

    palette = pow2Palette(palette);			
    //console.log("Now "+palette.length);


    self.postMessage({"frame_index":frame_index,"pixels_for_gif":pixels,"palette":palette}) 
    
    
};


var generatePalette = function(frameData,pixels) {
	var palette = [];
	for ( var j = 0, k = 0, jl = frameData.length; j < jl; j += 4, k ++ ) {
		if (palette.length < 257) {
			var r = frameData[ j + 0 ];
			var g = frameData[ j + 1 ];
			var b = frameData[ j + 2 ];
			var color = r << 16 | g << 8 | b << 0;
			var index = palette.indexOf( color );
			if ( index === -1 ) {   
				pixels[ k ] = palette.length;
				palette.push( color );
			} else {
				pixels[ k ] = index;
			}
		} else {
			//console.log("Over 256");
			break;
		}
	}
	//console.log("Palette generated "+palette.length);
	return palette;
}

var pow2Palette = function(palette){
	var powof2 = 2;
	while ( powof2 < palette.length ) powof2 <<= 1;
	palette.length = powof2;
	return palette;			
}


//
//	NeuQuant
//

var BGRpixels/*ByteArray*/; // BGR byte array from frame
var usedEntry/*Array*/ = new Array; // active palette entries
var indexedPixels/*ByteArray*/ // converted frame indexed to palette
var transparent/***/ = null; // transparent color if given

function doQuant(image,w,h){
	getImagePixels(image,w,h);

	var len/*int*/ = BGRpixels.length;
    var nPix/*int*/ = len / 3;
	var sample/*int*/ = 1; // default sample interval for quantizer 
    indexedPixels = [];

	var nq/*NeuQuant*/ = new NeuQuant(BGRpixels, len, sample);
    colorTab = nq.process(); // create reduced palette
    // map image pixels to new palette
    var k/*int*/ = 0;
    for (var j/*int*/ = 0; j < nPix; j++) {
      var index/*int*/ = nq.map(BGRpixels[k++] & 0xff, BGRpixels[k++] & 0xff, BGRpixels[k++] & 0xff);
      usedEntry[index] = true;
      indexedPixels[j] = index;
    }
    BGRpixels = null;
    colorDepth = 8;
    palSize = 7;
    // get closest match to transparent color if specified
    if (transparent != null) {
      transIndex = findClosest(transparent);
    }
	setImagePixels(indexedPixels,colorTab,image,w,h);
	//listPal(colorTab);
}

// Extracts image pixels into byte array "pixels
var getImagePixels = function getImagePixels(data,w,h){
    BGRpixels = [];
    var count = 0;

    for ( var i/*int*/ = 0; i < h; i++ ){
    	for (var j/*int*/ = 0; j < w; j++ ){
    		var b = (i*w*4)+j*4;
    		BGRpixels[count++] = data[b];
    		BGRpixels[count++] = data[b+1];
    		BGRpixels[count++] = data[b+2];
    	}
    }
}

var setImagePixels = function setImagePixels(pixelArray,generatedPalette,imageDataToWrite,w,h){
	    for ( x=0; x<w; x++ ){
	        for ( y=0; y<h; y++ ){
	            rgb    = ( x * h + y );
	            rgba    = ( x * h + y ) * 4;
	            imageDataToWrite[ rgba + 0 ] = generatedPalette[3*pixelArray[rgb]];
	            imageDataToWrite[ rgba + 1 ] = generatedPalette[3*pixelArray[rgb]+1];
	            imageDataToWrite[ rgba + 2 ] = generatedPalette[3*pixelArray[rgb]+2];
			}
		}
}