/*
Custom JavaScript
*/
var marginTop = 0;
$(document).ready(function () {

    /* Add Class in review buttn to load dynamic url */
    //$('.btn-wrap .btn-lg[data-target="#reviewModel"]').addClass('reviewOpen').attr('data-fancybox-type', 'iframe');
    //$('.review-btn a').addClass('btn-lg reviewOpen').attr('data-fancybox-type', 'iframe');

    /* search script */
    // JavaScript source code

    ///emi card apply link hide
    $("a[href*='http://emi-cards.bajajfinserv.in/']").each(function () {
        $(this).hide();
        $(this).parent('.apply-btn-device').removeClass('visible-xs-block').hide();
    });
    //emi card apply link hide end

    $(".search-field input").click(function () {
        $(this).val("");
    });

    $('#formSearch :submit').click(function (e) {
        e.preventDefault();
        window.location.href = "/finance/search.aspx?val=" + $('#inputQuery').val();
    });

    $('#inputQuery').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            $('#go').click();//Trigger search button click event
        }
    });

    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this,
              currentCategory = "";
            $.each(items, function (index, item) {
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                that._renderItemData(ul, item);
            });
        }
    });

    $('.breadcrumb span').each(function () {
        $(this).html().replace('&gt;','');
        //alert($(this).html());
    });

	$('#back-top').click(function () {
	    $('html,body').stop().animate({ scrollTop: 0 }, 500);
	});

	$('#footer-cta .toggle-cta').click(function() {
		if ($(this).parent().hasClass('slidedown')) {
			$(this).parent().removeClass('slidedown');
		}else{
			$(this).parent().addClass('slidedown');
		}
	});
 
 vph = $(window).height();
 vph = vph - 125;
 $('#mobile-hamb-nav .tab-pane #sync1 , #mobile-hamb-nav .tab-pane #sync4, #mobile-hamb-nav .tab-pane #sync5').css({'height': vph + 'px' });

var attr = $(this).attr('aria-expanded');
$('#hambDropDown > a').click(function(){
	var attr = $(this).attr('aria-expanded');
	if( attr == 'false'){
		$('html, body').addClass('noscroll');
	}else{
		$('html, body').removeClass('noscroll');
	}
});

 $('.more').click(function(){
	$('#our-product').slideToggle();
     $('#show-product').slideToggle();
	   $('.more').slideToggle();
	  
 });

$('.less').click(function(){
	$('#our-product').slideToggle();
     $('#show-product').slideToggle();
	 $('.more').slideToggle();
	 
      
});
  $('.less').click(function(){
	$('html, body').animate({scrollTop: $('#our-product').offset().top - 100}, 'slow');
 });
 
	
	/* product carousal */
	  var owl1 = $("#productCarousel");
	  	    
			   owl1.owlCarousel({
				   rewindNav : false,
					items : 5,
					itemsDesktop      : [1199,4],
					itemsDesktopSmall     : [979,3],
					itemsTablet       : [768,2],
					itemsMobile       : [479,1],
			   afterAction: function(el){
				   //remove class active
				   this
				   .$owlItems
				   .removeClass('active')
      
				   //add class active
				   this
				   .$owlItems //owl internal $ object containing items
				   .eq(this.currentItem + 1)
				   .addClass('active')
      
				}
				});
	 
		var options1 = {
			autoPlay: false, //Set AutoPlay to 3 seconds
			pagination : false
			
    };
		owl1.owlCarousel(options1);

  // product carousal Navigation Events
	  $(".next").click(function(){
		owl1.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl1.trigger('owl.prev');
	  })
  
	
	
	/* blog carousal */
		var owl = $("#blogCarousal");
	 var options = {
        autoPlay: false, //Set AutoPlay to 3 seconds
		rewindNav : false,
		pagination : false,
		items : 4,
		navigation:true,
		 navigationText: [
      "<i class='icon-chevron-left icon-white'><i class='fa fa-angle-left'></i></i>",
      "<i class='icon-chevron-right icon-white'><i class='fa fa-angle-right'></i></i>"
      ],
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]
    };
		var owl = $("#blogCarousal");
	 var options = {
        autoPlay: false, //Set AutoPlay to 3 seconds
		rewindNav : false,
		pagination : false,
		items : 4,
		navigation:true,
		 navigationText: [
      "<i class='icon-chevron-left icon-white'><i class='fa fa-angle-left'></i></i>",
      "<i class='icon-chevron-right icon-white'><i class='fa fa-angle-right'></i></i>"
      ],
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]
    };
	
	
	var owl = $("#blogCarousal");
	 var options = {
        autoPlay: false, //Set AutoPlay to 3 seconds
		rewindNav : false,
		pagination : false,
		items : 4,
		navigation:true,
		 navigationText: [
      "<i class='icon-chevron-left icon-white'><i class='fa fa-angle-left'></i></i>",
      "<i class='icon-chevron-right icon-white'><i class='fa fa-angle-right'></i></i>"
      ],
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3]
    };
	
	
	owl.owlCarousel(options);
	
	$("#blogCarousalWrap .next").click(function(){
		owl.trigger('owl.next');
	});
	$("#blogCarousalWrap .prev").click(function(){
		owl.trigger('owl.prev');
	});
	
	function showProjectsbyCat(cat) {
        var owl = $("#blogCarousal").data('owlCarousel');

        owl.addItem('<div/>', 0);
        
        var nb = owl.itemsAmount;
        for (var i = 0; i < (nb - 1); i++) {
            owl.removeItem(1);
        }
        
        if (cat == 'all') {
            $('#blogCarousalCopy .item').each(function () {
                owl.addItem($(this).clone());
            });
        } else {
            $('#blogCarousalCopy .item.' + cat).each(function () {
                owl.addItem($(this).clone());
            });
        }
        owl.removeItem(0);
    }
    $('#blogCarousal .item').clone().appendTo($('#blogCarousalCopy'));
    $('#carousalFilterTab a').click(function (e) {
        e.preventDefault();
        $('#carousalFilterTab a').removeClass('active');

        cat = $(this).attr('ID');
        $(this).addClass('active');
        showProjectsbyCat(cat);
    });
	
	/* end blog carousal */
	
	
	  /*mobile tabs  */
	$( "#mob-tabs-wrap .mob-tab a" ).click(function() {
		if (  $( this ).parent().hasClass( "active" ) ) {
			 $( this ).parent().removeClass('active');
		}else{
			$( '#mob-tabs-wrap .mob-tab' ).removeClass('active'); 
			$( this ).parent().addClass('active');
		}	
	});
	
	
	
	/* bootstrap dropdown menu*/
	$(".hamb-nav .dropdown-submenu ").hover(
       function() {  $(this).addClass("open");    
        },
       function() {$(this).removeClass("open"); 
    });
	
	$("#header-top-wrap .dropdown, #header-top-wrap.dropdown-submenu ").hover(
       function() {  $(this).addClass("open");    
        },
       function() {$(this).removeClass("open"); 
    });
	$("#nav-short .dropdown,#nav-short .dropdown-submenu").hover(
       function() {  $(this).addClass("open");    
        },
       function() {$(this).removeClass("open"); 
    });
	
	$(".nav-centre.desk .dropdown,.nav-centre.desk .dropdown-submenu").hover(
       function() {  $(this).addClass("open");
        },
       function() {$(this).removeClass("open"); 
    }); 
  	 
	
	$(".dropdown-menu > li > a.trigger").on("click",function(e){
		var current=$(this).next();
		var grandparent=$(this).parent().parent();
		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".dropdown-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});
	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root=$(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		//root.find('.dropdown-menu:visible').hide();
	});
	
		$(".hamb-nav .dropdown-menu > li > a.trigger").on("click",function(e){
		var current=$(this).next();
		var grandparent=$(this).parent().parent();
		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".dropdown-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});
	$(".hamb-nav .dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root=$(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.dropdown-menu:visible').hide();
	});
 
	 
				/*dropdown inner content clickable*/
				 $('#hambTabs').on('click', '.nav-tabs a', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
				
			    $('.mob-accordion1').on('click', '.panel-heading', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
				 $('.mob-accordion2').on('click', '.panel-heading', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
				  $('.mob-accordion3').on('click', '.panel-heading', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
				 $('#sync2').on('click', '.owl-item .item', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
				$('#sync3').on('click', '.owl-item .item', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
				$('#sync6').on('click', '.owl-item .item', function(){
					$(this).closest('.dropdown').addClass('dontClose');
				})
			
 

				$('#hambDropDown').on('hide.bs.dropdown', function(e) {
					if ( $(this).hasClass('dontClose') ){
						e.preventDefault();
					}
					$(this).removeClass('dontClose');
				});
	
 
     /*product page home slider tabs*/
	 $('#product-slider-wrap .nav-tabs > li').mouseover( function(){
		$(this).find('a').tab('show');
	});
	$('#product-slider-wrap .nav-tabs > li').mouseout( function(){
		$(this).find('.tab-pane .fade').tab('hide');
	});
	
	$('#show-product .thumbnail').click(function(){
		
		 $(this).css('opacity',1);
	});
 
 
	   /*home slider know more Button */
		$('.accordion1').hover(function() { 
			  $('#slideone').addClass('in').stop(true, true).delay(200).slideDown(500);
			  $('.accordion1 .panel-heading').addClass('active').stop(true, true).delay(200).slideDown(500);
			}, function() {
			   $('#slideone').addClass('in').stop(true, true).delay(200).slideUp(500);
				$('.accordion1 .panel-heading').removeClass('active').stop(true, true).delay(200).slideDown(500);
		});
		 
		 $('.accordion2').hover(function() { 
			  $('#slidetwo').addClass('in').stop(true, true).delay(200).slideDown(500);
			   $('.accordion2 .panel-heading').addClass('active').stop(true, true).delay(200).slideDown(500);
			}, function() {
			   $('#slidetwo').addClass('in').stop(true, true).delay(200).slideUp(500);
				$('.accordion2 .panel-heading').removeClass('active').stop(true, true).delay(200).slideDown(500);
		});
		 
		 $('.accordion3').hover(function() { 
			  $('#boxslide1').addClass('in').stop(true, true).delay(200).slideDown(500);
			   $('.accordion3 .panel-heading').addClass('active').stop(true, true).delay(200).slideDown(500);
			}, function() {
			   $('#boxslide1').addClass('in').stop(true, true).delay(200).slideUp(500);
			   $('.accordion3 .panel-heading').removeClass('active').stop(true, true).delay(200).slideDown(500);
		});
		 
		 $('.accordion4').hover(function() { 
			  $('#boxslide2').addClass('in').stop(true, true).delay(200).slideDown(500);
			  $('.accordion4 .panel-heading').addClass('active').stop(true, true).delay(200).slideDown(500);
			}, function() {
			   $('#boxslide2').addClass('in').stop(true, true).delay(200).slideUp(500);
			   $('.accordion4 .panel-heading').removeClass('active').stop(true, true).delay(200).slideDown(500);
		});
		 
		 $('.accordion5').hover(function() { 
			  $('#boxslide3').addClass('in').stop(true, true).delay(200).slideDown(500);
			  $('.accordion5 .panel-heading').addClass('active').stop(true, true).delay(200).slideDown(500);
			}, function() {
			   $('#boxslide3').addClass('in').stop(true, true).delay(200).slideUp(500);
			   $('.accordion5 .panel-heading').removeClass('active').stop(true, true).delay(200).slideDown(500);
		});

		 $('.accordion6').hover(function () {
		     $('#boxslide4').addClass('in').stop(true, true).delay(200).slideDown(500);
		     $('.accordion6 .panel-heading').addClass('active').stop(true, true).delay(200).slideDown(500);
		 }, function () {
		     $('#boxslide4').addClass('in').stop(true, true).delay(200).slideUp(500);
		     $('.accordion6 .panel-heading').removeClass('active').stop(true, true).delay(200).slideDown(500);
		 });

		$('.accordionfs').hover(function() { 
		  $(this).children().children('.panel-heading').addClass('active');
		}, function(){
			$(this).children().children('.panel-heading').removeClass('active');
		});
		
		
        /*end of home slider know more Button */
  
  
  /*mobile hamb-nav menu js*/
  
var sync1 = $("#sync1");
var sync2 = $("#sync2");
 
 
   sync1.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition1,
    responsiveRefreshRate : 200,
  });
 
 sync2.owlCarousel({
    items : 3,
    itemsDesktop      : [1199,10],
    itemsDesktopSmall     : [979,10],
    itemsTablet       : [768,3],
    itemsMobile       : [479,3],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
  
  

	
    
 
  function syncPosition1(el){
    var current = this.currentItem;
    $("#sync2")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#sync2").data("owlCarousel") !== undefined){
      center1(current)
    }
	/*$(".hamb-accrd .panel-heading").removeClass('collapsed');*/
	$(".hamb-accrd .panel-heading").attr("aria-expanded","false");
	$(".hamb-accrd .panel-collapse").removeClass('in');
	$(".hamb-accrd .panel-heading").addClass('collapsed');
	
	
	
  }
 
  $("#sync2").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
  });
 
  function center1(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
      if(num === sync2visible[i]){
        var found = true;
      }
    }
 
    if(found===false){
      if(num>sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", num - sync2visible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        sync2.trigger("owl.goTo", num);
      }
    } else if(num === sync2visible[sync2visible.length-1]){
      sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
      sync2.trigger("owl.goTo", num-1)
    }
    
  }
 
 /*second */

var sync3 = $("#sync3");
var sync4 = $("#sync4");
  
     sync4.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:true,
    afterAction : syncPosition2,
    responsiveRefreshRate : 200,
  });
 
 sync3.owlCarousel({
    items : 3,
    itemsDesktop      : [1199,10],
    itemsDesktopSmall     : [979,10],
    itemsTablet       : [768,3],
    itemsMobile       : [479,3],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
  
    
 
  function syncPosition2(el){
    var current = this.currentItem;
    $("#sync3")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#sync3").data("owlCarousel") !== undefined){
      center2(current)
    }
  }
 
  $("#sync3").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync4.trigger("owl.goTo",number);
  });
 
  function center2(number){
    var sync3visible = sync3.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync3visible){
      if(num === sync3visible[i]){
        var found = true;
      }
    }
 
    if(found===false){
      if(num>sync3visible[sync3visible.length-1]){
        sync3.trigger("owl.goTo", num - sync3visible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        sync3.trigger("owl.goTo", num);
      }
    } else if(num === sync3visible[sync3visible.length-1]){
      sync3.trigger("owl.goTo", sync3visible[1])
    } else if(num === sync3visible[0]){
      sync3.trigger("owl.goTo", num-1)
    }
    
  }
 
 
 /*third*/
 
var sync5 = $("#sync5");
var sync6 = $("#sync6");
  
    sync5.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition3,
    responsiveRefreshRate : 200,
  });
 
 sync6.owlCarousel({
    items : 3,
    itemsDesktop      : [1199,10],
    itemsDesktopSmall     : [979,10],
    itemsTablet       : [768,3],
    itemsMobile       : [479,3],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
  
    
  function syncPosition3(el){
    var current = this.currentItem;
    $("#sync6")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#sync6").data("owlCarousel") !== undefined){
      center3(current)
    }
  }
 
  $("#sync6").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync5.trigger("owl.goTo",number);
  });
 
  function center3(number){
    var sync6visible = sync6.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync6visible){
      if(num === sync6visible[i]){
        var found = true;
      }
    }
 
    if(found===false){
      if(num>sync6visible[sync6visible.length-1]){
        sync6.trigger("owl.goTo", num - sync6visible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        sync6.trigger("owl.goTo", num);
      }
    } else if(num === sync6visible[sync6visible.length-1]){
      sync6.trigger("owl.goTo", sync6visible[1])
    } else if(num === sync6visible[0]){
      sync6.trigger("owl.goTo", num-1)
    }
    
  }
  
  /*Review star*/
  (function(e){var t,o={className:"autosizejs",append:"",callback:!1,resizeDelay:10},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o;"getComputedStyle"in window?(t=window.getComputedStyle(u,null),o=u.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){o-=parseInt(t[i],10)}),s.style.width=o+"px"):s.style.width=Math.max(p.width(),0)+"px"}function a(){var a={};if(t=u,s.className=i.className,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}})(window.jQuery||window.$);

var __slice=[].slice;(function(e,t){var n;n=function(){function t(t,n){var r,i,s,o=this;this.options=e.extend({},this.defaults,n);this.$el=t;s=this.defaults;for(r in s){i=s[r];if(this.$el.data(r)!=null){this.options[r]=this.$el.data(r)}}this.createStars();this.syncRating();this.$el.on("mouseover.starrr","span",function(e){return o.syncRating(o.$el.find("span").index(e.currentTarget)+1)});this.$el.on("mouseout.starrr",function(){return o.syncRating()});this.$el.on("click.starrr","span",function(e){return o.setRating(o.$el.find("span").index(e.currentTarget)+1)});this.$el.on("starrr:change",this.options.change)}t.prototype.defaults={rating:void 0,numStars:5,change:function(e,t){}};t.prototype.createStars=function(){var e,t,n;n=[];for(e=1,t=this.options.numStars;1<=t?e<=t:e>=t;1<=t?e++:e--){n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"))}return n};t.prototype.setRating=function(e){if(this.options.rating===e){e=void 0}this.options.rating=e;this.syncRating();return this.$el.trigger("starrr:change",e)};t.prototype.syncRating=function(e){var t,n,r,i;e||(e=this.options.rating);if(e){for(t=n=0,i=e-1;0<=i?n<=i:n>=i;t=0<=i?++n:--n){this.$el.find("span").eq(t).removeClass("glyphicon-star-empty").addClass("glyphicon-star")}}if(e&&e<5){for(t=r=e;e<=4?r<=4:r>=4;t=e<=4?++r:--r){this.$el.find("span").eq(t).removeClass("glyphicon-star").addClass("glyphicon-star-empty")}}if(!e){return this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty")}};return t}();return e.fn.extend({starrr:function(){var t,r;r=arguments[0],t=2<=arguments.length?__slice.call(arguments,1):[];return this.each(function(){var i;i=e(this).data("star-rating");if(!i){e(this).data("star-rating",i=new n(e(this),r))}if(typeof r==="string"){return i[r].apply(i,t)}})}})})(window.jQuery,window);$(function(){return $(".starrr").starrr()})

$(function(){

  $('#new-review').autosize({append: "\n"});

  var reviewBox = $('#post-review-box');
  var newReview = $('#new-review');
  var openReviewBtn = $('#open-review-box');
  var closeReviewBtn = $('#close-review-box');
  var ratingsField = $('#ratings-hidden');

  openReviewBtn.click(function(e)
  {
    reviewBox.slideDown(400, function()
      {
        $('#new-review').trigger('autosize.resize');
        newReview.focus();
      });
    openReviewBtn.fadeOut(100);
    closeReviewBtn.show();
  });

  closeReviewBtn.click(function(e)
  {
    e.preventDefault();
    reviewBox.slideUp(300, function()
      {
        newReview.focus();
        openReviewBtn.fadeIn(200);
      });
    closeReviewBtn.hide();
    
  });

  $('.starrr').on('starrr:change', function(e, value){
    ratingsField.val(value);
  });
});
  
 //Mobile menu sliddown 
 $('.mob .dropdown').on('show.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});
 $('.mob .dropdown').on('hide.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).hide();
});


 /*mobile blog  carousel*/
	var owl = $(".mob-blog-owl,#product-first-owl");
	owl.owlCarousel({
        autoPlay: false, //Set AutoPlay to 3 seconds
		rewindNav : false,
		pagination : false,
		items : 4,
		navigation:true,
		 navigationText: [
      "<i class='icon-chevron-left icon-white'><i class='fa fa-angle-left'></i></i>",
      "<i class='icon-chevron-right icon-white'><i class='fa fa-angle-right'></i></i>"
      ],
		  itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 2]
      ]
      
  });
 
 /*product page tabs content*/
 $('.tabstop').click(function(){
	$('html, body').animate({scrollTop: $('#main-content').offset().top - 20}, 'slow');
 });
  
 
	  
	
    	/*hamb nav mobile aapped hamb-footer*/
 $( "#sync1" ).append( $('.hamb-footer1'));
 $( "#sync4" ).append( $('.hamb-footer2'));
 $( "#sync5" ).append( $('.hamb-footer3'));
 
 
    $('.item').click(function(){
		  $("#sync1").animate({ scrollTop: 0 }, "fast");
		  $("#sync4").animate({ scrollTop: 0 }, "fast");
		  $("#sync5").animate({ scrollTop: 0 }, "fast");
        /*setTimeout(function(){ $('#windowModel').modal('show'); }, 10000);*/
		  
    });
    var ulvalscroll = $("#header-nav").height() + $("#image-Carousel").height() + $("#intro").height();
    $(".tabstop").parent().parent().attr('data-offset-top', ulvalscroll);
    //alert(ulvalscroll);

    $(".totalcount").click(function () {
        $('body,html').animate({ scrollTop: $("#productreview").offset().top - 125, },'fast');
    });
});

/*Window model popup*/
$(window).load(function(){
    avgcount();
     $('.totalcount').html('<span>' + $("p.rating-num").html() +' / '+ $('.ratingCount').html() + '</span>');
    var wwidth = $(window).width();
if(wwidth <= 767){
 $(".panel-group .panel").each(function(){
    if($(this).children('.panel-collapse').hasClass('in')){
         $('html,body').animate({
            scrollTop:$(this).offset().top -$("#header-nav").height()},500);
    }

});
}
});

/* Rating avarage for stars */
function avgcount() {
    var avg = $('.average').text();
    avg = parseFloat(avg);

    if (avg > 1.0 && avg <= 1.5) {
        $(".avgrate").css('width', '20%');
    }

    if (avg > 1.5 && avg <= 2.0) {
        $(".avgrate").css('width', '30%');
    }

    if (avg > 2.0 && avg <= 2.5) {
        $(".avgrate").css('width', '40%');
    }

    if (avg > 2.5 && avg <= 3.0) {
        $(".avgrate").css('width', '50%');
    }

    if (avg > 3.0 && avg <= 3.5) {
        $(".avgrate").css('width', '60%');
    }

    if (avg > 3.5 && avg <= 4.0) {
        $(".avgrate").css('width', '70%');
    }

    if (avg > 4.0 && avg <= 4.5) {
        $(".avgrate").css('width', '80%');
    }

    if (avg > 4.5 && avg < 5.0) {
        $(".avgrate").css('width', '90%');
    }
    if (avg == '5.0' || avg == '5') {
        $(".avgrate").css('width', '100%');
    }
}



var sVal = 0;
$(function () {
    $(window).scroll(function () {
         sVal = $(this).scrollTop();
        if (sVal >= 200) {
            $('#back-top').addClass('active');
        } else {
            $('#back-top').removeClass('active');
        }
        });
});

$(document).ready(function () {
    /* home page popup on submit btn */
    $('.modal-content input:radio').click(function () {
        var inputProdLink = $(this).val();
        $(this).parents('.modal-content').find('.prodSubmit').attr('href', inputProdLink);
    });

    $('.sidebar-nav .tabstop').click(function () {
        var leadersView = $(this).attr('href');
        $('.tab-pane').removeClass('leader');
        $(leadersView).addClass('leader');
        marginTop = 0;
    });

    /* faqs scroll effect */
    $('.faqul li a').click(function () {
        var faqClass = $(this).parent().parent().parent().attr('class');
        if (faqClass != 'faqcontQ') {
            var targetOffset;
            var faqHref = $(this).attr('href');
            targetOffset = $(faqHref).offset().top - 50;
            console.log('hash val' + targetOffset);
            $('html,body').animate({ scrollTop: targetOffset }, 1000);
            return false;
        }
    });

    /* faqs calc effect */
    $(".faqDetails .faqcontQ ol li a").click(function (e) {
        $('.faqDetails .faqcontQ ol li a').parent().removeClass('selected');
        $(this).parent().addClass('selected');
        e.preventDefault();
        var relSlide = $(this).attr('rel');
        //alert(relSlide);
        $(".faqcont").mCustomScrollbar("scrollTo", "#" + relSlide);
    });

    /* tab active on page load */
    var hrefLoc = window.location.href;
    if (hrefLoc.indexOf('#') > -1) {
        var hashTab = hrefLoc.split('#')[1];
        console.log('.sidebar-nav li a[href="#' + hashTab + '"]');
        $('.sidebar-nav li a[href="#' + hashTab + '"]').click();
    }

});
     
// Reading more & Less
var conHeight = $('.tab-pane:visible:first-child .lt-content').height();
var divHeight = 286;
var posY;
/* Leadership team Scroller */
$(window).load(function () {

    $('.lt-main > div').css({ 'height': '286px', 'overflow': 'hidden', 'margin': '5px 7px' });
    $('.tab-pane:visible').addClass('leader');
    $('.tab-pane .back').fadeOut();
});

$(document).ready(function () {
    $('body').on('click', '.leader .contReading', function () {
        conHeight = $('.leader .lt-main .lt-content').height();
        posY = Math.abs(conHeight - divHeight);
        if (conHeight < divHeight && (marginTop >= posY && marginTop >= (posY + divHeight))) {
            $(this).fadeOut();
            $(this).next('.back').fadeIn();

        } else {
            console.log(marginTop);
            marginTop += divHeight;
            $('.leader .lt-main .lt-content').animate({ marginTop: -marginTop }, 500);
            $(this).next('.back').fadeIn();
            if (marginTop >= posY && marginTop <= (posY + divHeight)) {
                $(this).fadeOut();
                $(this).next('.back').fadeIn();
            }
        }
    });

    $('body').on('click', '.leader .back', function () {
        if (marginTop == 0) {
            $(this).fadeOut();
            $(this).prev('.contReading').fadeIn();
            return false;
        }
        marginTop -= divHeight;
        $('.leader .lt-main .lt-content').animate({ marginTop: -marginTop }, 500);
        $(this).prev('.contReading').fadeIn();
        if (marginTop == 0) {
            $(this).fadeOut();
            $(this).prev('.contReading').fadeIn();
        }
    });
    $("#searchbutton").click(function(){
        var value = $("#searchinput").val();
        if(value !=" " || value !="null")
         {
          window.location.href = "/finance/search?q="+value;
         }
    });
    $("input#searchinput").keypress(function(e){
        if(e.keyCode == 13) {
        var value = $("#searchinput").val();
         if(value !="" || value !="null")
         {
            window.location.href = "/finance/search?q="+value;
         }
         } 
    });
});

/* End Leadership team Scroller  */



$(document).ready(function () {
    //$(".tab-content a:contains('Review')").css("display", "none");
    //$(".sidebar-quick-link a:contains('Review')").css("display", "none");

    $('.media-body input').focus(function () {
        $(this).prev().click();
    });

    $('#mob-review .text-blog input').focus(function () {
        $(this).prev().click();
    });

    //$('.text-blog input').focus(function () {
    //    $(this).prev().click();
    //});
    
//    $(".btn-lg").each(function () {
//        if ($(this).attr("href").indexOf('review.aspx') > 0) {
//            var hreffolder = $(this).attr("href").split('?')[1];

//            $.ajax({
//                type: 'POST',
//                url: '/finance/review.aspx',
//                async: false,
//                data: { commandname: 'Encrypt', prdid: hreffolder },
//                success: function (msg) {
//                    hreffolder = msg;
//                },
//                error: function (msg) {
//                    //alert('Error' + msg); 
//                }
//            })
//            $(this).attr("href", "review.aspx?" + hreffolder);
//        }
//    });
});


/* search script */
// JavaScript source code

$(function () {
    searchAutoComplete();
});

function searchAutoComplete() {
    $("#inputQuery").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://103.23.28.37:8999/solr/PowerPortal/terms?start=0&rows=100&fq=job_id:3&wt=json&terms.prefix=" + $("#inputQuery").val() + "&json.wrf=?",
                dataType: "jsonp",
                data: {
                    rows: 100
                },
                success: function (data) {
                    var source = [];
                    if (data.terms.urltext.length > 0)
                        for (var i = 0; i < data.terms.urltext.length;) {
                            source.push(data.terms.urltext[i]);
                            i = i + 2;
                        }
                    response(source);
                }
            });
        },
        minLength: 0,

        open: function (event, ui) {
            $('ul.ui-autocomplete').addClass("productSearch");
        },
        close: function (event, ui) {
            $('ul.ui-autocomplete').removeClass("productSearch");
        }
    });
}
/* End search script */

			
	
