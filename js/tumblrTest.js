$(document).ready(function() {

	
	function uploadCanvas(){
		//console.log("Uploading");
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'index.php/tumblr/post',false);
		ajax.setRequestHeader('Content-Type', 'application/upload');
		ajax.send($('#testGIF').attr('src'));  
	}
	
	$('#upload').click(function() {
		uploadCanvas();
	});
	
	var loginStatus = $('#loginStatus');
	
	function checkLogin() {
		//console.log("Checking Login");
		$.ajax({
			url: "index.php/tumblr/loggedInCheck",
			cache: false,
			beforeSend: function ( xhr ) {
				loginStatus.html("<img id='spinner' src='/assets/SWOD.gif'/> Checking Login");
			}
		}).done(function( html ) {
			loginStatus.html(html);
			$('#login').click(test);
			$('#logout').click(logout);
		});
	}
	
	
	function logout(){
		$.ajax({
			url: "index.php/tumblr/logout",
			cache: false,
			beforeSend: function ( xhr ) {
				loginStatus.html("<img id='spinner' src='/assets/SWOD.gif'/> Logging Out");
			}
		}).done(function( html ) {
			loginStatus.html(html);
			$('#login').click(test);
			$('#logout').click(logout);
		});
	}
	
	checkLogin();
	
	$('#checkLogin').click(checkLogin);
	$('#login').click(test);
	
	$('#logout').click(logout);
	
});
