

function bannerimagefunction(){
  var idCount = 1;
    jQuery('.innerbanner-container .banner-img').each(function() {
       jQuery(this).attr('id', 'media-' + idCount);
       idCount++;

       var getID = jQuery(this).attr('id');
       var imagesrc = jQuery('img', this).attr("src");
       var imageheight = jQuery('img', this).height();

      jQuery(this).css('background-image', 'url(' + imagesrc + ')');
      // jQuery(this).css('height', imageheight);
      
    });
}
function newsimagefunction(){
  var idCount = 1;
    jQuery('.news-gallery-wrap .images-container, .new-modal-body .big-image-container .big-image-inner, .new-modal-body .small-image-container .small-image-inner, .event-content-wrap .image-inner, .news-content-container .sd-events-wrap .sb-image-inner, .inspire-image-container .inspire-image-inner').each(function() {//.product-listings-inner .listings-image-inner
       jQuery(this).attr('id', 'media-' + idCount);
       idCount++;

       var getID = jQuery(this).attr('id');
       var imagesrc = jQuery('img', this).attr("src");
       var imageheight = jQuery('img', this).height();

      jQuery(this).css('background-image', 'url(' + imagesrc + ')');
      
    });
}

jQuery(document).click(function() {
    showDropDown(null);
});

jQuery(".submenu__").click(function(event) {
    showDropDown(this);
    event.stopPropagation();
});

var showDropDown = function(object) {
    jQuery(".submenu__").each(function(i, element) {
        var submenu = jQuery(element).children(".has-dropdown");
        if(!$(submenu).is(":hidden")) {
            jQuery(submenu).slideUp(200);
            jQuery('body').find('#desktop-header-overlay').hide();

        }
    });
    if(object != null) {
        jQuery(object).children(".has-dropdown").slideDown(400);
        jQuery('body').find('#desktop-header-overlay').show();
    }
}

jQuery(document).ready(function() {
  var headersecondrow = jQuery('.header-second-row .container').width();
  jQuery('.header .header-second-row .row-item .links > ul > li .has-dropdown').css('width', headersecondrow);
    //Mobile Menus

  jQuery('.mmenu-widget.mainmenus > ul > li:has(.has-mobile-menu)').addClass('hasmenus');
  jQuery('.hasmenus').append('<span class="clicktodown sprites__"></span>')
  jQuery('.mmenu-widget.mainmenus > ul > li.hasmenus > a').removeAttr('href')

  // jQuery('.mmenu-widget.mainmenus > ul > li').on('click',function(){
  //     jQuery(this).children('.mmenu-widget.mainmenus > ul > li .has-mobile-menu').slideToggle();
  //     jQuery('.mmenu-widget.mainmenus > ul > li').toggleClass('active-toggled');
  // });

  jQuery('.mmenu-widget.mainmenus > ul > li').on('click',function(){
      jQuery(this).children('.mmenu-widget.mainmenus > ul > li .has-mobile-menu').slideToggle();
      jQuery(this).children('.mmenu-widget.mainmenus > ul > li .has-mobile-menu').parent('.hasmenus').toggleClass('active-toggled');
  });

  jQuery("#main-slider-ta").owlCarousel({
    items:1,
    nav : true,
    loop: true,
    dots: true,
    slideSpeed : 300,
    singleItem : true,
    autoplay :5000,
    autoplayTimeout : 5000


  });

  jQuery("#feature-slider").owlCarousel({
    items:1,
    nav : true,
    loop: true,
    slideSpeed : 300,
    singleItem : true,
    autoplay :3000,
    autoplayTimeout : 3000,
    autoplayHoverPause :true
  });
  jQuery('.owl-nav,.owl-dots').wrapAll('<div class="owl-controls"></div>');
  var owl = jQuery("#categories-categorised"); 
  owl.owlCarousel({
     responsiveClass:true,
      responsive:{
          0:{
              items:1,            
          },
          600:{
              items:2,            
          },
          768:{
              items:2,            
          },
          1200:{
              items:3,                      
          }
      },
    nav:true,
    pagination:false,
    //autoplay:true,
    //autoplayTimeout:3000,
    //autoplayHoverPause:true,
    loop: true,
    navRewind:false,  
  });

  var sync1 = jQuery("#sync1");
  var sync2 = jQuery("#sync2");

    sync1.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: true,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
  });

  sync2.owlCarousel({
    items : 7,
    itemsDesktop      : [1199,10],
    itemsDesktopSmall     : [979,10],
    itemsTablet       : [768,8],
    itemsMobile       : [479,4],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
});

function syncPosition(el){
var current = this.currentItem;
jQuery("#sync2")
  .find(".owl-item")
  .removeClass("synced")
  .eq(current)
  .addClass("synced")
if(jQuery("#sync2").data("owlCarousel") !== undefined){
  center(current)
}
}

jQuery("#sync2").on("click", ".owl-item", function(e){
e.preventDefault();
var number = jQuery(this).data("owlItem");
sync1.trigger("owl.goTo",number);
});

function center(number){
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
bannerimagefunction();
  newsimagefunction();

});


jQuery(window).resize(function() {
  bannerimagefunction();
  newsimagefunction();
});

jQuery(window).load(function() {
  bannerimagefunction();
  newsimagefunction();
});


// Quick & dirty toggle to demonstrate modal toggle behavior
jQuery('.becomedealer-toggle').on('click', function(e) {
  e.preventDefault();
  jQuery('.dealer-modal').toggleClass('is-visible');
});


jQuery('.modal-header').on('click', function() {
  jQuery('.map-modal').toggleClass('is-visible');
});

jQuery('.success-toggle').on('click', function() {
  jQuery('.success').toggleClass('is-visible');
});

function open_popup(){
  jQuery('.dealer-modal').toggleClass('is-visible');
  jQuery('.success').toggleClass('is-visible');
}

jQuery('.search-close').on('click', function() { alert("");
  jQuery('.map-modal').toggleClass('is-visible');
});

//Quick & dirty toggle to demonstrate modal toggle behavior
jQuery('.becomedealer-toggle-indo').on('click', function(e) {
  e.preventDefault();
  jQuery('.dealer-modal').toggleClass('is-visible');
});

jQuery('.upload-resume-indo').on('click', function(e) {
  e.preventDefault();
  jQuery('.dealer-modal-resume').toggleClass('is-visible');
});

jQuery('.upload-resume-eng').on('click', function(e) {
  e.preventDefault();
  jQuery('.dealer-modal-resume').toggleClass('is-visible');
});
/*
  jQuery("#application-tabs_content_0 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_0 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_0 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_0 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }else{             
          jQuery("#application-tabs_content_0 .tab-item_").hide(); //Hide all content
          jQuery("#application-tabs_0 li").attr("id",""); //Reset id's
          jQuery(this).parent().attr("id","current"); // Activate this
          jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

  jQuery("#application-tabs_content_1 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_1 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_1 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_1 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_1 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_1 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

jQuery("#application-tabs_content_2 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_2 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_2 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_2 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_2 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_2 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

jQuery("#application-tabs_content_3 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_3 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_3 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_3 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_3 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_3 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

jQuery("#application-tabs_content_4 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_4 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_4 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_4 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_4 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_4 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

jQuery("#application-tabs_content_5 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_5 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_5 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_5 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_5 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_5 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

  jQuery("#application-tabs_content_6 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_6 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_6 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_6 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_6 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_6 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });

  jQuery("#application-tabs_content_7 .tab-item_").hide(); // Initially hide all content
  jQuery("#application-tabs_7 li:first").attr("id","current"); // Activate first tab
  jQuery("#application-tabs_content_7 .tab-item_:first").fadeIn(); // Show first tab content
  jQuery('#application-tabs_7 li a').click(function(e) {
      e.preventDefault();
      if (jQuery(this).attr("id") == "current"){ //detection for current tab
       return       
      }
      else{             
      jQuery("#application-tabs_content_7 .tab-item_").hide(); //Hide all content
      jQuery("#application-tabs_7 li").attr("id",""); //Reset id's
      jQuery(this).parent().attr("id","current"); // Activate this
      jQuery( jQuery(this).attr('href')).fadeIn(); // Show content for current tab
      }
  });*/

jQuery(".specs-content:first").slideDown(); //if you don't want first div open then remove this line
  jQuery(".specs-title:first").addClass('active');//if you don't want first div open then remove this line
  
  jQuery(".specs-title").click(function(){
      jQuery('.specs-content').slideUp();
      jQuery('.specs-title').removeClass('active')
      if(jQuery(this).next().is(":visible")){
          jQuery(this).next().slideUp();    
      }else{
          jQuery(this).next().slideDown();
          jQuery(this).addClass('active')
      }
  });

 document.addEventListener("touchstart", function() {},false);


/**
 * Autoplay Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the autoplay plugin.
   * @class The Autoplay Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Autoplay = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * The autoplay timeout.
     * @type {Timeout}
     */
    this._timeout = null;

    /**
     * Indicates whenever the autoplay is paused.
     * @type {Boolean}
     */
    this._paused = false;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'settings') {
          if (this._core.settings.autoplay) {
            this.play();
          } else {
            this.stop();
          }
        } else if (e.namespace && e.property.name === 'position') {
          //console.log('play?', e);
          if (this._core.settings.autoplay) {
            this._setAutoPlayInterval();
          }
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoplay) {
          this.play();
        }
      }, this),
      'play.owl.autoplay': $.proxy(function(e, t, s) {
        if (e.namespace) {
          this.play(t, s);
        }
      }, this),
      'stop.owl.autoplay': $.proxy(function(e) {
        if (e.namespace) {
          this.stop();
        }
      }, this),
      'mouseover.owl.autoplay': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'mouseleave.owl.autoplay': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.play();
        }
      }, this),
      'touchstart.owl.core': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'touchend.owl.core': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause) {
          this.play();
        }
      }, this)
    };

    // register event handlers
    this._core.$element.on(this._handlers);

    // set default options
    this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
  };

  /**
   * Default options.
   * @public
   */
  Autoplay.Defaults = {
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    autoplaySpeed: false
  };

  /**
   * Starts the autoplay.
   * @public
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   */
  Autoplay.prototype.play = function(timeout, speed) {
    this._paused = false;

    if (this._core.is('rotating')) {
      return;
    }

    this._core.enter('rotating');

    this._setAutoPlayInterval();
  };

  /**
   * Gets a new timeout
   * @private
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   * @return {Timeout}
   */
  Autoplay.prototype._getNextTimeout = function(timeout, speed) {
    if ( this._timeout ) {
      window.clearTimeout(this._timeout);
    }
    return window.setTimeout($.proxy(function() {
      if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
        return;
      }
      this._core.next(speed || this._core.settings.autoplaySpeed);
    }, this), timeout || this._core.settings.autoplayTimeout);
  };

  /**
   * Sets autoplay in motion.
   * @private
   */
  Autoplay.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout();
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.stop = function() {
    if (!this._core.is('rotating')) {
      return;
    }

    window.clearTimeout(this._timeout);
    this._core.leave('rotating');
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.pause = function() {
    if (!this._core.is('rotating')) {
      return;
    }

    this._paused = true;
  };

  /**
   * Destroys the plugin.
   */
  Autoplay.prototype.destroy = function() {
    var handler, property;

    this.stop();

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

$(document).ready(function(){ 
    $(".has-dropdown a").click(function(){
       $(".has-dropdown").addClass("none_menu");
        $(".has-dropdown").hide();
    });  
});







$(document).ready(function() {

  var sync11 = $("#sync11");
  var sync12 = $("#sync12");
  var slidesPerPage = 5; //globaly define number of elements per page
  var syncedSecondary = true;

  sync11.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: false,
    autoplay: true,
    dots: true,
    loop: true,
    responsiveRefreshRate : 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync12
    .on('initialized.owl.carousel', function () {
      sync12.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        480:{
            items:2,
            nav:false
        },
        640:{
            items:3,
            nav:false
        },
        980:{
            items:5,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    },


    dots: false,
    nav: true,
    // autoWidth:true,
    loop: false,
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    
    //end block

    sync12
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync12.find('.owl-item.active').length - 1;
    var start = sync12.find('.owl-item.active').first().index();
    var end = sync12.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync12.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync12.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync11.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync12.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync11.data('owl.carousel').to(number, 300, true);
  });
});
