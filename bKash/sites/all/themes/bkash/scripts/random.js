(function($){
	$(document).ready(function(){
		/*$(".close-button").click(function(){
			$(".overlay").fadeOut(800);	
		});*/
		$(".director-image > img").click(function(){						
			$('.director-popup').fadeOut();
			$(this).parents().parent().children('.director-popup').fadeIn(800);
			if($(".overlay").length > 0){
				$(".overlay").css({'display':'block'});	
			}
		});
                /*$(".partners-row > img").click(function(){
                  alert("jl");
			$('.director-popup').fadeOut();
			$(this).parent().children('.director-popup').fadeIn(800);
			if($(".overlay").length > 0){
				$(".overlay").css({'display':'block'});	
			}
		});*/
             $(".views-field-field-partner-image > img,.partner-title").click(function(){
                 
			$('.director-popup').fadeOut();
                        if($(this).parent().parent().children('.director-popup').length > 0){
                                $(this).parent().parent().children('.director-popup').fadeIn(800);
                            }
                    
                        if($(this).parent().children('.director-popup').length > 0){
                                $(this).parent().children('.director-popup').fadeIn(800);
                            }
                    
                    
                        
			if($(".overlay").length > 0){
				$(".overlay").css({'display':'block'});	
			}
		});
               

                
                
	});
}(jQuery))