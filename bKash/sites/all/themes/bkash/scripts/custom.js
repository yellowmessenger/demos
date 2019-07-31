
(function ($) {
	window.paceOptions = {
      ajax: true,
      document: true,
      eventLag: false
  }
	// call jRespond and add breakpoints
	var jRes = jRespond([
	    {
	        label: 'handheld',
	        enter: 0,
	        exit: 960
	    },{
	        label: 'tablet',
	        enter: 768,
	        exit: 10000
	    },{
	        label: 'laptop',
	        enter: 961,
	        exit: 10000
	    },{
	        label: 'desktop',
	        enter: 1200,
	        exit: 10000
	    }
	]);


        function graphics_slider_navbar__height(){
            var $graphics_slider_image_height = $('.node-type-graphic-novel .flexslider .slides img');
            var $graphics_slider_nav_height = $('.node-type-graphic-novel .flexslider .flex-direction-nav a');
            //var $window = $(window).on('resize', function(){
               var height = $graphics_slider_image_height.height();
               $graphics_slider_nav_height.height(height);
            //}).trigger('resize'); //on page load
        }
	$(window).bind("resize",function(){graphics_slider_navbar__height();});
	$(document).ready(function() {

		/* Buy Now link */
			$('.ad-goto-link').click(function(event) {
				/* Act on the event */
				event.stopPropagation();
				var elLink = $(this).attr('data-link');
				window.location.href = elLink;
			});
            
            //breadcrumb triming
                if($('span.bread_title_arrow').length){
                    var title_str=$('span.bread_title_arrow').html();
                    if(title_str.length > 22){
                        title_str = title_str.substring(0,22)+'...';
                        $('span.bread_title_arrow').html(title_str);
                    }  
                }
                if($('#breadcrumb li.crumb-last').length){
                    var title_str= $('#breadcrumb li.crumb-last span span , #breadcrumb li.crumb-last span a').html(); 
                    if(title_str.length > 22){
                        title_str = title_str.substring(0,22)+'...';
                        if($('#breadcrumb li.crumb-last span a').length > 0){
                        	$('#breadcrumb li.crumb-last span a').html(title_str);
                        }else {
                        	$('#breadcrumb li.crumb-last span span').html(title_str);
                        }
                    }  
                }
               

            //table scroll functionality

            //$("div.table-scroll").remove();
            $("table").each(function(){
                if($(this).parent().attr('class')!='table-scroll'){ 
                   $(this).wrap( "<div class='table-scroll'></div>" );
                }
            });
            
            $( document ).ajaxComplete(function() {
                $("table").each(function(){
                    if($(this).parent().attr('class')!='table-scroll'){
                    $(this).wrap( "<div class='table-scroll'></div>" );
                    }
                });
            });
            
            //graphics page flex caption
            graphics_slider_navbar__height();
                if($('.flex-caption').css('display') == 'block') {
                    $('.flex-caption').before('<span class="flex-cap-btn">Hide Text</span>');
                }else{
                    $('.flex-caption').before('<span class="flex-cap-btn">Show Text</span>');
                }
            //$(".flex-caption").before('<span class="flex-cap-btn">Show Text</span>');
            $(".pdf-print.slide_first").click(function() {
                // Catch the flexslider context
                var slider = $(".flexslider").data("flexslider");
                
                // Unset the animating flag so we can move back to the first slide quickly      
                slider.animating = false;

                // Move to the first slide and stop the slideshow there
                slider.flexAnimate(0);
//                $('.flexslider').flexslider({startAt: 0});
//                $( "ul.slides li" ).removeClass( "flex-active-slide" );
//                $( "ul.slides li" ).css( {"opacity":"0","z-index":"1"});
//                $( "ul.slides li" ).first().addClass( "flex-active-slide" );
//                $( "ul.slides li" ).first().css( {"opacity":"1","z-index":"2"});
            });
            $(".flex-cap-btn").click(function() {

//                if ($(this).text() == "Show Text"){
//                    $(this).text("Hide Text");
//                }else{
//                    $(this).text("Show Text");
//                }

                $(".flex-caption").toggle();
                if($('.flex-caption').css('display') == 'block') {
                    $('.flex-cap-btn').text("Hide Text");
                }else{
                     $('.flex-cap-btn').text("Show Text");
                }
            });
            

            

		$('.ei-slider').fadeIn(500);

		//==============================================Social Link==================================================//

		$('.fb-button a, .twt-button a, .in-button a, .youtube-button a').hover(function(){

		   $(this).stop().animate({'opacity' : '0'}, 700);

		   $(this).parent().stop().animate({'right':'-1'}, 300);

		}, function(){

			$(this).stop().animate({'opacity' : '1'}, 500);

			$(this).parent().stop().animate({'right':'-6'}, 300);

		});

		//==============================================End of Social Link==================================================//

		//==============================================Search Holder==================================================//

		$('.search-input-holder #edit-search-block-form--2').focus(function(){

				 $(this).stop().animate({'width' : '165'}, 300);

			})

			.blur(function(){$(this).stop().animate({'width' : '100'}, 400);

			});



		$('.search-input-holder form input.form-submit').hover(

			function(){ // Change the input image's source when we "roll on"

				$(this).addClass("search-button-hover");

			},

			function(){ // Change the input image's source back to the default on "roll off"

				$(this).removeClass("search-button-hover");                

			}

		);

		//==============================================End of Search Holder==================================================//




		/*=========================== Main Menu JS ==========================================*/
			
		$('.menu-holder .block-content >  ul').addClass("sdt_menu");

		//==============================================Sticky Menu==================================================//

		

		$('.menu-holder ul.sdt_menu li span span.sdt_link').css({'opacity':0});

		$('.menu-holder .block-content >  ul').attr('id', 'sdt_menu');

		$("#sdt_menu > li").each(function (index, domEle) {

			// domEle == this

			var $elem = $(this);

			var img_position = ($elem.width() - $elem.find('.sdt_link').width())/2-10;	

			var text_position = ($elem.width() - $elem.find('.sdt_link').width())/2+10;

			$(domEle).find('img').css({'left':img_position});

			$(domEle).find('.sdt_link, .sdt_descr').css({'left':text_position});  

		});



		$(".desktop .menu-holder ul#sdt_menu li > ul li").each(function (index, domElee) {

			if($(this).parents('#sdt_menu').children().length == $(this).parent().parent().index()+1 || $(this).parents('#sdt_menu').children().length == $(this).parent().parent().index()+2) {

				$(this).find('a').css({'backgroundPosition':'0 12px', 'width':'152px','paddingLeft':'10px'});

			}

		});	



		$(".desktop .menu-holder ul#sdt_menu li > ul li.expanded").each(function (index, domElee) {

			if($(this).parents('#sdt_menu').children().length == $(this).parent().parent().index()+1 || $(this).parents('#sdt_menu').children().length == $(this).parent().parent().index()+2) {

				$(this).find('a:first').css({'backgroundPosition':'0 -5px', 'width':'152px','paddingLeft':'10px'});

			}

		});	

			

		var submenu_height = 0;

		var max_li = 0;

		var temp_li = 0;

		$('.desktop .menu-holder .block-content > ul.sdt_menu  > li > ul').each(function() {

			temp_li = 0;

			$(this).find('> li').each(function(){

				temp_li++;

				});	

			if(max_li<temp_li)

				max_li = temp_li;

		});		

				//alert(max_li);

		submenu_height += max_li*28/*$('.menu-holder ul.sdt_menu > li > ul li').height()*/;



		$('.desktop .menu-holder #sdt_menu > li').bind('mouseenter',function(){

			var $elem = $(this);

			var centerposition = ($elem.width() - $elem.find('.sdt_link').width())/2;

			$elem.find('img')

				 .stop(true)

				 .animate({

					'height':'50px',

					'left':'70px',

					'bottom':submenu_height/2+10

				 },700,'easeOutBack')

				 .andSelf()

				 .find('.sdt_link')

				 .stop(true)

				 .animate({'top':-submenu_height, 'left':centerposition, 'opacity':1},600,'easeOutBack')

				 .andSelf()

				 .find('.sdt_descr')

				 .stop(true)

				 .animate({'left':centerposition},900,'easeOutBack')

				 .andSelf()

				 .find('.sdt_active')

				 .stop(true)

				 .animate({'height':submenu_height+19},400,function(){

				var $sub_menu = $elem.find('ul:first');

				var $all_sub_menu = $elem.find('ul');

				$all_sub_menu.css({'height':submenu_height});

				if($sub_menu.length){

					var left = '192px';

					if($elem.parent().children().length == $elem.index()+1 || $elem.parent().children().length == $elem.index()+2)

						left = '-192px';

					$sub_menu.show().stop(true).animate({'left':left},600);

				}	

			});

		}).bind('mouseleave',function(){

			var $elem = $(this);

			var img_position = ($elem.width() - $elem.find('.sdt_link').width())/2-10;	

			var text_position = ($elem.width() - $elem.find('.sdt_link').width())/2+10;

			var $sub_menu = $elem.find('ul:first');

			if($sub_menu.length)

				$sub_menu.hide().css('left','0px');

			

			$elem.find('.sdt_active')

				 .stop(true)

				 .animate({'height':'0px'},300)

				 .andSelf().find('img')

				 .stop(true)

				 .animate({

					'height':'13px',

					'left':img_position,

					'bottom':'12px'},600,'easeOutExpo')

				 .andSelf()

				 .find('.sdt_link')

				 .stop(true)

				 .animate({'top':'12px', 'left':text_position, 'opacity':0},500)

				 .andSelf()

				 .find('.sdt_descr')

				 .stop(true)

				 .animate({'left':text_position},500);

		});	

		$('.desktop .menu-holder ul.sdt_menu li > ul li').hover(

		function(){ // Change the input image's source when we "roll on"					

			if($(this).parents('#sdt_menu').children().length == $(this).parent().parent().index()+1 || $(this).parents('#sdt_menu').children().length == $(this).parent().parent().index()+2) {

				$(this).find('ul').show().stop().animate({'left':'-191px'}, {
					duration: 800,
					complete: function () {
          	$(this).addClass('style-l');
        	} 
				});

				$(this).find('a:first').css({'color':'#f6ff00'});

			}

			else {

				$(this).find('ul').show().stop().animate({'left':'191px'}, {
					duration: 800,
					complete: function () {
          	$(this).addClass('style-r');
          }
        });

				$(this).find('a:first').css({'color':'#f6ff00'});

			}

		},

		function(){ // Change the input image's source back to the default on "roll off"

			$(this).find('ul').hide().stop().animate({'left':'0'},800).removeClass('style-l style-r'); 

				$(this).find('a:first').css({'color':'#FFFFFF'});            

		});

		//==============================================End of Sticky Menu==================================================//
                
               
                
                
                
                
                //==============================================start of image popup==================================================//
              $('.overlay, #lightbox2-overlay').css({opacity:0.75});
 



            //    $('.each-partner > a, .each-director > a, a.img-popup ' ).click(function() {
            $('a.img-popup ' ).click(function() {

                       // alert("test");

                        $(this).parent().parent().parent().find('.overlay').fadeIn(800);	

                     //   $(this).parent().parent().parent().find('.partner-popup, .director-popup, .news-popup').fadeIn(800);
                      $(this).parent().parent().parent().find('.news-popup').fadeIn(800);



                    //    var popup_height = $(this).parent().parent().parent().find('.partner-popup, .director-popup, .news-popup').height();
                     var popup_height = $(this).parent().parent().parent().find('.news-popup').height();



                    //    $(this).parent().parent().parent().find('.partner-popup').css({marginTop:-(popup_height+30)/2});

                    //    $(this).parent().parent().parent().find('.director-popup').css({marginTop:-(popup_height+60)/2});

                        $(this).parent().parent().parent().find('.news-popup').css({marginTop:-(popup_height+60)/2});

                });

                $('.close-button').click(function() {

                    $(this).parent().fadeOut(800);	
                        
                    $(".overlay").fadeOut(800);	

                    //$(this).parent().prev().fadeOut(800);	

                });

                $(document).keyup(function(e) { 

                        if (e.keyCode == 27) { // esc keycode

                        $('.close-button').parent().fadeOut(800);	

                        $('.close-button').parent().prev().fadeOut(800);	

                        }

                });

 //==============================================end of image popup==================================================//
	
	    accordionMenu();
            
            //==============================================start of event carousel==================================================//
	
             if ($('div').hasClass('caro-container')) {
                                            // alert("s");
                                 if($(".slider-container li").size()>5) {
                                      
                                         $('.jcarousel-skin-tango').jcarousel({


                                                 auto	: 	4,	
                                                 wrap	: 	'circular',
                                                 initCallback: mycarousel_initCallback
                                         });		
                                 }
                                 else {
                                      
                                         $('.jcarousel-skin-tango').jcarousel({
                                                 auto	: 	0,
                                                 wrap	: 	'none',
                                                 initCallback: mycarousel_initCallback
                                         });	
                                 }
                                 $().piroBox({
                                         my_speed: 500, //animation speed
                                         bg_alpha: 0.75, //background opacity
                                         slideShow : true, // true == slideshow on, false == slideshow off
                                         slideSpeed : 5, //slideshow duration in seconds(3 to 6 Recommended)
                                         close_all : '.piro_close,  .piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox	
                                 });
                         }

                
                
                   //==============================================end of event carousel==================================================//
                
                
  // ====================================== JRespond Clone =====================================================//

  var regLink = $('.register-wrapper').clone();
  var langBl = $('.block-language').clone();
  var target = $('.top-header');
  var searchBtn = '<div class="search-icon" ><span class="glyphicon glyphicon-search"></span></div>';
  var footerLink = $('#block-block-2 p a').clone();
  var closeOfMenu = '<li class="close-menu"><a href="#">Close Menu <span class="icon-b-icon_cross" > </span> </a></li>';
  var overlay = '<div class="b-menu-overlay" style="background-color: rgba(0, 0, 0, 0.701961); position: fixed; top: 0px; bottom: 0px; width: 100%; z-index: 992;"></div>';
  if($('body').hasClass('i18n-bn')) {
  	var closeOfMenu = '<li class="close-menu"><a href="#">মেনু বন্ধ করুন <span class="icon-b-icon_cross" > </span> </a></li>';
  }

  var searchBlock = $('#block-search-form').clone();
  var secondaryMenu = $('#menu-bar').clone();

  jRes.addFunc({
    breakpoint: 'handheld',
    enter: function() {

	    $('.ei-slider').eislideshow({
				animation			: 'center',
				easing				: 'easeOutExpo',
				titleeasing			: 'easeOutExpo',
				autoplay			: true,
				speed				: 0,
				slideshow_interval	: 2000,//30000,
				titlespeed			: 800
			});

    	$('body').addClass('mobile').removeClass('desktop');
    	target.append(regLink);
    	target.append(langBl);
    	$('#header .header-relative').append(searchBtn);
    	$('#block-block-2 ul').prepend(footerLink);
    	// Menu Prepared 
    	$('.menu-holder').removeClass('desktop');
    	$('.menu-holder .block-content >  ul').addClass("bkash-mobile-menu").removeClass('sdt_menu');
    	$('.menu-holder .block-content >  ul').attr('id', 'sdt_menu_mobile');
    	$('.menu-holder .block-content >  ul').prepend(closeOfMenu);

    	$('.menu-holder').mCustomScrollbar({
      	live: "once",
      	mouseWheel: true,
    	});

    	$('.navbar-toggle').click(function(event) {
    		$('.menu-holder').fadeIn(500);
    		$('#footer').prepend(overlay);
    	});

    	$('.close-menu, .b-menu-overlay').click(function(event) {
    			$('.menu-holder').fadeOut(500);
    			$('.b-menu-overlay').fadeOut(500);
    			$('.b-menu-overlay').remove();
    	});

    	$('.bkash-slider-image').each(function(index, el) {
					
					var mobileS = $(this).attr('data-mobile');
					$(this).attr('src', mobileS);

    	});

    	/* Search Section */
    	$('.mobile-search-box').append(searchBlock);
    	$('.search-icon').click(function(event) {
    		$(this).toggleClass('active');
    		$('#header, .top-header, .mobile-search-box').toggleClass('z-increase');
    		$('.mobile-search-box').fadeToggle(500);
    		$('.search-overlay').fadeToggle(500);
    		$('.navbar-toggle').fadeToggle(500);
    	});

    	/* Slider Thum */
    	$('#ei-slider ei-slider-thumbs li a').click(function(event) {
        $(this).addClass('active');
        });
    	$('.graphic-media').append(secondaryMenu);
    	$('#columns > div').first().remove();


    },
    exit: function() {
    	$('#columns').prepend(secondaryMenu);
    	$('.graphic-media').find('#menu-bar').remove();
    	$('body').addClass('desktop').removeClass('mobile');
    	$('.close-menu').remove();
    	$('.b-menu-overlay').remove();
    	//$('#header .region-inner').append(langBl);
      $('.menu-holder .block-content >  ul').removeClass("bkash-mobile-menu").addClass('sdt_menu');
      $('.menu-holder .block-content >  ul').attr('id', 'sdt_menu');
      $('.navbar-toggle').fadeOut();
      $('.bkash-slider-image').each(function(index, el) {
					
					var deskS = $(this).attr('data-desk');
					$(this).attr('src', deskS);

    	});
    }
  });


  jRes.addFunc({
    breakpoint: 'tablet',
    enter: function() {


    	//============================== Graphic icons  ==============================================//

    	$('.graphic-button a').hover(function(){

    		//alert('hi');

    	  $(this).stop().animate({'opacity' : '1'}, 700);

    	  $(this).parent().stop().animate({'left':'-2'}, 600);

    	 }, function(){

    		$(this).stop().animate({'opacity' : '1'}, 500);

    		$(this).parent().stop().animate({'left':'-92'}, 700);

    	});

    	$('.shop-button a').hover(function(){

    	   $(this).stop().animate({'opacity' : '1'}, 700);

    	   $(this).parent().stop().animate({'left':'-2'}, 600);

    	 }, function(){

    		$(this).stop().animate({'opacity' : '1'}, 500);

    		$(this).parent().stop().animate({'left':'-104'}, 700);

    	});
    	  
    	$('.profile-button a').hover(function(){
    	  
    	   $(this).stop().animate({'opacity' : '1'}, 700);
    	   $(this).parent().stop().animate({'left':'-2'}, 600);
    	 }, function(){
    		$(this).stop().animate({'opacity' : '1'}, 500);
    		$(this).parent().stop().animate({'left':'-92'}, 700);
    	});
  /*************** Left Side floating menu **********/      
        $('.profile-token a').hover(function(){
    	  
    	   $(this).stop().animate({'opacity' : '1'}, 700);
    	   $(this).parent().stop().animate({'left':'-2'}, 600);
    	 }, function(){
    		$(this).stop().animate({'opacity' : '1'}, 500);
    		$(this).parent().stop().animate({'left':'-92'}, 700);
    	});

    	//==============================End of Comic==============================================//

    },
    exit: function() {
    	//$('#header .region-inner').append(langBl);
      
    }
  });

  
  jRes.addFunc({
    breakpoint: 'laptop',
    enter: function() {
    	$('.menu-holder').addClass('desktop');
    	// Menu Append 
    	$('.menu-holder').fadeIn(500);
    	$('.gp-menu-overlay').remove();
    },
    exit: function() {
    	
    }
  });


  var bCaret = '<span class="b-caret"></span>'
  $(".mobile .menu-holder ul#sdt_menu_mobile li.expanded ").each(function(event) {
  		$(this).append(bCaret);
  });

  $(".mobile .menu-holder .content > ul#sdt_menu_mobile > li > .b-caret, .mobile .menu-holder .content > ul#sdt_menu_mobile > li.expanded > a").click(function(event) {

  	if($(this).hasClass('menu_icon')) {
  		event.preventDefault();
  	}
		if($(this).hasClass('active-trail')) {
			$(this).addClass('bdown');
			$(this).removeClass('active-trail');
		}

  	if($(this).hasClass('bdown') || $(this).hasClass('active-trail') ){
  		$(this).siblings('ul.menu').hide();
  		$(this).siblings('a').removeClass('active-trail');
  		$(this).parents('li').removeClass('active-trail');
  		$(this).removeClass('bdown');
  		//
  	}else{

	  	$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul").hide();
	  	$(".mobile .menu-holder ul#sdt_menu_mobile > li a").removeClass('active-trail');
	  	$(".mobile .menu-holder ul#sdt_menu_mobile > li a").removeClass('active');
	  	$(".mobile .menu-holder ul#sdt_menu_mobile > li").removeClass('active-trail');
	  	$(this).addClass('bdown');
	  	$(this).addClass('active-trail');
	  	$(this).siblings('ul.menu').show();
	  	$(this).siblings('a').addClass('active-trail');
	  	$(this).parents('li').addClass('active-trail');
  	}
  }).unbind('hover mouseenter mouseleave', function(event) {
  	
  });



  $(".mobile .menu-holder .content > ul#sdt_menu_mobile > li > ul.menu > li.expanded > .b-caret").click(function(event) {
  		event.preventDefault();

  		  	if($(this).hasClass('bdown') ){
  		  		$(this).siblings('ul.menu').hide();
  		  		$(this).siblings('a').removeClass('active-trail');
  		  		$(this).parent('li').removeClass('active-trail');
  		  		$(this).removeClass('bdown');
  		  		//
  		  	}else{

  			  	$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li > ul").hide();
  			  	$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li > a").removeClass('active-trail');
  			  	$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li > a").removeClass('active');
  			  	$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li ").removeClass('active-trail');
  			  	$(this).addClass('bdown');
  			  	$(this).siblings('ul.menu').show();
  			  	$(this).siblings('a').addClass('active-trail');
  			  	$(this).parent('li').addClass('active-trail');
  		  	}
  });

  $('.mobile .menu-holder .content > ul#sdt_menu_mobile > li.expanded > ul.menu > li.expanded > a').click(function(event) {
  	/* Act on the event */
  	event.preventDefault();
  	if($(this).hasClass('bdown') || $(this).hasClass('active-trail') ){
  		$(this).siblings('ul.menu').hide();
  		$(this).siblings('a').removeClass('active-trail');
  		$(this).parent('li').removeClass('active-trail');
  		$(this).removeClass('bdown');
  		$(this).removeClass('active-trail');
  	}else {
  		$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li > ul").hide();
  		$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li > a").removeClass('active-trail');
  		$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li > a").removeClass('active');
  		$(".mobile .menu-holder ul#sdt_menu_mobile > li > ul > li ").removeClass('active-trail');
  		$(this).addClass('bdown');
  		$(this).addClass('active-trail');
  		$(this).siblings('ul.menu').show();
  		$(this).siblings('a').addClass('active-trail');
  		$(this).parent('li').addClass('active-trail');
  	}

  });



  // ====================================== JRespond Clone end =====================================================//      
                
 	if($('.ei-slider-thumbs li').length < 6) {
  	$('.block-frontslider .ei-slider .ei-slider-thumbs').css('overflow','hidden');
	}          
                
                
                
            
	});
        
	
	function accordionMenu() {	    
	    
	    $('.accordion-content .view-content .item-list > ul' ).addClass("accordion-menu");

	    $('.accordion-menu .accordion-detail').hide();

	    $('.accordion-menu li a').click(
		  
	    function(e) {
		
	      var checkElement = $(this).next();

	      if((checkElement.is('.accordion-detail')) && (checkElement.is(':visible'))) {

				    $('.accordion-menu .accordion-detail:visible').slideToggle(400, function (){

					    $(this).parent().find('a').removeClass("up-arro");

				    });

			    return false;

		    }

	      if((checkElement.is('.accordion-detail')) && (!checkElement.is(':visible'))) {

			    $('.accordion-menu .accordion-detail:visible').slideUp('slow');

			    $('.accordion-menu .accordion-detail:visible').parent().find('a').removeClass("up-arro");

			    checkElement.slideDown('normal');

			    $(this).parent().find('a').addClass("up-arro");

		    return false;

		    }
		   e.preventDefault(); 
	      }

	    );

	};
 function mycarousel_initCallback(carousel)
    {
        // Disable autoscrolling if the user clicks the prev or next button.
        carousel.buttonNext.bind('click', function() {
           
            carousel.startAuto();
        });

        carousel.buttonPrev.bind('click', function() {
            carousel.startAuto();
        });

        // Pause autoscrolling if the user moves with the cursor over the clip.
        carousel.clip.hover(function() {
            carousel.stopAuto();
        }, function() {
            carousel.startAuto();
        });
    };

       
	
	
	

})(jQuery)