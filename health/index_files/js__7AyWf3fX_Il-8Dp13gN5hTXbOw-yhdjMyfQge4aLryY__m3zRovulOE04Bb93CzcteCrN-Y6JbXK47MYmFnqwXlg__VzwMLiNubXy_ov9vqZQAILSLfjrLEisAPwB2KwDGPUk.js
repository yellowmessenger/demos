/* Source and licensing information for the line(s) below can be found at http://cdn-js.health.com/sites/all/modules/custom/social_media_field_formatter/js/social_media.js. */
function communityTrack(desc){var social_network='';if(desc.toLowerCase().indexOf('facebook')>=0)social_network="facebook";if(desc.toLowerCase().indexOf('google')>=0)social_network="google";if(desc.toLowerCase().indexOf('twitter')>=0)social_network="twitter";if(desc.toLowerCase().indexOf('pinterest')>=0)social_network="pinterest";if(social_network){utag.link({event_name:"social_share",social_network:social_network,click_id:desc})}else if(desc.toLowerCase().indexOf('email')>=0){utag.link({click_id:desc})}else if(desc.toLowerCase().indexOf('print')>=0)utag.link({click_id:desc})};
/* Source and licensing information for the above line(s) can be found at http://cdn-js.health.com/sites/all/modules/custom/social_media_field_formatter/js/social_media.js. */
/**
 * @file
 * Javascript API to set and get values in the metadata object and UDO.
 *
 * @author Neal Bailly
 */

(function(window, udo) {
  if (typeof define === 'function' && define.amd) {
      define('TiUdo', [], udo);
  }
  else if (typeof exports === 'object') {
      module.exports = udo();
  }
  window.Ti = window.Ti || {};
  window.Ti.udo = udo();
}(this, function() {

  'use strict';

  var udo = {
    set: function(key, value, overwrite) {
      overwrite = typeof overwrite !== 'undefined' ? overwrite : true;
      if (overwrite || !(key in window.Ti.udo_metadata)) {
        window.Ti.udo_metadata[key] = value;
        for (var udo_key in window.Ti.udo_map) {
          if (window.Ti.udo_map[udo_key] === key) {
            window.utag_data[udo_key] = value;
            return;
          }
        }
        if (window.Ti.udo_data_layer.indexOf(key) >= 0) {
          window.utag_data[key] = value;
        }
      }
    },
    setMulti: function(keyvals, overwrite) {
      for (var key in keyvals) {
        this.set(key, keyvals[key], overwrite);
      }
    },
    unset: function(key) {
      if (typeof key === 'undefined') {
        this.unsetMulti(window.Ti.udo_metadata);
      }
      else {
        if (key in window.Ti.udo_metadata) {
          delete window.Ti.udo_metadata[key];
          for (var udo_key in window.Ti.udo_map) {
            if (window.Ti.udo_map[udo_key] === key) {
              delete window.utag_data[udo_key];
              return;
            }
          }
          if (window.Ti.udo_data_layer.indexOf(key) >= 0) {
            delete window.utag_data[key];
          }
        }
      }
    },
    unsetMulti: function(keys) {
      for (var key in keys) {
        this.unset(key);
      }
    },
    get: function(key) {
      if (typeof key === 'undefined') {
        return window.Ti.udo_metadata;
      }
      else {
        return window.Ti.udo_metadata[key];
      }
    },
    view: function(data) {
      if (typeof(data) !== 'undefined') {
        this.setMulti(data);
      }
      window.utag.view();
    }
  }

  return udo;

}));
;/**/
(function($, Drupal) {
  Drupal.behaviors.Health = {
    attach: function() {

      //Sticky Top
      // Adding throttle to make the scroll performance better
      $(window).on('scroll', $.throttle(200, function (event) {
         if ($(window).scrollTop() >= 100) {
             $(".header-top").addClass("StickyTop");
             $("#navbar-nav").css("display","none");
             $(".header-sticky-left").fadeIn(600);
             $("#social-ul").fadeIn(450).css("display","inline-block");
             $(".header-sticky-right").fadeIn(350).css("display","inline-block");
             $("header-right-wrapper").fadeOut(450);
             var node_type = $("meta[name='ctype']").attr("content");
             if (node_type == 'channel' || node_type == 'package') {
              $(".header-subscribe").fadeIn(350).css("display","block");
             }else {
              $(".header-subscribe").fadeOut(450);
             }

             // Pinit button
             $(".pinit-button").addClass("pinit-show");
         }else {
             $(".header-top").removeClass("StickyTop");
             $("#navbar-nav").css("display","block");
             $(".header-sticky-left").fadeOut(50);
             $("#social-ul").fadeOut(450);
             $(".header-sticky-right").fadeOut(50);
             $("header-right-wrapper").fadeIn(450);
             $(".header-subscribe").fadeIn(350).css("display","block");
             // Pinit button
             $(".pinit-button").removeClass("pinit-show");
         }
      }));
      // Next Article Content Show/Hide
      $('.header-sticky-right').hover(
        function(){
          $('#next-article-div').css('display','block');
        },
        function(){
          $('#next-article-div').css('display','none');
        }
      );
      // Adding a class for A-Z chalkenge //
      $(".challenge-main-content .caption").hover(function() {
          $(this).addClass("caption challenge-caption");
          }, function() {
          $(this).removeClass("challenge-caption");
       });
      // Show the caption on mobile devices when user touches the screen.
      var flag = false;
      $('.challenge-main-content .caption').bind('touchstart', function(){
        if (!flag) {
          flag = true;
          $(this).addClass("caption challenge-caption");
          var current_element = $(this);
          setTimeout(function(){ $(current_element).removeClass("challenge-caption");flag = false; }, 2000);
        }
      });
      $("ul.nav.navbar-nav li:nth-child(5)").addClass("flyout-menu");
      $(".flyout-menu").hover(function(){
        $(".condition-center-nav-menu").css("display","block");
        $(".flyout-nav-menu").css("z-index","999");
      })
      $(".flyout-nav-menu").mouseleave(function(){
        $(".condition-center-nav-menu").css("display","none");
        $(".flyout-nav-menu").css("z-index","-999");
      })
      $(".navbar-header").hover(function(){
        $(".condition-center-nav-menu").css("display","none");
      })
      //Hamburger toogle
      $('.hamburger-toggle').click(function() {
        $('.hamburger-menu-wrap').toggleClass('collapse');
        $('.hamburger-toggle').toggleClass('icon-menu');
      });
      //Search button
      $("#search-block-form--2").submit(function(e){
        e.preventDefault();
        $v = $(".hamburger-form-control").val();
        location.href=window.location.origin+'/search/site/'+$v;
      })
      //Hamburger Dropdown
      $('.hamburger-menu-wrap .dropdown').click(function() {
        $(this).children('.dropdown-menu').toggle();
        $(this).children('.submenu-toggle').each(function() {
          if ($(this).hasClass("closed")) {
            $(this).addClass("open");
            $(this).addClass("icon-chevron-thin-down");
            $(this).removeClass("closed");
            $(this).removeClass("icon-chevron-thin-right");
          }
          else {
            $(this).addClass("closed");
            $(this).addClass("icon-chevron-thin-right");
            $(this).removeClass("open");
            $(this).removeClass("icon-chevron-thin-down");
          }
        });
      });
      if ($('#ad-nativo.row.space-above').height() < 100) {
        $("#ad-nativo.row.space-above").css("height", "0");
      }
      //Search Box
      $('.search-toggle').click(function() {
        $('.search-box').toggleClass('hidden');
        $('#edit-search-block-form').focus();
      });
      $('.search-placeholder').click(function() {
        $('.search-box').toggleClass('hidden');
      });

      // condition menu
      $(".condition-menu").click(function(){
        $(".condition-center-mobile-menu").toggle('slow');
        $(".condition-menu .icon-chevron-thin-down").toggleClass('up');
      });

      //Search Mobile menu
      $(".menu-mobile-heading h3").click(function(){
        $(".item-list").toggle('slow');
        $(".menu-mobile-heading .icon-chevron-thin-down").toggleClass('up');
      });

     $(document).ready(function() {
        var isInIframe = window.frameElement && window.frameElement.nodeName == "IFRAME";
          if(isInIframe) {
          $(".header-wrapper").hide();
          $("#content-footer-wrapper").hide();
          $(".top-spacer").css("display","none");
          $("#2x9-ad-fixer").css("display","none");
        }
        $('.no-thanks a').click(function() {
          parent.$.colorbox.close();
          return false;
        });
      });

      //Newsletter Submit
      $('#ti-lsg-hlt-newsletters-signup-responsive-form .form-submit').click(function() {
        newsletterSubscribe('ti-lsg-hlt-newsletters-signup-responsive-form');
        return false;
      });

      $('#ti-lsg-hlt-newsletters-right-rail-signup-form .form-submit').click(function() {
        newsletterSubscribe('ti-lsg-hlt-newsletters-right-rail-signup-form');
        return false;
      });

      $("#ti-lsg-hlt-newsletters-signup-responsive-form .form-item-email").on("keypress", function() {
        $("#ti-lsg-hlt-newsletters-right-rail-signup-form #thankyou-text").html('');
      });

      $("#ti-lsg-hlt-newsletters-right-rail-signup-form .form-item-email").on("keypress", function() {
        $("#ti-lsg-hlt-newsletters-right-rail-signup-form #thankyou-text").html('');
      });

      //Detecting Mobile Device
      var isMobile = {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
      };
      //Email a Friend in Mobile devices
      if (isMobile.any()) {
        if (document.querySelector('.social-buttons') !== null && window.innerWidth < 768)
        {
          var mailUrl = $(".social-buttons .email-btn").attr("data-url");
          $(".social-buttons .email-btn").attr("href", mailUrl);
          $(".social-buttons .email-btn")[0].onclick = null;
        }
      }

      // On Mobile Devices set hamburger menu height.
      if (window.innerWidth < 768) {
        var windowHeight = window.innerHeight;
        var navbarHeight = $('#navbar').height();
        $('.hamburger-menu-wrap').height(windowHeight - navbarHeight);
        // On Changing viewport from portrait to landscape, resize hamburger menu height.
        $(window).resize(function () {
          var windowHeight = window.innerHeight;
          var navbarHeight = $('#navbar').height();
          $('.hamburger-menu-wrap').height(windowHeight - navbarHeight);
        });
      }
      // Scroll Issue on hamburger menu for responsive template.
      $('.hamburger-menu-wrap').on('mousewheel DOMMouseScroll', function(e) {
        var event = e.originalEvent,
                d = event.wheelDelta || -event.detail;

        this.scrollTop += (d < 0 ? 1 : -1) * 30;
        e.preventDefault();
      });
      // A-Z Condition center smooth scrolling.
      $('.page-node-234141 a[href*="#"]:not([href="#"])').click(function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        var top_position  = target.offset().top;
        var sticky_header = $('.header-wrapper').height();
        var scroll_position = top_position - sticky_header;
        if (target.length) {
          $('html, body').animate({
            scrollTop: scroll_position
          }, 1000);
          return false;
        }
      });
      var $p = $('.page-node-234141 .grouping  .group-content .list-unstyled li a');
      $('.page-node-234141 .letter-navigation a').addClass(function(){
        var s = this.textContent;
        return $p.filter(function(){ return this.textContent.charAt(0) === s }).length ? '' : 'grey';
      });

      // Relocate second outbrain to the right rail. From HLT-3133.
      $(".OUTBRAIN").each(function() {
        var widgetID = $(this).data("widget-id");
        if (widgetID && widgetID.length && widgetID.length > 2
          && widgetID.substring(0, 2) == "SB") {
          $(this).appendTo(".right-rail-block.outbrain-content");
        }
      })

    }('jQuery')
  };
})(jQuery, Drupal);

function newsletterSubscribe(form_selector) {
  var $ = jQuery;
  var email = $('#' + form_selector + ' [name="email"]').val();
  var zipcode = $('#' + form_selector + ' [name="zipcode"]').val();
  var healthSource = $('#' + form_selector + ' [name="Source"]').val();
  var optin_flag = $('#' + form_selector + ' [name="Optin_Flag"]').val();
  var newsletter_name = $('#' + form_selector + ' [name="Newsletter_Name"]').val();
  var action = $('#' + form_selector + ' [name="_action"]').val();
  var deexternalkey = $('#' + form_selector + ' [name="_deExternalKey"]').val();
  var recaptchaResponse = $('#' + form_selector + ' #g-recaptcha-response').val();

  var newsletterID = 7213759;
  var url = '';

  // Empty email check
  if (email == 'Email address' || !email) {
    $('#' + form_selector + ' #email-error').html('<span class ="required-field">Email is required.</span>');
    $('.newsletter-block .form-item-email input').css("border", "1px solid red");
    return false;
  }
  if (zipcode == 'Zip code' || !zipcode) {
    $('#' + form_selector + ' #zipcode-error').html('<span class ="required-field">Zipcode is required.</span>');
    $('.newsletter-block .form-item-zipcode input').css("border", "1px solid red");
    return false;

  }

  // Email validation
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    $('#' + form_selector + ' #thankyou-text').html('<p class="thankyou-text">Sorry, your email was invalid.</p>');
    return false;
  }
  // Zipcode validation
  if (!(/^\d{5}$/.test(zipcode))) {
    $('#' + form_selector + ' #thankyou-text').html('<p class="thankyou-text">Sorry, your zipcode was invalid.</p>');
    return false;
  }
  //recaptcha validation
  if(grecaptcha.getResponse() == "") {
    $('#' + form_selector + ' #captcha-error').html('<span class="required-field">Please verify that you are not a robot.</span>');
    return false;
  }

  // If we are a form for multiple newsletters, we'll have multiple newsletterIDs.
  // Get the list of newsletters we want into a comma delimited list.
  // Note: as of 15 Aug. 2016 this is not used on health.com.
  newsletterIDs = $("#ti-lsg-hlt-newsletters-signup-responsive-form input[type=checkbox]:checked")
    .map(function() {return this.value;}).get().join(',');

  newsletter_name = $("#ti-lsg-hlt-newsletters-signup-responsive-form input[name=Newsletter_Name]").val();
  source = $("#ti-lsg-hlt-newsletters-signup-responsive-form input[name=Source]").val();

  url = '/newsletters/ajax/' + email + '/' + newsletter_name + '/' + source + '/' + newsletterID + '/' + zipcode + '/' + recaptchaResponse;

  $.ajax({
    type: 'POST',
    url: url,
    data: {},
    success: function(data) {
      if (data.indexOf("ajax_email_success") != -1) {
        $('#' + form_selector + ' #thankyou-text').html('</br><p class="thankyou-text">Thanks&nbsp;</p><p class="thankyou-text">for signing up!<p>');
        $('#' + form_selector + ' .form-group').addClass('hidden');
        $('#' + form_selector + ' .form-submit').addClass('hidden');
        if ($('#' + form_selector + ' .form-checkboxes').length > 0){
          $('#' + form_selector + ' .form-checkboxes').addClass('hidden');
        }
      }
      else {
        $('#' + form_selector + ' #thankyou-text').html('<p class ="thankyou-text">Sorry, there was a problem. Try again.<p>');
      }
    }
  });
}

// Make changes to the layout based on the size of the ad that loaded.
jQuery(document).on('tgxAdInit.afterAdLoads', {}, function (event, adSettings) {
  var $ = jQuery;
  var $adPlaceholder = $("#" + adSettings);
  var timeForAdToStick = 2000;
  // See if we're dealing with the leaderboard ad unit.
  if ($adPlaceholder.closest($(".leaderboard-ad-unit")).length > 0) {
    // Is this a huge 970x250 ad?
    var adHeight = $adPlaceholder.height();
    if ($adPlaceholder.height() >= 250) {
      var adHeight = $adPlaceholder.height();
      $(".leaderboard-ad-unit").css("background", "inherit");
      $(".leaderboard-ad-unit").css("padding", 0);
      // Homepage has a large header.
      if ($("body").hasClass("page-homepage")) {
        $(".top-spacer").css("padding-top", "103px");
        $(".header-wrapper").css("height", (adHeight + 45) + "px");

      }
      else {
        $(".page-node .header-wrapper").css("height", (adHeight + 25) + "px");
        $(".node-type-gallery .header-wrapper").css("height", (adHeight + 25) + "px");
        $(".page-node .top-spacer").css("padding-top", "60px");
        $(".node-type-condition-center .top-spacer").css("padding-top", "20px");
        $(".node-type-gallery .top-spacer").css("padding-top", "45px");
      }
      // Gallery should keep the ad position locked if it is a 970x250 ad.
      if (!$("body").hasClass("node-type-gallery")) {
        // After a period, move the ad to the top of content.
        setTimeout(function() {
          $(".header-top").css("height", "60px");
          $(".leaderboard-ad-unit").css("position", "absolute");
          $(".leaderboard-ad-unit").css("z-index", "inherit");
        }, timeForAdToStick);
      }
    }
  }
});

(function ($, Drupal, window, document, undefined) {
//Configure colorbox call back to resize with custom dimensions.
  $.colorbox.settings.onLoad = function() {
    var modal = getParameterByName('package_modal');
  }
})(jQuery, Drupal, this, this.document);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
;/**/
