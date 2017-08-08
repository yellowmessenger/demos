
jQuery(document).ready(function(){ 
	"use strict";
 
	jQuery(window).scroll(function() {
        var calScreenWidth = jQuery(window).width();
        if (jQuery(this).scrollTop() > 200) {
            jQuery('#toTop').stop().css({
                opacity: 1,
                "visibility": "visible"
            }).animate({
                "visibility": "visible"
            }, {
                duration: 1000,
                easing: "easeOutExpo"
            });
        } else if (jQuery(this).scrollTop() == 0) {
            jQuery('#toTop').stop().css({
                opacity: 0,
                "visibility": "hidden"
            }).animate({
                "visibility": "hidden"
            }, {
                duration: 1500,
                easing: "easeOutExpo"
            });
        }
    });
    jQuery('#toTop').on('click', function() {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 800);
    });
		
	
	if(jQuery('#pp_topbar').val()==0)
		{
			var topBarHeight = jQuery('.header_style_wrapper').height();
		}
	else
		{
			var topBarHeight = parseInt(jQuery('.header_style_wrapper').height()-jQuery('.header_style_wrapper .above_top_bar').height());
		}
	
	var logoHeight = jQuery('#custom_logo img').height();
	var logoMargin = parseInt(jQuery('#custom_logo').css('marginTop'));
	var menuPaddingTop = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingTop'));
	var menuPaddingBottom = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingBottom'));
	
	jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
	
	jQuery(window).resize(function(){
	    if(jQuery(this).width()>768)
	    {
	    	jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
		    jQuery('.logo_wrapper').css('marginTop', '');
		    jQuery('.top_bar #searchform button').css('paddingTop', '');
	    }
	    else
	    {
	    	jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
	    }
	});
	
	jQuery(window).scroll(function(){
	    if(jQuery('#pp_fixed_menu').val()==1)
	    {
	    	if(jQuery(this).scrollTop() >= 200){
	    		jQuery('.header_style_wrapper .above_top_bar').hide();
	    		jQuery('.extend_top_contact_info').hide();
	    		jQuery('#search_icon').hide();
	    		jQuery('.post_share_wrapper').hide();
	    		
	    		jQuery('.top_bar').addClass('scroll');
	    		
	    		if(jQuery(window).width()>960)
	    		{
	    			jQuery('#mobile_nav_icon').hide();
	    		}
	        }
	        else if(jQuery(this).scrollTop() < 200)
	        {
	        	jQuery('.header_style_wrapper .above_top_bar').show();
	        	jQuery('.extend_top_contact_info').show();
	    	    
	    	    jQuery('#custom_logo img').removeClass('zoom');
	    	    jQuery('#custom_logo img').css('maxHeight', '');
	    	    
	    	    jQuery('#custom_logo').css('marginTop', parseInt(logoMargin)+'px');
	    		
	    		jQuery('#menu_wrapper div .nav > li > a').css('paddingTop', menuPaddingTop+'px');
	    		jQuery('#menu_wrapper div .nav > li > a').css('paddingBottom', menuPaddingBottom+'px');;
	    		
	    		jQuery('.top_bar').removeClass('scroll');
	        }
	   }
	});
	

});



