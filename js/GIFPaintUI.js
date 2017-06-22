//
//       @@@@@@@  @@@ @@@@@@@@ @@@@@@@   @@@@@@  @@@ @@@  @@@ @@@@@@@
//      !@@       @@! @@!      @@!  @@@ @@!  @@@ @@! @@!@!@@@   @@!  
//      !@! @!@!@ !!@ @!!!:!   @!@@!@!  @!@!@!@! !!@ @!@@!!@!   @!!  
//      :!!   !!: !!: !!:      !!:      !!:  !!! !!: !!:  !!!   !!:  
//       :: :: :  :    :        :        :   : : :   ::    :     :   
//     

$(document).ready(function() {
    
// Text Select cursor fix
    var canvas = document.getElementById('paintCanvas');
    canvas.onselectstart = function () { return false; } // ie
    canvas.onmousedown = function () { return false; } // mozilla
        
	$('#paintCanvas').mouseover(function() {	canvas.focus();	});
	$('#paintCanvas').mouseout(function()  {	canvas.blur();	});
	
	if(/chrome/.test(navigator.userAgent.toLowerCase())){ /* Chrome */ } else {
	        $('#chromeMessage').removeClass('closed');
	    }

//     
//  Tools 
// 
    
    $('#framenumber').bind('change', function(event) {
        window.pjsin.gotoFrame(parseInt($("#framenumber").val()));
    });
    
    $('#brushSizeValue').text($('#size').val());
    $('#size').bind('mouseup', function(event) { window.pjsin.setStrokeWeight($('#size').val()); });
    $('#size').bind('change', function(event) {
        // window.pjsin.setStrokeWeight($('#size').val());
        $('#brushSizeValue').text($('#size').val());
    });
	
	$('#tool_onion').click(function() {
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			window.pjsin.setOnionSkin(false);
		} else {
			$(this).addClass('on');
			window.pjsin.setOnionSkin(true);
		}
	});

	$('#tool_onionNext').click(function() {
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			window.pjsin.setOnionSkinNext(false);
		} else {
			$(this).addClass('on');
			window.pjsin.setOnionSkinNext(true);
		}
	});
	
	$('#tool_tracing').click(function() {
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			window.pjsin.setTracing(false);
			$("#tracingOpacity").attr('disabled', 'disabled');
            $("#tracingOpacity").addClass("disabled");        		
        	$('label[for="tracingOpacity"]').addClass("disabled");
		} else {
			$(this).addClass('on');
			window.pjsin.setTracing(true);
			$("#tracingOpacity").removeAttr('disabled');     
			$("#tracingOpacity").removeClass("disabled");        		
        	$('label[for="tracingOpacity"]').removeClass("disabled");
		}
	});
	

    $('#tracingOpacity').bind('change', function(event) {
        window.pjsin.setTracingOpacity($("#tracingOpacity").val());
    });
    
    // Colour
    
    $('#leftColour').miniColors({
        change: function(hex, rgb) {
            window.leftColour[0] = rgb.r;
            window.leftColour[1] = rgb.g;
            window.leftColour[2] = rgb.b;
            // window.pjsin.setStrokeColour(rgb.r,rgb.g,rgb.b);
            window.pjsin.setStrokeWeight($('#size').val());
        }
    });
    
    $('#rightColour').miniColors({
        change: function(hex, rgb) {
            window.rightColour[0] = rgb.r;
            window.rightColour[1] = rgb.g;
            window.rightColour[2] = rgb.b;
            window.pjsin.setStrokeWeight($('#size').val());
        }
    });

	var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	function hex(x) {
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}


	$('#palette div').bind('contextmenu', function(e){
	    e.preventDefault();
	    return false;
	});

	$('#palette div').mouseup(function(event) {
		switch (event.which) {
		case 1:
			if (event.ctrlKey) {
				$(this).css('background-color',$('#leftColour').val());
			} else {
				$('#leftColour').miniColors('value',rgb2hex($(this).css('background-color')));			
			}
		break;
		case 3:
			if (event.ctrlKey) {
				$(this).css('background-color',$('#rightColour').val());
			} else {
				$('#rightColour').miniColors('value',rgb2hex($(this).css('background-color')));			
			}
		break;
		}
	});


	// Tool Selection
	
    var toolButtons = [$('#tool_paint'),$('#tool_fill'),$('#tool_ink'),$('#tool_camera'),$('#tool_gifbrush')];
	var sidebars	= [$('#palette'),$('#gifBrushPanel'),$('#library')];
	
	$('#tool_paint').click(function() { 
		window.pjsin.setTool(0); 
		$('#paintCanvas').attr('class','paint');
		for (var i=0; i < toolButtons.length; i++) { toolButtons[i].removeClass("selected"); }
		for (var i=0; i < sidebars.length; i++) { sidebars[i].addClass("hidden"); }
        $(this).addClass("selected");
		$('#palette').removeClass("hidden");
	});
	$('#tool_fill').click(function()  { 
		window.pjsin.setTool(1); 
		$('#paintCanvas').attr('class','fill');
		for (var i=0; i < toolButtons.length; i++) { toolButtons[i].removeClass("selected"); }
		for (var i=0; i < sidebars.length; i++) { sidebars[i].addClass("hidden"); }
        $(this).addClass("selected");
		$('#palette').removeClass("hidden");
	});
	$('#tool_ink').click(function()   { 
		window.pjsin.setTool(2); 
		$('#paintCanvas').attr('class','inkdropper');
		for (var i=0; i < toolButtons.length; i++) { toolButtons[i].removeClass("selected"); }
		for (var i=0; i < sidebars.length; i++) { sidebars[i].addClass("hidden"); }
        $(this).addClass("selected");
	});
	$('#tool_gifbrush').click(function()   { 
		window.pjsin.setTool(4); 
		$('#paintCanvas').attr('class','gifbrush');
		for (var i=0; i < toolButtons.length; i++) { toolButtons[i].removeClass("selected"); }
		for (var i=0; i < sidebars.length; i++) { sidebars[i].addClass("hidden"); }
        $(this).addClass("selected");
		$('#gifBrushPanel').removeClass("hidden");
		$('#library').removeClass("hidden");
		loadLibrary($('#libraries').val());
	});
	
	// GIFBrush Modes
    var gifBrushModes = [$('#gifBrush_Mode1'),$('#gifBrush_Mode2'),$('#tool_ink'),$('#gifBrush_Mode3'),$('#gifBrush_Mode4'),$('#gifBrush_Mode5')];
	$('#gifBrush_Mode1').click(function() {
		event.preventDefault();
		window.pjsin.setGifBrushMode(1); 
		for (var i=0; i < gifBrushModes.length; i++) { gifBrushModes[i].removeClass("selected");}
        $(this).addClass("selected");
	});
	$('#gifBrush_Mode2').click(function() {
		event.preventDefault();
		window.pjsin.setGifBrushMode(2); 
		for (var i=0; i < gifBrushModes.length; i++) { gifBrushModes[i].removeClass("selected");} 
        $(this).addClass("selected");
	});
	$('#gifBrush_Mode3').click(function() {
		event.preventDefault();
		window.pjsin.setGifBrushMode(3); 
		for (var i=0; i < gifBrushModes.length; i++) { gifBrushModes[i].removeClass("selected");} 
        $(this).addClass("selected");
	});
	$('#gifBrush_Mode4').click(function() { 
		event.preventDefault();
		window.pjsin.setGifBrushMode(4); 
		for (var i=0; i < gifBrushModes.length; i++) { gifBrushModes[i].removeClass("selected");} 
        $(this).addClass("selected");
	});
	$('#gifBrush_Mode5').click(function() { 
		event.preventDefault();
		window.pjsin.setGifBrushMode(5); 
		for (var i=0; i < gifBrushModes.length; i++) { gifBrushModes[i].removeClass("selected");} 
        $(this).addClass("selected");
	});
	
	
	
	
//     
// Shortcut Keys
// 

// +
    jQuery(document).bind('keydown', 'minus',function (evt){
        $('#size').val(parseInt($('#size').val())+1).change();
    	window.pjsin.setStrokeWeight(parseInt($('#size').val()));
        return false; 
    });
// -
    jQuery(document).bind('keydown', 'plus',function (evt){
        $('#size').val(parseInt($('#size').val())-1).change();
    	window.pjsin.setStrokeWeight(parseInt($('#size').val()));
        return false; 
    });
// a
    jQuery(document).bind('keydown', 'a',function (evt){window.pjsin.addFrame(); return false; });
// c
    jQuery(document).bind('keydown', 'c',function (evt){window.pjsin.clipboardCopy(); return false; });
// p
    jQuery(document).bind('keydown', 'p',function (evt){window.pjsin.clipboardPaste(); return false; });
// z
    jQuery(document).bind('keydown', 'z',function (evt){window.pjsin.retrieveUndoState(); return false; });
// r
    jQuery(document).bind('keydown', 'r',function (evt){window.pjsin.retrieveUndoState(); return false; });
// x
    jQuery(document).bind('keydown', 'x',function (evt){window.pjsin.swapColours(); return false; });
// b
    jQuery(document).bind('keydown', 'b',function (evt){$('#tool_paint').click(); return false; });
// i
    jQuery(document).bind('keydown', 'i',function (evt){$('#tool_ink').click(); return false; });
// f
    jQuery(document).bind('keydown', 'f',function (evt){$('#tool_fill').click(); return false; });
// t
    jQuery(document).bind('keydown', 't',function (evt){$('#tool_camera').click(); return false; });
// [
    jQuery(document).bind('keydown', 'sqlb',function (evt){$('#tool_onion').click(); return false; });
// ]
    jQuery(document).bind('keydown', 'sqrb',function (evt){$('#tool_onionNext').click(); return false; });
// Left
    jQuery(document).bind('keydown', 'left',function (evt){window.pjsin.prevFrame(); return false; });
// Right
    jQuery(document).bind('keydown', 'right',function (evt){window.pjsin.nextFrame(); return false; });
// Shift
    jQuery(document).bind('keydown', 'shift',function (evt){window.pjsin.shiftHeld = true; return false; });
//  jQuery(document).bind('keydown', function (evt){console.log(evt); return false; });


//     
// Mouse
// To fix canvas edge drawing

var pmouseTestX,pmouseTestY,mouseTestX,mouseTestY;
var leftMouseHeld = false;
var rightMouseHeld = false;
$('#paintCanvas').mousedown(function(e) { 
	if (e.which === 1) { leftMouseHeld = true; };
	if (e.which === 3) { rightMouseHeld = true; };
});
$('body').mouseup(function(e)   { leftMouseHeld = false; rightMouseHeld = false; });

$('body').mousemove(function(e) {
        mouseTestX = e.pageX - canvas.offsetLeft;
        mouseTestY = e.pageY - canvas.offsetTop;
		if (leftMouseHeld) { window.pjsin.useTool(pmouseTestX,pmouseTestY,mouseTestX,mouseTestY,0); };
		if (rightMouseHeld) { window.pjsin.useTool(pmouseTestX,pmouseTestY,mouseTestX,mouseTestY,1); };
        pmouseTestX = mouseTestX;
        pmouseTestY = mouseTestY;
});
    
	
    
//
//  Documents
//
    
	

    // $('#newgif').bind('click', function(event) {
    //     var numberOfFrames = prompt("How many frames should this AWESOME gif have?",window.totalFramesForEncoder);
    //     if (numberOfFrames) {
    //         window.pjsin.init(parseInt(numberOfFrames));
    //     };
    // });
    
    $('#tool_addFrame').bind('click', function(event) {
       window.pjsin.addFrame();        
    });

    $('#tool_removeFrame').bind('click', function(event) {
       window.pjsin.removeFrame();
    });

    $('#tool_copy').bind('click', function(event) {
       window.pjsin.clipboardCopy();
    });

    $('#tool_paste').bind('click', function(event) {
       window.pjsin.clipboardPaste();       
    });

    $('#tool_undo').bind('click', function(event) {
       window.pjsin.retrieveUndoState();
    });

//
//	New GIF Modal
//

    $('#showModal').bind('click', function(event) {
        event.preventDefault();
       	$('#newGifModal').removeClass('closed');
		// //console.log(window.pjsin.externals.sketch.options.globalKeyEvents);
		// window.pjsin.externals.sketch.options.globalKeyEvents = true;
		// //console.log(window.pjsin.externals.sketch.options.globalKeyEvents);
    });

	$('#closeModal').click(function() {
	    event.preventDefault();
		$('#newGifModal').addClass('closed');
	});
	
	$('#initNewGif').click(function() {
		window.pjsin.init(
			parseInt($('#newGifWidth').val()),
			parseInt($('#newGifHeight').val()),
			parseInt($('#newGifFrames').val())
		);
		$('#newGifModal').addClass('closed');
		$("#tracing").attr("disabled", "disabled");        
    	$("#tracingOpacity").attr("disabled", "disabled"); 
    	$("#tracingOpacity").addClass("disabled");        		
    	$('label[for="tracingOpacity"]').addClass("disabled");
	});
	
	$('#closeChromeModal').click(function(event) {
	    event.preventDefault();
		$('#chromeMessage').addClass('closed');
	});
	
	$('#closeHelpModal').click(function(event) {
	    event.preventDefault();
		$('#helpModal').addClass('closed');
	});

	
	$('#showAbout').click(function() {
	    event.preventDefault();
		// $('#aboutModal').removeClass('closed');
		// $('#tipsModal').removeClass('closed');
		if ($('#helpModal').hasClass('closed')){
			$('#helpModal').removeClass('closed');			
		} else {
			$('#helpModal').addClass('closed');			
		}
	});
	
	$('#closeAboutModal').click(function() {
	    event.preventDefault();
		$('#aboutModal').addClass('closed');
		$('#tipsModal').addClass('closed');
	});
	
//
//  Play Controls
//
		
	window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame    || 
	        window.oRequestAnimationFrame      || 
	        window.msRequestAnimationFrame     || 
	        function(callback, element){
	            return window.setTimeout(callback, 1000 / 60);
	        };
	})();
	
    

    window.playing = false;
		var fps = ($("#playSpeed").val()/100) * (20 - 1.5)
    var playingTimer;
    $('#tool_play').click(function() {
        if (window.playing) {
            console.log("Stopping");
            window.playing = false;
						$('#tool_play').removeClass("paused");
        } else {
            console.log("Playing");
            window.playing = true;
						$('#tool_play').addClass("paused");
        };
		// console.log("playingTimer:"+playingTimer);
    });


		var now;
		var then = Date.now();
		var delta;

    function playGif(){
		    requestAnimationFrame(playGif);
     
		    now = Date.now();
		    delta = now - then;
     
		    if (delta > (1000/fps)) {
		        then = now - (delta % (1000/fps));
         	 	if(window.playing){
							window.pjsin.nextFrame();
						}
		    }
				
    }
		playGif();

    $('#playSpeed').bind('change', function(event) {
		fps = 1.5 + ($("#playSpeed").val()/100) * (30 - 1.5)
    });
    
    $('#currentFrame').click(function() { window.pjsin.prevFrame(); });
    $('#totalFrames').click(function() { window.pjsin.nextFrame(); });
    
    $('#tool_prevFrame').click(function() { window.pjsin.prevFrame(); });
    $('#tool_nextFrame').click(function() { window.pjsin.nextFrame(); });
    

//
//	Importer
//
	
	var opts = {
	    dragClass: "drag",
	    accept: false,
        readAsDefault: 'Text',
        readAsMap: {
            'image/gi*': 'BinaryString',
            'text/*' : 'Text'
        },
	    on: {
	        load: function(e, file) {
	            if (file.type.match(/gif/)) {
	                //console.log("GIF!");
                    //console.log(file.name);
                    //console.log(file.type);
    				importGIF(e.target.result);
    			} else {
    				//console.log("NOT A GIF!");
                    //console.log(file.name);
                    //console.log(file.type);
        			window.pjsin.importImg(e.target.result);
    			};
	    	},
	        error: function(e, file) {
	    	},
	        loadend: function(e, file) {
                turnTracingOn();
	    	},
	        abort: function(e, file) {
	    	},
	        skip: function(e, file) {
	    	},
	        groupstart: function(group) {
	    	},
	        groupend: function(group) {
	    	}
	    }
	};
	$("#canvasBorder").fileReaderJS(opts);
	$("body").fileClipboard(opts);
	
	var optsBrush = {
	    dragClass: "drag",
	    accept: false,
        readAsDefault: 'Text',
        readAsMap: {
            'image/gi*': 'BinaryString',
            'text/*' : 'Text'
        },
	    on: {
	        load: function(e, file) {
	            if (file.type.match(/gif/)) {
	                //console.log("GIF!");
                    //console.log(file.name);
                    //console.log(file.type);
    				importGIFBrush(e.target.result);
    			} else {
    				//console.log("NOT A GIF!");
                    //console.log(file.name);
                    //console.log(file.type);
        			//window.pjsin.importImg(e.target.result);
					alert("GIFBrush only supports .GIF files")
    			};
	    	},
	        error: function(e, file) {
	    	},
	        loadend: function(e, file) {
	    	},
	        abort: function(e, file) {
	    	},
	        skip: function(e, file) {
	    	},
	        groupstart: function(group) {
	    	},
	        groupend: function(group) {
	    	}
	    }
	};
	$("#gifBrushPreview").fileReaderJS(optsBrush);
	
	function turnTracingOn(){
    	$('#tool_tracing').addClass('on');
    	window.pjsin.setTracing(true);
    	$("#tracingOpacity").removeAttr('disabled');        
    	$("#tracingOpacity").removeClass("disabled");        		
    	$('label[for="tracingOpacity"]').removeClass("disabled");
    	$('#tracingOpacity').val(255); 
    	window.pjsin.setTracingOpacity($("#tracingOpacity").val());
	};
	
	function importGIF(gifBytes){
    	var gifImporter = new SuperGif();
    	gifImporter.load(null,gifBytes,false);
    };
	function importGIFBrush(gifBytes){
		$('#gifBrushInfo').text("Loading");
		
    	var gifImporter = new SuperGif();
    	gifImporter.load(null,gifBytes,true);
    };
	

//
//	Webcam	
//
	var videoObj = { video: true };
	var localMediaStream;
	var webcamContext;
	var webcamCapture = document.getElementById('webcamCapture');
	var webcamPreview = document.getElementById('webcamPreview');
	var webcamCanvas  = document.getElementById('webcamCanvas');
		
	$('#tool_camera').click(setupCamera);
	$('#stopCamera').click(stopCamera);
		
	$('#webcamPreview').click(function() {
		window.snap();
	});
		
	function setupCamera(){
		window.pjsin.setTool(3); 
		$('#paintCanvas').attr('class','camera');
		for (var i=0; i < toolButtons.length; i++) { toolButtons[i].removeClass("selected"); }
        $(this).addClass("selected");
		
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
	    if (navigator.getUserMedia) {
	        navigator.getUserMedia(videoObj, function(stream) {              
	            webcamCapture.src = (navigator.webkitGetUserMedia) ? window.webkitURL.createObjectURL(stream) : stream;
	            webcamPreview.src = (navigator.webkitGetUserMedia) ? window.webkitURL.createObjectURL(stream) : stream;
	            localMediaStream = stream;
	            //console.log("Webcam Setup Successful");
				webcamContext = webcamCanvas.getContext( '2d' );
				turnTracingOn();
				$('#tool_camera').unbind('click').click(setCameraTool);
	        }, 
			function(error) {
	            //console.error("Webcam Setup Error: ", error.code);
				$('#webcamPreviewHolder').css('display', 'none');
				$('#tool_camera').unbind('click').click(setupCamera);
				$('#tool_paint').click();
				alert("You need to allow your webcam to use this feature.");
	        });
			$('#webcamPreviewHolder').css('display', 'block');
	    }
	}
	
	function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	    var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
	    ratio = Math.max(ratio[0], ratio[1]);
	    return { width:srcWidth*ratio, height:srcHeight*ratio };
	}
	
	function setCameraTool(){
		if ($(this).hasClass("selected")){
			window.snap();
		} else {
			window.pjsin.setTool(3); 
			$('#paintCanvas').attr('class','camera');
			for (var i=0; i < toolButtons.length; i++) { toolButtons[i].removeClass("selected"); }
			for (var i=0; i < sidebars.length; i++) { sidebars[i].addClass("hidden"); }
	        $(this).addClass("selected");		
		}
	}
	
	window.snap = function(){
		// webcamCanvas.width = webcamCapture.clientWidth;
		// webcamCanvas.height = webcamCapture.clientHeight;
		webcamCanvas.width = canvas.width;
		webcamCanvas.height = canvas.height;
		var scaledSize = calculateAspectRatioFit(webcamCapture.videoWidth,webcamCapture.videoHeight,webcamCanvas.width,webcamCanvas.height);
	    webcamContext.drawImage(webcamCapture, (webcamCanvas.width/2)-(scaledSize.width)/2, (webcamCanvas.height/2)-(scaledSize.height)/2,scaledSize.width,scaledSize.height);
		window.pjsin.importImg(webcamCanvas.toDataURL());		
	}
    
	function stopCamera(){
		webcamCapture.pause();
		webcamCapture.src="";
		webcamPreview.pause();
		webcamPreview.src="";
		localMediaStream.stop();
		$('#webcamPreviewHolder').css('display', 'none');
		$('#tool_camera').unbind('click').click(setupCamera);
		$('#tool_paint').click();
	}

//
//         .                                 .o8       oooo
//       .o8                                "888       `888
//     .o888oo oooo  oooo  ooo. .oo.  .oo.   888oooo.   888  oooo d8b
//       888   `888  `888  `888P"Y88bP"Y88b  d88' `88b  888  `888""8P
//       888    888   888   888   888   888  888   888  888   888
//       888 .  888   888   888   888   888  888   888  888   888    .o.
//       "888"  `V88V"V8P' o888o o888o o888o `Y8bod8P' o888o d888b   Y8P
//
    
    function uploadGIF(gifToUpload,uploadButton){
        //console.log("Uploading:"+gifToUpload);
        // var ajax = new XMLHttpRequest();
        // ajax.open("POST",'/index.php/tumblr/post',false);
        // ajax.setRequestHeader('Content-Type', 'application/upload');
        // ajax.send(gifToUpload.attr('src'));          
	    $.ajax({
	      url: 'index.php/tumblr/post',
		  processData: false,
	      type: 'POST',
		  contentType: 'application/upload',
	      dataType: 'html',
	      data: gifToUpload.attr('src'),
	      complete: function(xhr, textStatus) {
	        //console.log("Upload Done");
	      },
	      success: function(data, textStatus, xhr) {
	        //console.log("Upload Success");
	      },
	      error: function(xhr, textStatus, errorThrown) {
	        //console.log("Upload Failed");
	      }
	    }).done(function( html ) {
			gifToUpload.parent().append(html);
			uploadButton.removeClass("loading");
			uploadButton.text("Upload to Tumblr");
		});
    }

	var loginStatus = $('#tumblrStatus');
	
	var loggedIn = false;
	
	function checkLogin() {
		//console.log("Checking Login");
		$.ajax({
			url: "index.php/tumblr/loggedInCheck",
			cache: false,
			beforeSend: function ( xhr ) {
				loginStatus.html("<a href='index.php/tumblr/login/' id='login' class='loading'>Checking Login</a>");
			}
		}).done(function( html ) {
			loginStatus.html(html);
			if(html != "<a href='index.php/tumblr/login/' id='login' target='_blank'>Login with Tumblr</a>"){
    			loggedIn = true;
			} 
			//console.log("loggedin:"+loggedIn);
			$('#login').click(waitForLogin);
			$('#logout').click(logout);
		});
	}
	var loginLoop;
	function waitForLogin(){
	    loginStatus.html("<a href='index.php/tumblr/login/' id='login' class='loading'>Logging in</a>");
		loginLoop = setInterval(function(){loginCheckLoop()},5000);
	}
	
	function loginCheckLoop(){
		//console.log("Checking Login!");
		$.ajax({
			url: "index.php/tumblr/loggedInCheck",
			cache: false,
			beforeSend: function ( xhr ) {
				loginStatus.html("<a href='index.php/tumblr/login/' id='login' class='loading'>Checking Login</a>");
			}
		}).done(function( html ) {
			if(html == "<a href='index.php/tumblr/login/' id='login' target='_blank'>Login with Tumblr</a>"){
				//console.log("NOT LOGGED IN YET");
			} else {
				//console.log("YOU ARE LOGGED IN!!!!!!!!");
				clearInterval(loginLoop);
				loginStatus.html(html);
				loggedIn = true;
				//console.log("loggedin:"+loggedIn);
				$('#login').click(waitForLogin);
				$('#logout').click(logout);
			}
		});
	}
		
	function logout(){
		loggedIn = false;
		$.ajax({
			url: "index.php/tumblr/logout",
			cache: false,
			beforeSend: function ( xhr ) {
				loginStatus.html("<a href='index.php/tumblr/login/' id='login' class='loading'>Logging Out</a>");
			}
		}).done(function( html ) {
			loginStatus.html(html);
			$('#login').click(waitForLogin);
			$('#logout').click(logout);
		});
	}
	
	checkLogin();
	
	$('#checkLogin').click(checkLogin);
	$('#login').click(waitForLogin);
	
	$('#logout').click(logout);

    
    
 //     mmmm    mmm  mmm     mmmm    mmmmmm   mmmmmmmm 
 //    ##""##   ###  ###   ##""""#   ""##""   ##"""""" 
 //   ##    ##  ########  ##           ##     ##       
 //   ##    ##  ## ## ##  ##  mmmm     ##     #######  
 //   ##    ##  ## "" ##  ##  ""##     ##     ##       
 //    ##mm##   ##    ##   ##mmm##   mm##mm   ##       
 //     """"    ""    ""     """"    """"""   ""       
	$('#encode').bind('click', function(event) {

 		event.preventDefault();
 		//console.log("Encoding via OMGIF");
 		//$('.noGifs').text("Download or Upload to Tumblr to save GIFs");
 		generateGIF();
 	});


    var encodeNumber = 0;
 	var gifNumber = 0;

 	function generateGIF() {

 		generating = true;
		$('#feedModal').removeClass('closed');
		$('#feedModal .encodeHolder').empty();
		$('#lightbox').removeClass('lightoff');

 		$('#feedModal .encodeHolder').append("<div id='render"+encodeNumber+"' class='render inprogress' style='min-width:"+canvas.width+"px;min-height:"+canvas.height+"px;'><div class='progressMeter'><div class='renderText'>Encoding</div></div></div>");
 		var progressbar = $("<progress/>", {
 		  "id": "gifProgress"+encodeNumber,
 		  "max": window.totalFramesForEncoder
 		}).prependTo("#render"+encodeNumber+" .progressMeter");


 		$('html, body').animate({
 		         scrollTop: $("#render"+gifNumber).offset().top-100
 	     }, 500);


 		encodeNumber++;

        var buffer = new Uint8Array( canvas.width * canvas.height * window.totalFramesForEncoder-1 * 5 );
		var gif = new GifWriter( buffer, canvas.width, canvas.height, { loop: 0 } );
		var pixels = new Uint8Array( canvas.width * canvas.height );

 		var quantWorker = new Worker('/libs/QuantWorker.js');


 		var current = 0; // DELETE ????
 		var delay = 30 + ($("#playSpeed").val()/100) * (5 - 30)
 		var context = canvas.getContext( '2d' );

 		var addFrame = function (frameToAdd) {
 		   	window.pjsin.switchFrame(frameToAdd);

 			var frameContext = context.getImageData( 0, 0, canvas.width, canvas.height );
 			var frameData = frameContext.data;
             // frame_index = event.data["frame_index"];
             // total_frames = event.data["total_frames"];
             // height = event.data["height"];
             // width = event.data["width"];
             // frameData = event.data["imageData"];
             // delay = event.data["delay"];

 			quantWorker.postMessage({"frame_index": frameToAdd, "width":canvas.width, "height":canvas.height, "frameData":frameData});


 			//gif.addFrame( 0, 0, canvas.width, canvas.height, pixels, { palette: new Uint32Array( palette ), delay: delay } );
 		}

 		quantWorker.onmessage = function(e) {

     		var frame_index = e.data["frame_index"];
     		var pixels_for_gif = e.data["pixels_for_gif"];
     		var palette = e.data["palette"];
            progressbar.val(frame_index);
		    gif.addFrame( 0, 0, canvas.width, canvas.height, pixels_for_gif, { palette: new Uint32Array( palette ), delay: delay } );

 			if(frame_index == window.totalFramesForEncoder-1) {
                //console.log("DONEODNEDONEODNEDONEODNEDONEODNEDONEODNE");
 			    var string = '';
        		for ( var i = 0, l = gif.end(); i < l; i ++ ) {
        			string += String.fromCharCode( buffer[ i ] )
        		}
 			    
 			    var data_url = 'data:image/gif;base64,' + window.btoa( string );		
        		
 			    var gifItem = $('<img />');
     			gifItem.attr('src',data_url);
     			gifItem.attr('id',"gif"+gifNumber);
     			progressbar.remove();

     			$("#render"+gifNumber).removeClass("inprogress");

     			$("#render"+gifNumber).append(gifItem);


     			var uploadButton = $('<a data-gif="gif"+gifNumber+"" class="uploadToTumblr">Upload to Tumblr</a>');
     			uploadButton.data('gif',"#gif"+gifNumber);
     			uploadButton.click(function () {
     				event.preventDefault();
     				if (loggedIn) {
     	    		    gifToUpload = $(this);
     	    			var gifID = $(gifToUpload.data('gif'));
     	    			$(this).addClass("loading");
     	    			$(this).text("Uploading");
     	    		    uploadGIF(gifID,$(this));			    
     				} else {
     	                alert("Login to tumblr to post");
     				};
     			});

     	        var uploadButtonAppended = $("#render"+gifNumber).append(uploadButton);

        var downloadLink = $('<a href="'+data_url+'" download="GIFPaint.gif">Download</a>')
                   $("#render"+gifNumber).append(downloadLink);

				// var deleteButton = $('<a href="#" class="delete">Delete</a>');
				//      			deleteButton.click(function () {
				// 	event.preventDefault();
				// 	
				// 	if(confirm("Are you sure you want to delete this GIF?")){
				// 	     				$(this).parent().fadeOut(500, function() { $().remove(this); });
				// 	} else {
				// 	    //Cancelled
				// 	}
				//      			});
				//      			$("#render"+gifNumber).append(deleteButton);
				
				var closeModalButton = $('<a href="#" class="delete">Cancel</a>');
				closeModalButton.click(function () {
					event.preventDefault();
					$('#feedModal').addClass('closed');
					$('#feedModal .encodeHolder').empty();
					$('#lightbox').addClass('lightoff');
					
					
				});
				$("#render"+gifNumber).append(closeModalButton);


     	        gifNumber++;

     			generating = false;

 			};
 		}

 		for (var i=0; i < window.totalFramesForEncoder; i++) {
 			addFrame(i);
 		}

 	}

//
//	GIFBrush Library
//


$('#libraries').change(function() {
	loadLibrary(this.value);
});

var libBaseUrl = "../../Gifbrushes/";

function loadLibrary(libraryName) {
	console.log("Loading " + libraryName);
	$.getJSON( "index.php/brushlibrary/load/"+libraryName, function( libraryData ) {
	  $.each( libraryData, function( key, val ) {
		  //console.log("Key:"+key+" val:"+val);
	  });
	  console.log(libraryData);
	  console.log(libraryData.artist);
	  console.log(libraryData.url);
	  console.log(libraryData.brushes);
	  // console.log(libraryData.brushes.brush[0]["@content"]);
	  // console.log(libraryData.brushes.brush[0]["@attributes"]["mode"]);
	  for (var i = 0; i < libraryData.brushes.brush.length; i++) {
	  	console.log(libraryData.brushes.brush[i]["@content"]);
	  	console.log(libraryData.brushes.brush[i]["@attributes"]["mode"]);
	  }
	  
	  $('#libraryArtist').html('Artist: <a href="'+libraryData.url+'" target="_blank">'+libraryData.artist+'</a>')
	  
	  var brushList = $('#brushes');
	  brushList.empty();
	  for (var i = 0; i < libraryData.brushes.brush.length; i++) {
		  var brushFileName = libraryData.brushes.brush[i]["@content"];;
		  var brushMode		= libraryData.brushes.brush[i]["@attributes"]["mode"];
		  // console.log('<img src="'libBaseUrl+brushFileName+'_p.gif" data-brushurl="'libBaseUrl+brushFileName'.gif" data-brushtype="'+brushMode+'">');
		  console.log(libBaseUrl+brushFileName+'_p.gif');
		  brushList.append('<img src="'+libBaseUrl+brushFileName+'_p.gif" data-brushurl="'+libBaseUrl+brushFileName+'.gif" data-brushtype="'+brushMode+'"/> ');
	  }
	  
	  // Setup clicks
	  $('#library img').click(function() {
	  	var brushsrc = $(this).attr("data-brushurl");
	  	switch($(this).attr("data-brushtype")){
	  		case "1":
	  			console.log("Type 1");
	  			$('#gifBrush_Mode1').click();
	  		break;
	  		case "2":
	  			console.log("Type 2");
	  			$('#gifBrush_Mode2').click();
	  		break;
	  		case "3":
	  			console.log("Type 3");
	  			$('#gifBrush_Mode3').click();
	  		break;
	  		case "4":
	  			console.log("Type 4");
	  			$('#gifBrush_Mode4').click();
	  		break;
	  		case "5":
	  			console.log("Type 5");
	  			$('#gifBrush_Mode5').click();
	  		break;
	  	default:
		
	  	}
	  	var libgifImporter = new SuperGif();
	
	  	var libHttp = new XMLHttpRequest();
	  	libHttp.overrideMimeType('text/plain; charset=x-user-defined');
	  	libHttp.onloadstart = function() {};
	  	libHttp.onload = function(e) {
	  		libgifImporter.load(null,libHttp.responseText,true);
	  	};
	  	libHttp.onprogress = function (e) {};
	  	libHttp.onerror = function() {};
	  	libHttp.open('GET', brushsrc, true);
	  	libHttp.send();
	
	  });
	  
	  
	  
	  
	});
}




// 
//	Accidental Close Protection
// 	

//window.onbeforeunload = confirmExit;
//	function confirmExit(){
//	return "Are you sure you want to leave GIFPaint, unsaved GIFs will be lost?";
//}




});
