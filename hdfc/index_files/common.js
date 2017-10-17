var hnwsliderlisize;
var hnwsliderliwidth;
var hnwsliderindex;
var checkceebox = false;
$(document).ready(function () {
		//code to remove Chat now and Click2Talk - start
		$('.rightcol .bluebox .content').eq(0).removeClass('one');
		$('.rightcol .bluebox .content').eq(0).removeClass('two');
		$('.rightcol .bluebox .content').each(function(){			
			var htmlText = $(this).find('p a').html();
			if (htmlText == 'Chat now' || htmlText == 'Chat Now' || htmlText == 'Click2Talk'){
				var index = $(this).index();
				$(this).hide();	
				if (index == 0){
					$('.rightcol .bluebox .content').eq(1).removeClass('one');
					$('.rightcol .bluebox .content').eq(1).removeClass('two');
				}				
			}			
		})
		//code to remove Chat now and Click2Talk - end
		/*For new login in inner pages - start*/
		$('.mainlistlogin').each(function(){	
			$(this).click(function(){		
				$(this).find('.radiobtn span').addClass('cheked').parents('li').siblings().find('.radiobtn span').removeClass('cheked');			
			})
		})		
		/*For new login in inner pages - end*/
		$(".loginetbank").click(function(){
			 $(this).parents('.mainloginBox').addClass('loginOpen').find('.logindrpdwn').slideDown(500);
		 });
		  $(".loginClose").click(function(){
			 $(this).parents('.mainloginBox').removeClass('loginOpen').find('.logindrpdwn').slideUp(500);
		 });
    /*Select code*/
	$(".login_panel .selectWrapper .loginOption li").each(function(){
		if($(this).hasClass("selected"))
		{
			$(this).parents('.selectWrapper').find(".selectedvalue").html($(this).html());	
		}
	});	
	$(".selectWrapper select").bind('change', function(){
		$(this).prev().html($(this).find('option:selected').text());
					
	});
	$('.login_panel .selectedvalue').click(function(){
		$(this).next('.expand').slideToggle()
        $(this).toggleClass('active'); /* Added on 17-08-16 by J*/
	})
	$('.login_panel .expand').click(function(){
		$(this).slideUp()
		$('.login_panel .selectedvalue').toggleClass('active');
	})
	$('.login_panel .expand .loginOption li').click(function(){
		$(this).addClass('selected').siblings().removeClass('selected')
		$(this).parents('.selectWrapper').find(".selectedvalue").html($(this).html());
	})
	/*Select code*/
	
	
	/*Home Flip Banner function -Added on 28th Aug'15 Starts*/
	$("#salarypopup").change(function() {
	  var optVal =  $(this).val();
		if(optVal == 'Other'){
			window.open("https://leads.hdfcbank.com/applications/misc/bannercounter/bannercounter_2009.asp?banname=corporate_sal_acc_dap_home_existing" , "_blank");
		}
		else if(optVal != 'Other' && optVal != 'select'){
		window.open("https://leads.hdfcbank.com/applications/misc/bannercounter/bannercounter_2009.asp?banname=corporate_sal_acc_dap_home_new" , "_blank");
		}
	});
	$("#savingspopup").change(function() {
	  var optVal =  $(this).val();
		if(optVal == 'Other'){
			window.open("https://leads.hdfcbank.com/applications/misc/bannercounter/bannercounter_2009.asp?banname=corporate_sal_acc_dap_home_existing" , "_blank");
		}
		else if(optVal != 'Other' && optVal != 'select'){
		window.open("https://leads.hdfcbank.com/applications/misc/bannercounter/bannercounter_2009.asp?banname=corporate_sal_acc_dap_home_new" , "_blank");
		}
	});
	$('select').change(function(){
	  var selectedVal = $(this).find('option:selected').text();
      $(this).prev().text(selectedVal);
	});
	$('.flipBannerWrap .prdctSalaryLink').click(function(){
		$('.flipBannerWrap .product .detailBox .close').click();
		$('.overlayPrdct').show();
		$('.lightBoxPrdct.salaryPopup').fadeIn();
	});
	$('.flipBannerWrap .prdctSavingsLink').click(function(){
		$('.flipBannerWrap .product .detailBox .close').click();
		$('.overlayPrdct').show();
		$('.lightBoxPrdct.savingsPopup').fadeIn();
	});
	$('.lightBoxPrdct .closeBtnPrdct').click(function(){
		$('.overlayPrdct').hide();
		$('.lightBoxPrdct').fadeOut();
	});
	$('.flipBannerWrap a.morePrdct').click(function(){
		$('.flipBannerWrap .product .detailBox .close').click();
		setTimeout(function(){
			$('.flipBannerWrap').find('.product1 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product1 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product1 .front').hide();
			})
		},100)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product2 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product2 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product2 .front').hide();
			})
		},200)
		setTimeout(function(){
			$('.flipBannerWrap a.morePrdct').animate({left:580},400)
		},100)
		setTimeout(function(){
			$('.flipBannerWrap a.backPrdct').animate({left:300},400)
		},400)
		setTimeout(function(){
			$('.flipBannerWrap a.backPrdct').animate({left:250},400)
		},500)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product3 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product3 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product3 .front').hide();
			})
		},300)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product4 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product4 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product4 .front').hide();
			})
		},400)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product5 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product5 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product5 .front').hide();
			})
		},500)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product6 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product6 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product6 .front').hide();
			})
		},600)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product7 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product7 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product7 .front').hide();
			})
		},700)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product8 .front').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product8 .back').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product8 .front').hide();
			})
		},800)
	});
	$('.flipBannerWrap .flipBanner .icon').hover(function(){
		if($(this).parent('.product').hasClass('active')){
			return false 
		}
		else $(this).animate({marginTop:-5, marginLeft:-5, width:121, height:122},200);
	},function(){
		$(this).animate({marginTop:0, marginLeft:0, width:111, height:112},200);
	})	
		$('.flipBannerWrap .flipBanner .front').click(function(){
			$(this).animate({marginTop:0, marginLeft:0, width:111, height:112},200);
		if($(this).parents('.flipBanner').find('.detailBox').is(':animated')) return false
		$(".flipBanner .product").each(function () {
          if($(this).hasClass('active')){
		  /*changed on 17-08-16 by J*///$(this).find("img.front").attr("src", ($(this).find("img.front").attr("src").replace("-sel.png", ".png")));
		  }
    	});
	//$(this).parents('.flipBanner').find('.product.active').removeClass('active')
		  /*changed on 17-08-16 by J*///$(this).attr("src", ($(this).attr("src").replace(".png", "-sel.png")));
		  $('.mainBodyContainer').addClass('active');
		  $('.overlayBanner, .overlayFlipBanner, .overlayflip').fadeIn();
		  $(this).parents('.flipBanner').find('.detailBox').not($(this).siblings()).animate({width:0},0);
		  $(this).parents('.flipBanner').find('.product').addClass('disable').removeClass('active')
		  $(this).parent('.product').removeClass('disable').addClass('active').find('.frontDetailBox').animate({width:207},300)
	});
	$('.flipBannerWrap .flipBanner .back').click(function(){
		  $(this).animate({marginTop:0, marginLeft:0, width:111, height:112},200);
		  $(".flipBanner .product").each(function () {
          if($(this).hasClass('active')){
		 /*changed on 17-08-16 by J*/ //$(this).find("img.back").attr("src", ($(this).find("img.back").attr("src").replace("-sel.png", ".png")));
		  }
    	  });
		 /*changed on 17-08-16 by J*/ //$(this).attr("src", ($(this).attr("src").replace(".png", "-sel.png")));
		  $('.mainBodyContainer').addClass('active');
		  $('.overlayBanner, .overlayFlipBanner, .overlayflip').fadeIn();
		  $(this).parents('.flipBanner').find('.detailBox').animate({width:0},0);
		  $(this).parents('.flipBanner').find('.product').addClass('disable').removeClass('active')
		  $(this).parent('.product').removeClass('disable').addClass('active').find('.backDetailBox').animate({width:207},300)
	});
	$('.flipBannerWrap .product .detailBox .close').click(function(){
		  $(".flipBanner .product").each(function () {
          if($(this).hasClass('active')){
		 /*changed on 17-08-16 by J*/ //$(this).find("img.front").attr("src", ($(this).find("img.front").attr("src").replace("-sel.png", ".png")));
		    if($(this).find("img.back").attr("src")!=undefined)
		  	{
				/*changed on 17-08-16 by J*///$(this).find("img.back").attr("src", ($(this).find("img.back").attr("src").replace("-sel.png", ".png")));
			}
		  }
    	  });
		  $('.mainBodyContainer').removeClass('active');
		  $(this).parents('.product').find('.detailBox').animate({width:0},100)
		  $('.flipBannerWrap .product').removeClass('disable')
		  setTimeout(function(){$('.flipBannerWrap .product').removeClass('active')},400)
		  $('.overlayBanner, .overlayFlipBanner, .overlayflip').fadeOut();
	});
	$('.overlayFlipBanner, .overlayBanner, .overlayflip').click(function(){
		$('.flipBannerWrap .product .detailBox .close').click();
	});
	$('.flipBannerWrap a.backPrdct').click(function(){
		$('.flipBannerWrap .product .detailBox .close').click();
		setTimeout(function(){
			$('.flipBannerWrap').find('.product1 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product1 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product1 .back').hide();
			})
		},100)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product2 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product2 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product2 .back').hide();
			})
		},200)
		setTimeout(function(){
			$('.flipBannerWrap a.backPrdct').animate({left:-100},400)
		},100)
		setTimeout(function(){
			$('.flipBannerWrap a.morePrdct').animate({left:200},400)
		},400)
		setTimeout(function(){
			$('.flipBannerWrap a.morePrdct').animate({left:228},400) /* changed on 17-06-16 by J*/
		},500)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product3 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product3 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product3 .back').hide();
			})
		},300)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product4 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product4 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product4 .back').hide();
			})
		},400)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product5 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product5 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product5 .back').hide();
			})
		},500)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product6 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product6 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product6 .back').hide();
			})
		},600)
		setTimeout(function(){
			$('.flipBannerWrap').find('.product7 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product7 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product7 .back').hide();
			})
		},700)
		setTimeout(function(){
			  $('.flipBannerWrap').find('.product8 .back').animate({left:'50%', width:0},400, function(){
			  $('.flipBannerWrap').find('.product8 .front').show().animate({left:6, width:111},400)
			  $('.flipBannerWrap').find('.product8 .back').hide();
			})
		},900)
	});
	/*Home Flip Banner function -Added on 28th Aug'15 Ends*/
	/*---Payzapp - 18June 2015-----*/
	slider('oneClickPayOptScroller');
	carousel('payZappCarousel');
	$('.accordianWrap .accordHeading').click(function(){
		$(this).parents('.accordianWrap').find('.accordHeading').removeClass('active');
		$(this).addClass('active')
		$('.accordianContent').not($(this).next()).slideUp();
		$(this).next('.accordianContent').slideDown();
	});
	/*---Payzapp - 18June 2015-------*/




					// credit card add by dnyanesh
		$(".categoryfiled input:radio").on('click',function(){ 
						$("#all_cardDiv .card_content").hide() ; 
						
						if($(this).next().hasClass('featuredCard')) 
						{ 
										$(".featuredCard").show(); 
						} 
						else 
						{ 
										$("#all_cardDiv .card_content[rel='"+$(this).next("label").text()+"']").show(); 
						} 
		}).eq(0).click(); 
							

	
	
	$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
	var topnavWrapperHeight = $(".topnav_wrapper").height();
	var headerWrapperHeight = $(".headerWrapper").height();
	if (scroll >= 33) {
		$(".topnav_wrapper").hide();
		$(".headerWrapper").addClass("stick")
		$(".mainBodyContainer,.learningWrap").css("padding-top", topnavWrapperHeight+headerWrapperHeight);
		$(".finances_inner_content_wrapper").css("padding-top", 0);
    } else {
        $(".topnav_wrapper").show();
		$(".headerWrapper").removeClass("stick")
		$(".mainBodyContainer,.learningWrap").css("padding-top", 0);
		$(".inner_content_wrapper").css("padding-top", 28);
		$(".find_your_nearest_wrapper").css("padding-top", 28);
		$(".smenopad").css("padding-top", 0);
		$(".finances_inner_content_wrapper").css("padding-top", 28);
    }
	});
	
	
	
if ( $('div.insidepagetabcontent div.intro').children().length > 0) {
$("div.insidepagetabcontent div.intro").css({
"background": "url(/assets/images/bg_usp.png) no-repeat 0 0"
            });
$("div.insidepagetabcontent div.expandcontent div.intro").css({
"background": "none"
            });
}



$('div.floatingfooterlinks ul li.fotterSocialNet').show();
$('div.floatingfooterlinks').addClass('min');

$('ul.socialNetIcons li a').mouseover(function(){
$(this).next('.toolTip').show();
$(this).parent().siblings('li').find('.toolTip').hide();
});
$('ul.socialNetIcons li a').mouseout(function(){
$(this).parent().find('.toolTip').hide();
});

  
		
		/*$.browser.chrome = $.browser.webkit && !! window.chrome;
		$.browser.safari = $.browser.webkit && !window.chrome;
		if ($.browser.chrome || $.browser.safari){
		$("#chrome").show();
	}*/
	if ((navigator.userAgent.indexOf('Chrome') > 0) || (navigator.userAgent.indexOf('Safari') > 0)) {
	if ((navigator.userAgent.indexOf("OPR") > 0) || (navigator.userAgent.indexOf("Opera") > 0)){	
	} else {
	if(window.addEventListener || window.attachEvent){
	$("#chrome").show();
	} 
	}
	}
	var accEq= $('#accordionEq').val();
	$("h3").click(function ()
	{
		if ($(this).next().is(":visible"))
		{
			$(".accContent:visible").slideToggle().prev().toggleClass("open");
		}
		else
		{
			$(".accContent:visible").slideUp().prev().removeClass("open");
			$(this).addClass("open").next().slideDown();
		}
	}).eq(accEq).click();
	
	$('.selectBox').click(function(){
		$(this).find('.loanOpt').slideToggle();
		$(this).toggleClass("open");
	});
	$('.dropbox').click(function(){
		$(this).find('.dropOpt').slideToggle();
		$(this).toggleClass("add");
	});
	
	$('.topnav_wrapper,.header clearfix,.navigation,.mainBodyContainer,.footer_wrapper,.impmessage', document).click(function (e) {
        if ($(e.target).closest('.open,#slidingbannersbuttons,#slidingbannersbuttons_prepiad_cards,h3').length === 0) {
            $(".loanOpt").slideUp();
			$('.selectBox').removeClass('open');
        }
		if ($(e.target).closest('.add,#slidingbannersbuttons,#slidingbannersbuttons_prepiad_cards,h3').length === 0) {
            $(".dropOpt").slideUp();
			$('.dropbox').removeClass('add');
        }
    });

$('ul#mainBanner li a').click(function(e){
	if($(this).attr("href"))
	{
		e.preventDefault;
		var currentHref = $(this).attr("href");
		window.open(currentHref,'_blank');
	}
})

$('#slidingbannersbuttons').append('<a class="" href="#"><span style="display: block;">1</span></a><a class="selected" href="#"><span>2</span></a><a class="" href="#"><span>3</span></a><a class="" href="#"><span>4</span></a><a class="" href="#"><span>5</span></a>');
$('#slidingbannersbuttons_prepiad_cards').append('<a class="" href="#"><span style="display: block;">1</span></a><a class="selected" href="#"><span>2</span></a><a class="" href="#"><span>3</span></a>');
$('#slidingbannersbuttons,#slidingbannersbuttons_prepiad_cards').css('display','block');
var t;
var i=0;
var bannerLiAni=true;
$("#slidingbannersbuttons span,#slidingbannersbuttons_prepiad_cards span").css("display","block");
$("#slidingbannersbuttons span,#slidingbannersbuttons_prepiad_cards span").click(function(){
bannerLiAni=false;
});
$("#slidingbannersbuttons a,#slidingbannersbuttons_prepiad_cards a").click(function(){
i=$(this).index();
clearTimeout(t);
var ind=$(this).index();

$("#mainBanner li").eq(ind).stop(false,true).fadeIn(1000).siblings().stop(false,true).fadeOut(1000);
$(this).addClass("selected").siblings(".selected").removeClass("selected");
if($("#slidingbannersbuttons").length){
if(bannerLiAni==true){
if(i<4){
i++;
t= setTimeout(function(){
//$("#slidingbannersbuttons a,#slidingbannersbuttons_prepiad_cards a").eq(i).click()
$("#slidingbannersbuttons a").eq(i).click()
},5000)
}
else {i=0; t=setTimeout(function(){$("#slidingbannersbuttons a").eq(0).click()},5000)}
}
}
if($("#slidingbannersbuttons_prepiad_cards").length){
if(bannerLiAni==true){
if(i<2){
i++;
t= setTimeout(function(){
//$("#slidingbannersbuttons a,#slidingbannersbuttons_prepiad_cards a").eq(i).click()
$("#slidingbannersbuttons_prepiad_cards a").eq(i).click()
},5000)
}
else {i=0; t=setTimeout(function(){$("#slidingbannersbuttons_prepiad_cards a").eq(0).click()},5000)}
}
}
}).eq(0).click();
$('.mainBodyContainer').prepend('<div id="overlay" style="display: none;"></div>');


$('.mainBodyContainer #overlay').css('height' , $(document).height())

	
	if($("#socialtweet").length){
	 var Tweet = document.createElement("script");
        Tweet.src = "http://static.addtoany.com/menu/page.js";
        Tweet.type = "text/javascript";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(Tweet);
		}
	$(".loginbox .loginboxfield input, .loginbox .loginboxfieldlast input").click(function(){
	netbankinglogin($(this).attr('id'));
});
    
	

	$("#loginsubmit, #register, #knowmore").click(function(e){
	e.preventDefault();
	if(!$(".loginbox_bottom input[name='login']").is(":checked")){
	$(".errorloginmsg").remove();
	$(".loginboxlinks").after("<div class='clear'></div><div class='errorloginmsg'>Please select any one option.</div>")
	}
	if(!$('.upperListing li .mainlistlogin .radiobtn span').hasClass('cheked')){
		$(".registerWrap").after("<div class='clear'></div><div class='errorloginmsg'>Please select any one option.</div>")
	}
	});
	
	
	
	
	commonload(); 
	if($("div").hasClass("card_Container"))
	{
	$(".mainBodyContainer").css({"min-height" : ($(".card_Container .leftColumn").outerHeight() + 30)});
	}
	/*if($.cookie("floatingfooter") != null)
	{		
		if($.cookie("floatingfooter") == "inactive")
		{			
			$(".floatingfooterbottom").hide();
			$(".floatingfooter .floatingfootertopinner").children("img").attr("src", ($(".floatingfooter .floatingfootertopinner").children("img").attr("src").replace(".png", "_active.png")));
			$(".floatingfooter .floatingfootertopinner").removeClass("active");
			$.cookie("floatingfooter", "inactive");		
			
			if (parseInt($(".footer_wrapper .footer").css("padding-bottom").replace("px", "")) == 22) {				
				$(".footer_wrapper .footer").animate({
					"padding-bottom": "47px"
				});
			} else {				
				$(".footer_wrapper .footer").animate({
					"padding-bottom": "22px"
				});
			}
		}
		else{
			$(".floatingfooterbottom").slideDown();
			 $(".floatingfooter .floatingfootertopinner").children("img").attr("src", ($(".floatingfooter .floatingfootertopinner").children("img").attr("src").replace("_active.png", ".png")));
             $(".floatingfooter .floatingfootertopinner").addClass("active");	
		}
	}*/
	
	
});




function manipulatejunkanchor(linktext,actualval){
	$("a").each(function(){
		var thisval = $(this).attr('onclick');	
				
		if(thisval != undefined)
		{
			var chkstrindex = thisval.toString().search(linktext);
			if(chkstrindex > -1)
			{				
				var splitval = thisval.toString().split(linktext)[1];			
				splitval = splitval.match("'(.*)'")[1];				
				var actualonclickvalue = actualval + "'" + splitval + "')";					
				$(this).removeAttr("onclick");
				
				$(this).bind("click",function(){
					eval(actualonclickvalue);
				});												
			}			
		}
	});
}


function manipulateceeboxanchor(linktext,actualval){
	$("a").each(function(){
		var thisval = $(this).attr('onclick');
				
		if(thisval != undefined)
		{
			var chkstrindex = thisval.toString().search(linktext);
			if(chkstrindex > -1)
			{				
				var splitval = thisval.toString().split(linktext)[1];							
				splitval = splitval.match("((.*))")[1];				
				splitval = splitval.replace(/}/g,"");				
				var actualonclickvalue = actualval + splitval;					
				$(this).removeAttr("onclick");
				$(this).removeProp('onclick');								
				$(this).bind("click",function(){
					eval(actualonclickvalue);
				});												
			}			
		}
	});
}


function addtmtoenettext()
{
	$("*").each(function(){
		if($(this).children().length == 0)
		{
			$(this).text($(this).text().replace("ENet" , "ENet<sup>TM</sup>"));
		}
	});	
}

function commonload() {
    $("#customertab2").show();
    
	manipulatejunkanchor('openaccord','openaccord(');	
	manipulatejunkanchor('moreinfo','moreinfo(this,');
	manipulateceeboxanchor('ceeboxpopup','ceeboxpopup');
	
	if(typeof queryString == 'function') {
	if (queryString("faq_srh") != "false") {
	var user_search_string = queryString("faq_srh");
	var iframeurl = $("iframe").attr("src");
	$("iframe").attr("src", "http://" + parent.window.location.hostname + iframeurl + "?faq_srh=" + user_search_string);
	}
	if (queryString("user_search") != "false") {
	var user_search_string = queryString("user_search");
	var iframeurl = $("iframe").attr("src");
	$("iframe").attr("src", "http://" + parent.window.location.hostname + iframeurl + "?faq_srh=" + user_search_string);
	}
	}
	
    $(".bluebox").each(function () {
        $(this).find(".contactNumber").eq(0).show().siblings(".contactNumber").hide();
    });
	
	
	$(".downldnewsletter .select_bg select").change(function(){
		var newsletterurl =  $(this).val();
		var openedpopup = window.open(newsletterurl,'_blank');
		if (popUp == null || typeof(popUp)=='undefined') {   
		  alert('Please disable your pop-up blocker and click the "Open" link again.'); 		  
		} 
	});
	


	
	$("p.morelink").removeClass("dropdownarrow");
	
	$("select").attr("disabled",false);
	$("select option").attr("disabled",false);
	
	$(".ques_ans_block").each(function(){
		if($(this).find("div").hasClass("moreinfo"))
		{
			$(this).find(".question").children("h3").css("cursor" , "pointer");
		}		
		else{
			$(this).find(".question").children("h3").css("cursor" , "auto");
		}
	});
	
    $("#customertab2").hide();
    
    $("select").attr("disabled",false);

    if ($(".sitemainLinks ul li").size() == 1) {
        $(".sitemainLinks").hide();
    }
    $(".languagenav p.selvalue").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).next(".languagedropdown").slideUp(function () {
                $(".languagenav p.selvalue").removeClass("selected");
            });
        } else {
            $(this).addClass("selected");
            $(this).next(".languagedropdown").slideDown();
        }
    });
    $(".languagenav .languagedropdown ul li a").click(function () {
        var _oldlanguage = $(".languagenav p.selvalue a").html();
        var _newlanguage = $(this).html();
        $(".languagenav p.selvalue a").html(_newlanguage);
        $(this).html(_oldlanguage);
        $(this).parents(".languagedropdown").slideUp(function () {
            $(".languagenav p.selvalue").removeClass("selected");
        });
    });
    
    if (navigator.appVersion.indexOf("Mac") != -1) {
		if ((navigator.userAgent.indexOf("OPR") > 0) || (navigator.userAgent.indexOf("Opera") > 0)) {
			if(window.addEventListener || window.attachEvent){
				$(".select_bg").css({
					"background": "none"
				});
				$(".select_bg").css({
					"border": 0
				});
				$(".select_bg select").css({
					"opacity": 1
				});
				$(".selectedvalue").hide();
				$(".search_faq .top input.textbox").css({
                "padding": "15px 0 25px 11px"
				});
				$(".chk_box label").css({
                "margin": "2px 0 0 0"
				});
			} 
		}
        /*if ($.browser.opera) {
            $(".select_bg").css({
                "background": "none"
            });
            $(".select_bg").css({
                "border": 0
            });
            $(".select_bg select").css({
                "opacity": 1
            });
            $(".selectedvalue").hide();
            $(".search_faq .top input.textbox").css({
                "padding": "15px 0 25px 11px"
            });
            $(".chk_box label").css({
                "margin": "2px 0 0 0"
            });
        }*/
        if (navigator.userAgent.indexOf('Safari') != -1) {
            $(".chk_box label").css({
                "margin": "2px 0 0 0"
            });
        }
    }
    //if (!$.browser.opera) {
	if ((navigator.userAgent.indexOf("OPR") == -1) || (navigator.userAgent.indexOf("Opera") == -1)) {
		if ((navigator.userAgent.indexOf("OPR") > 0) || (navigator.userAgent.indexOf("Opera") > 0)){	
			} else {
	if (window.addEventListener || window.attachEvent){
	    $("#customertab2").show();
        if ($("#customertabs").find("div").hasClass("languagedropdown")) {
            $("#customertabs").append("<div class='languagedropdown'>" + $(".customertab .languagedropdown").html() + "</div>");
            $(".customertab .languagedropdown").html('');
            $(".languagedropdown .select_bg").prepend("<div class='selectedvalue'></div>");
            $("#customertabs").css("padding", "20px 0 0");
			$(".languagedropdown .select_bg select option").removeAttr("selected");
			$(".languagedropdown .select_bg select option").eq(0).attr({"selected": "selected"});
			
            $(".languagedropdown .select_bg select").on('change', function () {
                $(this).parent().css({
                    "height": ($(this).parent().find(".selecteddropval").outerHeight() + 10)
                });
                $(this).parent().find(".selectedvalue").css({
                    "height": $(this).parent().find(".selecteddropval").outerHeight() + 10
                });
                $(this).css({
                    "height": $(this).parent().find(".selecteddropval").outerHeight() + 10
                });
                var value = $(this).val();				
                if (value != "mum") {
                   
				   window.location.href=value;
                }
            });
        }
        $(".select_bg").each(function () {
            $(this).find("option").each(function () {
                //if ($(this).attr("selected")) {
				if ($(this).prop("selected")) {
                    $(this).parent().prev(".selectedvalue").html("<div class='selecteddropval'>" + $(this).html() + "</div>");
                }
            });
        });
        $(".select_bg select").on('change', function () {
            var categoryId = $(this).children("option:selected").val();
            $(this).prev().html("<div class='selecteddropval'>" + $(this).children("option:selected").text() + "</div>");
            if (($(this).attr('id')) == "citySelect") {
                var city = $(this).val();
	
                $(".contactNumber").hide();
                $(this).parent().parent().find(".contactNumber").eq(city - 1).show();
            }
            if ($("select").attr("name") == "paymentoptions") {
                if ($("select[name='paymentoptions']") != null) {
                    if (typeof (browseCategory) != "undefined") {
                        browseCategory(categoryId)
                    }
                }
            }
        });
		$(".languagedropdown .select_bg select").on('change', function () {
var categoryId = $(this).children("option:selected").val();
            $(this).prev().html("<div class='selecteddropval'>" + $(this).children("option:selected").text() + "</div>");
            if (($(this).attr('id')) == "citySelect") {
                var city = $(this).val();
				
				window.open(city,'_self');
            }
            
        });
    }
	}
	}
	
    $(".bluebox .select_bg select").on('change', function () {
        $(this).parent().css({
            "height": $(this).parent().find(".selecteddropval").outerHeight()
        });
        $(this).parent().find(".selectedvalue").css({
            "height": $(this).parent().find(".selecteddropval").outerHeight()
        });
        $(this).css({
            "height": $(this).parent().find(".selecteddropval").outerHeight()
        });
    });
    $("#customertab2").hide();
    $(".bluebox .bottom .select_bg select option").removeAttr("selected");
    $(".bluebox .bottom .select_bg select").parent().find(".selecteddropval").html("Select State / City");
    var cityselectoptions = $(".bluebox .bottom .select_bg select").html();
    $(".bluebox .bottom .contactNumber").hide();
    var selectoption = "<option selected='selected'>Select State / City</option>"
    $(".bluebox .bottom .select_bg select").html(selectoption + cityselectoptions);
    if ($(".navigation").hasClass("smenav")) {
        $(".navigation > ul > li").eq(4).addClass("dropmidNav");
    }
    $(".searchboxwrapper .autocompletetext").focus(function () {
        $(this).val('');
    });
    $(".searchboxwrapper .autocompletetext").blur(function () {
        if ($(this).val() == '') {
            $(this).val("Type your search here...");
        }
    });
    $(".searchboxwrapper .autocompletetext").keypress(function () {
        $(".searchautocompletewrap").slideDown();
        $(".closebtn_search").show();
    });
    $(".searchboxwrapper .closebtn_search").click(function () {
        $(".searchautocompletewrap").slideUp();
        $(".closebtn_search").hide();
    });
    $(".findrightpaymentform .formhead").click(function () {
        if ($(this).next(".formbody").is(":visible")) {
            $(".findrightpaymentform .formbody .select_bg").hide();
            $(this).parents(".findrightpaymentform").animate({
                "padding-bottom": "64px"
            }, function () {
                $("iframe", top.document.body).attr("height", $(".findrightpaymentform").outerHeight());
            });
        } else {
            $(".findrightpaymentform .formbody .select_bg").show();
            $(this).parents(".findrightpaymentform").animate({
                "padding-bottom": "32px"
            }, function () {
                $("iframe", top.document.body).attr("height", $(".findrightpaymentform").outerHeight());
            });
        }
        $(this).next(".formbody").slideToggle();
        $(this).children("h3").toggleClass("active");
    });
    /*$(".floatingfooter .floatingfootertopinner").addClass("active");
    $(".floatingfooter .floatingfootertopinner").click(function () {	
        $(".floatingfooterbottom").slideToggle();
        if ($(this).hasClass("active")) {
            $(this).children("img").attr("src", ($(this).children("img").attr("src").replace(".png", "_active.png")));
            $(this).removeClass("active");
			$.cookie("floatingfooter", "inactive");
        } else {
            $(this).children("img").attr("src", ($(this).children("img").attr("src").replace("_active.png", ".png")));
            $(this).addClass("active");
			$.cookie("floatingfooter", "active");
        }		
        
		if (parseInt($(".footer_wrapper .footer").css("padding-bottom").replace("px", "")) == 22) {
            $(".impmessage").animate({
                "bottom": "30px"
            });
            $(".footer_wrapper .footer").animate({
                "padding-bottom": "47px"
            });
        } else {
            $(".impmessage").animate({
                "bottom": 0
            });
            $(".footer_wrapper .footer").animate({
                "padding-bottom": "22px"
            });
        }
    });
    $(".floatingfooter .floatingfooterlinks ul li a").click(function () {
        $(this).next(".recentlybrowsedpages").slideToggle();
    });
    $(".floatingfooter .floatingfooterlinks .closeBtn").click(function () {
        $(this).parents(".recentlybrowsedpages").slideUp();
    });
	
	
    $(".impmessage").hide();

    
	
	
    $(".creditCard_popup").hide();	
	if($.cookie("creditCard_popup")==null)
	{
		$(".creditCard_popup").slideDown(1000);
		var documentwidth = $(document).width();
		documentwidth = (documentwidth - 400) / 2;
		$(".creditCard_popup").css({
			"right": documentwidth
		});				
	}
	if($.cookie("creditCard_popup")!="inactive")
	{		
		$(".creditCard_popup").slideDown(1000);
		var documentwidth = $(document).width();
		documentwidth = (documentwidth - 400) / 2;
		$(".creditCard_popup").css({
			"right": documentwidth
		});		
	}	
	
	$(".creditCard_popup .closebtn").click(function () {
        $(this).parents(".creditCard_popup").slideUp();
		$.cookie("creditCard_popup", "inactive");
    });
	
	
	$(".silverCard_popup").hide();
	
	
		
		if($.cookie("silverCard_popup")==null)
    {
            $(".silverCard_popup").hide();
                   var url = $(location).attr('href');
            var page_type = url.substring(url.lastIndexOf('/') + 1);
            if(page_type=="car-loans" || page_type=="customer-centre?src=hp_top_nav"){
                    setTimeout(function(){
                            $(".silverCard_popup").slideDown(1000);
                    },10000)
            }
            else{
                     setTimeout(function(){
                                $(".silverCard_popup").slideDown(1000);
                        },4000)
            }
            var documentwidth = $(document).width();
            documentwidth = (documentwidth - 460) / 2;
            $(".silverCard_popup").css({
                    "right": documentwidth
            });
    }
    if($.cookie("silverCard_popup")!="inactive")
    {
            $(".silverCard_popup").hide();
                    var url = $(location).attr('href');
            var page_type = url.substring(url.lastIndexOf('/') + 1);
            if(page_type=="car-loans" || page_type=="customer-centre?src=hp_top_nav"){
                    setTimeout(function(){
                            $(".silverCard_popup").slideDown(1000);
                    },10000)
            }
            else{
                     setTimeout(function(){
                                $(".silverCard_popup").slideDown(1000);
                        },4000)
            }
            var documentwidth = $(document).width();
            documentwidth = (documentwidth - 460) / 2;
                            
            $(".silverCard_popup").css({
                    "right": documentwidth
            });
    } 
    $(".silverCard_popup .closebtn").click(function () {
        $(this).parents(".silverCard_popup").slideUp();
		$.cookie("silverCard_popup", "inactive");		
    });*/
	
	
    $(".calltoaction_closebtn").click(function () {
        $(".calltoaction").hide();
    });
    
		
	
    documentclick();
    $(".login_button").click(function () {
        $(".login_button").hide();
        $(".loginbox").slideDown("slow");
    });
    $(".close").click(function () {
        $(".loginbox").slideUp(function () {
            $(".login_button").show();
        });
    });
    $(".morelink").each(function () {
        $(this).css({
            "left": $(this).parent().css("padding-left")
        });
    });
    pagination();
    $("body").find("a").each(function () {
       /* if ($(this).attr("id") == "tncceebox") {
            $("#tncceebox").ceebox({
                classvalue: 'tncceebox'
            });
        }*/
        if ($(this).attr("id") == "sendquestionceebox") {
            $("#sendquestionceebox").ceebox({
                classvalue: 'sendquestionceebox'
            });
        }
    });
    $(".tooltiplink").mouseover(function () {
        var content = $(this).find(".tooltipcontent");
        content.show();
        $(this).addClass("tooltipvisible");
    });
    $(".tooltiplink").mouseout(function () {
        var content = $(this).find(".tooltipcontent");
        content.hide();
        $(this).removeClass("tooltipvisible");
    });
	
	
	$(".advansearchtext a").click(function(){
		$(this).toggleClass("downarrow");
		$(".advancesearch .advanced_form").slideToggle();
	});
	
	
}

function moreinfo(_this, morevalue, lessvalue) {
    if ($(_this).html().replace("&amp;", "&") == morevalue) {
        $(_this).parent().prev(".moreinfo").slideDown();
        $(_this).html(lessvalue);
        $(_this).parent().addClass("dropdownarrow");
    } else {
        $(_this).parent().prev(".moreinfo").slideUp();
        $(_this).html(morevalue);
        $(_this).parent().removeClass("dropdownarrow");
    }
}

function moreinfo_titleclick(_this, morevalue, lessvalue) {
    if ($(_this).parents(".ques_ans_block").find(".morelink").children("a").html().replace("&amp;", "&") == morevalue) {
        $(_this).parents(".ques_ans_block").find(".moreinfo").slideDown();
        $(_this).parents(".ques_ans_block").find(".morelink").children("a").html(lessvalue);
        $(_this).parents(".ques_ans_block").find(".morelink").addClass("dropdownarrow");
    } else {
        $(_this).parents(".ques_ans_block").find(".moreinfo").slideUp();
        $(_this).parents(".ques_ans_block").find(".morelink").children("a").html(morevalue);
        $(_this).parents(".ques_ans_block").find(".moreinfo").removeClass("dropdownarrow");
    }
}







function documentclick() {
    $(document).click(function (e) {
	if($(e.target).parents(".slidingbanners").attr("class")=="slidingbanners"){return false;}
	if ($(e.target).closest('.languagenav').length === 0 && $(e.target).closest('.languagedropdown').length === 0 && $(e.target).closest('.quickapplyselvalue').length === 0 && $(e.target).closest('.quickapplydropdownlinks').length === 0 && $(e.target).closest('.searchbox').length === 0 && $(e.target).closest('.searchautocompletewrap').length === 0 && $(e.target).closest('.recentlybrowsedpages').length === 0 && $(e.target).closest('.floatingfooterbottom ul li').length === 0 && $(e.target).closest('.login_panel').length === 0) {
            $(".languagenav .languagedropdown").slideUp(function () {
                $(".languagenav p.selvalue").removeClass("selected");
            });
            $(".quickapplydropdown .quickapplydropdownlinks").slideUp();
            $(".searchautocompletewrap").slideUp();
            $(".closebtn_search").hide();
            $(".recentlybrowsedpages").slideUp();
            $(".login_panel .loginbox").slideUp("slow", function () {
                $(".login_panel .login_button").show();
            });
        }
    });
}

function hnwsliderbanner() {
    hnwsliderlisize = $(".hnw_container .slider_clip .slider li").size();
    hnwsliderliwidth = $(".hnw_container .slider_clip .slider li").outerWidth();
    hnwsliderindex = 0;
    $(".hnw_container .slider_clip .slider").css({
        "width": hnwsliderlisize * hnwsliderliwidth + "px"
    });
    
    $(".hnw_container .slider_clip .rightbtn").click(function () {
        $(".hnw_container .slider_clip .leftbtn").show();
        $(".hnw_container .banner .banner_pager li").removeClass("selected");
        if (!(hnwsliderindex > hnwsliderlisize - 2)) {
            hnwsliderindex++;
            if (hnwsliderindex == hnwsliderlisize - 1) {
                $(this).hide();
            }
        }
        $(".hnw_container .slider_clip .slider").animate({
            "left": (-1) * hnwsliderindex * hnwsliderliwidth
        });
        $(".hnw_container .banner .banner_pager li").eq(hnwsliderindex).addClass("selected");
    });
    $(".hnw_container .slider_clip .leftbtn").click(function () {
        $(".hnw_container .slider_clip .rightbtn").show();
        $(".hnw_container .banner .banner_pager li").removeClass("selected");
        if (!(hnwsliderindex == 0)) {
            hnwsliderindex--;
            if (hnwsliderindex == 0) {
                $(this).hide();
            }
        }
        $(".hnw_container .slider_clip .slider").animate({
            "left": (-1) * hnwsliderindex * hnwsliderliwidth
        });
        $(".hnw_container .banner .banner_pager li").eq(hnwsliderindex).addClass("selected");
    });
    $(".hnw_container .banner .banner_pager li").click(function () {
        hnwsliderindex = $(this).index();
        $(".hnw_container .slider_clip .slider").animate({
            "left": (-1) * hnwsliderindex * hnwsliderliwidth
        });
        $(this).parent().find("li").removeClass("selected");
        $(this).addClass("selected");
        if ($(this).index() == 0) {
            $(".hnw_container .slider_clip .rightbtn").show();
            $(".hnw_container .slider_clip .leftbtn").hide();
        }
        $(".hnw_container .slider_clip .sliderbtns").show();
        if (hnwsliderindex == hnwsliderlisize - 1) {
            $(".hnw_container .slider_clip .rightbtn").hide();
            $(".hnw_container .slider_clip .leftbtn").show();
        }
        if (hnwsliderindex == 0) {
            $(".hnw_container .slider_clip .rightbtn").show();
            $(".hnw_container .slider_clip .leftbtn").hide();
        }
    });
}
var z_indexvalue = 999;
$(".category_cardDiv").each(function () {
    $(".card_content").each(function () {
        $(this).css({
            "z-index": z_indexvalue
        });
        z_indexvalue--;
    });
});

function sitelinkfocus(_id) {
    $('html, body').animate({
        scrollTop: $("#" + _id).offset().top
    }, function () {
        $("#" + _id).find("h3").addClass("active");
        $("#" + _id).next(".sitepageslinks").slideDown();
    });
}

function changeCardDiv(_this) {
    var cardDivid = $(_this).val();
    if (cardDivid == "all") {
        $(".cardcategory").show();
    } else {
        $(".cardcategory").hide();
        $("#" + cardDivid).show();
    }
}

function showreligious_place(_this, carousalid) {
    var _placeid = $(_this).attr("id");
    $(".religious_placeDiv").hide();
    $("#" + _placeid + "_placeDiv").show();
    $('#' + carousalid).jcarousel({
        horizontal: true,
        scroll: 5
    });
}

function ceeboxpopup(_this, framesrc, classname, width, height) {
    $("#cee_overlay").remove();
    $("#cee_box").remove();
    $("body").append('<div id="cee_overlay" class="cee_close"></div><div class="cee_html ' + classname + '" id="cee_box" style="width:' + width + 'px; height:' + height + '"><a title="Close" class="cee_close" id="cee_closeBtn" href="javascript:;">close</a><div id="cee_title"><h2></h2></div><div id="cee_ajax"><iframe id="ceeboxiframe" scrolling="no" src="' + framesrc + '?ver=' + Math.random() + '" ' + $(_this).attr("rel") + ' frameborder="0" allowTransparency="true"></iframe></div></div>');
    var iframe = document.getElementById("ceeboxiframe");
    iframe.setAttribute("src", framesrc);
    $("#cee_overlay").show();
    $(".cee_html").show();
    var centerDiv = $('.cee_html');
    var height = $(window).height();
    var width = $(window).width();
    var left = width / 2 - (centerDiv.width() / 2);
    var top = height / 2 - (centerDiv.height() / 2)
    centerDiv.css({
        'left': left,
        'top': top
    });
    $("#cee_closeBtn,#cee_overlay").click(function () {
        $("#cee_overlay").hide();
        $(".cee_html").hide();
    });
}

function aj() {
    $('.content_msg').hide();
    var x = document.getElementById("selectopt").selectedIndex;
    var y = (document.getElementById("selectopt")[x].value);
    $('#' + y).show();
}

function pagination() {
    $(".pagerDiv ul li span").unbind("click");
    $(".pagerDiv .rightarrow").unbind("click");
    $(".pagerDiv .leftarrow").unbind("click");
   // $(".pagerDiv ul li span").on('click', function () { 
	$(document).on('click','.pagerDiv ul li span', function () { 
        var pagerpointer = $(this).parents(".pagerDiv").parent().find(".pagerDiv");
        pagerpointer.find("li").removeClass("selected");
        var pagerindex = $(this).parent().index();
         getCurrentPage(++pagerindex); 
        var pagercount = pagerpointer.find("li").size();
        $(this).parents(".pagerDiv").parent().find(".pagerDiv").each(function () {
            $(this).find("ul").children("li").eq(pagerindex).addClass("selected");
        });
        $(this).parents(".pagerDiv").parent().find(".paginateDiv").hide();
        $(this).parents(".pagerDiv").parent().find(".paginateDiv").eq($(this).parent().index()).show();
        if (pagerindex == 0) {
            pagerpointer.find(".leftarrow").addClass("leftarrowdisabled");
        } else {
            pagerpointer.find(".leftarrow").removeClass("leftarrowdisabled");
        }
        if (pagerindex == pagercount - 1) {
            pagerpointer.find(".rightarrow").addClass("rightarrowdisabled");
        } else {
            pagerpointer.find(".rightarrow").removeClass("rightarrowdisabled");
        }
        $('html, body').animate({
            scrollTop: $(this).parents(".pagerDiv").parent().find(".paginateDiv").eq($(this).parent().index()).offset().top
        });
    });
    //$(".pagerDiv .rightarrow").on('click', function () {
	$(document).on('click','.pagerDiv .rightarrow', function () {
        var pagerindex = $(this).prev("ul").find("li.selected").index();
        var pagercount = $(this).prev("ul").find("li").size();
        var pagerpointer = $(this).parents(".pagerDiv").parent().find(".pagerDiv");
        pagerpointer.find(".leftarrow").removeClass("leftarrowdisabled");
        pagerpointer.find("li").removeClass("selected");
        if (pagerindex < (pagercount - 1)) {
            pagerindex++;
        }
        if (pagerindex == (pagercount - 1)) {
            pagerpointer.find(".rightarrow").addClass("rightarrowdisabled");
        }
        var pageIndex = pagerindex;
		getCurrentPage(++pageIndex); 
        pagerpointer.each(function () {
            $(this).find("ul").children("li").eq(pagerindex).addClass("selected");
        });
        $(this).parents(".pagerDiv").parent().find(".paginateDiv").hide();
        $(this).parents(".pagerDiv").parent().find(".paginateDiv").eq(pagerindex).show();
        $('html, body').animate({
            scrollTop: pagerpointer.parent().find(".paginateDiv").eq(pagerindex).offset().top
        });
    });
    $(document).on('click','.pagerDiv .leftarrow', function () {
        var pagerindex = $(this).next("ul").find("li.selected").index();
        getCurrentPage(pagerindex);
        var pagercount = $(this).next("ul").find("li").size();
        var pagerpointer = $(this).parents(".pagerDiv").parent().find(".pagerDiv");
        pagerpointer.find(".rightarrow").removeClass("rightarrowdisabled");
        pagerpointer.find("li").removeClass("selected");
        if (pagerindex > 0) {
            pagerindex--;
        }
        if (pagerindex == 0) {
            pagerpointer.find(".leftarrow").addClass("leftarrowdisabled");
        }
        pagerpointer.each(function () {
            $(this).find("ul").children("li").eq(pagerindex).addClass("selected");
        });
        $(this).parents(".pagerDiv").parent().find(".paginateDiv").hide();
        $(this).parents(".pagerDiv").parent().find(".paginateDiv").eq(pagerindex).show();
        $('html, body').animate({
            scrollTop: pagerpointer.parent().find(".paginateDiv").eq(pagerindex).offset().top
        });
    });
}

function getCurrentPage(pagerindex){
	
	pagerindex = (pagerindex == 0) ? 1 : pagerindex;
	var pageName = $("#page-name").val();
	if(pageName != undefined){
		var param = validate();
		param += "&current-page="+pagerindex;
        if(param !=''){
            $.ajax({
                type: "GET",
                url: pageurl,
                data: param,
                success: function(msg){
                    $("#fyn_details").addClass("nearest_branch_details");  
                    $("#fyn_details").html($(msg).find("#ajax_fyn_details").html());
                }
            });
        }
	}
}

function validate() {
        var country = $("#country").val();
        var state = $("#state").val();
        var city = $("#city").val();
        var area = $("#txtTag").val();
		var pin = $("#pin").val();
        var facility = $("#facility").val();

        var param = "page-name="+$("#page-name").val();
        
        if($("#page-name").val() == 'access-point-in-gulf'){
            param += "&search-key=details,remittance";
        }
        if(country != undefined){
            if(country == ''){
                $("#error_message").html("<p>Please Select Country.</p>");
                return "";
            }else{
                param += "&country=" +country;
                $("#error_message").html("");
            }
        }
        if(state != undefined){
            if(state == ''){
                $("#error_message").html("<p>Please Select State.</p>");
                return "";
            }else{
                param += "&state=" +state;
                $("#error_message").html("");
            }
        }
        if(city != undefined){
            if(city == ''){
                $("#error_message").html("<p>Please Select City.</p>");
                return "";
            }else{
                param += "&city="+city;
                $("#error_message").html("");
            }
        }
        if(area != undefined && area != defaultText){
            param +="&area="+area;
        }
		if(pin != undefined && pin != defaultText){
            param +="&pin="+pin;
        }
        if(facility != undefined){
            param += "&facility="+facility;
        }
        $("#error_message").html("");
        return param;
    }
function drop2(selSelectObject) {
    var val = selSelectObject.options[selSelectObject.selectedIndex].value;
    if (val != "") document.findyounearest.where.selectedIndex = 0;
    open(val);
}


function hidecalltoaction() {
    $(".calltoactionmid").hide();
}

var loginchkedvalue, chkradvalue = false;

function netbankinglogin(type) {
	var login = '';
	var register = '';
	var knowmore = '';
	
	$(".loginbox_bottom input:radio").each(function () {
		if ($(this).is(":checked") == true) {
			chkradvalue = true;
			loginchkedvalue = $(this).attr("id");
		}
	});
	
	/*For new login in inner pages - start*/
	$('.radiobtn span').each(function(){	
			if ($(this).parents('li').find('.radiobtn span').hasClass('cheked')){
				chkradvalue = true;
				loginchkedvalue = $(this).next('input').attr('id');
				
		}
	})
	/*For new login in inner pages - end*/
	
	if(chkradvalue == false){
		return false;
		}
		else {
			$(".errorloginmsg").hide();
			}
	
	
	
	if(loginchkedvalue == 'netbanking')
	{
		login = '/assets/popuppages/netbanking.htm?src=hp';
		register = '/personal/ways_to_bank/ways-to-bank-details?id=gts8mitq&accordname=accordian5';
		knowmore = '/personal/ways-to-bank/bank-online/netbanking';
	
	}else if(loginchkedvalue == 'netsafe')
	{
		login = '/assets/netsafedemo/netsafedemo.htm?src=hp';
		register = '/assets/netsafedemo/netsafedemo.htm';
		knowmore = '/personal/making-payments/security-measures/verified-by-visamastercard-securecode';
		
	}else if(loginchkedvalue == 'prepaidcard')
	{
		login = '/assets/popuppages/Prepaid-card.htm?src=hp';
		register = 'https://leads.hdfcbank.com/applications/webforms/apply/forexplus_getcard.htm';
		knowmore = '/personal/products/cards/prepaid-cards';
	}else if(loginchkedvalue == 'merchantworld')
	{
		login = 'https://merchantworld.hdfcbank.com/e-portal/Master/index.aspx?src=sme_hp';
		/*register = 'https://leads.hdfcbank.com/applications/webforms/apply/forexplus_getcard.htm';*/
		knowmore = '/sme/payments-and-collections/merchant-services';
		
	}else if(loginchkedvalue == 'dealerfinance')
	{
		login = 'https://ifms.hdfcbank.com/delfin/Login.jsp';
		
	}
	if((loginchkedvalue == 'merchantworld') || (loginchkedvalue == 'dealerfinance')){
	if(loginchkedvalue == 'merchantworld')
	{
	$("#register").hide();
	$("#knowmore").show();
	}
	if(loginchkedvalue == 'dealerfinance')
	{
	$("#register").hide();
	$("#knowmore").hide();
	}
	}else{
	$("#register").show();
	$("#knowmore").show();
	}
	
	if(type == 'popup' && loginchkedvalue == 'dealerfinance')
        {
               window.open(login, '', 'width=1550,height=700,scrollbars=yes,menubar=yes,status=yes,resizable=yes,directories=false,location=false,left=0,top=0');
        }
		else if(type == 'popup')
        {
               window.open(login, '', 'width=1024,height=650,scrollbars=yes,menubar=yes,status=yes,resizable=yes,directories=false,location=false,left=0,top=0');
        }		
        else if(type == 'register' && loginchkedvalue == 'netbanking')
        {
               location.href=register;
        }
        else if(type == 'register')
        {
               window.open(register, '', 'width=1024,height=650,scrollbars=yes,menubar=yes,status=yes,resizable=yes,directories=false,location=false,left=0,top=0');
        }
        else if(type == 'knowmore')
        {
               location.href=knowmore;
        }
	
}




(function($) {
    $.cookie = function(key, value, options) {

        
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', 
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        

        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); 
        }
        return null;
    };
})(jQuery);

/*$(document).ready(function(){
$(".homecontent_wrapper .tabcontainer li").eq(1).addClass("selected").siblings().removeClass("selected");
$(".homecontent_wrapper .homecontent .hometab").eq(1).fadeIn().siblings().hide();        
                $("#directPayFeatures").eq(0).show().siblings().hide();
				$(document).on('change','#directPayFeatures',function(){
				$(this).find('option').removeClass('selected');			
				$(this).addClass('selected');			
				var index = $(this).index();
				alert(index);
								
								var optionValue = $(this).val();
								$('.select_bg .selectedvalue').html(optionValue);
								
                               
                               // $(".directPayFeaturesContent div").eq(index).css('display','block').siblings().css('display','none');
				
                
				});
});*/

$(document).ready(function(){
$(".homecontent_wrapper .tabcontainer li").eq(1).addClass("selected").siblings().removeClass("selected");
$(".homecontent_wrapper .homecontent .hometab").eq(1).fadeIn().siblings().hide();        
                $(".directPayFeature").eq(0).show().siblings().hide();
                $("#directPayFeatures").find('option').removeAttr('selected');
				$(document).on('change','#directPayFeatures',function()
                {
                                	
								var x=document.getElementById("directPayFeatures").selectedIndex;
                                var y=document.getElementById("directPayFeatures").options;
                                var index = y[x].index;
                                $(".directPayFeature").eq(index).show().siblings().hide();
								$('#directPayFeatures option').eq(index).addClass('selected').siblings().removeClass('selected');	
								$(this).parents('.billpay').find('.selectedvalue').html($('#directPayFeatures option.selected').text());
								
                });
});


$(window).load(function(){
var boxHeight = $(".impmessage").height()-85;
$(".impmessage").slideDown(1000);
var documentwidth = $(document).width();
documentwidth = (documentwidth - 940) / 2;
$(".impmessage").css({
"right": documentwidth
});
$(".impmessage .closebtn").click(function () {
$(this).parents(".impmessage").slideUp();
});
setTimeout(function(){
$(".impmessage").animate({'bottom':'-'+boxHeight+"px"},1000);
$(".impmessagebottom p").addClass("upArrow").removeClass("downArrow");
},2500);
$(".impmessagebottom p").click(function(){
if($(".impmessage").css("bottom")=="30px")
{
$(this).addClass("upArrow").removeClass("downArrow");
$(".impmessage").animate({'bottom':'-'+boxHeight+"px"});
}
else if($(".impmessage").css("bottom")=="-"+boxHeight+"px")
{
$(this).addClass("downArrow").removeClass("upArrow");
$(".impmessage").animate({'bottom':'30px'});
}
});
});

function updateCitySelect() {
    setTimeout(function () {
        var ddBase = $('.languagedropdown #citySelect:last');
        var hrf = $('#customertabs').attr('class');
        ddBase.find('option').removeAttr('selected');
        var otherLanguage = "";
        for (var i = 1; i < ddBase.find('option').length; i++) {
            var selVal = (ddBase.find('option').eq(i).val()).split('/')[1];
            if (selVal == hrf) {
                otherLanguage = i;
                break;
            }
        }

        if (otherLanguage != "") {
            ddBase.find('option').eq(otherLanguage).attr("selected", "selected").siblings().removeAttr("selected");
        } else {
            ddBase.find('option').eq(0).attr('selected', true).siblings().removeAttr("selected");
        }

        var txt = ddBase.find('option').eq(otherLanguage).text();
        
        ddBase.prev(".selectedvalue").find(".selecteddropval").text(txt);
        ddBase.prev(".selectedvalue").find(".selecteddropval").show("slow");
    }, 100);
}

$(function () {
   $('.languagedropdown #citySelect:last').prev(".selectedvalue").find(".selecteddropval").hide();
    updateCitySelect();
});
$(document).ready(function(){
if($(".logo").next('div').attr('class')!='christmas-band-img'){
var htmlText="<div class='christmas-band-img' style='padding-left:0px;width:720px'><a href='/htdocs/digital-campaign/digital.html?utm_source=Website&utm_medium=txt_banner&utm_term=Range&utm_campaign=BAMM' target='_blank'><img src='/assets/images/BAMM_Banner.jpg'></a><a href='https://home-loans.hdfc.com/wl1?WT.mc_id=P4_PrdPg_ChkElig1_HL?hp_slug' target='_blank'><img src='/assets/images/Slug_banner_home_loan_new.gif' style='float:right'></a></div>";
$(".logo").after(htmlText);
}
	
	
	var openedBanner,clickedA,index  = null;
	var $banners = $('.smhBannerBox .banner'); 
	var banner_count = $banners.length;
	$('.smhBannerBox .banner').hide();
	
	var bannerAnimation = function(){
		index = $('.dots li').index(this);
		var curBanner = $banners[index];
		if(openedBanner!=curBanner){
			$(openedBanner).fadeOut(500); $(curBanner).fadeIn(500);
			$(clickedA).removeClass('sel'); $(this).addClass('sel');
			clickedA = this; openedBanner=curBanner;
		}
		return false;
	}
	
	
	$('.dots li').click(bannerAnimation).eq(0).click();
	
	
	window.setInterval(function(){
		if(index < (banner_count)){$('.dots li').eq(index).click(); index++;}
		else index=0;
	},3000);

	


});



var auto_refresh=0;
function autocbk(){
	auto_refresh = setTimeout(function (){
		$(".callback").addClass("hover").animate({right: '0'});
		
	},10000); 
	
	auto_refresh = setTimeout(function (){
		$(".callback").stop(true).removeClass("hover").animate({right: '-165px'});
		
	}, 13000); 
}


$(document).ready(function(){
	

$(".callbkBtn").mouseover(function () { 
		$(this).addClass("sel");
		$(".callback").addClass("hover").animate({right: '0'});
		clearTimeout(auto_refresh); 
});
$(".callback").mouseleave(function(){
                $(".callbkBtn").removeClass("sel");
                $(".callback").stop(true).removeClass("hover").animate({right: '-160px'});
});

var liHeight=47;
var nextCon=1; 
var lengthTs = $('.callbackList li').length;
var moveSize=liHeight * 4;
 
$('.ud_prevBtn').click(function () {	
	if(nextCon==1)return;			
	 if(nextCon-1)
	 {
		 $(this).addClass('disable');
		 $(".ud_nextBtn").removeClass('disable');
	 }
	 nextCon--;
	 slideMoveSize=moveSize * (nextCon - 1); 
	 $(".callbackList").animate({marginTop:-slideMoveSize});
  });

$('.ud_nextBtn').click(function () {
  if(nextCon-1)return;
  if(nextCon==1) 
  {   
	  $(this).addClass('disable');
	  $(".ud_prevBtn").removeClass('disable'); 
  }
	 slideMoveSize=moveSize * nextCon; 
	 $(".callbackList").animate({marginTop:-slideMoveSize}); 
	 nextCon++;	 
	 
 });

});

/*Added on 18th Jun'15 --payzapp carousel-- Starts*/


	
function slider(className){
	var _this=$("."+className)
	var counter=0;
	var moveWidth=_this.find(".scroller li").outerWidth()+1;
	_this.find(".scroller ul").width(moveWidth*_this.find(".scroller li").length);
	_this.find(".prev").addClass('inActive')
	
	_this.find(".next").click(function(){
	    if(counter>=(_this.find("ul li").length-5)) return false;
		_this.find(".prev").removeClass('inActive')
		counter++;
		var moveVal=0;
		var i=0;
		while(i<counter){
			moveVal+=_this.find("ul li").eq(i).outerWidth()
			i++;
		}
		_this.find("ul").animate({'margin-left':-(moveVal)})
		
		if(counter>=(_this.find("ul li").length-5)) $(this).addClass('inActive')
	})
	
	_this.find(".prev").click(function(){	
		if(counter==0) return false;
		_this.find(".next").removeClass('inActive');
		counter--;
		
		var moveVal=0;
		var i=0;
		while(i<counter){
			moveVal+=_this.find("ul li").eq(i).outerWidth()
			i++;
		}
		_this.find("ul").animate({'margin-left':-(moveVal)})
		if(counter==0) $(this).addClass('inActive')
	})
}
function carousel(className){
	var _this=$("."+className)
	var counter=0;
	var moveWidth=_this.find(".scroller li").outerWidth();
	_this.find(".scroller ul").width(moveWidth*_this.find(".scroller li").length);
	_this.find(".prev").addClass('inActive')
	
	_this.find(".next").click(function(){
	    if(counter>=(_this.find("ul li").length-1)) return false;
		_this.find(".prev").removeClass('inActive')
		counter++;
		var moveVal=0;
		var i=0;
		while(i<counter){
			moveVal+=_this.find("ul li").eq(i).outerWidth()
			i++;
		}
		_this.find("ul").animate({'margin-left':-(moveVal)})
		
		if(counter>=(_this.find("ul li").length-1)) $(this).addClass('inActive')
	})
	
	_this.find(".prev").click(function(){	
		if(counter==0) return false;
		_this.find(".next").removeClass('inActive');
		counter--;
		
		var moveVal=0;
		var i=0;
		while(i<counter){
			moveVal+=_this.find("ul li").eq(i).outerWidth()
			i++;
		}
		_this.find("ul").animate({'margin-left':-(moveVal)})
		if(counter==0) $(this).addClass('inActive')
	})
}


/*Added on 18th Jun'15 --payzapp carousel-- Ends*/

/* Added on 17-08-16 by J */


    
    /* Custom Scroll */



(function ($) {
    function _ClassyScroll(c, s) {
        this.container = $(c);
        this.settings = s;
        this.timer = 0;
        this.before = {
            'v': 0,
            'h': 0
        };
        this.touch = {};
        this.pressed = 0;
        this.vslider = $('<div/>', {
            'class': 'scrollbar-handle'
        });
        this.vpath = $('<div/>', {
            'class': 'scrollbar-path-vertical'
        });
        this.hslider = $('<div/>', {
            'class': 'scrollbar-handle'
        });
        this.hpath = $('<div/>', {
            'class': 'scrollbar-path-horizontal'
        });
        this.sliders = this.vslider.add(this.hslider);
        this.container.css({
            'overflow': 'hidden',
            'position': 'relative'
        }).contents().filter(this.settings.contentFilter).wrapAll('<div class="scrollbar-content"></div>');
        this.content = this.container.children('.scrollbar-content').css({
            'top': 0,
            'left': 0,
            'position': 'relative',
            'float': 'left'
        });
        if (this.settings.scroll == 'horizontal') {
            this.container.prepend(this.hpath.append(this.hslider))
        }
        else if (this.settings.scroll == 'vertical') {
            this.container.prepend(this.vpath.append(this.vslider))
        }
        else {
            this.container.prepend(this.vpath.append(this.vslider), this.hpath.append(this.hslider))
        }
        this.vpath.add(this.hpath).css({
            'z-index': this.settings.zIndex,
            'display': 'none'
        });
        this.vslider.css({
            'height': this.settings.sliderSize,
            'opacity': this.settings.sliderOpacity
        });
        this.hslider.css({
            'width': this.settings.sliderSize,
            'opacity': this.settings.sliderOpacity
        });
        if (this.settings.sliderOpacity) {
            this.sliders.hover(this.fixFn(function () {
                this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1)
            }), this.fixFn(function () {
                if (!this.pressed) {
                    this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
                }
            }))
        }
        this.init();
        this.pathSize();
        this.bindEvent($(window), 'load', function () {
            setTimeout(this.fixFn(this.checkScroll), 10)
        });
        if (this.settings.lazyCheckScroll > 0) {
            setInterval(this.fixFn(this.checkScroll), this.settings.lazyCheckScroll)
        }
    }
    _ClassyScroll.prototype.checkScroll = function () {
        this.vtrack = this.vpath.height() - this.vslider.height();
        this.htrack = this.hpath.width() - this.hslider.width();
        this.vdiff = this.content.height() - this.container.height();
        this.hdiff = this.content.width() - this.container.width();
        if (!this.settings.autoHide) return;
        if (this.vdiff > 0) {
            this.vpath.fadeIn(this.settings.autoHideTime)
        }
        else {
            this.vpath.fadeOut(this.settings.autoHideTime)
        }
        if (this.hdiff > 0) {
            this.hpath.fadeIn(this.settings.autoHideTime)
        }
        else {
            this.hpath.fadeOut(this.settings.autoHideTime)
        }
    };
    _ClassyScroll.prototype.pathSize = function () {
        var a = parseInt(this.settings.pathPadding, 10);
        this.vpath.css({
            'top': a + 'px',
            'height': this.container.height() - 2 * a + 'px'
        });
        this.hpath.css({
            'left': a + 'px',
            'width': this.container.width() - 2 * a + 'px'
        })
    };
    _ClassyScroll.prototype.scroll = function (v, h, e) {
        var a = 0;
        var b = 0;
        if (v < 0) {
            v = 0
        }
        if (v > this.vtrack) {
            v = this.vtrack
        }
        this.vslider.css('top', v + 'px');
        if (h < 0) {
            h = 0
        }
        if (h > this.htrack) {
            h = this.htrack
        }
        this.hslider.css('left', h + 'px');
        if (this.vdiff > 0) {
            b = v / this.vtrack;
            this.content.css('top', Math.round(-this.vdiff * b));
            if (e && (v && v != this.vtrack)) {
                e.stopPropagation();
                e.preventDefault()
            }
        }
        if (this.hdiff > 0) {
            a = h / this.htrack;
            this.content.css('left', Math.round(-this.hdiff * a));
            if (e && (h && h != this.htrack)) {
                e.stopPropagation();
                e.preventDefault()
            }
        }
        if (this.before.v != b || this.before.h != a) {
            if (typeof this.settings.onscroll == 'function') {
                this.settings.onscroll.call(this.container.get(0), b, a)
            }
            this.before.v = b;
            this.before.h = a
        }
    };
    _ClassyScroll.prototype.easeScroll = function (v, h) {
        var n = 0;
        var a = Math.floor(this.settings.scrollTime / this.settings.scrollInterval);
        var b = this.vslider.position().top;
        var c = this.hslider.position().left;
        var d = $.easing[this.settings.scrollEasing] || $.easing.linear;
        this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1);
        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.fixFn(function () {
            this.scroll(b + d(n / a, n, 0, 1, a) * v, c + d(n / a, n, 0, 1, a) * h);
            if (++n > a) {
                window.clearInterval(this.timer);
                this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }
        }), this.settings.scrollInterval)
    };
    _ClassyScroll.prototype.fixFn = function (f, s) {
        var a = this;
        return function () {
            f.apply(s || a, Array.prototype.slice.call(arguments))
        }
    };
    _ClassyScroll.prototype.bindEvent = function (t, e, f, s) {
        return t.bind(e, this.fixFn(f, s))
    };
    _ClassyScroll.prototype.init = function () {
        var f = $(window.document);
        this.bindEvent(this.sliders, 'mousedown', function (e) {
            this.pressed = (e.target === this.vslider.get(0)) ? 1 : 2;
            var a = e.pageX;
            var b = e.pageY;
            var c = this.vslider.position().top;
            var d = this.hslider.position().left;
            this.bindEvent(f, 'mousemove', function (e) {
                if (this.pressed == 1) {
                    this.scroll(c + (e.pageY - b), d)
                } else {
                    this.scroll(c, d + (e.pageX - a))
                }
            });
            this.bindEvent(f, 'selectstart', function (e) {
                e.preventDefault()
            })
        });
        this.bindEvent(f, 'mouseup', function (e) {
            if (this.pressed == 1 && e.target !== this.vslider.get(0)) {
                this.vslider.fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }
            else if (this.pressed == 2 && e.target !== this.hslider.get(0)) {
                this.hslider.fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }
            this.pressed = 0;
            f.unbind('mousemove');
            f.unbind('selectstart')
        });
        this.bindEvent(this.container, 'touchstart', function (e) {
            var a = e.originalEvent;
            var b = a.changedTouches[0];
            this.touch.sx = b.pageX;
            this.touch.sy = b.pageY;
            this.touch.sv = this.vslider.position().top;
            this.touch.sh = this.hslider.position().left;
            this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1);
            a.stopPropagation()
        });
        this.bindEvent(this.container, 'touchmove', function (e) {
            var a = e.originalEvent;
            var b = a.targetTouches[0];
            this.scroll(this.touch.sv + (this.touch.sy - b.pageY) * this.settings.touchSpeed, this.touch.sh + (this.touch.sx - b.pageX) * this.settings.touchSpeed);
            a.preventDefault();
            a.stopPropagation()
        });
        this.bindEvent(this.container, 'touchend touchcancel', function (e) {
            var a = e.originalEvent;
            var b = a.changedTouches[0];
            this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity);
            a.stopPropagation()
        });
        var g = this.vpath.height(),
        htrack = this.hpath.width();
        this.bindEvent($(window), 'resize', function () {
            this.pathSize();
            this.checkScroll();
            if (this.vdiff <= 0) {
                this.content.css('top', 0)
            }
            if (this.hdiff <= 0) {
                this.content.css('left', 0)
            }
            this.scroll(Math.round(parseInt(this.vslider.css('top'), 10) * this.vpath.height() / g), Math.round(parseInt(this.hslider.css('left'), 10) * this.hpath.width() / htrack));
            g = this.vpath.height();
            htrack = this.hpath.width()
        });
        this.bindEvent(this.container, 'mousewheel', function (e, a, b, c) {
            this.scroll(this.vslider.position().top - this.settings.wheelSpeed * c, this.hslider.position().left + this.settings.wheelSpeed * b, e);
            this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1);
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(this.fixFn(function () {
                this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }), this.settings.sliderOpacityDelay);
            if (this.settings.blockGlobalScroll && (this.vdiff || this.hdiff)) {
                e.preventDefault();
                e.stopPropagation()
            }
        });
        this.bindEvent(f, 'keydown', function (e) {
            var a = 0,
            vkey = 0;
            vkey = (e.keyCode == 38) ? -this.settings.keyScroll : vkey;
            vkey = (e.keyCode == 40) ? this.settings.keyScroll : vkey;
            a = (e.keyCode == 37) ? -this.settings.keyScroll : a;
            a = (e.keyCode == 39) ? this.settings.keyScroll : a;
            if (vkey || a) {
                this.easeScroll(vkey, a)
            }
        });
        this.bindEvent(this.container, 'uscrollbar', function (e, v, h, a) {
            if (v === 'reset') {
                this.container.find('.scrollbar-content, .scrollbar-handle').stop().css({
                    top: 0,
                    left: 0
                });
                return
            }
            v = v || 0;
            h = h || 0;
            e.stopPropagation();
            if (/^[-\d\.]+$/.test(v)) {
                v = parseFloat(v);
                if (Math.abs(v) <= 1 && !a) {
                    v *= this.vtrack
                }
                else {
                    v = v + v * (this.vtrack / this.vdiff - 1)
                }
            }
            if (/^[-\d\.]+$/.test(h)) {
                h = parseFloat(h);
                if (Math.abs(h) <= 1 && !a) {
                    h *= this.htrack
                }
                else {
                    h = h + h * (this.htrack / this.hdiff - 1)
                }
            }
            this.easeScroll(v, h)
        })
    };
    $.fn.ClassyScroll = function (s) {
        var a = {
            scroll: 'both',
            autoHide: true,
            autoHideTime: 'fast',
            lazyCheckScroll: 1000,
            blockGlobalScroll: false,
            contentFilter: '*',
            sliderSize: '30%',
            sliderOpacity: 0.5,
            sliderOpacityTime: 200,
            sliderOpacityDelay: 1000,
            wheelSpeed: 20,
            touchSpeed: 0.3,
            pathPadding: '20px',
            keyScroll: 100,
            scrollTime: 500,
            scrollInterval: 15,
            scrollEasing: 'swing',
            zIndex: 100,
            onscroll: function () {}
        };
        $.extend(a, s);
        return this.each(function () {
            new _ClassyScroll(this, a)
        })
    }
})(jQuery);


(function($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },
    
        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
    
        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
    
        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) {
            delta = orgEvent.wheelDelta/120;
        }
        if ( orgEvent.detail     ) {
            delta = -orgEvent.detail/3;
        }
    
        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;
    
        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }
    
        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) {
            deltaY = orgEvent.wheelDeltaY/120;
        }
        if ( orgEvent.wheelDeltaX !== undefined ) {
            deltaX = -1*orgEvent.wheelDeltaX/120;
        }
    
        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);
    
        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);

$(document).ready(function() {
//to hide home tab and select class in navigation - start
$(".headerWrapper .navigation ul li").eq(0).find(".menutext").eq(1).hide();
$(".headerWrapper .navigation ul li").eq(1).removeClass("select");
//to hide home tab and select class in navigation - end
                $('.scrollbars').ClassyScroll();
            });

/* Custom Scroll */
    $(document).ready(function() {
        var homepagelearningcenterLength = $(".homelearningcenterinner ul li").length
        
        //$('#hmlearningcentercount').text(homepagelearningcenterLength);
		
	  var homepageTickerLiLength = $(".homepagenewsTicker ul li").length
var homepagenewsTickerTimer;
        //$('#hmnewscount').text(homepageTickerLiLength);

$(".homepagenewsTicker ul").css("width",homepageTickerLiLength*$(".homepagenewsTicker ul li").width()+"px");

$(".news .next").click(function(){
				if (!$(".homepagenewsTicker ul").is(':animated'))
{
								$(".homepagenewsTicker ul li:first").clone().appendTo($(".homepagenewsTicker ul"));
								var homepagenewsTickerCurrMargin = $(".homepagenewsTicker ul").css("margin-left");

								$(".homepagenewsTicker ul").animate({"margin-left":"-=307px"},function(){
												$(".homepagenewsTicker ul").css("margin-left", "0px"); $(".homepagenewsTicker ul li:first-child").remove()
								});
				}
});


$(".news .prev").click(function(){
				$(".homepagenewsTicker ul li").last().clone().prependTo($(".homepagenewsTicker ul"));
$(".homepagenewsTicker ul li:last-child").remove();
				$(".homepagenewsTicker ul").css("margin-left", "-307px");
				
				if(!$(".homepagenewsTicker ul").is(':animated'))
				{
								var homepagenewsTickerCurrMargin = $(".homepagenewsTicker ul").css("margin-left");
								$(".homepagenewsTicker ul").animate({"margin-left":"+=307px"});
				}
});
// Autoplay start
homepagenewsTickerTimer = setInterval(function(){
				if (!$(".homepagenewsTicker ul").is(':animated'))
{
								$(".homepagenewsTicker ul li:first").clone().appendTo($(".homepagenewsTicker ul"));
								var homepagenewsTickerCurrMargin = $(".homepagenewsTicker ul").css("margin-left");

								$(".homepagenewsTicker ul").animate({"margin-left":"-=307px"},function(){
												$(".homepagenewsTicker ul").css("margin-left", "0px"); $(".homepagenewsTicker ul li:first-child").remove()
								});
				}
},5000);

$(".news .prev, .news .next").click(function(){
				clearInterval(homepagenewsTickerTimer);
});
// Autoplay end
	
	$(".searchClick").click(function(e) {
		e.preventDefault();
		$('.searchWrap').slideToggle();
		$('.closeSearch').show();
		});
		
		//$('.closeSearch').show();
		$(".closeSearch").click(function() {
		$('.searchWrap').slideUp();
		$('.closeSearch').hide();
		});
		  
 }); 

/* /Added on 17-08-16 by J */
$(document).ready(function() {
		$(".registerWrap a#loginsubmit").click(function(){
			netbankinglogin('popup');
		});
		$(".registerWrap a#knowmore").click(function(){
			netbankinglogin('knowmore');
		});
		$(".registerWrap a#register").click(function(){
			netbankinglogin('register');
		});
	});	
