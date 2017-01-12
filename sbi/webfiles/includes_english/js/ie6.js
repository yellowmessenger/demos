$(document).ready(function(){
			if(navigator.appName == 'Microsoft Internet Explorer'){
			var appVersion = navigator.appVersion.split(';');
			var verNumber = appVersion[1];
			var IEversion = parseInt(verNumber.replace('MSIE ', '')); // Reaplce "MSIE " from the srting and parse it to integer value
			if(IEversion < 9){
				$('.overlay').show();
				$('.ie6_alertbox').show();
				$('.ie6_alertbox').animate({'marginRight':'0px'},{"easing" : "linear", "duration" : 600});
			}
			else{
				$('.overlay').hide();
				$('.ie6_alertbox').hide();
			}
		}
		
		$('.alertbox_close').click(function(){
			$('.ie6_alertbox').animate({'marginRight':'-741px'},1000, function(){
				$('.overlay').hide();															   
			});	
			$('.ie6_alertbox').hide();
		});
});
	