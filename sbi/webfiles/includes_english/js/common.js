$(document).ready(function(){
	
	$('#carousel-notifications-top').carousel({
	  interval: 2500
	});
	
	$('.notifications').carousel({
	  interval: 4000
	});
	
	$('#carousel-services-a, #carousel-services-b, #carousel-services-c, #carousel-services-d').carousel({
	  interval: 5000
	});
	
	$('.announcements').carousel({
	  interval: 8000
	});
	
	$(".tip-left").tooltip({
        placement : 'left'
    });
		
	$(window).scroll(function () {
        if ($(document).scrollTop() > 100) {
            $("#primary_navigation").fadeIn(200).addClass("scrolled");
        } else {
            $("#primary_navigation").fadeIn(200).removeClass("scrolled");
        }
    });	
	
	$("#click_content span").addClass("click_in");
		$("#click_content span").click(function(){
			if($(this).hasClass('click_in')){
							$("#click_content").animate({"right": "0px"}, 400);/*open navigation*/ 
							$("#click_content span").removeClass("click_in");
							$("#click_content span").addClass("click_out");
			}
			else if(((screen.width > 767) && (screen.width <  990))){
							$("#click_content").animate({"right": "-200px"}, 400);/*open navigation*/ 
							$("#click_content span").removeClass("click_out");
							$("#click_content span").addClass("click_in");
			}
			
			else{
							$("#click_content").animate({"right": "-260px"}, 400);/*open navigation*/ 
							$("#click_content span").removeClass("click_out");
							$("#click_content span").addClass("click_in");
			}
		});           
		
		
		$(window).resize(function(e){
			if((screen.width > 767) && (screen.width <  990)){
							$("#click_content").animate({"right": "-200px"}, 100);/*open navigation*/ 
							$("#click_content span").removeClass("click_out");
							$("#click_content span").addClass("click_in");
							  e.stopPropagation();
			}
			else if(screen.width > 991){
							$("#click_content").animate({"right": "-260px"}, 100);/*open navigation*/ 
							$("#click_content span").removeClass("click_out");
							$("#click_content span").addClass("click_in");
			}
		});
});	