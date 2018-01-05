
jQuery(document).ready(function() {
	//if($(window).width()>1024) {
	//jQuery(".main-menu nav > ul > li.parent, .main-menu nav > ul > li > ul > li.parent").prepend("<span class='arrow-right'></span>");
if (jQuery('.ah-eldercare-leftnav').length > 0) {
      jQuery(".wrapper").addClass('ah-eldercare-inner');
  }
jQuery(".apollonews").owlCarousel({
        navigation: true,
        autoPlay: 4950, 
        items : 1,
		itemsDesktop : [1199,1],
        itemsDesktopSmall : [991,2],
		itemsMobile : [480,1]
      });
  if (jQuery('.ah-eldercare-leftnav').length > 0) {
      jQuery(".ah-eldercare-bluepattern-block-shadow").addClass('ah-eldercare-content-block');
  }
	jQuery(".main-menu nav > ul > li.parent").prepend("<span class='arrow-right'></span>");
	jQuery(".main-menu nav").append("<span class='arrow-back'></span>");
	jQuery(".mobilemenu").click(function() {
		jQuery(".ah-right-block .menu-right-inner-pages,.ah-left-block .ah-eldercare-leftnav, .ah-right-block .widget-right-nav, .ah-left-block .ah-cancer-leftnav, .ah-left-block .ah-aphc-leftnav, .ah-left-block .ah-trans-leftnav, .ah-patientInf-leftnav").slideUp();
		if(parseInt(jQuery(".openmenu").css('left'))<0) {
			jQuery(".openmenu").stop().animate({
				left:0
			});
			jQuery("body, html").css("overflow-y", "hidden");
			jQuery(".ah-right-block .menu-right-inner-pages").slideUp();
		} else {
			jQuery(".openmenu").stop().animate({
				left:-250
			});
			jQuery("body, html").css("overflow-y", "auto");
			jQuery(".ah-right-block .menu-right-inner-pages").slideUp();
			if(parseInt(jQuery(".main-menu nav > ul").css('right'))>400) {
				jQuery(".main-menu nav > ul").stop().animate({
					right:250
				},800,function() {
					jQuery(".main-menu nav > ul > li > ul > li > ul").stop().hide();	
				});
			} else {
				jQuery(".main-menu nav > ul").stop().animate({
					right:0
				},800,function() {
					jQuery(".main-menu nav > ul > li > ul").stop().hide();
					jQuery(".mobile-sub-nav-hd").remove();
				});
				jQuery("span.arrow-back").stop().hide();
			}
		}
    });
	jQuery(".main-menu nav > ul > li span.arrow-right").each(function(index) {
		jQuery(this).click(function() {
			jQuery(this).parent('li').find('> a').after('<span class="mobile-sub-nav-hd">'+jQuery(this).parent('li').find('> a').html()+'</span>');
		});
	});
	jQuery(".ah-page-menu").click(function() {
		jQuery(".ah-right-block .menu-right-inner-pages,.ah-left-block .ah-eldercare-leftnav, .ah-right-block .widget-right-nav, .ah-left-block .ah-cancer-leftnav, .ah-left-block .ah-aphc-leftnav, .ah-left-block .ah-trans-leftnav, .ah-patientInf-leftnav").slideToggle();
		jQuery(".ah-right-block .menu-right-inner-pages").removeClass('ah-page-menu2');
		jQuery(".openmenu").stop().animate({
			left:-250
		});
		jQuery("body, html").css("overflow-y", "auto");
		jQuery(".main-menu nav > ul").stop().animate({
			right:0
		},800,function() {
			jQuery(".main-menu nav > ul > li > ul").stop().hide();
			jQuery(".mobile-sub-nav-hd").remove();
		});
		jQuery("span.arrow-back").stop().hide();
	});
	jQuery(".ulp-content,.banner-slider, .ulp-footer").click(function() {
		//alert('');
		jQuery(".openmenu").stop().animate({
			left:-250
		});
		jQuery("body, html").css("overflow-y", "auto");
		jQuery(".main-menu nav > ul").stop().animate({
			right:0
		},800,function() {
			jQuery(".main-menu nav > ul > li > ul").stop().hide();
			jQuery(".mobile-sub-nav-hd").remove();
		});
		jQuery("span.arrow-back").stop().hide();
	});
	
	
	jQuery(".ah-right-block .custom .patients-spk").parent(".ah-right-block .custom").addClass("marleft");
		
	
	jQuery(".social-media .arrow-animte").click(function() {
		if(parseInt(jQuery(".social-media").css('height'))==34) {
			jQuery(".social-media").stop().animate({
				height:110				
			},400);
			jQuery("body .social-media .arrow-animte").addClass('social-arrow-right');
			jQuery(".social-media ul").removeClass("uladdclass");
			jQuery(".social-media .arrow-animte").stop().animate({
				top:88			
			},400);
			
		} else {
			jQuery(".social-media").stop().animate({
				height:34
			},400);
			jQuery("body .social-media .arrow-animte").removeClass('social-arrow-right');
			jQuery(".social-media ul").addClass("uladdclass");
			jQuery(".social-media .arrow-animte").stop().animate({
				top:19			
			},400);
		}
	});

	jQuery(".apollo-locatin-text").click(function() {						  
		jQuery('.apollo-location-wrapper').toggleClass('in');	
		if ( jQuery('.apollo-location-wrapper').hasClass('in') ) {
			jQuery('.apollo-location-wrapper').slideDown();	
		} else {
			jQuery('.apollo-location-wrapper').slideUp();	
		}
		if(parseInt(jQuery(".social-media").css('height'))==110) {
		jQuery(".social-media").stop().animate({
				height:34
			},400);
			jQuery("body .social-media .arrow-animte").removeClass('social-arrow-right');
			jQuery(".social-media ul").addClass("uladdclass");
			jQuery(".social-media .arrow-animte").stop().animate({
				top:19			
			},400);
		}
	});

	jQuery(".arrow-animte, .search-social, .txt-emergency, .openmenu, .ulp-content, .equipment, .key-medical-outer, .patients-speak-outer, .ulp-footer, .get-in-touch-form, .iam-here, .helpline-block .apollo-locatin .apollo-location-wrapper .apollo-location-area li a, .inner-pages").click(function() {
		jQuery('.apollo-location-wrapper').removeClass('in');
		jQuery('.apollo-location-wrapper').slideUp();
	});
	
	jQuery(".main-menu nav > ul > li").each(function(index) {
		var zzz = jQuery(this);
		jQuery(this).find("span.arrow-right").click(function() {
			jQuery(".main-menu nav > ul > li > ul").stop().hide();
			zzz.find(">ul").css('display','block');
			jQuery(".main-menu nav > ul").stop().animate({
				right:250
			},800,function() {
				jQuery("span.arrow-back").stop().show();
			});
		});
	});

	jQuery(window).width() <= 767 && jQuery(".mobile-tab ul.tabs-right li").click(function() {		
		jQuery("body .mobile-tab ul.tabs-right").hide();
	});
	jQuery(".mobile-tablet .sideways li").click(function() {
		 if(jQuery(window).width() <=710) {
			console.log(jQuery(this).find('a').html());
			jQuery(".mobile-tablet .tab-cont span.tab-cnt").html(jQuery(this).find('a').html());
			jQuery(".tabs-right,.tabs-left").slideUp();
		 }
	});
	
		jQuery("span.arrow-back").click(function() {
			if(parseInt(jQuery(".main-menu nav > ul").css('right'))>400) {
				jQuery(".main-menu nav > ul").stop().animate({
					right:250
				},800,function() {
					jQuery(".main-menu nav > ul > li > ul > li > ul").stop().hide();	
				});
			} else {
				jQuery(".main-menu nav > ul").stop().animate({
					right:0
				},800,function() {
					jQuery(".main-menu nav > ul > li > ul").stop().hide();	
					jQuery(".mobile-sub-nav-hd").remove();
				});
				jQuery("span.arrow-back").stop().hide();
			}
		});
		


	/*} else {
		jQuery(".main-menu nav > ul > li > span.arrow-right").remove();
	}*/
    if (jQuery('.fancybox').length > 0) {
        jQuery(".fancybox").fancybox();
    }
	if (jQuery('.key-medical-blk').length > 0) {
        jQuery(".input-group-addon").addClass('place-holder-home');
    }

	if (jQuery('.ah-trans-leftnav').length > 0) {
        jQuery(".wrapper").addClass('ah-trans-inner');
    }

	if (jQuery('.ah-trans-leftnav').length > 0) {
        jQuery(".ah-transplant-bluepattern-block-shadow").addClass('ah-trans-content-block');
    }

	if (jQuery('.key-medical-blk').length > 0) {
        jQuery("#searchsubmit").removeClass('place-holder-home');
    }

	if (jQuery('.ah-aphc-leftnav').length > 0) {
        jQuery(".ah-page-menu").addClass('ah-page-menu-none');
    }
	if (jQuery('.ah-robotics-leftnav').length > 0) {
        jQuery(".ah-page-menu").addClass('ah-page-menu-none');
    }
	if (jQuery('.ah-cancer-leftnav').length > 0) {
        jQuery(".ah-page-menu").addClass('ah-page-menu-none');
    }
	if (jQuery('.widget-right-nav').length > 0) {
        jQuery(".ah-page-menu").addClass('ah-page-menu-none');
    }
	if (jQuery('.menu-right-inner-pages').length > 0) {
        jQuery(".ah-page-menu").addClass('ah-page-menu-none');
    }
	if (jQuery('.menu-right-inner-pages').length > 0) {
        jQuery(".menu-right-inner-pages").addClass('ah-page-menu2');
    }
	if (jQuery('.apollo-cancer-innerbanner2').length > 0) {
        jQuery(".ah-cancer-white-block").addClass('ah-cancer-white-block5');
    }
	if (jQuery('.ah-growth-story-box').length > 0) {
        jQuery("aside.p0").addClass('ah-growth-story-box-img');
    }
	if (jQuery('.ah-growth-story-box-img').length > 0) {
        jQuery(".planvisit-cont").addClass('planvisit-contp');
    }
	if (jQuery('.main-appointment').length > 0) {
        jQuery(".ah-right-block").addClass('ah-right-block5');
    }
	
    if (jQuery('.ah-coe-blk').length > 0) {
        jQuery(".inner-page-full-width").addClass('ah-coe-blk-outer');
    }
    jQuery(".menu-right-inner-pages").find(".nav-header ").each(function() {
        jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").slideUp("slow"), jQuery(this).click(function() {
            jQuery(this).next("ul").slideToggle("slow")
        })
    }), jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").find("li").hasClass("active") && jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").find("li.active").parents("ul").slideDown("slow"), jQuery(".cancer-banner-slider").flexslider({
        animation: "slide",
        animationSpeed: 1500,
        slideshowSpeed: 4500
    }), jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").find("li").hasClass("active") && jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").find("li.active").parents("ul").slideDown("slow"), jQuery(".trans-banner-slider").flexslider({
        animation: "slide",
        animationSpeed: 1500,
        slideshowSpeed: 4500
    }),jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").find("li").hasClass("active") && jQuery(".menu-right-inner-pages").find(".nav-header ").next("ul").find("li.active").parents("ul").slideDown("slow"), jQuery(".eldercare-banner-slider").flexslider({
        animation: "slide",
        animationSpeed: 1500,
        slideshowSpeed: 4500
    }),jQuery(".robotics-banner-slider").flexslider({
        animation: "slide",
        animationSpeed: 1500,
        slideshowSpeed: 4500
    }), jQuery(".main-menu nav ul li a.main-menu-key-medical-procedures, .main-menu nav ul li a.main-menu-value-added-services").length > 0 && jQuery(".main-menu nav ul li a.main-menu-key-medical-procedures, .main-menu nav ul li a.main-menu-value-added-services").parentsUntil("ul").find("ul").addClass("twocol"), jQuery(".main-menu nav ul li a.main-menu-hospitals-in-india").length > 0 && jQuery(".main-menu nav ul li a.main-menu-hospitals-in-india").parentsUntil("ul").find("ul > li:first-child ul").addClass("nav-left-pos twocolsmall"), jQuery(".main-menu nav > ul > li").hover(function() {
        parseInt(jQuery(window).width()) >= 1024 && (jQuery(".quick-links ul").stop().slideUp("fast"), jQuery(".quick-links a.qlink").addClass("active"), jQuery(this).find("> ul").stop().slideDown())
    }, function() {
        parseInt(jQuery(window).width()) >= 1024 && jQuery(this).find("> ul").stop().slideUp()
    }), jQuery(".main-menu nav > ul > li > ul > li").hover(function() {
        parseInt(jQuery(window).width()) >= 1024 && jQuery(this).find("> ul").stop().slideDown()
    }, function() {
        parseInt(jQuery(window).width()) >= 1024 && jQuery(this).find("> ul").stop().slideUp()
    }), jQuery(".main-menu nav > ul > li > ul > li > ul").length > 0 && jQuery(".main-menu nav > ul > li > ul > li > ul").parent("li").find("> a").append('<span class="caret"></span>'), jQuery(".banner-block, .iam-here, .equipment, .key-medical-outer, .patients-speak-outer, footer, .main").hover(function() {
        jQuery(".quick-links ul").stop().slideUp("fast"), jQuery(".quick-links a.qlink").addClass("active"), jQuery(this).find("> ul").stop().slideDown()
    }, function() {
        jQuery(this).find("> ul").stop().slideUp()
    }), jQuery(".banner-slider, .showcase").flexslider({
        animation: "slide",
        animationSpeed: 1500,
        slideshowSpeed: 5500
    }), jQuery(".equipment-slider").flexslider({
        animation: "slide",
        minItems: 1,
        maxItems: 6,
        move: 2,
        animationSpeed: 1500,
        slideshowSpeed: 5e3,
        itemWidth: 100,
        controlNav: !1
    }), jQuery(".popup-cont").click(function() {
        jQuery(window).width() <= 680 && (jQuery(this).find(".banner-hover-content").slideToggle("slow"), jQuery(this).toggleClass("collapse-slide"))
    }), jQuery(window).scrollTop() > 50 ? jQuery(".icon-top").stop().animate({
        bottom: 5
    }, 300) : jQuery(".icon-top").stop().animate({
        bottom: -45
    }, 300), jQuery(window).scroll(function() {
        jQuery(window).scrollTop() > 50 ? jQuery(".icon-top").stop().animate({
            bottom: 5
        }, 300) : jQuery(".icon-top").stop().animate({
            bottom: -45
        }, 300)
    }), jQuery(".icon-top").click(function() {
        jQuery("body,html").animate({
            scrollTop: 0
        }, 500)
    }), jQuery(".icon-arrow").click(function() {
        "icon-arrow up-arrow" != jQuery(this).attr("class") ? (jQuery(".hidden-social").show(), jQuery(this).addClass("up-arrow")) : (jQuery(".hidden-social").hide(), jQuery(this).removeClass("up-arrow"))
    }), jQuery(".patients").flexslider({
        animation: "slide",
        animationLoop: !0,
        itemWidth: 247,
        itemMargin: 5,
        minItems: 1,
        maxItems: 1,
        animationSpeed: 1500,
        slideshowSpeed: 5e3
    }), jQuery(".searchicon").click(function() {
        "searchicon active" == jQuery(this).attr("class") ? (jQuery(".search-social .search").stop().slideDown("slow"), jQuery(".searchicon").removeClass("active")) : (jQuery(".search-social .search").stop().slideUp("slow"), jQuery(".searchicon").addClass("active"))
    }), jQuery(".quick-links a.qlink").click(function() {
        "qlink active" == jQuery(this).attr("class") ? (jQuery(".quick-links ul").stop().slideDown("slow"), jQuery(".quick-links a.qlink").removeClass("active")) : (jQuery(".quick-links ul").stop().slideUp("slow"), jQuery(".quick-links a.qlink").addClass("active"))
    }), jQuery(".explore-blk ul li.popup-cont").each(function() {
        jQuery(this).hover(function() {
            jQuery(window).width() > 680 && (jQuery(this).find(".banner-hover-content").stop().fadeIn("medium"), jQuery(".bg-banner").stop().fadeIn("medium"))
        }, function() {
            jQuery(window).width() > 680 && (jQuery(".bg-banner").stop().fadeOut("medium"), jQuery(this).find(".banner-hover-content").stop().fadeOut("medium"))
        })
    }), jQuery(document).mouseup(function(e) {
        if (jQuery(window).width() > 680) {
            var i = jQuery("#nav-mobile");
            i.is(e.target) || 0 !== i.has(e.target).length || jQuery(window).width <= 720 && jQuery("nav").hide()
        }
    }), jQuery(".ulp-header, .ulp-footer, .ulp-content").click(function() {
        jQuery("#country_list_id").hide()
    }), jQuery(".inputfld span.place_holder").click(function() {
        jQuery(this).hide(), jQuery(".inputfld input[type='text']").focus()
    }), jQuery(".inputfld input[type='text']").hover(function() {}, function() {
        "" == jQuery(this).val() && (jQuery(".inputfld input").blur(), jQuery(".inputfld  span.place_holder").show())
    }), jQuery(".selectpicker").selectpicker(), jQuery(".patientbanner").flexslider({
        animation: "slide",
        animationLoop: !0,
        minItems: 1,
        maxItems: 1,
        itemWidth: 247,
        animationSpeed: 1500,
        slideshowSpeed: 5e3
    }), jQuery(".patientCoe-slider").flexslider({
        animation: "slide",
        minItems: 3,
        maxItems: 3,
        move: 3,
        animationSpeed: 1500,
        slideshowSpeed: 5e3,
        itemWidth: 120,
        controlNav: !1
    }), jQuery(".interCoe-slider").flexslider({
        animation: "slide",
        minItems: 2,
        maxItems: 4,
        move: 2,
        animationSpeed: 1500,
        slideshowSpeed: 5e3,
        itemWidth: 100,
        controlNav: !1
    }), jQuery(".management").flexslider({
        animation: "slide",
        animationLoop: !0,
        minItems: 1,
        maxItems: 1,
        itemWidth: 247,
        animationSpeed: 1500,
        slideshowSpeed: 5e3
    }), jQuery(".navigation-toggle").click(function() {
        var e = jQuery(this).attr("id"),
            i = jQuery(this);
        jQuery(e).slideToggle(function() {
            i.html("none" == jQuery(this).css("display") ? "View Profile" : "Hide Profile")
        })
    })
});
jQuery(function() {
    jQuery(".tab-cont").click(function() {
        jQuery(window).width() <= 767 && jQuery(".tabs-right").slideToggle()
    }), jQuery(".hma-awards-acc-hd ul li").each(function(e) {
        var i = jQuery(this);
        jQuery(this).find("a").click(function() {
            jQuery(".hma-awards-acc-hd ul li a").removeClass("active"), i.find("a").addClass("active"), jQuery(".hma-cnt").stop().slideUp("slow"), jQuery(".hma-content-" + (e + 1)).stop().slideDown("slow")
        })
    });
	jQuery('.bc-img img').on('click', function(ev) {
		jQuery('.bc-img').hide();
		jQuery('.bc-iframe').show();
 		//jQuery("#bciframe")[0].src += "&autoplay=1";
		//ev.preventDefault();
	});
	jQuery.noConflict();
	jQuery('.marqueev').marquee({
	direction: 'up',
	speed: 6000,
	gap: 20,
	delayBeforeStart: 0,
	 duplicated: true,
	pauseOnHover: true
});

});
jQuery(function() {

    var quotes = jQuery(".quotes");
    var quoteIndex = -1;
    
    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(2000)
            .fadeOut(2000, showNextQuote);
    }
    
    showNextQuote();
    
});

jQuery(document).ready(function() {
	
	if(jQuery.cookie("precision_submit") != 1)
	{
		jQuery("#precisionoverlay").modal({show: true, backdrop: 'static', keyboard: false});
	}
	
	jQuery(".show-tabs-main").click(function () {
            jQuery(".robotics-block .robotics-bg-block .robotic-list ul li ul.nav-tabs li").click(function () {
                console.log(jQuery(this).find('a').html());
                jQuery(".show-tabs-main span.tab-cnt").html(jQuery(this).find('a').html());
				jQuery(".robotics-block .robotics-bg-block .robotic-list ul li ul.nav-tabs").slideUp();				
            });
            jQuery(".robotics-block .robotics-bg-block .robotic-list ul li ul.nav-tabs").slideToggle();
			jQuery('body').delay(2000).queue('fx', function() { jQuery(this).addClass('show-tabs-add'); });			
    });
	jQuery("body.show-tabs-add .robotics-bg-block").click(function () {					 
				jQuery(".robotics-block .robotics-bg-block .robotic-list ul li ul.nav-tabs").slideUp();	
				jQuery(this).removeClass('show-tabs-add');
	});
	
	
	jQuery(".events-box").hover(function () {
        jQuery('.events-box-hover', this).stop().animate({
            bottom: 0,
        }, 300);
		jQuery('.events-box-hover').show();
    }, function () {
        console.log('x');
        jQuery('.events-box-hover', this).stop().animate({
            bottom: -100 + '%',
        }, 300);
    });
	
	jQuery(".events-popup .modal-dialog .close, .events-popup").click(function () {														 
		jQuery('.events-box-hover').hide();
	});
	
	jQuery('#eventsfilteryear select').on('change', function () {
	    var yearfilter_val = jQuery(this).val();
	    console.log(yearfilter_val);
	    if (yearfilter_val == "Year") {
	        // no actions
	    } else {
	        jQuery('.events-year').hide();
	        jQuery('.events-year-month').hide();
	        jQuery('#year-' + yearfilter_val + '').fadeIn("slow");
	        jQuery('#yearmonth-' + yearfilter_val + '').fadeIn("slow");
	    }
	});
	var yearfilter_val = jQuery('#eventsfilteryear select').val();
	console.log(yearfilter_val);

	jQuery('#eventsfiltermonth #yearmonth-2016 select').on('change', function () {
		var filter_val = jQuery(this).val();
		console.log(filter_val);
		if(filter_val=="Month") {
			// no actions
		} 
		else if(filter_val=="All") {
		    jQuery('#year-2016 .events-tabpane').fadeIn('slow');
		}else {
		    jQuery('#year-2016 .events-tabpane').hide();
		    jQuery('#year-2016 #tabpane-' + filter_val + '').fadeIn("slow");
		}
	});
	jQuery('#eventsfiltermonth #yearmonth-2017 select').on('change', function () {
		var filter_val = jQuery(this).val();
		console.log(filter_val);
		if(filter_val=="Month") {
		  // no actions
		} 
		else if(filter_val=="All") {
			jQuery('#year-2017 .events-tabpane').fadeIn('slow');
		}else {
			jQuery('#year-2017 .events-tabpane').hide();
			jQuery('#year-2017 #tabpane-' + filter_val + '').fadeIn("slow");
		}
	});
	jQuery(".events-popup-slider").owlCarousel({
			navigation: true,
			autoplay:false,
			slideSpeed : 800,
			singleItem:true,
			loop:false
		});
		
	jQuery(".csr-blue-button").click(function () {	
		var bluebtn_val = jQuery(this).html();
		if(bluebtn_val=="Read More") {
			jQuery('.csr-blue-button').html('hide');
		} 
		else{
			jQuery('.csr-blue-button').html('Read More');
		}
		jQuery('.csr-gray-hide-content').slideToggle();		
	});
	
	jQuery(".csr-total-health-button").click(function () {
		var healthbtn_val = jQuery(this).html();
		if(healthbtn_val=="Read More") {
			jQuery('.csr-total-health-button').html('hide');
		} 
		else{
			jQuery('.csr-total-health-button').html('Read More');
		}											   
		jQuery('.csr-total-health .csr-hide').slideToggle();
	});
	jQuery(".csr-relief-button").click(function () {
		var reliefbtn_val = jQuery(this).html();
		if(reliefbtn_val=="Read More") {
			jQuery('.csr-relief-button').html('hide');
		} 
		else{
			jQuery('.csr-relief-button').html('Read More');
		}														 
		jQuery('.csr-relief .csr-hide').slideToggle();
	});
	
	if (jQuery('.cancer-booknow-banner').length > 0) {
        jQuery(".ah-cancer-leftnav").addClass('cancer-booknow-nav');
    }
	if (jQuery('.precision-oncology-thank-text').length > 0) {
        jQuery(".ah-cancer-leftnav").addClass('cancer-thank-nav');
    }
	
	
jQuery('.csr-apollo-list').slick({
	arrows: true,
	dots: false,
	infinite: false,
	slidesToShow: 6,
	slidesToScroll: 6,
	speed: 2000,
	autoplay: false,
	autoplayspeed: 3000,
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 567,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});
	
	
	jQuery(".csr-apollo-button").click(function () {	
		var bluebtn_val = jQuery(this).html();
		if(bluebtn_val=="Read More") {
			jQuery('.csr-apollo-button').html('hide');
		} 
		else{
			jQuery('.csr-apollo-button').html('Read More');
		}
		jQuery('.csr-gray-hide-content').slideToggle();		
	});
	
															
jQuery('.csr-apollo-btn').click(function () {									  
	jQuery(this).parent('.csr-apollo-wrap-content').find('.csr-apollo-wrap-hide').slideDown(1000);	
	if(jQuery(window).width()>992) {
				jQuery("body, html").animate({
					scrollTop: jQuery('.csr-apollo-list').stop().offset().top
				}, 1000);
				} else {
				var headerHeight = parseInt(jQuery("header").css('height'));
				jQuery("body, html").animate({
					scrollTop: jQuery('.csr-apollo-list').stop().position().top-headerHeight
				}, 1000);
		}
		jQuery(window).resize(function () {									
			if(jQuery(window).width()>992) {
					jQuery("body, html").animate({
						scrollTop: jQuery('.csr-apollo-list').stop().offset().top
					}, 1000);
					} else {
					var headerHeight = parseInt(jQuery("header").css('height'));
					jQuery("body, html").animate({
						scrollTop: jQuery('.csr-apollo-list').stop().position().top-headerHeight
					}, 1000);
			}
		});
		var read_val = jQuery(this).parent('.csr-apollo-wrap-content').attr("class").split(' ')[1];
		jQuery(".csr-apollo-block .csr-apollo-center-block .csr-apollo-list .csr-apollo-list-item").each(function() {
			if(jQuery(this).hasClass(read_val)) {
						jQuery('.' + read_val).addClass('active');
			}	
		});
		
		/*jQuery('.csr-apollo-block .csr-apollo-center-block .csr-apollo-list .csr-apollo-list-item').each( function(index) {
			alert(read_val);																									   
			  if(jQuery(this).hasClass(read_val)) {
				jQuery('#slickslider').slickGoTo(index);
			  }
		});*/
		
		var csrbtn_val = jQuery(this).html();
			if(csrbtn_val=="Read More") {						
				jQuery(this).html('hide');
				jQuery(this).parent('.csr-apollo-wrap-content').find('p.details').hide();
				jQuery('.csr-apollo-wrap-content').hide();
				jQuery(this).parent('.csr-apollo-wrap-content').show();	
				
			} 
			else{
				jQuery(".csr-apollo-all-list .csr-apollo-wrap .csr-apollo-wrap-content .csr-apollo-wrap-hide").slideUp(500);
				jQuery(this).parent('.csr-apollo-wrap-content').find('.csr-apollo-wrap-hide').slideUp();
				jQuery(this).html('Read More');
				jQuery(this).parent('.csr-apollo-wrap-content').find('p.details').slideDown(500);	
			}
			
			
});

jQuery('.csr-apollo-block .csr-apollo-center-block .csr-apollo-list .csr-apollo-list-item').click(function () {								   
	var slider_val = jQuery(this).attr("class").split(' ')[1];
	if(jQuery(window).width()>992) {
				jQuery("body, html").animate({
					scrollTop: jQuery('.csr-apollo-list').stop().offset().top
				}, 1000);
				} else {
				var headerHeight = parseInt(jQuery("header").css('height'));
				jQuery("body, html").animate({
					scrollTop: jQuery('.csr-apollo-list').stop().position().top-headerHeight
				}, 1000);
		}
	jQuery(window).resize(function () {									
		if(jQuery(window).width()>992) {
				jQuery("body, html").animate({
					scrollTop: jQuery('.csr-apollo-list').stop().offset().top
				}, 1000);
				} else {
				var headerHeight = parseInt(jQuery("header").css('height'));
				jQuery("body, html").animate({
					scrollTop: jQuery('.csr-apollo-list').stop().position().top-headerHeight
				}, 1000);
		}
	});
	jQuery(".csr-apollo-all-list .csr-apollo-wrap .csr-apollo-wrap-content").hide();
	jQuery(".csr-apollo-all-list .csr-apollo-wrap .csr-apollo-wrap-content p.details").show();
	jQuery(".csr-apollo-all-list .csr-apollo-wrap .csr-apollo-wrap-content").removeClass('active');
	jQuery(".csr-apollo-all-list .csr-apollo-wrap .csr-apollo-wrap-content .csr-apollo-wrap-hide").show();
	jQuery('.csr-apollo-btn').html('Read More');
	jQuery('.csr-apollo-block .csr-apollo-center-block .csr-apollo-list .csr-apollo-list-item').removeClass('active');
	if(jQuery(this).hasClass(slider_val)) {	
	jQuery(this).addClass('active');
	}
	jQuery(".csr-apollo-all-list .csr-apollo-wrap .csr-apollo-wrap-content").each(function() {																						   
		if(jQuery(this).hasClass(slider_val)) {	
			jQuery(this).addClass('active');
			jQuery(this).find('p.details').hide();
			jQuery(this).find(".csr-apollo-btn").html('hide');
			jQuery(this).slideDown(1000);			
		}
	});
	});	


	if (jQuery('.precision-oncology-thank-text').length > 0) {
        jQuery(".ah-cancer-leftnav").addClass('cancer-thank-nav');
    }
	function close_accordion_section() {
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').removeClass('open');
	}

	jQuery('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			jQuery(this).addClass('active');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
	});



jQuery(function() {
	  jQuery(".owl-carousel").owlCarousel({
        navigation: true,
        autoPlay: 3000,
        items : 7,
        itemsDesktop : [1199,7],
        itemsDesktopSmall : [979,5],
        itemsTablet : [768,3],
        itemsMobile : [479,2]
      });
});

	if (jQuery('.main-menu nav>ul>li:nth-child(2).active').length > 0) {
		 jQuery("ul.menu-right-inner-pages>li>ul>li>ul").addClass('nav-header3');
	}

	jQuery("ul.menu-right-inner-pages>li>ul>li>ul.nav-header3").parent("li").prepend("<span class='right-arrow-menu'></span>");
	jQuery("ul.menu-right-inner-pages>li>ul>li>ul.nav-header3").slideUp();

	jQuery('span.right-arrow-menu').click(function() {
		var x = jQuery(this);
		jQuery(this).toggleClass('active');
		x.parent('li').find('ul').stop().slideToggle();
	});
	
	
	jQuery(".get-in-touch-icon, .get-in-touch-close, .get-in-touch-overlay").click(function() {
		if(jQuery(window).width() > 767) {
			if(parseInt(jQuery(".get-in-touch-form").css('left'))<0) {
			jQuery(".get-in-touch-form .get-in-touch-close").show();
			jQuery(".get-in-touch-overlay").fadeIn();
			jQuery(".get-in-touch-form").animate({
				left:0
			},500);
			} else {
			jQuery(".get-in-touch-form .get-in-touch-close").hide();
			jQuery(".get-in-touch-overlay").fadeOut();
			jQuery(".get-in-touch-form").animate({
				left:-230
			},500);
			}
		} else {
			//jQuery(".get-in-touch-overlay").fadeToggle();
			//jQuery(".get-in-touch-form .moduletable").slideToggle();
			//alert(jQuery(".get-in-touch-form .moduletable").css('display'));
			if(jQuery(".get-in-touch-form .moduletable").css('display')=='none') {
				jQuery(".get-in-touch-overlay").fadeIn();
				jQuery(".get-in-touch-form .moduletable").slideDown();
				console.log(jQuery("body").css('overflow-y'));
				jQuery("body").css('overflow-y','hidden');
			} else {
				jQuery("body").css('overflow-y','scroll');
				console.log(jQuery("body").css('overflow-y'));
				jQuery(".get-in-touch-overlay").fadeOut();
				jQuery(".get-in-touch-form .moduletable").slideUp();
			}
		}
	});
	if(jQuery("#get_in_touch_form .cancercaptcha .formError").css('display')=='block') {
		if(jQuery(window).width() > 767) {
			jQuery(".get-in-touch-form .get-in-touch-close").show();
			jQuery(".get-in-touch-overlay").fadeIn();
			jQuery(".get-in-touch-form").animate({
				left:0
			},500);
		} else {
			jQuery(".get-in-touch-overlay").fadeToggle();
			jQuery(".get-in-touch-form .moduletable").slideToggle();
		}
	}
	
	
	if(jQuery(window).width() > 767) {
	jQuery(function () {
		if ( jQuery('html').hasClass('csstransforms3d') ) {
			jQuery('.apolloboxGroup').removeClass('slide').addClass('flip');
			jQuery('.apolloboxGroup.flip').on('mouseenter',
				function () {
					jQuery(this).find('.apollo-boxwork').addClass('theFlip');
					jQuery(this).find('.apollo-boxdetail').stop().animate({opacity:1});
				});
			jQuery('.apolloboxGroup.flip').on('mouseleave',
				function () {
					jQuery(this).find('.apollo-boxwork').removeClass('theFlip');
					jQuery(this).find('.apollo-boxdetail').stop().animate({opacity:1});
				});
		} else {
			jQuery('.apolloboxGroup').on('mouseenter',
				function () {
					jQuery(this).find('.apollo-boxdetail').stop().animate({bottom:0}, 300, 'easeOutCubic');
				});
			jQuery('.apolloboxGroup').on('mouseleave',
				function () {
					jQuery(this).find('.apollo-boxdetail').stop().animate({bottom: (jQuery(this).height() + -1) }, 300, 'easeOutCubic');
				});
		}
		});
	}
	
if (jQuery(window).width() < 768) {
	jQuery(".edoc-mobile").click(function() {		 
		if(parseInt(jQuery(".widget-block").css('bottom'))==0) {
			jQuery(".widget-block").stop().animate({
					bottom:-80
				},600);
			if (jQuery(window).width() > 768) {
				jQuery(".widget-block").stop().animate({
					bottom:-200
				},600);
			}
		} else {
			jQuery(".widget-block").stop().animate({
				bottom:0
			},600);
		}			
	});
}
else {
	jQuery(".edoc-mobile").click(function() {						 
		if(parseInt(jQuery(".widget-block").css('bottom'))==0) {
			jQuery(".widget-block").stop().animate({
				bottom:-200
			},600);
			if (jQuery(window).width() < 768) {
				jQuery(".widget-block").stop().animate({
					bottom:-80
				},600);
			}
		} else {
			jQuery(".widget-block").stop().animate({
				bottom:0
			},600);
		}
	});
}

jQuery(window).resize(function () {
	if (jQuery(window).width() < 768) {
		if(parseInt(jQuery(".widget-block").css('bottom'))==-200) {	
			jQuery(".widget-block").stop().animate({
				bottom:-80
			},600);
		}
		if(parseInt(jQuery(".widget-block").css('bottom'))==-0) {
			jQuery(".edoc-mobile").click(function() {					  
				jQuery(".widget-block").stop().animate({
					bottom:-80
				},600);
				if (jQuery(window).width() > 768) {
					jQuery(".widget-block").stop().animate({
						bottom:-200
					},600);
				}				
				if(parseInt(jQuery(".widget-block").css('bottom'))==-80) {
					jQuery(".widget-block").stop().animate({
						bottom:-0
					},600);
				}
			});
		}
	} else {
		if(parseInt(jQuery(".widget-block").css('bottom'))==-80) {	
			jQuery(".widget-block").stop().animate({
				bottom:-200
			},600);
		}
		if(parseInt(jQuery(".widget-block").css('bottom'))==-0) {
			jQuery(".edoc-mobile").click(function() {						  
				jQuery(".widget-block").stop().animate({
					bottom:-200
				},600);
				if (jQuery(window).width() < 768) {
					jQuery(".widget-block").stop().animate({
						bottom:-80
					},600);
				}
				if(parseInt(jQuery(".widget-block").css('bottom'))==-200) {
					jQuery(".widget-block").stop().animate({
						bottom:-0
					},600);
				}
			});
		}
	}							
});

jQuery(".edoc-mobile").click(function() {
		var edocbtn_val = jQuery(this).html();
		if(edocbtn_val=="HIDE X") {
			jQuery('.edoc-mobile').html('BOOK AN APPOINTMENT');			
		} 
		else{
			jQuery('.edoc-mobile').html('HIDE X');
		}		
	});
		
});




jQuery(function() {
	/*alert(jQuery('.search-social .social-media a.arrow').length);*/
	jQuery('.search-social .social-media a.arrow').click(function() {
		if(jQuery(this).hasClass("open")) {
			jQuery(this).removeClass("open");
			jQuery(".search-social .social-media .social-media2").slideUp(500);
		} else {
			jQuery(this).addClass("open");
			jQuery(".search-social .social-media .social-media2").slideDown(500);
		}
	});
													 
});

/*22-6-17*/
jQuery(function() {
	jQuery(".aidc-block .aidc-hdg").click(function(){

		if(jQuery(this).parent(".block").hasClass("active")){
		jQuery(this).parent(".block").removeClass("active");
		jQuery(this).parent(".block").find(".aidc-content").slideUp();		
		
		}else{
					jQuery(".aidc-block .block").removeClass("active");
		jQuery(".aidc-block .aidc-content").slideUp();
		jQuery(this).parent(".block").addClass("active");
		jQuery(this).parent(".block").find(".aidc-content").slideDown();
		
		}	
	
	});

/*31-8-17*/

jQuery(".ah-patientInf-leftnav li").each(function(index) {
		var curval = jQuery(this);
		jQuery(this).click(function() {		
				jQuery(".ah-patientInf-leftnav li").removeClass('active');
				curval.addClass('active');
				if(jQuery(window).width() >992) {
				jQuery("html,body").animate({
					scrollTop:jQuery(".ah-patientI-content-block .ah-patientI-list-main").eq(index).offset().top
				},1000);
			} else {
				jQuery("html,body").animate({
					scrollTop:jQuery(".ah-patientI-content-block .ah-patientI-list-main").eq(index).offset().top-parseInt(jQuery('header').height())
				},1000);
			}
		});
	});
	
	jQuery(".ah-patientInf-leftnav li a").click(function(){	
		if(jQuery(window).width() <= 767) {												 
		 jQuery(".ah-patientInf-leftnav").slideUp();	
		} 
	});
	
	jQuery(window).resize(function () {	
		if(jQuery(window).width() > 767) {												 
		 	jQuery(".ah-patientInf-leftnav").css('display', '');	
		} 	
	});
	
});

jQuery(window).on('scroll resize load', function() {
		if(jQuery('.main-patientInf-innerblock').length>0) {
			if(jQuery(window).width() >= 992 && jQuery(window).scrollTop() > (jQuery('.main-patientInf-innerblock').offset().top) ) {
				jQuery('.ah-left-block').addClass('stuck');
			} 
			else if (jQuery(window).width() >= 767 && jQuery(window).width() <= 991 && jQuery(window).scrollTop() > (jQuery('.main-patientInf-innerblock').offset().top-parseInt(jQuery("header").height()))) {
				jQuery('.ah-left-block').addClass('stuck');
			}
			else {
				jQuery('.ah-left-block').removeClass('stuck');
			}
			
			if(jQuery(window).scrollTop() > (jQuery('.main-patientInf-innerblock').height()) ) {
				jQuery('.ah-left-block').addClass('bottom');
			} else {
				jQuery('.ah-left-block').removeClass('bottom');
			}
		}
	});