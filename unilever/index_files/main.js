// JavaScript Document


//Main JS Starts
$(document).ready(function(e) {

	//BEOF SCRIPT FOR SUBSCRIBE POPUP SET COOKIE
	
	subscriberVisited = $.cookie('subsVisited');
	//var expireTime = new Date();
	//expireTime.setTime(expireTime.getTime() + (1 * 60000));
	
	if(typeof subscriberVisited == "undefined") {
		$.cookie('subsVisited', '1', { expires: 1, path: '/' });
		subscriberVisited = $.cookie('subsVisited');
	}
	if(subscriberVisited == 1) {
		openSubscribeBox();
		subscriberVisited = $.cookie('subsVisited');
	}
	function openSubscribeBox() {
	if($('.newMainWrapper').length==1){
			setTimeout(function(){
				if ($(".subscribePopup").is(":visible") == false) {
					$('.whiteOverlaySubscribe').fadeIn();
					$('html,body').css('overflow','hidden');
					$('.subscribePopup').fadeIn();
					$('.innerSubscribe').fadeIn();
					$.cookie('subsVisited', '2', { expires: 1, path: '/' });
				}
			},30000);
		}
	}
	
	$('.subscribeBtn').click(function(){
		$('.whiteOverlaySubscribe').fadeIn();
		$('html,body').css('overflow','hidden');
		$('.subscribePopup').fadeIn();
		$('.innerSubscribe').fadeIn();
	});
	$('.thankYouSubscribe .closeButton').click(function(){
		$('.thankYouSubscribe').fadeOut();
		$('.whiteOverlaySubscribe').fadeOut();
		$('html,body').css('overflow','visible');
	});
	$('.closeButton').click(function(){
		$('.whiteOverlaySubscribe').fadeOut();
		$('html,body').css('overflow','visible');
		$('.subscribePopup').fadeOut();
	});
	/*$('.iLove ul li').click(function(){
		$('.iLove ul li').removeClass('selected');
		$(this).addClass('selected');
		var rel = $(this).attr('rel') ;
		console.log(rel);
	});*/
	var count = 0;
	$('.iLove ul li').click(function(){
		count++;
		if(count == 1 || count == 2){
		$(this).addClass('selected');
		}
		if(count > 2) { 
		$('.iLove ul li').removeClass('selected');
		$(this).addClass('selected');
		count = 1;
		}
		var rel = $(this).attr('rel') ;
		//console.log(rel);
	});
	//EOF SCRIPT FOR SUBSCRIBE POPUP SET COOKIE
	
	var vid = document.getElementById("playVideo"); 
	
	
	$('#knowMore').click(function(){
		vid.play();
		$('.whiteOverlay').fadeIn();
		$('html,body').css('overflow','hidden');
		$('.popUpOverlayVideo').fadeIn();
	});
	
	$('.closeBtn1').click(function(){
		$('.popUpOverlayVideo').fadeOut();
		$('.whiteOverlay').fadeOut();
		$('html,body').css('overflow','visible');
		$('.replayBtn').css('display','none');
		vid.pause(); 
	});
	
	
	if(typeof vid !== 'undefined' && vid !== null) {
	vid.onended =function(){
		//$('.popUpOverlayVideo').fadeOut();
//		$('.popUpOverlay').fadeOut();
//		$('.whiteOverlay').fadeOut();
//		$('html,body').css('overflow','visible');
		$('.replayBtn').css('display','block');
	};	
	}
	$('.replayBtn').click(function(){
		vid.play();
		$('.replayBtn').css('display','none');
	});
	
	//BEOF SCRIPT FOR POPUP COOKIE SET
	visited = $.cookie('_visited');
	//var expireTime = new Date();
	//expireTime.setTime(expireTime.getTime() + (1 * 60000));
	
	if(typeof visited == "undefined") {
		$.cookie('_visited', '1', { expires: 1, path: '/' });
		visited = $.cookie('_visited');
	}
	if(visited == 1) {
		//openPopupbox();
		visited = $.cookie('_visited');
	}
	function openPopupbox() {
			if($('.skinType').length==1){
				setTimeout(function(){
				$('.whiteOverlay').fadeIn();
				$('html,body').css('overflow','hidden');
				$('.popUpOverlay').fadeIn();
				$.cookie('_visited', '2', { expires: 1, path: '/' });
				},30000);	
				
				$('.closeBtn').click(function(){
				$('.popUpOverlay').fadeOut();
				$('.whiteOverlay').fadeOut();
				$('html,body').css('overflow','visible');
				});
		}
	}
	
	//EOF SRIPT FOR POPUP COOKIE SET
	
	$('.header_nav .ddLink').mouseenter(function(){
		var linkRel = $(this).attr('rel');
		$('.menuDDPopup').hide();
		$('.'+linkRel).stop().slideDown();
	});
	
	$('.header_nav .noDD').mouseenter(function(){
		$('.menuDDPopup').hide();
	});
	
	$('.header_nav .menuDDPopup').mouseleave(function(){
		$('.menuDDPopup').hide();
	});
	
	$('.subCatLinks a').mouseenter(function(){
		var linkRel = $(this).attr('rel');
		$(this).parent().parent().find('.articleRHS').hide();
		$('.'+linkRel).show();
		$(this).parent().parent().find('.subCatLinks a').removeClass('selected');
		$(this).addClass('selected');
	});
	
	//Header Downdow
	$('#header li').mouseenter(function(){
		$(this).find('.submenuWrapper').stop().slideDown();
	});
	
	$('#header li').mouseleave(function(){
		/*$(this).find('.submenuWrapper').stop().slideUp();*/
		$(this).find('.submenuWrapper').stop().hide();
	});
	//Header Dropdown Ends
	
	//Login Singup Popup Starts
	$('.loginSignup').click(function(){
		$('.loginSignupPopup').slideToggle();
		$(this).toggleClass('activePop');
		$('.loginPop').show();
		$('.signupPop').hide();
		
	});
	
	$('.singupOpen').click(function(){
		$('.loginPop').hide();
		$('.signupPop').fadeIn();
	});
	
	$('.loginOpen').click(function(){
		$('.signupPop').hide();
		$('.loginPop').fadeIn();
	});
	//Login Singup Popup Ends
	
	//Search Starts
	//Search
	$('.searchTxtBx').focus(function() {
		/*$('.searchWrapper').addClass('lightBxWrapper');
		$('.searchHeight').css({'padding-top': $('.searchWrapper').outerHeight()});
		$('.searchOpen').slideDown(500, function(){
			$('.searchOpen').css({'height':$(window).height()})	
		});
		$('html,body').animate({
		  scrollTop: $('.searchWrapper').offset().top - 20+'px'
		}, 1000);
		$('.searchCross').fadeIn(100);*/
	});
	
	$('.searchIcon').click(function(){
		
		var enter = $('.searchTxtBx').val();
		if(!enter == "") {
			$('.languageDrop').hide();
			$('.searchWrapper').addClass('lightBxWrapper');
			$('.searchOpen').slideDown(500, function(){
				//$('.searchOpen').css({'height':$(window).height()})	;
				
				$('.lightBxWrapper').css({'height':$(window).height()});
			});
			$('html,body').animate({
			  scrollTop: $('.searchWrapper').offset().top
			}, 1000);
			$('.searchCross').fadeIn(100);
			$('.searchTxtBx').removeClass('errBx');
			$('.searchHeight').css({'padding-top': $('.searchWrapper').outerHeight()});
		}else{
			$('.searchTxtBx').addClass('errBx');
		}
	});
	$('.searchCross').click(function(){
		$('.languageDrop').fadeIn();
	});
	//Search Ends
	
	if($('.homepageWrapper').length){
		
		var dd = new DropDown( $('#videoDropDown') );
		
		$('.homepageSlider').bxSlider({
		  pager:false,
		  speed:1000,
		  auto:true,
		  pause:5000,
		  autoHover:false
		});
		
		/*hover states articles*/
		$('.articleSlugHP').mouseenter(function(){
			$(this).find('.articleContentPop p').slideDown();
		});
		
		$('.articleSlugHP').mouseleave(function(){
			$(this).find('.articleContentPop p').stop().slideUp();
		});
		
		$('.ballotBxslider').bxSlider({
			pager:false,
			speed:750,
			auto:false
		});
		
		$('.theBeautyBoxSlider').bxSlider({
			pager:false,
			speed:750,
			auto:false
		});
		
		//Homepage LHS
	  /*$('body').height($(document).height());*/
	
		var fixedHeaderShown = false;
		var fixedHeader = $("#fixedLHS");
		
		$(window).scroll(function(){
			if($('#floatingHeaderTop').length){
				if($(window).scrollTop() >= $('#floatingHeaderTop').offset().top) {
		
				  if(fixedHeaderShown != false) {
					return;
				  }
				  
				  
				  fixedHeader.css({'position':'fixed', 'width':'5%', 'top':$('header').height()}).find('a').css({'width':'94%'});
				  $('header').css({'position':'fixed','background':'#000000'});
				  //$('.searchWrapper').addClass('fixedSearch').css({'top':$('header').height()});
				  //$('.searchWrapper').css({'position':'fixed'});
				  fixedHeaderShown = true;
				  
				} else if(fixedHeaderShown == true) {
				  fixedHeader.css({'position':'absolute','top':'0', 'width':'100%'}).find('a').css({'width':'75%'});
				  $('header').css({'position':'absolute', 'background':'rgba(0,0,0,0.7)'});
				  //$('.searchWrapper').removeClass('fixedSearch').css({'top':'auto'});
				  //$('.searchWrapper').css({'position':'static'});
				  fixedHeaderShown = false;
				}
			}
		//window scroll ends
		});
		
		$('.ui-state-default, .ui-state-disabled').mouseenter(function(){
			$('.tooltip').stop().animate({'left':'30%','opacity':'0'},300);
			$(this).find('.tooltip').stop().animate({'left':'60%','opacity':'1'},300);
		});
		
		$('#fixedLHS').mouseleave(function(){
			$('.tooltip').stop().animate({'left':'30%','opacity':'0'},300);
		});
		
		$( "#sortable" ).sortable({
			cancel: ".ui-state-disabled" 
		 });
		 
		 $('.menuSideTabIcon').click(function(){
			$(this).parent().find('.dropDownItems').slideToggle();
		 });
		 //$( "#sortable" ).disableSelection();
	}
	
	if($('.beautyBoxCtnr').length){
		$('.prodThumbSlider').bxSlider({
		  pager:false,
		  speed:1000,
		  auto:false,
		  maxSlides:3,
		  minSlides:3,
		  infiniteLoop:false
		});
		
		$('.hotFavsCarousel').bxSlider({
			  pager:true,
			  speed:1000,
			  auto:false,
			  maxSlides:1,
			  minSlides:1,
			  moveSlides:1,
			  responsive:true,
			  infiniteLoop:false,
			  controls : false
		});
		
		$('.productCarouselWrapper, #productReviewCarousel').bxSlider({
			  pager:false,
			  speed:1000,
			  auto:false,
			  minSlides:2,
			  maxSlides:3,
			  moveSlides:1,
			  responsive:true,
			  slideWidth:393,
			  infiniteLoop:false
		});
		/*$('.prodThumbSlider li img').click(function(){
			var prodThumb = $(this).attr('src');
			$('.bigImg img').attr('src', prodThumb);
		});*/
	}
	
	if($('.innerpageWrapper').length){
		$('header').addClass('inner').parent().css({'padding-top':$('header.inner').height()});
	}
	
	/*if($('.beautypediaWrapper').length){
		$('.alphabetsWrapper a:first-child').addClass('selected');
		$('.alphabetsWrapper a').click(function(){
			$('.alphabetsWrapper a').removeClass('selected');
			$(this).addClass('selected');
		});	
		
		equalHeight();
	}*/
	
	if($('.trendingWrapper').length){
		$('.photoTrendCtnr').click(function(){
			$('.detailPopupWrapper').fadeIn();
			$('.detailPopupSlider').bxSlider({
			  pager:false,
			  speed:1000,
			  auto:false
			});
		});
	}
	
	if($('.bloggersBxSlider').length){
		$('.bloggersBxSlider').bxSlider({
		  pager:false,
		  speed:1000,
		  auto:false
		});
	}
	
	//Smooth Scrolling
	  $('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('body,html').animate({
			  scrollTop: target.offset().top
			}, 1000);
			return false;
		  }
		}
	  });
	  
	  if($('.profileContentWrap').length){
		/*hover states articles*/
		$('.articleSlugHP').mouseenter(function(){
			$(this).find('.articleContentPop p').slideDown();
		});
		
		$('.articleSlugHP').mouseleave(function(){
			$(this).find('.articleContentPop p').stop().slideUp();
		});  
	  }
	  
	  if($('.styleFilesWrapper').length){
			$('.pointer').click(function(event){
				$('.popupInfo').hide();
				$(this).parent().parent().find('.popupInfo').fadeIn(500);
				event.stopPropagation();
			});
			
			$('html').click(function() {
				$('.popupInfo').fadeOut(500);
			});  
	  }
	  
	  if($('.beautyQuotientWrapper').length){
			$('.beautyQuotientWrapper .questionForm input').change(function(){
				//console.log('changed');
				$(this).attr('checked', true);
				if($('.beautyQuotientWrapper').last().is(':visible')){
					//console.log('last');
					return false;
					$('.beautyQuotientWrapper').last().show();
				}else{
					$('.beautyQuotientWrapper').hide();
					$(this).closest('.beautyQuotientWrapper').next().show();
					//console.log($(this).closest('.beautyQuotientWrapper').next())
				}
			});
			
			$('.bqNextPrev a').click(function(){
				$('.bqNextPrev a').removeClass('selected');
				$(this).addClass('selected');
				var selectedSlide = $(this).attr('id');
				$('.beautyQuotientWrapper').hide();
				$('.'+selectedSlide).show();
			});
			
			setTimeout(function(){
				$('html,body').animate({
					scrollTop: $('#startSlate').offset().top - ($('header').height())
				},1000);
			},1000);
	  }
	  
	  if($('#personaliseDropDown').length){
		var dd = new DropDown($('#personaliseDropDown'));  
	  }
	  
	  if($('.userProfileWrapper').length){
			$('.userInfoCover').mouseenter(function(){
				$('.changeCover').show();
			});  
			
			$('.userInfoCover').mouseleave(function(){
				$('.changeCover').hide();
			});  
	  }
	  
	  if($('.pin-image-single, .pin-image').length){
		$('.pin-image-single, .pin-image').mouseenter(function(){
			$(this).find('a').animate({'opacity':'1'},500);
		});
		
		$('.pin-image-single, .pin-image').mouseleave(function(){
			$(this).find('a').css({'opacity':'0'});
		});
	  }
	  
	  $('.leaveAComment').click(function(){
		  $('#myContent').slideToggle();
			$( '#disqus_thread iframe' ).each(function () {
				this.style.setProperty( 'height', 'auto', 'important' );
				//console.log('a');
			});
	  });
	  
	  if($('.shopThisStorySlider').length){
		$('.shopThisStorySlider').bxSlider({
		  minSlides: 3,
		  maxSlides: 3,
		  slideWidth: 400,
		  slideMargin:0,
		  pager:false,
		  controls:true,
		  moveSlides:1,
		  infiniteLoop:false
		});  
	  }
	  
	  //GA Event Tracking
	  
	  //Ga for editors shoplist
	  $('.elementAmazonItem').click(function(){
		var elemArticle = $(this).find('.txtTitle').html();
		ga('send', 'event', 'button', 'click', 'Editors Shop List- ' + elemArticle);
		});
	
	
	  $('.beautypediaLinkGA').click(function(){
		  ga('send', 'event', 'button', 'click', 'Beautypedia - Navigation');
	  });
	  
	  $('.atmLogoUnitGA').click(function(){
		  ga('send', 'event', 'button', 'click', 'All things makeup-home page logo');
	  });
	  
	  $('.athLogoUnitGA').click(function(){
		  ga('send', 'event', 'button', 'click', 'All things hair-home page logo');
	  });
	  
	  $('.atsLogoUnitGA').click(function(){
		  ga('send', 'event', 'button', 'click', 'All things skin-home page logo');
	  });
	  
	  $('.lfwLinkGA').click(function(){
		  ga('send', 'event', 'button', 'click', 'Lakme Fashion Week - Navigation');
	  });
	  
	  $('.lfwBannerLinkGA').click(function(){
		  ga('send', 'event', 'button', 'click', 'Lakme Fashion Week - Banner');
	  });
	  
	  $(".beautypediaWidgetLink").click(function(){
		  ga('send', 'event', 'button', 'click', 'beautypedia-bottom');
	  });
	  
	  $(".beautypediaProductOne").click(function(){
		  ga('send', 'event', 'button', 'click', 'beautypedia-product-One');
	  });
	  
	  $(".beautypediaProductTwo").click(function(){
		  ga('send', 'event', 'button', 'click', 'beautypedia-product-Two-Eyeshadow-Pallete');
	  });
	  
	  $(".bloggersGA").click(function(){
		  ga('send', 'event', 'button', 'click', 'bloggers');
	  });
	  
	  $(".amazonGA").click(function(){
		  ga('send', 'event', 'button', 'click', 'amazon.in');
	  });
	  
	  $(".styleslateGA").click(function(){
		  ga('send', 'event', 'button', 'click', 'stylepedia');
	  });
	  
	  $(".galentinesGA").click(function(){
		  ga('send', 'event', 'button', 'click', 'Galentines day- Navigation tab');
	  });
	  //GA
	  //BEOF EVENT TRACKING CODE
		$('#tresemmeConditionerGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day-Tresemme Hair Spa Rejuvenation Conditioner');
			});
		$('#tresemmeShampooGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Tresemme Ionic Strength Shampoo');
			});
		$('#pompomclutchBagGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- KOOVS Giant Pompom Clutch Bag');
			});
		$('#bodycondressGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Metallic Sheen Bodycon Dress');
			});
		$('#dropearringsGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Leaf Drop Earrings');
			});
		$('#nineWestHeelGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Nine West High Heel');
			});
			
		$('#doveShampooGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Dove Hair Fall Rescue Shampoo');
			});
		$('#jabongCropTopGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Alia Bhatt for Jabong crop top');
			});
		$('#whiteSneakersGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Aldo sneakers');
			});
		$('#pineappleBodyBagGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Skinny Dip Pineapple Juice Cross-body Bag');
			});
		$('#multiFlaredSkirtGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Alia Bhatt For Jabong Skirt');
			});
		$('#flowerBraceletGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- KOOVS Flower Chain Bracelet');
			});
		$('#blurEarringsGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Blur Earrings');
			});
		$('#doveConditionerGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Dove Hair Fall Rescue Conditioner');
			});
			
		$('#pondsBBCremeGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Pond’s White Beauty BB+ Cream');
			});
		$('#soupMaxiDressGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- printed maxi dress');
			});
		$('#hashtagClutchGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Puneet Gupta Hashtag Clutch');
			});
		$('#elephantMotifBraceletGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Pipa Bella elephant motif bracelet');
			});
		$('#ankleStrapWedgesGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Wedges Majorbrands');
			});

		$('#lakmeCCCremeGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Lakmé CC Cream');
			});
		$('#skaterDressGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- skater dress');
			});
		$('#tearDropEarringsGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- tear drop earrings from Forever 21');
			});
		$('#snakeskinBagGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- snakeskin box clutch from Koovs');
			});
		$('#stilettoHeelsGA').click(function(){
				ga('send', 'event', 'button', 'click', 'Galentines day- Black Sandals-Steve Madden');
			});
		$('#buyNow').click(function(){
				ga('send', 'event', 'button', 'click', 'Buy Now-Vaseline Healthy White SPF 24');
			});
		$('.submitBtn').click(function(){
			ga('send', 'event', 'button', 'click', 'Subscribe');
		});
		$('.closeButton').click(function(){
			ga('send', 'event', 'button', 'click', 'Subscribe-close');
		});
		$('.knowAll').click(function(){
			ga('send', 'event', 'button', 'click', 'I know all');
		});
		//EOF EVENT TRACKING CODE

//Guest editor Header
$('.guestEditorLinkGA').click(function(){
ga('send', 'event', 'button', 'click', 'Guest Editor Header');
});

//Vaseline Summer Header
$('.vaslineHeaderLinkGA').click(function(){
ga('send', 'event', 'button', 'click', 'Vaseline Summer Header');
});

//Video Lounge
$('.atmVidLoungeGA').click(function(){
	ga('send', 'event', 'button', 'click', 'All Things Makeup – Video Lounge');
});

$('.atsVidLoungeGA').click(function(){
	ga('send', 'event', 'button', 'click', 'All Things Skin – Video Lounge');
});

$('.athVidLoungeGA').click(function(){
	ga('send', 'event', 'button', 'click', 'All Things Hair – Video Lounge');
});

$('.fashionVidLoungeGA').click(function(){
	ga('send', 'event', 'button', 'click', 'Fashion– Video Lounge');
});

$('.viewallVidLoungeGA').click(function(){
	ga('send', 'event', 'button', 'click', 'Video Lounge – View All');
});
	  
	  //GA
$('.takeOverHomeBx .leftTakeOver, .takeOverHomeBx .rightTakeOver').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Takeover Background - Homepage');
});

$('.takeOverHomeBx .takeoverBanner, .lakmeVideo').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Takeover Banner - Homepage');
});

$('.takeOverSkinBx .leftTakeOver, .takeOverSkinBx .rightTakeOver').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Takeover Background - Skin');
});

$('.takeOverSkinBx .takeoverBanner, .lakmeVideo').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Takeover Banner - Skin');
});
$('.closeBtn1.homePg').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Blush & Glow Facewash Ad close button- home');
});
$('.closeBtn1.homePg.hindi').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Blush & Glow Facewash Ad close button- home- Hindi');
});
$('.closeBtn1.homePg.tamil').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Blush & Glow Facewash Ad close button- home- Tamil');
});
$('.closeBtn1.skinPg').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Blush & Glow Facewash Ad close button- Skin');
});
$('.closeBtn').click(function(){
	ga('send', 'event', 'button', 'click', 'Shraddha Kapoor-pop up close button');
});
$('.shrdhaGlow').click(function(){
	ga('send', 'event', 'button', 'click', 'Shraddha Kapoor-Find out button');
});
$('.homepageNewWrapper #knowMore').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Blush and Glow Facewash Ad-pop-up');
});
$('#knowMore').click(function(){
	ga('send', 'event', 'button', 'click', 'Lakme Blush and Glow Facewash Ad-pop-up - Skin');
});
$('.pondsLeftTakeOver').click(function(){
	ga ('send', 'event', 'home', 'click', 'Left Ad Space');
});
$('.pondsRightTakeOver').click(function(){
	ga ('send', 'event', 'home', 'click', 'Right Ad Space');
});
$('.pondsMidTakeover').click(function(){
	ga ('send', 'event', 'home', 'click', 'Mid Ad Banner');
});

/* Ponds Takeover*/
if($('.pondsHeadermainWrapper').length){
			setTimeout(function(){ //start animating after 1s
			
				$('#01').fadeOut(500);
				$('#02').animate({opacity:1},'slow', function(){
					setTimeout(function(){
						$('#03').animate({opacity:1,left:'25%'},'slow', function(){
							setTimeout(function(){
								$('#02').animate({opacity:0});
								$('#03').animate({opacity:0}, function(){
									setTimeout(function(){
										$('#04').animate({opacity:1}, function(){
											setTimeout(function(){
												$('#05').animate({opacity:1,right:'35%'}, function(){
													$('#06').animate({opacity:1,right:'15%'});
													$('.replayButton').fadeIn(3000);
												});
											},200);
										});
									},500);
								});
								
							},2000);
						});
					},500);
				});
			},2000);
	
			$('.replayButton').click(function() {
		
			  setTimeout(function(){
				$('.replayButton').hide();
				$('#06').fadeOut(500);
				$('#05').fadeOut(500);
				$('#04').fadeOut(500);
				$('#01').fadeIn(1000, function() {
						setTimeout(function() {
						$('#01').fadeOut(500);	
						$('#02').animate({opacity:1},'slow', function(){
							setTimeout(function(){
								$('#03').animate({opacity:1,left:'25%'},'slow', function(){
									setTimeout(function(){
										$('#02').animate({opacity:0});
										$('#03').animate({opacity:0}, function(){
											setTimeout(function(){
												$("#04").css({"opacity":"0","display":"block",}).show().animate({opacity:1},function(){
													setTimeout(function(){
														$('#05').css({"opacity":"0","display":"block","right":"32%"}).show().animate({opacity:1,right:'35%'}, function(){
															$('#06').css({"opacity":"0","display":"block","right":"12%"}).show().animate({opacity:1,right:'15%'});
															$('.replayButton').fadeIn(3000);
														});
													},200);
												});
											},500);
										});
										
									},2000);
								});
							},500);
						});
						},2000);
				});
			  },0);
			  
			});
	

}

	// if hash is subscribe then show popup
		if (location.hash === "#subscribe") {
			$(".subscribe").trigger( "click" );
		}



});

$(window).load(function(){
	var height= $('.rhsWrap').innerHeight();
	$('.middleWrap').css('height',height);

	if($('.beautyBxAll').length){
		  var currentTallest = 0,
			 currentRowStart = 0,
			 rowDivs = new Array(),
			 $el,
			 topPosition = 0;
		
		 $('.beautyBxAll .productCarousel #allProductsListing li').each(function() {
		
		   $el = $(this);
		   topPostion = $el.position().top;
		   
		   if (currentRowStart != topPostion) {
		
			 // we just came to a new row.  Set all the heights on the completed row
			 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			   rowDivs[currentDiv].height(currentTallest);
			 }
		
			 // set the variables for the new row
			 rowDivs.length = 0; // empty the array
			 currentRowStart = topPostion;
			 currentTallest = $el.height();
			 rowDivs.push($el);
		
		   } else {
		
			 // another div on the current row.  Add it to the list and check if it's taller
			 rowDivs.push($el);
			 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		
		  }
		   
		  // do the last row
		   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			 rowDivs[currentDiv].height(currentTallest);
		   }
		   
		 });
	  }
	
	if($('.homepageWrapper').length){
		/*Equal height of articles to match height*/
		$('.articleImg').each(function(){
			//$(this).animate({'height':$(this).find('img').height(), 'margin-bottom':$(this).parent().find('.popDown').height() + $(this).parent().find('.articleContentPop').height()},function(){
				//equalHeight();
				//$('.botSlug.articleSlugHP').css({'height':$('.theBeautyBoxHP').height() + ($('.topSlug').height() - $('.beautypediaSlugHP').height())});
				//$('.botSlug.articleSlugHP, .botSlug.ballotBoxHP').css({'padding-bottom': $('.topSlug').height() - $('.theBeautyBoxHP ').height() - 5+'px' }) ;
			//});
		});
		$('.videosSlider').bxSlider({
			pager:false,
			speed:1000,
			auto:false,
			pause:5000,
			autoHover:false,
			minSlides: 3,
			maxSlides: 3,
			moveSlides: 1,
			infiniteLoop:true,
			mode:'vertical',
			onSliderLoad: function () {
				$('.videosRHS, .videosRHS .bx-wrapper').height($('.videosLHS').outerHeight());
		   }
		});
		$('.videosRHS, .videosRHS .bx-viewport').height($('.videosLHS').outerHeight())
	}
	//Article Listing
	if($('.articleListingWrapper, .profileContentWrap').length){
		
		var articleBxSliderWidth = $(window).width() / 5 + 'px';
		
		$('.articleBxSlider').bxSlider({
			pager:false,
			speed:1000,
			auto:false,
			pause:5000,
			autoHover:false,
			minSlides: 3,
			maxSlides: 3,
			slideWidth: articleBxSliderWidth,
			slideMargin: 0,
			moveSlides: 1,
			infiniteLoop:true,
			onSlideBefore: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
			//console.log(currentSlideHtmlObject);
			$('.active-caption').removeClass('active-caption');
			$('.articleBxSlider>li').eq(currentSlideHtmlObject + 4).addClass('active-caption')
			$('.articleBxSlider>li').eq(currentSlideHtmlObject + 5).addClass('active-caption')
			$('.articleBxSlider>li').eq(currentSlideHtmlObject + 6).addClass('active-caption')
			},
			onSliderLoad: function () {
				$('.articleBxSlider>li').eq(4).addClass('active-caption')
				$('.articleBxSlider>li').eq(5).addClass('active-caption')
				$('.articleBxSlider>li').eq(6).addClass('active-caption')
		   }
		});
		$('.articleBxSlider').width($('.articleBxSlider>li').length * $('.articleBxSlider>li').width()).height('100%');
		//$('.articleBxSlider li').css({'width':$(window).width() / 5});
		
		$('.articleImgWrapper').each(function(){
				//$(this).height($(this).parent().find('.articleRHS').height());
				//console.log($('.articleRHS').height());
				//$('.articleBxSlider li').height($('.articleBxSlider').parent().height())
		});
	}
	
	
	//Article Innerpage
	if($('.carouselArticle').length){
		function setNavi( $c, $i ) {
			var title = $i.attr( 'alt' );
			$('#title').text( title );
			//console.log($i.find('.mainImg'));
			var current = $c.triggerHandler( 'currentPosition' );
			$('#pagenumber span').text( current+1 );
	
			var $prev = ($i.is(':first-child')) ? $c.children().last() : $i.prev();
			var small = $prev.find('.mainImg').attr('src').split('/large/').join('/small/');
			$('#prev').html('<img src="'+small+'" />');
	
			var $next = $i.next();
			var small = $next.find('.mainImg').attr('src').split('/large/').join('/small/');
			$('#next').html('<img src="'+small+'" />');
		}
		$("#carousel").carouFredSel({
			items: 1,
			//responsive:true,
			width: '100%',
			pagination: {
				container: '#pager span',
				anchorBuilder: function( nr ) {
					var small = $(this).attr('src').split('/large/').join('/small/');
					return '<a href="#" title="Go to image '+nr+'.">'+nr+'<img src="'+small+'" /></a>';
				}
			},
			auto : {
				play: false
			},
			scroll: {
				onBefore: function( data ) {
					setNavi( $(this), data.items.visible );
				},
				duration : 500,
				items: 1
			},
			onCreate: function( data ) {
				setNavi( $(this), data.items );
			},
			prev:{
				key : "left",
				button: "#prev"
			},
			next:{
				key : "right",
				button : "#next"
			}
		});
		
		$('#prev').click(function(){
			$('#prev2').click();
		});
		
		$('#next').click(function(){
			$('#next2').click();
		});
		
		
		$('.caroufredsel_wrapper').css({'width':$('.mainImg').width(), 'height':$('.mainImg').height()});
		$('#carousel').css({'width':$('.mainImg').width()*$(".mainImg").length, 'height':$('.mainImg').height()});

		$('#carouselContent').carouFredSel({
			responsive:true,
			width: '100%',
			items: 1,
			auto : {
				play: false
			},scroll: {
				duration : 500,
				items: 1,
				fx:'fade'
			},
			prev:{
				key : "left",
				button: "#prev2"
			},
			next:{
				key : "right",
				button : "#next2"
			}
		}).trigger('resize');
	}
	
	if($('.beautypediaWrapper').length){
		equalHeight();
	}
	
	var dd = new DropDown( $('#expertDropDown') );
	
	/*editors team*/
	if($('.editorsBlocks').length){
		$.Isotope.prototype._getMasonryGutterColumns = function() {
		var gutter = this.options.masonry.gutterWidth || 0;
		containerWidth = this.element.parent().width();
		this.masonry.columnWidth = this.options && this.options.masonry.columnWidth ||
		  this.$filteredAtoms.outerWidth(true) ||
		  containerWidth;
		this.masonry.columnWidth += gutter;
		this.masonry.cols = Math.floor(containerWidth / this.masonry.columnWidth);
		this.masonry.cols = Math.max(this.masonry.cols, 1);
	  };
 
	  $.Isotope.prototype._masonryReset = function() {
		this.masonry = {};
		this._getMasonryGutterColumns();
		var i = this.masonry.cols;
		this.masonry.colYs = [];
		while (i--) {
		  this.masonry.colYs.push( 0 );
		}
	  };
	 
	  $.Isotope.prototype._masonryResizeChanged = function() {
		var prevColCount = this.masonry.cols;
		this._getMasonryGutterColumns();
		return ( this.masonry.cols !== prevColCount );
	  };
	 
	  $.Isotope.prototype._masonryGetContainerSize = function() {
		var gutter = this.options.masonry.gutterWidth || 0;
		var unusedCols = 0,
		  i = this.masonry.cols;
		while ( --i ) {
		  if ( this.masonry.colYs[i] !== 0 ) {
			break;
		  }
		  unusedCols++;
		}
		return {
		  height : Math.max.apply( Math, this.masonry.colYs ),
		  width : ((this.masonry.cols - unusedCols) * this.masonry.columnWidth) - gutter
		};
	  };

	$('#editorsBlocks').isotope({
		  // options
		  itemSelector : '.item',
		  masonry: {
			gutterWidth: 20
		  }
	});  
		}
	
	
	//Fixed sidebar
	  if($('.detailContentWrap').length){
		$('.detailRHS').css({
			'position':'absolute',
			'right':'0',
			'height':$('.detailLHS').height()
		});
		
		var length = $('.detailRHS').height() - $('.fullWidthWidget').height() + $('.detailRHS').offset().top;
		var RHSWidth = $('.detailRHS').width() + 'px'
	
		$(window).scroll(function () {
	
			var scroll = $(this).scrollTop();
			var height = $('.fullWidthWidget').height() + 'px';
	
			if (scroll < $('.detailRHS').offset().top) {
	
				/*$('.fullWidthWidget').css({
					'position': 'absolute',
					'top': '1em',
					'width': RHSWidth
				});*/
	
			} else if (scroll > length) {
	
				/*$('.fullWidthWidget').css({
					'position': 'absolute',
					'bottom': '0',
					'top': 'auto',
					'width': RHSWidth
				});*/
	
			} else {
	
				/*$('.fullWidthWidget').css({
					'position': 'fixed',
					'top': '1em',
					'height': height,
					'width': RHSWidth
				});*/
	
			}
		});  
	  }
	  //Fixed sidebar Ends
	  
	  /*setTimeout(function(){
		 $('.newMainWrapper').css({'margin-bottom':$('footer').outerHeight(), 'margin-top':$('.new_mainHeader').outerHeight()}); 
	  },1000);*/
	  
	  // $('.newMainWrapper').css({'margin-bottom':$('footer').outerHeight(), 'margin-top':$('.new_mainHeader').outerHeight()}); 
});

$(document).ready(function()
{
	$(window).resize(function() {
		$('.newMainWrapper').css({'margin-bottom':$('footer').outerHeight(), 'margin-top':$('.new_mainHeader').outerHeight()}); 
	});
	setTimeout(function(){
		$(window).trigger('resize');
	},4000);
});

$(window).resize(function(){

	if($('.beautypediaWrapper').length){
		equalHeight();
	}
	
	if($('.editorsBlocks').length){
		$('#editorsBlocks').isotope({
			  // options
			  itemSelector : '.item',
			  masonry: {
				gutterWidth: 20
			  }
		}); 
	}
	
});

//Dropdown
	function DropDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;
	
			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				return false;
			});
	
			obj.opts.on('click',function(){
				var opt = $(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text('' + obj.val);
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	}
	
equalHeight = function(){
	var currentTallest = 0,
		 currentRowStart = 0,
		 rowDivs = new Array(),
		 $el,
		 topPosition = 0;
	
	 $('.alphabetsWrapper li').each(function() {
	
	   $el = $(this);
	   topPostion = $el.position().top;
	   
	   if (currentRowStart != topPostion) {
	
		 // we just came to a new row.  Set all the heights on the completed row
		 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		   rowDivs[currentDiv].height(currentTallest);
		 }
	
		 // set the variables for the new row
		 rowDivs.length = 0; // empty the array
		 currentRowStart = topPostion;
		 currentTallest = $el.height();
		 rowDivs.push($el);
	
	   } else {
	
		 // another div on the current row.  Add it to the list and check if it's taller
		 rowDivs.push($el);
		 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	
	  }
	   
	  // do the last row
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		 rowDivs[currentDiv].height(currentTallest);
	   }
	   
	 });	
	 
	 $('.topSlug').each(function() {
	
	   $el = $(this);
	   topPostion = $el.position().top;
	   
	   if (currentRowStart != topPostion) {
	
		 // we just came to a new row.  Set all the heights on the completed row
		 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		   rowDivs[currentDiv].height(currentTallest);
		 }
	
		 // set the variables for the new row
		 rowDivs.length = 0; // empty the array
		 currentRowStart = topPostion;
		 currentTallest = $el.height();
		 rowDivs.push($el);
	
	   } else {
	
		 // another div on the current row.  Add it to the list and check if it's taller
		 rowDivs.push($el);
		 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	
	  }
	   
	  // do the last row
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		 rowDivs[currentDiv].height(currentTallest);
	   }
	   
	 });	
	 
	 $('.botSlug').each(function() {
	
	   $el = $(this);
	   topPostion = $el.position().top;
	   
	   if (currentRowStart != topPostion) {
	
		 // we just came to a new row.  Set all the heights on the completed row
		 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		   rowDivs[currentDiv].height(currentTallest);
		 }
	
		 // set the variables for the new row
		 rowDivs.length = 0; // empty the array
		 currentRowStart = topPostion;
		 currentTallest = $el.height();
		 rowDivs.push($el);
	
	   } else {
	
		 // another div on the current row.  Add it to the list and check if it's taller
		 rowDivs.push($el);
		 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	
	  }
	   
	  // do the last row
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		 rowDivs[currentDiv].height(currentTallest);
	   }
	   
	 });	
	 
	 $('.bbBloggersBlogs li').each(function() {
	
	   $el = $(this);
	   topPostion = $el.position().top;
	   
	   if (currentRowStart != topPostion) {
	
		 // we just came to a new row.  Set all the heights on the completed row
		 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		   rowDivs[currentDiv].height(currentTallest);
		 }
	
		 // set the variables for the new row
		 rowDivs.length = 0; // empty the array
		 currentRowStart = topPostion;
		 currentTallest = $el.height();
		 rowDivs.push($el);
	
	   } else {
	
		 // another div on the current row.  Add it to the list and check if it's taller
		 rowDivs.push($el);
		 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	
	  }
	   
	  // do the last row
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		 rowDivs[currentDiv].height(currentTallest);
	   }
	   
	 });
}

function hideSearchBox(){
	$('.searchOpen').slideUp(250,function(){
		$('.searchWrapper').removeClass('lightBxWrapper').css({'height':'auto'});
		$('.searchCross').fadeOut(100);
		$('.searchHeight').css({'padding-top': '0'});
	});
}

$(window).scroll(function(){
	if($(window).scrollTop() >= $('.new_mainHeader').outerHeight()){
		$('footer').css({'z-index':'1'});	
	}else{
		$('footer').css({'z-index':'0'});
	}
});

/*Go live with this post infinite scroll
if($('.OUTBRAIN').length){
	$(window).scroll(function(){
		var ws = $(window).scrollTop();
		var ot = $('.divOffset').offset().top;
		var fo = $(document).height() - $(window).height()*1.5
		if(ws >= ot && ws <= fo){
			//$('.OUTBRAIN').css({'position':'fixed','top':'0'});
			$('.OUTBRAIN').css({'top':$(window).scrollTop() - ($('.new_mainHeader').outerHeight() + $('.header_nav').outerHeight() + $('.atm_listingBx').outerHeight() + $('.breadcumbsBx').outerHeight() + $('.ias-trigger').outerHeight() + $('.amazonLHSWidget').outerHeight()) + 'px', 'position':'absolute', 'left':'5%'});
			console.log('if');
		}else if(ws >= fo){
			$('.OUTBRAIN').css({'top':$(document).height() - $(window).height()*2.4});
			console.log('else if');
		}else{
			$('.OUTBRAIN').css({'top':'0', 'position':'static'});
			console.log('else');
		}
	});	
}*/

//Takeover Aviance

$(window).load(function(){
	if($('.takeOverWrapper').length){
	var msie6 = $.browser == 'msie' && $.browser.version < 7;
	
	if (!msie6 && $('.leftTakeOver').offset()!=null) {
		var top = $('.leftTakeOver').offset().top + $('.new_mainHeader').outerHeight();
		var height = $('.leftTakeOver').height();
		var winHeight = $(window).height();	
		var footerTop = $('footer').offset().top;
		var gap = 0;
		
			$(window).scroll(function (event) {
				// what the y position of the scroll is
				var y = $(this).scrollTop();			
				// whether that's below the form
				//if (y+winHeight >= top+ height+gap && y+winHeight<=footerTop) {
				if($(window).scrollTop() >= ($('.new_mainHeader').outerHeight() + $('.header_nav').outerHeight()) +($('.leftTakeOver').outerHeight() - $(window).height()) && $(window).scrollTop() <= $(document).height() - $(window).height() - $('footer').outerHeight()){
					// if so, ad the fixed class
					//$('.leftTakeOver, .rightTakeOver').addClass('leftTakeOverfixed').css('top',winHeight-height-gap +'px');
					$('.leftTakeOver, .rightTakeOver').addClass('leftTakeOverfixed');
					$('.leftTakeOver, .rightTakeOver').removeClass('leftTakeOverAbsolute');
					//console.log('if');
				 }else if($(window).scrollTop() >= $(document).height() - $(window).height() - $('footer').outerHeight()){
					// otherwise remove it
					$('.leftTakeOver, .rightTakeOver').removeClass('leftTakeOverfixed');
					$('.leftTakeOver, .rightTakeOver').addClass('leftTakeOverAbsolute');
					//console.log('else');
				}else{
					// otherwise remove it
					$('.leftTakeOver, .rightTakeOver').removeClass('leftTakeOverfixed').css('top','0');
					$('.leftTakeOver, .rightTakeOver').removeClass('leftTakeOverAbsolute').css('top','0');
					//console.log('else');
				}
			});
		}  
	}
});

if($('.takeOverHomeBx').length){}

$(document).ready(function() {
    /* Vaseline Spray Takeoer */
	  $('.vaselineSprayWrapper').click(function(){
		  $('.vaselinePopUpOverlay').fadeIn('slow');
	  });
	  
	  $('.vaselinePopUpOverlay span').click(function(){
		  $('.vaselinePopUpOverlay').hide();
	  });
	  
	  $('.vaselineSprayWrapper').click(function(){
		 ga ('send', 'event', 'home', 'click', 'Mid Ad Banner-Vaseline Video');
	  });
	  
	  $('.vaselinePopUpOverlay span').click(function(){
		   ga ('send', 'event', 'home', 'click', 'Vaseline Video Close');
	  });
	  
	  $('.leftBanner').click(function(){
		   ga ('send', 'event', 'home', 'click', 'Left Ad-Vaseline');
	  });
	  
	  $('.rightBanner').click(function(){
		   ga ('send', 'event', 'home', 'click', 'Right Ad-Vaseline');
	  });
});

$(document).keyup(function(e) {
    if (e.which == 27) {
        $(".vaselinePopUpOverlay").hide(); 
    }
});
//Main JS Ends