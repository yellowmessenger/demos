$(document).ready(function() {
		/*code to select Product in Product dropdown start*/
		/*var breadcrumbLength = $('.breadcrumb li').length;
		if (breadcrumbLength > 4){
			if (breadcrumbLength == 6){
				$('.menu h4').html($('.breadcrumb li').eq(breadcrumbLength-2).html());
			}
			if (breadcrumbLength == 5){
				//var selectedNode = $('.listingWrap li').last().find('a').html();
				var selectedNode = $('.breadcrumb li.selected').html();
				if (selectedNode == 'Features' || selectedNode == 'Eligibility Criteria' || selectedNode == 'Documentation' || selectedNode == 'Rates & Fees' || selectedNode == 'FAQs' || selectedNode == 'Customer Speak'){
					$('.menu h4').html($('.breadcrumb li').eq(breadcrumbLength-2).html());
				} else {
				$('.menu h4').html($('.breadcrumb li.selected').html());
				}
			}
			
		} else {
			$('.menu h4').html($('.breadcrumb li.selected').html());
		}*/
		/*code to select Product in Product dropdown stop*/
		/*code for accordian start*/
		$(".accordian .accordianHead").click(function(){
			$(this).next(".accordian .accordian_content").slideDown().siblings(".accordian .accordian_content").slideUp();
			$(this).addClass("active").siblings().removeClass("active");
		}).eq(0).click();	
		/*code for accordian end*/
		 $(".tabs-menu li").click(function(){
				$(this).addClass('current').siblings().removeClass('current');
				var ind = $(this).index();
				$(this).parents('.tabs-container').find('.tab-content').eq(ind).show().siblings().hide();
    	 }).eq(0).click();
		 
		 
		 
		 
		
		
		 $(".menuDrpdwn").click(function(){
			 
			 $(this).toggleClass('closeactive').parents('.learningWrap').find('.innerMenu').slideToggle(500);
			  
		 });
		 
		 
		
		 
		  $("#owl-tools,#owl-communicate").owlCarousel({
     
          autoPlay:5000, //Set AutoPlay to 3 seconds
     
          items : 4,
          //Autoplay
        autoPlay : false,
        stopOnHover : false,
     
        // Navigation
        navigation : true,
        navigationText : ["prev","next"],
        rewindNav : false,
        scrollPerPage : false,
     
        //Pagination
        pagination : false,
        paginationNumbers: false,
     
      });
	  
	/*function sticky_relocate() {

    
    if($("#sticky-anchor").length)
    {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
    }
    
}*/



/* added by swapnil on 13th for fixed footer */
	var lilength = $(".fixedFooter ul li").length;
    var totalliwidth = 0;
        $(".fixedFooter ul li").each(function() {
            totalliwidth += $(this).outerWidth();
        });
		$('.fixedFooter').css('width', totalliwidth + 30);

/* USE this code for footer */
    $(window).scroll(function(){
        var wh = $(window).height();
        var fo = $('.footer_wrapper').offset().top;
        var ws = $(window).scrollTop();
        if(ws > (fo-wh)){
            $('.fixedFooter').css({
               'position' : 'absolute',
               'top' : '-21px',
               'bottom' : 'initial'
            });
        }else{
            $('.fixedFooter').removeAttr('style');
			$('.fixedFooter').css('width', totalliwidth + 30);
        }
    });
/*END*/ 
		
});